# Welcome to supervisor template repository.

## Get started
1. If you don't have installed [node.js](https://nodejs.org/) - install it.Also you should install [python(2 version)](https://www.python.org/downloads/release/python-2710/) and node-gyp

        npm install -g node-gyp

2. Install required npm packages globally

        npm install rimraf gulp-combine-media-queries gulp browser-sync gulp-autoprefixer gulp-clean gulp-concat gulp-uglify gulp-connect gulp-csso gulp-directory-sync gulp-iconfont gulp-iconfont-css gulp-imagemin gulp-inline-image gulp-jade gulp-livereload gulp-open gulp-plumber gulp-purifycss gulp-sass imagemin-pngquant -g

3. Link packages

        npm link rimraf gulp gulp-combine-media-queries browser-sync gulp-autoprefixer gulp-clean gulp-concat gulp-uglify gulp-connect gulp-csso gulp-directory-sync gulp-iconfont gulp-iconfont-css gulp-imagemin gulp-inline-image gulp-jade gulp-livereload gulp-open gulp-plumber gulp-purifycss gulp-sass imagemin-pngquant

4. Open your console and write

        gulp

5. Rock! ![rock](http://www.mrwallpaper.com/wallpapers/Rock-N-Roll.jpg)

6. Edit files in assets folder and watch result in dist folder.If you want to build folder to customer(with minified images and styles)

        gulp build

## How to work with js

All your main scripts should be placed in assets/js folder.All you additional scripts(jquery,plugins, etc) should be placed in assets/js/all folder.When you start gulp your additional scripts will concat into all.js

## PHPStorm settings

If you use PHPStorm or WEBStorm editor - copy encodings.xml, codeStyleSettings.xml and watcherTasks.xml to your idea folder.

## How to do iconfont

1. Copy your svg images to [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons) folder
2. In gulpfile near the iconfont task change 'fontName' variable if you want your own iconfont name.
3. Run

        gulp iconfont
4. Grab your font in [fonts/icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/fonts/icons) folder and font extends(%placeholders) in [icons.scss](https://github.com/gatilin222/supervisor_template/blob/master/assets/sass/_icons.scss)
5. Edit it on [iconmoon](https://icomoon.io)