import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import {
  Sparkles,
  Camera,
  Upload,
  CheckCircle2,
  Trash2,
  Star,
  MapPin,
  Truck,
  QrCode,
  Mic,
  MicOff,
  Store,
  ShieldCheck,
  Eye,
  Plus,
  RefreshCw,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

interface SampleFruit {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  star: number;
  origin: string;
  url: string;
  desc: string;
}

export const QuickPost: React.FC = () => {
  const { addProduct, setActiveScreen, showNotification, openProductDetail, currentRole } = useApp();

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [name, setName] = useState('Sầu riêng Ri6 Long Khánh Cơm Vàng Hạt Lép (Chín Cây Tại Vườn Ba Tư)');
  const [price, setPrice] = useState<number>(120000);
  const [unit, setUnit] = useState('kg');
  const [category, setCategory] = useState('Trái cây tươi');
  const [star, setStar] = useState<number>(4);
  const [minOrder, setMinOrder] = useState<number>(2);
  const [inStock, setInStock] = useState<number>(350);
  const [gardenName, setGardenName] = useState('Nhà vườn Ba Tư');
  const [originWard, setOriginWard] = useState('Phường Suối Tre, TP. Long Khánh, Đồng Nai');
  const [standard, setStandard] = useState('VietGAP & Canh tác sinh học');
  const [coldShipping, setColdShipping] = useState(true);
  const [description, setDescription] = useState(
    'Sầu riêng Ri6 chính gốc đất đỏ bazan Suối Tre (Long Khánh, Đồng Nai). Cây trồng trên 15 năm tuổi, cơm vàng ươm, dẻo béo đậm đà, hạt lép đặc trưng. Trái được cắt già đúng độ, bao đổi 1-1 nếu sượng hoặc sáp, đóng thùng xốp thoáng khí chuyển xe lạnh giao trong ngày về TP.HCM.'
  );

  // Multi-image list
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
  ]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // AI Generation States
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiTone, setAiTone] = useState<'standard' | 'tasty' | 'simple'>('standard');

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [voiceNote, setVoiceNote] = useState('');

  // Sample Fruit Library
  const sampleFruits: SampleFruit[] = [
    {
      id: 'durian',
      name: 'Sầu riêng Ri6 Long Khánh Cơm Vàng Hạt Lép (Chín Cây Tại Vườn Ba Tư)',
      category: 'Trái cây tươi',
      price: 120000,
      unit: 'kg',
      star: 4,
      origin: 'Nhà vườn Ba Tư, Phường Suối Tre, TP. Long Khánh',
      url: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&auto=format&fit=crop&q=80',
      desc: 'Sầu riêng Ri6 chính gốc đất đỏ bazan Suối Tre (Long Khánh, Đồng Nai). Cây trồng trên 15 năm tuổi, cơm vàng ươm, dẻo béo đậm đà, hạt lép đặc trưng. Cắt hái già tại cây, bao đổi 1-1 nếu sượng.'
    },
    {
      id: 'rambutan',
      name: 'Chôm Chôm Nhãn Bình Lộc Tươi Cắt Cành (Ngọt Giòn Tróc Hạt)',
      category: 'Trái cây tươi',
      price: 45000,
      unit: 'kg',
      star: 4,
      origin: 'Vườn Chú Sáu Dân, Xã Bình Lộc, TP. Long Khánh',
      url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80',
      desc: 'Chôm chôm nhãn Bình Lộc vỏ mỏng, râu ngắn hơi ngả vàng, cơm dày giòn ngọt thanh, tróc hạt hoàn toàn. Thu hái sáng sớm tinh mơ, chuyển giao nhanh trong ngày về TP.HCM.'
    },
    {
      id: 'pomelo',
      name: 'Bưởi Đường Lá Cam Tân Triều (Chính Gốc Làng Bưởi Vĩnh Cửu)',
      category: 'Trái cây tươi',
      price: 65000,
      unit: 'trái',
      star: 5,
      origin: 'HTX Bưởi Tân Triều, Xã Tân Triều, H. Vĩnh Cửu',
      url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
      desc: 'Bưởi đường lá cam Tân Triều nức tiếng với tép bưởi mọng nước óng ả, vị ngọt hậu thanh tao không the đắng. Canh tác ven sông Đồng Nai màu mỡ đạt chuẩn VietGAP xuất khẩu.'
    },
    {
      id: 'cashew',
      name: 'Hạt Điều Rang Củi Vỏ Lụa Đồng Nai (Thơm Bùi Giòn Rụm)',
      category: 'Hạt & Cà phê',
      price: 135000,
      unit: 'hộp 500g',
      star: 4,
      origin: 'HTX Điều Vàng Hàng Gòn, TP. Long Khánh',
      url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop&q=80',
      desc: 'Hạt điều giống thuần Đồng Nai loại A tuyển chọn hạt mẩy đều. Rang củi truyền thống giữ trọn vị thơm ngậy, không hóa chất bảo quản, đóng hộp hút chân không cao cấp.'
    },
    {
      id: 'jackfruit',
      name: 'Mít Thái Nghệ Siêu Sớm Chín Cây (Múi Dày Ngọt Lịm)',
      category: 'Trái cây tươi',
      price: 35000,
      unit: 'kg',
      star: 3,
      origin: 'Vườn Chú Năm, Xã Bảo Quang, TP. Long Khánh',
      url: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80',
      desc: 'Mít Thái nghệ thu hoạch đúng độ ngọt tại vườn Bảo Quang. Múi to dày vàng sẫm, ít xơ, giòn ngọt tự nhiên, không ngâm thuốc ép chín.'
    }
  ];

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newUrl = reader.result;
        setImages(prev => [newUrl, ...prev.slice(0, 3)]);
        setActiveImageIndex(0);
        showNotification('📸 Đã tải ảnh thực tế thành công! Bạn có thể ấn AI viết mô tả.');
      }
    };
    reader.readAsDataURL(file);
  };

  // Select sample fruit
  const handleSelectSample = (fruit: SampleFruit) => {
    setName(fruit.name);
    setCategory(fruit.category);
    setPrice(fruit.price);
    setUnit(fruit.unit);
    setStar(fruit.star);
    setDescription(fruit.desc);
    setImages(prev => [fruit.url, ...prev.filter(u => u !== fruit.url).slice(0, 3)]);
    setActiveImageIndex(0);
    showNotification(`Đã áp dụng mẫu ảnh & thông tin: ${fruit.name}`);
  };

  // AI Description Generator based on photo & category
  const handleGenerateAiContent = () => {
    setAiGenerating(true);
    showNotification('✨ AI đang phân tích ảnh quả, màu sắc cơm quả và thổ nhưỡng Đồng Nai...');

    setTimeout(() => {
      let generatedName = name;
      let generatedDesc = '';
      const currentImg = images[activeImageIndex] || images[0];

      // Smart classification based on keywords in current name or image
      const isDurian = name.toLowerCase().includes('sầu riêng') || currentImg.includes('587393855524');
      const isRambutan = name.toLowerCase().includes('chôm chôm') || currentImg.includes('528825871115');
      const isPomelo = name.toLowerCase().includes('bưởi') || currentImg.includes('615485290382');
      const isCashew = name.toLowerCase().includes('điều') || currentImg.includes('599599810769');

      if (isDurian) {
        generatedName = 'Sầu Riêng Ri6 Long Khánh Cơm Vàng Hạt Lép (Chín Cây Tại Vườn Ba Tư)';
        if (aiTone === 'standard') {
          generatedDesc = `Sầu riêng Ri6 chính gốc đất đỏ bazan Suối Tre (Long Khánh, Đồng Nai) đạt chứng nhận OCOP ${star} sao. Cây được canh tác theo hướng sinh học hữu cơ, tưới nước suối ngầm tự nhiên. Trái được cắt hái khi đã già đủ độ, cơm vàng ráo mịn, vị ngọt đậm béo ngậy đặc trưng. Mã QR gắn trên từng trái cho phép người tiêu dùng tra cứu đầy đủ nhật ký ngày cắt và hộ nhà vườn phụ trách. Cam kết 1 đổi 1 nếu sượng, chuyển xe lạnh giao trong ngày về TP.HCM.`;
        } else if (aiTone === 'tasty') {
          generatedDesc = `Đặc sản sầu riêng Ri6 Long Khánh béo ngậy nức lòng người sành ăn! Từng múi sầu vàng óng ánh như mật, cơm dẻo quánh, hạt lép kẹp, thơm lừng góc bếp ngay khi vừa khui. Trái chín cây tự nhiên hái sáng sớm tại vườn Chú Ba Tư, không một giọt thuốc ép chín. Khách TP.HCM đặt sáng là trưa có xe lạnh giao tận cổng, mở thùng thưởng thức mát lành như vừa hái tại gốc!`;
        } else {
          generatedDesc = `Sầu riêng Ri6 vườn Chú Ba Tư ở Long Khánh. Cơm vàng hạt lép, ngọt béo tự nhiên, cắt già chín cây không xịt thuốc. Bao ăn ngon 1 đổi 1, chuyển xe lạnh về Sài Gòn trong ngày.`;
        }
      } else if (isRambutan) {
        generatedName = 'Chôm Chôm Nhãn Bình Lộc Tươi Cắt Cành (Ngọt Giòn Tróc Hạt)';
        generatedDesc = `Chôm chôm nhãn Bình Lộc (Long Khánh) trứ danh với trái nhỏ gọn, vỏ vàng ửng đỏ, gai ngắn. Cơm dày giòn sần sật, vị ngọt thanh mát lịm và hạt tróc sạch 100%. Nông sản thu hoạch theo tiêu chuẩn VietGAP, đóng thùng chuyển hỏa tốc xe lạnh về TP.HCM giữ trọn độ tươi giòn như vừa hái trên cành.`;
      } else if (isPomelo) {
        generatedName = 'Bưởi Đường Lá Cam Tân Triều (Chính Gốc Làng Bưởi Vĩnh Cửu)';
        generatedDesc = `Bưởi đường lá cam Tân Triều nức tiếng gần xa nhờ phù sa màu mỡ ven sông Đồng Nai. Quả vỏ mỏng xanh mướt, tép bưởi mọng nước ánh vàng, vị ngọt hậu sâu lắng không hề the đắng. Sản phẩm OCOP ${star} sao tiêu biểu của làng bưởi cổ truyền Tân Triều, lưu giữ trọn vẹn hương vị tinh túy miệt vườn Nam Bộ.`;
      } else if (isCashew) {
        generatedName = 'Hạt Điều Rang Củi Vỏ Lụa Đồng Nai (Thơm Bùi Giòn Rụm)';
        generatedDesc = `Hạt điều rang củi vỏ lụa truyền thống từ vùng đất Hàng Gòn (Đồng Nai). Từng hạt điều căng mẩy, giòn rụm, béo ngậy tự nhiên hòa quyện chút vị mặn nhẹ của muối hầm. Đóng hộp kín hút chân không, thích hợp làm quà biếu sức khỏe đạt chuẩn OCOP 4 sao.`;
      } else {
        generatedDesc = `Nông sản tươi sạch tiêu chuẩn OCOP ${star} sao, thu hoạch trực tiếp tại các nhà vườn Đồng Nai. Được đoàn viên thanh niên kiểm định nguồn gốc, dán tem mã QR truy xuất và hỗ trợ đóng gói bảo quản xe lạnh giao đến người tiêu dùng TP.HCM trong ngày.`;
      }

      setName(generatedName);
      setDescription(generatedDesc);
      setAiGenerating(false);
      showNotification('🎉 AI đã phân tích ảnh và hoàn thành mô tả chuẩn OCOP!');
    }, 1200);
  };

  // Voice recognition simulation / Web Speech API
  const handleToggleVoice = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsListening(true);
      showNotification('Đang lắng nghe giọng nói của bác nông dân...');
      setTimeout(() => {
        setIsListening(false);
        const spoken = 'Vườn chú Ba Tư vừa tuyển hái được 50 ký sầu riêng Ri6 cơm vàng bao ngọt, bán giá một trăm hai mươi ngàn một ký, khách đặt giao sáng mai về Sài Gòn.';
        setVoiceNote(spoken);
        setName('Sầu riêng Ri6 Long Khánh Vừa Cắt Tại Vườn Ba Tư');
        setPrice(120000);
        showNotification('Đã nhận diện giọng nói và tự động điền giá!');
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
        showNotification('Đang nghe tiếng Việt... Bác cứ nói tên quả và giá tiền!');
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        setVoiceNote(spoken);
        setIsListening(false);

        if (spoken.toLowerCase().includes('sầu riêng')) {
          setName('Sầu riêng Ri6 Cơm Vàng Long Khánh (Cắt Già Tại Cây)');
          setPrice(120000);
        } else if (spoken.toLowerCase().includes('chôm chôm')) {
          setName('Chôm chôm nhãn Bình Lộc Vừa Hái');
          setPrice(45000);
        } else if (spoken.toLowerCase().includes('bưởi')) {
          setName('Bưởi đường lá cam Tân Triều');
          setPrice(65000);
        }
        showNotification('Đã nhận diện giọng nói và điền thông tin sản phẩm!');
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Submit product creation
  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showNotification('Vui lòng điền tên sản phẩm!');
      return;
    }

    const heroImage = images[activeImageIndex] || images[0];

    const newId = addProduct({
      name,
      price: Number(price),
      unit,
      category,
      star,
      minOrder,
      inStock,
      origin: `${gardenName}, ${originWard}`,
      image: heroImage,
      description: description || 'Đặc sản chính gốc nhà vườn Đồng Nai đạt chuẩn OCOP.'
    });

    // Navigate to product detail or products list
    if (newId) {
      openProductDetail(newId);
    } else {
      setActiveScreen('products');
    }
  };

  const activeImage = images[activeImageIndex] || images[0];

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto px-2 sm:px-4">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#EAF7E9] text-[#269B55] text-xs font-bold px-3 py-1 rounded-full mb-1.5 border border-green-200">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>CÔNG CỤ SỐ HÓA NÔNG SẢN • ĐOÀN THANH NIÊN & NHÀ VƯỜN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#25352B] tracking-tight">
            Thêm Sản Phẩm Nông Sản OCOP Mới
          </h1>
          <p className="text-xs sm:text-sm text-[#718078] mt-1">
            Đăng ảnh thật tại vườn, sử dụng Trí Tuệ Nhân Tạo (AI) phân tích hình ảnh để tự động viết nội dung chuẩn OCOP cuốn hút.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            type="button"
            onClick={() => setActiveScreen('products')}
            label="Xem Danh Sách Sàn"
            icon="pi pi-list"
            outlined
            className="p-button-secondary text-xs font-bold"
          />
        </div>
      </div>

      {/* Main Grid: Left (Form & AI & Upload) + Right (Live Preview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =====================================================================
            CỘT TRÁI (7 COLS): GIAO DIỆN ĐĂNG ẢNH, AI VIẾT MÔ TẢ & THÔNG TIN FORM
            ===================================================================== */}
        <div className="lg:col-span-7 space-y-6">

          {/* 1. KHU VỰC ĐĂNG ẢNH SẢN PHẨM (IMAGE UPLOAD & GALLERY) */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EAF7E9] text-[#269B55] flex items-center justify-center font-bold">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#25352B]">
                    1. Đăng Ảnh Thực Tế Tại Vườn
                  </h3>
                  <span className="text-[11px] text-[#718078]">
                    Tải ảnh từ máy, chụp trực tiếp hoặc chọn nhanh mẫu quả có sẵn
                  </span>
                </div>
              </div>
              <span className="text-xs bg-[#FAFCF8] text-[#269B55] font-bold px-2.5 py-1 rounded-full border border-green-200">
                {images.length}/4 Ảnh
              </span>
            </div>

            {/* Hidden Real File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            {/* Big Dropzone / Upload Trigger */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-[#269B55] rounded-2xl p-6 sm:p-8 text-center cursor-pointer bg-[#FAFCF8] hover:bg-[#EAF7E9]/40 transition group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#EAF7E9] text-[#269B55] group-hover:scale-110 transition flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Upload className="w-7 h-7" />
              </div>
              <strong className="block text-sm sm:text-base text-[#25352B] group-hover:text-[#269B55] transition">
                Bấm để Chọn Ảnh Từ Thiết Bị hoặc Chụp Ngay Tại Vườn
              </strong>
              <p className="text-xs text-[#718078] mt-1 max-w-md mx-auto">
                Hỗ trợ định dạng JPG, PNG, WEBP. Ảnh rõ nét quả chín cây sẽ giúp AI nhận diện và tạo mô tả chính xác nhất.
              </p>
            </div>

            {/* Current Images Gallery Bar */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#25352B]">
                Bộ sưu tập ảnh sản phẩm ({images.length} ảnh):
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition group ${
                      activeImageIndex === idx
                        ? 'border-[#269B55] ring-2 ring-[#269B55]/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={imgUrl} alt={`Ảnh ${idx + 1}`} className="w-full h-full object-cover" />
                    
                    {/* Cover badge */}
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 bg-[#269B55] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Ảnh bìa
                      </span>
                    )}

                    {/* Delete button (if more than 1 image) */}
                    {images.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImages(prev => prev.filter((_, i) => i !== idx));
                          if (activeImageIndex >= images.length - 1) setActiveImageIndex(0);
                          showNotification('Đã xóa 1 ảnh khỏi bộ sưu tập');
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
                        title="Xóa ảnh này"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Sample Selector for One-Click Testing */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <span className="text-xs font-bold text-[#718078]">
                Hoặc chọn nhanh ảnh mẫu nông sản đặc sản Long Khánh / Tân Triều:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {sampleFruits.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectSample(item)}
                    className="p-1.5 rounded-xl border border-gray-200 hover:border-[#269B55] bg-white hover:bg-[#EAF7E9]/40 transition text-left flex flex-col gap-1 group"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                      <span className="absolute bottom-0.5 left-0.5 bg-black/60 text-white text-[8px] font-bold px-1 rounded">
                        {item.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#25352B] line-clamp-1">
                      {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. KHU VỰC AI PHÂN TÍCH ẢNH & VIẾT NỘI DUNG MÔ TẢ (AI VISION WRITER) */}
          <div className="bg-[#EAF7E9] rounded-3xl p-5 sm:p-6 border border-green-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#269B55] text-white flex items-center justify-center font-bold shadow-xs">
                  <Sparkles className="w-4 h-4 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#25352B]">
                    2. AI Phân Tích Ảnh & Viết Mô Tả Tự Động
                  </h3>
                  <span className="text-[11px] text-[#718078]">
                    Công nghệ Trí Tuệ Nhân Tạo hỗ trợ nhà vườn viết bài tiếp thị nông sản đạt chuẩn OCOP
                  </span>
                </div>
              </div>

              {/* Tone of voice selector */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-green-200 text-xs">
                <button
                  type="button"
                  onClick={() => setAiTone('standard')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                    aiTone === 'standard' ? 'bg-[#269B55] text-white shadow-xs' : 'text-[#718078] hover:text-[#25352B]'
                  }`}
                >
                  🌿 Chuẩn OCOP
                </button>
                <button
                  type="button"
                  onClick={() => setAiTone('tasty')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                    aiTone === 'tasty' ? 'bg-[#269B55] text-white shadow-xs' : 'text-[#718078] hover:text-[#25352B]'
                  }`}
                >
                  🔥 Hấp dẫn
                </button>
                <button
                  type="button"
                  onClick={() => setAiTone('simple')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                    aiTone === 'simple' ? 'bg-[#269B55] text-white shadow-xs' : 'text-[#718078] hover:text-[#25352B]'
                  }`}
                >
                  👴 Giản dị
                </button>
              </div>
            </div>

            {/* AI Action Button */}
            <div className="bg-white p-4 rounded-2xl border border-green-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-[#25352B]">
                  AI sẽ nhận diện hình ảnh đang chọn <em>({images.length} ảnh)</em>, phân tích độ chín quả và tạo văn bản giới thiệu nguồn gốc, thổ nhưỡng bazan cùng cam kết chất lượng.
                </p>

                <Button
                  type="button"
                  onClick={handleGenerateAiContent}
                  loading={aiGenerating}
                  icon="pi pi-sparkles"
                  label={aiGenerating ? 'AI đang phân tích ảnh...' : 'AI Viết Mô Tả Theo Ảnh'}
                  className="p-button-success font-bold text-xs whitespace-nowrap shadow-sm self-start sm:self-auto"
                />
              </div>

              {/* Description textarea */}
              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Nội dung mô tả sản phẩm (Bạn có thể tự do chỉnh sửa):
                </label>
                <InputTextarea
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Bấm nút 'AI Viết Mô Tả Theo Ảnh' ở trên để tự động tạo nội dung hoặc gõ nội dung tại đây..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-300 focus:border-[#269B55] outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. THÔNG TIN CHI TIẾT SẢN PHẨM (FORM DATA) */}
          <form onSubmit={handlePublish} className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-soft space-y-5">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAF7E9] text-[#269B55] flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#25352B]">
                  3. Thông Tin Chi Tiết & Giá Bán
                </h3>
                <span className="text-[11px] text-[#718078]">
                  Điền đầy đủ để người tiêu dùng TP.HCM dễ dàng tra cứu và chốt đơn
                </span>
              </div>
            </div>

            {/* Field: Product Name with Voice Assist */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#25352B]">
                  Tên sản phẩm nông sản: <span className="text-red-500">*</span>
                </label>
                
                {/* Voice button */}
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition border ${
                    isListening
                      ? 'bg-red-600 text-white border-red-700 animate-pulse'
                      : 'bg-[#FAFCF8] text-[#269B55] border-green-300 hover:bg-[#EAF7E9]'
                  }`}
                  title="Nói tiếng Việt để điền tên sản phẩm"
                >
                  {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                  <span>{isListening ? 'Đang nghe...' : 'Nói tên quả'}</span>
                </button>
              </div>

              <InputText
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ví dụ: Sầu riêng Ri6 Long Khánh, Chôm chôm nhãn Bình Lộc..."
                className="w-full text-xs sm:text-sm font-semibold p-2.5 rounded-xl border border-gray-300 focus:border-[#269B55]"
                required
              />
              {voiceNote && (
                <p className="text-[11px] text-[#718078] italic mt-1">
                  Đã nhận diện giọng nói: "{voiceNote}"
                </p>
              )}
            </div>

            {/* Field: Category & OCOP Star */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Danh mục nông sản:
                </label>
                <Dropdown
                  value={category}
                  onChange={e => setCategory(e.value)}
                  options={[
                    { label: 'Trái cây tươi đặc sản', value: 'Trái cây tươi' },
                    { label: 'Hạt & Cà phê Đồng Nai', value: 'Hạt & Cà phê' },
                    { label: 'Nông sản OCOP chế biến', value: 'Đặc sản chế biến' },
                    { label: 'Rau củ quả sạch', value: 'Rau củ sạch' }
                  ]}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Xếp hạng OCOP tỉnh:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[3, 4, 5].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStar(s)}
                      className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border transition ${
                        star === s
                          ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400'
                          : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{s} Sao</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Field: Price & Unit & MinOrder & InStock */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Giá bán (VNĐ): <span className="text-red-500">*</span>
                </label>
                <InputNumber
                  value={price}
                  onValueChange={e => setPrice(e.value ?? 0)}
                  mode="currency"
                  currency="VND"
                  locale="vi-VN"
                  className="w-full text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Đơn vị tính:
                </label>
                <Dropdown
                  value={unit}
                  onChange={e => setUnit(e.value)}
                  options={[
                    { label: 'kg (kilôgam)', value: 'kg' },
                    { label: 'trái', value: 'trái' },
                    { label: 'hộp 500g', value: 'hộp 500g' },
                    { label: 'thùng 5kg', value: 'thùng 5kg' },
                    { label: 'túi 1kg', value: 'túi 1kg' }
                  ]}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Mua tối thiểu:
                </label>
                <InputNumber
                  value={minOrder}
                  onValueChange={e => setMinOrder(e.value ?? 1)}
                  min={1}
                  max={50}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Tồn vườn (ước tính):
                </label>
                <InputNumber
                  value={inStock}
                  onValueChange={e => setInStock(e.value ?? 100)}
                  min={10}
                  className="w-full text-xs"
                />
              </div>
            </div>

            {/* Field: Garden Name & Origin Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Tên nhà vườn / Hộ sản xuất:
                </label>
                <InputText
                  value={gardenName}
                  onChange={e => setGardenName(e.target.value)}
                  className="w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25352B] mb-1">
                  Địa bàn (Phường/Xã):
                </label>
                <InputText
                  value={originWard}
                  onChange={e => setOriginWard(e.target.value)}
                  className="w-full text-xs"
                />
              </div>
            </div>

            {/* Field: Farming Standard & Cold Delivery Checkbox */}
            <div className="p-4 rounded-2xl bg-[#FAFCF8] border border-gray-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#25352B] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#269B55]" />
                  <span>Tiêu chuẩn canh tác & Minh bạch:</span>
                </span>
                <span className="text-[11px] font-bold text-[#269B55]">
                  Tự động cấp mã QR định danh
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InputText
                  value={standard}
                  onChange={e => setStandard(e.target.value)}
                  placeholder="VietGAP / GlobalGAP / Hữu cơ"
                  className="w-full text-xs"
                />

                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-xl border border-gray-200 hover:border-green-300">
                  <input
                    type="checkbox"
                    checked={coldShipping}
                    onChange={e => setColdShipping(e.target.checked)}
                    className="w-4 h-4 text-[#269B55] rounded accent-[#269B55]"
                  />
                  <span className="text-xs font-bold text-[#25352B] flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#269B55]" />
                    <span>Hỗ trợ chuyển xe lạnh 3-4h về TP.HCM</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-center gap-3">
              <Button
                type="submit"
                icon="pi pi-check-circle"
                label="Đăng Bán Ngay Lên TRẠM VƯỜN SỐ (+2 Giờ Đoàn Viên)"
                className="w-full sm:flex-1 p-button-success p-button-lg font-black text-sm sm:text-base shadow-sm"
              />
              <Button
                type="button"
                onClick={() => {
                  showNotification('💾 Đã lưu bản nháp sản phẩm thành công!');
                }}
                label="Lưu Bản Nháp"
                icon="pi pi-save"
                outlined
                className="w-full sm:w-auto p-button-secondary text-xs font-bold"
              />
            </div>
          </form>

        </div>

        {/* =====================================================================
            CỘT PHẢI (5 COLS): XEM TRƯỚC SẢN PHẨM TRÊN SÀN (LIVE PREVIEW CARD)
            ===================================================================== */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          
          {/* Header pill */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#718078] flex items-center gap-1.5 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-[#269B55]" />
              <span>Xem trước hiển thị thực tế</span>
            </span>
            <span className="text-[10px] bg-green-100 text-green-900 font-bold px-2 py-0.5 rounded-full">
              Khách mua sẽ thấy
            </span>
          </div>

          {/* Product Card Live Preview */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-soft flex flex-col">
            {/* Image Preview Container */}
            <div className="relative aspect-[4/3] bg-black overflow-hidden">
              <img
                src={activeImage}
                alt={name}
                className="w-full h-full object-cover transition duration-300"
              />
              
              {/* OCOP Star Badge */}
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow flex items-center gap-1 border border-amber-200">
                <span className="flex text-amber-500">
                  {Array.from({ length: star }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-500" />
                  ))}
                </span>
                <span className="text-[10px] font-black text-[#25352B] ml-0.5">
                  OCOP {star} SAO
                </span>
              </div>

              {/* QR Code Tag */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                <QrCode className="w-3 h-3 text-amber-400" />
                <span>QR Truy Xuất Gốc Cây</span>
              </div>

              {/* Cold shipping badge */}
              {coldShipping && (
                <div className="absolute bottom-3 right-3 bg-[#269B55] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                  <Truck className="w-3 h-3" />
                  <span>Xe lạnh TP.HCM</span>
                </div>
              )}
            </div>

            {/* Card Body */}
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-1 text-xs text-[#718078]">
                <MapPin className="w-3.5 h-3.5 text-[#269B55] shrink-0" />
                <span className="truncate">{originWard}</span>
              </div>

              <h3 className="font-bold text-base text-[#25352B] line-clamp-2 leading-snug">
                {name || 'Chưa có tên sản phẩm'}
              </h3>

              <p className="text-xs text-[#718078] line-clamp-3 leading-relaxed">
                {description || 'Chưa có mô tả sản phẩm. Hãy dùng nút AI viết tự động bên cạnh.'}
              </p>

              {/* Price & Unit */}
              <div className="pt-3 border-t border-dashed border-gray-200 flex items-baseline justify-between">
                <div>
                  <span className="font-black text-xl text-[#269B55]">
                    {price ? price.toLocaleString('vi-VN') : 0} đ
                  </span>
                  <span className="text-xs text-[#718078] font-medium"> / {unit}</span>
                </div>
                <span className="text-[11px] text-[#718078]">
                  Tối thiểu: <strong>{minOrder} {unit}</strong>
                </span>
              </div>

              {/* Simulated Buyer Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="py-2.5 rounded-xl border border-[#269B55] text-[#269B55] text-xs font-bold text-center bg-[#EAF7E9]/30">
                  Quét Mã QR
                </div>
                <div className="py-2.5 rounded-xl bg-[#269B55] text-white text-xs font-bold text-center shadow-xs">
                  + Thêm Vào Giỏ
                </div>
              </div>
            </div>

            {/* Card Footer: Garden & Youth Bridge */}
            <div className="bg-[#FAFCF8] border-t border-gray-100 px-4 py-2.5 text-xs text-[#718078] flex items-center justify-between">
              <span className="flex items-center gap-1 font-bold text-[#25352B]">
                <Store className="w-3.5 h-3.5 text-[#269B55]" />
                <span className="truncate max-w-[130px]">{gardenName}</span>
              </span>
              <span className="text-[#269B55] font-bold text-[11px]">
                🤝 Hỗ trợ bởi Đoàn viên
              </span>
            </div>
          </div>

          {/* Youth Bridge Callout */}
          <div className="p-4 rounded-2xl bg-[#EAF7E9] border border-green-200 text-xs text-[#25352B] space-y-1.5">
            <p className="font-bold flex items-center gap-1 text-[#269B55]">
              <Sparkles className="w-4 h-4" />
              <span>Ý nghĩa tiếp sức của Đoàn viên Đồng Nai:</span>
            </p>
            <p className="text-[#718078] leading-relaxed">
              Nhà vườn lớn tuổi chỉ cần chụp hình quả hoặc đọc giá. Đoàn viên thanh niên kích hoạt AI hoàn thiện hồ sơ sản phẩm, dán tem QR số hóa và niêm yết lên sàn, mang lại giá trị thực tế cho bà con nông dân.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
