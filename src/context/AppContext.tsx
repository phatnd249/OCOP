import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
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

interface AppContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  qrModalProduct: Product | null;
  setQrModalProduct: (product: Product | null) => void;
  tourModalOpen: boolean;
  setTourModalOpen: (open: boolean) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (productId: string, qty?: number) => void;
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
  // State
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('sp-01');
  const [qrModalProduct, setQrModalProduct] = useState<Product | null>(null);
  const [tourModalOpen, setTourModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

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
    if (role === 'farmer') {
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

  const addToCart = (productId: string, qty = 1) => {
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

    showNotification(`🎉 Đăng thành công "${newProd.name}" lên Chợ OCOP! (+2 giờ tình nguyện)`);
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
      farmerNote: orderData.farmerNote || 'Khách đặt qua Chợ OCOP Thanh niên'
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
        qrModalProduct,
        setQrModalProduct,
        tourModalOpen,
        setTourModalOpen,
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
