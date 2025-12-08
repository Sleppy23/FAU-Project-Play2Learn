<template>
  <div>
    <h1>Anagram Hunt</h1>
    <label> 
        Word Length
        <input type="number" min="3" max="10" v-model.number="wordLength" />
    </label>
    <!-- instructions I believe will be listed here-->
    <button
      @click="startGame"
      :disabled="!isValidLength"
    >
      Play!
    </button>
  </div>
</template>

<script>
export default {
  name: 'AnagramStart',
    data() {
        return {
        wordLength: 5,
        };
    },
    computed: {
        isValidLength() {
        return this.wordLength >= 3 && this.wordLength <= 10;
        },
    },
    methods: {
        startGame() {},
    },
};
</script>