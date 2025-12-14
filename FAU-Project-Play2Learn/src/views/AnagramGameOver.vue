<template>
  <div>
    <h1>Anagram Game Over</h1>

    <p v-if="isWin">🎉 You got it!</p>
    <p v-else>Nice try! You'll get it next time.</p>

    <p>The word was: <strong>{{ answer }}</strong></p>

    <div style="margin-top: 1.5rem;">
      <button @click="playAgain">Play again</button>
      <button @click="goHome" style="margin-left: 0.5rem;">Back to home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnagramGameOver',

  data() {
    return {
      result: this.$route.query.result || 'lose',
      answer: this.$route.query.answer || '',
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