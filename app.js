// App Hoc Tieng Anh Cho Be - Main JavaScript

// State
let currentSection = 'home';
let currentCategory = 'animals';
let totalScore = 0;
let quizScore = 0;
let currentQuestionIndex = 0;
let quizQuestions = [];
let isQuizActive = false;

// Study Mode state
let isStudyMode = true; // Default to Study Mode
let studyModeIndex = 0;

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
let currentGameMode = 'quiz'; // 'quiz', 'spelling', or 'word-chain'
let usedHint = false;
let spellingMode = 'arrange'; // Default mode: arrange letters
let arrangedLetters = [];

// Word Chain game state
let wordChainGame = null;
let wordChainLevel = 1;
let isWordChainActive = false;

// New module instances
let srs = null;
let achievementSystem = null;
let listeningGame = null;
let sentenceBuilder = null;

// New state variables
let quizType = 'emoji'; // 'emoji', 'listening', 'vn-en', 'en-vn'
let wrongAnswers = []; // Shared across all games
let isListeningGameActive = false;
let isSentenceBuilderActive = false;
let sentenceAssembly = []; // Words placed in sentence builder
let currentSong = null; // Currently playing song for vocabulary connection

// Audio cache for pronunciation
const audioCache = new Map();
let currentAudio = null;
let preloadTimeout = null; // For debouncing audio preload

// DOM Elements
const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.nav-btn');
const scoreDisplay = document.getElementById('total-score');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  if (typeof SpacedRepetitionSystem !== 'undefined') srs = new SpacedRepetitionSystem();
  if (typeof AchievementSystem !== 'undefined') achievementSystem = new AchievementSystem();

  loadScore();
  loadStreak();

  // Render based on default view mode
  if (isStudyMode) {
    renderStudyMode(currentCategory);
  } else {
    renderVocabulary(currentCategory);
  }

  renderSongs();
  setupEventListeners();
  preloadAudioForCategory(currentCategory);

  // Initialize home screen displays
  updateSRSDisplay();
  renderAchievementBadges();
  updateProgressSummary();
});

// Preload audio for a category (background loading with debounce)
function preloadAudioForCategory(category) {
  // Clear previous timeout to debounce
  if (preloadTimeout) {
    clearTimeout(preloadTimeout);
  }

  // Debounce: wait 300ms before starting preload
  preloadTimeout = setTimeout(async () => {
    const categoryData = vocabularyData[category];
    if (!categoryData) return;

    // Preload audio in background
    for (const item of categoryData.words) {
      const word = item.word.split(' ')[0].replace(/[^a-zA-Z]/g, '').toLowerCase();
      if (!audioCache.has(word)) {
        fetchAudioUrl(word); // Fire and forget
      }
    }
  }, 300);
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

// ========== SRS DISPLAY ==========

function updateSRSDisplay() {
  if (!srs) return;
  const dueWords = srs.getWordsToReview();
  const prompt = document.getElementById('srs-review-prompt');
  const count = document.getElementById('srs-due-count');
  if (!prompt || !count) return;
  if (dueWords.length > 0) {
    count.textContent = dueWords.length;
    prompt.classList.remove('hidden');
    prompt.style.display = '';
  } else {
    prompt.classList.add('hidden');
    prompt.style.display = 'none';
  }
}

function startSRSReview() {
  if (!srs) return;
  const dueWords = srs.getWordsToReview();
  if (dueWords.length === 0) return;

  // Find matching word objects from vocabularyData
  const allWords = getAllWords(vocabularyData);
  const dueWordObjects = [];
  dueWords.forEach(function(dw) {
    const found = allWords.find(function(w) {
      return w.word.toLowerCase() === dw.word;
    });
    if (found) dueWordObjects.push(found);
  });

  if (dueWordObjects.length < 4) {
    alert('Cần ít nhất 4 từ để ôn tập!');
    return;
  }

  // Switch to games section and start quiz with SRS words
  switchSection('games');
  switchGameMode('quiz');

  // Generate quiz from SRS due words
  const count = Math.min(5, dueWordObjects.length);
  quizQuestions = generateSRSQuizQuestions(dueWordObjects, count);
  quizScore = 0;
  currentQuestionIndex = 0;
  isQuizActive = true;
  wrongAnswers = [];

  document.getElementById('start-quiz-container').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('quiz-result').style.display = 'none';

  showQuestion();
}

function generateSRSQuizQuestions(words, count) {
  const shuffled = [...words].sort(function() { return Math.random() - 0.5; });
  const selected = shuffled.slice(0, count);
  var questions = [];

  selected.forEach(function(correctWord) {
    var otherWords = words.filter(function(w) { return w.word !== correctWord.word; });
    var shuffledOthers = [...otherWords].sort(function() { return Math.random() - 0.5; });
    var wrongAnswersArr = shuffledOthers.slice(0, 3);
    var options = [correctWord, ...wrongAnswersArr].sort(function() { return Math.random() - 0.5; });

    questions.push({
      emoji: correctWord.emoji || '',
      correctAnswer: correctWord.word,
      vietnamese: correctWord.vietnamese,
      options: options.map(function(o) { return o.word; })
    });
  });

  return questions;
}

// ========== ACHIEVEMENT SYSTEM ==========

function buildGameState() {
  var wordsLearned = 0;
  if (srs) {
    Object.keys(vocabularyData).forEach(function(cat) {
      var progress = srs.getCategoryProgress(cat, vocabularyData[cat].words);
      wordsLearned += progress.learned;
    });
  }

  var animalsProgress = 0;
  if (srs) {
    animalsProgress = srs.getCategoryProgress('animals', vocabularyData.animals.words).percentage;
  }

  var songsWatched = parseInt(localStorage.getItem('englishAppSongsWatched') || '0');

  return {
    categoriesCompleted: getCategoriesCompleted(),
    animalsProgress: animalsProgress,
    currentStreak: streakData.current,
    wordsLearned: wordsLearned,
    lastQuizScore: quizScore,
    lastQuizTotal: quizQuestions.length,
    lastSpellingScore: spellingScore,
    lastSpellingTotal: spellingQuestions.length,
    songsWatched: songsWatched,
    maxCombo: parseInt(localStorage.getItem('englishAppMaxCombo') || '0')
  };
}

function getCategoriesCompleted() {
  if (!srs) return 0;
  var count = 0;
  Object.keys(vocabularyData).forEach(function(cat) {
    var progress = srs.getCategoryProgress(cat, vocabularyData[cat].words);
    if (progress.percentage >= 80) count++;
  });
  return count;
}

function checkAndShowAchievements() {
  if (!achievementSystem) return;
  var gameState = buildGameState();
  var newAchievements = achievementSystem.checkAchievements(gameState);
  if (newAchievements.length > 0) {
    showAchievementNotification(newAchievements[0]);
  }
}

function showAchievementNotification(achievement) {
  var notification = document.createElement('div');
  notification.className = 'achievement-notification';
  notification.innerHTML = '<span class="achievement-icon">' + achievement.icon + '</span>' +
    '<div class="achievement-info">' +
    '<strong>' + achievement.name + '</strong>' +
    '<p>' + achievement.desc + '</p>' +
    '</div>';

  document.body.appendChild(notification);
  setTimeout(function() {
    notification.classList.add('show');
  }, 100);
  setTimeout(function() {
    notification.classList.remove('show');
    setTimeout(function() { notification.remove(); }, 500);
  }, 3000);
}

function renderAchievementBadges() {
  if (!achievementSystem) return;
  var grid = document.getElementById('badges-grid');
  if (!grid) return;
  var allAchievements = achievementSystem.getAllAchievements();
  grid.innerHTML = allAchievements.map(function(b) {
    return '<div class="badge-item ' + (b.isUnlocked ? 'unlocked' : 'locked') + '">' +
      '<span class="badge-icon">' + (b.isUnlocked ? b.icon : '🔒') + '</span>' +
      '<span class="badge-name">' + b.name + '</span>' +
      '</div>';
  }).join('');
}

// ========== PROGRESS TRACKING ==========

function updateCategoryProgress(category, word, isCorrect) {
  if (srs) {
    srs.recordAnswer(word, isCorrect);
  }
}

function updateProgressSummary() {
  if (!srs) return;
  var totalLearned = 0;
  var totalWords = 0;
  Object.keys(vocabularyData).forEach(function(cat) {
    var words = vocabularyData[cat].words;
    var progress = srs.getCategoryProgress(cat, words);
    totalLearned += progress.learned;
    totalWords += progress.total;
  });
  var learnedEl = document.getElementById('total-learned');
  var totalEl = document.getElementById('total-words');
  if (learnedEl) learnedEl.textContent = totalLearned;
  if (totalEl) totalEl.textContent = totalWords;
}

// ========== WRONG ANSWER REVIEW ==========

function renderReviewScreen(wrongAnswersList, onContinue) {
  if (wrongAnswersList.length === 0) {
    onContinue();
    return;
  }

  var reviewScreen = document.getElementById('review-screen');
  var wordsList = document.getElementById('review-words-list');
  if (!reviewScreen || !wordsList) {
    onContinue();
    return;
  }

  wordsList.innerHTML = wrongAnswersList.map(function(w) {
    return '<div class="review-word-card">' +
      '<span class="review-emoji">' + (w.emoji || '') + '</span>' +
      '<div class="review-word-info">' +
      '<strong>' + w.word + '</strong>' +
      '<span>' + w.vietnamese + '</span>' +
      '</div>' +
      '<button class="review-speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button>' +
      '</div>';
  }).join('');

  reviewScreen.classList.remove('hidden');
  reviewScreen.style.display = 'block';

  var continueBtn = document.getElementById('review-continue-btn');
  continueBtn.onclick = function() {
    reviewScreen.classList.add('hidden');
    reviewScreen.style.display = 'none';
    onContinue();
  };
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
      studyModeIndex = 0; // Reset to first card when changing category

      // Render based on current view mode
      if (isStudyMode) {
        renderStudyMode(currentCategory);
      } else {
        renderVocabulary(currentCategory);
      }
      preloadAudioForCategory(currentCategory);
    });
  });

  // View mode toggle buttons
  const gridViewBtn = document.getElementById('grid-view-btn');
  const studyViewBtn = document.getElementById('study-view-btn');

  if (gridViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      toggleViewMode('grid');
    });
  }

  if (studyViewBtn) {
    studyViewBtn.addEventListener('click', () => {
      toggleViewMode('study');
    });
  }

  // Study mode navigation buttons
  const studyPrevBtn = document.getElementById('study-prev-btn');
  const studyNextBtn = document.getElementById('study-next-btn');

  if (studyPrevBtn) {
    studyPrevBtn.addEventListener('click', prevStudyCard);
  }

  if (studyNextBtn) {
    studyNextBtn.addEventListener('click', nextStudyCard);
  }

  // Keyboard navigation for Study Mode
  document.addEventListener('keydown', (e) => {
    // Only handle keyboard navigation in Study Mode and Vocabulary section
    if (!isStudyMode || currentSection !== 'vocabulary') return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextStudyCard();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      prevStudyCard();
    }
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

  // Quiz next button
  const quizNextBtn = document.getElementById('quiz-next-btn');
  if (quizNextBtn) {
    quizNextBtn.addEventListener('click', () => {
      quizNextBtn.style.display = 'none';
      currentQuestionIndex++;
      showQuestion();
    });
  }

  // Spelling next button
  const spellingNextBtn = document.getElementById('spelling-next-btn');
  if (spellingNextBtn) {
    spellingNextBtn.addEventListener('click', () => {
      spellingNextBtn.style.display = 'none';
      currentSpellingIndex++;
      showSpellingQuestion();
    });
  }

  // Word Chain next button
  const wordChainNextBtn = document.getElementById('word-chain-next-btn');
  if (wordChainNextBtn) {
    wordChainNextBtn.addEventListener('click', () => {
      wordChainNextBtn.style.display = 'none';
      renderWordChainQuestion();
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
        e.preventDefault(); // Prevent form submission
        const checkBtn = document.getElementById('check-spelling-btn');
        // Only submit if button is not disabled
        if (checkBtn && !checkBtn.disabled && !spellingInput.disabled) {
          checkSpelling();
        }
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

  // Quiz type buttons
  document.querySelectorAll('.quiz-type-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setQuizType(btn.dataset.quizType);
    });
  });

  // SRS review button
  var srsReviewBtn = document.getElementById('srs-review-btn');
  if (srsReviewBtn) {
    srsReviewBtn.addEventListener('click', startSRSReview);
  }

  // Listening game buttons
  var startListeningBtn = document.getElementById('start-listening-btn');
  if (startListeningBtn) {
    startListeningBtn.addEventListener('click', function() {
      var activeBtn = document.querySelector('#listening-category-selector .quiz-category-btn.active');
      var category = activeBtn ? activeBtn.dataset.category : 'animals';
      startListeningGame(category);
    });
  }

  // Listening category buttons
  document.querySelectorAll('#listening-category-selector .quiz-category-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#listening-category-selector .quiz-category-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  var listeningPlayBtn = document.getElementById('listening-play-btn');
  if (listeningPlayBtn) {
    listeningPlayBtn.addEventListener('click', function() {
      if (listeningGame && !listeningGame.isComplete) {
        var q = listeningGame.questions[listeningGame.currentQuestionIndex];
        if (q) speakWord(q.word);
      }
    });
  }

  var restartListeningBtn = document.getElementById('restart-listening-btn');
  if (restartListeningBtn) {
    restartListeningBtn.addEventListener('click', resetListeningGame);
  }

  // Sentence builder buttons
  var startSentenceBtn = document.getElementById('start-sentence-btn');
  if (startSentenceBtn) {
    startSentenceBtn.addEventListener('click', startSentenceBuilder);
  }

  var sentenceCheckBtn = document.getElementById('sentence-check-btn');
  if (sentenceCheckBtn) {
    sentenceCheckBtn.addEventListener('click', checkSentenceAnswer);
  }

  var sentenceClearBtn = document.getElementById('sentence-clear-btn');
  if (sentenceClearBtn) {
    sentenceClearBtn.addEventListener('click', clearSentenceAssembly);
  }

  var restartSentenceBtn = document.getElementById('restart-sentence-btn');
  if (restartSentenceBtn) {
    restartSentenceBtn.addEventListener('click', resetSentenceBuilder);
  }

  // Parent dashboard PIN
  var parentPinBtn = document.getElementById('parent-pin-btn');
  if (parentPinBtn) {
    parentPinBtn.addEventListener('click', function() {
      var pin = document.getElementById('parent-pin-input').value;
      if (pin === '1234') {
        document.getElementById('parent-pin-screen').style.display = 'none';
        document.getElementById('parent-dashboard').classList.remove('hidden');
        document.getElementById('parent-dashboard').style.display = '';
        renderParentDashboard();
      } else {
        var pinError = document.getElementById('pin-error');
        pinError.classList.remove('hidden');
        pinError.style.display = '';
      }
    });
  }
}

// Switch sections
function switchSection(sectionId) {
  currentSection = sectionId;

  // Cleanup: Stop any playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Cleanup: Cancel any speech synthesis
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }

  // Map nav section names to actual section ids
  var sectionMap = { 'parent': 'parent-section' };
  var actualSectionId = sectionMap[sectionId] || sectionId;

  // Update nav buttons
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });

  // Update sections
  sections.forEach(section => {
    var isActive = section.id === actualSectionId;
    section.classList.toggle('active', isActive);
    if (isActive) {
      section.classList.remove('hidden');
    }
  });

  // Reset quiz when leaving games section
  if (sectionId !== 'games' && isQuizActive) {
    resetQuiz();
  }

  // Reset spelling when leaving games section
  if (sectionId !== 'games' && isSpellingActive) {
    resetSpelling();
  }

  // Refresh home screen displays
  if (sectionId === 'home') {
    updateSRSDisplay();
    renderAchievementBadges();
    updateProgressSummary();
  }
}

// Render vocabulary flashcards
function renderVocabulary(category) {
  const container = document.getElementById('flashcard-container');
  if (!container) return;

  const categoryData = vocabularyData[category];
  if (!categoryData) return;

  container.innerHTML = '';
  container.className = 'flashcard-grid'; // Change class for grid view

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
      ${item.iconUrl
        ? `<img src="${item.iconUrl}" class="icon-img" alt="${item.word}">`
        : `<span class="emoji">${item.emoji}</span>`
      }
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

// Render Study Mode (single card view)
function renderStudyMode(category) {
  const container = document.getElementById('flashcard-container');
  if (!container) return;

  const categoryData = vocabularyData[category];
  if (!categoryData) return;

  const words = categoryData.words;
  if (words.length === 0) return;

  // Ensure index is within bounds
  if (studyModeIndex >= words.length) studyModeIndex = 0;
  if (studyModeIndex < 0) studyModeIndex = words.length - 1;

  container.innerHTML = '';
  container.className = 'study-mode-container'; // Change class for study mode

  const item = words[studyModeIndex];
  const card = document.createElement('div');
  card.className = 'flashcard study-card';

  // Special styling for colors
  if (category === 'colors' && item.color) {
    card.classList.add('color-card');
    card.style.background = item.color;
  }

  card.innerHTML = `
    <span class="speak-icon study-speak-icon">🔊</span>
    ${item.iconUrl
      ? `<img src="${item.iconUrl}" class="icon-img study-icon-img" alt="${item.word}">`
      : `<span class="emoji study-emoji">${item.emoji}</span>`
    }
    <div class="word study-word">${item.word}</div>
    ${item.ipa ? `<div class="ipa study-ipa">${item.ipa}</div>` : ''}
    <div class="vietnamese study-vietnamese">${item.vietnamese}</div>
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

  // Update progress indicator
  const progressEl = document.getElementById('study-progress');
  if (progressEl) {
    progressEl.textContent = `${studyModeIndex + 1} / ${words.length}`;
  }

  // Auto-play pronunciation
  setTimeout(() => {
    speakWord(item.word);
  }, 300);
}

// Toggle between Grid View and Study Mode
function toggleViewMode(mode) {
  isStudyMode = (mode === 'study');
  studyModeIndex = 0; // Reset to first card when switching

  // Update toggle buttons
  const gridBtn = document.getElementById('grid-view-btn');
  const studyBtn = document.getElementById('study-view-btn');
  if (gridBtn && studyBtn) {
    gridBtn.classList.toggle('active', !isStudyMode);
    studyBtn.classList.toggle('active', isStudyMode);
  }

  // Show/hide study controls
  const studyControls = document.getElementById('study-controls');
  if (studyControls) {
    studyControls.style.display = isStudyMode ? 'flex' : 'none';
  }

  // Render appropriate view
  if (isStudyMode) {
    renderStudyMode(currentCategory);
  } else {
    renderVocabulary(currentCategory);
  }
}

// Navigate to next card in Study Mode
function nextStudyCard() {
  if (!isStudyMode) return;

  const categoryData = vocabularyData[currentCategory];
  if (!categoryData) return;

  studyModeIndex++;
  if (studyModeIndex >= categoryData.words.length) {
    studyModeIndex = 0; // Loop back to start
  }

  renderStudyMode(currentCategory);
}

// Navigate to previous card in Study Mode
function prevStudyCard() {
  if (!isStudyMode) return;

  const categoryData = vocabularyData[currentCategory];
  if (!categoryData) return;

  studyModeIndex--;
  if (studyModeIndex < 0) {
    studyModeIndex = categoryData.words.length - 1; // Loop to end
  }

  renderStudyMode(currentCategory);
}

// Fetch audio URL from Free Dictionary API
async function fetchAudioUrl(word) {
  // Clean word: remove special characters, keep only letters
  const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();

  if (!cleanWord) return null;

  // Check cache first
  if (audioCache.has(cleanWord)) {
    return audioCache.get(cleanWord);
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`);
    if (!response.ok) return null;

    const data = await response.json();
    if (data && data[0] && data[0].phonetics) {
      // Find audio URL (prefer US pronunciation)
      for (const phonetic of data[0].phonetics) {
        if (phonetic.audio && phonetic.audio.length > 0) {
          // Prefer US audio
          if (phonetic.audio.includes('-us') || phonetic.audio.includes('_us')) {
            audioCache.set(cleanWord, phonetic.audio);
            return phonetic.audio;
          }
        }
      }
      // Fallback to any available audio
      for (const phonetic of data[0].phonetics) {
        if (phonetic.audio && phonetic.audio.length > 0) {
          audioCache.set(cleanWord, phonetic.audio);
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
  // Clean special characters (!,?.,etc)
  const singleWord = word.split(' ')[0].replace(/[^a-zA-Z]/g, '').toLowerCase();

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

// Render songs list with lazy loading
function renderSongs() {
  const container = document.getElementById('songs-container');
  if (!container) return;

  container.innerHTML = '';

  songsData.forEach(song => {
    const card = document.createElement('div');
    card.className = 'song-card';

    // Use YouTube thumbnail instead of loading full video
    const thumbnailUrl = `https://img.youtube.com/vi/${song.youtubeId}/mqdefault.jpg`;

    card.innerHTML = `
      <div class="thumbnail-wrapper">
        <img src="${thumbnailUrl}" alt="${song.title}" class="thumbnail-img" loading="lazy">
        <div class="play-overlay">▶️</div>
      </div>
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

// Open video modal with lazy iframe loading
function openVideoModal(song) {
  const modal = document.getElementById('video-modal');
  const titleEl = document.getElementById('video-title');
  const iframe = document.getElementById('video-iframe');

  if (modal && titleEl && iframe) {
    titleEl.textContent = song.title;
    iframe.src = `https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&rel=0`;
    modal.classList.add('active');
    currentSong = song;

    // Track song watched for achievements
    trackSongWatched();
  }
}

// Close video modal and cleanup
function closeVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');

  if (modal && iframe) {
    modal.classList.remove('active');
    iframe.src = '';
  }

  // Show related vocabulary if song has related words
  if (currentSong && currentSong.relatedWords && currentSong.relatedWords.length > 0) {
    showSongVocabulary(currentSong);
  }
  currentSong = null;
}

function showSongVocabulary(song) {
  if (!song.relatedWords || song.relatedWords.length === 0) return;

  // Find matching word objects from vocabulary data
  var allWords = getAllWords(vocabularyData);
  var relatedWordObjects = [];
  song.relatedWords.forEach(function(rw) {
    var found = allWords.find(function(w) {
      return w.word.toLowerCase() === rw.toLowerCase();
    });
    if (found) relatedWordObjects.push(found);
  });

  if (relatedWordObjects.length === 0) return;

  // Use the review screen to show related vocabulary
  var reviewScreen = document.getElementById('review-screen');
  var wordsList = document.getElementById('review-words-list');
  if (!reviewScreen || !wordsList) return;

  // Update the title
  var title = reviewScreen.querySelector('h2');
  if (title) title.textContent = '🎵 Từ vựng trong bài hát';

  wordsList.innerHTML = relatedWordObjects.map(function(w) {
    return '<div class="review-word-card">' +
      '<span class="review-emoji">' + (w.emoji || '') + '</span>' +
      '<div class="review-word-info">' +
      '<strong>' + w.word + '</strong>' +
      '<span>' + w.vietnamese + '</span>' +
      '</div>' +
      '<button class="review-speak-btn" onclick="speakWord(\'' + w.word.replace(/'/g, "\\'") + '\')">🔊</button>' +
      '</div>';
  }).join('');

  reviewScreen.classList.remove('hidden');
  reviewScreen.style.display = 'block';

  var continueBtn = document.getElementById('review-continue-btn');
  continueBtn.onclick = function() {
    reviewScreen.classList.add('hidden');
    reviewScreen.style.display = 'none';
    // Restore original title
    if (title) title.textContent = '📖 Từ cần ôn lại';
  };
}

// ========== QUIZ TYPE HANDLING ==========

function setQuizType(type) {
  quizType = type;
  document.querySelectorAll('.quiz-type-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.quizType === type);
  });
}

// Quiz Functions
function startQuiz() {
  // Prevent double-click
  if (isQuizActive) return;

  const activeCategory = document.querySelector('#games > .category-selector .quiz-category-btn.active');
  const category = activeCategory ? activeCategory.dataset.category : 'animals';

  quizQuestions = generateQuizQuestions(category, 5);
  quizScore = 0;
  currentQuestionIndex = 0;
  isQuizActive = true;
  wrongAnswers = [];

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

  // Hide next button
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  const question = quizQuestions[currentQuestionIndex];
  const questionNum = document.getElementById('question-num');
  const quizScoreEl = document.getElementById('quiz-score');
  const questionEmoji = document.getElementById('question-emoji');
  const optionsContainer = document.getElementById('quiz-options');
  const questionLabel = questionEmoji.parentElement.querySelector('p');

  questionNum.textContent = `${currentQuestionIndex + 1}/${quizQuestions.length}`;
  quizScoreEl.textContent = quizScore;

  optionsContainer.innerHTML = '';

  if (quizType === 'listening') {
    // Listening: hide emoji, play audio, show word options
    questionEmoji.textContent = '🔊';
    if (questionLabel) questionLabel.textContent = 'Nghe và chọn từ đúng!';
    speakWord(question.correctAnswer);

    question.options.forEach(function(option) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.addEventListener('click', function() { checkAnswer(option, question.correctAnswer, btn); });
      optionsContainer.appendChild(btn);
    });
  } else if (quizType === 'vn-en') {
    // Vietnamese -> English: show Vietnamese, choose English word
    questionEmoji.textContent = '🇻🇳';
    if (questionLabel) questionLabel.textContent = question.vietnamese;

    question.options.forEach(function(option) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.addEventListener('click', function() { checkAnswer(option, question.correctAnswer, btn); });
      optionsContainer.appendChild(btn);
    });
  } else if (quizType === 'en-vn') {
    // English -> Vietnamese: show English word, choose Vietnamese translation
    questionEmoji.textContent = '';
    if (questionLabel) questionLabel.textContent = question.correctAnswer;
    speakWord(question.correctAnswer);

    // Build Vietnamese options from the question's word set
    var categoryData = getCurrentQuizCategoryData();
    var correctVN = question.vietnamese;
    var vnOptions = [correctVN];
    if (categoryData) {
      var otherWords = categoryData.words.filter(function(w) {
        return w.vietnamese !== correctVN;
      }).sort(function() { return Math.random() - 0.5; }).slice(0, 3);
      otherWords.forEach(function(w) { vnOptions.push(w.vietnamese); });
    }
    vnOptions.sort(function() { return Math.random() - 0.5; });

    vnOptions.forEach(function(option) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.addEventListener('click', function() { checkAnswer(option, correctVN, btn); });
      optionsContainer.appendChild(btn);
    });
  } else {
    // Default emoji mode
    questionEmoji.textContent = question.emoji;
    if (questionLabel) questionLabel.textContent = 'Đây là gì nhỉ?';
    speakWord(question.correctAnswer);

    question.options.forEach(function(option) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.addEventListener('click', function() { checkAnswer(option, question.correctAnswer, btn); });
      optionsContainer.appendChild(btn);
    });
  }
}

function getCurrentQuizCategoryData() {
  var activeBtn = document.querySelector('#games > .category-selector .quiz-category-btn.active');
  var category = activeBtn ? activeBtn.dataset.category : 'animals';
  return vocabularyData[category] || null;
}

function checkAnswer(selected, correct, button) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach(opt => opt.disabled = true);

  const question = quizQuestions[currentQuestionIndex];
  const isCorrect = selected === correct;

  if (isCorrect) {
    button.classList.add('correct');
    quizScore++;
    addPoints(10);
    speakWord(question.correctAnswer);
    createMiniConfetti(5);
    playCorrectSound();
  } else {
    button.classList.add('wrong');
    options.forEach(opt => {
      if (opt.textContent === correct) {
        opt.classList.add('correct');
      }
    });
    speakWord(question.correctAnswer);
    playWrongSound();

    // Track wrong answer for review
    wrongAnswers.push({
      word: question.correctAnswer,
      vietnamese: question.vietnamese,
      emoji: question.emoji || ''
    });
  }

  // Record to SRS
  if (srs) srs.recordAnswer(question.correctAnswer, isCorrect);

  // Show Next button instead of auto-advance
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'block';
  }
}

function showQuizResult() {
  document.getElementById('quiz-container').style.display = 'none';
  recordActivity();

  renderReviewScreen(wrongAnswers, function() {
    displayQuizResult();
  });
}

function displayQuizResult() {
  document.getElementById('quiz-result').style.display = 'block';

  const resultEmoji = document.getElementById('result-emoji');
  const resultMessage = document.getElementById('result-message');
  const finalScore = document.getElementById('final-score');
  const starsContainer = document.getElementById('stars-container');

  finalScore.textContent = `${quizScore}/${quizQuestions.length}`;

  const percentage = quizScore / quizQuestions.length;
  let stars = 1;
  let message = 'Cố gắng lên nhé!';
  let emoji = '😊';

  if (percentage >= 0.8) {
    stars = 3;
    message = 'Tuyệt vời! Con giỏi lắm!';
    emoji = '🎉';
  } else if (percentage >= 0.6) {
    stars = 2;
    message = 'Giỏi lắm! Tiếp tục cố gắng!';
    emoji = '👏';
  }

  resultEmoji.textContent = emoji;
  resultMessage.textContent = message;
  starsContainer.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  playVictorySound(stars);
  createFireworks(stars);

  isQuizActive = false;

  checkAndShowAchievements();
  updateProgressSummary();
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

// ========== CELEBRATION EFFECTS ==========

// Mini confetti for correct answers (lightweight)
function createMiniConfetti(count = 5) {
  const celebration = document.getElementById('celebration');
  if (!celebration) return;

  const emojis = ['⭐', '✨', '🌟'];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.left = (Math.random() * 60 + 20) + 'vw'; // Center area
      confetti.style.top = '-20px';
      confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
      confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';

      celebration.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 60);
  }
}

// Victory Sound Effect (Web Audio API)
function playVictorySound(stars) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Different melodies for different star levels
  const melodies = {
    1: [262, 294, 330], // C, D, E (simple)
    2: [262, 330, 392, 523], // C, E, G, C (cheerful)
    3: [523, 659, 784, 1047] // C, E, G, C (high, triumphant)
  };

  const notes = melodies[stars] || melodies[1];
  const duration = 0.2;

  notes.forEach((freq, index) => {
    setTimeout(() => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    }, index * 150);
  });
}

// Fireworks celebration with different levels
function createFireworks(stars) {
  const celebration = document.getElementById('celebration');
  if (!celebration) return;

  // Configuration based on stars
  const config = {
    1: { count: 3, fireworks: 2, colors: ['#FFD700', '#FFA500'] }, // Gold/Orange
    2: { count: 6, fireworks: 4, colors: ['#00b894', '#74b9ff', '#fdcb6e'] }, // Green/Blue/Yellow
    3: { count: 10, fireworks: 6, colors: ['#6c5ce7', '#fd79a8', '#00b894', '#fdcb6e', '#e17055', '#74b9ff'] } // Rainbow
  };

  const level = config[stars] || config[1];
  const emojis = ['🌟', '⭐', '✨', '🎉', '🎊', '💫', '🎆', '🎇'];

  // Confetti rain
  for (let i = 0; i < level.count * 3; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-20px';
      confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

      celebration.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }, i * 80);
  }

  // Firework explosions
  for (let i = 0; i < level.fireworks; i++) {
    setTimeout(() => {
      createFireworkExplosion(
        Math.random() * 60 + 20, // x: 20-80%
        Math.random() * 40 + 20, // y: 20-60%
        level.colors[Math.floor(Math.random() * level.colors.length)]
      );
    }, i * 400);
  }
}

// Create single firework explosion
function createFireworkExplosion(x, y, color) {
  const celebration = document.getElementById('celebration');
  if (!celebration) return;

  const particles = 20;
  const radius = 100;

  for (let i = 0; i < particles; i++) {
    const angle = (Math.PI * 2 * i) / particles;
    const velocity = 0.8 + Math.random() * 0.4;

    const particle = document.createElement('div');
    particle.className = 'firework';
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.background = color;
    particle.style.setProperty('--tx', `${Math.cos(angle) * radius * velocity}px`);
    particle.style.setProperty('--ty', `${Math.sin(angle) * radius * velocity}px`);

    celebration.appendChild(particle);

    setTimeout(() => particle.remove(), 1200);
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
  const wordChainGameEl = document.getElementById('word-chain-game');

  if (mode === 'quiz') {
    quizGame.style.display = 'block';
    spellingGame.style.display = 'none';
    if (wordChainGameEl) wordChainGameEl.style.display = 'none';
    if (isSpellingActive) resetSpelling();
    if (isWordChainActive) resetWordChain();
  } else if (mode === 'spelling') {
    quizGame.style.display = 'none';
    spellingGame.style.display = 'block';
    if (wordChainGameEl) wordChainGameEl.style.display = 'none';
    if (isQuizActive) resetQuiz();
    if (isWordChainActive) resetWordChain();
  } else if (mode === 'word-chain') {
    quizGame.style.display = 'none';
    spellingGame.style.display = 'none';
    if (wordChainGameEl) wordChainGameEl.style.display = 'block';
    if (isQuizActive) resetQuiz();
    if (isSpellingActive) resetSpelling();
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
  // Prevent double-click
  if (isSpellingActive) return;

  const activeCategory = document.querySelector('#games > .category-selector .quiz-category-btn.active');
  const category = activeCategory ? activeCategory.dataset.category : 'animals';

  spellingQuestions = generateSpellingQuestions(category, 5);
  spellingScore = 0;
  currentSpellingIndex = 0;
  isSpellingActive = true;
  usedHint = false;
  wrongAnswers = [];

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

  // Hide next button
  const nextBtn = document.getElementById('spelling-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  const question = spellingQuestions[currentSpellingIndex];

  // Update progress
  document.getElementById('spelling-num').textContent =
    `${currentSpellingIndex + 1}/${spellingQuestions.length}`;
  document.getElementById('spelling-score').textContent = spellingScore;

  // Show emoji
  document.getElementById('spelling-emoji').textContent = question.emoji;

  // Show/hide UI based on mode
  const typeMode = document.getElementById('spelling-type-mode');
  const arrangeMode = document.getElementById('spelling-arrange-mode');

  if (spellingMode === 'type') {
    typeMode.style.display = 'block';
    arrangeMode.style.display = 'none';
  } else {
    typeMode.style.display = 'none';
    arrangeMode.style.display = 'block';
    setupArrangeMode(question.word);
  }

  // Reset input, button and feedback
  const input = document.getElementById('spelling-input');
  const checkBtn = document.getElementById('check-spelling-btn');

  input.value = '';
  input.disabled = false;
  checkBtn.disabled = false; // Re-enable button
  input.focus();

  document.getElementById('spelling-feedback').innerHTML = '';
  document.getElementById('spelling-feedback').className = 'spelling-feedback';

  // Reset hint
  usedHint = false;
  document.getElementById('hint-text').style.display = 'none';
  document.getElementById('hint-vn-btn').disabled = false;

  // Reset arrange mode buttons
  const checkArrangeBtn = document.getElementById('check-arrange-btn');
  const clearArrangeBtn = document.getElementById('clear-arrange-btn');
  if (checkArrangeBtn) checkArrangeBtn.disabled = false;
  if (clearArrangeBtn) clearArrangeBtn.disabled = false;

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
  const checkBtn = document.getElementById('check-spelling-btn');

  // Prevent double-click
  if (input.disabled || checkBtn.disabled) return;

  const userAnswer = input.value.trim().toLowerCase();
  const question = spellingQuestions[currentSpellingIndex];
  const correctAnswer = question.word.toLowerCase();

  const feedback = document.getElementById('spelling-feedback');

  // Disable both input and button
  input.disabled = true;
  checkBtn.disabled = true;

  var isCorrect = userAnswer === correctAnswer;

  if (isCorrect) {
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

    speakWord(question.word);
    createMiniConfetti(5);
    playCorrectSound();
  } else {
    feedback.innerHTML = `
      <div class="feedback-wrong">
        ❌ Chưa đúng! Đáp án là: <strong>${question.word}</strong>
        ${question.ipa ? `<span class="ipa">${question.ipa}</span>` : ''}
      </div>
    `;
    feedback.classList.add('wrong');
    speakWord(question.word);
    playWrongSound();

    wrongAnswers.push({
      word: question.word,
      vietnamese: question.vietnamese,
      emoji: question.emoji || ''
    });
  }

  // Record to SRS
  if (srs) srs.recordAnswer(question.word, isCorrect);

  // Show Next button instead of auto-advance
  const nextBtn = document.getElementById('spelling-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'block';
  }
}

function showSpellingResult() {
  document.getElementById('spelling-container').style.display = 'none';
  recordActivity();

  renderReviewScreen(wrongAnswers, function() {
    displaySpellingResult();
  });
}

function displaySpellingResult() {
  document.getElementById('spelling-result').style.display = 'block';

  const resultEmoji = document.getElementById('spelling-result-emoji');
  const resultMessage = document.getElementById('spelling-result-message');
  const finalScore = document.getElementById('spelling-final-score');
  const starsContainer = document.getElementById('spelling-stars-container');

  finalScore.textContent = `${spellingScore}/${spellingQuestions.length}`;

  const percentage = spellingScore / spellingQuestions.length;
  let stars = 1;
  let message = 'Cố gắng lên nhé!';
  let emoji = '😊';

  if (percentage >= 0.8) {
    stars = 3;
    message = 'Tuyệt vời! Spelling giỏi lắm!';
    emoji = '🎉';
  } else if (percentage >= 0.6) {
    stars = 2;
    message = 'Giỏi lắm! Tiếp tục luyện tập!';
    emoji = '👏';
  }

  resultEmoji.textContent = emoji;
  resultMessage.textContent = message;
  starsContainer.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  playVictorySound(stars);
  createFireworks(stars);

  isSpellingActive = false;

  checkAndShowAchievements();
  updateProgressSummary();
}

// ========== WORD CHAIN GAME ==========

// Level selection handler
document.addEventListener('DOMContentLoaded', () => {
  const levelButtons = document.querySelectorAll('.level-btn');
  levelButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      wordChainLevel = parseInt(btn.dataset.level);
      levelButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Start button
  const startBtn = document.getElementById('start-word-chain-btn');
  if (startBtn) {
    startBtn.addEventListener('click', startWordChain);
  }

  // Spelling mode selection
  const spellingModeButtons = document.querySelectorAll('.spelling-mode-btn');
  spellingModeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      spellingMode = btn.dataset.mode;
      spellingModeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Arrange mode buttons
  const clearArrangeBtn = document.getElementById('clear-arrange-btn');
  if (clearArrangeBtn) {
    clearArrangeBtn.addEventListener('click', clearArrangedLetters);
  }

  const checkArrangeBtn = document.getElementById('check-arrange-btn');
  if (checkArrangeBtn) {
    checkArrangeBtn.addEventListener('click', checkArrangedWord);
  }
});

function startWordChain() {
  // Word Chain uses ALL words from all categories for better gameplay
  const words = window.getAllWords(vocabularyData);

  if (words.length < 20) {
    alert('Không đủ từ vựng để chơi Word Chain!');
    return;
  }

  wordChainGame = new window.WordChainGame(words, wordChainLevel);
  isWordChainActive = true;

  // Hide start screen, show game
  document.getElementById('start-word-chain-container').style.display = 'none';
  document.getElementById('word-chain-container').style.display = 'block';
  document.getElementById('word-chain-result').style.display = 'none';

  renderWordChainQuestion();
}

function renderWordChainQuestion() {
  const question = wordChainGame.getNextQuestion();

  if (!question) {
    // Game complete
    showWordChainResult();
    return;
  }

  // Hide next button
  const nextBtn = document.getElementById('word-chain-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  // Update progress
  const progress = wordChainGame.getProgress();
  document.getElementById('word-chain-num').textContent = `${progress.current}/${progress.total}`;
  document.getElementById('word-chain-score').textContent = wordChainGame.score;

  // Update prompt based on level
  const promptEl = document.getElementById('word-chain-prompt');
  if (wordChainLevel === 1) {
    promptEl.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 4rem; margin: 20px 0;">${question.targetLetter}</div>
        <p style="font-size: 1.3rem; font-weight: 600; white-space: nowrap;">
          Tìm từ bắt đầu bằng chữ <strong style="color: var(--primary);">${question.targetLetter}</strong>
        </p>
      </div>
    `;
  } else {
    // Level 2
    const lastLetter = question.targetLetter;
    promptEl.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 2rem; margin: 10px 0;">
          ${question.previousWord.emoji} <strong>${question.previousWord.word}</strong>
        </div>
        <p style="font-size: 1.1rem; color: #666; margin: 10px 0;">
          ↓ Chữ cuối: <strong style="color: var(--primary); font-size: 1.5rem;">${lastLetter}</strong> ↓
        </p>
        <p style="font-size: 1.2rem; font-weight: 600; white-space: nowrap;">
          Tìm từ bắt đầu bằng <strong style="color: var(--primary);">${lastLetter}</strong>
        </p>
      </div>
    `;
  }

  // Update word chain display for Level 2
  const chainDisplay = document.getElementById('word-chain-display');
  if (wordChainLevel === 2 && wordChainGame.wordChain.length > 0) {
    chainDisplay.style.display = 'block';
    chainDisplay.innerHTML = `
      <div class="chain-title">Chuỗi từ của bé:</div>
      <div class="chain-words">
        ${wordChainGame.wordChain.map(w => `
          <span class="chain-word">${w.emoji} ${w.word}</span>
        `).join('<span class="chain-arrow">→</span>')}
      </div>
    `;
  } else {
    chainDisplay.style.display = 'none';
  }

  // Render options
  const optionsContainer = document.getElementById('word-chain-options');
  optionsContainer.innerHTML = '';

  question.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.innerHTML = `
      <span class="emoji">${option.emoji}</span>
      <span class="word">${option.word}</span>
      <small class="vietnamese" style="display: block; font-size: 0.85rem; color: #888; margin-top: 5px;">${option.vietnamese}</small>
    `;
    btn.addEventListener('click', () => checkWordChainAnswer(option));
    optionsContainer.appendChild(btn);
  });
}

function checkWordChainAnswer(selectedWord) {
  const result = wordChainGame.submitAnswer(selectedWord);
  const correctAnswer = wordChainGame.currentQuestion.correctAnswer;

  // Visual feedback
  const buttons = document.querySelectorAll('#word-chain-options .quiz-option');
  buttons.forEach(btn => {
    btn.disabled = true;
    const word = btn.querySelector('.word').textContent;

    if (word === selectedWord.word) {
      if (result.isCorrect) {
        btn.classList.add('correct');
        showHighFive();
        playCorrectSound();
      } else {
        btn.classList.add('wrong');
      }
    }

    // Highlight correct answer when user is wrong
    if (!result.isCorrect && word === correctAnswer.word) {
      btn.classList.add('correct');
    }
  });

  // Update score
  document.getElementById('word-chain-score').textContent = wordChainGame.score;

  // Show Next button instead of auto-advance
  const nextBtn = document.getElementById('word-chain-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'block';
  }
}

function showHighFive() {
  const animation = document.getElementById('high-five-animation');
  animation.style.display = 'block';

  setTimeout(() => {
    animation.style.display = 'none';
  }, 1000);
}

function showWordChainResult() {
  const finalScore = wordChainGame.getFinalScore();
  const maxScore = wordChainLevel === 1 ? 200 : 200; // 10*20 or 8*25
  const percentage = (finalScore / maxScore) * 100;

  // Hide game, show result
  document.getElementById('word-chain-container').style.display = 'none';
  document.getElementById('word-chain-result').style.display = 'block';

  // Update result display
  const resultEmoji = document.getElementById('word-chain-result-emoji');
  const resultMessage = document.getElementById('word-chain-result-message');
  const finalScoreEl = document.getElementById('word-chain-final-score');
  const starsContainer = document.getElementById('word-chain-stars-container');

  let emoji, message, stars;
  if (percentage >= 80) {
    emoji = '🎉';
    message = 'Xuất sắc!';
    stars = 3;
  } else if (percentage >= 60) {
    emoji = '😊';
    message = 'Giỏi lắm!';
    stars = 2;
  } else {
    emoji = '💪';
    message = 'Cố gắng lên!';
    stars = 1;
  }

  resultEmoji.textContent = emoji;
  resultMessage.textContent = message;
  finalScoreEl.textContent = finalScore;
  starsContainer.textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  // Show final chain for Level 2
  const finalChainDisplay = document.getElementById('final-chain-display');
  if (wordChainLevel === 2 && wordChainGame.wordChain.length > 0) {
    finalChainDisplay.style.display = 'block';
    finalChainDisplay.innerHTML = `
      <h4 style="margin: 20px 0 10px;">Chuỗi từ hoàn chỉnh:</h4>
      <div class="final-chain">
        ${wordChainGame.wordChain.map(w => `
          <div class="final-chain-word">
            <div class="emoji">${w.emoji}</div>
            <div class="word">${w.word}</div>
            <div class="vietnamese">${w.vietnamese}</div>
          </div>
        `).join('<div class="chain-connector">→</div>')}
      </div>
    `;
  } else {
    finalChainDisplay.style.display = 'none';
  }

  // Update total score and streak
  totalScore += finalScore;
  scoreDisplay.textContent = totalScore;
  saveScore();
  recordActivity();
  playVictorySound(stars);
  createFireworks(stars);

  isWordChainActive = false;
}

function resetWordChain() {
  wordChainGame = null;
  isWordChainActive = false;

  document.getElementById('start-word-chain-container').style.display = 'block';
  document.getElementById('word-chain-container').style.display = 'none';
  document.getElementById('word-chain-result').style.display = 'none';
}

function restartWordChain() {
  resetWordChain();
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

// ========== SPELLING ARRANGE MODE ==========

function setupArrangeMode(word) {
  arrangedLetters = [];
  const letters = word.toUpperCase().split('');

  // Shuffle letters
  const shuffled = [...letters].sort(() => Math.random() - 0.5);

  // Render available letters
  const availableContainer = document.getElementById('available-letters');
  availableContainer.innerHTML = '';

  shuffled.forEach((letter, index) => {
    const btn = document.createElement('button');
    btn.className = 'letter-btn';
    btn.textContent = letter;
    btn.dataset.index = index;
    btn.addEventListener('click', () => addLetterToArranged(letter, index));
    availableContainer.appendChild(btn);
  });

  // Clear arranged area
  updateArrangedDisplay();
}

function addLetterToArranged(letter, index) {
  arrangedLetters.push({ letter, index });

  // Mark button as used
  const buttons = document.querySelectorAll('.letter-btn');
  buttons[index].classList.add('used');

  updateArrangedDisplay();
}

function updateArrangedDisplay() {
  const arrangedContainer = document.getElementById('arranged-letters');
  arrangedContainer.innerHTML = '';

  if (arrangedLetters.length === 0) {
    arrangedContainer.classList.add('empty');
  } else {
    arrangedContainer.classList.remove('empty');

    arrangedLetters.forEach((item, i) => {
      const span = document.createElement('span');
      span.className = 'arranged-letter';
      span.textContent = item.letter;
      span.addEventListener('click', () => removeLetter(i));
      arrangedContainer.appendChild(span);
    });
  }
}

function removeLetter(arrangedIndex) {
  const removed = arrangedLetters[arrangedIndex];
  arrangedLetters.splice(arrangedIndex, 1);

  // Unmark button
  const buttons = document.querySelectorAll('.letter-btn');
  buttons[removed.index].classList.remove('used');

  updateArrangedDisplay();
}

function clearArrangedLetters() {
  arrangedLetters = [];

  // Unmark all buttons
  const buttons = document.querySelectorAll('.letter-btn');
  buttons.forEach(btn => btn.classList.remove('used'));

  updateArrangedDisplay();
}

function checkArrangedWord() {
  const question = spellingQuestions[currentSpellingIndex];
  const correctAnswer = question.word.toUpperCase();
  const userAnswer = arrangedLetters.map(item => item.letter).join('');

  const feedback = document.getElementById('spelling-feedback');
  const checkBtn = document.getElementById('check-arrange-btn');
  const clearBtn = document.getElementById('clear-arrange-btn');

  // Disable buttons
  checkBtn.disabled = true;
  clearBtn.disabled = true;
  document.querySelectorAll('.letter-btn').forEach(btn => btn.disabled = true);
  document.querySelectorAll('.arranged-letter').forEach(span => {
    span.style.pointerEvents = 'none';
  });

  var isCorrectArr = userAnswer === correctAnswer;

  if (isCorrectArr) {
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

    speakWord(question.word);
    createMiniConfetti(5);
    playCorrectSound();
  } else {
    feedback.innerHTML = `
      <div class="feedback-wrong">
        ❌ Chưa đúng! Đáp án là: <strong>${question.word}</strong>
        ${question.ipa ? `<span class="ipa">${question.ipa}</span>` : ''}
      </div>
    `;
    feedback.classList.add('wrong');
    speakWord(question.word);
    playWrongSound();

    wrongAnswers.push({
      word: question.word,
      vietnamese: question.vietnamese,
      emoji: question.emoji || ''
    });
  }

  // Record to SRS
  if (srs) srs.recordAnswer(question.word, isCorrectArr);

  // Show Next button
  const nextBtn = document.getElementById('spelling-next-btn');
  if (nextBtn) {
    nextBtn.style.display = 'block';
  }
}

// ========================================
// TRUE/FALSE RUSH GAME
// ========================================

let trueFalseGame = null;
let trueFalseCardTimer = null;
let trueFalseStartX = 0;
let trueFalseStartY = 0;
let isSwiping = false;
let trueFalseListenersActive = false;

// Audio feedback functions using Web Audio API
function playCorrectSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Play a happy ascending tone
  const times = [0, 0.1, 0.2];
  const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 (major chord)

  times.forEach((time, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequencies[index];
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.3);

    oscillator.start(audioContext.currentTime + time);
    oscillator.stop(audioContext.currentTime + time + 0.3);
  });
}

function playWrongSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Play a descending "oops" tone
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

// Initialize True/False game
const startTrueFalseBtn = document.getElementById('start-true-false-btn');
if (startTrueFalseBtn) {
  startTrueFalseBtn.addEventListener('click', startTrueFalseRush);
}

function startTrueFalseRush() {
  // Hide start screen
  document.getElementById('start-true-false-container').style.display = 'none';

  // Show game container
  document.getElementById('true-false-container').style.display = 'block';

  // Get selected category
  const activeCategory = document.querySelector('#games > .category-selector .quiz-category-btn.active');
  const category = activeCategory ? activeCategory.dataset.category : 'animals';
  const categoryWords = vocabularyData[category] ? vocabularyData[category].words.filter(w => w.emoji) : [];
  const words = categoryWords.length >= 2 ? categoryWords : getAllWords(vocabularyData);
  trueFalseGame = new TrueFalseRushGame(words);

  // Setup swipe listeners
  setupSwipeListeners();

  // Show first card
  showNextTrueFalseCard();
}

function showNextTrueFalseCard() {
  const card = trueFalseGame.getNextCard();

  if (!card) {
    // Game complete
    showTrueFalseResult();
    return;
  }

  // Update progress
  const progress = trueFalseGame.getProgress();
  document.getElementById('true-false-num').textContent = `${progress.current}/${progress.total}`;
  document.getElementById('true-false-score').textContent = trueFalseGame.score;

  // Update card display
  document.getElementById('card-emoji').textContent = card.emoji;
  document.getElementById('card-word').textContent = card.word;

  // Speak the word when card appears
  speakWord(card.word);

  // Animate card sliding in
  const slidingCard = document.getElementById('sliding-card');
  slidingCard.className = 'sliding-card';
  slidingCard.classList.add('slide-in-left');

  // Clear feedback
  document.getElementById('true-false-feedback').innerHTML = '';

  // No auto-advance - wait for user to choose
}

function submitTrueFalseAnswer(userAnswer) {
  // Clear auto-advance timer
  clearTimeout(trueFalseCardTimer);

  // Submit answer
  const result = trueFalseGame.submitAnswer(userAnswer);

  // Animate card sliding out
  const slidingCard = document.getElementById('sliding-card');
  if (userAnswer) {
    slidingCard.classList.add('swipe-right-out');
  } else {
    slidingCard.classList.add('swipe-left-out');
  }

  // Show feedback
  const feedback = document.getElementById('true-false-feedback');
  if (result.isCorrect) {
    feedback.innerHTML = `
      <div class="feedback-correct">
        ✅ Chính xác! +10 điểm
      </div>
    `;
    createMiniConfetti(3);
    playCorrectSound(); // Play happy sound
  } else {
    const card = trueFalseGame.currentCard;
    const correctAnswer = card.isCorrect ? 'ĐÚNG' : 'SAI';
    feedback.innerHTML = `
      <div class="feedback-wrong">
        ❌ Sai rồi! Đáp án đúng là: <strong>${correctAnswer}</strong>
      </div>
    `;
    playWrongSound(); // Play oops sound
  }

  // Update score display
  document.getElementById('true-false-score').textContent = result.score;

  // Show next card after delay
  setTimeout(() => {
    showNextTrueFalseCard();
  }, 1500);
}

function setupSwipeListeners() {
  // Prevent adding listeners multiple times
  if (trueFalseListenersActive) {
    return;
  }

  const cardArea = document.getElementById('card-display-area');
  const swipeLeft = document.querySelector('.swipe-left');
  const swipeRight = document.querySelector('.swipe-right');

  if (!cardArea || !swipeLeft || !swipeRight) {
    return;
  }

  // Touch events
  cardArea.addEventListener('touchstart', handleTouchStart, false);
  cardArea.addEventListener('touchmove', handleTouchMove, false);
  cardArea.addEventListener('touchend', handleTouchEnd, false);

  // Mouse events (for desktop)
  cardArea.addEventListener('mousedown', handleMouseDown, false);
  cardArea.addEventListener('mousemove', handleMouseMove, false);
  cardArea.addEventListener('mouseup', handleMouseUp, false);

  // Click events for swipe buttons
  swipeLeft.addEventListener('click', handleSwipeLeftClick, false);
  swipeRight.addEventListener('click', handleSwipeRightClick, false);

  // Keyboard events
  document.addEventListener('keydown', handleTrueFalseKeyboard, false);

  trueFalseListenersActive = true;
}

function handleSwipeLeftClick() {
  submitTrueFalseAnswer(false);
}

function handleSwipeRightClick() {
  submitTrueFalseAnswer(true);
}

function removeSwipeListeners() {
  if (!trueFalseListenersActive) {
    return;
  }

  const cardArea = document.getElementById('card-display-area');
  const swipeLeft = document.querySelector('.swipe-left');
  const swipeRight = document.querySelector('.swipe-right');

  if (cardArea) {
    cardArea.removeEventListener('touchstart', handleTouchStart, false);
    cardArea.removeEventListener('touchmove', handleTouchMove, false);
    cardArea.removeEventListener('touchend', handleTouchEnd, false);
    cardArea.removeEventListener('mousedown', handleMouseDown, false);
    cardArea.removeEventListener('mousemove', handleMouseMove, false);
    cardArea.removeEventListener('mouseup', handleMouseUp, false);
  }

  if (swipeLeft) {
    swipeLeft.removeEventListener('click', handleSwipeLeftClick, false);
  }

  if (swipeRight) {
    swipeRight.removeEventListener('click', handleSwipeRightClick, false);
  }

  document.removeEventListener('keydown', handleTrueFalseKeyboard, false);

  trueFalseListenersActive = false;
}

function handleTouchStart(e) {
  trueFalseStartX = e.touches[0].clientX;
  trueFalseStartY = e.touches[0].clientY;
  isSwiping = true;
}

function handleTouchMove(e) {
  if (!isSwiping) return;

  const currentX = e.touches[0].clientX;
  const diffX = currentX - trueFalseStartX;

  // Visual feedback
  const slidingCard = document.getElementById('sliding-card');
  slidingCard.style.transform = `translateX(${diffX * 0.5}px) rotate(${diffX * 0.05}deg)`;
}

function handleTouchEnd(e) {
  if (!isSwiping) return;
  isSwiping = false;

  const endX = e.changedTouches[0].clientX;
  const diffX = endX - trueFalseStartX;

  // Reset card position
  const slidingCard = document.getElementById('sliding-card');
  slidingCard.style.transform = '';

  // Detect swipe direction
  if (Math.abs(diffX) > 100) {
    if (diffX > 0) {
      // Swipe right = True
      submitTrueFalseAnswer(true);
    } else {
      // Swipe left = False
      submitTrueFalseAnswer(false);
    }
  }
}

function handleMouseDown(e) {
  trueFalseStartX = e.clientX;
  trueFalseStartY = e.clientY;
  isSwiping = true;
}

function handleMouseMove(e) {
  if (!isSwiping) return;

  const currentX = e.clientX;
  const diffX = currentX - trueFalseStartX;

  // Visual feedback
  const slidingCard = document.getElementById('sliding-card');
  slidingCard.style.transform = `translateX(${diffX * 0.5}px) rotate(${diffX * 0.05}deg)`;
}

function handleMouseUp(e) {
  if (!isSwiping) return;
  isSwiping = false;

  const endX = e.clientX;
  const diffX = endX - trueFalseStartX;

  // Reset card position
  const slidingCard = document.getElementById('sliding-card');
  slidingCard.style.transform = '';

  // Detect swipe direction
  if (Math.abs(diffX) > 100) {
    if (diffX > 0) {
      // Swipe right = True
      submitTrueFalseAnswer(true);
    } else {
      // Swipe left = False
      submitTrueFalseAnswer(false);
    }
  }
}

function handleTrueFalseKeyboard(e) {
  // Only handle if true-false game is active
  const container = document.getElementById('true-false-container');
  if (!container || container.style.display === 'none') return;

  if (e.key === 'ArrowLeft') {
    submitTrueFalseAnswer(false);
  } else if (e.key === 'ArrowRight') {
    submitTrueFalseAnswer(true);
  }
}

function showTrueFalseResult() {
  // Remove event listeners
  removeSwipeListeners();

  // Hide game container
  document.getElementById('true-false-container').style.display = 'none';

  // Show result screen
  document.getElementById('true-false-result').style.display = 'block';

  const finalScore = trueFalseGame.getFinalScore();
  document.getElementById('true-false-final-score').textContent = finalScore;

  // Update total score
  totalScore += finalScore;
  localStorage.setItem('englishAppScore', totalScore);
  updateScoreDisplay();

  // Record activity for streak
  recordActivity();

  // Determine result message and emoji
  const totalPossible = 200;
  const percentage = (finalScore / totalPossible) * 100;

  let emoji = '🎉';
  let message = 'Tuyệt vời!';
  let stars = '⭐⭐⭐';

  if (percentage === 100) {
    emoji = '🏆';
    message = 'Hoàn hảo! Xuất sắc!';
    stars = '⭐⭐⭐⭐⭐';
    createFireworks(3);
  } else if (percentage >= 80) {
    emoji = '🎉';
    message = 'Tuyệt vời lắm!';
    stars = '⭐⭐⭐⭐';
  } else if (percentage >= 60) {
    emoji = '😊';
    message = 'Giỏi lắm!';
    stars = '⭐⭐⭐';
  } else if (percentage >= 40) {
    emoji = '🙂';
    message = 'Khá đấy!';
    stars = '⭐⭐';
  } else {
    emoji = '💪';
    message = 'Cố lên bé nhé!';
    stars = '⭐';
  }

  document.getElementById('true-false-result-emoji').textContent = emoji;
  document.getElementById('true-false-result-message').textContent = message;
  document.getElementById('true-false-stars-container').textContent = stars;
}

function restartTrueFalse() {
  // Remove event listeners
  removeSwipeListeners();

  // Hide result screen
  document.getElementById('true-false-result').style.display = 'none';

  // Show start screen
  document.getElementById('start-true-false-container').style.display = 'block';

  // Reset game
  trueFalseGame = null;
  clearTimeout(trueFalseCardTimer);
}

// ========================================
// FLASHCARD INTERACTIVE GAME
// ========================================

let flashcardGame = null;
let flashcardScore = 0;
let currentFlashcardIndex = 0;
let isFlashcardActive = false;
let flashcardTimer = null;
let flashcardStartTime = null;
let flashcardComboCount = 0;
let flashcardMaxCombo = 0;
let flashcardTimeRemaining = 10;
let flashcardAnswerLocked = false;

// Audio feedback functions
function playComboSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Ascending celebration sound
  const times = [0, 0.1, 0.2, 0.3];
  const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5-E5-G5-C6

  times.forEach((time, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequencies[index];
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + time);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.4);

    oscillator.start(audioContext.currentTime + time);
    oscillator.stop(audioContext.currentTime + time + 0.4);
  });
}

function playTimeoutSound() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Gentle "time's up" sound
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(330, audioContext.currentTime + 0.5);

  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

// Initialize Flashcard Interactive game
const startFlashcardBtn = document.getElementById('start-flashcard-btn');
if (startFlashcardBtn) {
  startFlashcardBtn.addEventListener('click', startFlashcardInteractive);
}

function startFlashcardInteractive() {
  // Prevent double-click
  if (isFlashcardActive) return;

  // Get selected category
  const activeCategory = document.querySelector('#games > .category-selector .quiz-category-btn.active');
  const category = activeCategory ? activeCategory.dataset.category : 'animals';

  // Hide start screen
  document.getElementById('start-flashcard-container').style.display = 'none';

  // Show game container
  document.getElementById('flashcard-game-container').style.display = 'block';

  // Initialize game with category words (20 questions)
  const categoryWords = vocabularyData[category] ? vocabularyData[category].words.filter(w => w.emoji) : [];
  const words = categoryWords.length >= 2 ? categoryWords : getAllWords(vocabularyData);
  flashcardGame = new FlashcardInteractiveGame(words, 20);

  flashcardScore = 0;
  currentFlashcardIndex = 0;
  isFlashcardActive = true;
  flashcardComboCount = 0;
  flashcardMaxCombo = 0;
  flashcardAnswerLocked = false;

  // Add speaker button listener
  const speakBtn = document.getElementById('flashcard-speak-btn');
  if (speakBtn) {
    speakBtn.onclick = () => {
      const currentWord = document.getElementById('flashcard-word').textContent;
      if (currentWord && currentWord !== 'Loading...') {
        speakWord(currentWord);
      }
    };
  }

  // Show first question
  showNextFlashcardQuestion();
}

function showNextFlashcardQuestion() {
  // Unlock answer submission
  flashcardAnswerLocked = false;

  const question = flashcardGame.getNextQuestion();

  if (!question) {
    // Game complete
    showFlashcardResult();
    return;
  }

  // Update progress
  const progress = flashcardGame.getProgress();
  document.getElementById('flashcard-num').textContent = `${progress.current}/${progress.total}`;
  document.getElementById('flashcard-score').textContent = flashcardGame.score;

  // Update combo display
  const comboCount = flashcardGame.getComboCount();
  const comboDisplay = document.getElementById('flashcard-combo');
  const comboCountSpan = document.getElementById('combo-count');

  if (comboCount >= 3) {
    comboDisplay.style.display = 'inline';
    comboCountSpan.textContent = comboCount;
  } else {
    comboDisplay.style.display = 'none';
  }

  // Display center word
  document.getElementById('flashcard-word').textContent = question.word;

  // Place 4 emojis in orbit positions
  const orbitEmojis = document.querySelectorAll('.orbit-emoji');
  question.emojis.forEach((emojiObj, index) => {
    const emojiElement = orbitEmojis[index];

    // Remove paused/selected classes to restart animation
    emojiElement.classList.remove('paused', 'selected');

    // Re-enable pointer events
    emojiElement.style.pointerEvents = 'auto';

    // Update content
    emojiElement.textContent = emojiObj.emoji;
    emojiElement.dataset.emoji = emojiObj.emoji;

    // Remove old event listener by cloning
    const newEmojiElement = emojiElement.cloneNode(true);
    emojiElement.parentNode.replaceChild(newEmojiElement, emojiElement);

    // Add new event listener immediately
    newEmojiElement.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      submitFlashcardAnswer(emojiObj.emoji);
    }, { once: false });
  });

  // Clear feedback
  document.getElementById('flashcard-feedback').innerHTML = '';

  // Play pronunciation audio to help children recognize the word
  setTimeout(() => {
    speakWord(question.word);
  }, 300);

  // Start 10-second countdown timer
  flashcardStartTime = Date.now();
  flashcardTimeRemaining = 10;
  updateFlashcardTimer();
}

function updateFlashcardTimer() {
  if (!isFlashcardActive) return;

  const elapsed = (Date.now() - flashcardStartTime) / 1000;
  flashcardTimeRemaining = Math.max(0, 10 - elapsed);

  // Update timer bar
  const timerBar = document.getElementById('flashcard-timer-bar');
  const percentage = (flashcardTimeRemaining / 10) * 100;
  timerBar.style.width = `${percentage}%`;

  // Update time text
  document.getElementById('flashcard-time-text').textContent = `${Math.ceil(flashcardTimeRemaining)}s`;

  // Check if time's up
  if (flashcardTimeRemaining <= 0) {
    handleFlashcardTimeout();
    return;
  }

  // Continue timer
  flashcardTimer = setTimeout(() => updateFlashcardTimer(), 100);
}

function submitFlashcardAnswer(selectedEmoji) {
  // Prevent double-click
  if (flashcardAnswerLocked) return;
  flashcardAnswerLocked = true;

  // Stop timer
  clearTimeout(flashcardTimer);

  // Pause all orbit animations and disable clicks
  const allEmojis = document.querySelectorAll('.orbit-emoji');
  allEmojis.forEach(emoji => {
    emoji.classList.add('paused');
    emoji.style.pointerEvents = 'none';
    // Highlight the selected emoji
    if (emoji.dataset.emoji === selectedEmoji) {
      emoji.classList.add('selected');
    }
  });

  // Calculate time elapsed
  const timeElapsed = (Date.now() - flashcardStartTime) / 1000;

  // Submit answer
  const result = flashcardGame.submitAnswer(selectedEmoji, timeElapsed);

  // Show feedback
  const feedback = document.getElementById('flashcard-feedback');
  if (result.isCorrect) {
    feedback.innerHTML = `
      <div class="feedback-correct">
        ✅ Chính xác! +${result.points} điểm ${result.comboActive ? '(Combo x2!)' : ''}
      </div>
    `;
    createMiniConfetti(5);
    playCorrectSound();

    // Play combo sound if combo just activated
    if (result.comboActive && result.comboCount === 3) {
      setTimeout(() => playComboSound(), 200);
    }
  } else {
    const currentQuestion = flashcardGame.questions[flashcardGame.currentQuestionIndex - 1];
    feedback.innerHTML = `
      <div class="feedback-wrong">
        ❌ Sai rồi! Đáp án đúng là: <strong>${currentQuestion.correctEmoji}</strong>
      </div>
    `;
    playWrongSound();
  }

  // Update score and combo display
  document.getElementById('flashcard-score').textContent = result.totalScore;
  flashcardComboCount = result.comboCount;

  if (flashcardComboCount > flashcardMaxCombo) {
    flashcardMaxCombo = flashcardComboCount;
  }

  // Show next question after delay
  setTimeout(() => {
    showNextFlashcardQuestion();
  }, 1500);
}

function handleFlashcardTimeout() {
  // Stop timer
  clearTimeout(flashcardTimer);

  // Pause all orbit animations
  const allEmojis = document.querySelectorAll('.orbit-emoji');
  allEmojis.forEach(emoji => {
    emoji.classList.add('paused');
  });

  // Handle timeout
  const result = flashcardGame.handleTimeout();

  // Show timeout feedback
  const feedback = document.getElementById('flashcard-feedback');
  feedback.innerHTML = `
    <div class="feedback-timeout">
      ⏰ Hết giờ! Combo bị reset.
    </div>
  `;
  playTimeoutSound();

  // Update combo display
  flashcardComboCount = 0;
  document.getElementById('flashcard-combo').style.display = 'none';

  // Show next question after delay
  setTimeout(() => {
    showNextFlashcardQuestion();
  }, 1500);
}

function showFlashcardResult() {
  // Stop all timers
  clearTimeout(flashcardTimer);

  // Hide game container
  document.getElementById('flashcard-game-container').style.display = 'none';

  // Show result screen
  document.getElementById('flashcard-result').style.display = 'block';

  const finalScore = flashcardGame.getFinalScore();
  const maxCombo = flashcardGame.getMaxCombo();

  document.getElementById('flashcard-final-score').textContent = finalScore;
  document.getElementById('flashcard-max-combo').textContent = maxCombo;

  // Record streak activity
  recordActivity();

  // Add to total score
  addPoints(finalScore);

  // Store max combo for achievements
  var prevMaxCombo = parseInt(localStorage.getItem('englishAppMaxCombo') || '0');
  if (maxCombo > prevMaxCombo) {
    localStorage.setItem('englishAppMaxCombo', maxCombo);
  }

  // Calculate star rating
  const percentage = (finalScore / 200) * 100;
  let stars = 1;
  if (percentage >= 60) stars = 3;
  else if (percentage >= 40) stars = 2;

  let emoji = '🎉';
  let message = 'Tuyệt vời!';
  if (stars === 3) {
    emoji = '🏆';
    message = 'Xuất sắc!';
  } else if (stars === 2) {
    emoji = '⭐';
    message = 'Giỏi lắm!';
  } else {
    emoji = '👍';
    message = 'Cố gắng hơn nhé!';
  }

  const starsDisplay = '⭐'.repeat(stars);

  document.getElementById('flashcard-result-emoji').textContent = emoji;
  document.getElementById('flashcard-result-message').textContent = message;
  document.getElementById('flashcard-stars-container').textContent = starsDisplay;

  createFireworks(stars);

  isFlashcardActive = false;

  checkAndShowAchievements();
  updateProgressSummary();
}

function restartFlashcardInteractive() {
  // Hide result screen
  document.getElementById('flashcard-result').style.display = 'none';

  // Show start screen
  document.getElementById('start-flashcard-container').style.display = 'block';

  // Reset game state
  flashcardGame = null;
  flashcardScore = 0;
  currentFlashcardIndex = 0;
  isFlashcardActive = false;
  clearTimeout(flashcardTimer);
  flashcardComboCount = 0;
  flashcardMaxCombo = 0;
  flashcardAnswerLocked = false;
}

function resetFlashcardInteractive() {
  // Called when switching away from game
  isFlashcardActive = false;
  clearTimeout(flashcardTimer);
  flashcardAnswerLocked = false;
  document.getElementById('start-flashcard-container').style.display = 'block';
  document.getElementById('flashcard-game-container').style.display = 'none';
  document.getElementById('flashcard-result').style.display = 'none';
}

// Update switchGameMode function to include all games
const originalSwitchGameMode = switchGameMode;
switchGameMode = function(mode) {
  currentGameMode = mode;

  // Update tabs
  document.querySelectorAll('.game-tab').forEach(function(tab) {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  // Clean up listeners when switching away
  if (mode !== 'true-false' && trueFalseListenersActive) {
    removeSwipeListeners();
  }

  // Show/hide quiz type tabs (only visible for quiz mode)
  var quizTypeTabs = document.querySelector('.quiz-type-tabs');
  if (quizTypeTabs) {
    quizTypeTabs.style.display = (mode === 'quiz') ? 'flex' : 'none';
  }

  // Show/hide category selector (not needed for sentence-builder)
  var catSelector = document.querySelector('#games > .category-selector');
  if (catSelector) {
    catSelector.style.display = (mode === 'sentence-builder') ? 'none' : '';
  }

  // Hide all game sections
  document.getElementById('quiz-game').style.display = 'none';
  document.getElementById('spelling-game').style.display = 'none';
  document.getElementById('word-chain-game').style.display = 'none';
  document.getElementById('true-false-game').style.display = 'none';
  var flashcardGameEl = document.getElementById('flashcard-interactive-game');
  if (flashcardGameEl) flashcardGameEl.style.display = 'none';
  var listeningGameEl = document.getElementById('listening-game-section');
  if (listeningGameEl) { listeningGameEl.style.display = 'none'; listeningGameEl.classList.add('hidden'); }
  var sentenceGameEl = document.getElementById('sentence-builder-game');
  if (sentenceGameEl) { sentenceGameEl.style.display = 'none'; sentenceGameEl.classList.add('hidden'); }

  // Hide review screen when switching games
  var reviewScreen = document.getElementById('review-screen');
  if (reviewScreen) { reviewScreen.style.display = 'none'; reviewScreen.classList.add('hidden'); }

  // Show selected game
  if (mode === 'quiz') {
    document.getElementById('quiz-game').style.display = 'block';
  } else if (mode === 'spelling') {
    document.getElementById('spelling-game').style.display = 'block';
  } else if (mode === 'word-chain') {
    document.getElementById('word-chain-game').style.display = 'block';
  } else if (mode === 'true-false') {
    document.getElementById('true-false-game').style.display = 'block';
  } else if (mode === 'flashcard-interactive') {
    if (flashcardGameEl) flashcardGameEl.style.display = 'block';
  } else if (mode === 'listening') {
    if (listeningGameEl) {
      listeningGameEl.style.display = 'block';
      listeningGameEl.classList.remove('hidden');
    }
  } else if (mode === 'sentence-builder') {
    if (sentenceGameEl) {
      sentenceGameEl.style.display = 'block';
      sentenceGameEl.classList.remove('hidden');
    }
  }

  // Reset active games when switching away
  if (mode !== 'quiz' && isQuizActive) resetQuiz();
  if (mode !== 'spelling' && isSpellingActive) resetSpelling();
  if (mode !== 'word-chain' && isWordChainActive) resetWordChain();
  if (mode !== 'flashcard-interactive' && isFlashcardActive) resetFlashcardInteractive();
  if (mode !== 'listening' && isListeningGameActive) resetListeningGame();
  if (mode !== 'sentence-builder' && isSentenceBuilderActive) resetSentenceBuilder();
};

// ========== LISTENING GAME ==========

function startListeningGame(category) {
  var words = vocabularyData[category] ? vocabularyData[category].words : [];
  if (words.length < 4) {
    alert('Cần ít nhất 4 từ để chơi!');
    return;
  }

  listeningGame = new ListeningGame(words, 5);
  isListeningGameActive = true;
  wrongAnswers = [];

  document.getElementById('start-listening-container').style.display = 'none';
  document.getElementById('listening-container').style.display = 'block';
  document.getElementById('listening-result').style.display = 'none';

  showNextListeningQuestion();
}

function showNextListeningQuestion() {
  var question = listeningGame.getNextQuestion();
  if (!question) {
    finishListeningGame();
    return;
  }

  // Update progress
  var progress = listeningGame.getProgress();
  document.getElementById('listening-progress-text').textContent = 'Câu ' + progress.current + '/' + progress.total;
  document.getElementById('listening-score-text').textContent = listeningGame.score;

  // Render emoji options
  var optionsContainer = document.getElementById('listening-options');
  optionsContainer.innerHTML = '';

  question.options.forEach(function(option) {
    var btn = document.createElement('button');
    btn.className = 'quiz-option listening-emoji-option';
    btn.innerHTML = '<span style="font-size: 2.5rem;">' + option.emoji + '</span>';
    btn.addEventListener('click', function() {
      checkListeningAnswer(option.emoji, btn);
    });
    optionsContainer.appendChild(btn);
  });

  // Auto-play pronunciation
  setTimeout(function() {
    speakWord(question.word);
  }, 300);
}

function checkListeningAnswer(selectedEmoji, button) {
  var question = listeningGame.questions[listeningGame.currentQuestionIndex];
  var result = listeningGame.submitAnswer(selectedEmoji);

  // Disable all options
  var buttons = document.querySelectorAll('#listening-options .quiz-option');
  buttons.forEach(function(btn) { btn.disabled = true; });

  if (result.isCorrect) {
    button.classList.add('correct');
    addPoints(15);
    playCorrectSound();
    createMiniConfetti(5);
  } else {
    button.classList.add('wrong');
    playWrongSound();

    // Highlight correct answer
    var correctOption = question.options.find(function(opt) { return opt.isCorrect; });
    buttons.forEach(function(btn) {
      if (btn.querySelector('span').textContent === correctOption.emoji) {
        btn.classList.add('correct');
      }
    });

    wrongAnswers.push({
      word: question.word,
      vietnamese: question.vietnamese,
      emoji: correctOption.emoji
    });
  }

  // Record to SRS
  if (srs) srs.recordAnswer(question.word, result.isCorrect);

  // Speak the correct word
  speakWord(question.word);

  setTimeout(function() {
    showNextListeningQuestion();
  }, 1500);
}

function finishListeningGame() {
  document.getElementById('listening-container').style.display = 'none';
  recordActivity();

  var finalScore = listeningGame.getFinalScore();

  renderReviewScreen(wrongAnswers, function() {
    displayListeningResult(finalScore);
  });
}

function displayListeningResult(finalScore) {
  document.getElementById('listening-result').style.display = 'block';

  var percentage = finalScore.correct / finalScore.total;
  var emoji = '😊';
  var message = 'Cố gắng lên nhé!';
  var stars = 1;

  if (percentage >= 0.8) {
    emoji = '🎉';
    message = 'Tuyệt vời! Tai nghe thật giỏi!';
    stars = 3;
  } else if (percentage >= 0.6) {
    emoji = '👏';
    message = 'Giỏi lắm! Tiếp tục luyện nghe!';
    stars = 2;
  }

  document.getElementById('listening-result-emoji').textContent = emoji;
  document.getElementById('listening-result-title').textContent = message;
  document.getElementById('listening-result-score').textContent =
    'Điểm: ' + finalScore.correct + '/' + finalScore.total;
  document.getElementById('listening-result-message').textContent =
    '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  playVictorySound(stars);
  createFireworks(stars);

  isListeningGameActive = false;

  checkAndShowAchievements();
  updateProgressSummary();
}

function resetListeningGame() {
  listeningGame = null;
  isListeningGameActive = false;

  var startContainer = document.getElementById('start-listening-container');
  var gameContainer = document.getElementById('listening-container');
  var resultContainer = document.getElementById('listening-result');

  if (startContainer) startContainer.style.display = 'block';
  if (gameContainer) gameContainer.style.display = 'none';
  if (resultContainer) resultContainer.style.display = 'none';
}

// ========== SENTENCE BUILDER GAME ==========

function startSentenceBuilder() {
  if (isSentenceBuilderActive) return;

  sentenceBuilder = new SentenceBuilderGame(null, 5);
  isSentenceBuilderActive = true;
  wrongAnswers = [];
  sentenceAssembly = [];

  document.getElementById('start-sentence-container').style.display = 'none';
  document.getElementById('sentence-container').style.display = 'block';
  document.getElementById('sentence-result').style.display = 'none';

  showNextSentence();
}

function showNextSentence() {
  var question = sentenceBuilder.getNextQuestion();
  if (!question) {
    finishSentenceBuilder();
    return;
  }

  sentenceAssembly = [];

  // Update progress
  var progress = sentenceBuilder.getProgress();
  document.getElementById('sentence-progress-text').textContent =
    'Câu ' + progress.current + '/' + progress.total;
  document.getElementById('sentence-score-text').textContent = sentenceBuilder.score;

  // Show hints
  document.getElementById('sentence-vietnamese').textContent = question.vietnamese;
  document.getElementById('sentence-emoji-hint').textContent = question.hint;

  // Reset assembly area
  var assemblyEl = document.getElementById('sentence-assembly');
  assemblyEl.innerHTML = '<p class="placeholder-text">Nhấn vào từ bên dưới để xếp câu</p>';

  // Render word bank
  var wordBank = document.getElementById('sentence-word-bank');
  wordBank.innerHTML = '';

  question.shuffledWords.forEach(function(word, index) {
    var btn = document.createElement('button');
    btn.className = 'sentence-word-btn';
    btn.textContent = word;
    btn.dataset.index = index;
    btn.addEventListener('click', function() {
      addWordToSentence(word, btn);
    });
    wordBank.appendChild(btn);
  });

  // Enable/disable buttons
  var checkBtn = document.getElementById('sentence-check-btn');
  if (checkBtn) { checkBtn.disabled = true; }
  var clearBtn = document.getElementById('sentence-clear-btn');
  if (clearBtn) { clearBtn.disabled = false; }
}

function addWordToSentence(word, btn) {
  sentenceAssembly.push({ word: word, btn: btn });
  btn.classList.add('used');
  btn.disabled = true;

  updateSentenceDisplay();

  // Enable check button when all words are placed
  var currentQ = sentenceBuilder.sentences[sentenceBuilder.currentQuestionIndex];
  if (currentQ && sentenceAssembly.length === currentQ.words.length) {
    var checkBtn = document.getElementById('sentence-check-btn');
    if (checkBtn) checkBtn.disabled = false;
  }
}

function updateSentenceDisplay() {
  var assemblyEl = document.getElementById('sentence-assembly');
  if (sentenceAssembly.length === 0) {
    assemblyEl.innerHTML = '<p class="placeholder-text">Nhấn vào từ bên dưới để xếp câu</p>';
    return;
  }

  assemblyEl.innerHTML = '';
  sentenceAssembly.forEach(function(item, i) {
    var span = document.createElement('span');
    span.className = 'assembly-word';
    span.textContent = item.word;
    span.addEventListener('click', function() {
      removeWordFromSentence(i);
    });
    assemblyEl.appendChild(span);
  });
}

function removeWordFromSentence(index) {
  var removed = sentenceAssembly[index];
  sentenceAssembly.splice(index, 1);

  // Re-enable the word button
  if (removed.btn) {
    removed.btn.classList.remove('used');
    removed.btn.disabled = false;
  }

  updateSentenceDisplay();

  // Disable check button
  var checkBtn = document.getElementById('sentence-check-btn');
  if (checkBtn) checkBtn.disabled = true;
}

function clearSentenceAssembly() {
  sentenceAssembly.forEach(function(item) {
    if (item.btn) {
      item.btn.classList.remove('used');
      item.btn.disabled = false;
    }
  });
  sentenceAssembly = [];
  updateSentenceDisplay();

  var checkBtn = document.getElementById('sentence-check-btn');
  if (checkBtn) checkBtn.disabled = true;
}

function checkSentenceAnswer() {
  var orderedWords = sentenceAssembly.map(function(item) { return item.word; });
  var result = sentenceBuilder.submitAnswer(orderedWords);

  // Disable all word buttons and assembly
  document.querySelectorAll('.sentence-word-btn').forEach(function(btn) { btn.disabled = true; });
  document.querySelectorAll('.assembly-word').forEach(function(span) { span.style.pointerEvents = 'none'; });
  document.getElementById('sentence-check-btn').disabled = true;
  document.getElementById('sentence-clear-btn').disabled = true;

  var assemblyEl = document.getElementById('sentence-assembly');

  if (result.isCorrect) {
    assemblyEl.classList.add('correct');
    addPoints(20);
    playCorrectSound();
    createMiniConfetti(5);
  } else {
    assemblyEl.classList.remove('correct');
    assemblyEl.classList.add('wrong');
    playWrongSound();

    // Show correct sentence below
    var correctDiv = document.createElement('div');
    correctDiv.className = 'correct-sentence';
    correctDiv.textContent = 'Đáp án: ' + result.correctSentence;
    assemblyEl.parentNode.insertBefore(correctDiv, assemblyEl.nextSibling);

    var sentence = sentenceBuilder.sentences[sentenceBuilder.currentQuestionIndex - 1];
    if (sentence) {
      wrongAnswers.push({
        word: result.correctSentence,
        vietnamese: sentence.vietnamese,
        emoji: sentence.hint || ''
      });
    }
  }

  // Record words to SRS
  if (srs) {
    var sentence = sentenceBuilder.sentences[sentenceBuilder.currentQuestionIndex - 1];
    if (sentence) {
      sentence.words.forEach(function(w) {
        srs.recordAnswer(w.toLowerCase(), result.isCorrect);
      });
    }
  }

  setTimeout(function() {
    // Clean up any correct-sentence display
    var correctSentenceEl = document.querySelector('.correct-sentence');
    if (correctSentenceEl) correctSentenceEl.remove();
    assemblyEl.classList.remove('correct', 'wrong');
    showNextSentence();
  }, 2000);
}

function finishSentenceBuilder() {
  document.getElementById('sentence-container').style.display = 'none';
  recordActivity();

  var finalScore = sentenceBuilder.getFinalScore();

  renderReviewScreen(wrongAnswers, function() {
    displaySentenceResult(finalScore);
  });
}

function displaySentenceResult(finalScore) {
  document.getElementById('sentence-result').style.display = 'block';

  var percentage = finalScore.correct / finalScore.total;
  var emoji = '😊';
  var message = 'Cố gắng lên nhé!';
  var stars = 1;

  if (percentage >= 0.8) {
    emoji = '🎉';
    message = 'Tuyệt vời! Xếp câu rất giỏi!';
    stars = 3;
  } else if (percentage >= 0.6) {
    emoji = '👏';
    message = 'Giỏi lắm! Tiếp tục luyện tập!';
    stars = 2;
  }

  document.getElementById('sentence-result-emoji').textContent = emoji;
  document.getElementById('sentence-result-title').textContent = message;
  document.getElementById('sentence-result-score').textContent =
    'Điểm: ' + finalScore.correct + '/' + finalScore.total;
  document.getElementById('sentence-result-message').textContent =
    '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

  playVictorySound(stars);
  createFireworks(stars);

  isSentenceBuilderActive = false;

  checkAndShowAchievements();
  updateProgressSummary();
}

function resetSentenceBuilder() {
  sentenceBuilder = null;
  isSentenceBuilderActive = false;
  sentenceAssembly = [];

  var startContainer = document.getElementById('start-sentence-container');
  var gameContainer = document.getElementById('sentence-container');
  var resultContainer = document.getElementById('sentence-result');

  if (startContainer) startContainer.style.display = 'block';
  if (gameContainer) gameContainer.style.display = 'none';
  if (resultContainer) resultContainer.style.display = 'none';
}

// ========== SONG VOCABULARY ==========

function trackSongWatched() {
  var count = parseInt(localStorage.getItem('englishAppSongsWatched') || '0');
  count++;
  localStorage.setItem('englishAppSongsWatched', count.toString());
  checkAndShowAchievements();
}

// ========== PARENT DASHBOARD ==========

function renderParentDashboard() {
  // Total score
  var statScore = document.getElementById('stat-total-score');
  if (statScore) statScore.textContent = totalScore;

  // Streak
  var statStreak = document.getElementById('stat-streak');
  if (statStreak) statStreak.textContent = streakData.current;

  // Words learned
  var wordsLearned = 0;
  if (srs) {
    Object.keys(vocabularyData).forEach(function(cat) {
      var progress = srs.getCategoryProgress(cat, vocabularyData[cat].words);
      wordsLearned += progress.learned;
    });
  }
  var statWords = document.getElementById('stat-words-learned');
  if (statWords) statWords.textContent = wordsLearned;

  // Achievements count
  var achievementCount = 0;
  if (achievementSystem) {
    achievementCount = achievementSystem.getUnlocked().length;
  }
  var statAch = document.getElementById('stat-achievements');
  if (statAch) statAch.textContent = achievementCount;

  // Weak words (from SRS)
  renderWeakWords();

  // Category mastery
  renderCategoryMastery();
}

function renderWeakWords() {
  var list = document.getElementById('weak-words-list');
  if (!list || !srs) {
    if (list) list.innerHTML = '<p>Chưa có dữ liệu</p>';
    return;
  }

  var dueWords = srs.getWordsToReview().slice(0, 10);
  if (dueWords.length === 0) {
    list.innerHTML = '<p>Chưa có từ cần cải thiện</p>';
    return;
  }

  list.innerHTML = dueWords.map(function(w) {
    var allWords = getAllWords(vocabularyData);
    var wordObj = allWords.find(function(wo) { return wo.word.toLowerCase() === w.word; });
    return '<div class="weak-word-item" style="display: flex; align-items: center; gap: 10px; padding: 8px; border-bottom: 1px solid #eee;">' +
      '<span style="font-size: 1.5rem;">' + (wordObj ? (wordObj.emoji || '') : '') + '</span>' +
      '<strong>' + w.word + '</strong>' +
      '<span style="color: #999;">Level ' + w.level + '</span>' +
      '</div>';
  }).join('');
}

function renderCategoryMastery() {
  var list = document.getElementById('category-mastery-list');
  if (!list || !srs) {
    if (list) list.innerHTML = '<p>Chưa có dữ liệu</p>';
    return;
  }

  list.innerHTML = Object.keys(vocabularyData).map(function(cat) {
    var catData = vocabularyData[cat];
    var progress = srs.getCategoryProgress(cat, catData.words);
    return '<div class="mastery-item" style="margin: 8px 0;">' +
      '<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">' +
      '<span>' + catData.icon + ' ' + catData.titleEn + '</span>' +
      '<span>' + progress.percentage + '%</span>' +
      '</div>' +
      '<div style="background: #eee; border-radius: 10px; height: 8px; overflow: hidden;">' +
      '<div style="background: var(--secondary, #4ECDC4); width: ' + progress.percentage + '%; height: 100%; border-radius: 10px; transition: width 0.3s;"></div>' +
      '</div>' +
      '</div>';
  }).join('');
}
