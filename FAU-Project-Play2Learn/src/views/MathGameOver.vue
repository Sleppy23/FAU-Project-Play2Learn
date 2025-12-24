<template>
  <div style="text-align: center;">
    <h1>Math Game Over</h1>

    <p style="margin-top: 1rem;">
      You got <strong>{{ score }}</strong> correct!
    </p>

    <div style="margin-top: 1.5rem;">
      <button @click="playAgain">Play again</button>
      <button @click="goHome" style="margin-left: 0.5rem;">Back to home</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MathGameOver',

  data() {
    return {
      score: Number(this.$route.query.score) || 0,
      op: this.$route.query.op || '+',
      max: Number(this.$route.query.max) || 10,
    };
  },

  methods: {
    playAgain() {
      this.$router.push({
        name: 'MathStart',
      });
    },
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
