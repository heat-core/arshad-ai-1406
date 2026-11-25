<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۲: گرامرهای مستقل از متن (<span dir="ltr">`CFG`</span>) و اتوماتای پشته‌ای (<span dir="ltr">`PDA`</span>)

---

## ۱. گرامرهای مستقل از متن و فرم‌های نرمال

- **ابهام در گرامر (<span dir="ltr">`Ambiguity`</span>):** گرامری مبهم است که حداقل **یک رشته** در زبان وجود داشته باشد که دارای **دو درخت اشتقاق متمایز** (یا دو اشتقاق چپ‌ترین متمایز) باشد.
  - مساله تشخیص اینکه «آیا یک گرامر مستقل از متنِ داده‌شده مبهم است یا خیر؟» **تصمیم‌ناپذیر (<span dir="ltr">`Undecidable`</span>)** است!
- **فرم نرمال چامسکی (<span dir="ltr">`CNF`</span>):** تمام قواعد به شکل **<span dir="ltr">`A -> BC`</span>** (دو متغیر) یا **<span dir="ltr">`A -> a`</span>** (یک پایانه) هستند.
  - **فرمول طلایی کنکور:** در گرامری که در فرم نرمال چامسکی (<span dir="ltr">`CNF`</span>) است، برای اشتقاق هر رشته به طول <span dir="ltr">`n ≥ 1`</span>، دقیقاً **<span dir="ltr">`2n - 1`</span> گام اشتقاق** لازم است!
- **فرم نرمال گریباخ (<span dir="ltr">`GNF`</span>):** تمام قواعد به شکل **<span dir="ltr">`A -> a α`</span>** هستند (یک پایانه در ابتدا و به دنبال آن رشته‌ای شامل صفر یا چند متغیر). در <span dir="ltr">`GNF`</span> هر رشته به طول <span dir="ltr">`n`</span> دقیقاً در **<span dir="ltr">`n`</span> گام** مشتق می‌شود.

---

## ۲. اتوماتای پشته‌ای قطعی (<span dir="ltr">`DPDA`</span>) در برابر غیرقطعی (<span dir="ltr">`NPDA`</span>)

برخلاف اتوماتای متناهی که قطعی و غیرقطعی آن هم‌ارز بودند، در اتوماتای پشته‌ای **قدرت <span dir="ltr">`NPDA`</span> اکیداً بیشتر از <span dir="ltr">`DPDA`</span> است**:
- رابطه زیرمجموعگی اکید: **<span dir="ltr">`Regular ⊂ DCFL ⊂ CFL ⊂ CSL ⊂ REC ⊂ RE`</span>**

### جدول طلایی تشخیص سریع نوع زبان با مفهوم «یک پشته» (فوق‌العاده مهم برای کنکور!)

یک اتوماتای پشته‌ای فقط **یک پشته (<span dir="ltr">`LIFO`</span>)** دارد؛ یعنی فقط می‌تواند یک بار در پشته <span dir="ltr">`Push`</span> کند و در حین <span dir="ltr">`Pop`</span> کردن با یک بخش دیگر مقایسه کند (وقتی پشته خالی شد اطلاعات قبلی از بین رفته است!):

| الگو / نمونه زبان | کلاس دقیق زبان | چرا؟ (تحلیل با پشته) |
| :--- | :---: | :--- |
| <span dir="ltr">`{a^n b^n | n ≥ 0}`</span> | **<span dir="ltr">`DCFL`</span> (مستقل از متن قطعی)** | به ازای <span dir="ltr">`a`</span>ها در پشته <span dir="ltr">`Push`</span> و به محض دیدن <span dir="ltr">`b`</span> به طور قطعی <span dir="ltr">`Pop`</span> می‌کند |
| <span dir="ltr">`{w c w^R | w ∈ {a,b}*}`</span> | **<span dir="ltr">`DCFL`</span>** | حرفِ وسط <span dir="ltr">`c`</span> مرز تغییر از <span dir="ltr">`Push`</span> به <span dir="ltr">`Pop`</span> را به طور **قطعی** مشخص می‌کند |
| <span dir="ltr">`{w w^R | w ∈ {a,b}*}`</span> (پالیندروم زوج بدون علامت وسط) | **<span dir="ltr">`CFL - DCFL`</span> (مستقل از متن غیرقطعی)** | چون علامت وسط ندارد، ماشین باید **حدس غیرقطعی** بزند که کجا وسط رشته است تا شروع به <span dir="ltr">`Pop`</span> کند! |
| <span dir="ltr">`{a^n b^m c^p | n = m OR m = p}`</span> | **<span dir="ltr">`CFL - DCFL`</span> (ذاتاً مبهم!)** | اجتماع دو زبان <span dir="ltr">`DCFL`</span>؛ ماشین باید در ابتدا غیرقطعی حدس بزند که <span dir="ltr">`a`</span> را با <span dir="ltr">`b`</span> بشمارد یا <span dir="ltr">`b`</span> را با <span dir="ltr">`c`</span> |
| <span dir="ltr">`{a^n b^n c^n | n ≥ 0}`</span> | **<span dir="ltr">`CSL - CFL`</span> (حساس به متن؛ غیرمستقل از متن)** | اشتراک دو زبان <span dir="ltr">`DCFL`</span>؛ وقتی <span dir="ltr">`a`</span>ها با <span dir="ltr">`b`</span>ها از پشته <span dir="ltr">`Pop`</span> شدند، پشته خالی است و دیگر نمی‌تواند با <span dir="ltr">`c`</span>ها مقایسه کند! |
| <span dir="ltr">`{w w | w ∈ {a,b}*}`</span> (تکرار مستقیم رشته، نه معکوس) | **<span dir="ltr">`CSL - CFL`</span>** | چون پشته <span dir="ltr">`LIFO`</span> است و معکوس تحویل می‌دهد؛ اما **مکمل آن یعنی <span dir="ltr">`{x ∈ {a,b}* | x ≠ ww}`</span> یک زبان <span dir="ltr">`CFL`</span> است!** |
| <span dir="ltr">`{a^n b^m c^n d^m | n, m ≥ 0}`</span> (وابستگی متقاطع) | **<span dir="ltr">`CSL - CFL`</span>** | چون <span dir="ltr">`a`</span>ها زیر <span dir="ltr">`b`</span>ها در پشته دفن می‌شوند و موقع رسیدن به <span dir="ltr">`c`</span> به آن‌ها دسترسی نداریم |
| <span dir="ltr">`{a^n b^m c^m d^n | n, m ≥ 0}`</span> (وابستگی تودرتو) | **<span dir="ltr">`DCFL`</span>** | چون اول <span dir="ltr">`a`</span>، بعد <span dir="ltr">`b`</span> در پشته می‌رود؛ سپس اول <span dir="ltr">`b`</span> با <span dir="ltr">`c`</span> و بعد <span dir="ltr">`a`</span> با <span dir="ltr">`d`</span> از پشته خارج می‌شود! |

---

## ۳. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن جدول تشخیص سریع <span dir="ltr">`DCFL`</span>، <span dir="ltr">`CFL`</span> و <span dir="ltr">`CSL`</span> (تفاوت وابستگی تودرتو <span dir="ltr">`a^n b^m c^m d^n`</span> با متقاطع <span dir="ltr">`a^n b^m c^n d^m`</span>)
- [ ] حفظ کردن فرمول <span dir="ltr">`2n - 1`</span> گام اشتقاق در فرم نرمال چامسکی (<span dir="ltr">`CNF`</span>)
- [ ] حفظ کردن نکته طلایی: زبان <span dir="ltr">`{ww}`</span> مستقل از متن نیست، اما مکمل آن مستقل از متن (<span dir="ltr">`CFL`</span>) است!

</div>
