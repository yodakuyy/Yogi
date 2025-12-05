
import React, { useState } from 'react';
import { Search, Filter, Trash2, Calendar } from 'lucide-react';

export const OutOfOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approval' | 'apply'>('approval');

  // Mock data for Last 3 OOOs
  const history = [
    { id: 1, dateRange: '22 Nov 2025 - 22 Nov 2025', reason: 'Naik Gunung', status: 'Approved' },
    { id: 2, dateRange: '11 Nov 2025 - 11 Nov 2025', reason: 'Sakit', status: 'Approved' },
    { id: 3, dateRange: '10 Nov 2025 - 10 Nov 2025', reason: 'Sakit', status: 'Approved' },
  ];

  return (
    <div className="h-full flex flex-col p-2 font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Out Of Office</h1>
        <p className="text-gray-500 mt-1 text-sm">Submit an Out-of-Office request so that you won’t receive new tickets during your absence.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('approval')}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'approval'
              ? 'text-gray-800 border-b-2 border-gray-300 bg-gray-50 rounded-t-lg'
              : 'text-blue-500 hover:text-blue-700 hover:bg-gray-50 rounded-t-lg'
          }`}
        >
          My Requests
        </button>
        <button
          onClick={() => setActiveTab('apply')}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'apply'
              ? 'text-gray-800 border-b-2 border-gray-300 bg-gray-50 rounded-t-lg'
              : 'text-blue-500 hover:text-blue-700 hover:bg-gray-50 rounded-t-lg'
          }`}
        >
          Request Out of Office
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'approval' && (
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm min-h-[400px]">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1 max-w-lg">
                <input
                  type="text"
                  placeholder="Search here.."
                  className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm text-gray-600"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 text-sm font-bold">
                <Filter size={16} fill="currentColor" className="text-gray-500" />
                Filter
              </button>
            </div>
            <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-sm">
                {/* List content would go here */}
            </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Form */}
            <div className="flex-1 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <p className="text-red-500 text-xs mb-6 font-medium">* = Mandatory.</p>

              <div className="flex gap-6 mb-6">
                <div className="flex-1">
                  <label className="block text-gray-500 text-xs font-medium mb-1">
                    Start Date:<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full border border-gray-400 rounded-sm px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-indigo-500"
                      placeholder="Select Date"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-500 text-xs font-medium mb-1">
                    End Date:<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full border border-gray-400 rounded-sm px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-indigo-500"
                      placeholder="Select Date"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-500 text-xs font-medium mb-1">
                  Reason for Absence:<span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full h-48 border border-gray-400 rounded-sm p-3 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>

              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-md text-sm transition-colors">
                Submit Request
              </button>
            </div>

            {/* Right Column: History */}
            <div className="w-full lg:w-96 bg-white p-6 rounded-lg border border-gray-100 shadow-sm h-fit">
              <h3 className="font-bold text-gray-800 text-sm mb-4">Recent Out-of-Office Requests</h3>
              
              <div className="space-y-4">
                {history.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 relative hover:shadow-sm transition-shadow">
                    <button className="absolute top-4 right-4 text-black hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="mb-2">
                      <p className="text-sm font-bold text-gray-900">{item.dateRange}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.reason}</p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-800 mb-0.5">Status:</p>
                      <p className="text-xs font-bold text-green-500">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
