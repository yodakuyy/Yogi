import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Twitter, Instagram, MessageCircle } from 'lucide-react';

const data = [
  { name: 'Apr', value: 4000 },
  { name: 'May', value: 3000 },
  { name: 'Jun', value: 5000 },
  { name: 'Jul', value: 2780 },
  { name: 'Aug', value: 1890 },
];

export const ShowcasePanel: React.FC = () => {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center p-12 text-white">
      
      {/* Background Geometric Shapes (Stairs effect) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 opacity-20 transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800 opacity-30 rounded-full blur-3xl"></div>
      
      {/* Decorative stair-steps in corners */}
      <div className="absolute top-[-10%] right-[-10%] opacity-10">
         <div className="w-64 h-64 border-4 border-white transform rotate-45 mb-[-100px] ml-[-100px]"></div>
         <div className="w-80 h-80 border-4 border-white transform rotate-45"></div>
      </div>
      <div className="absolute bottom-0 right-0">
          <div className="flex flex-col items-end">
             <div className="w-32 h-16 bg-[#2e229e]"></div>
             <div className="w-24 h-16 bg-[#251b85]"></div>
             <div className="w-16 h-16 bg-[#1e156b]"></div>
          </div>
      </div>

      {/* Main Composition */}
      <div className="relative w-full max-w-lg z-10 mb-12">
        
        {/* Floating Icon: Twitter */}
        <div className="absolute -top-12 left-12 bg-white p-3 rounded-full shadow-lg animate-float-slow z-20">
            <Twitter className="text-blue-400 w-6 h-6" fill="currentColor" />
        </div>

        {/* Floating Icon: Instagram */}
        <div className="absolute -top-20 right-24 bg-white p-3 rounded-full shadow-lg animate-float-medium z-20">
            <Instagram className="text-pink-500 w-6 h-6" />
        </div>

        {/* Floating Icon: Messenger */}
        <div className="absolute bottom-24 right-0 bg-white p-3 rounded-full shadow-lg animate-float-fast z-20">
             <div className="bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                 <MessageCircle className="text-white w-4 h-4" fill="currentColor" />
             </div>
        </div>

        {/* Card 1: Rewards (Top Right) */}
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-white p-5 rounded-2xl shadow-2xl w-48 text-gray-800 z-10 animate-float-slow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-gray-900">Rewards</h3>
            </div>
            <div className="flex flex-col items-center justify-center py-2">
                <div className="relative w-14 h-14 mb-2">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
                    </div>
                    {/* Progress arc simulation */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full border-r-2 border-b-2 border-indigo-600 rotate-45"></div>
                </div>
                <span className="text-xs text-gray-400">Points</span>
                <span className="text-lg font-bold text-gray-900">172,832</span>
            </div>
        </div>

        {/* Card 2: Chart (Bottom Left) */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-72 mt-20 relative z-0 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">$162,751</h2>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-1"></span>
                        <span>Monthly Growth</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block text-xs text-gray-400">Last year</span>
                    <span className="block text-sm font-bold text-indigo-600">$ 23,827</span>
                    <span className="block text-[10px] text-gray-400">August</span>
                </div>
            </div>
            
            <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#4F46E5" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-2 uppercase tracking-wide">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
            </div>

            {/* Floating Tooltip Mockup inside chart */}
             <div className="absolute top-1/2 left-1/2 bg-white p-2 rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2 border border-gray-100 hidden group-hover:block">
                 <span className="text-xs font-bold text-indigo-600">$ 23,827</span>
             </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center z-10 max-w-md mt-8">
        <h2 className="text-3xl font-bold mb-3">Turn your ideas<br/>into reality.</h2>
        <p className="text-indigo-200 text-sm font-light leading-relaxed mb-6">
            Consistent quality and experience across<br/>all platforms and devices.
        </p>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center space-x-2">
            <span className="w-6 h-1.5 bg-white rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50"></span>
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-50"></span>
        </div>
      </div>
    </div>
  );
};