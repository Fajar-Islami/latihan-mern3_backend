const { validationResult } = require('express-validator');
const path = require('path');
const BlogPost = require('../models/blog');
const fs = require('fs');

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
  const currentPage = req.query.page || 1; // memanggil query page defaultnya 1
  const perPage = req.query.perPage || 5; // memanggil query perPage defaultnya 5
  let totalItems; // Total data jumlahnya 0 diubah dibawah

  // countDocuments() = menghitung jumlah data
  BlogPost.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return (
        BlogPost.find()
          // skip() == jumlah data yang dilewati
          .skip((parseInt(currentPage) - 1) * parseInt(perPage))
          // limit() == jumlah data yang ditampilkan
          .limit(parseInt(perPage))
      );
    })
    .then((result) => {
      res.status(200).json({
        message: 'Data blog post berhasil dipanggil',
        data: result,
        total_Data: totalItems, // Informasi total data
        per_Page: parseInt(perPage), // Informasi data perpage
        current_Page: parseInt(currentPage), // Informasi page keberapa
      });
    })
    .catch((err) => {
      next(err);
    });

  // // find() == Memanggil seluruh data
  // BlogPost.find()
  //   .then((result) => {
  //     res.status(200).json({
  //       message: 'Data blog post berhasil dipanggil',
  //       data: result,
  //     });
  //   })
  //   .catch((err) => {
  //     next(err); //Mengirim error ke index.js
  //   });
};

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId;
  BlogPost.findById(postId)
    .then((result) => {
      // Validasi kalau beneran dapat,bisa jadi success tapi tidak ada posting(id salah)
      if (!result) {
        const error = new Error('Blog Post tidak ditemukan/salah');
        error.errorStatus = 404;
        throw error;
      }

      // Kalau post didapat
      res.status(200).json({
        message: 'Data Post berhasil dipanggil',
        data: result,
      });
    })
    // Error koding
    .catch((err) => {
      next(err);
    });
};

exports.UpdateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.errorStatus = 400;
    err.data = errors.array(); // dari routes/blog.js
    throw err;
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
  const postId = req.params.postId;

  BlogPost.findById(postId)
    // Promise untuk mencari data postingan
    .then((post) => {
      if (!post) {
        const error = new Error('Blog Post tidak ditemukan/salah');
        error.errorStatus = 404;
        throw error;
      }

      post.title = title;
      post.body = body;
      post.image = image;

      // Update
      return post.save();
    })
    // Promise
    .then((result) => {
      res.status(200).json({
        message: 'Update sukses',
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  // Mengecek postingan ada
  BlogPost.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error('Blog Post tidak ditemukan/salah');
        error.errorStatus = 404;
        throw error;
      }

      // Hapus image
      removeImage(post.image);
      // Hapus post
      return BlogPost.findByIdAndRemove(post.id);
    })
    .then((result) => {
      res.status(200).json({
        message: 'Delete berhasil',
        data: result,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const removeImage = (filePath) => {
  // console.log('filePath :', filePath);
  // console.log('dir name', __dirname);
  // __dirname = C:\Users\Fajar Islami\Documents\Belajar MERN\Latihan 3 (Prawito H)\mernAPI\src\controllers

  filePath = path.join(__dirname, '../..', filePath);
  // C:\Users\Fajar Islami\Documents\Belajar MERN\Latihan 3 (Prawito H)\mernAPI\images\file-image.png

  // Cara remove image
  fs.unlink(filePath, (err) => console.log(err));
};
