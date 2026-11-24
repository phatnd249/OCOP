import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Users, MapPin, CheckCircle, Sparkles } from 'lucide-react';

export const ModalTour: React.FC = () => {
  const { tourModalOpen, setTourModalOpen, showNotification } = useApp();
  const [date, setDate] = useState('2026-11-28');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('Anh Tuấn');
  const [phone, setPhone] = useState('0909.123.456');

  if (!tourModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourModalOpen(false);
    showNotification(`🎉 Đã đặt lịch tham quan Nhà vườn Ba Tư ngày ${date} cho ${guests} người thành công! Chú Ba Tư sẽ liên hệ đón bạn.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-green-200">
        <div className="bg-gradient-to-r from-green-800 to-green-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-sun" />
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Đặt Lịch Tour Du Lịch Trải Nghiệm Vườn Ba Tư
              </h3>
              <p className="text-xs text-green-200">
                Tự tay hái chôm chôm, ăn sầu riêng tại gốc & nghe đờn ca tài tử
              </p>
            </div>
          </div>
          <button
            onClick={() => setTourModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-cream rounded-xl border border-green-200 text-xs text-green-900 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sun" />
              Gói vé trải nghiệm: 50.000 đ / người lớn (Trẻ em dưới 6t miễn phí)
            </p>
            <p className="text-gray-600">
              Bao gồm: Thưởng thức trái cây tươi tại vườn, hướng dẫn chọn sầu riêng chín cây, uống nước dừa và giao lưu đờn ca tài tử.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Chọn ngày ghé thăm:
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full text-sm p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Số lượng khách (người):
              </label>
              <input
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
                className="w-full text-sm p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Họ tên người đại diện:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full text-sm p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Số điện thoại liên hệ (Zalo):
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full text-sm p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={() => setTourModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-sun hover:bg-amber-500 text-earth-dark font-black text-sm shadow transition"
            >
              Xác Nhận Đặt Chỗ (Tạm tính: {(guests * 50000).toLocaleString('vi-VN')} đ)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
