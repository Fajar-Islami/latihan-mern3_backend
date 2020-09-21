const express = require("express");

const router = express.Router();

const blogController = require("../controllers/blog");
//  [POST] : /v1/blog/pody
router.post("/post", blogController.createBlogPost);

module.exports = router;
