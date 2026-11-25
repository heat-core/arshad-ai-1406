<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۱: عامل‌های هوشمند، جست‌وجوی ناآگاهانه و آگاهانه

این فصل **مهم‌ترین و پرتکرارترین مبحث هوش مصنوعی در کنکور ارشد** است و هر سال ۲ تا ۳ تست مستقیم از آن طرح می‌شود.

---

## ۱. درس‌نامه خلاصه و نکات کلیدی

### الف) انواع محیط‌های مساله (<span dir="ltr">`PEAS`</span>)
- **۱. مشاهده‌پذیر کامل (<span dir="ltr">`Fully Observable`</span>) در برابر جزئی (<span dir="ltr">`Partially Observable`</span>):** آیا حسگرها به تمام حالت محیط در هر لحظه دسترسی دارند؟ (مثل شطرنج = کامل؛ پوکر یا رانندگی = جزئی).
- **۲. قطعی (<span dir="ltr">`Deterministic`</span>) در برابر تصادفی (<span dir="ltr">`Stochastic`</span>):** اگر حالت بعدی محیط کاملاً توسط حالت فعلی و عمل عامل تعیین شود، محیط قطعی است.
- **۳. مقطعی (<span dir="ltr">`Episodic`</span>) در برابر ترتیبی (<span dir="ltr">`Sequential`</span>):** در محیط مقطعی، تصمیم فعلی روی تصمیم‌های آینده اثر ندارد (مثل تشخیص قطعه معیوب در خط تولید).
- **۴. ایستا (<span dir="ltr">`Static`</span>) در برابر پویا (<span dir="ltr">`Dynamic`</span>):** اگر محیط در حین فکر کردن عامل تغییر کند، پویاست؛ اگر محیط تغییر نکند ولی امتیاز کارایی عامل با گذشت زمان کم شود، **نیمه‌پویا (<span dir="ltr">`Semidynamic`</span>)** است (مثل شطرنج با ساعت).

---

### ب) جدول طلایی مقایسه الگوریتم‌های جست‌وجوی ناآگاهانه (<span dir="ltr">`Uninformed Search`</span>)

پارامترها:
- ضریب انشعاب: <span dir="ltr">`b`</span>
- عمق کم‌عمق‌ترین جواب: <span dir="ltr">`d`</span>
- حداکثر عمق فضای حالت: <span dir="ltr">`m`</span>
- هزینه بهینه جواب: <span dir="ltr">`C*`</span> و حداقل هزینه هر گام مثبت: <span dir="ltr">`ε`</span>

| الگوریتم | کامل است؟ (<span dir="ltr">`Complete`</span>) | بهینه است؟ (<span dir="ltr">`Optimal`</span>) | پیچیدگی زمانی (<span dir="ltr">`Time`</span>) | پیچیدگی فضایی (<span dir="ltr">`Space`</span>) |
| :--- | :---: | :---: | :---: | :---: |
| **سطح اول (<span dir="ltr">`BFS`</span>)** | بله (اگر <span dir="ltr">`b`</span> متناهی باشد) | بله (اگر هزینه همه یال‌ها یکسان باشد) | <span dir="ltr">`O(b^d)`</span> | <span dir="ltr">`O(b^d)`</span> |
| **هزینه یکنواخت (<span dir="ltr">`UCS`</span>)** | بله (اگر هزینه هر گام <span dir="ltr">`≥ ε > 0`</span> باشد) | **بله (همیشه)** | <span dir="ltr">`O(b^(1 + floor(C*/ε)))`</span> | <span dir="ltr">`O(b^(1 + floor(C*/ε)))`</span> |
| **عمق اول (<span dir="ltr">`DFS`</span>)** | خیر (در فضای نامتناهی یا دارای دور در جست‌وجوی درختی) | **خیر** | <span dir="ltr">`O(b^m)`</span> | **<span dir="ltr">`O(b * m)`</span> (مزیت اصلی: حافظه خطی)** |
| **عمیق‌کننده تکراری (<span dir="ltr">`IDS`</span>)** | بله (اگر <span dir="ltr">`b`</span> متناهی باشد) | بله (اگر هزینه گام‌ها یکسان باشد) | <span dir="ltr">`O(b^d)`</span> | **<span dir="ltr">`O(b * d)`</span>** |
| **دوجهته (<span dir="ltr">`Bidirectional`</span>)** | بله | بله (با <span dir="ltr">`BFS`</span> و هزینه یکسان) | <span dir="ltr">`O(b^(d/2))`</span> | <span dir="ltr">`O(b^(d/2))`</span> |

---

### پ) جست‌وجوی آگاهانه (<span dir="ltr">`Informed / Heuristic Search`</span>) و الگوریتم <span dir="ltr">`A*`</span>

در الگوریتم <span dir="ltr">`A*`</span> تابع ارزیابی هر گره برابر است با:
- فرمول پایه: <span dir="ltr">`f(n) = g(n) + h(n)`</span>
  - مقدار <span dir="ltr">`g(n)`</span>: هزینه واقعی طی‌شده از ریشه تا گره <span dir="ltr">`n`</span>.
  - مقدار <span dir="ltr">`h(n)`</span>: تخمین (هیوریستیک) هزینه کمترین مسیر از گره <span dir="ltr">`n`</span> تا هدف.

#### دو شرط حیاتی برای بهینه بودن <span dir="ltr">`A*`</span>:
- **۱. شرط قابل قبول بودن (<span dir="ltr">`Admissibility`</span> — کافی برای جست‌وجوی درختی <span dir="ltr">`Tree Search`</span>):**
  - تابع هیوریستیک هرگز نباید هزینه رسیدن به هدف را **بیشتر از مقدار واقعی (<span dir="ltr">`h*(n)`</span>)** تخمین بزند:
  - رابطه: <span dir="ltr">`0 ≤ h(n) ≤ h*(n)`</span>
- **۲. شرط سازگاری یا یکنواختی (<span dir="ltr">`Consistency / Monotonicity`</span> — لازم برای جست‌وجوی گرافی <span dir="ltr">`Graph Search`</span>):**
  - برای هر گره <span dir="ltr">`n`</span> و هر فرزند <span dir="ltr">`n'`</span> که با عمل <span dir="ltr">`a`</span> و هزینه گام <span dir="ltr">`c(n, a, n')`</span> حاصل می‌شود، باید نامساوی مثلثی زیر برقرار باشد:
  - رابطه: <span dir="ltr">`h(n) ≤ c(n, a, n') + h(n')`</span>
  - نتیجه مهم: **هر هیوریستیک سازگار، حتماً قابل قبول است** (اگر <span dir="ltr">`h(Goal) = 0`</span> باشد)، اما **هر هیوریستیک قابل قبولی الزاماً سازگار نیست!**

#### تسلط هیوریستیک‌ها (<span dir="ltr">`Dominance`</span>):
- اگر دو هیوریستیک <span dir="ltr">`h1`</span> و <span dir="ltr">`h2`</span> هر دو قابل قبول باشند و به ازای تمام گره‌ها <span dir="ltr">`h2(n) ≥ h1(n)`</span> باشد، می‌گوییم <span dir="ltr">`h2`</span> بر <span dir="ltr">`h1`</span> تسلط دارد و الگوریتم <span dir="ltr">`A*`</span> با <span dir="ltr">`h2`</span> تعداد گره‌های کمتر یا مساوی <span dir="ltr">`h1`</span> بسط می‌دهد.
- ترکیب دو هیوریستیک قابل قبول: <span dir="ltr">`h(n) = max(h1(n), h2(n))`</span> همیشه قابل قبول است و بر هر دو تسلط دارد (اما جمع آن‌ها <span dir="ltr">`h1 + h2`</span> ممکن است قابل قبول نباشد!).

---

## ۲. دام‌های تستی پرتکرار کنکور ارشد

- **دام ۱:** در جست‌وجوی گرافی (<span dir="ltr">`Graph Search`</span> با لیست بسته <span dir="ltr">`Closed List`</span>)، صرفِ «قابل قبول بودن» هیوریستیک برای بهینگی <span dir="ltr">`A*`</span> کافی نیست و حتماً باید هیوریستیک **سازگار (<span dir="ltr">`Consistent`</span>)** باشد تا وقتی گره‌ای از صف اولویت خارج می‌شود، مطمئن باشیم کوتاه‌ترین مسیر به آن پیدا شده است.
- **دام ۲:** در الگوریتم <span dir="ltr">`BFS`</span> استاندارد، تست هدف در **زمان تولید گره (<span dir="ltr">`Generation Time`</span>)** انجام می‌شود تا پیچیدگی <span dir="ltr">`O(b^d)`</span> بماند، اما در <span dir="ltr">`UCS`</span> و <span dir="ltr">`A*`</span> تست هدف حتماً باید در **زمان بسط گره (خروج از صف اولویت — <span dir="ltr">`Expansion Time`</span>)** انجام شود، وگرنه اولین مسیرِ پیدا شده به هدف ممکن است بهینه نباشد!
- **دام ۳:** الگوریتم <span dir="ltr">`IDS`</span> (عمیق‌کننده تکراری) با اینکه گره‌های سطوح بالا را چندین بار تولید می‌کند، اما سربار زمانی آن بسیار کم است؛ مثلاً برای <span dir="ltr">`b = 10`</span> و <span dir="ltr">`d = 5`</span>، تعداد گره‌های تولیدشده در <span dir="ltr">`IDS`</span> تنها حدود ۱۱ درصد بیشتر از <span dir="ltr">`BFS`</span> است، در حالی که مصرف حافظه را از نمایی به خطی <span dir="ltr">`O(bd)`</span> می‌رساند.

---

## ۳. چک‌لیست مطالعه این فصل

- [ ] مطالعه کامل تفاوت جست‌وجوی درختی و گرافی
- [ ] حفظ کردن جدول پیچیدگی زمانی و فضایی ۵ الگوریتم ناآگاهانه
- [ ] حل ۵ تست از تشخیص قابل قبول بودن و سازگار بودن <span dir="ltr">`h(n)`</span> روی گراف
- [ ] بررسی روش ساخت هیوریستیک از روی «مساله مقیدزدایی‌شده (<span dir="ltr">`Relaxed Problem`</span>)» مثل فاصله منهتن در پازل ۸ تایی

</div>
