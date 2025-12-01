import React, { useState, useEffect } from "react";
import { Calendar, LayoutGrid, Smile, Heart, User } from "lucide-react";

import { supabase } from "./supabaseClient";
import { MOOD_ICONS } from "./constants";

import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import Moods from "./pages/Moods.jsx";
import QuoteList from "./pages/QuoteList.jsx";
import QuoteDetail from "./pages/QuoteDetail.jsx";
import Favorites from "./pages/Favorites.jsx";
import About from "./pages/About.jsx";
import SplashScreen from "./pages/SplashScreen.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedParam, setSelectedParam] = useState(null);

  const [dailyQuote, setDailyQuote] = useState(null);
  const [detailQuote, setDetailQuote] = useState(null);

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [navHistory, setNavHistory] = useState([
    { page: "home", param: null },
  ]);

  // ================= LOAD FAVORITES =================
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favQuotes")) || [];
    setFavorites(saved);
  }, []);

  // ================= NAVIGATE =================
  const navigate = (page, param = null) => {
    window.scrollTo(0, 0);

    // Fix: param tidak boleh object
    if (typeof param === "object" && param !== null) {
      if (param.id) param = param.id;
      else if (param.category) param = param.category;
      else if (param.mood) param = param.mood;
      else param = String(param);
    }

    // Reset dataList supaya halaman baru tidak me-render data lama
    setDataList([]);

    // FIX SUPER PENTING:
    // Saat kembali ke categories atau moods → loading harus true
    if (page === "categories" || page === "moods") {
      setLoading(true);
    }

    const rootPages = ["home", "categories", "moods", "favorites", "about"];

    if (rootPages.includes(page)) {
      setNavHistory([{ page, param }]); // reset riwayat
    } else {
      setNavHistory((prev) => [...prev, { page, param }]); // tambah riwayat
    }

    setCurrentPage(page);
    setSelectedParam(param);
  };

  // ================= GO BACK =================
  const goBack = () => {
    if (navHistory.length > 1) {
      const newHistory = navHistory.slice(0, -1);
      const prev = newHistory[newHistory.length - 1];

      // Reset list saat kembali supaya tidak bawa data lama
      setDataList([]);

      // Kalau kembali ke categories/moods → loading ON
      if (prev.page === "categories" || prev.page === "moods") {
        setLoading(true);
      }

      setNavHistory(newHistory);
      setCurrentPage(prev.page);
      setSelectedParam(prev.param);
    } else {
      navigate("home");
    }
  };

  // ================= FAVORITES =================
  const toggleFavorite = (quote) => {
    let newFavs = [...favorites];
    const exists = newFavs.find((f) => f.id === quote.id);

    if (exists) newFavs = newFavs.filter((f) => f.id !== quote.id);
    else newFavs.push(quote);

    setFavorites(newFavs);
    localStorage.setItem("favQuotes", JSON.stringify(newFavs));
  };

  const isFavorite = (id) => favorites.some((f) => f.id === id);

  // ================= DATA FETCHING =================
  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        // HOME
        if (currentPage === "home") {
          const { data } = await supabase.from("quotes").select("*");
          if (!cancelled && data?.length > 0) {
            const today = new Date();
            const index =
              Math.floor(
                (today - new Date(today.getFullYear(), 0, 0)) / 86400000
              ) % data.length;
            setDailyQuote(data[index]);
          }
        }

        // CATEGORIES
        else if (currentPage === "categories") {
          const { data } = await supabase.from("quotes").select("category");
          if (!cancelled) {
            setDataList([...new Set(data.map((q) => q.category))]);
          }
        }

        // MOODS
        else if (currentPage === "moods") {
          const { data } = await supabase.from("quotes").select("mood");
          if (!cancelled) {
            setDataList([...new Set(data.map((q) => q.mood))]);
          }
        }

        // CATEGORY DETAIL
        else if (currentPage === "category-detail") {
          const { data } = await supabase
            .from("quotes")
            .select("*")
            .eq("category", selectedParam);
          if (!cancelled) setDataList(data || []);
        }

        // MOOD DETAIL
        else if (currentPage === "mood-detail") {
          const { data } = await supabase
            .from("quotes")
            .select("*")
            .eq("mood", selectedParam);
          if (!cancelled) setDataList(data || []);
        }

        // DETAIL PAGE
        else if (currentPage === "detail") {
          const { data } = await supabase
            .from("quotes")
            .select("*")
            .eq("id", selectedParam)
            .single();
          if (!cancelled) setDetailQuote(data);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        if (!cancelled) setTimeout(() => setLoading(false), 150);
      }
    };

    // Hanya fetch untuk halaman data
    if (!["favorites", "about"].includes(currentPage)) fetchData();
    else setLoading(false);

    return () => (cancelled = true);
  }, [currentPage, selectedParam]);

  // ================= RENDER CONTENT =================
  const renderContent = () => {
    if (loading) return <SplashScreen />;

    if (currentPage === "home")
      return (
        <Home
          dailyQuote={dailyQuote}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      );

    if (currentPage === "categories")
      return <Categories dataList={dataList} loading={loading} onNavigate={navigate} />;

    if (currentPage === "moods")
      return <Moods dataList={dataList} loading={loading} onNavigate={navigate} />;

    if (currentPage === "category-detail")
      return (
        <QuoteList
          title={`Kategori: ${selectedParam}`}
          dataList={dataList}
          loading={loading}
          onNavigate={navigate}
          onBack={goBack}
        />
      );

    if (currentPage === "mood-detail")
      return (
        <QuoteList
          title={`Mood: ${selectedParam} ${MOOD_ICONS[selectedParam] || ""}`}
          dataList={dataList}
          loading={loading}
          onNavigate={navigate}
          onBack={goBack}
        />
      );

    if (currentPage === "detail")
      return (
        <QuoteDetail
          quote={detailQuote}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
          onBack={goBack}
        />
      );

    if (currentPage === "favorites")
      return (
        <Favorites
          favorites={favorites}
          onNavigate={navigate}
          toggleFavorite={toggleFavorite}
        />
      );

    if (currentPage === "about") return <About />;

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

      <nav className="bg-white border-t fixed bottom-0 w-full h-16 flex justify-around items-center z-30 shadow-lg">
        {[
          { id: "home", icon: Calendar, label: "Harian" },
          { id: "categories", icon: LayoutGrid, label: "Kategori" },
          { id: "moods", icon: Smile, label: "Mood" },
          { id: "favorites", icon: Heart, label: "Disukai" },
          { id: "about", icon: User, label: "Profil" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => !loading && navigate(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition 
              ${currentPage === item.id ? "text-black font-semibold" : "text-gray-400 hover:text-black"} 
              ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
