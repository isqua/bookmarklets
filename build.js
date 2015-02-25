var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');
var fs = require('fs');

var buttonJs = UglifyJS.minify('button.js');
var metrikaJs = UglifyJS.minify('metrika.js');
var styleCss = new CleanCSS().minify(fs.readFileSync('style.css').toString('utf8')).styles;

buttonJs = buttonJs.code.replace(/"/gm, '\'');
metrikaJs = metrikaJs.code.replace(/"/gm, '\'');
styleCss = '<style type="text/css">' + styleCss + '</style>';

fs.readFile('index.html', function(err, data) {
	var src = data.toString('utf8');
	var result = '';

	if (err) {
		console.log(err);
		return;
	}

	result = src
		.replace(/(\r\n|\n|\r)/gm, '')
		.replace(/\s+/gm, ' ')
		.replace('{{buttonJs}}', buttonJs)
		.replace('{{metrikaJs}}', metrikaJs)
		.replace('<link rel="stylesheet" href="style.css">', styleCss)
		.replace(/>\s</gm, '><');

	fs.writeFile('result.html', result, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('done');
		}
	});
});
