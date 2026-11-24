import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Lock,
  Phone,
  User,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sprout,
  Users,
  Store,
  Clock
} from 'lucide-react';

export const Auth: React.FC = () => {
  const { setRole, setActiveScreen, showNotification } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('0903.889.123');
  const [loginPassword, setLoginPassword] = useState('••••••••');

  // Register form state
  const [registerRole, setRegisterRole] = useState<UserRole>('buyer');
  const [registerName, setRegisterName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [gardenArea, setGardenArea] = useState('2.0 ha');
  const [youthBranch, setYouthBranch] = useState('Chi đoàn Suối Tre, TP. Long Khánh');

  // Handle Demo Quick Login (1-click for examination)
  const handleQuickLogin = (role: UserRole, accountName: string, phone: string) => {
    setRole(role);
    showNotification(`Đăng nhập thành công với tài khoản: ${accountName} (${phone})`);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone.trim()) {
      showNotification('Vui lòng nhập số điện thoại hoặc email!');
      return;
    }
    showNotification(`Đăng nhập thành công với số điện thoại ${loginPhone}!`);
    setActiveScreen('home');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName.trim() || !registerPhone.trim()) {
      showNotification('Vui lòng điền đầy đủ họ tên và số điện thoại!');
      return;
    }

    if (registerRole === 'buyer') {
      setRole('buyer');
      showNotification(`Tạo tài khoản Khách hàng thành công cho ${registerName}!`);
      setActiveScreen('home');
    } else {
      // Chủ vườn hoặc thanh niên cần Admin duyệt (theo tài liệu đề bài)
      showNotification(
        `Đã gửi hồ sơ đăng ký tài khoản ${registerRole === 'farmer' ? 'Chủ nhà vườn' : 'Thanh niên hỗ trợ số'}. Quản trị viên (Admin) sẽ xác thực trong 24h!`
      );
      setMode('login');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
          <span>HỆ THỐNG TÀI KHOẢN OCOP ĐỒNG NAI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-ink">
          Tài Khoản Chợ OCOP Thanh Niên
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Nền tảng kết nối trực tiếp Khách hàng thành thị, Chủ nhà vườn lớn tuổi và Đoàn viên thanh niên hỗ trợ số
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-green-200 shadow-soft space-y-6">
        {/* Tab switcher: Login vs Register */}
        <div className="flex p-1 bg-cream rounded-2xl border border-green-200 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3 rounded-xl transition ${
              mode === 'login'
                ? 'bg-green-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-green-800'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-3 rounded-xl transition ${
              mode === 'register'
                ? 'bg-green-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-green-800'
            }`}
          >
            Đăng Ký Tài Khoản Mới
          </button>
        </div>

        {/* ================= MODE: LOGIN ================= */}
        {mode === 'login' ? (
          <div className="space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Số điện thoại hoặc Email:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={loginPhone}
                    onChange={e => setLoginPhone(e.target.value)}
                    placeholder="0903.889.123"
                    className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-700">
                    Mật khẩu:
                  </label>
                  <button
                    type="button"
                    onClick={() => showNotification('Hệ thống đã gửi mã OTP đặt lại mật khẩu về số điện thoại!')}
                    className="text-xs text-green-700 hover:underline font-medium"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    className="w-full text-sm pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2"
              >
                <span>Đăng Nhập Vào Hệ Thống</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Login 1-Touch */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block text-center">
                Hoặc Đăng Nhập Nhanh 1 Chạm Để Kiểm Thử (Demo)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('buyer', 'Chị Thảo My', '0903.889.123')}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-200 text-left transition space-y-1"
                >
                  <span className="text-xs font-bold text-ink block">Khách Hàng</span>
                  <span className="text-[11px] text-gray-500 block">Chị Thảo My (TP.HCM)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('farmer', 'Chú Ba Tư', '0918.345.678')}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-amber-50 border border-gray-200 text-left transition space-y-1"
                >
                  <span className="text-xs font-bold text-amber-900 block">Chủ Nhà Vườn</span>
                  <span className="text-[11px] text-gray-500 block">Chú Ba Tư (50 tuổi)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('youth', 'Nguyễn Văn Nam', '0982.112.334')}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 border border-gray-200 text-left transition space-y-1"
                >
                  <span className="text-xs font-bold text-blue-900 block">Thanh Niên Số</span>
                  <span className="text-[11px] text-gray-500 block">Đoàn viên Văn Nam</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= MODE: REGISTER ================= */
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            {/* Choose Role */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                1. Chọn vai trò tài khoản bạn muốn đăng ký:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRegisterRole('buyer')}
                  className={`p-3 rounded-xl border-2 text-center transition ${
                    registerRole === 'buyer'
                      ? 'border-green-700 bg-green-50/50 text-green-900 font-bold'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-xs">Khách Mua</span>
                  <span className="text-[10px] text-green-700 block font-normal">Kích hoạt ngay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegisterRole('farmer')}
                  className={`p-3 rounded-xl border-2 text-center transition ${
                    registerRole === 'farmer'
                      ? 'border-green-700 bg-green-50/50 text-green-900 font-bold'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-xs">Chủ Nhà Vườn</span>
                  <span className="text-[10px] text-amber-700 block font-normal">Cần duyệt hồ sơ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRegisterRole('youth')}
                  className={`p-3 rounded-xl border-2 text-center transition ${
                    registerRole === 'youth'
                      ? 'border-green-700 bg-green-50/50 text-green-900 font-bold'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="block text-xs">Đoàn Viên</span>
                  <span className="text-[10px] text-blue-700 block font-normal">Cần Đoàn xác thực</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Họ và tên người dùng:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={registerName}
                    onChange={e => setRegisterName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Số điện thoại di động:
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={registerPhone}
                    onChange={e => setRegisterPhone(e.target.value)}
                    placeholder="0918.xxx.xxx"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Conditional fields based on role */}
              {registerRole === 'farmer' && (
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs">
                  <label className="block font-bold text-amber-900">
                    Quy mô diện tích vườn tại Đồng Nai:
                  </label>
                  <input
                    type="text"
                    value={gardenArea}
                    onChange={e => setGardenArea(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-amber-300 bg-white"
                  />
                  <p className="text-[11px] text-gray-500">
                    * Tài khoản chủ vườn sẽ được gửi đến Quản trị viên (Admin) để xác minh OCOP trước khi kích hoạt bán hàng.
                  </p>
                </div>
              )}

              {registerRole === 'youth' && (
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs">
                  <label className="block font-bold text-blue-900">
                    Chi đoàn / Đoàn cơ sở sinh hoạt:
                  </label>
                  <input
                    type="text"
                    value={youthBranch}
                    onChange={e => setYouthBranch(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-blue-300 bg-white"
                  />
                  <p className="text-[11px] text-gray-500">
                    * Cần xác nhận của Bí thư Đoàn cơ sở để bắt đầu ghi nhận số giờ tình nguyện.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Tạo mật khẩu:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2"
            >
              <span>Xác Nhận Đăng Ký Tài Khoản</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
