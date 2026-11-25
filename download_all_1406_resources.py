#!/usr/bin/env python3
"""
Standalone Resumable Downloader & Extractor for Arshad_AI_1406 Free Resources.
Run directly via: python download_all_1406_resources.py (or double-click Download_Resources.bat).
Tip: Turn off VPN temporarily if downloads from Iranian hosts (youseficlass.ir) are slow.
"""

import os
import shutil
import subprocess
import urllib.parse
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent

ITEMS = [
    (
        "01_Specialized_Courses_Coef4/07_Logic_Circuits_Coef4/Downloads",
        "Jozveh_Logic_Circuits.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2022/12/pdf-manteghi-amoozesh.rar",
    ),
    (
        "01_Specialized_Courses_Coef4/08_Computer_Architecture_Coef4/Downloads",
        "Jozveh_Computer_Architecture.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2024/10/pdf-memari-amoozesh.rar",
    ),
    (
        "02_Mathematics_Courses_Coef2/01_Discrete_Mathematics_Coef2/Downloads",
        "Jozveh_Discrete_Math.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2022/12/pdfdis-gosasteh-amoozesh.rar",
    ),
    (
        "02_Mathematics_Courses_Coef2/01_Discrete_Mathematics_Coef2/Downloads",
        "TestBank_Discrete_Math.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2024/11/pdf-gosasteh-test.rar",
    ),
    (
        "01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/Downloads",
        "Jozveh_AI_Derafsheh.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2024/11/آخرین-جزوه-آموزش-هوش-استاد-درفشه-آپدیت-مرداد.rar",
    ),
    (
        "01_Specialized_Courses_Coef4/01_Artificial_Intelligence_Coef4/Downloads",
        "TestBank_AI_Derafsheh.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2024/07/ai-derafsheh-test.rar",
    ),
    (
        "01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/Downloads",
        "Jozveh_Data_Structures_Yousefi.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2024/07/pdf-amoozesh-sakhteman-ostad-yousefi.rar",
    ),
    (
        "01_Specialized_Courses_Coef4/02_Data_Structures_Coef4/Downloads",
        "Nokteh_Test_DS_Algo.zip",
        "https://www.youseficlass.ir/wp-content/uploads/2024/10/نکته-تست-ساختمان-داده-طراحی-الگوریتم-آپدیت-8.zip",
    ),
    (
        "01_Specialized_Courses_Coef4/06_Theory_of_Languages_&_Automata_Coef4/Downloads",
        "TestBank_Automata.rar",
        "https://www.youseficlass.ir/wp-content/uploads/2024/07/nztest.rar",
    ),
]


def find_extractor():
    candidates = [
        shutil.which("unrar"),
        shutil.which("rar"),
        shutil.which("7z"),
        r"C:\Program Files\WinRAR\UnRAR.exe",
        r"C:\Program Files (x86)\WinRAR\UnRAR.exe",
        r"C:\Program Files\7-Zip\7z.exe",
        shutil.which("tar"),
    ]
    for c in candidates:
        if c and os.path.exists(c):
            return c
    return None


def encode_url(raw_url: str) -> str:
    p = urllib.parse.urlsplit(raw_url)
    path = urllib.parse.quote(p.path, safe="/%")
    return urllib.parse.urlunsplit((p.scheme, p.netloc, path, p.query, p.fragment))


def is_valid_archive(path: Path, extractor=None) -> bool:
    if not path.exists() or path.stat().st_size < 10_000:
        return False
    hdr = path.read_bytes()[:4]
    if hdr == b"PK\x03\x04":
        try:
            with zipfile.ZipFile(path, "r") as zf:
                return zf.testzip() is None
        except Exception:
            return False
    if hdr == b"Rar!" and extractor and ("unrar" in extractor.lower() or extractor.lower().endswith("rar.exe")):
        r = subprocess.run([extractor, "t", "-p-", str(path)], capture_output=True)
        return r.returncode == 0
    return hdr in (b"Rar!", b"PK\x03\x04", b"%PDF")


def extract_archive(arc_path: Path, dest_dir: Path, extractor):
    sub = dest_dir / arc_path.stem
    sub.mkdir(parents=True, exist_ok=True)
    if arc_path.suffix.lower() == ".zip":
        with zipfile.ZipFile(arc_path, "r") as zf:
            zf.extractall(sub)
        return True, sub
    if not extractor:
        return False, sub
    exe = extractor.lower()
    if "unrar" in exe or exe.endswith("rar.exe"):
        r = subprocess.run([extractor, "x", "-o+", str(arc_path), str(sub) + os.sep], capture_output=True, text=True)
    elif "7z" in exe:
        r = subprocess.run([extractor, "x", "-y", f"-o{sub}", str(arc_path)], capture_output=True, text=True)
    else:
        r = subprocess.run([extractor, "-xf", str(arc_path), "-C", str(sub)], capture_output=True, text=True)
    return (r.returncode == 0), sub


def main():
    extractor = find_extractor()
    print("=" * 64)
    print("  Arshad AI 1406 - Free Notes & Test Banks Downloader")
    print("=" * 64)
    print(f"  Target root : {ROOT}")
    print(f"  RAR tool    : {extractor or 'Not found (only .zip will extract)'}")
    print("  Tip         : If speed is slow on youseficlass.ir, pause VPN!")
    print("=" * 64)

    ok_count = 0
    fail_list = []

    for idx, (rel_dir, fname, raw_url) in enumerate(ITEMS, 1):
        dest_dir = ROOT / rel_dir
        dest_dir.mkdir(parents=True, exist_ok=True)
        out_file = dest_dir / fname
        url = encode_url(raw_url)
        print(f"\n[{idx}/{len(ITEMS)}] {fname}")
        print(f"    Folder: {rel_dir}")

        if is_valid_archive(out_file, extractor):
            size_mb = out_file.stat().st_size / (1024 * 1024)
            print(f"    Already downloaded & verified ({size_mb:.2f} MB) - checking extraction...")
        else:
            cmd = [
                "curl.exe", "-fL", "-C", "-", "--progress-bar",
                "--retry", "3", "--connect-timeout", "20",
                "-A", "Mozilla/5.0",
                url, "-o", str(out_file),
            ]
            res = subprocess.run(cmd)
            if res.returncode != 0 or not is_valid_archive(out_file, extractor):
                print(f"    [ERROR] Download failed or corrupt archive for {fname}.")
                if out_file.exists() and not is_valid_archive(out_file, extractor):
                    out_file.unlink()
                fail_list.append(fname)
                continue

        ok, sub = extract_archive(out_file, dest_dir, extractor)
        pdfs = list(sub.rglob("*.pdf"))
        size_mb = out_file.stat().st_size / (1024 * 1024)
        print(f"    [OK] {size_mb:.2f} MB | Extracted={ok} | PDFs found={len(pdfs)}")
        ok_count += 1

    print("\n" + "=" * 64)
    print(f"  FINISHED: {ok_count}/{len(ITEMS)} succeeded.")
    if fail_list:
        print("  Failed items (re-run script to retry):", ", ".join(fail_list))
    else:
        print("  All archives downloaded and extracted cleanly!")
    print("=" * 64)


if __name__ == "__main__":
    main()
