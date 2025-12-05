<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>NIRD</h3>
          <p>Numérique Inclusif, Responsable et Durable</p>
        </div>
        <div>
          <h3>Liens</h3>
          <ul>
            <li><NuxtLink to="/demarche">Démarche</NuxtLink></li>
            <li><NuxtLink to="/etablissements">Établissements</NuxtLink></li>
            <li><NuxtLink to="/ressources">Ressources</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3>Communauté</h3>
          <ul>
            <li><a href="https://forge.apps.education.fr/nird" target="_blank">GitLab</a></li>
            <li><a href="https://mastodon.mim-libre.fr/@demarchenird" target="_blank">Mastodon</a></li>
          </ul>
        </div>
      </div>
      <p class="footer-bottom">&copy; {{ new Date().getFullYear() }} NIRD - CC BY 4.0</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.footer {
  background: var(--color-grey);
  border-top: 1px solid #2a3050;
  padding: var(--spacing-lg) 0;
  margin-top: var(--spacing-xl);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.footer-grid h3 {
  margin-bottom: var(--spacing-sm);
}

.footer-grid ul {
  list-style: none;
}

.footer-grid ul li {
  margin-bottom: var(--spacing-xs);
}

.footer-bottom {
  text-align: center;
  opacity: 0.6;
  border-top: 1px solid #2a3050;
  padding-top: var(--spacing-md);
}
</style>
