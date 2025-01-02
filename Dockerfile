# از یک تصویر پایه برای Node.js استفاده می‌کنیم
FROM node:16

# پوشه‌ای برای پروژه داخل کانتینر ایجاد می‌کنیم
WORKDIR /usr/src/app

# کپی کردن فایل‌های package.json و package-lock.json به کانتینر
COPY package*.json ./

# نصب وابستگی‌ها
RUN npm install

# کپی کردن تمام فایل‌های پروژه به کانتینر
COPY . .

# پورت مورد استفاده برای اپلیکیشن (اگر پورت خاصی استفاده می‌کنید، می‌توانید آن را تغییر دهید)
EXPOSE 3400

# اجرای اپلیکیشن
CMD ["npm", "start"]