// Membuat server dengan express

// Menggunakan import dari nodejs
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

// Menambahkan middleware
// .json karena yang diterima typenya json
app.use(bodyParser.json());

// Penambahan CORS
app.use("/price", (req, res, next) => {
  // Izin akses origin/CORS darimana pun
  res.setHeader("Access-Controll-Allow-Origin", "*");

  // Method yang diizinkan
  res.setHeader("Access-Controll-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

  // Header yang boleh dikirim, Content-Type(untuk JSON),Authorization (Pengiriman Token)
  res.setHeader("Access-Controll-Allow-Headers", "Content-Type,Authorization");
  next();
});

// // Membuat endpoint
// Membuat spesfiik router
// Klo / maka dia membaca productRoutes
// app.use("/", productRoutes);
// app.use("/v1/customer", productRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

// Middleware
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500; //default 500
  const message = error.message;
  const data = error.data;

  res.status(status).json({ message: message, data: data }); // Error global
});

mongoose
  .connect("mongodb+srv://fajar:5LMRpn8q5bwrTEn1@cluster0.z8rnr.mongodb.net/<dbname>?retryWrites=true&w=majority")
  // kalau koneksi berhasil, menjalankan server
  .then(() => {
    // berjalan di port 4000
    app.listen(4000, () => console.log("Koneksi sukses"));

    // klo gagal
  })
  .catch((err) => console.log(err));
