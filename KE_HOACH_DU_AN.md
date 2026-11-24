# KẾ HOẠCH DỰ ÁN: CHỢ OCOP THANH NIÊN
> **Chủ đề**: Kinh tế số – Thương mại điện tử – Khởi nghiệp (Nông sản tỉnh Đồng Nai)  
> **Nền tảng phát triển**: **React (Vite + TypeScript + Tailwind CSS)** – Thuần Frontend tương tác 100%  
> **Quy mô phiên bản**: **10 Màn hình trọng tâm** (Bám sát Đề 3 và tài liệu phân tích)  

---

## I. THÔNG TIN DỰ ÁN & BỐI CẢNH (ĐỀ 3)

### 1. Bối cảnh & Ý nghĩa
Nhiều chủ thể OCOP, nhà vườn của tỉnh Đồng Nai sở hữu đặc sản nức tiếng (*chôm chôm, sầu riêng Long Khánh, bưởi Tân Triều, hạt điều, cà phê...*) nhưng:
- Gặp khó khăn khi tiếp cận công nghệ, chưa biết bán hàng online.
- Chưa số hóa được nhật ký mùa vụ canh tác.
- Khách hàng đô thị (đặc biệt tại TP. Hồ Chí Minh) mong muốn nông sản sạch nhưng thiếu công cụ kiểm chứng nguồn gốc.

**Giải pháp**: Xây dựng ứng dụng **Chợ OCOP Thanh niên**, trong đó **Đoàn viên thanh niên là "Cầu nối số"** hỗ trợ nhà vườn chụp ảnh, nhập liệu bằng giọng nói, ứng dụng AI, livestream và quản lý đơn hàng.

---

### 2. Dữ liệu mẫu (Mock Data chuẩn theo Đề 3)
- **Chủ nhà vườn**: **Nhà vườn Bác Ba Tự** (50 tuổi).
  - Vị trí: Xã Bình Lộc, TP. Long Khánh, Tỉnh Đồng Nai.
  - Quy mô: 2,5 ha trồng chôm chôm và sầu riêng chuyên canh.
  - Chứng nhận: OCOP 4 sao tỉnh Đồng Nai.
- **05 Sản phẩm mẫu**:
  1. *Chôm chôm nhãn Long Khánh* – 45.000 đ/kg (OCOP 4 sao)
  2. *Chôm chôm Java Long Khánh* – 35.000 đ/kg (OCOP 3 sao)
  3. *Sầu riêng Ri6 Long Khánh* – 95.000 đ/kg (OCOP 4 sao)
  4. *Sầu riêng Monthong (Thái) Long Khánh* – 120.000 đ/kg (OCOP 4 sao)
  5. *Mứt chôm chôm sấy dẻo Long Khánh* – 65.000 đ/hộp 250g (OCOP 3 sao)
- **Đội thanh niên hỗ trợ số**: 02 đoàn viên phụ trách (*Nguyễn Văn An, Lê Thị Mai - Đoàn Thanh niên TP. Long Khánh*).

---

## II. DANH SÁCH 10 TRANG FRONTEND HOÀN CHỈNH (THAO TÁC 100%)

Hệ thống được thiết kế **Role Switcher** linh hoạt trên thanh điều hướng để người chấm/người dùng có thể chuyển đổi tức thì giữa 3 góc nhìn: **Khách hàng** | **Bác Ba Tự (Chủ vườn 50t)** | **Thanh niên hỗ trợ số**.

| # | Mã trang | Tên trang / Màn hình | Vai trò chính | Nội dung & Khả năng tương tác trên Frontend (Không cần backend) |
|:---:|:---:|---|:---:|---|
| **01** | **K1** | **Trang chủ Chợ OCOP Đồng Nai** | Khách hàng | - Banner nông sản Long Khánh theo mùa.<br>- Danh mục đặc sản OCOP Đồng Nai đạt chuẩn 3-5 sao.<br>- Gian hàng nổi bật: Nhà vườn Bác Ba Tự.<br>- Lối tắt xem Livestream sắp phát sóng & Đặt tour nhà vườn. |
| **02** | **K3** | **Hồ sơ Nhà vườn Ba Tự** | Khách hàng / Cả 3 | - **(Bắt buộc 1)**: Câu chuyện làm vườn hơn 25 năm của Bác Ba Tự.<br>- Vị trí địa lý tại TP. Long Khánh (tích hợp bản đồ thu nhỏ).<br>- Giấy chứng nhận OCOP 4 sao điện tử.<br>- Thông tin 02 đoàn viên hỗ trợ số (An & Mai).<br>- Toàn bộ danh mục 05 sản phẩm của vườn. |
| **03** | **K4** | **Chi tiết sản phẩm & QR Truy xuất nguồn gốc** | Khách hàng | - **(Bắt buộc 3)**: Hình ảnh sắc nét, thông tin giá, mùa vụ, chuẩn OCOP.<br>- **Mã QR Code động** (`qrcode.react`): Quét bằng điện thoại hoặc click trực tiếp để bung **Timeline Nhật ký mùa vụ canh tác** (ngày bón phân vi sinh, ngày tỉa cành, ngày test dư lượng, ngày thu hoạch).<br>- Nút thêm vào giỏ hàng & Mua ngay. |
| **04** | **K6** | **Giỏ hàng nông sản** | Khách hàng | - **(Bắt buộc 4.1)**: Danh sách sản phẩm đã chọn, điều chỉnh số lượng (kg/hộp).<br>- Tự động tính tổng tiền, hiển thị cam kết chất lượng OCOP.<br>- Nút chuyển bước sang Đặt hàng. |
| **05** | **K7** | **Đặt hàng & Chọn hình thức nhận** | Khách hàng | - **(Bắt buộc 4.2)**: Form thông tin nhận hàng tại TP.HCM hoặc liên tỉnh.<br>- **Chọn hình thức nhận**: *Giao nhanh chành xe / Hỏa tốc về TP.HCM* HOẶC *Đến hái và nhận trực tiếp tại vườn*.<br>- Bấm "Xác nhận đặt hàng" -> Lưu đơn ngay vào `LocalStorage`, hiển thị thông báo thành công và chuyển đơn sang cho Bác Ba Tự. |
| **06** | **TN4** | **Đăng sản phẩm nhanh (Ảnh + Giọng nói + AI)** | Thanh niên | - **(Bắt buộc 2 + Điểm cộng 1)**:<br>  + Tải ảnh hoặc chụp ảnh trực tiếp nông sản.<br>  + **Speech-to-Text (Micro tiếng Việt)**: Bấm nói "Sầu riêng Ri6 loại 1, giá chín mươi lăm ngàn một ký..." -> form tự động điền.<br>  + **AI viết mô tả**: Bấm 1 chạm để AI tự tạo bài giới thiệu đậm chất nông sản Đồng Nai.<br>  + Bấm "Đăng sản phẩm" -> Sản phẩm xuất hiện ngay lập tức trên Trang chủ & Hồ sơ vườn. |
| **07** | **CV5** | **Quản lý đơn hàng (Giao diện Bác Ba Tự 50 tuổi)** | Bác Ba Tự | - **(Bắt buộc 5)**: Thiết kế đặc biệt cho người lớn tuổi: **Cỡ chữ cực to, màu sắc tương phản cao, nút bấm lớn, không thao tác phức tạp**.<br>- Xem các đơn hàng mới vừa được đặt từ Khách.<br>- Bấm chuyển trạng thái đơn giản 1 chạm: *Chờ thu hái -> Đã đóng thùng -> Đã gửi nhà xe*. |
| **08** | **TN7** | **Lịch Livestream & Phòng Live bán hàng** | Thanh niên / Khách | - **(Bắt buộc 6)**: Danh sách lịch phát sóng livestream hỗ trợ bà con.<br>- Đồng hồ đếm ngược giờ lên sóng.<br>- Giao diện mô phỏng phòng livestream: Khung video trực tiếp, thanh niên hỗ trợ livestream bán hàng, danh sách sản phẩm đang ghim (Pin) kèm nút "Chốt đơn trên Live". |
| **09** | **K2** | **Bản đồ số Nhà vườn & Du lịch trải nghiệm** | Khách hàng | - **(Điểm cộng 2)**: Bản đồ tương tác định vị các cụm vườn OCOP tại Đồng Nai.<br>- Ghim thông tin vườn Bác Ba Tự kèm tính năng **"Đặt lịch tour tham quan hái quả"** (chọn ngày ghé, số lượng người, trải nghiệm ăn sầu riêng tại vườn). |
| **10** | **TN9** | **Nhật ký & Bảng vàng Giờ tình nguyện** | Thanh niên | - **(Điểm cộng 3)**: Bảng theo dõi số giờ đóng góp của 02 đoàn viên hỗ trợ số.<br>- Ghi nhận số giờ tình nguyện tự động khi thanh niên: đăng sản phẩm (+2 giờ), livestream (+3 giờ), hỗ trợ đơn hàng (+1 giờ).<br>- Bộ huy hiệu số (*"Đoàn viên Tiên phong số"*, *"Đại sứ OCOP Đồng Nai"*). |

---

## III. CÔNG NGHỆ & NGÔN NGỮ SỬ DỤNG

- **Framework**: `React` (Vite) + `TypeScript`.
- **Giao diện & Thiết kế**: `Tailwind CSS`, tuân thủ chuẩn màu tại [bo-mau-cho-ocop-thanh-nien.md](file:///d:/Projects/OCOP/bo-mau-cho-ocop-thanh-nien.md):
  - **Font chữ chủ đạo**: `Roboto` (sans-serif) – tải từ Google Fonts, rõ ràng, hiện đại, chuẩn tiếng Việt và cực kỳ dễ đọc đối với người lớn tuổi.
  - Xanh lá chủ đạo: `#2E7D32`
  - Xanh rừng đậm: `#1B5E20`
  - Vàng nắng CTA: `#F9A825`
  - Kem nền dịu mắt: `#FAF8F1`
  - Tối ưu chế độ tiếp cận người cao tuổi (High-contrast, Large typography).
- **Bộ Icon**: `lucide-react`.
- **Tạo mã QR Code**: `qrcode.react`.
- **Nhận diện giọng nói**: `Web Speech API` (SpeechRecognition) chạy trực tiếp trên trình duyệt, không tốn chi phí API.
- **Trí tuệ nhân tạo (AI)**: Bộ prompt generator mô phỏng / Gemini Flash tạo mô tả sản phẩm tự động từ ảnh.
- **Quản lý dữ liệu tương tác**: `React Context` + `LocalStorage` (đồng bộ đơn hàng, sản phẩm mới thêm, giờ tình nguyện theo thời gian thực giữa các trang mà không cần server backend).

---

## IV. CHECKLIST CÔNG VIỆC TRIỂN KHAI

### Bước 1: Thiết lập nền móng dự án (Project Setup & Mock Data)
- [ ] Khởi tạo dự án React (Vite + TypeScript + Tailwind CSS).
- [ ] Cài đặt các thư viện: `lucide-react`, `qrcode.react`, `canvas-confetti`.
- [ ] Cấu hình bảng màu chuẩn OCOP Đồng Nai vào `tailwind.config.js`.
- [ ] Xây dựng file Mock Data chuẩn: Nhà vườn Ba Tự, 05 sản phẩm OCOP, nhật ký mùa vụ canh tác, thông tin 02 thanh niên.
- [ ] Xây dựng Header với **Role Switcher** (Khách hàng / Bác Ba Tự / Thanh niên) và hệ thống điều hướng 10 trang.

### Bước 2: Phát triển 10 trang Frontend
- [ ] **Trang 1 (K1)**: Trang chủ Chợ OCOP Đồng Nai (Hero banner, danh mục, sản phẩm nổi bật).
- [ ] **Trang 2 (K3)**: Trang Hồ sơ nhà vườn Bác Ba Tự (Câu chuyện, chứng nhận OCOP, 02 đoàn viên hỗ trợ, danh sách sản phẩm).
- [ ] **Trang 3 (K4)**: Trang Chi tiết sản phẩm & QR Code Truy xuất nguồn gốc (Modal Nhật ký mùa vụ canh tác).
- [ ] **Trang 4 (K6)**: Trang Giỏ hàng nông sản (Tăng giảm số lượng, tạm tính).
- [ ] **Trang 5 (K7)**: Trang Đặt hàng & Chọn hình thức nhận (Ship chành xe về TP.HCM / Lấy tại vườn -> Lưu LocalStorage).
- [ ] **Trang 6 (TN4)**: Trang Đăng sản phẩm nhanh bằng Ảnh + Giọng nói (Web Speech API) + AI viết mô tả.
- [ ] **Trang 7 (CV5)**: Trang Quản lý đơn hàng cho Bác Ba Tự 50 tuổi (Giao diện chữ to, nút bấm lớn, cập nhật trạng thái đơn).
- [ ] **Trang 8 (TN7)**: Trang Lịch & Mô phỏng phòng Livestream bán hàng (Ghim sản phẩm, chốt đơn trực tiếp).
- [ ] **Trang 9 (K2)**: Trang Bản đồ số nhà vườn & Đặt tour trải nghiệm hái quả tại Long Khánh.
- [ ] **Trang 10 (TN9)**: Trang Bảng vàng thành tích & Ghi nhận giờ tình nguyện của Đoàn viên.

### Bước 3: Hoàn thiện tương tác & Đóng gói
- [ ] Kiểm tra liên thông dữ liệu: Khách đặt hàng -> Bác Ba Tự thấy đơn; Thanh niên đăng sản phẩm -> Trang chủ hiển thị ngay.
- [ ] Tối ưu hiển thị Responsive trên Mobile và Desktop.
- [ ] Soạn tài liệu hướng dẫn chạy và kịch bản demo thuyết trình sản phẩm.
