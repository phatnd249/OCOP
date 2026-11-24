import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MAP_LOCATIONS } from '../data/ocopData';
import { EcoMapLocation } from '../types';
import {
  Compass,
  Sparkles
} from 'lucide-react';

export const EcoMap: React.FC = () => {
  const { setTourModalOpen, showNotification } = useApp();
  const [selectedSpot, setSelectedSpot] = useState<EcoMapLocation>(INITIAL_MAP_LOCATIONS[1]);

  const handleSpotClick = (loc: EcoMapLocation) => {
    setSelectedSpot(loc);
    // Khi chọn vào 1 ô điểm bất kỳ muốn đi sẽ hiện đặt lịch đến nơi
    setTourModalOpen(true);
    showNotification(`Đang mở đặt lịch ghé thăm: ${loc.name}`);
  };

  return (
    <div className="space-y-8">
      {/* Title (Đã bỏ button đặt lịch bên phải) */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
          <Sparkles className="w-3.5 h-3.5 text-sun" />
          <span>DU LỊCH NÔNG NGHIỆP TRẢI NGHIỆM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-ink">
          Bản Đồ Nhà Vườn Sinh Thái
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Bấm trực tiếp vào các điểm trên bản đồ để xem thông tin và đặt lịch đến vườn trải nghiệm
        </p>
      </div>

      {/* Main Map Box (Đã bỏ phần chi tiết bên dưới bản đồ) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-green-200 shadow-soft">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 aspect-[16/9] min-h-[420px] shadow-inner border border-green-700">
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
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full text-white text-xs flex items-center gap-1.5 border border-white/10 z-10">
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
                onClick={() => handleSpotClick(loc)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                title={`Bấm để đặt lịch đến ${loc.name}`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-sm sm:text-base shadow-2xl transition-all duration-300 border-2 ${isSelected
                      ? 'bg-sun text-earth-dark border-white scale-125 ring-4 ring-amber-400/50'
                      : 'bg-white text-green-900 border-green-400 hover:scale-110'
                    }`}
                >
                  {idx + 1}
                </div>
                <div
                  className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg shadow backdrop-blur transition ${isSelected
                      ? 'bg-sun text-earth-dark ring-2 ring-white/60'
                      : 'bg-black/80 text-white group-hover:bg-green-800'
                    }`}
                >
                  {loc.name.split('(')[0]}
                  <span className="block text-[9px] font-normal text-amber-200">Bấm để đặt lịch</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
