import React, { useState, useEffect } from 'react';
import { Calendar, LayoutGrid, Smile, Heart, User } from 'lucide-react';

import { supabase } from './supabaseClient';
import { MOOD_ICONS } from './constants';

import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
import Moods from './pages/Moods.jsx';
import QuoteList from './pages/QuoteList.jsx';
import QuoteDetail from './pages/QuoteDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import About from './pages/About.jsx';
import SplashScreen from './pages/SplashScreen.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedParam, setSelectedParam] = useState(null);
  const [dailyQuote, setDailyQuote] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
  // State Riwayat Navigasi
  const [navHistory, setNavHistory] = useState([{ page: 'home', param: null }]);

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem('favQuotes')) || [];
    setFavorites(savedFavs);
  }, []);

  // --- NAVIGASI MAJU ---
  const navigate = (page, param = null) => {
    window.scrollTo(0, 0);
    const rootPages = ['home', 'categories', 'moods', 'favorites', 'about'];

    if (rootPages.includes(page)) {
      setNavHistory([{ page, param }]); // Reset jika ke menu utama
    } else {
      setNavHistory(prev => [...prev, { page, param }]); // Tumpuk jika ke sub-halaman
    }

    setCurrentPage(page);
    setSelectedParam(param);
  };

  // --- NAVIGASI MUNDUR (LOGIC DIPERKUAT) ---
  const goBack = () => {
    console.log("Tombol Kembali ditekan. History saat ini:", navHistory);

    if (navHistory.length > 1) {
      // Ambil semua kecuali yang terakhir
      const newHistory = navHistory.slice(0, -1);
      // Ambil halaman paling belakang yang baru
      const prevPage = newHistory[newHistory.length - 1];

      if (prevPage) {
        setNavHistory(newHistory);
        setCurrentPage(prevPage.page);
        setSelectedParam(prevPage.param);
        window.scrollTo(0, 0);
      } else {
        navigate('home'); // Fallback ke Home
      }
    } else {
      console.log("History kosong, kembali ke Home");
      navigate('home'); // Fallback ke Home
    }
  };

  const toggleFavorite = (quote) => {
    let newFavs = [...favorites];
    const exists = newFavs.find(f => f.id === quote.id);
    if (exists) {
      newFavs = newFavs.filter(f => f.id !== quote.id);
    } else {
      newFavs.push(quote);
    }
    setFavorites(newFavs);
    localStorage.setItem('favQuotes', JSON.stringify(newFavs));
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (currentPage === 'home') {
          const { data } = await supabase.from('quotes').select('*');
          if (data && data.length > 0) {
            const today = new Date();
            const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            const index = dayOfYear % data.length;
            setDailyQuote(data[index]);
          }
        } 
        else if (currentPage === 'categories') {
          const { data } = await supabase.from('quotes').select('category');
          if (data) {
            const uniqueCats = [...new Set(data.map(q => q.category))];
            setDataList(uniqueCats);
          }
        }
        else if (currentPage === 'moods') {
          const { data } = await supabase.from('quotes').select('mood');
          if (data) {
            const uniqueMoods = [...new Set(data.map(q => q.mood))];
            setDataList(uniqueMoods);
          }
        }
        else if (currentPage === 'category-detail') {
          const { data } = await supabase.from('quotes').select('*').eq('category', selectedParam);
          setDataList(data || []);
        }
        else if (currentPage === 'mood-detail') {
          const { data } = await supabase.from('quotes').select('*').eq('mood', selectedParam);
          setDataList(data || []);
        }
        else if (currentPage === 'detail') {
          // Jika dailyQuote sudah ada dan ID-nya sama, pakai yang ada (hemat API)
          if (!dailyQuote || dailyQuote.id !== selectedParam) {
             const { data } = await supabase.from('quotes').select('*').eq('id', selectedParam).single();
             if(data) setDailyQuote(data);
          }
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, [currentPage, selectedParam]);

  // --- RENDER CONTENT ---
  const renderContent = () => {
    if (loading) return <SplashScreen />;

    if (currentPage === 'home') return <Home dailyQuote={dailyQuote} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />;
    if (currentPage === 'categories') return <Categories dataList={dataList} onNavigate={navigate} />;
    if (currentPage === 'moods') return <Moods dataList={dataList} onNavigate={navigate} />;
    
    // NAVIGASI LIST: Back -> Kembali ke Menu Utama
    if (currentPage === 'category-detail') {
      return <QuoteList title={`Kategori: ${selectedParam}`} dataList={dataList} onNavigate={navigate} onBack={() => navigate('categories')} />;
    }
    
    if (currentPage === 'mood-detail') {
      return <QuoteList title={`Mood: ${selectedParam} ${MOOD_ICONS[selectedParam] || ''}`} dataList={dataList} onNavigate={navigate} onBack={() => navigate('moods')} />;
    }
    
    // NAVIGASI DETAIL: Back -> Gunakan goBack (Mundur 1 langkah)
    if (currentPage === 'detail') {
      return <QuoteDetail quote={dailyQuote} toggleFavorite={toggleFavorite} isFavorite={isFavorite} onBack={goBack} />;
    }
    
    if (currentPage === 'favorites') return <Favorites favorites={favorites} onNavigate={navigate} toggleFavorite={toggleFavorite} setDailyQuote={setDailyQuote} />;
    if (currentPage === 'about') return <About />;
    
    return null;
  };

  return (
    <div className="text-gray-800 h-screen flex flex-col overflow-hidden bg-gray-50 font-sans">
      <header className="bg-black text-white p-4 shadow-md z-20 flex justify-between items-center">
        <h1 className="text-lg font-bold">Daily Quotes</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 pb-24 relative">
        {renderContent()}
      </main>

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full h-16 flex justify-around items-center z-30 shadow-lg">
        {[
          { id: 'home', icon: Calendar, label: 'Harian' },
          { id: 'categories', icon: LayoutGrid, label: 'Kategori' },
          { id: 'moods', icon: Smile, label: 'Mood' },
          { id: 'favorites', icon: Heart, label: 'Disukai' },
          { id: 'about', icon: User, label: 'Profil' }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => !loading && navigate(item.id)} 
            className={`flex flex-col items-center justify-center w-full h-full transition ${currentPage === item.id || (currentPage.includes(item.id) && item.id !== 'home') ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </nav>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}