import { GardenInfo, YouthSupporter, Product, Order, LiveStream, EcoMapLocation } from '../types';

export const INITIAL_GARDEN: GardenInfo = {
  id: "g-batu",
  name: "Nhà Vườn Ba Tự - Long Khánh",
  owner: "Chú Ba Tự (Nguyễn Văn Tư - 50 tuổi)",
  avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
  coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
  location: "Ấp Suối Tre, TP. Long Khánh, Tỉnh Đồng Nai",
  coordinates: "10.9423° N, 107.2415° E",
  area: "2.5 ha (25.000 m²)",
  crops: ["Sầu riêng Ri6", "Chôm chôm Java", "Chôm chôm nhãn"],
  ocopRating: 4,
  ocopCertNo: "OCOP-ĐN-2024-4S-089",
  story: "Với hơn 25 năm gắn bó với dải đất đỏ bazan màu mỡ Long Khánh, Chú Ba Tư luôn tâm huyết gìn giữ phương pháp canh tác thuận tự nhiên, 100% phân bón hữu cơ vi sinh, không hóa chất kích thích. Nhờ sự đồng hành số hóa từ Chi đoàn Thanh niên địa phương, nay quả ngọt vườn Ba Tư đã vươn xa tới người tiêu dùng TP.HCM với chất lượng tươi sạch chuẩn OCOP và nhật ký minh bạch từng cây trồng.",
  phone: "0918.345.678",
  tourismReady: true,
  ecoTourPrice: "50.000 đ/người (Bao gồm ăn trái cây tại vườn và nghe đờn ca tài tử)"
};

export const INITIAL_YOUTH: YouthSupporter[] = [
  {
    id: "yt-01",
    name: "Nguyễn Văn Nam",
    role: "Bí thư Chi đoàn Ấp - Cầu nối số",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    phone: "0982.112.334",
    skills: ["Livestream bán hàng", "Chụp ảnh sản phẩm", "Tiếp thị số"],
    volunteerHours: 38,
    sessionsLive: 12,
    productsDigitized: 8,
    badge: "Đoàn viên Xuất sắc Kinh tế số"
  },
  {
    id: "yt-02",
    name: "Trần Thị Mai",
    role: "Đoàn viên Thanh niên Xã - Quản lý Nhật ký số",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    phone: "0971.556.778",
    skills: ["Số hóa QR Truy xuất", "Chăm sóc khách hàng", "Viết câu chuyện OCOP"],
    volunteerHours: 26,
    sessionsLive: 5,
    productsDigitized: 11,
    badge: "Chiến sĩ Chuyển đổi số Nông nghiệp"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "sp-01",
    name: "Sầu riêng Ri6 Cơm Vàng Hạt Lép Long Khánh",
    star: 4,
    category: "Trái cây tươi đặc sản",
    price: 120000,
    unit: "kg",
    minOrder: 2,
    origin: "Vườn Ba Tư, Long Khánh, Đồng Nai",
    image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&auto=format&fit=crop&q=80",
    description: "Sầu riêng Ri6 chính gốc Long Khánh trồng theo quy chuẩn hữu cơ VietGAP. Cơm vàng óng, dày dặn, hạt lép, vị ngọt đậm đà béo ngậy đặc trưng. Quả chín tự nhiên trên cây, cắt tuyển chọn sáng sớm giao thẳng trong ngày về TP.HCM.",
    inStock: 450,
    qrCodeId: "QR-SR-RI6-001",
    seasonDiary: [
      { date: "15/01/2026", stage: "Tỉa cành, làm gốc & bón phân trùn quế hữu cơ", note: "Thực hiện bởi Chú Ba Tư, hoàn tất vệ sinh vườn trước mùa hoa", status: "completed" },
      { date: "28/02/2026", stage: "Xử lý ra hoa & thụ phấn bổ sung lúc hoàng hôn", note: "Đoàn viên Nam hỗ trợ ghi hình nhật ký kỹ thuật", status: "completed" },
      { date: "20/03/2026", stage: "Bao quả an toàn sinh học & tỉa bớt quả non", note: "Chọn lọc giữ 60 quả/cây để đảm bảo chất lượng cơm dày", status: "completed" },
      { date: "10/05/2026", stage: "Kiểm tra dư lượng & chứng nhận an toàn thực phẩm OCOP", note: "Đạt chuẩn kiểm định Trung tâm Kiểm nghiệm Đồng Nai", status: "completed" },
      { date: "Hôm nay", stage: "Thu hoạch tuyển chọn & dán tem truy xuất nguồn gốc", note: "Cắt lúc sáng sớm, độ đường Brix đạt chuẩn 32%", status: "active" }
    ]
  },
  {
    id: "sp-02",
    name: "Chôm chôm Nhãn Đồng Nai Quả Giòn Vị Mật",
    star: 4,
    category: "Trái cây tươi đặc sản",
    price: 45000,
    unit: "kg",
    minOrder: 3,
    origin: "Vườn Ba Tư, Long Khánh, Đồng Nai",
    image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80",
    description: "Chôm chôm nhãn (chôm chôm đường) vỏ mỏng, quả nhỏ tròn, râu ngắn. Cơm róc hạt, dòn dai ngọt thanh thơm mát đặc trưng miền đất đỏ.",
    inStock: 800,
    qrCodeId: "QR-CC-NHAN-002",
    seasonDiary: [
      { date: "10/02/2026", stage: "Bón phân hữu cơ vi sinh đợt 1", note: "Tưới nước nhỏ giọt tiết kiệm", status: "completed" },
      { date: "15/03/2026", stage: "Đơm bông đồng loạt", note: "Thời tiết thuận lợi, tỉ lệ đậu trái đạt 95%", status: "completed" },
      { date: "20/04/2026", stage: "Chăm sóc trái non bằng chế phẩm sinh học", note: "Không dùng thuốc trừ sâu hóa học", status: "completed" },
      { date: "Hôm nay", stage: "Thu hái tại vườn và đóng thùng bảo quản mát", note: "Hái quả tươi sáng sớm giao trong 4h tới khách TP.HCM", status: "active" }
    ]
  },
  {
    id: "sp-03",
    name: "Chôm chôm Java Trái To Mọng Nước",
    star: 3,
    category: "Trái cây tươi",
    price: 35000,
    unit: "kg",
    minOrder: 3,
    origin: "Vườn Ba Tư, Long Khánh, Đồng Nai",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80",
    description: "Giống chôm chôm Java trĩu cành, trái to bóng đỏ, vị chua ngọt hài hòa mọng nước giải nhiệt ngày hè cực đã.",
    inStock: 1200,
    qrCodeId: "QR-CC-JAVA-003",
    seasonDiary: [
      { date: "05/01/2026", stage: "Phát cỏ sinh học giữ ẩm gốc cây", note: "Canh tác vườn sinh thái", status: "completed" },
      { date: "12/03/2026", stage: "Nuôi ong mật thụ phấn hoa chôm chôm", note: "Tạo hệ sinh thái cộng sinh trong vườn", status: "completed" },
      { date: "Hôm nay", stage: "Vào vụ thu hoạch rộ", note: "Cung cấp cho khách du lịch trải nghiệm và đơn sỉ lẻ", status: "active" }
    ]
  },
  {
    id: "sp-04",
    name: "Bưởi Da Xanh Tân Triều - Tép Hồng Mọng Nước",
    star: 4,
    category: "Trái cây OCOP xuất khẩu",
    price: 75000,
    unit: "kg",
    minOrder: 2,
    origin: "Hợp tác xã OCOP Tân Triều, Đồng Nai",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    description: "Đặc sản bưởi Tân Triều nức tiếng xứ bưởi Đồng Nai. Vỏ xanh mỏng, ruột hồng đỏ thắm, tép căng mọng nước ngọt thanh không đắng chát.",
    inStock: 300,
    qrCodeId: "QR-BX-TT-004",
    seasonDiary: [
      { date: "20/12/2025", stage: "Bao trái bằng túi chuyên dụng chống rám nắng", note: "Trái đều đẹp tự nhiên", status: "completed" },
      { date: "25/02/2026", stage: "Đo độ ngọt đường định kỳ", note: "Đạt chuẩn xuất khẩu", status: "completed" },
      { date: "Hôm nay", stage: "Thu hoạch chọn lọc từng trái loại 1", note: "Trọng lượng 1.4kg - 1.8kg/trái", status: "active" }
    ]
  },
  {
    id: "sp-05",
    name: "Hạt Điều Long Khánh Rang Muối Vỏ Lụa Loại 1",
    star: 4,
    category: "Nông sản chế biến OCOP",
    price: 95000,
    unit: "hộp 500g",
    minOrder: 1,
    origin: "Cơ sở chế biến Thanh niên Long Khánh, Đồng Nai",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop&q=80",
    description: "Hạt điều cùi thơm béo ngậy vùng đất bazan đỏ Long Khánh rang củi truyền thống với muối biển tinh khiết. Giữ nguyên lớp vỏ lụa giòn rụm, bổ dưỡng.",
    inStock: 650,
    qrCodeId: "QR-HD-LK-005",
    seasonDiary: [
      { date: "15/03/2026", stage: "Thu gom hạt điều tươi mùa vụ mới", note: "Hạt chắc mẩy từ nhà vườn địa phương", status: "completed" },
      { date: "02/04/2026", stage: "Phơi nắng tự nhiên và phân loại hạt A+", note: "Tỉ lệ đồng đều hạt 99%", status: "completed" },
      { date: "Hôm nay", stage: "Rang củi mộc truyền thống & đóng hộp hút chân không", note: "Hạn sử dụng 12 tháng, tem truy xuất", status: "active" }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    orderId: "DH-OCOP-1082",
    customerName: "Chị Thảo My (Quận 1, TP.HCM)",
    phone: "0903.889.123",
    address: "Chung cư Sailing Tower, Pasteur, P. Bến Nghé, Quận 1, TP.HCM",
    items: [
      { name: "Sầu riêng Ri6 Cơm Vàng Hạt Lép", qty: 2, unitPrice: 120000 },
      { name: "Chôm chôm Nhãn Đồng Nai", qty: 3, unitPrice: 45000 }
    ],
    total: 375000,
    shippingMethod: "Giao siêu tốc xe lạnh TP.HCM (nhận trong 3 tiếng)",
    deliveryFee: 35000,
    orderTime: "08:15 Hôm nay",
    status: "pending_harvest",
    statusText: "Đang chờ hái tại vườn",
    supporter: "Nguyễn Văn Nam",
    farmerNote: "Chọn 1 quả sầu riêng cơm nứt nhẹ chín tới để khách ăn chiều nay"
  },
  {
    orderId: "DH-OCOP-1081",
    customerName: "Anh Tuấn Anh (TP. Thủ Đức, TP.HCM)",
    phone: "0912.445.678",
    address: "Khu đô thị Sala, Mai Chí Thọ, TP. Thủ Đức",
    items: [
      { name: "Chôm chôm Java Trái To Mọng Nước", qty: 5, unitPrice: 35000 },
      { name: "Hạt Điều Long Khánh Rang Muối", qty: 2, unitPrice: 95000 }
    ],
    total: 365000,
    shippingMethod: "Giao tiêu chuẩn OCOP tươi mát (nhận ngày mai)",
    deliveryFee: 25000,
    orderTime: "07:30 Hôm nay",
    status: "shipping",
    statusText: "Đang giao chành xe TP.HCM",
    supporter: "Trần Thị Mai",
    farmerNote: "Đã đóng thùng xốp đục lỗ thoáng mát"
  },
  {
    orderId: "DH-OCOP-1080",
    customerName: "Cô Ngọc Lan (Bình Thạnh, TP.HCM)",
    phone: "0938.991.223",
    address: "Khách đặt nhận trực tiếp tại Nhà Vườn Ba Tư (kết hợp tour du lịch)",
    items: [
      { name: "Sầu riêng Ri6 Cơm Vàng Hạt Lép", qty: 3, unitPrice: 120000 },
      { name: "Bưởi Da Xanh Tân Triều", qty: 4, unitPrice: 75000 }
    ],
    total: 660000,
    shippingMethod: "Nhận tại nhà vườn (Tour hái trái cây)",
    deliveryFee: 0,
    orderTime: "Hôm qua 16:45",
    status: "completed",
    statusText: "Đã hoàn thành",
    supporter: "Nguyễn Văn Nam",
    farmerNote: "Khách đi gia đình 4 người check-in lúc 10h sáng"
  }
];

export const INITIAL_LIVESTREAMS: LiveStream[] = [
  {
    id: "live-01",
    title: "Hái Sầu Riêng Ri6 Cơm Vàng & Chôm Chôm Nhãn Tại Vườn Chú Ba Tư",
    hostName: "Nguyễn Văn Nam & Chú Ba Tư",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    time: "ĐANG PHÁT TRỰC TIẾP (19:30 - 21:00)",
    isLiveNow: true,
    viewers: 1428,
    likes: 6890,
    location: "Khu sầu riêng 2.5ha - Vườn Ba Tư Long Khánh",
    cover: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    featuredProduct: {
      id: "sp-01",
      name: "Sầu riêng Ri6 Long Khánh (Bao ăn đổi trả 1-1)",
      dealPrice: "109.000 đ/kg",
      originalPrice: "120.000 đ/kg",
      coupon: "GIAMGIA10K"
    },
    mockComments: [
      { user: "Minh Trang (Q.7)", text: "Nhìn cơm sầu riêng vàng ươm mê quá em ơi! Cho chị 2 quả khoảng 5kg nha", time: "Vừa xong" },
      { user: "Hoàng Bách (Tân Bình)", text: "Ship lên Sài Gòn sáng mai nhận được liền không bạn Nam?", time: "1 phút trước" },
      { user: "Chú Ba Tư (Chủ vườn)", text: "Dạ sáng chú cắt sớm 5h, 9h sáng xe tới tận tay bà con TP.HCM nha!", time: "1 phút trước" },
      { user: "Lê Lan (Gò Vấp)", text: "Chôm chôm nhãn ngọt lắm cả nhà ơi, đợt trước mua ăn dòn róc hạt", time: "2 phút trước" }
    ]
  },
  {
    id: "live-02",
    title: "Khám Phá Mùa Chôm Chôm Rộ Trái & Hướng Dẫn Truy Xuất Mã QR",
    hostName: "Trần Thị Mai (Đoàn xã) & Chú Ba Tư",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    time: "Thứ Bảy Tuần Này - 09:00 Sáng",
    isLiveNow: false,
    viewers: 0,
    likes: 240,
    location: "Khu chôm chôm Java & Vườn Trải Nghiệm Sinh Thái",
    cover: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80",
    description: "Cùng nữ đoàn viên Mai dạo quanh vườn chôm chôm 2.5ha, tự tay bẻ chôm chôm thưởng thức tại chỗ và trải nghiệm quét mã QR xem toàn bộ nhật ký bón phân sinh học."
  },
  {
    id: "live-03",
    title: "Chợ Phiên Nông Sản Số OCOP Đồng Nai - Hội Tụ Đặc Sản Xứ Bưởi & Hạt Điều",
    hostName: "Tổ Công Tác Thanh Niên Số Huyện Đoàn",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    time: "Chủ Nhật Tuần Này - 15:30 Chiều",
    isLiveNow: false,
    viewers: 0,
    likes: 315,
    location: "Không gian Khởi nghiệp Thanh niên Long Khánh",
    cover: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    description: "Tổng hợp các sản phẩm OCOP tiêu biểu: Bưởi da xanh Tân Triều, Hạt điều rang củi, Rượu bưởi, Cà phê hữu cơ. Ưu đãi freeship toàn TP.HCM."
  }
];

export const INITIAL_MAP_LOCATIONS: EcoMapLocation[] = [
  {
    id: "loc-01",
    name: "Cổng Chào & Nhà Trưng Bày OCOP Ba Tư",
    type: "checkin",
    desc: "Nơi đón khách, đăng ký tour trải nghiệm, thử trái cây và quét mã QR thông tin vườn.",
    icon: "🏪",
    pos: { x: "18%", y: "78%" }
  },
  {
    id: "loc-02",
    name: "Vườn Sầu Riêng Ri6 Cổ Thụ (1.2 ha)",
    type: "garden",
    desc: "Khu vực cây sầu riêng 15-20 năm tuổi trĩu quả. Khách được hướng dẫn cách gõ sầu riêng nghe âm thanh chọn quả chuẩn cơm vàng.",
    icon: "🌳",
    pos: { x: "42%", y: "35%" }
  },
  {
    id: "loc-03",
    name: "Vườn Chôm Chôm Nhãn & Java (1.3 ha)",
    type: "garden",
    desc: "Tán cây sum suê đỏ rực cả góc trời, nơi du khách chụp ảnh kỷ niệm và hái chôm chôm ăn thỏa thích.",
    icon: "🍒",
    pos: { x: "72%", y: "45%" }
  },
  {
    id: "loc-04",
    name: "Chòi Nghỉ Chân Bên Suối & Đờn Ca Tài Tử",
    type: "relax",
    desc: "Thưởng thức dừa tươi, trà thảo mộc lá dứa và giao lưu đờn ca tài tử cùng nghệ nhân địa phương.",
    icon: "🛖",
    pos: { x: "55%", y: "82%" }
  },
  {
    id: "loc-05",
    name: "Góc Livestream & Trạm Đóng Gói Thanh Niên",
    type: "tech",
    desc: "Khu vực đoàn viên thanh niên dựng studio di động ngoài vườn, hỗ trợ chú Ba Tư livestream và đóng thùng xe lạnh.",
    icon: "📱",
    pos: { x: "28%", y: "48%" }
  }
];
