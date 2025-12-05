<template>
  <div id="app">
    <!-- Splash screen -->
    <div v-if="isLoading" class="loader-screen">
      <img src="/klub.png" alt="Logo" class="loader-logo" />
      <div class="text"></div>
    </div>

    <!-- Contenu réel -->
    <div v-else>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 3000) // durée du splash screen en ms
})
</script>

<style>
.loader-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2a3050;
  z-index: 9999;
}

.loader-logo {
  width: 160px;
  height: auto;
  animation: pulse 1.6s infinite ease-in-out;
}

@keyframes pulse {
  0%   { transform: scale(1); opacity: 0.7; }
  50%  { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
}

.text::before {
  content: "breathe in";
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 5px;
  margin-top: 20px;
  animation: breatheTextAnim 6s linear infinite;
}

@keyframes breatheTextAnim {
  0%, 50% { content: "breathe in"; opacity: 1; }
  25%, 75% { content: "breathe out"; opacity: 1; }
  12.5%, 37.5%, 62.5%, 87.5% { opacity: 0; }
}
</style>