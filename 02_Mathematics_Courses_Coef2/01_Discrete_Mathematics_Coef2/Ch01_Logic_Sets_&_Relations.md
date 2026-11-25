<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱: منطق، مجموعه‌ها، روابط و ترتیب جزئی (<span dir="ltr">`Logic, Relations & Posets`</span>)

جدول شمارش روابط روی یک مجموعه <span dir="ltr">`n`</span> عضوی یکی از پرتکرارترین سوالات تاریخ کنکور ارشد کامپیوتر است.

---

## ۱. جدول طلایی شمارش روابط و توابع

فرض کنید مجموعه <span dir="ltr">`A`</span> دارای <span dir="ltr">`n`</span> عضو و مجموعه <span dir="ltr">`B`</span> دارای <span dir="ltr">`m`</span> عضو باشد:
- **تعداد کل توابع از <span dir="ltr">`A`</span> به <span dir="ltr">`B`</span>:** برابر **<span dir="ltr">`m^n`</span>**
- **تعداد توابع یک‌به‌یک (<span dir="ltr">`One-to-One / Injective`</span>) از <span dir="ltr">`A`</span> به <span dir="ltr">`B`</span> (به شرط <span dir="ltr">`n ≤ m`</span>):** برابر **<span dir="ltr">`P(m, n) = m! / (m - n)!`</span>**
- **تعداد توابع اکیداً صعودی (یا اکیداً نزولی) از <span dir="ltr">`A`</span> به <span dir="ltr">`B`</span>:** برابر **<span dir="ltr">`C(m, n)`</span>**
- **تعداد توابع صعودی (غیراکید، یعنی <span dir="ltr">`f(x) ≤ f(y)`</span>) از <span dir="ltr">`A`</span> به <span dir="ltr">`B`</span>:** برابر **<span dir="ltr">`C(m + n - 1, n)`</span>**
- **تعداد توابع پوشا (<span dir="ltr">`Onto / Surjective`</span>) از <span dir="ltr">`A`</span> به <span dir="ltr">`B`</span> (به شرط <span dir="ltr">`n ≥ m`</span>):** برابر **<span dir="ltr">`m! * S(n, m)`</span>** (که <span dir="ltr">`S(n, m)`</span> عدد استرلینگ نوع دوم است).

### جدول شمارش انواع روابط دودویی روی مجموعه <span dir="ltr">`A`</span> با <span dir="ltr">`n`</span> عضو (<span dir="ltr">`n × n`</span> خانه در ماتریس رابطه):
*(تعداد عناصر قطر اصلی <span dir="ltr">`n`</span> عدد و تعداد جفت‌عناصر غیرقطری <span dir="ltr">`n(n - 1) / 2`</span> جفت است)*

| نوع رابطه روی مجموعه <span dir="ltr">`n`</span> عضوی | فرمول تعداد کل روابط | توضیح سریع ماتریسی |
| :--- | :---: | :--- |
| **کل روابط دودویی** | **<span dir="ltr">`2^(n^2)`</span>** | هر یک از <span dir="ltr">`n^2`</span> درایه ماتریس ۲ حالت (۰ یا ۱) دارد |
| **بازتابی (<span dir="ltr">`Reflexive`</span>)** | **<span dir="ltr">`2^(n^2 - n) = 2^(n(n-1))`</span>** | قطر اصلی حتماً باید ۱ باشد؛ بقیه <span dir="ltr">`n^2 - n`</span> درایه آزادند |
| **ضدبازتابی (<span dir="ltr">`Irreflexive`</span>)** | **<span dir="ltr">`2^(n^2 - n)`</span>** | قطر اصلی حتماً باید ۰ باشد |
| **تقارنی (<span dir="ltr">`Symmetric`</span>)** | **<span dir="ltr">`2^(n(n + 1) / 2)`</span>** | قطر اصلی (<span dir="ltr">`n`</span>) + بالای قطر (<span dir="ltr">`n(n-1)/2`</span>) آزادند |
| **پادمتقارن (<span dir="ltr">`Antisymmetric`</span>)** | **<span dir="ltr">`2^n * 3^(n(n - 1) / 2)`</span>** | قطر اصلی ۲ حالت؛ هر جفتِ متقارنِ غیرقطری ۳ حالت: <span dir="ltr">`(0,0), (1,0), (0,1)`</span> |
| **نامتقارن (<span dir="ltr">`Asymmetric`</span> = ضدبازتابی و پادمتقارن)** | **<span dir="ltr">`3^(n(n - 1) / 2)`</span>** | قطر اصلی حتماً ۰ (۱ حالت)؛ هر جفت غیرقطری ۳ حالت |
| **هم بازتابی و هم تقارنی** | **<span dir="ltr">`2^(n(n - 1) / 2)`</span>** | قطر اصلی ۱؛ بالای قطر آزاد |
| **هم بازتابی و هم پادمتقارن** | **<span dir="ltr">`3^(n(n - 1) / 2)`</span>** | قطر اصلی ۱؛ هر جفت غیرقطری ۳ حالت |
| **هم تقارنی و هم پادمتقارن** | **<span dir="ltr">`2^n`</span>** | تمام درایه‌های غیرقطری باید ۰ باشند؛ فقط قطر اصلی آزاد است! |
| **رابطه هم‌ارزی (یا تعداد افرازهای مجموعه <span dir="ltr">`n`</span> عضوی)** | **عدد بل <span dir="ltr">`B_n = ∑ S(n, k)`</span>** | مقادیر مهم بل: <span dir="ltr">`B_1=1, B_2=2, B_3=5, B_4=15, B_5=52`</span> |

---

## ۲. روابط هم‌ارزی، ترتیب جزئی (<span dir="ltr">`Poset`</span>) و توری (<span dir="ltr">`Lattice`</span>)

- **رابطه هم‌ارزی (<span dir="ltr">`Equivalence Relation`</span>):** بازتابی + تقارنی + ترایا (<span dir="ltr">`Transitive`</span>). مجموعه را به کلاس‌های هم‌ارزی مجزا افراز می‌کند.
- **رابطه ترتیب جزئی (<span dir="ltr">`Partial Order`</span>):** بازتابی + **پادمتقارن** + ترایا (مثل رابطه تقسیم‌پذیری <span dir="ltr">`a | b`</span> روی اعداد طبیعی یا زیرمجموعه بودن <span dir="ltr">`⊆`</span>).
- **عناصر خاص در نمودار هاسه (<span dir="ltr">`Hasse Diagram`</span>):**
  - **عنصر ماکسیمال (<span dir="ltr">`Maximal`</span>):** عنصری که هیچ عنصری بالاتر از آن نباشد (می‌تواند چند تا باشد).
  - **عنصر بیشینه / بزرگ‌ترین (<span dir="ltr">`Greatest`</span>):** عنصری که از **تمام** عناصر دیگر مجموعه بزرگ‌تر باشد (اگر وجود داشته باشد، **یکتا** است!).
  - **توری (<span dir="ltr">`Lattice`</span>):** مجموعه‌ای با ترتیب جزئی که در آن هر جفت عنصر دارای **کوچک‌ترین کران بالا (<span dir="ltr">`LUB / Join`</span>)** و **بزرگ‌ترین کران پایین (<span dir="ltr">`GLB / Meet`</span>)** یکتا باشند.

---

## ۳. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن جدول فرمول‌های شمارش روابط (به‌ویژه پادمتقارن <span dir="ltr">`2^n * 3^(n(n-1)/2)`</span> و اعداد بل <span dir="ltr">`1, 2, 5, 15, 52`</span>)
- [ ] تمرین تشخیص توری بودن (<span dir="ltr">`Lattice`</span>) و یافتن عناصر مینیمال/ماکسیمال روی نمودار هاسه
- [ ] تسلط بر الگوریتم وارشال برای محاسبه بستار ترایایی (<span dir="ltr">`Transitive Closure`</span>)

</div>
