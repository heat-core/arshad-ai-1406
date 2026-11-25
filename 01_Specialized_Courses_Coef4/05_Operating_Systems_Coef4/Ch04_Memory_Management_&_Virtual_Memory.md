<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۴: مدیریت حافظه اصلی، صفحه‌بندی (<span dir="ltr">`Paging`</span>) و حافظه مجازی

این فصل با **۲ تا ۳ تست در هر کنکور**، پرتست‌ترین بخش درس سیستم‌عامل است.

---

## ۱. فرمول‌های طلایی صفحه‌بندی (<span dir="ltr">`Paging`</span>) و جدول صفحه

اگر آدرس منطقی (مجازی) <span dir="ltr">`m`</span> بیت، آدرس فیزیکی <span dir="ltr">`p`</span> بیت و اندازه هر صفحه/قاب (<span dir="ltr">`Page / Frame Size`</span>) برابر <span dir="ltr">`2^d`</span> بایت باشد:
- **۱. تعداد بیت‌های جابه‌جایی درون صفحه (<span dir="ltr">`Offset`</span>):** برابر **<span dir="ltr">`d`</span> بیت** است (در تبدیل آدرس مجازی به فیزیکی، این <span dir="ltr">`d`</span> بیت بدون تغییر کپی می‌شود!).
- **۲. تعداد بیت‌های شماره صفحه منطقی (<span dir="ltr">`Page Number`</span>):** برابر **<span dir="ltr">`m - d`</span> بیت** ← تعداد ورودی‌های جدول صفحه یک فرآیند برابر **<span dir="ltr">`2^(m - d)`</span>** است.
- **۳. تعداد بیت‌های شماره قاب فیزیکی (<span dir="ltr">`Frame Number`</span>):** برابر **<span dir="ltr">`p - d`</span> بیت** ← تعداد کل قاب‌های حافظه فیزیکی برابر **<span dir="ltr">`2^(p - d)`</span>** است.
- **۴. حجم جدول صفحه یک فرآیند (<span dir="ltr">`Page Table Size`</span>):**
  - فرمول: **<span dir="ltr">`تعداد صفحات منطقی × اندازه هر درایه (PTE)`</span>** یعنی **<span dir="ltr">`2^(m - d) * PTE_Size`</span>**.
- **۵. جدول صفحه معکوس (<span dir="ltr">`Inverted Page Table`</span>):**
  - به جای اینکه به ازای هر صفحه مجازی یک سطر داشته باشد، **در کل سیستم فقط ۱ جدول دارد که به ازای هر قاب فیزیکی (<span dir="ltr">`2^(p - d)`</span>) یک درایه دارد!** (حجم جدول مستقل از تعداد فرآیندها و اندازه فضای مجازی است، ولی زمان جست‌وجو بدون جدول درهم‌سازی زیاد است).

---

## ۲. زمان دسترسی موثر به حافظه (<span dir="ltr">`EAT`</span>) با حضور <span dir="ltr">`TLB`</span> و نقص صفحه (<span dir="ltr">`Page Fault`</span>)

- **الف) صفحه‌بندی یک‌سطحی با <span dir="ltr">`TLB`</span> (بدون نقص صفحه):**
  - اگر زمان دسترسی به <span dir="ltr">`TLB`</span> برابر <span dir="ltr">`t`</span>، زمان دسترسی به حافظه اصلی برابر <span dir="ltr">`m`</span> و نرخ اصابت (<span dir="ltr">`Hit Ratio`</span>) در <span dir="ltr">`TLB`</span> برابر <span dir="ltr">`α`</span> باشد:
  - در صورت اصابت در <span dir="ltr">`TLB`</span>: فقط ۱ دسترسی به حافظه برای داده لازم است (<span dir="ltr">`t + m`</span>).
  - در صورت خطا در <span dir="ltr">`TLB`</span> (با احتمال <span dir="ltr">`1 - α`</span>): ۲ دسترسی به حافظه لازم است (یکی برای خواندن جدول صفحه، یکی برای خواندن داده: <span dir="ltr">`t + 2m`</span>).
  - فرمول خلاصه (در صفحه‌بندی <span dir="ltr">`k`</span>-سطحی):
    - **<span dir="ltr">`EAT = t + m + (1 - α) * k * m`</span>**
- **ب) زمان دسترسی موثر با احتمال نقص صفحه (<span dir="ltr">`Page Fault Rate = p`</span>):**
  - فرمول: **<span dir="ltr">`EAT = (1 - p) * (زمان دسترسی به حافظه) + p * (زمان سرویس نقص صفحه از دیسک)`</span>**

---

## ۳. الگوریتم‌های جایگزینی صفحه در حافظه مجازی

- **۱. الگوریتم بهینه (<span dir="ltr">`Optimal / Belady`</span>):** صفحه‌ای را خارج کن که تا دیرترین زمان در آینده به آن رجوع نمی‌شود (کمترین نقص صفحه ممکن؛ غیرقابل پیاده‌سازی واقعی).
- **۲. الگوریتم <span dir="ltr">`FIFO`</span>:** قدیمی‌ترین صفحه واردشده را خارج کن.
  - **ناهنجاری بلدی (<span dir="ltr">`Belady's Anomaly`</span>):** در <span dir="ltr">`FIFO`</span> ممکن است با **افزایش تعداد قاب‌های حافظه**، تعداد نقص صفحه (<span dir="ltr">`Page Fault`</span>) به جای کاهش، **افزایش یابد!**
- **۳. الگوریتم <span dir="ltr">`LRU`</span> (کمترین استفاده اخیراً):** صفحه‌ای را خارج کن که بیشترین زمان از آخرین استفاده آن گذشته است.
  - الگوریتم‌های **<span dir="ltr">`LRU`</span> و <span dir="ltr">`Optimal`</span> جزو الگوریتم‌های پشته‌ای (<span dir="ltr">`Stack Algorithms`</span>)** هستند و **هرگز دچار ناهنجاری بلدی نمی‌شوند!**
- **۴. کوبیدگی (<span dir="ltr">`Thrashing`</span>):** زمانی رخ می‌دهد که مجموع اندازه مجموعه‌های کاری (<span dir="ltr">`Working Sets`</span>) فرآیندهای فعال از کل قاب‌های فیزیکی بیشتر شود و سیستم مدام مشغول تعویض صفحه (<span dir="ltr">`Swapping`</span>) با دیسک باشد؛ در این حالت بهره‌وری <span dir="ltr">`CPU`</span> به شدت سقوط می‌کند. راه‌حل: **کاهش درجه چندبرنامگی (<span dir="ltr">`Degree of Multiprogramming`</span>)**.

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] تمرین محاسبه تعداد سطوح و حجم جدول صفحه در سیستم‌های ۳۲ و ۶۴ بیتی
- [ ] حفظ کردن فرمول <span dir="ltr">`EAT`</span> برای صفحه‌بندی چندسطحی و نقص صفحه
- [ ] تمرین ردیابی یک رشته ارجاع صفحه با الگوریتم‌های <span dir="ltr">`FIFO, LRU, Optimal`</span> و شانس دوم (<span dir="ltr">`Clock`</span>)

</div>
