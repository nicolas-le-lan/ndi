<template>
  <div class="ressources">
    <section class="hero">
      <div class="container">
        <h1>Ressources & Outils</h1>
        <p class="subtitle">Distributions Linux, logiciels libres et guides pratiques</p>
      </div>
    </section>

    <section class="container distros-section">
      <h2 class="section-title">Les distributions NIRD</h2>
      <div class="distro-grid">
        <div class="card distro-card">
          <div class="distro-badge">Primaire</div>
          <h3>PrimTux</h3>
          <p class="distro-desc">Conçue par et pour des enseignants</p>
          <ul class="feature-list">
            <li>Profils adaptés (cycles 1, 2, 3)</li>
            <li>Applications éducatives intégrées</li>
            <li>Contrôle parental QwantJunior</li>
            <li>Communauté active</li>
          </ul>
          <div class="cities">
            <strong>Villes utilisatrices :</strong> Lyon, Blois, Caudry
          </div>
          <a href="https://primtux.fr" class="btn btn-primary" target="_blank">primtux.fr</a>
        </div>

        <div class="card distro-card">
          <div class="distro-badge">Secondaire</div>
          <h3>Distribution NIRD</h3>
          <p class="distro-desc">Version 0.1 créée par le lycée Carnot</p>
          <ul class="feature-list">
            <li>Basée sur Linux Mint</li>
            <li>Spécialité NSI incluse</li>
            <li>Utilisable sur clé USB</li>
            <li>Compte : eleve/eleve</li>
          </ul>
          <div class="download-info">
            <strong>Installation :</strong> PC neuf ou reconditionné
          </div>
          <NuxtLink to="/etablissements" class="btn btn-secondary">Voir les établissements</NuxtLink>
        </div>
      </div>
    </section>

    <section class="container software-section">
      <h2 class="section-title">Logiciels libres recommandés</h2>
      <div class="software-grid">
        <div class="card software-category">
          <h3>Bureautique</h3>
          <ul>
            <li>LibreOffice (suite complète)</li>
            <li>Firefox (navigateur)</li>
            <li>Thunderbird (email)</li>
          </ul>
        </div>
        <div class="card software-category">
          <h3>Éducation</h3>
          <ul>
            <li>Moodle (plateforme d'apprentissage)</li>
            <li>Anki (mémorisation espacée)</li>
            <li>GeoGebra (mathématiques)</li>
          </ul>
        </div>
        <div class="card software-category">
          <h3>Création</h3>
          <ul>
            <li>GIMP (retouche photo)</li>
            <li>Inkscape (dessin vectoriel)</li>
            <li>OBS Studio (vidéo)</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="container links-section">
      <h2 class="section-title">Liens essentiels</h2>
      <div class="links-grid">
        <a href="https://nird.forge.apps.education.fr" class="card link-card" target="_blank">
          <div class="link-icon"></div>
          <h3>Site officiel NIRD</h3>
        </a>
        <a href="https://forge.apps.education.fr" class="card link-card" target="_blank">
          <div class="link-icon"></div>
          <h3>Forge des Communs</h3>
        </a>
        <a href="https://sill.code.gouv.fr" class="card link-card" target="_blank">
          <div class="link-icon"></div>
          <h3>SILL</h3>
        </a>
        <a href="https://cnll.fr" class="card link-card" target="_blank">
          <div class="link-icon"></div>
          <h3>CNLL</h3>
        </a>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>Prêt à tester Linux ?</h2>
        <p>Téléchargez PrimTux ou contactez un établissement pilote</p>
        <div class="cta-buttons">
          <a href="https://primtux.fr" class="btn btn-primary" target="_blank">Télécharger PrimTux</a>
          <NuxtLink to="/etablissements" class="btn btn-secondary">Établissements pilotes</NuxtLink>
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
.distros-section { margin: var(--spacing-xl) auto; }
.distro-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--spacing-lg); }
.distro-card { position: relative; padding-top: calc(var(--spacing-lg) + 2rem); }
.distro-badge { position: absolute; top: var(--spacing-md); right: var(--spacing-md); background: var(--color-primary); color: var(--color-dark); padding: 0.5rem 1rem; border-radius: 999px; font-weight: bold; font-size: 0.9rem; }
.distro-card h3 { color: var(--color-primary); font-size: 1.8rem; margin-bottom: var(--spacing-sm); }
.distro-desc { font-style: italic; color: var(--color-secondary); margin-bottom: var(--spacing-md); }
.feature-list { list-style: none; margin: var(--spacing-md) 0; color: var(--color-light); }
.feature-list li { padding: var(--spacing-xs) 0; }
.cities, .download-info { background: #2a3050; padding: var(--spacing-sm); border-radius: var(--border-radius); margin: var(--spacing-md) 0; color: var(--color-light); border: 1px solid var(--color-primary); }
.software-section { margin: var(--spacing-xl) auto; }
.software-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg); }
.software-category { text-align: center; }
.software-category h3 { color: var(--color-primary); margin-bottom: var(--spacing-md); }
.software-category ul { list-style: none; text-align: left; }
.software-category ul li { padding: var(--spacing-xs) 0; padding-left: var(--spacing-md); position: relative; color: var(--color-light); }
.software-category ul li::before { content: "→"; position: absolute; left: 0; color: var(--color-primary); }
.links-section { margin: var(--spacing-xl) auto; }
.links-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--spacing-lg); }
.link-card { text-decoration: none; color: var(--color-light); text-align: center; transition: var(--transition); }
.link-card:hover { transform: scale(1.05); border-color: var(--color-primary); }
.link-icon { font-size: 3rem; margin-bottom: var(--spacing-sm); }
.link-card h3 { color: var(--color-primary); }
.cta-section { background: var(--color-grey); border-top: 2px solid var(--color-primary); color: white; padding: var(--spacing-xl) 0; text-align: center; margin-top: var(--spacing-xl); }
.cta-section h2 { font-size: 2.5rem; margin-bottom: var(--spacing-md); color: var(--color-primary); }
.cta-section p { font-size: 1.2rem; margin-bottom: var(--spacing-lg); }
.cta-buttons { display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; }

/*style rétro*/
/*typo rétro*/
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

/*nouveau style*/
:root {
  --color-primary: #FFFF00;
  --color-secondary: #00A2E8;
  --color-accent: #FF0000;
  --color-dark: #FFFFFF;
  --color-light: #000000;
  --color-interaction: #FFA500;

  --border-radius: 0px;

  --undertale-border: 4px;
}

body, .container {
  background-color: #000 !important;
  color: #fff !important;
  font-family: 'VT323', monospace;
  font-size: 1.4rem;
  letter-spacing: 1px;
}

h1, h2, h3, h4 {
  font-family: 'Press Start 2P', cursive;
  text-transform: uppercase;
  color: #fff;
  line-height: 1.6;
}

header, .header-bandeau {
  background-color: #000;
  border-bottom: 4px solid #fff;
  padding: var(--spacing-md) 0;
  text-align: center;
}

header h1, .header-title {
  font-family: 'Press Start 2P';
  font-size: 2rem;
  letter-spacing: 4px;
  text-shadow: 4px 4px 0 #333;
  margin: 0;
}

.card, .distro-card, .software-category {
  background: #000 !important;
  border: var(--undertale-border) !important;
  box-shadow: none !important;
  color: #fff;
  margin-bottom: var(--spacing-lg);
  position: relative;
}

.btn, button, .cta-buttons a {
  background: #000 !important;
  color: #FFA500 !important;
  border: 2px solid #FFA500 !important;
  font-family: 'Press Start 2P';
  font-size: 1rem;
  padding: 15px, 30px;
  text-transform: uppercase;
  position: relative;
  transition: none;
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16"><path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/></svg>');
}

.btn:hover::before {
  content: "❤";
  color: var(--color-accent);
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  animation: pulse 1s infinite;
}



@keyframes blink {
  0% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.2); }
  100% { transform: translateY(-50%) scale(1); }
}

.dialog-box {
  border: 4px solid white;
  border-radius: 10px;
  padding: 20px;
  font-family: 'VT323';
  font-size: 1.5rem;
  position: relative;
}
.dialog-box::after {
  content: "*";
  position: absolute;
  left: 10px;
  top: 20px;
}
.dialog-content {
  margin-left: 20px;
}

.distro-badge {
  background: transparent !important;
  color: #fff !important;
  font-family: 'Press Start 2P';
  font-size: 0.8rem;
  border: none;
}

.distro-badge::before {
  content: "LV ";
  color: #fff;
}
.distro-badge::after {
  content: " HP 20/20";
  color: var(--color-primary);
}

</style>
