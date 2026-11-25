<div dir="rtl" style="text-align: right; direction: rtl; unicode-bidi: plaintext;">

# سرفصل کامل، منابع و استراتژی مطالعه: معماری کامپیوتر (ضریب ۴ — کنکور ۱۴۰۶)

در ساختار جدید کنکور ارشد مهندسی و علم کامپیوتر **۱۴۰۶**، درس **معماری کامپیوتر** از باکس تخصصی ۳ (با ضریب قدیم ۲) به بلوک یکپارچه دروس تخصصی با **ضریب ۴** ارتقا یافته است. بر همین اساس، این درس اکنون هم‌وزن هوش مصنوعی، سیستم‌عامل و نظریه زبان‌ها (حدود **۷.۱۴٪ تا ۸.۱۶٪** از کل نمره خام آزمون) است و دیگر نمی‌توان آن را به‌صورت سطحی رها کرد.

---

## ۱. فایل‌های آموزشی موجود در این پوشه

- **۱. راهنمای مباحث پرتکرار و فرمول‌های سریع:** <span dir="ltr">[00_Selective_HighYield_Guide.md](./00_Selective_HighYield_Guide.md)</span>
  - پوشش دقیق ۴ فصل بسیار تست‌خیز کنکور: حافظه نهان (<span dir="ltr">`Cache`</span> و نگاشت مستقیم/انجمنی/مجموعه-انجمنی)، کارایی <span dir="ltr">`CPU`</span> و قانون آمدال (<span dir="ltr">`CPI & Amdahl`</span>)، خط لوله (<span dir="ltr">`Pipeline`</span> و مخاطرات داده‌ای/کنترلی)، و نمایش اعداد ممیز شناور استاندارد <span dir="ltr">`IEEE 754`</span>.
- **۲. فصل تکمیلی و محاسباتی واحد کنترل و <span dir="ltr">`RTL`</span>:** <span dir="ltr">[Ch02_RTL_Control_Unit_&_Booth_Multiplication.md](./Ch02_RTL_Control_Unit_&_Booth_Multiplication.md)</span>
  - پوشش کامل زبان انتقال ثبات (<span dir="ltr">`RTL`</span>)، چرخه واکشی و اجرای کامپیوتر پایه موریس مانو، واحد کنترل سخت‌افزاری و ریزبرنامه‌ریزی‌شده، الگوریتم ضرب بوث (<span dir="ltr">`Booth`</span>) و شیفت‌های حسابی/منطقی (پوشش‌دهنده مستقیم سوالات ۸۷ تا ۸۹ کنکور ۱۴۰۳).

---

## ۲. سرفصل‌های کامل کنکور کارشناسی ارشد معماری کامپیوتر

- **فصل اول — مفاهیم پایه، گذرگاه‌ها و کارایی (<span dir="ltr">`Performance`</span>):**
  - معادله کارایی <span dir="ltr">`CPU Time = IC × CPI × T_clk`</span>، نرخ کلاک، <span dir="ltr">`MIPS`</span> و <span dir="ltr">`MFLOPS`</span>.
  - **قانون آمدال (<span dir="ltr">`Amdahl's Law`</span>):** محاسبه افزایش سرعت (<span dir="ltr">`Speedup`</span>) در حالت ارتقای جزئی از پردازنده یا حافظه.
- **فصل دوم — انتقال ثبات‌ها، ریزعملیات و معماری کامپیوتر پایه (<span dir="ltr">`Mano Basic Computer`</span>):**
  - انتقال‌های <span dir="ltr">`RTL`</span>، ریزعملیات حسابی/منطقی/شیفت، گذرگاه مشترک (<span dir="ltr">`Common Bus`</span>) با <span dir="ltr">`MUX`</span> یا بافر سه‌حالته.
  - ساختار ثبات‌های کامپیوتر پایه موریس مانو (`AC, DR, AR, IR, PC, TR, INPR, OUTR`) و تحلیل جدول کدهای دستور ارجاع به حافظه، ثبات و ورودی/خروجی و چرخه وقفه.
- **فصل سوم — طراحی واحد کنترل (<span dir="ltr">`Control Unit`</span>) و حساب کامپیوتری:**
  - مقایسه واحد کنترل **سخت‌افزاری (<span dir="ltr">`Hardwired`</span>)** و **ریزبرنامه‌ریزی‌شده (<span dir="ltr">`Microprogrammed`</span>)**؛ طراحی قالب ریزمجموعه‌دستورالعمل (<span dir="ltr">`CAR, SBR`</span>) و ریزبرنامه افقی در برابر عمودی.
  - **حساب کامپیوتری:** نمایش ممیز شناور <span dir="ltr">`IEEE 754`</span> (تک‌دقت و مضاعف)، جمع/تفریق، **الگوریتم ضرب بوث (<span dir="ltr">`Booth`</span>)** و ضرب جفت بیتی (<span dir="ltr">`Bit-Pair Recoding`</span>).
- **فصل چهارم — پردازش خط لوله‌ای (<span dir="ltr">`Pipelining`</span>) و معماری <span dir="ltr">`RISC / MIPS`</span>:**
  - محاسبه <span dir="ltr">`Speedup`</span>، کارایی (<span dir="ltr">`Efficiency`</span>) و گذردهی (<span dir="ltr">`Throughput`</span>) در خط لوله ایده‌آل و غیرمتعادل.
  - **مخاطرات خط لوله (<span dir="ltr">`Hazards`</span>):** مخاطره ساختاری، مخاطره داده (`RAW, WAR, WAW`) و روش حل با <span dir="ltr">`Forwarding`</span> و <span dir="ltr">`Stall`</span>، و مخاطره کنترلی (پنجره تاخیر شاخه، پیش‌بینی شاخه استاتیک و دینامیک ۱ بیتی و ۲ بیتی).
- **فصل پنجم — سلسله‌مراتب حافظه، <span dir="ltr">`Cache`</span> و <span dir="ltr">`I/O`</span>:**
  - **حافظه نهان (<span dir="ltr">`Cache`</span>):** نگاشت مستقیم (<span dir="ltr">`Direct`</span>)، تمام‌انجمنی (<span dir="ltr">`Fully Associative`</span>) و مجموعه‌انجمنی (`k-way Set Associative`)، استخراج دقیق بیت‌های <span dir="ltr">`Tag / Index / Block Offset`</span>، سیاست‌های نوشتن (`Write-Through` در برابر `Write-Back`) و <span dir="ltr">`AMAT`</span>.
  - حافظه مجازی (<span dir="ltr">`TLB + Page Table`</span>) مشترک با سیستم‌عامل و روش‌های انتقال <span dir="ltr">`I/O`</span> (برنامه‌ریزی‌شده، وقفه‌ای، <span dir="ltr">`DMA`</span> و سرقت سیکل).

---

## ۳. منابع معتبر پیشنهادی و وزن مطالعه

- **۱. مراجع اصلی دانشگاهی:**
  - کتاب **معماری سیستم‌های کامپیوتری** تالیف **موریس مانو (<span dir="ltr">`M. Morris Mano`</span>)** — مرجع اصلی فصول `RTL`، کامپیوتر پایه، واحد کنترل و حساب کامپیوتری.
  - کتاب **سازمان و طراحی کامپیوتر** تالیف **پترسون و هنسی (<span dir="ltr">`Patterson & Hennessy`</span>)** — مرجع اصلی فصول کارایی، <span dir="ltr">`MIPS`</span>، خط لوله (<span dir="ltr">`Pipeline`</span>) و حافظه نهان (<span dir="ltr">`Cache`</span>).
- **۲. منابع تست کنکوری:**
  - کتاب معماری کامپیوتر **دکتر محمدسعید عابدینی** یا **مهدی پورقلی** (انتشارات پوران پژوهش / نصیر) + تست‌های باکس تخصصی ۳ کنکورهای ۱۳۹۸ تا ۱۴۰۳ (به یاد داشته باشید در کنکورهای ۱۴۰۱ تا ۱۴۰۳ سوالات معماری تقریباً در بازه تست‌های میانی باکس ۷۶ تا ۹۵ قرار دارند).

---

## ۴. چک‌لیست پیشرفت مطالعه معماری کامپیوتر (ضریب ۴)

- [ ] تسلط بر معادله <span dir="ltr">`CPU Time`</span> و قانون آمدال (حداقل ۲۰ تست محاسباتی سریع)
- [ ] تسلط بر <span dir="ltr">`IEEE 754`</span>، نمایش مکمل ۲ و الگوریتم ضرب بوث (<span dir="ltr">`Ch02`</span>)
- [ ] تسلط بر کدهای <span dir="ltr">`RTL`</span> موریس مانو، واحد کنترل سخت‌افزاری و ریزبرنامه افقی/عمودی (<span dir="ltr">`Ch02`</span>)
- [ ] تحلیل کامل بیت‌های <span dir="ltr">`Tag / Index / Offset`</span> در سه نوع نگاشت <span dir="ltr">`Cache`</span> و محاسبه <span dir="ltr">`AMAT`</span>
- [ ] تحلیل دقیق <span dir="ltr">`RAW`</span>، <span dir="ltr">`Forwarding`</span> و محاسبه <span dir="ltr">`CPI`</span> مؤثر در خط لوله با مخاطره شاخه و حافظه
- [ ] حل سوالات معماری کامپیوتر کنکورهای ۱۴۰۰، ۱۴۰۱، ۱۴۰۲ و ۱۴۰۳ (بدون حل تست‌های الکترونیک دیجیتال حذف‌شده!)

</div>
