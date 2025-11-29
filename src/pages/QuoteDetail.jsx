import React from 'react';
import { ArrowLeft, Quote, Heart, Loader2 } from 'lucide-react';
// Pastikan path ini sesuai dengan file constants.js Anda
import { MOOD_ICONS } from '../constants';

export default function QuoteDetail({ quote, loading, toggleFavorite, isFavorite, onBack }) {
  // Tampilkan loading spinner
  if (loading) {
    return (
      <div className="flex justify-center h-64 items-center text-indigo-600">
        <Loader2 className="animate-spin mr-2" />
        <span>Memuat...</span>
      </div>
    );
  }
  
  // Jika data quote tidak ada
  if (!quote) return null;

  return (
    <div className="animate-fade-in h-full flex flex-col">
      {/* Tombol Kembali */}
      <button 
        onClick={onBack} 
        className="mb-4 text-indigo-600 flex items-center gap-2 text-sm font-semibold w-fit hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>
      
      {/* Kartu Detail */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white rounded-2xl shadow-lg my-4 relative border border-gray-100 transition-all duration-500 hover:shadow-xl">
        {/* Ikon Mood di pojok kanan atas */}
        <div className="absolute top-4 right-4 text-2xl animate-bounce-slow cursor-help" title={`Mood: ${quote.mood}`}>
          {MOOD_ICONS[quote.mood] || '✨'}
        </div>
        
        {/* Ikon Kutip Pembuka */}
        <Quote className="text-indigo-100 w-16 h-16 absolute top-6 left-6 fill-current" />
        
        {/* Teks Kutipan */}
        <p className="text-2xl font-serif text-gray-800 text-center relative z-10 italic leading-relaxed px-4">
          "{quote.text}"
        </p>
        
        {/* Info Penulis & Kategori */}
        <div className="mt-8 text-center z-10">
          <h3 className="text-xl font-bold text-indigo-600">{quote.author}</h3>
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full mt-2 font-medium border border-indigo-100">
            {quote.category}
          </span>
        </div>
        
        {/* Ikon Kutip Penutup */}
        <Quote className="text-indigo-100 w-16 h-16 absolute bottom-6 right-6 fill-current transform rotate-180" />
      </div>
      
      {/* Tombol Favorit Besar */}
      <div className="mt-6 flex gap-4 justify-center">
        <button 
          onClick={() => toggleFavorite(quote)} 
          className="bg-white p-4 rounded-full shadow-md text-red-500 hover:bg-red-50 hover:scale-110 transition-transform duration-300 w-16 h-16 flex items-center justify-center border border-gray-100"
        >
          <Heart className={`w-8 h-8 ${isFavorite(quote.id) ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}