import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MAP_LOCATIONS } from '../data/ocopData';
import { EcoMapLocation } from '../types';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Minus,
  Plus,
  CheckCircle2,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export const EcoMap: React.FC = () => {
  const { showNotification } = useApp();
  const [selectedSpot, setSelectedSpot] = useState<EcoMapLocation>(INITIAL_MAP_LOCATIONS[1]);

  // Form đặt lịch trực tiếp
  const [date, setDate] = useState('2026-11-28');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState('Anh Tuấn');
  const [phone, setPhone] = useState('0909123456');

  const PRICE_PER_GUEST = 50000;
  const totalPrice = guests * PRICE_PER_GUEST;

  const handleSpotClick = (loc: EcoMapLocation) => {
    setSelectedSpot(loc);
    showNotification(`Đã chọn: ${loc.name}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification(
      `🎉 Đã đặt lịch ghé thăm "${selectedSpot.name}" ngày ${date} cho ${guests} người thành công! Chủ vườn sẽ liên hệ đón tiếp bạn.`
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
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
          Bấm chọn vào số thứ tự trên bản đồ để chọn điểm đến, thông tin vườn và form đặt lịch sẽ tự động cập nhật ngay bên dưới.
        </p>
      </div>

      {/* Main Map Box */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-green-200 shadow-soft">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-800 via-green-900 to-emerald-950 aspect-[16/9] min-h-[400px] shadow-inner border border-green-700">
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
                title={`Bấm chọn ${loc.name}`}
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-black text-sm sm:text-base shadow-2xl transition-all duration-300 border-2 ${
                    isSelected
                      ? 'bg-sun text-earth-dark border-white scale-125 ring-4 ring-amber-400/60'
                      : 'bg-white text-green-900 border-green-400 hover:scale-110'
                  }`}
                >
                  {idx + 1}
                </div>
                <div
                  className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-lg shadow backdrop-blur transition ${
                    isSelected
                      ? 'bg-sun text-earth-dark ring-2 ring-white/60'
                      : 'bg-black/80 text-white group-hover:bg-green-800'
                  }`}
                >
                  {loc.name.split('(')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KHU VỰC ĐẶT LỊCH TRỰC TIẾP THEO ĐIỂM SỐ ĐANG CHỌN (KHÔNG CẦN POPUP) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Header thông tin điểm nhà vườn đang chọn */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sun text-earth-dark flex items-center justify-center text-xl font-black shadow-sm shrink-0">
                {INITIAL_MAP_LOCATIONS.findIndex(l => l.id === selectedSpot.id) + 1}
              </div>
              <div>
                <span className="text-[11px] font-bold text-green-800 bg-green-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  ĐIỂM NHÀ VƯỜN ĐANG CHỌN
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-ink leading-tight">
                  {selectedSpot.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedSpot.desc}
                </p>
              </div>
            </div>

            {/* Thẻ giá vé */}
            <div className="bg-[#f0fdf4] border border-green-200 rounded-2xl px-4 py-2.5 text-right self-start md:self-auto shrink-0">
              <span className="text-xs text-gray-500 block">Vé trải nghiệm:</span>
              <span className="text-lg font-black text-green-800">
                50.000 đ <span className="text-xs font-normal text-gray-500">/ khách</span>
              </span>
            </div>
          </div>

          {/* Form nhập liệu trực tiếp (Khung viền rõ nét, nút to rõ) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cột 1: Ngày ghé thăm */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-green-700" />
                <span>Ngày ghé thăm:</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[48px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
                required
              />
            </div>

            {/* Cột 2: Cụm nút to rõ [-] Số khách [+] */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Số lượng khách (người lớn):
              </label>
              <div className="flex items-center justify-between bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[48px] px-2 shadow-sm">
                <button
                  type="button"
                  onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                  className="w-10 h-9 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:scale-95 flex items-center justify-center font-bold text-lg transition shadow-xs"
                  title="Giảm 1 người"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="font-black text-base sm:text-lg text-green-950 px-3">
                  {guests} <span className="text-xs font-normal text-gray-500">người (Trẻ em &lt;6t miễn phí)</span>
                </div>

                <button
                  type="button"
                  onClick={() => setGuests(prev => Math.min(50, prev + 1))}
                  className="w-10 h-9 rounded-lg bg-green-700 text-white hover:bg-green-800 active:scale-95 flex items-center justify-center font-bold text-lg transition shadow-xs"
                  title="Thêm 1 người"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Cột 3: Họ tên đại diện */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Họ và tên người đại diện:
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full px-4 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[48px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
                required
              />
            </div>

            {/* Cột 4: Số điện thoại */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Số điện thoại liên hệ xác nhận:
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Ví dụ: 0918.xxx.xxx"
                className="w-full px-4 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[48px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
                required
              />
            </div>
          </div>

          {/* Khung tổng tiền tạm tính & Cam kết dịch vụ nhà vườn */}
          <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 rounded-2xl border border-green-200 p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs sm:text-sm font-bold text-gray-700 block">
                  Tạm tính phí trải nghiệm:
                </span>
                <span className="text-xs text-gray-500 font-normal">
                  ({guests} khách x {PRICE_PER_GUEST.toLocaleString('vi-VN')} đ) • Thanh toán trực tiếp tại cổng vườn
                </span>
              </div>
              <span className="font-black text-2xl sm:text-3xl text-[#156b3b] tracking-tight">
                {totalPrice.toLocaleString('vi-VN')} đ
              </span>
            </div>

            {/* Cam kết của nhà vườn */}
            <div className="pt-3 border-t border-green-200/70 text-xs text-green-950 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-green-900">
                <ShieldCheck className="w-4 h-4 text-green-700 shrink-0" />
                <span>Cam kết trải nghiệm nông nghiệp sinh thái chuẩn OCOP Đồng Nai:</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pl-6 list-disc text-gray-600 text-[11px] sm:text-xs">
                <li>100% trái chín tự nhiên hái ăn tại gốc, bao ngọt ngon chuẩn vị vườn</li>
                <li>Đoàn viên thanh niên địa phương và chủ vườn trực tiếp đồng hành hướng dẫn</li>
                <li>Hủy hoặc đổi ngày hoàn toàn miễn phí, không phát sinh bất kỳ phụ phí nào</li>
              </ul>
            </div>
          </div>

          {/* Nút gửi form chốt lịch */}
          <button
            type="submit"
            className="w-full h-[50px] rounded-xl bg-[#156b3b] hover:bg-green-800 active:scale-[0.99] text-white font-black text-sm sm:text-base transition shadow-md flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Xác Nhận Đặt Lịch Ghé Thăm ({selectedSpot.name.split('(')[0].trim()})</span>
          </button>
        </form>
      </section>
    </div>
  );
};
