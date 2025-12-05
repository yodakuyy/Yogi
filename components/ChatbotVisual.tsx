
import React from 'react';
import { 
  Search, 
  MessageSquarePlus, 
  LayoutGrid, 
  Bot, 
  Folder, 
  ArrowUpRight, 
  Share2, 
  Wallet,
  CreditCard,
  PieChart,
  User,
  MoreHorizontal,
  Plus,
  Sparkles
} from 'lucide-react';

export const ChatbotVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#E0EAFF] via-[#E8F0FE] to-[#F3E8FF] p-6 flex font-sans text-gray-800 relative overflow-hidden">
      
      {/* Abstract Background Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40"></div>

      {/* Main Container Mockup */}
      <div className="w-full h-full bg-white/60 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/50 flex overflow-hidden relative">
        
        {/* Left Sidebar */}
        <div className="w-64 bg-white/40 border-r border-white/40 flex flex-col p-6 z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 text-[#1e1b4b]">
             <div className="w-8 h-8 bg-[#4F46E5] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm flex items-center justify-center text-white">
                <Sparkles size={18} fill="currentColor" />
             </div>
             <span className="font-bold text-xl tracking-wide">ZAY-G</span>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search" 
               className="w-full bg-white/60 border border-white/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none text-gray-600 placeholder-gray-400"
               readOnly
            />
          </div>

          {/* Menu */}
          <div className="space-y-1 mb-8">
             <MenuItem icon={<MessageSquarePlus size={18}/>} label="New Chat" />
             <MenuItem icon={<LayoutGrid size={18}/>} label="Library" />
             <MenuItem icon={<Bot size={18}/>} label="My Gee's" active />
             <MenuItem icon={<Folder size={18}/>} label="Projects" />
          </div>

          {/* History */}
          <div className="flex-1 overflow-hidden">
             <div className="flex justify-between items-center mb-3">
               <span className="text-xs font-bold text-gray-500 uppercase">Chat History</span>
               <ArrowUpRight size={12} className="text-gray-400" />
             </div>
             <div className="space-y-3">
               <HistoryItem label="Fitness plan with Trainer" />
               <HistoryItem label="Star or pin icon to mark new" />
               <HistoryItem label="Favorite horoscope readings" />
               <HistoryItem label="Random input clarification" />
             </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col relative">
           
           {/* Top Bar */}
           <div className="h-16 flex items-center justify-between px-8 border-b border-white/30">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                 <Sparkles size={16} className="text-[#4F46E5]" />
                 <span>ZAY-G</span>
                 <MoreHorizontal size={14} className="text-gray-400" />
              </div>
              <button className="flex items-center gap-2 bg-white/50 hover:bg-white/80 px-4 py-2 rounded-full text-xs font-bold text-gray-600 transition-colors shadow-sm">
                 <Share2 size={14} /> Share
              </button>
           </div>

           {/* Center Canvas */}
           <div className="flex-1 flex flex-col items-center justify-start pt-20 p-10">
              
              <h2 className="text-3xl font-bold text-gray-800 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">How can I help you today?</h2>

              {/* Input Mockup */}
              <div className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-white/60 mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                  <div className="flex items-center px-4 py-2 text-gray-400 text-sm">
                     <Plus size={18} className="mr-3 text-gray-500" />
                     <span>Chat here..</span>
                  </div>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                 <Chip icon={<Wallet size={14}/>} label="Finance & Budget" />
                 <Chip icon={<CreditCard size={14}/>} label="Payment" />
                 <Chip icon={<PieChart size={14}/>} label="Track your expense" />
                 <Chip icon={<User size={14}/>} label="Account" />
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

const MenuItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm font-medium ${active ? 'bg-[#E0E7FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-white/60'}`}>
     {icon}
     <span>{label}</span>
  </div>
);

const HistoryItem: React.FC<{ label: string }> = ({ label }) => (
   <div className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-800 cursor-pointer px-1 py-1 transition-colors">
      <ArrowUpRight size={10} />
      <span className="truncate">{label}</span>
   </div>
);

const Chip: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
   <div className="flex items-center gap-2 px-3 py-1.5 bg-white/40 border border-white/60 rounded-lg text-xs font-medium text-gray-600 hover:bg-white/80 cursor-pointer transition-colors shadow-sm">
      <span className="text-[#4F46E5]">{icon}</span>
      <span>{label}</span>
   </div>
);
