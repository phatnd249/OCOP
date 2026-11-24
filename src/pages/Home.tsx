import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Mic,
  QrCode,
  ShoppingBag,
  Sparkles,
  MapPin,
  CheckCircle2,
  Calendar,
  Radio,
  Clock,
  Bell,
  Star,
  ShieldCheck,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Award,
  Video,
  UserCheck,
  Eye,
  Heart,
  Truck
} from 'lucide-react';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export const Home: React.FC = () => {
  const {
    products,
    garden,
    liveStreams,
    youthSupporters,
    currentRole,
    setRole,
    setActiveScreen,
    setSelectedProductId,
    addToCart,
    setQrModalProduct,
    setTourModalOpen,
    showNotification
  } = useApp();

  // Search & Speech State
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Filters State (5 Nhóm bộ lọc chuẩn theo yêu cầu)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStandard, setSelectedStandard] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedDelivery, setSelectedDelivery] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Quick Sort Bar
  const [sortBy, setSortBy] = useState<'newest' | 'live' | 'price_asc' | 'price_desc' | 'popular'>('newest');

  // Speech Recognition Search
  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsListening(true);
      showNotification('Đang lắng nghe giọng nói... (Ví dụ: "sầu riêng Ri6")');
      setTimeout(() => {
        setIsListening(false);
        setSearchQuery('sầu riêng Ri6');
        showNotification('Đã nhận diện: "sầu riêng Ri6"');
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.onstart = () => {
        setIsListening(true);
        showNotification('Bác cứ nói tự nhiên: sầu riêng, chôm chôm, bưởi...');
      };
      recognition.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setSearchQuery(text);
        setIsListening(false);
        showNotification(`Đã tìm kiếm: "${text}"`);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // 1. Text Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchOrigin = p.origin.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchName && !matchOrigin && !matchDesc) return false;
      }

      // 2. Nhóm Đặc Sản Đồng Nai
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'long_khanh' && !p.name.toLowerCase().includes('chôm chôm') && !p.name.toLowerCase().includes('sầu riêng')) {
          return false;
        }
        if (selectedCategory === 'tan_trieu' && !p.name.toLowerCase().includes('bưởi')) {
          return false;
        }
        if (selectedCategory === 'hat_dieu' && !p.name.toLowerCase().includes('hạt điều')) {
          return false;
        }
      }

      // 3. Tiêu Chuẩn & Minh Bạch
      if (selectedStandard !== 'all') {
        if (selectedStandard === '4_star' && p.star !== 4) return false;
        if (selectedStandard === '3_star' && p.star !== 3) return false;
        if (selectedStandard === 'has_qr' && !p.qrCodeId) return false;
        if (selectedStandard === 'has_diary' && (!p.seasonDiary || p.seasonDiary.length === 0)) return false;
      }

      // 4. Khoảng Giá (35.000 - 120.000 VNĐ/kg)
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under_50' && p.price >= 50000) return false;
        if (selectedPriceRange === '50_90' && (p.price < 50000 || p.price > 90000)) return false;
        if (selectedPriceRange === '90_120' && p.price < 90000) return false;
      }

      // 5. Khu vực nhà vườn
      if (selectedRegion !== 'all') {
        if (selectedRegion === 'long_khanh' && !p.origin.toLowerCase().includes('long khánh')) return false;
        if (selectedRegion === 'vinh_cuu' && !p.origin.toLowerCase().includes('tân triều') && !p.origin.toLowerCase().includes('vĩnh cửu')) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'popular') return b.inStock - a.inStock;
      return 0; // default newest
    });
  }, [products, searchQuery, selectedCategory, selectedStandard, selectedPriceRange, selectedDelivery, selectedRegion, sortBy]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* =========================================================================
          TẦNG 1: THANH TÌM KIẾM LỚN & CHUYỂN VAI TRÒ (HEADER BỀ MẶT)
          ========================================================================= */}
      <section className="bg-white rounded-3xl p-4 sm:p-6 border border-green-200 shadow-soft space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Ô tìm kiếm lớn ở giữa kèm nút tìm giọng nói */}
          <div className="relative w-full lg:max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm chôm chôm, sầu riêng Long Khánh, bưởi Tân Triều, hạt điều..."
                className="w-full pl-12 pr-28 py-3.5 text-sm sm:text-base rounded-2xl border-2 border-green-600 focus:border-green-800 focus:ring-4 focus:ring-green-100 outline-none transition shadow-inner bg-cream"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`absolute right-2 px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-green-100 text-green-900 hover:bg-green-200'
                }`}
                title="Hỗ trợ giọng nói cho chủ vườn và khách hàng"
              >
                <Mic className="w-4 h-4 text-green-800" />
                <span className="hidden sm:inline">{isListening ? 'Đang nghe...' : 'Giọng nói'}</span>
              </button>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 absolute right-32 top-4"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Nút chuyển nhanh góc nhìn Demo & Đăng bán nhanh */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end flex-wrap">
            <div className="bg-green-50 p-1 rounded-2xl border border-green-200 flex items-center gap-1 text-xs">
              <span className="px-2 font-bold text-gray-500 hidden sm:inline">Góc nhìn:</span>
              <button
                onClick={() => setRole('customer')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  currentRole === 'customer'
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-green-200'
                }`}
              >
                Khách TP.HCM
              </button>
              <button
                onClick={() => setRole('farmer')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  currentRole === 'farmer'
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-green-200'
                }`}
              >
                🌾 Chú Ba Tư (50t)
              </button>
              <button
                onClick={() => setRole('youth')}
                className={`px-3 py-1.5 rounded-xl font-bold transition ${
                  currentRole === 'youth'
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-green-200'
                }`}
              >
                🌟 Đoàn viên
              </button>
            </div>

            {/* Nút Đăng bán nhanh */}
            <Button
              onClick={() => setActiveScreen('quick_post')}
              icon="pi pi-plus"
              label="Đăng Bán Nhanh (AI/Voice)"
              className="p-button-warning font-bold text-xs p-button-sm shadow-md text-ink whitespace-nowrap"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          TẦNG 2: BANNER CHIẾN DỊCH & THANH CHỈ SỐ MINH BẠCH
          ========================================================================= */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white shadow-card">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" 
          style={{ backgroundImage: `url(${garden.coverImage})` }}
        ></div>
        <div className="relative p-6 sm:p-10 md:p-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-sun/20 border border-sun/50 text-sun px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur">
            <Sparkles className="w-4 h-4 text-sun" />
            <span>CẦU NỐI SỐ NÔNG SẢN ĐỒNG NAI — TƯƠI TẠI VƯỜN, GIAO TRONG NGÀY</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Nông Sản OCOP Long Khánh <br />
            <span className="text-sun">Minh Bạch Từ Vườn Cây Ba Tư Đến Bàn Ăn</span>
          </h1>

          <p className="text-green-100 text-xs sm:text-sm leading-relaxed max-w-xl">
            Sầu riêng Ri6 cơm vàng bao ngọt, chôm chôm nhãn giòn ngọt thu hái sáng sớm tại Ấp Suối Tre (Long Khánh). Chuyến xe lạnh OCOP đưa thẳng về TP.HCM trong 3–4 tiếng.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveScreen('map')}
              className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 text-xs sm:text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Khám Phá Bản Đồ Nhà Vườn (Du Lịch Trải Nghiệm)</span>
            </button>
            <button
              onClick={() => setActiveScreen('garden')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl backdrop-blur transition flex items-center gap-2 text-xs sm:text-sm border border-white/20"
            >
              <span>Xem Hồ Sơ 2.5 ha Vườn Ba Tư</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thanh chỉ số niềm tin ngay dưới banner */}
        <div className="bg-black/40 backdrop-blur-md border-t border-white/15 px-6 py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-bold text-green-100 text-center">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sun" />
            <span>100% CÓ MÃ QR TRUY XUẤT</span>
          </div>
          <div className="flex items-center justify-center gap-2 border-y sm:border-y-0 sm:border-x border-white/15 py-1 sm:py-0">
            <Calendar className="w-4 h-4 text-sun" />
            <span>NHẬT KÝ MÙA VỤ MINH BẠCH</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <UserCheck className="w-4 h-4 text-sun" />
            <span>THANH NIÊN ĐỒNG HÀNH 1:1 CÙNG CHỦ VƯỜN</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TẦNG 3: DẢI LIVESTREAM "ĐANG PHÁT & SẮP LÊN SÓNG" (NẰM NGANG)
          ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <h2 className="text-lg sm:text-xl font-black text-ink">
              Phiên Chợ Livestream Tại Vườn Đang Phát & Sắp Lên Sóng
            </h2>
          </div>
          <button
            onClick={() => setActiveScreen('live')}
            className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả lịch live</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {liveStreams.map((live, idx) => (
            <div
              key={live.id}
              onClick={() => setActiveScreen('live')}
              className={`rounded-2xl p-4 border transition cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group shadow-sm ${
                live.isLiveNow
                  ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 ring-2 ring-amber-400'
                  : 'bg-white border-green-200 hover:border-green-400'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow">
                  <img src={live.cover} alt={live.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" />
                  {live.isLiveNow ? (
                    <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span> LIVE
                    </span>
                  ) : (
                    <span className="absolute top-1 left-1 bg-gray-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                      Sắp live
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-[11px] font-bold text-amber-700 block">
                    {live.time}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-ink line-clamp-2 leading-snug group-hover:text-green-800 transition">
                    {live.title}
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    Host: <strong>{live.hostName}</strong>
                  </p>
                </div>
              </div>

              {live.isLiveNow ? (
                <div className="pt-2 border-t border-amber-200 flex items-center justify-between text-xs">
                  <span className="text-red-600 font-bold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{live.viewers} người xem</span>
                  </span>
                  <span className="bg-red-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg">
                    Vào Xem Ngay ➔
                  </span>
                </div>
              ) : (
                <div className="pt-2 border-t border-green-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 text-[11px]">📍 {live.location.split('-')[0]}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      showNotification(`🔔 Đã đặt lịch nhắc phiên live của bạn ${live.hostName}!`);
                    }}
                    className="text-green-800 font-bold bg-green-100 hover:bg-green-200 text-[11px] px-2 py-0.5 rounded flex items-center gap-1"
                  >
                    <Bell className="w-3 h-3" />
                    <span>Đặt lịch nhắc</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          TẦNG 4: KHU VỰC LỌC & DANH SÁCH SẢN PHẨM OCOP (CHIA 2 CỘT 25% - 75%)
          ========================================================================= */}
      <section className="pt-4 space-y-6">
        
        {/* Tiêu đề & Quick Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-green-200 pb-4">
          <div>
            <h2 className="text-2xl font-black text-ink flex items-center gap-2">
              <span>Nông Sản OCOP Đồng Nai Tuyển Chọn</span>
              <Tag value={`${filteredProducts.length} sản phẩm`} severity="success" className="text-xs font-bold" />
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Giá chuẩn đề bài: 35.000 – 120.000 đ/kg • Đóng thùng tươi giao ngay lên TP.HCM
            </p>
          </div>

          {/* Thanh sắp xếp nhanh (Sort Bar) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold">
            <span className="text-gray-400 whitespace-nowrap flex items-center gap-1 mr-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sắp xếp:
            </span>
            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                sortBy === 'newest' ? 'bg-green-700 text-white' : 'bg-white border text-gray-700 hover:bg-green-50'
              }`}
            >
              Mới thu hoạch
            </button>
            <button
              onClick={() => setSortBy('price_asc')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                sortBy === 'price_asc' ? 'bg-green-700 text-white' : 'bg-white border text-gray-700 hover:bg-green-50'
              }`}
            >
              Giá thấp → cao
            </button>
            <button
              onClick={() => setSortBy('price_desc')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                sortBy === 'price_desc' ? 'bg-green-700 text-white' : 'bg-white border text-gray-700 hover:bg-green-50'
              }`}
            >
              Giá cao → thấp
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${
                sortBy === 'popular' ? 'bg-green-700 text-white' : 'bg-white border text-gray-700 hover:bg-green-50'
              }`}
            >
              Nhiều lượt trải nghiệm nhất
            </button>
          </div>
        </div>

        {/* Bố cục 2 cột: Cột trái (25%) Bộ lọc thông minh - Cột phải (75%) Lưới sản phẩm */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* CỘT TRÁI (25%): 5 NHÓM TIÊU CHÍ BỘ LỌC ĐẶC THÙ NÔNG SẢN ĐỒNG NAI */}
          <aside className="lg:col-span-1 bg-white p-5 rounded-3xl border border-green-200 shadow-soft space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-green-200">
              <h3 className="font-bold text-sm text-ink flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-green-700" />
                <span>Bộ Lọc Nông Sản OCOP</span>
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStandard('all');
                  setSelectedPriceRange('all');
                  setSelectedDelivery('all');
                  setSelectedRegion('all');
                  setSearchQuery('');
                  showNotification('Đã đặt lại tất cả bộ lọc');
                }}
                className="text-[11px] text-green-700 font-semibold hover:underline"
              >
                Đặt lại
              </button>
            </div>

            {/* Nhóm 1: Nhóm đặc sản Đồng Nai */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-green-900 block">1. Nhóm đặc sản Đồng Nai</span>
              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="accent-green-700"
                  />
                  <span>Tất cả đặc sản ({products.length})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCategory === 'long_khanh'}
                    onChange={() => setSelectedCategory('long_khanh')}
                    className="accent-green-700"
                  />
                  <span>Trái cây Long Khánh (Sầu riêng, Chôm chôm)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCategory === 'tan_trieu'}
                    onChange={() => setSelectedCategory('tan_trieu')}
                    className="accent-green-700"
                  />
                  <span>Bưởi da xanh Tân Triều</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="cat"
                    checked={selectedCategory === 'hat_dieu'}
                    onChange={() => setSelectedCategory('hat_dieu')}
                    className="accent-green-700"
                  />
                  <span>Hạt điều rang muối vỏ lụa</span>
                </label>
              </div>
            </div>

            {/* Nhóm 2: Tiêu chuẩn & Minh bạch */}
            <div className="space-y-2 pt-2 border-t border-green-100">
              <span className="text-xs font-bold text-green-900 block">2. Tiêu chuẩn & Minh bạch</span>
              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="std"
                    checked={selectedStandard === 'all'}
                    onChange={() => setSelectedStandard('all')}
                    className="accent-green-700"
                  />
                  <span>Tất cả chứng nhận</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="std"
                    checked={selectedStandard === '4_star'}
                    onChange={() => setSelectedStandard('4_star')}
                    className="accent-green-700"
                  />
                  <span>⭐ Chuẩn OCOP 4 Sao</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="std"
                    checked={selectedStandard === '3_star'}
                    onChange={() => setSelectedStandard('3_star')}
                    className="accent-green-700"
                  />
                  <span>⭐ Chuẩn OCOP 3 Sao</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="std"
                    checked={selectedStandard === 'has_qr'}
                    onChange={() => setSelectedStandard('has_qr')}
                    className="accent-green-700"
                  />
                  <span>✓ Có mã QR truy xuất nguồn gốc</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="std"
                    checked={selectedStandard === 'has_diary'}
                    onChange={() => setSelectedStandard('has_diary')}
                    className="accent-green-700"
                  />
                  <span>✓ Có nhật ký mùa vụ sinh học</span>
                </label>
              </div>
            </div>

            {/* Nhóm 3: Khoảng giá (Khớp dữ liệu mẫu 35k - 120k/kg) */}
            <div className="space-y-2 pt-2 border-t border-green-100">
              <span className="text-xs font-bold text-green-900 block">3. Khoảng giá (VNĐ/kg)</span>
              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === 'all'}
                    onChange={() => setSelectedPriceRange('all')}
                    className="accent-green-700"
                  />
                  <span>Tất cả mức giá</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === 'under_50'}
                    onChange={() => setSelectedPriceRange('under_50')}
                    className="accent-green-700"
                  />
                  <span>Dưới 50.000 đ/kg (Chôm chôm 35k - 45k)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === '50_90'}
                    onChange={() => setSelectedPriceRange('50_90')}
                    className="accent-green-700"
                  />
                  <span>50.000 – 90.000 đ/kg (Bưởi Tân Triều)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === '90_120'}
                    onChange={() => setSelectedPriceRange('90_120')}
                    className="accent-green-700"
                  />
                  <span>90.000 – 120.000 đ/kg (Sầu riêng Ri6)</span>
                </label>
              </div>
            </div>

            {/* Nhóm 4: Hình thức nhận & Trải nghiệm */}
            <div className="space-y-2 pt-2 border-t border-green-100">
              <span className="text-xs font-bold text-green-900 block">4. Hình thức nhận hàng</span>
              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="del"
                    checked={selectedDelivery === 'all'}
                    onChange={() => setSelectedDelivery('all')}
                    className="accent-green-700"
                  />
                  <span>Tất cả hình thức</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="del"
                    checked={selectedDelivery === 'express'}
                    onChange={() => setSelectedDelivery('express')}
                    className="accent-green-700"
                  />
                  <span>⚡ Giao siêu tốc xe lạnh TP.HCM (3h)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="del"
                    checked={selectedDelivery === 'garden'}
                    onChange={() => {
                      setSelectedDelivery('garden');
                      setTourModalOpen(true);
                    }}
                    className="accent-green-700"
                  />
                  <span>🌴 Nhận tại vườn + Du lịch trải nghiệm</span>
                </label>
              </div>
            </div>

            {/* Nhóm 5: Khu vực nhà vườn */}
            <div className="space-y-2 pt-2 border-t border-green-100">
              <span className="text-xs font-bold text-green-900 block">5. Khu vực nhà vườn</span>
              <div className="space-y-1.5 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="reg"
                    checked={selectedRegion === 'all'}
                    onChange={() => setSelectedRegion('all')}
                    className="accent-green-700"
                  />
                  <span>Toàn tỉnh Đồng Nai</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="reg"
                    checked={selectedRegion === 'long_khanh'}
                    onChange={() => setSelectedRegion('long_khanh')}
                    className="accent-green-700"
                  />
                  <span>TP. Long Khánh (Nhà vườn Ba Tư)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-green-800">
                  <input
                    type="radio"
                    name="reg"
                    checked={selectedRegion === 'vinh_cuu'}
                    onChange={() => setSelectedRegion('vinh_cuu')}
                    className="accent-green-700"
                  />
                  <span>Huyện Vĩnh Cửu (Làng bưởi Tân Triều)</span>
                </label>
              </div>
            </div>

          </aside>

          {/* CỘT PHẢI (75%): LƯỚI THẺ SẢN PHẨM THEO KIỂU REMARKET */}
          <div className="lg:col-span-3 space-y-6">
            
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-green-200">
                <span className="text-4xl block mb-2">🔍</span>
                <h4 className="font-bold text-base text-gray-800">Không tìm thấy nông sản phù hợp bộ lọc</h4>
                <p className="text-xs text-gray-500 mt-1">Hãy thử xóa bộ lọc hoặc tìm với từ khóa khác</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStandard('all');
                    setSelectedPriceRange('all');
                    setSelectedRegion('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-4 py-2 bg-green-700 text-white font-bold text-xs rounded-xl"
                >
                  Xem tất cả nông sản
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p => {
                  // Gán tên đoàn viên hỗ trợ cho từng sản phẩm
                  const youthSupporterName = p.id === 'sp-01' || p.id === 'sp-03' ? 'ĐV Văn Nam' : 'ĐV Thị Mai';

                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-3xl border border-green-200 hover:border-green-700 shadow-soft hover:shadow-card transition flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Top Image + Badges */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className="bg-green-700 text-white font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                            ⭐ OCOP {p.star} SAO
                          </span>
                          <span className="bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            Kho: {p.inStock} {p.unit}
                          </span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-1">
                            <MapPin className="w-3 h-3 text-green-700 shrink-0" />
                            <span className="truncate">{p.origin}</span>
                          </div>

                          <h3
                            onClick={() => {
                              setSelectedProductId(p.id);
                              setActiveScreen('product_detail');
                            }}
                            className="font-bold text-sm sm:text-base text-ink line-clamp-2 hover:text-green-800 cursor-pointer leading-snug"
                          >
                            {p.name}
                          </h3>

                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                            {p.description}
                          </p>
                        </div>

                        {/* Price & Unit */}
                        <div className="pt-2 border-t border-dashed border-gray-200 flex items-baseline justify-between">
                          <div>
                            <span className="font-black text-lg text-green-900">
                              {p.price.toLocaleString('vi-VN')} đ
                            </span>
                            <span className="text-xs text-gray-500 font-medium"> / {p.unit}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-bold">
                            Tối thiểu: {p.minOrder} {p.unit}
                          </span>
                        </div>

                        {/* 2 Nút hành động đắt giá theo yêu cầu: Quét QR Nhật Ký & + Giỏ Hàng */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <Button
                            onClick={() => setQrModalProduct(p)}
                            icon="pi pi-qrcode"
                            label="Mã QR"
                            outlined
                            className="p-button-success p-button-sm text-xs font-bold"
                          />
                          <Button
                            onClick={() => addToCart(p.id, 1)}
                            icon="pi pi-cart-plus"
                            label="+ Giỏ hàng"
                            className="p-button-warning text-xs font-black text-ink p-button-sm shadow-sm"
                          />
                        </div>
                      </div>

                      {/* DẢI TAG ĐÁY THỂ HIỆN BẢN SẮC "CẦU NỐI SỐ" CỦA ĐỀ BÀI */}
                      <div className="bg-cream border-t border-green-100 px-3.5 py-2 text-[11px] text-earth font-medium flex items-center justify-between">
                        <span className="flex items-center gap-1 text-green-950 font-bold">
                          🌾 <em>Nhà vườn Ba Tư</em>
                        </span>
                        <span className="text-green-800 font-bold">
                          🤝 <em>Hỗ trợ bởi: {youthSupporterName}</em>
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TẦNG 5: BẢNG VÀNG THANH NIÊN HỖ TRỢ SỐ & NHÀ VƯỜN TIÊU BIỂU
          ========================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-green-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
              <Award className="w-3.5 h-3.5 text-sun" />
              <span>MINH BẠCH & TẠO NIỀM TIN CHO NGƯỜI TIÊU DÙNG TP.HCM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-ink">
              Bảng Vàng Thanh Niên Hỗ Trợ Số & Nhà Vườn Tiêu Biểu Ba Tư
            </h2>
          </div>
          <button
            onClick={() => setActiveScreen('volunteer')}
            className="text-xs font-bold text-green-700 hover:underline flex items-center gap-1"
          >
            <span>Xem chi tiết sổ tay tình nguyện</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Cột 1: Thông tin Nhà Vườn Ba Tư */}
          <div className="md:col-span-1 bg-cream rounded-2xl p-5 border border-green-200 space-y-3">
            <div className="flex items-center gap-3">
              <img src={garden.avatar} alt={garden.owner} className="w-14 h-14 rounded-full object-cover border-2 border-green-700 shadow" />
              <div>
                <h4 className="font-bold text-sm text-green-950">{garden.name}</h4>
                <p className="text-xs text-gray-600">{garden.owner}</p>
                <Tag value={`⭐ OCOP ${garden.ocopRating} SAO TỈNH`} severity="success" className="text-[10px] font-bold mt-1" />
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Quy mô <strong>{garden.area}</strong> tại Suối Tre (Long Khánh). Canh tác hữu cơ sinh học, cam kết không thuốc kích thích ép chín.
            </p>
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-earth font-bold">Chứng nhận số:</span>
              <span className="font-mono text-green-900 font-bold">{garden.ocopCertNo}</span>
            </div>
            <button
              onClick={() => setActiveScreen('garden')}
              className="w-full py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold text-xs shadow transition text-center block"
            >
              Xem Toàn Bộ Câu Chuyện Nhà Vườn
            </button>
          </div>

          {/* Cột 2 & 3: 02 Đoàn viên hỗ trợ tích cực nhất */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {youthSupporters.map(yt => (
              <div key={yt.id} className="bg-green-50/70 rounded-2xl p-4 border border-green-200 flex flex-col justify-between space-y-3">
                <div className="flex items-center gap-3">
                  <img src={yt.avatar} alt={yt.name} className="w-12 h-12 rounded-xl object-cover border-2 border-green-600 shadow-sm" />
                  <div>
                    <h5 className="font-bold text-sm text-ink">{yt.name}</h5>
                    <p className="text-[11px] text-green-800 font-semibold">{yt.role}</p>
                    <span className="text-[10px] text-amber-700 font-black">🏅 {yt.badge}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border border-green-100 text-center text-xs">
                  <div>
                    <span className="font-black text-green-800 block text-sm">{yt.volunteerHours}h</span>
                    <span className="text-[10px] text-gray-400">Tình nguyện</span>
                  </div>
                  <div>
                    <span className="font-black text-sun block text-sm">{yt.sessionsLive}</span>
                    <span className="text-[10px] text-gray-400">Phiên Live</span>
                  </div>
                  <div>
                    <span className="font-black text-green-700 block text-sm">{yt.productsDigitized}</span>
                    <span className="text-[10px] text-gray-400">Số hóa QR</span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-600">
                  <strong>Nhiệm vụ:</strong> {yt.skills.join(' • ')}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
