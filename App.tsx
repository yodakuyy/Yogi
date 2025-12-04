import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { ShowcasePanel } from './components/ShowcasePanel';
import { ServiceSelection } from './components/ServiceSelection';
import { Dashboard } from './components/Dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'services' | 'dashboard'>('login');

  const handleLoginSuccess = () => {
    setView('services');
  };

  const handleServiceSelect = (service: string) => {
    if (service === 'DIT') {
      setView('dashboard');
    } else {
      console.log(`Selected service: ${service}`);
      alert(`You have selected: ${service}. Dashboard for this service is under construction.`);
    }
  };

  if (view === 'dashboard') {
    return (
      <Dashboard 
        onLogout={() => setView('login')} 
        onChangeDepartment={() => setView('services')} 
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden">
      {/* Left Side - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 overflow-y-auto relative transition-all duration-500">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
           {view === 'login' ? (
             <LoginForm onLoginSuccess={handleLoginSuccess} />
           ) : (
             <ServiceSelection onSelect={handleServiceSelect} />
           )}
        </div>
      </div>

      {/* Right Side - Visuals */}
      <div className="hidden lg:flex w-1/2 bg-[#3b2cb8] relative items-center justify-center overflow-hidden">
        <ShowcasePanel />
      </div>
    </div>
  );
};

export default App;