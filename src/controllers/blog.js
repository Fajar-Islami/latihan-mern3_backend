const { validationResult } = require("express-validator");

exports.createBlogPost = (req, res, next) => {
  const title = req.body.title;
  // const image = req.body.image
  const body = req.body.body;

  const errors = validationResult(req);

  // Cek apakah req error / validasi
  // kalau ada error bernilai akan false
  // kalau tidak ada error bernilai akan true
  if (!errors.isEmpty()) {
    const err = new Error("Input value tidak sesuai");
    err.errorStatus = 400;
    err.data = errors.array(); // dari routes/blog.js
    throw err;
    // console.log("err", errors);
    // res.status(400).json({
    //   message: "Request Error",
    //   data: null,
    // });
  }

  const result = {
    message: "Create Blog Post Success",
    data: {
      post_id: 1,
      title: "Title Blog",
      image: "imagefile.png",
      body: "Lorem Ipsum is simply dummy",
      create_at: "12/06/2020",
      author: {
        uid: 1,
        name: "Testing",
      },
    },
  };

  // status 201 = berhasil di create
  res.status(201).json(result);
};
