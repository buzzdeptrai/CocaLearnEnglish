// Data cho App Học Tiếng Anh Cho Bé

const vocabularyData = {
  animals: {
    title: "Động Vật",
    titleEn: "Animals",
    icon: "🐾",
    words: [
      { word: "dog", vietnamese: "con chó", emoji: "🐕", ipa: "/dɒɡ/" },
      { word: "cat", vietnamese: "con mèo", emoji: "🐱", ipa: "/kæt/" },
      { word: "bird", vietnamese: "con chim", emoji: "🐦", ipa: "/bɜːd/" },
      { word: "fish", vietnamese: "con cá", emoji: "🐟", ipa: "/fɪʃ/" },
      { word: "lion", vietnamese: "con sư tử", emoji: "🦁", ipa: "/ˈlaɪən/" },
      { word: "elephant", vietnamese: "con voi", emoji: "🐘", ipa: "/ˈelɪfənt/" },
      { word: "monkey", vietnamese: "con khỉ", emoji: "🐒", ipa: "/ˈmʌŋki/" },
      { word: "rabbit", vietnamese: "con thỏ", emoji: "🐰", ipa: "/ˈræbɪt/" },
      { word: "bear", vietnamese: "con gấu", emoji: "🐻", ipa: "/beə/" },
      { word: "tiger", vietnamese: "con hổ", emoji: "🐯", ipa: "/ˈtaɪɡə/" }
    ]
  },
  colors: {
    title: "Màu Sắc",
    titleEn: "Colors",
    icon: "🎨",
    words: [
      { word: "red", vietnamese: "màu đỏ", emoji: "🔴", color: "#e74c3c", ipa: "/red/" },
      { word: "blue", vietnamese: "màu xanh dương", emoji: "🔵", color: "#3498db", ipa: "/bluː/" },
      { word: "green", vietnamese: "màu xanh lá", emoji: "🟢", color: "#2ecc71", ipa: "/ɡriːn/" },
      { word: "yellow", vietnamese: "màu vàng", emoji: "🟡", color: "#f1c40f", ipa: "/ˈjeləʊ/" },
      { word: "orange", vietnamese: "màu cam", emoji: "🟠", color: "#e67e22", ipa: "/ˈɒrɪndʒ/" },
      { word: "purple", vietnamese: "màu tím", emoji: "🟣", color: "#9b59b6", ipa: "/ˈpɜːpl/" },
      { word: "pink", vietnamese: "màu hồng", emoji: "🩷", color: "#e91e8c", ipa: "/pɪŋk/" },
      { word: "white", vietnamese: "màu trắng", emoji: "⚪", color: "#ecf0f1", ipa: "/waɪt/" },
      { word: "black", vietnamese: "màu đen", emoji: "⚫", color: "#2c3e50", ipa: "/blæk/" },
      { word: "brown", vietnamese: "màu nâu", emoji: "🟤", color: "#8b4513", ipa: "/braʊn/" }
    ]
  },
  numbers: {
    title: "Số Đếm",
    titleEn: "Numbers",
    icon: "🔢",
    words: [
      { word: "one", vietnamese: "một", emoji: "1️⃣", number: 1, ipa: "/wʌn/" },
      { word: "two", vietnamese: "hai", emoji: "2️⃣", number: 2, ipa: "/tuː/" },
      { word: "three", vietnamese: "ba", emoji: "3️⃣", number: 3, ipa: "/θriː/" },
      { word: "four", vietnamese: "bốn", emoji: "4️⃣", number: 4, ipa: "/fɔː/" },
      { word: "five", vietnamese: "năm", emoji: "5️⃣", number: 5, ipa: "/faɪv/" },
      { word: "six", vietnamese: "sáu", emoji: "6️⃣", number: 6, ipa: "/sɪks/" },
      { word: "seven", vietnamese: "bảy", emoji: "7️⃣", number: 7, ipa: "/ˈsevn/" },
      { word: "eight", vietnamese: "tám", emoji: "8️⃣", number: 8, ipa: "/eɪt/" },
      { word: "nine", vietnamese: "chín", emoji: "9️⃣", number: 9, ipa: "/naɪn/" },
      { word: "ten", vietnamese: "mười", emoji: "🔟", number: 10, ipa: "/ten/" }
    ]
  },
  fruits: {
    title: "Trái Cây",
    titleEn: "Fruits",
    icon: "🍎",
    words: [
      { word: "apple", vietnamese: "quả táo", emoji: "🍎", ipa: "/ˈæpl/" },
      { word: "banana", vietnamese: "quả chuối", emoji: "🍌", ipa: "/bəˈnɑːnə/" },
      { word: "orange", vietnamese: "quả cam", emoji: "🍊", ipa: "/ˈɒrɪndʒ/" },
      { word: "grape", vietnamese: "quả nho", emoji: "🍇", ipa: "/ɡreɪp/" },
      { word: "strawberry", vietnamese: "quả dâu", emoji: "🍓", ipa: "/ˈstrɔːbəri/" },
      { word: "watermelon", vietnamese: "quả dưa hấu", emoji: "🍉", ipa: "/ˈwɔːtəmelən/" },
      { word: "pineapple", vietnamese: "quả dứa", emoji: "🍍", ipa: "/ˈpaɪnæpl/" },
      { word: "mango", vietnamese: "quả xoài", emoji: "🥭", ipa: "/ˈmæŋɡəʊ/" },
      { word: "cherry", vietnamese: "quả anh đào", emoji: "🍒", ipa: "/ˈtʃeri/" },
      { word: "lemon", vietnamese: "quả chanh", emoji: "🍋", ipa: "/ˈlemən/" }
    ]
  },
  bodyParts: {
    title: "Bộ Phận Cơ Thể",
    titleEn: "Body Parts",
    icon: "🧍",
    words: [
      { word: "head", vietnamese: "đầu", emoji: "🗣️", ipa: "/hed/" },
      { word: "eye", vietnamese: "mắt", emoji: "👁️", ipa: "/aɪ/" },
      { word: "nose", vietnamese: "mũi", emoji: "👃", ipa: "/nəʊz/" },
      { word: "mouth", vietnamese: "miệng", emoji: "👄", ipa: "/maʊθ/" },
      { word: "ear", vietnamese: "tai", emoji: "👂", ipa: "/ɪə/" },
      { word: "hand", vietnamese: "bàn tay", emoji: "✋", ipa: "/hænd/" },
      { word: "foot", vietnamese: "bàn chân", emoji: "🦶", ipa: "/fʊt/" },
      { word: "arm", vietnamese: "cánh tay", emoji: "💪", ipa: "/ɑːm/" },
      { word: "leg", vietnamese: "chân", emoji: "🦵", ipa: "/leɡ/" },
      { word: "finger", vietnamese: "ngón tay", emoji: "☝️", ipa: "/ˈfɪŋɡə/" }
    ]
  },
  food: {
    title: "Đồ Ăn",
    titleEn: "Food",
    icon: "🍔",
    words: [
      { word: "rice", vietnamese: "cơm", emoji: "🍚", ipa: "/raɪs/" },
      { word: "bread", vietnamese: "bánh mì", emoji: "🍞", ipa: "/bred/" },
      { word: "egg", vietnamese: "trứng", emoji: "🥚", ipa: "/eɡ/" },
      { word: "milk", vietnamese: "sữa", emoji: "🥛", ipa: "/mɪlk/" },
      { word: "water", vietnamese: "nước", emoji: "💧", ipa: "/ˈwɔːtə/" },
      { word: "cake", vietnamese: "bánh ngọt", emoji: "🎂", ipa: "/keɪk/" },
      { word: "candy", vietnamese: "kẹo", emoji: "🍬", ipa: "/ˈkændi/" },
      { word: "ice cream", vietnamese: "kem", emoji: "🍦", ipa: "/aɪs kriːm/" },
      { word: "pizza", vietnamese: "bánh pizza", emoji: "🍕", ipa: "/ˈpiːtsə/" },
      { word: "chicken", vietnamese: "thịt gà", emoji: "🍗", ipa: "/ˈtʃɪkɪn/" }
    ]
  },

  // ========== NEW TOPICS ==========

  family: {
    title: "Gia Đình",
    titleEn: "Family",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { word: "mother", vietnamese: "mẹ", emoji: "👩", ipa: "/ˈmʌðə/" },
      { word: "father", vietnamese: "bố", emoji: "👨", ipa: "/ˈfɑːðə/" },
      { word: "sister", vietnamese: "chị/em gái", emoji: "👧", ipa: "/ˈsɪstə/" },
      { word: "brother", vietnamese: "anh/em trai", emoji: "👦", ipa: "/ˈbrʌðə/" },
      { word: "grandmother", vietnamese: "bà", emoji: "👵", ipa: "/ˈɡrænmʌðə/" },
      { word: "grandfather", vietnamese: "ông", emoji: "👴", ipa: "/ˈɡrænfɑːðə/" },
      { word: "baby", vietnamese: "em bé", emoji: "👶", ipa: "/ˈbeɪbi/" },
      { word: "aunt", vietnamese: "cô/dì", emoji: "👩‍🦱", ipa: "/ɑːnt/" },
      { word: "uncle", vietnamese: "chú/bác", emoji: "👨‍🦱", ipa: "/ˈʌŋkl/" },
      { word: "family", vietnamese: "gia đình", emoji: "👨‍👩‍👧‍👦", ipa: "/ˈfæməli/" }
    ]
  },

  clothes: {
    title: "Quần Áo",
    titleEn: "Clothes",
    icon: "👕",
    words: [
      { word: "shirt", vietnamese: "áo sơ mi", emoji: "👔", ipa: "/ʃɜːt/" },
      { word: "pants", vietnamese: "quần dài", emoji: "👖", ipa: "/pænts/" },
      { word: "dress", vietnamese: "váy đầm", emoji: "👗", ipa: "/dres/" },
      { word: "shoes", vietnamese: "giày", emoji: "👟", ipa: "/ʃuːz/" },
      { word: "hat", vietnamese: "mũ/nón", emoji: "🧢", ipa: "/hæt/" },
      { word: "socks", vietnamese: "tất/vớ", emoji: "🧦", ipa: "/sɒks/" },
      { word: "jacket", vietnamese: "áo khoác", emoji: "🧥", ipa: "/ˈdʒækɪt/" },
      { word: "skirt", vietnamese: "chân váy", emoji: "👗", ipa: "/skɜːt/" },
      { word: "shorts", vietnamese: "quần đùi", emoji: "🩳", ipa: "/ʃɔːts/" },
      { word: "glasses", vietnamese: "kính mắt", emoji: "👓", ipa: "/ˈɡlɑːsɪz/" }
    ]
  },

  weather: {
    title: "Thời Tiết",
    titleEn: "Weather",
    icon: "🌤️",
    words: [
      { word: "sunny", vietnamese: "nắng", emoji: "☀️", ipa: "/ˈsʌni/" },
      { word: "rainy", vietnamese: "mưa", emoji: "🌧️", ipa: "/ˈreɪni/" },
      { word: "cloudy", vietnamese: "nhiều mây", emoji: "☁️", ipa: "/ˈklaʊdi/" },
      { word: "windy", vietnamese: "gió", emoji: "💨", ipa: "/ˈwɪndi/" },
      { word: "snowy", vietnamese: "tuyết", emoji: "❄️", ipa: "/ˈsnəʊi/" },
      { word: "hot", vietnamese: "nóng", emoji: "🥵", ipa: "/hɒt/" },
      { word: "cold", vietnamese: "lạnh", emoji: "🥶", ipa: "/kəʊld/" },
      { word: "rainbow", vietnamese: "cầu vồng", emoji: "🌈", ipa: "/ˈreɪnbəʊ/" },
      { word: "storm", vietnamese: "bão", emoji: "⛈️", ipa: "/stɔːm/" },
      { word: "thunder", vietnamese: "sấm sét", emoji: "🌩️", ipa: "/ˈθʌndə/" }
    ]
  },

  feelings: {
    title: "Cảm Xúc",
    titleEn: "Feelings",
    icon: "😊",
    words: [
      { word: "happy", vietnamese: "vui", emoji: "😊", ipa: "/ˈhæpi/" },
      { word: "sad", vietnamese: "buồn", emoji: "😢", ipa: "/sæd/" },
      { word: "angry", vietnamese: "giận", emoji: "😠", ipa: "/ˈæŋɡri/" },
      { word: "tired", vietnamese: "mệt", emoji: "😫", ipa: "/taɪəd/" },
      { word: "scared", vietnamese: "sợ", emoji: "😨", ipa: "/skeəd/" },
      { word: "hungry", vietnamese: "đói", emoji: "🤤", ipa: "/ˈhʌŋɡri/" },
      { word: "thirsty", vietnamese: "khát", emoji: "😋", ipa: "/ˈθɜːsti/" },
      { word: "excited", vietnamese: "phấn khích", emoji: "🤩", ipa: "/ɪkˈsaɪtɪd/" },
      { word: "sleepy", vietnamese: "buồn ngủ", emoji: "😴", ipa: "/ˈsliːpi/" },
      { word: "sick", vietnamese: "ốm/bệnh", emoji: "🤒", ipa: "/sɪk/" }
    ]
  },

  school: {
    title: "Trường Học",
    titleEn: "School",
    icon: "🎒",
    words: [
      { word: "book", vietnamese: "sách", emoji: "📚", ipa: "/bʊk/" },
      { word: "pencil", vietnamese: "bút chì", emoji: "✏️", ipa: "/ˈpensl/" },
      { word: "pen", vietnamese: "bút", emoji: "🖊️", ipa: "/pen/" },
      { word: "eraser", vietnamese: "tẩy/gôm", emoji: "🧽", ipa: "/ɪˈreɪzə/" },
      { word: "ruler", vietnamese: "thước kẻ", emoji: "📏", ipa: "/ˈruːlə/" },
      { word: "bag", vietnamese: "cặp/túi", emoji: "🎒", ipa: "/bæɡ/" },
      { word: "desk", vietnamese: "bàn học", emoji: "🪑", ipa: "/desk/" },
      { word: "chair", vietnamese: "ghế", emoji: "💺", ipa: "/tʃeə/" },
      { word: "teacher", vietnamese: "giáo viên", emoji: "👩‍🏫", ipa: "/ˈtiːtʃə/" },
      { word: "student", vietnamese: "học sinh", emoji: "👨‍🎓", ipa: "/ˈstjuːdnt/" }
    ]
  },

  transport: {
    title: "Phương Tiện",
    titleEn: "Transport",
    icon: "🚗",
    words: [
      { word: "car", vietnamese: "ô tô", emoji: "🚗", ipa: "/kɑː/" },
      { word: "bus", vietnamese: "xe buýt", emoji: "🚌", ipa: "/bʌs/" },
      { word: "train", vietnamese: "tàu hỏa", emoji: "🚂", ipa: "/treɪn/" },
      { word: "airplane", vietnamese: "máy bay", emoji: "✈️", ipa: "/ˈeəpleɪn/" },
      { word: "bicycle", vietnamese: "xe đạp", emoji: "🚲", ipa: "/ˈbaɪsɪkl/" },
      { word: "boat", vietnamese: "thuyền", emoji: "⛵", ipa: "/bəʊt/" },
      { word: "motorcycle", vietnamese: "xe máy", emoji: "🏍️", ipa: "/ˈməʊtəsaɪkl/" },
      { word: "truck", vietnamese: "xe tải", emoji: "🚚", ipa: "/trʌk/" },
      { word: "helicopter", vietnamese: "trực thăng", emoji: "🚁", ipa: "/ˈhelɪkɒptə/" },
      { word: "ship", vietnamese: "tàu thủy", emoji: "🚢", ipa: "/ʃɪp/" }
    ]
  },

  house: {
    title: "Ngôi Nhà",
    titleEn: "House",
    icon: "🏠",
    words: [
      { word: "bedroom", vietnamese: "phòng ngủ", emoji: "🛏️", ipa: "/ˈbedruːm/" },
      { word: "bathroom", vietnamese: "phòng tắm", emoji: "🚿", ipa: "/ˈbɑːθruːm/" },
      { word: "kitchen", vietnamese: "nhà bếp", emoji: "🍳", ipa: "/ˈkɪtʃɪn/" },
      { word: "living room", vietnamese: "phòng khách", emoji: "🛋️", ipa: "/ˈlɪvɪŋ ruːm/" },
      { word: "door", vietnamese: "cửa", emoji: "🚪", ipa: "/dɔː/" },
      { word: "window", vietnamese: "cửa sổ", emoji: "🪟", ipa: "/ˈwɪndəʊ/" },
      { word: "roof", vietnamese: "mái nhà", emoji: "🏠", ipa: "/ruːf/" },
      { word: "garden", vietnamese: "vườn", emoji: "🌷", ipa: "/ˈɡɑːdn/" },
      { word: "stairs", vietnamese: "cầu thang", emoji: "🪜", ipa: "/steəz/" },
      { word: "table", vietnamese: "bàn", emoji: "🪑", ipa: "/ˈteɪbl/" }
    ]
  },

  days: {
    title: "Ngày Tháng",
    titleEn: "Days & Months",
    icon: "📅",
    words: [
      { word: "Monday", vietnamese: "thứ hai", emoji: "1️⃣", ipa: "/ˈmʌndeɪ/" },
      { word: "Tuesday", vietnamese: "thứ ba", emoji: "2️⃣", ipa: "/ˈtjuːzdeɪ/" },
      { word: "Wednesday", vietnamese: "thứ tư", emoji: "3️⃣", ipa: "/ˈwenzdeɪ/" },
      { word: "Thursday", vietnamese: "thứ năm", emoji: "4️⃣", ipa: "/ˈθɜːzdeɪ/" },
      { word: "Friday", vietnamese: "thứ sáu", emoji: "5️⃣", ipa: "/ˈfraɪdeɪ/" },
      { word: "Saturday", vietnamese: "thứ bảy", emoji: "6️⃣", ipa: "/ˈsætədeɪ/" },
      { word: "Sunday", vietnamese: "chủ nhật", emoji: "7️⃣", ipa: "/ˈsʌndeɪ/" },
      { word: "today", vietnamese: "hôm nay", emoji: "📆", ipa: "/təˈdeɪ/" },
      { word: "tomorrow", vietnamese: "ngày mai", emoji: "➡️", ipa: "/təˈmɒrəʊ/" },
      { word: "yesterday", vietnamese: "hôm qua", emoji: "⬅️", ipa: "/ˈjestədeɪ/" }
    ]
  },

  shapes: {
    title: "Hình Dạng",
    titleEn: "Shapes",
    icon: "🔷",
    words: [
      { word: "circle", vietnamese: "hình tròn", emoji: "⭕", ipa: "/ˈsɜːkl/" },
      { word: "square", vietnamese: "hình vuông", emoji: "🟦", ipa: "/skweə/" },
      { word: "triangle", vietnamese: "tam giác", emoji: "🔺", ipa: "/ˈtraɪæŋɡl/" },
      { word: "rectangle", vietnamese: "hình chữ nhật", emoji: "▬", ipa: "/ˈrektæŋɡl/" },
      { word: "star", vietnamese: "ngôi sao", emoji: "⭐", ipa: "/stɑː/" },
      { word: "heart", vietnamese: "trái tim", emoji: "❤️", ipa: "/hɑːt/" },
      { word: "diamond", vietnamese: "hình thoi", emoji: "💎", ipa: "/ˈdaɪəmənd/" },
      { word: "oval", vietnamese: "hình bầu dục", emoji: "🥚", ipa: "/ˈəʊvl/" },
      { word: "cube", vietnamese: "hình lập phương", emoji: "🧊", ipa: "/kjuːb/" },
      { word: "sphere", vietnamese: "hình cầu", emoji: "🔮", ipa: "/sfɪə/" }
    ]
  },

  toys: {
    title: "Đồ Chơi",
    titleEn: "Toys",
    icon: "🧸",
    words: [
      { word: "ball", vietnamese: "quả bóng", emoji: "⚽", ipa: "/bɔːl/" },
      { word: "doll", vietnamese: "búp bê", emoji: "🪆", ipa: "/dɒl/" },
      { word: "teddy bear", vietnamese: "gấu bông", emoji: "🧸", ipa: "/ˈtedi beə/" },
      { word: "robot", vietnamese: "người máy", emoji: "🤖", ipa: "/ˈrəʊbɒt/" },
      { word: "blocks", vietnamese: "khối xếp hình", emoji: "🧱", ipa: "/blɒks/" },
      { word: "puzzle", vietnamese: "xếp hình", emoji: "🧩", ipa: "/ˈpʌzl/" },
      { word: "kite", vietnamese: "diều", emoji: "🪁", ipa: "/kaɪt/" },
      { word: "balloon", vietnamese: "bóng bay", emoji: "🎈", ipa: "/bəˈluːn/" },
      { word: "drum", vietnamese: "trống", emoji: "🥁", ipa: "/drʌm/" },
      { word: "train", vietnamese: "tàu hỏa đồ chơi", emoji: "🚂", ipa: "/treɪn/" }
    ]
  },

  verbs: {
    title: "Động Từ",
    titleEn: "Action Verbs",
    icon: "🏃",
    words: [
      { word: "run", vietnamese: "chạy", emoji: "🏃", ipa: "/rʌn/" },
      { word: "walk", vietnamese: "đi bộ", emoji: "🚶", ipa: "/wɔːk/" },
      { word: "jump", vietnamese: "nhảy", emoji: "🦘", ipa: "/dʒʌmp/" },
      { word: "eat", vietnamese: "ăn", emoji: "🍽️", ipa: "/iːt/" },
      { word: "drink", vietnamese: "uống", emoji: "🥤", ipa: "/drɪŋk/" },
      { word: "sleep", vietnamese: "ngủ", emoji: "😴", ipa: "/sliːp/" },
      { word: "read", vietnamese: "đọc", emoji: "📖", ipa: "/riːd/" },
      { word: "write", vietnamese: "viết", emoji: "✍️", ipa: "/raɪt/" },
      { word: "play", vietnamese: "chơi", emoji: "🎮", ipa: "/pleɪ/" },
      { word: "sing", vietnamese: "hát", emoji: "🎤", ipa: "/sɪŋ/" }
    ]
  },

  nature: {
    title: "Thiên Nhiên",
    titleEn: "Nature",
    icon: "🌳",
    words: [
      { word: "tree", vietnamese: "cây", emoji: "🌳", ipa: "/triː/" },
      { word: "flower", vietnamese: "hoa", emoji: "🌸", ipa: "/ˈflaʊə/" },
      { word: "grass", vietnamese: "cỏ", emoji: "🌿", ipa: "/ɡrɑːs/" },
      { word: "sun", vietnamese: "mặt trời", emoji: "☀️", ipa: "/sʌn/" },
      { word: "moon", vietnamese: "mặt trăng", emoji: "🌙", ipa: "/muːn/" },
      { word: "star", vietnamese: "ngôi sao", emoji: "⭐", ipa: "/stɑː/" },
      { word: "cloud", vietnamese: "mây", emoji: "☁️", ipa: "/klaʊd/" },
      { word: "river", vietnamese: "sông", emoji: "🏞️", ipa: "/ˈrɪvə/" },
      { word: "mountain", vietnamese: "núi", emoji: "🏔️", ipa: "/ˈmaʊntɪn/" },
      { word: "sea", vietnamese: "biển", emoji: "🌊", ipa: "/siː/" }
    ]
  },

  // ========== NEW CONTENT EXPANSION ==========

  sports: {
    title: "Thể Thao",
    titleEn: "Sports",
    icon: "⚽",
    words: [
      { word: "soccer", vietnamese: "bóng đá", emoji: "⚽", ipa: "/ˈsɒkə/" },
      { word: "basketball", vietnamese: "bóng rổ", emoji: "🏀", ipa: "/ˈbɑːskɪtbɔːl/" },
      { word: "swimming", vietnamese: "bơi lội", emoji: "🏊", ipa: "/ˈswɪmɪŋ/" },
      { word: "tennis", vietnamese: "quần vợt", emoji: "🎾", ipa: "/ˈtenɪs/" },
      { word: "badminton", vietnamese: "cầu lông", emoji: "🏸", ipa: "/ˈbædmɪntən/" },
      { word: "running", vietnamese: "chạy bộ", emoji: "🏃", ipa: "/ˈrʌnɪŋ/" },
      { word: "cycling", vietnamese: "đạp xe", emoji: "🚴", ipa: "/ˈsaɪklɪŋ/" },
      { word: "volleyball", vietnamese: "bóng chuyền", emoji: "🏐", ipa: "/ˈvɒlibɔːl/" },
      { word: "skating", vietnamese: "trượt băng", emoji: "⛸️", ipa: "/ˈskeɪtɪŋ/" },
      { word: "gymnastics", vietnamese: "thể dục", emoji: "🤸", ipa: "/dʒɪmˈnæstɪks/" }
    ]
  },

  jobs: {
    title: "Nghề Nghiệp",
    titleEn: "Jobs",
    icon: "👨‍💼",
    words: [
      { word: "doctor", vietnamese: "bác sĩ", emoji: "👨‍⚕️", ipa: "/ˈdɒktə/" },
      { word: "nurse", vietnamese: "y tá", emoji: "👩‍⚕️", ipa: "/nɜːs/" },
      { word: "teacher", vietnamese: "giáo viên", emoji: "👩‍🏫", ipa: "/ˈtiːtʃə/" },
      { word: "police", vietnamese: "cảnh sát", emoji: "👮", ipa: "/pəˈliːs/" },
      { word: "firefighter", vietnamese: "lính cứu hỏa", emoji: "👨‍🚒", ipa: "/ˈfaɪəfaɪtə/" },
      { word: "chef", vietnamese: "đầu bếp", emoji: "👨‍🍳", ipa: "/ʃef/" },
      { word: "farmer", vietnamese: "nông dân", emoji: "👨‍🌾", ipa: "/ˈfɑːmə/" },
      { word: "pilot", vietnamese: "phi công", emoji: "👨‍✈️", ipa: "/ˈpaɪlət/" },
      { word: "artist", vietnamese: "họa sĩ", emoji: "👨‍🎨", ipa: "/ˈɑːtɪst/" },
      { word: "singer", vietnamese: "ca sĩ", emoji: "🎤", ipa: "/ˈsɪŋə/" }
    ]
  },

  adjectives: {
    title: "Tính Từ",
    titleEn: "Adjectives",
    icon: "📝",
    words: [
      { word: "big", vietnamese: "to/lớn", emoji: "🐘", ipa: "/bɪɡ/" },
      { word: "small", vietnamese: "nhỏ", emoji: "🐜", ipa: "/smɔːl/" },
      { word: "fast", vietnamese: "nhanh", emoji: "🚀", ipa: "/fɑːst/" },
      { word: "slow", vietnamese: "chậm", emoji: "🐢", ipa: "/sləʊ/" },
      { word: "tall", vietnamese: "cao", emoji: "🦒", ipa: "/tɔːl/" },
      { word: "short", vietnamese: "thấp/ngắn", emoji: "🐁", ipa: "/ʃɔːt/" },
      { word: "heavy", vietnamese: "nặng", emoji: "🏋️", ipa: "/ˈhevi/" },
      { word: "light", vietnamese: "nhẹ", emoji: "🪶", ipa: "/laɪt/" },
      { word: "beautiful", vietnamese: "đẹp", emoji: "🌹", ipa: "/ˈbjuːtɪfl/" },
      { word: "cute", vietnamese: "dễ thương", emoji: "🐰", ipa: "/kjuːt/" }
    ]
  },

  seasons: {
    title: "Mùa",
    titleEn: "Seasons",
    icon: "🌸",
    words: [
      { word: "spring", vietnamese: "mùa xuân", emoji: "🌸", ipa: "/sprɪŋ/" },
      { word: "summer", vietnamese: "mùa hè", emoji: "☀️", ipa: "/ˈsʌmə/" },
      { word: "autumn", vietnamese: "mùa thu", emoji: "🍂", ipa: "/ˈɔːtəm/" },
      { word: "winter", vietnamese: "mùa đông", emoji: "❄️", ipa: "/ˈwɪntə/" },
      { word: "warm", vietnamese: "ấm áp", emoji: "🌤️", ipa: "/wɔːm/" },
      { word: "cool", vietnamese: "mát mẻ", emoji: "🌬️", ipa: "/kuːl/" },
      { word: "leaves", vietnamese: "lá cây", emoji: "🍃", ipa: "/liːvz/" },
      { word: "snow", vietnamese: "tuyết", emoji: "🌨️", ipa: "/snəʊ/" },
      { word: "beach", vietnamese: "bãi biển", emoji: "🏖️", ipa: "/biːtʃ/" },
      { word: "holiday", vietnamese: "kỳ nghỉ", emoji: "🎄", ipa: "/ˈhɒlədeɪ/" }
    ]
  },

  phrases: {
    title: "Câu Giao Tiếp",
    titleEn: "Basic Phrases",
    icon: "💬",
    words: [
      { word: "Hello!", vietnamese: "Xin chào!", emoji: "👋", ipa: "/həˈləʊ/" },
      { word: "Goodbye!", vietnamese: "Tạm biệt!", emoji: "👋", ipa: "/ɡʊdˈbaɪ/" },
      { word: "Thank you!", vietnamese: "Cảm ơn!", emoji: "🙏", ipa: "/θæŋk juː/" },
      { word: "Please", vietnamese: "Làm ơn", emoji: "🙏", ipa: "/pliːz/" },
      { word: "Sorry", vietnamese: "Xin lỗi", emoji: "😔", ipa: "/ˈsɒri/" },
      { word: "Yes", vietnamese: "Vâng/Có", emoji: "✅", ipa: "/jes/" },
      { word: "No", vietnamese: "Không", emoji: "❌", ipa: "/nəʊ/" },
      { word: "How are you?", vietnamese: "Bạn khỏe không?", emoji: "😊", ipa: "/haʊ ɑː juː/" },
      { word: "I love you", vietnamese: "Con yêu mẹ/bố", emoji: "❤️", ipa: "/aɪ lʌv juː/" },
      { word: "Good morning!", vietnamese: "Chào buổi sáng!", emoji: "🌅", ipa: "/ɡʊd ˈmɔːnɪŋ/" }
    ]
  }
};

const songsData = [
  {
    id: 1,
    title: "ABC Song",
    description: "Học bảng chữ cái tiếng Anh",
    thumbnail: "🔤",
    youtubeId: "75p-N9YKqNo"
  },
  {
    id: 2,
    title: "Twinkle Twinkle Little Star",
    description: "Bài hát về ngôi sao lấp lánh",
    thumbnail: "⭐",
    youtubeId: "yCjJyiqpAuU"
  },
  {
    id: 3,
    title: "Baby Shark",
    description: "Bài hát vui nhộn về cá mập",
    thumbnail: "🦈",
    youtubeId: "XqZsoesa55w"
  },
  {
    id: 4,
    title: "Head Shoulders Knees and Toes",
    description: "Học các bộ phận cơ thể",
    thumbnail: "🧍",
    youtubeId: "h4eueDYPTIg"
  },
  {
    id: 5,
    title: "Old MacDonald Had a Farm",
    description: "Bài hát về nông trại và động vật",
    thumbnail: "🚜",
    youtubeId: "5oYKonYBujg"
  },
  {
    id: 6,
    title: "If You're Happy and You Know It",
    description: "Bài hát vui vẻ",
    thumbnail: "😊",
    youtubeId: "l4WNrvVjiTw"
  },
  {
    id: 7,
    title: "Wheels on the Bus",
    description: "Bài hát về xe buýt",
    thumbnail: "🚌",
    youtubeId: "e_04ZrNroTo"
  },
  {
    id: 8,
    title: "Five Little Ducks",
    description: "Học đếm với những chú vịt con",
    thumbnail: "🦆",
    youtubeId: "pZw9veQ76fo"
  }
];

// Quiz questions generated from vocabulary
function generateQuizQuestions(category, count = 5) {
  const categoryData = vocabularyData[category];
  if (!categoryData) return [];

  const words = [...categoryData.words];
  const questions = [];

  // Shuffle words
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  // Generate questions
  for (let i = 0; i < Math.min(count, words.length); i++) {
    const correctWord = words[i];
    const otherWords = words.filter(w => w.word !== correctWord.word);

    // Get 3 random wrong answers
    const wrongAnswers = [];
    for (let j = 0; j < 3 && j < otherWords.length; j++) {
      const randomIndex = Math.floor(Math.random() * otherWords.length);
      wrongAnswers.push(otherWords.splice(randomIndex, 1)[0]);
    }

    // Create options array and shuffle
    const options = [correctWord, ...wrongAnswers];
    for (let k = options.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [options[k], options[j]] = [options[j], options[k]];
    }

    questions.push({
      emoji: correctWord.emoji,
      correctAnswer: correctWord.word,
      vietnamese: correctWord.vietnamese,
      options: options.map(o => o.word)
    });
  }

  return questions;
}
