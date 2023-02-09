<script setup>
const error = useError();

const handleReset = () => {
  clearError({ redirect: '/' });
};
</script>

<template>
  <div class="error-layout flex h-screen justify-between">
    <header>
      <p>Error</p>
    </header>
    <main>
      <div class="m-6 flex flex-col items-center justify-center gap-7">
        <p class="text-bold align-center text-5xl">Page Not Found</p>
        <NuxtLink
          to="/"
          @click="handleReset"
          class="max-w-xs self-center rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
        >
          Go to Home
        </NuxtLink>
      </div>
    </main>
    <footer>
      <p>Powered by Nuxt.js</p>
    </footer>
  </div>
</template>

<style>
.error-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
header {
  background-color: red;
  color: white;
  padding: 1rem;
  text-align: center;
}
footer {
  background-color: lightgray;
  color: gray;
  padding: 1rem;
  text-align: center;
}
</style>
