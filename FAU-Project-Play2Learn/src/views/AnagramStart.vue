<template>
  <div>
    <h1>Anagram Hunt</h1>
    <label> 
        Word Length
        <input type="number" min="3" max="10" v-model.number="wordLength" />
    </label>
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
        startGame() {
             if (!this.isValidLength) return;
            this.$router.push({
                name: 'AnagramPlay',
                query: {
                    length:this.wordLength
                }
            });
        }
    },
};
</script>