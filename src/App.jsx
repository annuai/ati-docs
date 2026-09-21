import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { SectionPage } from './pages/SectionPage.jsx';
import { EntryPage } from './pages/EntryPage.jsx';
import { VocabularyPage } from './pages/VocabularyPage.jsx';
import { SearchPage } from './pages/SearchPage.jsx';
import { StandalonePage } from './pages/StandalonePage.jsx';
import { ContributorsPage } from './pages/ContributorsPage.jsx';
import { MapPage } from './pages/MapPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

/*
  Routing.

  Two generic routes cover every documentation page — `/:sectionId` and `/:sectionId/:slug` — so a
  new entry is reachable the moment it exists in `src/content/`.
*/
export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/open-questions" element={<StandalonePage sectionId="open-questions" />} />
        <Route path="/ati-robotics" element={<StandalonePage sectionId="ati-robotics" />} />
        <Route path="/contributors" element={<ContributorsPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/getting-started" element={<Navigate to="/start" replace />} />
        <Route path="/:sectionId" element={<SectionPage />} />
        <Route path="/:sectionId/:slug" element={<EntryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
