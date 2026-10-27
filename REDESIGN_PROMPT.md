# Current access requirements — version 2.4.0

All six non-admin roles self-register and enter directly. Enabled users can change their non-admin role in My Account. Preserve exact verified owner admin protection. BAJMC must have collection creation, documentary entries, its own media library, a collection dashboard, caption tools and collection reports. Faculty has a review dashboard and cannot review its own entries. Public role selection is not verification of a college position. No approval or shared-code gate should be reintroduced. The historical design brief below describes earlier versions; these access requirements take precedence.

> Current project brief for version 2.3.0. START_HERE.md contains deployment and account instructions.

# Kids Wear FD Show — project brief

Build a collaborative academic website where Fashion Design students document an entire kids-wear collection and BAJMC students record its creative journey. Keep the focus on inspiration, boards, sketches, rendering, fabric sourcing, the finished collection and the final ramp walk.

Use Firebase Hosting, Authentication and Firestore. Let users register as Fashion Designer or BAJMC Documenter and enter immediately without class codes, individual approval or student email-verification gates. Reserve admin for the exact verified owner email krm04094@gmail.com; assign other staff roles through the owner and enforce all privileges in database rules. Support designer, documenter, faculty, coordinator, marketer, analyst and administrator roles.

Provide collection workspaces, image evidence, video/source links, production notes, interviews, storyboards, review feedback, runway looks and printable portfolios. Show progress based on approved design evidence across the seven stages.

Use Cloudinary unsigned image uploads within its free plan. Provide real AI captions through Firebase AI Logic with App Check and the Gemini Developer API's eligible free tier. Make local templates available when the AI quota is unavailable. Keep uploads and AI errors visible and actionable without claiming a connection before a successful request.

Keep Instagram and other social publishing manual. Do not add paid services, OpenRouter, Cloud Functions, invented social statistics or embedded secrets. Supply all source, prebuilt browser files, complete database rules and simple terminal deployment commands.
