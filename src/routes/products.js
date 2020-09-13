const express = require("express");

// Membuat router
const router = express.Router();

const productsController = require("../controllers/products");

// Membuat endpoint

// Create -> POST
router.post("/product", productsController.createProduct);

// Read
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
