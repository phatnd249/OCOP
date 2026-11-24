import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Dialog } from 'primereact/dialog';
import { Sparkles, Minus, Plus, Check, X, MapPin } from 'lucide-react';

export const ModalTour: React.FC = () => {
  const { tourModalOpen, setTourModalOpen, showNotification } = useApp();
  
  // States
  const [selectedGarden, setSelectedGarden] = useState('Nhà vườn Ba Tư – Long Khánh (2.5 ha)');
  const [date, setDate] = useState('2026-11-28');
  const [guests, setGuests] = useState<number>(2);
  const [name, setName] = useState('Anh Tuấn');
  const [phone, setPhone] = useState('0909123456');

  if (!tourModalOpen) return null;

  const PRICE_PER_GUEST = 50000;
  const totalPrice = guests * PRICE_PER_GUEST;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTourModalOpen(false);
    showNotification(
      `🎉 Đã đặt lịch trải nghiệm "${selectedGarden}" ngày ${date} cho ${guests} người thành công! Chủ vườn sẽ gọi điện xác nhận.`
    );
  };

  const headerElement = (
    <div className="flex items-start justify-between w-full pr-1">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center text-xl shadow-sm">
          🌴
        </div>
        <div>
          <h3 className="font-black text-lg sm:text-xl text-green-950 leading-tight">
            Đặt Lịch Trải Nghiệm Nhà Vườn
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Tham quan thực tế, tự tay thu hoạch và thưởng thức trái chín tại cây
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog
      visible={tourModalOpen}
      onHide={() => setTourModalOpen(false)}
      header={headerElement}
      className="w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden"
      breakpoints={{ '960px': '80vw', '641px': '95vw' }}
      modal
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-ink">
        
        {/* Thẻ chọn nhanh nhà vườn (Mở rộng linh hoạt cho nhiều vườn) */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-green-700" />
            <span>Chọn nhà vườn trải nghiệm:</span>
          </label>
          <div className="relative">
            <select
              value={selectedGarden}
              onChange={e => setSelectedGarden(e.target.value)}
              className="w-full px-4 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[46px] sm:h-[48px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition appearance-none cursor-pointer pr-9 shadow-sm"
            >
              <option value="Nhà vườn Ba Tư – Long Khánh (2.5 ha)">Nhà vườn Ba Tư – Suối Tre, Long Khánh (2.5 ha sầu riêng & chôm chôm)</option>
              <option value="Vườn bưởi da xanh Tân Triều – Vĩnh Cửu">Vườn bưởi da xanh Tân Triều – Huyện Vĩnh Cửu</option>
              <option value="Vườn chôm chôm nhãn Bình Lộc – Long Khánh">Vườn chôm chôm nhãn Bình Lộc – TP. Long Khánh</option>
              <option value="Hợp tác xã nông nghiệp công nghệ cao Xuân Lộc">Hợp tác xã nông sản sạch huyện Xuân Lộc</option>
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* Thẻ thông tin gói trải nghiệm (Nền xanh nhạt #f0fdf4, viền xanh mảnh) */}
        <div className="p-3.5 bg-[#f0fdf4] rounded-2xl border border-green-200 text-xs text-green-950 space-y-1.5 shadow-xs">
          <p className="font-bold flex items-center gap-1.5 text-green-900 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Vé trải nghiệm: <strong>50.000 đ / người lớn</strong> • Trẻ em dưới 6 tuổi miễn phí</span>
          </p>
          <p className="text-gray-600 leading-relaxed pl-5 text-[11px] sm:text-xs">
            <strong>Quyền lợi:</strong> Tự do dạo vườn mát rượi, hái trái cây ăn no tại chỗ, nghe hướng dẫn chọn quả chín ngon, thưởng thức nước dừa tươi và giao lưu đờn ca tài tử cùng chủ vườn.
          </p>
        </div>

        {/* Hàng 1: [ Ô chọn Ngày ghé thăm ] và [ Cụm nút − 2 + Số khách ] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Ô chọn ngày */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Ngày ghé thăm:
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3.5 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[46px] sm:h-[48px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
              required
            />
          </div>

          {/* Cụm nút to rõ [-] Số khách [+] */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Số lượng khách (người):
            </label>
            <div className="flex items-center justify-between bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[46px] sm:h-[48px] px-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                className="w-10 h-9 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 active:scale-95 flex items-center justify-center font-bold text-lg transition shadow-xs"
                title="Giảm 1 người"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="font-black text-base sm:text-lg text-green-950 px-3">
                {guests} <span className="text-xs font-normal text-gray-500">người</span>
              </div>

              <button
                type="button"
                onClick={() => setGuests(prev => Math.min(50, prev + 1))}
                className="w-10 h-9 rounded-lg bg-green-700 text-white hover:bg-green-800 active:scale-95 flex items-center justify-center font-bold text-lg transition shadow-xs"
                title="Thêm 1 người"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hàng 2: [ Họ tên đại diện ] và [ Số điện thoại ] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Họ tên người đại diện:
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full px-3.5 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[46px] sm:h-[48px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Số điện thoại nhận tin:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Ví dụ: 0918.xxx.xxx"
              className="w-full px-3.5 text-xs sm:text-sm font-semibold text-gray-800 bg-[#f8fafc] border-[1.5px] border-[#cbd5e1] rounded-[10px] h-[46px] sm:h-[48px] outline-none focus:border-[#156b3b] focus:ring-2 focus:ring-green-100 transition shadow-sm"
              required
            />
          </div>
        </div>

        {/* Khung tổng tiền tạm tính (Nền xanh nhạt nổi bật) */}
        <div className="p-3.5 bg-green-50 rounded-2xl border border-green-200 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs font-bold text-gray-600 block">
              Tạm tính phí trải nghiệm:
            </span>
            <span className="text-[11px] text-gray-400 font-normal">
              ({guests} khách x {PRICE_PER_GUEST.toLocaleString('vi-VN')} đ)
            </span>
          </div>
          <span className="font-black text-xl sm:text-2xl text-[#156b3b] tracking-tight">
            {totalPrice.toLocaleString('vi-VN')} đ
          </span>
        </div>

        {/* Hàng nút cuối (Footer): Nút Đóng (xám) bên trái + Nút Xác nhận (xanh đậm) bên phải */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setTourModalOpen(false)}
            className="w-1/3 h-[48px] rounded-xl bg-[#f1f5f9] hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>Hủy / Đóng</span>
          </button>

          <button
            type="submit"
            className="flex-1 h-[48px] rounded-xl bg-[#156b3b] hover:bg-green-800 active:scale-[0.99] text-white font-black text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Xác Nhận Đặt Lịch Tour</span>
          </button>
        </div>

      </form>
    </Dialog>
  );
};
