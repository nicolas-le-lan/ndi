<template>
  <div class="communaute">
    <section class="hero">
      <div class="container">
        <h1>La Communauté NIRD</h1>
        <p class="subtitle">Une communauté vivante d'enseignants, élèves, développeurs et citoyens engagés</p>
      </div>
    </section>

    <section class="container stats-section">
      <div class="stats-grid">
        <div class="card stat-card">
          <div class="stat-icon"></div>
          <div class="stat-number">12+</div>
          <div class="stat-label">Établissements pilotes</div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon"></div>
          <div class="stat-number">8</div>
          <div class="stat-label">Académies engagées</div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon"></div>
          <div class="stat-number">132</div>
          <div class="stat-label">PC reconditionnés (Carnot)</div>
        </div>
        <div class="card stat-card">
          <div class="stat-icon"></div>
          <div class="stat-number">250</div>
          <div class="stat-label">Participants Journée du Libre</div>
        </div>
      </div>
    </section>

    <section class="container support-section">
      <h2 class="section-title">Soutiens institutionnels</h2>
      <div class="support-grid">
        <div class="card support-card">
          <h3>CNLL</h3>
          <p>Union des entreprises du logiciel libre</p>
          <p class="support-desc">Soutien officiel novembre 2025 • Facilitation partenariats • Appel aux collectivités</p>
          <a href="https://cnll.fr" target="_blank" class="btn btn-secondary">cnll.fr</a>
        </div>
        <div class="card support-card">
          <h3>Direction du Numérique pour l'Éducation</h3>
          <p>Ministère de l'Éducation nationale</p>
          <p class="support-desc">Stratégie 2023-2027 • Forge des communs • SILL (Socle Interministériel Logiciels Libres)</p>
        </div>
        <div class="card support-card">
          <h3>APRIL</h3>
          <p>Association promotion logiciel libre</p>
          <p class="support-desc">Promotion du logiciel libre et des standards ouverts</p>
          <a href="https://www.april.org" target="_blank" class="btn btn-secondary">april.org</a>
        </div>
      </div>
    </section>

    <section class="container events-section">
      <h2 class="section-title">Événements & Rencontres</h2>
      <div class="events-grid">
        <div class="card event-card">
          <div class="event-icon"></div>
          <h3>Formations</h3>
          <p>Ateliers sur Linux, le reconditionnement, l'administration système</p>
        </div>
        <div class="card event-card">
          <div class="event-icon"></div>
          <h3>Install Parties</h3>
          <p>Sessions collectives d'installation de distributions Linux NIRD</p>
        </div>
        <div class="card event-card">
          <div class="event-icon"></div>
          <h3>Webinaires</h3>
          <p>Conférences en ligne sur les enjeux du numérique responsable</p>
        </div>
        <div class="card event-card">
          <div class="event-icon"></div>
          <h3>Rencontres régionales</h3>
          <p>Rassemblements des établissements pilotes par académie</p>
        </div>
      </div>
    </section>

    <section class="container testimony-section">
      <h2 class="section-title">Ils témoignent</h2>
      <div class="testimony-grid">
        <div class="card testimony-card">
          <div class="testimony-quote">"</div>
          <p>La démarche NIRD nous a permis de redonner vie à des dizaines d'ordinateurs tout en sensibilisant nos élèves aux enjeux environnementaux.</p>
          <div class="testimony-author">
            <strong>Lycée Carnot</strong>
            <span>Établissement pionnier</span>
          </div>
        </div>
        <div class="card testimony-card">
          <div class="testimony-quote">"</div>
          <p>Grâce à Linux NIRD, nous avons pu former nos enseignants et déployer des postes performants sans coût de licence.</p>
          <div class="testimony-author">
            <strong>Académie de Lyon</strong>
            <span>Établissement pilote</span>
          </div>
        </div>
        <div class="card testimony-card">
          <div class="testimony-quote">"</div>
          <p>Le forum Tchap est une ressource précieuse. L'entraide nous aide à progresser rapidement.</p>
          <div class="testimony-author">
            <strong>Enseignant NSI</strong>
            <span>Membre actif</span>
          </div>
        </div>
      </div>
    </section>

    <section class="container resources-section">
      <h2 class="section-title">Ressources communautaires</h2>
      <div class="resources-grid">
        <div class="card resource-card">
          <h3>Forum Tchap</h3>
          <p>5000+ dépôts • Ressources éducatives libres • Support ministère</p>
          <div class="resource-link">edurl.fr/tchap-laforgeedu-nird</div>
        </div>
        <div class="card resource-card">
          <h3>Forge des Communs</h3>
          <p>Infrastructure pour le développement et le partage</p>
          <a href="https://forge.apps.education.fr" target="_blank">forge.apps.education.fr</a>
        </div>
        <div class="card resource-card">
          <h3>Association PrimTux</h3>
          <p>Webinaires de formation • Documentation • Support pédagogique</p>
          <a href="https://primtux.fr" target="_blank">primtux.fr</a>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Rejoignez la communauté NIRD !</h2>
        <p>Ensemble, construisons un numérique inclusif, responsable et durable</p>
        <div class="cta-buttons">
          <div class="cta-link-box">
            <strong>Forum Tchap</strong>
            <p>edurl.fr/tchap-laforgeedu-nird</p>
          </div>
          <a href="https://mastodon.mim-libre.fr/@demarchenird" class="btn btn-primary" target="_blank">
            Suivre sur Mastodon
          </a>
          <a href="https://forge.apps.education.fr/nird" class="btn btn-secondary" target="_blank">
            GitLab NIRD
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { background: var(--color-dark); border-bottom: 2px solid var(--color-primary); color: white; padding: var(--spacing-xl) 0; text-align: center; }
.hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: var(--spacing-sm); }
.subtitle { font-size: 1.2rem; opacity: 0.9; }
.section-title { text-align: center; color: var(--color-primary); font-size: 2rem; margin: var(--spacing-xl) 0 var(--spacing-lg); }
.stats-section { margin: var(--spacing-xl) auto; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-lg); }
.stat-card { text-align: center; padding: var(--spacing-lg); }
.stat-icon { font-size: 3rem; margin-bottom: var(--spacing-sm); }
.stat-number { font-size: 3rem; font-weight: bold; color: var(--color-primary); margin-bottom: var(--spacing-xs); }
.stat-label { color: var(--color-light); }
.support-section { margin: var(--spacing-xl) auto; }
.support-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg); }
.support-card { text-align: center; }
.support-card h3 { color: var(--color-primary); margin-bottom: var(--spacing-sm); font-size: 1.3rem; }
.support-desc { font-size: 0.95rem; opacity: 0.8; margin: var(--spacing-md) 0; color: var(--color-light); }
.events-section { margin: var(--spacing-xl) auto; }
.events-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); }
.event-card { text-align: center; }
.event-icon { font-size: 3rem; margin-bottom: var(--spacing-md); }
.event-card h3 { color: var(--color-primary); margin-bottom: var(--spacing-sm); }
.testimony-section { margin: var(--spacing-xl) auto; }
.testimony-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg); }
.testimony-card { background: var(--color-grey); position: relative; padding-top: var(--spacing-xl); color: var(--color-light); border: 1px solid #2a3050; }
.testimony-quote { position: absolute; top: var(--spacing-md); left: var(--spacing-md); font-size: 4rem; color: var(--color-primary); opacity: 0.2; }
.testimony-card p { font-style: italic; margin-bottom: var(--spacing-md); }
.testimony-author { text-align: right; padding-top: var(--spacing-md); border-top: 1px solid var(--color-primary); }
.testimony-author strong { display: block; color: var(--color-primary); }
.testimony-author span { font-size: 0.9rem; opacity: 0.8; color: var(--color-light); }
.resources-section { margin: var(--spacing-xl) auto; }
.resources-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-lg); }
.resource-card { text-align: center; }
.resource-card h3 { color: var(--color-primary); margin-bottom: var(--spacing-md); }
.resource-link { background: #2a3050; padding: var(--spacing-sm); border-radius: var(--border-radius); margin-top: var(--spacing-md); font-family: monospace; color: var(--color-light); }
.cta-section { background: var(--color-grey); border-top: 2px solid var(--color-primary); color: white; padding: var(--spacing-xl) 0; text-align: center; margin-top: var(--spacing-xl); }
.cta-section h2 { font-size: 2.5rem; margin-bottom: var(--spacing-md); color: var(--color-primary); }
.cta-section p { font-size: 1.2rem; margin-bottom: var(--spacing-lg); }
.cta-buttons { display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; align-items: center; }
.cta-link-box { background: #2a3050; padding: var(--spacing-md); border-radius: var(--border-radius); border: 1px solid var(--color-primary); }
.cta-link-box strong { display: block; margin-bottom: var(--spacing-xs); color: var(--color-primary); }
.cta-link-box p { margin: 0; font-family: monospace; color: var(--color-light); }
</style>
