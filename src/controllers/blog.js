const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');

exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  // Cek apakah req error / validasi
  // kalau ada error bernilai akan false
  // kalau tidak ada error bernilai akan true
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.errorStatus = 400;
    err.data = errors.array(); // dari routes/blog.js
    throw err;
    // console.log("err", errors);
    // res.status(400).json({
    //   message: "Request Error",
    //   data: null,
    // });
  }

  // KLo gambar/file tidak dikirim
  if (!req.file) {
    const err = new Error('Image harus diupload');
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path; //path folder image
  const body = req.body.body;

  // Add
  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: 1,
      name: 'Fajar Islami',
    },
  });

  // Menyimpan ke database
  Posting.save()
    // KLo sukses
    .then((result) => {
      // status 201 = berhasil di create
      res.status(201).json({
        message: 'Create Blog Post Success',
        data: result,
      });
    })
    // Klo error
    .catch((err) => {
      console.log('err:', err);
    });
};

exports.getAllBlogPost = (req, res, next) => {
  // find() == Memanggil seluruh data
  BlogPost.find()
    .then((result) => {
      res.status(200).json({
        message: 'Data blog post berhasil dipanggil',
        data: result,
      });
    })
    .catch((err) => {
      next(err); //Mengirim error ke index.js
    });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      if (!result) {
        const error = new Error('Blog Post tidak ditemukan/salah');
        error.errorStatus = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Data Post berhasil dipanggil',
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};
