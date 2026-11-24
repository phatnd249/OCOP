/**
 * CHỢ OCOP THANH NIÊN - NỀN TẢNG KINH TẾ SỐ ĐỒNG NAI
 * File: js/app.js
 * Chức năng: Điều hướng SPA, Đổi vai trò, AI gợi ý, Ghi âm giọng nói,
 * QR Nhật ký mùa vụ, Giỏ hàng, Quản lý đơn hàng, Livestream mô phỏng.
 */

// STATE QUẢN LÝ ỨNG DỤNG
const APP_STATE = {
  currentRole: 'customer', // 'customer' | 'farmer' | 'youth'
  activeScreen: 'garden',  // 'garden' | 'products' | 'cart' | 'post' | 'orders' | 'live' | 'map' | 'volunteer'
  cart: [
    { productId: 'sp-01', qty: 2 },
    { productId: 'sp-02', qty: 3 }
  ],
  selectedShipping: 'express_hcm',
  shippingCost: 35000,
  ordersList: [...OCOP_DATA.orders],
  productsList: [...OCOP_DATA.products],
  activeFilter: 'all',
  liveLikes: 6890,
  isRecording: false
};

// KHỞI CHẠY KHI DOM SẴN SÀNG
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initRoleSwitcher();
  renderGardenProfile();
  renderProducts();
  renderCart();
  renderOrders();
  renderLiveStream();
  renderEcoMap();
  renderYouthHonor();
  initVoiceAndAI();
  updateCartBadge();
});

// ==========================================================================
// 1. ĐIỀU HƯỚNG TABS & SCREENS
// ==========================================================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link, .nav-action-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScreen = link.getAttribute('data-screen');
      if (targetScreen) {
        switchScreen(targetScreen);
      }
    });
  });
}

function switchScreen(screenId) {
  APP_STATE.activeScreen = screenId;

  // Cập nhật nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-screen') === screenId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Ẩn hiện các màn hình
  document.querySelectorAll('.screen-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSection = document.getElementById(`screen-${screenId}`);
  if (activeSection) {
    activeSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================================================
// 2. CHUYỂN ĐỔI VAI TRÒ NGƯỜI DÙNG (ROLE SWITCHER)
// ==========================================================================
function initRoleSwitcher() {
  const roleButtons = document.querySelectorAll('.role-btn');
  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role');
      setRole(role);
    });
  });
}

function setRole(role) {
  APP_STATE.currentRole = role;

  // Update button active
  document.querySelectorAll('.role-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-role') === role);
  });

  const pill = document.getElementById('currentUserPill');
  const body = document.body;

  if (role === 'farmer') {
    // Chế độ Chú Ba Tư (50 tuổi): Bật chế độ chữ to, chuyển ngay sang màn Quản lý đơn
    body.classList.add('elderly-mode');
    pill.innerHTML = `<span class="user-status-dot" style="background:#f59e0b"></span> <strong>Chú Ba Tư (Chủ vườn 50t)</strong>`;
    showNotification("Đã kích hoạt chế độ thân thiện: Chữ to, nút bấm lớn, hỗ trợ giọng nói cho Chú Ba Tư!");
    switchScreen('orders');
  } else if (role === 'youth') {
    // Chế độ Thanh niên hỗ trợ số: Chuyển sang màn Đăng sản phẩm nhanh AI
    body.classList.remove('elderly-mode');
    pill.innerHTML = `<span class="user-status-dot" style="background:#0284c7"></span> <strong>Đoàn viên: Nguyễn Văn Nam</strong>`;
    showNotification("Chào đồng chí Nam! Đã mở chế độ Thanh niên hỗ trợ số hóa và livestream.");
    switchScreen('post');
  } else {
    // Chế độ Khách hàng TP.HCM
    body.classList.remove('elderly-mode');
    pill.innerHTML = `<span class="user-status-dot"></span> <strong>Khách hàng TP.HCM</strong>`;
    switchScreen('products');
  }
}

// ==========================================================================
// 3. MÀN HÌNH 1: HỒ SƠ NHÀ VƯỜN BA TƯ
// ==========================================================================
function renderGardenProfile() {
  const garden = OCOP_DATA.garden;
  const container = document.getElementById('gardenProfileContent');
  if (!container) return;

  container.innerHTML = `
    <div class="garden-hero">
      <img src="${garden.coverImage}" class="garden-cover" alt="${garden.name}">
      <div class="garden-hero-overlay">
        <img src="${garden.avatar}" class="garden-avatar" alt="${garden.owner}">
        <div class="garden-meta">
          <h2>${garden.name}</h2>
          <p style="font-size:1.05rem; opacity:0.95;">Chủ vườn: <strong>${garden.owner}</strong> • 📍 ${garden.location}</p>
          <div class="garden-badges-row">
            <span class="badge-ocop">⭐ ${garden.ocopRating} SAO OCOP TỈNH ĐỒNG NAI</span>
            <span class="pill-badge">Chứng nhận số: ${garden.ocopCertNo}</span>
            <span class="pill-badge">Quy mô: ${garden.area}</span>
            <span class="pill-badge">Tọa độ: ${garden.coordinates}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="garden-grid-2col">
      <div>
        <div class="card">
          <div class="section-title" style="margin-bottom:12px;">🌿 Câu Chuyện Nhà Vườn Ba Tư</div>
          <div class="story-box">
            <p>${garden.story}</p>
          </div>
          
          <div class="garden-stats-strip">
            <div class="stat-box">
              <div class="stat-number">2.5 ha</div>
              <div class="stat-label">Diện tích canh tác sạch</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">100%</div>
              <div class="stat-label">Phân bón sinh học vi sinh</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">4 GIỜ</div>
              <div class="stat-label">Hái tại vườn đến bàn ăn TP.HCM</div>
            </div>
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:16px;">
            <button class="btn btn-primary" onclick="switchScreen('products')">
              🛒 Xem Sản Phẩm Vườn Ba Tư
            </button>
            <button class="btn btn-secondary" onclick="switchScreen('map')">
              🗺️ Xem Bản Đồ Du Lịch Sinh Thái
            </button>
            <button class="btn btn-outline" onclick="bookGardenTour()">
              📅 Đăng Ký Trải Nghiệm Vườn (${garden.ecoTourPrice})
            </button>
          </div>
        </div>
      </div>

      <div>
        <div class="card youth-supporters-card">
          <div class="section-title" style="color:#065f46; margin-bottom:6px; font-size:1.2rem;">
            🤝 Đoàn Viên Hỗ Trợ Số
          </div>
          <p style="font-size:0.85rem; color:#4b5563; margin-bottom:16px;">
            Đoàn Thanh niên TP. Long Khánh trực tiếp phụ trách số hóa, cập nhật nhật ký & livestream bán hàng:
          </p>
          
          ${OCOP_DATA.youthSupporters.map(yt => `
            <div class="youth-item">
              <img src="${yt.avatar}" class="youth-avatar" alt="${yt.name}">
              <div class="youth-info">
                <h4>${yt.name}</h4>
                <p>${yt.role}</p>
                <div class="volunteer-pill">⭐ ${yt.volunteerHours} giờ tình nguyện số</div>
                <div style="font-size:0.75rem; color:#059669; font-weight:600; margin-top:2px;">
                  🎖️ ${yt.badge}
                </div>
              </div>
            </div>
          `).join('')}

          <div style="margin-top:14px; text-align:center;">
            <button class="btn btn-outline" style="width:100%; border-color:#86efac; color:#065f46; font-size:0.85rem;" onclick="switchScreen('volunteer')">
              Xem Sổ Tay Vinh Danh Tình Nguyện Số ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 4. MÀN HÌNH 2: ĐĂNG SẢN PHẨM NHANH BẰNG ẢNH & GIỌNG NÓI + AI
// ==========================================================================
function initVoiceAndAI() {
  const micZone = document.getElementById('micZone');
  const micStatus = document.getElementById('micStatus');
  const voiceTranscript = document.getElementById('voiceTranscript');
  const aiGenerateBtn = document.getElementById('aiGenerateBtn');
  const quickPostForm = document.getElementById('quickPostForm');

  if (!micZone) return;

  // Mẫu nhận diện giọng nói mô phỏng cho chú Ba Tư hoặc thanh niên
  const sampleVoiceTexts = [
    "Vườn chú Ba Tư vừa tuyển hái được 50 ký sầu riêng Ri6 cơm vàng bao ngọt, bán giá một trăm hai mươi ngàn một ký, khách đặt giao sáng mai về Sài Gòn ăn liền ngon lắm.",
    "Chiều nay thanh niên bẻ được hai mươi sọt chôm chôm nhãn cùi dày tróc hột ngọt thanh, giá bốn mươi lăm ngàn một ký, miễn phí ship từ năm ký nhé.",
    "Bưởi da xanh Tân Triều tép hồng mọng nước vừa đủ ngày hái, đạt chuẩn OCOP bốn sao, giá bảy mươi lăm ngàn một ký nha bà con."
  ];

  let currentSampleIdx = 0;

  micZone.addEventListener('click', () => {
    if (!APP_STATE.isRecording) {
      // Bắt đầu ghi âm
      APP_STATE.isRecording = true;
      micZone.classList.add('recording');
      micStatus.innerHTML = `<span style="color:#ef4444; font-weight:800;">🔴 ĐANG LẮNG NGHE CHÚ BA TƯ NÓI... (Hãy nói to rõ ràng)</span>`;
      voiceTranscript.innerText = "Đang thu nhận sóng âm...";

      // Kiểm tra xem trình duyệt có Web Speech API không, nếu có dùng thật, không thì mô phỏng mượt mà
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognizer = new SpeechRecognition();
          recognizer.lang = 'vi-VN';
          recognizer.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            voiceTranscript.innerText = `"${transcript}"`;
            finishRecording(transcript);
          };
          recognizer.onerror = () => {
            simulateVoice();
          };
          recognizer.start();
          return;
        } catch (e) {
          simulateVoice();
        }
      } else {
        simulateVoice();
      }
    } else {
      finishRecording(voiceTranscript.innerText);
    }
  });

  function simulateVoice() {
    setTimeout(() => {
      const sample = sampleVoiceTexts[currentSampleIdx % sampleVoiceTexts.length];
      currentSampleIdx++;
      voiceTranscript.innerText = `"${sample}"`;
      finishRecording(sample);
    }, 2000);
  }

  function finishRecording(text) {
    APP_STATE.isRecording = false;
    micZone.classList.remove('recording');
    micStatus.innerHTML = `<span style="color:#059669; font-weight:700;">✅ Đã nhận diện giọng nói thành công! Nhấn "AI Viết Mô Tả" bên dưới để hoàn tất.</span>`;
    
    // Tự động điền dữ liệu sơ bộ
    if (text.includes("sầu riêng")) {
      document.getElementById('postName').value = "Sầu riêng Ri6 Cơm Vàng Long Khánh (Cắt Tại Vườn)";
      document.getElementById('postPrice').value = "120000";
      document.getElementById('postUnit').value = "kg";
    } else if (text.includes("chôm chôm")) {
      document.getElementById('postName').value = "Chôm chôm Nhãn Vườn Ba Tư Vị Mật Dòn Róc Hạt";
      document.getElementById('postPrice').value = "45000";
      document.getElementById('postUnit').value = "kg";
    } else if (text.includes("bưởi")) {
      document.getElementById('postName').value = "Bưởi Da Xanh Tân Triều Tép Hồng OCOP 4 Sao";
      document.getElementById('postPrice').value = "75000";
      document.getElementById('postUnit').value = "kg";
    }
  }

  // TÍNH NĂNG ĐIỂM CỘNG: AI VIẾT MÔ TẢ TỰ ĐỘNG
  aiGenerateBtn.addEventListener('click', () => {
    const rawVoice = voiceTranscript.innerText.replace(/"/g, '');
    const prodName = document.getElementById('postName').value || "Sản phẩm OCOP Long Khánh";
    const descArea = document.getElementById('postDesc');

    aiGenerateBtn.innerHTML = `<span>⏳ AI đang phân tích ảnh & tối ưu mô tả...</span>`;
    aiGenerateBtn.disabled = true;

    setTimeout(() => {
      aiGenerateBtn.innerHTML = `<span>✨ AI Viết Lại Mô Tả Bán Chạy (1 Chạm)</span>`;
      aiGenerateBtn.disabled = false;

      const generatedAI = `🌟 [ĐẶC SẢN OCOP ĐỒNG NAI CHÍNH GỐC - VƯỜN BA TƯ]
• Tên sản phẩm: ${prodName}
• Nguồn gốc: Trồng trọt tự nhiên tại Ấp Suối Tre, TP. Long Khánh, đất đỏ bazan trù phú.
• Cam kết chất lượng: 100% không chất bảo quản hay ủ chín nhân tạo. Trái chín cây tự nhiên, cắt sáng sớm và vận chuyển mát trong ngày về thẳng TP.HCM.
• Trải nghiệm vị giác: Cơm vàng óng, dày thịt, ngọt ngào đậm đà chuẩn vị miền Đông Nam Bộ.
• Hỗ trợ truy xuất: Quét mã QR đi kèm để xem nhật ký bón phân hữu cơ sinh học do Chi đoàn Thanh niên địa phương giám sát.`;

      descArea.value = generatedAI;
      showNotification("✨ AI đã viết xong mô tả chuyên nghiệp, tối ưu bán chạy!");
    }, 1200);
  });

  // SUBMIT ĐĂNG SẢN PHẨM
  quickPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('postName').value;
    const price = parseInt(document.getElementById('postPrice').value);
    const unit = document.getElementById('postUnit').value;
    const desc = document.getElementById('postDesc').value;

    const newProd = {
      id: `sp-0${APP_STATE.productsList.length + 1}`,
      name: name,
      star: 4,
      category: "Trái cây tươi đặc sản",
      price: price || 90000,
      unit: unit || "kg",
      minOrder: 2,
      origin: "Vườn Ba Tư, Long Khánh, Đồng Nai",
      image: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=800&auto=format&fit=crop&q=80",
      description: desc || "Sản phẩm nông sản sạch chuẩn OCOP từ vườn Ba Tư.",
      inStock: 100,
      qrCodeId: `QR-OCOP-NEW-${Date.now().toString().slice(-4)}`,
      seasonDiary: [
        { date: "Hôm nay", stage: "Đoàn viên thanh niên chụp ảnh & đăng bán trực tuyến", note: "Số hóa qua nền tảng Chợ OCOP Thanh Niên", status: "completed" },
        { date: "Sáng sớm", stage: "Chú Ba Tư thu hái tuyển chọn loại 1", note: "Độ ngọt tự nhiên đạt chuẩn OCOP", status: "active" }
      ]
    };

    APP_STATE.productsList.unshift(newProd);
    renderProducts();
    showNotification(`Đã đăng thành công sản phẩm "${name}" lên Chợ OCOP!`);
    switchScreen('products');
    quickPostForm.reset();
  });
}

// ==========================================================================
// 5. MÀN HÌNH 3: SẢN PHẨM & MÃ QR TRUY XUẤT NGUỒN GỐC (NHẬT KÝ MÙA VỤ)
// ==========================================================================
function renderProducts() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  container.innerHTML = APP_STATE.productsList.map(prod => `
    <div class="product-card">
      <div class="product-image-wrap">
        <img src="${prod.image}" class="product-image" alt="${prod.name}">
        <div class="product-top-badges">
          <span class="badge-ocop">⭐ ${prod.star} SAO</span>
          <span style="background:rgba(0,0,0,0.6); color:white; font-size:0.75rem; padding:3px 8px; border-radius:12px;">Kho: ${prod.inStock} ${prod.unit}</span>
        </div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${prod.name}</h3>
        <p class="product-desc">${prod.description}</p>
        <div style="font-size:0.8rem; color:#059669; font-weight:600; margin-bottom:8px;">
          📍 ${prod.origin}
        </div>
        <div class="product-price-row">
          <div>
            <span class="product-price">${formatVND(prod.price)}</span>
            <span class="product-unit"> / ${prod.unit}</span>
          </div>
          <span style="font-size:0.8rem; color:#6b7280;">Tối thiểu: ${prod.minOrder} ${prod.unit}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-qr" onclick="openQrDiaryModal('${prod.id}')">
            🔍 Quét Mã QR & Nhật Ký
          </button>
          <button class="btn btn-primary" onclick="addToCart('${prod.id}')">
            🛒 Thêm Giỏ Hàng
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// MODAL QR CODE & NHẬT KÝ MÙA VỤ
function openQrDiaryModal(productId) {
  const prod = APP_STATE.productsList.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('qrModal');
  const modalBody = document.getElementById('qrModalBody');

  // SVG QR Code giả lập có logo OCOP ở giữa
  const qrSvg = `
    <svg viewBox="0 0 100 100" width="160" height="160" style="display:block;">
      <rect width="100" height="100" fill="#ffffff"/>
      <!-- QR Pattern Elements -->
      <path d="M5,5 h25 v25 h-25 z M10,10 h15 v15 h-15 z M14,14 h7 v7 h-7 z" fill="#065f46"/>
      <path d="M70,5 h25 v25 h-25 z M75,10 h15 v15 h-15 z M79,14 h7 v7 h-7 z" fill="#065f46"/>
      <path d="M5,70 h25 v25 h-25 z M10,75 h15 v15 h-15 z M14,79 h7 v7 h-7 z" fill="#065f46"/>
      <!-- Data Blocks -->
      <rect x="36" y="8" width="6" height="6" fill="#059669"/>
      <rect x="48" y="14" width="8" height="6" fill="#059669"/>
      <rect x="58" y="8" width="6" height="6" fill="#059669"/>
      <rect x="8" y="38" width="6" height="8" fill="#059669"/>
      <rect x="20" y="44" width="8" height="6" fill="#059669"/>
      <rect x="74" y="38" width="8" height="6" fill="#059669"/>
      <rect x="86" y="48" width="6" height="8" fill="#059669"/>
      <rect x="36" y="76" width="6" height="6" fill="#059669"/>
      <rect x="48" y="82" width="8" height="8" fill="#059669"/>
      <rect x="62" y="74" width="6" height="8" fill="#059669"/>
      <rect x="78" y="80" width="12" height="6" fill="#059669"/>
      <!-- Center Emblem -->
      <circle cx="50" cy="50" r="14" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
      <text x="50" y="54" font-size="8" font-weight="bold" text-anchor="middle" fill="#ffffff">OCOP</text>
    </svg>
  `;

  modalBody.innerHTML = `
    <div class="qr-box-center">
      <div class="qr-code-graphic">
        ${qrSvg}
      </div>
      <div style="font-weight:800; font-size:1.1rem; color:#065f46; margin-top:10px;">
        MÃ TRUY XUẤT: ${prod.qrCodeId}
      </div>
      <p style="font-size:0.85rem; color:#6b7280; margin-top:4px;">
        Chứng nhận số: OCOP-ĐN-2024-4S-089 • Kiểm nghiệm an toàn thực phẩm Đồng Nai
      </p>
      <div style="margin-top:10px; display:inline-flex; gap:6px;">
        <span class="badge-ocop">⭐ ${prod.star} SAO OCOP</span>
        <span class="pill-badge" style="background:#dcfce7; color:#15803d;">VietGAP Chứng Nhận</span>
      </div>
    </div>

    <div>
      <h4 style="font-size:1.15rem; font-weight:800; color:#1e293b; display:flex; align-items:center; gap:8px;">
        🌱 Dòng Thời Gian Nhật Ký Mùa Vụ Minh Bạch
      </h4>
      <p style="font-size:0.85rem; color:#6b7280; margin-bottom:12px;">
        Ghi nhận trực tiếp tại vườn bởi Chú Ba Tư và Đoàn viên thanh niên hỗ trợ số:
      </p>

      <div class="diary-timeline">
        ${prod.seasonDiary.map(entry => `
          <div class="timeline-item ${entry.status === 'active' ? 'active' : ''}">
            <div class="timeline-dot"></div>
            <div class="timeline-date">${entry.date}</div>
            <div class="timeline-title">${entry.stage}</div>
            <div class="timeline-note">📝 ${entry.note}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeQrModal() {
  const modal = document.getElementById('qrModal');
  if (modal) modal.classList.remove('active');
}

// ==========================================================================
// 6. MÀN HÌNH 4: GIỎ HÀNG, ĐẶT HÀNG & CHỌN HÌNH THỨC NHẬN HÀNG
// ==========================================================================
function addToCart(productId) {
  const existing = APP_STATE.cart.find(c => c.productId === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    APP_STATE.cart.push({ productId, qty: 1 });
  }
  updateCartBadge();
  renderCart();
  showNotification("Đã thêm sản phẩm vào giỏ hàng!");
}

function updateCartQty(productId, delta) {
  const item = APP_STATE.cart.find(c => c.productId === productId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      APP_STATE.cart = APP_STATE.cart.filter(c => c.productId !== productId);
    }
  }
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadgeCount');
  const count = APP_STATE.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) badge.innerText = count;
}

function renderCart() {
  const tableBody = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const shipFeeEl = document.getElementById('cartShipFee');
  const grandTotalEl = document.getElementById('cartGrandTotal');

  if (!tableBody) return;

  if (APP_STATE.cart.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; padding:40px; color:#6b7280;">
          🛒 Giỏ hàng của bạn đang trống.<br>
          <button class="btn btn-primary" style="margin-top:12px;" onclick="switchScreen('products')">
            Dạo Chợ OCOP Ngay
          </button>
        </td>
      </tr>
    `;
    if (subtotalEl) subtotalEl.innerText = "0 đ";
    if (grandTotalEl) grandTotalEl.innerText = "0 đ";
    return;
  }

  let subtotal = 0;
  tableBody.innerHTML = APP_STATE.cart.map(item => {
    const prod = APP_STATE.productsList.find(p => p.id === item.productId);
    if (!prod) return '';
    const lineTotal = prod.price * item.qty;
    subtotal += lineTotal;

    return `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:12px;">
            <img src="${prod.image}" style="width:50px; height:50px; border-radius:8px; object-fit:cover;">
            <div>
              <div style="font-weight:700; color:#1e293b;">${prod.name}</div>
              <div style="font-size:0.8rem; color:#059669;">${formatVND(prod.price)} / ${prod.unit}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartQty('${prod.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${prod.id}', 1)">+</button>
          </div>
        </td>
        <td style="font-weight:800; color:#065f46;">${formatVND(lineTotal)}</td>
        <td>
          <button style="border:none; background:transparent; color:#ef4444; cursor:pointer; font-size:1.1rem;" onclick="updateCartQty('${prod.id}', -999)">
            🗑️
          </button>
        </td>
      </tr>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.innerText = formatVND(subtotal);
  if (shipFeeEl) shipFeeEl.innerText = formatVND(APP_STATE.shippingCost);
  if (grandTotalEl) grandTotalEl.innerText = formatVND(subtotal + APP_STATE.shippingCost);
}

function selectShipping(method, cost) {
  APP_STATE.selectedShipping = method;
  APP_STATE.shippingCost = cost;

  document.querySelectorAll('.shipping-card').forEach(card => {
    card.classList.toggle('selected', card.getAttribute('data-ship') === method);
    const radio = card.querySelector('input[type="radio"]');
    if (radio) radio.checked = (card.getAttribute('data-ship') === method);
  });

  renderCart();
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (APP_STATE.cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;
  const note = document.getElementById('custNote').value;

  const items = APP_STATE.cart.map(c => {
    const prod = APP_STATE.productsList.find(p => p.id === c.productId);
    return {
      name: prod.name,
      qty: c.qty,
      unitPrice: prod.price
    };
  });

  const total = items.reduce((s, i) => s + (i.unitPrice * i.qty), 0) + APP_STATE.shippingCost;

  let shipTitle = "Giao siêu tốc xe lạnh TP.HCM (3h)";
  if (APP_STATE.selectedShipping === 'pickup_garden') shipTitle = "Nhận tại nhà vườn Ba Tư (Tour trải nghiệm)";
  if (APP_STATE.selectedShipping === 'standard_delivery') shipTitle = "Giao tiêu chuẩn OCOP tươi mát";

  const newOrder = {
    orderId: `DH-OCOP-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: `${name} (TP.HCM)`,
    phone: phone,
    address: address,
    items: items,
    total: total,
    shippingMethod: shipTitle,
    deliveryFee: APP_STATE.shippingCost,
    orderTime: "Vừa xong",
    status: "pending_harvest",
    statusText: "Đang chờ hái tại vườn",
    supporter: "Nguyễn Văn Nam",
    farmerNote: note || "Khách đặt từ Chợ OCOP Online"
  };

  APP_STATE.ordersList.unshift(newOrder);
  APP_STATE.cart = [];
  updateCartBadge();
  renderCart();
  renderOrders();

  alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\nMã đơn: ${newOrder.orderId}\nTổng tiền: ${formatVND(total)}\nNhà vườn Ba Tư và đoàn viên sẽ chuẩn bị đơn hàng ngay!`);
  switchScreen('orders');
}

// ==========================================================================
// 7. MÀN HÌNH 5: QUẢN LÝ ĐƠN HÀNG NHÀ VƯỜN (CHẾ ĐỘ CHÚ BA TƯ)
// ==========================================================================
function renderOrders() {
  const container = document.getElementById('ordersListContainer');
  if (!container) return;

  container.innerHTML = APP_STATE.ordersList.map(order => `
    <div class="order-card">
      <div class="order-header-row">
        <div>
          <span class="order-id-badge">📦 ${order.orderId}</span>
          <span style="font-size:0.85rem; color:#6b7280; margin-left:10px;">🕒 Đặt lúc: ${order.orderTime}</span>
        </div>
        <div>
          <span class="status-badge ${order.status}">
            ${order.statusText}
          </span>
        </div>
      </div>

      <div style="font-size:1.05rem; margin-bottom:8px;">
        👤 <strong>Khách hàng:</strong> ${order.customerName} • 📞 ${order.phone}
      </div>
      <div style="font-size:0.95rem; color:#4b5563; margin-bottom:12px;">
        📍 <strong>Địa chỉ giao:</strong> ${order.address}
      </div>
      <div style="font-size:0.9rem; color:#0369a1; margin-bottom:12px;">
        🚚 <strong>Phương thức:</strong> ${order.shippingMethod}
      </div>

      <div class="order-items-list">
        <strong style="color:#065f46;">Danh sách trái cây/nông sản cần chuẩn bị:</strong>
        <ul style="margin-left:20px; margin-top:6px;">
          ${order.items.map(item => `
            <li style="margin-bottom:4px; font-size:1rem;">
              <strong>${item.name}</strong>: <span style="color:#ef4444; font-weight:800;">${item.qty} kg/hộp</span> 
              (${formatVND(item.unitPrice * item.qty)})
            </li>
          `).join('')}
        </ul>
        <div style="font-size:0.9rem; color:#6b7280; margin-top:8px;">
          💬 <em>Ghi chú của khách: ${order.farmerNote}</em>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; flex-wrap:wrap; gap:10px;">
        <div style="font-size:1.2rem; font-weight:800; color:#b91c1c;">
          Tổng thu: ${formatVND(order.total)}
        </div>
        <div style="font-size:0.85rem; color:#0369a1; font-weight:600;">
          🤝 Đoàn viên phụ trách đơn: ${order.supporter}
        </div>
      </div>

      <div class="order-action-buttons">
        <button class="btn btn-tts" onclick="speakOrderText('${order.orderId}')">
          🔊 Đọc To Đơn Hàng Cho Chú Ba Tư
        </button>
        ${order.status === 'pending_harvest' ? `
          <button class="btn btn-primary" onclick="updateOrderStatus('${order.orderId}', 'shipping', 'Đang giao chành xe TP.HCM')">
            ✂️ Đã Hái Xong & Bàn Giao Xe Lạnh
          </button>
        ` : ''}
        ${order.status === 'shipping' ? `
          <button class="btn btn-accent" onclick="updateOrderStatus('${order.orderId}', 'completed', 'Đã hoàn thành')">
            ✅ Khách Đã Nhận & Thanh Toán
          </button>
        ` : ''}
        <button class="btn btn-outline" onclick="callYouthSupport('${order.supporter}')">
          📱 Gọi Đoàn Viên Hỗ Trợ
        </button>
      </div>
    </div>
  `).join('');
}

function updateOrderStatus(orderId, newStatus, newStatusText) {
  const order = APP_STATE.ordersList.find(o => o.orderId === orderId);
  if (order) {
    order.status = newStatus;
    order.statusText = newStatusText;
    renderOrders();
    showNotification(`Đã cập nhật trạng thái đơn ${orderId} thành: ${newStatusText}`);
  }
}

// TÍNH NĂNG ĐỌC TO ĐƠN HÀNG BẰNG GIỌNG NÓI CHO CHỦ VƯỜN 50T
function speakOrderText(orderId) {
  const order = APP_STATE.ordersList.find(o => o.orderId === orderId);
  if (!order) return;

  const itemsText = order.items.map(i => `${i.qty} ký ${i.name}`).join(' và ');
  const speechText = `Chào chú Ba Tư. Đơn hàng ${order.orderId} của khách hàng ${order.customerName}. Cần cắt hái: ${itemsText}. Địa chỉ giao tại: ${order.address}. Tổng thu ${formatVND(order.total)}. Chú nhớ chọn quả chín tới theo ghi chú nhé!`;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    showNotification("Đang đọc to đơn hàng qua loa...");
  } else {
    alert(speechText);
  }
}

function callYouthSupport(name) {
  alert(`📞 Đang kết nối cuộc gọi nhanh tới Đoàn viên ${name} để hỗ trợ chú Ba Tư đóng thùng và in mã QR!`);
}

// ==========================================================================
// 8. MÀN HÌNH 6: LỊCH LIVESTREAM BÁN HÀNG CỦA THANH NIÊN HỖ TRỢ
// ==========================================================================
function renderLiveStream() {
  const live = OCOP_DATA.livestreams[0];
  const playerWrap = document.getElementById('livePlayerWrapper');
  const chatMessages = document.getElementById('liveChatMessages');
  const upcomingList = document.getElementById('upcomingLiveList');

  if (playerWrap) {
    playerWrap.innerHTML = `
      <div class="live-player-box">
        <img src="${live.cover}" class="live-video-sim" alt="Livestream Vườn">
        
        <div class="live-overlay-header">
          <div class="live-tag">
            <span style="width:8px; height:8px; border-radius:50%; background:white; display:inline-block;"></span> TRỰC TIẾP TẠI VƯỜN
          </div>
          <div class="live-viewer-count" id="liveViewerCount">
            👁️ ${live.viewers} người xem
          </div>
        </div>

        <div class="live-pinned-product">
          <img src="https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=200&auto=format&fit=crop&q=80" class="pinned-prod-img" alt="Sầu riêng">
          <div style="flex:1;">
            <div style="font-size:0.85rem; font-weight:700; color:#1e293b; line-height:1.2;">
              ${live.featuredProduct.name}
            </div>
            <div style="font-size:0.95rem; font-weight:800; color:#ef4444; margin-top:2px;">
              ${live.featuredProduct.dealPrice} <del style="font-size:0.75rem; color:#9ca3af;">${live.featuredProduct.originalPrice}</del>
            </div>
          </div>
          <button class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="addToCart('sp-01')">
            Chốt Ngay
          </button>
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; flex-wrap:wrap; gap:10px;">
        <div>
          <h3 style="font-size:1.25rem; font-weight:800; color:#1e293b;">${live.title}</h3>
          <p style="font-size:0.9rem; color:#4b5563;">
            Người phát: <strong>${live.hostName}</strong> • 📍 ${live.location}
          </p>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <button class="heart-button" onclick="sendLiveHeart()">
            ❤️
          </button>
          <span id="liveLikesCount" style="font-weight:700; color:#e11d48; font-size:0.95rem;">
            ${APP_STATE.liveLikes} lượt thích
          </span>
        </div>
      </div>
    `;
  }

  // Render chat
  if (chatMessages) {
    chatMessages.innerHTML = live.mockComments.map(c => `
      <div class="chat-bubble">
        <span class="chat-user">${c.user}:</span> ${c.text}
      </div>
    `).join('');
  }

  // Render upcoming
  if (upcomingList) {
    upcomingList.innerHTML = OCOP_DATA.livestreams.slice(1).map(ls => `
      <div class="card" style="padding:16px; margin-bottom:14px; border:1px solid #cbd5e1;">
        <div style="display:flex; gap:14px; align-items:center;">
          <img src="${ls.cover}" style="width:90px; height:70px; border-radius:8px; object-fit:cover;">
          <div style="flex:1;">
            <div style="font-weight:700; color:#1e293b; font-size:0.95rem;">${ls.title}</div>
            <div style="font-size:0.82rem; color:#0284c7; font-weight:600; margin-top:2px;">
              ⏰ ${ls.time}
            </div>
            <div style="font-size:0.8rem; color:#6b7280;">Host: ${ls.hostName}</div>
          </div>
          <button class="btn btn-outline" style="font-size:0.8rem; padding:6px 12px;" onclick="showNotification('Đã bật chuông thông báo khi phiên live bắt đầu!')">
            🔔 Nhắc tôi
          </button>
        </div>
      </div>
    `).join('');
  }
}

function sendLiveComment(e) {
  e.preventDefault();
  const input = document.getElementById('liveCommentInput');
  const text = input.value.trim();
  if (!text) return;

  const chatMessages = document.getElementById('liveChatMessages');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = `<span class="chat-user">Bạn (${APP_STATE.currentRole === 'customer' ? 'Khách TP.HCM' : 'Đoàn viên'}):</span> ${text}`;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  input.value = '';
}

function sendLiveHeart() {
  APP_STATE.liveLikes += 1;
  const countEl = document.getElementById('liveLikesCount');
  if (countEl) countEl.innerText = `${APP_STATE.liveLikes} lượt thích`;

  // Hiệu ứng tim bay
  const player = document.querySelector('.live-player-box');
  if (player) {
    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.position = 'absolute';
    heart.style.right = '30px';
    heart.style.bottom = '80px';
    heart.style.fontSize = '2rem';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'all 1s ease-out';
    heart.style.zIndex = '50';
    player.appendChild(heart);

    setTimeout(() => {
      heart.style.transform = `translate(${Math.random() * 40 - 20}px, -180px) scale(1.4)`;
      heart.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      heart.remove();
    }, 1100);
  }
}

// ==========================================================================
// 9. SCREEN 7 (ĐIỂM CỘNG): BẢN ĐỒ NHÀ VƯỜN KẾT HỢP DU LỊCH TRẢI NGHIỆM
// ==========================================================================
function renderEcoMap() {
  const mapContainer = document.getElementById('ecoMapContainer');
  const detailCard = document.getElementById('mapSpotDetails');
  if (!mapContainer) return;

  mapContainer.innerHTML = OCOP_DATA.gardenMapLocations.map(loc => `
    <div class="map-pin" style="left:${loc.pos.x}; top:${loc.pos.y};" onclick="selectMapSpot('${loc.id}')">
      <div class="pin-icon">${loc.icon}</div>
      <div class="pin-label">${loc.name}</div>
    </div>
  `).join('');

  // Mặc định hiển thị điểm 1
  selectMapSpot('loc-01');
}

function selectMapSpot(locId) {
  const spot = OCOP_DATA.gardenMapLocations.find(l => l.id === locId);
  const detailCard = document.getElementById('mapSpotDetails');
  if (!spot || !detailCard) return;

  detailCard.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
      <span style="font-size:2.5rem;">${spot.icon}</span>
      <div>
        <h3 style="font-size:1.3rem; font-weight:800; color:#065f46;">${spot.name}</h3>
        <span class="pill-badge" style="background:#e0f2fe; color:#0369a1;">Vị trí check-in trải nghiệm</span>
      </div>
    </div>
    <p style="font-size:1rem; color:#4b5563; line-height:1.7; margin-bottom:16px;">
      ${spot.desc}
    </p>
    <div style="display:flex; gap:10px; flex-wrap:wrap;">
      <button class="btn btn-primary" onclick="bookGardenTour()">
        🎟️ Đăng Ký Trải Nghiệm Điểm Này (50.000 đ)
      </button>
      <button class="btn btn-outline" onclick="showNotification('Đã lưu tọa độ vào bản đồ dẫn đường GPS!')">
        🧭 Chỉ Đường Đến Vườn Ba Tư
      </button>
    </div>
  `;
}

function bookGardenTour() {
  alert(`🌿 CHÀO MỪNG BẠN ĐẾN VƯỜN BA TƯ!\nĐịa chỉ: Ấp Suối Tre, TP. Long Khánh, Đồng Nai.\nVé trải nghiệm: 50.000 đ/người (Thưởng thức sầu riêng, chôm chôm tại vườn và nghe đờn ca tài tử).\nĐoàn viên phụ trách đón tiếp: 0982.112.334 (Bạn Nam)`);
}

// ==========================================================================
// 10. SCREEN 8 (ĐIỂM CỘNG): SỔ TAY TÌNH NGUYỆN THANH NIÊN SỐ
// ==========================================================================
function renderYouthHonor() {
  const container = document.getElementById('youthHonorContainer');
  if (!container) return;

  container.innerHTML = OCOP_DATA.youthSupporters.map(yt => `
    <div class="honor-card">
      <div class="honor-avatar-row">
        <img src="${yt.avatar}" class="honor-avatar" alt="${yt.name}">
        <div>
          <h3 style="font-size:1.2rem; font-weight:800; color:#1e293b;">${yt.name}</h3>
          <p style="font-size:0.85rem; color:#0369a1; font-weight:600;">${yt.role}</p>
          <div style="font-size:0.8rem; color:#6b7280; margin-top:2px;">📞 ${yt.phone}</div>
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <div style="display:flex; justify-content:space-between; font-size:0.9rem; font-weight:700;">
          <span>Số giờ tình nguyện số:</span>
          <span style="color:#059669;">${yt.volunteerHours} / 40 giờ (Huy hiệu Vàng)</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${(yt.volunteerHours / 40) * 100}%"></div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
        <div style="background:white; padding:10px; border-radius:8px; border:1px solid #e2e8f0; text-align:center;">
          <div style="font-size:1.3rem; font-weight:800; color:#0284c7;">${yt.sessionsLive}</div>
          <div style="font-size:0.75rem; color:#64748b;">Phiên Live hỗ trợ</div>
        </div>
        <div style="background:white; padding:10px; border-radius:8px; border:1px solid #e2e8f0; text-align:center;">
          <div style="font-size:1.3rem; font-weight:800; color:#059669;">${yt.productsDigitized}</div>
          <div style="font-size:0.75rem; color:#64748b;">Sản phẩm số hóa QR</div>
        </div>
      </div>

      <div style="background:#ecfdf5; border:1px dashed #86efac; border-radius:8px; padding:10px; font-size:0.85rem; color:#065f46; font-weight:600; text-align:center;">
        🏅 ${yt.badge}
      </div>

      <button class="btn btn-outline" style="width:100%; margin-top:14px; font-size:0.85rem;" onclick="viewVolunteerCert('${yt.name}')">
        📜 Xem Chứng Nhận Điện Tử Đoàn TNCS HCM
      </button>
    </div>
  `).join('');
}

function viewVolunteerCert(name) {
  alert(`📜 CHỨNG NHẬN ĐOÀN VIÊN TIÊU BIỂU\nBan Chấp hành Đoàn TNCS Hồ Chí Minh tỉnh Đồng Nai chứng nhận:\nĐoàn viên ${name} đã có thành tích xuất sắc trong chiến dịch "Cầu Nối Số Hỗ Trợ Nhà Vườn OCOP Năm 2024".`);
}

// ==========================================================================
// TIỆN ÍCH CHUNG
// ==========================================================================
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', 'đ');
}

function showNotification(msg) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#065f46';
    toast.style.color = '#ffffff';
    toast.style.padding = '14px 22px';
    toast.style.borderRadius = '12px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    toast.style.zIndex = '9999';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '0.95rem';
    toast.style.transition = 'all 0.3s ease';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `🔔 ${msg}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
  }, 3200);
}
