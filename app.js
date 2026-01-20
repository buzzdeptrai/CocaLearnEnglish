// App Hoc Tieng Anh Cho Be - Main JavaScript

// State
let currentSection = 'home';
let currentCategory = 'animals';
let totalScore = 0;
let quizScore = 0;
let currentQuestionIndex = 0;
let quizQuestions = [];
let isQuizActive = false;

// Streak state
let streakData = {
  current: 0,
  longest: 0,
  lastPlayDate: null
};

// Spelling game state
let spellingQuestions = [];
let spellingScore = 0;
let currentSpellingIndex = 0;
let isSpellingActive = false;
let currentGameMode = 'quiz'; // 'quiz' or 'spelling'
let usedHint = false;

// Audio cache for pronunciation
const audioCache = new Map();
let currentAudio = null;

// DOM Elements
const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.nav-btn');
const scoreDisplay = document.getElementById('total-score');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadScore();
  loadStreak();
  renderVocabulary(currentCategory);
  renderSongs();
  setupEventListeners();
  preloadAudioForCategory(currentCategory);
});

// Preload audio for a category (background loading)
async function preloadAudioForCategory(category) {
  const categoryData = vocabularyData[category];
  if (!categoryData) return;

  // Preload audio in background
  for (const item of categoryData.words) {
    const word = item.word.split(' ')[0].toLowerCase();
    if (!audioCache.has(word)) {
      fetchAudioUrl(word); // Fire and forget
    }
  }
}

// Load saved score from localStorage
function loadScore() {
  const saved = localStorage.getItem('englishAppScore');
  if (saved) {
    totalScore = parseInt(saved);
    updateScoreDisplay();
  }
}

// Save score to localStorage
function saveScore() {
  localStorage.setItem('englishAppScore', totalScore);
}

// Update score display
function updateScoreDisplay() {
  if (scoreDisplay) {
    scoreDisplay.textContent = totalScore;
  }
}

// Add points and show celebration
function addPoints(points) {
  totalScore += points;
  updateScoreDisplay();
  saveScore();
}

// ========== STREAK SYSTEM ==========

// Load streak from localStorage
function loadStreak() {
  const saved = localStorage.getItem('englishAppStreak');
  if (saved) {
    streakData = JSON.parse(saved);
  }
  checkStreakStatus();
  updateStreakDisplay();
}

// Save streak to localStorage
function saveStreak() {
  localStorage.setItem('englishAppStreak', JSON.stringify(streakData));
}

// Check and update streak based on date
function checkStreakStatus() {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  if (!streakData.lastPlayDate) {
    // First time user
    return;
  }

  const lastDate = new Date(streakData.lastPlayDate);
  const todayDate = new Date(today);
  const diffTime = todayDate - lastDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    // Same day - do nothing
  } else if (diffDays === 1) {
    // Consecutive day - streak continues (will be incremented on activity)
  } else if (diffDays > 1) {
    // Streak broken - reset
    streakData.current = 0;
    saveStreak();
  }
}

// Record activity and update streak
function recordActivity() {
  const today = new Date().toISOString().split('T')[0];

  if (streakData.lastPlayDate === today) {
    // Already played today
    return;
  }

  const lastDate = streakData.lastPlayDate ? new Date(streakData.lastPlayDate) : null;
  const todayDate = new Date(today);

  if (!lastDate) {
    // First time ever
    streakData.current = 1;
  } else {
    const diffTime = todayDate - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day
      streakData.current++;
    } else {
      // Streak was broken, start fresh
      streakData.current = 1;
    }
  }

  // Update longest streak
  if (streakData.current > streakData.longest) {
    streakData.longest = streakData.current;
  }

  streakData.lastPlayDate = today;
  saveStreak();
  updateStreakDisplay();
}

// Update streak display in header
function updateStreakDisplay() {
  const streakEl = document.getElementById('streak-count');
  if (streakEl) {
    streakEl.textContent = streakData.current;

    // Add fire animation for high streaks
    const container = streakEl.closest('.streak-display');
    if (container) {
      container.classList.toggle('hot', streakData.current >= 7);
    }
  }
}

// Setup event listeners
function setupEventListeners() {
  // Navigation buttons (only ones with data-section in nav)
  document.querySelectorAll('nav .nav-btn[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      switchSection(target);
    });
  });

  // Feature cards on home (only cards with data-section attribute)
  document.querySelectorAll('.feature-card[data-section]').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.section;
      if (target) {
        switchSection(target);
      }
    });
  });

  // Category buttons (Vocabulary only)
  document.querySelectorAll('#vocabulary .category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.category;
      document.querySelectorAll('#vocabulary .category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderVocabulary(currentCategory);
      preloadAudioForCategory(currentCategory);
    });
  });

  // Close video modal
  const closeBtn = document.querySelector('.close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideoModal);
  }

  // Click outside modal to close
  const videoModal = document.getElementById('video-modal');
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeVideoModal();
      }
    });
  }

  // Start quiz button
  const startQuizBtn = document.getElementById('start-quiz-btn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startQuiz();
    });
  }

  // Quiz category selector
  document.querySelectorAll('.quiz-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Game mode tabs
  document.querySelectorAll('.game-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.mode;
      switchGameMode(mode);
    });
  });

  // Spelling game buttons
  const startSpellingBtn = document.getElementById('start-spelling-btn');
  if (startSpellingBtn) {
    startSpellingBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      startSpelling();
    });
  }

  const checkSpellingBtn = document.getElementById('check-spelling-btn');
  if (checkSpellingBtn) {
    checkSpellingBtn.addEventListener('click', checkSpelling);
  }

  // Spelling input - Enter key
  const spellingInput = document.getElementById('spelling-input');
  if (spellingInput) {
    spellingInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        checkSpelling();
      }
    });
  }

  // Hint buttons
  const hintBtn = document.getElementById('hint-btn');
  if (hintBtn) {
    hintBtn.addEventListener('click', playSpellingAudio);
  }

  const hintVnBtn = document.getElementById('hint-vn-btn');
  if (hintVnBtn) {
    hintVnBtn.addEventListener('click', showVietnameseHint);
  }
}

// Switch sections
function switchSection(sectionId) {
  currentSection = sectionId;

  // Update nav buttons
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });

  // Update sections
  sections.forEach(section => {
    section.classList.toggle('active', section.id === sectionId);
  });

  // Reset quiz when leaving games section
  if (sectionId !== 'games' && isQuizActive) {
    resetQuiz();
  }
}

// Render vocabulary flashcards
function renderVocabulary(category) {
  const container = document.getElementById('flashcard-container');
  if (!container) return;

  const categoryData = vocabularyData[category];
  if (!categoryData) return;

  container.innerHTML = '';

  categoryData.words.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flashcard';

    // Special styling for colors
    if (category === 'colors' && item.color) {
      card.classList.add('color-card');
      card.style.background = item.color;
    }

    card.innerHTML = `
      <span class="speak-icon">🔊</span>
      <span class="emoji">${item.emoji}</span>
      <div class="word">${item.word}</div>
      ${item.ipa ? `<div class="ipa">${item.ipa}</div>` : ''}
      <div class="vietnamese">${item.vietnamese}</div>
    `;

    card.addEventListener('click', () => {
      speakWord(item.word);
      
      // Click feedback
      card.classList.add('pulse');
      setTimeout(() => {
        card.classList.remove('pulse');
      }, 500);
    });

    container.appendChild(card);
  });
}

// Fetch audio URL from Free Dictionary API
async function fetchAudioUrl(word) {
  // Check cache first
  if (audioCache.has(word)) {
    return audioCache.get(word);
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) return null;

    const data = await response.json();
    if (data && data[0] && data[0].phonetics) {
      // Find audio URL (prefer US pronunciation)
      for (const phonetic of data[0].phonetics) {
        if (phonetic.audio && phonetic.audio.length > 0) {
          // Prefer US audio
          if (phonetic.audio.includes('-us') || phonetic.audio.includes('_us')) {
            audioCache.set(word, phonetic.audio);
            return phonetic.audio;
          }
        }
      }
      // Fallback to any available audio
      for (const phonetic of data[0].phonetics) {
        if (phonetic.audio && phonetic.audio.length > 0) {
          audioCache.set(word, phonetic.audio);
          return phonetic.audio;
        }
      }
    }
  } catch (error) {
    console.log('Dictionary API error:', error);
  }

  return null;
}

// Text-to-speech with Free Dictionary API (human voice)
async function speakWord(word) {
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Cancel any ongoing speech synthesis
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }

  // Extract single word (for phrases like "ice cream", try first word)
  const singleWord = word.split(' ')[0].toLowerCase();

  // Try to get audio from Free Dictionary API
  const audioUrl = await fetchAudioUrl(singleWord);

  if (audioUrl) {
    // Use real human pronunciation
    currentAudio = new Audio(audioUrl);
    currentAudio.playbackRate = 0.9; // Slightly slower for kids
    currentAudio.play().catch(err => {
      console.log('Audio play error, falling back to TTS:', err);
      speakWithTTS(word);
    });
  } else {
    // Fallback to Web Speech API
    speakWithTTS(word);
  }
}

// Fallback: Web Speech API
function speakWithTTS(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8; // Slower for kids
    utterance.pitch = 1.1; // Slightly higher pitch

    // Try to use a clear English voice
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice =>
      voice.lang.startsWith('en') && voice.name.includes('Female')
    ) || voices.find(voice => voice.lang.startsWith('en-US'))
      || voices.find(voice => voice.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    speechSynthesis.speak(utterance);
  }
}

// Render songs list
function renderSongs() {
  const container = document.getElementById('songs-container');
  if (!container) return;

  container.innerHTML = '';

  songsData.forEach(song => {
    const card = document.createElement('div');
    card.className = 'song-card';
    card.innerHTML = `
      <div class="thumbnail">${song.thumbnail}</div>
      <div class="song-info">
        <h3>${song.title}</h3>
        <p>${song.description}</p>
      </div>
    `;

    card.addEventListener('click', () => {
      openVideoModal(song);
    });

    container.appendChild(card);
  });
}

// Open video modal
function openVideoModal(song) {
  const modal = document.getElementById('video-modal');
  const titleEl = document.getElementById('video-title');
  const iframe = document.getElementById('video-iframe');

  if (modal && titleEl && iframe) {
    titleEl.textContent = song.title;
    iframe.src = `https://www.youtube.com/embed/${song.youtubeId}?autoplay=1`;
    modal.classList.add('active');
  }
}

// Close video modal
function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');

  if (modal && iframe) {
    modal.classList.remove('active');
    iframe.src = ''; // Stop video
  }
}

// Quiz Functions
function startQuiz() {
  const activeCategory = document.querySelector('.quiz-category-btn.active');
  const category = activeCategory ? activeCategory.dataset.category : 'animals';

  quizQuestions = generateQuizQuestions(category, 5);
  quizScore = 0;
  currentQuestionIndex = 0;
  isQuizActive = true;

  document.getElementById('start-quiz-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';

  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    showQuizResult();
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  const questionNum = document.getElementById('question-num');
  const quizScoreEl = document.getElementById('quiz-score');
  const questionEmoji = document.getElementById('question-emoji');
  const optionsContainer = document.getElementById('quiz-options');

  questionNum.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
  quizScoreEl.textContent = quizScore;
  questionEmoji.textContent = question.emoji;

  optionsContainer.innerHTML = '';

  question.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = option;
    btn.addEventListener('click', () => checkAnswer(option, question.correctAnswer, btn));
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected, correct, button) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(opt => opt.disabled = true);

  if (selected === correct) {
    button.classList.add('correct');
    quizScore++;
    addPoints(10);
    speakWord('Correct! ' + correct);

    // Mini celebration
    createConfetti(5);
  } else {
    button.classList.add('wrong');
    // Highlight correct answer
    options.forEach(opt => {
      if (opt.textContent === correct) {
        opt.classList.add('correct');
      }
    });
    speakWord('The answer is ' + correct);
  }

  // Next question after delay
  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 1500);
}

function showQuizResult() {
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';

  // Record activity for streak
  recordActivity();

  const resultEmoji = document.getElementById('result-emoji');
  const resultMessage = document.getElementById('result-message');
  const finalScore = document.getElementById('final-score');
  const starsContainer = document.getElementById('stars-container');

  finalScore.textContent = `${quizScore}/${quizQuestions.length}`;

  // Calculate stars (1-3 based on performance)
  const percentage = quizScore / quizQuestions.length;
  let stars = 1;
  let message = 'Co gang len nhe!';
  let emoji = '😊';

  if (percentage >= 0.8) {
    stars = 3;
    message = 'Tuyet voi! Con gioi lam!';
    emoji = '🎉';
    createConfetti(20);
  } else if (percentage >= 0.6) {
    stars = 2;
    message = 'Gioi lam! Tiep tuc co gang!';
    emoji = '👏';
    createConfetti(10);
  }

  resultEmoji.textContent = emoji;
  resultMessage.textContent = message;
  starsContainer.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  isQuizActive = false;
}

function resetQuiz() {
  isQuizActive = false;
  document.getElementById('start-quiz-container').style.display = 'block';
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'none';
}

function restartQuiz() {
  resetQuiz();
  startQuiz();
}

// Confetti celebration
function createConfetti(count) {
  const celebration = document.getElementById('celebration');
  if (!celebration) return;

  const colors = ['#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e', '#e17055', '#74b9ff'];
  const emojis = ['🌟', '⭐', '✨', '🎉', '🎊', '💫'];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-20px';
      confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

      celebration.appendChild(confetti);

      // Remove after animation
      setTimeout(() => {
        confetti.remove();
      }, 4000);
    }, i * 100);
  }
}

// Load voices when available
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
}

// ========== GAME MODE SWITCHING ==========

function switchGameMode(mode) {
  currentGameMode = mode;

  // Update tabs
  document.querySelectorAll('.game-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  // Show/hide game containers
  const quizGame = document.getElementById('quiz-game');
  const spellingGame = document.getElementById('spelling-game');

  if (mode === 'quiz') {
    quizGame.style.display = 'block';
    spellingGame.style.display = 'none';
    if (isSpellingActive) resetSpelling();
  } else {
    quizGame.style.display = 'none';
    spellingGame.style.display = 'block';
    if (isQuizActive) resetQuiz();
  }
}

// ========== SPELLING GAME ==========

function generateSpellingQuestions(category, count) {
  const categoryData = vocabularyData[category];
  if (!categoryData) return [];

  // Shuffle and pick words
  const shuffled = [...categoryData.words].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  return selected.map(word => ({
    emoji: word.emoji,
    word: word.word.toLowerCase(),
    vietnamese: word.vietnamese,
    ipa: word.ipa || ''
  }));
}

function startSpelling() {
  const activeCategory = document.querySelector('.quiz-category-btn.active');
  const category = activeCategory ? activeCategory.dataset.category : 'animals';

  spellingQuestions = generateSpellingQuestions(category, 5);
  spellingScore = 0;
  currentSpellingIndex = 0;
  isSpellingActive = true;
  usedHint = false;

  document.getElementById('start-spelling-container').style.display = 'none';
  document.getElementById('spelling-container').style.display = 'block';
  document.getElementById('spelling-result').style.display = 'none';

  showSpellingQuestion();
}

function showSpellingQuestion() {
  if (currentSpellingIndex >= spellingQuestions.length) {
    showSpellingResult();
    return;
  }

  const question = spellingQuestions[currentSpellingIndex];

  // Update progress
  document.getElementById('spelling-num').textContent =
    `${currentSpellingIndex + 1}/${spellingQuestions.length}`;
  document.getElementById('spelling-score').textContent = spellingScore;

  // Show emoji
  document.getElementById('spelling-emoji').textContent = question.emoji;

  // Reset input and feedback
  const input = document.getElementById('spelling-input');
  input.value = '';
  input.disabled = false;
  input.focus();

  document.getElementById('spelling-feedback').innerHTML = '';
  document.getElementById('spelling-feedback').className = 'spelling-feedback';

  // Reset hint
  usedHint = false;
  document.getElementById('hint-text').style.display = 'none';
  document.getElementById('hint-vn-btn').disabled = false;

  // Auto-play audio
  setTimeout(() => playSpellingAudio(), 300);
}

function playSpellingAudio() {
  if (currentSpellingIndex < spellingQuestions.length) {
    const question = spellingQuestions[currentSpellingIndex];
    speakWord(question.word);
  }
}

function showVietnameseHint() {
  if (currentSpellingIndex < spellingQuestions.length) {
    const question = spellingQuestions[currentSpellingIndex];
    const hintText = document.getElementById('hint-text');
    hintText.textContent = `💡 ${question.vietnamese}`;
    hintText.style.display = 'block';
    usedHint = true;

    // Disable hint button
    document.getElementById('hint-vn-btn').disabled = true;
  }
}

function checkSpelling() {
  const input = document.getElementById('spelling-input');
  const userAnswer = input.value.trim().toLowerCase();
  const question = spellingQuestions[currentSpellingIndex];
  const correctAnswer = question.word.toLowerCase();

  const feedback = document.getElementById('spelling-feedback');
  input.disabled = true;

  if (userAnswer === correctAnswer) {
    // Correct!
    const points = usedHint ? 10 : 15;
    spellingScore++;
    addPoints(points);

    feedback.innerHTML = `
      <div class="feedback-correct">
        ✅ Chính xác! <strong>${question.word}</strong>
        ${question.ipa ? `<span class="ipa">${question.ipa}</span>` : ''}
        <span class="points">+${points}</span>
      </div>
    `;
    feedback.classList.add('correct');

    speakWord('Correct! ' + question.word);
    createConfetti(5);
  } else {
    // Wrong
    feedback.innerHTML = `
      <div class="feedback-wrong">
        ❌ Chưa đúng! Đáp án là: <strong>${question.word}</strong>
        ${question.ipa ? `<span class="ipa">${question.ipa}</span>` : ''}
      </div>
    `;
    feedback.classList.add('wrong');

    speakWord('The answer is ' + question.word);
  }

  // Next question after delay
  setTimeout(() => {
    currentSpellingIndex++;
    showSpellingQuestion();
  }, 2000);
}

function showSpellingResult() {
  document.getElementById('spelling-container').style.display = 'none';
  document.getElementById('spelling-result').style.display = 'block';

  // Record activity for streak
  recordActivity();

  const resultEmoji = document.getElementById('spelling-result-emoji');
  const resultMessage = document.getElementById('spelling-result-message');
  const finalScore = document.getElementById('spelling-final-score');
  const starsContainer = document.getElementById('spelling-stars-container');

  finalScore.textContent = `${spellingScore}/${spellingQuestions.length}`;

  // Calculate stars
  const percentage = spellingScore / spellingQuestions.length;
  let stars = 1;
  let message = 'Cố gắng lên nhé!';
  let emoji = '😊';

  if (percentage >= 0.8) {
    stars = 3;
    message = 'Tuyệt vời! Spelling giỏi lắm!';
    emoji = '🎉';
    createConfetti(20);
  } else if (percentage >= 0.6) {
    stars = 2;
    message = 'Giỏi lắm! Tiếp tục luyện tập!';
    emoji = '👏';
    createConfetti(10);
  }

  resultEmoji.textContent = emoji;
  resultMessage.textContent = message;
  starsContainer.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  isSpellingActive = false;
}

function resetSpelling() {
  isSpellingActive = false;
  document.getElementById('start-spelling-container').style.display = 'block';
  document.getElementById('spelling-container').style.display = 'none';
  document.getElementById('spelling-result').style.display = 'none';
}

function restartSpelling() {
  resetSpelling();
  startSpelling();
}
