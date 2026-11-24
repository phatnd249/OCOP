import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ShoppingBag,
  QrCode,
  MapPin,
  Video,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp
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

  const activeLive = liveStreams.find(l => l.isLiveNow);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white shadow-card">
        <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30" style={{ backgroundImage: `url(${garden.coverImage})` }}></div>
        <div className="relative p-6 sm:p-10 md:p-14 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 bg-sun/20 border border-sun/50 text-sun px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold backdrop-blur">
            <Sparkles className="w-4 h-4 text-sun animate-spin" />
            <span>TRẠM VƯỜN SỐ — THANH NIÊN ĐỒNG NAI TIẾP SỨC NÔNG SẢN OCOP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Nông Sản OCOP Long Khánh <br />
            <span className="text-sun">Tươi Ngon Từ Vườn Về TP.HCM</span>
          </h1>

          <p className="text-green-100 text-sm sm:text-base leading-relaxed max-w-xl">
            Sầu riêng Ri6 cơm vàng bao ngọt, chôm chôm nhãn giòn ngọt từ nhà vườn <strong>Chú Ba Tư (50 tuổi)</strong>. 100% minh bạch với mã QR quét nhật ký mùa vụ, được số hóa và đồng hành bởi Đoàn viên thanh niên.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveScreen('product_detail')}
              className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2 text-sm sm:text-base"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Khám Phá Nông Sản OCOP</span>
            </button>
            <button
              onClick={() => setActiveScreen('garden')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-5 py-3.5 rounded-2xl backdrop-blur transition flex items-center gap-2 text-sm sm:text-base border border-white/20"
            >
              <span>Xem Hồ Sơ Vườn Ba Tư</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Livestream Banner (If Live) */}
      {activeLive && (
        <section className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white text-red-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              Đang Phát Trực Tiếp Tại Vườn
            </div>
            <h3 className="text-xl sm:text-2xl font-black leading-snug">
              {activeLive.title}
            </h3>
            <p className="text-white/90 text-sm">
              Người live: <strong>{activeLive.hostName}</strong> • {activeLive.viewers.toLocaleString('vi-VN')} người đang xem • Chốt đơn giá ưu đãi trực tiếp
            </p>
          </div>

          <button
            onClick={() => setActiveScreen('live')}
            className="shrink-0 bg-white hover:bg-cream text-red-600 font-black px-6 py-3.5 rounded-2xl shadow-lg transition flex items-center gap-2"
          >
            <Video className="w-5 h-5 text-red-600" />
            <span>Vào Xem Live & Chốt Đơn</span>
          </button>
        </section>
      )}

      {/* Highlights 3 Pillars of Project */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-green-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-2xl text-green-700">
            🌾
          </div>
          <h3 className="font-bold text-lg text-ink">Chủ Vườn Ba Tư (50 tuổi)</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            2.5 ha sầu riêng Ri6 & chôm chôm canh tác hữu cơ tại Long Khánh. Giao diện quản lý đơn hàng chữ to, có giọng nói đọc đơn riêng.
          </p>
          <button
            onClick={() => setActiveScreen('orders')}
            className="text-green-700 font-bold text-xs hover:underline flex items-center gap-1"
          >
            <span>Trải nghiệm màn hình Chú Ba Tư</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-green-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-sun-light flex items-center justify-center text-2xl text-amber-600">
            🌟
          </div>
          <h3 className="font-bold text-lg text-ink">Đoàn Viên Làm Cầu Nối Số</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Thanh niên hỗ trợ chụp ảnh, thu âm giọng nói, dùng AI viết bài mô tả và phát sóng livestream bán nông sản tận gốc.
          </p>
          <button
            onClick={() => setActiveScreen('quick_post')}
            className="text-green-700 font-bold text-xs hover:underline flex items-center gap-1"
          >
            <span>Thử đăng bài bằng Giọng nói & AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-green-200 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl text-blue-700">
            🔍
          </div>
          <h3 className="font-bold text-lg text-ink">Mã QR Truy Xuất Nguồn Gốc</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Minh bạch từng công đoạn canh tác mùa vụ: ngày bón phân vi sinh, bao quả, kiểm tra an toàn thực phẩm OCOP 4 sao.
          </p>
          <button
            onClick={() => {
              setSelectedProductId(products[0].id);
              setQrModalProduct(products[0]);
            }}
            className="text-green-700 font-bold text-xs hover:underline flex items-center gap-1"
          >
            <span>Quét thử mã QR mùa vụ mẫu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-green-700 font-bold text-xs tracking-wider uppercase mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Đặc Sản Nổi Bật Đạt Chuẩn OCOP Đồng Nai</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
              Nông Sản Vào Mụ Thu Hoạch Hôm Nay
            </h2>
          </div>

          <button
            onClick={() => setActiveScreen('product_detail')}
            className="text-green-800 font-bold text-sm hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Xem tất cả {products.length} sản phẩm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map(p => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-green-200 shadow-soft hover:shadow-card transition flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                  ⭐ OCOP {p.star} SAO
                </span>
                <button
                  onClick={() => setQrModalProduct(p)}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur hover:bg-white text-green-800 p-2 rounded-xl shadow font-bold text-xs flex items-center gap-1"
                  title="Xem mã QR truy xuất"
                >
                  <QrCode className="w-4 h-4 text-green-700" />
                  <span>Mã QR</span>
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-earth font-medium mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-green-700" />
                    <span>{p.origin}</span>
                  </div>
                  <h3
                    onClick={() => {
                      setSelectedProductId(p.id);
                      setActiveScreen('product_detail');
                    }}
                    className="font-bold text-lg text-ink hover:text-green-700 cursor-pointer line-clamp-1"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">Giá bán tận vườn:</span>
                    <div className="text-xl font-black text-green-800">
                      {p.price.toLocaleString('vi-VN')} đ
                      <span className="text-xs font-normal text-gray-500"> / {p.unit}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(p.id, 1)}
                      className="bg-sun hover:bg-amber-500 text-earth-dark p-3 rounded-xl font-bold shadow transition flex items-center gap-1 text-xs"
                      title="Thêm vào giỏ"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Chọn mua</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agritourism & Map Teaser */}
      <section className="bg-gradient-to-br from-cream to-green-50 border border-green-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-green-200/80 text-green-900 px-3 py-1 rounded-full text-xs font-bold">
            ⭐ TÍNH NĂNG ĐIỂM CỘNG 2
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            Bản Đồ Nhà Vườn Kết Hợp Du Lịch Trải Nghiệm Sinh Thái
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Không chỉ đặt hàng giao về TP.HCM, du khách có thể trực tiếp đến vườn Chú Ba Tư tại Long Khánh để tự tay hái chôm chôm, học cách gõ chọn sầu riêng chín cây và nghe đờn ca tài tử bên suối.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveScreen('map')}
              className="bg-green-700 hover:bg-green-800 text-white font-bold px-5 py-3 rounded-xl text-sm shadow transition flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Khám Phá Bản Đồ 5 Điểm Trải Nghiệm</span>
            </button>
            <button
              onClick={() => setTourModalOpen(true)}
              className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-5 py-3 rounded-xl text-sm shadow transition"
            >
              Đặt Vé Tham Quan (50k/người)
            </button>
          </div>
        </div>

        <div className="w-full md:w-80 h-56 rounded-2xl overflow-hidden shadow-card border-4 border-white shrink-0 relative group cursor-pointer" onClick={() => setActiveScreen('map')}>
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80"
            alt="Vườn Ba Tư"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end p-4 text-white">
            <div>
              <p className="font-bold text-sm">Vườn Cây 2.5 Héc-ta Long Khánh</p>
              <p className="text-xs text-green-200">Bấm để mở bản đồ định vị tương tác</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
