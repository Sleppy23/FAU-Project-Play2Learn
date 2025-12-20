<template>
  <div class="game-over">
    <h1>Anagram Hunt</h1>

    <h2 v-if="isWin">Time's Up!</h2>
    <h2 v-else>Nice try!</h2>

    <p>You got</p>
    <h1>{{ score }}</h1>
    <p>Anagrams</p>

    <p v-if="answer">
      The word was: <strong>{{ answer }}</strong>
    </p>

    <div style="margin-top: 1.5rem;">
      <button @click="playAgain">Play Again</button>
      <button @click="goHome" style="margin-left: 0.5rem;">
        Back to Start Screen
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnagramGameOver',

  data() {
    return {
      result: this.$route.query.result || 'lose',
      score: Number(this.$route.query.score) || 0,
      answer: this.$route.query.answer || '',
      length: Number(this.$route.query.length) || 5,
    };
  },

  computed: {
    isWin() {
      return this.result === 'win';
    },
  },

  methods: {
    playAgain() {
      this.$router.push({ name: 'AnagramStart' });
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
