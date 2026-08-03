import type { SuiteApp } from './types';
import { localized } from '../i18n/types';

// Content authored in English + Traditional Chinese; Simplified is
// generated (see scripts/gen-zh-hans.ts). `url` is the single source of
// truth for each app's production link — scripts/validate-links.mjs reads
// it directly, so don't duplicate it anywhere else.
//
// Tone rule (see i18n/strings.ts header): no "transform", "unlock your
// potential", "life-changing". Every app gets an honest "notFor" line —
// that field does more for the portal's humility than the hero copy does.

export const APPS: SuiteApp[] = [
  {
    id: 'atlas',
    order: 1,
    name: localized('Atlas of Wisdom', '智慧地圖集'),
    tagline: localized('An interactive globe of places that shaped human wisdom', '一顆互動地球儀，標記著形塑人類智慧的地方'),
    blurb: localized(
      'Spin an interactive 3D globe and discover real places — temples, academies, shrines, birthplaces of ideas — from wisdom traditions across the world.',
      '轉動一顆互動式的 3D 地球儀，探索世界各地智慧傳統中真實存在的地方——寺廟、書院、聖地、思想誕生之處。',
    ),
    detail: localized(
      [
        'Atlas of Wisdom is an interactive atlas built around a 3D globe. By default it loads a realistic globe view, which needs an internet connection — an offline-friendly view is available in settings for when you don\'t have one. Explore curated locations across traditions, each with a short, story-like explanation of why it matters, a timeline, and links to related historical figures.',
        'A daily "Discovery of the Day" and a short quiz make it easy to explore a little at a time. Locations are tagged with cross-tradition virtues, so a Confucian academy and a Sufi shrine can both surface under the same idea.',
      ],
      [
        '智慧地圖集是一個以 3D 地球儀為核心的互動地圖。預設會載入較為擬真的地球樣貌，需要網路連線——若沒有網路，可以在設定中切換為離線可用的樣式。探索橫跨不同傳統的精選地點，每個地點都有一段簡短、如說故事般的說明，解釋它為何重要，並附有時間軸與相關歷史人物的連結。',
        '每日的「今日發現」與簡短測驗，讓你可以一次探索一點點。地點會標註跨傳統的美德標籤，因此一座儒家書院與一座蘇非聖地，可能會出現在同一個主題之下。',
      ],
    ),
    goodFor: localized(
      ['A visual way to wander into a tradition you don\'t know yet', 'People who like maps more than lists', 'Learning where an idea actually came from'],
      ['想用視覺化的方式，隨意走進一個還不熟悉的傳統', '比起條列清單，更喜歡地圖的人', '想知道某個思想究竟源自何處'],
    ),
    notFor: localized(
      'Not a course, and not comprehensive — it\'s a curated sample, not an encyclopedia.',
      '這不是課程，也不追求全面——它是精選的樣本，不是百科全書。',
    ),
    tags: localized(['map', 'history', 'offline mode'], ['地圖', '歷史', '離線模式']),
    languages: ['en', 'zh-Hant', 'zh-Hans'],
    installable: true,
    accent: '#b08a3c',
    accentDark: '#d0a95c',
    mark: '🗺️',
    iconSrc: '/app-icons/atlas.png',
    url: 'https://atlas-of-wisdom.vercel.app/',
    repo: 'https://github.com/Charles-Y3/Atlas-of-Wisdom',
    version: '1.0.0',
    status: 'live',
    modes: { reflecting: 2, exploring: 9, reading: 7 },
    timeEstimate: localized('A few minutes of browsing', '隨手瀏覽幾分鐘'),
  },
  {
    id: 'journey',
    order: 2,
    name: localized('Journey to Great Harmony', '大同之路'),
    tagline: localized('A daily 10-minute loop of wisdom, virtue, and reflection', '每日十分鐘的智慧、美德與反思循環'),
    blurb: localized(
      'Eight small modules — a daily practice, a wisdom timeline, a growing shared world — built around one idea: cultivate yourself, then help build a better world.',
      '八個小模組——每日修習、智慧時間軸、逐漸成長的共享世界——都圍繞著同一個想法：先修養自己，再一起打造更好的世界。',
    ),
    detail: localized(
      [
        'The most feature-rich of the six: a daily 10-minute loop (quote, intention, lesson, reflection), an interactive timeline through ten eras of human wisdom, a skill-tree of nine virtues, a personal virtue forest, and a shared world — a village that grows into a town, then a city — that fills in as you practice.',
        'If you opt in, your progress syncs to a small real leaderboard and your traveller can show up to other opted-in users in the shared world; if you don\'t, everything stays local. Either way, the world you see is a mix of real travellers and simulated ones, so it never feels empty even on day one.',
      ],
      [
        '六個作品中功能最豐富的一個：每日十分鐘循環（引言、意圖、課程、反思）、橫跨人類智慧十個時代的互動時間軸、九項美德的技能樹、個人的美德森林，以及會逐漸成長的共享世界——從村莊成長為城鎮、再成長為城市。',
        '如果你選擇加入，你的進度會同步到一個小型的真實排行榜，你的旅人也可能出現在其他已加入使用者的共享世界中；如果不加入，一切都只留存在本地端。無論哪種方式，你所看到的世界都混合了真實旅人與模擬角色，所以即使是第一天也不會顯得空蕩蕩。',
      ],
    ),
    goodFor: localized(
      ['A daily habit, not a one-time read', 'People who like gamified progress', 'Nine virtues, practiced one small step at a time'],
      ['想建立每日習慣，而非只讀一次的人', '喜歡遊戲化進度呈現的人', '想一步一步練習九項美德的人'],
    ),
    notFor: localized(
      'Not a full social network — sharing your progress is opt-in, and much of the "world" you see is still simulated rather than real strangers.',
      '這不是完整的社群網路——分享你的進度是選擇性加入的，而你所看到的「世界」也有不少部分仍是模擬角色，而非真實的陌生人。',
    ),
    tags: localized(['daily practice', 'virtues', 'gamified'], ['每日修習', '美德', '遊戲化']),
    languages: ['en', 'zh-Hant', 'zh-Hans'],
    installable: true,
    accent: '#2e7d5b',
    accentDark: '#4aa77e',
    mark: '🌳',
    iconSrc: '/app-icons/journey.png',
    url: 'https://journey-to-great-harmony.vercel.app/',
    repo: 'https://github.com/Charles-Y3/Journey-To-Great-Harmony-',
    version: '1.4.1',
    status: 'live',
    modes: { reflecting: 8, exploring: 6, reading: 6 },
    timeEstimate: localized('About 10 minutes a day', '每天約十分鐘'),
  },
  {
    id: 'words',
    order: 3,
    name: localized('Words of Sages', '聖賢之言'),
    tagline: localized('Chinese classics, in the original text and in plain language', '中國經典，原文與白話並陳'),
    blurb: localized(
      'The Tao Te Ching, the Heart Sutra, the Great Learning, and more — each chapter given in its original text, a plain-language explanation, and one practical takeaway.',
      '道德經、心經、大學等經典——每一章都附有原文、白話解釋，以及一項可實踐的心得。',
    ),
    detail: localized(
      [
        'A bilingual reader for Taoist, Confucian, and Buddhist classical texts, spanning short works (the Heart Sutra) to long ones (the Diamond Sutra\'s 40 divisions, the Spring and Autumn Annals\' 65 sections). Every unit follows the same shape: original text, a plain explanation, and a practical application.',
        'Read-aloud works in both Chinese and English, with careful attention to correct Chinese pronunciation for characters with multiple readings. You can also write down your own takeaway for any passage and keep it alongside the text.',
      ],
      [
        '一個雙語經典讀本，涵蓋道家、儒家、佛家經典，從短篇（心經）到長篇（金剛經 40 分、春秋 65 節）皆有收錄。每個單元都採用相同結構：原文、白話解釋，以及一項實踐應用。',
        '朗讀功能支援中文與英文雙語，並特別注意中文破音字的正確發音。你也可以為任何一段經文寫下自己的心得，並保留在文字旁。',
      ],
    ),
    goodFor: localized(
      ['Studying a classical text chapter by chapter', 'Reading the original alongside a plain explanation', 'Recording your own takeaways as you read'],
      ['想逐章研讀經典的人', '想對照原文與白話解釋來閱讀的人', '想在閱讀時記下自己的心得'],
    ),
    notFor: localized(
      'Not a summary or a shortcut — it keeps the original text in full, on purpose.',
      '這不是摘要或捷徑——它刻意保留完整的原文。',
    ),
    tags: localized(['classics', 'reading', 'bilingual'], ['經典', '閱讀', '雙語']),
    languages: ['en', 'zh-Hant'],
    installable: false,
    accent: '#a8362a',
    accentDark: '#dd7a6c',
    mark: '📜',
    iconSrc: '/app-icons/words.png',
    url: 'https://words-of-sages.vercel.app/',
    repo: 'https://github.com/Charles-Y3/Words-of-Sages',
    version: '1.0.1',
    status: 'live',
    modes: { reflecting: 3, exploring: 2, reading: 10 },
    timeEstimate: localized('A chapter at a time, at your own pace', '一次一章，按自己的步調'),
  },
  {
    id: 'stories',
    order: 4,
    name: localized('Little Stories, Great Insights', '小故事大啟發'),
    tagline: localized('A card deck of short parables — flip, read, reflect', '短篇寓言卡片組——翻開、閱讀、反思'),
    blurb: localized(
      'Flip a card, read a short parable in English and Traditional Chinese, then write down what it stirs in you. Nothing is scored or graded.',
      '翻開一張卡片，閱讀一則中英雙語的短篇寓言，然後寫下它觸動了你什麼。沒有任何評分或評級。',
    ),
    detail: localized(
      [
        'A small, quiet reading app: a deck of short parables, each one a flip-card with the story on the back. English is a faithful adaptation of the Chinese, not a literal translation — same meaning, same arc, tighter prose.',
        'Story length is a hard, enforced budget, so every parable is genuinely a two-minute read, not a scroll-forever article dressed up as one. After each story, you can write down your own insight or takeaway and keep it with the card.',
      ],
      [
        '一個小巧、安靜的閱讀作品：一組短篇寓言卡片，翻到背面就是故事本文。英文版是中文的忠實改寫，而非逐字翻譯——保留相同的意涵與轉折，但文字更精煉。',
        '故事長度有嚴格的篇幅限制，因此每則寓言都真的只需要兩分鐘閱讀，而不是包裝成卡片、實際上要一直往下滑的長文。讀完後，你可以寫下自己的心得或啟發，並保留在卡片旁。',
      ],
    ),
    goodFor: localized(
      ['A two-minute pause, not a long read', 'Something to read to a child, or with one', 'Writing down a quick takeaway after each story'],
      ['想利用兩分鐘暫停一下，而非長篇閱讀的人', '想讀給孩子聽、或和孩子一起讀的人', '想在讀完後寫下簡短心得的人'],
    ),
    notFor: localized(
      'Not a story library — it\'s a small, deliberately curated deck, not hundreds of stories.',
      '這不是故事資料庫——它是一組刻意精選的小卡片組，而非數百則故事的集合。',
    ),
    tags: localized(['stories', 'bilingual', 'quick read'], ['故事', '雙語', '快速閱讀']),
    languages: ['en', 'zh-Hant'],
    installable: true,
    accent: '#6b8f5a',
    accentDark: '#8fb47c',
    mark: '🍃',
    iconSrc: '/app-icons/stories.png',
    url: 'https://little-stories-great-insights.vercel.app/',
    repo: 'https://github.com/Charles-Y3/Little-Stories-Great-Insights',
    version: '1.0.0',
    status: 'live',
    modes: { reflecting: 5, exploring: 1, reading: 7 },
    timeEstimate: localized('About 2 minutes per story', '每則故事約兩分鐘'),
  },
  {
    id: 'compass',
    order: 5,
    name: localized('The Inner Compass', '內在羅盤'),
    tagline: localized(
      'Life scenes shaped by the five auspicious beasts, read as your bearing',
      '生活場景由五大瑞獸映照——讀出你此刻的內在方位',
    ),
    blurb: localized(
      'Short scenes from everyday life — pick a style among the five auspicious beasts, then how deep that response runs — resolving into a stage of cultivation and a five-element bearing.',
      '日常生活場景——從龍、鳳、麒麟、虎、龜五大瑞獸中選一種風格，再看那回應有多深——最終映照出你的修行階段與五行方位。',
    ),
    detail: localized(
      [
        'The Inner Compass has been rebuilt around short life scenes rather than a straight questionnaire. In each scene you pick a style among the five auspicious beasts — dragon, phoenix, qilin, tiger, turtle — then indicate how deeply that response actually runs for you, not just which one sounds right.',
        'Your answers resolve into two readings: a stage of cultivation, and a five-element bearing drawn from your pattern of choices. You can leave a few honest words alongside your result. Nothing here is ranked — it\'s framed as a mirror to return to after a month or a season, not a score to beat.',
      ],
      [
        '內在羅盤已重新打造為簡短的生活場景，而非直接的問卷。每一幕你會先從龍、鳳、麒麟、虎、龜五大瑞獸中選一種風格，再指出那個回應對你來說究竟有多深——而不只是選一個聽起來對的答案。',
        '你的作答會化為兩項結果：修行階段，以及由你的選擇模式推算出的五行方位。你也可以在結果旁留下幾句真心話。這裡沒有排名——它是一面鏡子，等你過了一個月或一季再回來照一照，而非要努力提高的分數。',
      ],
    ),
    goodFor: localized(
      ['Reflecting through scenarios instead of abstract ratings', 'People drawn to the five auspicious beasts and five-element framing', 'A periodic check-in, not a daily habit'],
      ['想透過情境反思，而非抽象評分的人', '喜歡五大瑞獸、五行這類框架的人', '偶爾想做一次檢視，而非每日習慣的人'],
    ),
    notFor: localized(
      'Not a diagnosis, a ranking, or a fixed identity — your stage and bearing are a snapshot of today, not fate.',
      '這不是診斷、排名，也不是固定的身分標籤——你的階段與方位只是今日的一瞥，而非命運。',
    ),
    tags: localized(['self-assessment', 'reflection', 'five elements'], ['自我評估', '反思', '五行']),
    languages: ['en', 'zh-Hant', 'zh-Hans'],
    installable: true,
    accent: '#5f4b8b',
    accentDark: '#a992e0',
    mark: '🧭',
    iconSrc: '/app-icons/compass.png',
    url: 'https://the-inner-compass-zeta.vercel.app/',
    repo: 'https://github.com/Charles-Y3/the-inner-compass',
    version: '1.0.0',
    status: 'live',
    modes: { reflecting: 10, exploring: 1, reading: 2 },
    timeEstimate: localized('About 15 minutes', '約十五分鐘'),
  },
  {
    id: 'cayce',
    order: 6,
    name: localized('Star-Bearing', '星向'),
    tagline: localized('A quiet look at the direction you\'re living toward', '安靜地看看你正朝哪個方向生活'),
    blurb: localized(
      'Eight short statements, a few honest minutes — not a diagnosis, just a quiet way to see which way you\'re pointed today.',
      '八句簡短的陳述，幾分鐘的誠實面對——這不是診斷，只是一種安靜的方式，看見你今日指向何方。',
    ),
    detail: localized(
      [
        'Star-Bearing is a short, standalone reflection: eight statements about how you\'re actually living, answered in a few minutes on a single page.',
        'Rather than assigning a fixed label, results describe the direction you\'re currently oriented toward — a quiet read on today, not a diagnosis or a ranking to chase.',
      ],
      [
        '星向是一個短小、獨立的反思練習：八句關於你真實生活樣貌的陳述，幾分鐘內即可在單一頁面上完成。',
        '結果不會給你一個固定的標籤，而是描述你此刻正朝哪個方向前進——是對今日的一次安靜映照，而非診斷或需要追逐的排名。',
      ],
    ),
    goodFor: localized(
      ['A quick check-in, under five minutes', 'People who want less scrolling, more clarity', 'A quiet read on where you\'re pointed today'],
      ['想在五分鐘內快速檢視一下的人', '想少滑動、多清楚的人', '想安靜看看自己此刻指向何方的人'],
    ),
    notFor: localized(
      'Not a diagnosis or a ranking — and no longer tied to any particular teacher or tradition.',
      '這不是診斷或排名——也不再依附於任何特定導師或傳統。',
    ),
    tags: localized(['self-assessment', 'quick'], ['自我評估', '快速']),
    languages: ['en', 'zh-Hant', 'zh-Hans'],
    installable: true,
    accent: '#3f5288',
    accentDark: '#8ea6e6',
    mark: '💧',
    iconSrc: '/app-icons/star-bearing.png',
    url: 'https://star-bearing.vercel.app/',
    repo: 'https://github.com/Charles-Y3/Star-Bearing',
    version: '1.0.0',
    status: 'live',
    modes: { reflecting: 7, exploring: 0, reading: 1 },
    timeEstimate: localized('8 questions, about 5 minutes', '八題，約五分鐘'),
  },
];
