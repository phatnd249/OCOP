import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Store,
  MapPin,
  Award,
  Search,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Users
} from 'lucide-react';
import { Dropdown } from 'primereact/dropdown';

export const GardensList: React.FC = () => {
  const { gardens, openGardenProfile, setTourModalOpen } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Lọc danh sách nhà vườn
  const filteredGardens = useMemo(() => {
    return gardens.filter(g => {
      // 1. Tìm kiếm từ khóa
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const cropsStr = (Array.isArray(g.crops) ? g.crops.join(' ') : String(g.crops || '')).toLowerCase();
        const match =
          g.name.toLowerCase().includes(q) ||
          g.owner.toLowerCase().includes(q) ||
          g.location.toLowerCase().includes(q) ||
          cropsStr.includes(q);
        if (!match) return false;
      }

      // 2. Lọc theo xếp hạng sao
      if (selectedRating !== 'all') {
        if (g.ocopRating !== Number(selectedRating)) return false;
      }

      // 3. Lọc theo địa bàn
      if (selectedLocation !== 'all') {
        if (!g.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [gardens, searchQuery, selectedRating, selectedLocation]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-900 text-xs font-bold px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-green-700" />
            <span>MẠNG LƯỚI NÔNG DÂN SỐ ĐỒNG NAI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
            Danh Sách Hồ Sơ Nhà Vườn OCOP
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Khám phá các nhà vườn tiêu biểu tỉnh Đồng Nai, phương thức canh tác thuận tự nhiên, 
            câu chuyện giữ đất giữ giống và chứng nhận OCOP 3–5 sao được kiểm định minh bạch.
          </p>
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-green-100 mt-6 text-xs">
          <div className="p-3 rounded-2xl bg-cream/70 border border-green-100">
            <span className="text-gray-500 block text-[11px]">Tổng số nhà vườn</span>
            <strong className="text-base font-black text-green-900">{gardens.length} Nhà vườn</strong>
          </div>
          <div className="p-3 rounded-2xl bg-cream/70 border border-green-100">
            <span className="text-gray-500 block text-[11px]">Tiêu chuẩn chất lượng</span>
            <strong className="text-base font-black text-green-900">100% OCOP 3–5 Sao</strong>
          </div>
          <div className="p-3 rounded-2xl bg-cream/70 border border-green-100">
            <span className="text-gray-500 block text-[11px]">Nhật ký minh bạch</span>
            <strong className="text-base font-black text-green-900">Truy xuất mã QR</strong>
          </div>
          <div className="p-3 rounded-2xl bg-cream/70 border border-green-100">
            <span className="text-gray-500 block text-[11px]">Đoàn viên đồng hành</span>
            <strong className="text-base font-black text-green-900">Hỗ trợ tận vườn</strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-green-200 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Ô tìm kiếm */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên nhà vườn, tên chủ vườn, sầu riêng, bưởi, điều..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition"
            />
          </div>

          {/* Lọc theo Sao OCOP */}
          <div className="w-full sm:w-48">
            <Dropdown
              value={selectedRating}
              onChange={e => setSelectedRating(e.value)}
              options={[
                { label: 'Tất cả hạng sao', value: 'all' },
                { label: '⭐ OCOP 5 Sao (Quốc gia)', value: '5' },
                { label: '⭐ OCOP 4 Sao (Tiêu biểu)', value: '4' },
                { label: '⭐ OCOP 3 Sao', value: '3' }
              ]}
              className="w-full text-xs font-medium rounded-2xl"
            />
          </div>

          {/* Lọc theo Khu vực Phường / Xã */}
          <div className="w-full sm:w-56">
            <Dropdown
              value={selectedLocation}
              onChange={e => setSelectedLocation(e.value)}
              options={[
                { label: 'Tất cả khu vực', value: 'all' },
                { label: 'P. Suối Tre (Long Khánh)', value: 'Suối Tre' },
                { label: 'X. Bình Lộc (Long Khánh)', value: 'Bình Lộc' },
                { label: 'P. Xuân Bình (Long Khánh)', value: 'Xuân Bình' },
                { label: 'X. Bảo Quang (Long Khánh)', value: 'Bảo Quang' },
                { label: 'Cù lao Tân Triều (Vĩnh Cửu)', value: 'Tân Triều' },
                { label: 'X. Hàng Gòn (Long Khánh)', value: 'Hàng Gòn' }
              ]}
              className="w-full text-xs font-medium rounded-2xl"
            />
          </div>
        </div>

        {/* Thông báo kết quả lọc */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Tìm thấy: <strong className="text-green-900 font-bold">{filteredGardens.length}</strong> nhà vườn phù hợp
          </span>
          {(searchQuery || selectedRating !== 'all' || selectedLocation !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRating('all');
                setSelectedLocation('all');
              }}
              className="text-green-800 font-bold hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Grid Danh Sách Nhà Vườn */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGardens.map(g => (
          <div
            key={g.id}
            onClick={() => openGardenProfile(g.id)}
            className="group bg-white rounded-3xl overflow-hidden border border-green-200 hover:border-green-400 shadow-soft hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              {/* Cover Image & Rating Badge */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={g.coverImage}
                  alt={g.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Badge OCOP Star */}
                <div className="absolute top-3 right-3">
                  <span className="bg-sun text-earth-dark font-black text-xs px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                    ⭐ OCOP {g.ocopRating} SAO
                  </span>
                </div>

                {/* Avatar & Owner Name overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 text-white">
                  <img
                    src={g.avatar}
                    alt={g.owner}
                    className="w-12 h-12 rounded-xl border-2 border-white object-cover shadow"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] text-green-200 uppercase font-bold truncate">
                      {g.area}
                    </p>
                    <h3 className="font-black text-base leading-tight truncate text-white group-hover:text-amber-300 transition-colors">
                      {g.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Thông tin chi tiết */}
              <div className="p-5 space-y-3">
                {/* Chủ vườn & Địa chỉ */}
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Store className="w-3.5 h-3.5 text-green-700 shrink-0" />
                    <span className="truncate font-semibold text-ink">{g.owner}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                    <span className="truncate text-gray-500">{g.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-[11px] font-mono text-gray-500">Mã: {g.ocopCertNo}</span>
                  </div>
                </div>

                {/* Cây trồng chủ lực */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(Array.isArray(g.crops) ? g.crops : String(g.crops || '').split(',')).slice(0, 3).map((crop: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-green-50 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200"
                    >
                      {crop.trim()}
                    </span>
                  ))}
                </div>

                {/* Đoạn trích câu chuyện làm vườn */}
                <p className="text-xs text-gray-600 line-clamp-2 italic leading-relaxed pt-1">
                  "{g.story}"
                </p>
              </div>
            </div>

            {/* Chân thẻ: Các nút hành động */}
            <div className="p-4 pt-0 border-t border-gray-100 flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => openGardenProfile(g.id)}
                className="flex-1 h-10 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <span>Xem Hồ Sơ Chi Tiết</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {g.tourismReady && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTourModalOpen(true);
                  }}
                  className="h-10 px-3.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs transition whitespace-nowrap"
                  title="Đặt lịch tham quan trực tiếp tại vườn"
                >
                  Đặt Tour
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
