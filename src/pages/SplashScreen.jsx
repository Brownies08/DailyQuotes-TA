import React from 'react';
import { Loader2 } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in bg-gray-50">
      <div className="relative">
        {/* Lingkaran Background Berdenyut */}
        <div className="absolute inset-0 bg-gray-200 rounded-full animate-ping opacity-75 scale-110"></div>
        
        {/* Logo Gambar */}
        <div className="relative bg-white p-1 rounded-full shadow-xl z-10 w-32 h-32 flex items-center justify-center overflow-hidden border-4 border-white">
          <img 
            src="/icons/icon-512x512.png" 
            alt="Logo Aplikasi" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://placehold.co/512x512/black/white?text=Q"; }} // Fallback jika gambar error
          />
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wider">DAILY QUOTES</h1>
        <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm font-medium bg-white px-4 py-1 rounded-full shadow-sm border border-gray-100">
          <Loader2 className="w-4 h-4 animate-spin text-black" />
          <span>Menyiapkan inspirasi...</span>
        </div>
      </div>
    </div>
  );
}