// Sentence Builder Game Logic
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

/** Points awarded per correct sentence */
var POINTS_PER_CORRECT = 20;

/**
 * Built-in sentence data for children's English learning
 * Categories: animals, food, colors, family, daily activities
 */
var sentenceData = [
  // Animals
  { words: ["I", "have", "a", "dog"], vietnamese: "Tôi có một con chó", hint: "🐕", category: "animals" },
  { words: ["The", "cat", "is", "small"], vietnamese: "Con mèo nhỏ", hint: "🐱", category: "animals" },
  { words: ["I", "like", "birds"], vietnamese: "Tôi thích chim", hint: "🐦", category: "animals" },
  { words: ["The", "fish", "can", "swim"], vietnamese: "Con cá biết bơi", hint: "🐟", category: "animals" },
  { words: ["I", "see", "a", "rabbit"], vietnamese: "Tôi thấy một con thỏ", hint: "🐰", category: "animals" },
  { words: ["The", "bird", "can", "fly"], vietnamese: "Con chim biết bay", hint: "🐦", category: "animals" },

  // Food
  { words: ["I", "like", "rice"], vietnamese: "Tôi thích cơm", hint: "🍚", category: "food" },
  { words: ["I", "want", "an", "apple"], vietnamese: "Tôi muốn một quả táo", hint: "🍎", category: "food" },
  { words: ["The", "cake", "is", "sweet"], vietnamese: "Cái bánh ngọt", hint: "🍰", category: "food" },
  { words: ["I", "eat", "bread"], vietnamese: "Tôi ăn bánh mì", hint: "🍞", category: "food" },
  { words: ["I", "drink", "milk"], vietnamese: "Tôi uống sữa", hint: "🥛", category: "food" },
  { words: ["The", "soup", "is", "hot"], vietnamese: "Canh nóng", hint: "🍲", category: "food" },

  // Colors
  { words: ["The", "sky", "is", "blue"], vietnamese: "Bầu trời màu xanh", hint: "🔵", category: "colors" },
  { words: ["I", "like", "red"], vietnamese: "Tôi thích màu đỏ", hint: "🔴", category: "colors" },
  { words: ["The", "sun", "is", "yellow"], vietnamese: "Mặt trời màu vàng", hint: "🌞", category: "colors" },
  { words: ["The", "grass", "is", "green"], vietnamese: "Cỏ màu xanh lá", hint: "🟢", category: "colors" },
  { words: ["I", "have", "a", "white", "cat"], vietnamese: "Tôi có một con mèo trắng", hint: "🤍", category: "colors" },
  { words: ["The", "flower", "is", "pink"], vietnamese: "Bông hoa màu hồng", hint: "🌸", category: "colors" },

  // Family
  { words: ["I", "love", "my", "mom"], vietnamese: "Tôi yêu mẹ", hint: "👩", category: "family" },
  { words: ["My", "dad", "is", "tall"], vietnamese: "Bố tôi cao", hint: "👨", category: "family" },
  { words: ["I", "have", "a", "sister"], vietnamese: "Tôi có một chị gái", hint: "👧", category: "family" },
  { words: ["My", "brother", "is", "young"], vietnamese: "Em trai tôi còn nhỏ", hint: "👦", category: "family" },
  { words: ["I", "love", "my", "family"], vietnamese: "Tôi yêu gia đình tôi", hint: "👨‍👩‍👧‍👦", category: "family" },
  { words: ["My", "mom", "is", "kind"], vietnamese: "Mẹ tôi tốt bụng", hint: "💕", category: "family" },

  // Daily activities
  { words: ["I", "go", "to", "school"], vietnamese: "Tôi đi học", hint: "🏫", category: "daily" },
  { words: ["I", "read", "a", "book"], vietnamese: "Tôi đọc sách", hint: "📖", category: "daily" },
  { words: ["I", "play", "with", "friends"], vietnamese: "Tôi chơi với bạn bè", hint: "👫", category: "daily" },
  { words: ["I", "wake", "up", "early"], vietnamese: "Tôi dậy sớm", hint: "⏰", category: "daily" },
  { words: ["I", "brush", "my", "teeth"], vietnamese: "Tôi đánh răng", hint: "🪥", category: "daily" },
  { words: ["I", "wash", "my", "hands"], vietnamese: "Tôi rửa tay", hint: "🧼", category: "daily" },
  { words: ["I", "sleep", "at", "night"], vietnamese: "Tôi ngủ ban đêm", hint: "🌙", category: "daily" },
  { words: ["I", "sing", "a", "song"], vietnamese: "Tôi hát một bài hát", hint: "🎵", category: "daily" }
];

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
 * SentenceBuilderGame - Player arranges shuffled words into correct sentence order
 */
class SentenceBuilderGame {
  /**
   * @param {Array<{words: string[], vietnamese: string, hint: string, category: string}>} data - Sentence data
   * @param {number} [count=5] - Number of sentences per game
   */
  constructor(data, count) {
    var sentences = data || sentenceData;
    this.totalQuestions = count || 5;

    if (!sentences || sentences.length === 0) {
      throw new Error('Cần dữ liệu câu để chơi game');
    }

    this.sentences = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.isComplete = false;

    // Pick random sentences
    this._pickSentences(sentences);
  }

  /**
   * Select random sentences for this game session
   * @param {Array} allSentences - Full sentence pool
   * @private
   */
  _pickSentences(allSentences) {
    var shuffled = shuffleArray(allSentences.slice());
    var count = Math.min(this.totalQuestions, shuffled.length);
    this.sentences = shuffled.slice(0, count);
    this.totalQuestions = count;
  }

  /**
   * Get the next question with shuffled words
   * @returns {{shuffledWords: string[], vietnamese: string, hint: string, wordCount: number}|null}
   *   Question object or null if game complete
   */
  getNextQuestion() {
    if (this.currentQuestionIndex >= this.sentences.length) {
      this.isComplete = true;
      return null;
    }

    var sentence = this.sentences[this.currentQuestionIndex];
    var shuffledWords = shuffleArray(sentence.words.slice());

    return {
      shuffledWords: shuffledWords,
      vietnamese: sentence.vietnamese,
      hint: sentence.hint,
      wordCount: sentence.words.length
    };
  }

  /**
   * Submit an ordered array of words as the player's answer
   * @param {string[]} orderedWords - Words in the order the player arranged them
   * @returns {{isCorrect: boolean, correctSentence: string, points: number}}
   */
  submitAnswer(orderedWords) {
    var sentence = this.sentences[this.currentQuestionIndex];
    var correctSentence = sentence.words.join(' ');
    var playerSentence = orderedWords.join(' ');
    var isCorrect = playerSentence === correctSentence;
    var points = 0;

    if (isCorrect) {
      points = POINTS_PER_CORRECT;
      this.score += points;
      this.correctCount++;
    }

    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.sentences.length) {
      this.isComplete = true;
    }

    return {
      isCorrect: isCorrect,
      correctSentence: correctSentence,
      points: points
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
  SentenceBuilderGame: SentenceBuilderGame,
  sentenceData: sentenceData
};

});
