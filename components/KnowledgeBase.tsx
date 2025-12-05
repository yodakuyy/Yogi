
import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface Category {
  id: number;
  title: string;
  description: string;
  articles: number;
  questions: number;
  active?: boolean;
}

const categories: Category[] = [
  { id: 1, title: 'Sign Up', description: 'Description of signup process of acquire.io', articles: 12, questions: 6 },
  { id: 2, title: 'Getting Started', description: 'Answers & articles related to getting started.', articles: 2, questions: 0, active: true },
  { id: 3, title: 'How to setup triggers', description: 'Articles & Questions related to triggers & campaigns', articles: 12, questions: 6 },
  { id: 4, title: 'Dashboard', description: 'Triggers articles & videos', articles: 12, questions: 6 },
  { id: 5, title: 'Billing, packages and Upgrade', description: 'Information related to Invoices & billings', articles: 9, questions: 12 },
  { id: 6, title: 'Chatbot', description: 'All information about Sales & Support bot', articles: 105, questions: 1297 },
  { id: 7, title: 'Analytics', description: 'How can a customer measure performance of chats', articles: 5, questions: 26 },
  { id: 8, title: 'Profile Management', description: 'Articles about profiles & customer information', articles: 95, questions: 873 },
  { id: 9, title: 'Integration', description: 'All integration and app store articles', articles: 10, questions: 0 },
  { id: 10, title: 'Settings', description: 'Contain all settings like agent, chat, bot, sales etc', articles: 50, questions: 6 },
  { id: 11, title: 'Others', description: 'No Description', articles: 12, questions: 70 },
  { id: 12, title: 'Support Automation', description: 'No Description', articles: 1345, questions: 190 },
];

export const KnowledgeBase: React.FC = () => {
  return (
    <div className="h-full flex flex-col p-2">
       {/* Header */}
       <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Manage Knowledge Base Categories</h1>
            <p className="text-gray-500 mt-1 text-sm">Manage your categories, so you can easily differentiate your knowledge base articles.</p>
          </div>
          <button className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
            Create New Category
          </button>
       </div>

       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-8 pr-2 custom-scrollbar">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className={`
                bg-white p-6 rounded-xl border transition-all duration-200 cursor-pointer group relative flex flex-col justify-between min-h-[180px]
                ${cat.active ? 'border-blue-400 ring-2 ring-blue-100 shadow-lg scale-[1.02]' : 'border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1'}
              `}
            >
               <div className="absolute top-4 right-4 text-gray-300 group-hover:text-gray-500 transition-colors p-1 hover:bg-gray-50 rounded">
                  <MoreHorizontal size={20} />
               </div>
               
               <div>
                 <h3 className="font-bold text-gray-800 text-base mb-2 pr-6">{cat.title}</h3>
                 <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                   {cat.description}
                 </p>
               </div>
               
               <div className="flex items-center gap-4 pt-4 mt-4 border-t border-dashed border-gray-100">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mb-0.5">
                       {String(cat.articles).padStart(2, '0')} Articles
                     </span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full w-fit mb-0.5">
                       {String(cat.questions).padStart(2, '0')} Bot Questions
                     </span>
                  </div>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};
