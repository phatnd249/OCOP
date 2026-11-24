import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenId } from '../types';
import { ShoppingBag, Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setRole,
    activeScreen,
    setActiveScreen,
    cartCount
  } = useApp();

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'garden', label: 'Hồ Sơ Vườn Ba Tư' },
    { id: 'product_detail', label: 'Sản Phẩm & QR' },
    { id: 'quick_post', label: 'Đăng Nhanh (Voice/AI)' },
    { id: 'orders', label: 'Quản Lý Đơn Hàng' },
    { id: 'live', label: 'Livestream' },
    { id: 'map', label: 'Bản Đồ Du Lịch' },
    { id: 'volunteer', label: 'Giờ Tình Nguyện' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm">
      {/* Top Banner: Role Switcher */}
      <div className="bg-green-800 text-white text-xs sm:text-sm py-2 px-4 border-b border-green-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-sun text-earth-dark px-2 py-0.5 rounded font-black text-xs">ĐỀ 3</span>
            <span>CHỢ OCOP THANH NIÊN • Cầu nối số Nông sản Đồng Nai</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-green-200 hidden md:inline text-xs">Vai trò trải nghiệm:</span>
            <button
              onClick={() => setRole('customer')}
              className={`px-3 py-1 rounded-full transition text-xs ${
                currentRole === 'customer'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/70 text-white hover:bg-green-700'
              }`}
            >
              Khách hàng (TP.HCM)
            </button>
            <button
              onClick={() => setRole('farmer')}
              className={`px-3 py-1 rounded-full transition text-xs ${
                currentRole === 'farmer'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/70 text-white hover:bg-green-700'
              }`}
            >
              Chú Ba Tư (Nhà vườn 50t)
            </button>
            <button
              onClick={() => setRole('youth')}
              className={`px-3 py-1 rounded-full transition text-xs ${
                currentRole === 'youth'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/70 text-white hover:bg-green-700'
              }`}
            >
              Đoàn viên hỗ trợ số
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
          <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center text-white shadow-sm group-hover:bg-green-800 transition">
            <Sprout className="w-5 h-5 text-sun" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl text-green-900 tracking-tight">
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

        {/* Actions: Auth & Cart */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveScreen('auth')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition ${
              activeScreen === 'auth'
                ? 'bg-green-700 text-white border-green-700 shadow-sm'
                : 'bg-white hover:bg-green-50 text-green-900 border-green-300'
            }`}
          >
            Đăng Nhập / Đăng Ký
          </button>

          <button
            onClick={() => setActiveScreen('cart')}
            className="relative flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {cartCount > 0 && (
              <span className="bg-sun text-earth-dark text-xs px-2 py-0.5 rounded-full font-black ml-1 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation tabs (clean text, no icon clutter) */}
      <div className="bg-cream/80 border-t border-b border-green-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5 min-w-max">
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-700 text-white shadow-sm font-bold'
                    : 'text-gray-700 hover:bg-green-100/70 hover:text-green-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
