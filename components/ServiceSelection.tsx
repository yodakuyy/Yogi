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
    name: 'Creative', 
    description: 'Design & Branding', 
    features: ['Brand Identity', 'UI/UX Design', 'Motion Graphics'],
    recommended: true
  },
  { 
    name: 'HCO', 
    description: 'Human Capital',
    features: ['Talent Acquisition', 'Employee Relations', 'Payroll Systems'] 
  },
  { 
    name: 'Legal', 
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
    <div className="flex flex-col space-y-8 animate-in slide-in-from-right-8 duration-500">
      
      {/* Header */}
      <div className="text-center space-y-2">
         {/* Small Logo for continuity */}
        <div className="mx-auto w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
            <Zap size={20} fill="currentColor" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Select a Service</h1>
        <p className="text-gray-500 text-sm max-w-xs mx-auto">
          Choose the department that suits you and your business best.
        </p>
      </div>

      {/* Cards Container - Vertical Stack for the side panel */}
      <div className="flex flex-col space-y-4 pb-8">
        {services.map((service) => (
          <div 
            key={service.name}
            className={`
              relative group rounded-2xl p-6 transition-all duration-300
              ${service.recommended 
                ? 'bg-[#1e1b4b] text-white shadow-xl scale-105 border-transparent' 
                : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1'
              }
            `}
          >
            {service.recommended && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                Recommended
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-xl font-bold ${service.recommended ? 'text-white' : 'text-gray-900'}`}>
                  {service.name}
                </h3>
                <p className={`text-xs ${service.recommended ? 'text-indigo-200' : 'text-gray-500'} mt-1`}>
                  {service.description}
                </p>
              </div>
              {/* Fake Pricing-like visual */}
              <div className={`text-right ${service.recommended ? 'opacity-80' : 'opacity-40'}`}>
                 <Zap className="w-5 h-5" />
              </div>
            </div>

            {/* Divider */}
            <div className={`h-px w-full my-4 ${service.recommended ? 'bg-indigo-800' : 'bg-gray-100'}`}></div>

            {/* Features List */}
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-xs font-medium">
                  <span className={`mr-2 flex items-center justify-center w-4 h-4 rounded-full ${service.recommended ? 'bg-indigo-500/30 text-green-300' : 'bg-green-100 text-green-600'}`}>
                     <Check size={10} strokeWidth={4} />
                  </span>
                  <span className={service.recommended ? 'text-indigo-100' : 'text-gray-600'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelect(service.name)}
              className={`
                w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center transition-colors
                ${service.recommended 
                  ? 'bg-blue-500 hover:bg-blue-400 text-white' 
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                }
              `}
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