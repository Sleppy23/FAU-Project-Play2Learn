<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
     <router-link :to="to">
       <button>{{ button }}</button>
     </router-link>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    title: String,
    description: String,
    button: { 
    type: String,
    default: 'Play!',
  },
  to: String
  }
};
</script>