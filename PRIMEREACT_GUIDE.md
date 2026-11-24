# HƯỚNG DẪN SỬ DỤNG VÀ THƯ VIỆN COMPONENT PRIMEREACT TRONG DỰ ÁN

Tài liệu này lưu trữ toàn bộ thông tin về thư viện **PrimeReact (v10)**, cấu hình theme và danh mục các Component PrimeReact được sử dụng thường xuyên trong dự án **Chợ OCOP Thanh Niên**.

---

## 1. Cấu hình & Theme

Dự án sử dụng bộ giao diện chuẩn Nông nghiệp:
* **Theme**: `primereact/resources/themes/lara-light-green/theme.css` (Tông màu xanh lá tự nhiên chuẩn OCOP Đồng Nai).
* **Core CSS**: `primereact/resources/primereact.min.css`
* **Icons**: `primeicons/primeicons.css` (Kho icon phong phú chuẩn `pi pi-...`).

Được import trực tiếp tại `src/main.tsx`.

---

## 2. Danh mục Component PrimeReact đã tích hợp & cách dùng

### 🟢 1. Button (`primereact/button`)
* **Cách dùng**:
  ```tsx
  import { Button } from 'primereact/button';

  // Nút chính
  <Button label="Xem sản phẩm" icon="pi pi-shopping-bag" className="p-button-success" />

  // Nút kêu gọi (CTA) màu vàng nắng
  <Button label="Đặt Hàng Ngay" icon="pi pi-check" className="p-button-warning font-bold" />

  // Nút viền (Outlined)
  <Button label="Hủy" icon="pi pi-times" outlined severity="secondary" />
  ```

### 🟢 2. Card (`primereact/card`)
* **Cách dùng**:
  ```tsx
  import { Card } from 'primereact/card';

  <Card title="Sầu riêng Ri6" subTitle="OCOP 4 Sao" header={<img src="..." />}>
    <p>Nội dung chi tiết sản phẩm...</p>
  </Card>
  ```

### 🟢 3. Dialog / Modal (`primereact/dialog`)
* **Cách dùng**:
  ```tsx
  import { Dialog } from 'primereact/dialog';

  <Dialog 
    header="Mã QR Truy Xuất Nguồn Gốc" 
    visible={isOpen} 
    onHide={() => setIsOpen(false)}
    breakpoints={{ '960px': '75vw', '641px': '95vw' }}
  >
    {/* Nội dung QR và Timeline */}
  </Dialog>
  ```

### 🟢 4. Timeline (`primereact/timeline`)
* Rất thích hợp cho **Nhật ký mùa vụ** và **Lịch trình du lịch**:
  ```tsx
  import { Timeline } from 'primereact/timeline';

  <Timeline 
    value={seasonDiary} 
    content={(item) => (
      <div>
        <strong>{item.stage}</strong>
        <p>{item.note}</p>
      </div>
    )}
    opposite={(item) => <small>{item.date}</small>}
  />
  ```

### 🟢 5. Toast & Messages (`primereact/toast`)
* Hiển thị thông báo góc màn hình:
  ```tsx
  import { Toast } from 'primereact/toast';
  const toast = useRef<Toast>(null);

  toast.current?.show({ 
    severity: 'success', 
    summary: 'Thành công', 
    detail: 'Đã thêm sản phẩm vào giỏ hàng!', 
    life: 3000 
  });

  <Toast ref={toast} />
  ```

### 🟢 6. Form Components
* **InputText**: `import { InputText } from 'primereact/inputtext';`
* **InputTextarea**: `import { InputTextarea } from 'primereact/inputtextarea';`
* **InputNumber**: `import { InputNumber } from 'primereact/inputnumber';`
* **Dropdown / Select**: `import { Dropdown } from 'primereact/dropdown';`
* **RadioButton**: `import { RadioButton } from 'primereact/radiobutton';`

### 🟢 7. Tag / Badge (`primereact/tag`, `primereact/badge`)
* Dùng cho nhãn OCOP 4 sao, số lượng tồn kho, số lượng giỏ hàng:
  ```tsx
  import { Tag } from 'primereact/tag';
  <Tag value="OCOP 4 SAO" severity="success" icon="pi pi-star-fill" />
  ```

### 🟢 8. Rating (`primereact/rating`)
* Đánh giá sao OCOP:
  ```tsx
  import { Rating } from 'primereact/rating';
  <Rating value={4} readOnly cancel={false} />
  ```

### 🟢 9. ProgressBar (`primereact/progressbar`)
* Thanh tiến độ giờ tình nguyện thanh niên:
  ```tsx
  import { ProgressBar } from 'primereact/progressbar';
  <ProgressBar value={85} displayValueTemplate={(val) => `${val}% hoàn thành`} />
  ```

---

## 3. Quy ước phát triển
1. Ưu tiên sử dụng các Component có sẵn từ PrimeReact thay vì tự viết lại HTML thuần để đảm bảo:
   - Khả năng tiếp cận (Accessibility / ARIA).
   - Tương thích tốt trên Mobile và Desktop.
   - Hiệu ứng chuyển động mượt mà và đồng bộ.
2. Kết hợp các utility class của Tailwind CSS (ví dụ `className="font-bold shadow-md rounded-xl"`) để tùy biến kiểu dáng phù hợp với bảng màu OCOP Đồng Nai.
