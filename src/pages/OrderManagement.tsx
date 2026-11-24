import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import {
  Package,
  Volume2,
  CheckCircle,
  Truck,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus, showNotification } = useApp();
  const [largeFontMode, setLargeFontMode] = useState(true);

  // Text-To-Speech for Elderly Farmer (50 years old)
  const handleSpeakOrder = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9; // Slightly slower for clarity
      window.speechSynthesis.speak(utterance);
      showNotification('🔊 Đang đọc to nội dung đơn hàng cho Chú Ba Tư nghe...');
    } else {
      showNotification(`🔊 [Giọng đọc]: ${text}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Elderly Accessibility Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Package className="w-7 h-7" />
          </div>
          <div>
            <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded uppercase">
              CỔNG QUẢN LÝ NHÀ VƯỜN • CHẾ ĐỘ TIẾP CẬN DỄ ĐỌC
            </span>
            <h1 className="text-xl sm:text-2xl font-black mt-1">
              Quản Lý Đơn Hàng Cần Hái Tại Vườn Ba Tư
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-0.5">
              Thiết kế chữ to rõ ràng, nút bấm lớn, có trợ lý giọng nói đọc chi tiết đơn hàng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setLargeFontMode(!largeFontMode)}
            className="px-4 py-2.5 rounded-xl bg-white text-amber-900 font-bold text-xs sm:text-sm shadow transition hover:bg-cream"
          >
            {largeFontMode ? '🔍 Cỡ chữ: SIÊU TO' : '🔍 Cỡ chữ: Vừa vặn'}
          </button>
          <button
            onClick={() => showNotification('Đã cập nhật lại toàn bộ đơn mới nhất từ TP.HCM!')}
            className="p-2.5 rounded-xl bg-amber-800 text-white hover:bg-amber-900 transition"
            title="Làm mới"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-ink">
            Đơn Hàng Cần Hái & Đóng Thùng ({orders.length})
          </h2>
          <span className="text-xs text-gray-500">
            Sắp xếp theo thứ tự ưu tiên giao sớm
          </span>
        </div>

        <div className="space-y-6">
          {orders.map(order => {
            const isPending = order.status === 'pending_harvest';
            const isShipping = order.status === 'shipping';
            const isCompleted = order.status === 'completed';

            const speakText = `Đơn hàng của ${order.customerName}. Số điện thoại ${order.phone}. Gồm có ${order.items.map(i => `${i.qty} phần ${i.name}`).join(', ')}. Giao đến ${order.address}. Lời dặn: ${order.farmerNote || 'Không có'}.`;

            return (
              <div
                key={order.orderId}
                className={`bg-white rounded-3xl border-2 p-6 sm:p-8 shadow-soft transition space-y-6 ${
                  isPending
                    ? 'border-amber-400 bg-amber-50/20'
                    : isShipping
                    ? 'border-blue-300'
                    : 'border-green-300 bg-green-50/10'
                }`}
              >
                {/* Header of order */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-base sm:text-lg text-green-900">
                      #{order.orderId}
                    </span>
                    <span className="text-xs text-gray-400">• {order.orderTime}</span>
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full uppercase ${
                        isPending
                          ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                          : isShipping
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-green-100 text-green-800 border border-green-300'
                      }`}
                    >
                      {order.statusText}
                    </span>
                  </div>

                  {/* Read aloud button for elderly */}
                  <button
                    onClick={() => handleSpeakOrder(speakText)}
                    className="self-start sm:self-auto bg-green-100 hover:bg-green-200 text-green-900 px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <Volume2 className="w-4 h-4 text-green-700" />
                    <span>Đọc to đơn này</span>
                  </button>
                </div>

                {/* Body Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Customer & Address */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-gray-400 block">Khách hàng nhận tại TP.HCM:</span>
                      <strong className={`block text-ink ${largeFontMode ? 'text-xl' : 'text-base'}`}>
                        {order.customerName}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-green-700 shrink-0" />
                      <span>{order.phone}</span>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                      <span className={largeFontMode ? 'text-base font-medium' : 'text-xs'}>
                        {order.address}
                      </span>
                    </div>

                    <div className="p-3 bg-cream rounded-xl border border-green-200 text-xs text-green-950">
                      🚚 <strong>Hình thức:</strong> {order.shippingMethod}
                    </div>

                    {order.farmerNote && (
                      <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-earth">
                        📝 <strong>Lời dặn cho chú Ba Tư:</strong> "{order.farmerNote}"
                      </div>
                    )}
                  </div>

                  {/* Right: Products List & Total */}
                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border">
                      <span className="text-xs font-bold text-gray-500 uppercase block">
                        Danh sách nông sản cần hái:
                      </span>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm py-1 border-b border-gray-200 last:border-0"
                        >
                          <span className={`font-bold text-ink ${largeFontMode ? 'text-lg text-green-900' : 'text-sm'}`}>
                            {item.name}
                          </span>
                          <span className="bg-white px-3 py-1 rounded-lg border font-black text-amber-800 text-base">
                            × {item.qty} kg
                          </span>
                        </div>
                      ))}

                      <div className="pt-2 flex justify-between items-baseline text-sm">
                        <span className="font-bold text-gray-600">Tổng thu tiền (COD):</span>
                        <span className={`font-black text-green-800 ${largeFontMode ? 'text-2xl' : 'text-xl'}`}>
                          {order.total.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>

                    {/* Action buttons (Big buttons for elderly) */}
                    <div className="pt-2">
                      {isPending && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'shipping')}
                          className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-earth-dark font-black text-base sm:text-lg shadow-md transition flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-6 h-6" />
                          <span>Đã Cắt Hái Xong ➔ Giao Xe Lạnh Ngay</span>
                        </button>
                      )}

                      {isShipping && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'completed')}
                          className="w-full py-4 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-black text-base sm:text-lg shadow-md transition flex items-center justify-center gap-2"
                        >
                          <Truck className="w-6 h-6" />
                          <span>Đã Giao Tới Khách ➔ Bấm Hoàn Thành</span>
                        </button>
                      )}

                      {isCompleted && (
                        <div className="text-center p-3 rounded-2xl bg-green-100 text-green-800 font-bold text-sm flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>Đơn hàng đã hoàn thành tốt đẹp!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
