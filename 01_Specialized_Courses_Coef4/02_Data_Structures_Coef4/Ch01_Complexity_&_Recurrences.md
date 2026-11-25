<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱: تحلیل پیچیدگی زمانی، نمادهای مجانبی و روابط بازگشتی

هر سال ۱ تا ۲ تست مستقیم از مقایسه مرتبه رشد توابع یا حل رابطه بازگشتی در کنکور ارشد مطرح می‌شود و حل بقیه تست‌های ساختمان داده و الگوریتم نیز به این فصل وابسته است.

---

## ۱. نمادهای مجانبی (<span dir="ltr">`Asymptotic Notations`</span>)

- **۱. نماد <span dir="ltr">`O(g(n))`</span> (کران بالای مجانبی — <span dir="ltr">`≤`</span>):** رشد تابع <span dir="ltr">`f(n)`</span> حداکثر به اندازه <span dir="ltr">`g(n)`</span> است.
- **۲. نماد <span dir="ltr">`Ω(g(n))`</span> (کران پایین مجانبی — <span dir="ltr">`≥`</span>):** رشد تابع <span dir="ltr">`f(n)`</span> حداقل به اندازه <span dir="ltr">`g(n)`</span> است.
- **۳. نماد <span dir="ltr">`Θ(g(n))`</span> (کران هم‌مرتبه — <span dir="ltr">`=`</span>):** زمانی که هم <span dir="ltr">`f(n) = O(g(n))`</span> و هم <span dir="ltr">`f(n) = Ω(g(n))`</span> برقرار باشد.
- **۴. نمادهای اکید <span dir="ltr">`o(g(n))`</span> و <span dir="ltr">`ω(g(n))`</span>:** زمانی که حد نسبت <span dir="ltr">`lim f(n)/g(n)`</span> در بی‌نهایت به ترتیب برابر **۰** یا **<span dir="ltr">`∞`</span>** شود.

### زنجیره طلایی مقایسه رشد توابع (از کمترین به بیشترین در <span dir="ltr">`n -> ∞`</span>):
- ترتیب رشد:
  - <span dir="ltr">`1 < log(log n) < log n < (log n)^k < n^0.001 < sqrt(n) < n < n log n < n^2 < n^k < 2^n < 3^n < n! < n^n`</span>
- **تکنیک تستی لگاریتم‌گیری:** برای مقایسه دو تابع پیچیده (مثل <span dir="ltr">`n^(log n)`</span> و <span dir="ltr">`2^(sqrt(n))`</span>)، از هر دو در مبنای ۲ لگاریتم بگیرید:
  - لگاریتم اولی: <span dir="ltr">`(log n)^2`</span>
  - لگاریتم دومی: <span dir="ltr">`sqrt(n)`</span>
  - چون <span dir="ltr">`sqrt(n)`</span> سریع‌تر از هر توانی از لگاریتم رشد می‌کند، پس <span dir="ltr">`2^(sqrt(n))`</span> بزرگ‌تر است!

---

## ۲. سری‌های پرتکرار در تحلیل حلقه‌ها

- **۱. سری حسابی:** <span dir="ltr">`1 + 2 + ... + n = n(n+1)/2 = Θ(n^2)`</span>
- **۲. سری هارمونیک (بسیار مهم):** <span dir="ltr">`1 + 1/2 + 1/3 + ... + 1/n = ln(n) + O(1) = Θ(log n)`</span>
- **۳. سری لگاریتم факتوریل (تقریب استرلینگ):** <span dir="ltr">`log(1) + log(2) + ... + log(n) = log(n!) = Θ(n log n)`</span>
- **۴. سری هندسی:** اگر قدر نسبت ثابت <span dir="ltr">`r > 1`</span> باشد، مجموع برابر با جمله آخر یعنی <span dir="ltr">`Θ(r^n)`</span> است؛ اگر <span dir="ltr">`0 < r < 1`</span> باشد، مجموع برابر با عدد ثابت <span dir="ltr">`Θ(1)`</span> است.

---

## ۳. حل روابط بازگشتی و قضیه اصلی (<span dir="ltr">`Master Theorem`</span>)

برای رابطه بازگشتی به فرم استاندارد <span dir="ltr">`T(n) = a T(n/b) + f(n)`</span> (که در آن <span dir="ltr">`a ≥ 1`</span> و <span dir="ltr">`b > 1`</span>):
ابتدا توان بحرانی **<span dir="ltr">`c = log_b(a)`</span>** را حساب کرده و تابع پایه **<span dir="ltr">`n^c`</span>** را با <span dir="ltr">`f(n)`</span> مقایسه می‌کنیم:

- **حالت ۱ (غالب بودن برگ‌ها):** اگر <span dir="ltr">`f(n) = O(n^(c - ε))`</span> باشد (یعنی <span dir="ltr">`f(n)`</span> به‌طور چندجمله‌ای کوچک‌تر از <span dir="ltr">`n^c`</span> باشد)، آنگاه:
  - جواب: **<span dir="ltr">`T(n) = Θ(n^c)`</span>**
- **حالت ۲ (برابری با ضریب لگاریتمی):** اگر <span dir="ltr">`f(n) = Θ(n^c * (log n)^k)`</span> به ازای <span dir="ltr">`k ≥ 0`</span> باشد، آنگاه:
  - جواب: **<span dir="ltr">`T(n) = Θ(n^c * (log n)^(k + 1))`</span>**
  - *(استثنای مهم تستی: اگر <span dir="ltr">`k = -1`</span> باشد، یعنی <span dir="ltr">`f(n) = Θ(n^c / log n)`</span>، جواب برابر <span dir="ltr">`Θ(n^c * log(log n))`</span> می‌شود و اگر <span dir="ltr">`k < -1`</span> باشد، جواب همان <span dir="ltr">`Θ(n^c)`</span> است!)*
- **حالت ۳ (غالب بودن ریشه):** اگر <span dir="ltr">`f(n) = Ω(n^(c + ε))`</span> باشد (به‌طور چندجمله‌ای بزرگ‌تر از <span dir="ltr">`n^c`</span> و شرط منظمی برقرار باشد)، آنگاه:
  - جواب: **<span dir="ltr">`T(n) = Θ(f(n))`</span>**

### روابط بازگشتی کاهشی و تغییر متغیر (فوق‌پرتکرار):
- ۱. رابطه <span dir="ltr">`T(n) = T(n-1) + f(n)`</span> ← تبدیل به مجموع: <span dir="ltr">`T(n) = ∑ f(i)`</span> از ۱ تا <span dir="ltr">`n`</span>.
- ۲. رابطه <span dir="ltr">`T(n) = 2 T(n-1) + 1`</span> ← جواب: **<span dir="ltr">`Θ(2^n)`</span>** (برج هانوی).
- ۳. رابطه <span dir="ltr">`T(n) = 2 T(sqrt(n)) + log n`</span> ← با تغییر متغیر <span dir="ltr">`n = 2^m`</span> (یعنی <span dir="ltr">`m = log n`</span>) تبدیل به <span dir="ltr">`S(m) = 2 S(m/2) + m`</span> می‌شود که طبق قضیه اصلی برابر <span dir="ltr">`Θ(m log m)`</span> و پس از بازگشت متغیر برابر **<span dir="ltr">`Θ(log n * log(log n))`</span>** است!

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] تسلط بر مقایسه توابع با روش لگاریتم‌گیری
- [ ] حفظ کردن هر ۳ حالت قضیه اصلی + استثنای <span dir="ltr">`n^c / log n`</span>
- [ ] تسلط بر تغییر متغیر <span dir="ltr">`n = 2^m`</span> در روابط شامل <span dir="ltr">`T(sqrt(n))`</span>

</div>
