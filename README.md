# Welcome to glivera-team-template

## Get started
1. Install [node.js](https://nodejs.org/),[python(2 version)](https://www.python.org/downloads/release/python-2710/),[Microsoft Visual Studio C++ 2013](https://www.microsoft.com/en-gb/download/details.aspx?id=44914) and gulp globally

        npm install gulp -g

2. Install npm packages. If you have problems in browser-sync install on Windows look [here](http://www.browsersync.io/docs/#windows-users)

        npm i

	If you use link of global packages:

		npm install gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-html5-lint gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-sourcemaps gulp-postcss postcss-assets -g

		npm link gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-html5-lint gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-sourcemaps gulp-postcss postcss-assets

3. Let's code!

        gulp

4. Edit files in assets folder, see result in dist folder. If you want to build optimized version of project run :

        gulp build

5. Command for html validation

        gulp validation

## How to work with js

Create all your main scripts in assets/js. Create all your additional scripts (jquery,plugins, и т.д) in assets/js/all. Gulp will concat all your additional scripts into all.js

## How to make iconfont

1. Install packages

        npm install gulp-iconfont@4.0.0 gulp-iconfont-css -D

2. Put your icons to [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons) folder
3. Change variable 'fontName' in gulpfile.js  ('iconfont' by default).
4. Uncomment iconfont task and run

        gulp iconfont

4. Pic your font in [fonts/icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/fonts/icons) and font extends(%placeholders) in [icons.scss](https://github.com/gatilin222/supervisor_template/blob/master/assets/sass/_icons.scss)
5. Edit your font [iconmoon](https://icomoon.io)

## How to make svg-sprite
1. Install packages

        npm install gulp-svg-sprites gulp-svgmin gulp-cheerio gulp-replace -D

2. Put your icons into [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons)
3. Uncomment tasks svgSpriteBuild, svgSpriteSass, svgSprite
4. Run task svgSprite
5. Now you have symbol_sprite.html in assets/i folder< which included to the page via sprite.js(assets/js/all) and cached by localStorage. Also you have scss file for styling sprite in _svg_sprite.scss.
6. For including icons use jade mixin icon

## Working with images with PostCSS:

```
.test_block {
        width: width('rub.png');
        height:  height('rub.png');
        background: resolve('rub.png') no-repeat;
        background-size: size('rub.png');
}
```
