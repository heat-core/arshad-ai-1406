<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# فصل ۲: تحلیل زمانی مدارهای ترتیبی (حداکثر فرکانس)، مخاطرات (<span dir="ltr">`Hazards`</span>) و کدهای <span dir="ltr">`Verilog / VHDL`</span>

با ممیزی مستقیم دفترچه کنکور ارشد سال‌های اخیر (سوالات ۷۶، ۸۰ و ۸۱ کنکور ۱۴۰۳)، این سه مبحث در کنکورهای جدید به شدت مورد توجه طراحان قرار گرفته‌اند و در ساختار جدید ۱۴۰۶ که مدار منطقی **ضریب ۴** دارد، اهمیت دوچندان دارند.

---

## ۱. فرمول طلایی حداکثر فرکانس ساعت در مدارهای ترتیبی سنکرون (سوال ۸۱ کنکور ۱۴۰۳)

در یک مدار ترتیبی سنکرون، سیگنال باید پس از لبه کلاک از خروجی فلیپ‌فلاپ مبدا خارج شود (<span dir="ltr">`T_{clk-to-q}`</span>)، از طولانی‌ترین مسیر گیت‌های ترکیبی بین دو فلیپ‌فلاپ عبور کند (<span dir="ltr">`T_{comb, max}`</span>) و حداقل به اندازه زمان برپایی (<span dir="ltr">`T_{setup}`</span>) قبل از لبه کلاک بعدی به ورودی فلیپ‌فلاپ مقصد برسد:
- **فرمول حداقل دوره تناوب مجاز ساعت (<span dir="ltr">`T_{clock, min}`</span>):**
  - **<span dir="ltr">`T_{clock, min} = T_{clk-to-q} + T_{comb, max} + T_{setup}`</span>**
- **فرمول حداکثر فرکانس کاری مدار (<span dir="ltr">`f_{max}`</span>):**
  - **<span dir="ltr">`f_{max} = 1 / T_{clock, min}`</span>**
- **نکته طلایی ۱:** زمان نگهداری (<span dir="ltr">`T_{hold}`</span>) در فرمول حداکثر فرکانس ساعت **هیچ نقشی ندارد!** (فقط برای بررسی عدم نقض حداقل تاخیر <span dir="ltr">`T_{clk-to-q} + T_{comb, min} ≥ T_{hold}`</span> استفاده می‌شود؛ در کنکور مقدار <span dir="ltr">`T_{hold}`</span> را به عنوان اطلاعات انحرافی می‌دهند تا داوطلب به اشتباه آن را هم جمع بزند!).
- **نکته طلایی ۲:** مسیرهایی که فقط از **ورودی‌های خارجی (<span dir="ltr">`Primary Inputs`</span>)** با زمان ورود صفر به فلیپ‌فلاپ می‌روند و از خروجی فلیپ‌فلاپ قبلی شروع نشده‌اند، زمان <span dir="ltr">`T_{clk-to-q}`</span> ندارند (فقط <span dir="ltr">`T_{input_comb} + T_{setup}`</span> دارند).

---

## ۲. مخاطرات ایستا در مدارهای ترکیبی (<span dir="ltr">`Static-1 and Static-0 Hazards`</span> — سوال ۷۶ کنکور ۱۴۰۳)

مخاطره (<span dir="ltr">`Hazard / Glitch`</span>) پرش لحظه‌ای ناخواسته در خروجی مدار به دلیل تاخیر متفاوت مسیرها (معمولاً تاخیر گیت <span dir="ltr">`NOT`</span>) هنگام تغییر **یک متغیر ورودی** است:
- **۱. مخاطره ایستای ۱ (<span dir="ltr">`Static-1 Hazard`</span> — در مدارهای <span dir="ltr">`SOP / AND-OR`</span>):**
  - خروجی باید در حالت **۱** ثابت بماند، اما لحظه‌ای به **۰** می‌پرد.
  - **روش تشخیص روی مدار یا جدول کارنو:** دو دسته ۱ مجاور در جدول کارنو که توسط هیچ حلقه (<span dir="ltr">`Product Term`</span>) مشترکی پوشانده نشده‌اند! اگر متغیری که هم خودش (<span dir="ltr">`X`</span>) و هم نقیضش (<span dir="ltr">`X'`</span>) در دو جمله مختلف است تغییر کند، به ازای مقادیری از سایر متغیرها که آن دو جمله را فعال نگه می‌دارند و بقیه جملات را صفر می‌کنند، هنگام گذار از **<span dir="ltr">`X = 1`</span> به <span dir="ltr">`X = 0`</span>** (به دلیل تاخیر گیت <span dir="ltr">`NOT`</span> روی <span dir="ltr">`X'`</span>)، هر دو جمله لحظه‌ای صفر شده و هازارد رخ می‌دهد!
- **۲. مخاطره ایستای ۰ (<span dir="ltr">`Static-0 Hazard`</span> — در مدارهای <span dir="ltr">`POS / OR-AND`</span>):**
  - خروجی باید ۰ بماند، اما لحظه‌ای به ۱ می‌پرد (هنگام گذار از <span dir="ltr">`X = 0`</span> به <span dir="ltr">`X = 1`</span> در گیت <span dir="ltr">`OR`</span> شامل <span dir="ltr">`X`</span> و <span dir="ltr">`X'`</span>).

---

## ۳. راهنمای سریع خواندن کدهای <span dir="ltr">`Verilog`</span> و <span dir="ltr">`VHDL`</span> در کنکور (سوال ۸۰ کنکور ۱۴۰۳)

در کنکور ارشد هر دو کد <span dir="ltr">`Verilog`</span> و <span dir="ltr">`VHDL`</span> را زیر هم می‌دهند تا داوطلب با هر کدام راحت‌تر است حل کند:
- **عبارت <span dir="ltr">`always @(posedge d or negedge e)`</span> در وریلاگ (یا <span dir="ltr">`if e = '0' ... elsif rising_edge(d)`</span> در <span dir="ltr">`VHDL`</span>):**
  - یعنی سیگنال <span dir="ltr">`e`</span> یک **ریست آسنکرون فعال‌پایین (<span dir="ltr">`Active-Low Asynchronous Reset`</span>)** است! هر زمان <span dir="ltr">`e = 0`</span> باشد، خروجی <span dir="ltr">`z`</span> صفر است.
  - هرگاه <span dir="ltr">`e = 1`</span> باشد، مدار **فقط و فقط در لحظه لبه بالارونده سیگنال <span dir="ltr">`d`</span> (<span dir="ltr">`posedge d / rising_edge(d)`</span>)** مقادیر <span dir="ltr">`A`</span> و <span dir="ltr">`B`</span> را در آن لحظه خوانده و با <span dir="ltr">`z`</span> جمع می‌زند! (تغییرات <span dir="ltr">`A`</span> و <span dir="ltr">`B`</span> در وسط سیکل یا در لبه پایین‌رونده <span dir="ltr">`d`</span> هیچ تاثیری روی <span dir="ltr">`z`</span> ندارد!).

---

## ۴. چک‌لیست مطالعه این فصل

- [ ] حفظ کردن فرمول <span dir="ltr">`T_clk = T_cq + T_comb_max + T_setup`</span> و نادیده گرفتن <span dir="ltr">`T_hold`</span> در فرمول فرکانس
- [ ] تمرین تشخیص گذار ورودی ایجادکننده هازارد (<span dir="ltr">`1 -> 0`</span> در مدار <span dir="ltr">`AND-OR`</span> با گیت <span dir="ltr">`NOT`</span>)
- [ ] تمرین حل تست شکل موج <span dir="ltr">`Verilog / VHDL`</span> از دفترچه کنکور ۱۴۰۳ (سوال ۸۰)

</div>
