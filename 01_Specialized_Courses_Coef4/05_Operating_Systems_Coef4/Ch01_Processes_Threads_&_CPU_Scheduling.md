<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱: فرآیندها، نخ‌ها (<span dir="ltr">`Threads`</span>) و الگوریتم‌های زمان‌بندی <span dir="ltr">`CPU`</span>

---

## ۱. فرآیندها و دستور <span dir="ltr">`fork()`</span> (سوال پرتکرار کنکور)

- **۱. اجرای <span dir="ltr">`n`</span> دستور <span dir="ltr">`fork()`</span> متوالی بدون شرط:**
  - تعداد کل فرآیندها (شامل فرآیند پدر اولیه): **<span dir="ltr">`2^n`</span>**
  - تعداد فرآیندهای **جدید (فرزند)** ایجادشده: **<span dir="ltr">`2^n - 1`</span>**
- **۲. مقدار بازگشتی <span dir="ltr">`fork()`</span>:**
  - در فرآیند **فرزند** برابر **<span dir="ltr">`0`</span>** است.
  - در فرآیند **پدر** برابر **شناسه فرزند (<span dir="ltr">`PID > 0`</span>)** است.
  - در صورت شکست، مقدار منفی برمی‌گرداند.
- **۳. تکنیک حل تست‌های <span dir="ltr">`fork()`</span> در عبارات منطقی <span dir="ltr">`&&`</span> و <span dir="ltr">`||`</span> (ارزیابی اتصال کوتاه در زبان <span dir="ltr">`C`</span>):**
  - در عبارت <span dir="ltr">`A && B`</span>: اگر <span dir="ltr">`A`</span> صفر (نادرست، یعنی در فرآیند **فرزند**) باشد، بخش <span dir="ltr">`B`</span> دیگر اجرا نمی‌شود!
  - در عبارت <span dir="ltr">`A || B`</span>: اگر <span dir="ltr">`A`</span> غیرصفر (درست، یعنی در فرآیند **پدر**) باشد، بخش <span dir="ltr">`B`</span> دیگر اجرا نمی‌شود!

---

## ۲. نخ‌ها (<span dir="ltr">`Threads`</span>): چه چیزهایی مشترک است و چه چیزهایی مستقل؟

- **منابع مشترک بین نخ‌های یک فرآیند:** بخش کد (<span dir="ltr">`Code`</span>)، داده‌های سراسری/ایستا (<span dir="ltr">`Data`</span>)، حافظه پویا (<span dir="ltr">`Heap`</span>) و فایل‌های باز (<span dir="ltr">`Open Files`</span>).
- **منابع اختصاصی (مستقل) هر نخ:** شمارنده برنامه (<span dir="ltr">`PC`</span>)، ثبات‌ها (<span dir="ltr">`Registers`</span>)، **پشته (<span dir="ltr">`Stack`</span>)** و شناسه نخ (<span dir="ltr">`TID`</span>).
- **مقایسه نخ سطح کاربر (<span dir="ltr">`ULT`</span>) و نخ سطح هسته (<span dir="ltr">`KLT`</span>):**
  - در <span dir="ltr">`ULT`</span> (مدل چند به یک): تعویض متن بسیار سریع است (بدون دخالت هسته و بدون تغییر مد)، اما **اگر یک نخ فراخوانی سیستمی مسدودکننده (<span dir="ltr">`Blocking System Call`</span>) بزند، کل فرآیند و تمام نخ‌هایش مسدود می‌شوند!** همچنین امکان اجرای موازی واقعی روی چند هسته پردازنده وجود ندارد.

---

## ۳. الگوریتم‌های زمان‌بندی پردازنده (<span dir="ltr">`CPU Scheduling`</span>)

- **زمان برگشت (<span dir="ltr">`Turnaround Time`</span>):** زمان پایان منهای زمان ورود (<span dir="ltr">`Completion - Arrival`</span>).
- **زمان انتظار (<span dir="ltr">`Waiting Time`</span>):** زمان برگشت منهای زمان اجرای پردازنده (<span dir="ltr">`Turnaround - Burst Time`</span>).

| الگوریتم زمان‌بندی | انحصاری یا قبضه‌پذیر؟ | گرسنگی (<span dir="ltr">`Starvation`</span>) دارد؟ | ویژگی طلایی و دام تستی |
| :--- | :---: | :---: | :--- |
| **خروج به ترتیب ورود (<span dir="ltr">`FCFS`</span>)** | غیرقبضه‌پذیر (<span dir="ltr">`Non-preemptive`</span>) | **خیر** | دچار **اثر قافله (<span dir="ltr">`Convoy Effect`</span>)** می‌شود |
| **کوتاه‌ترین کار بعدی (<span dir="ltr">`SJF`</span>)** | غیرقبضه‌پذیر | **بله** (برای کارهای طولانی) | کمترین میانگین زمان انتظار در بین الگوریتم‌های غیرقبضه‌پذیر |
| **کوتاه‌ترین زمان باقیمانده (<span dir="ltr">`SRTF`</span>)** | قبضه‌پذیر (<span dir="ltr">`Preemptive`</span>) | **بله** | **کمترین میانگین زمان انتظار مطلق** را در بین تمام الگوریتم‌ها دارد! |
| **نوبتی (<span dir="ltr">`Round Robin - RR`</span>)** | قبضه‌پذیر (با کوانتوم <span dir="ltr">`q`</span>) | **خیر** | اگر <span dir="ltr">`q -> ∞`</span> شود تبدیل به <span dir="ltr">`FCFS`</span> می‌شود؛ اگر <span dir="ltr">`q`</span> خیلی کوچک باشد سربار تعویض متن (<span dir="ltr">`Context Switch`</span>) شدید می‌شود |
| **بالاترین نسبت پاسخ (<span dir="ltr">`HRRN`</span>)** | غیرقبضه‌پذیر | **خیر!** (چون با انتظار، اولویت بالا می‌رود) | فرمول نسبت پاسخ: <span dir="ltr">`RR = (W + S) / S = 1 + (W / S)`</span> که <span dir="ltr">`W`</span> انتظار و <span dir="ltr">`S`</span> زمان اجراست |

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] تمرین ۳ تست شمارش فرآیند در دستورات <span dir="ltr">`fork()`</span> دارای حلقه و شرط <span dir="ltr">`&& / ||`</span>
- [ ] حفظ کردن اقلام مشترک (<span dir="ltr">`Code, Data, Heap, Files`</span>) و مستقل (<span dir="ltr">`Stack, Registers, PC`</span>) در نخ‌ها
- [ ] تمرین رسم نمودار گانت و محاسبه زمان انتظار برای <span dir="ltr">`SRTF`</span>، <span dir="ltr">`RR`</span> و <span dir="ltr">`HRRN`</span>

</div>
