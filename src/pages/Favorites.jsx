import React from "react";
import { Heart } from "lucide-react";

export default function Favorites({ favorites, onNavigate, toggleFavorite }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold mb-4 px-2 text-gray-800">
        Koleksi Favorit
      </h2>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <Heart className="w-16 h-16 mb-4" />
          <p>Belum ada yang disukai.</p>

          <button
            onClick={() => onNavigate("home")}
            className="mt-4 text-indigo-600 font-semibold hover:underline"
          >
            Cari Quote
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {favorites.map((q) => (
            <div
              key={q.id}
              onClick={() => onNavigate("detail", q.id)}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md cursor-pointer relative"
            >
              <p className="text-gray-800 italic mb-2 line-clamp-2">
                "{q.text}"
              </p>

              <p className="text-xs text-indigo-600 font-bold">- {q.author}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(q);
                }}
                className="absolute top-2 right-2 text-red-500"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
