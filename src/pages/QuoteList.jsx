import React from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function QuoteList({
  title,
  dataList,
  loading,
  onNavigate,
  onBack,
}) {
  if (loading)
    return (
      <div className="flex justify-center h-64 items-center text-indigo-600">
        <Loader2 className="animate-spin mr-2" />
        <span>Memuat...</span>
      </div>
    );

  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="mb-4 text-indigo-600 flex items-center gap-2 text-sm font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </button>

      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>

      <div className="space-y-3">
        {dataList.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            Tidak ada quote ditemukan.
          </p>
        ) : (
          dataList.map((q) => (
            <div
              key={q.id}
              onClick={() => onNavigate("detail", q.id)}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500 cursor-pointer hover:shadow-md transition"
            >
              <p className="text-gray-700 font-medium line-clamp-2">
                "{q.text}"
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-medium">
                  {q.mood || "Umum"}
                </span>

                <p className="text-xs text-gray-400 font-bold">- {q.author}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
