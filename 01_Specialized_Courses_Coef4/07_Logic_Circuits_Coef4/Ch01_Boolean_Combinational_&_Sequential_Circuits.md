<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱، ۲ و ۳: خلاصه جامع فرمول‌ها، مدارهای ترکیبی و ترتیبی در مدار منطقی

---

## ۱. سیستم‌های اعداد، کد گری، جبر بول و توابع خاص

- **۱. تبدیل کد دودویی (<span dir="ltr">`B_{n-1} ... B_0`</span>) به کد گری (<span dir="ltr">`G_{n-1} ... G_0`</span>) و برعکس:**
  - باینری به گری: باارزش‌ترین بیت را عیناً بنویس (<span dir="ltr">`G_{n-1} = B_{n-1}`</span>) و هر بیت را با بیت قبلی‌اش <span dir="ltr">`XOR`</span> کن: **<span dir="ltr">`G_i = B_{i+1} ⊕ B_i`</span>**.
  - گری به باینری: باارزش‌ترین بیت را بنویس و هر بیت گری را با **خروجی باینریِ مرحله قبل** <span dir="ltr">`XOR`</span> کن: **<span dir="ltr">`B_i = B_{i+1} ⊕ G_i`</span>**.
- **۲. تعداد توابع بولی با <span dir="ltr">`n`</span> متغیر (جدول صحت دارای <span dir="ltr">`2^n`</span> سطر):**
  - تعداد کل توابع بولی <span dir="ltr">`n`</span> متغیره: **<span dir="ltr">`2^(2^n)`</span>**
  - **تابع خوددوگان (<span dir="ltr">`Self-Dual`</span> — تابعی که <span dir="ltr">`F = F^D`</span>):**
    - در هر تابع خوددوگان، به ازای هر سطر جدول صحت و سطر متمم آن، خروجی‌ها باید برعکس هم باشند؛ بنابراین دقیقاً **نیمی از مینترم‌ها (<span dir="ltr">`2^(n-1)`</span> سطر) برابر ۱ و نیم دیگر برابر ۰ هستند!**
    - تعداد توابع خوددوگان <span dir="ltr">`n`</span> متغیره: **<span dir="ltr">`2^(2^(n - 1))`</span>**
- **۳. خواص عملگرهای <span dir="ltr">`XOR (⊕)`</span> و <span dir="ltr">`XNOR (⊙)`</span> (بسیار پرتکرار):**
  - اگر تعداد متغیرها (<span dir="ltr">`n`</span>) **فرد** باشد، عبارت <span dir="ltr">`x1 ⊕ x2 ⊕ ... ⊕ xn`</span> دقیقاً با عبارت <span dir="ltr">`x1 ⊙ x2 ⊙ ... ⊙ xn`</span> **برابر است**! و اگر <span dir="ltr">`n`</span> **زوج** باشد، این دو عبارت **متمم یکدیگرند**!
  - در جدول کارنو، تابع <span dir="ltr">`XOR / XNOR`</span> به شکل **صفحه شطرنجی** است و هیچ دو خانه ۱ مجاور ندارد (قابل ساده‌سازی نیست و دارای <span dir="ltr">`2^(n-1)`</span> ایمپلیکنت اول است).

---

## ۲. مدارهای ترکیبی (<span dir="ltr">`Combinational Circuits`</span>)

- **۱. ساخت درخت مالتی‌پلکسر یا دیکدر بزرگ از قطعات کوچک:**
  - برای ساخت مالتی‌پلکسر <span dir="ltr">`N × 1`</span> با استفاده از مالتی‌پلکسرهای کوچک <span dir="ltr">`k × 1`</span> (یا ساخت دیکدر با ورودی فعال‌ساز <span dir="ltr">`Enable`</span>):
  - در هر طبقه تعداد خطوط بر <span dir="ltr">`k`</span> تقسیم می‌شود تا به ۱ برسد:
  - فرمول مجموع قطعات: **<span dir="ltr">`Total = (N / k) + (N / k^2) + ... + 1 = (N - 1) / (k - 1)`</span>**
- **۲. مقایسه حافظه‌های قابل برنامه‌ریزی (<span dir="ltr">`ROM, PAL, PLA`</span>):**
  - حافظه **<span dir="ltr">`ROM`</span>**: طبقه <span dir="ltr">`AND`</span> ثابت (دیکدر کامل) + طبقه <span dir="ltr">`OR`</span> قابل برنامه‌ریزی.
  - مدار **<span dir="ltr">`PAL`</span>**: طبقه <span dir="ltr">`AND`</span> قابل برنامه‌ریزی + طبقه <span dir="ltr">`OR`</span> ثابت.
  - مدار **<span dir="ltr">`PLA`</span>**: **هر دو طبقه <span dir="ltr">`AND`</span> و <span dir="ltr">`OR`</span> قابل برنامه‌ریزی** (منعطف‌ترین!).

---

## ۳. فلیپ‌فلاپ‌ها، شمارنده‌ها و ماشین‌های حالت (<span dir="ltr">`Mealy`</span> و <span dir="ltr">`Moore`</span>)

### الف) معادله مشخصه ۴ فلیپ‌فلاپ استاندارد (حالت بعدی <span dir="ltr">`Q(t+1)`</span>):
- **۱. فلیپ‌فلاپ <span dir="ltr">`D`</span>:** معادله <span dir="ltr">`Q(t+1) = D`</span>
- **۲. فلیپ‌فلاپ <span dir="ltr">`T`</span>:** معادله <span dir="ltr">`Q(t+1) = T ⊕ Q`</span> (وقتی <span dir="ltr">`T=1`</span> باشد، حالت متمم می‌شود).
- **۳. فلیپ‌فلاپ <span dir="ltr">`SR`</span>:** معادله <span dir="ltr">`Q(t+1) = S + R' Q`</span> (به شرط <span dir="ltr">`S . R = 0`</span>).
- **۴. فلیپ‌فلاپ <span dir="ltr">`JK`</span>:** معادله **<span dir="ltr">`Q(t+1) = J Q' + K' Q`</span>** (در حالت <span dir="ltr">`J=1, K=1`</span> حالت فلیپ‌فلاپ متمم <span dir="ltr">`Q'`</span> می‌شود).

### ب) شمارنده‌ها (<span dir="ltr">`Counters`</span>) و تقسیم فرکانس
- اگر یک شمارنده دارای پیمانه **<span dir="ltr">`Mod-N`</span>** (یعنی <span dir="ltr">`N`</span> حالت مختلف در چرخه اصلی) باشد و فرکانس پالس ساعت ورودی <span dir="ltr">`f_in`</span> باشد، فرکانس سیگنال خروجی باارزش‌ترین بیت برابر است با:
  - فرمول تقسیم فرکانس: **<span dir="ltr">`f_out = f_in / N`</span>**
- **مقایسه ۳ شمارنده معروف با <span dir="ltr">`n`</span> فلیپ‌فلاپ:**
  - ۱. **شمارنده دودویی کامل:** پیمانه **<span dir="ltr">`2^n`</span>** حالت.
  - ۲. **شمارنده حلقوی (<span dir="ltr">`Ring Counter`</span>):** پیمانه **<span dir="ltr">`n`</span>** حالت (<span dir="ltr">`2^n - n`</span> حالت بلااستفاده دارد).
  - ۳. **شمارنده جانسون (<span dir="ltr">`Johnson / Twisted Ring Counter`</span> — فیدبک از <span dir="ltr">`Q'`</span> طبقه آخر به <span dir="ltr">`D`</span> طبقه اول):** پیمانه **<span dir="ltr">`2n`</span>** حالت (<span dir="ltr">`2^n - 2n`</span> حالت بلااستفاده دارد).

### پ) تفاوت ماشین میلی (<span dir="ltr">`Mealy`</span>) و مور (<span dir="ltr">`Moore`</span>)
- **ماشین مور (<span dir="ltr">`Moore`</span>):** خروجی **فقط تابعی از حالت فعلی** است (خروجی داخل دایره حالت نوشته می‌شود و سنکرون با کلاک تغییر می‌کند؛ معمولاً ۱ حالت بیشتر از میلی دارد).
- **ماشین میلی (<span dir="ltr">`Mealy`</span>):** خروجی **تابعی از حالت فعلی و ورودی‌های فعلی** است (خروجی روی یال‌ها نوشته می‌شود و با تغییر آسنکرون ورودی ممکن است بین دو کلاک دچار پرش یا <span dir="ltr">`Glitch`</span> شود).

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن فرمول تعداد توابع خوددوگان <span dir="ltr">`2^(2^(n-1))`</span> و خواص <span dir="ltr">`XOR / XNOR`</span>
- [ ] حفظ کردن معادله مشخصه فلیپ‌فلاپ <span dir="ltr">`JK`</span> (<span dir="ltr">`J Q' + K' Q`</span>) و پیمانه شمارنده جانسون (<span dir="ltr">`2n`</span>)
- [ ] تمرین استخراج دنباله حالات یک مدار ترتیبی سنکرون و تشخیص پیمانه شمارش آن

</div>
