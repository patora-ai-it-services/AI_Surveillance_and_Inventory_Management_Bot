import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { DemoBanner } from './components/common/DemoBanner';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { CameraMonitoringPage } from './components/cameras/CameraMonitoringPage';
import { PeopleAnalyticsPage } from './components/analytics/PeopleAnalyticsPage';
import { VisionInventoryPage } from './components/inventory/VisionInventoryPage';
import { AlertsReportsPage } from './components/alerts/AlertsReportsPage';
import { CameraModal } from './components/cameras/CameraModal';

const AppContent: React.FC = () => {
  const { activeTab, selectedCameraForModal, setSelectedCameraForModal } = useDemo();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'overview':
        return <OverviewDashboard />;
      case 'cameras':
        return <CameraMonitoringPage />;
      case 'analytics':
        return <PeopleAnalyticsPage />;
      case 'inventory':
        return <VisionInventoryPage />;
      case 'alerts':
        return <AlertsReportsPage />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Persistent Enterprise Demo Safeguards Banner */}
      <DemoBanner />

      <div className="app-container">
        {/* Responsive Branded Sidebar */}
        <Sidebar />

        {/* Main Content Workspace */}
        <div className="main-content">
          <Header />
          <main style={{ flex: 1 }}>
            {renderActivePage()}
          </main>
        </div>
      </div>

      {/* Global Camera Stream Inspector Modal */}
      {selectedCameraForModal && (
        <CameraModal
          camera={selectedCameraForModal}
          onClose={() => setSelectedCameraForModal(null)}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <AppContent />
    </DemoProvider>
  );
};

export default App;
