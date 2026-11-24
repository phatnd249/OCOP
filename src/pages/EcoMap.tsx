import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MAP_LOCATIONS } from '../data/ocopData';
import { EcoMapLocation } from '../types';
import {
  Compass,
  Sparkles,
  Calendar,
  Minus,
  Plus,
  CheckCircle2,
  ShieldCheck,
  X
} from 'lucide-react';

export const EcoMap: React.FC = () => {
  const { showNotification } = useApp();
  const [selectedSpot, setSelectedSpot] = useState<EcoMapLocation | null>(null);

  // Form đặt lịch
  const [date, setDate] = useState('2026-11-28');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState('Anh Tuấn');
  const [phone, setPhone] = useState('0909123456');

  const PRICE_PER_GUEST = 50000;
  const totalPrice = guests * PRICE_PER_GUEST;

  const handleSpotClick = (loc: EcoMapLocation) => {
    setSelectedSpot(loc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpot) return;
    showNotification(
      `🎉 Đã đặt lịch ghé thăm "${selectedSpot.name}" ngày ${date} cho ${guests} người thành công! Chủ vườn sẽ liên hệ đón tiếp bạn.`
    );
    setSelectedSpot(null);
  };

  const selectedSpotIndex = selectedSpot
    ? INITIAL_MAP_LOCATIONS.findIndex(l => l.id === selectedSpot.id) + 1
    : 0;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
          <Sparkles className="w-3.5 h-3.5 text-sun" />
          <span>DU LỊCH NÔNG NGHIỆP TRẢI NGHIỆM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-ink">
          Bản Đồ Nhà Vườn Sinh Thái Long Khánh
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Bấm chọn vào các số thứ tự trên bản đồ để mở khung đặt lịch ghé thăm hiển thị ngay chính giữa trang.
        </p>
      </div>

      {/* Main Map Box */}
      <div className="bg-white rounded-3xl p-3 sm:p-5 border border-green-200 shadow-soft relative">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 min-h-[540px] sm:min-h-[600px] shadow-inner border border-green-700">
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
            const isSelected = selectedSpot?.id === loc.id;
            const spotNum = idx + 1;

            return (
              <div
                key={loc.id}
                style={{ left: loc.pos.x, top: loc.pos.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                {/* Nút Pin tròn số thứ tự */}
                <button
                  type="button"
                  onClick={() => handleSpotClick(loc)}
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center font-black text-sm sm:text-base shadow-2xl transition-all duration-300 border-2 cursor-pointer ${
                    isSelected
                      ? 'bg-sun text-earth-dark border-white scale-125 ring-4 ring-amber-400/80 shadow-amber-900/50'
                      : 'bg-white text-green-900 border-green-400 hover:scale-110 hover:bg-green-50'
                  }`}
                  title={`Bấm để chọn ${loc.name}`}
                >
                  {spotNum}
                </button>

                {/* Nhãn tên điểm bên dưới pin */}
                <div
                  onClick={() => handleSpotClick(loc)}
                  className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold px-2 py-0.5 rounded-md shadow backdrop-blur transition cursor-pointer ${
                    isSelected
                      ? 'bg-sun text-earth-dark ring-2 ring-white/60'
                      : 'bg-black/80 text-white hover:bg-green-800'
                  }`}
                >
                  {loc.name.split('(')[0]}
                </div>
              </div>
            );
          })}

          {/* KHUNG ĐẶT LỊCH HIỂN THỊ NGAY Ở CHÍNH GIỮA TRANG / BẢN ĐỒ KHI BẤM CHỌN SỐ */}
          {selectedSpot && (
            <div 
              className="fixed sm:absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-fadeIn overflow-y-auto"
              onClick={() => setSelectedSpot(null)}
            >
              <div
                className="w-full max-w-lg bg-white rounded-3xl p-4 sm:p-7 border-2 border-green-500 shadow-2xl text-ink z-50 animate-scaleUp my-auto max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Header Card giữa màn hình */}
                <div className="flex items-start justify-between gap-2.5 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-sun text-earth-dark flex items-center justify-center font-black text-base sm:text-lg shadow-sm shrink-0">
                      {selectedSpotIndex}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-full inline-block mb-0.5">
                        ĐIỂM NHÀ VƯỜN ĐANG CHỌN
                      </span>
                      <h3 className="text-sm sm:text-lg font-black text-ink leading-tight truncate">
                        {selectedSpot.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1 sm:line-clamp-2 mt-0.5">
                        {selectedSpot.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="bg-[#f0fdf4] border border-green-200 rounded-xl px-3 py-1 text-right">
                      <span className="text-[10px] text-gray-400 block">Vé trải nghiệm:</span>
                      <span className="text-xs sm:text-sm font-black text-green-800 whitespace-nowrap">
                        50.000 đ
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedSpot(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-red-600 flex items-center justify-center transition"
                      title="Đóng"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Form đặt lịch trực tiếp */}
                <form onSubmit={handleSubmit} className="space-y-3.5 pt-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Ngày ghé thăm */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-green-700" />
                        <span>Ngày ghé thăm:</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-full px-3.5 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[44px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
                        required
                      />
                    </div>

                    {/* Cụm nút [-] Số khách [+] */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Số lượng khách (người lớn):
                      </label>
                      <div className="flex items-center justify-between bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[44px] px-2 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                          className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:scale-95 flex items-center justify-center font-bold text-sm transition shadow-xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-black text-xs sm:text-sm text-green-950 px-2">
                          {guests} <span className="text-[11px] font-normal text-gray-500">khách</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setGuests(prev => Math.min(50, prev + 1))}
                          className="w-8 h-8 rounded-lg bg-green-700 text-white hover:bg-green-800 active:scale-95 flex items-center justify-center font-bold text-sm transition shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Họ tên */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Họ tên người đại diện:
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full px-3.5 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[44px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
                        required
                      />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Số điện thoại liên hệ:
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Ví dụ: 0918.xxx.xxx"
                        className="w-full px-3.5 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[44px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Khung Tạm tính & Cam kết */}
                  <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 rounded-2xl border border-green-200 p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-700 block">
                          Tạm tính phí trải nghiệm:
                        </span>
                        <span className="text-[11px] text-gray-400">
                          ({guests} khách x {PRICE_PER_GUEST.toLocaleString('vi-VN')} đ)
                        </span>
                      </div>
                      <span className="font-black text-xl text-[#156b3b]">
                        {totalPrice.toLocaleString('vi-VN')} đ
                      </span>
                    </div>

                    <div className="pt-2 border-t border-green-200/60 text-[11px] text-gray-600 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-green-700 shrink-0" />
                      <span>Hái ăn tại gốc bao ngon • Miễn phí hủy đổi lịch • Trẻ &lt;6t miễn phí</span>
                    </div>
                  </div>

                  {/* 2 nút hành động: Đóng & Xác nhận */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedSpot(null)}
                      className="w-1/3 h-[46px] rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition"
                    >
                      Đóng
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-[46px] rounded-xl bg-[#156b3b] hover:bg-green-800 active:scale-[0.99] text-white font-black text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Xác Nhận Đặt Lịch Điểm #{selectedSpotIndex}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
