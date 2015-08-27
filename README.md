# Welcome to supervisor template repository.

## Get started
1. If you don't have installed [node.js](https://nodejs.org/) - install it.
2. Install required npm packages globally

        npm install gulp gulp-cssnano browser-sync gulp-autoprefixer gulp-clean gulp-concat gulp-connect gulp-csso gulp-directory-sync gulp-iconfont gulp-iconfont-css gulp-imagemin gulp-inline-image gulp-jade gulp-livereload gulp-open gulp-plumber gulp-purifycss gulp-sass gulp-uncss imagemin-pngquant -g

3. Link packages

        npm link gulp gulp-cssnano browser-sync gulp-autoprefixer gulp-clean gulp-concat gulp-connect gulp-csso gulp-directory-sync gulp-iconfont gulp-iconfont-css gulp-imagemin gulp-inline-image gulp-jade gulp-livereload gulp-open gulp-plumber gulp-purifycss gulp-sass gulp-uncss imagemin-pngquant

4. Open your console and write

        gulp

5. Rock! ![rock](http://www.mrwallpaper.com/wallpapers/Rock-N-Roll.jpg)

6. Edit files in assets folder and watch result in dist folder.If you want to build folder to customer(with minified images and styles)

        gulp build


## PHPStorm settings

If you use PHPStorm or WEBStorm editor - copy encodings.xml, codeStyleSettings.xml and watcherTasks.xml to your idea folder.

## How to do iconfont

1. Copy your svg images to [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons) folder
2. In gulpfile near the iconfont task change 'fontName' variable if you want your own iconfont name.
3. Run

        gulp iconfont
4. Grab your font in [fonts/icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/fonts/icons) folder and font extends(%placeholders) in [icons.scss](https://github.com/gatilin222/supervisor_template/blob/master/assets/sass/_icons.scss)
5. Edit it on [iconmoon](https://icomoon.io)