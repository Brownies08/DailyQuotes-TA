import React from 'react';
import { Quote, User } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in flex flex-col items-center pt-10">
      {/* Logo Aplikasi */}
      <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Quote className="text-white w-10 h-10 fill-current" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800">Daily Quotes App</h2>
      <p className="text-gray-500 text-sm mb-8">Versi 3.0 (React + Vite)</p>
      
      {/* Info Aplikasi */}
      <div className="bg-white w-full rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Tentang Aplikasi</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Daily Quotes adalah aplikasi Progressive Web App (PWA) modern yang dirancang untuk menemani hari-hari Anda dengan inspirasi tanpa batas. 
          Aplikasi ini dibangun ulang menggunakan React.js dan Vite untuk performa maksimal, serta terintegrasi dengan Supabase untuk data real-time.
        </p>
      </div>

      {/* Profil Pengembang */}
      <div className="bg-white w-full rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Profil Pengembang</h3>
        
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-gray-200 p-2 rounded-full">
            <User className="text-gray-600 w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold">Mahasiswa TI</p>
            <p className="text-xs text-gray-500">Pengembang Web</p>
          </div>
        </div>
        
        {/* Tambahkan info kontak jika perlu */}
        {/* <div className="flex items-center gap-4">
          <div className="bg-gray-200 p-2 rounded-full"><Mail className="text-gray-600 w-5 h-5" /></div>
          <div>
             <p className="text-sm font-bold">email@contoh.com</p>
             <p className="text-xs text-gray-500">Email</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}