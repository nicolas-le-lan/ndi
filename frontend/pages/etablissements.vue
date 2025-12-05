<template>
  <div class="etablissements">
    <section class="hero">
      <div class="container">
        <h1>Les Établissements Rebelles</h1>
        <p class="subtitle">12 établissements pilotes à travers la France + DROM</p>
      </div>
    </section>

    <section class="container map-section">
      <div class="card map-placeholder">
        <h2>Carte de la résistance</h2>
        <p>Académies engagées : Grenoble • Lille • Lyon • Orléans-Tours • Rennes • Strasbourg • Toulouse • Polynésie française</p>
      </div>
    </section>

    <section class="container schools-section">
      <div class="academy-group">
        <h2>Académie de Grenoble (4 lycées)</h2>
        <div class="school-grid">
          <div class="card school-card"><h3>Lycée Jean Monnet</h3><p>Annemasse</p></div>
          <div class="card school-card"><h3>Lycée Marie Curie</h3><p>Échirolles</p></div>
          <div class="card school-card"><h3>Lycée Alain Borne</h3><p>Montélimar</p></div>
          <div class="card school-card"><h3>Lycée Vincent D'Indy</h3><p>Privas</p></div>
        </div>
      </div>

      <div class="academy-group">
        <h2>Autres établissements</h2>
        <div class="school-grid">
          <div class="card school-card special"><h3>Collège Les Cuvelles</h3><p>HackLab : 17 postes Linux</p></div>
          <div class="card school-card"><h3>Lycée Jean Lurçat</h3><p>Raspberry Pi</p></div>
          <div class="card school-card"><h3>Collège Uporu</h3><p>Polynésie française - "Nati Tumaoro"</p></div>
        </div>
      </div>
    </section>

    <section class="container highlight-section">
      <div class="card highlight-card">
        <h2>Cas d'usage : Ville de Blois</h2>
        <p class="tagline">"Résister à l'obsolescence programmée"</p>
        <div class="stats-grid">
          <div class="stat"><span class="num">34</span><span>écoles</span></div>
          <div class="stat"><span class="num">277</span><span>ordinateurs</span></div>
          <div class="stat"><span class="num">154</span><span>concernés par fin Windows 10</span></div>
          <div class="stat"><span class="num">50</span><span>PC déjà reconditionnés</span></div>
        </div>
        <blockquote>"La décision de Microsoft est un non-sens environnemental et un véritable diktat pour les collectivités." - Rachid Meress, Adjoint au numérique</blockquote>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Votre établissement veut rejoindre ?</h2>
        <div class="cta-buttons">
          <NuxtLink to="/demarche" class="btn btn-primary">La démarche en 3 étapes</NuxtLink>
          <NuxtLink to="/contribuer" class="btn btn-secondary">Lancer NIRD</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: var(--spacing-xl) 0; text-align: center; }
.hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: var(--spacing-sm); }
.subtitle { font-size: 1.2rem; opacity: 0.9; }
.map-section { margin: var(--spacing-xl) auto; }
.map-placeholder { text-align: center; padding: var(--spacing-xl); background: var(--color-grey); border: 1px solid #2a3050; color: var(--color-light); }
.map-placeholder h2 { color: var(--color-primary); margin-bottom: var(--spacing-md); }
.schools-section { margin: var(--spacing-xl) auto; }
.academy-group { margin-bottom: var(--spacing-xl); }
.academy-group h2 { color: var(--color-primary); margin-bottom: var(--spacing-lg); text-align: center; }
.school-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--spacing-md); }
.school-card { text-align: center; transition: var(--transition); }
.school-card:hover { transform: translateY(-5px); border-color: var(--color-primary); }
.school-card.special { background: var(--color-grey); border: 2px solid var(--color-primary); color: var(--color-light); }
.school-card h3 { color: var(--color-primary); margin-bottom: var(--spacing-xs); }
.highlight-section { margin: var(--spacing-xl) auto; }
.highlight-card { background: var(--color-grey); border: 2px solid var(--color-primary); text-align: center; color: var(--color-light); }
.tagline { font-style: italic; color: var(--color-secondary); margin-bottom: var(--spacing-lg); }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-md); margin: var(--spacing-lg) 0; }
.stat { display: flex; flex-direction: column; padding: var(--spacing-md); background: #2a3050; border-radius: var(--border-radius); color: var(--color-light); }
.stat .num { font-size: 2.5rem; font-weight: bold; color: var(--color-primary); }
blockquote { margin-top: var(--spacing-lg); padding: var(--spacing-md); border-left: 4px solid var(--color-primary); background: #2a3050; font-style: italic; color: var(--color-light); }
.cta-section { background: var(--color-grey); border-top: 2px solid var(--color-primary); color: white; padding: var(--spacing-xl) 0; text-align: center; margin-top: var(--spacing-xl); }
.cta-section h2 { font-size: 2.5rem; margin-bottom: var(--spacing-lg); color: var(--color-primary); }
.cta-buttons { display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; }
</style>
