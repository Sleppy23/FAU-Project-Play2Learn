<template>
  <div>
    <h1>Anagram Play Page</h1>
    <p>Word length: {{ wordLength }}</p>
  </div>
</template>

<script>
export default {
  name: 'AnagramPlay',

  data() {
    return {
        wordLength: null,
    };
  },

  created() {
    const lengthFromQuery = this.$route.query.length;

    const parsed = Number(lengthFromQuery);

    if (!Number.isNaN(parsed)) {
        this.wordLength = parsed;
    } else {
        this.wordLength = 5; // default value
    }
  }
};
</script>