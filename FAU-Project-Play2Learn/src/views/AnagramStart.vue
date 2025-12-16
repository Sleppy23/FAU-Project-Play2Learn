<template>
  <div>
    <h1>Anagram Hunt</h1>

    <label>
      Word Length
      <select v-model.number="wordLength">
        <option
          v-for="len in availableLengths"
          :key="len"
          :value="len"
        >
          {{ len }}
        </option>
      </select>
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
import anagramData from '../assets/anagrams.json';

export default {
  name: 'AnagramStart',

  data() {
    return {
      wordLength: 5,
      availableLengths: [],
    };
  },

  created() {
    const lengths = new Set();

    anagramData.forEach(group => {
      if (Array.isArray(group) && group.length > 0) {
        lengths.add(group[0].length);
      }
    });

    this.availableLengths = Array.from(lengths).sort((a, b) => a - b);

    if (!this.availableLengths.includes(this.wordLength)) {
      this.wordLength = this.availableLengths[0];
    }
  },

  computed: {
    isValidLength() {
      return this.availableLengths.includes(this.wordLength);
    },
  },

  methods: {
    startGame() {
      if (!this.isValidLength) return;

      this.$router.push({
        name: 'AnagramPlay',
        query: {
          length: this.wordLength,
        },
      });
    },
  },
};
</script>