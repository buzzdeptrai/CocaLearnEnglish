// App Hoc Tieng Anh Cho Be - Main JavaScript

// State
let currentSection = 'home';
let currentCategory = 'animals';
let totalScore = 0;
let quizScore = 0;
let currentQuestionIndex = 0;
let quizQuestions = [];
let isQuizActive = false;

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

// Setup event listeners
function setupEventListeners() {
  // Navigation buttons
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      switchSection(target);
    });
  });

  // Feature cards on home
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.section;
      switchSection(target);
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
    startQuizBtn.addEventListener('click', startQuiz);
  }

  // Quiz category selector
  document.querySelectorAll('.quiz-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
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
