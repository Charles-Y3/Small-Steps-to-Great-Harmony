import { localized, type Localized } from './types';

// UI chrome strings — never write a raw string literal into JSX in this
// app; add a key here and read it through t() instead.
//
// Tone rule for everything in this file (and in data/apps.ts): no
// "transform", "unlock your potential", "the path", "life-changing".
// Prefer plain, modest language — "a few small tools", "start anywhere".
// This is the actual point of the title "Small Steps to Great Harmony".
export const UI: Record<string, Localized<string>> = {
  siteName: localized('Small Steps to Great Harmony', '小步向大同'),

  nav_theme: localized('Theme', '主題'),
  nav_theme_light: localized('Light', '亮'),
  nav_theme_dark: localized('Dark', '暗'),
  nav_lang_en: localized('EN', 'EN'),
  nav_lang_zhHant: localized('繁', '繁'),
  nav_lang_zhHans: localized('简', '简'),
  nav_install: localized('Install', '安裝'),

  hero_title: localized('Small Steps to Great Harmony', '小步向大同'),
  hero_body1: localized(
    'A small, humble offering toward inner work — hoping it helps, in some small way, on the way to a better world for everyone. There’s no shortcut here, just showing up for yourself, again and again.',
    '一點微小而真誠的心意，獻給每一位願意向內探索的人。希望它能在通往更美好世界的路上，帶來一點點幫助。這裡沒有捷徑，只是一次又一次，願意為自己停下腳步。',
  ),
  hero_body2: localized(
    'Six personal projects, from one that sits with the writings of old sages to one that’s a lot lighter — free, no account needed, and they don’t talk to each other. None will change your life in a week. Pick whichever sounds least like homework, and start there.',
    '這裡有六個個人作品，有的陪你讀讀古代聖賢的文字，有的則輕鬆一些。全部免費，不需註冊，彼此之間也不互通資料。它們都不會在一週內改變你的人生。挑一個最不像做功課的開始就好。',
  ),
  hero_fact_apps: localized('Six apps', '六個作品'),
  hero_fact_free: localized('Free', '免費'),
  hero_fact_account: localized('No account needed', '不需註冊'),
  hero_cta: localized('Start anywhere ↓', '從任何一個開始 ↓'),

  section_apps_title: localized('The Apps', '作品'),
  filter_all: localized('All six', '全部六個'),
  filter_reflecting: localized('Reflecting', '反思'),
  filter_exploring: localized('Exploring', '探索'),
  filter_reading: localized('Reading', '閱讀'),
  filter_hint: localized(
    'What are you in the mood for? These highlight which apps lean that way.',
    '你現在想做點什麼？以下會標出偏向這個方向的作品。',
  ),
  section_backup_title: localized('A note on backup & export', '關於備份與匯出的提醒'),
  section_backup_body: localized(
    'A few apps in this suite let you back up your data (notes, insights, progress) to a file on your device. How that works depends on your browser: on desktop Chrome or Edge, and on Android Chrome, you can pick a folder once, and every export or auto-save afterward overwrites the same file there. On any other mobile browser — including every iPhone browser, since iOS requires them all to run on Safari’s engine — there’s no folder access, so each export becomes a separate, timestamped download you’d need to manage yourself.',
    '本站部分作品可以將你的資料（筆記、心得、進度）備份成裝置上的檔案。實際運作方式依瀏覽器而不同：在電腦版 Chrome 或 Edge，以及 Android 版 Chrome 上，你可以選擇一次資料夾，之後每次匯出或自動儲存都會覆寫同一個檔案。在其他行動瀏覽器上——包括所有 iPhone 瀏覽器，因為 iOS 規定它們都必須使用 Safari 引擎——則無法存取資料夾，因此每次匯出都會變成獨立、附帶時間戳記的下載檔案，需要自行管理。',
  ),
  section_about_title: localized('About this page', '關於這個頁面'),
  section_about_body: localized(
    'These are six separate, independently-built projects that happen to share a family resemblance — an interest in wisdom traditions, reflection, and quiet daily practice. They were not designed as one product, they don’t share accounts or data, and this page is just an index — nothing here tracks you across the six.',
    '這六個是各自獨立開發的作品，只是剛好有些共通的興趣——對智慧傳統、反思與日常修習的關注。它們並非設計成同一套產品，彼此不共用帳號或資料，這個頁面只是一份索引——不會在六個作品之間追蹤你。',
  ),

  card_visit: localized('Visit ↗', '前往 ↗'),
  card_readMore: localized('Read more', '了解更多'),
  card_comingSoon: localized('Coming soon', '即將推出'),
  card_visited: localized('Visited', '已造訪'),

  detail_visit: localized('Visit ↗', '前往 ↗'),
  detail_goodFor: localized('Good for', '適合'),
  detail_notThis: localized('This isn’t', '這不是'),
  detail_languages: localized('Languages', '語言'),
  detail_installable: localized('Installable, works offline', '可安裝，離線可用'),
  detail_modeChart: localized('How this spends your time', '這個作品如何運用你的時間'),

  comments_title: localized('Comments', '留言'),
  comments_titleCount: localized('Comments ({count})', '留言（{count}）'),
  comments_showMore: localized('Show more ({count} more)', '顯示更多（還有 {count} 則）'),
  comments_empty: localized('No comments yet — be the first to leave a few words.', '目前還沒有留言——第一句話就從你開始。'),
  comments_namePlaceholder: localized('Name (optional)', '名字（選填）'),
  comments_bodyPlaceholder: localized('Leave a comment', '留下一段話'),
  comments_submit: localized('Post', '送出'),
  comments_submitting: localized('Posting…', '送出中…'),
  comments_error: localized('Couldn’t post that — please try again.', '送出失敗，請再試一次。'),
  comments_blocked: localized('Please keep it civil — that comment couldn’t be posted.', '請保持友善——這則留言無法送出。'),
  comments_anonymous: localized('Anonymous', '匿名'),

  visited_none: localized('You haven’t opened any of the six yet.', '你還沒開啟過這六個作品中的任何一個。'),
  visited_some: localized('You’ve opened {count} of 6.', '你已開啟 {count} / 6 個。'),
  visited_clear: localized('Clear', '清除紀錄'),

  footer_privacy: localized(
    'This page keeps a local, on-device note of which apps you’ve opened — nothing else is tracked, and nothing is sent anywhere.',
    '這個頁面只會在你自己的裝置上記下你開啟過哪些作品，除此之外不追蹤任何資訊，也不會傳送到任何地方。',
  ),
  footer_updated: localized('Last updated', '最後更新'),
  footer_version: localized('v{version}', 'v{version}'),

  update_available: localized('A new version of this page is ready.', '這個頁面有新版本了。'),
  update_reload: localized('Reload', '重新整理'),
  update_dismiss: localized('Dismiss', '關閉'),
};

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}
