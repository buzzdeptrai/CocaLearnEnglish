// Flashcard Interactive Game Logic
// UMD pattern: works in browser and ES modules
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    const exports = factory();
    for (let key in exports) {
      module.exports[key] = exports[key];
    }
  } else {
    // Browser globals
    const exports = factory();
    for (let key in exports) {
      root[key] = exports[key];
    }
  }
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

/**
 * Get all words from vocabulary data across all categories
 * @param {Object} vocabularyData - Vocabulary data object with categories
 * @returns {Array} Flat array of all word objects (only words with emoji property)
 */
function getAllWords(vocabularyData) {
  const allWords = [];
  for (const category in vocabularyData) {
    if (vocabularyData[category].words) {
      // Filter to only include words that have an emoji property
      const wordsWithEmoji = vocabularyData[category].words.filter(word => word.emoji);
      allWords.push(...wordsWithEmoji);
    }
  }
  return allWords;
}

/**
 * Generate a flashcard question with 1 correct and 3 wrong emojis
 * @param {Array} availableWords - Array of word objects with {word, vietnamese, emoji}
 * @returns {Object} Question with {word, vietnamese, correctEmoji, emojis: [4 emojis]}
 */
function generateFlashcardQuestion(availableWords) {
  if (!availableWords || availableWords.length < 4) {
    throw new Error('Need at least 4 words to generate flashcard questions');
  }

  // Pick a random word as the correct answer
  const correctWord = availableWords[Math.floor(Math.random() * availableWords.length)];

  // Pick 3 different words for wrong answers
  const otherWords = availableWords.filter(w => w.word !== correctWord.word);
  const wrongWords = [];
  const usedIndices = new Set();

  while (wrongWords.length < 3 && wrongWords.length < otherWords.length) {
    const randomIndex = Math.floor(Math.random() * otherWords.length);
    if (!usedIndices.has(randomIndex)) {
      wrongWords.push(otherWords[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  // Create array of 4 emojis and shuffle
  const emojis = [
    { emoji: correctWord.emoji, word: correctWord.word, isCorrect: true },
    ...wrongWords.map(w => ({ emoji: w.emoji, word: w.word, isCorrect: false }))
  ];

  // Shuffle emojis
  for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }

  return {
    word: correctWord.word,
    vietnamese: correctWord.vietnamese,
    correctEmoji: correctWord.emoji,
    emojis: emojis
  };
}

/**
 * Validate if the selected emoji matches the correct answer
 * @param {Object} question - Question object with correctEmoji
 * @param {string} selectedEmoji - The emoji the user clicked
 * @returns {boolean} True if correct
 */
function validateAnswer(question, selectedEmoji) {
  return question.correctEmoji === selectedEmoji;
}

/**
 * Calculate points based on time elapsed and combo status
 * @param {number} timeElapsed - Seconds elapsed since question started
 * @param {boolean} hasCombo - Whether player has 3+ combo
 * @returns {number} Points earned (0-40)
 */
function calculatePoints(timeElapsed, hasCombo) {
  // Base points: 20 points, decrease 2 points per second
  const basePoints = Math.max(0, 20 - (Math.floor(timeElapsed) * 2));

  // Apply combo multiplier
  const multiplier = hasCombo ? 2 : 1;

  return basePoints * multiplier;
}

/**
 * FlashcardInteractiveGame - Manages game state for Flashcard Interactive game
 */
class FlashcardInteractiveGame {
  /**
   * @param {Array} words - Available words for the game
   * @param {number} questionsCount - Number of questions (default 5)
   */
  constructor(words, questionsCount = 5) {
    if (!words || words.length < 4) {
      throw new Error('Need at least 4 words to play the game');
    }

    this.words = words;
    this.questionsCount = questionsCount;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.comboCount = 0;
    this.maxCombo = 0;
    this.isComplete = false;

    // Pre-generate all questions
    this._generateQuestions();
  }

  /**
   * Generate all questions at initialization
   * @private
   */
  _generateQuestions() {
    for (let i = 0; i < this.questionsCount; i++) {
      const question = generateFlashcardQuestion(this.words);
      this.questions.push(question);
    }
  }

  /**
   * Get the next question
   * @returns {Object|null} Question object or null if game complete
   */
  getNextQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isComplete = true;
      return null;
    }

    const question = this.questions[this.currentQuestionIndex];
    return question;
  }

  /**
   * Submit an answer and update game state
   * @param {string} selectedEmoji - The emoji the user clicked
   * @param {number} timeElapsed - Seconds elapsed since question started
   * @returns {Object} Result with {isCorrect, points, comboCount, comboActive}
   */
  submitAnswer(selectedEmoji, timeElapsed) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const isCorrect = validateAnswer(currentQuestion, selectedEmoji);

    if (isCorrect) {
      // Increment combo
      this.comboCount++;

      // Check if combo is active (3+)
      const comboActive = this.comboCount >= 3;

      // Calculate points
      const points = calculatePoints(timeElapsed, comboActive);
      this.score += points;

      // Update max combo
      if (this.comboCount > this.maxCombo) {
        this.maxCombo = this.comboCount;
      }

      // Move to next question
      this.currentQuestionIndex++;

      // Check if game is complete
      if (this.currentQuestionIndex >= this.questions.length) {
        this.isComplete = true;
      }

      return {
        isCorrect: true,
        points: points,
        comboCount: this.comboCount,
        comboActive: comboActive,
        totalScore: this.score
      };
    } else {
      // Wrong answer - break combo
      this.comboCount = 0;

      // Move to next question
      this.currentQuestionIndex++;

      // Check if game is complete
      if (this.currentQuestionIndex >= this.questions.length) {
        this.isComplete = true;
      }

      return {
        isCorrect: false,
        points: 0,
        comboCount: 0,
        comboActive: false,
        totalScore: this.score
      };
    }
  }

  /**
   * Handle timeout (wrong answer, breaks combo)
   * @returns {Object} Result with {isCorrect: false, points: 0, comboCount: 0}
   */
  handleTimeout() {
    // Break combo
    this.comboCount = 0;

    // Move to next question
    this.currentQuestionIndex++;

    // Check if game is complete
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isComplete = true;
    }

    return {
      isCorrect: false,
      points: 0,
      comboCount: 0,
      comboActive: false,
      totalScore: this.score
    };
  }

  /**
   * Get game progress
   * @returns {Object} Progress with {current, total, percentage}
   */
  getProgress() {
    return {
      current: this.currentQuestionIndex + 1,
      total: this.questions.length,
      percentage: Math.round(((this.currentQuestionIndex + 1) / this.questions.length) * 100)
    };
  }

  /**
   * Get final score
   * @returns {number} Total score
   */
  getFinalScore() {
    return this.score;
  }

  /**
   * Get current combo count
   * @returns {number} Current combo streak
   */
  getComboCount() {
    return this.comboCount;
  }

  /**
   * Get maximum combo achieved
   * @returns {number} Maximum combo
   */
  getMaxCombo() {
    return this.maxCombo;
  }

  /**
   * Check if combo is active (3+)
   * @returns {boolean} True if combo >= 3
   */
  isComboActive() {
    return this.comboCount >= 3;
  }
}

// Return exports
return {
  getAllWords: getAllWords,
  generateFlashcardQuestion: generateFlashcardQuestion,
  validateAnswer: validateAnswer,
  calculatePoints: calculatePoints,
  FlashcardInteractiveGame: FlashcardInteractiveGame
};

});
