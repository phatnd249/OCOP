import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserStatus,
  AppUser,
  ScreenId,
  Product,
  CartItem,
  Order,
  OrderStatus,
  YouthSupporter,
  GardenInfo,
  LiveStream
} from '../types';
import {
  INITIAL_GARDEN,
  INITIAL_YOUTH,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_LIVESTREAMS
} from '../data/ocopData';

export const DEFAULT_USERS: AppUser[] = [
  {
    id: "U_ADMIN",
    name: "Quản trị viên Hệ thống (Admin)",
    phone: "admin",
    pass: "123",
    role: "admin",
    status: "active",
    createdAt: "2026-11-20"
  },
  {
    id: "U_YOUTH_1",
    name: "Nguyễn Văn Nam",
    phone: "0901111111",
    pass: "123",
    role: "youth",
    unit: "Đoàn xã Bình Lộc, TP. Long Khánh",
    skills: "Livestream bán hàng, Chụp ảnh sản phẩm, Số hóa QR",
    volunteerHours: 38,
    status: "active",
    createdAt: "2026-11-21"
  },
  {
    id: "U_FARMER_1",
    name: "Chú Ba Tư (Nguyễn Văn Tư)",
    phone: "0902222222",
    pass: "123",
    role: "farmer",
    gardenName: "Nhà vườn Ba Tư - 2,5 ha",
    gardenArea: "2.5 ha",
    crops: "Sầu riêng Ri6, Chôm chôm nhãn, Chôm chôm Java",
    address: "Ấp Suối Tre, TP. Long Khánh, Đồng Nai",
    status: "active",
    createdAt: "2026-11-21"
  },
  {
    id: "U_BUYER_1",
    name: "Lê Hoàng Nam (Khách TP.HCM)",
    phone: "0903333333",
    pass: "123",
    role: "buyer",
    address: "Quận 1, TP. Hồ Chí Minh",
    status: "active",
    createdAt: "2026-11-22"
  }
];

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  openProductDetail: (productId: string) => void;
  qrModalProduct: Product | null;
  setQrModalProduct: (product: Product | null) => void;
  tourModalOpen: boolean;
  setTourModalOpen: (open: boolean) => void;

  // RBAC User & Auth
  currentUser: AppUser | null;
  users: AppUser[];
  login: (phone: string, pass: string) => { success: boolean; message: string; user?: AppUser };
  quickLogin: (role: UserRole) => void;
  logout: () => void;
  registerUser: (userData: Omit<AppUser, 'id' | 'status' | 'createdAt'>) => { success: boolean; message: string };
  updateUserStatus: (userId: string, newStatus: UserStatus) => void;
  deleteUser: (userId: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => boolean | void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;

  // Products
  products: Product[];
  addProduct: (newProd: {
    name: string;
    price: number;
    unit: string;
    category: string;
    image: string;
    description: string;
    origin?: string;
  }) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    phone: string;
    address: string;
    items: { name: string; qty: number; unitPrice: number }[];
    total: number;
    shippingMethod: string;
    deliveryFee: number;
    farmerNote?: string;
  }) => string;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;

  // Data
  garden: GardenInfo;
  youthSupporters: YouthSupporter[];
  liveStreams: LiveStream[];
  likeLiveStream: (liveId: string) => void;
  addLiveComment: (liveId: string, text: string, user?: string) => void;

  // Toast / Notification
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users list in localStorage
  const [users, setUsers] = useState<AppUser[]>(() => {
    const saved = localStorage.getItem('ocop_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  // Current logged in user
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    const saved = localStorage.getItem('ocop_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Role state (bắt đầu bằng buyer nếu chưa đăng nhập, hoặc lấy role của currentUser)
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('ocop_current_user');
    if (saved) {
      try {
        const u: AppUser = JSON.parse(saved);
        return u.role;
      } catch {}
    }
    return 'buyer';
  });

  const [activeScreen, setActiveScreenState] = useState<ScreenId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('sp-01');
  const [qrModalProduct, setQrModalProduct] = useState<Product | null>(null);
  const [tourModalOpen, setTourModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync users & current_user to LocalStorage
  useEffect(() => {
    localStorage.setItem('ocop_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ocop_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ocop_current_user');
    }
  }, [currentUser]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ocop_cart');
    return saved ? JSON.parse(saved) : [
      { productId: 'sp-01', qty: 2 },
      { productId: 'sp-02', qty: 3 }
    ];
  });

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ocop_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ocop_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Youth Supporters
  const [youthSupporters, setYouthSupporters] = useState<YouthSupporter[]>(() => {
    const saved = localStorage.getItem('ocop_youth');
    return saved ? JSON.parse(saved) : INITIAL_YOUTH;
  });

  // Garden
  const [garden] = useState<GardenInfo>(INITIAL_GARDEN);

  // LiveStreams
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>(() => {
    const saved = localStorage.getItem('ocop_lives');
    return saved ? JSON.parse(saved) : INITIAL_LIVESTREAMS;
  });

  // URL Hash Sync for Real Routing
  const parseHash = () => {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!rawHash || rawHash === 'home') {
      return { screen: 'home' as ScreenId, productId: selectedProductId };
    }
    if (rawHash.startsWith('product/')) {
      const pId = rawHash.replace('product/', '').trim();
      return { screen: 'product_detail' as ScreenId, productId: pId || selectedProductId };
    }
    if (rawHash === 'products') return { screen: 'products' as ScreenId, productId: selectedProductId };
    if (rawHash === 'garden') return { screen: 'garden' as ScreenId, productId: selectedProductId };
    if (rawHash === 'cart') return { screen: 'cart' as ScreenId, productId: selectedProductId };
    if (rawHash === 'checkout') return { screen: 'checkout' as ScreenId, productId: selectedProductId };
    if (rawHash === 'quick-post' || rawHash === 'quick_post') return { screen: 'quick_post' as ScreenId, productId: selectedProductId };
    if (rawHash === 'orders') return { screen: 'orders' as ScreenId, productId: selectedProductId };
    if (rawHash === 'live') return { screen: 'live' as ScreenId, productId: selectedProductId };
    if (rawHash === 'map') return { screen: 'map' as ScreenId, productId: selectedProductId };
    if (rawHash === 'volunteer') return { screen: 'volunteer' as ScreenId, productId: selectedProductId };
    if (rawHash === 'auth') return { screen: 'auth' as ScreenId, productId: selectedProductId };
    return { screen: 'home' as ScreenId, productId: selectedProductId };
  };

  useEffect(() => {
    const onHashChange = () => {
      const { screen, productId } = parseHash();
      setActiveScreenState(screen);
      if (productId) {
        setSelectedProductId(productId);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setActiveScreen = (screen: ScreenId) => {
    setActiveScreenState(screen);
    let targetHash: string = screen;
    if (screen === 'product_detail') {
      targetHash = `product/${selectedProductId}`;
    } else if (screen === 'quick_post') {
      targetHash = 'quick-post';
    }
    if (window.location.hash !== `#${targetHash}`) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActiveScreenState('product_detail');
    const targetHash = `product/${productId}`;
    if (window.location.hash !== `#${targetHash}`) {
      window.location.hash = targetHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('ocop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ocop_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ocop_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ocop_youth', JSON.stringify(youthSupporters));
  }, [youthSupporters]);

  useEffect(() => {
    localStorage.setItem('ocop_lives', JSON.stringify(liveStreams));
  }, [liveStreams]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'admin') {
      setActiveScreen('admin_users');
      showNotification('Đã chuyển sang quyền Quản trị viên Hệ thống (Admin)');
    } else if (role === 'farmer') {
      setActiveScreen('orders');
      showNotification('Đã chuyển sang giao diện Chú Ba Tư (50 tuổi) - Chữ to, nút lớn');
    } else if (role === 'youth') {
      setActiveScreen('quick_post');
      showNotification('Đã chuyển sang vai trò Đoàn viên thanh niên hỗ trợ');
    } else {
      setActiveScreen('home');
      showNotification('Đã chuyển sang vai trò Khách hàng (TP.HCM)');
    }
  };

  // Auth & RBAC Handlers
  const login = (phone: string, pass: string) => {
    const user = users.find(u => u.phone === phone.trim());
    if (!user) {
      return { success: false, message: 'Số điện thoại / Tên đăng nhập không tồn tại!' };
    }
    if (user.pass !== pass) {
      return { success: false, message: 'Mật khẩu không chính xác!' };
    }
    if (user.status === 'locked') {
      return { success: false, message: '⛔ Tài khoản này đã bị Admin khóa quyền truy cập!' };
    }
    if (user.status === 'pending') {
      return { success: false, message: '⏳ Tài khoản đang chờ Quản trị viên (Admin) xét duyệt!' };
    }

    setCurrentUser(user);
    setRole(user.role);
    showNotification(`👋 Đăng nhập thành công! Xin chào ${user.name}`);
    return { success: true, message: 'Đăng nhập thành công', user };
  };

  const quickLogin = (role: UserRole) => {
    const demoUser = users.find(u => u.role === role);
    if (demoUser) {
      if (demoUser.status === 'locked') {
        showNotification('Tài khoản demo này đang bị khóa!');
        return;
      }
      setCurrentUser(demoUser);
      setRole(demoUser.role);
      showNotification(`🚀 Đã đăng nhập nhanh với vai trò: ${demoUser.name}`);
    } else {
      showNotification('Không tìm thấy tài khoản demo phù hợp!');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole('buyer');
    setActiveScreen('home');
    showNotification('Đã đăng xuất khỏi hệ thống.');
  };

  const registerUser = (userData: Omit<AppUser, 'id' | 'status' | 'createdAt'>) => {
    // Check if phone exists
    const exists = users.some(u => u.phone === userData.phone.trim());
    if (exists) {
      return { success: false, message: 'Số điện thoại này đã được đăng ký trên hệ thống!' };
    }

    const newUserStatus: UserStatus = userData.role === 'buyer' ? 'active' : 'pending';
    const newUser: AppUser = {
      ...userData,
      id: `U_${Date.now()}`,
      status: newUserStatus,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);

    if (newUserStatus === 'active') {
      setCurrentUser(newUser);
      setRole('buyer');
      return {
        success: true,
        message: '🎉 Đăng ký thành công! Bạn đã được tự động đăng nhập.'
      };
    } else {
      return {
        success: true,
        message: '📋 Đăng ký thành công! Tài khoản của bạn đang ở trạng thái CHỜ ADMIN DUYỆT.'
      };
    }
  };

  const updateUserStatus = (userId: string, newStatus: UserStatus) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
    const targetUser = users.find(u => u.id === userId);
    const actionLabel = newStatus === 'active' ? 'Phê duyệt kích hoạt' : newStatus === 'locked' ? 'Khóa' : 'Chờ duyệt';
    showNotification(`Đã ${actionLabel} tài khoản: ${targetUser?.name || userId}`);

    // If current logged in user was locked, log them out
    if (currentUser?.id === userId && newStatus === 'locked') {
      logout();
    }
  };

  const deleteUser = (userId: string) => {
    if (userId === 'U_ADMIN') {
      showNotification('Không thể xóa tài khoản Quản trị viên cấp cao!');
      return;
    }
    const targetUser = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    showNotification(`Đã xóa tài khoản: ${targetUser?.name || userId}`);
    if (currentUser?.id === userId) {
      logout();
    }
  };

  const addToCart = (productId: string, qty = 1) => {
    // 1. Chưa đăng nhập: Bắt buộc người dùng phải đăng nhập tài khoản mới được mua
    if (!currentUser) {
      showNotification('⚠️ Vui lòng Đăng nhập hoặc Đăng ký tài khoản để thêm vào giỏ và mua hàng!');
      return false;
    }

    // 2. Đã đăng nhập: Chỉ người mua ('buyer') và đoàn viên ('youth') mới có quyền mua
    if (currentUser.role !== 'buyer' && currentUser.role !== 'youth') {
      showNotification('ℹ️ Tài khoản Chủ nhà vườn / Quản trị viên không có quyền đặt mua nông sản. Vui lòng đăng nhập tài khoản Người mua hoặc Đoàn viên!');
      return false;
    }

    setCart(prev => {
      const idx = prev.findIndex(item => item.productId === productId);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { productId, qty }];
    });
    const p = products.find(prod => prod.id === productId);
    showNotification(`Đã thêm ${qty} ${p?.unit || 'phần'} "${p?.name || 'sản phẩm'}" vào giỏ hàng!`);
    return true;
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.productId === productId ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
    showNotification('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addProduct = (newProd: {
    name: string;
    price: number;
    unit: string;
    category: string;
    image: string;
    description: string;
    origin?: string;
  }) => {
    const id = `sp-${Date.now().toString().slice(-4)}`;
    const qrCodeId = `QR-${Date.now().toString().slice(-6)}`;
    const created: Product = {
      id,
      name: newProd.name,
      star: 4,
      category: newProd.category || 'Nông sản OCOP Đồng Nai',
      price: newProd.price,
      unit: newProd.unit,
      minOrder: 1,
      origin: newProd.origin || 'Nhà vườn Ba Tư, Long Khánh, Đồng Nai',
      image: newProd.image,
      description: newProd.description,
      inStock: 500,
      qrCodeId,
      seasonDiary: [
        { date: 'Hôm nay', stage: 'Số hóa sản phẩm & tạo mã QR truy xuất', note: 'Đoàn viên thanh niên hỗ trợ nhập bằng giọng nói & AI', status: 'completed' },
        { date: 'Vừa thu hoạch', stage: 'Cắt hái tuyển chọn tại vườn', note: 'Đạt chuẩn trái cây tươi OCOP', status: 'active' }
      ]
    };

    setProducts(prev => [created, ...prev]);

    // Update volunteer hours for youth
    setYouthSupporters(prev =>
      prev.map(yt => ({
        ...yt,
        volunteerHours: yt.volunteerHours + 2,
        productsDigitized: yt.productsDigitized + 1
      }))
    );

    showNotification(`🎉 Đăng thành công "${newProd.name}" lên TRẠM VƯỜN SỐ! (+2 giờ tình nguyện)`);
  };

  const createOrder = (orderData: {
    customerName: string;
    phone: string;
    address: string;
    items: { name: string; qty: number; unitPrice: number }[];
    total: number;
    shippingMethod: string;
    deliveryFee: number;
    farmerNote?: string;
  }) => {
    const orderId = `DH-OCOP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      orderId,
      customerName: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      items: orderData.items,
      total: orderData.total,
      shippingMethod: orderData.shippingMethod,
      deliveryFee: orderData.deliveryFee,
      orderTime: 'Vừa xong',
      status: 'pending_harvest',
      statusText: 'Đang chờ hái tại vườn',
      supporter: 'Nguyễn Văn Nam',
      farmerNote: orderData.farmerNote || 'Khách đặt qua TRẠM VƯỜN SỐ'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return orderId;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const statusMap: Record<OrderStatus, string> = {
      pending_harvest: 'Đang chờ hái tại vườn',
      shipping: 'Đang giao chành xe TP.HCM',
      completed: 'Đã hoàn thành giao hàng'
    };

    setOrders(prev =>
      prev.map(o =>
        o.orderId === orderId
          ? { ...o, status: newStatus, statusText: statusMap[newStatus] }
          : o
      )
    );
    showNotification(`Đã cập nhật đơn #${orderId}: ${statusMap[newStatus]}`);
  };

  const likeLiveStream = (liveId: string) => {
    setLiveStreams(prev =>
      prev.map(l => (l.id === liveId ? { ...l, likes: l.likes + 1 } : l))
    );
  };

  const addLiveComment = (liveId: string, text: string, user = 'Bạn (Khách hàng)') => {
    setLiveStreams(prev =>
      prev.map(l => {
        if (l.id === liveId) {
          const comments = l.mockComments || [];
          return {
            ...l,
            mockComments: [...comments, { user, text, time: 'Vừa xong' }]
          };
        }
        return l;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        activeScreen,
        setActiveScreen,
        selectedProductId,
        setSelectedProductId,
        openProductDetail,
        qrModalProduct,
        setQrModalProduct,
        tourModalOpen,
        setTourModalOpen,
        currentUser,
        users,
        login,
        quickLogin,
        logout,
        registerUser,
        updateUserStatus,
        deleteUser,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartCount,
        products,
        addProduct,
        orders,
        createOrder,
        updateOrderStatus,
        garden,
        youthSupporters,
        liveStreams,
        likeLiveStream,
        addLiveComment,
        notification,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
