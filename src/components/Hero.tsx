import { useT } from '../i18n/useT';

export function Hero() {
  const { t } = useT();
  return (
    <section className="hero">
      <h1 className="heroTitle">{t('hero_title')}</h1>
      <p className="heroBody">{t('hero_body1')}</p>
      <p className="heroBody">{t('hero_body2')}</p>
      <div className="heroFacts">
        <span className="factChip">{t('hero_fact_apps')}</span>
        <span className="factChip">{t('hero_fact_free')}</span>
        <span className="factChip">{t('hero_fact_account')}</span>
      </div>
      <a className="heroCta" href="#apps">{t('hero_cta')}</a>
    </section>
  );
}
