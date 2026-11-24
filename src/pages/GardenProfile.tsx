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
  Video,
  HeartHandshake,
  Clock,
  ArrowRight,
  PlusCircle,
  Radio,
  Check,
  AlertCircle,
  Eye,
  Mic,
  Camera,
  ExternalLink,
  Pencil,
  Store,
  User,
  FileText,
  X
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
    liveStreams,
    setActiveScreen,
    openProductDetail,
    addToCart,
    setQrModalProduct,
    setTourModalOpen,
    showNotification
  } = useApp();

  // Kiểm tra vai trò nông dân (chủ nhà vườn)
  const isFarmer = currentRole === 'farmer' || currentUser?.role === 'farmer';

  // State cho Popup Chỉnh Sửa Hồ Sơ (tính năng từ develop)
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

  // Tab phụ bên trong trang Hồ sơ vườn
  const [currentSubTab, setCurrentSubTab] = useState<'profile_listings' | 'live_tour'>('profile_listings');

  // Lịch tour mẫu được đặt trước
  const sampleTours = [
    {
      id: 'tour-01',
      date: '28/11/2026',
      timeSlot: '08:30 - 11:30',
      guestName: 'Đoàn khách gia đình Anh Tuấn (TP.HCM)',
      visitors: 4,
      phone: '0909123456',
      status: 'confirmed',
      note: 'Hái sầu riêng chín cây ăn tại chỗ, nghe đờn ca tài tử'
    },
    {
      id: 'tour-02',
      date: '29/11/2026',
      timeSlot: '14:00 - 17:00',
      guestName: 'Nhóm bạn trẻ chị Lan Anh (Bình Thạnh)',
      visitors: 6,
      phone: '0918765432',
      status: 'confirmed',
      note: 'Chụp hình check-in vườn chôm chôm đỏ rực và quay clip TikTok cùng đoàn viên'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Banner thông báo: Nhà vườn được thanh niên hỗ trợ số hoá toàn diện */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-700 to-green-800 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <HeartHandshake className="w-6 h-6 text-sun" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-sun text-earth-dark text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Mô hình trọng điểm
              </span>
              <span className="text-xs font-bold text-green-100">
                Dự án Thanh niên tiếp sức OCOP Long Khánh
              </span>
            </div>
            <h3 className="font-black text-sm sm:text-base mt-0.5">
              Nhà Vườn Đã Được Tiếp Sức & Hỗ Trợ Số Hóa Trực Tiếp
            </h3>
            <p className="text-xs text-green-100">
              Đoàn viên thanh niên địa phương hỗ trợ trọn gói: Gắn mã QR truy xuất, phát trực tiếp bán tại vườn và đóng thùng giao xe lạnh.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveScreen('volunteer')}
          className="bg-white text-green-900 hover:bg-green-50 font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs whitespace-nowrap shrink-0"
        >
          Xem Đội Hỗ Trợ ➔
        </button>
      </div>

      {/* Sub Tabs Gọn Gàng Cho Mọi Lứa Tuổi (20-60 Tuổi) */}
      <div className="flex items-center p-1.5 bg-gray-100/90 rounded-2xl border border-gray-200 gap-1.5 max-w-xl mx-auto shadow-2xs">
        <button
          onClick={() => setCurrentSubTab('profile_listings')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
            currentSubTab === 'profile_listings'
              ? 'bg-white text-green-900 shadow-sm'
              : 'text-gray-600 hover:text-green-800'
          }`}
        >
          <span>🏡 Hồ Sơ & Sản Phẩm Vườn</span>
          <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-bold">
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setCurrentSubTab('live_tour')}
          className={`flex-1 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
            currentSubTab === 'live_tour'
              ? 'bg-white text-green-900 shadow-sm'
              : 'text-gray-600 hover:text-green-800'
          }`}
        >
          <span>📹 Lịch Livestream & Tour Vườn</span>
          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
            Live & Tour
          </span>
        </button>
      </div>

      {/* TAB 1: HỒ SƠ NHÀ VƯỜN & QUẢN LÝ TIN ĐĂNG NÔNG SẢN */}
      {currentSubTab === 'profile_listings' && (
        <div className="space-y-8 animate-fadeIn">
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
                      NHÀ VƯỜN ĐƯỢC ĐOÀN THANH NIÊN TIẾP SỨC
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black">{garden.name}</h1>
                    <p className="text-sm text-green-200">
                      {garden.owner} • {garden.area} chuyên canh • Tổ TN cắm chốt hỗ trợ
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* Nút Chỉnh Sửa Hồ Sơ dành riêng cho vai trò Chủ nhà vườn (commit 68ac3bd) */}
                  {isFarmer && (
                    <button
                      type="button"
                      onClick={handleOpenEdit}
                      className="bg-white hover:bg-green-50 text-green-900 border border-green-300 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-1.5"
                    >
                      <Pencil className="w-4 h-4 text-green-700" />
                      <span>Chỉnh Sửa Hồ Sơ Vườn</span>
                    </button>
                  )}

                  {/* Nút Đặt Lịch Ghé Vườn chỉ hiển thị cho khách hàng (commit 3d04487) */}
                  {!isFarmer && (
                    <button
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
                <span className="text-gray-500 block text-xs">Tình trạng hỗ trợ</span>
                <strong className="text-green-700 font-bold">✓ Đã tiếp sức 100%</strong>
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

          {/* Quản lý danh sách tin đăng sản phẩm kiểu Seller Center (Listing Status) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-ink flex items-center gap-2">
                  <span>Quản Lý Tin Đăng Nông Sản Nhà Vườn</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {products.length} mặt hàng
                  </span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Theo dõi trạng thái mở bán, gắn mã QR truy xuất và chỉnh sửa nhanh danh mục OCOP
                </p>
              </div>

              {/* Nút Đăng nhanh mở thẳng luồng Voice/AI */}
              <button
                onClick={() => {
                  setActiveScreen('quick_post');
                  showNotification('🎙️ Mở công cụ Đăng Nhanh Nông Sản bằng Giọng nói & AI cho Chú Ba Tư!');
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition"
              >
                <PlusCircle className="w-4 h-4 text-sun" />
                <span>+ Đăng Nhanh Sản Phẩm Mới (Giọng Nói / AI)</span>
              </button>
            </div>

            {/* Bảng Danh Sách Tin Đăng */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => {
                const isAvailable = p.inStock > 0;
                return (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-gray-200 overflow-hidden bg-white hover:border-green-300 transition shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 bg-gray-100">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Trạng thái tin đăng */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase shadow flex items-center gap-1 ${
                            isAvailable ? 'bg-green-700 text-white' : 'bg-red-600 text-white'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            {isAvailable ? 'Đang mở bán' : 'Tạm hết hàng'}
                          </span>
                        </div>

                        {/* Huy hiệu QR */}
                        <div className="absolute top-2.5 right-2.5">
                          <span className="bg-white/95 backdrop-blur text-green-900 text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                            <QrCode className="w-3 h-3 text-green-700" />
                            <span>Đã gắn QR</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                            ⭐ OCOP {p.star} Sao
                          </span>
                          <span className="text-gray-500 font-medium">Kho: <strong className="text-ink">{p.inStock} {p.unit}</strong></span>
                        </div>

                        <h3 className="font-bold text-sm sm:text-base text-ink line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {p.description}
                        </p>

                        <div className="pt-2 text-green-800 font-black text-base">
                          {p.price.toLocaleString('vi-VN')} đ <span className="text-xs text-gray-500 font-normal">/ {p.unit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => openProductDetail(p.id)}
                        className="flex-1 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:text-green-800 hover:border-green-400 font-bold text-xs transition text-center"
                      >
                        Xem chi tiết
                      </button>
                      <button
                        onClick={() => setQrModalProduct(p)}
                        className="p-1.5 rounded-lg bg-green-50 text-green-800 hover:bg-green-100 border border-green-200 transition"
                        title="Xem mã QR mùa vụ"
                      >
                        <QrCode className="w-4 h-4 text-green-700" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LỊCH LIVESTREAM & LỊCH TOUR TRẢI NGHIỆM VƯỜN */}
      {currentSubTab === 'live_tour' && (
        <div className="space-y-8 animate-fadeIn">
          {/* 1. LỊCH PHÁT SÓNG LIVESTREAM TẠI VƯỜN */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Video className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                    <span>Lịch Livestream Bán Nông Sản Trực Tiếp Tại Vườn</span>
                    <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase animate-pulse">
                      Live Stream
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Phân loại: Đang phát sóng • Sắp diễn ra • Đã phát để cộng giờ tình nguyện số
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveScreen('live');
                  showNotification('Đang chuyển đến phòng Livestream bán hàng nông sản trực tiếp!');
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Radio className="w-4 h-4 animate-ping" />
                <span>Vào Phòng Live ➔</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveStreams.map(live => (
                <div
                  key={live.id}
                  className={`rounded-2xl border p-4 transition space-y-3 flex flex-col justify-between ${
                    live.isLiveNow
                      ? 'border-red-400 bg-red-50/20 shadow-md ring-2 ring-red-300/40'
                      : 'border-green-200 bg-gray-50/50 hover:border-green-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-200">
                      <img
                        src={live.cover}
                        alt={live.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        {live.isLiveNow ? (
                          <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shadow">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                            Đang Live ({live.viewers} xem)
                          </span>
                        ) : (
                          <span className="bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {live.time}
                          </span>
                        )}
                      </div>

                      {/* Trạng thái tag */}
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-white/90 text-[10px] font-bold px-2 py-0.5 rounded shadow text-gray-800">
                          {live.isLiveNow ? '🔴 Đang phát' : '⏳ Sắp phát'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-ink line-clamp-2">{live.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-green-700" />
                        <span>Host: {live.hostName}</span>
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{live.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-green-800">
                      {live.isLiveNow ? '🔥 Đang chốt đơn' : '🎖️ Đã lên lịch live'}
                    </span>
                    <button
                      onClick={() => {
                        if (live.isLiveNow) {
                          setActiveScreen('live');
                        } else {
                          showNotification(`Đã ghi nhớ buổi live: "${live.title}"`);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                        live.isLiveNow
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
                          : 'bg-green-100 hover:bg-green-200 text-green-900 border border-green-200'
                      }`}
                    >
                      {live.isLiveNow ? 'Xem Phòng Live' : 'Nhắc Lịch'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. DANH SÁCH LỊCH TOUR TRẢI NGHIỆM VƯỜN SẮP TỚI */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                    <span>Lịch Khách Đăng Ký Trải Nghiệm Vườn Sắp Tới</span>
                    <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
                      {sampleTours.length} đoàn
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Đoàn viên chủ động hỗ trợ Chú Ba Tư đón khách, chuẩn bị trái cây mẫu và hỗ trợ góc quay/chụp ảnh
                  </p>
                </div>
              </div>

              <button
                onClick={() => setTourModalOpen(true)}
                className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-4 py-2 rounded-xl text-xs sm:text-sm shadow transition"
              >
                + Đặt Thêm Lịch Tour Mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleTours.map(t => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl border-2 border-green-200 bg-cream/40 space-y-3.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2 border-b border-green-200/60 pb-3">
                    <div>
                      <span className="bg-green-700 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                        Đã xác nhận
                      </span>
                      <h4 className="font-black text-base text-ink mt-1.5">{t.guestName}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                        <span>📞 {t.phone}</span>
                        <span>•</span>
                        <strong className="text-green-800">{t.visitors} người</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-gray-400 block font-medium">Thời gian:</span>
                      <strong className="text-xs font-black text-amber-800 block">{t.date}</strong>
                      <span className="text-[11px] text-gray-600 font-semibold">{t.timeSlot}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-green-100 text-xs text-gray-700 space-y-1">
                    <p>🎯 <strong>Mục đích trải nghiệm:</strong> {t.note}</p>
                    <p className="text-green-700 font-semibold">
                      🤝 <strong>Nhiệm vụ đoàn viên:</strong> Đón khách tại cổng vườn, phát nón lá, hướng dẫn hái sầu riêng & chôm chôm.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={`tel:${t.phone}`}
                      className="px-3 py-1.5 rounded-lg bg-green-50 text-green-800 hover:bg-green-100 border border-green-300 font-bold text-xs flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-green-700" />
                      <span>Gọi xác nhận</span>
                    </a>

                    <span className="text-[11px] text-gray-400">
                      Giá vé: 50.000 đ/khách
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* MODAL CHỈNH SỬA HỒ SƠ NHÀ VƯỜN (CHO VAI TRÒ CHỦ VƯỜN) */}
      <Dialog
        visible={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        header={
          <div className="flex items-center gap-2.5 text-green-950 font-black text-base sm:text-lg">
            <Store className="w-5 h-5 text-green-700" />
            <span>Chỉnh Sửa Thông Tin Hồ Sơ Nhà Vườn OCOP</span>
          </div>
        }
        className="w-full max-w-2xl shadow-2xl rounded-3xl overflow-hidden"
        breakpoints={{ '960px': '85vw', '641px': '95vw' }}
        modal
      >
        <form onSubmit={handleSaveGarden} className="space-y-4 pt-2">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-900 leading-relaxed">
            🌿 <strong>Lưu ý cho Chủ vườn & Đoàn viên:</strong> Để hồ sơ được duyệt và xuất hiện chuẩn OCOP, bắt buộc phải cập nhật đủ <strong>Vị trí địa lý</strong>, <strong>Số chứng nhận OCOP</strong> và <strong>Câu chuyện làm vườn</strong>.
          </div>

          {/* Hàng 1: Tên vườn & Tên chủ vườn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-green-700" />
                <span>Tên nhà vườn:</span>
              </label>
              <InputText
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Ví dụ: Vườn Sầu Riêng & Chôm Chôm Ba Tư"
                className="w-full text-xs rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-green-700" />
                <span>Họ và tên chủ vườn:</span>
              </label>
              <InputText
                value={editOwner}
                onChange={e => setEditOwner(e.target.value)}
                placeholder="Ví dụ: Chú Ba Tư (Nguyễn Văn Tư)"
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
                <span>Vị trí địa lý (Ấp / Xã / TP. Long Khánh):</span>
              </span>
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                * Bắt buộc
              </span>
            </label>
            <InputText
              value={editLocation}
              onChange={e => setEditLocation(e.target.value)}
              placeholder="Ví dụ: Ấp Suối Tre, Xã Bình Lộc, TP. Long Khánh, Đồng Nai"
              className="w-full text-xs rounded-xl"
              required
            />
          </div>

          {/* TRƯỜNG BẮT BUỘC 2: SỐ CHỨNG NHẬN OCOP & HẠNG SAO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
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
