<script setup lang="ts">
const route = useRoute();
const game = getGame(route.params.gameId as string);

console.log(game);

console.log(route);
</script>

<template>
  Game.vue {{ route.params.id }}

  <div>
    <p>Name: {{ game[0].title }}</p>
    <p>Release Date:{{ game[0].releaseDate }}</p>
    <p>Discount: {{ game[0].discountPercentage }} %</p>
    <p>Price: {{ game[0].price }}$</p>
  </div>

  <NuxtLink to="/store"> Go to Store</NuxtLink>
</template>
