// Listening Game Logic
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

/** Points awarded per correct answer */
var POINTS_PER_CORRECT = 15;

/**
 * Shuffle an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} The shuffled array (same reference)
 */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

/**
 * Generate a single listening question from the word pool
 * Picks one correct word and 3 wrong emojis as distractors
 * @param {Array<{word: string, vietnamese: string, emoji: string}>} words - Available words
 * @returns {{word: string, vietnamese: string, options: Array<{emoji: string, isCorrect: boolean}>}}
 */
function generateQuestion(words) {
  if (!words || words.length < 4) {
    throw new Error('Cần ít nhất 4 từ để tạo câu hỏi');
  }

  // Pick a random correct word
  var correctIndex = Math.floor(Math.random() * words.length);
  var correctWord = words[correctIndex];

  // Pick 3 different wrong words
  var otherWords = words.filter(function(w) {
    return w.word !== correctWord.word;
  });
  var shuffled = shuffleArray(otherWords.slice());
  var wrongWords = shuffled.slice(0, 3);

  // Build options array
  var options = [
    { emoji: correctWord.emoji, isCorrect: true }
  ];
  for (var i = 0; i < wrongWords.length; i++) {
    options.push({ emoji: wrongWords[i].emoji, isCorrect: false });
  }

  // Shuffle options
  shuffleArray(options);

  return {
    word: correctWord.word,
    vietnamese: correctWord.vietnamese,
    options: options
  };
}

/**
 * ListeningGame - Manages state for the Listening game
 * Player hears a word pronounced and must pick the correct emoji
 */
class ListeningGame {
  /**
   * @param {Array<{word: string, vietnamese: string, emoji: string}>} words - Word pool
   * @param {number} [count=5] - Number of questions per game
   */
  constructor(words, count) {
    if (!words || words.length < 4) {
      throw new Error('Cần ít nhất 4 từ để chơi game');
    }

    this.words = words;
    this.totalQuestions = count || 5;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.isComplete = false;

    // Pre-generate all questions
    this._generateQuestions();
  }

  /**
   * Pre-generate all questions at initialization
   * @private
   */
  _generateQuestions() {
    for (var i = 0; i < this.totalQuestions; i++) {
      this.questions.push(generateQuestion(this.words));
    }
  }

  /**
   * Get the next question
   * @returns {{word: string, vietnamese: string, options: Array<{emoji: string, isCorrect: boolean}>}|null}
   *   Question object with word to pronounce and emoji options, or null if game complete
   */
  getNextQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isComplete = true;
      return null;
    }

    return this.questions[this.currentQuestionIndex];
  }

  /**
   * Submit an answer for the current question
   * @param {string} selectedEmoji - The emoji the player selected
   * @returns {{isCorrect: boolean, points: number, score: number}}
   */
  submitAnswer(selectedEmoji) {
    var question = this.questions[this.currentQuestionIndex];
    var correctOption = question.options.find(function(opt) {
      return opt.isCorrect;
    });
    var isCorrect = selectedEmoji === correctOption.emoji;
    var points = 0;

    if (isCorrect) {
      points = POINTS_PER_CORRECT;
      this.score += points;
      this.correctCount++;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.isComplete = true;
    }

    return {
      isCorrect: isCorrect,
      points: points,
      score: this.score
    };
  }

  /**
   * Get game progress
   * @returns {{current: number, total: number, percentage: number}}
   */
  getProgress() {
    return {
      current: this.currentQuestionIndex + 1,
      total: this.totalQuestions,
      percentage: Math.round(
        ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100
      )
    };
  }

  /**
   * Get the final score after game completion
   * @returns {{score: number, correct: number, total: number}}
   */
  getFinalScore() {
    return {
      score: this.score,
      correct: this.correctCount,
      total: this.totalQuestions
    };
  }
}

// Return exports
return {
  ListeningGame: ListeningGame,
  generateQuestion: generateQuestion
};

});
