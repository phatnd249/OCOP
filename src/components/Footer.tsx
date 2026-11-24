import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MapPin, Award, Heart, CheckCircle2, Sprout } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveScreen } = useApp();

  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white pt-12 pb-8 mt-16 border-t-4 border-sun">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1 */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌱</span>
            <span className="text-xl font-black text-white tracking-tight">TRẠM VƯỜN SỐ - CHỢ OCOP THANH NIÊN</span>
            <span className="bg-sun text-earth-dark text-xs font-black px-2 py-0.5 rounded">ĐỒNG NAI</span>
          </div>
          <p className="text-green-200 text-sm leading-relaxed mb-4 max-w-lg">
            Dự án chuyển đổi số nông nghiệp trọng điểm – Đoàn viên thanh niên làm 
            <strong> "Cầu nối số"</strong> hỗ trợ chủ thể OCOP và nhà vườn 
            đưa đặc sản Long Khánh, Tân Triều vươn xa tới người tiêu dùng TP.HCM.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-green-800/80 px-2.5 py-1 rounded-full text-green-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-sun" /> 100% OCOP Chuẩn sao
            </span>
            <span className="bg-green-800/80 px-2.5 py-1 rounded-full text-green-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-sun" /> QR Truy xuất mùa vụ
            </span>
            <span className="bg-green-800/80 px-2.5 py-1 rounded-full text-green-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-sun" /> Giao xe lạnh TP.HCM 4h
            </span>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-sun mb-4">
            Đơn Vị Đồng Hành
          </h4>
          <ul className="space-y-2 text-sm text-green-200">
            <li>• Tỉnh Đoàn Đồng Nai</li>
            <li>• Thành Đoàn TP. Long Khánh</li>
            <li>• Văn phòng Điều phối OCOP Tỉnh</li>
            <li>• Hợp tác xã Nông sản Ba Tư</li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-sun mb-4">
            Thông Tin Nhà Vườn Ba Tư
          </h4>
          <div className="space-y-2.5 text-sm text-green-200">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sun shrink-0 mt-0.5" />
              <span>Ấp Suối Tre, TP. Long Khánh, Tỉnh Đồng Nai</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sun shrink-0" />
              <span>Chú Ba Tư: <strong>0918.345.678</strong></span>
            </p>
            <p className="flex items-center gap-2">
              <Award className="w-4 h-4 text-sun shrink-0" />
              <span>Đoàn viên hỗ trợ: <strong>0982.112.334</strong></span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-green-800 text-center text-xs text-green-300 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© 2026 TRẠM VƯỜN SỐ – Thanh niên Đồng Nai tiếp sức nông sản OCOP.</p>
        <p className="flex items-center gap-1">
          Thiết kế với <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> và Roboto Font chuẩn quốc gia
        </p>
      </div>
    </footer>
  );
};
