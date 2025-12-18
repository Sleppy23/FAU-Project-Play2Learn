<template>
  <div>
    <h1>Anagram Hunt</h1>

    <p><strong>Time Left:</strong> {{ timeLeft }}</p>
    <p><strong>Word length:</strong> {{ wordLength }}</p>

    <p>
      <strong>Scrambled word:</strong>
      <span style="font-size: 1.25rem;">{{ scrambled }}</span>
    </p>

    <div style="margin-top: 1rem;">
      <label>
        Your guess:
        <input
          type="text"
          v-model="playerGuess"
          placeholder="Type the word here"
          @keydown.enter.prevent="checkGuess"
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

      wordLength: 5,
      chosenWord: '',
      scrambled: '',

      
      playerGuess: '',
      feedback: '',

   
      timeLeft: 60,
      timerId: null,
    };
  },

  created() {
  
    const lengthFromQuery = this.$route.query.length;
    const parsed = Number(lengthFromQuery);
    this.wordLength = !Number.isNaN(parsed) ? parsed : 5;

   
    const lengthMap = {};
    anagramData.forEach((group) => {
      if (Array.isArray(group) && group.length > 0) {
        const len = group[0].length;
        lengthMap[len] = group;
      }
    });

   
    const wordsForLength = lengthMap[this.wordLength] || [];

    if (!Array.isArray(wordsForLength) || wordsForLength.length === 0) {
      console.error('No words found for length:', this.wordLength);
      this.feedback = `No words available for length ${this.wordLength}.`;
      return;
    }

    this.chosenWord = this.pickRandom(wordsForLength);
    this.scrambled = this.scrambleWord(this.chosenWord);

   
    this.startTimer();
  },

  beforeUnmount() {

    this.stopTimer();
  },

  methods: {
    startTimer() {
      this.stopTimer(); 

      this.timerId = setInterval(() => {
        this.timeLeft -= 1;

        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.stopTimer();

         
          this.$router.push({
            name: 'AnagramGameOver',
            query: {
              result: 'lose',
              answer: this.chosenWord,
              length: this.wordLength,
            },
          });
        }
      }, 1000);
    },

    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },

    pickRandom(list) {
      const idx = Math.floor(Math.random() * list.length);
      return list[idx];
    },

    scrambleWord(word) {
      const original = String(word);
      const chars = original.split('');

    
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }

      const scrambled = chars.join('');

    
      if (scrambled === original && original.length > 1) {
        return this.scrambleWord(original);
      }

      return scrambled;
    },

    checkGuess() {
      const cleanGuess = this.playerGuess.trim().toLowerCase();
      const cleanAnswer = (this.chosenWord || '').trim().toLowerCase();

      if (!cleanGuess) {
        this.feedback = 'Please enter a guess.';
        return;
      }

      const isCorrect = cleanGuess === cleanAnswer;

      
      this.stopTimer();

     
      this.$router.push({
        name: 'AnagramGameOver',
        query: {
          result: isCorrect ? 'win' : 'lose',
          answer: this.chosenWord,
          length: this.wordLength,
        },
      });
    },
  },
};
</script>
