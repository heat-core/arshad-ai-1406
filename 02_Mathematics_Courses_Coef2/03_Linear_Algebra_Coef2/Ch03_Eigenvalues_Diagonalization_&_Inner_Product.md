<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۳: مقادیر ویژه، قطری‌سازی (<span dir="ltr">`Diagonalization`</span>)، کیلی-همیلتون و فضای ضرب داخلی

---

## ۱. مقادیر ویژه، تعدد جبری و هندسی و شرط قطری‌شدن ماتریس

برای مقدار ویژه <span dir="ltr">`λ`</span> از ماتریس <span dir="ltr">`A_{n × n}`</span> (ریشه معادله مشخصه <span dir="ltr">`det(A - λI) = 0`</span>):
- **۱. تعدد جبری (<span dir="ltr">`Algebraic Multiplicity - AM`</span>):** مرتبه تکرار ریشه <span dir="ltr">`λ`</span> در چندجمله‌ای مشخصه.
- **۲. تعدد هندسی (<span dir="ltr">`Geometric Multiplicity - GM`</span>):** تعداد بردارهای ویژه مستقل خطی متناظر با <span dir="ltr">`λ`</span> که برابر است با بعد فضای ویژه:
  - فرمول طلایی: **<span dir="ltr">`GM(λ) = dim(Null(A - λI)) = n - rank(A - λI)`</span>**
- **۳. نامساوی بنیادی بین تعدد جبری و هندسی:**
  - برای هر مقدار ویژه همیشه داریم: **<span dir="ltr">`1 ≤ GM(λ) ≤ AM(λ)`</span>**
- **۴. شرط لازم و کافی برای قطری‌شدن ماتریس (<span dir="ltr">`A = P D P^-1`</span> — سوال حتمی کنکور!):**
  - ماتریس <span dir="ltr">`A_{n × n}`</span> قطری‌پذیر است اگر و تنها اگر <span dir="ltr">`n`</span> بردار ویژه مستقل خطی داشته باشد؛ یعنی **به ازای هر مقدار ویژه <span dir="ltr">`λ`</span>، تعدد هندسی با تعدد جبری برابر باشد (<span dir="ltr">`GM(λ) == AM(λ)`</span>)!**
  - نتیجه ۱ (شرط کافی سریع): اگر ماتریس <span dir="ltr">`n × n`</span> دارای **<span dir="ltr">`n`</span> مقدار ویژه متمایز** باشد، **تضمیناً قطری‌پذیر است!**
  - نتیجه ۲: هر **ماتریس متقارن حقیقی (<span dir="ltr">`A^T = A`</span>)** همیشه (حتی با مقادیر ویژه تکراری!) به صورت **متعامد قطری‌پذیر است (<span dir="ltr">`A = Q D Q^T`</span>)**!

---

## ۲. قضیه کیلی-همیلتون (<span dir="ltr">`Cayley-Hamilton Theorem`</span>)

- **صورت قضیه:** هر ماتریس مربعی در معادله مشخصه خودش صدق می‌کند!
  - مثلاً برای ماتریس <span dir="ltr">`2 × 2`</span>، معادله مشخصه همیشه به فرم زیر است:
  - فرمول طلایی ماتریس <span dir="ltr">`2 × 2`</span>: **<span dir="ltr">`λ^2 - Trace(A) * λ + det(A) = 0`</span>**
  - و طبق کیلی-همیلتون: **<span dir="ltr">`A^2 - Trace(A) * A + det(A) * I = 0`</span>**
  - کاربرد تستی: محاسبه توان‌های بالای ماتریس (مثل <span dir="ltr">`A^10`</span>) یا نوشتن <span dir="ltr">`A^-1`</span> بر حسب توان‌های مثبت <span dir="ltr">`A`</span> بدون معکوس‌گیری!

---

## ۳. ماتریس‌های معین مثبت (<span dir="ltr">`Positive Definite - PD`</span>) و فضای ضرب داخلی

برای ماتریس متقارن حقیقی <span dir="ltr">`A`</span>:
- **چهار شرط هم‌ارز برای معین مثبت بودن (<span dir="ltr">`x^T A x > 0`</span> به ازای هر <span dir="ltr">`x ≠ 0`</span>):**
  - ۱. **تمام مقادیر ویژه <span dir="ltr">`A`</span> اکیداً مثبت باشند (<span dir="ltr">`λ_i > 0`</span>).**
  - ۲. **آزمون سیلوستر:** تمام دترمینان‌های زیرماتریس‌های پیشرو اصلی (از بالا-چپ: <span dir="ltr">`Δ_1, Δ_2, ..., Δ_n`</span>) **اکیداً مثبت** باشند!
  - ۳. تمام عناصر محوری (<span dir="ltr">`Pivots`</span>) در حذف گاوسی بدون جابه‌جایی سطری مثبت باشند.
  - ۴. تجزیه چولسکی <span dir="ltr">`A = L L^T`</span> (یا <span dir="ltr">`A = R^T R`</span> با <span dir="ltr">`R`</span> دارای ستون‌های مستقل) وجود داشته باشد.
- **تصویر متعامد بردار <span dir="ltr">`b`</span> روی بردار <span dir="ltr">`a`</span> و فرایند گرام-اشمیت:**
  - فرمول تصویر: **<span dir="ltr">`proj_a(b) = [ (a^T b) / (a^T a) ] * a`</span>**
  - فرمول ماتریس تصویر متعامد روی فضای ستونی <span dir="ltr">`A`</span> (معادلات نرمال کمترین مربعات):
    - رابطه: **<span dir="ltr">`P = A (A^T A)^-1 A^T`</span>** (که خودتوان و متقارن است: <span dir="ltr">`P^2 = P`</span> و <span dir="ltr">`P^T = P`</span>).

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن فرمول تعدد هندسی <span dir="ltr">`GM(λ) = n - rank(A - λI)`</span> و شرط قطری‌شدن <span dir="ltr">`GM == AM`</span>
- [ ] حفظ کردن معادله مشخصه ماتریس <span dir="ltr">`2 × 2`</span> (<span dir="ltr">`λ^2 - Trace(A) λ + det(A) = 0`</span>) و قضیه کیلی-همیلتون
- [ ] تسلط بر آزمون دترمینان‌های پیشرو (سیلوستر) برای تشخیص ماتریس معین مثبت

</div>
