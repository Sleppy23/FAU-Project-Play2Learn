<template>
  <div>
    <h1>Anagram Play Page</h1>

    <p>Word length: {{ wordLength }}</p>
    <p>Score: {{ score }}</p>

    <p>
      Scrambled word:
      <strong>{{ scrambled }}</strong>
    </p>

    <div style="margin-top: 1.5rem;">
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
import anagramData from "../assets/anagrams.json";

export default {
  name: "AnagramPlay",

  data() {
    return {
      wordLength: 5,
      chosenWord: "",
      scrambled: "",
      playerGuess: "",
      feedback: "",
      score: 0,
    };
  },

  created() {
    const lengthFromQuery = this.$route.query.length;
    const parsed = Number(lengthFromQuery);
    this.wordLength = !Number.isNaN(parsed) ? parsed : 5;

    const lengthMap = {};

    if (Array.isArray(anagramData)) {
      anagramData.forEach((group) => {
        if (Array.isArray(group) && group.length > 0) {
          const len = group[0].length;
          lengthMap[len] = group;
        }
      });
    } else if (anagramData && typeof anagramData === "object") {
      Object.assign(lengthMap, anagramData);
    }


    const wordsForLength = lengthMap[this.wordLength] || [];

    if (!Array.isArray(wordsForLength) || wordsForLength.length === 0) {
      console.error("No words found for length:", this.wordLength);
      this.chosenWord = "";
      this.scrambled = "";
      this.feedback = `No words available for length ${this.wordLength}.`;
      return;
    }

    
    const randomIndex = Math.floor(Math.random() * wordsForLength.length);
    this.chosenWord = wordsForLength[randomIndex];

    
    this.scrambled = this.scrambleWord(this.chosenWord);
  },

  methods: {
    scrambleWord(word) {
      const chars = String(word).split("");

      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
      }

      const scrambled = chars.join("");

      
      if (scrambled === word && word.length > 1) {
        return this.scrambleWord(word);
      }

      return scrambled;
    },

    checkGuess() {
      const cleanGuess = this.playerGuess.trim().toLowerCase();
      const cleanAnswer = (this.chosenWord || "").trim().toLowerCase();

      if (!cleanGuess) {
        this.feedback = "Please enter a guess.";
        return;
      }

      const isCorrect = cleanGuess === cleanAnswer;

     
      this.score = isCorrect ? 1 : 0;

      
      this.$router.push({
        name: "AnagramGameOver",
        query: {
          result: isCorrect ? "win" : "lose",
          answer: this.chosenWord,
          length: this.wordLength,
          score: this.score,
        },
      });
    },
  },
};
</script>
