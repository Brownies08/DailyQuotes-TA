import React from 'react';
import { Heart } from 'lucide-react';

export default function Favorites({ favorites, onNavigate, toggleFavorite, setDailyQuote }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold mb-4 px-2 text-gray-800">Koleksi Favorit</h2>
      
      {/* Kondisi jika belum ada favorit */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <Heart className="w-16 h-16 mb-4" />
          <p>Belum ada yang disukai.</p>
          <button 
            onClick={() => onNavigate('home')} 
            className="mt-4 text-indigo-600 font-semibold text-sm hover:underline"
          >
            Cari Quote
          </button>
        </div>
      ) : (
        /* Daftar Favorit */
        <div className="space-y-3">
          {favorites.map((q) => (
            <div 
              key={q.id} 
              className="bg-white p-4 rounded-lg shadow-sm relative overflow-hidden border border-gray-100 hover:shadow-md transition"
            >
              <div 
                onClick={() => { 
                  if(setDailyQuote) setDailyQuote(q); // Set quote agar detail page menampilkan data ini
                  onNavigate('detail', q.id); 
                }} 
                className="cursor-pointer pr-8"
              >
                <p className="text-gray-800 font-serif italic mb-2 line-clamp-2">"{q.text}"</p>
                <p className="text-xs text-indigo-600 font-bold">- {q.author}</p>
              </div>
              
              {/* Tombol Hapus Favorit */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Mencegah klik tembus ke detail
                  toggleFavorite(q);
                }} 
                className="absolute top-2 right-2 text-red-500 p-2 hover:scale-110 transition"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}