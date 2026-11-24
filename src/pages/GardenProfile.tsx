import React, { useState } from 'react';
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
  Users,
  Pencil,
  Store,
  User,
  FileText,
  AlertCircle,
  Check,
  X,
  ExternalLink,
  Navigation,
  Compass,
  ArrowLeft
} from 'lucide-react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export const GardenProfile: React.FC = () => {
  const {
    garden,
    updateGarden,
    currentRole,
    currentUser,
    youthSupporters,
    products,
    setActiveScreen,
    openProductDetail,
    addToCart,
    setQrModalProduct,
    setTourModalOpen
  } = useApp();

  // Kiểm tra quyền chỉnh sửa: CHỈ chủ nhà vườn VÀ đúng vườn của mình mới có quyền chỉnh sửa
  // Khách hàng / Người mua chỉ được xem hồ sơ chứ không thể chỉnh sửa
  const isFarmer = currentRole === 'farmer' || currentUser?.role === 'farmer';
  const canEdit = isFarmer && (garden.id === 'g-batu' || garden.id === currentUser?.id);

  // Google Maps Search URL
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${garden.name}, ${garden.location}`
  )}`;

  // State cho Popup Chỉnh Sửa Hồ Sơ
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(garden.name);
  const [editOwner, setEditOwner] = useState(garden.owner);
  const [editLocation, setEditLocation] = useState(garden.location);
  const [editArea, setEditArea] = useState(garden.area);
  const [editCrops, setEditCrops] = useState(
    Array.isArray(garden.crops) ? garden.crops.join(', ') : (garden.crops || '')
  );
  const [editOcopRating, setEditOcopRating] = useState(garden.ocopRating || 4);
  const [editOcopCertNo, setEditOcopCertNo] = useState(garden.ocopCertNo);
  const [editStory, setEditStory] = useState(garden.story);
  const [editPhone, setEditPhone] = useState(garden.phone);
  const [formError, setFormError] = useState<string | null>(null);

  // Mở modal và đồng bộ dữ liệu hiện tại
  const handleOpenEdit = () => {
    setEditName(garden.name);
    setEditOwner(garden.owner);
    setEditLocation(garden.location);
    setEditArea(garden.area);
    setEditCrops(
      Array.isArray(garden.crops) ? garden.crops.join(', ') : (garden.crops || '')
    );
    setEditOcopRating(garden.ocopRating || 4);
    setEditOcopCertNo(garden.ocopCertNo);
    setEditStory(garden.story);
    setEditPhone(garden.phone);
    setFormError(null);
    setEditModalOpen(true);
  };

  // Xử lý lưu hồ sơ và kiểm tra validation 3 trường bắt buộc: Câu chuyện, Vị trí, Chứng nhận OCOP
  const handleSaveGarden = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Kiểm tra Vị trí (Bắt buộc)
    if (!editLocation.trim()) {
      setFormError('Vui lòng nhập Vị trí địa lý nhà vườn (Trường bắt buộc).');
      return;
    }

    // 2. Kiểm tra Chứng nhận OCOP (Bắt buộc)
    if (!editOcopCertNo.trim()) {
      setFormError('Vui lòng nhập Số chứng nhận OCOP của nhà vườn (Trường bắt buộc).');
      return;
    }

    // 3. Kiểm tra Câu chuyện (Bắt buộc)
    if (!editStory.trim()) {
      setFormError('Vui lòng nhập Câu chuyện làm vườn của nhà vườn (Trường bắt buộc).');
      return;
    }

    const cropsArray = editCrops
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    updateGarden({
      name: editName.trim() || garden.name,
      owner: editOwner.trim() || garden.owner,
      location: editLocation.trim(),
      area: editArea.trim() || garden.area,
      crops: cropsArray.length > 0 ? cropsArray : garden.crops,
      ocopRating: Number(editOcopRating),
      ocopCertNo: editOcopCertNo.trim(),
      story: editStory.trim(),
      phone: editPhone.trim() || garden.phone
    });

    setEditModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Nút quay lại Danh Sách Hồ Sơ Nhà Vườn (dành cho Khách hàng & Người mua) */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setActiveScreen('gardens')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-green-300 text-green-800 text-xs font-bold hover:bg-green-50 shadow-xs transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Danh Sách Tất Cả Nhà Vườn</span>
        </button>
        <span className="text-xs text-gray-500 font-medium hidden sm:inline">
          Hệ thống truy xuất hồ sơ OCOP tỉnh Đồng Nai
        </span>
      </div>

      {/* Cover and Profile Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-green-200 shadow-soft">
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={garden.coverImage}
            alt={garden.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute top-4 right-4 flex gap-2">
            <span className="bg-sun text-earth-dark font-black text-xs px-3 py-1.5 rounded-full shadow flex items-center gap-1">
              ⭐ CHỨNG NHẬN OCOP {garden.ocopRating} SAO ĐỒNG NAI
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

            <div className="flex flex-wrap items-center gap-2">
              {/* Nút Chỉnh Sửa Hồ Sơ: CHỈ chủ vườn có quyền sửa, khách hàng chỉ xem không sửa được */}
              {canEdit && (
                <button
                  type="button"
                  onClick={handleOpenEdit}
                  className="bg-white/95 hover:bg-white text-green-900 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition flex items-center gap-1.5 border border-green-300"
                >
                  <Pencil className="w-4 h-4 text-green-700" />
                  <span>Chỉnh Sửa Hồ Sơ Vườn</span>
                </button>
              )}

              {/* Nút Đặt Lịch Ghé Vườn: Chỉ hiển thị cho khách hàng/người mua, vai trò nhà vườn không cần */}
              {!isFarmer && (
                <button
                  type="button"
                  onClick={() => setTourModalOpen(true)}
                  className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow transition"
                >
                  Đặt Lịch Ghé Vườn
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100 bg-cream/50 p-4 border-b border-gray-100 text-xs sm:text-sm">
          <div className="p-2 text-center group">
            <span className="text-gray-500 block text-xs">Vị trí địa lý (Google Maps)</span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-900 font-bold hover:text-green-700 flex items-center justify-center gap-1 transition group-hover:underline"
              title="Bấm để mở bản đồ Google Maps"
            >
              <span>{garden.location}</span>
              <ExternalLink className="w-3.5 h-3.5 text-green-700 shrink-0" />
            </a>
          </div>
          <div className="p-2 text-center">
            <span className="text-gray-500 block text-xs">Diện tích canh tác</span>
            <strong className="text-green-900 font-bold">{garden.area}</strong>
          </div>
          <div className="p-2 text-center">
            <span className="text-gray-500 block text-xs">Cây trồng chủ lực</span>
            <strong className="text-green-900 font-bold">
              {Array.isArray(garden.crops) ? garden.crops.join(', ') : garden.crops}
            </strong>
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
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-green-100 text-green-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-ink">
                  Câu Chuyện Làm Vườn Của {garden.owner}
                </h2>
                <p className="text-xs text-gray-500">Gìn giữ vị ngọt & phương thức canh tác hữu cơ</p>
              </div>
            </div>

            {canEdit && (
              <button
                type="button"
                onClick={handleOpenEdit}
                className="text-xs font-bold text-green-800 hover:text-green-950 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 transition border border-green-200"
              >
                <Pencil className="w-3.5 h-3.5 text-green-700" />
                <span>Chỉnh sửa</span>
              </button>
            )}
          </div>

          <div className="prose text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="italic text-green-900 bg-green-50/70 p-4 rounded-2xl border-l-4 border-green-700">
              "{garden.story}"
            </p>
            <p>
              Trước đây, nông sản nhà vườn thường chỉ quen bán xô cả vườn cho thương lái thu mua với giá bấp bênh, bà con chưa rành dùng điện thoại thông minh hay đăng ảnh giới thiệu lên mạng xã hội.
            </p>
            <p>
              Từ khi có <strong>Tổ công tác thanh niên số hóa</strong> của Đoàn xã cắm chốt tại vườn, từng luống cây đã được gắn mã số truy xuất QR, chụp ảnh nhật ký chăm sóc bón phân hữu cơ vi sinh và đưa lên sàn <strong>TRẠM VƯỜN SỐ</strong>. Nhờ vậy, nhà vườn nay yên tâm chốt đơn trực tiếp hái quả chuyển xe lạnh về Sài Gòn mỗi ngày.
            </p>
          </div>

          {/* OCOP Certificate Card */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-10 h-10 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-earth-dark text-sm sm:text-base">
                  Chứng Nhận Nông Sản OCOP {garden.ocopRating} Sao Tỉnh Đồng Nai
                </h4>
                <p className="text-xs text-earth">
                  Mã số: <strong>{garden.ocopCertNo}</strong> • Cấp bởi UBND Tỉnh Đồng Nai
                </p>
              </div>
            </div>
            {canEdit ? (
              <button
                type="button"
                onClick={handleOpenEdit}
                className="bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-green-800 shadow-sm border border-amber-300 hover:bg-amber-100 transition flex items-center gap-1"
              >
                <Pencil className="w-3.5 h-3.5 text-green-700" />
                <span>Cập nhật OCOP</span>
              </button>
            ) : (
              <span className="hidden sm:inline bg-white px-3 py-1.5 rounded-lg text-xs font-bold text-green-800 shadow-sm border">
                Đạt chuẩn VietGAP
              </span>
            )}
          </div>
        </div>

        {/* 2 Youth Supporters Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-green-700" />
              <div>
                <h3 className="font-bold text-lg text-ink">Đoàn Viên Hỗ Trợ Số</h3>
                <p className="text-xs text-gray-500">2 Thanh niên phụ trách tại vườn</p>
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

      {/* =========================================================================
          BẢN ĐỒ VỊ TRÍ & CHỈ ĐƯỜNG GOOGLE MAPS (CHÍNH XÁC GPS)
          ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF7E9] text-[#269B55] flex items-center justify-center font-bold shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-ink">
                  Vị Trí & Chỉ Đường Đến {garden.name}
                </h2>
                <span className="bg-green-100 text-green-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  GPS Chuẩn Xác 100%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Địa chỉ: <strong>{garden.location}</strong> • Tọa độ GPS: <strong>{garden.coordinates || '10.9423° N, 107.2415° E'}</strong>
              </p>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#269B55] hover:bg-green-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-sm hover:shadow transition self-start sm:self-auto shrink-0"
          >
            <Navigation className="w-4 h-4" />
            <span>Mở Chỉ Đường Bằng Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Map Display & Quick Route Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Map Preview Box (2 cols) */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-gray-200 shadow-inner min-h-[320px] sm:min-h-[380px] bg-gray-100 group">
            {/* Embedded OpenStreetMap view centered on Long Khanh */}
            <iframe
              title="Bản đồ vị trí Nhà vườn Ba Tư"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src="https://www.openstreetmap.org/export/embed.html?bbox=107.2200%2C10.9300%2C107.2600%2C10.9550&amp;layer=mapnik&amp;marker=10.9423%2C107.2415"
              className="w-full h-full min-h-[320px] sm:min-h-[380px] rounded-2xl border-0"
            />

            {/* Clickable Overlay Link to Google Maps */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 bg-white/95 hover:bg-white backdrop-blur text-green-950 font-bold text-xs px-3 py-1.5 rounded-xl shadow-md border border-green-200 flex items-center gap-1.5 transition z-10"
            >
              <span>Xem trên Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-green-700" />
            </a>

            {/* Farm Pin Landmark Badge */}
            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur text-white p-3 rounded-2xl shadow-lg border border-white/20 text-xs space-y-1 max-w-sm pointer-events-none z-10">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <Store className="w-3.5 h-3.5" />
                <span>{garden.name}</span>
              </div>
              <p className="text-[11px] text-gray-200 line-clamp-1">
                📍 {garden.location}
              </p>
              <p className="text-[10px] text-gray-300 font-mono">
                Tọa độ GPS: 10.9423, 107.2415 (Định vị số hóa)
              </p>
            </div>
          </div>

          {/* Directions & Logistics Cards (1 col) */}
          <div className="space-y-3.5 flex flex-col justify-between">
            <div className="p-4 rounded-2xl bg-[#FAFCF8] border border-gray-200 space-y-2">
              <strong className="text-xs font-bold text-green-950 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-green-700" />
                <span>Chỉ dẫn đường đi thực tế:</span>
              </strong>
              <p className="text-xs text-gray-600 leading-relaxed">
                Từ Quốc Lộ 1A (Ngã ba Dầu Giây hướng về Long Khánh), rẽ vào đường Suối Tre - Bình Lộc chạy thẳng 1.5km. Nhìn bên tay phải có cổng chào màu xanh <strong>"Vườn Cây Sinh Thái Ba Tư"</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream border border-green-100 space-y-2">
              <strong className="text-xs font-bold text-green-950 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-green-700" />
                <span>Cự ly & Phương tiện di chuyển:</span>
              </strong>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li>• <strong>Từ TP.HCM:</strong> ~75 km (1h15 đi cao tốc TP.HCM - Long Thành - Dầu Giây).</li>
                <li>• <strong>Từ Biên Hòa:</strong> ~45 km qua QL1A hoặc đường ĐT768.</li>
                <li>• <strong>Đường vào vườn:</strong> Xe ô tô 4-16-29 chỗ vào tận sân vườn rộng rãi.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-green-950">Liên hệ đón khách tận vườn:</span>
                <span className="text-[11px] text-green-800 font-bold">Bác Ba Tư</span>
              </div>
              <a
                href={`tel:${garden.phone.replace(/[^0-9]/g, '')}`}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-green-100/50 border border-green-300 text-green-900 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-3.5 h-3.5 text-green-700" />
                <span>Gọi trực tiếp: {garden.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Garden Products List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-ink">
              Các Sản Phẩm Của {garden.name}
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

      {/* MODAL POPUP: CHỈNH SỬA HỒ SƠ NHÀ VƯỜN (CHỈ DÀNH CHO FARMER) */}
      <Dialog
        visible={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        header={
          <div className="flex items-center gap-3 w-full pr-2">
            <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center shrink-0 text-green-800">
              <Store className="w-5 h-5 text-green-800" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-green-950 leading-tight">
                Chỉnh Sửa Hồ Sơ Nhà Vườn
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Cập nhật câu chuyện, vị trí địa lý và thông tin chứng nhận OCOP
              </p>
            </div>
          </div>
        }
        className="w-full max-w-xl shadow-2xl rounded-3xl overflow-hidden"
        breakpoints={{ '960px': '85vw', '641px': '95vw' }}
        modal
      >
        <form onSubmit={handleSaveGarden} className="space-y-4 pt-1">
          {/* Banner thông báo quy chuẩn bắt buộc */}
          <div className="p-3 bg-green-50 rounded-2xl border border-green-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
            <div className="text-xs text-green-900 leading-relaxed">
              <strong className="text-green-950">Quy chuẩn hồ sơ OCOP:</strong> Thông tin{' '}
              <span className="font-bold underline">Vị trí địa lý</span>,{' '}
              <span className="font-bold underline">Chứng nhận OCOP</span> và{' '}
              <span className="font-bold underline">Câu chuyện làm vườn</span> là 3 tiêu chí bắt buộc nhằm minh bạch nguồn gốc sản phẩm tới người tiêu dùng.
            </div>
          </div>

          {/* Hộp cảnh báo lỗi validation */}
          {formError && (
            <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Thông tin nhận diện cơ bản */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-green-700" />
                <span>Tên Nhà Vườn / Hợp Tác Xã:</span>
              </label>
              <InputText
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Ví dụ: Nhà Vườn Ba Tự - Long Khánh"
                className="w-full text-xs rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-green-700" />
                <span>Tên Bác Chủ Vườn:</span>
              </label>
              <InputText
                value={editOwner}
                onChange={e => setEditOwner(e.target.value)}
                placeholder="Ví dụ: Chú Ba Tự (Nguyễn Văn Tư)"
                className="w-full text-xs rounded-xl"
                required
              />
            </div>
          </div>

          {/* TRƯỜNG BẮT BUỘC 1: VỊ TRÍ ĐỊA LÝ */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-green-700" />
                <span>Vị trí địa lý nhà vườn:</span>
              </span>
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                * Bắt buộc
              </span>
            </label>
            <InputText
              value={editLocation}
              onChange={e => setEditLocation(e.target.value)}
              placeholder="Ví dụ: Ấp Suối Tre, TP. Long Khánh, Tỉnh Đồng Nai"
              className="w-full text-xs rounded-xl"
              required
            />
          </div>

          {/* TRƯỜNG BẮT BUỘC 2: CHỨNG NHẬN OCOP */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                  <span>Số chứng nhận OCOP:</span>
                </span>
                <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  * Bắt buộc
                </span>
              </label>
              <InputText
                value={editOcopCertNo}
                onChange={e => setEditOcopCertNo(e.target.value)}
                placeholder="Ví dụ: OCOP-ĐN-2024-4S-089"
                className="w-full text-xs rounded-xl font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-green-700" />
                <span>Hạng sao OCOP:</span>
              </label>
              <Dropdown
                value={editOcopRating}
                onChange={e => setEditOcopRating(e.value)}
                options={[
                  { label: '⭐ OCOP 3 Sao', value: 3 },
                  { label: '⭐ OCOP 4 Sao (Tiêu biểu)', value: 4 },
                  { label: '⭐ OCOP 5 Sao (Quốc gia)', value: 5 }
                ]}
                className="w-full text-xs font-medium rounded-xl"
              />
            </div>
          </div>

          {/* TRƯỜNG BẮT BUỘC 3: CÂU CHUYỆN LÀM VƯỜN */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-green-700" />
                <span>Câu chuyện làm vườn & phương thức canh tác:</span>
              </span>
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                * Bắt buộc
              </span>
            </label>
            <textarea
              value={editStory}
              onChange={e => setEditStory(e.target.value)}
              rows={4}
              placeholder="Chia sẻ về nguồn gốc giống cây, tâm huyết chăm sóc thuận tự nhiên, gìn giữ đất đỏ bazan và sự đồng hành của thanh niên số hóa..."
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition leading-relaxed bg-white"
              required
            />
          </div>

          {/* Các trường bổ trợ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Diện tích canh tác:
              </label>
              <InputText
                value={editArea}
                onChange={e => setEditArea(e.target.value)}
                placeholder="Ví dụ: 2.5 ha"
                className="w-full text-xs rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Số điện thoại liên hệ:
              </label>
              <InputText
                value={editPhone}
                onChange={e => setEditPhone(e.target.value)}
                placeholder="0918.345.678"
                className="w-full text-xs rounded-xl"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Cây trồng chủ lực:
              </label>
              <InputText
                value={editCrops}
                onChange={e => setEditCrops(e.target.value)}
                placeholder="Sầu riêng Ri6, Chôm chôm..."
                className="w-full text-xs rounded-xl"
              />
            </div>
          </div>

          {/* Footer nút hành động */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setEditModalOpen(false)}
              className="w-1/3 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>Hủy / Đóng</span>
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-green-700 hover:bg-green-800 active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Lưu Thay Đổi Hồ Sơ</span>
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
