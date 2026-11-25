<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۳: برنامه‌نویسی پویا (<span dir="ltr">`Dynamic Programming - DP`</span>)

برنامه‌نویسی پویا زمانی استفاده می‌شود که زیرمساله‌ها **مستقل نباشند (هم‌پوشانی زیرمساله‌ها — <span dir="ltr">`Overlapping Subproblems`</span>)** و مساله دارای **زیرساختار بهینه (<span dir="ltr">`Optimal Substructure`</span>)** باشد.

---

## ۱. جدول طلایی مسائل کلاسیک برنامه‌نویسی پویا (حفظ کردن این جدول برای کنکور الزامی است!)

| نام مساله | رابطه بازگشتی اصلی | پیچیدگی زمانی | پیچیدگی فضایی (قابل بهینه‌سازی) | تعداد کل زیرمساله‌های متمایز |
| :--- | :--- | :---: | :---: | :---: |
| **ضرب زنجیره‌ای ماتریس‌ها (<span dir="ltr">`MCM`</span>)** | <span dir="ltr">`m[i,j] = min(m[i,k] + m[k+1,j] + p_{i-1} p_k p_j)`</span> | **<span dir="ltr">`Θ(n^3)`</span>** | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`n(n+1)/2 = Θ(n^2)`</span> |
| **درخت جست‌وجوی دودویی بهینه (<span dir="ltr">`OBST`</span>)** | <span dir="ltr">`e[i,j] = min(e[i,r-1] + e[r+1,j] + w(i,j))`</span> | **<span dir="ltr">`Θ(n^3)`</span>** (با بهینه‌سازی کنوث <span dir="ltr">`Θ(n^2)`</span>) | <span dir="ltr">`Θ(n^2)`</span> | <span dir="ltr">`Θ(n^2)`</span> |
| **بلندترین زیردنباله مشترک (<span dir="ltr">`LCS`</span>)** | اگر <span dir="ltr">`X[i]==Y[j]`</span>: <span dir="ltr">`1 + c[i-1,j-1]`</span><br>وگرنه: <span dir="ltr">`max(c[i-1,j], c[i,j-1])`</span> | **<span dir="ltr">`Θ(m * n)`</span>** | <span dir="ltr">`Θ(m * n)`</span> (یا فقط طول: **<span dir="ltr">`Θ(min(m,n))`</span>**) | <span dir="ltr">`m * n`</span> |
| **کوله‌پشتی ۰ و ۱ (<span dir="ltr">`0/1 Knapsack`</span>)** | <span dir="ltr">`K[i,w] = max(K[i-1,w], v_i + K[i-1, w - w_i])`</span> | **<span dir="ltr">`Θ(n * W)`</span>** (شبه‌چندجمله‌ای!) | <span dir="ltr">`Θ(W)`</span> | <span dir="ltr">`n * W`</span> |
| **کوتاه‌ترین مسیر همه‌به‌همه فلوید-وارشال (<span dir="ltr">`Floyd-Warshall`</span>)** | <span dir="ltr">`D^k[i,j] = min(D^{k-1}[i,j], D^{k-1}[i,k] + D^{k-1}[k,j])`</span> | **<span dir="ltr">`Θ(V^3)`</span>** | <span dir="ltr">`Θ(V^2)`</span> (درجا روی یک ماتریس!) | <span dir="ltr">`V^3`</span> حالت |
| **فروشنده دوره‌گرد با برنامه‌نویسی پویا (<span dir="ltr">`TSP`</span>)** | <span dir="ltr">`C(S, i) = min(C(S-{i}, j) + d_{ji})`</span> | **<span dir="ltr">`Θ(n^2 * 2^n)`</span>** | <span dir="ltr">`Θ(n * 2^n)`</span> | <span dir="ltr">`n * 2^n`</span> (به جای <span dir="ltr">`n!`</span>) |

---

## ۲. نکات کلیدی و دام‌های تستی کنکور ارشد

- **نکته ۱ (تعداد روش‌های پرانتزگذاری ضرب <span dir="ltr">`n`</span> ماتریس):**
  - برای ضرب <span dir="ltr">`n`</span> ماتریس <span dir="ltr">`A1 * A2 * ... * An`</span>، تعداد روش‌های پرانتزگذاری برابر با عدد کاتالان **<span dir="ltr">`C_{n-1}`</span>** است! (دقت کنید: اندیس کاتالان <span dir="ltr">`n - 1`</span> است؛ یعنی برای ۴ ماتریس برابر <span dir="ltr">`C_3 = 5`</span> حالت و برای ۵ ماتریس برابر <span dir="ltr">`C_4 = 14`</span> حالت است!).
- **نکته ۲ (چرا کوله‌پشتی ۰ و ۱ با زمان <span dir="ltr">`O(nW)`</span> چندجمله‌ای محسوب نمی‌شود؟):**
  - چون در نظریه پیچیدگی، اندازه ورودی بر حسب **تعداد بیت‌های نمایش ظرفیت <span dir="ltr">`W`</span>** یعنی <span dir="ltr">`b = log2(W)`</span> سنجیده می‌شود؛ بنابراین <span dir="ltr">`O(n * W) = O(n * 2^b)`</span> نسبت به طول بیت‌های ورودی **نمایی** است و به چنین الگوریتم‌هایی **شبه‌چندجمله‌ای (<span dir="ltr">`Pseudo-Polynomial`</span>)** می‌گویند!
- **نکته ۳ (حافظه خطی در <span dir="ltr">`LCS`</span>):**
  - اگر فقط **طول** بلندترین زیردنباله مشترک را بخواهیم، تنها نگه داشتن ۲ سطر آخر جدول کافی است و حافظه به **<span dir="ltr">`Θ(min(m, n))`</span>** کاهش می‌یابد (و حتی برای بازسازی خود رشته هم با ترکیب تقسیم و حل و <span dir="ltr">`DP`</span> یعنی الگوریتم هیرشبرگ در همان زمان <span dir="ltr">`Θ(mn)`</span> و حافظه خطی <span dir="ltr">`Θ(m+n)`</span> قابل انجام است).

---

## ۳. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن جدول پیچیدگی زمانی و فضایی ۶ مساله کلاسیک <span dir="ltr">`DP`</span>
- [ ] تمرین تشکیل جدول <span dir="ltr">`MCM`</span> برای ۴ ماتریس و محاسبه کمترین تعداد ضرب اسکالر
- [ ] تسلط بر مفهوم زمان شبه‌چندجمله‌ای (<span dir="ltr">`Pseudo-Polynomial`</span>) در کوله‌پشتی ۰ و ۱

</div>
