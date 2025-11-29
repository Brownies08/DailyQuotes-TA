import React from 'react';
import { Tag, Loader2 } from 'lucide-react';

export default function Categories({ dataList, loading, onNavigate }) {
  if (loading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold mb-4 px-2 text-gray-800">Jelajahi Kategori</h2>
      <div className="grid grid-cols-2 gap-4">
        {dataList.map((item, idx) => {
          const colors = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-orange-100 text-orange-600', 'bg-pink-100 text-pink-600', 'bg-teal-100 text-teal-600'];
          return (
            <div key={idx} onClick={() => onNavigate('category-detail', item)} className={`${colors[idx % colors.length]} p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center justify-center aspect-square text-center`}>
              <Tag className="w-8 h-8 mb-2 opacity-80" />
              <span className="font-bold text-sm">{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}