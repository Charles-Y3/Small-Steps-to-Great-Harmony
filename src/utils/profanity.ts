// A small denylist, not a real moderation system — catches casual abuse in
// a public, no-sign-in comment box; a determined bad actor can still get
// around this. The Postgres CHECK constraint (see scripts/comments-schema.sql)
// is the real backstop, since this check is client-side and easy to skip by
// calling the API directly.
const DENYLIST = [
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick', 'piss',
  'nigger', 'nigga', 'faggot', 'retard', 'whore', 'slut',
  '操你', '傻逼', '傻屄', '婊子', '賤人', '贱人', '白痴', '智障', '死全家', '干你娘', '幹你娘',
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[\s._\-*'"!@#$%^&()+=]/g, '');
}

export function containsProfanity(text: string): boolean {
  const normalized = normalize(text);
  return DENYLIST.some((word) => normalized.includes(normalize(word)));
}
