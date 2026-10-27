# Validation — 26 October 2026

Version 2.4.0

## Current release

- **122 client checks passed** using actual application handlers with synthetic Auth/Firestore/provider responses. Checks cover all six non-admin registration choices, direct unverified access, role-specific menus, existing-account role changes, BAJMC collection creation, owned media, captions and collection reports, owner protection and prior form/deletion behavior.
- **13 bundled Firebase SDK checks passed** with mocked HTTP responses. No SDK rebuild or provider-configuration change was made.
- **194 Firestore emulator checks passed** using the actual bundled rules with Java 21. New cases cover registration as each non-admin role, immediate access, non-admin self-service role changes, admin-role denial, settings/account-list restrictions, owned BAJMC collections and media, denial of faculty review of their own entry, and event deletion by admin/coordinator. Existing disabled-account and interrupted collection-deletion checks also passed.
- **329 automated suite checks passed** in total.
- **33 additional Chromium checks passed**. Registration was exercised at 1920×1080, 1366×768, 390×844 and 360×640. Browser checks registered all six roles, clicked every page in each role's menu, created a BAJMC collection, generated its report, changed an existing BAJMC account to Coordinator and confirmed the updated menu. Owner verification, login Pause / Resume and reduced motion also passed. No browser page errors were observed. Registration and the BAJMC journey/dashboard screens were visually inspected.
- Syntax, version metadata, ZIP integrity and complete archive contents were checked. Provider configuration, Firebase SDK files, login/printing CSS and existing collection-deletion logic are retained.

## Limits and access policy

These are local tests with synthetic records. No live deployment, account creation, email delivery, Cloudinary upload, Gemini request or deletion of real records was performed. Use LIVE_TEST_CHECKLIST.md after deployment.

All six non-admin roles are intentionally self-selected. The website does not verify college membership or staff position. Administrator remains reserved to the exact verified owner email. Disabled accounts cannot enable themselves or change their own role while disabled. Faculty cannot review their own authored evidence, even after a role change.

Collection deletion is permanent and resumable, not reversible. The owner UI removes child entries before the parent; rules cannot count subcollections. Cloudinary media files and unrelated records remain. Event deletion removes the event and its embedded expenses, while separate vendor/model profiles remain.

## Historical validation

The following records describe older versions and their original policies. The current 2.4.0 results and access policy above take precedence. The two-role-only registration restriction and staff verification gate described below are no longer used.

# Validation — 25–26 October 2026

Version 2.3.0

## Checks run for this release

- **100 client checks passed** using the actual page handlers with jsdom and synthetic Auth, Firestore and provider responses. Coverage includes direct Designer and BAJMC registration without a class code, approval or verified-email claim; role routing; profile-save rollback; suspended accounts; privileged self-registration rejection; verified-owner bootstrap; and verification when a new student is promoted to staff.
- Client collection-deletion checks use 205 entries, deliberately stop after the first batch and resume until the remaining children are removed before the parent. Wrong confirmation, unauthorized deletion and unrelated-record preservation are checked.
- **13 bundled Firebase SDK checks passed** with mocked HTTP endpoints. These cover shared Auth/Firestore identity, verification messages and token refresh, owner display name, App Check and Auth tokens on Gemini calls, response validation and provider errors.
- **150 Firestore rules checks passed** against the actual Firestore emulator with Java 21. These cover direct unverified student access, ignored obsolete registration policies, field validation, legacy student-profile compatibility, staff verification, disabled-account restrictions, self-escalation rejection, exact verified owner identity, former-admin restrictions, collection locks and deletion of approved child entries.
- Total: **263 automated suite checks passed**. These are local results, not live provider confirmations or a complete security audit.
- **18 additional Chromium checks passed** at 1920×1080, 1366×768, 390×844 and 360×640. They cover registration without a code or public admin role, immediate unverified student access, restricted student menus, verified-owner entry, Pause / Resume and reduced-motion behavior. No browser page errors were reported. Desktop and mobile registration screenshots were inspected.
- Package versions, application syntax, unchanged integration configuration and SDK assets, complete archive contents and ZIP integrity were checked. Existing login artwork/animation styles and portfolio-printing styles are retained.

## Scope and live checks still needed

No live Firebase deployment, account registration, email delivery, Cloudinary upload, Gemini generation or deletion of a real collection was performed. Browser and provider tests use synthetic accounts and controlled responses. Follow LIVE_TEST_CHECKLIST.md on the deployed project and use disposable collection records for the deletion check.

Public registration is open to anyone choosing Designer or BAJMC Documenter. It does not verify college membership. Existing disabled or pending profiles remain blocked until the owner enables them. Legacy enabled non-admin profiles retain their prior verification policy; new student profiles promoted to a staff role require email verification. Admin access remains restricted to the exact verified owner email.

Collection deletion is resumable but is not reversible. The trusted owner interface removes child entries before the parent. Rules lock writes and restrict deletion to the verified owner, but cannot count all subcollection documents. Direct console/server operations are outside this client workflow. Cloudinary assets are retained independently of database-record deletion.

## Historical validation — version 2.2.0

The material below records earlier releases and their original behavior. Current-release results above take precedence. Class-code enrollment described in the 2.2.0 history has been removed from 2.3.0.

### Validation — 24 October 2026

Version 2.2.0

## Checks run for this release

- **101 client checks passed** using the real page handlers with jsdom and synthetic Auth/Firestore/provider responses. New coverage includes automatic student enrollment, blocked access before verification, forced token refresh, owner bootstrap, class-code creation/pause/rotation, suspended accounts, failed verification-email delivery, resend duplication/cooldown and stale-session responses.
- Client deletion tests use 205 entries, deliberately fail after the first batch, confirm the parent remains locked and retry until every entry is removed before the parent. Wrong typed confirmation, non-admin access and unrelated collection preservation are checked.
- **13 actual bundled Firebase SDK checks passed** with mocked HTTP endpoints. These include verification-email requests, reloading verification status, refreshing the authentication token, saving the owner's display name and the existing AI transport/error checks.
- **148 Firestore rules checks passed** against the actual Firestore emulator using Java 21. New cases cover disabled enrollment, wrong/rotated class codes, prohibited role choices, unverified accounts, self-escalation, disabled-account re-enrollment attempts, exact verified owner identity, former-admin restrictions, deletion locks and batches of approved child entries.
- Total: **262 automated checks passed**. These are local checks, not live-account confirmations or a complete security audit.
- Chromium checked registration, email-verification screens and the deletion confirmation at 1920×1080, 1366×768, 390×844 and 360×640. Checks covered horizontal overflow, access to long registration forms, owner-email field changes, typed deletion confirmation and hiding collection deletion from student roles. Desktop/mobile screenshots were visually inspected.
- Login decoration animation, Pause / Resume and reduced-motion behaviour were checked. No browser page errors were reported in this focused run. External web fonts were blocked, so screenshots use fallback fonts.
- Application syntax, package/lockfile versions, archive contents and ZIP integrity were checked. The Firebase SDK bundle, provider configuration and integrations are unchanged.

## Scope and live checks still needed

No live Firebase deployment, email delivery, account registration, Cloudinary upload, Gemini generation or deletion of a real collection was performed. The test owner/collection records are synthetic. Use LIVE_TEST_CHECKLIST.md after deployment, and test deletion only on a disposable collection first.

The client performs resumable collection deletion because this project has no paid backend. Rules restrict final parent deletion to the verified owner and lock child writes, but rules cannot count subcollection documents. The trusted owner UI performs child cleanup before deleting the parent. Direct console/server operations are outside that workflow.

Class codes can be shared by recipients. Email verification proves control of an address, not college membership. The owner controls who receives the code and can rotate it, pause new signups or disable individual accounts. Existing active legacy non-admin accounts retain their previous verification policy for compatibility; new self-registered and owner-created accounts require verification.

The following results document earlier versions and their original scopes. Current-release results above take precedence.

## Historical print validation — version 2.1.3

## Run for the print correction

- Reproduced the original issue in Chromium with the real page styles: a synthetic seven-stage portfolio had hidden text under print media, and its exported PDF contained no text.
- Confirmed the corrected portfolio has visible titles and entries while the application shell is excluded from print output. The real printJourney handler was invoked with a stubbed browser print dialog; its print class was cleaned up afterwards.
- Exported a local PDF containing all seven stages, the collection title, team credits, 100% approved-stage progress, image fixtures, notes, review feedback and source links. Text extraction verified this content. The first page was visually inspected.
- Checked ordinary report printing as well. Suppressed transient notifications and print-time entrance animations; the generated report remains visible and the portfolio is excluded. The report PDF's first page was visually inspected.
- Confirmed the portfolio is hidden again under screen media. No browser page errors were reported in the focused test.
- Tests used a local provider stub, synthetic collection records and locally served image fixtures. They did not access Firebase, Cloudinary or Gemini accounts, test Windows print-dialog clicks, or establish that external images will always load.
- The existing client, SDK and rules suites were not rerun for this CSS-only code change. Their historical results are retained below. Package versions, unchanged application/configuration files and ZIP integrity were checked for this release.
- See LIVE_TEST_CHECKLIST.md for the live checks still required. Passing a local print test does not establish live authentication, database enforcement, upload persistence or AI availability.

## Earlier animation validation — version 2.1.2, 15 October 2026

## Run for the animation update

- Chromium checked the updated page at 1920×1020, 1366×768, 1080×680 and 390×844.
- Desktop checks verified that decorative transforms change over time, Pause / Resume works, the title shimmer and stitch animation run, reduced-motion settings stop the effects and decorative icons stay clear of the text at the sampled positions.
- The browser checks also exercised password controls, failed sign-in feedback, reset feedback, registration scrolling and keyboard order using local provider stubs.
- Desktop screenshots were visually inspected after entrance animations completed. Decorations use inline SVG rather than emoji fonts to avoid missing-character boxes.
- Package contents and ZIP integrity were verified. Changes are limited to login visuals, the animation toggle and release documentation/version metadata. The existing authentication flow, SDK, integrations and Firestore rules are unchanged.
- The 86 automated checks below passed for 2.1.1. They were not rerun for this visual update; the focused browser checks above were run for 2.1.2.

## Earlier login validation — version 2.1.1

- 78 client checks passed, including 11 new checks for password visibility, clearing credentials, invalid reset emails, reset success/error feedback, duplicate requests, stale responses, failed login, logout styling, pending approval and disabled-account feedback.
- All 8 compiled Firebase SDK checks passed again with mocked HTTP responses: 86 automated checks in total.
- Headless Chromium checked sign-in and registration at 1920×1020, 1366×768, 390×844, 360×640 and 740×390. Checks covered horizontal overflow, card bounds, password controls, errors, reset feedback, keyboard order and reaching the registration submit button by scrolling. Desktop and phone screenshots were inspected.
- Browser checks used a local Firebase stub; they did not sign in to an actual account, send reset emails or change cloud data. External web fonts may fall back to installed fonts in this test environment.
- The login button's new white text has at least 5.9:1 contrast at the gradient endpoints. Form labels and keyboard focus colours were also checked against white; this is not a full accessibility audit.
- Firestore rules, Firebase config, integration config and bundled SDK are unchanged. No rules emulator run or SDK rebuild was needed for this login update.
- Package versions, included files and ZIP integrity were checked.

Run the 86 automated checks with npm ci followed by npm test. See the earlier integration report below for the scope of the existing tests.

## Earlier integration validation — 13 October 2026

Version 2.1.0

### Integration checks run for 2.1.0

- 67 client checks passed using jsdom, genuine form handling and mocked Firebase/Cloudinary/AI responses.
- 8 additional checks passed by executing the actual compiled Firebase SDK bundle in jsdom with mocked HTTP responses. These verified shared Auth/Firestore application identity, App Check and Auth tokens on AI requests, the Gemini Developer API route, JSON response parsing, quota errors, invalid responses and signed-out rejection.
- The new client cases include file type/size validation, successful URL insertion, Firestore save failure/retry, CLOUD record ownership, untrusted upload responses, saving during uploads, closed forms, role checks, session resets, escaped AI output, quota fallback, preservation of drafts and duplicate AI clicks.
- Bundle generation succeeded with the pinned build dependencies.
- Application JavaScript syntax and ZIP integrity were checked.
- The complete Firestore rules were compared with the recovered archive and are unchanged.

Run the 75 local checks with npm ci followed by npm test. Rebuild changed SDK source using npm run build.

### Earlier rules checks

The previous release reported 85 passing tests against a Firestore emulator. That result is historical: the unchanged rules were not rerun for this release. The included test:rules command needs Java 21+ with Firebase CLI 15; this environment has Java 17.

### Live services not verified here

No live deployment, user-account login, real Cloudinary upload or real Gemini generation was performed. Console configuration, preset restrictions, model availability and remaining free quota require a live check after deployment.

The 2.1.0 release could not complete a real-browser check. Version 2.1.1 adds the login-specific Chromium checks listed above. Other application pages, printing, production reCAPTCHA attestation and Windows terminal execution were not verified in a real browser for the 2.1.1 update. The local print checks added in 2.1.3 are retained above in the historical section.

