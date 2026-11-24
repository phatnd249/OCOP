import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';
import {
  QrCode,
  ShoppingBag,
  ShieldCheck,
  MapPin,
  Calendar,
  CheckCircle,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductId,
    openProductDetail,
    addToCart,
    setQrModalProduct,
    setActiveScreen
  } = useApp();

  const [qty, setQty] = useState(2);
  const currentProduct =
    products.find(p => p.id === selectedProductId) || products[0];

  const handleBuyNow = () => {
    addToCart(currentProduct.id, qty);
    setActiveScreen('cart');
  };

  const relatedProducts = products.filter(p => p.id !== currentProduct.id);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Navigation & Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('products')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-green-800 hover:text-green-900 bg-white px-4 py-2.5 rounded-xl border border-green-200 shadow-sm transition hover:bg-green-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Danh Sách Sản Phẩm</span>
        </button>

        <span className="text-xs text-gray-400">
          Mã sản phẩm: <strong className="text-gray-600 font-mono">{currentProduct.id}</strong>
        </span>
      </div>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-green-200 shadow-soft grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Product Image & QR Access */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square shadow-sm">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              CHỨNG NHẬN OCOP {currentProduct.star} SAO
            </div>
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-earth text-xs font-bold px-3 py-1 rounded-lg">
              Mã tem: {currentProduct.qrCodeId}
            </div>
          </div>

          {/* Big QR Button */}
          <button
            onClick={() => setQrModalProduct(currentProduct)}
            className="w-full bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-green-800 text-white p-4 rounded-2xl shadow-md transition flex items-center justify-center gap-3 font-bold text-sm sm:text-base group"
          >
            <div className="w-9 h-9 rounded-xl bg-sun text-earth-dark flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="leading-tight">Bấm Để Quét Mã QR Truy Xuất Nguồn Gốc</div>
              <div className="text-xs text-green-200 font-normal">
                Xem toàn bộ nhật ký bón phân hữu cơ, cách ly & thu hoạch tại vườn Ba Tư
              </div>
            </div>
          </button>
        </div>

        {/* Right: Info & Purchase Actions */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-earth">
              <MapPin className="w-4 h-4 text-green-700 shrink-0" />
              <span>{currentProduct.origin}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-ink leading-tight">
              {currentProduct.name}
            </h1>

            <div className="p-4 rounded-2xl bg-cream border border-green-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Giá bán trực tiếp từ nhà vườn:</span>
                <div className="text-3xl font-black text-green-800">
                  {currentProduct.price.toLocaleString('vi-VN')} đ
                  <span className="text-sm font-normal text-gray-500"> / {currentProduct.unit}</span>
                </div>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full">
                Còn sẵn {currentProduct.inStock} {currentProduct.unit}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed pt-2">
              {currentProduct.description}
            </p>

            {/* Quality guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-700">
              <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border">
                <Truck className="w-4 h-4 text-green-700 shrink-0" />
                <span>Giao xe lạnh TP.HCM trong 4h</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-xl border">
                <RotateCcw className="w-4 h-4 text-green-700 shrink-0" />
                <span>Bao ăn 1 đổi 1 nếu sượng quả</span>
              </div>
            </div>
          </div>

          {/* Quantity selector and Cart actions */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-600">Số lượng ({currentProduct.unit}):</span>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2.5 hover:bg-gray-200 text-gray-700 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-bold text-sm text-ink">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2.5 hover:bg-gray-200 text-gray-700 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-gray-500">
                Thành tiền: <strong className="text-green-800">{(qty * currentProduct.price).toLocaleString('vi-VN')} đ</strong>
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => addToCart(currentProduct.id, qty)}
                icon="pi pi-shopping-bag"
                label="Thêm Vào Giỏ"
                outlined
                className="flex-1 p-button-success font-bold text-sm"
              />
              <Button
                onClick={handleBuyNow}
                icon="pi pi-check"
                label="Mua Ngay Tận Vườn"
                className="flex-1 p-button-warning font-black text-sm text-ink"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Season Diary Preview on page */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-ink flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-700" />
            <span>Tóm Tắt Nhật Ký Mùa Vụ Canh Tác Của "{currentProduct.name}"</span>
          </h3>
          <button
            onClick={() => setQrModalProduct(currentProduct)}
            className="text-xs text-green-700 font-bold hover:underline"
          >
            Mở xem đầy đủ tem kiểm định ➔
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentProduct.seasonDiary.slice(0, 4).map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-cream border border-green-100 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-green-900">{item.stage.split('&')[0]}</span>
                <span className="text-[10px] bg-white px-1.5 py-0.5 rounded text-gray-500 border">{item.date}</span>
              </div>
              <p className="text-gray-600 line-clamp-2 leading-relaxed">{item.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other Related Products from Farm */}
      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-ink">Các Nông Sản Khác Của Nhà Vườn</h3>
          <button
            onClick={() => setActiveScreen('products')}
            className="text-xs text-green-800 font-bold hover:underline flex items-center gap-1"
          >
            <span>Xem tất cả sản phẩm</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.slice(0, 4).map(p => (
            <div
              key={p.id}
              onClick={() => openProductDetail(p.id)}
              className="bg-white p-4 rounded-2xl border border-green-200 hover:border-green-600 shadow-sm cursor-pointer transition space-y-2 group"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <span className="absolute top-1.5 left-1.5 bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  OCOP {p.star}★
                </span>
              </div>
              <h4 className="font-bold text-xs text-ink line-clamp-1 group-hover:text-green-800">
                {p.name}
              </h4>
              <p className="font-black text-sm text-green-800">
                {p.price.toLocaleString('vi-VN')} đ <span className="font-normal text-xs text-gray-500">/ {p.unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
