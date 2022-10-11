# LINKPENDEKIN
## Shorter URL Website
#### Easy to use and have high performance 🚀


## 🖥️ Tech Stack
**Frontend:**

![reactjs](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![react-router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)&nbsp;

**Backend:**

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![jwt](	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;


## 🎊 Features
- Buat link pendek tanpa login
- Buat custom link pendek
- Generate otomatis link pendek
- Login/Signup User Account
- Dashboard pengelolaan link
- Ubah link yang pernah dibuat
- Generate QR Code
- Statistik jumlah pengunjung link

## Sneak Peek of Home Page 🙈 :
![image](https://user-images.githubusercontent.com/49114801/195119600-25acfc90-0445-4250-ab32-4c4b6ee6907c.png)

## Instalasi:
1. Clone repository.
```sh
git clone https://github.com/zakihaha/linkpendekin.git
```

2. Instal dependensi menggunakan NPM
```sh
# backend
cd linkpendekin
npm i

# frontend
cd home.linkpendekin
npm i
```

3. Jalankan service MySQL (dapat menggunakan XAMPP atau laragon)
4. Buat database baru bernama linkpendekin
5. Sesuaikan konfigurasi database di .env backend folder linkpendekin
```sh
# backend
TZ=+07:00
DB_HOST=...
DB_NAME=...
DB_USER=...
DB_PASS=...
```

6. Migrate table
```sh
# backend
cd linkpendekin
npx sequelize db:migrate
```

7. Jalankan project
```sh
# backend
cd linkpendekin
nodemon index.js

# frontend
cd home.linkpendekin
npm start
```

### Info tambahan
Apabila Anda akan mendeploy website ini, pastikan ubah beberapa environtment variable dibawah:
```sh
# backend .env
BASE_URL=http://localhost:2000 (Url backend)
FRONTEND_URL=http://localhost:3000 (Url frontend)

# frontend .env
REACT_APP_BACKEND_PROTOCOL=http (protocol url backend, http/ https)
REACT_APP_BACKEND_DOMAIN=localhost:2000 (nama domain backend, tanpa http/ https)
```
