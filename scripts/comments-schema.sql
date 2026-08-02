-- Run once in the Supabase SQL editor. Keep this list in sync with the
-- client-side one in src/utils/profanity.ts — this is the real backstop
-- (the client check is easy to bypass by calling the API directly).
alter table comments
  add constraint comments_no_profanity check (
    lower(coalesce(name, '') || ' ' || body) !~ (
      'fuck|shit|bitch|asshole|bastard|cunt|dick|piss|' ||
      'nigger|nigga|faggot|retard|whore|slut|' ||
      '操你|傻逼|傻屄|婊子|賤人|贱人|白痴|智障|死全家|干你娘|幹你娘'
    )
  );
