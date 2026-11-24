import { GardenInfo, YouthSupporter, Product, Order, LiveStream, EcoMapLocation } from '../types';

export const INITIAL_GARDENS: GardenInfo[] = [
  {
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
  },
  {
    id: "g-saudan",
    name: "Vườn Nông Sản Chú Sáu Dân - Bình Lộc",
    owner: "Chú Sáu Dân (Trần Văn Dân - 54 tuổi)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=1200&auto=format&fit=crop&q=80",
    location: "Xã Bình Lộc, TP. Long Khánh, Tỉnh Đồng Nai",
    coordinates: "10.9512° N, 107.2641° E",
    area: "3.2 ha chuyên canh",
    crops: ["Sầu riêng Monthong", "Chôm chôm Thái", "Măng cụt"],
    ocopRating: 4,
    ocopCertNo: "OCOP-ĐN-2024-4S-104",
    story: "Gia đình chú Sáu Dân là một trong những hộ tiên phong trồng sầu riêng Monthong theo tiêu chuẩn VietGAP tại xã Bình Lộc. Vườn nằm thoai thoải bên triền đồi, nguồn nước tưới từ suối tự nhiên trong vắt giúp trái cơm dày, ngọt béo thơm lừng.",
    phone: "0913.567.890",
    tourismReady: true,
    ecoTourPrice: "60.000 đ/người (Thưởng thức sầu riêng và chôm chôm tại vườn)"
  },
  {
    id: "g-tamhien",
    name: "Vườn Cây Ăn Trái Bác Tám Hiền - Xuân Bình",
    owner: "Bác Tám Hiền (Lê Văn Hiền - 58 tuổi)",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=1200&auto=format&fit=crop&q=80",
    location: "Phường Xuân Bình, TP. Long Khánh, Tỉnh Đồng Nai",
    coordinates: "10.9388° N, 107.2389° E",
    area: "1.8 ha",
    crops: ["Mít ruột đỏ Indo", "Ổi nữ hoàng", "Bưởi da xanh"],
    ocopRating: 4,
    ocopCertNo: "OCOP-ĐN-2024-4S-112",
    story: "Khu vườn trái cây Bác Tám Hiền áp dụng mô hình nông nghiệp tuần hoàn không rác thải. Bác tận dụng vỏ mít, lá cây ủ phân trùn quế bón ngược lại cho gốc ổi, tạo ra những quả ổi nữ hoàng giòn xốp ngọt mát không tì vết.",
    phone: "0982.654.321",
    tourismReady: false,
    ecoTourPrice: "Chưa mở tour trải nghiệm"
  },
  {
    id: "g-utdien",
    name: "Vườn Trái Cây Sinh Thái Út Điền - Bảo Quang",
    owner: "Anh Út Điền (Nguyễn Văn Điền - 38 tuổi)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80",
    location: "Xã Bảo Quang, TP. Long Khánh, Tỉnh Đồng Nai",
    coordinates: "10.9654° N, 107.2512° E",
    area: "2.0 ha",
    crops: ["Mãng cầu xiêm Thái", "Mãng cầu sấy dẻo", "Mít Thái siêu sớm"],
    ocopRating: 3,
    ocopCertNo: "OCOP-ĐN-2023-3S-045",
    story: "Là thanh niên nông thôn trở về quê khởi nghiệp từ vườn cây của cha mẹ, anh Út Điền đã áp dụng hệ thống tưới nhỏ giọt tự động điều khiển qua smartphone và chế biến mãng cầu sấy dẻo đạt chuẩn OCOP 3 sao.",
    phone: "0909.112.233",
    tourismReady: true,
    ecoTourPrice: "40.000 đ/người (Tham quan vườn công nghệ cao)"
  },
  {
    id: "g-tantrieu",
    name: "Làng Bưởi Tân Triều Năm Huệ - Vĩnh Cửu",
    owner: "Ông Năm Huệ (Huỳnh Đức Huệ - 62 tuổi)",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&auto=format&fit=crop&q=80",
    location: "Cù lao Tân Triều, Xã Tân Bình, Huyện Vĩnh Cửu, Tỉnh Đồng Nai",
    coordinates: "11.0125° N, 106.8456° E",
    area: "4.5 ha ven sông",
    crops: ["Bưởi đường lá cam", "Bưởi da xanh Tân Triều", "Rượu bưởi OCOP"],
    ocopRating: 5,
    ocopCertNo: "OCOP-ĐN-2024-5S-001",
    story: "Vườn bưởi Tân Triều nức tiếng hơn nửa thế kỷ trên đất phù sa sông Đồng Nai. Những trái bưởi đường lá cam tép mọng nước, vị ngọt thanh không the đắng, đã vinh dự đạt chứng nhận OCOP 5 sao cấp quốc gia.",
    phone: "0918.889.900",
    tourismReady: true,
    ecoTourPrice: "80.000 đ/người (Thưởng thức gỏi bưởi và chè bưởi Tân Triều)"
  },
  {
    id: "g-hanggon",
    name: "Hợp Tác Xã Điều Vàng Hàng Gòn",
    owner: "Chị Kim Loan (Chủ tịch HTX - 42 tuổi)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1200&auto=format&fit=crop&q=80",
    location: "Xã Hàng Gòn, TP. Long Khánh, Tỉnh Đồng Nai",
    coordinates: "10.8956° N, 107.2891° E",
    area: "15 ha vùng nguyên liệu",
    crops: ["Hạt điều rang củi", "Hạt điều tỏi ớt", "Kẹo hạt điều"],
    ocopRating: 4,
    ocopCertNo: "OCOP-ĐN-2024-4S-078",
    story: "HTX quy tụ hơn 20 hộ trồng điều xã Hàng Gòn, chế biến theo phương pháp rang củi thủ công giữ nguyên độ béo ngậy tự nhiên và độ giòn tan, bao bì hút chân không đạt chuẩn xuất khẩu.",
    phone: "0977.334.455",
    tourismReady: false,
    ecoTourPrice: "Chưa mở tour trải nghiệm"
  }
];

export const INITIAL_GARDEN: GardenInfo = INITIAL_GARDENS[0];

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
    farmName: "Nhà Vườn Sinh Thái Ba Tư",
    farmerName: "Chú Ba Tư",
    ward: "Phường Suối Tre",
    district: "TP. Long Khánh",
    hostName: "Nguyễn Văn Nam (Đoàn viên) & Chú Ba Tư",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    time: "ĐANG PHÁT TRỰC TIẾP (19:30 - 21:00)",
    status: "live",
    isLiveNow: true,
    viewers: 1428,
    likes: 6890,
    category: "durian",
    location: "Khu sầu riêng 2.5ha - Vườn Ba Tư, P. Suối Tre, TP. Long Khánh",
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
    title: "Livestream Cắt Sầu Riêng Monthong & Chôm Chôm Java Xuất Khẩu",
    farmName: "Vườn Nông Sản Chú Sáu Dân",
    farmerName: "Chú Sáu Dân",
    ward: "Xã Bình Lộc",
    district: "TP. Long Khánh",
    hostName: "Trần Thị Mai (Đoàn xã) & Bác Sáu Dân",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    time: "ĐANG PHÁT TRỰC TIẾP (14:00 - 17:30)",
    status: "live",
    isLiveNow: true,
    viewers: 895,
    likes: 3420,
    category: "rambutan",
    location: "Tổ 4, Ấp 2, Xã Bình Lộc, TP. Long Khánh",
    cover: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80",
    featuredProduct: {
      id: "sp-02",
      name: "Chôm chôm Java Trái To Mọng Nước",
      dealPrice: "32.000 đ/kg",
      originalPrice: "35.000 đ/kg",
      coupon: "BINHLOC5K"
    },
    mockComments: [
      { user: "Anh Hùng (Bình Thạnh)", text: "Chôm chôm Java tươi xanh cuống hái tại cành luôn hả em?", time: "Vừa xong" },
      { user: "Trần Thị Mai", text: "Dạ đúng rồi anh, bẻ tại cây đóng thùng xốp mát lạnh chuyển xe về Sài Gòn liền ạ!", time: "1 phút trước" }
    ]
  },
  {
    id: "live-03",
    title: "Hái Bưởi Da Xanh & Rót Rượu Bưởi Truyền Thống Tại Cù Lao",
    farmName: "HTX Bưởi Da Xanh Năm Thưởng",
    farmerName: "Chú Năm Thưởng",
    ward: "Xã Tân Triều",
    district: "Huyện Vĩnh Cửu",
    hostName: "Lê Hoàng (Đoàn viên) & Bác Năm Thưởng",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    time: "ĐANG PHÁT TRỰC TIẾP (15:00 - 18:00)",
    status: "live",
    isLiveNow: true,
    viewers: 640,
    likes: 2180,
    category: "pomelo",
    location: "Làng bưởi cổ Tân Triều, Huyện Vĩnh Cửu",
    cover: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80",
    featuredProduct: {
      id: "sp-03",
      name: "Bưởi Da Xanh Tân Triều (Loại 1 Cùi Mỏng)",
      dealPrice: "68.000 đ/kg",
      originalPrice: "75.000 đ/kg",
      coupon: "TANTRIEU10K"
    },
    mockComments: [
      { user: "Bác Thanh (Q.3)", text: "Bưởi Tân Triều vị ngọt thanh không bị khô đầu mối, giao quận 3 mấy tiếng tới?", time: "Vừa xong" },
      { user: "Lê Hoàng", text: "Dạ 3 tiếng giao xe lạnh tới tận nhà Bác Thanh nhé!", time: "1 phút trước" }
    ]
  },
  {
    id: "live-04",
    title: "Mùa Măng Cụt Cổ Thụ & Chôm Chôm Thái Giòn Ngọt Đậm Vị",
    farmName: "Trang Trại Trái Cây Chị Bích Loan",
    farmerName: "Chị Bích Loan",
    ward: "Phường Xuân An",
    district: "TP. Long Khánh",
    hostName: "Đặng Quốc Bảo (Chi đoàn TN) & Chị Bích Loan",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    time: "Tối Nay - 19:30",
    status: "upcoming",
    isLiveNow: false,
    viewers: 0,
    likes: 450,
    category: "fruit",
    location: "Đường Cách Mạng Tháng 8, P. Xuân An, TP. Long Khánh",
    cover: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80",
    description: "Cùng chị Loan trải nghiệm cây măng cụt hơn 30 năm tuổi, cơm dày không sượng hạt, tiêu chuẩn VietGAP xuất khẩu.",
    featuredProduct: {
      id: "sp-04",
      name: "Măng cụt cổ thụ Long Khánh OCOP 4 sao",
      dealPrice: "85.000 đ/kg",
      originalPrice: "95.000 đ/kg",
      coupon: "XUANAN10K"
    }
  },
  {
    id: "live-05",
    title: "Trải Nghiệm Rang Củi Hạt Điều Vàng & Bánh Hạt Điều Dinh Dưỡng",
    farmName: "Hợp Tác Xã Điều Vàng Hàng Gòn",
    farmerName: "Anh Trần Tuấn",
    ward: "Xã Hàng Gòn",
    district: "TP. Long Khánh",
    hostName: "Vũ Thị Thảo (Đoàn viên) & Anh Tuấn",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    time: "Ngày Mai - 09:00 Sáng",
    status: "upcoming",
    isLiveNow: false,
    viewers: 0,
    likes: 320,
    category: "cashew",
    location: "Khu sơ chế Hàng Gòn, TP. Long Khánh",
    cover: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=800&auto=format&fit=crop&q=80",
    description: "Xem các cô chú thợ bẻ từng hạt điều chắc mẩy, rang chảo gang thủ công thơm nức mũi và đóng gói hút chân không ngay trên sóng.",
    featuredProduct: {
      id: "sp-05",
      name: "Hạt Điều Long Khánh Rang Muối Vỏ Lụa",
      dealPrice: "89.000 đ/hộp",
      originalPrice: "95.000 đ/hộp",
      coupon: "HANGGON10K"
    }
  },
  {
    id: "live-06",
    title: "Cắt Mít Ruột Đỏ Indo Siêu Ngọt & Ổi Nữ Hoàng Giòn Xốp Tại Vườn",
    farmName: "Vườn Cây Ăn Trái Bác Tám Hiền",
    farmerName: "Bác Tám Hiền",
    ward: "Phường Xuân Bình",
    district: "TP. Long Khánh",
    hostName: "Nguyễn Văn Nam & Bác Tám Hiền",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    time: "Thứ Bảy Tuần Này - 14:00 Chiều",
    status: "upcoming",
    isLiveNow: false,
    viewers: 0,
    likes: 280,
    category: "fruit",
    location: "Tổ 6, P. Xuân Bình, TP. Long Khánh",
    cover: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80",
    description: "Tham quan mô hình chuyển đổi cây trồng hiệu quả cao: Mít ruột đỏ cơm dày không xơ và ổi nữ hoàng canh tác túi bọc hữu cơ.",
    featuredProduct: {
      id: "sp-06",
      name: "Mít Ruột Đỏ Indo Cơm Dày Ngọt Lịm",
      dealPrice: "45.000 đ/kg",
      originalPrice: "55.000 đ/kg",
      coupon: "XUANBINH10K"
    }
  },
  {
    id: "live-07",
    title: "Mãng Cầu Xiêm Thái Gai Mềm & Mãng Cầu Sấy Dẻo Chua Ngọt",
    farmName: "Vườn Trái Cây Út Điền",
    farmerName: "Anh Út Điền",
    ward: "Xã Bảo Quang",
    district: "TP. Long Khánh",
    hostName: "Trần Thị Mai & Anh Út Điền",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    time: "Đã Phát Sóng (Hôm qua 15:00)",
    status: "ended",
    isLiveNow: false,
    viewers: 2150,
    likes: 5410,
    category: "fruit",
    location: "Đường Suối Chồn, Xã Bảo Quang, TP. Long Khánh",
    cover: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80",
    description: "Ghi hình lại buổi bẻ mãng cầu xiêm và quy trình sấy dẻo nhiệt độ thấp giữ nguyên vitamin C của HTX Nông nghiệp Bảo Quang.",
    featuredProduct: {
      id: "sp-07",
      name: "Mãng Cầu Sấy Dẻo Tự Nhiên Không Đường",
      dealPrice: "65.000 đ/túi",
      originalPrice: "75.000 đ/túi",
      coupon: "BAOQUANG10K"
    }
  },
  {
    id: "live-08",
    title: "Nuôi Trồng & Thu Hoạch Nấm Đông Trùng Hạ Thảo OCOP 4 Sao",
    farmName: "Nông Trại Dược Liệu Hữu Cơ Hoàng Long",
    farmerName: "Kỹ sư trẻ Hoàng Long",
    ward: "Phường Phú Bình",
    district: "TP. Long Khánh",
    hostName: "Kỹ sư Hoàng Long & Nhóm Khởi Nghiệp Trẻ",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    time: "Đã Phát Sóng (2 ngày trước)",
    status: "ended",
    isLiveNow: false,
    viewers: 1890,
    likes: 4920,
    category: "mixed",
    location: "Khu phố 3, P. Phú Bình, TP. Long Khánh",
    cover: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=800&auto=format&fit=crop&q=80",
    description: "Mô hình thanh niên nông thôn khởi nghiệp công nghệ cao – phòng vô trùng nuôi cấy nấm đạt chuẩn OCOP 4 sao tỉnh Đồng Nai.",
    featuredProduct: {
      id: "sp-08",
      name: "Đông trùng hạ thảo sấy thăng hoa 10g",
      dealPrice: "245.000 đ/lọ",
      originalPrice: "280.000 đ/lọ",
      coupon: "PHUBINH20K"
    }
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
