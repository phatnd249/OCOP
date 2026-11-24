import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShoppingBag,
  QrCode,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const ProductsList: React.FC = () => {
  const { products, openProductDetail, addToCart, setQrModalProduct, garden } = useApp();

  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default');

  // Filter and sort products
  const displayProducts = products
    .filter(p => {
      const matchKeyword =
        p.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        p.description.toLowerCase().includes(searchKeyword.toLowerCase());

      if (!matchKeyword) return false;

      if (selectedCategory === 'fresh') return p.category.includes('Trái cây');
      if (selectedCategory === 'processed') return p.category.includes('chế biến');
      if (selectedCategory === 'star4') return p.star === 4;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-200 shadow-soft space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded inline-block mb-1">
            SÀN NÔNG SẢN OCOP ĐỒNG NAI
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            Danh Sách Sản Phẩm Nông Sản Đang Mở Bán
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            100% nông sản chính gốc Long Khánh, Tân Triều tuyển chọn thu hoạch tận vườn
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm theo tên trái cây, đặc sản, xuất xứ..."
              className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="text-xs p-2.5 rounded-xl border border-gray-300 bg-white font-medium outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="default">Mặc định (Ưu tiên mùa vụ)</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-gray-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-cream text-gray-700 hover:bg-green-100/60'
            }`}
          >
            Tất Cả Sản Phẩm ({products.length})
          </button>
          <button
            onClick={() => setSelectedCategory('fresh')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'fresh'
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-cream text-gray-700 hover:bg-green-100/60'
            }`}
          >
            Trái Cây Tươi Mùa Vụ
          </button>
          <button
            onClick={() => setSelectedCategory('star4')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'star4'
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-cream text-gray-700 hover:bg-green-100/60'
            }`}
          >
            OCOP 4 Sao Đạt Chuẩn
          </button>
          <button
            onClick={() => setSelectedCategory('processed')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'processed'
                ? 'bg-green-700 text-white shadow-sm'
                : 'bg-cream text-gray-700 hover:bg-green-100/60'
            }`}
          >
            Nông Sản Chế Biến
          </button>
        </div>
      </div>

      {/* Result Count */}
      <div className="flex justify-between items-center text-xs text-gray-500 px-2">
        <span>Hiển thị <strong>{displayProducts.length}</strong> sản phẩm nông sản phù hợp</span>
        <span>Cam kết giao xe lạnh trong ngày về TP.HCM</span>
      </div>

      {/* Products Grid */}
      {displayProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-green-200 space-y-3">
          <p className="text-gray-500 text-sm">Không tìm thấy sản phẩm nào khớp với từ khóa tìm kiếm.</p>
          <button
            onClick={() => { setSearchKeyword(''); setSelectedCategory('all'); }}
            className="text-xs font-bold text-green-700 hover:underline"
          >
            Xóa bộ lọc & xem lại tất cả sản phẩm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map(p => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-green-200 shadow-soft hover:shadow-card transition flex flex-col justify-between group"
            >
              {/* Product Image & Badges */}
              <div
                onClick={() => openProductDetail(p.id)}
                className="relative h-60 overflow-hidden bg-gray-100 cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-green-700 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                  OCOP {p.star} SAO
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQrModalProduct(p);
                  }}
                  className="absolute bottom-3 right-3 bg-white/95 backdrop-blur hover:bg-white text-green-800 px-2.5 py-1.5 rounded-xl shadow font-bold text-xs flex items-center gap-1 transition"
                  title="Xem mã QR truy xuất"
                >
                  <QrCode className="w-4 h-4 text-green-700" />
                  <span>Quét QR</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-earth font-medium mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-green-700 shrink-0" />
                    <span>{p.origin}</span>
                  </div>

                  <h3
                    onClick={() => openProductDetail(p.id)}
                    className="font-bold text-base sm:text-lg text-ink hover:text-green-700 cursor-pointer line-clamp-1 leading-snug"
                  >
                    {p.name}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block">Giá bán trực tiếp:</span>
                    <div className="text-xl font-black text-green-800">
                      {p.price.toLocaleString('vi-VN')} đ
                      <span className="text-xs font-normal text-gray-500"> / {p.unit}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openProductDetail(p.id)}
                      className="px-3 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold transition"
                    >
                      Chi tiết
                    </button>
                    <button
                      onClick={() => addToCart(p.id, 1)}
                      className="bg-sun hover:bg-amber-500 text-earth-dark px-3 py-2 rounded-xl font-bold text-xs shadow-sm transition flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Đặt mua</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
