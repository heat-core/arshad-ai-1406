<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۳: درخت‌های دودویی، درخت جست‌وجوی دودویی (<span dir="ltr">`BST`</span>) و درخت <span dir="ltr">`AVL`</span>

این فصل **پرتست‌ترین بخش درس ساختمان داده‌ها** در کنکور ارشد است (معمولاً ۲ تا ۳ سوال مستقیم در هر کنکور).

---

## ۱. روابط طلایی در درخت‌ها و درخت‌های دودویی

- **۱. در هر درخت دلخواه با <span dir="ltr">`n`</span> گره:** تعداد یال‌ها برابر **<span dir="ltr">`n - 1`</span>** است.
- **۲. در هر درخت دودویی (<span dir="ltr">`Binary Tree`</span>):** اگر <span dir="ltr">`n0`</span> تعداد برگ‌ها (درجه ۰) و <span dir="ltr">`n2`</span> تعداد گره‌های با دو فرزند (درجه ۲) باشد، همیشه رابطه زیر برقرار است:
  - فرمول طلایی: **<span dir="ltr">`n0 = n2 + 1`</span>**
- **۳. در درخت <span dir="ltr">`k`</span>-تایی پر (<span dir="ltr">`Full k-ary Tree`</span> که هر گره داخلی دقیقاً <span dir="ltr">`k`</span> فرزند دارد):**
  - با <span dir="ltr">`I`</span> گره داخلی، تعداد برگ‌ها برابر است با: **<span dir="ltr">`L = (k - 1) * I + 1`</span>** و تعداد کل گره‌ها **<span dir="ltr">`N = k * I + 1`</span>**.
- **۴. تعداد اشاره‌گرهای تهی (<span dir="ltr">`NULL`</span>) در درخت دودویی با <span dir="ltr">`n`</span> گره:** همیشه برابر **<span dir="ltr">`n + 1`</span>** است (که در درخت دودویی نخی یا <span dir="ltr">`Threaded Binary Tree`</span> به نخ تبدیل می‌شوند).
- **۵. تعداد درخت‌های دودویی متمایز با <span dir="ltr">`n`</span> گره بی‌نام (یا تعداد <span dir="ltr">`BST`</span>های متمایز با <span dir="ltr">`n`</span> کلید متمایز):**
  - برابر با عدد کاتالان **<span dir="ltr">`C_n = [1 / (n + 1)] * C(2n, n)`</span>** است.
  - اگر گره‌ها برچسب‌دار (متمایز) باشند و شرط <span dir="ltr">`BST`</span> نباشد: برابر با **<span dir="ltr">`n! * C_n`</span>** است.

---

## ۲. پیمایش‌های درخت دودویی (<span dir="ltr">`Traversals`</span>) و بازسازی یکتا

- **پیشوندی (<span dir="ltr">`Preorder`</span>):** ریشه ← چپ ← راست (اولین عنصر همیشه ریشه است).
- **میانوندی (<span dir="ltr">`Inorder`</span>):** چپ ← ریشه ← راست (عناصر قبل از ریشه در زیردرخت چپ و بعد از آن در زیردرخت راست هستند).
- **پسوندی (<span dir="ltr">`Postorder`</span>):** چپ ← راست ← ریشه (آخرین عنصر همیشه ریشه است).

### قانون بازسازی یکتای درخت دودویی (سوال تکراری کنکور):
- داشتن **<span dir="ltr">`Inorder`</span>** به همراه یکی از پیمایش‌های **<span dir="ltr">`Preorder`</span>** یا **<span dir="ltr">`Postorder`</span>** یا **<span dir="ltr">`Level-order`</span>**، درخت دودویی را **به طور یکتا** مشخص می‌کند!
- اما داشتن <span dir="ltr">`Preorder + Postorder`</span> به تنهایی درخت دودویی عمومی را یکتا مشخص **نمی‌کند**، **مگر اینکه درخت پر (<span dir="ltr">`Full/Proper`</span> یعنی هر گره ۰ یا ۲ فرزند داشته باشد)!**

---

## ۳. درخت جست‌وجوی دودویی (<span dir="ltr">`BST`</span>)

- **ویژگی اصلی:** پیمایش **<span dir="ltr">`Inorder`</span>** یک درخت <span dir="ltr">`BST`</span> همیشه کلیدها را به صورت **مرتب صعودی** چاپ می‌کند!
- بنابراین در یک <span dir="ltr">`BST`</span> با کلیدهای مشخص، چون پیمایش <span dir="ltr">`Inorder`</span> خودبه‌خود معلوم است (مرتب‌شده کلیدها)، صرفاً داشتن **<span dir="ltr">`Preorder`</span> به تنهایی** یا **<span dir="ltr">`Postorder`</span> به تنهایی** درخت <span dir="ltr">`BST`</span> را یکتا می‌سازد!
- پیچیدگی جست‌وجو، درج و حذف در <span dir="ltr">`BST`</span>: از مرتبه ارتفاع درخت یعنی **<span dir="ltr">`O(h)`</span>** است که در حالت متوازن <span dir="ltr">`O(log n)`</span> و در بدترین حالت (درخت کج) <span dir="ltr">`O(n)`</span> می‌شود.

---

## ۴. درخت متوازن <span dir="ltr">`AVL`</span>

یک درخت <span dir="ltr">`BST`</span> است که در آن برای هر گره، اختلاف ارتفاع زیردرخت چپ و راست حداکثر ۱ است: <span dir="ltr">`BF = |h_L - h_R| ≤ 1`</span>.

### الف) کمترین تعداد گره در درخت <span dir="ltr">`AVL`</span> با ارتفاع <span dir="ltr">`h`</span> (درخت فیبوناچی):
- رابطه بازگشتی کمترین تعداد گره: **<span dir="ltr">`N(h) = N(h - 1) + N(h - 2) + 1`</span>**
- مقادیر پایه (با فرض ارتفاع تک‌گره برابر ۰ یا ۱ — دقت به تعریف صورت سوال!):
  - اگر ارتفاع تک‌گره را <span dir="ltr">`h = 0`</span> بگیریم (<span dir="ltr">`N(0) = 1, N(1) = 2`</span>):
    - مقادیر <span dir="ltr">`N(h)`</span> به ازای <span dir="ltr">`h = 0, 1, 2, 3, 4, 5, 6`</span> به ترتیب عبارت‌اند از: **۱، ۲، ۴، ۷، ۱۲، ۲۰، ۳۳، ۵۴**.
- حداکثر ارتفاع درخت <span dir="ltr">`AVL`</span> با <span dir="ltr">`n`</span> گره حدود **<span dir="ltr">`1.44 log2(n)`</span>** است؛ بنابراین تمام عملیات جست‌وجو، درج و حذف در بدترین حالت **<span dir="ltr">`O(log n)`</span>** هستند.

### ب) دوران‌ها در درج و حذف درخت <span dir="ltr">`AVL`</span> (دام بسیار مهم کنکور!)
- **در هنگام درج (<span dir="ltr">`Insertion`</span>) یک کلید در <span dir="ltr">`AVL`</span>:** حداکثر **۱ دوران** (تکی <span dir="ltr">`LL / RR`</span> یا دوگانه <span dir="ltr">`LR / RL`</span>) در اولین جدِ نامتوازن کافی است تا کل درخت دوباره متوازن شود!
- **در هنگام حذف (<span dir="ltr">`Deletion`</span>) یک کلید از <span dir="ltr">`AVL`</span>:** ممکن است عدم توازن تا ریشه منتشر شود و تا **<span dir="ltr">`O(log n)`</span> دوران** نیاز باشد!

---

## ۵. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن دنباله کمترین گره‌های درخت <span dir="ltr">`AVL`</span> (۱، ۲، ۴، ۷، ۱۲، ۲۰، ۳۳، ۵۴)
- [ ] تمرین بازسازی سریع درخت دودویی از روی <span dir="ltr">`Inorder`</span> و <span dir="ltr">`Preorder / Postorder`</span>
- [ ] تسلط بر ۴ دوران <span dir="ltr">`LL, RR, LR, RL`</span> و تفاوت تعداد دوران در درج (حداکثر ۱) و حذف (<span dir="ltr">`O(log n)`</span>)

</div>
