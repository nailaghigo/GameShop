<script setup lang="ts">
import _ from 'lodash';
import { Game } from '~~/types/game';

const games = getGames();

const imgPercWidth = '100%';

let searchInput = ref('');
let showCarousel = ref(true);
let gamesList = ref<Game[]>([]);
let carouselGames = ref<Game[]>(
  games.filter((game: Game) => game.discountPercentage > 0)
);
let showSearchTitle = ref(false);

const debouncedSearch = _.debounce(() => {
  if (searchInput.value !== '') {
    showCarousel.value = false;
    showSearchTitle.value = true;
  } else {
    showCarousel.value = true;
    showSearchTitle.value = false;
  }
  gamesList.value = games.filter((game: Game) =>
    game.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );
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
    Ir al Inicio
  </NuxtLink>
  <div class="flex w-screen flex-col justify-center">
    <div class="flex w-full justify-center">
      <input
        class="m-5 w-96 max-w-2xl justify-center rounded-md border-2 border-gray-600 p-1"
        type="text"
        v-model="searchInput"
        placeholder="Search game..."
        @input="debouncedSearch"
      />
    </div>
    <Carousel
      v-if="showCarousel && carouselGames.length >= 3"
      :items="carouselGames"
      :container-width="imgPercWidth"
      :container-height="600"
    />
    <div class="flex flex-col items-center justify-center">
      <h2
        v-if="showSearchTitle && searchInput && gamesList.length"
        class="font-bold-700 mb-6 text-2xl"
      >
        Resultados para: {{ searchInput }}
      </h2>
      <ul class="flex w-screen flex-wrap justify-center gap-5">
        <li v-for="game in gamesList" class="mb-3">
          <NuxtLink :to="`/store/${game.id}`">
            <div
              class="max-w-sm rounded-lg border border-gray-200 bg-white shadow hover:bg-gray-700 dark:border-gray-700 dark:bg-gray-800"
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
                  <span
                    v-if="game.price > 0"
                    class="font-bold text-gray-900 dark:text-white"
                    :class="
                      game.discountPercentage > 0
                        ? 'text-2xl line-through'
                        : 'text-4xl'
                    "
                  >
                    {{ game.price }}$
                  </span>
                  <span
                    v-if="game.discountPercentage > 0"
                    class="dark:text-red text-4xl font-bold text-red-700"
                  >
                    {{
                      (
                        game.price -
                        game.price * (game.discountPercentage / 100)
                      ).toFixed(2)
                    }}$
                  </span>
                  <span
                    v-if="game.price === 0"
                    class="rounded-full bg-yellow-400 p-2 text-3xl font-bold text-gray-900 dark:text-black"
                  >
                    FREE
                  </span>
                  <div
                    v-if="game.discountPercentage !== 0"
                    class="flex h-28 w-28 items-center justify-center rounded-full bg-red-800"
                  >
                    <span
                      class="p-2 text-3xl font-bold text-gray-900 dark:text-white"
                    >
                      -{{ game.discountPercentage }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <div
        v-if="searchInput && !gamesList.length"
        class="relative flex rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
        role="alert"
      >
        <span class="block font-bold sm:inline"
          >No encontramos resultados para su búsqueda</span
        >
      </div>
    </div>
  </div>
</template>
