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
  LogIn,
  UserPlus
} from 'lucide-react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const Header: React.FC = () => {
  const {
    currentRole,
    setRole,
    activeScreen,
    setActiveScreen,
    cartCount,
    showNotification
  } = useApp();

  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authPhone, setAuthPhone] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const userDisplayName = authPhone || '0903.889.123';
      setCurrentUser(userDisplayName);
      showNotification(`👋 Đăng nhập thành công! Xin chào ${userDisplayName}`);
    } else {
      const userDisplayName = authName || 'Khách hàng mới';
      setCurrentUser(userDisplayName);
      showNotification(`🎉 Đăng ký tài khoản thành công! Xin chào ${userDisplayName}`);
    }
    setAuthDialogOpen(false);
  };

  const navItems: { id: ScreenId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Trang Chủ', icon: <Home className="w-4 h-4" /> },
    { id: 'garden', label: 'Hồ Sơ Vườn', icon: <Store className="w-4 h-4" /> },
    { id: 'products', label: 'Sản Phẩm OCOP', icon: <Package className="w-4 h-4" /> },
    { id: 'quick_post', label: 'Đăng Nhanh (Voice/AI)', icon: <Mic className="w-4 h-4" /> },
    { id: 'orders', label: 'Quản Lý Đơn', icon: <Package className="w-4 h-4" /> },
    { id: 'live', label: 'Livestream', icon: <Video className="w-4 h-4" /> },
    { id: 'map', label: 'Bản Đồ Tour', icon: <MapPin className="w-4 h-4" /> },
    { id: 'volunteer', label: 'Giờ Tình Nguyện', icon: <Award className="w-4 h-4" /> }
  ];

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

        {/* Right actions: Account (Login/Register) + Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Nút Tài khoản (Đăng nhập / Đăng ký) bên trái giỏ hàng */}
          {currentUser ? (
            <button
              onClick={() => {
                if (window.confirm('Bạn có muốn đăng xuất không?')) {
                  setCurrentUser(null);
                  showNotification('Đã đăng xuất tài khoản.');
                }
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-green-200 bg-cream hover:bg-green-100 text-xs sm:text-sm font-bold text-green-900 transition"
              title="Bấm để đăng xuất"
            >
              <User className="w-4 h-4 text-green-700" />
              <span className="max-w-[100px] truncate">{currentUser}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setAuthDialogOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 border-green-700 text-green-800 hover:bg-green-50 text-xs sm:text-sm font-bold transition shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Đăng nhập / Đăng ký</span>
            </button>
          )}

          {/* Cart button */}
          <button
            onClick={() => setActiveScreen('cart')}
            className="relative flex items-center gap-2 bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow hover:from-green-800 hover:to-green-900 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Giỏ hàng</span>
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

      {/* Auth Dialog (Đăng nhập / Đăng ký) */}
      <Dialog
        visible={authDialogOpen}
        onHide={() => setAuthDialogOpen(false)}
        header={
          <div className="flex items-center gap-2 text-green-900 font-bold text-base">
            <User className="w-5 h-5 text-green-700" />
            <span>{authMode === 'login' ? 'Đăng Nhập Tài Khoản' : 'Đăng Ký Tài Khoản Mới'}</span>
          </div>
        }
        className="w-full max-w-md"
        modal
      >
        <form onSubmit={handleAuthSubmit} className="space-y-4 pt-2">
          {/* Switch Tab login / register */}
          <div className="flex rounded-xl bg-gray-100 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-lg transition ${
                authMode === 'login' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500'
              }`}
            >
              Đăng Nhập
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-lg transition ${
                authMode === 'register' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500'
              }`}
            >
              Đăng Ký
            </button>
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Họ và tên:</label>
              <InputText
                value={authName}
                onChange={e => setAuthName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full text-sm"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Số điện thoại:</label>
            <InputText
              type="tel"
              value={authPhone}
              onChange={e => setAuthPhone(e.target.value)}
              placeholder="Ví dụ: 0903.889.xxx"
              className="w-full text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Mật khẩu:</label>
            <InputText
              type="password"
              value={authPassword}
              onChange={e => setAuthPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-sm"
              required
            />
          </div>

          <Button
            type="submit"
            icon={authMode === 'login' ? 'pi pi-sign-in' : 'pi pi-user-plus'}
            label={authMode === 'login' ? 'Đăng Nhập Ngay' : 'Hoàn Tất Đăng Ký'}
            className="w-full p-button-success font-bold text-sm shadow mt-2"
          />

          <div className="text-center pt-2">
            <span className="text-xs text-gray-500">
              {authMode === 'login' ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
            </span>
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-xs text-green-800 font-bold hover:underline"
            >
              {authMode === 'login' ? 'Đăng ký miễn phí' : 'Đăng nhập ngay'}
            </button>
          </div>
        </form>
      </Dialog>
    </header>
  );
};
