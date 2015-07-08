var gulp = require('gulp'),
	clean = require('gulp-clean'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	inlineimage = require('gulp-inline-image'),
	prefix = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	uncss = require('gulp-uncss'),
	csso = require('gulp-csso'),
	dirSync = require( 'gulp-directory-sync'),
	concat = require('gulp-concat');

var assetsDir = 'assets/';
var outputDir = 'dist/';
var buildDir = 'build/';

//----------------------------------------------------Compiling
gulp.task('jade', function() {
	gulp.src([assetsDir+'jade/*.jade', '!'+assetsDir+'jade/_*.jade'])
		.pipe(plumber())
		.pipe(jade({pretty:true}))
		.pipe(gulp.dest(outputDir))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	gulp.src([assetsDir+'sass/**/*.scss', '!'+assetsDir+'sass/**/_*.scss'])
		.pipe(plumber())
		.pipe(sass())
		.pipe(inlineimage())
		.pipe(prefix('last 3 versions'))
		.pipe(gulp.dest(outputDir + 'styles/'))
		.pipe(connect.reload());
});
//----------------------------------------------------Compiling###

//-------------------------------------------------Synchronization
gulp.task('imageSync', function () {
	return gulp.src( '' )
		.pipe(plumber())
		.pipe(dirSync(assetsDir+'i/', outputDir+'i/', { printSummary: true } ))
	.pipe(connect.reload());
});

gulp.task('fontsSync', function () {
	return gulp.src('')
		.pipe(plumber())
		.pipe(dirSync(assetsDir+'fonts/', outputDir+'fonts/', { printSummary: true } ))
	.pipe(connect.reload());
});

gulp.task('jsSync', function () {
	return gulp.src('')
		.pipe(plumber())
		.pipe(dirSync(assetsDir+'js/', outputDir+'js/', { printSummary: true } ))
	.pipe(connect.reload());
});
//-------------------------------------------------Synchronization###


//watching files and run tasks
gulp.task('watch', function () {
	gulp.watch(assetsDir+'jade/**/*.jade', ['jade']);
	gulp.watch(assetsDir+'sass/**/*.scss', ['sass']);
	gulp.watch(assetsDir+'js/*.js', ['jsSync']);
	gulp.watch(assetsDir+'i/**/*',['imageSync']);
	gulp.watch(assetsDir+'fonts/**/*',['fontsSync']);
});

//livereload and open html in browser

gulp.task('connect', function() {
	connect.server({
		port:1337,
		root: 'dist',
		livereload: true
	});
});

gulp.task('url', function(){
	var options = {
		url: 'http://localhost:1337',
		app: 'chrome'
	};
	gulp.src(outputDir+'index.html')
		.pipe(open('', options));
});

//building final project folder
//clean build folder
gulp.task('cleanBuild',function() {
	return gulp.src(buildDir)
		.pipe(clean());
});

//minify images
gulp.task('imgBuild',function() {
	return gulp.src(outputDir+'i/**/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	}))
	.pipe(gulp.dest(buildDir + 'i/'))
});

//copy fonts
gulp.task('fontsBuild',function() {
	return gulp.src(outputDir+'fonts/**/*')
		.pipe(gulp.dest(buildDir + 'fonts/'))
});

//copy html
gulp.task('htmlBuild',function() {
	return gulp.src(outputDir+'**/*.html')
		.pipe(gulp.dest(buildDir))
});

//copy js
gulp.task('jsBuild', function() {
	return gulp.src(outputDir+'js/**/*')
		.pipe(gulp.dest(buildDir + 'js/'))
});

//copy and minify css
gulp.task('cssBuild', function() {
	return gulp.src(outputDir+'styles/**/*')
		.pipe(csso())
		.pipe(gulp.dest(buildDir + 'styles/'))
});


//--------------------------------------------If you need iconfont
//var iconfont = require('gulp-iconfont'),
//	iconfontCss = require('gulp-iconfont-css'),
//	fontName = 'iconsmoon';
//gulp.task('iconfont', function(){
//	gulp.src(['assets/i/icons/*.svg'])
//		.pipe(iconfontCss({
//			path: 'assets/sass/_icons_template.scss',
//			fontName: fontName,
//			targetPath: '../../sass/_icons.scss',
//			fontPath: '../fonts/icons/'
//		}))
//		.pipe(iconfont({
//			fontName: fontName
//		}))
//		.pipe(gulp.dest('assets/fonts/icons'));
//});

gulp.task('default',['jade','sass','imageSync','fontsSync','jsSync','watch','connect','url']);
gulp.task('build',['imgBuild','fontsBuild','htmlBuild','jsBuild','cssBuild']);
