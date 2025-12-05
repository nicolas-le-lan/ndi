<template>
  <div class="page-warnings" v-if="currentWarning">
    <div class="warning-banner" :class="`warning-${currentWarning.type}`">
      <div class="warning-content">
        <div class="warning-icon">
          <img :src="currentWarning.icon" :alt="currentWarning.title" :class="currentWarning.animation" />
        </div>
        <div class="warning-text">
          <h3>{{ currentWarning.title }}</h3>
          <p>{{ currentWarning.message }}</p>
          <div v-if="currentWarning.action" class="warning-action">
            <NuxtLink :to="currentWarning.action.link" :class="`btn btn-${currentWarning.action.type}`">
              {{ currentWarning.action.text }}
            </NuxtLink>
          </div>
        </div>
        <button class="warning-close" @click="closeWarning">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isClosed = ref(false)

const warnings = {
  'index': {
    type: 'critical',
    icon: 'https://cdn-icons-png.flaticon.com/512/6251/6251544.png',
    animation: 'icon-animated',
    title: '⚠️ Fin du support Windows 10 : Octobre 2025',
    message: '450€ par PC pour Windows 11, ou NIRD gratuitement avec 5-15 ans de plus',
    action: { text: 'Voir les solutions', link: '/demarche', type: 'danger' }
  },
  'demarche': {
    type: 'warning',
    icon: 'https://cdn-icons-png.flaticon.com/512/1995/1995467.png',
    animation: 'icon-spin',
    title: '🐧 Shadow Linux : L\'ennemi silencieux',
    message: 'Des profs installent Linux secrètement. Ça disparaît quand ils partent. NIRD officialise et pérennise.',
    action: { text: 'Lancer NIRD', link: '/contribuer', type: 'success' }
  },
  'contribuer': {
    type: 'danger',
    icon: 'https://cdn-icons-png.flaticon.com/512/2087/2087667.png',
    animation: 'icon-pulse',
    title: '💀 Cyberattaque massive prévue',
    message: '80% des lycées Hauts-de-France paralysés en octobre 2025. Fin Windows 10 = fin de la sécurité.',
    action: { text: 'Voir les établissements pilotes', link: '/etablissements', type: 'danger' }
  },
  'ressources': {
    type: 'info',
    icon: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png',
    animation: 'icon-animated',
    title: '📦 PrimTux : La distro éducative',
    message: 'Distribution Linux pensée pour l\'école. Téléchargez et testez maintenant.',
    action: null
  },
  'etablissements': {
    type: 'success',
    icon: 'https://cdn-icons-png.flaticon.com/512/995/995822.png',
    animation: 'icon-spin',
    title: '12 établissements pilotes engagés',
    message: 'Découvrez comment ces écoles ont transformé leurs parcs informatiques.',
    action: { text: 'Rejoindre', link: '/demarche', type: 'primary' }
  },
  'communaute': {
    type: 'info',
    icon: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
    animation: 'icon-pulse',
    title: '👥 Communauté NIRD : +5000 membres actifs',
    message: 'Enseignants, développeurs, collectivités. Partagez expériences et ressources.',
    action: { text: 'Forum Tchap', link: 'https://edurl.fr/tchap-laforgeedu-nird', type: 'primary' }
  }
}

const currentPage = computed(() => route.path.split('/').filter(Boolean)[0] || 'index')

const currentWarning = computed(() => {
  if (isClosed.value) return null
  return warnings[currentPage.value] || null
})

function closeWarning() {
  isClosed.value = true
}

// Réinitialiser quand on change de page
watch(() => currentPage.value, () => {
  isClosed.value = false
})
</script>

<style scoped>
.page-warnings {
  margin: var(--spacing-lg) 0;
  animation: slideIn 0.4s ease-out;
}

.warning-banner {
  border-left: 5px solid;
  border-radius: 8px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  position: relative;
  max-width: 100%;
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Each warning banner gets a unique, fast, desynchronized glitch */
.warning-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  border-radius: 8px;
  opacity: 0;
}

/* UNIQUE glitch animations per banner */
.warning-banner:nth-child(1)::before {
  animation: glitch1 0.03s infinite;
}

.warning-banner:nth-child(2)::before {
  animation: glitch2 0.035s infinite;
}

.warning-banner:nth-child(3)::before {
  animation: glitch3 0.025s infinite;
}

/* Each glitch has DIFFERENT timing and pattern */
@keyframes glitch1 {
  0% { opacity: 0; transform: translateX(0); }
  25% { opacity: 0.12; transform: translateX(-3px); background: rgba(255, 0, 0, 0.15); }
  50% { opacity: 0; transform: translateX(0); }
  75% { opacity: 0.1; transform: translateX(2px); background: rgba(255, 100, 0, 0.1); }
  100% { opacity: 0; transform: translateX(0); }
}

@keyframes glitch2 {
  0% { opacity: 0; transform: translateX(0); }
  30% { opacity: 0.15; transform: translateX(2px); background: rgba(0, 255, 100, 0.12); }
  60% { opacity: 0.08; transform: translateX(-2px); }
  100% { opacity: 0; transform: translateX(0); }
}

@keyframes glitch3 {
  0% { opacity: 0; transform: translateX(0); }
  20% { opacity: 0.1; transform: translateX(-2px); background: rgba(100, 0, 255, 0.13); }
  40% { opacity: 0.13; transform: translateX(3px); }
  70% { opacity: 0.07; transform: translateX(-1px); }
  100% { opacity: 0; transform: translateX(0); }
}

.warning-content {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  position: relative;
  z-index: 1;
}

.warning-icon {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
}

.warning-icon img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  animation: iconFlicker 0.08s infinite;
}

@keyframes iconFlicker {
  0%, 100% { opacity: 1; }
  25% { opacity: 0.7; }
  50% { opacity: 1; }
  75% { opacity: 0.8; }
}

.warning-text {
  flex: 1;
  position: relative;
  z-index: 1;
}

.warning-text h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  animation: textGlitch 0.06s infinite;
}

@keyframes textGlitch {
  0%, 100% { text-shadow: 0 0 0 transparent; }
  50% { text-shadow: 2px 0 0 rgba(255, 0, 0, 0.3), -2px 0 0 rgba(0, 255, 255, 0.3); }
}

.warning-text p {
  margin: 0 0 1rem 0;
  opacity: 0.95;
}

.warning-action {
  display: flex;
  gap: 0.5rem;
}

.warning-close {
  flex-shrink: 0;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.warning-close:hover {
  opacity: 1;
}

/* Warning types */
.warning-critical {
  background: linear-gradient(135deg, rgba(255, 51, 51, 0.15), rgba(255, 100, 100, 0.05));
  border-left-color: #ff3333;
  color: #fff;
}

.warning-critical .warning-icon {
  background: rgba(255, 51, 51, 0.2);
}

.warning-critical h3 {
  color: #ff6666;
}

.warning-warning {
  background: linear-gradient(135deg, rgba(0, 208, 132, 0.15), rgba(0, 255, 160, 0.05));
  border-left-color: var(--color-primary);
  color: #fff;
}

.warning-warning .warning-icon {
  background: rgba(0, 208, 132, 0.2);
}

.warning-warning h3 {
  color: var(--color-primary);
}

.warning-danger {
  background: linear-gradient(135deg, rgba(255, 0, 100, 0.2), rgba(100, 0, 200, 0.1));
  border-left-color: #ff00ff;
  color: #fff;
  animation: pulseBorder 2s infinite;
}

@keyframes pulseBorder {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 0, 255, 0.3); }
  50% { box-shadow: 0 0 20px 10px rgba(255, 0, 255, 0.1); }
}

.warning-danger .warning-icon {
  background: rgba(255, 0, 255, 0.2);
}

.warning-danger h3 {
  color: #ff66ff;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.warning-info {
  background: linear-gradient(135deg, rgba(0, 153, 204, 0.15), rgba(0, 200, 255, 0.05));
  border-left-color: var(--color-secondary);
  color: #fff;
}

.warning-info .warning-icon {
  background: rgba(0, 153, 204, 0.2);
}

.warning-info h3 {
  color: var(--color-secondary);
}

.warning-success {
  background: linear-gradient(135deg, rgba(0, 208, 132, 0.2), rgba(100, 255, 180, 0.1));
  border-left-color: var(--color-primary);
  color: #fff;
}

.warning-success .warning-icon {
  background: rgba(0, 208, 132, 0.2);
}

.warning-success h3 {
  color: var(--color-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .warning-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .warning-icon {
    width: 60px;
    height: 60px;
  }

  .warning-icon img {
    width: 45px;
    height: 45px;
  }

  .warning-action {
    justify-content: center;
    width: 100%;
  }

  .warning-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
