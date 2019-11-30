import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sassGlob from 'gulp-sass-glob'
// import mqpacker from 'css-mqpacker';
import config from '../config';
import csso from 'postcss-csso';

const isMax = mq => /max-width/.test(mq);
const isMin = mq => /min-width/.test(mq);

const sortMediaQueries = (a, b) => {
  A = a.replace(/\D/g, '');
  B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }
  return 1;
}

const processors = [
  autoprefixer({
    overrideBrowserslist: [
      'last 2 versions',
      'ie >= 9',
      'maintained node versions',
      'not dead'
    ],
    cascade: false
  }),
  // require('lost'),
  // mqpacker({
  //   sort: sortMediaQueries
  // }),
  csso
];

gulp.task('wiziwig', () => gulp
  .src(config.src.wiziwig)
  .pipe(sassGlob())
  .pipe(sass({
    outputStyle: 'expanded', // nested, expanded, compact, compressed
    precision: 5,
    includePaths: [
      'node_modules/bootstrap/scss',
      'node_modules/bourbon/core/'
    ]
  }))
  .on('error', config.errorHandler)
  // .pipe(postcss(processors))
  .pipe(gulp.dest(config.dest.css))
);

gulp.task('lint:sass', () => gulp
  .src(config.src.sasslint + '/**/*.scss')
);
const build = gulp => gulp.parallel('wiziwig');
const watch = gulp => () => gulp.watch(config.src.sasslint + '/**/*.{sass,scss}', gulp.parallel('wiziwig'));

module.exports.build = build;
module.exports.watch = watch;

