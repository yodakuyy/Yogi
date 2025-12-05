
import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { ServiceSelection } from './components/ServiceSelection';
import { Dashboard } from './components/Dashboard';
import { ChatbotVisual } from './components/ChatbotVisual';

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
      <div className={`hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden ${view === 'login' ? 'bg-gray-900' : 'bg-[#F0F4FF]'}`}>
        {view === 'login' ? (
          /* Login View Visual: Modena Office */
          <>
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
              alt="Office Background" 
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
            
            <div className="relative z-10 text-center p-8 animate-in fade-in duration-1000">
              <h1 className="text-5xl font-bold text-white tracking-tight mb-2">
                MODENA <span className="font-light">Servicedesk</span>
              </h1>
            </div>
          </>
        ) : (
          /* Services View Visual: Zay-G Chatbot Interface */
          <div className="w-full h-full animate-in fade-in duration-500">
            <ChatbotVisual />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
