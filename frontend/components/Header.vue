<template>
  <header class="header">
    <nav class="navbar container">
      <NuxtLink to="/" class="logo">NIRD</NuxtLink>
      <button class="menu-toggle" @click="toggleMenu">☰</button>
      <ul class="nav-links" :class="{ active: isMenuOpen }">
        <li><NuxtLink to="/">Accueil</NuxtLink></li>
        <li><NuxtLink to="/demarche">Démarche</NuxtLink></li>
        <li><NuxtLink to="/etablissements">Établissements</NuxtLink></li>
        <li><NuxtLink to="/contribuer">Contribuer</NuxtLink></li>
        <li><NuxtLink to="/ressources">Ressources</NuxtLink></li>
        <li><NuxtLink to="/communaute">Communauté</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const isMenuOpen = ref(false)
const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value }
</script>

<style scoped>
.header {
  background: var(--color-grey);
  border-bottom: 1px solid #2a3050;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-primary);
  text-decoration: none;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--color-light);
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: var(--color-light);
  text-decoration: none;
  font-size: 0.95rem;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .menu-toggle { display: block; }
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-grey);
    flex-direction: column;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  .nav-links.active { max-height: 400px; }
  .nav-links li { border-bottom: 1px solid #2a3050; }
  .nav-links a { display: block; padding: 1rem; }
}
</style>
