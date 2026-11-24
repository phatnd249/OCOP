export type UserRole = 'admin' | 'youth' | 'farmer' | 'buyer';

export type UserStatus = 'active' | 'pending' | 'locked';

export interface AppUser {
  id: string;
  name: string;
  phone: string;
  pass: string;
  role: UserRole;
  status: UserStatus;
  // Specific fields based on role
  address?: string;      // Cho buyer
  gardenName?: string;   // Cho farmer
  gardenArea?: string;   // Cho farmer
  crops?: string;        // Cho farmer
  unit?: string;         // Cho youth (Đơn vị đoàn)
  skills?: string;       // Cho youth
  volunteerHours?: number; // Cho youth
  createdAt?: string;
}

export type ScreenId =
  | 'home'          // Trang chủ Chợ OCOP Đồng Nai
  | 'products'      // Danh sách các sản phẩm OCOP
  | 'garden'        // Hồ sơ nhà vườn Ba Tự
  | 'product_detail'// Chi tiết sản phẩm & QR truy xuất
  | 'cart'          // Giỏ hàng nông sản
  | 'checkout'      // Đặt hàng & Vận chuyển
  | 'quick_post'    // Đăng sản phẩm nhanh (Voice + AI)
  | 'orders'        // Quản lý đơn hàng (Bác Ba Tự)
  | 'live'          // Livestream & Bán hàng
  | 'map'           // Bản đồ du lịch trải nghiệm
  | 'volunteer'     // Bảng vàng giờ tình nguyện
  | 'admin_users';  // Admin: Quản lý tài khoản toàn hệ thống

export interface SeasonDiaryItem {
  date: string;
  stage: string;
  note: string;
  status: 'completed' | 'active';
}

export interface Product {
  id: string;
  name: string;
  star: number;
  category: string;
  price: number;
  unit: string;
  minOrder: number;
  origin: string;
  image: string;
  description: string;
  inStock: number;
  qrCodeId: string;
  seasonDiary: SeasonDiaryItem[];
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface OrderItem {
  name: string;
  qty: number;
  unitPrice: number;
}

export type OrderStatus = 'pending_harvest' | 'shipping' | 'completed';

export interface Order {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  shippingMethod: string;
  deliveryFee: number;
  orderTime: string;
  status: OrderStatus;
  statusText: string;
  supporter: string;
  farmerNote?: string;
}

export interface YouthSupporter {
  id: string;
  name: string;
  role: string;
  avatar: string;
  phone: string;
  skills: string[];
  volunteerHours: number;
  sessionsLive: number;
  productsDigitized: number;
  badge: string;
}

export interface GardenInfo {
  id: string;
  name: string;
  owner: string;
  avatar: string;
  coverImage: string;
  location: string;
  coordinates: string;
  area: string;
  crops: string[];
  ocopRating: number;
  ocopCertNo: string;
  story: string;
  phone: string;
  tourismReady: boolean;
  ecoTourPrice: string;
}

export interface LiveStreamComment {
  user: string;
  text: string;
  time: string;
}

export interface LiveStream {
  id: string;
  title: string;
  farmName: string;          // Tên nhà vườn (Nhà vườn Ba Tư, Vườn Chú Sáu Dân...)
  farmerName: string;        // Tên bác chủ vườn (Chú Ba Tư, Bác Sáu Dân...)
  ward: string;              // Phường / Xã (P. Suối Tre, Xã Bình Lộc, P. Xuân An...)
  district: string;          // TP. Long Khánh, Huyện Vĩnh Cửu...
  hostName: string;          // Người dẫn / Đoàn viên tiếp sức
  hostAvatar: string;
  time: string;
  status: 'live' | 'upcoming' | 'ended';
  isLiveNow: boolean;
  viewers: number;
  likes: number;
  location: string;
  cover: string;
  category: string;          // 'durian' | 'rambutan' | 'pomelo' | 'cashew' | 'mixed'
  featuredProduct?: {
    id: string;
    name: string;
    dealPrice: string;
    originalPrice: string;
    coupon: string;
    image?: string;
  };
  mockComments?: LiveStreamComment[];
  description?: string;
}

export interface EcoMapLocation {
  id: string;
  name: string;
  type: 'checkin' | 'garden' | 'relax' | 'tech';
  desc: string;
  icon: string;
  pos: { x: string; y: string };
}
