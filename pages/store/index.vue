<script setup lang="ts">
import _ from 'lodash';
import { Game } from '~~/types/game';

const games = getGames();

const x = '100%';

let input = ref('');

function filteredList() {
  return games.filter((game) =>
    game.title.toLowerCase().includes(input.value.toLowerCase())
  );
}

const debouncedSearch = _.debounce(() => {
  console.log(`Searching: ${input.value}`);
}, 500);

onMounted(() => {
  debouncedSearch();
});
</script>

<template>
  <NuxtLink
    to="/"
    class="m-32 max-w-xs self-center rounded border bg-blue-500 py-2 px-4 font-bold text-white shadow hover:bg-blue-700"
  >
    Go to Home</NuxtLink
  >
  <div class="flex w-screen flex-col justify-center">
    <Carousel
      :items="(games as Game[])"
      :container-width="x"
      :container-height="600"
    />
    <div class="flex w-full justify-center">
      <input
        class="m-5 w-96 max-w-2xl justify-center rounded-md border-2 border-gray-600 p-1"
        type="text"
        v-model="input"
        placeholder="Search game..."
        @input="debouncedSearch"
      />
    </div>
    <ul class="flex w-screen flex-wrap justify-center gap-5">
      <li v-for="game in filteredList()" class="mb-3">
        <NuxtLink :to="`/store/${game.id}`">
          <div
            class="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <a href="#">
              <img
                class="rounded-t-lg p-8"
                :src="game.images[0].urlVertical"
                :alt="game.images[0].alt"
              />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5
                  class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ game.title }}
                </h5>
              </a>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-gray-900 dark:text-white"
                  >${{ game.price }}</span
                >
                <span class="text-3xl font-bold text-gray-900 dark:text-white"
                  >{{ game.discountPercentage }}% dcto</span
                >
              </div>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div
      class="flex justify-center text-red-500"
      v-if="input && !filteredList().length"
    >
      <p>No results found!</p>
    </div>
  </div>
</template>
