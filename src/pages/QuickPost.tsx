import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Sparkles,
  Camera,
  Upload,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';

export const QuickPost: React.FC = () => {
  const { addProduct, setActiveScreen, showNotification } = useApp();

  const [name, setName] = useState('Sầu riêng Ri6 Cơm Vàng Long Khánh (Cắt Tại Vườn)');
  const [price, setPrice] = useState(120000);
  const [unit, setUnit] = useState('kg');
  const [category, setCategory] = useState('Trái cây tươi đặc sản');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&auto=format&fit=crop&q=80');

  // Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState(
    'Vườn chú Ba Tư vừa tuyển hái được 50 ký sầu riêng Ri6 cơm vàng bao ngọt, bán giá một trăm hai mươi ngàn một ký, khách đặt giao sáng mai về Sài Gòn ăn liền ngon lắm.'
  );

  // Sample Fruit Images from Ba Tu garden
  const sampleImages = [
    { url: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&auto=format&fit=crop&q=80', label: 'Sầu riêng Ri6' },
    { url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=800&auto=format&fit=crop&q=80', label: 'Chôm chôm nhãn' },
    { url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80', label: 'Bưởi Tân Triều' },
    { url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&auto=format&fit=crop&q=80', label: 'Hạt điều rang củi' }
  ];

  // Speech Recognition Trigger
  const handleToggleListening = () => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback demo simulation
      setIsListening(true);
      showNotification('Đang lắng nghe giọng nói của Chú Ba Tư...');
      setTimeout(() => {
        setIsListening(false);
        const demoText = 'Vườn chú Ba Tư vừa cắt thêm 30 ký sầu riêng Ri6 già cây, múi to vàng óng, bán chín mươi lăm ngàn một ký chuyển về Sài Gòn.';
        setTranscript(demoText);
        setName('Sầu riêng Ri6 Già Cây Cắt Sớm Vườn Ba Tư');
        setPrice(95000);
        showNotification('Đã nhận diện giọng nói thành công và tự động điền form!');
      }, 2500);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        showNotification('Đang lắng nghe tiếng Việt... Chú Ba Tư cứ nói tự nhiên!');
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        setTranscript(spoken);
        setIsListening(false);

        // Simple keyword extraction for form
        if (spoken.toLowerCase().includes('sầu riêng')) {
          setName('Sầu riêng Ri6 Long Khánh Vừa Hái');
          setPrice(120000);
        } else if (spoken.toLowerCase().includes('chôm chôm')) {
          setName('Chôm chôm nhãn Long Khánh Tươi Ngon');
          setPrice(45000);
        }
        showNotification('Đã nhận diện giọng nói và tự động điền thông tin!');
      };

      recognition.onerror = () => {
        setIsListening(false);
        showNotification('Không bắt được giọng nói, đã áp dụng câu nói mẫu của chú Ba Tư');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // AI Description Generator (Bonus Feature 1)
  const handleGenerateAiDescription = () => {
    showNotification('✨ Trí tuệ nhân tạo (AI) đang phân tích ảnh và giọng nói...');
    setTimeout(() => {
      const aiGeneratedText = `Trái cây đặc sản chính gốc Nhà vườn Chú Ba Tư (Long Khánh, Đồng Nai). Được chăm bón 100% bằng phân vi sinh hữu cơ trên vùng đất đỏ bazan màu mỡ, thu hái lúc sáng sớm khi quả vừa đạt độ ngọt thanh tự nhiên nhất. Cơm vàng óng, béo ngậy đậm đà, hạt lép đặc trưng. Được đoàn viên thanh niên kiểm định dán tem mã QR truy xuất nguồn gốc OCOP 4 sao, bao ăn 1 đổi 1 giao hỏa tốc xe lạnh về TP.HCM trong 4 giờ.`;
      setDescription(aiGeneratedText);
      showNotification('🎉 AI đã tạo xong mô tả sản phẩm chuẩn OCOP!');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name,
      price: Number(price),
      unit,
      category,
      image: selectedImage,
      description: description || 'Đặc sản chính gốc Nhà vườn Ba Tư đạt chuẩn OCOP 4 sao tỉnh Đồng Nai.'
    });

    setActiveScreen('product_detail');
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-900 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Award className="w-3.5 h-3.5 text-sun" />
            <span>CÔNG CỤ SỐ HÓA NÔNG SẢN CHO ĐOÀN VIÊN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-ink">
            Đăng Nhanh Nông Sản Bằng Ảnh & Giọng Nói
          </h1>
          <p className="text-xs text-gray-500">
            Hỗ trợ nhà vườn tạo sản phẩm mới bằng công nghệ giọng nói tiếng Việt và AI viết mô tả
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Speech recognition & Form */}
        <div className="space-y-6">
          {/* Voice Input Zone */}
          <div className="bg-white rounded-3xl p-6 border-2 border-green-300 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-green-900 flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-700" />
                <span>Nhận Diện Giọng Nói Tiếng Việt (Web Speech API)</span>
              </h3>
              <span className="text-xs bg-cream text-earth font-bold px-2.5 py-1 rounded-full border border-green-200">
                Cho người lớn tuổi
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Chú Ba Tư chỉ cần bấm vào nút tròn micro bên dưới và nói to: <em>"Hái được sầu riêng Ri6, giá một trăm hai mươi ngàn một ký..."</em>
            </p>

            {/* Mic Button */}
            <div
              onClick={handleToggleListening}
              className={`p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition text-center select-none ${
                isListening
                  ? 'border-red-500 bg-red-50 animate-pulse'
                  : 'border-green-400 bg-green-50/50 hover:bg-green-100/50'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform ${
                  isListening ? 'bg-red-600 scale-110' : 'bg-green-700 hover:scale-105'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 animate-spin" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </div>
              <strong className="mt-3 text-sm text-green-950">
                {isListening ? 'Đang lắng nghe giọng nói...' : 'Bấm vào đây để Bắt đầu Thu âm'}
              </strong>
              <span className="text-[11px] text-gray-500 mt-1">
                (Hệ thống tự động chuyển thành văn bản và điền vào form bên dưới)
              </span>
            </div>

            {/* Transcript preview */}
            <div className="p-3.5 bg-gray-50 rounded-xl border text-xs text-gray-700 italic">
              <strong>Văn bản vừa thu âm:</strong> "{transcript}"
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-4">
            <h3 className="font-bold text-base text-ink">
              Thông Tin Số Hóa Nông Sản
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Tên sản phẩm nông sản:
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Giá bán (VNĐ):
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(Number(e.target.value))}
                  className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Đơn vị tính:
                </label>
                <select
                  value={unit}
                  onChange={e => setUnit(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="kg">kg (kilôgam)</option>
                  <option value="hộp 500g">hộp 500g</option>
                  <option value="trái">trái</option>
                  <option value="thùng 5kg">thùng 5kg</option>
                </select>
              </div>
            </div>

            {/* AI Generator button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  Mô tả sản phẩm chuẩn OCOP:
                </label>
                <button
                  type="button"
                  onClick={handleGenerateAiDescription}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow hover:brightness-105 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Tự Động Viết Mô Tả</span>
                </button>
              </div>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Bấm nút 'AI Tự Động Viết Mô Tả' ở trên để AI tạo nội dung tiếp thị cảm xúc từ câu chuyện vườn Ba Tư..."
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-black text-base shadow transition flex items-center justify-center gap-2"
            >
              <span>Đăng Bán Lên Chợ OCOP Ngay (+2 Giờ Đoàn Viên)</span>
            </button>
          </form>
        </div>

        {/* Right: Camera & Image Gallery */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-green-200 shadow-soft space-y-4">
            <h3 className="font-bold text-base text-ink flex items-center gap-2">
              <Camera className="w-5 h-5 text-green-700" />
              <span>Chụp Ảnh Thực Tế Tại Gốc Cây Vườn Ba Tư</span>
            </h3>

            <p className="text-xs text-gray-500">
              Đoàn viên thanh niên chụp bằng điện thoại tại vườn để đảm bảo tính xác thực và minh bạch:
            </p>

            {/* Simulated Camera Click */}
            <div
              onClick={() => showNotification('Đã kích hoạt camera chụp ảnh trực tiếp tại vườn Long Khánh!')}
              className="border-2 border-dashed border-gray-300 hover:border-green-600 rounded-2xl p-8 text-center cursor-pointer bg-gray-50 hover:bg-green-50/40 transition space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6" />
              </div>
              <strong className="block text-sm text-green-900">
                Chạm để Chụp ảnh mới hoặc Tải ảnh từ thư viện
              </strong>
              <span className="text-[11px] text-gray-400">
                AI sẽ tự động nhận diện loại trái cây và đề xuất giá bán
              </span>
            </div>

            {/* Sample Image selector */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-gray-700">
                Hoặc chọn nhanh ảnh mẫu có sẵn tại vườn Ba Tư:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {sampleImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedImage(img.url);
                      showNotification(`Đã chọn ảnh nông sản: ${img.label}`);
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-video cursor-pointer border-2 transition ${
                      selectedImage === img.url
                        ? 'border-green-700 ring-2 ring-green-600'
                        : 'border-transparent hover:opacity-90'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur">
                      {img.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Youth bridge note */}
            <div className="p-4 rounded-2xl bg-cream border border-green-200 text-xs text-green-900 space-y-1">
              <p className="font-bold">💡 Sức mạnh "Cầu nối số" của thanh niên:</p>
              <p className="text-gray-600 leading-relaxed">
                Chú Ba Tư không cần thao tác gõ phím. Đoàn viên cầm điện thoại, chú nói xong AI điền thông tin, chú gật đầu là bài đăng hiển thị ngay trên Chợ OCOP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
