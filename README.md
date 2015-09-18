# Welcome to supervisor template repository.

## Get started
1. If you don't have installed [node.js](https://nodejs.org/) - install it(latest version).Also you should install [python(2 version)](https://www.python.org/downloads/release/python-2710/) and gulp globally

        npm install gulp -g

2. Install packages for development globally and link it.If you have problem with installing browser-sync on Windows look [here](http://www.browsersync.io/docs/#windows-users)

        npm install gulp rimraf gulp-jade gulp-sas gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat -g

        npm link gulp rimraf gulp-jade gulp-sas gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat

3. If you want to use my build-project-system install packages for building and link it:

        npm install gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-combine-mq -g

        npm link gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-combine-mq

4. Start coding!

        gulp

5. Edit files in assets folder and watch result in dist folder.If you want to build folder to customer(with minified images and styles)

        gulp build

## How to work with js

All your main scripts should be placed in assets/js folder.All you additional scripts(jquery,plugins, etc) should be placed in assets/js/all folder.When you start gulp your additional scripts will concat into all.js

## PHPStorm settings

If you use PHPStorm or WEBStorm editor - copy encodings.xml, codeStyleSettings.xml and watcherTasks.xml to your idea folder.

## How to do iconfont

1. Install gulp-packages for it and link it

        npm install gulp-iconfont gulp-iconfont-css -g
        npm link gulp-iconfont gulp-iconfont-css

2. Copy your svg images to [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons) folder
3. In gulpfile near the iconfont task change 'fontName' variable if you want your own iconfont name.
4. Run

        gulp iconfont

4. Grab your font in [fonts/icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/fonts/icons) folder and font extends(%placeholders) in [icons.scss](https://github.com/gatilin222/supervisor_template/blob/master/assets/sass/_icons.scss)
5. Edit it on [iconmoon](https://icomoon.io)