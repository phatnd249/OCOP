import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OrderStatus } from '../types';
import {
  Package,
  Volume2,
  VolumeX,
  CheckCircle,
  Truck,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Search,
  AlertTriangle,
  Calendar,
  Filter
} from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus, showNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'pending_harvest' | 'shipping' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingOrderId, setSpeakingOrderId] = useState<string | null>(null);

  // Text-To-Speech for Elderly Farmer & Youth
  const handleToggleSpeakOrder = (orderId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      showNotification(`🔊 [Giọng đọc]: ${text}`);
      return;
    }

    if (speakingOrderId === orderId) {
      window.speechSynthesis.cancel();
      setSpeakingOrderId(null);
      showNotification('⏹️ Đã dừng giọng đọc đơn hàng.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingOrderId(null);
    utterance.onerror = () => setSpeakingOrderId(null);

    setSpeakingOrderId(orderId);
    window.speechSynthesis.speak(utterance);
    showNotification('🔊 Đang đọc to nội dung đơn hàng cho Chú Ba Tư & Đoàn viên nghe...');
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Tab filter
      if (activeTab !== 'all' && order.status !== activeTab) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchId = order.orderId.toLowerCase().includes(q);
        const matchName = order.customerName.toLowerCase().includes(q);
        const matchPhone = order.phone.includes(q);
        const matchItems = order.items.some(i => i.name.toLowerCase().includes(q));
        return matchId || matchName || matchPhone || matchItems;
      }
      return true;
    });
  }, [orders, activeTab, searchQuery]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: orders.length,
      pending_harvest: orders.filter(o => o.status === 'pending_harvest').length,
      shipping: orders.filter(o => o.status === 'shipping').length,
      completed: orders.filter(o => o.status === 'completed').length,
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Banner Quản lý Đơn hàng Seller Center */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase">
                VẬN HÀNH ĐƠN HÀNG SELLER CENTER
              </span>
              <span className="bg-sun text-earth-dark text-[10px] font-black px-2 py-0.5 rounded">
                XE LẠNH TRONG NGÀY
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black mt-1">
              Xử Lý Đơn Hộ Vườn Ba Tư • Hái & Giao Hỏa Tốc
            </h1>
            <p className="text-amber-100 text-xs mt-0.5">
              Bộ lọc nhanh, liên hệ khách 1 chạm, cảnh báo đơn tươi và trợ lý giọng nói đọc to đơn
            </p>
          </div>
        </div>

        <button
          onClick={() => showNotification('Đã đồng bộ lại toàn bộ đơn hàng mới nhất!')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-900/60 hover:bg-amber-900 text-white font-bold text-xs transition border border-amber-500/40"
          title="Làm mới đơn"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Làm mới ({orders.length})</span>
        </button>
      </div>

      {/* Control Bar: Bộ Lọc Trạng Thái Tabs Nhanh & Thanh Tìm Kiếm */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
        {/* Tabs nhanh kiểu Seller Center */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>Tất cả</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'all' ? 'bg-white text-amber-800' : 'bg-gray-200 text-gray-700'}`}>
              {tabCounts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pending_harvest')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              activeTab === 'pending_harvest'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <span>🌾 Cần cắt hái</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === 'pending_harvest' ? 'bg-white text-amber-800' : 'bg-amber-200 text-amber-900'}`}>
              {tabCounts.pending_harvest}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              activeTab === 'shipping'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <span>🚚 Đang giao xe lạnh</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === 'shipping' ? 'bg-white text-blue-800' : 'bg-blue-200 text-blue-900'}`}>
              {tabCounts.shipping}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
              activeTab === 'completed'
                ? 'bg-green-700 text-white shadow-xs'
                : 'bg-green-50 text-green-800 hover:bg-green-100 border border-green-200'
            }`}
          >
            <span>✓ Hoàn tất</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === 'completed' ? 'bg-white text-green-800' : 'bg-green-200 text-green-900'}`}>
              {tabCounts.completed}
            </span>
          </button>
        </div>

        {/* Thanh tìm kiếm nhanh */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã đơn (#ORD...), tên khách, số điện thoại hoặc loại trái cây (sầu riêng, chôm chôm)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕ Xóa
            </button>
          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Tìm thấy <strong>{filteredOrders.length}</strong> đơn hàng phù hợp</span>
          <span>Sắp xếp: Ưu tiên hái sớm & giao trong ngày</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center space-y-2">
            <Package className="w-10 h-10 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-700 text-sm">Không tìm thấy đơn hàng nào!</h4>
            <p className="text-xs text-gray-400">Vui lòng thử từ khóa khác hoặc chuyển sang tab khác.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(order => {
              const isPending = order.status === 'pending_harvest';
              const isShipping = order.status === 'shipping';
              const isCompleted = order.status === 'completed';
              const isSpeaking = speakingOrderId === order.orderId;

              // Check if order is fresh delivery or tour combo
              const isUrgentFresh = order.shippingMethod.toLowerCase().includes('lạnh') || order.shippingMethod.toLowerCase().includes('hỏa tốc') || isPending;
              const hasTourCombo = order.farmerNote?.toLowerCase().includes('tour') || order.farmerNote?.toLowerCase().includes('thăm') || order.farmerNote?.toLowerCase().includes('trải nghiệm');

              const speakText = `Đơn hàng của ${order.customerName}. Số điện thoại ${order.phone}. Gồm có ${order.items.map(i => `${i.qty} phần ${i.name}`).join(', ')}. Giao đến ${order.address}. Lời dặn: ${order.farmerNote || 'Không có'}.`;

              return (
                <div
                  key={order.orderId}
                  className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs transition space-y-4 ${
                    isSpeaking
                      ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50/30'
                      : isPending
                      ? 'border-amber-300 bg-amber-50/15'
                      : isShipping
                      ? 'border-blue-200'
                      : 'border-green-200 bg-green-50/10'
                  }`}
                >
                  {/* Header of order */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5 flex-wrap">
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

                      {/* Cảnh báo đơn chậm xử lý / Giao tươi / Tour combo */}
                      {isPending && isUrgentFresh && (
                        <span className="bg-red-50 text-red-600 border border-red-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                          <span>Hái giao trong 4h</span>
                        </span>
                      )}

                      {hasTourCombo && (
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-600" />
                          <span>Đón khách ghé vườn</span>
                        </span>
                      )}
                    </div>

                    {/* Nút Đọc to đơn (TTS) đổi nhãn khi đang đọc */}
                    <button
                      onClick={() => handleToggleSpeakOrder(order.orderId, speakText)}
                      className={`border px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
                        isSpeaking
                          ? 'bg-red-600 text-white border-red-600 animate-bounce'
                          : 'bg-green-50 hover:bg-green-100 text-green-900 border-green-200'
                      }`}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>🔊 Đang đọc... (Bấm dừng)</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-green-700" />
                          <span>Đọc to đơn</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Body Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Left: Customer & Address & Quick Contact Buttons */}
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] text-gray-400 block">Khách hàng nhận tại TP.HCM:</span>
                          <strong className="block text-ink text-base">
                            {order.customerName}
                          </strong>
                        </div>

                        {/* Cụm nút Liên Hệ Nhanh (Gọi / Nhắn tin khách) */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={`tel:${order.phone}`}
                            className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 px-2.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs"
                            title="Gọi xác nhận đơn ngay"
                          >
                            <Phone className="w-3.5 h-3.5 text-green-700" />
                            <span>Gọi</span>
                          </a>
                          <a
                            href={`sms:${order.phone}?body=Trạm Nông Sản Số chào bạn ${order.customerName}, đơn #${order.orderId} đang được hái chuẩn bị chuyển xe lạnh.`}
                            className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs"
                            title="Nhắn tin xác nhận"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
                            <span>SMS</span>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-700 font-mono font-medium">
                        <Phone className="w-3.5 h-3.5 text-green-700 shrink-0" />
                        <span>{order.phone}</span>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-gray-700">
                        <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0 mt-0.5" />
                        <span>{order.address}</span>
                      </div>

                      <div className="p-2.5 bg-cream rounded-lg border border-green-200 text-xs text-green-950 flex items-center justify-between">
                        <span>🚚 <strong>Hình thức:</strong> {order.shippingMethod}</span>
                        <span className="font-bold text-green-800">Cước: {order.deliveryFee.toLocaleString('vi-VN')} đ</span>
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
                            <span>Đơn hàng đã hoàn tất thành công!</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
