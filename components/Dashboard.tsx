
import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Ticket, 
  Package, 
  BookOpen, 
  Settings, 
  Plus, 
  Search, 
  ChevronDown, 
  MoreVertical,
  Umbrella,
  Star,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { IncidentList } from './IncidentList';

const inventoryData = [
  { name: 'Desktops', count: 60 },
  { name: 'Laptops', count: 18 },
  { name: 'Tablets', count: 35 },
];

const COLORS = ['#4338CA', '#FDE047', '#4338CA'];

export const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'incidents'>('dashboard');

  return (
    <div className="min-h-screen bg-[#F3F4F8] flex font-sans text-gray-800 relative">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center space-x-3 mb-4">
          <div className="text-indigo-600">
            <Umbrella size={28} fill="currentColor" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-800 leading-tight">Modena</h1>
            <p className="text-xs text-gray-400">Servicedesk</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem 
            icon={<LayoutGrid size={18} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
          />
          <NavItem 
            icon={<Ticket size={18} />} 
            label="Incident" 
            badge="39" 
            active={currentView === 'incidents'}
            onClick={() => setCurrentView('incidents')}
          />
          <NavItem icon={<Package size={18} />} label="Service Request" />
          <NavItem icon={<BookOpen size={18} />} label="Knowledge Base" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>

        {/* Removed Create Incident Button from Sidebar as requested */}
        <div className="mt-auto"></div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <img src="https://i.pravatar.cc/150?u=mary" alt="Profile" className="w-10 h-10 rounded-full border border-gray-200" />
             <div>
               <p className="text-sm font-bold text-gray-800">Mary Wells.45</p>
             </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        {currentView === 'dashboard' ? (
          <DashboardContent />
        ) : (
          <IncidentList />
        )}
      </main>

      {/* Chatbot Floating Button */}
      <button 
        className="fixed bottom-8 right-8 bg-[#4F46E5] hover:bg-[#4338CA] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center group"
        aria-label="Open Chatbot"
      >
        <MessageCircle size={28} className="fill-current" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat Support
        </span>
      </button>

    </div>
  );
};

const DashboardContent: React.FC = () => {
  return (
    <>
      {/* Top Header Area */}
      <div className="flex justify-between items-center mb-8">
        {/* Kudos Ticker */}
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2 text-xs text-gray-500 overflow-hidden max-w-2xl whitespace-nowrap">
          <span className="font-bold text-gray-700 flex items-center gap-1">Kudos <Star size={12} className="text-purple-500" /></span>
          <span className="opacity-60">|</span>
          <span className="truncate">"Nice & helpful! Thank you! - Martha Stephens"</span>
          <Star size={10} className="text-purple-400" />
          <span className="truncate">"Thanks for taking care of that so quickly! - Coworker"</span>
          <Star size={10} className="text-purple-400" />
          <span className="truncate">"You're amazing!"</span>
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-sm"
          />
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* My Incidents (Left Top) */}
        <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start mb-6">
              <div>
                 <h2 className="text-lg font-bold text-gray-800">My Incidents</h2>
                 <div className="flex gap-4 mt-1 text-sm">
                    <span className="font-semibold text-gray-800">8 <span className="text-gray-400 font-normal">Current</span></span>
                    <span className="font-semibold text-gray-800">5 <span className="text-gray-400 font-normal">Closed</span></span>
                 </div>
              </div>
              <button className="flex items-center space-x-1 text-xs text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 bg-gray-50">
                <span>View All Incidents</span>
                <ChevronDown size={12} />
              </button>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead>
                 <tr className="text-gray-400 font-medium border-b border-gray-50">
                   <th className="pb-3 font-normal">Number</th>
                   <th className="pb-3 font-normal">Date</th>
                   <th className="pb-3 font-normal">Subject</th>
                   <th className="pb-3 font-normal">User</th>
                   <th className="pb-3 font-normal">Status</th>
                   <th className="pb-3 font-normal">Last Update</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 <TicketRow 
                   id="INC4568" date="04/12/23" time="08:24AM" 
                   subject="Error when starting Microsoft Word" 
                   user="Marso.27" status="WIP" statusColor="text-gray-500"
                   update="23min" updateColor="bg-green-100 text-green-600"
                 />
                 <TicketRow 
                   id="RITM4321" date="04/11/23" time="10:07AM" 
                   subject="Assistance moving desktop computer" 
                   user="Deppert.5" status="Assigned" statusColor="text-gray-500"
                   update="1hr" updateColor="bg-green-100 text-green-600"
                 />
                 <TicketRow 
                   id="RITM4268" date="04/10/23" time="02:34PM" 
                   subject="I'd like to order a new webcam" 
                   user="Miller.409" status="Pending" statusColor="text-gray-500"
                   update="2 days" updateColor="bg-red-100 text-red-600"
                 />
                 <TicketRow 
                   id="RITM4599" date="04/10/23" time="09:15AM" 
                   subject="Need access to shared drive" 
                   user="Smith.839" status="WIP" statusColor="text-gray-500"
                   update="4min" updateColor="bg-green-100 text-green-600"
                 />
                 <TicketRow 
                   id="INC4567" date="04/08/23" time="-" 
                   subject="Can't sign into app" 
                   user="Shulz.45" status="Pending" statusColor="text-gray-500"
                   update="1 day" updateColor="bg-yellow-100 text-yellow-600"
                 />
               </tbody>
             </table>
           </div>
        </div>

        {/* Unassigned Incidents (Right Top) */}
        <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                 <h2 className="text-lg font-bold text-gray-800">Unassigned Incidents</h2>
                 <span className="bg-[#4F46E5] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">4</span>
              </div>
              <button className="flex items-center space-x-1 text-xs text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 bg-gray-50">
                <span>View Team Workload</span>
                <ChevronDown size={12} />
              </button>
           </div>

           <div className="space-y-4">
              <UnassignedRow id="RITM4579" date="04/12/23" time="10:40PM" subject="Need assistance with powerpoint" user="Lynn.2" />
              <UnassignedRow id="RITM4344" date="04/12/23" time="10:17AM" subject="Requesting info about new app" user="Mackay.43" />
              <UnassignedRow 
                id="INC4298" date="04/12/23" time="08:34PM" subject="Keyboard not responding" user="Wilson.25" 
                assignedTo="Levinson.2" 
              />
              <UnassignedRow id="RITM4601" date="04/11/23" time="07:37AM" subject="Financial app access needed" user="Fry.36" />
           </div>
        </div>

        {/* My Tasks (Bottom Left) */}
        <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-lg font-bold text-gray-800 mb-6">My Tasks</h2>
           
           <div className="w-full">
             <div className="flex text-xs text-gray-400 font-medium mb-3 px-2">
               <span className="flex-1">Number / Date</span>
               <span className="flex-[2]">Subject</span>
               <span className="w-16 text-right">Status</span>
             </div>
             <div className="space-y-1">
               <TaskRow id="TASK3596" date="04/12/23" time="08:24AM" subject="Install software in Computer Lab 23" status="In Progress" />
               <TaskRow id="TASK3575" date="04/11/23" time="10:07AM" subject="Image recent computer order" status="Assigned" isGray />
               <TaskRow id="TASK3571" date="04/10/23" time="02:34PM" subject="Order more webcams" status="In Progress" />
               <TaskRow id="TASK3436" date="04/10/23" time="01:02PM" subject="Perform a stock audit" status="Assigned" isGray />
             </div>
           </div>
        </div>

        {/* Today's Appointments (Bottom Middle) */}
        <div className="col-span-12 lg:col-span-3 bg-[#E0E7FF] p-6 rounded-2xl relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6 z-10">
             <h2 className="text-lg font-bold text-gray-800 leading-tight">Today's<br/>Appointments</h2>
             <button className="bg-[#4F46E5] text-white p-2 rounded-lg hover:bg-indigo-700 shadow-md">
               <Plus size={20} />
             </button>
          </div>
          
          <div className="flex-1 space-y-4 z-10">
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">8</span>
               <div className="bg-white/60 w-full p-2.5 rounded-lg text-gray-700 shadow-sm border border-white/40 backdrop-blur-sm">
                 8:30 - 9:30 AM - Team Meeting
               </div>
             </div>
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">9</span>
             </div>
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">10</span>
               <div className="bg-white/80 w-full p-2.5 rounded-lg text-gray-700 shadow-sm border border-white/50">
                 10 - 10:30 AM - INC4567 Call
               </div>
             </div>
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">11</span>
             </div>
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">12</span>
               <div className="bg-white/60 w-full p-2.5 rounded-lg text-gray-700 shadow-sm border border-white/40 backdrop-blur-sm">
                 12 - 1PM - Lunch Break
               </div>
             </div>
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">1</span>
             </div>
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">2</span>
             </div>
             <div className="flex text-xs text-gray-500 font-medium items-center">
               <span className="w-4 mr-2">3</span>
             </div>
          </div>
        </div>

        {/* Service Request Management (Bottom Right) */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
           <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800">Service Request</h2>
              <p className="text-xs text-gray-400 mt-1">Current Stock:</p>
           </div>

           <div className="flex-1 w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 10, fill: '#9CA3AF'}} 
                    dy={10}
                  />
                  <YAxis 
                    hide={false} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{fontSize: 10, fill: '#9CA3AF'}}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={30}>
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>

           <div className="mt-4 text-center">
             <p className="text-xs text-gray-500 font-medium mb-3">Last Stock Audit: <span className="text-gray-900 font-bold">03/17/23</span></p>
             <button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2.5 rounded-lg text-sm font-semibold shadow-md transition-colors">
               Perform Audit
             </button>
           </div>
        </div>

      </div>
    </>
  );
};

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  badge?: string;
  onClick?: () => void;
}> = ({ icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#E0E7FF] text-[#4F46E5]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge && (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-[#4F46E5] text-white' : 'bg-[#4F46E5] text-white'}`}>
        {badge}
      </span>
    )}
  </button>
);

const TicketRow: React.FC<{ id: string; date: string; time: string; subject: string; user: string; status: string; statusColor: string; update: string; updateColor: string }> = ({ id, date, time, subject, user, status, statusColor, update, updateColor }) => (
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="py-3 pr-2 text-gray-500 text-xs font-medium">{id}</td>
    <td className="py-3 pr-2">
      <div className="text-gray-900 font-semibold text-xs">{date}</div>
      <div className="text-gray-400 text-[10px]">{time}</div>
    </td>
    <td className="py-3 pr-2 text-gray-800 text-xs font-medium max-w-[140px] truncate" title={subject}>{subject}</td>
    <td className="py-3 pr-2 text-gray-500 text-xs">{user}</td>
    <td className={`py-3 pr-2 text-xs font-medium ${statusColor}`}>{status}</td>
    <td className="py-3">
      <span className={`px-2 py-1 rounded text-[10px] font-bold ${updateColor}`}>{update}</span>
    </td>
  </tr>
);

const UnassignedRow: React.FC<{ id: string; date: string; time: string; subject: string; user: string; assignedTo?: string }> = ({ id, date, time, subject, user, assignedTo }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 p-2 rounded-lg transition-colors">
    <div className="flex-1 min-w-0 mr-4">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-gray-400 text-xs font-medium">{id}</span>
        <span className="text-gray-300 text-[10px]">{date}</span>
        <span className="text-gray-300 text-[10px]">{time}</span>
      </div>
      <h3 className="text-gray-800 text-xs font-medium truncate mb-1" title={subject}>{subject}</h3>
    </div>
    <div className="text-right flex flex-col items-end gap-2">
      <span className="text-gray-500 text-xs block">{user}</span>
      {assignedTo ? (
         <button className="bg-[#3b2cb8] hover:bg-[#302395] text-white text-[10px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
            <img src="https://i.pravatar.cc/150?u=levinson" className="w-3.5 h-3.5 rounded-full" alt="" />
            {assignedTo} <ChevronRight size={10} />
         </button>
      ) : (
        <button className="border border-gray-200 hover:border-gray-300 text-gray-500 text-[10px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1 bg-white">
           Select Technician <ChevronDown size={10} />
        </button>
      )}
    </div>
  </div>
);

const TaskRow: React.FC<{ id: string; date: string; time: string; subject: string; status: string; isGray?: boolean }> = ({ id, date, time, subject, status, isGray }) => (
  <div className={`flex items-center p-2 rounded-lg ${isGray ? 'bg-gray-50' : 'bg-white'}`}>
    <div className="mr-3">
       <div className="w-4 h-4 rounded-full border-2 border-indigo-400 hover:bg-indigo-50 cursor-pointer"></div>
    </div>
    <div className="flex-1 min-w-0 mr-2">
        <div className="flex items-baseline gap-2">
           <span className="text-gray-400 text-[10px] font-medium uppercase">{id}</span>
        </div>
        <div className="flex items-baseline gap-1 text-[10px] text-gray-400">
           <span>{date}</span>
           <span>{time}</span>
        </div>
        <div className="text-gray-800 text-xs font-medium truncate mt-0.5" title={subject}>{subject}</div>
    </div>
    <div className="text-right">
       <span className="text-gray-500 text-[10px]">{status}</span>
    </div>
  </div>
);
