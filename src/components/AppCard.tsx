import type { SuiteApp } from '../data/types';
import { useT } from '../i18n/useT';
import { markVisited } from '../utils/visited';
import { ModeRadar } from './ModeRadar';

interface AppCardProps {
  app: SuiteApp;
  visited: boolean;
  onVisit: (id: string) => void;
  dimmed?: boolean;
}

export function AppCard({ app, visited, onVisit, dimmed = false }: AppCardProps) {
  const { t, L } = useT();
  // Always the light-theme accent value, even in dark mode: these six
  // colors are all mid-to-dark toned and were chosen to hold up against
  // white button text; the lighter `accentDark` values are tuned for use
  // as *text* on a dark surface (as the sibling apps use them), not as a
  // filled button background.
  const style = { '--app-accent': app.accent } as React.CSSProperties;

  return (
    <div
      className={`appCard ${app.status === 'coming-soon' ? 'appCardComingSoon' : ''} ${dimmed ? 'appCardDimmed' : ''}`}
      style={style}
    >
      {visited && <span className="appCardVisitedTick" title={t('card_visited')}>✓</span>}
      <div className="appCardTopRow">
        <div className="appCardMark">
          {app.iconSrc ? <img src={app.iconSrc} alt="" width={40} height={40} className="appCardIcon" /> : app.mark}
        </div>
        <div className="appCardRadar">
          <ModeRadar modes={app.modes} color={app.accent} size={130} showLabels />
        </div>
      </div>
      <h3 className="appCardName">{L(app.name)}</h3>
      <p className="appCardTagline">{L(app.tagline)}</p>
      <div className="appCardTags">
        {L(app.tags).map((tag) => (
          <span key={tag} className="appCardTag">{tag}</span>
        ))}
      </div>
      <div className="appCardActions">
        {app.status === 'live' ? (
          <a
            className="appCardVisit"
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { markVisited(app.id); onVisit(app.id); }}
          >
            {t('card_visit')}
          </a>
        ) : (
          <span className="appCardVisit appCardVisitDisabled">{t('card_comingSoon')}</span>
        )}
        <a className="appCardReadMore" href={`#${app.id}`}>{t('card_readMore')}</a>
      </div>
    </div>
  );
}
