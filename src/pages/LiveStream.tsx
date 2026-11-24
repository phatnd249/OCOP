import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
  Bell
} from 'lucide-react';

export const LiveStream: React.FC = () => {
  const {
    liveStreams,
    likeLiveStream,
    addLiveComment,
    addToCart,
    showNotification
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const activeLive = liveStreams.find(l => l.isLiveNow) || liveStreams[0];
  const upcomingLives = liveStreams.filter(l => !l.isLiveNow);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addLiveComment(activeLive.id, commentText);
    setCommentText('');
    showNotification('Đã gửi bình luận vào phiên livestream!');
  };

  const handleQuickBuyOnLive = () => {
    if (activeLive.featuredProduct) {
      addToCart(activeLive.featuredProduct.id, 2);
      showNotification(`🎉 Đã chốt đơn 2kg "${activeLive.featuredProduct.name}" với giá ưu đãi trên Live!`);
    }
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span>MÀN HÌNH BẮT BUỘC SỐ 6 CỦA ĐỀ BÀI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            Livestream Nông Sản OCOP Tại Vườn Ba Tư (TN7)
          </h1>
          <p className="text-xs text-gray-500">
            Đoàn viên thanh niên hỗ trợ livestream trực tiếp tại gốc cây, chốt đơn hái tại vườn về TP.HCM
          </p>
        </div>
      </div>

      {/* Main Live Room Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player Box */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-black aspect-video sm:aspect-[16/10] shadow-card flex items-center justify-center border-2 border-red-500">
            <img
              src={activeLive.cover}
              alt={activeLive.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>

            {/* Top Bar on Video */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <span className="font-bold text-red-400">TRỰC TIẾP TẠI VƯỜN</span>
                <span className="text-gray-300">|</span>
                <Users className="w-3.5 h-3.5 text-gray-300" />
                <span>{activeLive.viewers.toLocaleString('vi-VN')} người xem</span>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={activeLive.hostAvatar}
                  alt={activeLive.hostName}
                  className="w-8 h-8 rounded-full border-2 border-sun object-cover"
                />
                <span className="font-bold hidden sm:inline">{activeLive.hostName}</span>
              </div>
            </div>

            {/* Center Broadcast Badge */}
            <div className="absolute text-center text-white pointer-events-none p-4">
              <div className="w-16 h-16 rounded-full bg-red-600/80 backdrop-blur mx-auto flex items-center justify-center text-3xl mb-2 animate-pulse">
                📹
              </div>
              <h2 className="text-lg sm:text-2xl font-black max-w-md drop-shadow">
                {activeLive.title}
              </h2>
              <p className="text-xs text-green-200 mt-1">
                📍 {activeLive.location}
              </p>
            </div>

            {/* Floating Like Button */}
            <div className="absolute right-4 bottom-24 flex flex-col items-center gap-1 z-10">
              <button
                onClick={() => likeLiveStream(activeLive.id)}
                className="w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition"
                title="Thả tim"
              >
                <Heart className="w-6 h-6 fill-white" />
              </button>
              <span className="text-white text-xs font-bold bg-black/60 px-2 py-0.5 rounded-full backdrop-blur">
                {activeLive.likes.toLocaleString('vi-VN')}
              </span>
            </div>

            {/* Pinned Product on Live */}
            {activeLive.featuredProduct && (
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur p-3.5 rounded-2xl shadow-xl flex items-center justify-between gap-4 border border-green-200">
                <div className="space-y-0.5">
                  <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    🔥 SẢN PHẨM ĐANG GHIM TRÊN LIVE
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-ink line-clamp-1">
                    {activeLive.featuredProduct.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-black text-red-600 text-sm">
                      {activeLive.featuredProduct.dealPrice}
                    </span>
                    <span className="line-through text-gray-400 text-[11px]">
                      {activeLive.featuredProduct.originalPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleQuickBuyOnLive}
                  className="shrink-0 bg-sun hover:bg-amber-500 text-earth-dark font-black px-4 py-2.5 rounded-xl text-xs shadow flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Chốt Đơn</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Chat Panel */}
        <div className="bg-white rounded-3xl border border-green-200 shadow-soft flex flex-col h-[500px]">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-ink flex items-center gap-2">
              <span>💬 Bình Luận & Chốt Số Lượng</span>
            </h3>
            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
              Thời gian thực
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {activeLive.mockComments?.map((c, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-green-900">{c.user}</strong>
                  <span className="text-[10px] text-gray-400">{c.time}</span>
                </div>
                <p className="text-gray-700">{c.text}</p>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendComment} className="p-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Nhập 'Chốt 2kg sầu riêng'..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white p-2.5 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Upcoming Livestream Schedule */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              📅 Lịch Phát Sóng Các Phiên Chợ Số Tiếp Theo
            </h3>
            <p className="text-xs text-gray-500">
              Đoàn thanh niên đồng hành cùng các chủ vườn OCOP Đồng Nai
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingLives.map(live => (
            <div
              key={live.id}
              className="p-5 rounded-2xl bg-cream border border-green-200 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-bold text-green-800 bg-green-100 px-2.5 py-0.5 rounded">
                    {live.time}
                  </span>
                  <span>📍 {live.location.split('-')[0]}</span>
                </div>
                <h4 className="font-bold text-base text-ink">{live.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {live.description}
                </p>
              </div>

              <div className="pt-3 border-t border-green-100 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Dẫn chương trình: <strong>{live.hostName}</strong>
                </span>
                <button
                  onClick={() => showNotification(`Đã đặt thông báo nhắc xem phiên live: "${live.title}"!`)}
                  className="bg-white hover:bg-green-50 text-green-800 border border-green-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition"
                >
                  <Bell className="w-3.5 h-3.5 text-sun" />
                  <span>Nhắc tôi khi live</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
