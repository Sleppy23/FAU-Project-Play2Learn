<template>
  <div>
    <h1>Anagram Play Page</h1>

    <p>Word length: {{ wordLength }}</p>
    <p>Scrambled word: <strong>{{ scrambled }}</strong></p>

    <div style="margin-top: 1.5rem;">
      <label>
        Your guess:
        <input
          type="text"
          v-model="playerGuess"
          placeholder="Type the word here"
        />
      </label>

      <button
        @click="checkGuess"
        :disabled="!playerGuess.trim()"
        style="margin-left: 0.5rem;"
      >
        Submit
      </button>
    </div>

    <p v-if="feedback" style="margin-top: 1rem;">
      {{ feedback }}
    </p>
  </div>
</template>

<script>
import anagramData from '../assets/anagrams.json';

export default {
  name: 'AnagramPlay',

  data() {
    return {
        wordLength: null,
        chosenWord: null,
        scrambled: null,
        playerGuess:'',
        feedback: '',
    };
  },

created() {
  // 1) Read and normalize the word length from the URL
  const lengthFromQuery = this.$route.query.length;
  const parsed = Number(lengthFromQuery);

  this.wordLength = !Number.isNaN(parsed) ? parsed : 5;

  // 2) Build a map of { length: [words...] } from the raw JSON
  const lengthMap = {};

  if (Array.isArray(anagramData)) {
    // anagramData is an array of arrays
    anagramData.forEach((group) => {
      if (Array.isArray(group) && group.length > 0) {
        // assume all words in a group have the same length
        const len = group[0].length;
        lengthMap[len] = group;
      }
    });
  } else {
    // if in the future the JSON is an object keyed by length,
    // just use it directly
    Object.assign(lengthMap, anagramData);
  }

  // 3) Get the words for the desired length
  const wordsForLength = lengthMap[this.wordLength] || [];

  if (!wordsForLength.length) {
    console.error('No words found for length:', this.wordLength);
    this.chosenWord = '';
    this.scrambled = '';
    return;
  }

  // 4) Pick a random word from that list
  const randomIndex = Math.floor(Math.random() * wordsForLength.length);
  this.chosenWord = wordsForLength[randomIndex];

  // 5) Scramble it (Fisher–Yates shuffle)
  const chars = this.chosenWord.split('');

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  this.scrambled = chars.join('');
},
 methods: {
    checkGuess() {
      const cleanGuess = this.playerGuess.trim().toLowerCase();
      const cleanAnswer = (this.chosenWord || '').trim().toLowerCase();

      if (!cleanGuess) {
        this.feedback = 'Please enter a guess.';
        return;
      }

      if (!cleanAnswer) {
        this.feedback = 'There was a problem loading the word.';
        return;
      }

      if (cleanGuess === cleanAnswer) {
        this.feedback = 'Correct! Nice job!';
      } else {
        this.feedback = 'Not quite. Try again!';
      }
    },
  },
};
</script>