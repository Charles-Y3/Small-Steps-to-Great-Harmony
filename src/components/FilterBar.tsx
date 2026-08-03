import { useT } from '../i18n/useT';
import type { AppModeScores } from '../data/types';

export type ModeFilter = 'all' | keyof AppModeScores;

const FILTERS: { key: ModeFilter; labelKey: 'filter_all' | 'filter_reflecting' | 'filter_exploring' | 'filter_reading' }[] = [
  { key: 'all', labelKey: 'filter_all' },
  { key: 'reflecting', labelKey: 'filter_reflecting' },
  { key: 'exploring', labelKey: 'filter_exploring' },
  { key: 'reading', labelKey: 'filter_reading' },
];

interface FilterBarProps {
  active: ModeFilter;
  onChange: (filter: ModeFilter) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const { t } = useT();
  return (
    <div>
      <div className="filterRow" role="group" aria-label={t('filter_all')}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filterChip ${active === f.key ? 'filterChipActive' : ''}`}
            onClick={() => onChange(f.key)}
          >
            {t(f.labelKey)}
          </button>
        ))}
      </div>
      <p className="filterHint">{t('filter_hint')}</p>
    </div>
  );
}

/** An app is "strong" in a mode if it scores more than 3 of its 10 points
 * there — a score of exactly 3 (e.g. Words of Sages' reflecting score)
 * shouldn't count as a "Reflecting" app. */
export function isStrongIn(modes: AppModeScores, filter: ModeFilter): boolean {
  if (filter === 'all') return true;
  return modes[filter] > 3;
}
