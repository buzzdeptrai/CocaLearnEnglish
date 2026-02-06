// True/False Rush Game Logic
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
 * Generate a card with emoji and word (either matching or mismatched)
 * @param {Array} availableWords - Array of word objects with {word, vietnamese, emoji}
 * @returns {Object} Card with {emoji, word, isCorrect}
 */
function generateCard(availableWords) {
  if (!availableWords || availableWords.length < 2) {
    throw new Error('Need at least 2 words to generate cards');
  }

  // Randomly decide if this card should be correct or incorrect (50/50)
  const isCorrect = Math.random() < 0.5;

  // Pick a random word
  const wordObj = availableWords[Math.floor(Math.random() * availableWords.length)];

  let emoji;
  if (isCorrect) {
    // Use the word's own emoji
    emoji = wordObj.emoji;
  } else {
    // Use a different word's emoji
    const otherWords = availableWords.filter(w => w.word !== wordObj.word);
    const randomOther = otherWords[Math.floor(Math.random() * otherWords.length)];
    emoji = randomOther.emoji;
  }

  return {
    emoji,
    word: wordObj.word,
    isCorrect
  };
}

/**
 * Validate if user's answer matches the card's correctness
 * @param {Object} card - Card object with {emoji, word, isCorrect}
 * @param {boolean} userAnswer - User's answer (true = correct match, false = incorrect match)
 * @returns {boolean} True if user's answer matches card.isCorrect
 */
function validateAnswer(card, userAnswer) {
  return card.isCorrect === userAnswer;
}

/**
 * Calculate card display speed based on current round
 * Fixed at 3 seconds per word for all rounds
 * @param {number} round - Current round number (1-20)
 * @returns {number} Speed in milliseconds
 */
function calculateSpeed(round) {
  // Fixed 3 seconds for all rounds
  return 3000;
}

/**
 * TrueFalseRushGame - Manages game state for True/False Rush game
 */
class TrueFalseRushGame {
  /**
   * @param {Array} words - Available words for the game
   */
  constructor(words) {
    if (!words || words.length < 2) {
      throw new Error('Need at least 2 words to play the game');
    }

    this.words = words;
    this.score = 0;
    this.currentRound = 0;
    this.totalRounds = 20;
    this.isComplete = false;
    this.currentCard = null;
  }

  /**
   * Get the next card
   * @returns {Object|null} Card object or null if game complete
   */
  getNextCard() {
    if (this.currentRound >= this.totalRounds) {
      this.isComplete = true;
      return null;
    }

    this.currentRound++;
    this.currentCard = generateCard(this.words);

    return this.currentCard;
  }

  /**
   * Submit an answer and update game state
   * @param {boolean} userAnswer - User's answer (true/false)
   * @returns {Object} Result with {isCorrect, score}
   */
  submitAnswer(userAnswer) {
    const isCorrect = validateAnswer(this.currentCard, userAnswer);

    if (isCorrect) {
      this.score += 10;
    }

    // Check if game is complete after this answer
    if (this.currentRound >= this.totalRounds) {
      this.isComplete = true;
    }

    return {
      isCorrect,
      score: this.score
    };
  }

  /**
   * Get current speed for card display
   * @returns {number} Speed in milliseconds
   */
  getCurrentSpeed() {
    return calculateSpeed(this.currentRound);
  }

  /**
   * Get game progress
   * @returns {Object} Progress with {current, total, percentage}
   */
  getProgress() {
    return {
      current: this.currentRound,
      total: this.totalRounds,
      percentage: Math.round((this.currentRound / this.totalRounds) * 100)
    };
  }

  /**
   * Get final score
   * @returns {number} Total score
   */
  getFinalScore() {
    return this.score;
  }
}

// Return exports
return {
  getAllWords: getAllWords,
  generateCard: generateCard,
  validateAnswer: validateAnswer,
  calculateSpeed: calculateSpeed,
  TrueFalseRushGame: TrueFalseRushGame
};

});
