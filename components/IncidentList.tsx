
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  List, 
  PanelLeft, 
  ChevronLeft, 
  ChevronDown, 
  ChevronRight,
  Paperclip, 
  Smile, 
  Send,
  ExternalLink,
  Edit2,
  Info,
  BookOpen,
  MessageCircle,
  Plus,
  AlertCircle,
  X
} from 'lucide-react';

const tickets = [
  { id: 'Case-1', status: 'OPEN', slaStatus: 'Running', requester: 'John Doe', requesterImg: 'https://i.pravatar.cc/150?u=john' },
  { id: 'Case-2', status: 'OPEN', slaStatus: 'Stopped', requester: 'Jane Walker', requesterImg: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'Case-3', status: 'CLOSED', slaStatus: 'Stopped', requester: 'Evelyn Milton', requesterImg: 'https://i.pravatar.cc/150?u=evelyn' },
  { id: 'Case-4', status: 'OPEN', slaStatus: 'Running', requester: 'Sam Nelson', requesterImg: 'https://i.pravatar.cc/150?u=sam' },
  { id: 'Case-5', status: 'OPEN', slaStatus: 'Running', requester: 'Jane Walker', requesterImg: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'Case-6', status: 'CLOSED', slaStatus: 'Stopped', requester: 'Emily Davis', requesterImg: 'https://i.pravatar.cc/150?u=emily' },
  { id: 'Case-7', status: 'CLOSED', slaStatus: 'Stopped', requester: 'Jane Walker', requesterImg: 'https://i.pravatar.cc/150?u=jane' },
  { id: 'Case-8', status: 'OPEN', slaStatus: 'Running', requester: 'Emma Watson', requesterImg: 'https://i.pravatar.cc/150?u=emma' },
  { id: 'Case-9', status: 'OPEN', slaStatus: 'Stopped', requester: 'Sam Nelson', requesterImg: 'https://i.pravatar.cc/150?u=sam' },
  { id: 'Case-10', status: 'OPEN', slaStatus: 'Running', requester: 'Sam Nelson', requesterImg: 'https://i.pravatar.cc/150?u=sam' },
  { id: 'Case-11', status: 'OPEN', slaStatus: 'Running', requester: 'Emma Watson', requesterImg: 'https://i.pravatar.cc/150?u=emma' },
  { id: 'Case-12', status: 'OPEN', slaStatus: 'Running', requester: 'Emma Watson', requesterImg: 'https://i.pravatar.cc/150?u=emma' },
];

export const IncidentList: React.FC = () => {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  
  // State for selections and filters
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    ticketNumber: '',
    status: '',
    slaStatus: '',
    requester: ''
  });

  // State for Ticket Detail Status Workflow
  const [ticketDetailStatus, setTicketDetailStatus] = useState('OPEN');
  const [ticketDetailSlaStatus, setTicketDetailSlaStatus] = useState('Running');
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [pendingRemark, setPendingRemark] = useState('');

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ ticketNumber: '', status: '', slaStatus: '', requester: '' });
    setSearchQuery('');
  };

  // Filter Logic
  const filteredTickets = tickets.filter(ticket => {
    // 1. Global Search (Checks all fields)
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
        ticket.id.toLowerCase().includes(query) || 
        ticket.status.toLowerCase().includes(query) ||
        ticket.slaStatus.toLowerCase().includes(query) ||
        ticket.requester.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    // 2. Specific Multi-Filters
    if (filters.ticketNumber && !ticket.id.toLowerCase().includes(filters.ticketNumber.toLowerCase())) return false;
    if (filters.status && ticket.status !== filters.status) return false;
    if (filters.slaStatus && ticket.slaStatus !== filters.slaStatus) return false;
    if (filters.requester && !ticket.requester.toLowerCase().includes(filters.requester.toLowerCase())) return false;

    return true;
  });

  const handleCheckboxChange = (id: string) => {
    if (selectedTicketId === id) {
        setSelectedTicketId(null); // Deselect if already selected
    } else {
        setSelectedTicketId(id); // Select new (auto deselects others due to state)
    }
  };

  const handlePendingClick = () => {
    setShowActionMenu(false);
    setShowPendingModal(true);
  };

  const handleSubmitPending = () => {
    if (!pendingRemark.trim()) {
        alert("Please enter a remark.");
        return;
    }
    setTicketDetailStatus('PENDING');
    setTicketDetailSlaStatus('Stopped');
    setShowPendingModal(false);
    setPendingRemark('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
        case 'OPEN': return 'text-green-600 bg-green-100';
        case 'PENDING': return 'text-orange-600 bg-orange-100';
        case 'CLOSED': return 'text-gray-500 bg-gray-100';
        default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4 overflow-hidden relative">
      
      {/* Pending Modal Overlay */}
      {showPendingModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-2xl w-[400px] p-6 animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-bold text-gray-800 text-center mb-6 leading-tight">
                    Please enter a remark/message about the pending status
                </h3>
                
                <textarea 
                    value={pendingRemark}
                    onChange={(e) => setPendingRemark(e.target.value)}
                    placeholder="Put remark here"
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm mb-6"
                ></textarea>

                <div className="flex justify-center gap-4">
                    <button 
                        onClick={handleSubmitPending}
                        className="bg-[#4338CA] hover:bg-[#3730A3] text-white font-medium py-2 px-8 rounded-lg transition-colors"
                    >
                        Submit
                    </button>
                    <button 
                        onClick={() => { setShowPendingModal(false); setPendingRemark(''); }}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-8 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Left Column: Ticket List */}
      <div className="w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
        
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
        <div className="p-3 border-b border-gray-100 space-y-3 bg-white z-10">
             <div className="flex justify-between items-center">
                 <button className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 w-full justify-between hover:bg-gray-100">
                    <span>All Tickets ({filteredTickets.length})</span>
                    <ChevronDown size={14} className="text-gray-400" />
                 </button>
             </div>
             
             <div className="flex items-center gap-2">
                 <div className="relative flex-1">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-100 transition-colors" 
                     />
                 </div>
                 <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`p-1.5 rounded border transition-colors ${showFilterDropdown ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'text-gray-500 hover:bg-gray-100 border-transparent hover:border-gray-200'}`}
                 >
                     <Filter size={16} />
                 </button>
             </div>

             {/* Filter Dropdown */}
             {showFilterDropdown && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 text-xs animate-in slide-in-from-top-2 duration-200">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-700">Advanced Filters</span>
                        <button onClick={clearFilters} className="text-xs text-indigo-600 hover:underline">Clear All</button>
                    </div>
                    
                    <div>
                        <label className="block text-gray-500 mb-1">Ticket Number</label>
                        <input 
                            type="text" 
                            value={filters.ticketNumber}
                            onChange={(e) => handleFilterChange('ticketNumber', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded bg-white focus:outline-none focus:border-indigo-300" 
                            placeholder="e.g. Case-1"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-gray-500 mb-1">Status</label>
                            <select 
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded bg-white focus:outline-none focus:border-indigo-300"
                            >
                                <option value="">All</option>
                                <option value="OPEN">OPEN</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-500 mb-1">SLA Status</label>
                            <select 
                                value={filters.slaStatus}
                                onChange={(e) => handleFilterChange('slaStatus', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-200 rounded bg-white focus:outline-none focus:border-indigo-300"
                            >
                                <option value="">All</option>
                                <option value="Running">Running</option>
                                <option value="Stopped">Stopped</option>
                            </select>
                        </div>
                    </div>

                     <div>
                        <label className="block text-gray-500 mb-1">Requester</label>
                        <input 
                            type="text" 
                            value={filters.requester}
                            onChange={(e) => handleFilterChange('requester', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-200 rounded bg-white focus:outline-none focus:border-indigo-300" 
                            placeholder="Name..."
                        />
                    </div>
                </div>
             )}

             <div className="flex justify-between items-center">
                 <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded" onClick={() => {setSearchQuery(''); setFilters({ticketNumber:'', status:'', slaStatus:'', requester:''})}}>
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
            <div className="w-6"></div> {/* Placeholder for single checkbox visual alignment */}
            <div className="w-28">Ticket Number</div>
            <div className="w-16">Status</div>
            <div className="w-20 pl-2">SLA Status</div>
            <div className="flex-1 text-right">Requester</div>
        </div>

        {/* Tickets Scroll Area */}
        <div className="flex-1 overflow-y-auto">
            {filteredTickets.length > 0 ? (
                filteredTickets.map((t, i) => (
                    <div 
                        key={i} 
                        onClick={() => handleCheckboxChange(t.id)}
                        className={`flex items-center px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${selectedTicketId === t.id ? 'bg-indigo-50/60' : ''}`}
                    >
                        <div className="w-6 flex-shrink-0">
                            <input 
                                type="checkbox" 
                                checked={selectedTicketId === t.id}
                                onChange={() => handleCheckboxChange(t.id)}
                                className="rounded-full border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                            />
                        </div>
                        <div className="w-28 flex-shrink-0 text-sm font-medium text-gray-700 truncate pr-2" title={t.id}>{t.id}</div>
                        <div className="w-16 flex-shrink-0">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${t.status === 'OPEN' ? 'text-green-600 bg-green-100' : 'text-gray-500 bg-gray-100'}`}>
                                {t.status}
                            </span>
                        </div>
                        <div className="w-20 flex-shrink-0 pl-2">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${t.slaStatus === 'Running' ? 'text-blue-600 bg-blue-100' : 'text-gray-500 bg-gray-100'}`}>
                                {t.slaStatus}
                            </span>
                        </div>
                        <div className="flex-1 flex justify-end items-center gap-2 min-w-0">
                            <span className="text-xs text-gray-500 truncate">{t.requester}</span>
                            <img src={t.requesterImg} alt="" className="w-6 h-6 rounded-full border border-gray-100" />
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-xs">
                    <Search size={24} className="mb-2 opacity-50"/>
                    No tickets found
                </div>
            )}
        </div>
      </div>

      {/* Middle Column Container */}
      <div className="flex-1 flex flex-col gap-4 overflow-hidden min-w-0">
        
        {/* Chat Interface (Combined with Description) */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button className="p-1 text-gray-400 hover:bg-gray-50 rounded transition-colors"><span className="text-lg">×</span></button>
                    <div className="flex items-center gap-2">
                        <button className="text-gray-400 hover:bg-gray-50 p-1 rounded transition-colors"><ChevronDown size={14} /></button>
                        <h2 className="font-bold text-gray-800">Case-1</h2>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${getStatusColor(ticketDetailStatus)}`}>
                            {ticketDetailStatus}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2 relative">
                    <button className="text-xs font-bold text-red-500 bg-red-50 border border-red-100 px-3 py-1.5 rounded hover:bg-red-100 transition-colors">Cancel Ticket</button>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setShowActionMenu(!showActionMenu)}
                            className="text-xs font-medium text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded hover:bg-gray-50 flex items-center gap-1 transition-colors"
                        >
                            Action <ChevronDown size={12}/>
                        </button>
                        
                        {showActionMenu && (
                            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 shadow-lg rounded-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-200">
                                <button 
                                    onClick={handlePendingClick}
                                    className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    Pending
                                </button>
                                <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors">
                                    Resolved
                                </button>
                            </div>
                        )}
                    </div>

                    <button className="text-xs font-medium text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1.5 rounded hover:bg-cyan-100 flex items-center gap-1 transition-colors">
                        <ChevronRight size={12} className="rotate-180" /> View Less
                    </button>
                </div>
            </div>

            {/* Ticket Description Section (Integrated) */}
            <div className="p-6 border-b border-gray-100 bg-white flex-shrink-0">
                 <div className="space-y-4">
                     <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-1">Subject:</h3>
                         <p className="text-sm text-gray-600 font-medium uppercase tracking-wide">USER SAP LOCKED</p>
                     </div>
                     <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-1">Description:</h3>
                         <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            Halo tim IT,{'\n\n'}
                            Mohon dibantu bukakan akun CCD019 karena terlocked,{'\n'}
                            Password terakhir @Yp111
                         </p>
                     </div>
                     <div>
                         <h3 className="text-sm font-bold text-gray-900 mb-1">Category:</h3>
                         <p className="text-sm text-gray-500">Software - SAP - Could Not Login to SAP</p>
                     </div>
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
                        <div className="mt-1 text-indigo-600 text-xs font-bold cursor-pointer hover:underline">Read More</div>
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-3 text-[10px] text-gray-400">
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
                            Thank you for your feedback. We're working to improve the interface for better clarity and usability while also addressing any language errors. Your insights are invaluable, and we appreciate your help in making the platform better. Best regards,
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
                            Best regards,
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
                 <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <input type="text" placeholder="Start Typing..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 outline-none" />
                    <button className="text-gray-400 hover:text-gray-600"><Paperclip size={18} /></button>
                    <button className="text-gray-400 hover:text-gray-600"><Smile size={18} /></button>
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg shadow-sm transition-colors">
                        <Send size={16} />
                    </button>
                 </div>
            </div>
        </div>
      </div>

      {/* Right Column: Ticket Info */}
      <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-1 pb-4">
         
         {/* Contact Details Card */}
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4 cursor-pointer">
                 <h3 className="font-bold text-gray-900 text-sm">Contact Details</h3>
                 <ChevronDown size={14} className="text-gray-400" />
             </div>
             
             <div className="space-y-4">
                 {/* Requester */}
                 <div>
                     <p className="text-xs text-gray-500 mb-2">Requester</p>
                     <div className="flex items-center gap-3">
                         <img src="https://i.pravatar.cc/150?u=john" alt="User" className="w-8 h-8 rounded-full" />
                         <div className="overflow-hidden">
                             <p className="text-sm font-bold text-gray-800">John Doe</p>
                             <p className="text-xs text-gray-400 truncate">johndoe@gmail.com</p>
                         </div>
                         <button className="ml-auto p-1 text-gray-300 hover:text-gray-600"><Edit2 size={12} /></button>
                     </div>
                 </div>

                 {/* Requested For */}
                 <div>
                     <p className="text-xs text-gray-500 mb-2">Requested For</p>
                     <div className="flex items-center gap-3">
                         <img src="https://i.pravatar.cc/150?u=john" alt="User" className="w-8 h-8 rounded-full" />
                         <div className="overflow-hidden">
                             <p className="text-sm font-bold text-gray-800">John Doe</p>
                             <p className="text-xs text-gray-400 truncate">johndoe@gmail.com</p>
                         </div>
                         <button className="ml-auto p-1 text-gray-300 hover:text-gray-600"><Edit2 size={12} /></button>
                     </div>
                 </div>

                 {/* Agent */}
                 <div>
                     <p className="text-xs text-gray-500 mb-2">Agent</p>
                     <div className="flex items-center gap-3">
                         <img src="https://i.pravatar.cc/150?u=mike" alt="User" className="w-8 h-8 rounded-full" />
                         <div className="overflow-hidden">
                             <p className="text-sm font-bold text-gray-800">Mike Ross</p>
                             <p className="text-xs text-gray-400 truncate">Support Agent</p>
                         </div>
                     </div>
                 </div>

                 {/* Second Layer Agent */}
                 <div>
                     <p className="text-xs text-gray-500 mb-2">Second Layer Agent</p>
                     <div className="space-y-3">
                         <div className="flex items-center gap-3">
                             <img src="https://i.pravatar.cc/150?u=jane" alt="User" className="w-8 h-8 rounded-full" />
                             <div>
                                 <p className="text-sm font-bold text-gray-800">Jane Walker</p>
                                 <p className="text-xs text-gray-400">Network Specialist</p>
                             </div>
                             <button className="ml-auto p-1 text-gray-300 hover:text-gray-600"><Edit2 size={12} /></button>
                         </div>
                         <div className="flex items-center gap-3">
                             <img src="https://i.pravatar.cc/150?u=evelyn" alt="User" className="w-8 h-8 rounded-full" />
                             <div>
                                 <p className="text-sm font-bold text-gray-800">Evelyn Milton</p>
                                 <p className="text-xs text-gray-400">Database Admin</p>
                             </div>
                             <button className="ml-auto p-1 text-gray-300 hover:text-gray-600"><Edit2 size={12} /></button>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         {/* Ticket Details Card */}
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4 cursor-pointer">
                 <h3 className="font-bold text-gray-900 text-sm">Ticket Details</h3>
                 <ChevronDown size={14} className="text-gray-400" />
             </div>
             
             <div className="space-y-4">
                 <div>
                     <div className="flex items-center gap-1 text-gray-400 mb-1">
                         <Info size={12} />
                         <span className="text-xs">Ticket ID</span>
                     </div>
                     <p className="text-sm font-bold text-gray-800">Case-1</p>
                 </div>

                 <div>
                     <label className="text-xs text-gray-500 block mb-1">Urgency</label>
                     <select className="w-full text-xs border border-gray-200 rounded p-1.5 bg-gray-50 focus:outline-none">
                         <option>Urgent</option>
                         <option>High</option>
                         <option>Medium</option>
                         <option>Low</option>
                     </select>
                 </div>

                 <div>
                     <div className="flex items-center gap-1 text-gray-400 mb-1">
                         <RotateCcw size={12} />
                         <span className="text-xs">Created Date</span>
                     </div>
                     <p className="text-sm font-bold text-gray-800">28 Feb 2025 - 10:40 PM</p>
                 </div>

                 {/* SLA Details */}
                 <div className="pt-2 border-t border-gray-100 space-y-3">
                     <div>
                         <p className="text-xs font-bold text-gray-800">Standard SLA Response:</p>
                         <p className="text-xs text-gray-500">3 hours</p>
                     </div>
                     <div>
                         <p className="text-xs font-bold text-gray-800">Standard SLA Resolve:</p>
                         <p className="text-xs text-gray-500">12 hours</p>
                     </div>
                     
                     <div>
                         <p className="text-xs font-bold text-gray-800">First Response Due Estimation:</p>
                         <div className="flex items-center gap-2">
                             <span className="text-xs text-gray-600">02 Dec 2025 15:30</span>
                             <span className="text-[10px] bg-green-100 text-green-600 font-bold px-1.5 rounded">Within SLA</span>
                         </div>
                     </div>
                     <div>
                         <p className="text-xs font-bold text-gray-800">Till First Response Due Estimation:</p>
                         <p className="text-xs font-bold text-teal-400">+0 day 2 hours 29 minutes</p>
                     </div>

                     <div>
                         <p className="text-xs font-bold text-gray-800">Resolve Due Estimation:</p>
                         <div className="flex items-center gap-2">
                             <span className="text-xs text-gray-600">08 Dec 2025 11:43</span>
                             <span className="text-[10px] bg-green-100 text-green-600 font-bold px-1.5 rounded">Within SLA</span>
                         </div>
                     </div>
                     <div>
                         <p className="text-xs font-bold text-gray-800">Till Resolve Due Estimation:</p>
                         <p className="text-xs font-bold text-teal-400">+0 day 12 hours 0 minutes</p>
                     </div>
                     
                     <div>
                         <p className="text-xs font-bold text-gray-800">2nd Layer Resolution Timer:</p>
                         <p className="text-xs text-gray-500">0 Minutes</p>
                     </div>
                 </div>

                 <div>
                     <div className="flex items-center gap-1 text-gray-400 mb-1">
                         <MessageCircle size={12} />
                         <span className="text-xs">Rating</span>
                     </div>
                     <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                 </div>

                 <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg text-xs text-orange-600 leading-relaxed">
                     I appreciate the prompt response and acknowledgment of my feedback. It's reassuring
                     <span className="block font-bold underline cursor-pointer mt-1">Show more</span>
                 </div>
             </div>
         </div>

         {/* Trello Card Details (Renamed) */}
         <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-gray-900 text-sm">Trello Card Details</h3>
             </div>
             
             <div className="space-y-3">
                 <div>
                     <label className="text-xs text-gray-500 block mb-1">Impact</label>
                     <div className="w-full text-sm border border-gray-200 rounded px-3 py-2 text-gray-700">Low</div>
                 </div>
                 
                 <div>
                     <label className="text-xs text-gray-500 block mb-1">Tagging</label>
                     <div className="w-full text-sm border border-gray-200 rounded px-3 py-2 text-gray-700">#SAP</div>
                 </div>

                 <div>
                     <label className="text-xs text-gray-500 block mb-1">Agent Group</label>
                     <div className="w-full text-sm border border-gray-200 rounded px-3 py-2 text-gray-700">Service Desk</div>
                 </div>
                 
                 <div>
                     <label className="text-xs text-gray-500 block mb-1">Priority</label>
                     <div className="w-full text-sm border border-gray-200 rounded px-3 py-2 text-gray-700">High</div>
                 </div>
             </div>
         </div>

      </div>

    </div>
  );
};
