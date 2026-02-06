// Parent Dashboard - Stats & Settings for Parents
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

const PIN_KEY = 'englishAppParentPIN';
const ACTIVITY_KEY = 'englishAppDailyActivity';
const STUDY_TIME_KEY = 'englishAppStudyTime';
const DEFAULT_PIN = '1234';

function getToday() { return new Date().toISOString().split('T')[0]; }

function loadJSON(key) {
  try { var s = localStorage.getItem(key); return s ? JSON.parse(s) : null; }
  catch (_e) { return null; }
}

function saveJSON(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (_e) {}
}

class ParentDashboard {
  constructor() {
    this._sessionStart = Date.now();
  }

  // --- PIN Management ---

  verifyPIN(pin) {
    var stored = localStorage.getItem(PIN_KEY);
    var currentPIN = stored || DEFAULT_PIN;
    return pin === currentPIN;
  }

  changePIN(oldPin, newPin) {
    if (!this.verifyPIN(oldPin)) return false;
    if (!newPin || newPin.length < 4) return false;
    localStorage.setItem(PIN_KEY, newPin);
    return true;
  }

  // --- Overview Stats ---

  getOverviewStats() {
    var srsData = loadJSON('englishAppSRS') || {};
    var score = parseInt(localStorage.getItem('englishAppScore') || '0', 10);
    var streakData = loadJSON('englishAppStreak') || {};
    var achievements = loadJSON('englishAppAchievements') || {};

    var wordsLearned = 0;
    for (var word in srsData) {
      if (srsData[word].level >= 3) wordsLearned++;
    }

    var totalWords = Object.keys(srsData).length;

    return {
      wordsLearned: wordsLearned,
      totalWords: totalWords,
      currentStreak: streakData.currentStreak || 0,
      totalScore: score,
      achievementsUnlocked: Object.keys(achievements).length
    };
  }

  // --- Weakest Words ---

  getWeakestWords(count) {
    if (count === undefined) count = 10;
    var srsData = loadJSON('englishAppSRS') || {};
    var words = [];

    for (var word in srsData) {
      var entry = srsData[word];
      if (entry.wrongCount > 0) {
        words.push({
          word: word,
          wrongCount: entry.wrongCount,
          level: entry.level
        });
      }
    }

    words.sort(function(a, b) { return b.wrongCount - a.wrongCount; });
    return words.slice(0, count);
  }

  // --- Category Mastery ---

  getCategoryMastery() {
    var progress = loadJSON('englishAppProgress') || {};
    var result = {};

    for (var category in progress) {
      var cat = progress[category];
      result[category] = {
        learned: cat.learned || 0,
        total: cat.total || 0,
        percentage: cat.total > 0
          ? Math.round(((cat.learned || 0) / cat.total) * 100)
          : 0
      };
    }

    return result;
  }

  // --- Weekly Activity ---

  getWeeklyActivity() {
    var activity = loadJSON(ACTIVITY_KEY) || {};
    var result = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      var key = d.toISOString().split('T')[0];
      var dayData = activity[key] || {};
      result.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: key,
        sessions: dayData.sessions || 0,
        wordsLearned: dayData.wordsLearned || 0,
        score: dayData.scoreEarned || 0
      });
    }
    return result;
  }

  recordDailyActivity(wordsLearned, scoreEarned) {
    var activity = loadJSON(ACTIVITY_KEY) || {};
    var today = getToday();

    if (!activity[today]) {
      activity[today] = { date: today, sessions: 0, wordsLearned: 0, scoreEarned: 0 };
    }

    activity[today].sessions++;
    activity[today].wordsLearned += wordsLearned;
    activity[today].scoreEarned += scoreEarned;
    saveJSON(ACTIVITY_KEY, activity);
  }

  // --- Study Time ---

  getStudyTimeStats() {
    var timeData = loadJSON(STUDY_TIME_KEY) || {};
    var totalMinutes = 0, daysActive = 0;
    for (var day in timeData) { totalMinutes += timeData[day] || 0; daysActive++; }
    return {
      averageMinutesPerDay: daysActive > 0 ? Math.round(totalMinutes / daysActive) : 0,
      totalMinutes: Math.round(totalMinutes),
      daysActive: daysActive
    };
  }

  recordStudyTime() {
    var elapsed = (Date.now() - this._sessionStart) / 60000;
    this._sessionStart = Date.now();
    var timeData = loadJSON(STUDY_TIME_KEY) || {};
    var today = getToday();
    timeData[today] = (timeData[today] || 0) + elapsed;
    saveJSON(STUDY_TIME_KEY, timeData);
  }

  // --- Reset ---

  resetAllData(confirmCallback) {
    if (typeof confirmCallback !== 'function' || !confirmCallback()) return false;

    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      if (key && key.startsWith('englishApp')) {
        keys.push(key);
      }
    }
    for (var j = 0; j < keys.length; j++) {
      localStorage.removeItem(keys[j]);
    }
    return true;
  }
}

return {
  ParentDashboard: ParentDashboard
};

});
