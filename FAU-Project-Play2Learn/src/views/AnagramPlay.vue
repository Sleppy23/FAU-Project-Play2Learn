<template>
  <div>
    <h1>Anagram Hunt</h1>

    <div
      style="
        display: flex;
        justify-content: center;
        gap: 4rem;
        margin-top: 1rem;
      "
    >
      <p><strong>Score:</strong> {{ score }}</p>
      <p><strong>Time Left:</strong> {{ timeLeft }}</p>
    </div>

    <div style="margin-top: 1.5rem; text-align: center;">
      <h2 v-if="baseWord">
        {{ baseWord }} ({{ anagramsLeft }} left)
      </h2>

      <p v-if="scrambled">
        <strong>Scrambled:</strong> {{ scrambled }}
      </p>

      <div style="margin-top: 1rem;">
        <label>
          <strong>Your guess:</strong>
          <input
            type="text"
            v-model="playerGuess"
            placeholder="type here"
            @keyup.enter="checkGuess"
            style="margin-left: 0.5rem;"
          />
        </label>

        <button
          @click="checkGuess"
          :disabled="!playerGuess.trim()"
          style="margin-left: 0.75rem;"
        >
          Submit
        </button>
      </div>

      <p v-if="feedback" style="margin-top: 1rem;">
        {{ feedback }}
      </p>

      <ol
        v-if="guessed.length"
        style="
          margin-top: 1.25rem;
          display: inline-block;
          text-align: left;
        "
      >
        <li v-for="(word, idx) in guessed" :key="idx">
          {{ word }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import anagramData from '../assets/anagrams.json';

export default {
  name: 'AnagramPlay',

  data() {
    return {
      wordLength: 5,

      // game state
      groupsForLength: [],
      unusedGroups: [],
      currentGroup: [],
      baseWord: '',
      scrambled: '',

      guessed: [],
      playerGuess: '',
      feedback: '',
      score: 0,

      // timer
      timeLeft: 60,
      timerId: null,
    };
  },

  computed: {
    anagramsLeft() {
      if (!this.currentGroup.length || !this.baseWord) {
        return 0;
      }

      const base = this.baseWord.toLowerCase();
      const guessedSet = new Set(
        this.guessed.map((g) => g.toLowerCase())
      );

      return this.currentGroup.filter((w) => {
        const lw = String(w).toLowerCase();
        return lw !== base && !guessedSet.has(lw);
      }).length;
    },
  },

  created() {
    const parsed = Number(this.$route.query.length);
    this.wordLength = !Number.isNaN(parsed) ? parsed : 5;

    if (Array.isArray(anagramData)) {
      this.groupsForLength = anagramData.filter(
        (group) =>
          Array.isArray(group) &&
          group.length &&
          group[0].length === this.wordLength
      );
    } else {
      this.groupsForLength = anagramData[this.wordLength] || [];
    }

    this.unusedGroups = [...this.groupsForLength];

    if (!this.unusedGroups.length) {
      this.feedback = `No anagram groups available for length ${this.wordLength}.`;
      return;
    }

    this.loadNewGroup();
    this.startTimer();
  },

  beforeUnmount() {
    this.stopTimer();
  },

  methods: {
    // ---- Timer ----
    startTimer() {
      this.stopTimer();

      this.timerId = setInterval(() => {
        this.timeLeft -= 1;

        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.stopTimer();
          this.endGame('time');
        }
      }, 1000);
    },

    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
    },

    // ---- Game flow ----
    endGame(result) {
      this.$router.push({
        name: 'AnagramGameOver',
        query: {
          result,
          score: this.score,
          length: this.wordLength,
        },
      });
    },

    pickRandom(list) {
      const idx = Math.floor(Math.random() * list.length);
      return list[idx];
    },

    scrambleWord(word) {
      const chars = String(word).split('');

      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }

      return chars.join('');
    },

    loadNewGroup() {
      if (!this.unusedGroups.length) {
        this.endGame('complete');
        return;
      }

      const group = this.pickRandom(this.unusedGroups);
      this.unusedGroups = this.unusedGroups.filter((g) => g !== group);

      this.currentGroup = group;
      this.baseWord = this.pickRandom(this.currentGroup);

      this.guessed = [];
      this.playerGuess = '';
      this.feedback = '';

      this.scrambled = this.scrambleWord(this.baseWord);
    },

    checkGuess() {
      const guess = this.playerGuess.trim().toLowerCase();
      if (!guess) return;

      const base = String(this.baseWord).toLowerCase();
      const groupLower = this.currentGroup.map((w) =>
        String(w).toLowerCase()
      );

      if (guess === base) {
        this.feedback =
          "That’s the base word—guess one of its anagrams.";
        this.playerGuess = '';
        return;
      }

      const alreadyGuessed = this.guessed.some(
        (g) => g.toLowerCase() === guess
      );
      if (alreadyGuessed) {
        this.feedback = 'You already guessed that one.';
        this.playerGuess = '';
        return;
      }

      if (!groupLower.includes(guess)) {
        this.feedback = 'Not in this anagram set. Try again.';
        return;
      }

      // Correct guess
      this.guessed.push(guess);
      this.score += 1;
      this.feedback = 'Nice!';
      this.playerGuess = '';

      if (this.anagramsLeft === 0) {
        this.feedback = 'Great! Next word...';
        setTimeout(() => this.loadNewGroup(), 600);
      }
    },
  },
};
</script>
