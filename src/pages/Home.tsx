import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  QrCode,
  MapPin,
  Video,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Truck,
  RotateCcw,
  Star,
  Sparkles,
  Search
} from 'lucide-react';

export const Home: React.FC = () => {
  const {
    products,
    garden,
    liveStreams,
    setActiveScreen,
    setSelectedProductId,
    addToCart,
    setQrModalProduct,
    setTourModalOpen
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const activeLive = liveStreams.find(l => l.isLiveNow);

  // Filter products by selected category
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'fresh') return p.category.includes('Trái cây');
    if (activeCategory === 'processed') return p.category.includes('chế biến');
    if (activeCategory === 'star4') return p.star === 4;
    return true;
  });

  return (
    <div className="space-y-12">
      {/* 1. Hero Marketplace Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-emerald-800 text-white shadow-soft">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-25"
          style={{ backgroundImage: `url(${garden.coverImage})` }}
        ></div>

        <div className="relative p-6 sm:p-10 md:p-14 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur border border-white/20">
            <span className="w-2 h-2 rounded-full bg-sun animate-pulse"></span>
            <span>Mùa Vụ Thu Hoạch Nông Sản Đồng Nai 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Nông Sản Sạch Tận Vườn, <br />
            <span className="text-sun">Chuyển Nhanh Về TP.HCM Trong 4 Giờ</span>
          </h1>

          <p className="text-green-50 text-sm sm:text-base leading-relaxed max-w-xl">
            Thưởng thức sầu riêng Ri6 chín già cơm vàng bao ngọt, chôm chôm nhãn giòn róc hạt từ nhà vườn Long Khánh. Mỗi sản phẩm đều có mã QR minh bạch toàn bộ quy trình chăm sóc VietGAP.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('market-products');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-6 py-3.5 rounded-2xl shadow-md transition flex items-center gap-2 text-sm sm:text-base"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Xem Sản Phẩm Vào Vụ</span>
            </button>

            <button
              onClick={() => setActiveScreen('garden')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl backdrop-blur transition flex items-center gap-2 text-sm sm:text-base border border-white/20"
            >
              <span>Ghé Thăm Vườn Ba Tư</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Customer Trust & Value Proposition Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-green-200 shadow-sm text-xs sm:text-sm">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <strong className="block text-ink font-bold">100% Chuẩn OCOP</strong>
            <span className="text-gray-500 text-xs">Đạt từ 3 đến 4 sao kiểm định</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <strong className="block text-ink font-bold">Mã QR Minh Bạch</strong>
            <span className="text-gray-500 text-xs">Truy xuất nhật ký bón phân, thu hái</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <strong className="block text-ink font-bold">Xe Lạnh Về TP.HCM</strong>
            <span className="text-gray-500 text-xs">Nhận trong 3-4 giờ đảm bảo tươi</span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <strong className="block text-ink font-bold">Bao Ăn 1 Đổi 1</strong>
            <span className="text-gray-500 text-xs">Đổi trả ngay nếu trái bị sượng/hư</span>
          </div>
        </div>
      </section>

      {/* 3. Live Broadcast Stream Strip (If active) */}
      {activeLive && (
        <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white text-red-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Đang Phát Trực Tiếp Tại Vườn
            </div>
            <h3 className="text-xl sm:text-2xl font-black leading-snug">
              {activeLive.title}
            </h3>
            <p className="text-white/90 text-sm">
              Người live: <strong>{activeLive.hostName}</strong> • {activeLive.viewers.toLocaleString('vi-VN')} người đang xem • Chốt đơn giá ưu đãi tại vườn
            </p>
          </div>

          <button
            onClick={() => setActiveScreen('live')}
            className="shrink-0 bg-white hover:bg-cream text-red-600 font-black px-6 py-3.5 rounded-2xl shadow transition flex items-center gap-2"
          >
            <Video className="w-5 h-5 text-red-600" />
            <span>Vào Xem Live & Chốt Đơn</span>
          </button>
        </section>
      )}

      {/* 4. Main Marketplace Section */}
      <section id="market-products" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider block mb-1">
              Gian Hàng Nông Sản Trực Tuyến
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
              Đặc Sản Đồng Nai Đang Bán
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              Tất Cả ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('fresh')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'fresh'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              Trái Cây Tươi Mùa Vụ
            </button>
            <button
              onClick={() => setActiveCategory('star4')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'star4'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              OCOP 4 Sao Tuyển Chọn
            </button>
            <button
              onClick={() => setActiveCategory('processed')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'processed'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 border hover:bg-gray-50'
              }`}
            >
              Nông Sản Chế Biến
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-green-200 shadow-soft hover:shadow-card transition flex flex-col justify-between group"
            >
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  OCOP {p.star} SAO
                </span>
                <button
                  onClick={() => setQrModalProduct(p)}
                  className="absolute bottom-3 right-3 bg-white/95 backdrop-blur hover:bg-white text-green-800 px-2.5 py-1.5 rounded-xl shadow font-bold text-xs flex items-center gap-1 transition"
                  title="Xem mã QR truy xuất"
                >
                  <QrCode className="w-4 h-4 text-green-700" />
                  <span>Quét QR</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-earth font-medium mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-green-700" />
                    <span>{p.origin}</span>
                  </div>

                  <h3
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setActiveScreen('product_detail');
                    }}
                    className="font-bold text-base sm:text-lg text-ink hover:text-green-700 cursor-pointer line-clamp-1 leading-snug"
                  >
                    {p.name}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block">Giá bán trực tiếp:</span>
                    <div className="text-xl font-black text-green-800">
                      {p.price.toLocaleString('vi-VN')} đ
                      <span className="text-xs font-normal text-gray-500"> / {p.unit}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(p.id, 1)}
                      className="bg-sun hover:bg-amber-500 text-earth-dark px-3.5 py-2.5 rounded-xl font-bold shadow-sm transition flex items-center gap-1 text-xs"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Đặt mua</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Farm Spotlight: Nhà Vườn Ba Tư */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-green-200 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
            <span>NHÀ VƯỜN TIÊU BIỂU OCOP ĐỒNG NAI</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-ink leading-tight">
            Nhà Vườn Chú Ba Tư – 25 Năm Gìn Giữ Trái Ngọt Long Khánh
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            Sở hữu diện tích <strong>2.5 ha chuyên canh sầu riêng Ri6 và chôm chôm nhãn</strong> tại Ấp Suối Tre, TP. Long Khánh. Nhà vườn canh tác 100% bằng phân vi sinh hữu cơ, đạt chứng nhận OCOP 4 sao và VietGAP an toàn thực phẩm.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 py-1">
            <div className="bg-cream p-3 rounded-xl border border-green-100">
              <strong className="block text-green-900 font-bold">2.5 Héc-ta</strong>
              <span className="text-gray-500">Đất đỏ bazan trù phú</span>
            </div>
            <div className="bg-cream p-3 rounded-xl border border-green-100">
              <strong className="block text-green-900 font-bold">OCOP 4 Sao</strong>
              <span className="text-gray-500">Cấp bởi UBND Tỉnh Đồng Nai</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveScreen('garden')}
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow transition"
            >
              Xem Chi Tiết Vườn Ba Tư
            </button>
            <button
              onClick={() => setTourModalOpen(true)}
              className="border border-green-700 text-green-800 hover:bg-green-50 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition"
            >
              Đặt Lịch Ghé Thăm Vườn (50k/vé)
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md border-4 border-cream">
          <img
            src={garden.coverImage}
            alt={garden.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-5 text-white">
            <div>
              <p className="font-bold text-base">{garden.name}</p>
              <p className="text-xs text-green-200">{garden.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Agritourism & Map Teaser */}
      <section className="bg-gradient-to-br from-cream to-green-50 border border-green-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs font-bold text-green-800 uppercase tracking-wider bg-green-200/70 px-3 py-1 rounded-full inline-block">
            Du Lịch Trải Nghiệm Sinh Thái
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            Vừa Mua Nông Sản, Vừa Trực Tiếp Ghé Vườn Hái Trái Cây
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            Dành cho các gia đình và du khách tại TP.HCM muốn về Long Khánh vào dịp cuối tuần: tự tay bẻ chôm chôm chín cây, học cách gõ chọn sầu riêng múi vàng và thưởng thức đờn ca tài tử bên suối mát.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={() => setActiveScreen('map')}
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow transition flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Xem Bản Đồ 5 Điểm Trải Nghiệm</span>
            </button>
            <button
              onClick={() => setTourModalOpen(true)}
              className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-5 py-3 rounded-xl text-xs sm:text-sm shadow transition"
            >
              Đặt Lịch Tham Quan Vườn
            </button>
          </div>
        </div>

        <div
          onClick={() => setActiveScreen('map')}
          className="w-full md:w-80 h-56 rounded-2xl overflow-hidden shadow-card border-4 border-white shrink-0 relative group cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80"
            alt="Bản đồ vườn"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-4 text-white">
            <div>
              <p className="font-bold text-sm">Bản Đồ Nhà Vườn Sinh Thái</p>
              <p className="text-xs text-green-200">Bấm để khám phá các khu vực vườn</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
