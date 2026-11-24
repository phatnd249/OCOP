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

    // 1. Admin Menu (Bỏ Tổng Quan Đơn Hàng và Quản Lý Livestream theo yêu cầu)
    if (currentRole === 'admin') {
      return [
        { id: 'admin_users' as ScreenId, label: 'Quản Lý Tài Khoản (Admin)', icon: <ShieldAlert className="w-4 h-4 text-red-600" /> },
        { id: 'home' as ScreenId, label: 'Xem Trang Chủ', icon: <Home className="w-4 h-4" /> },
        { id: 'volunteer' as ScreenId, label: 'Tổng Giờ Tình Nguyện', icon: <Award className="w-4 h-4" /> }
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

    // 3. Thanh Niên Hỗ Trợ (Youth) Menu (Bỏ "Lịch & Phòng Live" và "Trang Chủ")
    if (currentRole === 'youth') {
      return [
        { id: 'orders' as ScreenId, label: '📦 Xử Lý Đơn Hộ Vườn', icon: <Package className="w-4 h-4" /> },
        { id: 'volunteer' as ScreenId, label: '🎖️ Giờ Tình Nguyện Của Tôi', icon: <Award className="w-4 h-4" /> },
        { id: 'garden' as ScreenId, label: '🏡 Hồ Sơ Vườn', icon: <Store className="w-4 h-4" /> }
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
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Hàng 1: Logo & Slogan bên trái | Khung quản trị hệ thống / Profile & Nút đăng xuất bên phải */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setActiveScreen('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink min-w-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white text-xl sm:text-2xl shadow-md group-hover:scale-105 transition-transform shrink-0">
            🌱
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-2xl text-green-800 tracking-tight leading-none truncate">
                TRẠM NÔNG SẢN SỐ
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5 truncate hidden xs:block">
              Nền tảng nông nghiệp thông minh Đồng Nai
            </p>
          </div>
        </div>

        {/* Right actions: Khung quản trị hệ thống admin / user badge & Nút đăng xuất đỏ nhẹ */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {/* Khung quản trị hệ thống / thông tin tài khoản */}
              <div className="flex items-center gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50/70 to-emerald-50/40 shadow-sm hover:border-green-300 transition max-w-[170px] sm:max-w-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white border border-green-200 flex items-center justify-center text-green-700 shadow-xs shrink-0">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs sm:text-sm text-green-950 max-w-[80px] sm:max-w-[140px] truncate leading-tight">
                      {currentUser.name}
                    </span>
                    {getRoleBadge(currentUser.role)}
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-gray-500 font-medium truncate">
                    {currentUser.role === 'admin' ? 'Admin' : currentUser.phone}
                  </span>
                </div>
              </div>

              {/* Nút Đăng xuất nổi bật với màu đỏ nhẹ */}
              <button
                onClick={() => {
                  if (window.confirm('Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?')) {
                    logout();
                  }
                }}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-200/80 transition shadow-xs font-bold text-xs shrink-0"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthDefaultMode('login');
                setAuthModalVisible(true);
              }}
              className="flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl border border-green-700 text-green-800 hover:bg-green-50 text-xs sm:text-sm font-bold transition shadow-sm whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Đăng nhập</span>
            </button>
          )}

          {/* Cart button (Chỉ dành riêng cho Người mua - Đoàn viên không có giỏ hàng) */}
          {currentUser && currentUser.role === 'buyer' && (
            <button
              onClick={() => setActiveScreen('cart')}
              className="relative flex items-center gap-1.5 bg-green-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow hover:bg-green-900 transition shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden md:inline">Giỏ hàng</span>
              {cartCount > 0 && (
                <span className="bg-sun text-earth-dark text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-black ml-0.5 sm:ml-1 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Hàng 2: Các nút chuyển trang / chức năng quản lý dàn đều bên dưới Header */}
      <div className="bg-green-50/50 border-t border-green-100/80 px-2 sm:px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto min-w-max sm:min-w-0">
          <nav className="flex sm:grid sm:grid-flow-col sm:auto-cols-fr gap-2 w-full">
            {navItems.map(item => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap shadow-xs text-center shrink-0 sm:shrink ${
                    isActive
                      ? 'bg-green-700 text-white shadow-sm ring-2 ring-green-600/30'
                      : 'bg-white text-gray-700 hover:bg-green-100/70 hover:text-green-800 border border-green-200/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
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
