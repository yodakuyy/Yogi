
import React, { useState, useRef, useEffect } from 'react';
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
  X,
  FileText,
  Image,
  Download,
  Clock,
  CheckCircle,
  Activity,
  ArrowUpCircle,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List as ListIcon,
  ListOrdered,
  Type,
  Check,
  Maximize2,
  Minimize2,
  Cloud,
  Monitor,
  FileSpreadsheet,
  Users,
  Star,
  Calendar,
  LayoutGrid,
  Folder,
  Share2
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

// Mock data for OneDrive
const oneDriveFiles = [
    { name: 'BOM WF Audit_a', type: 'excel', opened: 'Yesterday at 6:23 PM', owner: 'Jofian Purba', activity: 'Jofian Purba shared this in a Teams...' },
    { name: 'AI Driven Servicedesk Transformation', type: 'ppt', opened: 'Wed at 1:16 PM', owner: 'Yogi Danis Fermana', activity: 'You shared this in a Teams chat • Nov 18' },
    { name: 'Monthly_Network Connection Uptime_raw data', type: 'excel', opened: 'Wed at 10:51 AM', owner: 'Oca Rosnalita', activity: '' },
    { name: 'Monthly_Application Uptime_raw data', type: 'excel', opened: 'Wed at 10:50 AM', owner: 'Oca Rosnalita', activity: '' },
    { name: 'Monthly_Service Request_raw data', type: 'excel', opened: 'Wed at 10:50 AM', owner: 'Oca Rosnalita', activity: '' },
    { name: 'Monthly_Incident (Complaint) Resolve Time_rawdata', type: 'excel', opened: 'Wed at 10:49 AM', owner: 'Oca Rosnalita', activity: '' },
    { name: 'Monthly_Network Connection Uptime_raw data', type: 'excel', opened: 'Wed at 10:49 AM', owner: 'Oca Rosnalita', activity: '' },
    { name: 'Pre Kickoff Meeting - Service Desk - Copy', type: 'ppt', opened: 'Wed at 7:56 AM', owner: 'Yogi Danis Fermana', activity: '' },
    { name: 'AI Servicedesk', type: 'ppt', opened: 'Wed at 7:56 AM', owner: 'Yogi Danis Fermana', activity: '' },
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

  // Escalate Modal State
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [emailSearch, setEmailSearch] = useState('');

  // Chat Zoom State
  const [isChatZoomed, setIsChatZoomed] = useState(false);
  
  // Chat Input State
  const [chatInput, setChatInput] = useState('');
  const [chatImages, setChatImages] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Attachment State
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showOneDriveModal, setShowOneDriveModal] = useState(false);
  const [selectedCloudFile, setSelectedCloudFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emailOptions = [
    "jane.walker@modena.com",
    "evelyn.milton@modena.com",
    "mike.ross@modena.com",
    "sarah.connor@modena.com"
  ];

  const toggleEmail = (email: string) => {
    if (selectedEmails.includes(email)) {
        setSelectedEmails(selectedEmails.filter(e => e !== email));
    } else {
        setSelectedEmails([...selectedEmails, email]);
    }
  };

  const removeEmail = (email: string) => {
      setSelectedEmails(selectedEmails.filter(e => e !== email));
  };

  // Right Sidebar Tabs
  const [activeTab, setActiveTab] = useState<'detail' | 'activities' | 'attachments'>('detail');

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

  // Chat Input Handlers
  const handleChatInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatInput(e.target.value);
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleChatKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
      }
  };

  const handleChatPaste = (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      for (const item of items) {
          if (item.type.indexOf('image') !== -1) {
              const blob = item.getAsFile();
              if (blob) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                      if (event.target?.result) {
                          setChatImages(prev => [...prev, event.target!.result as string]);
                      }
                  };
                  reader.readAsDataURL(blob);
              }
          }
      }
  };

  const handleSendMessage = () => {
      if (!chatInput.trim() && chatImages.length === 0) return;
      console.log("Sending:", chatInput, chatImages);
      
      setChatInput('');
      setChatImages([]);
      if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
      }
  };

  const removeChatImage = (index: number) => {
      setChatImages(prev => prev.filter((_, i) => i !== index));
  };

  // Attachment Handlers
  const handleDeviceUpload = () => {
    setShowAttachMenu(false);
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
        // Mock handle file selection
        alert(`Selected file: ${files[0].name}`);
    }
  };

  const handleCloudAttach = () => {
      setShowAttachMenu(false);
      setShowOneDriveModal(true);
  };

  const handleOneDriveAttach = () => {
      if (selectedCloudFile) {
          alert(`Attached cloud file: ${selectedCloudFile}`);
          setShowOneDriveModal(false);
          setSelectedCloudFile(null);
      }
  };

  // Filter email options based on search
  const filteredEmailOptions = emailOptions.filter(email => 
    email.toLowerCase().includes(emailSearch.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-4 overflow-hidden relative">
      
      {/* OneDrive Modal */}
      {showOneDriveModal && (
          <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center animate-in fade-in duration-200">
              <div className="bg-white rounded-lg shadow-2xl w-[900px] h-[600px] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#0078D4] text-white">
                      <div className="font-semibold text-lg">OneDrive</div>
                      <button onClick={() => setShowOneDriveModal(false)} className="hover:bg-white/20 p-1 rounded">
                          <X size={20} />
                      </button>
                  </div>

                  <div className="flex flex-1 overflow-hidden">
                      {/* Sidebar */}
                      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-4 overflow-y-auto">
                          <div className="space-y-1">
                              <div className="flex items-center gap-3 px-3 py-2 bg-gray-200 rounded text-gray-800 font-medium cursor-pointer">
                                  <Cloud size={16} /> Home
                              </div>
                              <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                  <Folder size={16} /> My files
                              </div>
                              <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                  <Users size={16} /> Shared
                              </div>
                              <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                  <Star size={16} /> Favorites
                              </div>
                          </div>

                          <div>
                              <div className="text-xs font-bold text-gray-500 mb-2 uppercase">Browse by</div>
                              <div className="space-y-1">
                                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                      <Users size={16} /> People
                                  </div>
                                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                      <Calendar size={16} /> Meetings
                                  </div>
                              </div>
                          </div>

                           <div>
                              <div className="text-xs font-bold text-gray-500 mb-2 uppercase flex items-center gap-1">
                                  Quick access <Info size={10}/>
                              </div>
                              <div className="space-y-1">
                                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                      <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[8px] font-bold">IT</div> DIT Group
                                  </div>
                                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                      <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[8px] font-bold">M</div> MODENA Hub
                                  </div>
                                  <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                                       <div className="w-4 h-4 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[8px] font-bold">M</div> Policies & P...
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 flex flex-col bg-white">
                          <div className="p-4 border-b border-gray-100">
                              <h2 className="text-xl font-semibold text-gray-800">Home</h2>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto">
                              <table className="w-full text-left text-sm">
                                  <thead className="bg-gray-50 text-gray-500 font-medium sticky top-0">
                                      <tr>
                                          <th className="px-4 py-2 w-8"></th> {/* Icon col */}
                                          <th className="px-4 py-2">Name</th>
                                          <th className="px-4 py-2">Opened</th>
                                          <th className="px-4 py-2">Owner</th>
                                          <th className="px-4 py-2">Activity</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-50">
                                      {oneDriveFiles.map((file, idx) => (
                                          <tr 
                                            key={idx} 
                                            onClick={() => setSelectedCloudFile(file.name)}
                                            className={`hover:bg-gray-50 cursor-pointer ${selectedCloudFile === file.name ? 'bg-blue-50' : ''}`}
                                          >
                                              <td className="px-4 py-3">
                                                  {file.type === 'excel' ? <FileSpreadsheet size={16} className="text-green-600"/> : <FileText size={16} className="text-orange-500"/>}
                                              </td>
                                              <td className="px-4 py-3 font-medium text-gray-700">{file.name}</td>
                                              <td className="px-4 py-3 text-gray-500">{file.opened}</td>
                                              <td className="px-4 py-3 text-gray-500">{file.owner}</td>
                                              <td className="px-4 py-3 text-gray-500 flex items-center gap-1">
                                                {file.activity && <><Share2 size={12} className="text-blue-500"/> {file.activity}</>}
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                       <button 
                          onClick={handleOneDriveAttach}
                          disabled={!selectedCloudFile}
                          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${selectedCloudFile ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                       >
                           Attach
                       </button>
                       <button 
                          onClick={() => setShowOneDriveModal(false)}
                          className="px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
                       >
                           Cancel
                       </button>
                  </div>
              </div>
          </div>
      )}

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

      {/* Escalate Modal Overlay */}
      {showEscalateModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-2xl w-[600px] flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh]">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">Escalate to Second-Level Support</h3>
                    <button onClick={() => setShowEscalateModal(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6 space-y-5 overflow-y-auto">
                    {/* Helper Email Multi-Select */}
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Helper Email (Synchronized from HRIS Sunfish)
                        </label>
                        
                        <div 
                            className="w-full border border-gray-300 rounded min-h-[42px] px-2 py-1 flex flex-wrap items-center gap-2 cursor-pointer bg-white"
                            onClick={() => setShowEmailDropdown(!showEmailDropdown)}
                        >
                            {selectedEmails.length === 0 && (
                                <span className="text-gray-500 text-sm ml-1">Select...</span>
                            )}
                            {selectedEmails.map(email => (
                                <div key={email} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium">
                                    {email}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); removeEmail(email); }}
                                        className="hover:text-indigo-900"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <div className="ml-auto text-gray-400">
                                <ChevronDown size={16} />
                            </div>
                        </div>

                        {showEmailDropdown && (
                            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                                {/* Search Input */}
                                <div className="p-2 sticky top-0 bg-white border-b border-gray-100 z-10">
                                    <input 
                                        type="text" 
                                        placeholder="Search email..." 
                                        value={emailSearch}
                                        onChange={(e) => setEmailSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-full text-xs px-2 py-1.5 border border-gray-200 rounded focus:outline-none focus:border-indigo-300"
                                        autoFocus
                                    />
                                </div>
                                
                                {filteredEmailOptions.length > 0 ? (
                                    filteredEmailOptions.map(email => (
                                        <div 
                                            key={email}
                                            onClick={() => toggleEmail(email)} 
                                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-3 text-sm text-gray-700"
                                        >
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedEmails.includes(email) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'}`}>
                                                {selectedEmails.includes(email) && <Check size={10} />}
                                            </div>
                                            {email}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-xs text-gray-400">No results found</div>
                                )}
                            </div>
                        )}
                        {/* Overlay to close dropdown when clicking outside */}
                        {showEmailDropdown && (
                            <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setShowEmailDropdown(false)}></div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                            Message to Helper <span className="font-normal text-gray-500 italic">(max. 2,000 characters)</span>
                        </label>
                        <div className="border border-gray-300 rounded overflow-hidden">
                            {/* Toolbar Simulation */}
                            <div className="flex items-center gap-2 bg-gray-50 border-b border-gray-200 p-2 text-gray-600">
                                <span className="text-xs font-medium mr-2">Normal</span>
                                <div className="h-4 w-px bg-gray-300 mx-1"></div>
                                <button className="hover:bg-gray-200 p-1 rounded"><Bold size={14}/></button>
                                <button className="hover:bg-gray-200 p-1 rounded"><Italic size={14}/></button>
                                <button className="hover:bg-gray-200 p-1 rounded"><Underline size={14}/></button>
                                <button className="hover:bg-gray-200 p-1 rounded"><LinkIcon size={14}/></button>
                                <div className="h-4 w-px bg-gray-300 mx-1"></div>
                                <button className="hover:bg-gray-200 p-1 rounded"><ListIcon size={14}/></button>
                                <button className="hover:bg-gray-200 p-1 rounded"><ListOrdered size={14}/></button>
                                <button className="hover:bg-gray-200 p-1 rounded"><Type size={14}/></button>
                            </div>
                            <textarea 
                                className="w-full h-40 p-3 text-sm focus:outline-none resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <p className="text-xs italic text-gray-600">
                        * Only email addresses listed in the dropdown can be selected.
                    </p>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                     <button 
                        onClick={() => setShowEscalateModal(false)}
                        className="w-full bg-[#525252] hover:bg-[#404040] text-white font-bold py-3 rounded text-sm transition-colors"
                     >
                         Send
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
      <div className={`flex-1 flex flex-col gap-4 overflow-hidden min-w-0 ${isChatZoomed ? 'z-50' : ''}`}>
        
        {/* Chat Interface (Combined with Description) */}
        <div className={isChatZoomed ? "fixed inset-0 z-50 bg-white flex flex-col animate-in fade-in zoom-in-95 duration-200" : "flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative"}>
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
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

                    <button 
                        onClick={() => setShowEscalateModal(true)}
                        className="text-xs font-medium text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1.5 rounded hover:bg-cyan-100 flex items-center gap-1 transition-colors"
                    >
                        <ArrowUpCircle size={14} /> Escalate
                    </button>

                    <button 
                        onClick={() => setIsChatZoomed(!isChatZoomed)}
                        className={`text-xs font-medium border px-3 py-1.5 rounded flex items-center gap-1 transition-colors ${isChatZoomed ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
                        title={isChatZoomed ? "Close Zoom" : "Zoom Chat"}
                    >
                        {isChatZoomed ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                        {isChatZoomed && <span>Close Zoom</span>}
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

            {/* Input Area (New) */}
            <div className="p-4 bg-white border-t border-gray-100">
                <div className="bg-gray-50 p-2 rounded-xl border border-gray-100 focus-within:ring-1 focus-within:ring-indigo-100 transition-all">
                    
                    {/* Image Previews */}
                    {chatImages.length > 0 && (
                        <div className="flex gap-2 mb-2 overflow-x-auto p-2 bg-white rounded-lg border border-gray-100">
                            {chatImages.map((img, idx) => (
                                <div key={idx} className="relative group flex-shrink-0">
                                    <img src={img} alt="pasted" className="h-20 w-auto rounded border border-gray-200 object-cover" />
                                    <button 
                                        onClick={() => removeChatImage(idx)}
                                        className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                                        title="Remove image"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-end gap-3">
                        {/* Hidden File Input */}
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            onChange={handleFileSelect}
                        />

                        <textarea 
                            ref={textareaRef}
                            value={chatInput}
                            onChange={handleChatInputChange}
                            onKeyDown={handleChatKeyDown}
                            onPaste={handleChatPaste}
                            placeholder="Start Typing... (Shift+Enter for new line, Ctrl+V for images)" 
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 outline-none resize-none max-h-40 min-h-[40px] py-2.5 custom-scrollbar"
                            rows={1}
                            style={{ height: 'auto' }} 
                        />
                        
                        {/* Buttons */}
                        <div className="flex items-center gap-2 pb-1.5 relative">
                            {/* Attachment Menu */}
                            <div className="relative">
                                <button 
                                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                                >
                                    <Paperclip size={18} />
                                </button>
                                {showAttachMenu && (
                                    <div className="absolute bottom-full mb-2 right-0 origin-bottom-right w-48 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                        <button 
                                            onClick={handleCloudAttach}
                                            className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                        >
                                            <Cloud size={14} className="text-blue-500"/> Attach Cloud files
                                        </button>
                                        <button 
                                            onClick={handleDeviceUpload}
                                            className="w-full text-left px-4 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                        >
                                            <Monitor size={14} className="text-gray-500"/> Upload from this device
                                        </button>
                                    </div>
                                )}
                                {showAttachMenu && (
                                    <div className="fixed inset-0 z-10" onClick={() => setShowAttachMenu(false)}></div>
                                )}
                            </div>

                            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"><Smile size={18} /></button>
                            <button 
                                onClick={handleSendMessage} 
                                className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg shadow-sm transition-colors"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Right Column: Ticket Info & Tabs */}
      <div className="w-80 flex flex-col gap-4 overflow-hidden">
         
         {/* Tab Header */}
         <div className="flex items-center justify-between border-b border-gray-200 pb-2 mx-1 mt-1">
             <button 
                onClick={() => setActiveTab('detail')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'detail' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 <Info size={14} /> Detail
             </button>
             <button 
                onClick={() => setActiveTab('activities')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'activities' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 <List size={14} /> Activities
             </button>
             <button 
                onClick={() => setActiveTab('attachments')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'attachments' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                 <Paperclip size={14} /> Attachments
             </button>
         </div>

         {/* Tab Content Area */}
         <div className="flex-1 overflow-y-auto pr-1 pb-4 space-y-4">
             
             {/* DETAIL VIEW */}
             {activeTab === 'detail' && (
                <>
                 {/* Contact Details Card */}
                 <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-2 duration-300">
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
                 <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-3 duration-300">
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

                 {/* Other Details Card */}
                 <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-300">
                     <div className="flex justify-between items-center mb-4">
                         <h3 className="font-bold text-gray-900 text-sm">Other Details</h3>
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
                </>
             )}

             {/* ACTIVITIES VIEW */}
             {activeTab === 'activities' && (
                 <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-2 duration-300">
                     <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                         <Activity size={16} /> Activity Log
                     </h3>
                     <div className="relative pl-4 space-y-6 border-l border-gray-200 ml-2">
                         <div className="relative">
                             <div className="absolute -left-[21px] bg-green-100 p-1 rounded-full text-green-600 border border-white shadow-sm">
                                 <CheckCircle size={10} />
                             </div>
                             <p className="text-xs font-bold text-gray-800">Status changed from New to Open</p>
                             <p className="text-xs text-gray-500 mt-1">by System</p>
                             <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><Clock size={10}/> 28 Feb 2025 - 10:40 PM</p>
                         </div>
                         <div className="relative">
                             <div className="absolute -left-[21px] bg-blue-100 p-1 rounded-full text-blue-600 border border-white shadow-sm">
                                 <Plus size={10} />
                             </div>
                             <p className="text-xs font-bold text-gray-800">Ticket Created</p>
                             <p className="text-xs text-gray-500 mt-1">by John Doe</p>
                             <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><Clock size={10}/> 28 Feb 2025 - 10:39 PM</p>
                         </div>
                         <div className="relative">
                             <div className="absolute -left-[21px] bg-purple-100 p-1 rounded-full text-purple-600 border border-white shadow-sm">
                                 <Edit2 size={10} />
                             </div>
                             <p className="text-xs font-bold text-gray-800">Assigned to Mike Ross</p>
                             <p className="text-xs text-gray-500 mt-1">by System Automated Rule</p>
                             <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><Clock size={10}/> 28 Feb 2025 - 10:45 PM</p>
                         </div>
                     </div>
                 </div>
             )}

             {/* ATTACHMENTS VIEW */}
             {activeTab === 'attachments' && (
                 <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-2 duration-300">
                     <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                         <Paperclip size={16} /> Attachments (2)
                     </h3>
                     <div className="space-y-3">
                         <div className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                             <div className="w-8 h-8 bg-red-50 text-red-500 rounded flex items-center justify-center mr-3">
                                 <Image size={16} />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <p className="text-xs font-bold text-gray-700 truncate">screenshot_error_sap.png</p>
                                 <p className="text-[10px] text-gray-400">2.4 MB</p>
                             </div>
                             <button className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Download size={14} />
                             </button>
                         </div>
                         <div className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors group">
                             <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded flex items-center justify-center mr-3">
                                 <FileText size={16} />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <p className="text-xs font-bold text-gray-700 truncate">system_logs.txt</p>
                                 <p className="text-[10px] text-gray-400">15 KB</p>
                             </div>
                             <button className="text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Download size={14} />
                             </button>
                         </div>
                     </div>
                     <button className="w-full mt-4 border border-dashed border-gray-300 rounded-lg py-3 text-xs text-gray-500 hover:bg-gray-50 hover:border-indigo-300 transition-colors flex items-center justify-center gap-2">
                         <Plus size={14} /> Upload new file
                     </button>
                 </div>
             )}

         </div>

      </div>

    </div>
  );
};
