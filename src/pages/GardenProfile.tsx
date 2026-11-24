import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Award,
  Phone,
  Calendar,
  Sparkles,
  ShoppingBag,
  QrCode,
  ShieldCheck,
  CheckCircle,
  Users
} from 'lucide-react';

export const GardenProfile: React.FC = () => {
  const {
    garden,
    youthSupporters,
    products,
    setActiveScreen,
    openProductDetail,
    addToCart,
    setQrModalProduct,
    setTourModalOpen
  } = useApp();

  return (
    <div className="space-y-10">
      {/* Cover and Profile Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-green-200 shadow-soft">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={garden.coverImage}
            alt={garden.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-sun text-earth-dark font-black text-xs px-3 py-1.5 rounded-full shadow flex items-center gap-1">
              ⭐ CHỨNG NHẬN OCOP 4 SAO ĐỒNG NAI
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <div className="flex items-center gap-4">
              <img
                src={garden.avatar}
                alt={garden.owner}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <div>
                <span className="text-xs uppercase tracking-wider text-sun font-bold">
                  NHÀ VƯỜN TIÊU BIỂU OCOP ĐỒNG NAI
                </span>
                <h1 className="text-2xl sm:text-3xl font-black">{garden.name}</h1>
                <p className="text-sm text-green-200">
                  {garden.owner} • {garden.area} chuyên canh
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTourModalOpen(true)}
                className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow transition"
              >
                Đặt Lịch Ghé Vườn
              </button>
            </div>
          </div>
        </div>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 bg-cream/50 p-4 border-b border-gray-100 text-xs sm:text-sm">
          <div className="p-2 text-center">
            <span className="text-gray-500 block text-xs">Vị trí địa lý</span>
            <strong className="text-green-900 font-bold">Ấp Suối Tre, TP. Long Khánh</strong>
          </div>
          <div className="p-2 text-center">
            <span className="text-gray-500 block text-xs">Diện tích canh tác</span>
            <strong className="text-green-900 font-bold">{garden.area}</strong>
          </div>
          <div className="p-2 text-center">
            <span className="text-gray-500 block text-xs">Cây trồng chủ lực</span>
            <strong className="text-green-900 font-bold">Sầu riêng Ri6 & Chôm chôm</strong>
          </div>
          <div className="p-2 text-center">
            <span className="text-gray-500 block text-xs">Số chứng nhận OCOP</span>
            <strong className="text-green-900 font-bold">{garden.ocopCertNo}</strong>
          </div>
        </div>
      </div>

      {/* Story & Youth Supporters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Story Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink">
                Câu Chuyện Làm Vườn Thuận Tự Nhiên Của Chú Ba Tư
              </h2>
              <p className="text-xs text-gray-500">25 năm gìn giữ vị ngọt đất đỏ bazan</p>
            </div>
          </div>

          <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="italic text-green-900 bg-green-50/70 p-4 rounded-2xl border-l-4 border-green-700">
              "{garden.story}"
            </p>
            <p>
              Trước đây, chú Ba Tư chỉ quen bán xô cả vườn cho thương lái thu mua với giá bấp bênh. Chú không biết dùng điện thoại thông minh, không rành đăng ảnh lên mạng và người tiêu dùng ở TP.HCM thì khó lòng tìm mua được trái sầu riêng già chín cây nguyên chất.
            </p>
            <p>
              Từ khi có <strong>Tổ công tác thanh niên số hóa</strong> của Đoàn xã về cắm chốt tại vườn, từng cây sầu riêng Ri6 đã được gắn mã số, chụp ảnh quy trình bón phân trùn quế và đưa lên nền tảng <strong>TRẠM VƯỜN SỐ</strong>. Nhờ vậy, chú Ba Tư nay chỉ việc nghe chuông báo đơn mới và hái quả chuyển xe lạnh về Sài Gòn mỗi ngày.
            </p>
          </div>

          {/* OCOP Certificate Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-sun-light/50 to-amber-100/50 border border-amber-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-10 h-10 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-earth-dark text-sm sm:text-base">
                  Chứng Nhận Nông Sản OCOP 4 Sao Tỉnh Đồng Nai
                </h4>
                <p className="text-xs text-earth">
                  Mã số: <strong>{garden.ocopCertNo}</strong> • Cấp bởi UBND Tỉnh Đồng Nai
                </p>
              </div>
            </div>
            <span className="hidden sm:inline bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-green-800 shadow-sm border">
              Đạt chuẩn VietGAP
            </span>
          </div>
        </div>

        {/* 2 Youth Supporters Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-green-700" />
              <div>
                <h3 className="font-bold text-lg text-ink">Đoàn Viên Hỗ Trợ Số</h3>
                <p className="text-xs text-gray-500">2 Thanh niên phụ trách vườn Ba Tư</p>
              </div>
            </div>

            <div className="space-y-4">
              {youthSupporters.map(yt => (
                <div
                  key={yt.id}
                  className="p-4 rounded-2xl bg-cream border border-green-100 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={yt.avatar}
                      alt={yt.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-600"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-ink">{yt.name}</h4>
                      <p className="text-xs text-green-800 font-medium">{yt.role}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <p>📞 Điện thoại: <strong>{yt.phone}</strong></p>
                    <p>⏱️ Giờ tình nguyện: <strong className="text-green-700">{yt.volunteerHours} giờ</strong></p>
                    <p>📹 Đã livestream: <strong>{yt.sessionsLive} buổi</strong></p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {yt.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-white text-[10px] font-semibold text-green-900 px-2 py-0.5 rounded border border-green-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveScreen('volunteer')}
              className="w-full py-2.5 rounded-xl bg-green-100 hover:bg-green-200 text-green-800 font-bold text-xs transition text-center"
            >
              Xem Bảng Vàng & Giờ Tình Nguyện Chi Tiết ➔
            </button>
          </div>
        </div>
      </div>

      {/* Garden Products List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-ink">
              Các Sản Phẩm Của Nhà Vườn Ba Tư
            </h2>
            <p className="text-xs text-gray-500">
              Tuyển chọn trái cây tươi đạt chứng nhận OCOP xuất bán trong ngày
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-green-200 shadow-soft flex flex-col justify-between"
            >
              <div
                onClick={() => openProductDetail(p.id)}
                className="relative h-48 bg-gray-100 cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQrModalProduct(p);
                  }}
                  className="absolute bottom-2 right-2 bg-white/95 backdrop-blur text-green-800 px-2.5 py-1.5 rounded-xl shadow text-xs font-bold flex items-center gap-1"
                >
                  <QrCode className="w-3.5 h-3.5 text-green-700" />
                  <span>Quét QR mùa vụ</span>
                </button>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      ⭐ OCOP {p.star} Sao
                    </span>
                    <span className="text-[11px] text-gray-400">Kho: {p.inStock} {p.unit}</span>
                  </div>
                  <h3
                    onClick={() => openProductDetail(p.id)}
                    className="font-bold text-base text-ink hover:text-green-700 cursor-pointer"
                  >
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-lg font-black text-green-800">
                    {p.price.toLocaleString('vi-VN')} đ
                    <span className="text-xs font-normal text-gray-500"> / {p.unit}</span>
                  </div>

                  <button
                    onClick={() => addToCart(p.id, 1)}
                    className="bg-sun hover:bg-amber-500 text-earth-dark px-3 py-2 rounded-xl font-bold text-xs shadow flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Mua ngay</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
