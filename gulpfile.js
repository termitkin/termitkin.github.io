const gulp = require("gulp"),
  autoprefixer = require("autoprefixer"),
  browserSync = require("browser-sync").create(),
  htmlmin = require("gulp-htmlmin"),
  concat = require("gulp-concat"),
  postcss = require("gulp-postcss"),
  newer = require("gulp-newer");

gulp.task("css", () =>
  gulp
    .src("./src/css/*.css")
    .pipe(postcss([autoprefixer()]))
    .pipe(concat("bundle.css"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("html", () =>
  gulp
    .src("./src/index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      })
    )
    .pipe(gulp.dest("./"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("js", () =>
  gulp
    .src("src/js/**/*.js")
    .pipe(concat("bundle.js"))
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("img", () =>
  gulp
    .src("./src/images/**/*.{jpg,jpeg,png,svg}")
    .pipe(newer("./dist/images"))
    .pipe(gulp.dest("./dist/images"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("w", () => {
  browserSync.init({
    server: "./"
  });

  gulp.watch("src/css/*.css", gulp.series("css"));
  gulp.watch("src/index.html", gulp.series("html"));
  gulp.watch("src/js/**/*.js", gulp.series("js"));
  gulp.watch("./src/images/**/*.{jpg,jpeg,png,svg}", gulp.series("img"));
});
