// Membuat server dengan express

// Menggunakan import dari nodejs
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
// Membuat router
const router = express.Router();

// // Membuat endpoint
// router.use("/products", (req, res, next) => {
// 	// request yang paling sering digunakan
// 	console.log("url :", req.originalUrl);
// 	console.log("method :", req.method);

// 	// Mengirim respon dalam bentuk json
// 	res.json({ name: "Fajar Islami", email: "fajar@gmail.com" });

// 	// Supaya server lanjut berjalan tidak berhenti disini
// 	// Lanjut ke method selanjutnya
// 	next();
// });

// router.use("/price", (req, res, next) => {
// 	res.json({ price: "10000" });
// 	next();
// });

// Memangggil router
// const productRoutes = require("./src/routes/products");
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

// Untuk Penyimpanan File
const fileStorage = multer.diskStorage({
  // Lokasi
  destination: (req, file, cb) => {
    cb(null, 'images'); //Tidak ada error, images == tempat penyimpanan folder
  },
  // Format penamaan file
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

// Upload Gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true); //Terima file nya
  } else {
    cb(null, false); // File tidak sesusai
  }
};

// Menambahkan middleware
// .json karena yang diterima typenya json
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // agar pemanggilan gambar tidak error || dirname = lokasi project berada
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// Penambahan CORS
app.use('/price', (req, res, next) => {
  // Izin akses origin/CORS darimana pun
  res.setHeader('Access-Controll-Allow-Origin', '*');

  // Method yang diizinkan
  res.setHeader('Access-Controll-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

  // Header yang boleh dikirim, Content-Type(untuk JSON),Authorization (Pengiriman Token)
  res.setHeader('Access-Controll-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// // Membuat endpoint
// Membuat spesfiik router
// Klo / maka dia membaca productRoutes
// app.use("/", productRoutes);
// app.use("/v1/customer", productRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

// Middleware
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500; //default 500
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data }); // Error global
});

mongoose
  .connect('mongodb+srv://fajar:ZcGPaFoMAnVIwvg8@cluster0.349yq.mongodb.net/blog?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  // kalau koneksi berhasil, menjalankan server
  .then(() => {
    // berjalan di port 4000
    app.listen(4000, () => console.log('Koneksi sukses'));

    // klo gagal
  })
  .catch((err) => console.log(err));
