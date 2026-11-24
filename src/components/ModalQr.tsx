import React from 'react';
import { useApp } from '../context/AppContext';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog } from 'primereact/dialog';
import { Timeline } from 'primereact/timeline';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { ShieldCheck, MapPin, CheckCircle, Clock } from 'lucide-react';

export const ModalQr: React.FC = () => {
  const { qrModalProduct, setQrModalProduct, garden } = useApp();

  if (!qrModalProduct) return null;

  const qrDataUrl = `https://ocop-dongnai.vn/verify/${qrModalProduct.qrCodeId}`;

  const customizedMarker = (item: any) => {
    return (
      <span className={`flex w-7 h-7 items-center justify-center text-white rounded-full z-10 shadow-sm ${
        item.status === 'active' ? 'bg-amber-500' : 'bg-green-700'
      }`}>
        {item.status === 'active' ? (
          <Clock className="w-3.5 h-3.5" />
        ) : (
          <CheckCircle className="w-3.5 h-3.5" />
        )}
      </span>
    );
  };

  const customizedContent = (item: any) => {
    return (
      <div className={`p-3 rounded-xl border mb-3 transition ${
        item.status === 'active' 
          ? 'bg-amber-50/70 border-amber-300' 
          : 'bg-cream border-green-200'
      }`}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-sm text-green-900">{item.stage}</span>
          <span className="text-xs font-semibold text-earth bg-white/80 px-2 py-0.5 rounded border border-green-200">
            {item.date}
          </span>
        </div>
        <p className="text-xs text-gray-700 leading-relaxed">{item.note}</p>
      </div>
    );
  };

  const headerElement = (
    <div className="flex items-center gap-3 text-green-900">
      <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center text-green-700">
        <ShieldCheck className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-bold text-lg leading-tight text-green-900">
          Mã QR Truy Xuất Nguồn Gốc & Nhật Ký Mùa Vụ
        </h3>
        <p className="text-xs text-earth">
          Xác thực nguồn gốc OCOP chuẩn sao tỉnh Đồng Nai
        </p>
      </div>
    </div>
  );

  return (
    <Dialog
      visible={!!qrModalProduct}
      onHide={() => setQrModalProduct(null)}
      header={headerElement}
      className="w-full max-w-2xl"
      breakpoints={{ '960px': '75vw', '641px': '95vw' }}
      modal
    >
      <div className="space-y-6 pt-2">
        {/* Top section: Product summary & Dynamic QR Code */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-cream border border-green-200">
          <div className="p-3 bg-white rounded-xl shadow-md border border-green-100 shrink-0 text-center">
            <QRCodeSVG
              value={qrDataUrl}
              size={135}
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
              <Tag value={`⭐ OCOP ${qrModalProduct.star} SAO`} severity="success" className="font-bold" />
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

        {/* Timeline of Season Diary with PrimeReact Timeline */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-bold text-sm text-green-900 flex items-center gap-1.5">
              <span>🌱 Nhật ký canh tác sinh học theo từng đợt</span>
            </h5>
            <span className="text-[11px] text-earth bg-green-50 px-2 py-0.5 rounded border border-green-200">
              Cập nhật bởi: Đoàn Thanh niên & Chú Ba Tư
            </span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-green-100">
            <Timeline 
              value={qrModalProduct.seasonDiary} 
              marker={customizedMarker} 
              content={customizedContent} 
            />
          </div>
        </div>

        {/* Modal action buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-green-200">
          <span className="text-xs text-earth">
            Quy trình canh tác chuẩn VietGAP & OCOP Đồng Nai
          </span>
          <Button
            label="Đóng cửa sổ"
            icon="pi pi-times"
            outlined
            severity="secondary"
            onClick={() => setQrModalProduct(null)}
            className="text-xs"
          />
        </div>
      </div>
    </Dialog>
  );
};
