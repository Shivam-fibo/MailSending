import React, { useState } from 'react';
import SidePanel from './SidePanel';
import MailForm from './MailSending';
import History from './History';
import Upgrade from './upgrade/Upgrade';
const Layout = () => {
  const [selectedPage, setSelectedPage] = useState('mail');

  const renderPage = () => {
    switch (selectedPage) {
      case 'mail':
        return <MailForm />;
        
    case 'history':
        return <History/>;

      case 'upgrade': 
        return <Upgrade/>;
      default:
        return <div>Select a form from the panel</div>;
    }

  };

  return (
    <div className="flex min-h-screen">
      <SidePanel onSelect={setSelectedPage} />
      <div className="flex-1 p-6 bg-gray-100">{renderPage()}</div>
    </div>
  );
};

export default Layout;
