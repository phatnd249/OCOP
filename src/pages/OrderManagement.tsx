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
    <div className="space-y-6">
      {/* Banner Quản lý Đơn hàng - Gọn gàng, tinh tế */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl p-5 sm:p-6 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase">
              CỔNG QUẢN LÝ NHÀ VƯỜN & ĐOÀN VIÊN HỖ TRỢ
            </span>
            <h1 className="text-lg sm:text-xl font-black mt-0.5">
              Quản Lý Đơn Hàng Cần Hái Tại Vườn Ba Tư
            </h1>
            <p className="text-amber-100 text-xs mt-0.5">
              Hỗ trợ đóng thùng, chuẩn bị xe lạnh giao trong ngày và trợ lý giọng nói đọc chi tiết đơn
            </p>
          </div>
        </div>

        <button
          onClick={() => showNotification('Đã cập nhật lại toàn bộ đơn mới nhất từ TP.HCM!')}
          className="p-2.5 rounded-xl bg-amber-800/80 hover:bg-amber-900 text-white transition shrink-0"
          title="Làm mới"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg sm:text-xl font-black text-ink flex items-center gap-2">
            <span>Đơn Hàng Cần Hái & Đóng Thùng</span>
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {orders.length} đơn
            </span>
          </h2>
          <span className="text-xs text-gray-500">
            Ưu tiên giao sớm
          </span>
        </div>

        <div className="space-y-4">
          {orders.map(order => {
            const isPending = order.status === 'pending_harvest';
            const isShipping = order.status === 'shipping';
            const isCompleted = order.status === 'completed';

            const speakText = `Đơn hàng của ${order.customerName}. Số điện thoại ${order.phone}. Gồm có ${order.items.map(i => `${i.qty} phần ${i.name}`).join(', ')}. Giao đến ${order.address}. Lời dặn: ${order.farmerNote || 'Không có'}.`;

            return (
              <div
                key={order.orderId}
                className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs transition space-y-4 ${
                  isPending
                    ? 'border-amber-300 bg-amber-50/20'
                    : isShipping
                    ? 'border-blue-200'
                    : 'border-green-200 bg-green-50/10'
                }`}
              >
                {/* Header of order */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-black text-sm sm:text-base text-green-900">
                      #{order.orderId}
                    </span>
                    <span className="text-xs text-gray-400">• {order.orderTime}</span>
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                        isPending
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : isShipping
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-green-100 text-green-800 border border-green-300'
                      }`}
                    >
                      {order.statusText}
                    </span>
                  </div>

                  {/* Read aloud button */}
                  <button
                    onClick={() => handleSpeakOrder(speakText)}
                    className="bg-green-50 hover:bg-green-100 text-green-900 border border-green-200 px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-green-700" />
                    <span>Đọc to đơn</span>
                  </button>
                </div>

                {/* Body Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left: Customer & Address */}
                  <div className="space-y-2.5">
                    <div>
                      <span className="text-[11px] text-gray-400 block">Khách hàng nhận tại TP.HCM:</span>
                      <strong className="block text-ink text-base">
                        {order.customerName}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <Phone className="w-3.5 h-3.5 text-green-700 shrink-0" />
                      <span>{order.phone}</span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-gray-700">
                      <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                      <span>{order.address}</span>
                    </div>

                    <div className="p-2.5 bg-cream rounded-lg border border-green-200 text-xs text-green-950">
                      🚚 <strong>Hình thức:</strong> {order.shippingMethod}
                    </div>

                    {order.farmerNote && (
                      <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-earth">
                        📝 <strong>Lời dặn:</strong> "{order.farmerNote}"
                      </div>
                    )}
                  </div>

                  {/* Right: Products List & Total */}
                  <div className="space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                      <span className="text-[11px] font-bold text-gray-500 uppercase block">
                        Danh sách nông sản cần hái:
                      </span>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-xs py-1 border-b border-gray-100 last:border-0"
                        >
                          <span className="font-bold text-green-950">
                            {item.name}
                          </span>
                          <span className="bg-white px-2 py-0.5 rounded border font-black text-amber-800 text-xs">
                            × {item.qty} kg
                          </span>
                        </div>
                      ))}

                      <div className="pt-2 flex justify-between items-baseline text-xs border-t border-gray-200/60">
                        <span className="font-bold text-gray-600">Tổng thu tiền (COD):</span>
                        <span className="font-black text-green-800 text-base">
                          {order.total.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div>
                      {isPending && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'shipping')}
                          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-earth-dark font-black text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Đã Cắt Hái Xong ➔ Giao Xe Lạnh</span>
                        </button>
                      )}

                      {isShipping && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'completed')}
                          className="w-full py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-black text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-1.5"
                        >
                          <Truck className="w-4 h-4" />
                          <span>Đã Giao Tới Khách ➔ Hoàn Thành</span>
                        </button>
                      )}

                      {isCompleted && (
                        <div className="text-center p-2 rounded-xl bg-green-100 text-green-800 font-bold text-xs flex items-center justify-center gap-1.5">
                          <CheckCircle className="w-4 h-4" />
                          <span>Đơn hàng đã hoàn thành!</span>
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
