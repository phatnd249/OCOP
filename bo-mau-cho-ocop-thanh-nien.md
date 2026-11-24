# Bộ màu chủ đạo – Chợ OCOP Thanh niên

Bảng màu xanh lá cho website nông nghiệp, kết hợp vàng nắng và nâu đất để gợi cảm giác vườn cây, nông sản và sự tin cậy.

## Bảng mã màu (Phiên bản tinh chỉnh: Xanh lá tươi sáng, dịu mắt hơn)

| Tên màu | Mã HEX | RGB | Vai trò sử dụng |
|---|---|---|---|
| Xanh chủ đạo | `#388E3C` | 56, 142, 60 | Nút chính, thẻ nổi bật, liên kết (xanh nhẹ nhàng hơn) |
| Xanh đậm tiêu đề | `#2E7D32` | 46, 125, 50 | Thanh điều hướng, tiêu đề chính |
| Xanh lá tươi | `#4ADE80` | 74, 222, 128 | Huy hiệu, trạng thái hoạt động |
| Xanh non | `#DCFCE7` | 220, 252, 231 | Nền thẻ, viền, nhãn OCOP |
| Xanh sương | `#F0FDF4` | 240, 253, 244 | Nền khu vực nhẹ, banner phụ |
| Vàng nắng | `#F9A825` | 249, 168, 37 | Nút kêu gọi (đặt hàng, đặt tour), sao đánh giá |
| Nâu đất | `#5D4037` | 93, 64, 55 | Chữ phụ, chi tiết nhật ký mùa vụ |
| Kem nền | `#FAF8F1` | 250, 248, 241 | Nền trang chính |
| Cam cảnh báo | `#D84315` | 216, 67, 21 | Cảnh báo, hết hàng, báo lỗi |
| Xanh chữ | `#1A3820` | 26, 56, 32 | Chữ nội dung chính |

## Quy tắc phối màu (60 – 30 – 10)

- **60%** nền sáng: Kem nền `#FAF8F1`, Xanh sương `#E8F5E9`
- **30%** sắc xanh lá: Xanh lá chủ đạo `#2E7D32`, Xanh rừng `#1B5E20`
- **10%** màu nhấn: Vàng nắng `#F9A825`

## Cách áp dụng cho từng thành phần

| Thành phần | Nền | Chữ |
|---|---|---|
| Nút chính | `#2E7D32` (hover: `#1B5E20`) | Trắng `#FFFFFF` |
| Nút kêu gọi (CTA) | `#F9A825` | `#412402` |
| Nhãn OCOP, truy xuất nguồn gốc | `#C8E6C9` | `#1B5E20` |
| Thanh điều hướng | `#1B5E20` | Trắng `#FFFFFF` |
| Nền trang | `#FAF8F1` | `#1B3A1E` |
| Thẻ sản phẩm | Trắng `#FFFFFF`, viền `#C8E6C9` | `#1B3A1E` |
| Thông báo lỗi, hết hàng | `#D84315` | Trắng `#FFFFFF` |

## Lưu ý về độ tương phản

- Chữ trắng trên `#2E7D32` và `#1B5E20`: đọc rõ, đạt chuẩn.
- Chữ trắng trên `#66BB6A`: khó đọc, nên dùng chữ `#1B3A1E`.
- Chữ trắng trên vàng `#F9A825`: không đạt, nên dùng chữ tối `#412402`.
- Với chủ vườn lớn tuổi: luôn dùng chữ tối trên nền sáng và cỡ chữ lớn.

## Font chữ sử dụng

- **Font chữ chính:** `Roboto`, sans-serif (Google Fonts)
- **Lý do lựa chọn:** Nét chữ rõ ràng, thanh thoát, hiển thị dấu tiếng Việt chuẩn xác và tối ưu khả năng đọc trên màn hình cho người lớn tuổi.

## Mã CSS

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

:root {
  --green-900: #1B5E20;
  --green-700: #2E7D32;
  --green-400: #66BB6A;
  --green-200: #C8E6C9;
  --green-50:  #E8F5E9;
  --sun:       #F9A825;
  --earth:     #5D4037;
  --cream:     #FAF8F1;
  --alert:     #D84315;
  --text:      #1B3A1E;
}
```

## Cấu hình Tailwind (tùy chọn)

```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        green: {
          50:  '#E8F5E9',
          200: '#C8E6C9',
          400: '#66BB6A',
          700: '#2E7D32',
          900: '#1B5E20',
        },
        sun: '#F9A825',
        earth: '#5D4037',
        cream: '#FAF8F1',
        alert: '#D84315',
        ink: '#1B3A1E',
      },
    },
  },
};
```
