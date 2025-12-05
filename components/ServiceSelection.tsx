
import React from 'react';
import { Check, ArrowRight, Zap } from 'lucide-react';

interface ServiceSelectionProps {
  onSelect: (service: string) => void;
}

const services = [
  { 
    name: 'DIT', 
    description: 'Digital Infrastructure',
    features: ['Network Security', 'Hardware Support', 'Cloud Integration']
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
    features: ['Lead Management', 'Support Tickets', 'Analytics & Reports'] 
  },
];

export const ServiceSelection: React.FC<ServiceSelectionProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col space-y-8 animate-in slide-in-from-right-8 duration-500 w-full max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2">
         {/* Small Logo for continuity */}
        <div className="mx-auto w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
            <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Select a Department</h1>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          Choose a department to submit your ticket.
        </p>
      </div>

      {/* Cards Container - Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
        {services.map((service, index) => (
          <div 
            key={service.name}
            className={`
              relative group rounded-2xl p-6 transition-all duration-300 cursor-pointer
              bg-white text-gray-800 border border-gray-100 shadow-md 
              hover:shadow-xl hover:bg-[#1e1b4b] hover:border-transparent hover:-translate-y-1 hover:scale-[1.02]
              ${index === services.length - 1 ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''}
            `}
            onClick={() => onSelect(service.name)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 group-hover:text-indigo-200 transition-colors">
                  {service.description}
                </p>
              </div>
              {/* Icon */}
              <div className="text-right opacity-40 group-hover:opacity-80 group-hover:text-white transition-opacity">
                 <Zap className="w-5 h-5" />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full my-4 bg-gray-100 group-hover:bg-indigo-800 transition-colors"></div>

            {/* Features List */}
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-xs font-medium">
                  <span className="mr-2 flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-600 group-hover:bg-indigo-500/30 group-hover:text-green-300 transition-colors">
                     <Check size={10} strokeWidth={4} />
                  </span>
                  <span className="text-gray-600 group-hover:text-indigo-100 transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center transition-colors bg-indigo-50 text-indigo-700 group-hover:bg-blue-500 group-hover:text-white"
            >
              <span>Get Started</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
