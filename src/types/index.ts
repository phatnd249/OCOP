export type UserRole = 'customer' | 'farmer' | 'youth';

export type ScreenId =
  | 'home'          // Trang chủ Chợ OCOP Đồng Nai
  | 'products'      // Danh sách các sản phẩm OCOP
  | 'product_detail'// Chi tiết sản phẩm cụ thể & QR truy xuất
  | 'garden'        // Hồ sơ nhà vườn Ba Tự
  | 'cart'          // Giỏ hàng nông sản
  | 'checkout'      // Đặt hàng & Vận chuyển
  | 'quick_post'    // Đăng sản phẩm nhanh (Voice + AI)
  | 'orders'        // Quản lý đơn hàng (Bác Ba Tự)
  | 'live'          // Livestream & Bán hàng
  | 'map'           // Bản đồ du lịch trải nghiệm
  | 'volunteer'     // Bảng vàng giờ tình nguyện
  | 'auth';         // Đăng nhập, đăng ký tài khoản các vai trò

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
  hostName: string;
  hostAvatar: string;
  time: string;
  isLiveNow: boolean;
  viewers: number;
  likes: number;
  location: string;
  cover: string;
  featuredProduct?: {
    id: string;
    name: string;
    dealPrice: string;
    originalPrice: string;
    coupon: string;
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
