import type { SuiteApp } from '../data/types';
import { useT } from '../i18n/useT';
import { markVisited } from '../utils/visited';
import { ModeRadar } from './ModeRadar';
import { CommentBox } from './CommentBox';

const LANGUAGE_LABEL: Record<string, string> = { en: 'EN', 'zh-Hant': '繁', 'zh-Hans': '简' };

export function AppDetail({ app, onVisit }: { app: SuiteApp; onVisit: (id: string) => void }) {
  const { t, L } = useT();
  const style = { '--app-accent': app.accent } as React.CSSProperties;

  return (
    <section id={app.id} className="detailSection" style={style}>
      <div className="detailHeading">
        <span className="detailMark">
          {app.iconSrc ? <img src={app.iconSrc} alt="" width={40} height={40} className="detailIcon" /> : app.mark}
        </span>
        <div>
          <h3 className="detailName">{L(app.name)}</h3>
        </div>
      </div>

      {L(app.detail).map((para, i) => (
        <p key={i} className="detailParagraph">{para}</p>
      ))}

      <div className="detailModeChart">
        <p className="detailModeChartLabel">{t('detail_modeChart')}</p>
        <ModeRadar modes={app.modes} color={app.accent} />
        <p className="detailTimeEstimate">{L(app.timeEstimate)}</p>
      </div>

      <div className="detailGoodFor">
        <strong>{t('detail_goodFor')}</strong>
        <ul className="detailGoodForList">
          {L(app.goodFor).map((g, i) => <li key={i}>{g}</li>)}
        </ul>
      </div>

      <p className="detailNotFor">{t('detail_notThis')}: {L(app.notFor)}</p>

      <div className="detailMeta">
        <span>{t('detail_languages')}: {app.languages.map((l) => LANGUAGE_LABEL[l]).join(' / ')}</span>
        {app.installable && <span>{t('detail_installable')}</span>}
      </div>

      <div className="detailActions">
        {app.status === 'live' ? (
          <a
            className="detailLink detailLinkPrimary"
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { markVisited(app.id); onVisit(app.id); }}
          >
            {t('detail_visit')}
          </a>
        ) : (
          <span className="detailLink detailLinkPrimary" style={{ opacity: 0.6 }}>{t('card_comingSoon')}</span>
        )}
      </div>

      <CommentBox appId={app.id} />
    </section>
  );
}
