import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenId, UserRole } from '../types';
import { ShoppingBag, Sprout, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setRole,
    activeScreen,
    setActiveScreen,
    cartCount
  } = useApp();

  // Navigation items allocated specifically per role
  const getNavItems = (): { id: ScreenId; label: string }[] => {
    if (currentRole === 'farmer') {
      return [
        { id: 'orders', label: 'Quản Lý Đơn Hàng' },
        { id: 'garden', label: 'Hồ Sơ Nhà Vườn' },
        { id: 'product_detail', label: 'Danh Mục Sản Phẩm' },
        { id: 'live', label: 'Lịch Livestream Bán Hàng' }
      ];
    }

    if (currentRole === 'youth') {
      return [
        { id: 'quick_post', label: 'Đăng Sản Phẩm (Voice & AI)' },
        { id: 'live', label: 'Phát Sóng Livestream' },
        { id: 'volunteer', label: 'Sổ Tay Giờ Tình Nguyện' },
        { id: 'garden', label: 'Hồ Sơ Vườn Ba Tư' },
        { id: 'orders', label: 'Hỗ Trợ Đơn Hàng' }
      ];
    }

    // Default Customer navigation
    return [
      { id: 'home', label: 'Trang Chủ' },
      { id: 'product_detail', label: 'Sản Phẩm OCOP' },
      { id: 'garden', label: 'Nhà Vườn Ba Tư' },
      { id: 'live', label: 'Livestream Nông Sản' },
      { id: 'map', label: 'Du Lịch Trải Nghiệm Vườn' }
    ];
  };

  const navItems = getNavItems();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
      {/* Top Banner: Real Portal Header with role views */}
      <div className="bg-green-800 text-white text-xs py-2 px-4 border-b border-green-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-100">
              Cổng Thương Mại Điện Tử & Nông Sản OCOP Tỉnh Đồng Nai
            </span>
            <span className="hidden md:inline text-green-300">|</span>
            <span className="hidden md:inline text-green-200">
              Kết nối trực tiếp Nhà vườn Long Khánh & Khách hàng TP.HCM
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-green-200 text-xs hidden sm:inline">Chế độ xem:</span>
            <button
              onClick={() => setRole('customer')}
              className={`px-3 py-1 rounded-full transition text-xs ${
                currentRole === 'customer'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/70 text-white hover:bg-green-700'
              }`}
            >
              Khách hàng
            </button>
            <button
              onClick={() => setRole('farmer')}
              className={`px-3 py-1 rounded-full transition text-xs ${
                currentRole === 'farmer'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/70 text-white hover:bg-green-700'
              }`}
            >
              Chủ vườn (Chú Ba Tư)
            </button>
            <button
              onClick={() => setRole('youth')}
              className={`px-3 py-1 rounded-full transition text-xs ${
                currentRole === 'youth'
                  ? 'bg-sun text-earth-dark font-bold shadow'
                  : 'bg-green-700/70 text-white hover:bg-green-700'
              }`}
            >
              Đoàn viên hỗ trợ
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div
          onClick={() => setActiveScreen(currentRole === 'farmer' ? 'orders' : currentRole === 'youth' ? 'quick_post' : 'home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center text-white shadow-sm group-hover:bg-green-800 transition">
            <Sprout className="w-6 h-6 text-sun" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl text-green-900 tracking-tight">
                CHỢ OCOP THANH NIÊN
              </span>
              <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
                ĐỒNG NAI
              </span>
            </div>
            <p className="text-[11px] text-gray-500 hidden sm:block">
              Nông sản sạch chính gốc • Nhật ký mùa vụ minh bạch
            </p>
          </div>
        </div>

        {/* Search bar (for real e-commerce look) */}
        {currentRole === 'customer' && (
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Tìm sầu riêng Ri6, chôm chôm nhãn, bưởi Tân Triều..."
                onClick={() => setActiveScreen('product_detail')}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition"
              />
            </div>
          </div>
        )}

        {/* Current Role Banner for Farmers / Youth */}
        {currentRole !== 'customer' && (
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cream border border-green-200 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
            <span className="text-gray-600">Đang đăng nhập:</span>
            <strong className="text-green-900 font-bold">
              {currentRole === 'farmer' ? 'Nhà vườn Chú Ba Tư (Long Khánh)' : 'Tổ Thanh Niên Số Huyện Đoàn'}
            </strong>
          </div>
        )}

        {/* Actions: Auth & Cart */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveScreen('auth')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              activeScreen === 'auth'
                ? 'bg-green-700 text-white shadow-sm'
                : 'text-gray-700 hover:text-green-800 hover:bg-gray-50'
            }`}
          >
            Tài Khoản
          </button>

          {currentRole === 'customer' && (
            <button
              onClick={() => setActiveScreen('cart')}
              className="relative flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              {cartCount > 0 && (
                <span className="bg-sun text-earth-dark text-xs px-2 py-0.5 rounded-full font-black ml-0.5 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Role-Adapted Navigation Tabs */}
      <div className="bg-cream/60 border-t border-gray-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex space-x-1 py-1.5 min-w-max">
          {navItems.map(item => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
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
