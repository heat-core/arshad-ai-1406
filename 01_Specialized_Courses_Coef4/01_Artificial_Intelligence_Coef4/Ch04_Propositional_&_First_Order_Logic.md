<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۴: منطق گزاره‌ای، منطق مرتبه اول (<span dir="ltr">`FOL`</span>) و استنتاج

از این فصل در کنکور ارشد هر سال **۱ تا ۲ سوال** طرح می‌شود که محور اصلی آن‌ها قوانین هم‌ارزی منطقی، تبدیل به فرم نرمال عطفی (<span dir="ltr">`CNF`</span>)، یکسان‌سازی (<span dir="ltr">`Unification`</span>) و قاعده استنتاج رزولوشن (<span dir="ltr">`Resolution`</span>) است.

---

## ۱. تعاریف پایه در منطق و استنتاج

- **۱. استلزام منطقی (<span dir="ltr">`Entailment: KB |= α`</span>):** پایگاه دانش <span dir="ltr">`KB`</span> جمله <span dir="ltr">`α`</span> را نتیجه می‌دهد اگر و تنها اگر در **تمام مدل‌هایی (تخصیص‌های ارزش) که <span dir="ltr">`KB`</span> در آن‌ها درست است، <span dir="ltr">`α`</span> نیز درست باشد**.
- **۲. صحت یا سازگاری الگوریتم استنتاج (<span dir="ltr">`Soundness`</span>):** هر چیزی که الگوریتم استنتاج اثبات می‌کند (<span dir="ltr">`KB |- α`</span>)، واقعاً از نظر منطقی درست باشد (<span dir="ltr">`KB |= α`</span>). (یعنی دروغ تولید نکند).
- **۳. کامل بودن الگوریتم استنتاج (<span dir="ltr">`Completeness`</span>):** هر جمله‌ای را که از <span dir="ltr">`KB`</span> نتیجه‌گیری منطقی می‌شود (<span dir="ltr">`KB |= α`</span>)، الگوریتم بتواند اثبات کند.
- **۴. قضیه استنتاج:** <span dir="ltr">`KB |= α`</span> اگر و تنها اگر جمله <span dir="ltr">`(KB ∧ ¬α)`</span> **نارضایتمند (<span dir="ltr">`Unsatisfiable`</span> / تناقض)** باشد. (پایه اثبات با برهان خلف در الگوریتم <span dir="ltr">`Resolution`</span>).

---

## ۲. بندهای هورن (<span dir="ltr">`Horn Clauses`</span>) و زنجیره‌زنی

- **بند (<span dir="ltr">`Clause`</span>):** فصل (یا / <span dir="ltr">`∨`</span>) تعدادی لیترال (متغیر مثبت یا منفی).
- **بند هورن (<span dir="ltr">`Horn Clause`</span>):** بندی که **حداکثر یک لیترال مثبت** داشته باشد.
  - اگر **دقیقاً یک لیترال مثبت** داشته باشد، به آن **بند معین (<span dir="ltr">`Definite Clause`</span>)** می‌گویند که به شکل <span dir="ltr">`(p1 ∧ p2 ∧ ... ∧ pk) => q`</span> نوشته می‌شود.
  - مزیت بزرگ بندهای هورن: استنتاج با **زنجیره‌زنی به جلو (<span dir="ltr">`Forward Chaining`</span>)** و **زنجیره‌زنی به عقب (<span dir="ltr">`Backward Chaining`</span>)** روی آن‌ها در **زمان خطی <span dir="ltr">`O(n)`</span>** نسبت به اندازه پایگاه دانش انجام می‌شود!

---

## ۳. منطق مرتبه اول (<span dir="ltr">`First-Order Logic - FOL`</span>) و مراحل تبدیل به <span dir="ltr">`CNF`</span>

برای استفاده از الگوریتم <span dir="ltr">`Resolution`</span> در منطق مرتبه اول، باید جملات را طی مراحل زیر به فرم نرمال عطفی (<span dir="ltr">`CNF`</span>) تبدیل کنیم:

- **گام ۱ — حذف دوشرطی و شرطی:** جایگزینی <span dir="ltr">`A => B`</span> با <span dir="ltr">`¬A ∨ B`</span>.
- **گام ۲ — انتقال نقیض (<span dir="ltr">`¬`</span>) به داخل:**
  - قانون دمورگان روی سورها: <span dir="ltr">`¬(∀x P(x)) ≡ ∃x ¬P(x)`</span> و <span dir="ltr">`¬(∃x P(x)) ≡ ∀x ¬P(x)`</span>.
- **گام ۳ — استانداردسازی متغیرها:** اگر دو سور از نام متغیر یکسانی استفاده کرده‌اند، نام یکی را عوض کنید.
- **گام ۴ — اسکولم‌سازی (<span dir="ltr">`Skolemization`</span> — حذف سور وجودی <span dir="ltr">`∃`</span>):**
  - اگر سور وجودی <span dir="ltr">`∃y`</span> داخل دامنه هیچ سور عمومی <span dir="ltr">`∀`</span> نباشد، با یک **ثابت اسکولم** (مثل <span dir="ltr">`A`</span>) جایگزین می‌شود.
  - اگر سور وجودی <span dir="ltr">`∃y`</span> در دامنه سورهای عمومی <span dir="ltr">`∀x1, ∀x2`</span> باشد، باید با یک **تابع اسکولم** از آن متغیرها یعنی **<span dir="ltr">`F(x1, x2)`</span>** جایگزین شود!
- **گام ۵ — حذف سورهای عمومی (<span dir="ltr">`∀`</span>) و پخش فصل روی عطف (<span dir="ltr">`∨`</span> روی <span dir="ltr">`∧`</span>).**

---

## ۴. یکسان‌سازی (<span dir="ltr">`Unification`</span>) و عمومی‌ترین یکسان‌ساز (<span dir="ltr">`MGU`</span>)

- هدف <span dir="ltr">`Unify(p, q) = θ`</span> پیدا کردن جایگزینی <span dir="ltr">`θ`</span> است که دو عبارت منطقی را یکسان کند.
- **شرط بررسی رخداد (<span dir="ltr">`Occurs Check`</span>):** متغیر <span dir="ltr">`x`</span> نمی‌تواند با عبارتی که خودش شامل <span dir="ltr">`x`</span> است (مثل <span dir="ltr">`f(x)`</span>) یکسان شود، چون حلقه بی‌نهایت ایجاد می‌کند!

---

## ۵. دام‌های تستی کنکور ارشد

- **دام ۱ (ترجمه سورها به فارسی):**
  - عبارت «هر، همه» همیشه با سور عمومی و شرط می‌آید: <span dir="ltr">`∀x (Student(x) => Smart(x))`</span>. **(هرگز <span dir="ltr">`∀`</span> را با <span dir="ltr">`∧`</span> اصلی نیاورید!)**
  - عبارت «برخی، وجود دارد» همیشه با سور وجودی و عطف می‌آید: <span dir="ltr">`∃x (Student(x) ∧ Smart(x))`</span>. **(هرگز <span dir="ltr">`∃`</span> را با <span dir="ltr">`=>`</span> اصلی نیاورید!)**
- **دام ۲ (اسکولم‌سازی):** ترتیب قرارگیری <span dir="ltr">`∀x ∃y`</span> با <span dir="ltr">`∃y ∀x`</span> کاملاً فرق دارد؛ اولی به تابع <span dir="ltr">`F(x)`</span> تبدیل می‌شود ولی دومی به ثابت <span dir="ltr">`C`</span> تبدیل می‌شود.

---

## ۶. چک‌لیست مطالعه این فصل

- [ ] تسلط کامل بر ترجمه جملات فارسی به <span dir="ltr">`FOL`</span> (دام <span dir="ltr">`∀`</span> با <span dir="ltr">`=>`</span> و <span dir="ltr">`∃`</span> با <span dir="ltr">`∧`</span>)
- [ ] تمرین ۵ تست از اسکولم‌سازی و تبدیل به <span dir="ltr">`CNF`</span>
- [ ] تمرین پیدا کردن <span dir="ltr">`MGU`</span> و تشخیص خطای <span dir="ltr">`Occurs Check`</span>

</div>
