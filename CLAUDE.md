# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

English Fun is a browser-based English learning app for Vietnamese children (ages 6+). It features vocabulary flashcards with pronunciation, YouTube song videos, and interactive quizzes.

## Running the App

No build system required. Simply open `index.html` in a browser:
```bash
open index.html
```

## Architecture

### File Structure
- **index.html** - Main page with 4 sections: Home, Vocabulary, Songs, Games
- **app.js** - Application logic (navigation, rendering, audio, quiz)
- **data.js** - Vocabulary data (18 categories, 180 words) and quiz generation
- **styles.css** - Modern child-friendly design with glassmorphism

### Design System (styles.css)
- **Font**: Outfit (Google Fonts)
- **Colors**: CSS variables in `:root` (--primary: #FF6B6B, --secondary: #4ECDC4, --accent: #FFE66D)
- **Navigation**: Fixed bottom nav bar with glassmorphism effect
- **Cards**: Rounded corners (--radius-lg: 35px), subtle shadows, hover animations
- **Responsive**: Mobile-first, hides nav text on small screens

### Data Flow
1. `vocabularyData` object in data.js defines all vocabulary categories
2. `app.js` renders flashcards dynamically based on selected category
3. Click events trigger `speakWord()` which fetches audio from Free Dictionary API
4. Quiz questions generated from vocabulary using `generateQuizQuestions()`

### Key Systems

**Pronunciation System** (app.js:191-283)
- Primary: Free Dictionary API (`https://api.dictionaryapi.dev/api/v2/entries/en/{word}`)
- Fallback: Web Speech API
- Audio URLs cached in `audioCache` Map
- Preloads audio when category changes

**Quiz System** (app.js:335-455, data.js:385-427)
- `generateQuizQuestions()` creates randomized multiple-choice questions
- 5 questions per quiz, 4 options each
- Scores persisted to localStorage

**State Management**
- App state in module-level variables (currentSection, currentCategory, etc.)
- Scores persisted via localStorage key `englishAppScore`

### Adding New Vocabulary

Add to `vocabularyData` in data.js:
```javascript
newCategory: {
  title: "Vietnamese Title",
  titleEn: "English Title",
  icon: "emoji",
  words: [
    { word: "english", vietnamese: "tieng viet", emoji: "emoji" }
  ]
}
```

Then add buttons in index.html for both `.category-selector` sections (vocabulary and quiz).

### External Dependencies
- Free Dictionary API - pronunciation audio (no API key needed)
- YouTube embeds - children's songs (video IDs in `songsData`)
