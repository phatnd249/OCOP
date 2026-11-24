import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Clock,
  Video,
  FileCheck,
  CheckCircle,
  Download,
  Sparkles,
  Phone,
  ShieldCheck
} from 'lucide-react';

export const YouthHonor: React.FC = () => {
  const { youthSupporters, showNotification } = useApp();

  const handleExportCert = (name: string) => {
    showNotification(`📄 Đã tạo và xuất Giấy Chứng Nhận Giờ Tình Nguyện Số cho Đoàn viên: ${name}!`);
  };

  return (
    <div className="space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sun" />
            <span>TÍNH NĂNG ĐIỂM CỘNG 3 CỦA ĐỀ BÀI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            Sổ Tay Ghi Nhận Giờ Tình Nguyện Thanh Niên Số (TN9)
          </h1>
          <p className="text-xs text-gray-500">
            Vinh danh các đoàn viên thanh niên đóng vai trò "Cầu nối số" đưa nông sản Long Khánh vươn xa
          </p>
        </div>
      </div>

      {/* Youth Supporters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {youthSupporters.map(yt => (
          <div
            key={yt.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft flex flex-col justify-between space-y-6 relative overflow-hidden"
          >
            {/* Top gold badge corner */}
            <div className="absolute top-0 right-0 bg-gradient-to-l from-sun to-amber-400 text-earth-dark text-[11px] font-black px-4 py-1.5 rounded-bl-2xl shadow-sm">
              🏆 {yt.badge}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={yt.avatar}
                  alt={yt.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-green-100 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-xl text-ink">{yt.name}</h3>
                  <p className="text-xs text-green-800 font-semibold">{yt.role}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-green-700" />
                    <span>{yt.phone}</span>
                  </p>
                </div>
              </div>

              {/* 3 Metric Counters */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-cream border border-green-100 text-center">
                <div>
                  <span className="text-[11px] text-gray-500 block">Giờ tình nguyện</span>
                  <strong className="text-2xl font-black text-green-800">
                    {yt.volunteerHours}h
                  </strong>
                </div>
                <div className="border-x border-green-200">
                  <span className="text-[11px] text-gray-500 block">Buổi livestream</span>
                  <strong className="text-2xl font-black text-amber-700">
                    {yt.sessionsLive}
                  </strong>
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 block">Sản phẩm số hóa</span>
                  <strong className="text-2xl font-black text-blue-700">
                    {yt.productsDigitized}
                  </strong>
                </div>
              </div>

              {/* Skills and contributions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-700 block">Kỹ năng phụ trách:</span>
                <div className="flex flex-wrap gap-1.5">
                  {yt.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-green-50 text-green-900 border border-green-200 text-xs px-2.5 py-1 rounded-lg font-medium"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action to export certificate */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Chứng thực bởi Đoàn TNCS Hồ Chí Minh
              </span>
              <button
                onClick={() => handleExportCert(yt.name)}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất Giấy Chứng Nhận Số</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer Activity Log */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-4">
        <h3 className="font-bold text-lg text-ink flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-700" />
          <span>Nhật Ký Tích Lũy Giờ Tình Nguyện Số Gần Đây</span>
        </h3>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-cream border border-green-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
              <div>
                <strong>Hỗ trợ Chú Ba Tư livestream bán sầu riêng Ri6 tại vườn</strong>
                <span className="block text-xs text-gray-500">Đoàn viên: Nguyễn Văn Nam • Tối nay (19:30 - 21:00)</span>
              </div>
            </div>
            <span className="font-bold text-green-800 bg-white px-2.5 py-1 rounded-lg border">
              +3 Giờ
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream border border-green-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
              <div>
                <strong>Chụp ảnh & dùng AI tạo mã QR truy xuất bón phân hữu cơ</strong>
                <span className="block text-xs text-gray-500">Đoàn viên: Trần Thị Mai • Sáng nay (08:00 - 10:00)</span>
              </div>
            </div>
            <span className="font-bold text-green-800 bg-white px-2.5 py-1 rounded-lg border">
              +2 Giờ
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-cream border border-green-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
              <div>
                <strong>Hỗ trợ đóng thùng xe lạnh chuyển về TP.HCM cho Chị Thảo My</strong>
                <span className="block text-xs text-gray-500">Đoàn viên: Nguyễn Văn Nam • Hôm qua</span>
              </div>
            </div>
            <span className="font-bold text-green-800 bg-white px-2.5 py-1 rounded-lg border">
              +1 Giờ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
