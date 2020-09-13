// Membuat server dengan express

// Menggunakan import dari nodejs
const express = require("express");
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
const productRoutes = require("./src/routes/products");

// Membuat spesfiik router
// Klo / maka dia membaca productRoutes
app.use("/", productRoutes);

// berjalan di port 4000
app.listen(4000);
