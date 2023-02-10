<script setup lang="ts">
// 1. Make the transition duration variable via props.
// 2. Create a more logical and generic type for the "items" prop and hold it inside the component.
// 3. Give the option to not loop around the "items" array if desired.
// 4. Type the left and right transition, maybe an enum?
// 5. Add documentation on how to use the Carousel.
// 6. Render a NuxtLink if the item has a redirectUrl, else render a div.
// 7. Change the color of the controls depending on the brightness of the image for better visibility.
// 8. Use slots for the prev and next icons, also have a default render inside them.
// 9. Add customizable colors for the indicators.
// 10. Add accessibility features, keyboard navigation, aria-label with the alt of the image, etc.
// 11. Make controls positioning customizable.
import { propertyOf } from 'lodash';
import { Game } from '~~/types/game';

const props = withDefaults(
  defineProps<{
    containerHeight?: number;
    containerWidth?: number | string;
    items: Game[];
  }>(),
  {
    containerHeight: 100,
    containerWidth: 100,
  }
);

const currentIndex = ref(0);
const transition = ref('left');
const transitioning = ref(false);

function next() {
  if (transitioning.value) return;
  transitioning.value = true;
  transition.value = 'left';
  currentIndex.value = (currentIndex.value + 1) % props.items.length;
  setTimeout(() => {
    transitioning.value = false;
  }, 500);
}

function prev() {
  if (transitioning.value) return;
  transitioning.value = true;
  transition.value = 'right';
  currentIndex.value =
    (currentIndex.value + props.items.length - 1) % props.items.length;

  setTimeout(() => {
    transitioning.value = false;
  }, 500);
}
</script>

<template>
  <div class="relative mb-6 inline-flex">
    <!-- Carousel container -->
    <div
      class="relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"
      :style="{ width: containerWidth, height: containerHeight + 'px' }"
    >
      <transition-group :name="transition" class="relative">
        <NuxtLink
          :to="`/store/${game.id}`"
          class="flex h-full w-full flex-row gap-10"
          v-for="(game, index) in props.items"
          :key="index"
          v-show="index === currentIndex"
        >
          <img
            :src="game.images[0].urlHorizontal"
            class="flex h-full object-contain"
          />
          <div class="align-center my-10 flex flex-col justify-between">
            <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
              {{ game.title }}
            </h1>
            <div v-if="game.price > 0" class="text-white">
              <span
                class="text-2xl"
                :class="game.discountPercentage > 0 ? 'line-through' : ''"
              >
                {{ game.price }}$
              </span>
              <span
                class="dark:text-red text-4xl font-bold text-red-700"
                v-if="game.discountPercentage > 0"
              >
                {{
                  (
                    game.price -
                    game.price * (game.discountPercentage / 100)
                  ).toFixed(2)
                }}$
              </span>
            </div>
            <div
              class="flex h-36 w-36 items-center justify-center rounded-full bg-red-800"
            >
              <span
                class="p-2 text-5xl font-bold text-gray-900 dark:text-white"
              >
                -{{ game.discountPercentage }}%
              </span>
            </div>
          </div>
        </NuxtLink>
      </transition-group>
      <!-- Controls -->
      <button class="controls left-[3%] shadow-2xl" @click="prev">
        <Icon name="ic:baseline-chevron-left" size="40" class="text-gray-200" />
      </button>
      <button class="controls right-[3%] shadow-2xl" @click="next">
        <Icon
          name="ic:baseline-chevron-right"
          size="40"
          class="text-gray-200"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls {
  @apply absolute top-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-20;
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
  position: absolute;
  transition: all 500ms;
}

.left-enter-from {
  transform: translateX(100%);
}

.left-leave-to {
  transform: translateX(-100%);
}

.right-enter-from {
  transform: translateX(-100%);
}

.right-leave-to {
  transform: translateX(+100%);
}
</style>
