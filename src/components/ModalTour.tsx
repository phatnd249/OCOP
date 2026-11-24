import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Sparkles, Users, Calendar, MapPin } from 'lucide-react';

export const ModalTour: React.FC = () => {
  const { tourModalOpen, setTourModalOpen, showNotification } = useApp();
  const [date, setDate] = useState('2026-11-28');
  const [guests, setGuests] = useState<number | null>(2);
  const [name, setName] = useState('Anh Tuấn');
  const [phone, setPhone] = useState('0909.123.456');

  if (!tourModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourModalOpen(false);
    showNotification(`🎉 Đã đặt lịch tham quan Nhà vườn Ba Tư ngày ${date} cho ${guests || 1} người thành công! Chú Ba Tư sẽ liên hệ đón bạn.`);
  };

  const headerElement = (
    <div className="flex items-center gap-3">
      <span className="text-2xl">🌴</span>
      <div>
        <h3 className="font-bold text-lg leading-tight text-green-900">
          Đặt Lịch Tour Trải Nghiệm Vườn Ba Tư
        </h3>
        <p className="text-xs text-earth">
          Tự tay hái chôm chôm, ăn sầu riêng tại gốc & nghe đờn ca tài tử
        </p>
      </div>
    </div>
  );

  return (
    <Dialog
      visible={tourModalOpen}
      onHide={() => setTourModalOpen(false)}
      header={headerElement}
      className="w-full max-w-lg"
      breakpoints={{ '960px': '75vw', '641px': '95vw' }}
      modal
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
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
            <InputText
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full text-sm p-inputtext-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Số lượng khách (người):
            </label>
            <InputNumber
              value={guests}
              onValueChange={e => setGuests(e.value ?? 1)}
              min={1}
              max={50}
              showButtons
              className="w-full p-inputtext-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Họ tên người đại diện:
          </label>
          <InputText
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full text-sm"
            placeholder="Ví dụ: Nguyễn Văn A"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Số điện thoại nhận xác nhận:
          </label>
          <InputText
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full text-sm"
            placeholder="Ví dụ: 0918.xxx.xxx"
            required
          />
        </div>

        <div className="p-3 bg-green-50 rounded-xl text-xs text-green-900 flex justify-between items-center border border-green-200">
          <span>Tạm tính phí trải nghiệm:</span>
          <span className="font-bold text-base text-green-800">
            {((guests || 1) * 50000).toLocaleString('vi-VN')} đ
          </span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            label="Đóng"
            severity="secondary"
            outlined
            onClick={() => setTourModalOpen(false)}
            className="flex-1"
          />
          <Button
            type="submit"
            label="Xác Nhận Đặt Lịch Tour"
            icon="pi pi-check"
            className="flex-1 p-button-warning font-bold text-ink"
          />
        </div>
      </form>
    </Dialog>
  );
};
