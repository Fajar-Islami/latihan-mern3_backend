exports.createBlogPost = (req, res, next) => {
	const title = req.body.title;
	// const image = req.body.image
	const body = req.body.body;

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
