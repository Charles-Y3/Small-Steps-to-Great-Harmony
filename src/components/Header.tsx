import { useSettings } from '../state/SettingsContext';
import { useT } from '../i18n/useT';
import type { Locale } from '../i18n/types';
import { useInstallPrompt } from '../utils/useInstallPrompt';

const LOCALES: { locale: Locale; key: 'nav_lang_en' | 'nav_lang_zhHant' | 'nav_lang_zhHans' }[] = [
  { locale: 'en', key: 'nav_lang_en' },
  { locale: 'zh-Hant', key: 'nav_lang_zhHant' },
  { locale: 'zh-Hans', key: 'nav_lang_zhHans' },
];

export function Header() {
  const { locale, theme, setLocale, setTheme } = useSettings();
  const { t } = useT();
  const { canInstall, promptInstall } = useInstallPrompt();

  return (
    <header className="header">
      <div className="headerBrand">
        <img className="headerLogo" src="/icons/icon192.png" alt="" width={32} height={32} />
        <span className="headerTitle">{t('siteName')}</span>
      </div>
      <div className="headerControls">
        {canInstall && (
          <button className="chip installChip" onClick={promptInstall}>
            {t('nav_install')}
          </button>
        )}
        <div className="chipRow" role="group" aria-label={t('nav_theme')}>
          {LOCALES.map((l) => (
            <button
              key={l.locale}
              className={`chip ${locale === l.locale ? 'chipActive' : ''}`}
              onClick={() => setLocale(l.locale)}
            >
              {t(l.key)}
            </button>
          ))}
        </div>
        <div className="chipRow" role="group" aria-label={t('nav_theme')}>
          <button className={`chip ${theme === 'light' ? 'chipActive' : ''}`} onClick={() => setTheme('light')}>☀</button>
          <button className={`chip ${theme === 'dark' ? 'chipActive' : ''}`} onClick={() => setTheme('dark')}>☾</button>
        </div>
      </div>
    </header>
  );
}
