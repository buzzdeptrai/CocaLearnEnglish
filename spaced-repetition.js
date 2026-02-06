// Spaced Repetition System
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

/** Review intervals in days for each level */
const LEVEL_INTERVALS = [0, 1, 3, 7, 14, 30];

/** Maximum SRS level (mastered) */
const MAX_LEVEL = 5;

/** localStorage key for SRS data */
const STORAGE_KEY = 'englishAppSRS';

/**
 * Get today's date as an ISO date string (YYYY-MM-DD)
 * @returns {string} Today's date string
 */
function getToday() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Calculate the next review date based on level
 * @param {number} level - Current SRS level (0-5)
 * @returns {string} Next review date as ISO string
 */
function calculateNextReview(level) {
  const days = LEVEL_INTERVALS[level] || 0;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

/**
 * SpacedRepetitionSystem - Tracks word mastery using spaced repetition
 */
class SpacedRepetitionSystem {
  /**
   * Loads SRS data from localStorage (key: englishAppSRS)
   */
  constructor() {
    this.data = {};
    this._load();
  }

  /**
   * Load data from localStorage
   * @private
   */
  _load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
      }
    } catch (_err) {
      this.data = {};
    }
  }

  /**
   * Save current SRS data to localStorage
   */
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (_err) {
      // Storage full or unavailable - silently fail
    }
  }

  /**
   * Record an answer for a word, updating its level and next review date
   * Correct: level + 1 (max 5). Wrong: level - 1 (min 0).
   * @param {string} word - The English word
   * @param {boolean} isCorrect - Whether the answer was correct
   */
  recordAnswer(word, isCorrect) {
    const key = word.toLowerCase();

    if (!this.data[key]) {
      this.data[key] = { level: 0, nextReview: getToday(), wrongCount: 0 };
    }

    const entry = this.data[key];

    if (isCorrect) {
      entry.level = Math.min(MAX_LEVEL, entry.level + 1);
    } else {
      entry.level = Math.max(0, entry.level - 1);
      entry.wrongCount = (entry.wrongCount || 0) + 1;
    }

    entry.nextReview = calculateNextReview(entry.level);
    this.save();
  }

  /**
   * Get all words that are due for review (nextReview <= today)
   * @returns {Array<{word: string, level: number, nextReview: string, wrongCount: number}>}
   */
  getWordsToReview() {
    const today = getToday();
    const result = [];

    for (const word in this.data) {
      const entry = this.data[word];
      if (entry.nextReview <= today) {
        result.push({
          word: word,
          level: entry.level,
          nextReview: entry.nextReview,
          wrongCount: entry.wrongCount || 0
        });
      }
    }

    // Sort by level ascending (weakest words first)
    result.sort(function(a, b) { return a.level - b.level; });
    return result;
  }

  /**
   * Get the current SRS level for a word
   * @param {string} word - The English word
   * @returns {number} Level 0-5 (0 = new/unknown)
   */
  getWordLevel(word) {
    const key = word.toLowerCase();
    if (!this.data[key]) return 0;
    return this.data[key].level;
  }

  /**
   * Get learning progress for a category
   * @param {string} category - Category key (e.g. 'animals')
   * @param {Array<{word: string}>} words - Array of word objects from that category
   * @returns {{learned: number, total: number, percentage: number}}
   */
  getCategoryProgress(category, words) {
    if (!words || words.length === 0) {
      return { learned: 0, total: 0, percentage: 0 };
    }

    const total = words.length;
    let learned = 0;

    for (var i = 0; i < words.length; i++) {
      var level = this.getWordLevel(words[i].word);
      if (level >= 3) {
        learned++;
      }
    }

    var percentage = total > 0 ? Math.round((learned / total) * 100) : 0;
    return { learned: learned, total: total, percentage: percentage };
  }
}

// Return exports
return {
  SpacedRepetitionSystem: SpacedRepetitionSystem,
  LEVEL_INTERVALS: LEVEL_INTERVALS,
  MAX_LEVEL: MAX_LEVEL
};

});
