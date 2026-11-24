import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MAP_LOCATIONS } from '../data/ocopData';
import { EcoMapLocation } from '../types';
import {
  MapPin,
  Calendar,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';

export const EcoMap: React.FC = () => {
  const { setTourModalOpen } = useApp();
  const [selectedSpot, setSelectedSpot] = useState<EcoMapLocation>(INITIAL_MAP_LOCATIONS[1]);

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sun" />
            <span>TÍNH NĂNG ĐIỂM CỘNG 2 CỦA ĐỀ BÀI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            Bản Đồ Số Nhà Vườn Kết Hợp Du Lịch Trải Nghiệm (K2)
          </h1>
          <p className="text-xs text-gray-500">
            Khám phá 5 điểm dừng chân sinh thái tại Vườn Chú Ba Tư (2.5ha tại Suối Tre, TP. Long Khánh)
          </p>
        </div>

        <button
          onClick={() => setTourModalOpen(true)}
          className="self-start sm:self-auto bg-sun hover:bg-amber-500 text-earth-dark font-black px-5 py-3 rounded-2xl text-xs sm:text-sm shadow transition flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Đặt Lịch Tour Trải Nghiệm (50k/vé)</span>
        </button>
      </div>

      {/* Main Map Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 aspect-[16/9] min-h-[380px] shadow-inner border border-green-700">
          {/* Subtle Grid / Farm Graphic Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8E6C9_1px,transparent_1px)] [background-size:24px_24px]"></div>

          {/* Natural Farm Landmarks SVG simulation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 100 350 Q 300 200, 500 280 T 900 150"
              fill="none"
              stroke="#66BB6A"
              strokeWidth="4"
              strokeDasharray="8 8"
              opacity="0.4"
            />
            <path
              d="M 200 450 Q 400 380, 600 420 T 1000 300"
              fill="none"
              stroke="#388E3C"
              strokeWidth="3"
              opacity="0.3"
            />
          </svg>

          {/* Compass Rose */}
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full text-white text-xs flex items-center gap-1.5 border border-white/10">
            <Compass className="w-4 h-4 text-sun animate-spin" />
            <span>Tọa độ: 10.9423° N, 107.2415° E</span>
          </div>

          {/* Interactive Pins */}
          {INITIAL_MAP_LOCATIONS.map((loc, idx) => {
            const isSelected = selectedSpot.id === loc.id;
            return (
              <div
                key={loc.id}
                style={{ left: loc.pos.x, top: loc.pos.y }}
                onClick={() => setSelectedSpot(loc)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-sm shadow-2xl transition-all duration-300 border-2 ${
                    isSelected
                      ? 'bg-sun text-earth-dark border-white scale-125 ring-4 ring-amber-400/50'
                      : 'bg-white text-green-900 border-green-400 hover:scale-110'
                  }`}
                >
                  {idx + 1}
                </div>
                <div
                  className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow backdrop-blur transition ${
                    isSelected
                      ? 'bg-sun text-earth-dark'
                      : 'bg-black/75 text-white opacity-85 group-hover:opacity-100'
                  }`}
                >
                  {loc.name.split('(')[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Spot Details Card */}
        <div className="bg-cream rounded-2xl p-6 border border-green-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-green-800 flex items-center justify-center shrink-0 border border-green-200 shadow-sm">
              <MapPin className="w-7 h-7 text-green-700" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                ĐIỂM TRẢI NGHIỆM ĐANG CHỌN
              </span>
              <h3 className="font-bold text-lg sm:text-xl text-ink">
                {selectedSpot.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl">
                {selectedSpot.desc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setTourModalOpen(true)}
            className="shrink-0 bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-1.5"
          >
            <span>Đặt Chỗ Đến Điểm Này</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
