import { useT } from '../i18n/useT';
import { clearVisited } from '../utils/visited';
import pkg from '../../package.json';

interface FooterProps {
  visited: Record<string, number>;
  onClear: () => void;
}

export function Footer({ visited, onClear }: FooterProps) {
  const { t } = useT();
  const count = Object.keys(visited).length;

  function handleClear() {
    clearVisited();
    onClear();
  }

  return (
    <footer className="footer">
      <p className="visitedNote">
        {count === 0 ? t('visited_none') : t('visited_some', { count })}
        {count > 0 && (
          <button className="visitedClear" onClick={handleClear}>{t('visited_clear')}</button>
        )}
      </p>
      <p>{t('footer_privacy')}</p>
      <p className="footerVersion">{t('footer_version', { version: pkg.version })}</p>
    </footer>
  );
}
