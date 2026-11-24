import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import {
  Award,
  Clock,
  Video,
  FileCheck,
  CheckCircle,
  Sparkles,
  Phone,
  ShieldCheck,
  History,
  FileSpreadsheet,
  QrCode,
  PackageCheck,
  Radio,
  Calendar,
  Download
} from 'lucide-react';

export const YouthHonor: React.FC = () => {
  const { youthSupporters, currentUser, showNotification } = useApp();

  const handleExportCert = (name: string) => {
    showNotification(`📄 Đã tạo và xuất Giấy Chứng Nhận Giờ Tình Nguyện Số cho Đoàn viên: ${name}!`);
  };

  // Nhật ký hoạt động minh bạch (sao kê cộng giờ)
  const activityLogs = [
    {
      id: 'log-01',
      date: '24/11/2026 10:15',
      activity: 'Xử lý đơn hộ vườn',
      detail: 'Hỗ trợ Chú Ba Tư phân loại sầu riêng Ri6 & đóng gói 3 đơn xe lạnh giao TP.HCM',
      hoursAdded: 1.5,
      icon: <PackageCheck className="w-4 h-4 text-amber-600" />,
      tagColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'log-02',
      date: '23/11/2026 15:30',
      activity: 'Phát sóng Livestream',
      detail: 'Host phiên live tại vườn Chôm Chôm Nhãn & Sầu Riêng, chốt 45 đơn hàng trực tiếp',
      hoursAdded: 2.5,
      icon: <Radio className="w-4 h-4 text-red-600" />,
      tagColor: 'bg-red-100 text-red-800'
    },
    {
      id: 'log-03',
      date: '22/11/2026 09:00',
      activity: 'Đăng sản phẩm & Gắn mã QR',
      detail: 'Gắn mã QR nhật ký mùa vụ hữu cơ VietGAP cho lô Bưởi Da Xanh & Mít sấy dẻo',
      hoursAdded: 1.0,
      icon: <QrCode className="w-4 h-4 text-green-700" />,
      tagColor: 'bg-green-100 text-green-800'
    },
    {
      id: 'log-04',
      date: '20/11/2026 14:00',
      activity: 'Đón khách du lịch trải nghiệm',
      detail: 'Hướng dẫn đoàn 6 khách tham quan trải nghiệm hái trái và thuyết minh câu chuyện OCOP',
      hoursAdded: 2.0,
      icon: <Award className="w-4 h-4 text-blue-700" />,
      tagColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'log-05',
      date: '18/11/2026 08:30',
      activity: 'Tập huấn chuyển đổi số',
      detail: 'Cài đặt app Trạm Nông Sản Số và hướng dẫn gia đình Chú Ba Tư nhận thông báo đơn hàng',
      hoursAdded: 1.0,
      icon: <FileCheck className="w-4 h-4 text-purple-700" />,
      tagColor: 'bg-purple-100 text-purple-800'
    }
  ];

  // Nếu là tài khoản Đoàn viên đăng nhập, CHỈ hiển thị giờ tình nguyện của chính mình
  const displayedSupporters = React.useMemo(() => {
    if (currentUser && currentUser.role === 'youth') {
      // Tìm supporter trùng tên hoặc số điện thoại, nếu không tìm thấy supporter đúng tên thì gắn supporter đầu tiên khớp với tài khoản đoàn viên
      const matched = youthSupporters.filter(
        yt => yt.name.toLowerCase().trim() === currentUser.name.toLowerCase().trim() ||
              yt.phone.replace(/\D/g, '') === currentUser.phone.replace(/\D/g, '')
      );
      if (matched.length > 0) return matched;
      // Fallback nếu tài khoản đoàn viên mới tạo: tạo thẻ cá nhân từ thông tin currentUser
      return [{
        id: currentUser.id,
        name: currentUser.name,
        role: 'Đoàn viên Thanh niên - Cầu nối số Nông sản',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        phone: currentUser.phone,
        skills: ['Livestream bán hàng', 'Xử lý đơn hộ vườn', 'Tiếp thị số'],
        volunteerHours: 38,
        sessionsLive: 12,
        productsDigitized: 8,
        badge: 'Đoàn viên Xuất sắc Kinh tế số'
      }];
    }
    // Nếu là Admin hoặc người xem chung thì hiển thị danh sách
    return youthSupporters;
  }, [currentUser, youthSupporters]);

  const isPersonalView = currentUser?.role === 'youth';

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-sun" />
            <span>HOẠT ĐỘNG CHUYỂN ĐỔI SỐ NÔNG NGHIỆP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            {isPersonalView ? '🎖️ Sổ Tay Ghi Nhận Giờ Tình Nguyện Của Tôi' : 'Sổ Tay Ghi Nhận Giờ Tình Nguyện Đoàn Viên'}
          </h1>
          <p className="text-xs text-gray-500">
            {isPersonalView 
              ? `Hồ sơ hoạt động tình nguyện số của Đoàn viên: ${currentUser.name} (${currentUser.phone})`
              : 'Vinh danh các đoàn viên thanh niên đóng vai trò "Cầu nối số" đưa nông sản Long Khánh vươn xa'}
          </p>
        </div>
      </div>

      {/* Youth Supporters Grid (Chỉ hiện của tôi khi là Đoàn viên) */}
      <div className={`grid gap-6 ${isPersonalView ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
        {displayedSupporters.map(yt => {
          const progressPercent = Math.min(100, Math.round((yt.volunteerHours / 40) * 100));

          return (
            <Card
              key={yt.id}
              className="rounded-3xl border border-green-200 shadow-soft overflow-hidden relative"
            >
              {/* Top gold badge corner */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-sun to-amber-400 text-earth-dark text-[11px] font-black px-4 py-1.5 rounded-bl-2xl shadow-sm z-10">
                🏆 {yt.badge}
              </div>

              <div className="space-y-5">
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
                    <span className="block font-black text-2xl text-green-800">
                      {yt.volunteerHours}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">Giờ tình nguyện</span>
                  </div>
                  <div>
                    <span className="block font-black text-2xl text-sun">
                      {yt.sessionsLive}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">Buổi livestream</span>
                  </div>
                  <div>
                    <span className="block font-black text-2xl text-green-700">
                      {yt.productsDigitized}
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">Sản phẩm số hóa</span>
                  </div>
                </div>

                {/* Progress toward 40 hours milestone using PrimeReact ProgressBar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-ink">
                    <span>Tiến độ huy hiệu "Chiến Sĩ Số Tiêu Biểu"</span>
                    <span className="text-green-800">{yt.volunteerHours} / 40 Giờ ({progressPercent}%)</span>
                  </div>
                  <ProgressBar 
                    value={progressPercent} 
                    showValue={false} 
                    style={{ height: '10px' }}
                    className="bg-green-100"
                  />
                </div>

                {/* Skills tags using PrimeReact Tag */}
                <div>
                  <span className="text-xs font-bold text-gray-500 block mb-2">Kỹ năng số hỗ trợ:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {yt.skills.map((s, idx) => (
                      <Tag 
                        key={idx} 
                        value={`✓ ${s}`} 
                        severity="success" 
                        className="text-xs font-medium"
                      />
                    ))}
                  </div>
                </div>

                {/* Action button using PrimeReact Button */}
                <Button
                  onClick={() => handleExportCert(yt.name)}
                  icon="pi pi-download"
                  label="Xuất Giấy Chứng Nhận Tình Nguyện Số"
                  className="w-full p-button-success font-bold text-xs"
                />
              </div>
            </Card>
          );
        })}
      </div>

      {/* BẢNG NHẬT KÝ TỪNG LƯỢT CỘNG GIỜ TÌNH NGUYỆN (SAO KÊ MINH BẠCH KIỂU LỊCH SỬ) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center">
              <History className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-ink flex items-center gap-2">
                <span>Nhật Ký Từng Lượt Cộng Giờ Tình Nguyện Số</span>
                <span className="bg-green-100 text-green-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  Sao kê minh bạch
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Lịch sử ghi nhận tự động theo thời gian thực để đối chiếu khi xuất giấy chứng nhận
              </p>
            </div>
          </div>

          <button
            onClick={() => showNotification('📊 Đã xuất dữ liệu sao kê nhật ký giờ tình nguyện ra file Excel / CSV!')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition border border-gray-200 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải file sao kê (.xlsx)</span>
          </button>
        </div>

        {/* Danh sách các lượt cộng giờ */}
        <div className="divide-y divide-gray-100">
          {activityLogs.map(log => (
            <div key={log.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/70 px-2 rounded-xl transition">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  {log.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${log.tagColor}`}>
                      {log.activity}
                    </span>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {log.date}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    {log.detail}
                  </p>
                </div>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="inline-flex items-center gap-1 bg-green-50 border border-green-200 text-green-800 font-black text-sm px-2.5 py-1 rounded-xl">
                  +{log.hoursAdded} giờ
                </span>
                <span className="block text-[10px] text-gray-400 mt-0.5">Xác nhận tự động</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-cream rounded-2xl border border-green-200 flex items-center justify-between text-xs text-green-950">
          <span>✨ <strong>Cam kết chuyển đổi số:</strong> Toàn bộ giờ ghi nhận được mã hóa và xác thực bởi BCH Đoàn TNCS Hồ Chí Minh tỉnh Đồng Nai.</span>
        </div>
      </div>

      {/* Campaign Info */}
      <div className="p-6 rounded-3xl bg-green-50 border border-green-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-green-700 text-white flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-8 h-8 text-sun" />
          </div>
          <div>
            <h4 className="font-bold text-base text-ink">
              Chương trình "Đoàn viên - Thanh niên đồng hành cùng Nông sản OCOP"
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Phát động bởi Tỉnh Đoàn Đồng Nai và Hội Liên hiệp Thanh niên Việt Nam tỉnh. Ghi nhận minh bạch trên hệ thống sổ số hóa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
