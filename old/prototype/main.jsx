import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { AppShell } from './components/AppShell';
import { LiveFleetStatus } from './components/LiveFleetStatus';

const navigation = [
  { label: 'Dashboard', icon: '⌂' },
  { label: 'Live Status', icon: '⌖', active: true, section: 'Monitor your fleet' },
  { label: 'Analytics', icon: '⌁' },
  { label: 'AMR Trips', icon: '⌁', section: 'Operations' },
  { label: 'Staging Area', icon: '▦' },
  { label: 'WIP Inventory', icon: '◌' }
];

const secondaryNavigation = [
  { label: 'Notifications', icon: '♧' },
  { label: 'Settings', icon: '⚙' },
  { label: 'Profile', icon: '◎' }
];

const robots = [
  { id: 'TRP-20487', status: 'Moving', battery: 72, station: 'Station S102', color: 'yellow' },
  { id: 'TRP-20486', status: 'Moving', battery: 81, station: 'Station S104', color: 'yellow' },
  { id: 'TRP-20491', status: 'Blocked', battery: 34, station: 'Station S101', color: 'red' },
  { id: 'TRP-20399', status: 'Moving', battery: 65, station: 'Station S104', color: 'yellow' }
];

function App() {
  const [selectedRobotId, setSelectedRobotId] = useState(robots[0].id);
  const [paused, setPaused] = useState(false);
  const [activeNav, setActiveNav] = useState('Live Status');
  const selectedRobot = useMemo(() => robots.find(r => r.id === selectedRobotId) ?? robots[0], [selectedRobotId]);

  return (
    <AppShell
      logo="/assets/Ati-Flow-Logo.svg"
      navigation={navigation}
      secondaryNavigation={secondaryNavigation}
      activeNav={activeNav}
      onNavigate={setActiveNav}
    >
      <LiveFleetStatus
        robots={robots}
        selectedRobot={selectedRobot}
        onSelectRobot={setSelectedRobotId}
        paused={paused}
        onPause={() => setPaused(v => !v)}
      />
    </AppShell>
  );
}

createRoot(document.getElementById('root')).render(<App />);
