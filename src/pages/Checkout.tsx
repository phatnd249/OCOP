import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Truck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
  Calendar
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, products, createOrder, setActiveScreen, showNotification } = useApp();

  const [customerName, setCustomerName] = useState('Chị Thảo My');
  const [phone, setPhone] = useState('0903.889.123');
  const [address, setAddress] = useState('Chung cư Sailing Tower, Pasteur, P. Bến Nghé, Quận 1, TP.HCM');
  const [farmerNote, setFarmerNote] = useState('Chọn 1 quả sầu riêng cơm nứt nhẹ để ăn chiều nay, đóng thùng xốp mát giúp mình nhé.');
  const [shippingMethod, setShippingMethod] = useState<'express_hcm' | 'pickup_garden' | 'standard'>('express_hcm');
  const [orderCreatedId, setOrderCreatedId] = useState<string | null>(null);

  const cartDetails = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return {
      name: p?.name || 'Nông sản',
      qty: item.qty,
      unitPrice: p?.price || 0,
      unit: p?.unit || 'kg'
    };
  });

  const subtotal = cartDetails.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);

  const shippingCosts = {
    express_hcm: 35000,
    pickup_garden: 0,
    standard: 25000
  };

  const shippingLabels = {
    express_hcm: 'Giao siêu tốc xe lạnh về TP.HCM (Nhận trong 3-4 tiếng)',
    pickup_garden: 'Nhận trực tiếp tại Nhà Vườn Ba Tư (Kết hợp Tour)',
    standard: 'Chuyển phát bưu điện OCOP bảo quản mát (Giao ngày mai)'
  };

  const deliveryFee = shippingCosts[shippingMethod];
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartDetails.length === 0) {
      showNotification('Giỏ hàng trống, vui lòng chọn nông sản trước!');
      return;
    }

    const newOrderId = createOrder({
      customerName,
      phone,
      address,
      items: cartDetails.map(i => ({ name: i.name, qty: i.qty, unitPrice: i.unitPrice })),
      total: grandTotal,
      shippingMethod: shippingLabels[shippingMethod],
      deliveryFee,
      farmerNote
    });

    setOrderCreatedId(newOrderId);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  if (orderCreatedId) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-green-200 text-center max-w-xl mx-auto space-y-6 shadow-soft animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-green-700 font-bold">
            ĐẶT HÀNG THÀNH CÔNG • ĐỀ 3
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            Cảm Ơn Bạn Đã Ủng Hộ Nông Dân Ba Tư!
          </h2>
          <p className="text-sm text-gray-600">
            Mã đơn hàng của bạn: <strong className="text-green-800 font-mono text-base">{orderCreatedId}</strong>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-cream border border-green-200 text-left text-xs text-gray-700 space-y-2">
          <p>📍 <strong>Địa chỉ nhận:</strong> {address}</p>
          <p>🚚 <strong>Phương thức:</strong> {shippingLabels[shippingMethod]}</p>
          <p>💰 <strong>Tổng thanh toán (COD):</strong> <strong className="text-green-800 text-sm">{grandTotal.toLocaleString('vi-VN')} đ</strong></p>
          <p>🌾 <strong>Lời dặn nhà vườn:</strong> "{farmerNote}"</p>
        </div>

        <div className="p-4 rounded-2xl bg-sun-light/50 border border-amber-200 text-xs text-earth text-left">
          💡 <strong>Liên thông hệ thống:</strong> Đơn hàng đã được chuyển ngay lập tức sang màn hình của <strong>Chú Ba Tư (50 tuổi)</strong> để chuẩn bị cắt hái tại gốc và thanh niên hỗ trợ đóng thùng!
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => setActiveScreen('orders')}
            className="flex-1 py-3.5 px-4 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Xem Đơn Bên Màn Hình Chú Ba Tư (CV5)</span>
          </button>
          <button
            onClick={() => setActiveScreen('home')}
            className="py-3.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-ink">
          Xác Nhận Đặt Hàng & Chọn Hình Thức Nhận (K7)
        </h1>
        <p className="text-xs text-gray-500">
          Màn hình bắt buộc số 4: Điền thông tin giao nhận về TP.HCM hoặc nhận tại vườn
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form: Info & Shipping */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping choices (Requirement of Đề 3) */}
          <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-ink flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-700" />
              <span>1. Chọn Hình Thức Nhận Hàng Nông Sản</span>
            </h3>

            <div className="space-y-3">
              {/* Option 1 */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-4 cursor-pointer transition ${
                  shippingMethod === 'express_hcm'
                    ? 'border-green-700 bg-green-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'express_hcm'}
                  onChange={() => setShippingMethod('express_hcm')}
                  className="mt-1 text-green-700 focus:ring-green-600"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-ink">
                      Giao siêu tốc xe lạnh về TP.HCM (3-4 tiếng)
                    </span>
                    <span className="font-bold text-sm text-green-800">35.000 đ</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Trái cây vừa cắt sáng sớm tại Long Khánh được cho vào thùng xốp mát, xe chành chuyển thẳng đến tận nhà bạn ở TP.HCM.
                  </p>
                </div>
              </label>

              {/* Option 2 */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-4 cursor-pointer transition ${
                  shippingMethod === 'pickup_garden'
                    ? 'border-green-700 bg-green-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'pickup_garden'}
                  onChange={() => setShippingMethod('pickup_garden')}
                  className="mt-1 text-green-700 focus:ring-green-600"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-ink">
                      Nhận trực tiếp tại Nhà Vườn Ba Tư (Kết hợp Tour)
                    </span>
                    <span className="font-bold text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Miễn phí 0 đ
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Bạn tự đến vườn tại Long Khánh tham quan, tự tay hái trái chín trên cây và nhận mang về không tốn cước vận chuyển.
                  </p>
                </div>
              </label>

              {/* Option 3 */}
              <label
                className={`p-4 rounded-2xl border-2 flex items-start gap-4 cursor-pointer transition ${
                  shippingMethod === 'standard'
                    ? 'border-green-700 bg-green-50/40'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  className="mt-1 text-green-700 focus:ring-green-600"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-ink">
                      Chuyển phát bưu điện OCOP bảo quản mát
                    </span>
                    <span className="font-bold text-sm text-green-800">25.000 đ</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Đóng gói tiêu chuẩn xốp lưới bảo vệ vỏ bưởi, sầu riêng, giao toàn quốc trong 24-36h.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Customer info form */}
          <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-ink flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-700" />
              <span>2. Thông Tin Khách Hàng (Người Nhận Tại TP.HCM)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Họ và tên người nhận:
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Số điện thoại nhận hàng:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Địa chỉ giao hàng chi tiết (TP.HCM):
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Lời dặn gửi Chú Ba Tư & Nhà vườn:
              </label>
              <textarea
                rows={2}
                value={farmerNote}
                onChange={e => setFarmerNote(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="Ví dụ: Chọn quả sầu riêng cơm nứt nhẹ chín tới để ăn tối nay..."
              />
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-5 sticky top-24">
            <h3 className="font-bold text-lg text-ink">Xác Nhận Thanh Toán</h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="font-semibold text-gray-500 pb-2 border-b">
                Sản phẩm đặt mua ({cartDetails.length} món):
              </div>
              {cartDetails.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-700">
                  <span className="line-clamp-1 flex-1 pr-2">
                    {item.name} × {item.qty} {item.unit}
                  </span>
                  <span className="font-bold shrink-0">
                    {(item.unitPrice * item.qty).toLocaleString('vi-VN')} đ
                  </span>
                </div>
              ))}

              <div className="pt-3 border-t border-gray-100 flex justify-between text-gray-600">
                <span>Tiền nông sản:</span>
                <span className="font-bold">{subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Cước vận chuyển:</span>
                <span className="font-bold text-green-700">
                  {deliveryFee === 0 ? 'Miễn phí' : `${deliveryFee.toLocaleString('vi-VN')} đ`}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="font-bold text-ink text-base">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-green-800">
                  {grandTotal.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-sun hover:bg-amber-500 text-earth-dark font-black text-base shadow transition flex items-center justify-center gap-2"
            >
              <span>Xác Nhận Đặt Hàng Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-1.5 text-[11px] text-gray-500 pt-2 border-t">
              <p className="flex items-center gap-1.5 text-green-800 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Cam kết chất lượng OCOP chuẩn sao
              </p>
              <p>• Thanh toán tiền mặt trực tiếp khi nhận hàng</p>
              <p>• Kiểm tra hàng đúng chuẩn bao ăn mới thanh toán</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
