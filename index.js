// Membuat server dengan express

// 1  Menggunakan import dari nodejs
const express = require("express");
// 2
const app = express();
// 3 berjalan di port 4000
app.use(() => {
	console.log("hello 1");
	console.log("hello 2");
	console.log("hello 3");
});

app.listen(4000);
