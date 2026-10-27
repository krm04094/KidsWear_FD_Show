# Kids Wear FD Show — complete Firebase project

Version 2.4.0 · 26 October 2026

## What this update corrects

Registration now offers all SIX non-admin roles: Fashion Designer, BAJMC Documenter, Faculty Reviewer, Event Coordinator, Marketing Manager and Analyst. Each enters immediately with no class code, approval or email-verification gate. Only the configured owner must verify their email to obtain Administrator access.

Existing accounts can open My Account, select a non-admin role and save. They keep the same login, records and account ID. The live profile listener rebuilds the menu and reloads the permitted records. Changing roles changes accessible actions; it does not delete records. The administrator can still change roles or disable accounts. Existing disabled/pending accounts are not silently reactivated.

BAJMC now has Collection Journeys, Dashboard, Media Library, Creative Tools, Reports and My Account. BAJMC users can create collections, edit their own collection details, save their own media, create captions and print a collection directory or individual portfolio. Faculty has Collection Journeys, a review dashboard, collection reports and My Account. Designer, Coordinator, Marketing and Analyst modules are retained.

All six roles are self-selected. The website does not verify college membership or faculty/coordinator positions. Anyone registered can select those roles and use their permitted actions. The boundary reserved for the verified owner is Administrator: Team & Roles, Settings and permanent collection deletion. A Faculty Reviewer cannot review an entry they authored, including after changing their own role.

## Deploy from VS Code

Extract this ZIP into a new folder, then open the inner KidsWear_FD_Show folder in VS Code. Open Terminal > New Terminal in the folder containing firebase.json. Use Node.js 22 or newer.

Install the Firebase CLI once if it is not already installed:

```sh
npm install -g firebase-tools
```

Then run:

```sh
firebase login
firebase deploy --only "hosting,firestore:rules" --project kidcorture
```

Deploy BOTH Hosting and rules. No firebase init, BAT file or build is needed: browser assets are included. Use the account that owns the existing kidcorture project. The command updates website files and access rules; it does not create Firestore, enable Email/Password authentication or change billing settings.

Open https://kidcorture.web.app, press Ctrl + Shift + R, sign out and sign back in. An existing BAJMC account should now see six menu options. Use My Account to change an incorrect role. Do not delete Firebase users, collections or the database to install this update.

## Owner account

Administrator access is restricted to the exact verified email krm04094@gmail.com. Other Gmail addresses do not qualify. There is no admin checkbox, public admin signup option or admin choice in My Account.

Use the owner's existing email/password. If no account exists, register with that exact address, verify the Firebase email, and select I've verified my email. Only verified control of that address can bootstrap the admin profile. No password is included and no live account was created by this update. Former admin profiles under other emails remain blocked until the real owner assigns a non-admin role.

## Role menus

| Role | Available pages |
| --- | --- |
| Fashion Designer | Collection Journeys, Dashboard, Design Inventory, Media Library, Creative Tools, Reports, My Account |
| BAJMC Documenter | Collection Journeys, Dashboard, Media Library, Creative Tools, Reports, My Account |
| Faculty Reviewer | Collection Journeys, Dashboard, Reports, My Account |
| Event Coordinator | Collection Journeys, Dashboard, Events & Ops, Reports, My Account |
| Marketing Manager | Collection Journeys, Dashboard, Media Library, Marketing, Creative Tools, Reports, My Account |
| Analyst | Collection Journeys, Dashboard, Reports, My Account |
| Administrator | All pages, including Team & Roles and Settings |

All roles can print a collection-directory report. Other report types are role-scoped. Faculty can review other authors' journey entries. Designers and BAJMC can only see their own Media Library records; collection evidence is shared with enabled studio members. Role rules are enforced in Firestore as well as in the menus.

## Delete an event or collection

Events & Ops > Events: Administrator and Coordinator accounts can select the event's trash icon and confirm. This permanently deletes that event and its recorded expenses. Separate vendor/model profiles and collection records remain.

Collection Journeys: only the verified administrator can delete an entire collection. Type its name exactly. The application locks it, removes child entries in batches, and removes the parent last. If interrupted, select Resume deletion. Deleted entries cannot be restored. Cloudinary assets and independent inventory, event, marketing and activity records remain. Archive preserves the collection while locking entry edits.

## Integrations and free deployment

Existing Firebase kidcorture configuration, Cloudinary cloud ydnma8vg, preset kidswear_uploads, App Check configuration and Gemini model setting are retained. This update does not verify or change provider quotas, live model availability or billing plans. Keep Firebase on Spark without a billing account and Cloudinary on Free. There is no OpenRouter, Cloud Function, paid backend or BAT script.

Cloudinary uploads accept JPG, PNG and WebP up to 5 MB in the browser. Restrict the unsigned preset in Cloudinary as well. Media delivery URLs are public; unsigned uploads can be called independently of Firebase. Cancelled uploads and database deletion may leave assets in Cloudinary. Video evidence uses source links, not video-file uploads. Social publishing remains manual.

Gemini captions use Firebase AI Logic and App Check; Use templates is a separately labelled local alternative. Live responses require a supported free-tier model and correct provider setup. No secrets or service-account files should be placed in public assets.

## Local verification

```sh
npm ci
npm test
npm run test:rules
```

The emulator command also needs Java 21 or newer. See TEST_RESULTS.md for actual results and LIVE_TEST_CHECKLIST.md for checks on your deployed site. Local provider mocks do not prove real uploads, email delivery or AI availability. Existing login animation, Pause / Resume, reduced-motion support and portfolio print styles are retained.
