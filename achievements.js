// Achievement / Badge System
// UMD pattern: works in browser and ES modules
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    const exports = factory();
    for (let key in exports) { module.exports[key] = exports[key]; }
  } else {
    const exports = factory();
    for (let key in exports) { root[key] = exports[key]; }
  }
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

var STORAGE_KEY = 'englishAppAchievements';

/**
 * Achievement definitions - id, name, icon, Vietnamese description
 * @type {Object<string, {id: string, name: string, icon: string, desc: string}>}
 */
var ACHIEVEMENTS = {
  FIRST_STEPS:   { id: 'FIRST_STEPS',   name: 'First Steps',   icon: '🌟', desc: 'Hoàn thành 1 chủ đề' },
  ANIMAL_EXPERT: { id: 'ANIMAL_EXPERT', name: 'Animal Expert', icon: '🐾', desc: 'Thành thạo tất cả từ vựng Animals' },
  STREAK_7:      { id: 'STREAK_7',      name: 'On Fire',       icon: '🔥', desc: 'Streak 7 ngày liên tiếp' },
  BOOKWORM:      { id: 'BOOKWORM',      name: 'Bookworm',      icon: '📚', desc: 'Học 100 từ vựng' },
  PERFECT_QUIZ:  { id: 'PERFECT_QUIZ',  name: 'Perfect Quiz',  icon: '🎯', desc: 'Đạt 5/5 trong Quiz' },
  SPELLING_BEE:  { id: 'SPELLING_BEE',  name: 'Spelling Bee',  icon: '✏️', desc: 'Đạt 5/5 trong Spelling' },
  MUSIC_LOVER:   { id: 'MUSIC_LOVER',   name: 'Music Lover',   icon: '🎵', desc: 'Xem 5 bài hát' },
  CHAMPION:      { id: 'CHAMPION',      name: 'Champion',      icon: '💪', desc: 'Học hết 200 từ vựng' },
  STREAK_30:     { id: 'STREAK_30',     name: 'Dedicated',     icon: '🏆', desc: 'Streak 30 ngày liên tiếp' },
  SPEED_DEMON:   { id: 'SPEED_DEMON',   name: 'Speed Demon',   icon: '⚡', desc: 'Đạt combo x5 trong Flashcard' }
};

/**
 * Check if a single achievement condition is met
 * @param {string} id - Achievement key from ACHIEVEMENTS
 * @param {Object} s - Game state snapshot
 * @returns {boolean}
 */
function checkCondition(id, s) {
  switch (id) {
    case 'FIRST_STEPS':   return (s.categoriesCompleted || 0) >= 1;
    case 'ANIMAL_EXPERT': return (s.animalsProgress || 0) >= 100;
    case 'STREAK_7':      return (s.currentStreak || 0) >= 7;
    case 'BOOKWORM':      return (s.wordsLearned || 0) >= 100;
    case 'PERFECT_QUIZ':  return (s.lastQuizScore || 0) >= 5 && (s.lastQuizTotal || 0) === 5;
    case 'SPELLING_BEE':  return (s.lastSpellingScore || 0) >= 5 && (s.lastSpellingTotal || 0) === 5;
    case 'MUSIC_LOVER':   return (s.songsWatched || 0) >= 5;
    case 'CHAMPION':      return (s.wordsLearned || 0) >= 200;
    case 'STREAK_30':     return (s.currentStreak || 0) >= 30;
    case 'SPEED_DEMON':   return (s.maxCombo || 0) >= 5;
    default:              return false;
  }
}

/**
 * AchievementSystem - Tracks and awards badges based on game milestones
 */
class AchievementSystem {
  /** Loads unlocked achievements from localStorage (key: englishAppAchievements) */
  constructor() {
    this.unlocked = {};
    this._load();
  }

  /** @private */
  _load() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) { this.unlocked = JSON.parse(stored); }
    } catch (_e) { this.unlocked = {}; }
  }

  /** Save unlocked achievements to localStorage */
  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.unlocked));
    } catch (_e) { /* storage unavailable */ }
  }

  /**
   * Check all achievement conditions and return any newly unlocked
   * @param {Object} gameState - State with: categoriesCompleted, animalsProgress (0-100),
   *   currentStreak, wordsLearned, lastQuizScore, lastQuizTotal,
   *   lastSpellingScore, lastSpellingTotal, songsWatched, maxCombo
   * @returns {Array<{id: string, name: string, icon: string, desc: string}>} Newly unlocked
   */
  checkAchievements(gameState) {
    var newlyUnlocked = [];
    for (var id in ACHIEVEMENTS) {
      if (this.unlocked[id]) continue;
      if (checkCondition(id, gameState)) {
        this.unlocked[id] = { unlockedAt: new Date().toISOString() };
        newlyUnlocked.push(ACHIEVEMENTS[id]);
      }
    }
    if (newlyUnlocked.length > 0) { this.save(); }
    return newlyUnlocked;
  }

  /**
   * Get all currently unlocked achievements
   * @returns {Array<{id: string, name: string, icon: string, desc: string, unlockedAt: string}>}
   */
  getUnlocked() {
    var result = [];
    for (var id in this.unlocked) {
      if (!ACHIEVEMENTS[id]) continue;
      var a = ACHIEVEMENTS[id];
      result.push({ id: a.id, name: a.name, icon: a.icon, desc: a.desc, unlockedAt: this.unlocked[id].unlockedAt });
    }
    return result;
  }

  /**
   * Get all achievements with locked/unlocked status
   * @returns {Array<{id: string, name: string, icon: string, desc: string, isUnlocked: boolean, unlockedAt: string|null}>}
   */
  getAllAchievements() {
    var result = [];
    for (var id in ACHIEVEMENTS) {
      var a = ACHIEVEMENTS[id];
      var unlocked = !!this.unlocked[id];
      result.push({
        id: a.id, name: a.name, icon: a.icon, desc: a.desc,
        isUnlocked: unlocked,
        unlockedAt: unlocked ? this.unlocked[id].unlockedAt : null
      });
    }
    return result;
  }
}

// Return exports
return {
  AchievementSystem: AchievementSystem,
  ACHIEVEMENTS: ACHIEVEMENTS
};

});
