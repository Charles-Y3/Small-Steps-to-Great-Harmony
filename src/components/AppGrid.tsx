import { useState } from 'react';
import { APPS } from '../data/apps';
import { AppCard } from './AppCard';
import { FilterBar, isStrongIn, type ModeFilter } from './FilterBar';
import { useT } from '../i18n/useT';

interface AppGridProps {
  visited: Record<string, number>;
  onVisit: (id: string) => void;
}

export function AppGrid({ visited, onVisit }: AppGridProps) {
  const { t } = useT();
  const [filter, setFilter] = useState<ModeFilter>('all');
  const sorted = [...APPS].sort((a, b) => a.order - b.order).filter((app) => isStrongIn(app.modes, filter));

  return (
    <section id="apps" className="section">
      <h2 className="sectionTitle">{t('section_apps_title')}</h2>
      <FilterBar active={filter} onChange={setFilter} />
      <div className="appGrid">
        {sorted.map((app) => (
          <AppCard
            key={app.id}
            app={app}
            visited={Boolean(visited[app.id])}
            onVisit={onVisit}
          />
        ))}
      </div>
    </section>
  );
}
