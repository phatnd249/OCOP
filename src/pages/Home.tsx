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
    quickLogin,
    setActiveScreen,
    openProductDetail,
    addToCart,
    setQrModalProduct,
    setTourModalOpen,
    showNotification,
    currentUser
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

  // 4 Dropdown Filters & Sắp xếp theo yêu cầu
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'fresh_fruit' | 'beans_coffee' | 'processed'>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under_50' | '50_90' | '90_120'>('all');
  const [gardenFilter, setGardenFilter] = useState<'all' | 'ba_tu' | 'tan_trieu' | 'others'>('all');
  const [sortOption, setSortOption] = useState<'newest' | 'price_asc' | 'price_desc' | 'has_tour'>('newest');

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

  // Filter and Sort Logic với 4 Dropdown
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

      // Nút 1: Loại nông sản
      if (categoryFilter !== 'all') {
        const nameLower = p.name.toLowerCase();
        const catLower = p.category.toLowerCase();
        if (categoryFilter === 'fresh_fruit') {
          // Trái cây tươi (Chôm chôm, Sầu riêng, Bưởi...)
          const isFruit = nameLower.includes('chôm chôm') || nameLower.includes('sầu riêng') || nameLower.includes('bưởi') || catLower.includes('trái cây') || nameLower.includes('chuối') || nameLower.includes('mít');
          if (!isFruit) return false;
        } else if (categoryFilter === 'beans_coffee') {
          // Hạt & Cà phê
          const isBeansOrCoffee = nameLower.includes('hạt điều') || nameLower.includes('cà phê') || catLower.includes('hạt') || catLower.includes('cà phê');
          if (!isBeansOrCoffee) return false;
        } else if (categoryFilter === 'processed') {
          // Đặc sản OCOP chế biến
          const isProcessed = catLower.includes('chế biến') || nameLower.includes('sấy') || nameLower.includes('rượu') || nameLower.includes('muối');
          if (!isProcessed) return false;
        }
      }

      // Nút 2: Khoảng giá (Dưới 50.000đ/kg • 50.000 – 90.000đ/kg • 90.000 – 120.000đ/kg)
      if (priceFilter !== 'all') {
        if (priceFilter === 'under_50' && p.price >= 50000) return false;
        if (priceFilter === '50_90' && (p.price < 50000 || p.price > 90000)) return false;
        if (priceFilter === '90_120' && (p.price < 90000 || p.price > 120000)) return false;
      }

      // Nút 3: Nhà vườn / vùng
      if (gardenFilter !== 'all') {
        const originLower = p.origin.toLowerCase();
        if (gardenFilter === 'ba_tu') {
          if (!originLower.includes('ba tư') && !originLower.includes('long khánh')) return false;
        } else if (gardenFilter === 'tan_trieu') {
          if (!originLower.includes('tân triều') && !originLower.includes('vĩnh cửu')) return false;
        } else if (gardenFilter === 'others') {
          if (originLower.includes('ba tư') || originLower.includes('long khánh') || originLower.includes('tân triều')) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Nút 4: Sắp xếp
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      if (sortOption === 'has_tour') {
        // Có lịch trải nghiệm vườn (ưu tiên nhà vườn Long Khánh / Tân Triều có tour)
        const aTour = a.origin.toLowerCase().includes('long khánh') ? 1 : 0;
        const bTour = b.origin.toLowerCase().includes('long khánh') ? 1 : 0;
        return bTour - aTour;
      }
      return 0; // default newest
    });
  }, [products, searchQuery, categoryFilter, priceFilter, gardenFilter, sortOption]);

  return (
    <div className="space-y-10 pb-16">

      {/* =========================================================================
          TẦNG 1: BANNER CHIẾN DỊCH & THANH CHỈ SỐ MINH BẠCH
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
            Nông Sản OCOP <br />
            <span className="text-sun">Minh Bạch Từ Vườn Đến Bàn Ăn</span>
          </h1>

          <p className="text-green-100 text-xs sm:text-sm leading-relaxed max-w-xl">
            Quy tụ đa dạng trái cây tươi ngon và đặc sản OCOP khắp các nhà vườn Đồng Nai: chôm chôm, sầu riêng, bưởi, mít, xoài, hạt điều, cà phê… Minh bạch mã QR nhật ký mùa vụ, giao tươi tận tay trong ngày hoặc đón khách trải nghiệm tại vườn.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveScreen('map')}
              className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 text-xs sm:text-sm"
            >
              <MapPin className="w-4 h-4" />
              <span>Khám Phá Bản Đồ Nhà Vườn (Du Lịch Trải Nghiệm)</span>
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
          THANH TÌM KIẾM THÔNG MINH (NẰM TRÊN MỤC LIVESTREAM)
          Tính năng: 🎤 Nói để tìm (Khuyên dùng cho người 50-60 tuổi) & 🔍 Tìm kiếm
          ========================================================================= */}
      <section className="bg-gradient-to-r from-green-50/90 via-emerald-50/60 to-green-50/90 rounded-2xl sm:rounded-full p-2.5 sm:p-3 border border-green-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">

          {/* Ô nhập từ khóa tìm kiếm */}
          <div className="relative flex-1 w-full flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  showNotification(`Đang tìm: "${searchQuery}"`);
                }
              }}
              placeholder="Tìm kiếm: chôm chôm, sầu riêng Long Khánh, bưởi Tân Triều, hạt điều..."
              className="w-full pl-11 pr-20 py-3 text-xs sm:text-sm rounded-full border border-green-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition bg-white text-gray-800 placeholder-gray-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-gray-400 hover:text-gray-600 absolute right-4"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Cụm 2 nút hành động: Tìm kiếm (trước) & Nói để tìm (sau, không icon mic) */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
            {/* Nút 1: Tìm kiếm (Icon kính lúp + chữ Tìm kiếm nền xanh đậm) */}
            <button
              type="button"
              onClick={() => {
                if (searchQuery.trim()) {
                  showNotification(`Đang tìm: "${searchQuery}"`);
                } else {
                  showNotification('Vui lòng nhập tên nông sản hoặc dùng "Nói để tìm"');
                }
              }}
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-green-800 hover:bg-green-900 text-white font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <Search className="w-4 h-4 text-white" />
              <span>Tìm kiếm</span>
            </button>

            {/* Nút 2: Nói để tìm (Bỏ icon mic) */}
            <button
              type="button"
              onClick={handleVoiceSearch}
              className={`flex-1 md:flex-initial flex items-center justify-center px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition shadow-sm border ${isListening
                  ? 'bg-red-600 text-white animate-pulse border-red-700'
                  : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600'
                }`}
              title="Hỗ trợ giọng nói cho người lớn tuổi 50–60 tuổi ngại gõ chữ"
            >
              <span>{isListening ? 'Đang lắng nghe...' : 'Nói để tìm'}</span>
            </button>

            {/* Nút Đăng Đài Nhanh: Dành riêng cho Chủ vườn (farmer) */}
            {currentUser?.role === 'farmer' && (
              <button
                onClick={() => setActiveScreen('quick_post')}
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-green-300 bg-white hover:bg-green-50 text-green-800 text-xs font-bold shadow-sm transition ml-1"
                title="Đăng sản phẩm mới bằng AI / Voice"
              >
                <span>🎙️ Đăng bài</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DANH SÁCH SẢN PHẨM OCOP (4 BÀI 1 HÀNG NGANG)
          ========================================================================= */}
      <section className="pt-4 space-y-6">

        {/* Tiêu đề & Thanh 4 Dropdown dàn đều 1 hàng ngang */}
        <div className="space-y-4 border-b border-green-200 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-black text-ink">
                Nông Sản OCOP Đồng Nai Tuyển Chọn
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Nông sản tươi sạch từ các nhà vườn đạt chuẩn OCOP • Đóng thùng giao xe lạnh về TP.HCM
              </p>
            </div>
            <span className="text-xs font-bold text-green-800 bg-green-50 px-3 py-1.5 rounded-full border border-green-200 self-start sm:self-auto">
              Hiển thị: <strong>{filteredProducts.length}</strong> sản phẩm
            </span>
          </div>

          {/* Dàn đều 4 Nút Dropdown trên 1 hàng ngang (grid 4 cột bằng nhau, full width) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-bold w-full">
            {/* Nút 1: Loại nông sản */}
            <div className="relative w-full">
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value as any)}
                className="w-full px-4 py-2.5 pr-8 rounded-xl bg-white border border-green-300 text-gray-800 hover:bg-green-50/70 hover:border-green-600 font-bold outline-none cursor-pointer appearance-none shadow-sm transition truncate"
              >
                <option value="all">Loại: Tất cả nông sản</option>
                <option value="fresh_fruit">Trái cây tươi (Chôm chôm, Sầu riêng, Bưởi...)</option>
                <option value="beans_coffee">Hạt & Cà phê</option>
                <option value="processed">Đặc sản OCOP chế biến</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700 text-[10px]">
                ▼
              </span>
            </div>

            {/* Nút 2: Khoảng giá */}
            <div className="relative w-full">
              <select
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value as any)}
                className="w-full px-4 py-2.5 pr-8 rounded-xl bg-white border border-green-300 text-gray-800 hover:bg-green-50/70 hover:border-green-600 font-bold outline-none cursor-pointer appearance-none shadow-sm transition truncate"
              >
                <option value="all">Giá: Tất cả mức giá</option>
                <option value="under_50">Dưới 50.000đ/kg</option>
                <option value="50_90">50.000 – 90.000đ/kg</option>
                <option value="90_120">90.000 – 120.000đ/kg</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700 text-[10px]">
                ▼
              </span>
            </div>

            {/* Nút 3: Nhà vườn / vùng */}
            <div className="relative w-full">
              <select
                value={gardenFilter}
                onChange={e => setGardenFilter(e.target.value as any)}
                className="w-full px-4 py-2.5 pr-8 rounded-xl bg-white border border-green-300 text-gray-800 hover:bg-green-50/70 hover:border-green-600 font-bold outline-none cursor-pointer appearance-none shadow-sm transition truncate"
              >
                <option value="all">Vườn: Tất cả nhà vườn</option>
                <option value="ba_tu">Nhà vườn Ba Tư (Long Khánh)</option>
                <option value="tan_trieu">Vườn bưởi Tân Triều</option>
                <option value="others">Các vườn OCOP khác</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700 text-[10px]">
                ▼
              </span>
            </div>

            {/* Nút 4: Sắp xếp */}
            <div className="relative w-full">
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value as any)}
                className="w-full px-4 py-2.5 pr-8 rounded-xl bg-white border border-green-300 text-gray-800 hover:bg-green-50/70 hover:border-green-600 font-bold outline-none cursor-pointer appearance-none shadow-sm transition truncate"
              >
                <option value="newest">Sắp xếp: Mới thu hoạch</option>
                <option value="price_asc">Giá thấp đến cao</option>
                <option value="price_desc">Giá cao đến thấp</option>
                <option value="has_tour">Có lịch trải nghiệm vườn</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-700 text-[10px]">
                ▼
              </span>
            </div>
          </div>
        </div>

        {/* Lưới sản phẩm OCOP: 4 bài 1 hàng ngang */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-green-200">
            <span className="text-4xl block mb-2">🔍</span>
            <h4 className="font-bold text-base text-gray-800">Không tìm thấy nông sản phù hợp</h4>
            <p className="text-xs text-gray-500 mt-1">Hãy thử chọn lại mức giá hoặc từ khóa tìm kiếm</p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setPriceFilter('all');
                setGardenFilter('all');
                setSortOption('newest');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-green-700 text-white font-bold text-xs rounded-xl"
            >
              Xem lại tất cả nông sản
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map(p => {
              const youthSupporterName = p.id === 'sp-01' || p.id === 'sp-03' ? 'ĐV Văn Nam' : 'ĐV Thị Mai';

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-green-200 hover:border-green-700 shadow-soft hover:shadow-card transition flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Image + Badges */}
                  <div onClick={() => openProductDetail(p.id)} className="relative aspect-[4/3] overflow-hidden bg-cream cursor-pointer">
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
                          openProductDetail(p.id);
                        }}
                        className="font-bold text-sm sm:text-base text-ink line-clamp-1 hover:text-green-800 cursor-pointer leading-snug"
                        title={p.name}
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
                        <span className="font-black text-base sm:text-lg text-green-900">
                          {p.price.toLocaleString('vi-VN')} đ
                        </span>
                        <span className="text-xs text-gray-500 font-medium"> / {p.unit}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold">
                        Tối thiểu: {p.minOrder} {p.unit}
                      </span>
                    </div>

                    {/* 2 Nút hành động: Quét QR & + Giỏ Hàng */}
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

                  {/* DẢI TAG ĐÁY */}
                  <div className="bg-cream border-t border-green-100 px-3.5 py-2 text-[11px] text-earth font-medium flex items-center justify-between">
                    <span className="flex items-center gap-1 text-green-950 font-bold truncate max-w-[120px]">
                      🌾 <em>{p.origin?.includes('Long Khánh') ? 'Nhà vườn Ba Tư' : 'Hợp tác xã OCOP'}</em>
                    </span>
                    <span className="text-green-800 font-bold text-[10px]">
                      🤝 <em>{youthSupporterName}</em>
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}
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
