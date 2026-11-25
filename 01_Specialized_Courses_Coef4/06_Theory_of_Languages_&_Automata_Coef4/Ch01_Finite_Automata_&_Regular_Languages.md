<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱: اتوماتای متناهی (<span dir="ltr">`DFA / NFA`</span>) و زبان‌های منظم (<span dir="ltr">`Regular Languages`</span>)

---

## ۱. نکات طلایی <span dir="ltr">`DFA`</span> و <span dir="ltr">`NFA`</span>

- **هم‌ارزی قدرت:** قدرت پذیرش <span dir="ltr">`DFA`</span>، <span dir="ltr">`NFA`</span>، <span dir="ltr">`λ-NFA`</span>، عبارات منظم (<span dir="ltr">`Regular Expressions`</span>) و گرامرهای خطی راست (یا خطی چپ) **دقیقاً با هم برابر است** و همگی خانواده **زبان‌های منظم (<span dir="ltr">`Regular Languages`</span>)** را می‌پذیرند.
- **تبدیل <span dir="ltr">`NFA`</span> با <span dir="ltr">`n`</span> حالت به <span dir="ltr">`DFA`</span>:** در بدترین حالت دارای **<span dir="ltr">`2^n`</span>** حالت است (مثال کلاسیک: زبان رشته‌هایی که <span dir="ltr">`n`</span>-امین حرف از آخرشان <span dir="ltr">`a`</span> باشد، با <span dir="ltr">`NFA`</span> دارای <span dir="ltr">`n+1`</span> حالت و با کمترین <span dir="ltr">`DFA`</span> دارای دقیقاً **<span dir="ltr">`2^n`</span>** حالت است!).
- **مکمل کردن <span dir="ltr">`DFA`</span> در برابر <span dir="ltr">`NFA`</span> (دام پرتکرار کنکور!):**
  - در یک **<span dir="ltr">`DFA`</span> کامل**: با عوض کردن جای حالت‌های پایانی و غیرپایانی (<span dir="ltr">`F`</span> و <span dir="ltr">`Q - F`</span>)، دقیقاً ماشین پذیرنده زبان مکمل (<span dir="ltr">`L_bar`</span>) به دست می‌آید.
  - در یک **<span dir="ltr">`NFA`</span>**: با عوض کردن جای حالت‌های پایانی و غیرپایانی، زبان مکمل به دست **نمی‌آید**! (چون در <span dir="ltr">`NFA`</span> یک رشته ممکن است چند مسیر داشته باشد که یکی به حالت پایانی و دیگری به غیرپایانی برود).

---

## ۲. تکنیک ۳۰ ثانیه‌ای تشخیص منظم بودن یا نبودن یک زبان در کنکور

اتوماتای متناهی **حافظه بی‌نهایت ندارد** و فقط می‌تواند تا سقف ثابتی بشمارد یا باقی‌مانده تقسیم (پیمانه <span dir="ltr">`mod k`</span>) را نگه دارد:
- **۱. زبان‌های متناهی (دارای تعداد متناهی رشته، یا دارای کران بالای ثابت مثلاً <span dir="ltr">`{a^n b^n | n ≤ 10^100}`</span>):** **همیشه ۱۰۰ درصد منظم هستند!** (دام بسیار معروف کنکور!).
- **۲. شمارش پیمانه‌ای (<span dir="ltr">`mod k`</span>) یا زوج و فرد بودن تعداد کاراکترها:** همیشه **منظم** است (مثلاً <span dir="ltr">`n_a(w) mod 3 == n_b(w) mod 5`</span> منظم است و کمینه <span dir="ltr">`DFA`</span> آن <span dir="ltr">`3 * 5 = 15`</span> حالت دارد).
- **۳. مقایسه نامحدود تعداد دو بخش (<span dir="ltr">`{a^n b^n | n ≥ 0}`</span> یا <span dir="ltr">`{w | n_a(w) == n_b(w)}`</span> یا <span dir="ltr">`{a^n b^m | n ≠ m}`</span>):** چون نیاز به شمارش تا بی‌نهایت دارد، **منظم نیست** (بلکه مستقل از متن قطعی <span dir="ltr">`DCFL`</span> است).
- **۴. توان‌های غیرخطی یا اول روی یک حرف (<span dir="ltr">`{a^(n^2)}`</span>، <span dir="ltr">`{a^(2^n)}`</span>، <span dir="ltr">`{a^p | p اول است}`</span>، <span dir="ltr">`{a^(n!)}`</span>):** چون فاصله بین طول‌های متوالی به بی‌نهایت میل می‌کند، طبق لم تزریق نه تنها منظم نیستند، بلکه حتی **مستقل از متن (<span dir="ltr">`CFL`</span>) هم نیستند!** (بلکه حساس به متن <span dir="ltr">`CSL`</span> هستند).

### ترفند دام‌های ظاهراً غیرمنظم که در واقع منظم هستند!
- مثال ۱: زبان <span dir="ltr">`L = {u w w^R v | u, v, w ∈ {a,b}+}`</span>
  - با اینکه در ظاهر <span dir="ltr">`w w^R`</span> (پالیندروم زوج) دارد، اما چون <span dir="ltr">`w`</span> می‌تواند فقط به طول ۱ باشد (یعنی <span dir="ltr">`aa`</span> یا <span dir="ltr">`bb`</span>) و بقیه رشته در <span dir="ltr">`u`</span> و <span dir="ltr">`v`</span> جذب شوند، این زبان همان زبانِ «تمام رشته‌های دارای زیررشته <span dir="ltr">`aa`</span> یا <span dir="ltr">`bb`</span>» است که **منظم است!**
- مثال ۲: اگر در تعریف زبان، مجموع یا تفاضل به شکل کلی همیشه قابل ساده‌سازی به یک شرط منظم باشد، قبل از قضاوت چند رشته کوچک امتحان کنید.

---

## ۳. چک‌لیست مطالعه این فصل

- [ ] تمرین کمینه‌سازی <span dir="ltr">`DFA`</span> با روش افراز (جداسازی حالات هم‌ارز)
- [ ] حفظ کردن دام زبان‌های متناهی (<span dir="ltr">`n ≤ K`</span>) و دام <span dir="ltr">`u w w^R v`</span>
- [ ] تسلط بر تبدیل گرامر خطی راست به <span dir="ltr">`NFA`</span> و برعکس (توجه: اگر گرامر هم قواعد خطی راست و هم خطی چپ با هم داشته باشد، دیگر منظم نیست و مستقل از متن خطی است!)

</div>
