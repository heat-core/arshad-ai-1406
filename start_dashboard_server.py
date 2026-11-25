#!/usr/bin/env python3
"""
Local Network Server for Arshad_AI_1406 Dashboard.
- Serves dashboard.html, PDFs, and renders Markdown (.md) files cleanly for mobile/desktop browsers.
- Syncs checklist progress across phone and PC via /api/progress -> progress_state.json.
"""

import html
import io
import json
import mimetypes
import os
import re
import socket
import sys
import threading
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PROGRESS_FILE = BASE_DIR / "progress_state.json"
PORT = int(os.environ.get("DASHBOARD_PORT", "8086"))
LOCK = threading.Lock()


def render_inline_md(text: str) -> str:
    """Render inline markdown while preserving safe inline HTML like <span dir='ltr'>."""
    # Preserve <span dir="ltr">...</span> and <br> tags via placeholders
    placeholders = {}

    def stash(m):
        key = f"@@PH{len(placeholders)}@@"
        placeholders[key] = m.group(0)
        return key

    text = re.sub(r'<span\s+dir="ltr"[^>]*>.*?</span>', stash, text)
    text = re.sub(r'<br\s*/?>', stash, text)

    # Escape remaining HTML
    text = html.escape(text)

    # Inline code `...`
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    # Links [label](url)
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    # Bold **...**
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    # Italic *...*
    text = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<em>\1</em>', text)

    # Restore stashed tags (also process inline code/links inside <span dir="ltr">...</span>)
    for key, val in placeholders.items():
        if val.startswith("<span"):
            inner_m = re.match(r'^(<span\s+dir="ltr"[^>]*>)(.*?)(</span>)$', val, re.S)
            if inner_m:
                inner = inner_m.group(2)
                inner = html.escape(inner)
                inner = re.sub(r'`([^`]+)`', r'<code>\1</code>', inner)
                inner = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', inner)
                val = inner_m.group(1) + inner + inner_m.group(3)
        text = text.replace(key, val)

    return text


def markdown_to_html(md_text: str, title: str, raw_url: str) -> str:
    lines = md_text.splitlines()
    out = []
    in_code = False
    code_buf = []
    in_ul = False
    in_table = False
    table_header_done = False

    def close_ul():
        nonlocal in_ul
        if in_ul:
            out.append("</ul>")
            in_ul = False

    def close_table():
        nonlocal in_table, table_header_done
        if in_table:
            out.append("</tbody></table></div>")
            in_table = False
            table_header_done = False

    for line in lines:
        stripped = line.strip()

        # Skip wrapper RTL divs from markdown files (page itself is already RTL)
        if stripped.startswith('<div dir="rtl"') or stripped == "</div>":
            continue

        # Code fences
        if stripped.startswith("```"):
            close_ul()
            close_table()
            if not in_code:
                in_code = True
                code_buf = []
            else:
                out.append('<pre dir="ltr"><code>' + html.escape("\n".join(code_buf)) + "</code></pre>")
                in_code = False
            continue

        if in_code:
            code_buf.append(line)
            continue

        # Horizontal rule
        if stripped in ("---", "***", "___"):
            close_ul()
            close_table()
            out.append("<hr />")
            continue

        # Tables
        if stripped.startswith("|") and stripped.endswith("|"):
            close_ul()
            cells = [c.strip() for c in stripped.strip("|").split("|")]
            # Separator row like | :--- | :---: |
            if all(re.match(r'^:?-{2,}:?$', c) for c in cells if c):
                continue
            if not in_table:
                in_table = True
                table_header_done = False
                out.append('<div class="table-wrap"><table><thead><tr>' +
                           "".join(f"<th>{render_inline_md(c)}</th>" for c in cells) +
                           "</tr></thead><tbody>")
                table_header_done = True
            else:
                out.append("<tr>" + "".join(f"<td>{render_inline_md(c)}</td>" for c in cells) + "</tr>")
            continue
        else:
            close_table()

        # Headings
        hm = re.match(r'^(#{1,4})\s+(.*)$', stripped)
        if hm:
            close_ul()
            lvl = len(hm.group(1))
            out.append(f"<h{lvl}>{render_inline_md(hm.group(2))}</h{lvl}>")
            continue

        # Blockquote / GitHub Alert
        if stripped.startswith(">"):
            close_ul()
            bq = stripped.lstrip(">").strip()
            if bq.startswith("[!"):
                continue
            out.append(f"<blockquote>{render_inline_md(bq)}</blockquote>")
            continue

        # Bullet / checklist items
        lm = re.match(r'^[-*]\s+(.*)$', stripped)
        if lm:
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            item = lm.group(1)
            if item.startswith("[ ] "):
                out.append(f'<li class="chk-li"><span class="chk-box"></span><span>{render_inline_md(item[4:])}</span></li>')
            elif item.startswith("[x] ") or item.startswith("[X] "):
                out.append(f'<li class="chk-li done"><span class="chk-box checked"></span><span>{render_inline_md(item[4:])}</span></li>')
            else:
                out.append(f"<li>{render_inline_md(item)}</li>")
            continue

        if not stripped:
            close_ul()
            continue

        close_ul()
        out.append(f"<p>{render_inline_md(stripped)}</p>")

    close_ul()
    close_table()
    if in_code:
        out.append('<pre dir="ltr"><code>' + html.escape("\n".join(code_buf)) + "</code></pre>")

    body = "\n".join(out)
    return render_server_shell(
        page_title=f"{title} — کنکور ارشد هوش مصنوعی ۱۴۰۶",
        crumb=title,
        right_action=f'<a class="btn-sec" href="{html.escape(raw_url)}">فایل خام (.md)</a>',
        content=f'<article class="doc prose">{body}</article>',
    )


SVG_ICONS = {
    "back": '<svg class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    "up": '<svg class="icon" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>',
    "folder": '<svg class="icon" viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
    "pdf": '<svg class="icon" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    "md": '<svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    "archive": '<svg class="icon" viewBox="0 0 24 24"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>',
    "file": '<svg class="icon" viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>',
}


def render_server_shell(page_title: str, crumb: str, right_action: str, content: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(page_title)}</title>
  <script>
    (function () {{
      var t = localStorage.getItem("arshad_theme") || "light";
      document.documentElement.setAttribute("data-theme", t === "dark" ? "dark" : "light");
    }})();
  </script>
  <style>
    @font-face {{ font-family: "Vazirmatn"; src: url("/assets/fonts/Vazirmatn-Regular.woff2") format("woff2"); font-weight: 400; font-display: swap; }}
    @font-face {{ font-family: "Vazirmatn"; src: url("/assets/fonts/Vazirmatn-Medium.woff2") format("woff2"); font-weight: 500; font-display: swap; }}
    @font-face {{ font-family: "Vazirmatn"; src: url("/assets/fonts/Vazirmatn-Bold.woff2") format("woff2"); font-weight: 700; font-display: swap; }}
    @font-face {{ font-family: "Vazirmatn"; src: url("/assets/fonts/Vazirmatn-ExtraBold.woff2") format("woff2"); font-weight: 800; font-display: swap; }}
    :root {{
      --bg: #F6F5F1; --surface: #FFFFFF; --surface-2: #EFECE5;
      --ink: #16181D; --ink-muted: #525866; --border: #E2DFD7; --border-strong: #C9C4B8;
      --spec: #1D4ED8; --spec-ink: #1E3A8A; --spec-bg: #EFF6FF; --ok: #15803D; --ok-bg: #F0FDF4;
    }}
    [data-theme="dark"] {{
      --bg: #111317; --surface: #181B21; --surface-2: #20242C;
      --ink: #F1F3F6; --ink-muted: #A1A8B8; --border: #2B303A; --border-strong: #3E4554;
      --spec: #60A5FA; --spec-ink: #BFDBFE; --spec-bg: rgba(59,130,246,0.14); --ok: #4ADE80; --ok-bg: rgba(34,197,94,0.14);
    }}
    * {{ box-sizing: border-box; font-family: "Vazirmatn", "Segoe UI", Tahoma, sans-serif; }}
    body {{ background: var(--bg); color: var(--ink); margin: 0; padding: 0; line-height: 1.75; direction: rtl; text-align: right; font-variant-numeric: tabular-nums; }}
    .icon {{ width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }}
    .topbar {{ position: sticky; top: 0; z-index: 20; background: rgba(246,245,241,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 10px 18px; display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }}
    [data-theme="dark"] .topbar {{ background: rgba(17,19,23,0.92); }}
    .top-actions {{ display: flex; align-items: center; gap: 8px; }}
    .btn-main, .btn-sec, .theme-btn {{ display: inline-flex; align-items: center; gap: 6px; padding: 6px 13px; border-radius: 9px; font-size: 0.85rem; font-weight: 600; text-decoration: none; cursor: pointer; }}
    .btn-main {{ background: var(--spec); color: #FFFFFF; border: 1px solid transparent; }}
    [data-theme="dark"] .btn-main {{ background: #2563EB; }}
    .btn-sec, .theme-btn {{ background: var(--surface); color: var(--ink); border: 1px solid var(--border); }}
    .theme-btn {{ padding: 7px 9px; }}
    .crumb {{ color: var(--ink-muted); font-size: 0.82rem; direction: ltr; max-width: 48vw; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }}
    .main {{ max-width: 960px; margin: 24px auto 56px; padding: 0 18px; }}
    .doc {{ background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px 28px; }}
    .prose {{ font-size: 0.96rem; }}
    .doc > *:first-child {{ margin-top: 0; }}
    h1 {{ font-size: 1.42rem; font-weight: 800; color: var(--ink); border-bottom: 1px solid var(--border); padding-bottom: 12px; margin-bottom: 18px; }}
    h2 {{ font-size: 1.15rem; font-weight: 800; color: var(--ink); margin-top: 26px; }}
    h3 {{ font-size: 1.02rem; font-weight: 700; color: var(--spec-ink); margin-top: 20px; }}
    p, li {{ max-width: 72ch; }}
    a {{ color: var(--spec-ink); text-decoration: none; text-underline-offset: 4px; }}
    a:hover {{ text-decoration: underline; }}
    code {{ background: var(--surface-2); color: var(--ink); padding: 2px 6px; border-radius: 5px; font-family: Consolas, monospace; font-size: 0.87em; direction: ltr; unicode-bidi: embed; }}
    pre {{ background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; overflow-x: auto; text-align: left; direction: ltr; }}
    pre code {{ padding: 0; background: transparent; }}
    ul {{ padding-right: 20px; }}
    li {{ margin-bottom: 6px; }}
    li.chk-li {{ list-style: none; display: flex; align-items: flex-start; gap: 8px; margin-right: -18px; }}
    .chk-box {{ width: 15px; height: 15px; margin-top: 5px; border: 1.5px solid var(--border-strong); border-radius: 4px; flex-shrink: 0; display: inline-block; }}
    .chk-box.checked {{ background: var(--ok); border-color: var(--ok); }}
    li.chk-li.done {{ color: var(--ink-muted); text-decoration: line-through; }}
    hr {{ border: none; border-top: 1px solid var(--border); margin: 20px 0; }}
    blockquote {{ border: 1px solid var(--border); background: var(--surface-2); margin: 14px 0; padding: 12px 16px; border-radius: 10px; }}
    .table-wrap {{ overflow-x: auto; margin: 16px 0; }}
    table {{ width: 100%; border-collapse: collapse; font-size: 0.88rem; }}
    th, td {{ border-bottom: 1px solid var(--border); padding: 9px 12px; text-align: right; }}
    th {{ background: var(--surface-2); color: var(--ink-muted); font-weight: 700; }}
    .folder-list {{ display: flex; flex-direction: column; gap: 8px; }}
    .folder-item {{ display: flex; justify-content: space-between; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; color: var(--ink); text-decoration: none; font-weight: 600; font-size: 0.9rem; }}
    .folder-item:hover {{ border-color: var(--spec); background: var(--surface-2); text-decoration: none; }}
    .folder-left {{ display: flex; align-items: center; gap: 10px; min-width: 0; }}
    .folder-name {{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }}
    .folder-item small {{ color: var(--ink-muted); font-weight: 500; white-space: nowrap; }}
    @media (max-width: 640px) {{ .main {{ margin: 14px auto 40px; padding: 0 12px; }} .doc {{ padding: 16px; }} .crumb {{ display: none; }} }}
  </style>
</head>
<body>
  <header class="topbar">
    <a class="btn-main" href="/dashboard.html">{SVG_ICONS["back"]}<span>بازگشت به داشبورد</span></a>
    <span class="crumb">{html.escape(crumb)}</span>
    <div class="top-actions">
      {right_action}
      <button type="button" class="theme-btn" id="srvThemeBtn" title="تغییر تم"></button>
    </div>
  </header>
  <main class="main">{content}</main>
  <script>
    (function () {{
      var sun = '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
      var moon = '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      var btn = document.getElementById("srvThemeBtn");
      function sync() {{
        var cur = document.documentElement.getAttribute("data-theme") || "light";
        btn.innerHTML = cur === "dark" ? sun : moon;
      }}
      sync();
      btn.addEventListener("click", function () {{
        var cur = document.documentElement.getAttribute("data-theme") || "light";
        var next = cur === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("arshad_theme", next);
        sync();
      }});
    }})();
  </script>
</body>
</html>"""


class DashboardHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def list_directory(self, path):
        try:
            entries = sorted(os.listdir(path), key=lambda x: (not os.path.isdir(os.path.join(path, x)), x.lower()))
        except OSError:
            self.send_error(404, "No permission to list directory")
            return None
        display_path = urllib.parse.unquote(self.path).split("?", 1)[0]
        rows = []
        parent = os.path.dirname(display_path.rstrip("/"))
        if parent and parent != display_path.rstrip("/"):
            rows.append(
                f'<a class="folder-item" href="{urllib.parse.quote(parent)}/">'
                f'<span class="folder-left">{SVG_ICONS["up"]}<span>بازگشت به پوشه قبلی</span></span>'
                f'<small>پوشه والد</small></a>'
            )
        for name in entries:
            if name.startswith("."):
                continue
            full = os.path.join(path, name)
            is_dir = os.path.isdir(full)
            href = urllib.parse.quote(name) + ("/" if is_dir else "")
            if is_dir:
                icon, meta = SVG_ICONS["folder"], "پوشه"
            elif name.lower().endswith(".pdf"):
                sz = os.path.getsize(full) / (1024 * 1024)
                icon, meta = SVG_ICONS["pdf"], f"{sz:.2f} MB"
            elif name.lower().endswith(".md"):
                icon, meta = SVG_ICONS["md"], "درس‌نامه"
            elif name.lower().endswith((".rar", ".zip")):
                sz = os.path.getsize(full) / (1024 * 1024)
                icon, meta = SVG_ICONS["archive"], f"{sz:.2f} MB"
            else:
                sz = os.path.getsize(full) / 1024
                icon, meta = SVG_ICONS["file"], f"{sz:.0f} KB"
            target_attr = "" if is_dir else ' target="_blank"'
            rows.append(
                f'<a class="folder-item" href="{href}"{target_attr}>'
                f'<span class="folder-left">{icon}<span class="folder-name">{html.escape(name)}</span></span>'
                f'<small dir="ltr">{meta}</small></a>'
            )

        page = render_server_shell(
            page_title=f"مرورگر پوشه — {display_path}",
            crumb=display_path,
            right_action="",
            content=f'<div class="folder-list">{"".join(rows)}</div>',
        ).encode("utf-8")
        f = io.BytesIO(page)
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(page)))
        self.end_headers()
        return f

    def do_GET(self):
        parsed = urllib.parse.urlsplit(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path in ("/", ""):
            self.send_response(302)
            self.send_header("Location", "/dashboard.html")
            self.end_headers()
            return

        if path == "/api/progress":
            with LOCK:
                if PROGRESS_FILE.exists():
                    data = PROGRESS_FILE.read_bytes()
                else:
                    data = b"{}"
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return

        # Render .md files as clean responsive HTML unless ?raw=1
        if path.lower().endswith(".md") and query.get("raw", ["0"])[0] != "1":
            rel = urllib.parse.unquote(path).lstrip("/")
            target = (BASE_DIR / rel).resolve()
            if not str(target).startswith(str(BASE_DIR)) or not target.is_file():
                self.send_error(404, "File not found")
                return
            try:
                md_text = target.read_text(encoding="utf-8")
                rendered = markdown_to_html(md_text, target.name, path + "?raw=1").encode("utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(rendered)))
                self.end_headers()
                self.wfile.write(rendered)
            except Exception as ex:
                self.send_error(500, str(ex))
            return

        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlsplit(self.path)
        if parsed.path == "/api/progress":
            try:
                length = int(self.headers.get("Content-Length", "0"))
                raw = self.rfile.read(length)
                obj = json.loads(raw.decode("utf-8"))
                if not isinstance(obj, dict):
                    raise ValueError("Expected JSON object")
                encoded = json.dumps(obj, ensure_ascii=False, indent=2).encode("utf-8")
                with LOCK:
                    PROGRESS_FILE.write_bytes(encoded)
                resp = b'{"ok":true}'
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(resp)))
                self.end_headers()
                self.wfile.write(resp)
            except Exception as ex:
                err = json.dumps({"ok": False, "error": str(ex)}).encode("utf-8")
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.send_header("Content-Length", str(len(err)))
                self.end_headers()
                self.wfile.write(err)
            return
        self.send_error(404, "Not found")


def get_lan_ips():
    ips = set()
    try:
        for info in socket.getaddrinfo(socket.gethostname(), None, socket.AF_INET):
            ip = info[4][0]
            if not ip.startswith("127.") and not ip.startswith("169.254."):
                ips.add(ip)
    except Exception:
        pass
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        if ip and not ip.startswith("127."):
            ips.add(ip)
        s.close()
    except Exception:
        pass
    return sorted(ips)


def main():
    mimetypes.add_type("application/pdf", ".pdf")
    mimetypes.add_type("font/woff2", ".woff2")
    mimetypes.add_type("text/css; charset=utf-8", ".css")
    mimetypes.add_type("application/javascript; charset=utf-8", ".js")
    mimetypes.add_type("application/json; charset=utf-8", ".json")
    mimetypes.add_type("application/manifest+json; charset=utf-8", ".webmanifest")
    mimetypes.add_type("image/png", ".png")
    server = ThreadingHTTPServer(("0.0.0.0", PORT), DashboardHandler)
    ips = get_lan_ips()
    print("=" * 62, flush=True)
    print("  Arshad AI 1406 Dashboard - Network Server Running", flush=True)
    print("=" * 62, flush=True)
    print(f"  PC (Local):   http://localhost:{PORT}/dashboard.html", flush=True)
    for ip in ips:
        print(f"  Phone (LAN):  http://{ip}:{PORT}/dashboard.html", flush=True)
    print("-" * 62, flush=True)
    print("  Progress sync file: progress_state.json", flush=True)
    print("  Press Ctrl+C to stop the server.", flush=True)
    print("=" * 62, flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        server.server_close()


if __name__ == "__main__":
    main()
