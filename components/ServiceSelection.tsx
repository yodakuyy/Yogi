
import React from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';

interface ServiceSelectionProps {
  onSelect: (service: string) => void;
}

const services = [
  { 
    name: 'DIT', 
    description: 'Digital Infrastructure',
    features: ['Network Security', 'Hardware Support', 'Application Support']
  },
  { 
    name: 'CREATIVE', 
    description: 'Design & Branding', 
    features: ['Brand Identity', 'UI/UX Design', 'Motion Graphics']
  },
  { 
    name: 'HCO', 
    description: 'Human Capital',
    features: ['Talent Acquisition', 'Employee Relations', 'Payroll Systems'] 
  },
  { 
    name: 'LEGAL', 
    description: 'Compliance & Law',
    features: ['Contract Review', 'Risk Assessment', 'Regulatory Filing'] 
  },
  { 
    name: 'CRM', 
    description: 'Customer Relations',
    features: ['Socmed Buzz', 'Campaign Blast', 'Event Visit'] 
  },
];

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col space-y-6 animate-in slide-in-from-right-8 duration-500 w-full mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-1">
         {/* Small Logo for continuity */}
        <div className="mx-auto w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg mb-3">
            <Zap size={16} fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Select a Department</h1>
        <p className="text-gray-500 text-xs max-w-xs mx-auto">
          Choose a department to submit your ticket.
        </p>
      </div>

      {/* Cards Container - Grid Layout */}
      {/* Use minmax to ensure cards don't get too squished */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
        {services.map((service, index) => (
          <div 
            key={service.name}
            className={`
              relative group rounded-xl p-4 transition-all duration-300 cursor-pointer
              bg-white text-gray-800 border border-gray-100 shadow-sm 
              hover:shadow-lg hover:bg-[#1e1b4b] hover:border-transparent hover:-translate-y-1 hover:scale-[1.02]
              flex flex-col h-full justify-between
            `}
            onClick={() => onSelect(service.name)}
          >
            <div>
                <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-white transition-colors">
                    {service.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 mt-0.5 group-hover:text-indigo-200 transition-colors">
                    {service.description}
                    </p>
                </div>
                {/* Icon */}
                <div className="text-right opacity-40 group-hover:opacity-80 group-hover:text-white transition-opacity">
                    <Zap className="w-4 h-4" />
                </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full my-3 bg-gray-100 group-hover:bg-indigo-800 transition-colors"></div>

                {/* Features List */}
                <ul className="space-y-1.5 mb-4">
                {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-[10px] font-medium">
                    <span className="mr-1.5 flex items-center justify-center w-3.5 h-3.5 rounded-full bg-green-100 text-green-600 group-hover:bg-indigo-500/30 group-hover:text-green-300 transition-colors flex-shrink-0">
                        <Check size={8} strokeWidth={4} />
                    </span>
                    <span className="text-gray-600 group-hover:text-indigo-100 transition-colors truncate">
                        {feature}
                    </span>
                    </li>
                ))}
                </ul>
            </div>

            <button
              className="w-full py-2 rounded-lg font-semibold text-xs flex items-center justify-center transition-colors bg-indigo-50 text-indigo-700 group-hover:bg-blue-500 group-hover:text-white mt-auto"
            >
              <span>Get Started</span>
              <ArrowRight size={14} className="ml-1.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
