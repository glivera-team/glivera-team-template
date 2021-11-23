// plugins for development
var gulp = require('gulp'),
	rimraf = require('rimraf'),
	pug = require('gulp-pug'),
	sass = require('gulp-sass'),
	gulpSequence = require('gulp-sequence'),
	inlineimage = require('gulp-inline-image'),
	prefix = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	dirSync = require('gulp-directory-sync'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	concat = require('gulp-concat'),
	cssfont64 = require('gulp-cssfont64'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	assets = require('postcss-assets'),
	notify = require('gulp-notify'),
	webp = require('gulp-webp');

let productionStatus;

// plugins for build
var purify = require('gulp-purifycss'),
	terser = require('gulp-terser'),
	image = require('gulp-image'),
	pngquant = require('imagemin-pngquant'),
	csso = require('gulp-csso');

//plugins for testing
var reporter = require('postcss-reporter'),
	stylelint = require('stylelint'),
	postcss_scss = require('postcss-scss');

// plugins for screenshots testing
var img1 = [],
	img2 = [],
	filesRead = 0,
	pageName;

var initialPageWidth = 1920;

var pageList = ['index'];

var assetsDir = 'assets/',
	outputDir = 'dist/',
	buildDir = 'build/';

//--------------------------------------webp
gulp.task('imgWebp', function () {
	return gulp
		.src(assetsDir + 'i/**/*')
		.pipe(
			webp({
				quality: 80,
			})
		)
		.pipe(gulp.dest(outputDir + 'i/'))
		.pipe(browserSync.stream({ once: true }));
});
//--------------------------------------webp###

//----------------------------------------------------Compiling
gulp.task('pug', function () {
	return gulp
		.src([assetsDir + 'pug/*.pug', '!' + assetsDir + 'pug/_*.pug'])
		.pipe(plumber())
		.pipe(
			pug({
				pretty: true,
				data: {
					productionStatus: productionStatus,
				},
			})
		)
		.on(
			'error',
			notify.onError({
				message: '<%= error.message %>',
				title: 'PUG Error!',
			})
		)
		.pipe(gulp.dest(outputDir))
		.pipe(browserSync.stream({ once: true }));
});

gulp.task('sass', function () {
	return gulp
		.src([assetsDir + 'sass/**/*.scss', '!' + assetsDir + 'sass/**/_*.scss'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(
			sass().on(
				'error',
				notify.onError({
					message: '<%= error.message %>',
					title: 'Sass Error!',
				})
			)
		)
		.pipe(inlineimage())
		.pipe(prefix('last 3 versions'))
		.pipe(
			postcss([
				assets({
					basePath: outputDir,
					loadPaths: ['i/'],
				}),
			])
		)
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(outputDir + 'styles/'))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('jsConcatLibs', function () {
	return gulp
		.src(assetsDir + 'js/libs/**/*.js')
		.pipe(concat('libs.js', { newLine: ';' }))
		.pipe(gulp.dest(outputDir + 'js/'))
		.pipe(browserSync.stream({ once: true }));
});

gulp.task('jsConcatComponents', function () {
	return gulp
		.src(assetsDir + 'js/components/**/*.js')
		.pipe(concat('components.js', { newLine: ';' }))
		.pipe(gulp.dest(outputDir + 'js/'))
		.pipe(browserSync.stream({ once: true }));
});

gulp.task('fontsConvert', function () {
	return gulp
		.src([assetsDir + 'fonts/*.woff', assetsDir + 'fonts/*.woff2'])
		.pipe(cssfont64())
		.pipe(gulp.dest(outputDir + 'styles/'))
		.pipe(browserSync.stream({ once: true }));
});

//----------------------------------------------------Compiling###

//-------------------------------------------------Synchronization
gulp.task('imageSync', function () {
	return gulp
		.src(assetsDir + 'i/**/*')
		.pipe(plumber())
		.pipe(gulp.dest(outputDir + 'i/'))
		.pipe(browserSync.stream({ once: true }));
});

gulp.task('fontsSync', function () {
	return gulp
		.src(assetsDir + 'fonts/**/*')
		.pipe(plumber())
		.pipe(gulp.dest(outputDir + 'fonts/'))
		.pipe(browserSync.stream({ once: true }));
});

gulp.task('jsSync', function () {
	return gulp
		.src(assetsDir + 'js/*.js')
		.pipe(plumber())
		.pipe(gulp.dest(outputDir + 'js/'))
		.pipe(browserSync.stream({ once: true }));
});
//-------------------------------------------------Synchronization###

//watching files and run tasks
gulp.task('watch', function () {
	gulp.watch(assetsDir + 'pug/**/*.pug', gulp.series('pug'));
	gulp.watch(assetsDir + 'sass/**/*.scss', gulp.series('sass'));
	gulp.watch(assetsDir + 'js/**/*.js', gulp.series('jsSync'));
	gulp.watch(assetsDir + 'js/libs/**/*.js', gulp.series('jsConcatLibs'));
	gulp.watch(
		assetsDir + 'js/components/**/*.js',
		gulp.series('jsConcatComponents')
	);
	gulp.watch(assetsDir + 'i/**/*', gulp.series('imageSync'));
	gulp.watch(assetsDir + 'i/**/*', gulp.series('imgWebp'));
	gulp.watch(
		assetsDir + 'fonts/**/*',
		gulp.series('fontsSync', 'fontsConvert')
	);
});

//livereload and open project in browser
var plugins = {
	browserSync: {
		options: {
			port: 1337,
			server: {
				baseDir: outputDir,
			},
		},
	},
};

gulp.task('browser-sync', function () {
	return browserSync.init(plugins.browserSync.options);
});

gulp.task('bs-reload', function (cb) {
	browserSync.reload();
});

//---------------------------------building final project folder
//clean build folder
gulp.task('cleanBuildDir', function (cb) {
	return rimraf(buildDir, cb);
});

//minify images
gulp.task('imgBuild', function () {
	return gulp
		.src([outputDir + 'i/**/*', '!' + outputDir + 'i/sprite/**/*'])
		.pipe(
			image({
				pngquant: true,
				optipng: false,
				zopflipng: true,
				jpegRecompress: false,
				mozjpeg: true,
				gifsicle: true,
				svgo: false,
				concurrent: 10,
				quiet: false, // defaults to false
			})
		)
		.pipe(gulp.dest(buildDir + 'i/'));
});

//copy sprite.svg
gulp.task('copySprite', function () {
	return gulp
		.src(outputDir + 'i/sprite/sprite.svg')
		.pipe(plumber())
		.pipe(gulp.dest(buildDir + 'i/sprite/'));
});

//copy fonts
gulp.task('fontsBuild', function () {
	return gulp
		.src(outputDir + 'fonts/**/*')
		.pipe(gulp.dest(buildDir + 'fonts/'));
});

//copy html
gulp.task('htmlBuild', function () {
	return gulp.src(outputDir + '**/*.html').pipe(gulp.dest(buildDir));
});

//copy and minify js
gulp.task('jsBuild', function () {
	return gulp
		.src(outputDir + 'js/**/*')
		.pipe(terser())
		.pipe(gulp.dest(buildDir + 'js/'));
});

//copy, minify css
gulp.task('cssBuild', function () {
	return gulp
		.src(outputDir + 'styles/**/*')
		.pipe(csso())
		.pipe(gulp.dest(buildDir + 'styles/'));
});

//// --------------------------------------------If you need iconfont
// var iconfont = require('gulp-iconfont'),
// 	iconfontCss = require('gulp-iconfont-css'),
// 	fontName = 'iconfont';
// gulp.task('iconfont', function () {
// 	gulp.src([assetsDir + 'i/icons/*.svg'])
// 		.pipe(iconfontCss({
// 			path: 'assets/sass/templates/_icons_template.scss',
// 			fontName: fontName,
// 			targetPath: '../../sass/_icons.scss',
// 			fontPath: '../fonts/icons/',
// 			svg: true
// 		}))
// 		.pipe(iconfont({
// 			fontName: fontName,
// 			svg: true,
// 			formats: ['svg','eot','woff','ttf']
// 		}))
// 		.pipe(gulp.dest('assets/fonts/icons'));
// });

// --------------------------------------------If you need svg sprite
var svgSprite = require('gulp-svg-sprite'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace');

gulp.task('svgSpriteBuild', function () {
	return (
		gulp
			.src(assetsDir + 'i/icons/*.svg')
			// minify svg
			.pipe(
				svgmin({
					js2svg: {
						pretty: true,
					},
				})
			)
			// remove all fill and style declarations in out shapes
			.pipe(
				cheerio({
					run: function ($) {
						$('[fill]').removeAttr('fill');
						$('[stroke]').removeAttr('stroke');
						$('[style]').removeAttr('style');
					},
					parserOptions: { xmlMode: true },
				})
			)
			// cheerio plugin create unnecessary string '&gt;', so replace it.
			.pipe(replace('&gt;', '>'))
			// build svg sprite
			.pipe(
				svgSprite({
					mode: {
						symbol: {
							sprite: '../sprite.svg',
							render: {
								scss: {
									dest: '../../../sass/_sprite.scss',
									template: assetsDir + 'sass/templates/_sprite_template.scss',
								},
							},
							example: true,
						},
					},
				})
			)
			.pipe(gulp.dest(assetsDir + 'i/sprite/'))
	);
});

gulp.task('cssLint', function () {
	return gulp
		.src([
			assetsDir + 'sass/**/*.scss',
			'!' + assetsDir + 'sass/templates/*.scss',
		])
		.pipe(
			postcss([stylelint(), reporter({ clearMessages: true })], {
				syntax: postcss_scss,
			})
		);
});

gulp.task('set-dev-node-env', function(done) {
	productionStatus = 'development';
	done();
});

gulp.task('set-prod-node-env', function(done) {
	productionStatus = 'production';
	done();
});

let taskArray = {
	development: gulp.series(
		'set-dev-node-env',
		gulp.parallel(
			'pug',
			'sass',
			'imgWebp',
			'imageSync',
			'fontsSync',
			'fontsConvert',
			'jsConcatLibs',
			'jsConcatComponents',
			'jsSync',
			'watch',
			'browser-sync'
		)
	),
	production: gulp.series(
		'cleanBuildDir',
		'set-prod-node-env',
		'pug',
		gulp.parallel(
			'imgBuild',
			'fontsBuild',
			'htmlBuild',
			'jsBuild',
			'cssBuild',
			'copySprite'
		)
	),
};

gulp.task('default', taskArray['development']);
gulp.task('build', taskArray['production']);

//--------------------------------- testing

// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const PNG = require('pngjs').PNG;
// const pixelmatch = require('pixelmatch');

// const chromeLauncher = require('chrome-launcher');
// const http = require('http');
// const staticN = require('node-static');
// const path = require('path');

// var beforeDir = 'test/before/',
// 		afterDir = 'test/after/',
// 		diffDir = 'test/difference/';

// gulp.task('test-init', function() {
// 	if (!fs.existsSync('test')){
// 		fs.mkdirSync('test');
// 	}

// 	if (!fs.existsSync(beforeDir)){
// 		fs.mkdirSync(beforeDir);
// 	}

// 	if (fs.existsSync(beforeDir)){
// 		fs.readdir(beforeDir, (err, files) => {
// 			for (const file of files) {
// 				fs.unlink(path.join(beforeDir, file), err => {});
// 			}
// 		});
// 	}

// 	pageList.map(async function(element, index) {
// 		const browser = await puppeteer.launch();
// 		const page = await browser.newPage();

// 		await page.setViewport({ width: initialPageWidth, height: 0 });

// 		await page.goto('http://localhost:1337/' + element + '.html');

// 		await page.screenshot({path: beforeDir + element + '.png', fullPage: true});
// 		console.log(element + ' page +');

// 		await browser.close();
// 	})
// })

// gulp.task('test-compare', function() {
// 	// make and compare screens

// 	var timeMod = new Date().getTime();
// 	var clearDir = [diffDir, afterDir, 'test/']

// 	if (!fs.existsSync(afterDir)){
// 		fs.mkdirSync(afterDir);
// 	}

// 	if (!fs.existsSync(diffDir)){
// 		fs.mkdirSync(diffDir);
// 	}

// 	clearDir.map(function(element, index) {
// 		if (fs.existsSync(element)){
// 			fs.readdir(element, (err, files) => {
// 				for (const file of files) {
// 					fs.unlink(path.join(element, file), err => {});
// 				}
// 			});
// 		}
// 	});

// 	function doneReading(img1, img2, pageName) {
// 		var diff = new PNG({width: img1.width, height: img1.height});

// 		pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {threshold: 0.5});

// 		diff.pack().pipe(fs.createWriteStream(diffDir + pageName + timeMod + '.png'));
// 		console.log(pageName + ' ---- page compared');
// 	}

// 	function parse2(element, index, pageName) {
// 		img2[index] = fs.createReadStream(beforeDir + element + '.png').pipe(new PNG()).on('parsed', function() { doneReading(img1[index], img2[index], element)});
// 	}

// 	pageList.map(async function(element, index) {
// 		const browser = await puppeteer.launch();
// 		const page = await browser.newPage();

// 		await page.setViewport({ width: initialPageWidth, height: 0 });

// 		await page.goto('http://localhost:1337/' + element + '.html');

// 		await page.screenshot({path: afterDir + element + '.png', fullPage: true});

// 		await browser.close();

// 		pageName = element;
// 		img1[index] = await fs.createReadStream(afterDir + element + '.png').pipe(new PNG()).on('parsed', function() { parse2(element, index)});
// 	})

// 	// create file in insert list of images
// 	var imgList = pageList.map(function(file, i) {
// 		return '<li style="width: 49%; display: inline-block; list-style: none; background-color: #888;"><h2 style="font: 3vw sans-serif; margin: 0; padding: 1em; text-align: center;">' + pageList[i] + '</h2><img style="width: 100%; display: block;" src="difference/' + file + timeMod + '.png"/></li>'
// 	})

// 	fs.writeFile('test/index_test' + timeMod + '.html', imgList, function (err) {});

// 	// create localserver and run chrome
// 	var fileServer = new staticN.Server();

// 	http.createServer(function (req, res) {
// 		req.addListener('end', function () {
// 				fileServer.serve(req, res);
// 		}).resume();
// 	}).listen(8080);

// 	chromeLauncher.launch({
// 		startingUrl: 'http://localhost:8080/test/index_test' + timeMod + '.html',
// 		userDataDir: false
// 	}).then(chrome => {
// 		console.log(`Chrome debugging port running on ${chrome.port}`);
// 	});
// })
