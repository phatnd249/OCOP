import React from 'react';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { X, ShieldCheck, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react';

export const ModalQr: React.FC = () => {
  const { qrModalProduct, setQrModalProduct, garden } = useApp();

  if (!qrModalProduct) return null;

  const qrDataUrl = `https://ocop-dongnai.vn/verify/${qrModalProduct.qrCodeId}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-green-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-800 to-green-700 text-white p-5 flex items-center justify-between rounded-t-2xl sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sun/20 flex items-center justify-center text-sun">
              <ShieldCheck className="w-5 h-5 text-sun" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                Mã QR Truy Xuất Nguồn Gốc & Nhật Ký Mùa Vụ
              </h3>
              <p className="text-xs text-green-200">
                Xác thực nguồn gốc OCOP chuẩn sao tỉnh Đồng Nai
              </p>
            </div>
          </div>
          <button
            onClick={() => setQrModalProduct(null)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Top section: Product summary & Dynamic QR Code */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-cream border border-green-200">
            <div className="p-3 bg-white rounded-xl shadow-md border border-green-100 shrink-0 text-center">
              <QRCodeSVG
                value={qrDataUrl}
                size={140}
                level="H"
                includeMargin={true}
                fgColor="#1B5E20"
              />
              <span className="block mt-1 font-mono text-[11px] font-bold text-green-800">
                {qrModalProduct.qrCodeId}
              </span>
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="bg-green-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                  ⭐ OCOP {qrModalProduct.star} SAO
                </span>
                <span className="text-xs text-earth font-medium">Mã tem: {qrModalProduct.qrCodeId}</span>
              </div>
              <h4 className="font-black text-lg text-ink">
                {qrModalProduct.name}
              </h4>
              <p className="text-xs text-gray-600">
                <strong>Chủ thể OCOP:</strong> {garden.name} ({garden.owner})
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-green-700" />
                <span>{qrModalProduct.origin}</span>
              </p>
              <p className="text-xs text-green-800 bg-green-100/80 px-2 py-1 rounded inline-block">
                ✓ Được kiểm định & cấp mã số truy xuất bởi Chi cục Trồng trọt Đồng Nai
              </p>
            </div>
          </div>

          {/* Timeline of Season Diary */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ink flex items-center gap-2 text-base">
                <Calendar className="w-4 h-4 text-green-700" />
                <span>Nhật Ký Canh Tác Mùa Vụ Thực Tế Tại Vườn</span>
              </h4>
              <span className="text-xs text-earth font-medium">Cập nhật bởi Đoàn thanh niên</span>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-green-200">
              {qrModalProduct.seasonDiary.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Status dot */}
                  <div
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                      item.status === 'completed'
                        ? 'bg-green-700'
                        : 'bg-sun animate-pulse'
                    }`}
                  >
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    ) : (
                      <Clock className="w-2.5 h-2.5 text-earth-dark" />
                    )}
                  </div>

                  <div className="bg-gray-50 hover:bg-green-50/50 p-3.5 rounded-xl border border-gray-200 transition">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-green-900">
                        {item.stage}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-gray-700 border">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2 rounded-b-2xl">
          <button
            onClick={() => setQrModalProduct(null)}
            className="px-5 py-2 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm transition"
          >
            Đóng bảng truy xuất
          </button>
        </div>
      </div>
    </div>
  );
};
