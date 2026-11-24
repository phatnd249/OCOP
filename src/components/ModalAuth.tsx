import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Dialog } from 'primereact/dialog';
import {
  User,
  LogIn,
  UserPlus,
  ShieldAlert,
  ShoppingBag,
  Store,
  Award,
  Eye,
  EyeOff,
  HelpCircle,
  CheckCircle2,
  Lock,
  Phone
} from 'lucide-react';

interface ModalAuthProps {
  visible: boolean;
  onHide: () => void;
  defaultMode?: 'login' | 'register';
}

export const ModalAuth: React.FC<ModalAuthProps> = ({ visible, onHide, defaultMode = 'login' }) => {
  const { login, registerUser, showNotification } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  // Login states
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Register states
  const [regRole, setRegRole] = useState<'buyer' | 'farmer' | 'youth'>('buyer');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  
  // Specific role field
  const [youthUnit, setYouthUnit] = useState('Đoàn xã Bình Lộc, TP. Long Khánh');

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const res = login(loginPhone, loginPass);
    if (res.success) {
      onHide();
    } else {
      setErrorMessage(res.message);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = registerUser({
      name: regName.trim(),
      phone: regPhone.trim(),
      pass: regPass,
      role: regRole,
      gardenName: regRole === 'farmer' ? regName.trim() : undefined,
      unit: regRole === 'youth' ? youthUnit.trim() : undefined
    });

    if (res.success) {
      alert(res.message);
      onHide();
    } else {
      setErrorMessage(res.message);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = () => {
    alert(
      '🔑 HỖ TRỢ KHÔI PHỤC MẬT KHẨU:\n\n' +
      '• Nếu là Chủ nhà vườn / Đoàn viên: Vui lòng liên hệ Tổ công tác Thanh niên số (Hotline: 0982.112.334) hoặc Quản trị viên để được cấp lại mật khẩu ngay.\n' +
      '• Nếu là Người mua: Hệ thống đã gửi mã OTP xác nhận về số điện thoại của bạn.'
    );
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={
        <div className="flex items-center gap-2.5 text-green-950 font-black text-lg">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
            <User className="w-5 h-5" />
          </div>
          <span>{mode === 'login' ? 'ĐĂNG NHẬP TRẠM VƯỜN SỐ' : 'ĐĂNG KÝ TÀI KHOẢN MỚI'}</span>
        </div>
      }
      className="w-full max-w-lg"
      breakpoints={{ '960px': '75vw', '641px': '95vw' }}
      modal
    >
      <div className="space-y-4 pt-1">
        
        {/* Toggle Login / Register */}
        <div className="flex bg-gray-100 p-1 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              mode === 'login' ? 'bg-white text-green-900 shadow-sm font-black' : 'text-gray-500 hover:text-green-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              mode === 'register' ? 'bg-white text-green-900 shadow-sm font-black' : 'text-gray-500 hover:text-green-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Đăng Ký Tài Khoản</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* =========================================================================
            1. FORM ĐĂNG NHẬP: TÊN/SĐT + MẬT KHẨU (NÚT ẨN/HIỆN) + NÚT QUÊN MẬT KHẨU
            (ĐÃ BỎ PHẦN ĐĂNG NHẬP NHANH DEMO DƯỚI ĐÁY THEO YÊU CẦU)
            ========================================================================= */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            {/* Tên / Số điện thoại */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700">
                Tên đăng nhập hoặc Số điện thoại:
              </label>
              <input
                type="text"
                value={loginPhone}
                onChange={e => setLoginPhone(e.target.value)}
                placeholder="Nhập số điện thoại (VD: 0903333333 hoặc admin)"
                className="w-full h-12 px-3.5 rounded-xl bg-white text-sm text-gray-800 border-[1.5px] border-slate-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition"
                required
              />
            </div>

            {/* Mật khẩu có nút hiện/ẩn */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-gray-700">
                  Mật khẩu:
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-bold text-green-800 hover:text-green-950 hover:underline"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <div className="relative flex items-center">
                <input
                  type={showLoginPass ? 'text' : 'password'}
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className="w-full h-12 pl-3.5 pr-11 rounded-xl bg-white text-sm text-gray-800 border-[1.5px] border-slate-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPass(!showLoginPass)}
                  className="absolute right-3.5 text-gray-400 hover:text-green-800 p-1"
                  title={showLoginPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Nút đăng nhập liền khối màu xanh lá đậm, chữ trắng to rõ */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-green-800 hover:bg-green-900 active:bg-green-950 text-white font-black text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-5 h-5 text-white" />
              <span>ĐĂNG NHẬP NGAY</span>
            </button>

            {/* Footer chuyển tab */}
            <div className="text-center pt-1 border-t border-gray-100">
              <span className="text-xs text-gray-500">Chưa có tài khoản trên Trạm Vườn Số? </span>
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMessage(''); }}
                className="text-xs font-bold text-green-800 hover:underline"
              >
                Đăng ký tài khoản mới
              </button>
            </div>
          </form>
        ) : (
          /* =========================================================================
              2. FORM ĐĂNG KÝ: TINH GỌN THEO 3 VAI TRÒ (NGƯỜI 20 - 60 TUỔI)
              ========================================================================= */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* Chọn vai trò (3 Thẻ to rõ) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700">
                1. Bạn tham gia với vai trò nào?
              </label>

              <div className="grid grid-cols-3 gap-2">
                {/* Vai trò: Người mua */}
                <button
                  type="button"
                  onClick={() => setRegRole('buyer')}
                  className={`p-2.5 rounded-xl border-[1.5px] text-center transition flex flex-col items-center justify-center gap-1 ${
                    regRole === 'buyer'
                      ? 'border-green-800 bg-green-50 text-green-950 font-black shadow-sm ring-1 ring-green-800'
                      : 'border-slate-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <ShoppingBag className={`w-5 h-5 ${regRole === 'buyer' ? 'text-green-800' : 'text-gray-400'}`} />
                  <span className="text-xs leading-none">Người mua</span>
                  <span className="text-[10px] text-gray-500 font-normal">Mua & Đặt tour</span>
                </button>

                {/* Vai trò: Chủ nhà vườn */}
                <button
                  type="button"
                  onClick={() => setRegRole('farmer')}
                  className={`p-2.5 rounded-xl border-[1.5px] text-center transition flex flex-col items-center justify-center gap-1 ${
                    regRole === 'farmer'
                      ? 'border-green-800 bg-green-50 text-green-950 font-black shadow-sm ring-1 ring-green-800'
                      : 'border-slate-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Store className={`w-5 h-5 ${regRole === 'farmer' ? 'text-green-800' : 'text-gray-400'}`} />
                  <span className="text-xs leading-none">Chủ nhà vườn</span>
                  <span className="text-[10px] text-gray-500 font-normal">Đưa quả lên sàn</span>
                </button>

                {/* Vai trò: Thanh niên số */}
                <button
                  type="button"
                  onClick={() => setRegRole('youth')}
                  className={`p-2.5 rounded-xl border-[1.5px] text-center transition flex flex-col items-center justify-center gap-1 ${
                    regRole === 'youth'
                      ? 'border-green-800 bg-green-50 text-green-950 font-black shadow-sm ring-1 ring-green-800'
                      : 'border-slate-300 bg-white text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <Award className={`w-5 h-5 ${regRole === 'youth' ? 'text-green-800' : 'text-gray-400'}`} />
                  <span className="text-xs leading-none">Thanh niên số</span>
                  <span className="text-[10px] text-gray-500 font-normal">Đoàn viên hỗ trợ</span>
                </button>
              </div>
            </div>

            {/* Các trường nhập liệu được tinh gọn theo 1 cột thẳng hàng */}
            <div className="space-y-3 pt-1">
              
              {/* Ô 1: Họ tên hoặc Tên nhà vườn */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  {regRole === 'farmer'
                    ? 'Tên chủ vườn hoặc Tên nhà vườn:'
                    : 'Họ và tên của bạn:'}
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder={
                    regRole === 'farmer'
                      ? 'Ví dụ: Chú Ba Tư (Nhà vườn Ba Tư)'
                      : regRole === 'youth'
                      ? 'Ví dụ: Nguyễn Văn Nam'
                      : 'Ví dụ: Lê Thị Hạnh'
                  }
                  className="w-full h-12 px-3.5 rounded-xl bg-white text-sm text-gray-800 border-[1.5px] border-slate-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition"
                  required
                />
              </div>

              {/* Ô 2: Số điện thoại */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  Số điện thoại (dùng để đăng nhập & liên hệ):
                </label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  placeholder="Ví dụ: 0988776655"
                  className="w-full h-12 px-3.5 rounded-xl bg-white text-sm text-gray-800 border-[1.5px] border-slate-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition"
                  required
                />
              </div>

              {/* Ô 3: Mật khẩu có nút hiện/ẩn mắt */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  Mật khẩu:
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showRegPass ? 'text' : 'password'}
                    value={regPass}
                    onChange={e => setRegPass(e.target.value)}
                    placeholder="Tạo mật khẩu dễ nhớ..."
                    className="w-full h-12 pl-3.5 pr-11 rounded-xl bg-white text-sm text-gray-800 border-[1.5px] border-slate-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPass(!showRegPass)}
                    className="absolute right-3.5 text-gray-400 hover:text-green-800 p-1"
                    title={showRegPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Ô 4 (Dành riêng cho Thanh niên số): Đơn vị Đoàn / Khu vực hỗ trợ */}
              {regRole === 'youth' && (
                <div className="space-y-1 animate-fadeIn">
                  <label className="block text-xs font-bold text-gray-700">
                    Đơn vị Đoàn / Khu vực hỗ trợ:
                  </label>
                  <input
                    type="text"
                    value={youthUnit}
                    onChange={e => setYouthUnit(e.target.value)}
                    placeholder="Ví dụ: Đoàn xã Bình Lộc, TP. Long Khánh"
                    className="w-full h-12 px-3.5 rounded-xl bg-white text-sm text-gray-800 border-[1.5px] border-slate-300 focus:border-green-800 focus:ring-2 focus:ring-green-100 outline-none transition"
                    required
                  />
                </div>
              )}

              {/* Dòng gợi ý tâm lý dành riêng cho Chủ nhà vườn */}
              {regRole === 'farmer' && (
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 leading-relaxed flex items-start gap-2.5 animate-fadeIn">
                  <span className="text-xl shrink-0">🤝</span>
                  <div className="space-y-1">
                    <p>
                      <strong>Chưa rành thao tác?</strong> Chỉ cần nhập SĐT và mật khẩu, đoàn viên thanh niên xã sẽ trực tiếp đến tận vườn hỗ trợ tạo hồ sơ, chụp ảnh và đăng bán giúp chú.
                    </p>
                    <p className="text-[11px] font-bold text-amber-900 bg-white/80 px-2.5 py-1 rounded-lg border border-amber-300 inline-block">
                      📞 Hotline Đoàn viên hỗ trợ tận vườn: <a href="tel:0982112334" className="text-green-800 underline font-black">0982.112.334</a> (Bạn Nam - Bí thư Đoàn)
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Nút đăng ký: Liền khối màu xanh lá đậm, chữ trắng to rõ ở cuối form */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-green-800 hover:bg-green-900 active:bg-green-950 text-white font-black text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 mt-2"
            >
              <UserPlus className="w-5 h-5 text-white" />
              <span>
                {regRole === 'buyer' ? 'ĐĂNG KÝ TÀI KHOẢN NGAY' : 'GỬI ĐĂNG KÝ THAM GIA'}
              </span>
            </button>

            {/* Chuyển sang Đăng nhập */}
            <div className="text-center pt-1 border-t border-gray-100">
              <span className="text-xs text-gray-500">Đã có tài khoản? </span>
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className="text-xs font-bold text-green-800 hover:underline"
              >
                Đăng nhập ngay
              </button>
            </div>
          </form>
        )}

      </div>
    </Dialog>
  );
};
