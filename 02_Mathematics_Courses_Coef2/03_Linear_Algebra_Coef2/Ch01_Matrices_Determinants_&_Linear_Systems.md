<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱: ماتریس‌ها، دترمینان و دستگاه معادلات خطی (<span dir="ltr">`Matrices, Determinants & Linear Systems`</span>)

---

## ۱. خواص طلایی دترمینان، اثر (<span dir="ltr">`Trace`</span>) و وارون برای ماتریس <span dir="ltr">`n × n`</span>

- **۱. دترمینان مضرب اسکالر ماتریس (دام بسیار پرتکرار کنکور!):**
  - فرمول: **<span dir="ltr">`det(c * A) = c^n * det(A)`</span>** (عدد ثابت <span dir="ltr">`c`</span> به توان ابعاد ماتریس یعنی <span dir="ltr">`n`</span> می‌رسد، نه توان ۱!).
- **۲. دترمینان ضرب، معکوس و ترانهاده:**
  - <span dir="ltr">`det(A * B) = det(A) * det(B)`</span>
  - <span dir="ltr">`det(A^T) = det(A)`</span>
  - <span dir="ltr">`det(A^-1) = 1 / det(A)`</span>
  - <span dir="ltr">`det(A^k) = (det(A))^k`</span>
- **۳. دترمینان ماتریس الحاقی (<span dir="ltr">`Adjugate / Adjoint: adj(A)`</span>):**
  - چون <span dir="ltr">`A * adj(A) = det(A) * I_n`</span> است، با گرفتن دترمینان از دو طرف داریم:
  - فرمول طلایی ۱: **<span dir="ltr">`det(adj(A)) = (det(A))^(n - 1)`</span>**
  - فرمول طلایی ۲: **<span dir="ltr">`adj(adj(A)) = (det(A))^(n - 2) * A`</span>**
- **۴. خواص اثر ماتریس (<span dir="ltr">`Trace(A)`</span> — جمع عناصر قطر اصلی):**
  - <span dir="ltr">`Trace(aA + bB) = a Trace(A) + b Trace(B)`</span>
  - <span dir="ltr">`Trace(A^T) = Trace(A)`</span>
  - **خاصیت جابه‌جایی حلقوی در ضرب:** **<span dir="ltr">`Trace(A * B) = Trace(B * A)`</span>** و **<span dir="ltr">`Trace(A B C) = Trace(B C A) = Trace(C A B)`</span>** (اما توجه کنید که در حالت کلی <span dir="ltr">`Trace(ABC) ≠ Trace(ACB)`</span>!).

---

## ۲. جدول ماتریس‌های خاص و ویژگی‌های کنکوری آن‌ها

| نوع ماتریس مربعی <span dir="ltr">`A`</span> | تعریف ریاضی | نکته طلایی دترمینان و مقادیر ویژه |
| :--- | :---: | :--- |
| **متقارن (<span dir="ltr">`Symmetric`</span>)** | <span dir="ltr">`A^T = A`</span> | تمام مقادیر ویژه **حقیقی** هستند و بردارهای ویژه متناظر با مقادیر ویژه متمایز بر هم **عمودند**! |
| **پادمتقارن (<span dir="ltr">`Skew-Symmetric`</span>)** | <span dir="ltr">`A^T = -A`</span> | عناصر قطر اصلی حتماً **صفر** هستند؛ اگر مرتبه <span dir="ltr">`n`</span> **فرد** باشد، دترمینان آن حتماً **صفر** است! (<span dir="ltr">`det(A) = (-1)^n det(A)`</span>) |
| **متعامد (<span dir="ltr">`Orthogonal`</span>)** | <span dir="ltr">`A^T * A = I`</span> (یعنی <span dir="ltr">`A^-1 = A^T`</span>) | سطرها (و ستون‌ها) یک متعامدند؛ دترمینان فقط **<span dir="ltr">`+1`</span> یا <span dir="ltr">`-1`</span>** است و طول بردار را حفظ می‌کند: <span dir="ltr">`||Ax|| = ||x||`</span> |
| **خودتوان (<span dir="ltr">`Idempotent`</span> / ماتریس تصویر)** | **<span dir="ltr">`A^2 = A`</span>** | مقادیر ویژه آن فقط می‌توانند **۰ یا ۱** باشند! و همیشه **<span dir="ltr">`rank(A) = Trace(A)`</span>** است! |
| **توان‌دار (<span dir="ltr">`Involutory`</span>)** | **<span dir="ltr">`A^2 = I`</span>** (یعنی <span dir="ltr">`A^-1 = A`</span>) | مقادیر ویژه آن فقط می‌توانند **<span dir="ltr">`+1`</span> یا <span dir="ltr">`-1`</span>** باشند! |
| **پوچ‌توان (<span dir="ltr">`Nilpotent`</span>)** | **<span dir="ltr">`A^k = 0`</span>** | تمام مقادیر ویژه آن **صفر** هستند؛ بنابراین هم <span dir="ltr">`Trace(A) = 0`</span> و هم <span dir="ltr">`det(A) = 0`</span> است! |

---

## ۳. تحلیل دستگاه معادلات خطی <span dir="ltr">`A X = b`</span> (قضیه روشه-فروبنیوس)

برای ماتریس ضرایب <span dir="ltr">`A`</span> از مرتبه <span dir="ltr">`m × n`</span> (<span dir="ltr">`m`</span> معادله و <span dir="ltr">`n`</span> مجهول) و ماتریس افزوده <span dir="ltr">`[A | b]`</span>:
- **حالت ۱ — ناسازگار (فاقد جواب):** اگر و تنها اگر **<span dir="ltr">`rank(A) < rank([A | b])`</span>**.
- **حالت ۲ — دارای جواب یکتا:** اگر و تنها اگر **<span dir="ltr">`rank(A) = rank([A | b]) = n`</span>** (تعداد مجهولات).
- **حالت ۳ — دارای بی‌نهایت جواب:** اگر و تنها اگر **<span dir="ltr">`rank(A) = rank([A | b]) = r < n`</span>** (در این حالت تعداد متغیرهای آزاد یا پارامترها برابر **<span dir="ltr">`n - r`</span>** است).

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن فرمول <span dir="ltr">`det(cA) = c^n det(A)`</span> و <span dir="ltr">`det(adj(A)) = (det(A))^(n-1)`</span>
- [ ] حفظ کردن جدول ۶ ماتریس خاص (مخصوصاً ماتریس خودتوان <span dir="ltr">`A^2 = A`</span> که <span dir="ltr">`rank(A) = Trace(A)`</span> است و پادمتقارن فرد که <span dir="ltr">`det = 0`</span> است!)
- [ ] تسلط بر تشخیص یکتا، بی‌نهایت یا بی‌جواب بودن دستگاه <span dir="ltr">`AX = b`</span> بر حسب پارامتر <span dir="ltr">`k`</span>

</div>
