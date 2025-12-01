import React from 'react';
import { Tag, Loader2 } from 'lucide-react';

export default function Categories({ dataList, loading, onNavigate }) {
  if (loading)
    return (
      <div className="flex justify-center h-64 items-center">
        <Loader2 className="animate-spin text-indigo-600" />
      </div>
    );

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold mb-4 px-2 text-gray-800">
        Jelajahi Kategori
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate("category-detail", String(item))}
            className="bg-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center flex flex-col items-center justify-center"
          >
            <Tag className="w-8 h-8 mb-2 opacity-80" />
            <span className="font-bold text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
