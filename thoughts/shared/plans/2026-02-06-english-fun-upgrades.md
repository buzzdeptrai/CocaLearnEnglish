# English Fun - Implementation Plan

**Created:** 2026-02-06
**Status:** Planning
**Goal:** Nang cap app English Fun tu "flashcard dep" thanh "cong cu hoc tieng Anh hieu qua" cho tre em VN

---

## Phase 1: Quick Wins (1-2 sessions)

### 1.1 Wrong Answer Review sau game

**Files:** `app.js`
**What:** Sau moi game (Quiz, Spelling, True/False, Flashcard), hien man hinh "Tu can on lai" truoc man hinh ket qua.

**Implementation:**
- Tao mang `wrongAnswers[]` trong moi game, push tu sai vao
- Tao function `renderReviewScreen(wrongAnswers)` dung chung cho tat ca game
- Hien: emoji + tu tieng Anh + nghia TV + nut phat am
- Nut "Tiep tuc" -> chuyen sang man hinh ket qua binh thuong
- Neu khong co tu sai -> skip review, vao thang ket qua

**HTML:** Them 1 div `<div id="review-screen">` trong moi game section
**CSS:** Style giong quiz-result nhung co list tu vung

### 1.2 Them kieu Quiz moi

**Files:** `app.js`, `data.js`, `index.html`
**What:** 3 kieu quiz moi ngoai "Emoji -> Chon tu":

1. **Listening Quiz**: Phat am tu -> Chon emoji dung
   - Hien 4 emoji, phat am 1 tu, tre chon dung
   - Dung lai `speakWord()` da co

2. **VN -> EN Quiz**: Hien nghia TV -> Chon tu tieng Anh
   - Hien "con cho" -> Chon "dog" tu 4 options

3. **EN -> VN Quiz**: Hien tu tieng Anh -> Chon nghia TV
   - Hien "elephant" -> Chon "con voi" tu 4 options

**Implementation:**
- Them `quizType` state variable: 'emoji', 'listening', 'vn-en', 'en-vn'
- Them quiz type selector UI (tabs hoac random mix)
- Modify `generateQuizQuestions()` de nhan `quizType` parameter
- Modify `showQuestion()` de render tuy theo type
- `checkAnswer()` giu nguyen logic, chi thay doi display

### 1.3 Dong bo Categories giua Vocabulary va Games

**Files:** `index.html`
**What:** Them cac category con thieu vao Games section

**Missing in Games:** bodyParts, weather, school, transport, seasons, clothes
**Action:** Copy category buttons tu Vocabulary selector vao Games selector
**Luu y:** Kiem tra `generateQuizQuestions()` hoat dong dung voi moi category

### 1.4 Bat lai Word Chain game

**Files:** `index.html`
**What:** Uncomment Word Chain tab trong game-mode-tabs (line ~150)

```html
<!-- Hien tai bi comment -->
<!-- <button class="game-tab" data-mode="word-chain">🔗 Word Chain</button> -->
<!-- Doi thanh -->
<button class="game-tab" data-mode="word-chain">🔗 Word Chain</button>
```

**Test:** Chay game voi nhieu category, dam bao khong loi khi it tu

### 1.5 Fix loi dau tieng Viet trong ket qua

**Files:** `app.js`
**What:** Fix cac string thieu dau tieng Viet

- Line ~864: `'Co gang len nhe!'` -> `'Co gang len nhe!'` (da co dau o showSpellingResult)
- Line ~869: `'Tuyet voi! Con gioi lam!'` -> Kiem tra consistency
- So sanh `showQuizResult()` vs `showSpellingResult()` - dam bao dung dau nhat quan

---

## Phase 2: Medium Effort, High Value (2-4 sessions)

### 2.1 Example Sentences trong data

**Files:** `data.js`
**What:** Them truong `example` vao moi tu trong vocabularyData

```javascript
{
  word: "dog",
  vietnamese: "con cho",
  emoji: "🐕",
  ipa: "/dɒɡ/",
  example: "I have a dog.",
  exampleVn: "Toi co mot con cho."
}
```

**Pham vi:** Them cho tat ca ~200 tu hien co
**Hien thi:** Study Mode hien example sentence ben duoi nghia TV
**Games:** Spelling game co the hien example sentence nhu hint

### 2.2 Them chu de Greetings/Phrases

**Files:** `data.js`, `index.html`
**What:** Them category moi cho cau giao tiep co ban

```javascript
greetings: {
  title: "Greetings",
  titleEn: "Greetings & Phrases",
  icon: "👋",
  words: [
    { word: "hello", vietnamese: "xin chao", emoji: "👋", ipa: "/həˈləʊ/" },
    { word: "goodbye", vietnamese: "tam biet", emoji: "👋", ipa: "/ɡʊdˈbaɪ/" },
    { word: "thank you", vietnamese: "cam on", emoji: "🙏", ipa: "/θæŋk juː/" },
    { word: "sorry", vietnamese: "xin loi", emoji: "😔", ipa: "/ˈsɒri/" },
    { word: "please", vietnamese: "lam on", emoji: "🙏", ipa: "/pliːz/" },
    { word: "yes", vietnamese: "vang/co", emoji: "✅", ipa: "/jes/" },
    { word: "no", vietnamese: "khong", emoji: "❌", ipa: "/nəʊ/" },
    { word: "how are you", vietnamese: "ban khoe khong", emoji: "😊" },
    { word: "good morning", vietnamese: "chao buoi sang", emoji: "🌅" },
    { word: "good night", vietnamese: "chuc ngu ngon", emoji: "🌙" }
  ]
}
```

**Them:** Classroom commands category

```javascript
classroom: {
  title: "Classroom",
  titleEn: "Classroom Commands",
  icon: "🏫",
  words: [
    { word: "stand up", vietnamese: "dung len", emoji: "🧍" },
    { word: "sit down", vietnamese: "ngoi xuong", emoji: "💺" },
    { word: "listen", vietnamese: "lang nghe", emoji: "👂" },
    { word: "look", vietnamese: "nhin", emoji: "👀" },
    { word: "open", vietnamese: "mo ra", emoji: "📖" },
    { word: "close", vietnamese: "dong lai", emoji: "📕" },
    { word: "repeat", vietnamese: "nhac lai", emoji: "🔁" },
    { word: "write", vietnamese: "viet", emoji: "✍️" },
    { word: "read", vietnamese: "doc", emoji: "📖" },
    { word: "quiet", vietnamese: "im lang", emoji: "🤫" }
  ]
}
```

**Luu y:** Them vao ca Vocabulary va Games category selectors

### 2.3 Spaced Repetition don gian

**Files:** `app.js` (new module: `spaced-repetition.js`)
**What:** Track tu sai, tu lai sau khoang cach tang dan

**Data Model (localStorage):**
```javascript
// Key: 'englishAppSRS'
{
  "dog": { level: 3, nextReview: "2026-02-10", wrongCount: 0 },
  "elephant": { level: 1, nextReview: "2026-02-07", wrongCount: 3 },
  ...
}
```

**Levels:**
- Level 0: Chua hoc
- Level 1: Review sau 1 ngay (sai nhieu)
- Level 2: Review sau 3 ngay
- Level 3: Review sau 7 ngay
- Level 4: Review sau 14 ngay
- Level 5: Da thao (30 ngay)

**Logic:**
- Khi tra loi dung: level++
- Khi tra loi sai: level = max(0, level - 1)
- Game uu tien chon tu co nextReview <= today

**UI:**
- Home page hien: "Co 12 tu can on hom nay!"
- Nut "On Bai" -> quiz chi voi tu can review

### 2.4 Progress Tracking per Category

**Files:** `app.js`, `index.html`, `styles.css`
**What:** Hien progress bar cho moi category

**Data Model (localStorage):**
```javascript
// Key: 'englishAppProgress'
{
  "animals": { learned: 8, total: 10, quizBest: 5, spellingBest: 4 },
  "colors": { learned: 6, total: 10, quizBest: 3, spellingBest: 2 },
  ...
}
```

**"Learned" criteria:** Tu duoc tra loi dung >= 3 lan tong cong

**UI:**
- Category buttons hien progress bar nho ben duoi
- VD: `🐾 Animals [████████░░] 80%`
- Home page: "Da hoc 120/200 tu vung"

### 2.5 Listening Game moi

**Files:** `listening-game.js` (new), `app.js`, `index.html`
**What:** Game ren ky nang nghe

**Gameplay:**
1. Phat am 1 tu (khong hien text)
2. Hien 4 hinh anh/emoji
3. Tre chon hinh dung voi tu duoc phat am
4. +15 diem neu dung
5. Sau khi chon, hien tu tieng Anh + nghia TV

**Implementation:**
- Them game tab: `<button class="game-tab" data-mode="listening">👂 Listening</button>`
- Them game container tuong tu quiz
- Dung `speakWord()` de phat am
- Dung `generateQuizQuestions()` de tao cau hoi, chi doi UI

---

## Phase 3: Bigger Features (4-8 sessions)

### 3.1 Song Vocabulary Connection

**Files:** `data.js`, `app.js`, `index.html`
**What:** Lien ket bai hat voi tu vung lien quan

**Data Model:**
```javascript
const songsData = [
  {
    id: 4,
    title: "Head Shoulders Knees and Toes",
    youtubeId: "h4eueDYPTIg",
    // THEM MOI:
    relatedWords: ["head", "shoulders", "knee", "toe", "eye", "ear", "mouth", "nose"],
    relatedCategory: "bodyParts"
  },
  ...
];
```

**UI:** Sau khi xem video, hien "Tu vung trong bai hat nay" + flashcard nho

### 3.2 Sentence Building Game

**Files:** `sentence-builder.js` (new), `index.html`
**What:** Keo tha tu de xep thanh cau dung

**Data:**
```javascript
const sentenceData = [
  {
    sentence: ["I", "have", "a", "dog"],
    vietnamese: "Toi co mot con cho",
    hint: "🐕"
  },
  {
    sentence: ["The", "cat", "is", "black"],
    vietnamese: "Con meo mau den",
    hint: "🐱⚫"
  }
]
```

**Gameplay:**
1. Hien cau TV + hint emoji
2. Cac tu bi xao tron thanh buttons
3. Tre click theo thu tu dung
4. Feedback sau moi cau

### 3.3 Achievement/Badge System

**Files:** `achievements.js` (new), `app.js`
**What:** Huy hieu khi dat milestone

**Badges:**
- 🌟 "First Steps" - Hoc xong 1 category
- 🏆 "Animal Expert" - 100% Animals
- 🔥 "7-Day Streak" - Streak 7 ngay
- 📚 "Bookworm" - Hoc 100 tu
- 🎯 "Perfect Quiz" - 5/5 quiz
- ✏️ "Spelling Bee" - 5/5 spelling
- 🎵 "Music Lover" - Xem 5 bai hat
- 💪 "Champion" - Hoc 200 tu

**UI:** Home page hien badges da mo khoa, badges chua mo = xam

### 3.4 Parent Dashboard

**Files:** `parent-dashboard.js` (new), `index.html`
**What:** Trang rieng cho phu huynh (dang nhap = ma PIN don gian)

**Hien thi:**
- Tong tu da hoc / tong tu
- Streak hien tai va lich su
- Tu yeu nhat (sai nhieu nhat)
- Thoi gian hoc trung binh / ngay
- Bieu do tien trinh theo tuan

### 3.5 PWA / Offline Support

**Files:** `manifest.json` (new), `service-worker.js` (new)
**What:** App chay offline, cai nhu ung dung tren dien thoai

**Scope:**
- Cache HTML, CSS, JS, assets
- Cache audio da tai xuong
- Sync diem khi co mang lai

---

## Checklist Tong Quan

### Phase 1 - Quick Wins
- [ ] 1.1 Wrong Answer Review
- [ ] 1.2 Them kieu Quiz moi (Listening, VN-EN, EN-VN)
- [ ] 1.3 Dong bo Categories
- [ ] 1.4 Bat lai Word Chain
- [ ] 1.5 Fix dau tieng Viet

### Phase 2 - Medium Effort
- [ ] 2.1 Example Sentences
- [ ] 2.2 Greetings + Classroom categories
- [ ] 2.3 Spaced Repetition
- [ ] 2.4 Progress Tracking
- [ ] 2.5 Listening Game

### Phase 3 - Bigger Features
- [ ] 3.1 Song Vocabulary Connection
- [ ] 3.2 Sentence Building Game
- [ ] 3.3 Achievement/Badge System
- [ ] 3.4 Parent Dashboard
- [ ] 3.5 PWA / Offline Support

---

## Nguyen Tac Chung Khi Implement

1. **Moi phase doc lai CLAUDE.md** de nam kien truc hien tai
2. **Khong refactor app.js** trong Phase 1 - chi them tinh nang
3. **Game moi -> file JS rieng** (giong word-chain.js, true-false-rush.js)
4. **Test tren mobile** sau moi thay doi (target chinh la tablet/phone)
5. **Giu localStorage keys nhat quan**: prefix `englishApp`
6. **Vietnamese strings phai co dau day du**
