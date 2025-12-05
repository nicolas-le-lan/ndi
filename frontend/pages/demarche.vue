<template>
  <div class="demarche">
    <section class="hero">
      <div class="container">
        <h1>La Démarche NIRD</h1>
        <p>Trois étapes simples pour transformer votre établissement</p>
      </div>
    </section>

    <section class="container jalons">
      <div class="jalon-item">
        <div class="card jalon-header level-1">
          <h2>1. MOBILISATION</h2>
          <p>Sensibiliser et initier une dynamique collective</p>
        </div>
        <div class="card jalon-content">
          <h3>Objectifs</h3>
          <p>Créer une prise de conscience collective</p>
          <h3>Actions</h3>
          <ul>
            <li>Désigner un prof volontaire</li>
            <li>Présenter à l'équipe éducative</li>
            <li>Rejoindre le forum Tchap</li>
            <li>Informer direction et collectivité</li>
          </ul>
        </div>
      </div>

      <div class="jalon-item">
        <div class="card jalon-header level-2">
          <h2>2. EXPÉRIMENTATION</h2>
          <p>Tester des solutions concrètes</p>
        </div>
        <div class="card jalon-content">
          <h3>Objectifs</h3>
          <p>Expérimenter Linux en conditions réelles</p>
          <h3>Actions</h3>
          <ul>
            <li>Installation de postes Linux</li>
            <li>Créer un club informatique</li>
            <li>Former enseignants et élèves</li>
            <li>Documenter l'expérience</li>
            <li>Impliquer la collectivité</li>
          </ul>
        </div>
      </div>

      <div class="jalon-item">
        <div class="card jalon-header level-3">
          <h2>3. INTÉGRATION</h2>
          <p>Inscrire durablement la démarche</p>
        </div>
        <div class="card jalon-content">
          <h3>Objectifs</h3>
          <p>Pérenniser NIRD institutionnellement</p>
          <h3>Actions</h3>
          <ul>
            <li>Inscription au projet d'établissement</li>
            <li>Intégration au parc informatique</li>
            <li>Valorisation communautaire</li>
            <li>Coopération collectivité</li>
            <li>Pérennisation budgétaire</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="container warning">
      <div class="card alert">
        <h2>Shadow Linux : l'ennemi</h2>
        <p>PC Linux installés "sauvagement" par un prof passionné. Disparaissent quand le prof part.</p>
        <p class="solution">Solution NIRD : Officialiser, pérenniser, obtenir le soutien institutionnel.</p>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>Prêt à lancer ?</h2>
        <div class="cta-buttons">
          <NuxtLink to="/etablissements" class="btn btn-primary">Voir les pilotes</NuxtLink>
          <NuxtLink to="/contribuer" class="btn btn-secondary">Lancer NIRD</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: var(--color-dark);
  border-bottom: 2px solid var(--color-primary);
  padding: var(--spacing-xl) 0;
}

.hero h1 { text-align: center; }

.jalons {
  padding: var(--spacing-xl) 0;
}

.jalon-item {
  margin-bottom: var(--spacing-lg);
}

.jalon-header {
  border-left: 4px solid var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.jalon-header.level-2 {
  border-left-color: var(--color-secondary);
}

.jalon-header.level-2 h2 {
  color: var(--color-secondary);
}

.jalon-header.level-3 {
  border-left-color: #ff9933;
}

.jalon-header.level-3 h2 {
  color: #ff9933;
}

.jalon-header h2 {
  margin-bottom: var(--spacing-xs);
}

.jalon-content ul {
  list-style: none;
  margin: var(--spacing-md) 0;
}

.jalon-content ul li {
  padding: 0.5rem 0 0.5rem var(--spacing-md);
  position: relative;
}

.jalon-content ul li::before {
  content: ">";
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

.warning {
  padding: var(--spacing-lg) 0;
}

.alert {
  border: 2px solid var(--color-danger);
  border-left: 4px solid var(--color-danger);
}

.alert h2 {
  color: var(--color-danger);
  margin-bottom: var(--spacing-sm);
}

.solution {
  color: var(--color-primary);
  font-weight: 600;
  margin-top: var(--spacing-md);
}

.cta {
  padding: var(--spacing-xl) 0;
  border-top: 1px solid #2a3050;
}

.cta h2 {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}
</style>
