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
  LogOut,
  Sprout,
  Plus
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
    // 0. Khi chưa đăng ký / đăng nhập:
    if (!currentUser) {
      return [
        { id: 'home' as ScreenId, label: 'Trang Chủ', icon: <Home className="w-4 h-4 shrink-0" /> },
        { id: 'products' as ScreenId, label: 'Sản Phẩm OCOP', icon: <Package className="w-4 h-4 shrink-0" /> },
        { id: 'gardens' as ScreenId, label: 'Hồ Sơ Nhà Vườn', icon: <Store className="w-4 h-4 shrink-0" /> },
        { id: 'live' as ScreenId, label: 'Livestream', icon: <Video className="w-4 h-4 shrink-0" /> },
        { id: 'map' as ScreenId, label: 'Bản Đồ Tour', icon: <MapPin className="w-4 h-4 shrink-0" /> }
      ];
    }

    // 1. Admin Menu
    if (currentRole === 'admin') {
      return [
        { id: 'admin_users' as ScreenId, label: 'Quản Lý Tài Khoản', icon: <ShieldAlert className="w-4 h-4 shrink-0" /> },
        { id: 'home' as ScreenId, label: 'Trang Chủ', icon: <Home className="w-4 h-4 shrink-0" /> },
        { id: 'orders' as ScreenId, label: 'Tổng Quan Đơn Hàng', icon: <Package className="w-4 h-4 shrink-0" /> },
        { id: 'volunteer' as ScreenId, label: 'Giờ Tình Nguyện', icon: <Award className="w-4 h-4 shrink-0" /> },
        { id: 'live' as ScreenId, label: 'Quản Lý Livestream', icon: <Video className="w-4 h-4 shrink-0" /> }
      ];
    }

    // 2. Chủ Nhà Vườn (Farmer) Menu
    if (currentRole === 'farmer') {
      return [
        { id: 'quick_post' as ScreenId, label: 'Thêm Sản Phẩm Mới', icon: <Plus className="w-4 h-4 shrink-0" /> },
        { id: 'orders' as ScreenId, label: 'Đơn Hàng Vườn Mình', icon: <Package className="w-4 h-4 shrink-0" /> },
        { id: 'garden' as ScreenId, label: 'Hồ Sơ Vườn', icon: <Store className="w-4 h-4 shrink-0" /> },
        { id: 'home' as ScreenId, label: 'Mặt Trước Sàn', icon: <Home className="w-4 h-4 shrink-0" /> },
        { id: 'live' as ScreenId, label: 'Lịch Live Cùng Đoàn', icon: <Video className="w-4 h-4 shrink-0" /> }
      ];
    }

    // 3. Thanh Niên Hỗ Trợ (Youth) Menu
    if (currentRole === 'youth') {
      return [
        { id: 'orders' as ScreenId, label: 'Xử Lý Đơn Hộ Vườn', icon: <Package className="w-4 h-4 shrink-0" /> },
        { id: 'volunteer' as ScreenId, label: 'Giờ Tình Nguyện Của Tôi', icon: <Award className="w-4 h-4 shrink-0" /> },
        { id: 'gardens' as ScreenId, label: 'Hồ Sơ Vườn', icon: <Store className="w-4 h-4 shrink-0" /> },
        { id: 'home' as ScreenId, label: 'Trang Chủ', icon: <Home className="w-4 h-4 shrink-0" /> },
        { id: 'quick_post' as ScreenId, label: 'Thêm Sản Phẩm (AI)', icon: <Plus className="w-4 h-4 shrink-0" /> },
        { id: 'live' as ScreenId, label: 'Lịch & Phòng Live', icon: <Video className="w-4 h-4 shrink-0" /> }
      ];
    }

    // 4. Người Mua (Buyer) hoặc Khách vãng lai
    return [
      { id: 'home' as ScreenId, label: 'Trang Chủ', icon: <Home className="w-4 h-4 shrink-0" /> },
      { id: 'products' as ScreenId, label: 'Sản Phẩm OCOP', icon: <Package className="w-4 h-4 shrink-0" /> },
      { id: 'gardens' as ScreenId, label: 'Hồ Sơ Nhà Vườn', icon: <Store className="w-4 h-4 shrink-0" /> },
      { id: 'live' as ScreenId, label: 'Livestream', icon: <Video className="w-4 h-4 shrink-0" /> },
      { id: 'map' as ScreenId, label: 'Bản Đồ Tour', icon: <MapPin className="w-4 h-4 shrink-0" /> },
      { id: 'volunteer' as ScreenId, label: 'Giờ Tình Nguyện', icon: <Award className="w-4 h-4 shrink-0" /> }
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-gray-100">
      {/* Main Bar: Logo bên trái - Menu căn giữa - Tài khoản & Giỏ hàng bên phải */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl text-green-800 tracking-tight leading-none">
                TRẠM VƯỜN SỐ
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Nền tảng nông nghiệp thông minh
            </p>
          </div>
        </div>

        {/* Navigation tabs ở giữa: dùng justify-start md:justify-center để không bao giờ bị cắt chữ bên trái khi tràn */}
        <nav className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 flex-1 min-w-0 px-1">
          {navItems.map(item => {
            const isActive =
              activeScreen === item.id ||
              (item.id === 'gardens' && activeScreen === 'garden');
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-green-700 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right actions: Account Button + Cart */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Nút Tài khoản / Đăng nhập / Đăng ký */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-300 bg-cream text-xs font-bold text-green-950 shadow-sm">
                <User className="w-4 h-4 text-green-700 shrink-0" />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    <span className="max-w-[120px] truncate leading-tight">{currentUser.name}</span>
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
                className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition border border-gray-200"
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-green-700 text-green-800 hover:bg-green-50 text-xs sm:text-sm font-semibold transition shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập / Đăng ký</span>
            </button>
          )}

          {/* Cart button (Sau khi đăng nhập: CHỈ Người Mua và Đoàn Viên mới có chức năng Giỏ hàng / Mua hàng) */}
          {currentUser && (currentUser.role === 'buyer' || currentUser.role === 'youth') && (
            <button
              onClick={() => setActiveScreen('cart')}
              className="relative flex items-center gap-1.5 bg-green-800 text-white px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow hover:bg-green-900 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              {cartCount > 0 && (
                <span className="bg-sun text-earth-dark text-xs px-2 py-0.5 rounded-full font-black ml-1 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          )}
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
