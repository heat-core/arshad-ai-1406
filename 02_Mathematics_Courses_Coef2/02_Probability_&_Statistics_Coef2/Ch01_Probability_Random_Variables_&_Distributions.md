<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱، ۲ و ۳: خلاصه جامع فرمول‌ها، توزیع‌ها و نکات تستی آمار و احتمال مهندسی

---

## ۱. قوانین طلایی امید ریاضی، واریانس، کوواریانس و تابع مولد گشتاور (<span dir="ltr">`MGF`</span>)

- **۱. خطی بودن امید ریاضی (همیشه برقرار است، چه متغیرها مستقل باشند چه وابسته!):**
  - فرمول: **<span dir="ltr">`E[aX + bY + c] = a E[X] + b E[Y] + c`</span>**
- **۲. رابطه بنیادی واریانس:**
  - فرمول: **<span dir="ltr">`Var(X) = E[X^2] - (E[X])^2`</span>** (و در نتیجه همیشه <span dir="ltr">`E[X^2] = Var(X) + (E[X])^2 ≥ (E[X])^2`</span>).
- **۳. واریانس ترکیب خطی دو متغیر تصادفی (دام بسیار پرتکرار کنکور در علامت منفی!):**
  - فرمول کلی: **<span dir="ltr">`Var(aX ± bY + c) = a^2 Var(X) + b^2 Var(Y) ± 2ab Cov(X, Y)`</span>**
  - اگر <span dir="ltr">`X`</span> و <span dir="ltr">`Y`</span> **مستقل** (یا ناهمبسته <span dir="ltr">`Cov(X,Y) = 0`</span>) باشند:
    - حتی برای تفاضل <span dir="ltr">`X - Y`</span> نیز واریانس‌ها با هم **جمع** می‌شوند! یعنی: **<span dir="ltr">`Var(X - Y) = Var(X) + Var(Y)`</span>**!
- **۴. کوواریانس و استقلال:**
  - فرمول کوواریانس: **<span dir="ltr">`Cov(X, Y) = E[XY] - E[X] E[Y]`</span>**
  - **دام کنکوری:** اگر <span dir="ltr">`X`</span> و <span dir="ltr">`Y`</span> مستقل باشند، حتماً <span dir="ltr">`Cov(X, Y) = 0`</span> است؛ اما **عکس آن صادق نیست!** (یعنی ممکن است <span dir="ltr">`Cov(X, Y) = 0`</span> باشد ولی دو متغیر به هم وابسته باشند، مثل <span dir="ltr">`Y = X^2`</span> برای متغیر متقارن حول صفر؛ تنها استثنا توزیع **نرمال دوگاوه** است که در آن ناهمبسته بودن معادل مستقل بودن است!).
- **۵. تابع مولد گشتاور (<span dir="ltr">`MGF`</span>):**
  - تعریف: **<span dir="ltr">`M_X(t) = E[e^(tX)]`</span>**
  - گشتاور <span dir="ltr">`n`</span>-ام: مشتق <span dir="ltr">`n`</span>-ام تابع <span dir="ltr">`M_X(t)`</span> در نقطه **<span dir="ltr">`t = 0`</span>** برابر است با **<span dir="ltr">`E[X^n]`</span>**.
  - اگر <span dir="ltr">`X`</span> و <span dir="ltr">`Y`</span> مستقل باشند: **<span dir="ltr">`M_{X+Y}(t) = M_X(t) * M_Y(t)`</span>**.

---

## ۲. جدول طلایی توزیع‌های احتمالاتی معروف (حفظ کردن این جدول برای کنکور الزامی است!)

| نام توزیع | تابع احتمال / چگالی | امید ریاضی <span dir="ltr">`E[X]`</span> | واریانس <span dir="ltr">`Var(X)`</span> | تابع مولد گشتاور <span dir="ltr">`M_X(t)`</span> و نکته طلایی |
| :--- | :--- | :---: | :---: | :--- |
| **برنولی <span dir="ltr">`Ber(p)`</span>** | <span dir="ltr">`P(1)=p, P(0)=q=1-p`</span> | **<span dir="ltr">`p`</span>** | **<span dir="ltr">`p * q`</span>** | <span dir="ltr">`q + p e^t`</span> (بیشترین واریانس در <span dir="ltr">`p=0.5`</span> برابر <span dir="ltr">`1/4`</span>) |
| **دوجمله‌ای <span dir="ltr">`Bin(n, p)`</span>** | <span dir="ltr">`C(n,k) p^k q^(n-k)`</span> | **<span dir="ltr">`n * p`</span>** | **<span dir="ltr">`n * p * q`</span>** | <span dir="ltr">`(q + p e^t)^n`</span> (جمع <span dir="ltr">`n`</span> برنولی مستقل؛ همیشه <span dir="ltr">`E[X] > Var(X)`</span>!) |
| **هندسی <span dir="ltr">`Geo(p)`</span>** | <span dir="ltr">`q^(k-1) * p`</span> (<span dir="ltr">`k ≥ 1`</span>) | **<span dir="ltr">`1 / p`</span>** | **<span dir="ltr">`q / p^2`</span>** | **تنها توزیع گسسته دارای خاصیت عدم حافظه (<span dir="ltr">`Memoryless`</span>)!** |
| **پواسون <span dir="ltr">`Pois(λ)`</span>** | <span dir="ltr">`[e^(-λ) * λ^k] / k!`</span> | **<span dir="ltr">`λ`</span>** | **<span dir="ltr">`λ`</span>** | <span dir="ltr">`e^(λ(e^t - 1))`</span> (توزیعی که در آن **امید ریاضی و واریانس برابرند!**) |
| **یکنواخت پیوسته <span dir="ltr">`U(a, b)`</span>** | <span dir="ltr">`1 / (b - a)`</span> | **<span dir="ltr">`(a + b) / 2`</span>** | **<span dir="ltr">`(b - a)^2 / 12`</span>** | چگالی ثابت در بازه <span dir="ltr">`[a, b]`</span> |
| **نمایی <span dir="ltr">`Exp(λ)`</span>** | <span dir="ltr">`λ e^(-λx)`</span> (<span dir="ltr">`x ≥ 0`</span>) | **<span dir="ltr">`1 / λ`</span>** | **<span dir="ltr">`1 / λ^2`</span>** | <span dir="ltr">`λ / (λ - t)`</span> — **تنها توزیع پیوسته دارای خاصیت عدم حافظه!** |
| **نرمال <span dir="ltr">`N(μ, σ^2)`</span>** | زنگوله‌ای متقارن حول <span dir="ltr">`μ`</span> | **<span dir="ltr">`μ`</span>** | **<span dir="ltr">`σ^2`</span>** | <span dir="ltr">`e^(μ t + 0.5 σ^2 t^2)`</span> (ترکیب خطی نرمال‌های مستقل، نرمال است) |

---

## ۳. خاصیت عدم حافظه (<span dir="ltr">`Memoryless Property`</span>) و رابطه پواسون با نمایی

- **۱. فرمول عدم حافظه در توزیع نمایی و هندسی:**
  - رابطه: **<span dir="ltr">`P(X > s + t | X > s) = P(X > t)`</span>**
  - *مثال تستی:* اگر طول عمر لامپی توزیع نمایی با میانگین ۱۰۰ ساعت داشته باشد و بدانیم ۵۰ ساعت کار کرده است، امید ریاضیِ **طول عمر باقیمانده** آن چقدر است؟ دقیقاً همان **۱۰۰ ساعت**! (چون ۵۰ ساعت گذشته را فراموش می‌کند).
- **۲. کمینه چند متغیر نمایی مستقل:**
  - اگر <span dir="ltr">`X1 ~ Exp(λ1)`</span> و <span dir="ltr">`X2 ~ Exp(λ2)`</span> مستقل باشند، آنگاه کمینه آن‌ها یعنی **<span dir="ltr">`Y = min(X1, X2)`</span>** نیز توزیع نمایی با نرخ **جمع نرخ‌ها یعنی <span dir="ltr">`Exp(λ1 + λ2)`</span>** دارد! و احتمال اینکه <span dir="ltr">`X1`</span> زودتر از <span dir="ltr">`X2`</span> رخ دهد برابر **<span dir="ltr">`P(X1 < X2) = λ1 / (λ1 + λ2)`</span>** است!
- **۳. نامساوی مارکوف و چبیشف (برای متغیرهای با توزیع نامعلوم):**
  - نامساوی مارکوف (برای <span dir="ltr">`X ≥ 0`</span>): **<span dir="ltr">`P(X ≥ a) ≤ E[X] / a`</span>**
  - نامساوی چبیشف: **<span dir="ltr">`P(|X - μ| ≥ k) ≤ Var(X) / k^2`</span>**

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن جدول امید ریاضی، واریانس و <span dir="ltr">`MGF`</span> برای ۷ توزیع اصلی
- [ ] تسلط بر فرمول <span dir="ltr">`min(X1, X2) ~ Exp(λ1 + λ2)`</span> و خاصیت عدم حافظه
- [ ] تمرین شناسایی توزیع از روی شکل تابع مولد گشتاور <span dir="ltr">`M_X(t)`</span> (تست محبوب کنکور ارشد!)

</div>
