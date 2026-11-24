import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LiveStream as LiveStreamType } from '../types';
import {
  Video,
  Heart,
  Send,
  ShoppingBag,
  Users,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Bell,
  Search,
  Filter,
  Radio,
  Eye,
  CheckCircle2,
  Share2,
  PlusCircle,
  Store,
  ChevronRight,
  ExternalLink,
  Plus,
  X,
  Check,
  User,
  Tag as TagIcon
} from 'lucide-react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export const LiveStream: React.FC = () => {
  const {
    liveStreams,
    likeLiveStream,
    addLiveComment,
    addToCart,
    openProductDetail,
    showNotification
  } = useApp();

  // State Filters
  const [selectedWard, setSelectedWard] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'live' | 'upcoming' | 'ended'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active watching live stream ID
  const [activeLiveId, setActiveLiveId] = useState<string>('live-01');
  const [commentText, setCommentText] = useState('');

  // Create stream modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newFarmName, setNewFarmName] = useState('');
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newWard, setNewWard] = useState('Phường Suối Tre');
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('Hôm nay - 19:30');
  const [newProduct, setNewProduct] = useState('Sầu riêng Ri6');
  const [newDealPrice, setNewDealPrice] = useState('110.000 đ/kg');
  const [newYouthHost, setNewYouthHost] = useState('Nguyễn Văn Nam (Đoàn viên)');

  // Local list of streams allowing user to add new registered streams
  const [customStreams, setCustomStreams] = useState<LiveStreamType[]>([]);

  // Clean ward options for creation modal to prevent truncation
  const modalWardOptions = useMemo(() => [
    { label: 'Phường Suối Tre', value: 'Phường Suối Tre' },
    { label: 'Xã Bình Lộc', value: 'Xã Bình Lộc' },
    { label: 'Phường Xuân An', value: 'Phường Xuân An' },
    { label: 'Phường Xuân Bình', value: 'Phường Xuân Bình' },
    { label: 'Phường Phú Bình', value: 'Phường Phú Bình' },
    { label: 'Xã Hàng Gòn', value: 'Xã Hàng Gòn' },
    { label: 'Xã Bảo Quang', value: 'Xã Bảo Quang' },
    { label: 'Xã Tân Triều', value: 'Xã Tân Triều' }
  ], []);

  // Combined streams list
  const allStreams = useMemo(() => {
    return [...customStreams, ...liveStreams];
  }, [customStreams, liveStreams]);

  // List of unique Wards/Communes across all streams + all Long Khanh key wards
  const availableWards = useMemo(() => {
    return [
      { label: 'Tất cả khu vực (Phường/Xã)', value: 'all' },
      { label: 'Phường Suối Tre (Vườn Ba Tư)', value: 'Phường Suối Tre' },
      { label: 'Xã Bình Lộc (Vườn Chú Sáu Dân)', value: 'Xã Bình Lộc' },
      { label: 'Phường Xuân An (Vườn Chị Loan)', value: 'Phường Xuân An' },
      { label: 'Phường Xuân Bình (Vườn Bác Tám)', value: 'Phường Xuân Bình' },
      { label: 'Phường Phú Bình (Nông Trại Hoàng Long)', value: 'Phường Phú Bình' },
      { label: 'Xã Hàng Gòn (HTX Điều Vàng)', value: 'Xã Hàng Gòn' },
      { label: 'Xã Bảo Quang (Vườn Út Điền)', value: 'Xã Bảo Quang' },
      { label: 'Xã Tân Triều (Làng Bưởi Vĩnh Cửu)', value: 'Xã Tân Triều' }
    ];
  }, []);

  // Filtered streams based on Ward, Status, Search
  const filteredStreams = useMemo(() => {
    return allStreams.filter(stream => {
      // 1. Ward Filter
      if (selectedWard !== 'all') {
        const streamWard = stream.ward || '';
        const streamLoc = stream.location || '';
        if (!streamWard.includes(selectedWard) && !streamLoc.includes(selectedWard)) {
          return false;
        }
      }

      // 2. Status Filter
      if (selectedStatus === 'live' && !stream.isLiveNow) return false;
      if (selectedStatus === 'upcoming' && (stream.status !== 'upcoming' || stream.isLiveNow)) return false;
      if (selectedStatus === 'ended' && stream.status !== 'ended') return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = stream.title.toLowerCase().includes(q);
        const matchFarm = (stream.farmName || '').toLowerCase().includes(q);
        const matchFarmer = (stream.farmerName || '').toLowerCase().includes(q);
        const matchHost = (stream.hostName || '').toLowerCase().includes(q);
        const matchLoc = (stream.location || '').toLowerCase().includes(q);
        const matchProd = (stream.featuredProduct?.name || '').toLowerCase().includes(q);
        if (!matchTitle && !matchFarm && !matchFarmer && !matchHost && !matchLoc && !matchProd) {
          return false;
        }
      }

      return true;
    });
  }, [allStreams, selectedWard, selectedStatus, searchQuery]);

  // The active stream currently displayed in the spotlight video player
  const activeLive = useMemo(() => {
    return (
      allStreams.find(l => l.id === activeLiveId) ||
      allStreams.find(l => l.isLiveNow) ||
      allStreams[0]
    );
  }, [allStreams, activeLiveId]);

  // Statistics counters
  const liveCount = allStreams.filter(s => s.isLiveNow).length;
  const totalViewers = allStreams.reduce((sum, s) => sum + (s.isLiveNow ? s.viewers : 0), 0);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addLiveComment(activeLive.id, commentText);
    setCommentText('');
    showNotification('Đã gửi bình luận trực tiếp vào phiên livestream!');
  };

  const handleQuickBuyOnLive = () => {
    if (activeLive.featuredProduct) {
      addToCart(activeLive.featuredProduct.id, 2);
      showNotification(`🎉 Đã chốt đơn 2 phần "${activeLive.featuredProduct.name}" từ ${activeLive.farmName || 'nhà vườn'}!`);
    }
  };

  const handleCreateStreamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmName.trim() || !newTitle.trim()) {
      showNotification('Vui lòng điền đủ tên nhà vườn và tiêu đề buổi live');
      return;
    }

    const newStreamItem: LiveStreamType = {
      id: `live-custom-${Date.now()}`,
      title: newTitle,
      farmName: newFarmName,
      farmerName: newFarmerName || 'Nhà vườn',
      ward: newWard,
      district: 'TP. Long Khánh',
      hostName: newYouthHost,
      hostAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      time: newTime,
      status: 'upcoming',
      isLiveNow: false,
      viewers: 0,
      likes: 120,
      category: 'mixed',
      location: `${newFarmName}, ${newWard}, TP. Long Khánh`,
      cover: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      description: `Phiên live tiếp sức nhà vườn ${newFarmName} do Đoàn thanh niên hỗ trợ số hóa và phát sóng trực tiếp giới thiệu ${newProduct}.`,
      featuredProduct: {
        id: 'sp-01',
        name: newProduct,
        dealPrice: newDealPrice,
        originalPrice: '135.000 đ/kg',
        coupon: 'LIVEFARM10K'
      },
      mockComments: [
        { user: 'Hệ thống', text: 'Phiên live đã được tạo thành công và lên lịch phát sóng.', time: 'Vừa xong' }
      ]
    };

    setCustomStreams(prev => [newStreamItem, ...prev]);
    setCreateModalOpen(false);
    showNotification(`🎉 Đã tạo lịch phát sóng livestream cho ${newFarmName} (+2 giờ tình nguyện đoàn viên)!`);
    setActiveLiveId(newStreamItem.id);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner: TRUNG TÂM LIVESTREAM NÔNG SẢN CÁC NHÀ VƯỜN ĐỒNG NAI */}
      <div className="bg-[#164e23] text-white p-6 sm:p-8 rounded-3xl shadow-md border border-[#1b5e20] space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#d32f2f] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span>TRUNG TÂM LIVESTREAM NÔNG SẢN CÁC NHÀ VƯỜN ĐỒNG NAI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Tổng Hợp Luồng Live Tận Gốc Các Nhà Vườn
            </h1>
            <p className="text-xs sm:text-sm text-green-100 leading-relaxed font-normal">
              Kênh truyền hình số hóa nông nghiệp: Đoàn viên thanh niên hỗ trợ livestream trực tiếp tại vườn của các hộ nông dân tại các phường/xã. Người tiêu dùng TP.HCM mắt thấy tai nghe, chốt đơn hái tại cây chuyển xe lạnh giao trong ngày.
            </p>
          </div>

          {/* Action Button: Rõ ràng, nền sáng tương phản cao, không bị chìm */}
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white hover:bg-green-50 text-green-950 font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all self-start lg:self-auto shrink-0 border-2 border-white"
            title="Đoàn viên & Nhà vườn đăng ký lịch phát sóng livestream"
          >
            <div className="w-9 h-9 rounded-xl bg-green-700 flex items-center justify-center text-white group-hover:scale-105 transition-transform shrink-0">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="font-black text-sm tracking-tight text-green-950">Đăng Ký Phiên Live Vườn</span>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              </div>
              <span className="text-[11px] text-green-800 font-bold mt-0.5">
                Hỗ trợ kỹ thuật • +2h tình nguyện
              </span>
            </div>
          </button>
        </div>

        {/* 4 Thẻ Thống Kê Tổng Quan */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-green-800/60">
          <div className="bg-[#0f3d1b] border border-white/10 rounded-2xl p-3 sm:p-4 text-white">
            <span className="text-[11px] text-green-200 font-medium block mb-1">Nhà vườn đang phát</span>
            <div className="text-base sm:text-lg font-black text-sun flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span>{allStreams.filter(s => s.isLiveNow).length || 1} Vườn</span>
            </div>
          </div>

          <div className="bg-[#0f3d1b] border border-white/10 rounded-2xl p-3 sm:p-4 text-white">
            <span className="text-[11px] text-green-200 font-medium block mb-1">Khách đang xem live</span>
            <div className="text-base sm:text-lg font-black text-sun flex items-center gap-2">
              <Users className="w-4 h-4 text-green-300" />
              <span>{totalViewers > 0 ? totalViewers.toLocaleString('vi-VN') : '1.428'}</span>
            </div>
          </div>

          <div className="bg-[#0f3d1b] border border-white/10 rounded-2xl p-3 sm:p-4 text-white">
            <span className="text-[11px] text-green-200 font-medium block mb-1">Khu vực phường/xã</span>
            <div className="text-base sm:text-lg font-black text-sun flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-300" />
              <span>8 Địa bàn</span>
            </div>
          </div>

          <div className="bg-[#0f3d1b] border border-white/10 rounded-2xl p-3 sm:p-4 text-white">
            <span className="text-[11px] text-green-200 font-medium block mb-1">Đơn chốt hôm nay</span>
            <div className="text-base sm:text-lg font-black text-sun flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-green-300" />
              <span>450+ Đơn</span>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR: WARD / COMMUNE FILTER + STATUS FILTER + SEARCH */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-green-200 shadow-soft space-y-4 sticky top-20 z-30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Ward / Commune Filter Dropdown & Title */}
          <div className="flex items-center gap-3 flex-wrap flex-1">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 shrink-0">
              <MapPin className="w-4 h-4 text-green-700" />
              <span>Khu vực Phường / Xã:</span>
            </div>
            <div className="w-full sm:w-72">
              <Dropdown
                value={selectedWard}
                onChange={e => setSelectedWard(e.value)}
                options={availableWards}
                className="w-full text-xs font-medium"
                placeholder="Chọn phường / xã"
              />
            </div>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm theo nhà vườn, chủ vườn, sầu riêng, bưởi..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none"
            />
          </div>
        </div>

        {/* Quick Filter Chips: Status & Wards */}
        <div className="flex items-center justify-between gap-2 flex-wrap pt-3 border-t border-gray-100">
          {/* Status buttons */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-gray-500 font-bold mr-1">Trạng thái:</span>
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                selectedStatus === 'all'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả ({allStreams.length})
            </button>
            <button
              onClick={() => setSelectedStatus('live')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                selectedStatus === 'live'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>Đang phát ({allStreams.filter(s => s.isLiveNow).length})</span>
            </button>
            <button
              onClick={() => setSelectedStatus('upcoming')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1 ${
                selectedStatus === 'upcoming'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Sắp diễn ra ({allStreams.filter(s => s.status === 'upcoming').length})</span>
            </button>
            <button
              onClick={() => setSelectedStatus('ended')}
              className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1 ${
                selectedStatus === 'ended'
                  ? 'bg-gray-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Xem lại clip ({allStreams.filter(s => s.status === 'ended').length})</span>
            </button>
          </div>

          {/* Quick Ward Chips for 1-click select */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {['Phường Suối Tre', 'Xã Bình Lộc', 'Xã Tân Triều', 'Phường Xuân An', 'Xã Hàng Gòn'].map(w => (
              <button
                key={w}
                onClick={() => setSelectedWard(selectedWard === w ? 'all' : w)}
                className={`text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap transition border ${
                  selectedWard === w
                    ? 'bg-green-100 border-green-600 text-green-900 font-bold'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                📍 {w.replace('Phường ', 'P. ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN SECTION: LIVE SPOTLIGHT PLAYER + REAL-TIME CHAT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left (2 cols): Spotlight Interactive Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-black aspect-video sm:aspect-[16/10] shadow-card flex items-center justify-center border-2 border-red-500">
            <img
              src={activeLive.cover}
              alt={activeLive.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Top Bar on Video: Ward & Viewers count */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10 flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/20">
                {activeLive.isLiveNow ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                    <span className="font-black text-red-400">TRỰC TIẾP TẠI GỐC CÂY</span>
                    <span className="text-gray-400">|</span>
                    <Users className="w-3.5 h-3.5 text-sun" />
                    <span className="font-bold">{activeLive.viewers.toLocaleString('vi-VN')} người xem</span>
                  </>
                ) : (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="font-bold text-amber-300">
                      {activeLive.status === 'upcoming' ? 'LỊCH PHÁT SẮP TỚI' : 'PHIÊN PHÁT LẠI'}
                    </span>
                    <span className="text-gray-400">|</span>
                    <span>{activeLive.time}</span>
                  </>
                )}
              </div>

              {/* Ward & District Badge on video */}
              <div className="flex items-center gap-2 bg-green-950/80 backdrop-blur px-3 py-1.5 rounded-full border border-green-500/40 text-xs font-bold text-green-300">
                <MapPin className="w-3.5 h-3.5 text-sun" />
                <span>{activeLive.ward || 'TP. Long Khánh'}</span>
              </div>
            </div>

            {/* Center Info Overlay */}
            <div className="absolute text-center text-white pointer-events-none p-4 max-w-xl">
              <div className="w-14 h-14 rounded-full bg-red-600/90 backdrop-blur mx-auto flex items-center justify-center text-white mb-2 shadow-lg animate-pulse">
                <Video className="w-7 h-7" />
              </div>
              <div className="inline-flex items-center gap-2 bg-black/60 px-3 py-0.5 rounded-full text-xs text-sun font-bold mb-1.5">
                <Store className="w-3.5 h-3.5" />
                <span>{activeLive.farmName || 'Nhà vườn tiêu biểu'}</span>
                <span>• Bác chủ vườn: {activeLive.farmerName || 'Chủ vườn'}</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black drop-shadow leading-snug">
                {activeLive.title}
              </h2>
              <p className="text-xs text-green-200 mt-1.5 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sun" />
                <span>{activeLive.location}</span>
              </p>
            </div>

            {/* Floating Like Button */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-1.5 z-20">
              <button
                onClick={() => likeLiveStream(activeLive.id)}
                className="w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition"
                title="Bấm để thả tim ủng hộ nhà vườn"
              >
                <Heart className="w-6 h-6 fill-white" />
              </button>
              <span className="text-white text-[11px] font-bold bg-black/70 px-2 py-0.5 rounded-full backdrop-blur">
                {activeLive.likes.toLocaleString('vi-VN')}
              </span>
            </div>

            {/* Pinned Deal Product on Video */}
            {activeLive.featuredProduct && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-green-200 z-10">
                <div className="space-y-0.5">
                  <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded uppercase flex items-center gap-1 w-fit">
                    <Sparkles className="w-3 h-3 text-red-600" />
                    <span>ƯU ĐÃI CHỐT TRÊN LIVE</span>
                  </span>
                  <h4
                    onClick={() => openProductDetail(activeLive.featuredProduct!.id)}
                    className="font-bold text-xs sm:text-sm text-ink line-clamp-1 cursor-pointer hover:text-green-700"
                  >
                    {activeLive.featuredProduct.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-black text-red-600 text-sm">
                      {activeLive.featuredProduct.dealPrice}
                    </span>
                    <span className="line-through text-gray-400 text-[11px]">
                      {activeLive.featuredProduct.originalPrice}
                    </span>
                    <span className="bg-sun text-earth-dark text-[10px] font-black px-1.5 py-0.2 rounded">
                      MÃ: {activeLive.featuredProduct.coupon}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleQuickBuyOnLive}
                  className="shrink-0 bg-sun hover:bg-amber-500 text-earth-dark font-black px-3.5 py-2.5 rounded-xl text-xs shadow flex items-center gap-1 transition"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Chốt Đơn</span>
                </button>
              </div>
            )}
          </div>

          {/* Farm & Host Information Strip */}
          <div className="bg-white p-4 rounded-2xl border border-green-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={activeLive.hostAvatar}
                alt={activeLive.hostName}
                className="w-12 h-12 rounded-xl object-cover border-2 border-green-600 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-ink">{activeLive.farmName}</h3>
                  <Tag value={activeLive.ward} severity="success" className="text-[10px]" />
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  Đoàn viên tiếp sức: <strong>{activeLive.hostName}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showNotification('Đã sao chép liên kết phiên livestream để chia sẻ!');
                }}
                className="px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right (1 col): Real-time Chat & Comments Panel */}
        <div className="bg-white rounded-3xl border border-green-200 shadow-soft flex flex-col h-[520px]">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-ink flex items-center gap-1.5">
                <Users className="w-4 h-4 text-green-700" />
                <span>Bình Luận & Chốt Nhanh</span>
              </h3>
              <span className="text-[10px] text-gray-400">Kết nối trực tiếp nhà vườn & bà con TP.HCM</span>
            </div>
            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
              Thời gian thực
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {activeLive.mockComments && activeLive.mockComments.length > 0 ? (
              activeLive.mockComments.map((c, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-green-900 font-bold">{c.user}</strong>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{c.text}</p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                <span className="text-3xl block mb-2">💬</span>
                <span>Hãy là người đầu tiên gửi lời chào hoặc đặt câu hỏi cho nhà vườn!</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendComment} className="p-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Gửi bình luận: 'Chốt 2 quả sầu riêng giao Q.1'..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white p-2.5 rounded-xl shadow-sm transition"
              title="Gửi bình luận"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* SECTION: ALL FARM LIVESTREAMS GRID (AGGREGATION) */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-green-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-800 bg-green-100 px-3 py-1 rounded-full mb-1">
              <Store className="w-3.5 h-3.5 text-sun" />
              <span>DANH SÁCH TỔNG HỢP CÁC NHÀ VƯỜN ĐANG VÀ SẮP LIVESTREAM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-ink">
              Các Luồng Trực Tiếp Theo Từng Phường / Xã ({filteredStreams.length} phiên)
            </h2>
          </div>

          <div className="text-xs text-gray-500">
            Hiển thị kết quả cho: <strong className="text-green-800">{selectedWard === 'all' ? 'Toàn bộ địa bàn' : selectedWard}</strong>
          </div>
        </div>

        {filteredStreams.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-green-200 space-y-3">
            <span className="text-4xl block">🔍</span>
            <h3 className="font-bold text-base text-gray-800">Không tìm thấy phiên livestream phù hợp</h3>
            <p className="text-xs text-gray-500">Hãy thử đổi bộ lọc Phường/Xã hoặc xóa từ khóa tìm kiếm</p>
            <Button
              onClick={() => {
                setSelectedWard('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              label="Xem tất cả nhà vườn"
              className="p-button-success p-button-sm text-xs font-bold"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStreams.map(stream => {
              const isSelected = stream.id === activeLive.id;

              return (
                <div
                  key={stream.id}
                  className={`bg-white rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-soft hover:shadow-card group ${
                    isSelected ? 'ring-2 ring-green-600 border-green-600' : 'border-green-200 hover:border-green-400'
                  }`}
                >
                  {/* Thumbnail / Header */}
                  <div>
                    <div className="relative aspect-video overflow-hidden bg-cream">
                      <img
                        src={stream.cover}
                        alt={stream.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30"></div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {stream.isLiveNow ? (
                          <span className="bg-red-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                            <span>ĐANG LIVE • {stream.viewers.toLocaleString('vi-VN')}</span>
                          </span>
                        ) : stream.status === 'upcoming' ? (
                          <span className="bg-amber-500 text-earth-dark font-black text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                            <Calendar className="w-3 h-3" />
                            <span>SẮP LIVE</span>
                          </span>
                        ) : (
                          <span className="bg-gray-800 text-gray-200 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                            <Clock className="w-3 h-3" />
                            <span>XEM LẠI</span>
                          </span>
                        )}

                        {/* Ward Badge */}
                        <span className="bg-green-800/90 backdrop-blur text-sun text-[10px] font-black px-2.5 py-0.5 rounded-full shadow border border-green-700">
                          📍 {stream.ward || 'Long Khánh'}
                        </span>
                      </div>

                      {/* Bottom Title on Thumbnail */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[11px] font-black text-sun flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          <span>{stream.farmName}</span>
                          <span className="text-gray-300 font-normal">({stream.farmerName})</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 space-y-3">
                      <h3
                        onClick={() => {
                          setActiveLiveId(stream.id);
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className="font-bold text-sm text-ink line-clamp-2 hover:text-green-800 cursor-pointer leading-snug"
                      >
                        {stream.title}
                      </h3>

                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0" />
                          <span className="truncate">{stream.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="truncate">Đoàn viên dẫn live: <strong>{stream.hostName}</strong></span>
                        </div>
                      </div>

                      {/* Featured Deal Box */}
                      {stream.featuredProduct && (
                        <div className="p-2.5 rounded-xl bg-cream border border-green-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-gray-500 block font-medium">Nông sản bán trên live:</span>
                            <strong className="text-green-950 font-bold line-clamp-1">{stream.featuredProduct.name}</strong>
                          </div>
                          <span className="font-black text-red-600 shrink-0 ml-2">
                            {stream.featuredProduct.dealPrice}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 pt-0 border-t border-gray-100 flex items-center gap-2 mt-2">
                    <button
                      onClick={() => {
                        setActiveLiveId(stream.id);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                        if (stream.isLiveNow) {
                          showNotification(`Đang phát luồng live của ${stream.farmName}`);
                        }
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        stream.isLiveNow
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-sm'
                          : stream.status === 'upcoming'
                          ? 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {stream.isLiveNow ? (
                        <>
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          <span>Vào Xem Live Ngay</span>
                        </>
                      ) : stream.status === 'upcoming' ? (
                        <>
                          <Bell className="w-3.5 h-3.5 text-amber-700" />
                          <span>Xem Lịch & Đặt Nhắc</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5 text-gray-600" />
                          <span>Xem Lại Phiên Này</span>
                        </>
                      )}
                    </button>

                    {stream.featuredProduct && (
                      <button
                        onClick={() => {
                          addToCart(stream.featuredProduct!.id, 1);
                          showNotification(`Đã thêm ${stream.featuredProduct!.name} vào giỏ!`);
                        }}
                        className="px-3 py-2.5 rounded-xl border border-green-600 text-green-800 hover:bg-green-50 text-xs font-bold"
                        title="Thêm vào giỏ hàng"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE STREAM MODAL: FOR FARMERS & YOUTH TO SCHEDULE NEW LIVE */}
      <Dialog
        visible={createModalOpen}
        onHide={() => setCreateModalOpen(false)}
        header={
          <div className="flex items-center gap-3 w-full pr-2">
            <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center shrink-0 text-green-800">
              <Video className="w-5 h-5 text-green-800" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-green-950 leading-tight">
                Đăng Ký Phiên Livestream Mới Cho Nhà Vườn
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Đoàn viên thanh niên hỗ trợ kỹ thuật số, dựng máy & chốt đơn tại cây
              </p>
            </div>
          </div>
        }
        className="w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden"
        breakpoints={{ '960px': '85vw', '641px': '95vw' }}
        modal
      >
        <form onSubmit={handleCreateStreamSubmit} className="space-y-4 pt-1">
          {/* Banner thông tin tiếp sức */}
          <div className="p-3 bg-green-50 rounded-2xl border border-green-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
            <div className="text-xs text-green-900 leading-relaxed">
              <strong className="font-bold text-green-950">Tiếp sức nhà vườn:</strong> Đoàn viên thanh niên phối hợp cùng bà con nông dân dựng máy livestream ngay tại vườn, hỗ trợ tương tác số hóa và chốt đơn chuyển hàng.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Tên Nhà Vườn / Hợp Tác Xã:</span>
              </label>
              <input
                type="text"
                value={newFarmName}
                onChange={e => setNewFarmName(e.target.value)}
                placeholder="Ví dụ: Vườn Sầu Riêng Chú Ba"
                className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition font-medium shadow-2xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Tên Bác Chủ Vườn:</span>
              </label>
              <input
                type="text"
                value={newFarmerName}
                onChange={e => setNewFarmerName(e.target.value)}
                placeholder="Ví dụ: Bác Ba Cần"
                className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition font-medium shadow-2xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Địa bàn Phường / Xã:</span>
              </label>
              <Dropdown
                value={newWard}
                onChange={e => setNewWard(e.value)}
                options={modalWardOptions}
                className="w-full text-sm rounded-xl border border-gray-300 bg-white focus:border-green-600 transition !min-h-[44px] flex items-center font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Thời gian phát sóng:</span>
              </label>
              <input
                type="text"
                value={newTime}
                onChange={e => setNewTime(e.target.value)}
                placeholder="Ví dụ: Tối nay 19:30"
                className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition font-medium shadow-2xs"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-green-700 shrink-0" />
              <span>Tiêu đề buổi Livestream:</span>
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Ví dụ: Cắt Sầu Riêng Chín Cây & Chôm Chôm Nhãn Mùa Vụ Mới"
              className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition font-medium shadow-2xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Sản phẩm OCOP ghim chốt:</span>
              </label>
              <input
                type="text"
                value={newProduct}
                onChange={e => setNewProduct(e.target.value)}
                placeholder="Ví dụ: Sầu riêng Ri6 hạt lép"
                className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition font-medium shadow-2xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <TagIcon className="w-3.5 h-3.5 text-green-700 shrink-0" />
                <span>Mức giá ưu đãi trên Live:</span>
              </label>
              <input
                type="text"
                value={newDealPrice}
                onChange={e => setNewDealPrice(e.target.value)}
                placeholder="Ví dụ: 105.000 đ/kg"
                className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition font-medium shadow-2xs"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-700 shrink-0" />
              <span>Đoàn viên thanh niên phụ trách dẫn live:</span>
            </label>
            <input
              type="text"
              value={newYouthHost}
              onChange={e => setNewYouthHost(e.target.value)}
              placeholder="Ví dụ: Nguyễn Văn Nam (Chi đoàn P. Suối Tre)"
              className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition font-medium shadow-2xs"
              required
            />
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
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
              <span>Tạo Lịch Live (+2h Đoàn Viên)</span>
            </button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
