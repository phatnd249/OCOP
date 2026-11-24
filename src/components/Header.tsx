import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenId, UserRole } from '../types';
import {
  ShoppingBag,
  Home,
  Store,
  QrCode,
  Mic,
  Package,
  Video,
  MapPin,
  Award,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setRole,
    activeScreen,
    setActiveScreen,
    cartCount
  } = useApp();

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Trang Chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'garden', label: 'Hồ Sơ Vườn', icon: <Store className="w-4 h-4" /> },
    { id: 'product_detail', label: 'Sản Phẩm & QR', icon: <QrCode className="w-4 h-4" /> },
    { id: 'quick_post', label: 'Đăng Nhanh (Voice/AI)', icon: <Mic className="w-4 h-4" /> },
    { id: 'orders', label: 'Quản Lý Đơn', icon: <Package className="w-4 h-4" /> },
    { id: 'live', label: 'Livestream', icon: <Video className="w-4 h-4" /> },
    { id: 'map', label: 'Bản Đồ Tour', icon: <MapPin className="w-4 h-4" /> },
    { id: 'volunteer', label: 'Giờ Tình Nguyện', icon: <Award className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm">
      {/* Top Banner: Role Switcher for Examination Demo */}
      <div className="bg-green-800 text-white text-xs sm:text-sm py-2 px-4 border-b border-green-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-sun text-earth-dark px-2 py-0.5 rounded font-black text-xs">ĐỀ 3</span>
            <span>CHỢ OCOP THANH NIÊN • Cầu nối số Nông sản Đồng Nai</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-green-200 hidden md:inline">Đổi vai trò trải nghiệm:</span>
            <button
              onClick={() => setRole('customer')}
              className={`px-3 py-1 rounded-full font-medium transition text-xs flex items-center gap-1 ${
                currentRole === 'customer'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/60 text-white hover:bg-green-700'
              }`}
            >
              <span>👤</span> Khách hàng TP.HCM
            </button>
            <button
              onClick={() => setRole('farmer')}
              className={`px-3 py-1 rounded-full font-medium transition text-xs flex items-center gap-1 ${
                currentRole === 'farmer'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/60 text-white hover:bg-green-700'
              }`}
            >
              <span>🌾</span> Chú Ba Tư (50 tuổi)
            </button>
            <button
              onClick={() => setRole('youth')}
              className={`px-3 py-1 rounded-full font-medium transition text-xs flex items-center gap-1 ${
                currentRole === 'youth'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/60 text-white hover:bg-green-700'
              }`}
            >
              <span>🌟</span> Đoàn viên hỗ trợ
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
            🌱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl text-green-800 tracking-tight">
                CHỢ OCOP THANH NIÊN
              </span>
              <span className="hidden sm:inline bg-green-100 text-green-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-200">
                ĐỒNG NAI
              </span>
            </div>
            <p className="text-xs text-earth hidden md:block">
              Nền tảng Kinh tế số & Khởi nghiệp Nông nghiệp
            </p>
          </div>
        </div>

        {/* User status info pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream border border-green-200 text-xs">
          <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
          <span className="text-gray-500">Đang thao tác:</span>
          <strong className="text-green-800">
            {currentRole === 'customer' && 'Khách đặt mua (TP.HCM)'}
            {currentRole === 'farmer' && 'Chú Ba Tư (Chủ vườn 2.5ha)'}
            {currentRole === 'youth' && 'Đoàn viên An & Mai'}
          </strong>
        </div>

        {/* Cart button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveScreen('cart')}
            className="relative flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2 rounded-xl font-bold text-sm shadow hover:from-green-800 hover:to-green-900 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="bg-sun text-earth-dark text-xs px-2 py-0.5 rounded-full font-black ml-1 shadow-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="bg-cream/80 border-t border-b border-green-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5 min-w-max">
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-700 text-white shadow-sm font-bold'
                    : 'text-gray-700 hover:bg-green-100/70 hover:text-green-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
