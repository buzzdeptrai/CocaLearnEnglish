// Data cho App Hoc Tieng Anh Cho Be

const vocabularyData = {
  animals: {
    title: "Dong Vat",
    titleEn: "Animals",
    icon: "🐾",
    words: [
      { word: "dog", vietnamese: "con cho", emoji: "🐕" },
      { word: "cat", vietnamese: "con meo", emoji: "🐱" },
      { word: "bird", vietnamese: "con chim", emoji: "🐦" },
      { word: "fish", vietnamese: "con ca", emoji: "🐟" },
      { word: "lion", vietnamese: "con su tu", emoji: "🦁" },
      { word: "elephant", vietnamese: "con voi", emoji: "🐘" },
      { word: "monkey", vietnamese: "con khi", emoji: "🐒" },
      { word: "rabbit", vietnamese: "con tho", emoji: "🐰" },
      { word: "bear", vietnamese: "con gau", emoji: "🐻" },
      { word: "tiger", vietnamese: "con ho", emoji: "🐯" }
    ]
  },
  colors: {
    title: "Mau Sac",
    titleEn: "Colors",
    icon: "🎨",
    words: [
      { word: "red", vietnamese: "mau do", emoji: "🔴", color: "#e74c3c" },
      { word: "blue", vietnamese: "mau xanh duong", emoji: "🔵", color: "#3498db" },
      { word: "green", vietnamese: "mau xanh la", emoji: "🟢", color: "#2ecc71" },
      { word: "yellow", vietnamese: "mau vang", emoji: "🟡", color: "#f1c40f" },
      { word: "orange", vietnamese: "mau cam", emoji: "🟠", color: "#e67e22" },
      { word: "purple", vietnamese: "mau tim", emoji: "🟣", color: "#9b59b6" },
      { word: "pink", vietnamese: "mau hong", emoji: "🩷", color: "#e91e8c" },
      { word: "white", vietnamese: "mau trang", emoji: "⚪", color: "#ecf0f1" },
      { word: "black", vietnamese: "mau den", emoji: "⚫", color: "#2c3e50" },
      { word: "brown", vietnamese: "mau nau", emoji: "🟤", color: "#8b4513" }
    ]
  },
  numbers: {
    title: "So Dem",
    titleEn: "Numbers",
    icon: "🔢",
    words: [
      { word: "one", vietnamese: "mot", emoji: "1️⃣", number: 1 },
      { word: "two", vietnamese: "hai", emoji: "2️⃣", number: 2 },
      { word: "three", vietnamese: "ba", emoji: "3️⃣", number: 3 },
      { word: "four", vietnamese: "bon", emoji: "4️⃣", number: 4 },
      { word: "five", vietnamese: "nam", emoji: "5️⃣", number: 5 },
      { word: "six", vietnamese: "sau", emoji: "6️⃣", number: 6 },
      { word: "seven", vietnamese: "bay", emoji: "7️⃣", number: 7 },
      { word: "eight", vietnamese: "tam", emoji: "8️⃣", number: 8 },
      { word: "nine", vietnamese: "chin", emoji: "9️⃣", number: 9 },
      { word: "ten", vietnamese: "muoi", emoji: "🔟", number: 10 }
    ]
  },
  fruits: {
    title: "Trai Cay",
    titleEn: "Fruits",
    icon: "🍎",
    words: [
      { word: "apple", vietnamese: "qua tao", emoji: "🍎" },
      { word: "banana", vietnamese: "qua chuoi", emoji: "🍌" },
      { word: "orange", vietnamese: "qua cam", emoji: "🍊" },
      { word: "grape", vietnamese: "qua nho", emoji: "🍇" },
      { word: "strawberry", vietnamese: "qua dau", emoji: "🍓" },
      { word: "watermelon", vietnamese: "qua dua hau", emoji: "🍉" },
      { word: "pineapple", vietnamese: "qua dua", emoji: "🍍" },
      { word: "mango", vietnamese: "qua xoai", emoji: "🥭" },
      { word: "cherry", vietnamese: "qua cherry", emoji: "🍒" },
      { word: "lemon", vietnamese: "qua chanh", emoji: "🍋" }
    ]
  },
  bodyParts: {
    title: "Bo Phan Co The",
    titleEn: "Body Parts",
    icon: "🧍",
    words: [
      { word: "head", vietnamese: "dau", emoji: "🗣️" },
      { word: "eye", vietnamese: "mat", emoji: "👁️" },
      { word: "nose", vietnamese: "mui", emoji: "👃" },
      { word: "mouth", vietnamese: "mieng", emoji: "👄" },
      { word: "ear", vietnamese: "tai", emoji: "👂" },
      { word: "hand", vietnamese: "tay", emoji: "✋" },
      { word: "foot", vietnamese: "chan", emoji: "🦶" },
      { word: "arm", vietnamese: "canh tay", emoji: "💪" },
      { word: "leg", vietnamese: "chan", emoji: "🦵" },
      { word: "finger", vietnamese: "ngon tay", emoji: "☝️" }
    ]
  },
  food: {
    title: "Do An",
    titleEn: "Food",
    icon: "🍔",
    words: [
      { word: "rice", vietnamese: "com", emoji: "🍚" },
      { word: "bread", vietnamese: "banh mi", emoji: "🍞" },
      { word: "egg", vietnamese: "trung", emoji: "🥚" },
      { word: "milk", vietnamese: "sua", emoji: "🥛" },
      { word: "water", vietnamese: "nuoc", emoji: "💧" },
      { word: "cake", vietnamese: "banh ngot", emoji: "🎂" },
      { word: "candy", vietnamese: "keo", emoji: "🍬" },
      { word: "ice cream", vietnamese: "kem", emoji: "🍦" },
      { word: "pizza", vietnamese: "pizza", emoji: "🍕" },
      { word: "chicken", vietnamese: "ga", emoji: "🍗" }
    ]
  },

  // ========== NEW TOPICS ==========

  family: {
    title: "Gia Dinh",
    titleEn: "Family",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { word: "mother", vietnamese: "me", emoji: "👩" },
      { word: "father", vietnamese: "bo", emoji: "👨" },
      { word: "sister", vietnamese: "chi/em gai", emoji: "👧" },
      { word: "brother", vietnamese: "anh/em trai", emoji: "👦" },
      { word: "grandmother", vietnamese: "ba", emoji: "👵" },
      { word: "grandfather", vietnamese: "ong", emoji: "👴" },
      { word: "baby", vietnamese: "em be", emoji: "👶" },
      { word: "aunt", vietnamese: "co/di", emoji: "👩‍🦱" },
      { word: "uncle", vietnamese: "chu/bac", emoji: "👨‍🦱" },
      { word: "family", vietnamese: "gia dinh", emoji: "👨‍👩‍👧‍👦" }
    ]
  },

  clothes: {
    title: "Quan Ao",
    titleEn: "Clothes",
    icon: "👕",
    words: [
      { word: "shirt", vietnamese: "ao so mi", emoji: "👔" },
      { word: "pants", vietnamese: "quan dai", emoji: "👖" },
      { word: "dress", vietnamese: "vay dam", emoji: "👗" },
      { word: "shoes", vietnamese: "giay", emoji: "👟" },
      { word: "hat", vietnamese: "mu/non", emoji: "🧢" },
      { word: "socks", vietnamese: "tat/vo", emoji: "🧦" },
      { word: "jacket", vietnamese: "ao khoac", emoji: "🧥" },
      { word: "skirt", vietnamese: "chan vay", emoji: "👗" },
      { word: "shorts", vietnamese: "quan dui", emoji: "🩳" },
      { word: "glasses", vietnamese: "kinh mat", emoji: "👓" }
    ]
  },

  weather: {
    title: "Thoi Tiet",
    titleEn: "Weather",
    icon: "🌤️",
    words: [
      { word: "sunny", vietnamese: "nang", emoji: "☀️" },
      { word: "rainy", vietnamese: "mua", emoji: "🌧️" },
      { word: "cloudy", vietnamese: "nhieu may", emoji: "☁️" },
      { word: "windy", vietnamese: "gio", emoji: "💨" },
      { word: "snowy", vietnamese: "tuyet", emoji: "❄️" },
      { word: "hot", vietnamese: "nong", emoji: "🥵" },
      { word: "cold", vietnamese: "lanh", emoji: "🥶" },
      { word: "rainbow", vietnamese: "cau vong", emoji: "🌈" },
      { word: "storm", vietnamese: "bao", emoji: "⛈️" },
      { word: "thunder", vietnamese: "sam set", emoji: "🌩️" }
    ]
  },

  feelings: {
    title: "Cam Xuc",
    titleEn: "Feelings",
    icon: "😊",
    words: [
      { word: "happy", vietnamese: "vui", emoji: "😊" },
      { word: "sad", vietnamese: "buon", emoji: "😢" },
      { word: "angry", vietnamese: "gian", emoji: "😠" },
      { word: "tired", vietnamese: "met", emoji: "😫" },
      { word: "scared", vietnamese: "so", emoji: "😨" },
      { word: "hungry", vietnamese: "doi", emoji: "🤤" },
      { word: "thirsty", vietnamese: "khat", emoji: "😋" },
      { word: "excited", vietnamese: "phan khich", emoji: "🤩" },
      { word: "sleepy", vietnamese: "buon ngu", emoji: "😴" },
      { word: "sick", vietnamese: "om/benh", emoji: "🤒" }
    ]
  },

  school: {
    title: "Truong Hoc",
    titleEn: "School",
    icon: "🎒",
    words: [
      { word: "book", vietnamese: "sach", emoji: "📚" },
      { word: "pencil", vietnamese: "but chi", emoji: "✏️" },
      { word: "pen", vietnamese: "but", emoji: "🖊️" },
      { word: "eraser", vietnamese: "tay/gom", emoji: "🧽" },
      { word: "ruler", vietnamese: "thuoc ke", emoji: "📏" },
      { word: "bag", vietnamese: "cap/tui", emoji: "🎒" },
      { word: "desk", vietnamese: "ban hoc", emoji: "🪑" },
      { word: "chair", vietnamese: "ghe", emoji: "💺" },
      { word: "teacher", vietnamese: "giao vien", emoji: "👩‍🏫" },
      { word: "student", vietnamese: "hoc sinh", emoji: "👨‍🎓" }
    ]
  },

  transport: {
    title: "Phuong Tien",
    titleEn: "Transport",
    icon: "🚗",
    words: [
      { word: "car", vietnamese: "o to", emoji: "🚗" },
      { word: "bus", vietnamese: "xe buyt", emoji: "🚌" },
      { word: "train", vietnamese: "tau hoa", emoji: "🚂" },
      { word: "airplane", vietnamese: "may bay", emoji: "✈️" },
      { word: "bicycle", vietnamese: "xe dap", emoji: "🚲" },
      { word: "boat", vietnamese: "thuyen", emoji: "⛵" },
      { word: "motorcycle", vietnamese: "xe may", emoji: "🏍️" },
      { word: "truck", vietnamese: "xe tai", emoji: "🚚" },
      { word: "helicopter", vietnamese: "truc thang", emoji: "🚁" },
      { word: "ship", vietnamese: "tau thuy", emoji: "🚢" }
    ]
  },

  house: {
    title: "Ngoi Nha",
    titleEn: "House",
    icon: "🏠",
    words: [
      { word: "bedroom", vietnamese: "phong ngu", emoji: "🛏️" },
      { word: "bathroom", vietnamese: "phong tam", emoji: "🚿" },
      { word: "kitchen", vietnamese: "nha bep", emoji: "🍳" },
      { word: "living room", vietnamese: "phong khach", emoji: "🛋️" },
      { word: "door", vietnamese: "cua", emoji: "🚪" },
      { word: "window", vietnamese: "cua so", emoji: "🪟" },
      { word: "roof", vietnamese: "mai nha", emoji: "🏠" },
      { word: "garden", vietnamese: "vuon", emoji: "🌷" },
      { word: "stairs", vietnamese: "cau thang", emoji: "🪜" },
      { word: "table", vietnamese: "ban", emoji: "🪑" }
    ]
  },

  days: {
    title: "Ngay Thang",
    titleEn: "Days & Months",
    icon: "📅",
    words: [
      { word: "Monday", vietnamese: "thu hai", emoji: "1️⃣" },
      { word: "Tuesday", vietnamese: "thu ba", emoji: "2️⃣" },
      { word: "Wednesday", vietnamese: "thu tu", emoji: "3️⃣" },
      { word: "Thursday", vietnamese: "thu nam", emoji: "4️⃣" },
      { word: "Friday", vietnamese: "thu sau", emoji: "5️⃣" },
      { word: "Saturday", vietnamese: "thu bay", emoji: "6️⃣" },
      { word: "Sunday", vietnamese: "chu nhat", emoji: "7️⃣" },
      { word: "today", vietnamese: "hom nay", emoji: "📆" },
      { word: "tomorrow", vietnamese: "ngay mai", emoji: "➡️" },
      { word: "yesterday", vietnamese: "hom qua", emoji: "⬅️" }
    ]
  },

  shapes: {
    title: "Hinh Dang",
    titleEn: "Shapes",
    icon: "🔷",
    words: [
      { word: "circle", vietnamese: "hinh tron", emoji: "⭕" },
      { word: "square", vietnamese: "hinh vuong", emoji: "🟦" },
      { word: "triangle", vietnamese: "tam giac", emoji: "🔺" },
      { word: "rectangle", vietnamese: "hinh chu nhat", emoji: "▬" },
      { word: "star", vietnamese: "ngoi sao", emoji: "⭐" },
      { word: "heart", vietnamese: "trai tim", emoji: "❤️" },
      { word: "diamond", vietnamese: "hinh thoi", emoji: "💎" },
      { word: "oval", vietnamese: "hinh bau duc", emoji: "🥚" },
      { word: "cube", vietnamese: "hinh lap phuong", emoji: "🧊" },
      { word: "sphere", vietnamese: "hinh cau", emoji: "🔮" }
    ]
  },

  toys: {
    title: "Do Choi",
    titleEn: "Toys",
    icon: "🧸",
    words: [
      { word: "ball", vietnamese: "qua bong", emoji: "⚽" },
      { word: "doll", vietnamese: "bup be", emoji: "🪆" },
      { word: "teddy bear", vietnamese: "gau bong", emoji: "🧸" },
      { word: "robot", vietnamese: "nguoi may", emoji: "🤖" },
      { word: "blocks", vietnamese: "khoi xep hinh", emoji: "🧱" },
      { word: "puzzle", vietnamese: "xep hinh", emoji: "🧩" },
      { word: "kite", vietnamese: "dieu", emoji: "🪁" },
      { word: "balloon", vietnamese: "bong bay", emoji: "🎈" },
      { word: "drum", vietnamese: "trong", emoji: "🥁" },
      { word: "train", vietnamese: "tau hoa do choi", emoji: "🚂" }
    ]
  },

  verbs: {
    title: "Dong Tu",
    titleEn: "Action Verbs",
    icon: "🏃",
    words: [
      { word: "run", vietnamese: "chay", emoji: "🏃" },
      { word: "walk", vietnamese: "di bo", emoji: "🚶" },
      { word: "jump", vietnamese: "nhay", emoji: "🦘" },
      { word: "eat", vietnamese: "an", emoji: "🍽️" },
      { word: "drink", vietnamese: "uong", emoji: "🥤" },
      { word: "sleep", vietnamese: "ngu", emoji: "😴" },
      { word: "read", vietnamese: "doc", emoji: "📖" },
      { word: "write", vietnamese: "viet", emoji: "✍️" },
      { word: "play", vietnamese: "choi", emoji: "🎮" },
      { word: "sing", vietnamese: "hat", emoji: "🎤" }
    ]
  },

  nature: {
    title: "Thien Nhien",
    titleEn: "Nature",
    icon: "🌳",
    words: [
      { word: "tree", vietnamese: "cay", emoji: "🌳" },
      { word: "flower", vietnamese: "hoa", emoji: "🌸" },
      { word: "grass", vietnamese: "co", emoji: "🌿" },
      { word: "sun", vietnamese: "mat troi", emoji: "☀️" },
      { word: "moon", vietnamese: "mat trang", emoji: "🌙" },
      { word: "star", vietnamese: "ngoi sao", emoji: "⭐" },
      { word: "cloud", vietnamese: "may", emoji: "☁️" },
      { word: "river", vietnamese: "song", emoji: "🏞️" },
      { word: "mountain", vietnamese: "nui", emoji: "🏔️" },
      { word: "sea", vietnamese: "bien", emoji: "🌊" }
    ]
  }
};

const songsData = [
  {
    id: 1,
    title: "ABC Song",
    description: "Hoc bang chu cai tieng Anh",
    thumbnail: "🔤",
    youtubeId: "75p-N9YKqNo"
  },
  {
    id: 2,
    title: "Twinkle Twinkle Little Star",
    description: "Bai hat ve ngoi sao lap lanh",
    thumbnail: "⭐",
    youtubeId: "yCjJyiqpAuU"
  },
  {
    id: 3,
    title: "Baby Shark",
    description: "Bai hat vui nhon ve ca map",
    thumbnail: "🦈",
    youtubeId: "XqZsoesa55w"
  },
  {
    id: 4,
    title: "Head Shoulders Knees and Toes",
    description: "Hoc cac bo phan co the",
    thumbnail: "🧍",
    youtubeId: "h4eueDYPTIg"
  },
  {
    id: 5,
    title: "Old MacDonald Had a Farm",
    description: "Bai hat ve nong trai va dong vat",
    thumbnail: "🚜",
    youtubeId: "5oYKonYBujg"
  },
  {
    id: 6,
    title: "If You're Happy and You Know It",
    description: "Bai hat vui ve",
    thumbnail: "😊",
    youtubeId: "l4WNrvVjiTw"
  },
  {
    id: 7,
    title: "Wheels on the Bus",
    description: "Bai hat ve xe bus",
    thumbnail: "🚌",
    youtubeId: "e_04ZrNroTo"
  },
  {
    id: 8,
    title: "Five Little Ducks",
    description: "Hoc dem voi nhung chu vit con",
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
