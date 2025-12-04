
import React from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  List, 
  PanelLeft, 
  ChevronLeft, 
  ChevronDown, 
  ChevronRight,
  MoreHorizontal, 
  Paperclip, 
  Smile, 
  Send,
  ExternalLink,
  Edit2,
  Info,
  BookOpen,
  MessageCircle,
  Plus
} from 'lucide-react';

const tickets = [
  { id: 'Case-1', status: 'OPEN', requester: 'John Doe', requesterImg: 'https://i.pravatar.cc/150?u=john', active: true },
  { id: 'Case-2', status: 'OPEN', requester: 'Jane Walker', requesterImg: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'Case-3', status: 'CLOSED', requester: 'Evelyn Milton', requesterImg: 'https://i.pravatar.cc/150?u=evelyn' },
  { id: 'Case-4', status: 'OPEN', requester: 'Sam Nelson', requesterImg: 'https://i.pravatar.cc/150?u=sam' },
  { id: 'Case-5', status: 'OPEN', requester: 'Jane Walker', requesterImg: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'Case-6', status: 'CLOSED', requester: 'Emily Davis', requesterImg: 'https://i.pravatar.cc/150?u=emily' },
  { id: 'Case-7', status: 'CLOSED', requester: 'Jane Walker', requesterImg: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'Case-8', status: 'OPEN', requester: 'Emma Watson', requesterImg: 'https://i.pravatar.cc/150?u=emma' },
  { id: 'Case-9', status: 'OPEN', requester: 'Sam Nelson', requesterImg: 'https://i.pravatar.cc/150?u=sam' },
  { id: 'Case-10', status: 'OPEN', requester: 'Sam Nelson', requesterImg: 'https://i.pravatar.cc/150?u=sam' },
  { id: 'Case-11', status: 'OPEN', requester: 'Emma Watson', requesterImg: 'https://i.pravatar.cc/150?u=emma' },
  { id: 'Case-12', status: 'OPEN', requester: 'Emma Watson', requesterImg: 'https://i.pravatar.cc/150?u=emma' },
];

export const IncidentList: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4 overflow-hidden">
      
      {/* Left Column: Ticket List */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        
        {/* Create Incident Button */}
        <div className="p-4 pb-0">
          <button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white py-3 rounded-lg shadow-md flex items-center justify-center gap-2 font-bold transition-all hover:shadow-lg hover:scale-[1.01]">
             <Plus size={20} strokeWidth={2.5} />
             <span>Create an Incident</span>
          </button>
        </div>

        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <ChevronLeft size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                <h1 className="text-lg font-bold text-gray-800">All Tickets</h1>
            </div>
        </div>

        {/* Toolbar */}
        <div className="p-3 border-b border-gray-100 space-y-3">
             <div className="flex justify-between items-center">
                 <button className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 w-full justify-between hover:bg-gray-100">
                    <span>All Tickets (12)</span>
                    <ChevronDown size={14} className="text-gray-400" />
                 </button>
             </div>
             
             <div className="flex items-center gap-2">
                 <div className="relative flex-1">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input type="text" placeholder="Search" className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-100 transition-colors" />
                 </div>
                 <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border border-transparent hover:border-gray-200">
                     <Filter size={16} />
                 </button>
             </div>

             <div className="flex justify-between items-center">
                 <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded">
                     <RotateCcw size={14} />
                 </button>
                 <div className="flex bg-gray-100 rounded-md p-0.5">
                     <button className="p-1 rounded text-gray-400 hover:bg-white hover:shadow-sm transition-all">
                         <List size={14} />
                     </button>
                     <button className="p-1 rounded bg-white shadow-sm text-cyan-600">
                         <PanelLeft size={14} />
                     </button>
                 </div>
             </div>
        </div>

        {/* List Header */}
        <div className="flex items-center px-4 py-2 bg-gray-50 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100">
            <div className="w-6"><input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /></div>
            <div className="w-16">ID</div>
            <div className="w-16">Status</div>
            <div className="flex-1 text-right">Requester</div>
        </div>

        {/* Tickets Scroll Area */}
        <div className="flex-1 overflow-y-auto">
            {tickets.map((t, i) => (
                <div key={i} className={`flex items-center px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${t.active ? 'bg-indigo-50/60' : ''}`}>
                    <div className="w-6 flex-shrink-0">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    </div>
                    <div className="w-16 flex-shrink-0 text-sm font-medium text-gray-700">{t.id}</div>
                    <div className="w-16 flex-shrink-0">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${t.status === 'OPEN' ? 'text-green-600 bg-green-100' : 'text-gray-500 bg-gray-100'}`}>
                            {t.status}
                        </span>
                    </div>
                    <div className="flex-1 flex justify-end items-center gap-2 min-w-0">
                        <span className="text-xs text-gray-500 truncate">{t.requester}</span>
                        <img src={t.requesterImg} alt="" className="w-6 h-6 rounded-full border border-gray-100" />
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Middle Column: Chat Interface */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                 <button className="p-1 text-gray-400 hover:bg-gray-50 rounded transition-colors"><span className="text-lg">×</span></button>
                 <div className="flex items-center gap-2">
                     <button className="text-gray-400 hover:bg-gray-50 p-1 rounded transition-colors"><ChevronDown size={14} /></button>
                     <h2 className="font-bold text-gray-800">Case-1</h2>
                     <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded uppercase">Open</span>
                 </div>
             </div>
             <div className="flex items-center gap-2">
                 <button className="text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors">Close Ticket</button>
                 <button className="text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-1 transition-colors">Action <ChevronDown size={12}/></button>
                 <button className="text-xs font-medium text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1.5 rounded hover:bg-cyan-100 flex items-center gap-1 transition-colors">
                     <ChevronRight size={12} className="rotate-180" /> View Less
                 </button>
             </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6">
            
            {/* Bot Message */}
            <div className="flex gap-4">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">HB</div>
               <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-bold text-gray-800">Hippo Bot</span>
                   </div>
                   <div className="bg-[#1e1b4b] text-white p-4 rounded-r-xl rounded-bl-xl shadow-sm text-sm leading-relaxed">
                       Thank you for contacting us. We have opened case Case-1 to address your request. Sincerely,
                   </div>
                   <div className="mt-1 flex items-center justify-end gap-3 text-[10px] text-gray-400">
                       <span className="flex items-center gap-1"><BookOpen size={10} /> Read</span>
                       <span>28 Feb 2025 - 10:40 PM</span>
                   </div>
               </div>
            </div>

            {/* User Message */}
            <div className="flex gap-4">
               <img src="https://i.pravatar.cc/150?u=john" className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 shadow-sm" alt="John" />
               <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-bold text-gray-800">John Doe</span>
                   </div>
                   <div className="bg-white text-gray-800 p-4 rounded-r-xl rounded-bl-xl shadow-sm border border-gray-100 text-sm leading-relaxed">
                       The user interface, while functional, was somewhat confusing in certain areas, making it challenging to navigate and use effectively. This lack of clarity could potentially hinder users from fully utilizing the platform's features. Additionally, the presence of several spelling and grammar mistakes throughout the system further impacts the overall user experience, as it may reduce the perceived professionalism and reliability...
                       <div className="mt-1 text-indigo-600 text-xs font-semibold cursor-pointer underline">Read More</div>
                   </div>
                   <div className="mt-1 flex items-center justify-start gap-3 text-[10px] text-gray-400">
                       <span className="flex items-center gap-1"><BookOpen size={10} /> Read</span>
                       <span>28 Feb 2025 - 12:40 PM</span>
                   </div>
               </div>
            </div>

            {/* Agent Message */}
            <div className="flex gap-4">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1e1b4b] flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
               <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-bold text-gray-800">Agent</span>
                   </div>
                   <div className="bg-[#1e1b4b] text-white p-4 rounded-r-xl rounded-bl-xl shadow-sm text-sm leading-relaxed">
                       Thank you for your feedback. We're working to improve the interface for better clarity and usability while also addressing any language errors. Your insights are invaluable, and we appreciate your help in making the platform better.
                       <br/>Best regards,
                   </div>
                   <div className="mt-1 flex items-center justify-end gap-3 text-[10px] text-gray-400">
                       <span className="flex items-center gap-1"><BookOpen size={10} /> Read</span>
                       <span>28 Feb 2025 - 10:45 PM</span>
                   </div>
               </div>
            </div>

            {/* Agent Message 2 */}
            <div className="flex gap-4">
               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1e1b4b] flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
               <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-bold text-gray-800">Agent</span>
                   </div>
                   <div className="bg-[#1e1b4b] text-white p-4 rounded-r-xl rounded-bl-xl shadow-sm text-sm leading-relaxed">
                       Hello again,
                       <br/><br/>
                       We've made some updates based on your feedback. Could you please check and let us know if everything looks good on your end? Your input helps us refine the experience further.
                       <br/>Best regards,
                   </div>
                   <div className="mt-1 flex items-center justify-end gap-3 text-[10px] text-gray-400">
                       <span className="flex items-center gap-1"><BookOpen size={10} /> Read</span>
                       <span>28 Feb 2025 - 10:45 PM</span>
                   </div>
               </div>
            </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 px-4 py-2 hover:border-indigo-200 transition-colors focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-100">
                <input 
                  type="text" 
                  placeholder="Start Typing..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><Paperclip size={18} /></button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><Smile size={18} /></button>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-1.5 rounded-md transition-colors shadow-sm">
                    <Send size={16} className="ml-0.5" />
                </button>
            </div>
        </div>

      </div>

      {/* Right Column: Details */}
      <div className="w-1/4 flex flex-col gap-4 overflow-y-auto pr-1 pb-4">
          
          {/* Contact Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-800">Contact Details</h3>
                  <ChevronDown size={14} className="text-gray-400 cursor-pointer" />
              </div>
              
              <div className="space-y-4">
                  <div>
                      <div className="text-xs font-semibold text-gray-500 mb-2">Requester Information</div>
                      <div className="flex items-center justify-between group cursor-pointer p-1 -mx-1 rounded hover:bg-gray-50">
                          <div className="flex items-center gap-2">
                              <img src="https://i.pravatar.cc/150?u=john" className="w-8 h-8 rounded-full border border-gray-100" alt="John" />
                              <div className="overflow-hidden">
                                  <div className="text-xs font-bold text-gray-800">John Doe</div>
                                  <div className="text-[10px] text-gray-400 truncate">johndoe@gmail.com</div>
                              </div>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1 bg-white border border-gray-200 rounded text-gray-400 hover:text-indigo-600"><ExternalLink size={10} /></button>
                          </div>
                      </div>
                  </div>

                  <div>
                      <div className="text-xs font-semibold text-gray-500 mb-2">Shared with</div>
                      <div className="space-y-2">
                          <div className="flex items-center justify-between group cursor-pointer p-1 -mx-1 rounded hover:bg-gray-50">
                              <div className="flex items-center gap-2">
                                  <img src="https://i.pravatar.cc/150?u=jane" className="w-6 h-6 rounded-full border border-gray-100" alt="Jane" />
                                  <div>
                                      <div className="text-xs font-bold text-gray-800">Jane Walker</div>
                                      <div className="text-[10px] text-gray-400">johndoe@gmail.com</div>
                                  </div>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-1 bg-white border border-gray-200 rounded text-gray-400 hover:text-indigo-600"><Edit2 size={10} /></button>
                              </div>
                          </div>
                          <div className="flex items-center justify-between group cursor-pointer p-1 -mx-1 rounded hover:bg-gray-50">
                              <div className="flex items-center gap-2">
                                  <img src="https://i.pravatar.cc/150?u=evelyn" className="w-6 h-6 rounded-full border border-gray-100" alt="Evelyn" />
                                  <div>
                                      <div className="text-xs font-bold text-gray-800">Evelyn Milton</div>
                                      <div className="text-[10px] text-gray-400">johndoe@gmail.com</div>
                                  </div>
                              </div>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-1 bg-white border border-gray-200 rounded text-gray-400 hover:text-indigo-600"><Edit2 size={10} /></button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Ticket Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-800">Ticket Details</h3>
                  <ChevronDown size={14} className="text-gray-400 cursor-pointer" />
              </div>
              
              <div className="space-y-4">
                 <div>
                    <div className="text-xs text-gray-500 mb-0.5 flex items-center gap-1"><Info size={10} /> Ticket ID</div>
                    <div className="text-xs font-semibold text-gray-800">Case-1</div>
                 </div>
                 <div>
                    <div className="text-xs text-gray-500 mb-0.5 flex items-center gap-1"><RotateCcw size={10} /> Created Date</div>
                    <div className="text-xs font-semibold text-gray-800">28 Feb 2025 - 10:40 PM</div>
                 </div>
                 <div>
                    <div className="text-xs text-gray-500 mb-0.5 flex items-center gap-1"><MessageCircle size={10} /> Rating</div>
                    <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                 </div>
                 <div className="bg-orange-50 p-2 rounded text-[10px] text-orange-600 leading-tight">
                    I appreciate the prompt response and acknowledgment of my feedback. It's reassuring
                    <br/><span className="underline font-bold cursor-pointer hover:text-orange-800">Show more</span>
                 </div>
              </div>
          </div>

           {/* Trello Card Details */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-800">Trello Card Details</h3>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 cursor-pointer hover:text-indigo-600">
                     Open Trello Card <ExternalLink size={8} />
                  </div>
              </div>
              
              <div className="space-y-3">
                 <div>
                    <label className="text-[10px] font-semibold text-gray-600 mb-1 block">Labels</label>
                    <input type="text" value="Green" readOnly className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white text-gray-800 focus:outline-none" />
                 </div>
                 <div>
                    <label className="text-[10px] font-semibold text-gray-600 mb-1 block">List</label>
                    <input type="text" value="Abc" readOnly className="w-full text-xs p-2 border border-gray-200 rounded-md bg-white text-gray-800 focus:outline-none" />
                 </div>
                 <div>
                    <label className="text-[10px] font-semibold text-gray-600 mb-1 block">Members</label>
                    <input type="text" value="Jane Doe" readOnly className="w-full text-xs p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800 focus:outline-none" />
                 </div>
                 <div>
                    <label className="text-[10px] font-semibold text-gray-600 mb-1 block">Priority</label>
                    <input type="text" value="High" readOnly className="w-full text-xs p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800 focus:outline-none" />
                 </div>
              </div>
          </div>

      </div>

    </div>
  );
};
