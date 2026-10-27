# Live acceptance checks — version 2.4.0

Deploy both Hosting and Firestore rules first. Use your existing Firebase project. Do not erase real data. The local test suite used synthetic records; the steps below require your deployed services.

1. Hard-refresh https://kidcorture.web.app. Register should list Designer, BAJMC, Faculty Reviewer, Coordinator, Marketing Manager and Analyst, with no admin option or class-code field.
2. Register a disposable account for each role. It should enter directly without admin approval or email verification. Check its menu against START_HERE.md. No non-admin should see Team & Roles or Settings.
3. Sign in with an existing BAJMC account. Confirm Collection Journeys, Dashboard, Media Library, Creative Tools, Reports and My Account appear. The dashboard should show collection/media information.
4. In My Account, change a disposable BAJMC account to Coordinator. Confirm Events & Ops appears and the login/account ID stays the same. Sign out and back in; the selected role should persist. Change it back if desired.
5. As BAJMC, create a disposable TEST collection, save a production-log entry, upload an image and save its record. Refresh to check persistence. Other members can read shared collection evidence; a different BAJMC account should not see this user's private media-library records.
6. As Faculty, review an entry by another user. A faculty member must not approve their own entry after a role change. Returning an entry to pending permits its author to revise it.
7. As Designer, confirm Design Inventory, uploads, Creative Tools and Reports still work. Check Coordinator events/vendors/models, Marketing planning and Analyst reports with disposable data.
8. Test Gemini with non-sensitive caption details and verify three returned captions. Test the labelled local templates separately. If Gemini fails, check AI Logic, model availability, App Check and quota; do not enable billing merely to pass this check.
9. Generate a Collection Journeys report and open a collection portfolio. Use Print / save portfolio PDF. For a complete portfolio, supply real evidence for all seven stages and have another reviewer approve it.
10. Sign in as verified krm04094@gmail.com. Confirm owner access and account-management controls. Another email must not gain administrator access by changing a role or modifying registration fields.
11. Create a disposable TEST event. Admin or Coordinator can delete it after confirmation; its expenses should also disappear. Designer and BAJMC roles must not delete events.
12. Create a disposable TEST collection with entries. Only the owner admin can delete it after typing the collection name. Confirm unrelated records remain. If deletion is interrupted, Resume deletion should finish it; removed records cannot be restored.
13. Disable a disposable account as admin. That user must lose access and must not be able to enable themselves or change role while disabled. Existing disabled accounts remain disabled until the owner enables them.
14. Check phone and desktop layouts, login animation/Pause and keyboard access. Confirm no permission-denied messages while using each role's intended pages.

Public role selection does not establish college membership or staff identity. Use only authorized project material. Do not place private child/guardian information in images, captions, source links or shared journey notes.
