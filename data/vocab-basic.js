/**
 * Complete Vocabulary Set
 * All essential words organized by topics
 * Special handling: Numbers (display as digits), Colors (display as CSS colors)
 */

const vocabBasic = {
  id: 'Basic',
  title: 'Basic Vocabulary',
  titleVi: 'Từ vựng toàn diện',
  description: 'All essential English words for kids',
  descriptionVi: 'Tất cả từ vựng tiếng Anh cần thiết cho trẻ em',

  categories: [
    {
      id: 'numbers',
      name: 'Numbers',
      nameVi: 'Số đếm',
      icon: '🔢',
      displayType: 'number', // Special: display as number
      words: [
        {
          id: 'num_1',
          word: 'one',
          translation: 'số một',
          pronunciation: '/wʌn/',
          example: 'I have one apple.',
          exampleVi: 'Tôi có một quả táo.',
          numberValue: 1
        },
        {
          id: 'num_2',
          word: 'two',
          translation: 'số hai',
          pronunciation: '/tuː/',
          example: 'I see two cats.',
          exampleVi: 'Tôi thấy hai con mèo.',
          numberValue: 2
        },
        {
          id: 'num_3',
          word: 'three',
          translation: 'số ba',
          pronunciation: '/θriː/',
          example: 'There are three birds.',
          exampleVi: 'Có ba con chim.',
          numberValue: 3
        },
        {
          id: 'num_4',
          word: 'four',
          translation: 'số bốn',
          pronunciation: '/fɔːr/',
          example: 'I have four pencils.',
          exampleVi: 'Tôi có bốn cây bút chì.',
          numberValue: 4
        },
        {
          id: 'num_5',
          word: 'five',
          translation: 'số năm',
          pronunciation: '/faɪv/',
          example: 'Five fingers on my hand.',
          exampleVi: 'Năm ngón tay trên bàn tay tôi.',
          numberValue: 5
        },
        {
          id: 'num_6',
          word: 'six',
          translation: 'số sáu',
          pronunciation: '/sɪks/',
          example: 'I am six years old.',
          exampleVi: 'Tôi sáu tuổi.',
          numberValue: 6
        },
        {
          id: 'num_7',
          word: 'seven',
          translation: 'số bảy',
          pronunciation: '/ˈsev.ən/',
          example: 'There are seven days in a week.',
          exampleVi: 'Có bảy ngày trong một tuần.',
          numberValue: 7
        },
        {
          id: 'num_8',
          word: 'eight',
          translation: 'số tám',
          pronunciation: '/eɪt/',
          example: 'I wake up at eight o\'clock.',
          exampleVi: 'Tôi thức dậy lúc 8 giờ.',
          numberValue: 8
        },
        {
          id: 'num_9',
          word: 'nine',
          translation: 'số chín',
          pronunciation: '/naɪn/',
          example: 'Nine plus one is ten.',
          exampleVi: 'Chín cộng một bằng mười.',
          numberValue: 9
        },
        {
          id: 'num_10',
          word: 'ten',
          translation: 'số mười',
          pronunciation: '/ten/',
          example: 'I have ten fingers.',
          exampleVi: 'Tôi có mười ngón tay.',
          numberValue: 10
        }
      ]
    },

    {
      id: 'colors',
      name: 'Colors',
      nameVi: 'Màu sắc',
      icon: '🎨',
      displayType: 'color', // Special: display as CSS color
      words: [
        {
          id: 'color_red',
          word: 'red',
          translation: 'màu đỏ',
          pronunciation: '/red/',
          example: 'I like the red apple.',
          exampleVi: 'Tôi thích quả táo đỏ.',
          colorValue: '#FF0000'
        },
        {
          id: 'color_blue',
          word: 'blue',
          translation: 'màu xanh dương',
          pronunciation: '/bluː/',
          example: 'The sky is blue.',
          exampleVi: 'Bầu trời màu xanh dương.',
          colorValue: '#0000FF'
        },
        {
          id: 'color_green',
          word: 'green',
          translation: 'màu xanh lá',
          pronunciation: '/ɡriːn/',
          example: 'The grass is green.',
          exampleVi: 'Cỏ có màu xanh lá.',
          colorValue: '#00FF00'
        },
        {
          id: 'color_yellow',
          word: 'yellow',
          translation: 'màu vàng',
          pronunciation: '/ˈjel.oʊ/',
          example: 'The sun is yellow.',
          exampleVi: 'Mặt trời có màu vàng.',
          colorValue: '#FFFF00'
        },
        {
          id: 'color_orange',
          word: 'orange',
          translation: 'màu cam',
          pronunciation: '/ˈɔːr.ɪndʒ/',
          example: 'I eat an orange.',
          exampleVi: 'Tôi ăn một quả cam.',
          colorValue: '#FFA500'
        },
        {
          id: 'color_purple',
          word: 'purple',
          translation: 'màu tím',
          pronunciation: '/ˈpɜː.pəl/',
          example: 'I have a purple bag.',
          exampleVi: 'Tôi có một cái túi màu tím.',
          colorValue: '#800080'
        },
        {
          id: 'color_pink',
          word: 'pink',
          translation: 'màu hồng',
          pronunciation: '/pɪŋk/',
          example: 'She wears a pink dress.',
          exampleVi: 'Cô ấy mặc váy màu hồng.',
          colorValue: '#FFC0CB'
        },
        {
          id: 'color_brown',
          word: 'brown',
          translation: 'màu nâu',
          pronunciation: '/braʊn/',
          example: 'My teddy bear is brown.',
          exampleVi: 'Gấu bông của tôi màu nâu.',
          colorValue: '#A52A2A'
        },
        {
          id: 'color_black',
          word: 'black',
          translation: 'màu đen',
          pronunciation: '/blæk/',
          example: 'I have a black pen.',
          exampleVi: 'Tôi có một cây bút đen.',
          colorValue: '#000000'
        },
        {
          id: 'color_white',
          word: 'white',
          translation: 'màu trắng',
          pronunciation: '/waɪt/',
          example: 'Snow is white.',
          exampleVi: 'Tuyết có màu trắng.',
          colorValue: '#FFFFFF'
        }
      ]
    },

    {
      id: 'school',
      name: 'School',
      nameVi: 'Trường lớp',
      icon: '🏫',
      words: [
        {
          id: 'school_1',
          word: 'pen',
          translation: 'bút mực',
          pronunciation: '/pen/',
          example: 'I write with a pen.',
          exampleVi: 'Tôi viết bằng bút mực.',
          searchKeyword: 'blue pen writing'
        },
        {
          id: 'school_2',
          word: 'pencil',
          translation: 'bút chì',
          pronunciation: '/ˈpen.səl/',
          example: 'I draw with a pencil.',
          exampleVi: 'Tôi vẽ bằng bút chì.',
          searchKeyword: 'colored pencils'
        },
        {
          id: 'school_3',
          word: 'book',
          translation: 'cuốn sách',
          pronunciation: '/bʊk/',
          example: 'I read a book.',
          exampleVi: 'Tôi đọc một cuốn sách.',
          searchKeyword: 'children book'
        },
        {
          id: 'school_4',
          word: 'bag',
          translation: 'cặp sách',
          pronunciation: '/bæɡ/',
          example: 'My bag is heavy.',
          exampleVi: 'Cặp sách của tôi nặng.',
          searchKeyword: 'school bag backpack'
        },
        {
          id: 'school_5',
          word: 'rubber',
          translation: 'cục tẩy',
          pronunciation: '/ˈrʌb.ər/',
          example: 'I use a rubber to erase.',
          exampleVi: 'Tôi dùng tẩy để xóa.',
          searchKeyword: 'eraser rubber'
        },
        {
          id: 'school_6',
          word: 'ruler',
          translation: 'thước kẻ',
          pronunciation: '/ˈruː.lər/',
          example: 'I measure with a ruler.',
          exampleVi: 'Tôi đo bằng thước kẻ.',
          searchKeyword: 'ruler measure'
        },
        {
          id: 'school_7',
          word: 'desk',
          translation: 'bàn học',
          pronunciation: '/desk/',
          example: 'My desk is clean.',
          exampleVi: 'Bàn học của tôi sạch sẽ.',
          searchKeyword: 'wooden desk school'
        },
        {
          id: 'school_8',
          word: 'chair',
          translation: 'cái ghế',
          pronunciation: '/tʃeər/',
          example: 'Please sit on the chair.',
          exampleVi: 'Hãy ngồi lên ghế.',
          searchKeyword: 'wooden chair'
        },
        {
          id: 'school_9',
          word: 'teacher',
          translation: 'giáo viên',
          pronunciation: '/ˈtiː.tʃər/',
          example: 'My teacher is kind.',
          exampleVi: 'Giáo viên của tôi tốt bụng.',
          searchKeyword: 'teacher classroom'
        },
        {
          id: 'school_10',
          word: 'school',
          translation: 'trường học',
          pronunciation: '/skuːl/',
          example: 'I go to school every day.',
          exampleVi: 'Tôi đi học mỗi ngày.',
          searchKeyword: 'school building'
        }
      ]
    },

    {
      id: 'family',
      name: 'Family',
      nameVi: 'Gia đình',
      icon: '👨‍👩‍👧‍👦',
      words: [
        {
          id: 'family_1',
          word: 'mum',
          translation: 'mẹ',
          pronunciation: '/mʌm/',
          example: 'My mum cooks dinner.',
          exampleVi: 'Mẹ tôi nấu bữa tối.',
          searchKeyword: 'mother mum mom'
        },
        {
          id: 'family_2',
          word: 'dad',
          translation: 'bố',
          pronunciation: '/dæd/',
          example: 'My dad drives a car.',
          exampleVi: 'Bố tôi lái xe ô tô.',
          searchKeyword: 'father dad'
        },
        {
          id: 'family_3',
          word: 'brother',
          translation: 'anh/em trai',
          pronunciation: '/ˈbrʌð.ər/',
          example: 'I have one brother.',
          exampleVi: 'Tôi có một người anh trai.',
          searchKeyword: 'brother siblings'
        },
        {
          id: 'family_4',
          word: 'sister',
          translation: 'chị/em gái',
          pronunciation: '/ˈsɪs.tər/',
          example: 'My sister is pretty.',
          exampleVi: 'Chị gái tôi xinh đẹp.',
          searchKeyword: 'sister siblings'
        },
        {
          id: 'family_5',
          word: 'grandma',
          translation: 'bà',
          pronunciation: '/ˈɡrænd.mɑː/',
          example: 'I love my grandma.',
          exampleVi: 'Tôi yêu bà của tôi.',
          searchKeyword: 'grandmother grandma'
        },
        {
          id: 'family_6',
          word: 'grandpa',
          translation: 'ông',
          pronunciation: '/ˈɡrænd.pɑː/',
          example: 'Grandpa tells me stories.',
          exampleVi: 'Ông kể chuyện cho tôi nghe.',
          searchKeyword: 'grandfather grandpa'
        },
        {
          id: 'family_7',
          word: 'baby',
          translation: 'em bé',
          pronunciation: '/ˈbeɪ.bi/',
          example: 'The baby is sleeping.',
          exampleVi: 'Em bé đang ngủ.',
          searchKeyword: 'cute baby'
        },
        {
          id: 'family_8',
          word: 'family',
          translation: 'gia đình',
          pronunciation: '/ˈfæm.əl.i/',
          example: 'I love my family.',
          exampleVi: 'Tôi yêu gia đình của tôi.',
          searchKeyword: 'happy family'
        }
      ]
    },

    {
      id: 'body',
      name: 'Body & Face',
      nameVi: 'Cơ thể',
      icon: '🧍',
      words: [
        {
          id: 'body_1',
          word: 'head',
          translation: 'đầu',
          pronunciation: '/hed/',
          example: 'I have a big head.',
          exampleVi: 'Tôi có cái đầu to.',
          searchKeyword: 'head human'
        },
        {
          id: 'body_2',
          word: 'face',
          translation: 'mặt',
          pronunciation: '/feɪs/',
          example: 'Wash your face.',
          exampleVi: 'Rửa mặt đi.',
          searchKeyword: 'child face'
        },
        {
          id: 'body_3',
          word: 'eyes',
          translation: 'đôi mắt',
          pronunciation: '/aɪz/',
          example: 'I have two eyes.',
          exampleVi: 'Tôi có hai con mắt.',
          searchKeyword: 'eyes blue'
        },
        {
          id: 'body_4',
          word: 'nose',
          translation: 'mũi',
          pronunciation: '/noʊz/',
          example: 'My nose is small.',
          exampleVi: 'Mũi tôi nhỏ.',
          searchKeyword: 'nose human'
        },
        {
          id: 'body_5',
          word: 'mouth',
          translation: 'miệng',
          pronunciation: '/maʊθ/',
          example: 'Open your mouth.',
          exampleVi: 'Hãy há miệng ra.',
          searchKeyword: 'mouth smile'
        },
        {
          id: 'body_6',
          word: 'ears',
          translation: 'tai',
          pronunciation: '/ɪrz/',
          example: 'I hear with my ears.',
          exampleVi: 'Tôi nghe bằng tai.',
          searchKeyword: 'ears human'
        },
        {
          id: 'body_7',
          word: 'hair',
          translation: 'tóc',
          pronunciation: '/her/',
          example: 'My hair is long.',
          exampleVi: 'Tóc tôi dài.',
          searchKeyword: 'long hair'
        },
        {
          id: 'body_8',
          word: 'hand',
          translation: 'bàn tay',
          pronunciation: '/hænd/',
          example: 'Wash your hands.',
          exampleVi: 'Rửa tay đi.',
          searchKeyword: 'hands child'
        },
        {
          id: 'body_9',
          word: 'leg',
          translation: 'chân',
          pronunciation: '/leɡ/',
          example: 'I have two legs.',
          exampleVi: 'Tôi có hai chân.',
          searchKeyword: 'legs human'
        },
        {
          id: 'body_10',
          word: 'arm',
          translation: 'cánh tay',
          pronunciation: '/ɑːrm/',
          example: 'Raise your arms.',
          exampleVi: 'Giơ tay lên.',
          searchKeyword: 'arms raised'
        },
        {
          id: 'body_11',
          word: 'foot',
          translation: 'bàn chân',
          pronunciation: '/fʊt/',
          example: 'My foot hurts.',
          exampleVi: 'Chân tôi đau.',
          searchKeyword: 'foot feet'
        }
      ]
    },

    {
      id: 'toys',
      name: 'Toys',
      nameVi: 'Đồ chơi',
      icon: '🧸',
      words: [
        {
          id: 'toy_1',
          word: 'ball',
          translation: 'quả bóng',
          pronunciation: '/bɔːl/',
          example: 'Let\'s play with the ball.',
          exampleVi: 'Hãy chơi với quả bóng.',
          searchKeyword: 'colorful ball toy'
        },
        {
          id: 'toy_2',
          word: 'car',
          translation: 'xe ô tô',
          pronunciation: '/kɑːr/',
          example: 'I have a toy car.',
          exampleVi: 'Tôi có một chiếc xe ô tô đồ chơi.',
          searchKeyword: 'toy car'
        },
        {
          id: 'toy_3',
          word: 'doll',
          translation: 'búp bê',
          pronunciation: '/dɑːl/',
          example: 'She plays with her doll.',
          exampleVi: 'Cô ấy chơi với búp bê.',
          searchKeyword: 'cute doll'
        },
        {
          id: 'toy_4',
          word: 'robot',
          translation: 'người máy',
          pronunciation: '/ˈroʊ.bɑːt/',
          example: 'I have a toy robot.',
          exampleVi: 'Tôi có một con robot đồ chơi.',
          searchKeyword: 'toy robot'
        },
        {
          id: 'toy_5',
          word: 'teddy bear',
          translation: 'gấu bông',
          pronunciation: '/ˌted.i ˈber/',
          example: 'My teddy bear is soft.',
          exampleVi: 'Gấu bông của tôi rất mềm.',
          searchKeyword: 'cute teddy bear'
        },
        {
          id: 'toy_6',
          word: 'kite',
          translation: 'diều',
          pronunciation: '/kaɪt/',
          example: 'I fly a kite.',
          exampleVi: 'Tôi thả diều.',
          searchKeyword: 'colorful kite flying'
        },
        {
          id: 'toy_7',
          word: 'bike',
          translation: 'xe đạp',
          pronunciation: '/baɪk/',
          example: 'I ride my bike.',
          exampleVi: 'Tôi đạp xe đạp.',
          searchKeyword: 'children bike bicycle'
        },
        {
          id: 'toy_8',
          word: 'train',
          translation: 'xe lửa',
          pronunciation: '/treɪn/',
          example: 'The toy train is fast.',
          exampleVi: 'Xe lửa đồ chơi chạy nhanh.',
          searchKeyword: 'toy train'
        },
        {
          id: 'toy_9',
          word: 'boat',
          translation: 'thuyền',
          pronunciation: '/boʊt/',
          example: 'The boat floats on water.',
          exampleVi: 'Chiếc thuyền nổi trên nước.',
          searchKeyword: 'toy boat'
        },
        {
          id: 'toy_10',
          word: 'plane',
          translation: 'máy bay',
          pronunciation: '/pleɪn/',
          example: 'The plane flies in the sky.',
          exampleVi: 'Máy bay bay trên bầu trời.',
          searchKeyword: 'airplane flying'
        }
      ]
    },

    {
      id: 'animals',
      name: 'Animals',
      nameVi: 'Động vật',
      icon: '🐾',
      words: [
        {
          id: 'animal_1',
          word: 'cat',
          translation: 'con mèo',
          pronunciation: '/kæt/',
          example: 'The cat is cute.',
          exampleVi: 'Con mèo rất đáng yêu.',
          searchKeyword: 'cute cat'
        },
        {
          id: 'animal_2',
          word: 'dog',
          translation: 'con chó',
          pronunciation: '/dɒɡ/',
          example: 'The dog is running.',
          exampleVi: 'Con chó đang chạy.',
          searchKeyword: 'cute dog puppy'
        },
        {
          id: 'animal_3',
          word: 'fish',
          translation: 'con cá',
          pronunciation: '/fɪʃ/',
          example: 'The fish swims in water.',
          exampleVi: 'Con cá bơi trong nước.',
          searchKeyword: 'colorful fish'
        },
        {
          id: 'animal_4',
          word: 'bird',
          translation: 'con chim',
          pronunciation: '/bɜːrd/',
          example: 'The bird can fly.',
          exampleVi: 'Con chim có thể bay.',
          searchKeyword: 'cute bird'
        },
        {
          id: 'animal_5',
          word: 'cow',
          translation: 'con bò',
          pronunciation: '/kaʊ/',
          example: 'The cow gives us milk.',
          exampleVi: 'Con bò cho chúng ta sữa.',
          searchKeyword: 'cow farm animal'
        },
        {
          id: 'animal_6',
          word: 'pig',
          translation: 'con lợn',
          pronunciation: '/pɪɡ/',
          example: 'The pig is pink.',
          exampleVi: 'Con lợn màu hồng.',
          searchKeyword: 'pink pig farm'
        },
        {
          id: 'animal_7',
          word: 'chicken',
          translation: 'con gà',
          pronunciation: '/ˈtʃɪk.ɪn/',
          example: 'The chicken lays eggs.',
          exampleVi: 'Con gà đẻ trứng.',
          searchKeyword: 'chicken farm'
        },
        {
          id: 'animal_8',
          word: 'duck',
          translation: 'con vịt',
          pronunciation: '/dʌk/',
          example: 'The duck swims in the pond.',
          exampleVi: 'Con vịt bơi trong ao.',
          searchKeyword: 'yellow duck water'
        },
        {
          id: 'animal_9',
          word: 'tiger',
          translation: 'con hổ',
          pronunciation: '/ˈtaɪ.ɡər/',
          example: 'The tiger is strong.',
          exampleVi: 'Con hổ rất mạnh mẽ.',
          searchKeyword: 'tiger wild animal'
        },
        {
          id: 'animal_10',
          word: 'elephant',
          translation: 'con voi',
          pronunciation: '/ˈel.ɪ.fənt/',
          example: 'The elephant is big.',
          exampleVi: 'Con voi rất to.',
          searchKeyword: 'elephant animal'
        },
        {
          id: 'animal_11',
          word: 'monkey',
          translation: 'con khỉ',
          pronunciation: '/ˈmʌŋ.ki/',
          example: 'The monkey climbs trees.',
          exampleVi: 'Con khỉ leo cây.',
          searchKeyword: 'monkey animal'
        },
        {
          id: 'animal_12',
          word: 'snake',
          translation: 'con rắn',
          pronunciation: '/sneɪk/',
          example: 'The snake is long.',
          exampleVi: 'Con rắn rất dài.',
          searchKeyword: 'snake reptile'
        }
      ]
    },

    {
      id: 'food',
      name: 'Food',
      nameVi: 'Đồ ăn',
      icon: '🍎',
      words: [
        {
          id: 'food_1',
          word: 'apple',
          translation: 'quả táo',
          pronunciation: '/ˈæp.əl/',
          example: 'I eat an apple.',
          exampleVi: 'Tôi ăn một quả táo.',
          searchKeyword: 'red apple fruit'
        },
        {
          id: 'food_2',
          word: 'banana',
          translation: 'quả chuối',
          pronunciation: '/bəˈnæn.ə/',
          example: 'Bananas are yellow.',
          exampleVi: 'Chuối có màu vàng.',
          searchKeyword: 'yellow banana'
        },
        {
          id: 'food_3',
          word: 'orange',
          translation: 'quả cam',
          pronunciation: '/ˈɔːr.ɪndʒ/',
          example: 'I like oranges.',
          exampleVi: 'Tôi thích cam.',
          searchKeyword: 'orange fruit'
        },
        {
          id: 'food_4',
          word: 'bread',
          translation: 'bánh mì',
          pronunciation: '/bred/',
          example: 'I eat bread for breakfast.',
          exampleVi: 'Tôi ăn bánh mì vào bữa sáng.',
          searchKeyword: 'fresh bread'
        },
        {
          id: 'food_5',
          word: 'rice',
          translation: 'cơm',
          pronunciation: '/raɪs/',
          example: 'I eat rice every day.',
          exampleVi: 'Tôi ăn cơm mỗi ngày.',
          searchKeyword: 'white rice bowl'
        },
        {
          id: 'food_6',
          word: 'chicken',
          translation: 'thịt gà',
          pronunciation: '/ˈtʃɪk.ɪn/',
          example: 'I like chicken.',
          exampleVi: 'Tôi thích thịt gà.',
          searchKeyword: 'cooked chicken food'
        },
        {
          id: 'food_7',
          word: 'egg',
          translation: 'trứng',
          pronunciation: '/eɡ/',
          example: 'I eat an egg for breakfast.',
          exampleVi: 'Tôi ăn trứng vào bữa sáng.',
          searchKeyword: 'white egg'
        },
        {
          id: 'food_8',
          word: 'milk',
          translation: 'sữa',
          pronunciation: '/mɪlk/',
          example: 'I drink milk every day.',
          exampleVi: 'Tôi uống sữa mỗi ngày.',
          searchKeyword: 'glass of milk'
        },
        {
          id: 'food_9',
          word: 'water',
          translation: 'nước',
          pronunciation: '/ˈwɔː.tər/',
          example: 'I drink water.',
          exampleVi: 'Tôi uống nước.',
          searchKeyword: 'glass of water'
        },
        {
          id: 'food_10',
          word: 'cake',
          translation: 'bánh ngọt',
          pronunciation: '/keɪk/',
          example: 'I like chocolate cake.',
          exampleVi: 'Tôi thích bánh sô-cô-la.',
          searchKeyword: 'birthday cake'
        },
        {
          id: 'food_11',
          word: 'ice cream',
          translation: 'kem',
          pronunciation: '/ˈaɪs ˌkriːm/',
          example: 'I love ice cream.',
          exampleVi: 'Tôi yêu kem.',
          searchKeyword: 'ice cream cone'
        }
      ]
    },

    {
      id: 'actions',
      name: 'Actions',
      nameVi: 'Hành động',
      icon: '🏃',
      words: [
        {
          id: 'action_1',
          word: 'stand up',
          translation: 'đứng dậy',
          pronunciation: '/stænd ʌp/',
          example: 'Please stand up.',
          exampleVi: 'Hãy đứng dậy.',
          searchKeyword: 'child standing up'
        },
        {
          id: 'action_2',
          word: 'sit down',
          translation: 'ngồi xuống',
          pronunciation: '/sɪt daʊn/',
          example: 'Please sit down.',
          exampleVi: 'Hãy ngồi xuống.',
          searchKeyword: 'child sitting down'
        },
        {
          id: 'action_3',
          word: 'open',
          translation: 'mở',
          pronunciation: '/ˈoʊ.pən/',
          example: 'Open the door.',
          exampleVi: 'Mở cửa ra.',
          searchKeyword: 'open door'
        },
        {
          id: 'action_4',
          word: 'close',
          translation: 'đóng',
          pronunciation: '/kloʊz/',
          example: 'Close your book.',
          exampleVi: 'Đóng sách lại.',
          searchKeyword: 'close door'
        },
        {
          id: 'action_5',
          word: 'listen',
          translation: 'lắng nghe',
          pronunciation: '/ˈlɪs.ən/',
          example: 'Please listen to me.',
          exampleVi: 'Hãy lắng nghe tôi.',
          searchKeyword: 'child listening'
        },
        {
          id: 'action_6',
          word: 'look',
          translation: 'nhìn',
          pronunciation: '/lʊk/',
          example: 'Look at the board.',
          exampleVi: 'Nhìn lên bảng.',
          searchKeyword: 'child looking'
        },
        {
          id: 'action_7',
          word: 'run',
          translation: 'chạy',
          pronunciation: '/rʌn/',
          example: 'I can run fast.',
          exampleVi: 'Tôi có thể chạy nhanh.',
          searchKeyword: 'child running'
        },
        {
          id: 'action_8',
          word: 'jump',
          translation: 'nhảy',
          pronunciation: '/dʒʌmp/',
          example: 'Jump high!',
          exampleVi: 'Nhảy cao lên!',
          searchKeyword: 'child jumping'
        },
        {
          id: 'action_9',
          word: 'swim',
          translation: 'bơi',
          pronunciation: '/swɪm/',
          example: 'I can swim.',
          exampleVi: 'Tôi có thể bơi.',
          searchKeyword: 'child swimming pool'
        },
        {
          id: 'action_10',
          word: 'walk',
          translation: 'đi bộ',
          pronunciation: '/wɔːk/',
          example: 'I walk to school.',
          exampleVi: 'Tôi đi bộ đến trường.',
          searchKeyword: 'child walking'
        },
        {
          id: 'action_11',
          word: 'sing',
          translation: 'hát',
          pronunciation: '/sɪŋ/',
          example: 'I like to sing.',
          exampleVi: 'Tôi thích hát.',
          searchKeyword: 'child singing'
        },
        {
          id: 'action_12',
          word: 'dance',
          translation: 'nhảy múa',
          pronunciation: '/dæns/',
          example: 'Let\'s dance!',
          exampleVi: 'Hãy nhảy múa!',
          searchKeyword: 'child dancing'
        }
      ]
    }
  ]
};

module.exports = vocabBasic;
