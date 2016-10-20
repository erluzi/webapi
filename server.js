var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

var Readable = require('stream').Readable;
var multer  = require('multer');
var upload = multer({ dest: './www/uploads/' });

app.use(express.static(path.join(__dirname, 'www')));

app.post('/single', upload.single('avatar'), function (req, res, next) {
	// req.file 是 `avatar` 文件的信息
	// req.body 将具有文本域数据, 如果存在的话
	res.json({msg: '1'});
	//next();
	//res.end();
});

app.post('/multiple', upload.array('photos', 12), function (req, res, next) {
	// req.files 是 `photos` 文件数组的信息
	// req.body 将具有文本域数据, 如果存在的话
	res.json({msg: '1'});
});


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'www', 'index.html'))
});


app.post('/upload', function (req, res) {
	req.setEncoding('utf8');

	var rs = new Readable();

	req.on('data', (chunk) => {
		rs.push(chunk)
	});
	req.on('end', function () {
		rs.push(null);
		//rs.pipe(out);
		fs.writeFile('./www/uploads/a.png', rs, (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
		});
	});


	//const writer = fs.createWriteStream('./www/uploads/a.png');
	//
	//writer.on('pipe', () => {
	//	console.error('something is piping into the writer');
	//});
	//req.pipe(writer);
	//
	//res.send({msg: '1'});

});

var PORT = process.env.PORT ||8000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
});
