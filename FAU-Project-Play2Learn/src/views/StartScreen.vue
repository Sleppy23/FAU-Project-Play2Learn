<template>
  <div>
    <h1>Play2Learn</h1>

    <div class="cards">
      <GameCard
        title="Anagram Hunt"
        description="Improve how fast you recognize anagrams!"
        buttonText="Play now!"
        to="/anagram"
      />

      <GameCard
        title="Math Facts Practice"
        description="Boost your mental math speed!"
        buttonText="Play now!"
        to="/math"
      />
    </div>
  </div>
</template>

<script>
import GameCard from '../components/GameCard.vue';

export default {
  name: 'StartScreen',
  components: {
    GameCard,
  },
};
</script>