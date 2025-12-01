import React from "react";
import { Loader2 } from "lucide-react";
import { MOOD_ICONS } from "../constants";

export default function Moods({ dataList, loading, onNavigate }) {
  if (loading)
    return (
      <div className="flex justify-center h-64 items-center">
        <Loader2 className="animate-spin text-indigo-600" />
      </div>
    );

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold mb-4 px-2 text-gray-800">
        Apa Mood Kamu?
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {dataList.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate("mood-detail", String(item))}
            className="bg-white rounded-xl p-6 shadow-sm border hover:border-indigo-400 transition cursor-pointer flex flex-col items-center justify-center text-center"
          >
            <div className="text-4xl mb-3">{MOOD_ICONS[item] || "✨"}</div>
            <span className="font-bold text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
