import React, { useState } from 'react';
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
  User,
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { ModalAuth } from './ModalAuth';

export const Header: React.FC = () => {
  const {
    currentRole,
    activeScreen,
    setActiveScreen,
    cartCount,
    currentUser,
    logout
  } = useApp();

  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [authDefaultMode, setAuthDefaultMode] = useState<'login' | 'register'>('login');

  // RBAC Menu Filtering theo yêu cầu
  const getNavItems = () => {
    // 0. Khi chưa đăng ký / đăng nhập: chỉ hiện Trang chủ, Livestream, Bản đồ
    if (!currentUser) {
      return [
        { id: 'home' as ScreenId, label: 'Trang Chủ', icon: <Home className="w-4 h-4" /> },
        { id: 'live' as ScreenId, label: 'Livestream', icon: <Video className="w-4 h-4" /> },
        { id: 'map' as ScreenId, label: 'Bản Đồ Tour', icon: <MapPin className="w-4 h-4" /> }
      ];
    }

    // 1. Admin Menu
    if (currentRole === 'admin') {
      return [
        { id: 'admin_users' as ScreenId, label: 'Quản Lý Tài Khoản (Admin)', icon: <ShieldAlert className="w-4 h-4 text-red-600" /> },
        { id: 'home' as ScreenId, label: 'Xem Trang Chủ', icon: <Home className="w-4 h-4" /> },
        { id: 'orders' as ScreenId, label: 'Tổng Quan Đơn Hàng', icon: <Package className="w-4 h-4" /> },
        { id: 'volunteer' as ScreenId, label: 'Tổng Giờ Tình Nguyện', icon: <Award className="w-4 h-4" /> },
        { id: 'live' as ScreenId, label: 'Quản Lý Livestream', icon: <Video className="w-4 h-4" /> }
      ];
    }

    // 2. Chủ Nhà Vườn (Farmer) Menu
    if (currentRole === 'farmer') {
      return [
        { id: 'orders' as ScreenId, label: '📦 Đơn Hàng Vườn Mình', icon: <Package className="w-4 h-4" /> },
        { id: 'garden' as ScreenId, label: '🏡 Hồ Sơ Vườn Ba Tư', icon: <Store className="w-4 h-4" /> },
        { id: 'quick_post' as ScreenId, label: '🎙️ Đăng Nhanh (Giọng Nói)', icon: <Mic className="w-4 h-4" /> },
        { id: 'home' as ScreenId, label: 'Xem Mặt Trước Sàn', icon: <Home className="w-4 h-4" /> },
        { id: 'live' as ScreenId, label: 'Xem Lịch Live Cùng Đoàn', icon: <Video className="w-4 h-4" /> }
      ];
    }

    // 3. Thanh Niên Hỗ Trợ (Youth) Menu
    if (currentRole === 'youth') {
      return [
        { id: 'quick_post' as ScreenId, label: '🎙️ Đăng Nhanh (AI/Voice)', icon: <Mic className="w-4 h-4" /> },
        { id: 'live' as ScreenId, label: '📹 Lịch & Phòng Live', icon: <Video className="w-4 h-4" /> },
        { id: 'orders' as ScreenId, label: '📦 Xử Lý Đơn Hộ Vườn', icon: <Package className="w-4 h-4" /> },
        { id: 'volunteer' as ScreenId, label: '🎖️ Giờ Tình Nguyện Của Tôi', icon: <Award className="w-4 h-4" /> },
        { id: 'home' as ScreenId, label: 'Trang Chủ', icon: <Home className="w-4 h-4" /> },
        { id: 'garden' as ScreenId, label: 'Hồ Sơ Vườn', icon: <Store className="w-4 h-4" /> }
      ];
    }

    // 4. Người Mua (Buyer) hoặc Khách vãng lai
    return [
      { id: 'home' as ScreenId, label: 'Trang Chủ', icon: <Home className="w-4 h-4" /> },
      { id: 'products' as ScreenId, label: 'Sản Phẩm OCOP', icon: <Package className="w-4 h-4" /> },
      { id: 'garden' as ScreenId, label: 'Hồ Sơ Nhà Vườn', icon: <Store className="w-4 h-4" /> },
      { id: 'live' as ScreenId, label: 'Livestream', icon: <Video className="w-4 h-4" /> },
      { id: 'map' as ScreenId, label: 'Bản Đồ Tour', icon: <MapPin className="w-4 h-4" /> },
      { id: 'volunteer' as ScreenId, label: 'Giờ Tình Nguyện', icon: <Award className="w-4 h-4" /> }
    ];
  };

  const navItems = getNavItems();

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <span className="text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5 rounded">ADMIN</span>;
      case 'youth':
        return <span className="text-[10px] bg-blue-600 text-white font-black px-1.5 py-0.5 rounded">ĐOÀN VIÊN</span>;
      case 'farmer':
        return <span className="text-[10px] bg-green-700 text-white font-black px-1.5 py-0.5 rounded">CHỦ VƯỜN</span>;
      case 'buyer':
        return <span className="text-[10px] bg-amber-600 text-white font-black px-1.5 py-0.5 rounded">NGƯỜI MUA</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm">
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
                TRẠM VƯỜN SỐ
              </span>
              <span className="hidden sm:inline bg-green-100 text-green-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-200">
                ĐỒNG NAI
              </span>
            </div>
            <p className="text-xs text-earth hidden md:block">
              Thanh niên Đồng Nai tiếp sức nông sản OCOP
            </p>
          </div>
        </div>

        {/* Right actions: Account Button (Left of Cart) + Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Nút Tài khoản / Đăng nhập / Đăng ký */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-green-300 bg-cream text-xs font-bold text-green-950 shadow-sm">
                <User className="w-4 h-4 text-green-700 shrink-0" />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    <span className="max-w-[130px] truncate leading-tight">{currentUser.name}</span>
                    {getRoleBadge(currentUser.role)}
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal">{currentUser.phone}</span>
                </div>
              </div>

              {/* Nút Đăng xuất */}
              <button
                onClick={() => {
                  if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?')) {
                    logout();
                  }
                }}
                className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition border border-gray-200"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthDefaultMode('login');
                setAuthModalVisible(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-green-700 text-green-800 hover:bg-green-50 text-xs sm:text-sm font-bold transition shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập / Đăng ký</span>
            </button>
          )}

          {/* Cart button (Ẩn khi đang là Admin) */}
          {currentRole !== 'admin' && (
            <button
              onClick={() => setActiveScreen('cart')}
              className="relative flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow hover:from-green-800 hover:to-green-900 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              {cartCount > 0 && (
                <span className="bg-sun text-earth-dark text-xs px-2 py-0.5 rounded-full font-black ml-1 shadow-sm animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation tabs (Phân quyền linh hoạt theo UserRole, cân bằng ở giữa khi chưa đăng nhập) */}
      <div className="bg-cream/80 border-t border-b border-green-100 overflow-x-auto scrollbar-none">
        <div className={`max-w-7xl mx-auto px-4 flex items-center space-x-2 py-1.5 min-w-max ${!currentUser ? 'justify-center' : 'justify-start sm:justify-center'}`}>
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

      {/* Modal Auth */}
      <ModalAuth
        visible={authModalVisible}
        onHide={() => setAuthModalVisible(false)}
        defaultMode={authDefaultMode}
      />
    </header>
  );
};
