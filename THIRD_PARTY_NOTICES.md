# Browser dependencies

Firebase JavaScript SDK 12.19.0 — Apache License 2.0.
https://github.com/firebase/firebase-js-sdk

Auth, Firestore, App Check and AI Logic are compiled from the same npm dependency graph. This avoids mismatched Firebase application registries. The output is public/vendor/firebase-services.js; license notices are in its adjacent .LEGAL.txt file and Firebase-LICENSE.

Chart.js 4.5.1 — MIT License.
https://github.com/chartjs/Chart.js
License: public/vendor/Chart-LICENSE.md.

The source bundle is built with esbuild 0.25.11 (MIT). Build and test dependencies are pinned in package-lock.json and are not needed for ordinary deployment.

The browser uses Firebase and Cloudinary APIs and Google's reCAPTCHA Enterprise / Fraud Defense script. Service quotas and account terms apply. Google Fonts is used for interface typography, with system-font fallbacks.
