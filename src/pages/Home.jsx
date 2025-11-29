import React from 'react';
import { Gift, Quote, Heart, Loader2 } from 'lucide-react';

export default function Home({ dailyQuote, loading, toggleFavorite, isFavorite }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-indigo-600">
        <Loader2 className="animate-spin mr-2" /> <span>Memuat...</span>
      </div>
    );
  }

  if (!dailyQuote) return <div className="text-center p-10 text-gray-500">Data tidak tersedia. Cek koneksi.</div>;

  const dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in pb-10">
      <div className="text-center mb-6">
        <p className="text-gray-500 text-sm uppercase tracking-wide">Quote of the Day</p>
        <h2 className="text-indigo-600 font-bold text-lg">{dateStr}</h2>
      </div>
      
      <div className="group w-full max-w-sm h-80 perspective-1000 cursor-pointer" onClick={(e) => e.currentTarget.firstChild.classList.toggle('rotate-y-180')}>
        <div className="card-inner relative w-full h-full text-center transition-transform duration-700 transform-style-3d shadow-xl rounded-2xl">
          {/* Depan */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex flex-col justify-center items-center p-6">
            <Gift className="w-12 h-12 mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold">Kutipan Hari Ini</h3>
            <p className="mt-2 text-indigo-100 text-sm">Ketuk kartu untuk membuka</p>
          </div>
          {/* Belakang */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white text-gray-800 rounded-2xl border border-indigo-100 flex flex-col justify-center items-center p-8 shadow-inner">
            <Quote className="text-indigo-200 w-10 h-10 self-start -mt-4 fill-current" />
            <p className="text-lg font-medium italic my-4 leading-relaxed line-clamp-4">"{dailyQuote.text}"</p>
            <p className="text-indigo-600 font-bold self-end mt-auto">- {dailyQuote.author}</p>
            <div className="mt-4 flex gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(dailyQuote); }} 
                className="text-red-500 hover:scale-110 transition p-2"
              >
                <Heart className={`w-6 h-6 ${isFavorite(dailyQuote.id) ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-8 text-gray-400 text-xs">Tap kartu untuk melihat</p>
    </div>
  );
}