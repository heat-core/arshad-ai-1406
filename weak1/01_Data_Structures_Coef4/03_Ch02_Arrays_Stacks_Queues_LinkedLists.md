<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۲: آرایه‌ها، پشته، صف و لیست‌های پیوندی

از این فصل هر سال ۱ تا ۲ تست بسیار استاندارد و قلق‌دار طرح می‌شود که با دانستن فرمول‌ها و نکات زیر به سادگی قابل حل است.

---

## ۱. آرایه‌ها و ماتریس‌های خاص

- **آدرس‌دهی در آرایه دوبعدی <span dir="ltr">`A[0..m-1][0..n-1]`</span> با اندازه هر عنصر <span dir="ltr">`c`</span> بایت و آدرس شروع <span dir="ltr">`α`</span>:**
  - **ذخیره‌سازی سطری (<span dir="ltr">`Row-Major`</span>):** <span dir="ltr">`Addr(A[i][j]) = α + (i * n + j) * c`</span>
  - **ذخیره‌سازی ستونی (<span dir="ltr">`Column-Major`</span>):** <span dir="ltr">`Addr(A[i][j]) = α + (j * m + i) * c`</span>
- **تعداد عناصر غیرصفر در ماتریس‌های مربعی <span dir="ltr">`n × n`</span>:**
  - ماتریس پایین‌مثلثی یا بالامثلثی: **<span dir="ltr">`n(n + 1) / 2`</span>**
  - ماتریس سه‌قطری (<span dir="ltr">`Tridiagonal`</span>): **<span dir="ltr">`3n - 2`</span>**

---

## ۲. پشته (<span dir="ltr">`Stack - LIFO`</span>) و کاربردها

- **۱. تعداد جایگشت‌های قابل تولید با یک پشته از ورودی <span dir="ltr">`1, 2, ..., n`</span>:**
  - برابر است با **عدد کاتالان <span dir="ltr">`C_n`</span>**:
  - فرمول کاتالان: <span dir="ltr">`C_n = [1 / (n + 1)] * C(2n, n)`</span>
  - مقادیر مهم کاتالان که باید حفظ باشید:
    - به ازای <span dir="ltr">`n=1 -> 1`</span>، <span dir="ltr">`n=2 -> 2`</span>، <span dir="ltr">`n=3 -> 5`</span>، <span dir="ltr">`n=4 -> 14`</span>، <span dir="ltr">`n=5 -> 42`</span>، <span dir="ltr">`n=6 -> 132`</span>.
  - **قانون تشخیص غیرممکن بودن یک جایگشت پشته (قانون ۳-۱-۲):** اگر در خروجی، سه عدد پیدا کنید که از چپ به راست ابتدا **عدد بزرگ**، بعد **عدد کوچک** و بعد **عدد متوسط** آمده باشد (الگوی <span dir="ltr">`k ... i ... j`</span> که در آن <span dir="ltr">`i < j < k`</span> است، مثل <span dir="ltr">`3, 1, 2`</span>)، آن جایگشت با یک پشته **غیرقابل تولید** است!
- **۲. تبدیل عبارت میانوندی (<span dir="ltr">`Infix`</span>) به پسوندی (<span dir="ltr">`Postfix`</span>) با پشته:**
  - عملوندها (حروف/اعداد) مستقیم به خروجی می‌روند و ترتیبشان **هرگز عوض نمی‌شود**!
  - عملگر با اولویت بالاتر روی عملگر با اولویت پایین‌تر در پشته می‌نشیند.
  - نکته تستی شرکت‌پذیری: عملگرهای <span dir="ltr">`+, -, *, /`</span> **چپ‌شرکت‌پذیرند** (یعنی اگر عملگر ورودی با بالای پشته هم‌اولویت باشد، بالای پشته <span dir="ltr">`Pop`</span> می‌شود)، اما عملگر توان (<span dir="ltr">`^`</span>) **راست‌شرکت‌پذیر** است (یعنی توان جدید روی توان قبلی در پشته <span dir="ltr">`Push`</span> می‌شود!).

---

## ۳. صف (<span dir="ltr">`Queue - FIFO`</span>) و صف حلقوی

- در پیاده‌سازی **صف حلقوی با آرایه به طول <span dir="ltr">`N`</span>** (به روش استاندارد هورویتز که یک خانه خالی نگه می‌دارد تا پر بودن و خالی بودن، هر دو <span dir="ltr">`Front == Rear`</span> نشوند):
  - حداکثر ظرفیت مفید صف: **<span dir="ltr">`N - 1`</span>** عنصر.
  - شرط خالی بودن: <span dir="ltr">`Front == Rear`</span>
  - شرط پر بودن: <span dir="ltr">`(Rear + 1) mod N == Front`</span>
  - تعداد عناصر موجود در صف حلقوی در هر لحظه: **<span dir="ltr">`(Rear - Front + N) mod N`</span>**
- **پیاده‌سازی صف با دو پشته (<span dir="ltr">`S1`</span> و <span dir="ltr">`S2`</span>):**
  - درج (<span dir="ltr">`Enqueue`</span>): همیشه <span dir="ltr">`Push`</span> در <span dir="ltr">`S1`</span> با هزینه <span dir="ltr">`O(1)`</span>.
  - حذف (<span dir="ltr">`Dequeue`</span>): از <span dir="ltr">`S2`</span>؛ و فقط وقتی <span dir="ltr">`S2`</span> خالی شد، تمام عناصر <span dir="ltr">`S1`</span> را به <span dir="ltr">`S2`</span> منتقل می‌کنیم.
  - هزینه سرشکن (<span dir="ltr">`Amortized Time`</span>) هر عملیات: **<span dir="ltr">`O(1)`</span>** (هرچند بدترین حالت یک حذف خاص <span dir="ltr">`O(n)`</span> است).

---

## ۴. لیست‌های پیوندی (<span dir="ltr">`Linked Lists`</span>)

| عملیات | لیست یک‌طرفه (فقط اشاره‌گر <span dir="ltr">`Head`</span>) | لیست یک‌طرفه حلقوی (اشاره‌گر به گره آخر <span dir="ltr">`Last`</span>) | لیست دوطرفه (با <span dir="ltr">`Head`</span> و <span dir="ltr">`Tail`</span>) |
| :--- | :---: | :---: | :---: |
| درج در ابتدا | <span dir="ltr">`O(1)`</span> | <span dir="ltr">`O(1)`</span> | <span dir="ltr">`O(1)`</span> |
| درج در انتها | <span dir="ltr">`O(n)`</span> | **<span dir="ltr">`O(1)`</span>** | <span dir="ltr">`O(1)`</span> |
| حذف از ابتدا | <span dir="ltr">`O(1)`</span> | <span dir="ltr">`O(1)`</span> | <span dir="ltr">`O(1)`</span> |
| حذف از انتها | <span dir="ltr">`O(n)`</span> | **<span dir="ltr">`O(n)`</span>** (چون به ماقبلِ آخر دسترسی نداریم!) | **<span dir="ltr">`O(1)`</span>** |

- **معکوس کردن (<span dir="ltr">`Reverse`</span>) لیست پیوندی یک‌طرفه درجا:** در زمان **<span dir="ltr">`O(n)`</span>** و حافظه کمکی **<span dir="ltr">`O(1)`</span>** با سه اشاره‌گر (<span dir="ltr">`prev, curr, next`</span>) انجام می‌شود.

---

## ۵. چک‌لیست مطالعه این فصل

- [ ] تسلط بر قانون ۳-۱-۲ در تشخیص جایگشت‌های غیرمجاز پشته و اعداد کاتالان تا <span dir="ltr">`n=6`</span>
- [ ] تمرین تبدیل عبارت دارای عملگر توان <span dir="ltr">`a ^ b ^ c`</span> به پسوندی (<span dir="ltr">`a b c ^ ^`</span>)
- [ ] تسلط بر جدول پیچیدگی لیست یک‌طرفه حلقوی با اشاره‌گر به آخر (<span dir="ltr">`Last`</span>)

</div>
