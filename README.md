# Добро пожаловать в supervisor template

## Старт
1. Устанавливаем [node.js](https://nodejs.org/),[python(2 version)](https://www.python.org/downloads/release/python-2710/),[Microsoft Visual Studio C++ 2013](https://www.microsoft.com/en-gb/download/details.aspx?id=44914) и gulp глобально

        npm install gulp -g

2. Устанавливаем плагины для разработки и линкуем их. Если есть проблемы с установкой browser-sync на Windows посмотрите [сюда](http://www.browsersync.io/docs/#windows-users)

        npm install gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat -g

        npm link gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat

3. Устанавливаем плагины для сборки и линкуем их.

        npm install gulp-html5-lint gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso -g

        npm link gulp-html5-lint gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso

4. Начинаем кодить!

        gulp

5. В папке assets редактируем файлы, в папке dist - получаем готовые.Чтобы запустить конечную минифицированную сборку проекта запускаем:

        gulp build

6. Команда для валидации html

        gulp validation

## Как работать с js

Все ваши основные скрипты создавайте в папке assets/js. Все вспомогательные скрипты (jquery,plugins, и т.д) помещайте в папку assets/js/all. В итоге gulp соединяет все вспомогательные скрипты в all.js

## PHPStorm settings

Если вы используете PHPStorm или WEBStorm - копируем encodings.xml, codeStyleSettings.xml и watcherTasks.xml в папку idea.

## Как сделать иконочный шрифт

1. Установите зависимости и залинкуйте

        npm install gulp-iconfont@4.0.0 gulp-iconfont-css -g
        npm link gulp-iconfont gulp-iconfont-css

2. Положите ваши иконки в папку [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons)
3. В gulpfile.js измените переменную 'fontName' на имя вашего шрифта (по умолчанию 'iconfont').
4. Раскомменитируете таск iconfont и запустите его

        gulp iconfont

4. Получайте шрифт в папке [fonts/icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/fonts/icons) и font extends(%placeholders) в [icons.scss](https://github.com/gatilin222/supervisor_template/blob/master/assets/sass/_icons.scss)
5. Редактируйте шрифт в [iconmoon](https://icomoon.io)