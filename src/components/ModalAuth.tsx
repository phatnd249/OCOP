import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import {
  User,
  LogIn,
  UserPlus,
  ShieldAlert,
  Sparkles,
  ShoppingBag,
  Store,
  Award,
  Lock,
  Phone,
  MapPin,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface ModalAuthProps {
  visible: boolean;
  onHide: () => void;
  defaultMode?: 'login' | 'register';
}

export const ModalAuth: React.FC<ModalAuthProps> = ({ visible, onHide, defaultMode = 'login' }) => {
  const { login, quickLogin, registerUser } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);

  // Form states
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Register form states
  const [regRole, setRegRole] = useState<'buyer' | 'farmer' | 'youth'>('buyer');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  
  // Dynamic fields
  const [buyerAddress, setBuyerAddress] = useState('Quận 1, TP. Hồ Chí Minh');
  const [farmerGardenName, setFarmerGardenName] = useState('Nhà vườn Chú Sáu - Long Khánh');
  const [farmerArea, setFarmerArea] = useState('1.8 ha');
  const [farmerCrops, setFarmerCrops] = useState('Chôm chôm nhãn, Sầu riêng Ri6');
  const [farmerAddress, setFarmerAddress] = useState('Ấp Suối Tre, TP. Long Khánh');
  const [youthUnit, setYouthUnit] = useState('Đoàn xã Bình Lộc, TP. Long Khánh');
  const [youthSkills, setYouthSkills] = useState('Chụp ảnh sản phẩm, Livestream, Số hóa QR');

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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = registerUser({
      name: regName,
      phone: regPhone,
      pass: regPass,
      role: regRole,
      address: regRole === 'buyer' ? buyerAddress : farmerAddress,
      gardenName: regRole === 'farmer' ? farmerGardenName : undefined,
      gardenArea: regRole === 'farmer' ? farmerArea : undefined,
      crops: regRole === 'farmer' ? farmerCrops : undefined,
      unit: regRole === 'youth' ? youthUnit : undefined,
      skills: regRole === 'youth' ? youthSkills : undefined
    });

    if (res.success) {
      alert(res.message);
      onHide();
    } else {
      setErrorMessage(res.message);
    }
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={
        <div className="flex items-center gap-2 text-green-950 font-black text-lg">
          <User className="w-5 h-5 text-green-700" />
          <span>{mode === 'login' ? 'ĐĂNG NHẬP HỆ THỐNG TRẠM VƯỜN SỐ' : 'ĐĂNG KÝ TÀI KHOẢN MỚI'}</span>
        </div>
      }
      className="w-full max-w-xl"
      breakpoints={{ '960px': '75vw', '641px': '95vw' }}
      modal
    >
      <div className="space-y-5 pt-2">
        {/* Toggle Login / Register */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              mode === 'login' ? 'bg-white text-green-900 shadow-sm' : 'text-gray-500 hover:text-green-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMessage(''); }}
            className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 ${
              mode === 'register' ? 'bg-white text-green-900 shadow-sm' : 'text-gray-500 hover:text-green-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Đăng Ký Tài Khoản</span>
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* =========================================================================
            FORM A: ĐĂNG NHẬP + KHUNG ĐĂNG NHẬP 1 CHẠM DÀNH CHO DEMO
            ========================================================================= */}
        {mode === 'login' ? (
          <div className="space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Số điện thoại / Tên đăng nhập:
                </label>
                <InputText
                  value={loginPhone}
                  onChange={e => setLoginPhone(e.target.value)}
                  placeholder="Ví dụ: 0903333333 hoặc admin"
                  className="w-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Mật khẩu:
                </label>
                <InputText
                  type="password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  placeholder="Mật khẩu demo: 123"
                  className="w-full text-sm"
                  required
                />
              </div>

              <Button
                type="submit"
                icon="pi pi-sign-in"
                label="Đăng Nhập Ngay"
                className="w-full p-button-success font-black text-sm shadow"
              />
            </form>

            {/* KHUNG ĐĂNG NHẬP NHANH 1 CHẠM DÀNH CHO DEMO BẮT BUỘC THEO ĐỀ BÀI */}
            <div className="p-4 rounded-2xl bg-cream border border-green-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-green-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sun" />
                  <span>Đăng Nhập Nhanh 1 Chạm (Dành cho Giám khảo & Demo)</span>
                </span>
                <span className="text-[10px] bg-sun text-earth-dark px-2 py-0.5 rounded font-black">
                  Click & Go
                </span>
              </div>
              <p className="text-[11px] text-gray-600">
                Không cần gõ mật khẩu, bấm chọn 1 trong 4 vai trò để trải nghiệm quyền hạn tương ứng:
              </p>

              <div className="grid grid-cols-2 gap-2">
                {/* 1. Admin */}
                <button
                  type="button"
                  onClick={() => { quickLogin('admin'); onHide(); }}
                  className="p-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-left transition flex items-center gap-2 group"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 group-hover:scale-125 transition-transform"></span>
                  <div>
                    <strong className="text-xs text-red-900 block leading-none">🔴 Admin Quản trị</strong>
                    <span className="text-[10px] text-red-700">Duyệt & Khóa tài khoản</span>
                  </div>
                </button>

                {/* 2. Thanh niên */}
                <button
                  type="button"
                  onClick={() => { quickLogin('youth'); onHide(); }}
                  className="p-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-left transition flex items-center gap-2 group"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 group-hover:scale-125 transition-transform"></span>
                  <div>
                    <strong className="text-xs text-blue-900 block leading-none">🔵 ĐV Văn Nam</strong>
                    <span className="text-[10px] text-blue-700">Live, Đăng AI, Giờ Đoàn</span>
                  </div>
                </button>

                {/* 3. Nhà vườn */}
                <button
                  type="button"
                  onClick={() => { quickLogin('farmer'); onHide(); }}
                  className="p-2.5 rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 text-left transition flex items-center gap-2 group"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-green-700 group-hover:scale-125 transition-transform"></span>
                  <div>
                    <strong className="text-xs text-green-950 block leading-none">🟢 Chú Ba Tư (50t)</strong>
                    <span className="text-[10px] text-green-800">Chữ lớn, Quản lý vườn</span>
                  </div>
                </button>

                {/* 4. Người mua */}
                <button
                  type="button"
                  onClick={() => { quickLogin('buyer'); onHide(); }}
                  className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-left transition flex items-center gap-2 group"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 group-hover:scale-125 transition-transform"></span>
                  <div>
                    <strong className="text-xs text-amber-950 block leading-none">🟠 Khách TP.HCM</strong>
                    <span className="text-[10px] text-amber-800">Mua OCOP, Quét QR</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
              FORM B: ĐĂNG KÝ THÔNG MINH ĐỔI THEO VAI TRÒ
              ========================================================================= */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Chọn vai trò tham gia nền tảng:
              </label>
              
              {/* 3 Thẻ chọn vai trò (Radio Card) */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRegRole('buyer')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    regRole === 'buyer'
                      ? 'border-green-700 bg-green-50/70 ring-2 ring-green-600 shadow-sm'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBag className={`w-5 h-5 mb-1 ${regRole === 'buyer' ? 'text-green-700' : 'text-gray-400'}`} />
                  <div>
                    <strong className="text-xs text-ink block leading-snug">Người Mua</strong>
                    <span className="text-[10px] text-gray-500">Đặt OCOP & Tour</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRegRole('farmer')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    regRole === 'farmer'
                      ? 'border-green-700 bg-green-50/70 ring-2 ring-green-600 shadow-sm'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <Store className={`w-5 h-5 mb-1 ${regRole === 'farmer' ? 'text-green-700' : 'text-gray-400'}`} />
                  <div>
                    <strong className="text-xs text-ink block leading-snug">Chủ Nhà Vườn</strong>
                    <span className="text-[10px] text-gray-500">Đưa nông sản lên sàn</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRegRole('youth')}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                    regRole === 'youth'
                      ? 'border-green-700 bg-green-50/70 ring-2 ring-green-600 shadow-sm'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <Award className={`w-5 h-5 mb-1 ${regRole === 'youth' ? 'text-green-700' : 'text-gray-400'}`} />
                  <div>
                    <strong className="text-xs text-ink block leading-snug">Thanh Niên Số</strong>
                    <span className="text-[10px] text-gray-500">Đoàn viên hỗ trợ</span>
                  </div>
                </button>
              </div>

              {regRole !== 'buyer' && (
                <p className="text-[11px] text-amber-700 font-bold mt-2 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  ⚠️ Lưu ý: Tài khoản Nhà vườn và Thanh niên sau khi đăng ký sẽ cần Quản trị viên (Admin) xét duyệt để đảm bảo tính xác thực!
                </p>
              )}
            </div>

            {/* Thông tin chung */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Họ và tên:</label>
                <InputText
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="Ví dụ: Lê Thị Hạnh"
                  className="w-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Số điện thoại:</label>
                <InputText
                  type="tel"
                  value={regPhone}
                  onChange={e => setRegPhone(e.target.value)}
                  placeholder="Ví dụ: 0988776655"
                  className="w-full text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mật khẩu:</label>
              <InputText
                type="password"
                value={regPass}
                onChange={e => setRegPass(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full text-sm"
                required
              />
            </div>

            {/* Dynamic field cho Buyer */}
            {regRole === 'buyer' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Địa chỉ nhận hàng mặc định (TP.HCM / Các tỉnh):
                </label>
                <InputText
                  value={buyerAddress}
                  onChange={e => setBuyerAddress(e.target.value)}
                  className="w-full text-sm"
                  placeholder="Ví dụ: Chung cư Masteri Thảo Điền, TP. Thủ Đức"
                  required
                />
              </div>
            )}

            {/* Dynamic fields cho Farmer */}
            {regRole === 'farmer' && (
              <div className="p-3.5 bg-cream rounded-2xl border border-green-200 space-y-3">
                <span className="text-xs font-black text-green-950 block">Thông tin cơ sở nhà vườn OCOP:</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Tên nhà vườn:</label>
                    <InputText
                      value={farmerGardenName}
                      onChange={e => setFarmerGardenName(e.target.value)}
                      className="w-full text-xs"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">Quy mô diện tích:</label>
                    <InputText
                      value={farmerArea}
                      onChange={e => setFarmerArea(e.target.value)}
                      className="w-full text-xs"
                      placeholder="VD: 2.5 ha"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Cây trồng / Sản phẩm chủ lực:</label>
                  <InputText
                    value={farmerCrops}
                    onChange={e => setFarmerCrops(e.target.value)}
                    className="w-full text-xs"
                    placeholder="VD: Sầu riêng Ri6, Chôm chôm nhãn"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Địa chỉ vườn tại Đồng Nai:</label>
                  <InputText
                    value={farmerAddress}
                    onChange={e => setFarmerAddress(e.target.value)}
                    className="w-full text-xs"
                    required
                  />
                </div>
              </div>
            )}

            {/* Dynamic fields cho Youth */}
            {regRole === 'youth' && (
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 space-y-3">
                <span className="text-xs font-black text-blue-950 block">Thông tin tổ chức Đoàn thanh niên:</span>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Đơn vị Đoàn / Chi đoàn trực thuộc:</label>
                  <InputText
                    value={youthUnit}
                    onChange={e => setYouthUnit(e.target.value)}
                    className="w-full text-xs"
                    placeholder="VD: Đoàn xã Bình Lộc, TP. Long Khánh"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Kỹ năng số hỗ trợ nhà vườn:</label>
                  <InputText
                    value={youthSkills}
                    onChange={e => setYouthSkills(e.target.value)}
                    className="w-full text-xs"
                    placeholder="VD: Livestream, Chụp ảnh sản phẩm, Tạo QR"
                    required
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              icon="pi pi-user-plus"
              label={regRole === 'buyer' ? 'Đăng Ký & Đăng Nhập Ngay' : 'Gửi Đăng Ký Chờ Admin Duyệt'}
              className="w-full p-button-success font-black text-sm shadow"
            />
          </form>
        )}
      </div>
    </Dialog>
  );
};
