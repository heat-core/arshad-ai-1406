<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۲: فضاهای برداری، رتبه (<span dir="ltr">`Rank`</span>)، قضیه بعد و نگاشت‌های خطی

---

## ۱. چهار زیرفضای بنیادی یک ماتریس <span dir="ltr">`A`</span> از مرتبه <span dir="ltr">`m × n`</span> (قضیه بنیادی جبر خطی استرنگ)

فرض کنید رتبه ماتریس <span dir="ltr">`A_{m × n}`</span> برابر **<span dir="ltr">`r = rank(A)`</span>** باشد (همیشه <span dir="ltr">`r ≤ min(m, n)`</span>):
- **۱. فضای ستونی (<span dir="ltr">`Column Space: Col(A)`</span> یا برد <span dir="ltr">`Range`</span>):** زیرفضایی از <span dir="ltr">`R^m`</span> با بعد **<span dir="ltr">`dim(Col(A)) = r`</span>**.
- **۲. فضای سطری (<span dir="ltr">`Row Space: Row(A)`</span>):** زیرفضایی از <span dir="ltr">`R^n`</span> با بعد **<span dir="ltr">`dim(Row(A)) = r`</span>** (بعد فضای سطری و ستونی هر ماتریسی همیشه با هم برابرند!).
- **۳. فضای پوچ یا هسته (<span dir="ltr">`Null Space: Null(A)`</span> — مجموعه جواب‌های <span dir="ltr">`AX = 0`</span>):** زیرفضایی از <span dir="ltr">`R^n`</span> با بعد (پوچی):
  - فرمول طلایی قضیه رتبه-پوچی (<span dir="ltr">`Rank-Nullity Theorem`</span>):
  - **<span dir="ltr">`rank(A) + nullity(A) = n`</span>** (که <span dir="ltr">`n`</span> **تعداد ستون‌ها** است!) ← پس **<span dir="ltr">`dim(Null(A)) = n - r`</span>**.
- **۴. فضای پوچ چپ (<span dir="ltr">`Left Null Space: Null(A^T)`</span>):** زیرفضایی از <span dir="ltr">`R^m`</span> با بعد **<span dir="ltr">`dim(Null(A^T)) = m - r`</span>**.
- **روابط تعامد چهار زیرفضا (سوال محبوب کنکور!):**
  - در <span dir="ltr">`R^n`</span>: **فضای سطری <span dir="ltr">`Row(A)`</span> و فضای پوچ <span dir="ltr">`Null(A)`</span> مکمل متعامد یکدیگرند!**
  - در <span dir="ltr">`R^m`</span>: **فضای ستونی <span dir="ltr">`Col(A)`</span> و فضای پوچ چپ <span dir="ltr">`Null(A^T)`</span> مکمل متعامد یکدیگرند!**

---

## ۲. نامساوی‌های طلایی رتبه ماتریس (<span dir="ltr">`Rank Inequalities`</span>)

- **۱. رتبه ترانهاده و ضرب در ترانهاده (بسیار مهم در یادگیری ماشین و رگرسیون):**
  - برای هر ماتریس حقیقی <span dir="ltr">`A_{m × n}`</span> همیشه تساوی زیر برقرار است:
  - فرمول طلایی: **<span dir="ltr">`rank(A) = rank(A^T) = rank(A^T A) = rank(A A^T)`</span>**
- **۲. رتبه ضرب دو ماتریس:**
  - کران بالا: **<span dir="ltr">`rank(A * B) ≤ min(rank(A), rank(B))`</span>**
  - کران پایین (نامساوی سیلوستر برای <span dir="ltr">`A_{m×n}`</span> و <span dir="ltr">`B_{n×k}`</span>): **<span dir="ltr">`rank(A * B) ≥ rank(A) + rank(B) - n`</span>**
  - اگر در ماتریس <span dir="ltr">`A`</span> یک ماتریس **وارون‌پذیر (غیرتبهگن)** از چپ یا راست ضرب شود، رتبه تغییر نمی‌کند!
- **۳. رتبه جمع دو ماتریس:**
  - رابطه: **<span dir="ltr">`|rank(A) - rank(B)| ≤ rank(A + B) ≤ rank(A) + rank(B)`</span>**
- **۴. ماتریس با رتبه ۱ (<span dir="ltr">`Rank-1 Matrix`</span>):**
  - هر ماتریس غیرصفر به شکل ضرب خارجی دو بردار ستونی یعنی **<span dir="ltr">`A = u * v^T`</span>** دارای **رتبه ۱ (<span dir="ltr">`rank(A) = 1`</span>)** است!
  - در ماتریس رتبه ۱ از مرتبه <span dir="ltr">`n × n`</span>: دقیقاً **<span dir="ltr">`n - 1`</span> تا از مقادیر ویژه برابر ۰** هستند و تنها مقدار ویژه غیرصفر برابر با **<span dir="ltr">`Trace(A) = v^T u`</span>** است! (این نکته ده‌ها تست سخت مقادیر ویژه را در ۵ ثانیه حل می‌کند!).

---

## ۳. نگاشت‌های خطی (<span dir="ltr">`Linear Transformations: T: V -> W`</span>)

- نگاشت خطی <span dir="ltr">`T`</span> **یک‌به‌یک (<span dir="ltr">`Injective`</span>)** است اگر و تنها اگر هسته آن فقط بردار صفر باشد: **<span dir="ltr">`Ker(T) = {0}`</span>** (یعنی <span dir="ltr">`nullity(T) = 0`</span> یا <span dir="ltr">`rank = dim(V)`</span>).
- نگاشت خطی <span dir="ltr">`T`</span> **پوشا (<span dir="ltr">`Surjective`</span>)** است اگر و تنها اگر برد آن کل فضای مقصد باشد: **<span dir="ltr">`rank(T) = dim(W)`</span>**.
- اگر <span dir="ltr">`dim(V) = dim(W) = n`</span> (متناهی‌بعد) باشد: **یک‌به‌یک بودن، پوشا بودن و وارون‌پذیر بودن <span dir="ltr">`T`</span> همگی با هم معادل‌اند!**

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن فرمول <span dir="ltr">`rank(A) + nullity(A) = n`</span> (تعداد ستون‌ها) و روابط تعامد ۴ زیرفضا
- [ ] حفظ کردن تساوی <span dir="ltr">`rank(A^T A) = rank(A)`</span>
- [ ] تسلط بر ترفند ماتریس‌های رتبه ۱ (<span dir="ltr">`u v^T`</span> که مقادیر ویژه‌شان <span dir="ltr">`n-1`</span> تا صفر و یکی برابر <span dir="ltr">`Trace(A)`</span> است!)

</div>
