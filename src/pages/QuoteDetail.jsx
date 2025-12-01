import React from 'react';
import { ArrowLeft, Quote, Heart, Loader2 } from 'lucide-react';
import { MOOD_ICONS } from '../constants';

export default function QuoteDetail({ quote, loading, toggleFavorite, isFavorite, onBack }) {

  if (loading) {
    return (
      <div className="flex justify-center h-64 items-center text-indigo-600">
        <Loader2 className="animate-spin mr-2" />
        <span>Memuat...</span>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="animate-fade-in h-full flex flex-col">

      <button
        onClick={onBack}
        className="mb-4 text-indigo-600 flex items-center gap-2 text-sm font-semibold w-fit hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>

      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white rounded-2xl shadow-lg my-4 relative border border-gray-100">

        <div className="absolute top-4 right-4 text-2xl">
          {MOOD_ICONS[quote.mood] || '✨'}
        </div>

        <Quote className="text-indigo-100 w-16 h-16 absolute top-6 left-6 fill-current" />

        <p className="text-2xl font-serif text-gray-800 text-center italic leading-relaxed px-4">
          "{quote.text}"
        </p>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold text-indigo-600">{quote.author}</h3>

          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full mt-2 font-medium">
            {quote.category}
          </span>
        </div>

      </div>

      <div className="mt-6 flex gap-4 justify-center">
        <button
          onClick={() => toggleFavorite(quote)}
          className="bg-white p-4 rounded-full shadow-md text-red-500 hover:bg-red-50 hover:scale-110 transition-transform border border-gray-100"
        >
          <Heart className={`w-8 h-8 ${isFavorite(quote.id) ? 'fill-current' : ''}`} />
        </button>
      </div>

    </div>
  );
}
