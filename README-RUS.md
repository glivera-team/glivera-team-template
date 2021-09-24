# Добро пожаловать в glivera-team-template

## Старт

1.  Устанавливаем [node.js](https://nodejs.org/),[python(2 version)](https://www.python.org/downloads/release/python-2710/),[Microsoft Visual Studio C++ 2013](https://www.microsoft.com/en-gb/download/details.aspx?id=44914)

2.  Устанавливаем npm-пакеты. Если есть проблемы с установкой browser-sync на Windows посмотрите [сюда](http://www.browsersync.io/docs/#windows-users)

        npm i

    Если вы используете линк глобальных пакетов:

        npm install gulp rimraf gulp-pug gulp-sass@4.1.1 gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-purifycss gulp-terser gulp-image imagemin-pngquant gulp-csso gulp-sourcemaps postcss gulp-postcss postcss-assets postcss-reporter stylelint postcss-scss gulp-sequence gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace gulp-notify gulp-webp -g

        npm link gulp rimraf gulp-pug gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-purifycss gulp-terser gulp-image imagemin-pngquant gulp-csso gulp-sourcemaps gulp-postcss postcss-assets postcss-reporter stylelint postcss-scss gulp-sequence gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace gulp-notify gulp-webp


3.  Начинаем кодить!

        gulp

4.  В папке `/assets` редактируем файлы, в папке `/dist` - получаем готовые. Чтобы запустить конечную минифицированную сборку проекта запускаем:

        gulp build

5.  Команда для валидации html

        gulp validation

6.  Линтинг стилей

        gulp cssLint

Более подробно о том, как работать с gulp вы можете прочитать в статье на нашем блоге - [Начинаем работать с gulp.js](http://glivera-team.github.io/sass/2016/01/07/gulp.html)

## Как работать с js

Все ваши основные скрипты создавайте в папке `/assets/js`. Все вспомогательные скрипты (jquery,plugins, и т.д) помещайте в папку `/assets/js/all`. В итоге gulp соединяет все вспомогательные скрипты в `all.js`

## Как сделать иконочный шрифт

1.  Установите зависимости и залинкуйте

        npm install gulp-iconfont@4.0.0 gulp-iconfont-css -D

2.  Положите ваши иконки в папку `/assets/i/icons`
3.  В gulpfile.js измените переменную 'fontName' на имя вашего шрифта (по умолчанию 'iconfont').
4.  Раскомменитируете таск iconfont и запустите его

        gulp iconfont

5.  Получайте шрифт в папке `/assets/fonts/icons` и font extends(%placeholders) в `/assets/sass/_icons.scss`
6.  Редактируйте шрифт на [iconmoon](https://icomoon.io)

Более подробно процедура описана на нашем блоге в статье [Иконочные шрифты](http://glivera-team.github.io/svg/2016/01/06/iconfonts.html)

## Как сделать svg-спрайт

1.  Установите зависимости и залинкуйте

        npm install gulp-svg-sprite gulp-svgmin gulp-cheerio gulp-replace -D

2.  Положите ваши иконки в папку `/assets/i/icons`
3.  Раскомментируйте таск `svgSpriteBuild` и запустите его
4.  Теперь у вас есть `sprite.svg` в папке `/assets/i/sprite`. По умолчанию скрипт `svg4everybody` включен в ваши скрипты. Также теперь scss файл `_sprite.scss` лежит в папке `sass`.
5.  Вызовите `svg4everybody` в главном `main.js` файле. Для подключения в разметку используйте pug миксин "icon"

```
$(document).ready(function () {
	svg4everybody({});
});
```

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

## Как тестировать

1.  Установите зависимости и залинкуйте

        npm i chrome-launcher fs http node-static path pixelmatch pngjs puppeteer -g

        npm link chrome-launcher fs http node-static path pixelmatch pngjs puppeteer

2.  В `gulpfile.js` внесите в массив `pageList` имена тестируемых страниц

3.  Запустите `gulp test-init` для создания эталонных скриншотов из ваших страниц или перенесите свои изображения вручную в папку `test/before/`
4.  Запустите `gulp test-compare` для сравнения текущего состояния страниц с эталонным
