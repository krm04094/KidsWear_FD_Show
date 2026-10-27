import {build} from 'esbuild';
await build({
  entryPoints: ['src/firebase-services.js'],
  outfile: 'public/vendor/firebase-services.js',
  bundle: true, minify: true, format: 'iife', platform: 'browser', target: ['es2020'],
  legalComments: 'linked', sourcemap: false
});
console.log('Built Firebase Auth, Firestore, App Check and AI Logic.');
