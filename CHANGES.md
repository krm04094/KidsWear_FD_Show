# Version 2.4.0 — 26 October 2026

- Restored all six non-admin roles to direct registration; removed the staff verification gate.
- Added My Account so enabled members can change their own non-admin role without a new login or admin approval.
- Expanded BAJMC to Dashboard, Media Library, Creative Tools and Reports, alongside Collection Journeys. BAJMC can create and edit owned collections.
- Added a collection-directory report for every role and a collection-focused dashboard for BAJMC and Faculty.
- Kept BAJMC media queries scoped to the author. Faculty cannot approve their own authored entries after switching roles.
- Matched Firestore rules to registration, profile changes, media and collection permissions. Kept exact verified owner protection, disabled-account restrictions, deletion safeguards, provider configuration and login/printing styles.
- Documented that all non-admin roles are self-selected and college positions are not verified.

## Earlier releases

# Version 2.3.0 — 25 October 2026

Removed class-code enrollment, registration policy listeners and code-management controls. New Fashion Designer and BAJMC Documenter accounts now save an enabled profile and enter immediately, without administrator approval or a student email-verification gate. Old enabled student accounts remain compatible; old pending/disabled accounts are not silently reactivated.

Public signup remains limited to the two student roles. The exact verified owner email still controls administrator access. Newly assigned privileged staff verify their email. Updated Firestore rules enforce those boundaries and ignore old registration policies. Account suspension and owner-only collection deletion remain available. Login animations, seven-stage portfolios, Firebase/Cloudinary/App Check/Gemini configuration and prebuilt SDK are retained.

Updated role, deployment and validation documentation. Deploy Hosting and the complete rules together. No paid backend or database migration is required.

# Version 2.2.0 — 24 October 2026

Replaced routine student approval with class-code registration and email verification. The owner creates a class code once in Settings; students choose Designer or BAJMC Documenter, verify their own email and enter automatically. Code replacement and registration pause controls affect new signups only. Existing disabled/pending accounts stay disabled.

Reserved administrator access for the exact verified email krm04094@gmail.com. The owner profile can bootstrap automatically after verification. Other former admin accounts require reassignment to a normal role. Public signup and role-change controls do not offer administrator access. New owner-created staff accounts also require email verification. Existing enabled non-admin profiles retain their previous access.

Added owner-only Delete collection controls with typed-name confirmation. Deletion locks the collection, drains its entries in batches, then removes the parent. Interrupted operations can resume; Cloudinary assets and independent records are retained. Archive remains available for keeping work.

Updated full Firestore rules and tests for admission, verification, owner identity, suspension and collection cleanup. Login animations, printing fixes, existing Firebase configuration, Cloudinary and Gemini integrations are retained. Deploy Hosting and rules together. No paid backend or database migration script is added.

# Version 2.1.3 — 24 October 2026

Fixed blank collection portfolio PDFs caused by the generic report print rules hiding all other page content. Portfolio content now has an explicit print visibility override. Stage and entry headings stay with their following content where the browser can fit it.

Print output also suppresses toast notifications and entrance animations, so a newly generated report does not print during an invisible animation frame. These rules apply only when printing; on-screen login animations remain unchanged.

Added LIVE_TEST_CHECKLIST.md with concrete deployment, registration, approval, role, upload, Gemini, collection-review and export checks. Changes are limited to print CSS in public/index.html and public/journey.css, version metadata and documentation. Authentication logic, Firestore rules, integration configuration and bundled SDK are unchanged.

# Version 2.1.2 — 15 October 2026

Restored the playful floating dress, teddy and sparkles on the login page. Added a floating hanger and button, a moving stitch line, a gentle title shimmer, staggered introduction text and short form entrance transitions.

Decorations are bundled inline SVG, so they work without an emoji font or extra image downloads. Added a desktop Pause / Resume animations control. Decorative elements ignore pointer input and are hidden from screen readers. The page respects reduced-motion settings, and its compact mobile layout keeps the form clear.

Only public/index.html and release documentation/version metadata change in this update. Login fixes, authentication logic, existing integrations and Firestore rules are retained.

# Version 2.1.1 — 15 October 2026

Refined the existing login page for the Kids Wear FD Show project: FD/BAJMC introduction, collection-focused features, mobile branding, stronger button contrast, purple focus indicators and reduced-motion support.

Added accessible password visibility controls, linked labels, autocomplete and registration approval guidance. Normal logout now uses neutral feedback; registration and password-reset success use green feedback; failures reliably return to error styling. Added readable common authentication errors, duplicate reset protection and stale reset-response suppression.

Updated public/index.html, client checks, package version and documentation. Firebase configuration, Firestore rules, Cloudinary integration, AI integration and existing application features are unchanged. No new service, paid plan, database migration or build step is required.

# Version 2.1.0 — 13 October 2026

Added Cloudinary image uploads, Firebase App Check and genuine Firebase AI Logic captions. Added explicit local caption fallback, input/output validation, timeouts, upload cancellation and session-change handling.

Added public/integrations-config.js, public/integrations.js, public/integrations.css and the prebuilt Firebase service bundle. Included readable source and build instructions. Updated index.html, journey.js, tests and deployment documentation.

The complete firestore.rules file is included and is byte-for-byte unchanged from the recovered version. Existing rules already validate CLOUD media records and restrict account roles; no data migration is required.

Instagram API publishing was skipped at the user's request. Marketing still supports drafts, manual plans and recording external publication. Videos remain HTTPS source links; this release adds image uploads only.
