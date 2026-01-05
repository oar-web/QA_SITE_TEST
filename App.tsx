
import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Layout from './components/Layout.tsx';
import Dashboard from './components/Dashboard.tsx';
import IssueList from './components/IssueList.tsx';
import ReleaseList from './components/ReleaseList.tsx';
import DocumentLibrary from './components/DocumentLibrary.tsx';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'issues':
        return <IssueList />;
      case 'releases':
        return <ReleaseList />;
      case 'documents':
        return <DocumentLibrary />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <Layout>
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
