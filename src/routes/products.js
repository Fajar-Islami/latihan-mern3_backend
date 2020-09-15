const express = require("express");

// Membuat router
const router = express.Router();

const productsController = require("../controllers/products");

// Membuat endpoint

// Create -> POST : localhost:4000/v1/customer/product
router.post("/product", productsController.createProduct);

// Read -> GET : localhost:4000/v1/customer/products
router.get("/products", productsController.getAllProducts);

// router.put("/products", (req, res, next) => {
// 	res.json({ name: "Fajar Islami", email: "fajar@gmail.com" });
// 	next();
// });
// router.delete("/products", (req, res, next) => {
// 	res.json({ name: "Fajar Islami", email: "fajar@gmail.com" });
// 	next();
// });

module.exports = router;
