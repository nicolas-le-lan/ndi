<template>
  <div class="layout">
    <Header />
    <main class="main-content">
      <!-- Page-specific warnings -->
      <div class="container">
        <PageWarnings />
      </div>
      <slot />
    </main>
    <Footer />
    <!-- Rube Goldberg sequence per page -->
    <RubeGoldbergSequence />
    <!-- Easter Egg: Mini-jeux -->
    <RubeGoldberg />
  </div>
</template>

<script setup>
// ...existing component auto-imports...
import RubeGoldbergSequence from '~/components/RubeGoldbergSequence.vue'
import RubeGoldberg from '~/components/RubeGoldberg.vue'
import PageWarnings from '~/components/PageWarnings.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: var(--spacing-lg) 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}
</style>
