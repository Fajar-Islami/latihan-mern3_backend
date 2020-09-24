const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const blogController = require("../controllers/blog");
//  [POST] : /v1/blog/pody
router.post(
  "/post",
  [
    body("title").isLength({ min: 5 }).withMessage("Input title miniml 5 karakter"), // Menambahkan pesan error
    body("body").isLength({ min: 5 }).withMessage("Input title miniml 5 karakter"),
  ],
  blogController.createBlogPost,
);
// title nya minimal 5 huruf
// body nya minimal 5 huruf

module.exports = router;
