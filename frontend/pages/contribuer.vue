<template>
  <div class="contribuer">
    <section class="hero">
      <div class="container">
        <h1>Rejoindre la Résistance</h1>
        <p class="subtitle">Enseignants, élèves, développeurs, collectivités : il y a une place pour vous !</p>
      </div>
    </section>

    <section class="container roles-section">
      <h2 class="section-title">Comment contribuer selon votre profil ?</h2>
      <div class="roles-grid">
        <div class="card role-card">
          <div class="role-icon"></div>
          <h3>Enseignants</h3>
          <ul>
            <li>Devenir coordinateur NIRD</li>
            <li>Sensibiliser vos collègues</li>
            <li>Créer un club informatique</li>
            <li>Former les élèves au reconditionnement</li>
          </ul>
          <a href="mailto:romain.debailleul@ac-lille.fr" class="btn btn-secondary">Contacter le pionnier</a>
        </div>

        <div class="card role-card">
          <div class="role-icon"></div>
          <h3>Élèves</h3>
          <ul>
            <li>Rejoindre le club informatique</li>
            <li>Reconditionner des PC</li>
            <li>Tester Linux et donner votre avis</li>
            <li>Promouvoir NIRD auprès d'autres élèves</li>
          </ul>
        </div>

        <div class="card role-card">
          <div class="role-icon"></div>
          <h3>Développeurs</h3>
          <ul>
            <li>Contribuer au code sur GitLab</li>
            <li>Améliorer les distributions</li>
            <li>Créer des tutoriels techniques</li>
            <li>Support technique communauté</li>
          </ul>
          <a href="https://forge.apps.education.fr/nird" class="btn btn-secondary" target="_blank">GitLab NIRD</a>
        </div>

        <div class="card role-card">
          <div class="role-icon"></div>
          <h3>Collectivités</h3>
          <ul>
            <li>Faciliter l'intégration technique</li>
            <li>Financer le reconditionnement</li>
            <li>Former les personnels techniques</li>
            <li>Mettre en réseau les acteurs locaux</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="container circle-section">
      <div class="card circle-card">
        <h2>Le cercle vertueux du reconditionnement</h2>
        <p class="circle-desc">Les élèves reconditionnent → équipent d'autres élèves/écoles</p>
        <div class="circle-benefits">
          <div class="benefit-item">
            <strong>Pédagogique</strong>
            <p>Culture numérique complète, dimensions sociales et éthiques</p>
          </div>
          <div class="benefit-item">
            <strong>Social</strong>
            <p>Équiper les familles non équipées, réduire la fracture numérique</p>
          </div>
          <div class="benefit-item">
            <strong>Écologique</strong>
            <p>+5-10 ans de vie, lutte contre l'obsolescence programmée</p>
          </div>
        </div>
        <div class="destinations">
          <h3>Destinations des PC reconditionnés :</h3>
          <div class="dest-grid">
            <div class="dest-item">Parc de l'établissement</div>
            <div class="dest-item">Familles non équipées</div>
            <div class="dest-item">Écoles primaires voisines</div>
            <div class="dest-item">Prêt/don aux familles</div>
          </div>
        </div>
      </div>
    </section>

    <section class="container platforms-section">
      <h2 class="section-title">Rejoindre la communauté</h2>
      <div class="platforms-grid">
        <div class="card platform-card">
          <div class="platform-icon"></div>
          <h3>Forum Tchap</h3>
          <p>Discussions, support technique, retours d'expérience</p>
          <div class="platform-link">edurl.fr/tchap-laforgeedu-nird</div>
        </div>
        <div class="card platform-card">
          <div class="platform-icon"></div>
          <h3>Mastodon</h3>
          <p>Actualités, événements, inspirations</p>
          <a href="https://mastodon.mim-libre.fr/@demarchenird" target="_blank">@demarchenird</a>
        </div>
        <div class="card platform-card">
          <div class="platform-icon"></div>
          <h3>GitLab</h3>
          <p>Code source, bugs, contributions techniques</p>
          <a href="https://forge.apps.education.fr/nird" target="_blank">forge.apps.education.fr/nird</a>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>"Former des citoyens, pas des consommateurs"</h2>
        <p>Prêt à lancer NIRD dans votre établissement ?</p>
        <div class="cta-buttons">
          <NuxtLink to="/demarche" class="btn btn-primary">La démarche en 3 étapes</NuxtLink>
          <NuxtLink to="/etablissements" class="btn btn-secondary">Voir les pionniers</NuxtLink>
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
.roles-section { margin: var(--spacing-xl) auto; }
.roles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-lg); }
.role-card { text-align: center; }
.role-icon { font-size: 4rem; margin-bottom: var(--spacing-md); }
.role-card h3 { color: var(--color-primary); margin-bottom: var(--spacing-md); }
.role-card ul { list-style: none; text-align: left; margin-bottom: var(--spacing-md); }
.role-card ul li { padding: var(--spacing-xs) 0; padding-left: var(--spacing-md); position: relative; color: var(--color-light); }
.role-card ul li::before { content: "→"; position: absolute; left: 0; color: var(--color-primary); }
.circle-section { margin: var(--spacing-xl) auto; }
.circle-card { background: var(--color-grey); border: 2px solid var(--color-primary); text-align: center; color: var(--color-light); }
.circle-card h2 { color: var(--color-primary); margin-bottom: var(--spacing-md); }
.circle-desc { font-size: 1.2rem; font-style: italic; color: var(--color-secondary); margin-bottom: var(--spacing-lg); }
.circle-benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-lg); }
.benefit-item { padding: var(--spacing-md); background: #2a3050; border-radius: var(--border-radius); text-align: left; color: var(--color-light); border: 1px solid var(--color-primary); }
.benefit-item strong { display: block; color: var(--color-primary); margin-bottom: var(--spacing-xs); }
.destinations { margin-top: var(--spacing-lg); }
.destinations h3 { color: var(--color-primary); margin-bottom: var(--spacing-md); }
.dest-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-sm); }
.dest-item { padding: var(--spacing-sm); background: #2a3050; border-radius: var(--border-radius); color: var(--color-light); border: 1px solid var(--color-primary); }
.platforms-section { margin: var(--spacing-xl) auto; }
.platforms-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-lg); }
.platform-card { text-align: center; }
.platform-icon { font-size: 3rem; margin-bottom: var(--spacing-md); }
.platform-card h3 { color: var(--color-primary); margin-bottom: var(--spacing-sm); }
.platform-link { background: #2a3050; padding: var(--spacing-sm); border-radius: var(--border-radius); margin-top: var(--spacing-sm); font-family: monospace; color: var(--color-light); border: 1px solid var(--color-primary); }
.cta-section { background: var(--color-grey); border-top: 2px solid var(--color-primary); color: white; padding: var(--spacing-xl) 0; text-align: center; margin-top: var(--spacing-xl); }
.cta-section h2 { font-size: 2.5rem; margin-bottom: var(--spacing-md); color: var(--color-primary); }
.cta-section p { font-size: 1.2rem; margin-bottom: var(--spacing-lg); }
.cta-buttons { display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; }
</style>
