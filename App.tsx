
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import IssueList from './components/IssueList';
import ReleaseList from './components/ReleaseList';
import DocumentLibrary from './components/DocumentLibrary';

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
