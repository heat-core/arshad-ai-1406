<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۴: هرم (<span dir="ltr">`Heap`</span>)، صف اولویت و جداول درهم‌سازی (<span dir="ltr">`Hashing`</span>)

این دو مبحث تقریباً در **۱۰۰ درصد کنکورهای ارشد** حداقل ۱ یا ۲ تست مستقیم دارند.

---

## ۱. درخت هرم دودویی (<span dir="ltr">`Binary Heap`</span>)

یک **درخت دودویی کامل (<span dir="ltr">`Complete Binary Tree`</span>)** است که به صورت آرایه <span dir="ltr">`A[1..n]`</span> ذخیره می‌شود:
- اندیس پدر گره <span dir="ltr">`i`</span>: **<span dir="ltr">`floor(i / 2)`</span>**
- اندیس فرزند چپ گره <span dir="ltr">`i`</span>: **<span dir="ltr">`2i`</span>** و فرزند راست: **<span dir="ltr">`2i + 1`</span>**
- **ویژگی برگ‌ها در آرایه هرم با <span dir="ltr">`n`</span> عنصر:** عناصر از اندیس **<span dir="ltr">`floor(n/2) + 1`</span> تا <span dir="ltr">`n`</span>** همگی **برگ** هستند (تعداد برگ‌ها برابر <span dir="ltr">`ceil(n / 2)`</span> است).
- در **<span dir="ltr">`Max-Heap`</span>** کلید هر گره بزرگ‌تر یا مساوی فرزندانش است (بزرگ‌ترین عنصر در ریشه <span dir="ltr">`A[1]`</span> و کوچک‌ترین عنصر حتماً در یکی از **برگ‌ها** است).

### پیچیدگی زمانی عملیات روی <span dir="ltr">`Max-Heap`</span>:
| عملیات | پیچیدگی زمانی | نکته تستی کنکور |
| :--- | :---: | :--- |
| یافتن بیشینه (<span dir="ltr">`Find-Max`</span>) | <span dir="ltr">`O(1)`</span> | در ریشه <span dir="ltr">`A[1]`</span> قرار دارد |
| درج عنصر جدید (<span dir="ltr">`Insert`</span>) | <span dir="ltr">`O(log n)`</span> | در بدترین حالت <span dir="ltr">`O(log n)`</span> و در حالت متوسط **<span dir="ltr">`O(1)`</span>** است! |
| حذف بیشینه (<span dir="ltr">`Extract-Max`</span>) | <span dir="ltr">`O(log n)`</span> | جایگزینی ریشه با عنصر آخر و فراخوانی <span dir="ltr">`Heapify`</span> |
| ساخت هرم از آرایه نامرتب (<span dir="ltr">`Build-Heap`</span>) | **<span dir="ltr">`O(n)`</span>** | به روش پایین به بالا از اندیس <span dir="ltr">`floor(n/2)`</span> تا ۱؛ نه <span dir="ltr">`O(n log n)`</span>! |
| یافتن یا حذف کوچک‌ترین عنصر در <span dir="ltr">`Max-Heap`</span> | **<span dir="ltr">`O(n)`</span>** | چون باید تمام <span dir="ltr">`ceil(n/2)`</span> برگ را بگردیم! |
| یافتن <span dir="ltr">`k`</span>-امین عنصر بزرگ‌تر در <span dir="ltr">`Max-Heap`</span> (به ازای <span dir="ltr">`k`</span> ثابت) | <span dir="ltr">`O(k log k)`</span> یا <span dir="ltr">`O(1)`</span> | مثلاً دومین عنصر بزرگ‌تر یکی از دو فرزند ریشه است (<span dir="ltr">`1`</span> مقایسه) و سومین عنصر حداکثر در عمق ۲ است |

---

## ۲. جداول درهم‌سازی (<span dir="ltr">`Hash Tables`</span>)

اگر جدول دارای <span dir="ltr">`m`</span> خانه و تعداد کلیدهای درج‌شده <span dir="ltr">`n`</span> باشد، **ضریب بار (<span dir="ltr">`Load Factor`</span>)** برابر است با:
- فرمول ضریب بار: **<span dir="ltr">`α = n / m`</span>**

### الف) روش‌های رفع تصادم در آدرس‌دهی باز (<span dir="ltr">`Open Addressing`</span>)
در آدرس‌دهی باز همیشه <span dir="ltr">`α ≤ 1`</span> است و دنباله کاوش <span dir="ltr">`h(k, i)`</span> برای <span dir="ltr">`i = 0, 1, ..., m-1`</span> به صورت زیر است:
- **۱. کاوش خطی (<span dir="ltr">`Linear Probing`</span>):**
  - فرمول: <span dir="ltr">`h(k, i) = (h'(k) + i) mod m`</span>
  - مشکل اصلی: ایجاد **خوشه‌بندی اولیه (<span dir="ltr">`Primary Clustering`</span>)**.
- **۲. کاوش درجه‌دوم (<span dir="ltr">`Quadratic Probing`</span>):**
  - فرمول: <span dir="ltr">`h(k, i) = (h'(k) + c1 * i + c2 * i^2) mod m`</span>
  - مشکل اصلی: ایجاد **خوشه‌بندی ثانویه (<span dir="ltr">`Secondary Clustering`</span>)** (دو کلید که خانه اولیه یکسانی دارند، کل مسیر کاوش یکسانی را طی می‌کنند).
- **۳. درهم‌سازی دوگانه (<span dir="ltr">`Double Hashing`</span>):**
  - فرمول: <span dir="ltr">`h(k, i) = (h1(k) + i * h2(k)) mod m`</span>
  - فاقد خوشه‌بندی اولیه و ثانویه است. شرط پوشش کل جدول: مقدار <span dir="ltr">`h2(k)`</span> باید نسبت به <span dir="ltr">`m`</span> **اول** باشد.

### ب) امید ریاضی تعداد کاوش‌ها (فرمول‌های کنکوری)
- **در زنجیره‌سازی مجزا (<span dir="ltr">`Separate Chaining`</span>):** میانگین زمان جست‌وجوی موفق و ناموفق برابر **<span dir="ltr">`Θ(1 + α)`</span>** است.
- **در آدرس‌دهی باز با درهم‌سازی یکنواخت:**
  - میانگین تعداد کاوش در جست‌وجوی **ناموفق** (یا درج کلید جدید): حداکثر **<span dir="ltr">`1 / (1 - α)`</span>**
  - میانگین تعداد کاوش در جست‌وجوی **موفق**: حداکثر **<span dir="ltr">`[1 / α] * ln(1 / (1 - α))`</span>**

---

## ۳. چک‌لیست مطالعه این فصل

- [ ] تمرین درج ۵ کلید متوالی در جدول درهم‌سازی با کاوش خطی، درجه دوم و دوگانه
- [ ] حفظ کردن پیچیدگی <span dir="ltr">`Build-Heap`</span> برابر <span dir="ltr">`O(n)`</span> و تعداد برگ‌ها <span dir="ltr">`ceil(n/2)`</span>
- [ ] حفظ کردن فرمول تعداد کاوش جست‌وجوی ناموفق در آدرس‌دهی باز: <span dir="ltr">`1 / (1 - α)`</span>

</div>
