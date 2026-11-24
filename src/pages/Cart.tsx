import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const Cart: React.FC = () => {
  const {
    cart,
    products,
    updateCartQty,
    removeFromCart,
    clearCart,
    setActiveScreen,
    openProductDetail
  } = useApp();

  const cartDetails = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return {
      ...item,
      product: p
    };
  }).filter(item => item.product !== undefined);

  const subtotal = cartDetails.reduce(
    (sum, item) => sum + (item.product!.price * item.qty),
    0
  );

  if (cartDetails.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-16 border border-green-200 text-center max-w-lg mx-auto space-y-5 shadow-soft">
        <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-4xl">
          🧺
        </div>
        <h2 className="text-2xl font-black text-ink">Giỏ Hàng Chưa Có Nông Sản</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Hãy khám phá các loại trái cây tươi ngon sầu riêng Ri6, chôm chôm nhãn vừa thu hoạch tại vườn Chú Ba Tư.
        </p>
        <button
          onClick={() => setActiveScreen('product_detail')}
          className="bg-sun hover:bg-amber-500 text-earth-dark font-black px-6 py-3.5 rounded-2xl shadow transition inline-flex items-center gap-2 text-sm"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Đi Chợ OCOP Ngay</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            Giỏ Hàng Nông Sản OCOP
          </h1>
          <p className="text-xs text-gray-500">
            Trái cây tươi cắt sáng sớm tại Long Khánh chuyển xe về TP.HCM
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:underline font-bold"
        >
          Xóa toàn bộ giỏ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart table/cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl border border-green-200 overflow-hidden shadow-soft">
            <div className="divide-y divide-gray-100">
              {cartDetails.map(({ product, qty }) => {
                if (!product) return null;
                return (
                  <div
                    key={product.id}
                    className="p-5 flex flex-col sm:flex-row items-center gap-4 justify-between"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => openProductDetail(product.id)}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0 border cursor-pointer hover:opacity-90 transition"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                          ⭐ OCOP {product.star} Sao
                        </span>
                        <h3
                          onClick={() => openProductDetail(product.id)}
                          className="font-bold text-sm sm:text-base text-ink line-clamp-1 cursor-pointer hover:text-green-700"
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-green-800 font-bold mt-0.5">
                          {product.price.toLocaleString('vi-VN')} đ / {product.unit}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                        <button
                          onClick={() => updateCartQty(product.id, qty - 1)}
                          className="p-2 hover:bg-gray-200 text-gray-700 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold">{qty}</span>
                        <button
                          onClick={() => updateCartQty(product.id, qty + 1)}
                          className="p-2 hover:bg-gray-200 text-gray-700 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right min-w-[90px]">
                        <span className="text-xs text-gray-400 block sm:hidden">Thành tiền:</span>
                        <span className="font-black text-sm sm:text-base text-green-900">
                          {(product.price * qty).toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cream border border-green-200 flex items-center gap-3 text-xs text-green-900">
            <Truck className="w-5 h-5 text-green-700 shrink-0" />
            <span>
              <strong>Cam kết nhà vườn:</strong> Nông sản đóng thùng xốp mát, chành xe chuyển đến tận nhà tại các quận huyện TP.HCM trong 3-4 giờ.
            </span>
          </div>
        </div>

        {/* Summary side card */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-5">
            <h3 className="font-bold text-lg text-ink">Tóm Tắt Đơn Hàng</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Tiền nông sản ({cartDetails.reduce((s, i) => s + i.qty, 0)} kg/hộp):</span>
                <span className="font-bold text-ink">{subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Cước vận chuyển ước tính:</span>
                <span className="text-green-700 font-medium">Chọn ở bước sau</span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                <span className="font-bold text-ink">Tạm tính:</span>
                <span className="text-2xl font-black text-green-800">
                  {subtotal.toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveScreen('checkout')}
              className="w-full py-4 rounded-2xl bg-sun hover:bg-amber-500 text-earth-dark font-black text-base shadow transition flex items-center justify-center gap-2"
            >
              <span>Tiến Hành Đặt Hàng (K7)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              🛡️ Thanh toán tiền mặt khi nhận hàng (COD) hoặc chuyển khoản
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
