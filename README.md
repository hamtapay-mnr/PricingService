# PricingService

وظیفه این سرویس دریافت نرخ جهانی طلا و محاسبه قیمت لحظه ای بر اساس موجودی لحظه ای فروشگاه میباشد.
ویژگی های کلیدی این سرویس به شرح زیر میباشد:
- بروز بودن با نرخ جهانی طلا. با کمترین تعداد درخواست خارجی ممکن
- در صورتی که موجودی فروشگاه بین ۲۰٪تا۵۰٪‌ موجودی اولیه باشد قیمت ۵ درصد افزایش میابد
- در صورتی که موجودی فروشگاه کمتر از ۲۰٪ موجودی اولیه باشد قیمت ۱۰ درصد افزایش میابد
- روشی بهینه برای ذخیره و بازیابی قیمتهای بروزشده
- اطلاع رسانی به سایر بخش های سیستم در صورت تغییر قیمت
- مقیاس پذیر در مقابل ترافیک بالا
