# Добро пожаловать в glivera-team-template

## Старт
1. Устанавливаем [node.js](https://nodejs.org/),[python(2 version)](https://www.python.org/downloads/release/python-2710/),[Microsoft Visual Studio C++ 2013](https://www.microsoft.com/en-gb/download/details.aspx?id=44914) и gulp глобально

        npm install gulp -g

2. Устанавливаем npm-пакеты. Если есть проблемы с установкой browser-sync на Windows посмотрите [сюда](http://www.browsersync.io/docs/#windows-users)

        npm i

	Если вы используете линк глобальных пакетов:

                npm install gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-html5-lint gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-sourcemaps gulp-postcss postcss-assets -g

                npm link gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-html5-lint gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso gulp-sourcemaps gulp-postcss postcss-assets

3. Начинаем кодить!

        gulp

4. В папке assets редактируем файлы, в папке dist - получаем готовые.Чтобы запустить конечную минифицированную сборку проекта запускаем:

        gulp build

5. Команда для валидации html

        gulp validation

Более подробно о том, как работать с gulp вы можете прочитать в статье на нашем блоге - [Начинаем работать с gulp.js](http://glivera-team.github.io/sass/2016/01/07/gulp.html)

## Как работать с js

Все ваши основные скрипты создавайте в папке assets/js. Все вспомогательные скрипты (jquery,plugins, и т.д) помещайте в папку assets/js/all. В итоге gulp соединяет все вспомогательные скрипты в all.js

## Как сделать иконочный шрифт

1. Установите зависимости и залинкуйте

        npm install gulp-iconfont@4.0.0 gulp-iconfont-css -D

2. Положите ваши иконки в папку [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons)
3. В gulpfile.js измените переменную 'fontName' на имя вашего шрифта (по умолчанию 'iconfont').
4. Раскомменитируете таск iconfont и запустите его

        gulp iconfont

4. Получайте шрифт в папке [fonts/icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/fonts/icons) и font extends(%placeholders) в [icons.scss](https://github.com/gatilin222/supervisor_template/blob/master/assets/sass/_icons.scss)
5. Редактируйте шрифт в [iconmoon](https://icomoon.io)

Более подробно процедура описана на нашем блоге в статье [Иконочные шрифты](http://glivera-team.github.io/svg/2016/01/06/iconfonts.html)

## Как сделать svg-спрайт
1. Установите зависимости и залинкуйте

        npm install gulp-svg-sprites gulp-svgmin gulp-cheerio gulp-replace -D

2. Положите ваши иконки в папку [icons](https://github.com/gatilin222/supervisor_template/tree/master/assets/i/icons)
3. Раскомментируйте таски svgSpriteBuild, svgSpriteSass, svgSprite
4. Запустите таск svgSprite
5. В папке assets/i теперь лежит symbol_sprite.html который подключается через скрипт sprite.js(лежит в assets/js/all) и кешируется в localStorage.Также в папке sass лежит файл стилизации _svg_sprite.scss.Благодаря ему изменяем размер иконки за счет font-size.
6. Для подключения иконки из спрайта используйте jade mixin icon

Более подробно процедура описана на нашем блоге в статье [Как мы используем SVG-спрайты](http://glivera-team.github.io/svg/2015/12/08/svg-sprites.html)

## Работа с картинками через PostCSS:

```
.test_block {
        width: width('rub.png');
        height:  height('rub.png');
        background: resolve('rub.png') no-repeat;
        background-size: size('rub.png');
}
```
