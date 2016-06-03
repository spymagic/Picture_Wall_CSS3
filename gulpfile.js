var gulp = require('gulp');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

var srcImage = './pic/*.*';
var distImage = './dist/img';
var srcCSS = './*.css';
var distCSS = './dist';
var srcHtml = './*.html';
var distHtml = './dist';

gulp.task('css', function(){
	gulp.src(srcCSS)
		.pipe(minifyCSS())
		.pipe(gulp.dest(distCSS));
});

gulp.task('html', function(){
	gulp.src(srcHtml)
		.pipe(gulp.dest(distHtml));
});

gulp.task('imgmin', function(){
	var jpgmin = imageminJpegRecompress({
		accurate: false,
		quality: 'low',
		method: 'smallfry',
		min:40,
		loops: 6,
		progressive: true,
		subsample: 'default'
	});

	gulp.src(srcImage)
		.pipe(imagemin({
			use: [jpgmin]
		}))

		.pipe(gulp.dest(distImage));
});

gulp.task('auto', function(){
	gulp.watch(srcCSS, ['css']);
	gulp.watch(srcImage, ['imgmin']);
	gulp.watch(srcHtml, ['html']);
});

gulp.task('default', ['css', 'imgmin', 'html', 'auto']);
