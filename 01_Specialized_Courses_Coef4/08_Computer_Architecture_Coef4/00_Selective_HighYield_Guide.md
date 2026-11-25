<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# راهنمای گزینشی و درس‌نامه فصل‌های پرتکرار درس معماری کامپیوتر (ضریب ۲ — سطح ۲)

در برنامه ۵ ماهه گرایش هوش مصنوعی، به جای خواندن کل کتاب معماری کامپیوتر، فقط **۴ مبحث زیر** را بخوانید که بیش از **۷۵ درصد سوالات کنکور ارشد** از آن‌ها طرح می‌شود و به شدت فرمولی و زودبازده هستند.

---

## ۱. مبحث اول: حافظه نهان (<span dir="ltr">`Cache Memory`</span>) — هر سال ۱ تا ۲ تست قطعی!

فرض کنید حافظه اصلی دارای آدرس فیزیکی **<span dir="ltr">`m`</span> بیت** (ظرفیت <span dir="ltr">`2^m`</span> بایت)، اندازه هر بلاک کش برابر **<span dir="ltr">`B = 2^b`</span> بایت** و تعداد کل خطوط (بلاک‌های) کش برابر **<span dir="ltr">`L = 2^l`</span>** باشد:

### الف) تقسیم‌بندی بیت‌های آدرس در ۳ روش نگاشت کش:
- **۱. نگاشت مستقیم (<span dir="ltr">`Direct Mapped`</span>):**
  - فیلد افست کلمه/بایت درون بلاک (<span dir="ltr">`Offset`</span>): **<span dir="ltr">`b`</span> بیت**
  - فیلد شماره خط کش (<span dir="ltr">`Index / Line`</span>): **<span dir="ltr">`l`</span> بیت**
  - فیلد برچسب (<span dir="ltr">`Tag`</span>): **<span dir="ltr">`m - l - b`</span> بیت**
- **۲. نگاشت کاملاً انجمنی (<span dir="ltr">`Fully Associative`</span>):**
  - فیلد <span dir="ltr">`Offset`</span>: برابر **<span dir="ltr">`b`</span> بیت**
  - فیلد <span dir="ltr">`Index`</span>: ندارد (**۰ بیت**)
  - فیلد <span dir="ltr">`Tag`</span>: برابر **<span dir="ltr">`m - b`</span> بیت**
- **۳. نگاشت مجموعه‌ای انجمنی <span dir="ltr">`k`</span>-تایی (<span dir="ltr">`k-Way Set Associative`</span> که <span dir="ltr">`k = 2^d`</span>):**
  - تعداد مجموعه‌ها (<span dir="ltr">`Sets`</span>): برابر <span dir="ltr">`S = L / k = 2^(l - d)`</span>
  - فیلد <span dir="ltr">`Offset`</span>: برابر **<span dir="ltr">`b`</span> بیت**
  - فیلد شماره مجموعه (<span dir="ltr">`Set Index`</span>): برابر **<span dir="ltr">`l - d`</span> بیت**
  - فیلد <span dir="ltr">`Tag`</span>: برابر **<span dir="ltr">`m - (l - d) - b`</span> بیت** (هرچه <span dir="ltr">`k`</span> دو برابر شود، ۱ بیت از <span dir="ltr">`Index`</span> کم شده و ۱ بیت به <span dir="ltr">`Tag`</span> اضافه می‌شود!).

### ب) فرمول کل بیت‌های سخت‌افزاری لازم برای ساخت حافظه کش (سوال محبوب کنکور!):
حجم کل بیت‌های کش فقط داده نیست! بلکه شامل **بیت‌های داده + بیت‌های <span dir="ltr">`Tag`</span> + بیت معتبر (<span dir="ltr">`Valid`</span>) + بیت کثیف (<span dir="ltr">`Dirty`</span> در روش <span dir="ltr">`Write-Back`</span>)** در هر خط است:
- فرمول: **<span dir="ltr">`Total_Cache_Bits = L × (Data_Bits_Per_Block + Tag_Bits + Valid_Bit + Dirty_Bit)`</span>**
- *(دام تستی: در روش <span dir="ltr">`Write-Through`</span> بیت <span dir="ltr">`Dirty`</span> نیاز نیست؛ اما در روش <span dir="ltr">`Write-Back`</span> به ازای هر خط کش ۱ بیت <span dir="ltr">`Dirty`</span> اضافه می‌شود!)*

---

## ۲. مبحث دوم: معادله کارایی پردازنده، <span dir="ltr">`CPI`</span> و قانون آمدال (<span dir="ltr">`Amdahl's Law`</span>)

- **۱. زمان اجرای برنامه (<span dir="ltr">`CPU Time`</span>):**
  - فرمول: **<span dir="ltr">`CPU_Time = IC × CPI × T_clock = (IC × CPI) / f`</span>**
  - که <span dir="ltr">`IC`</span> تعداد دستورات اجرایی‌شده، <span dir="ltr">`CPI`</span> میانگین سیکل بر دستور و <span dir="ltr">`T_clock`</span> دوره تناوب کلاک است.
- **۲. قانون آمدال (افزایش سرعت کل در صورت بهبود بخشی از سیستم):**
  - اگر کسری از زمان اجرا به اندازه **<span dir="ltr">`f`</span>** (بین ۰ و ۱) به اندازه **<span dir="ltr">`S`</span> برابر** سریع‌تر شود، افزایش سرعت کل (<span dir="ltr">`Speedup`</span>) برابر است با:
  - فرمول: **<span dir="ltr">`Speedup = 1 / [ (1 - f) + (f / S) ]`</span>**
  - حداکثر افزایش سرعت ممکن وقتی <span dir="ltr">`S -> ∞`</span> میل کند برابر است با: **<span dir="ltr">`1 / (1 - f)`</span>**.

---

## ۳. مبحث سوم: خط لوله (<span dir="ltr">`Pipeline`</span>) و مخاطرات (<span dir="ltr">`Hazards`</span>)

- **زمان اجرای <span dir="ltr">`n`</span> دستور در یک خط لوله <span dir="ltr">`k`</span> مرحله‌ای بدون توقف (<span dir="ltr">`Stall`</span>) با کلاک <span dir="ltr">`τ`</span>:**
  - اولین دستور پس از **<span dir="ltr">`k`</span>** سیکل و <span dir="ltr">`n - 1`</span> دستور بعدی هر کدام در **۱ سیکل** خارج می‌شوند:
  - تعداد کل سیکل‌ها: **<span dir="ltr">`Total_Cycles = k + (n - 1)`</span>**
  - افزایش سرعت ایده‌آل در <span dir="ltr">`n -> ∞`</span> (اگر مراحل کاملاً متوازن باشند و رجیسترهای بین‌مرحله‌ای تاخیر نداشته باشند): برابر با تعداد مراحل یعنی **<span dir="ltr">`k`</span> برابر**.
- **سه نوع مخاطره (<span dir="ltr">`Hazard`</span>) در خط لوله:**
  - ۱. **ساختاری (<span dir="ltr">`Structural`</span>):** کمبود منبع سخت‌افزاری (مثلاً حافظه مشترک برای دستور و داده؛ حل با تفکیک کش دستور و داده).
  - ۲. **داده‌ای (<span dir="ltr">`Data Hazard`</span> — وابستگی <span dir="ltr">`RAW`</span>):** دستور بعدی به نتیجه دستور قبلی نیاز دارد؛ با **اتصال کوتاه / پیش‌رانی (<span dir="ltr">`Forwarding / Bypassing`</span>)** در اکثر موارد بدون توقف حل می‌شود، **به جز دستور <span dir="ltr">`Load-Use`</span>** (خواندن از حافظه و استفاده بلافاصله در دستور بعد) که حتی با <span dir="ltr">`Forwarding`</span> هم نیاز به **۱ سیکل حباب (<span dir="ltr">`Stall`</span>)** دارد!
  - ۳. **کنترلی (<span dir="ltr">`Control Hazard`</span>):** ناشی از دستورات پرش شرطی (<span dir="ltr">`Branch`</span>).

---

## ۴. مبحث چهارم: استاندارد ممیز شناور <span dir="ltr">`IEEE 754`</span> (دقت معمولی ۳۲ بیتی)

- ساختار ۳۲ بیت: **۱ بیت علامت (<span dir="ltr">`S`</span>) + ۸ بیت نما با بایاس ۱۲۷ (<span dir="ltr">`E`</span>) + ۲۳ بیت مانتیس (<span dir="ltr">`M`</span>)**.
- فرمول مقدار عدد نرمال‌شده (<span dir="ltr">`1 ≤ E ≤ 254`</span>):
  - رابطه: **<span dir="ltr">`Value = (-1)^S × (1.M)_2 × 2^(E - 127)`</span>**
- حالت‌های خاص:
  - <span dir="ltr">`E = 0, M = 0`</span> ← عدد **صفر** (<span dir="ltr">`±0`</span>).
  - <span dir="ltr">`E = 255, M = 0`</span> ← **بی‌نهایت** (<span dir="ltr">`±∞`</span>).
  - <span dir="ltr">`E = 255, M ≠ 0`</span> ← مقدار **نامعتبر (<span dir="ltr">`NaN`</span>)**.

---

## ۵. چک‌لیست مطالعه گزینشی معماری کامپیوتر

- [ ] تسلط کامل بر تقسیم‌بندی بیت‌های <span dir="ltr">`Tag / Index / Offset`</span> و فرمول کل بیت‌های حافظه کش
- [ ] حفظ کردن فرمول <span dir="ltr">`CPU Time`</span> و قانون آمدال
- [ ] تسلط بر فرمول <span dir="ltr">`k + n - 1`</span> در خط لوله و مخاطره <span dir="ltr">`Load-Use`</span>

</div>
