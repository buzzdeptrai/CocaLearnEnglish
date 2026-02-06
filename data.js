// Data cho App Học Tiếng Anh Cho Bé

const vocabularyData = {
  animals: {
    title: "Animals",
    titleEn: "Animals",
    icon: "🐾",
    words: [
      { word: "dog", vietnamese: "con chó", emoji: "🐕", ipa: "/dɒɡ/", example: "I have a dog.", exampleVn: "Tôi có một con chó." },
      { word: "cat", vietnamese: "con mèo", emoji: "🐱", ipa: "/kæt/", example: "The cat is sleeping.", exampleVn: "Con mèo đang ngủ." },
      { word: "bird", vietnamese: "con chim", emoji: "🐦", ipa: "/bɜːd/", example: "The bird can fly.", exampleVn: "Con chim có thể bay." },
      { word: "fish", vietnamese: "con cá", emoji: "🐟", ipa: "/fɪʃ/", example: "The fish swims fast.", exampleVn: "Con cá bơi nhanh." },
      { word: "lion", vietnamese: "con sư tử", emoji: "🦁", ipa: "/ˈlaɪən/", example: "The lion is big.", exampleVn: "Con sư tử rất to." },
      { word: "elephant", vietnamese: "con voi", emoji: "🐘", ipa: "/ˈelɪfənt/", example: "The elephant is tall.", exampleVn: "Con voi rất cao." },
      { word: "monkey", vietnamese: "con khỉ", emoji: "🐒", ipa: "/ˈmʌŋki/", example: "The monkey likes bananas.", exampleVn: "Con khỉ thích chuối." },
      { word: "rabbit", vietnamese: "con thỏ", emoji: "🐰", ipa: "/ˈræbɪt/", example: "The rabbit can jump.", exampleVn: "Con thỏ có thể nhảy." },
      { word: "bear", vietnamese: "con gấu", emoji: "🐻", ipa: "/beə/", example: "The bear is strong.", exampleVn: "Con gấu rất khoẻ." },
      { word: "tiger", vietnamese: "con hổ", emoji: "🐯", ipa: "/ˈtaɪɡə/", example: "The tiger runs fast.", exampleVn: "Con hổ chạy nhanh." }
    ]
  },
  colors: {
    title: "Colors",
    titleEn: "Colors",
    icon: "🎨",
    words: [
      { word: "red", vietnamese: "màu đỏ", emoji: "🔴", color: "#e74c3c", ipa: "/red/", example: "The apple is red.", exampleVn: "Quả táo màu đỏ." },
      { word: "blue", vietnamese: "màu xanh dương", emoji: "🔵", color: "#3498db", ipa: "/bluː/", example: "The sky is blue.", exampleVn: "Bầu trời màu xanh." },
      { word: "green", vietnamese: "màu xanh lá", emoji: "🟢", color: "#2ecc71", ipa: "/ɡriːn/", example: "The grass is green.", exampleVn: "Cỏ màu xanh lá." },
      { word: "yellow", vietnamese: "màu vàng", emoji: "🟡", color: "#f1c40f", ipa: "/ˈjeləʊ/", example: "The sun is yellow.", exampleVn: "Mặt trời màu vàng." },
      { word: "orange", vietnamese: "màu cam", emoji: "🟠", color: "#e67e22", ipa: "/ˈɒrɪndʒ/", example: "I like orange.", exampleVn: "Tôi thích màu cam." },
      { word: "purple", vietnamese: "màu tím", emoji: "🟣", color: "#9b59b6", ipa: "/ˈpɜːpl/", example: "The flower is purple.", exampleVn: "Bông hoa màu tím." },
      { word: "pink", vietnamese: "màu hồng", emoji: "🩷", color: "#e91e8c", ipa: "/pɪŋk/", example: "I like pink.", exampleVn: "Tôi thích màu hồng." },
      { word: "white", vietnamese: "màu trắng", emoji: "⚪", color: "#ecf0f1", ipa: "/waɪt/", example: "The cloud is white.", exampleVn: "Đám mây màu trắng." },
      { word: "black", vietnamese: "màu đen", emoji: "⚫", color: "#2c3e50", ipa: "/blæk/", example: "The cat is black.", exampleVn: "Con mèo màu đen." },
      { word: "brown", vietnamese: "màu nâu", emoji: "🟤", color: "#8b4513", ipa: "/braʊn/", example: "The dog is brown.", exampleVn: "Con chó màu nâu." }
    ]
  },
  numbers: {
    title: "Numbers",
    titleEn: "Numbers",
    icon: "🔢",
    words: [
      { word: "one", vietnamese: "một", emoji: "1️⃣", number: 1, ipa: "/wʌn/", example: "I have one ball.", exampleVn: "Tôi có một quả bóng." },
      { word: "two", vietnamese: "hai", emoji: "2️⃣", number: 2, ipa: "/tuː/", example: "I have two hands.", exampleVn: "Tôi có hai bàn tay." },
      { word: "three", vietnamese: "ba", emoji: "3️⃣", number: 3, ipa: "/θriː/", example: "I see three birds.", exampleVn: "Tôi thấy ba con chim." },
      { word: "four", vietnamese: "bốn", emoji: "4️⃣", number: 4, ipa: "/fɔː/", example: "The dog has four legs.", exampleVn: "Con chó có bốn chân." },
      { word: "five", vietnamese: "năm", emoji: "5️⃣", number: 5, ipa: "/faɪv/", example: "I have five fingers.", exampleVn: "Tôi có năm ngón tay." },
      { word: "six", vietnamese: "sáu", emoji: "6️⃣", number: 6, ipa: "/sɪks/", example: "There are six eggs.", exampleVn: "Có sáu quả trứng." },
      { word: "seven", vietnamese: "bảy", emoji: "7️⃣", number: 7, ipa: "/ˈsevn/", example: "Seven days in a week.", exampleVn: "Một tuần có bảy ngày." },
      { word: "eight", vietnamese: "tám", emoji: "8️⃣", number: 8, ipa: "/eɪt/", example: "I am eight years old.", exampleVn: "Tôi tám tuổi." },
      { word: "nine", vietnamese: "chín", emoji: "9️⃣", number: 9, ipa: "/naɪn/", example: "I see nine stars.", exampleVn: "Tôi thấy chín ngôi sao." },
      { word: "ten", vietnamese: "mười", emoji: "🔟", number: 10, ipa: "/ten/", example: "I count to ten.", exampleVn: "Tôi đếm đến mười." }
    ]
  },
  fruits: {
    title: "Fruits",
    titleEn: "Fruits",
    icon: "🍎",
    words: [
      { word: "apple", vietnamese: "quả táo", emoji: "🍎", ipa: "/ˈæpl/", example: "I eat an apple.", exampleVn: "Tôi ăn một quả táo." },
      { word: "banana", vietnamese: "quả chuối", emoji: "🍌", ipa: "/bəˈnɑːnə/", example: "The banana is yellow.", exampleVn: "Quả chuối màu vàng." },
      { word: "orange", vietnamese: "quả cam", emoji: "🍊", ipa: "/ˈɒrɪndʒ/", example: "I drink orange juice.", exampleVn: "Tôi uống nước cam." },
      { word: "grape", vietnamese: "quả nho", emoji: "🍇", ipa: "/ɡreɪp/", example: "Grapes are sweet.", exampleVn: "Nho rất ngọt." },
      { word: "strawberry", vietnamese: "quả dâu", emoji: "🍓", ipa: "/ˈstrɔːbəri/", example: "I like strawberries.", exampleVn: "Tôi thích dâu tây." },
      { word: "watermelon", vietnamese: "quả dưa hấu", emoji: "🍉", ipa: "/ˈwɔːtəmelən/", example: "Watermelon is big.", exampleVn: "Quả dưa hấu rất to." },
      { word: "pineapple", vietnamese: "quả dứa", emoji: "🍍", ipa: "/ˈpaɪnæpl/", example: "Pineapple is yummy.", exampleVn: "Dứa rất ngon." },
      { word: "mango", vietnamese: "quả xoài", emoji: "🥭", ipa: "/ˈmæŋɡəʊ/", example: "The mango is sweet.", exampleVn: "Quả xoài rất ngọt." },
      { word: "cherry", vietnamese: "quả anh đào", emoji: "🍒", ipa: "/ˈtʃeri/", example: "Cherries are small.", exampleVn: "Anh đào rất nhỏ." },
      { word: "lemon", vietnamese: "quả chanh", emoji: "🍋", ipa: "/ˈlemən/", example: "The lemon is sour.", exampleVn: "Quả chanh rất chua." }
    ]
  },
  bodyParts: {
    title: "Body Parts",
    titleEn: "Body Parts",
    icon: "🧍",
    words: [
      { word: "head", vietnamese: "đầu", iconUrl: "assets/icons/head.svg", ipa: "/hed/", example: "Touch your head.", exampleVn: "Chạm vào đầu của con." },
      { word: "eye", vietnamese: "mắt", emoji: "👁️", ipa: "/aɪ/", example: "I have two eyes.", exampleVn: "Tôi có hai mắt." },
      { word: "nose", vietnamese: "mũi", emoji: "👃", ipa: "/nəʊz/", example: "This is my nose.", exampleVn: "Đây là mũi của tôi." },
      { word: "mouth", vietnamese: "miệng", emoji: "👄", ipa: "/maʊθ/", example: "Open your mouth.", exampleVn: "Há miệng ra." },
      { word: "ear", vietnamese: "tai", emoji: "👂", ipa: "/ɪə/", example: "I hear with my ears.", exampleVn: "Tôi nghe bằng tai." },
      { word: "hand", vietnamese: "bàn tay", emoji: "✋", ipa: "/hænd/", example: "Clap your hands.", exampleVn: "Vỗ tay nào." },
      { word: "foot", vietnamese: "bàn chân", emoji: "🦶", ipa: "/fʊt/", example: "I walk with my feet.", exampleVn: "Tôi đi bằng chân." },
      { word: "arm", vietnamese: "cánh tay", emoji: "💪", ipa: "/ɑːm/", example: "Raise your arms.", exampleVn: "Giơ tay lên." },
      { word: "leg", vietnamese: "chân", emoji: "🦵", ipa: "/leɡ/", example: "I have two legs.", exampleVn: "Tôi có hai chân." },
      { word: "finger", vietnamese: "ngón tay", emoji: "☝️", ipa: "/ˈfɪŋɡə/", example: "I have ten fingers.", exampleVn: "Tôi có mười ngón tay." }
    ]
  },
  food: {
    title: "Food",
    titleEn: "Food",
    icon: "🍔",
    words: [
      { word: "rice", vietnamese: "cơm", emoji: "🍚", ipa: "/raɪs/", example: "I eat rice every day.", exampleVn: "Tôi ăn cơm mỗi ngày." },
      { word: "bread", vietnamese: "bánh mì", emoji: "🍞", ipa: "/bred/", example: "I eat bread.", exampleVn: "Tôi ăn bánh mì." },
      { word: "egg", vietnamese: "trứng", emoji: "🥚", ipa: "/eɡ/", example: "I like eggs.", exampleVn: "Tôi thích trứng." },
      { word: "milk", vietnamese: "sữa", emoji: "🥛", ipa: "/mɪlk/", example: "I drink milk.", exampleVn: "Tôi uống sữa." },
      { word: "water", vietnamese: "nước", emoji: "💧", ipa: "/ˈwɔːtə/", example: "I drink water.", exampleVn: "Tôi uống nước." },
      { word: "cake", vietnamese: "bánh ngọt", emoji: "🎂", ipa: "/keɪk/", example: "The cake is yummy.", exampleVn: "Bánh ngọt rất ngon." },
      { word: "candy", vietnamese: "kẹo", emoji: "🍬", ipa: "/ˈkændi/", example: "I like candy.", exampleVn: "Tôi thích kẹo." },
      { word: "ice cream", vietnamese: "kem", emoji: "🍦", ipa: "/aɪs kriːm/", example: "I love ice cream.", exampleVn: "Tôi yêu kem." },
      { word: "pizza", vietnamese: "bánh pizza", emoji: "🍕", ipa: "/ˈpiːtsə/", example: "Pizza is delicious.", exampleVn: "Pizza rất ngon." },
      { word: "chicken", vietnamese: "thịt gà", emoji: "🍗", ipa: "/ˈtʃɪkɪn/", example: "I eat chicken.", exampleVn: "Tôi ăn thịt gà." }
    ]
  },

  // ========== NEW TOPICS ==========

  family: {
    title: "Family",
    titleEn: "Family",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { word: "mother", vietnamese: "mẹ", iconUrl: "assets/icons/family/mother.svg", ipa: "/ˈmʌðə/", example: "I love my mother.", exampleVn: "Con yêu mẹ." },
      { word: "father", vietnamese: "bố", iconUrl: "assets/icons/family/father.svg", ipa: "/ˈfɑːðə/", example: "My father is tall.", exampleVn: "Bố tôi rất cao." },
      { word: "sister", vietnamese: "chị/em gái", iconUrl: "assets/icons/family/sister.svg", ipa: "/ˈsɪstə/", example: "My sister is kind.", exampleVn: "Chị gái tôi rất tốt." },
      { word: "brother", vietnamese: "anh/em trai", iconUrl: "assets/icons/family/brother.svg", ipa: "/ˈbrʌðə/", example: "My brother plays soccer.", exampleVn: "Anh trai tôi chơi bóng đá." },
      { word: "grandmother", vietnamese: "bà", iconUrl: "assets/icons/family/grandmother.svg", ipa: "/ˈɡrænmʌðə/", example: "I visit my grandmother.", exampleVn: "Tôi thăm bà." },
      { word: "grandfather", vietnamese: "ông", iconUrl: "assets/icons/family/grandfather.svg", ipa: "/ˈɡrænfɑːðə/", example: "My grandfather reads books.", exampleVn: "Ông tôi đọc sách." },
      { word: "baby", vietnamese: "em bé", iconUrl: "assets/icons/family/baby.svg", ipa: "/ˈbeɪbi/", example: "The baby is cute.", exampleVn: "Em bé rất đáng yêu." },
      // { word: "aunt", vietnamese: "cô/dì", emoji: "👩‍🦰", ipa: "/ɑːnt/" },
      // { word: "uncle", vietnamese: "chú/bác", emoji: "👨‍🦲", ipa: "/ˈʌŋkl/" },
      { word: "family", vietnamese: "gia đình", iconUrl: "assets/icons/family/family.svg", ipa: "/ˈfæməli/", example: "I love my family.", exampleVn: "Tôi yêu gia đình." }
    ]
  },

  clothes: {
    title: "Clothes",
    titleEn: "Clothes",
    icon: "👕",
    words: [
      { word: "shirt", vietnamese: "áo sơ mi", iconUrl: "assets/icons/shirt.svg", ipa: "/ʃɜːt/", example: "I wear a shirt.", exampleVn: "Tôi mặc áo sơ mi." },
      { word: "pants", vietnamese: "quần dài", emoji: "👖", ipa: "/pænts/", example: "These pants are blue.", exampleVn: "Quần này màu xanh." },
      { word: "dress", vietnamese: "váy đầm", emoji: "👗", ipa: "/dres/", example: "The dress is pretty.", exampleVn: "Váy đầm rất đẹp." },
      { word: "shoes", vietnamese: "giày", emoji: "👟", ipa: "/ʃuːz/", example: "Put on your shoes.", exampleVn: "Đi giày vào." },
      { word: "hat", vietnamese: "mũ/nón", emoji: "🧢", ipa: "/hæt/", example: "I wear a hat.", exampleVn: "Tôi đội mũ." },
      { word: "socks", vietnamese: "tất/vớ", emoji: "🧦", ipa: "/sɒks/", example: "My socks are white.", exampleVn: "Tất của tôi màu trắng." },
      { word: "jacket", vietnamese: "áo khoác", emoji: "🧥", ipa: "/ˈdʒækɪt/", example: "Wear your jacket.", exampleVn: "Mặc áo khoác vào." },
      { word: "skirt", vietnamese: "chân váy", emoji: "👗", ipa: "/skɜːt/", example: "The skirt is pink.", exampleVn: "Chân váy màu hồng." },
      { word: "shorts", vietnamese: "quần đùi", emoji: "🩳", ipa: "/ʃɔːts/", example: "I wear shorts.", exampleVn: "Tôi mặc quần đùi." },
      { word: "glasses", vietnamese: "kính mắt", emoji: "👓", ipa: "/ˈɡlɑːsɪz/", example: "I need my glasses.", exampleVn: "Tôi cần kính mắt." }
    ]
  },

  weather: {
    title: "Weather",
    titleEn: "Weather",
    icon: "🌤️",
    words: [
      { word: "sunny", vietnamese: "nắng", emoji: "☀️", ipa: "/ˈsʌni/", example: "It is sunny today.", exampleVn: "Hôm nay trời nắng." },
      { word: "rainy", vietnamese: "mưa", emoji: "🌧️", ipa: "/ˈreɪni/", example: "It is rainy today.", exampleVn: "Hôm nay trời mưa." },
      { word: "cloudy", vietnamese: "nhiều mây", emoji: "☁️", ipa: "/ˈklaʊdi/", example: "The sky is cloudy.", exampleVn: "Trời nhiều mây." },
      { word: "windy", vietnamese: "gió", emoji: "💨", ipa: "/ˈwɪndi/", example: "It is very windy.", exampleVn: "Trời gió rất mạnh." },
      { word: "snowy", vietnamese: "tuyết", emoji: "❄️", ipa: "/ˈsnəʊi/", example: "It is snowy outside.", exampleVn: "Bên ngoài tuyết rơi." },
      { word: "hot", vietnamese: "nóng", emoji: "🥵", ipa: "/hɒt/", example: "It is very hot.", exampleVn: "Trời rất nóng." },
      { word: "cold", vietnamese: "lạnh", emoji: "🥶", ipa: "/kəʊld/", example: "It is cold today.", exampleVn: "Hôm nay trời lạnh." },
      { word: "rainbow", vietnamese: "cầu vồng", emoji: "🌈", ipa: "/ˈreɪnbəʊ/", example: "I see a rainbow.", exampleVn: "Tôi thấy cầu vồng." },
      { word: "storm", vietnamese: "bão", emoji: "⛈️", ipa: "/stɔːm/", example: "There is a storm.", exampleVn: "Có bão đang đến." },
      { word: "thunder", vietnamese: "sấm sét", emoji: "🌩️", ipa: "/ˈθʌndə/", example: "I hear thunder.", exampleVn: "Tôi nghe tiếng sấm." }
    ]
  },

  school: {
    title: "School",
    titleEn: "School",
    icon: "🎒",
    words: [
      { word: "book", vietnamese: "sách", emoji: "📚", ipa: "/bʊk/", example: "I read a book.", exampleVn: "Tôi đọc sách." },
      { word: "pencil", vietnamese: "bút chì", emoji: "✏️", ipa: "/ˈpensl/", example: "I write with a pencil.", exampleVn: "Tôi viết bằng bút chì." },
      { word: "pen", vietnamese: "bút", emoji: "🖊️", ipa: "/pen/", example: "Give me a pen.", exampleVn: "Cho tôi cây bút." },
      { word: "eraser", vietnamese: "tẩy/gôm", iconUrl: "assets/icons/eraser.svg", ipa: "/ɪˈreɪzə/", example: "I need an eraser.", exampleVn: "Tôi cần cục tẩy." },
      { word: "ruler", vietnamese: "thước kẻ", emoji: "📏", ipa: "/ˈruːlə/", example: "Use a ruler to draw.", exampleVn: "Dùng thước kẻ để vẽ." },
      { word: "bag", vietnamese: "cặp/túi", emoji: "🎒", ipa: "/bæɡ/", example: "I carry my bag.", exampleVn: "Tôi mang cặp sách." },
      { word: "desk", vietnamese: "bàn học", iconUrl: "assets/icons/desk.svg", ipa: "/desk/", example: "Sit at your desk.", exampleVn: "Ngồi vào bàn học." },
      { word: "chair", vietnamese: "ghế", emoji: "💺", ipa: "/tʃeə/", example: "The chair is small.", exampleVn: "Cái ghế nhỏ." },
      { word: "teacher", vietnamese: "giáo viên", emoji: "👩‍🏫", ipa: "/ˈtiːtʃə/", example: "The teacher is kind.", exampleVn: "Cô giáo rất tốt." },
      { word: "student", vietnamese: "học sinh", emoji: "👨‍🎓", ipa: "/ˈstjuːdnt/", example: "I am a student.", exampleVn: "Tôi là học sinh." }
    ]
  },

  transport: {
    title: "Transport",
    titleEn: "Transport",
    icon: "🚗",
    words: [
      { word: "car", vietnamese: "ô tô", emoji: "🚗", ipa: "/kɑː/", example: "The car is fast.", exampleVn: "Ô tô chạy nhanh." },
      { word: "bus", vietnamese: "xe buýt", emoji: "🚌", ipa: "/bʌs/", example: "I go by bus.", exampleVn: "Tôi đi xe buýt." },
      { word: "train", vietnamese: "tàu hỏa", emoji: "🚂", ipa: "/treɪn/", example: "The train is long.", exampleVn: "Tàu hỏa rất dài." },
      { word: "airplane", vietnamese: "máy bay", emoji: "✈️", ipa: "/ˈeəpleɪn/", example: "The airplane flies high.", exampleVn: "Máy bay bay cao." },
      { word: "bicycle", vietnamese: "xe đạp", emoji: "🚲", ipa: "/ˈbaɪsɪkl/", example: "I ride a bicycle.", exampleVn: "Tôi đi xe đạp." },
      { word: "boat", vietnamese: "thuyền", emoji: "⛵", ipa: "/bəʊt/", example: "The boat is on water.", exampleVn: "Thuyền ở trên nước." },
      { word: "motorcycle", vietnamese: "xe máy", emoji: "🏍️", ipa: "/ˈməʊtəsaɪkl/", example: "Father rides a motorcycle.", exampleVn: "Bố đi xe máy." },
      { word: "truck", vietnamese: "xe tải", emoji: "🚚", ipa: "/trʌk/", example: "The truck is big.", exampleVn: "Xe tải rất to." },
      { word: "helicopter", vietnamese: "trực thăng", emoji: "🚁", ipa: "/ˈhelɪkɒptə/", example: "The helicopter flies up.", exampleVn: "Trực thăng bay lên." },
      { word: "ship", vietnamese: "tàu thủy", emoji: "🚢", ipa: "/ʃɪp/", example: "The ship is on the sea.", exampleVn: "Tàu thủy ở trên biển." }
    ]
  },

  house: {
    title: "House",
    titleEn: "House",
    icon: "🏠",
    words: [
      { word: "bedroom", vietnamese: "phòng ngủ", emoji: "🛏️", ipa: "/ˈbedruːm/", example: "I sleep in my bedroom.", exampleVn: "Tôi ngủ trong phòng ngủ." },
      { word: "bathroom", vietnamese: "phòng tắm", emoji: "🚿", ipa: "/ˈbɑːθruːm/", example: "I wash in the bathroom.", exampleVn: "Tôi rửa mặt trong phòng tắm." },
      { word: "kitchen", vietnamese: "nhà bếp", emoji: "🍳", ipa: "/ˈkɪtʃɪn/", example: "Mom cooks in the kitchen.", exampleVn: "Mẹ nấu ăn trong bếp." },
      { word: "living room", vietnamese: "phòng khách", emoji: "🛋️", ipa: "/ˈlɪvɪŋ ruːm/", example: "We sit in the living room.", exampleVn: "Chúng tôi ngồi trong phòng khách." },
      { word: "door", vietnamese: "cửa", emoji: "🚪", ipa: "/dɔː/", example: "Open the door.", exampleVn: "Mở cửa ra." },
      { word: "window", vietnamese: "cửa sổ", emoji: "🪟", ipa: "/ˈwɪndəʊ/", example: "Look out the window.", exampleVn: "Nhìn ra cửa sổ." },
      { word: "roof", vietnamese: "mái nhà", iconUrl: "assets/icons/roof.svg", ipa: "/ruːf/", example: "The roof is red.", exampleVn: "Mái nhà màu đỏ." },
      { word: "garden", vietnamese: "vườn", emoji: "🌷", ipa: "/ˈɡɑːdn/", example: "I play in the garden.", exampleVn: "Tôi chơi trong vườn." },
      { word: "stairs", vietnamese: "cầu thang", iconUrl: "assets/icons/stairs.svg", ipa: "/steəz/", example: "I go up the stairs.", exampleVn: "Tôi đi lên cầu thang." },
      { word: "table", vietnamese: "bàn", iconUrl: "assets/icons/table.svg", ipa: "/ˈteɪbl/", example: "The book is on the table.", exampleVn: "Quyển sách ở trên bàn." }
    ]
  },

  days: {
    title: "Days & Months",
    titleEn: "Days & Months",
    icon: "📅",
    words: [
      { word: "Monday", vietnamese: "thứ hai", emoji: "1️⃣", ipa: "/ˈmʌndeɪ/", example: "Today is Monday.", exampleVn: "Hôm nay là thứ hai." },
      { word: "Tuesday", vietnamese: "thứ ba", emoji: "2️⃣", ipa: "/ˈtjuːzdeɪ/", example: "I play on Tuesday.", exampleVn: "Tôi chơi vào thứ ba." },
      { word: "Wednesday", vietnamese: "thứ tư", emoji: "3️⃣", ipa: "/ˈwenzdeɪ/", example: "Wednesday is fun.", exampleVn: "Thứ tư rất vui." },
      { word: "Thursday", vietnamese: "thứ năm", emoji: "4️⃣", ipa: "/ˈθɜːzdeɪ/", example: "I study on Thursday.", exampleVn: "Tôi học vào thứ năm." },
      { word: "Friday", vietnamese: "thứ sáu", emoji: "5️⃣", ipa: "/ˈfraɪdeɪ/", example: "Friday is my favorite.", exampleVn: "Tôi thích thứ sáu nhất." },
      { word: "Saturday", vietnamese: "thứ bảy", emoji: "6️⃣", ipa: "/ˈsætədeɪ/", example: "I rest on Saturday.", exampleVn: "Tôi nghỉ vào thứ bảy." },
      { word: "Sunday", vietnamese: "chủ nhật", emoji: "7️⃣", ipa: "/ˈsʌndeɪ/", example: "Sunday is a holiday.", exampleVn: "Chủ nhật là ngày nghỉ." },
      { word: "today", vietnamese: "hôm nay", emoji: "📆", ipa: "/təˈdeɪ/", example: "Today is a good day.", exampleVn: "Hôm nay là ngày tốt." },
      { word: "tomorrow", vietnamese: "ngày mai", emoji: "➡️", ipa: "/təˈmɒrəʊ/", example: "See you tomorrow.", exampleVn: "Hẹn gặp bạn ngày mai." },
      { word: "yesterday", vietnamese: "hôm qua", emoji: "⬅️", ipa: "/ˈjestədeɪ/", example: "Yesterday was fun.", exampleVn: "Hôm qua rất vui." }
    ]
  },

  shapes: {
    title: "Shapes",
    titleEn: "Shapes",
    icon: "🔷",
    words: [
      { word: "circle", vietnamese: "hình tròn", emoji: "⭕", ipa: "/ˈsɜːkl/", example: "Draw a circle.", exampleVn: "Vẽ hình tròn." },
      { word: "square", vietnamese: "hình vuông", emoji: "🟦", ipa: "/skweə/", example: "The box is a square.", exampleVn: "Cái hộp là hình vuông." },
      { word: "triangle", vietnamese: "tam giác", emoji: "🔺", ipa: "/ˈtraɪæŋɡl/", example: "This is a triangle.", exampleVn: "Đây là hình tam giác." },
      { word: "rectangle", vietnamese: "hình chữ nhật", emoji: "▬", ipa: "/ˈrektæŋɡl/", example: "The door is a rectangle.", exampleVn: "Cái cửa là hình chữ nhật." },
      { word: "star", vietnamese: "ngôi sao", emoji: "⭐", ipa: "/stɑː/", example: "I draw a star.", exampleVn: "Tôi vẽ ngôi sao." },
      { word: "heart", vietnamese: "trái tim", emoji: "❤️", ipa: "/hɑːt/", example: "I draw a heart.", exampleVn: "Tôi vẽ trái tim." },
      { word: "diamond", vietnamese: "hình thoi", emoji: "💎", ipa: "/ˈdaɪəmənd/", example: "This is a diamond.", exampleVn: "Đây là hình thoi." },
      { word: "oval", vietnamese: "hình bầu dục", emoji: "🥚", ipa: "/ˈəʊvl/", example: "The egg is oval.", exampleVn: "Quả trứng hình bầu dục." },
      { word: "cube", vietnamese: "hình lập phương", emoji: "🧊", ipa: "/kjuːb/", example: "Ice is a cube.", exampleVn: "Đá là hình lập phương." },
      { word: "sphere", vietnamese: "hình cầu", emoji: "🔮", ipa: "/sfɪə/", example: "The ball is a sphere.", exampleVn: "Quả bóng là hình cầu." }
    ]
  },

  toys: {
    title: "Toys",
    titleEn: "Toys",
    icon: "🧸",
    words: [
      { word: "ball", vietnamese: "quả bóng", emoji: "⚽", ipa: "/bɔːl/", example: "I kick the ball.", exampleVn: "Tôi đá quả bóng." },
      { word: "doll", vietnamese: "búp bê", emoji: "🪆", ipa: "/dɒl/", example: "I play with my doll.", exampleVn: "Tôi chơi với búp bê." },
      { word: "teddy bear", vietnamese: "gấu bông", emoji: "🧸", ipa: "/ˈtedi beə/", example: "I hug my teddy bear.", exampleVn: "Tôi ôm gấu bông." },
      { word: "robot", vietnamese: "người máy", emoji: "🤖", ipa: "/ˈrəʊbɒt/", example: "My robot can walk.", exampleVn: "Người máy có thể đi." },
      { word: "blocks", vietnamese: "khối xếp hình", emoji: "🧱", ipa: "/blɒks/", example: "I build with blocks.", exampleVn: "Tôi xây bằng khối." },
      { word: "puzzle", vietnamese: "xếp hình", emoji: "🧩", ipa: "/ˈpʌzl/", example: "I love puzzles.", exampleVn: "Tôi thích xếp hình." },
      { word: "kite", vietnamese: "diều", emoji: "🪁", ipa: "/kaɪt/", example: "I fly a kite.", exampleVn: "Tôi thả diều." },
      { word: "balloon", vietnamese: "bóng bay", emoji: "🎈", ipa: "/bəˈluːn/", example: "The balloon is red.", exampleVn: "Bóng bay màu đỏ." },
      { word: "drum", vietnamese: "trống", emoji: "🥁", ipa: "/drʌm/", example: "I play the drum.", exampleVn: "Tôi chơi trống." },
      { word: "train", vietnamese: "tàu hỏa đồ chơi", emoji: "🚂", ipa: "/treɪn/", example: "My toy train is fast.", exampleVn: "Tàu hỏa đồ chơi chạy nhanh." }
    ]
  },

  verbs: {
    title: "Action Verbs",
    titleEn: "Action Verbs",
    icon: "🏃",
    words: [
      { word: "run", vietnamese: "chạy", emoji: "🏃", ipa: "/rʌn/", example: "I can run fast.", exampleVn: "Tôi có thể chạy nhanh." },
      { word: "walk", vietnamese: "đi bộ", emoji: "🚶", ipa: "/wɔːk/", example: "I walk to school.", exampleVn: "Tôi đi bộ đến trường." },
      { word: "jump", vietnamese: "nhảy", emoji: "🦘", ipa: "/dʒʌmp/", example: "I can jump high.", exampleVn: "Tôi có thể nhảy cao." },
      { word: "eat", vietnamese: "ăn", emoji: "🍽️", ipa: "/iːt/", example: "I eat breakfast.", exampleVn: "Tôi ăn sáng." },
      { word: "drink", vietnamese: "uống", emoji: "🥤", ipa: "/drɪŋk/", example: "I drink water.", exampleVn: "Tôi uống nước." },
      { word: "sleep", vietnamese: "ngủ", emoji: "😴", ipa: "/sliːp/", example: "I sleep at night.", exampleVn: "Tôi ngủ vào ban đêm." },
      { word: "read", vietnamese: "đọc", emoji: "📖", ipa: "/riːd/", example: "I read a book.", exampleVn: "Tôi đọc sách." },
      { word: "write", vietnamese: "viết", emoji: "✍️", ipa: "/raɪt/", example: "I write my name.", exampleVn: "Tôi viết tên của tôi." },
      { word: "play", vietnamese: "chơi", emoji: "🎮", ipa: "/pleɪ/", example: "I play with friends.", exampleVn: "Tôi chơi với bạn." },
      { word: "sing", vietnamese: "hát", emoji: "🎤", ipa: "/sɪŋ/", example: "I sing a song.", exampleVn: "Tôi hát một bài hát." }
    ]
  },

  nature: {
    title: "Nature",
    titleEn: "Nature",
    icon: "🌳",
    words: [
      { word: "tree", vietnamese: "cây", emoji: "🌳", ipa: "/triː/", example: "The tree is tall.", exampleVn: "Cái cây rất cao." },
      { word: "flower", vietnamese: "hoa", emoji: "🌸", ipa: "/ˈflaʊə/", example: "The flower is pretty.", exampleVn: "Bông hoa rất đẹp." },
      { word: "grass", vietnamese: "cỏ", emoji: "🌿", ipa: "/ɡrɑːs/", example: "The grass is green.", exampleVn: "Cỏ màu xanh." },
      { word: "sun", vietnamese: "mặt trời", emoji: "☀️", ipa: "/sʌn/", example: "The sun is bright.", exampleVn: "Mặt trời rất sáng." },
      { word: "moon", vietnamese: "mặt trăng", emoji: "🌙", ipa: "/muːn/", example: "The moon is round.", exampleVn: "Mặt trăng hình tròn." },
      { word: "star", vietnamese: "ngôi sao", emoji: "⭐", ipa: "/stɑː/", example: "I see many stars.", exampleVn: "Tôi thấy nhiều ngôi sao." },
      { word: "cloud", vietnamese: "mây", emoji: "☁️", ipa: "/klaʊd/", example: "The cloud is white.", exampleVn: "Đám mây màu trắng." },
      { word: "river", vietnamese: "sông", emoji: "🏞️", ipa: "/ˈrɪvə/", example: "The river is long.", exampleVn: "Dòng sông rất dài." },
      { word: "mountain", vietnamese: "núi", emoji: "🏔️", ipa: "/ˈmaʊntɪn/", example: "The mountain is high.", exampleVn: "Ngọn núi rất cao." },
      { word: "sea", vietnamese: "biển", emoji: "🌊", ipa: "/siː/", example: "The sea is blue.", exampleVn: "Biển màu xanh." }
    ]
  },

  // ========== NEW CONTENT EXPANSION ==========

  sports: {
    title: "Sports",
    titleEn: "Sports",
    icon: "⚽",
    words: [
      { word: "soccer", vietnamese: "bóng đá", emoji: "⚽", ipa: "/ˈsɒkə/", example: "I play soccer.", exampleVn: "Tôi chơi bóng đá." },
      { word: "basketball", vietnamese: "bóng rổ", emoji: "🏀", ipa: "/ˈbɑːskɪtbɔːl/", example: "I like basketball.", exampleVn: "Tôi thích bóng rổ." },
      { word: "swimming", vietnamese: "bơi lội", emoji: "🏊", ipa: "/ˈswɪmɪŋ/", example: "I go swimming.", exampleVn: "Tôi đi bơi." },
      { word: "tennis", vietnamese: "quần vợt", emoji: "🎾", ipa: "/ˈtenɪs/", example: "I play tennis.", exampleVn: "Tôi chơi quần vợt." },
      { word: "badminton", vietnamese: "cầu lông", emoji: "🏸", ipa: "/ˈbædmɪntən/", example: "I play badminton.", exampleVn: "Tôi chơi cầu lông." },
      { word: "running", vietnamese: "chạy bộ", emoji: "🏃", ipa: "/ˈrʌnɪŋ/", example: "I like running.", exampleVn: "Tôi thích chạy bộ." },
      { word: "cycling", vietnamese: "đạp xe", emoji: "🚴", ipa: "/ˈsaɪklɪŋ/", example: "I go cycling.", exampleVn: "Tôi đi đạp xe." },
      { word: "volleyball", vietnamese: "bóng chuyền", emoji: "🏐", ipa: "/ˈvɒlibɔːl/", example: "We play volleyball.", exampleVn: "Chúng tôi chơi bóng chuyền." },
      { word: "skating", vietnamese: "trượt băng", emoji: "⛸️", ipa: "/ˈskeɪtɪŋ/", example: "I like skating.", exampleVn: "Tôi thích trượt băng." },
      { word: "gymnastics", vietnamese: "thể dục", emoji: "🤸", ipa: "/dʒɪmˈnæstɪks/", example: "She does gymnastics.", exampleVn: "Bạn ấy tập thể dục." }
    ]
  },

  jobs: {
    title: "Jobs",
    titleEn: "Jobs",
    icon: "👨‍💼",
    words: [
      { word: "doctor", vietnamese: "bác sĩ", emoji: "👨‍⚕️", ipa: "/ˈdɒktə/", example: "The doctor helps me.", exampleVn: "Bác sĩ giúp tôi." },
      { word: "nurse", vietnamese: "y tá", emoji: "👩‍⚕️", ipa: "/nɜːs/", example: "The nurse is kind.", exampleVn: "Cô y tá rất tốt." },
      { word: "teacher", vietnamese: "giáo viên", emoji: "👩‍🏫", ipa: "/ˈtiːtʃə/", example: "My teacher is nice.", exampleVn: "Cô giáo tôi rất tốt." },
      { word: "police", vietnamese: "cảnh sát", emoji: "👮", ipa: "/pəˈliːs/", example: "The police help people.", exampleVn: "Cảnh sát giúp mọi người." },
      { word: "firefighter", vietnamese: "lính cứu hỏa", emoji: "👨‍🚒", ipa: "/ˈfaɪəfaɪtə/", example: "The firefighter is brave.", exampleVn: "Lính cứu hỏa rất dũng cảm." },
      { word: "chef", vietnamese: "đầu bếp", emoji: "👨‍🍳", ipa: "/ʃef/", example: "The chef cooks food.", exampleVn: "Đầu bếp nấu ăn." },
      { word: "farmer", vietnamese: "nông dân", emoji: "👨‍🌾", ipa: "/ˈfɑːmə/", example: "The farmer grows rice.", exampleVn: "Nông dân trồng lúa." },
      { word: "pilot", vietnamese: "phi công", emoji: "👨‍✈️", ipa: "/ˈpaɪlət/", example: "The pilot flies a plane.", exampleVn: "Phi công lái máy bay." },
      { word: "artist", vietnamese: "họa sĩ", emoji: "👨‍🎨", ipa: "/ˈɑːtɪst/", example: "The artist draws pictures.", exampleVn: "Họa sĩ vẽ tranh." },
      { word: "singer", vietnamese: "ca sĩ", emoji: "🎤", ipa: "/ˈsɪŋə/", example: "The singer sings well.", exampleVn: "Ca sĩ hát hay." }
    ]
  },

  seasons: {
    title: "Seasons",
    titleEn: "Seasons",
    icon: "🌸",
    words: [
      { word: "spring", vietnamese: "mùa xuân", emoji: "🌸", ipa: "/sprɪŋ/", example: "Flowers bloom in spring.", exampleVn: "Hoa nở vào mùa xuân." },
      { word: "summer", vietnamese: "mùa hè", emoji: "☀️", ipa: "/ˈsʌmə/", example: "Summer is hot.", exampleVn: "Mùa hè rất nóng." },
      { word: "autumn", vietnamese: "mùa thu", emoji: "🍂", ipa: "/ˈɔːtəm/", example: "Leaves fall in autumn.", exampleVn: "Lá rụng vào mùa thu." },
      { word: "winter", vietnamese: "mùa đông", emoji: "❄️", ipa: "/ˈwɪntə/", example: "Winter is cold.", exampleVn: "Mùa đông rất lạnh." },
      { word: "warm", vietnamese: "ấm áp", emoji: "🌤️", ipa: "/wɔːm/", example: "It is warm today.", exampleVn: "Hôm nay trời ấm áp." },
      { word: "cool", vietnamese: "mát mẻ", emoji: "🌬️", ipa: "/kuːl/", example: "The weather is cool.", exampleVn: "Thời tiết rất mát mẻ." },
      { word: "leaves", vietnamese: "lá cây", emoji: "🍃", ipa: "/liːvz/", example: "The leaves are green.", exampleVn: "Lá cây màu xanh." },
      { word: "snow", vietnamese: "tuyết", emoji: "🌨️", ipa: "/snəʊ/", example: "I play in the snow.", exampleVn: "Tôi chơi trong tuyết." },
      { word: "beach", vietnamese: "bãi biển", emoji: "🏖️", ipa: "/biːtʃ/", example: "I go to the beach.", exampleVn: "Tôi đi ra bãi biển." },
      { word: "holiday", vietnamese: "kỳ nghỉ", emoji: "🎄", ipa: "/ˈhɒlədeɪ/", example: "I love holidays.", exampleVn: "Tôi thích kỳ nghỉ." }
    ]
  },

  emotionsPicture: {
    title: "Emotions Picture",
    titleEn: "Emotions Picture",
    icon: "🎭",
    words: [
      { word: "happy", vietnamese: "vui vẻ", iconUrl: "assets/emotions/happy.jpg", ipa: "/ˈhæpi/", example: "I am happy today.", exampleVn: "Hôm nay tôi vui." },
      { word: "sad", vietnamese: "buồn", iconUrl: "assets/emotions/sad.jpg", ipa: "/sæd/", example: "The boy is sad.", exampleVn: "Cậu bé đang buồn." },
      { word: "silly", vietnamese: "ngớ ngẩn/vui nhộn", iconUrl: "assets/emotions/silly.jpg", ipa: "/ˈsɪli/", example: "You are so silly!", exampleVn: "Bạn thật vui nhộn!" },
      { word: "proud", vietnamese: "tự hào", iconUrl: "assets/emotions/proud.jpg", ipa: "/praʊd/", example: "I am very proud.", exampleVn: "Tôi rất tự hào." },
      { word: "shy", vietnamese: "nhút nhát/ngại ngùng", iconUrl: "assets/emotions/shy.png", ipa: "/ʃaɪ/", example: "The girl is shy.", exampleVn: "Cô bé rất nhút nhát." },
      { word: "confused", vietnamese: "bối rối", iconUrl: "assets/emotions/confused.png", ipa: "/kənˈfjuːzd/", example: "I am confused.", exampleVn: "Tôi bị bối rối." },
      { word: "scared", vietnamese: "sợ hãi", iconUrl: "assets/emotions/scared.png", ipa: "/skeəd/", example: "I am a little scared.", exampleVn: "Tôi hơi sợ." },
      { word: "excited", vietnamese: "phấn khích", iconUrl: "assets/emotions/excited.png", ipa: "/ɪkˈsaɪtɪd/", example: "I am so excited!", exampleVn: "Tôi rất phấn khích!" }
    ]
  },

  // ========== PHASE 2.2 - NEW CATEGORIES ==========

  greetings: {
    title: "Chào hỏi",
    titleEn: "Greetings & Phrases",
    icon: "👋",
    words: [
      { word: "hello", vietnamese: "xin chào", emoji: "👋", ipa: "/həˈləʊ/", example: "Hello, how are you?", exampleVn: "Xin chào, bạn khỏe không?" },
      { word: "goodbye", vietnamese: "tạm biệt", emoji: "👋", ipa: "/ɡʊdˈbaɪ/", example: "Goodbye, see you!", exampleVn: "Tạm biệt, hẹn gặp lại!" },
      { word: "thank you", vietnamese: "cảm ơn", emoji: "🙏", ipa: "/θæŋk juː/", example: "Thank you very much.", exampleVn: "Cảm ơn bạn rất nhiều." },
      { word: "sorry", vietnamese: "xin lỗi", emoji: "😔", ipa: "/ˈsɒri/", example: "I am sorry.", exampleVn: "Tôi xin lỗi." },
      { word: "please", vietnamese: "làm ơn", emoji: "🙏", ipa: "/pliːz/", example: "Please help me.", exampleVn: "Làm ơn giúp tôi." },
      { word: "yes", vietnamese: "vâng/có", emoji: "✅", ipa: "/jes/", example: "Yes, I can.", exampleVn: "Vâng, tôi có thể." },
      { word: "no", vietnamese: "không", emoji: "❌", ipa: "/nəʊ/", example: "No, thank you.", exampleVn: "Không, cảm ơn." },
      { word: "how are you", vietnamese: "bạn khỏe không", emoji: "😊", ipa: "/haʊ ɑː juː/", example: "How are you today?", exampleVn: "Hôm nay bạn khỏe không?" },
      { word: "good morning", vietnamese: "chào buổi sáng", emoji: "🌅", ipa: "/ɡʊd ˈmɔːnɪŋ/", example: "Good morning, teacher!", exampleVn: "Chào buổi sáng, cô giáo!" },
      { word: "good night", vietnamese: "chúc ngủ ngon", emoji: "🌙", ipa: "/ɡʊd naɪt/", example: "Good night, mom.", exampleVn: "Chúc mẹ ngủ ngon." }
    ]
  },

  classroom: {
    title: "Lớp học",
    titleEn: "Classroom Commands",
    icon: "🏫",
    words: [
      { word: "stand up", vietnamese: "đứng lên", emoji: "🧍", ipa: "/stænd ʌp/", example: "Please stand up.", exampleVn: "Hãy đứng lên." },
      { word: "sit down", vietnamese: "ngồi xuống", emoji: "💺", ipa: "/sɪt daʊn/", example: "Please sit down.", exampleVn: "Hãy ngồi xuống." },
      { word: "listen", vietnamese: "lắng nghe", emoji: "👂", ipa: "/ˈlɪsn/", example: "Listen to the teacher.", exampleVn: "Lắng nghe cô giáo." },
      { word: "look", vietnamese: "nhìn", emoji: "👀", ipa: "/lʊk/", example: "Look at the board.", exampleVn: "Nhìn lên bảng." },
      { word: "open", vietnamese: "mở ra", emoji: "📖", ipa: "/ˈəʊpən/", example: "Open your book.", exampleVn: "Mở sách ra." },
      { word: "close", vietnamese: "đóng lại", emoji: "📕", ipa: "/kləʊz/", example: "Close your book.", exampleVn: "Đóng sách lại." },
      { word: "repeat", vietnamese: "nhắc lại", emoji: "🔁", ipa: "/rɪˈpiːt/", example: "Please repeat after me.", exampleVn: "Hãy nhắc lại theo tôi." },
      { word: "write", vietnamese: "viết", emoji: "✍️", ipa: "/raɪt/", example: "Write your name.", exampleVn: "Viết tên của bạn." },
      { word: "read", vietnamese: "đọc", emoji: "📖", ipa: "/riːd/", example: "Read this sentence.", exampleVn: "Đọc câu này." },
      { word: "quiet", vietnamese: "im lặng", emoji: "🤫", ipa: "/ˈkwaɪət/", example: "Please be quiet.", exampleVn: "Hãy im lặng." }
    ]
  }
};

const songsData = [
  {
    id: 1,
    title: "ABC Song",
    description: "Học bảng chữ cái tiếng Anh",
    thumbnail: "🔤",
    youtubeId: "75p-N9YKqNo",
    relatedWords: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    relatedCategory: null
  },
  {
    id: 2,
    title: "Twinkle Twinkle Little Star",
    description: "Bài hát về ngôi sao lấp lánh",
    thumbnail: "⭐",
    youtubeId: "yCjJyiqpAuU",
    relatedWords: ["star", "sky", "diamond", "sun", "moon"],
    relatedCategory: "nature"
  },
  {
    id: 3,
    title: "Baby Shark",
    description: "Bài hát vui nhộn về cá mập",
    thumbnail: "🦈",
    youtubeId: "XqZsoesa55w",
    relatedWords: ["baby", "mother", "father", "grandmother", "grandfather", "fish"],
    relatedCategory: "family"
  },
  {
    id: 4,
    title: "Head Shoulders Knees and Toes",
    description: "Học các bộ phận cơ thể",
    thumbnail: "🧍",
    youtubeId: "h4eueDYPTIg",
    relatedWords: ["head", "eye", "ear", "mouth", "nose", "arm", "leg", "hand", "foot", "finger"],
    relatedCategory: "bodyParts"
  },
  {
    id: 5,
    title: "Old MacDonald Had a Farm",
    description: "Bài hát về nông trại và động vật",
    thumbnail: "🚜",
    youtubeId: "5oYKonYBujg",
    relatedWords: ["dog", "cat", "bird", "fish", "monkey", "rabbit", "bear", "tiger", "lion", "elephant"],
    relatedCategory: "animals"
  },
  {
    id: 6,
    title: "If You're Happy and You Know It",
    description: "Bài hát vui vẻ",
    thumbnail: "😊",
    youtubeId: "l4WNrvVjiTw",
    relatedWords: ["happy", "hand", "foot", "head"],
    relatedCategory: "emotionsPicture"
  },
  {
    id: 7,
    title: "Wheels on the Bus",
    description: "Bài hát về xe buýt",
    thumbnail: "🚌",
    youtubeId: "e_04ZrNroTo",
    relatedWords: ["bus", "baby", "mother", "father"],
    relatedCategory: "transport"
  },
  {
    id: 8,
    title: "Five Little Ducks",
    description: "Học đếm với những chú vịt con",
    thumbnail: "🦆",
    youtubeId: "pZw9veQ76fo",
    relatedWords: ["one", "two", "three", "four", "five", "mother"],
    relatedCategory: "numbers"
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
