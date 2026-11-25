<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۵: نمایش گراف‌ها و الگوریتم‌های مرتب‌سازی (<span dir="ltr">`Sorting`</span>)

جدول مقایسه الگوریتم‌های مرتب‌سازی و پیمایش گراف‌ها از سوالات ثابت کنکور ارشد مهندسی کامپیوتر است.

---

## ۱. جدول جامع مقایسه الگوریتم‌های مرتب‌سازی

| الگوریتم مرتب‌سازی | بهترین حالت (<span dir="ltr">`Best`</span>) | حالت متوسط (<span dir="ltr">`Average`</span>) | بدترین حالت (<span dir="ltr">`Worst`</span>) | حافظه کمکی (<span dir="ltr">`Space`</span>) | پایدار است؟ (<span dir="ltr">`Stable`</span>) | نکته طلایی کنکور |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **حبابی (<span dir="ltr">`Bubble Sort`</span>)** | <span dir="ltr">`Θ(n)`</span> (با پرچم) | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`O(1)`</span> | **بله** | تعداد جابه‌جایی‌ها برابر تعداد وارونگی‌ها (<span dir="ltr">`Inversions`</span>) است |
| **درجی (<span dir="ltr">`Insertion Sort`</span>)** | **<span dir="ltr">`Θ(n)`</span>** | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`O(1)`</span> | **بله** | روی آرایه‌های تقریباً مرتب (با <span dir="ltr">`O(n)`</span> وارونگی) در زمان **خطی <span dir="ltr">`O(n)`</span>** اجرا می‌شود! |
| **انتخابی (<span dir="ltr">`Selection Sort`</span>)** | **<span dir="ltr">`Θ(n^2)`</span>** | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`O(1)`</span> | خیر | همیشه دقیقاً <span dir="ltr">`n(n-1)/2`</span> مقایسه دارد ولی **کمترین تعداد جابه‌جایی <span dir="ltr">`O(n)`</span>** را دارد! |
| **ادغامی (<span dir="ltr">`Merge Sort`</span>)** | <span dir="ltr">`Θ(n log n)`</span> | <span dir="ltr">`Θ(n log n)`</span> | **<span dir="ltr">`Θ(n log n)`</span>** | **<span dir="ltr">`O(n)`</span>** | **بله** | درجا نیست (نیاز به <span dir="ltr">`O(n)`</span> حافظه کمکی در آرایه دارد) |
| **هرمی (<span dir="ltr">`Heap Sort`</span>)** | <span dir="ltr">`Θ(n log n)`</span> | <span dir="ltr">`Θ(n log n)`</span> | **<span dir="ltr">`Θ(n log n)`</span>** | **<span dir="ltr">`O(1)`</span>** | خیر | هم درجا است و هم بدترین حالتش <span dir="ltr">`O(n log n)`</span> است (اگر همه عناصر برابر باشند <span dir="ltr">`Θ(n)`</span> است) |
| **سریع (<span dir="ltr">`Quick Sort`</span>)** | <span dir="ltr">`Θ(n log n)`</span> | <span dir="ltr">`Θ(n log n)`</span> | **<span dir="ltr">`Θ(n^2)`</span>** | <span dir="ltr">`O(log n)`</span> پشته | خیر | روی آرایه از قبل مرتب (با محور اول/آخر) بدترین حالت <span dir="ltr">`Θ(n^2)`</span> رخ می‌دهد! |
| **شمارشی (<span dir="ltr">`Counting Sort`</span>)** | <span dir="ltr">`Θ(n + k)`</span> | <span dir="ltr">`Θ(n + k)`</span> | <span dir="ltr">`Θ(n + k)`</span> | <span dir="ltr">`O(n + k)`</span> | **بله** | غیرمقایسه‌ای؛ وقتی بازه اعداد <span dir="ltr">`k = O(n)`</span> باشد خطی است |

### کران پایین مرتب‌سازی مقایسه‌ای:
- بر اساس درخت تصمیم با <span dir="ltr">`n!`</span> برگ، هر الگوریتم مرتب‌سازی مبتنی بر مقایسه در بدترین حالت نیاز به حداقل **<span dir="ltr">`ceil(log2(n!)) = Ω(n log n)`</span>** مقایسه دارد.

---

## ۲. نمایش و پیمایش گراف‌ها (<span dir="ltr">`BFS`</span> و <span dir="ltr">`DFS`</span>)

برای گرافی با <span dir="ltr">`V`</span> راس و <span dir="ltr">`E`</span> یال:
- **نمایش با ماتریس مجاورت:** حافظه <span dir="ltr">`Θ(V^2)`</span>؛ زمان پیمایش <span dir="ltr">`BFS`</span> یا <span dir="ltr">`DFS`</span> برابر **<span dir="ltr">`Θ(V^2)`</span>**.
- **نمایش با لیست مجاورت:** حافظه <span dir="ltr">`Θ(V + E)`</span>؛ زمان پیمایش <span dir="ltr">`BFS`</span> یا <span dir="ltr">`DFS`</span> برابر **<span dir="ltr">`Θ(V + E)`</span>**.

### دسته‌بندی یال‌ها در پیمایش <span dir="ltr">`DFS`</span> (نکته بسیار مهم کنکور!):
- ۱. **در گراف بدون جهت (<span dir="ltr">`Undirected Graph`</span>):** پیمایش <span dir="ltr">`DFS`</span> فقط دو نوع یال تولید می‌کند: **یال درخت (<span dir="ltr">`Tree Edge`</span>)** و **یال بازگشت (<span dir="ltr">`Back Edge`</span>)**؛ یال جلورو و متقاطع در <span dir="ltr">`DFS`</span> گراف بدون جهت وجود ندارد!
- ۲. **در گراف جهت‌دار (<span dir="ltr">`Directed Graph`</span>):** هر ۴ نوع یال (<span dir="ltr">`Tree, Back, Forward, Cross`</span>) ممکن است وجود داشته باشد.
- ۳. **شرط وجود دور:** گراف (چه جهت‌دار چه بدون جهت) دارای دور است اگر و تنها اگر در پیمایش <span dir="ltr">`DFS`</span> آن حداقل یک **یال بازگشت (<span dir="ltr">`Back Edge`</span>)** وجود داشته باشد!

---

## ۳. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن جدول کامل الگوریتم‌های مرتب‌سازی (پایداری، حافظه کمکی و بهترین/بدترین حالت)
- [ ] تسلط بر رابطه تعداد مقایسه‌ها و جابه‌جایی‌های مرتب‌سازی درجی با تعداد وارونگی‌ها (<span dir="ltr">`Inversions`</span>)
- [ ] تسلط بر انواع یال‌های <span dir="ltr">`DFS`</span> و <span dir="ltr">`BFS`</span> در گراف‌های جهت‌دار و بدون جهت

</div>
