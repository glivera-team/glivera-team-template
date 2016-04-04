createfolderwithname() {
    mkdir site_$1\($2\)
    cd site_$1\($2\)
    mkdir source
    git clone https://github.com/glivera-team/glivera-team-template.git
    mv /d/workflow/job/tasks_from_Andrew/site_$1\($2\)/glivera-team-template /d/workflow/job/tasks_from_Andrew/site_$1\($2\)/site
    cd site
    rm -rf .git settings.jar
    npm link gulp rimraf gulp-jade gulp-sass gulp-inline-image gulp-autoprefixer gulp-plumber gulp-directory-sync browser-sync gulp-concat gulp-cssfont64 gulp-html5-lint gulp-purifycss gulp-uglify gulp-imagemin imagemin-pngquant gulp-csso
    gulp
    subl /d/workflow/job/tasks_from_Andrew/site_$1\($2\)/site
}

alias subl='/c/Program\ Files/Sublime\ Text\ 3/sublime_text.exe' $*
alias storm='/c/Program\ Files\ \(x86\)/JetBrains/PhpStorm\ 2016.1/bin/PhpStorm.exe' $*
alias pro='cd /d/workflow/job/tasks_from_Andrew/'
alias new=createfolderwithname