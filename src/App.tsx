import { useState } from 'react';
import { SettingsProvider } from './state/SettingsContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AppGrid } from './components/AppGrid';
import { AppDetail } from './components/AppDetail';
import { Footer } from './components/Footer';
import { UpdatePrompt } from './components/UpdatePrompt';
import { APPS } from './data/apps';
import { useT } from './i18n/useT';
import { readVisited } from './utils/visited';

function AboutSection() {
  const { t } = useT();
  return (
    <section id="about" className="section">
      <h2 className="sectionTitle">{t('section_about_title')}</h2>
      <p className="aboutBody">{t('section_about_body')}</p>
    </section>
  );
}

function Page() {
  const [visited, setVisited] = useState(() => readVisited());
  const sorted = [...APPS].sort((a, b) => a.order - b.order);

  function handleVisit(id: string) {
    setVisited((v) => ({ ...v, [id]: Date.now() }));
  }

  function handleClear() {
    setVisited({});
  }

  return (
    <>
      <Header />
      <Hero />
      <AppGrid visited={visited} onVisit={handleVisit} />
      <AboutSection />
      {sorted.map((app) => (
        <AppDetail key={app.id} app={app} onVisit={handleVisit} />
      ))}
      <Footer visited={visited} onClear={handleClear} />
      <UpdatePrompt />
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Page />
    </SettingsProvider>
  );
}
