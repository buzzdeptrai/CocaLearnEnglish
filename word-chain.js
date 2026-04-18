// Word Chain Game Logic
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
  const seen = new Set();
  const allWords = [];
  for (const category in vocabularyData) {
    if (vocabularyData[category].words) {
      for (const word of vocabularyData[category].words) {
        if (word.emoji && !seen.has(word.word)) {
          seen.add(word.word);
          allWords.push(word);
        }
      }
    }
  }
  return allWords;
}

/**
 * Get words filtered by specific categories
 * @param {Object} vocabularyData - Vocabulary data object with categories
 * @param {Array} categories - Array of category keys to include (e.g., ['animals', 'colors'])
 * @returns {Array} Flat array of word objects from selected categories (only words with emoji property)
 */
function getWordsByCategories(vocabularyData, categories) {
  // If no categories specified, return all words
  if (!categories || categories.length === 0) {
    return getAllWords(vocabularyData);
  }

  const words = [];
  for (const category of categories) {
    if (vocabularyData[category] && vocabularyData[category].words) {
      // Filter to only include words that have an emoji property
      const wordsWithEmoji = vocabularyData[category].words.filter(word => word.emoji);
      words.push(...wordsWithEmoji);
    }
  }
  return words;
}

/**
 * Generate a Level 1 question: find a word starting with a given letter
 * @param {Array} availableWords - Array of word objects with {word, vietnamese, emoji}
 * @returns {Object} Question with {targetLetter, options, correctAnswer}
 */
function generateLevel1Question(availableWords) {
  if (!availableWords || availableWords.length < 4) {
    throw new Error('Need at least 4 words to generate a question');
  }

  // Get all unique first letters from available words
  const firstLetters = [...new Set(
    availableWords.map(w => w.word[0].toUpperCase())
  )];

  // Pick a random letter that has at least one word
  const targetLetter = firstLetters[Math.floor(Math.random() * firstLetters.length)];

  // Get words that start with this letter
  const correctWords = availableWords.filter(
    w => w.word[0].toUpperCase() === targetLetter
  );

  // Get words that don't start with this letter
  const incorrectWords = availableWords.filter(
    w => w.word[0].toUpperCase() !== targetLetter
  );

  // Pick one correct answer
  const correctAnswer = correctWords[Math.floor(Math.random() * correctWords.length)];

  // Pick 3 random incorrect answers
  const shuffledIncorrect = [...incorrectWords].sort(() => Math.random() - 0.5);
  const incorrectOptions = shuffledIncorrect.slice(0, 3);

  // Combine and shuffle all options
  const options = [correctAnswer, ...incorrectOptions].sort(() => Math.random() - 0.5);

  return {
    targetLetter,
    options,
    correctAnswer
  };
}

/**
 * Validate if the selected word starts with the target letter
 * @param {string} targetLetter - The target letter (can be any case)
 * @param {Object} selectedWord - Word object with {word, vietnamese, emoji}
 * @returns {boolean} True if word starts with target letter
 */
function validateLevel1Answer(targetLetter, selectedWord) {
  const normalizedTarget = targetLetter.toUpperCase();
  const normalizedWord = selectedWord.word[0].toUpperCase();
  return normalizedWord === normalizedTarget;
}

/**
 * Get the last letter of a word
 * @param {Object} wordObj - Word object with {word, vietnamese, emoji}
 * @returns {string} Last letter in uppercase
 */
function getLastLetter(wordObj) {
  const word = wordObj.word;
  return word[word.length - 1].toUpperCase();
}

/**
 * Generate a Level 2 question: find word that continues the chain
 * Last letter of previous word must match first letter of next word
 * @param {Array} availableWords - Array of all word objects
 * @param {Object} previousWord - The previous word in the chain
 * @param {Array} usedWords - Array of word strings already used in chain
 * @returns {Object} Question with {previousWord, targetLetter, options, correctAnswer}
 */
function generateLevel2Question(availableWords, previousWord, usedWords) {
  if (!availableWords || availableWords.length < 4) {
    throw new Error('Need at least 4 words to generate a question');
  }

  // Get last letter of previous word
  const targetLetter = getLastLetter(previousWord);

  // Filter out used words AND the previous word itself
  const unusedWords = availableWords.filter(
    w => !usedWords.includes(w.word) && w.word !== previousWord.word
  );

  // Get words that start with target letter (correct answers)
  const correctWords = unusedWords.filter(
    w => w.word[0].toUpperCase() === targetLetter
  );

  // Get words that don't start with target letter (incorrect answers)
  const incorrectWords = unusedWords.filter(
    w => w.word[0].toUpperCase() !== targetLetter
  );

  if (correctWords.length === 0) {
    throw new Error(`No available words starting with ${targetLetter}`);
  }

  // Pick one correct answer
  const correctAnswer = correctWords[Math.floor(Math.random() * correctWords.length)];

  // Need 3 more options to make 4 total
  // First try to get 3 incorrect words
  const shuffledIncorrect = [...incorrectWords].sort(() => Math.random() - 0.5);
  let otherOptions = shuffledIncorrect.slice(0, 3);

  // If we don't have enough incorrect words, add more correct words
  if (otherOptions.length < 3) {
    const remainingCorrect = correctWords.filter(w => w.word !== correctAnswer.word);
    const shuffledCorrect = [...remainingCorrect].sort(() => Math.random() - 0.5);
    const needed = 3 - otherOptions.length;
    otherOptions = [...otherOptions, ...shuffledCorrect.slice(0, needed)];
  }

  // Combine and shuffle all options
  const options = [correctAnswer, ...otherOptions].sort(() => Math.random() - 0.5);

  return {
    previousWord,
    targetLetter,
    options,
    correctAnswer
  };
}

/**
 * Validate if the selected word correctly continues the chain
 * @param {Object} previousWord - The previous word in chain
 * @param {Object} selectedWord - The word selected by user
 * @returns {boolean} True if selected word's first letter matches previous word's last letter
 */
function validateLevel2Answer(previousWord, selectedWord) {
  const lastLetter = getLastLetter(previousWord);
  const firstLetter = selectedWord.word[0].toUpperCase();
  return firstLetter === lastLetter;
}

/**
 * WordChainGame - Manages game state for Word Chain game
 */
class WordChainGame {
  /**
   * @param {Array} words - Available words for the game
   * @param {number} level - Game level (1 or 2)
   */
  constructor(words, level) {
    this.words = words;
    this.level = level;
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.totalQuestions = level === 1 ? 10 : 8;
    this.isComplete = false;
    this.usedWords = [];
    this.wordChain = [];
    this.currentQuestion = null;
  }

  /**
   * Get the next question
   * @returns {Object|null} Question object or null if game complete
   */
  getNextQuestion() {
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.isComplete = true;
      return null;
    }

    let question;

    try {
      if (this.level === 1) {
        question = generateLevel1Question(this.words);
      } else {
        // Level 2
        if (this.wordChain.length === 0) {
          // First question - pick a random starting word
          // Don't add to usedWords yet - only answered words go there
          const startWord = this.words[Math.floor(Math.random() * this.words.length)];
          question = generateLevel2Question(this.words, startWord, this.usedWords);
        } else {
          // Continue chain from last word
          const previousWord = this.wordChain[this.wordChain.length - 1];
          question = generateLevel2Question(this.words, previousWord, this.usedWords);
        }
      }
    } catch (error) {
      // If we can't generate a question (e.g., no available words), mark game complete
      this.isComplete = true;
      return null;
    }

    this.currentQuestion = question;
    this.currentQuestionIndex++;
    return question;
  }

  /**
   * Submit an answer and update game state
   * @param {Object} selectedWord - The word selected by user
   * @returns {Object} Result with {isCorrect, score}
   */
  submitAnswer(selectedWord) {
    let isCorrect = false;

    if (this.level === 1) {
      isCorrect = validateLevel1Answer(
        this.currentQuestion.targetLetter,
        selectedWord
      );
    } else {
      isCorrect = validateLevel2Answer(
        this.currentQuestion.previousWord,
        selectedWord
      );
    }

    if (isCorrect) {
      const points = this.level === 1 ? 20 : 25;
      this.score += points;

      if (this.level === 2) {
        this.usedWords.push(selectedWord.word);
        this.wordChain.push(selectedWord);
      }
    }

    // Check if game is complete after this answer
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.isComplete = true;
    }

    return {
      isCorrect,
      score: this.score
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
   * Get game progress
   * @returns {Object} Progress with {current, total, percentage}
   */
  getProgress() {
    return {
      current: this.currentQuestionIndex,
      total: this.totalQuestions,
      percentage: Math.round((this.currentQuestionIndex / this.totalQuestions) * 100)
    };
  }
}

// Return exports
return {
  getAllWords: getAllWords,
  getWordsByCategories: getWordsByCategories,
  generateLevel1Question: generateLevel1Question,
  validateLevel1Answer: validateLevel1Answer,
  getLastLetter: getLastLetter,
  generateLevel2Question: generateLevel2Question,
  validateLevel2Answer: validateLevel2Answer,
  WordChainGame: WordChainGame
};

});
