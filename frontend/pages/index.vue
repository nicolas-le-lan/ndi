<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Numérique Inclusif Responsable Durable</h1>
        <p class="hero-subtitle">Libérez les écoles du diktat propriétaire</p>
        <div class="cta-buttons">
          <NuxtLink to="/demarche" class="btn btn-primary">Démarrer</NuxtLink>
          <NuxtLink to="/etablissements" class="btn btn-secondary">Établissements</NuxtLink>
        </div>
      </div>
    </section>

    <section class="urgency">
      <div class="container">
        <div class="card alert-box">
          <h2>Octobre 2025 : Cyberattaque massive</h2>
          <p>80% des lycées des Hauts-de-France paralysés. Fin du support Windows 10.</p>
          <p class="highlight">Il est temps de changer de paradigme.</p>
        </div>
      </div>
    </section>

    <section class="missions">
      <div class="container">
        <h2>Les 3 piliers de NIRD</h2>
        <div class="mission-grid">
          <div class="card mission-card">
            <h3>INCLUSIF</h3>
            <p>Réduire la fracture numérique • Équiper sans ordinateur • Accessibilité</p>
          </div>
          <div class="card mission-card">
            <h3>RESPONSABLE</h3>
            <p>Liberté logicielle • Protection données • Former des citoyens</p>
          </div>
          <div class="card mission-card">
            <h3>DURABLE</h3>
            <p>0-50€ vs 450€ • 5-10 ans de plus • Zéro gaspillage</p>
          </div>
        </div>
      </div>
    </section>

    <section class="comparison">
      <div class="container">
        <h2>Le calcul simple</h2>
        <div class="comparison-grid">
          <div class="card comp-bad">
            <h3>Propriétaire</h3>
            <p>PC neuf : 450€</p>
            <p>Durée : 3-5 ans</p>
            <p>Licences : obligatoires</p>
            <p><strong>Total : 450€+</strong></p>
          </div>
          <div class="card comp-good">
            <h3>NIRD (Libre)</h3>
            <p>PC reconditionné : 0-50€</p>
            <p>Durée : 8-15 ans</p>
            <p>Licences : zéro</p>
            <p><strong>Total : 50€ max</strong></p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-final">
      <div class="container">
        <h2>Prêt à rejoindre ?</h2>
        <div class="cta-links">
          <NuxtLink to="/demarche" class="card link-item">Comprendre la démarche</NuxtLink>
          <NuxtLink to="/contribuer" class="card link-item">Lancer NIRD</NuxtLink>
          <NuxtLink to="/etablissements" class="card link-item">Voir les pilotes</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// REMOVED: import WarningBanner
</script>

<style scoped>
.hero {
  background: var(--color-dark);
  border-bottom: 2px solid var(--color-primary);
  padding: var(--spacing-xl) 0;
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-mono);
}

.hero-subtitle {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-lg);
  opacity: 0.8;
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.urgency {
  padding: var(--spacing-lg) 0;
}

.alert-box {
  border: 2px solid var(--color-danger);
}

.alert-box h2 {
  color: var(--color-danger);
}

.highlight {
  color: var(--color-primary);
  font-weight: 600;
}

.missions {
  padding: var(--spacing-lg) 0;
  border-top: 1px solid #2a3050;
}

.missions h2 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.mission-card h3 {
  margin-bottom: var(--spacing-sm);
}

.comparison {
  padding: var(--spacing-lg) 0;
  border-top: 1px solid #2a3050;
}

.comparison h2 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.comp-bad {
  border-color: var(--color-danger);
}

.comp-bad h3 {
  color: var(--color-danger);
}

.comp-good {
  border-color: var(--color-primary);
}

.comp-good h3 {
  color: var(--color-primary);
}

.cta-final {
  padding: var(--spacing-lg) 0;
  border-top: 1px solid #2a3050;
}

.cta-final h2 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.cta-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.link-item {
  padding: var(--spacing-lg);
  text-align: center;
  transition: var(--transition);
}

.link-item:hover {
  border-color: var(--color-primary);
}
</style>
