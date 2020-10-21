const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const blogController = require('../controllers/blog');
//  [POST] : /v1/blog/pody
router.post(
  '/post',
  [
    body('title').isLength({ min: 5 }).withMessage('Input title minimal 5 karakter'), // Menambahkan pesan error
    body('body').isLength({ min: 5 }).withMessage('Input title minimal 5 karakter'),
  ],
  blogController.createBlogPost,
);
// title nya minimal 5 huruf
// body nya minimal 5 huruf

router.get('/posts', blogController.getAllBlogPost); // 1 Page panggil 5 data
router.get('/post/:postId', blogController.getBlogPostById);
router.put(
  '/post/:postId',
  [
    body('title').isLength({ min: 5 }).withMessage('Input title minimal 5 karakter'), // Menambahkan pesan error
    body('body').isLength({ min: 5 }).withMessage('Input title minimal 5 karakter'),
  ],
  blogController.UpdateBlogPost,
);

router.delete('/post/:postId', blogController.deleteBlogPost);

module.exports = router;
