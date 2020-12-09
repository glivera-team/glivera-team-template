alias pro='cd /e/workflow/job/tasks_from_Andrew/'
alias storm='/c/Program\ Files\ \(x86\)/JetBrains/PhpStorm\ 2016.1.1/bin/PhpStorm.exe' $*

createNewProject() {
    pro
    mkdir site_$1\($2\)
    cd site_$1\($2\)
    mkdir source
    git clone https://github.com/glivera-team/glivera-team-template.git
    mv /e/workflow/job/tasks_from_Andrew/site_$1\($2\)/glivera-team-template /e/workflow/job/tasks_from_Andrew/site_$1\($2\)/site
    cd site
    rm -rf .git settings.jar
    npm link gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-html5-lint gulp-purifycss gulp-terser gulp-imagemin imagemin-pngquant gulp-csso gulp-sourcemaps gulp-postcss postcss-assets
    storm /e/workflow/job/tasks_from_Andrew/site_$1\($2\)/site
    gulp
}

alias new=createNewProject
alias npm_uninstall_all='npm uninstall `ls -1 node_modules | tr '/\n' ' '`'