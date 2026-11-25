<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۲: متغیرهای تصادفی توام، قضیه حد مرکزی، فاصله اطمینان و آزمون فرض آماری

با بررسی مستقیم دفترچه سوالات کنکور ارشد سال‌های اخیر (از جمله سوالات ۳۷، ۳۸ و ۳۹ کنکور ۱۴۰۳)، هر سال **۲ سوال مستقیم** از انتگرال توزیع توام پیوسته، فاصله اطمینان و آماره آزمون فرض مطرح می‌شود.

---

## ۱. متغیرهای تصادفی توام پیوسته <span dir="ltr">`f_{X,Y}(x, y)`</span>

- **۱. چگالی حاشیه‌ای (<span dir="ltr">`Marginal PDF`</span>):**
  - فرمول: <span dir="ltr">`f_X(x) = ∫ f_{X,Y}(x, y) dy`</span> (انتگرال روی کل متغیر دیگر).
- **۲. شرط استقلال دو متغیر تصادفی از روی تابع چگالی توام (تست ۱۰ ثانیه‌ای کنکور!):**
  - متغیرهای <span dir="ltr">`X`</span> و <span dir="ltr">`Y`</span> مستقل‌اند اگر و تنها اگر اولاً **دامنه تغییرات (ناحیه غیرصفر) آن‌ها یک مستطیل موازی با محورها** باشد (مرزهای <span dir="ltr">`x`</span> به <span dir="ltr">`y`</span> وابسته نباشند) و ثانیاً تابع چگالی به صورت حاصل‌ضرب دو تابع مجزا <span dir="ltr">`g(x) * h(y)`</span> تفکیک شود!
  - *مثال مستقیم سوال ۳۷ کنکور ۱۴۰۳:* تابع <span dir="ltr">`f(x,y) = e^{-(x+y)}`</span> برای <span dir="ltr">`x>0, y>0`</span> تفکیک می‌شود به <span dir="ltr">`e^{-x} * e^{-y}`</span>؛ یعنی <span dir="ltr">`X ~ Exp(1)`</span> و <span dir="ltr">`Y ~ Exp(1)`</span> مستقل‌اند! بنابراین برای محاسبه <span dir="ltr">`P(X < Y | X < 2Y)`</span> کافی است احتمال <span dir="ltr">`P(X < Y) = 1/2`</span> را بر <span dir="ltr">`P(X < 2Y) = 2 / (1 + 2) = 2/3`</span> تقسیم کنیم که در ۱۰ ثانیه جواب **<span dir="ltr">`3/4`</span>** به دست می‌آید!

---

## ۲. قضیه حد مرکزی (<span dir="ltr">`CLT`</span>) و فاصله اطمینان (<span dir="ltr">`Confidence Interval`</span>)

برای نمونه تصادفی به حجم <span dir="ltr">`n`</span> از جامعه‌ای با میانگین <span dir="ltr">`μ`</span> و انحراف معیار <span dir="ltr">`σ`</span>:
- میانگین نمونه **<span dir="ltr">`X_bar`</span>** دارای امید ریاضی **<span dir="ltr">`E[X_bar] = μ`</span>** و انحراف معیار (خطای استاندارد) **<span dir="ltr">`σ_{X_bar} = σ / sqrt(n)`</span>** است.
- متغیر استانداردشده: **<span dir="ltr">`Z = (X_bar - μ) / (σ / sqrt(n)) ~ N(0, 1)`</span>**
- **فرمول فاصله اطمینان دوطرفه با سطح اطمینان <span dir="ltr">`1 - α`</span> (مثلاً ۹۰ درصد که <span dir="ltr">`α = 0.10`</span> و <span dir="ltr">`α/2 = 0.05`</span> است):**
  - دام کنکوری (سوال ۳۸ کنکور ۱۴۰۳): برای فاصله اطمینان دوطرفه با احتمال <span dir="ltr">`1 - α = 0.90`</span>، باید از صدک **<span dir="ltr">`Z_{1 - α/2} = Φ^-1(0.95) = 1.64`</span>** استفاده کنید (نه از <span dir="ltr">`Φ^-1(0.90) = 1.28`</span>!):
  - رابطه: **<span dir="ltr">`P( -Z_{α/2} * (σ / sqrt(n)) ≤ X_bar - μ ≤ +Z_{α/2} * (σ / sqrt(n)) ) = 1 - α`</span>**
  - *حل سوال ۳۸ کنکور ۱۴۰۳:* با <span dir="ltr">`σ = 6`</span>، <span dir="ltr">`n = 100`</span> و سطح اطمینان <span dir="ltr">`0.90`</span>، خطای استاندارد برابر <span dir="ltr">`6 / 10 = 0.6`</span> و بازه برابر <span dir="ltr">`± 1.64 × 0.6 = ± 0.984`</span> است!

---

## ۳. آزمون فرض آماری (<span dir="ltr">`Hypothesis Testing`</span>) و آزمون زوجی (<span dir="ltr">`Paired Test`</span>)

- **۱. آماره آزمون میانگین یک جامعه:**
  - فرمول: **<span dir="ltr">`T = (X_bar - μ_0) / (S / sqrt(n))`</span>**
- **۲. آزمون تفاضل زوجی (قبل و بعد از یک آزمایش روی یک گروه <span dir="ltr">`n`</span> نفری — سوال ۳۹ کنکور ۱۴۰۳!):**
  - وقتی دو متغیر <span dir="ltr">`X`</span> و <span dir="ltr">`Y`</span> روی **همان افراد** اندازه‌گیری می‌شوند (وابسته هستند)، متغیر تفاضل <span dir="ltr">`D = X - Y`</span> تعریف می‌شود:
  - میانگین تفاضل: **<span dir="ltr">`d_bar = x_bar - y_bar`</span>**
  - واریانس نمونه تفاضل (با کوواریانس <span dir="ltr">`S_{xy}`</span>):
    - فرمول طلایی: **<span dir="ltr">`S_d^2 = S_x^2 + S_y^2 - 2 S_{xy}`</span>**
  - آماره آزمون <span dir="ltr">`H_0: μ_d = 0`</span>:
    - فرمول: **<span dir="ltr">`t = d_bar / (S_d / sqrt(n))`</span>**
  - *حل سوال ۳۹ کنکور ۱۴۰۳:* با <span dir="ltr">`n=16`</span>، <span dir="ltr">`d_bar = 3`</span>، <span dir="ltr">`S_x^2 = 26, S_y^2 = 25, S_{xy} = -24.5`</span>:
    - داریم <span dir="ltr">`S_d^2 = 26 + 25 - 2(-24.5) = 51 + 49 = 100  ==>  S_d = 10`</span>.
    - آماره آزمون: <span dir="ltr">`t = 3 / (10 / sqrt(16)) = 3 / (10 / 4) = 1.2`</span>!

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] تسلط بر فرمول <span dir="ltr">`P(X < aY) = a / (1 + a)`</span> برای دو متغیر نمایی مستقل یکسان
- [ ] تسلط بر تفاوت <span dir="ltr">`Z_{α}`</span> (یک‌طرفه) و <span dir="ltr">`Z_{α/2}`</span> (دوطرفه) در فاصله اطمینان
- [ ] حفظ کردن فرمول واریانس تفاضل زوجی <span dir="ltr">`S_d^2 = S_x^2 + S_y^2 - 2 S_{xy}`</span> و آماره آزمون <span dir="ltr">`t`</span>

</div>
