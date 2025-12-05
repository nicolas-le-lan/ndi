<template>
  <div class="goldberg-wrapper">
    <!-- Overlay de la machine -->
    <div v-if="machineActive" class="goldberg-overlay" @click.stop>
      <div class="machine-container">
        <h2 class="machine-title">{{ currentStep.title }}</h2>
        <p class="machine-subtitle">{{ currentStep.subtitle }}</p>

        <!-- Visualisation de la chaîne -->
        <div class="chain-visual">
          <div
            v-for="(step, i) in currentSequence"
            :key="i"
            class="chain-step"
            :class="{ active: i === currentStepIndex, done: i < currentStepIndex }"
          >
            <span class="step-icon">{{ step.icon }}</span>
            <span class="step-arrow" v-if="i < currentSequence.length - 1">→</span>
          </div>
        </div>

        <!-- Animation de l'étape actuelle -->
        <div class="step-animation">
          <!-- Cookie consent -->
          <div v-if="currentStep.type === 'cookie'" class="anim-cookie">
            <div class="cookie-box">
              <p>Ce site utilise des cookies pour améliorer votre expérience</p>
              <div class="cookie-buttons">
                <button @click="nextStep" class="btn-accept">Tout accepter</button>
                <button @click="showCookieDetails = true" class="btn-custom">Personnaliser (427 partenaires)</button>
              </div>
              <div v-if="showCookieDetails" class="cookie-details">
                <p>Chargement des 427 partenaires publicitaires...</p>
                <div class="loading-bar"><div class="loading-fill" :style="{ width: stepProgress + '%' }"></div></div>
              </div>
            </div>
          </div>

          <!-- Update Windows -->
          <div v-if="currentStep.type === 'update'" class="anim-update">
            <div class="update-box">
              <h3>Mise à jour Windows requise</h3>
              <p>Windows doit redémarrer pour installer les mises à jour importantes</p>
              <div class="update-progress">
                <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
                <p>{{ Math.floor(stepProgress) }}% - Ne pas éteindre votre ordinateur</p>
              </div>
            </div>
          </div>

          <!-- Captcha -->
          <div v-if="currentStep.type === 'captcha'" class="anim-captcha">
            <div class="captcha-box">
              <h3>Prouvez que vous n'êtes pas un robot</h3>
              <div class="captcha-grid">
                <div
                  v-for="img in captchaImages"
                  :key="img.id"
                  class="captcha-img"
                  :class="{ selected: img.selected }"
                  @click="toggleCaptcha(img)"
                >
                  <span class="img-content">{{ img.icon }}</span>
                  <span v-if="img.selected" class="check">✓</span>
                </div>
              </div>
              <p class="captcha-instruction">Sélectionnez toutes les images contenant un pingouin</p>
              <button @click="validateCaptcha" class="btn-verify">Vérifier</button>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div v-if="currentStep.type === 'terms'" class="anim-terms">
            <div class="terms-box">
              <h3>Conditions d'utilisation</h3>
              <div class="terms-scroll">
                <p v-for="i in 50" :key="i">Article {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
              </div>
              <div class="terms-actions">
                <label>
                  <input type="checkbox" v-model="termsAccepted"> J'ai lu et j'accepte les {{ termsPages }} pages de CGU
                </label>
                <button @click="nextStep" :disabled="!termsAccepted" class="btn-accept">Continuer</button>
              </div>
            </div>
          </div>

          <!-- Loading spinner -->
          <div v-if="currentStep.type === 'loading'" class="anim-loading">
            <div class="spinner-container">
              <div class="spinner"></div>
              <p class="loading-text">{{ loadingMessages[loadingMessageIndex] }}</p>
              <div class="loading-bar"><div class="loading-fill" :style="{ width: stepProgress + '%' }"></div></div>
            </div>
          </div>

          <!-- Email verification -->
          <div v-if="currentStep.type === 'email'" class="anim-email">
            <div class="email-box">
              <h3>Vérification d'email</h3>
              <p>Un email a été envoyé à votre adresse. Veuillez cliquer sur le lien dans les 24h.</p>
              <input v-model="emailCode" placeholder="Entrez le code à 6 chiffres" maxlength="6" />
              <button @click="validateEmail" class="btn-verify">Vérifier</button>
              <p class="email-hint">Indice: le code est "{{ secretCode }}"</p>
            </div>
          </div>

          <!-- BSOD -->
          <div v-if="currentStep.type === 'bsod'" class="anim-bsod">
            <div class="bsod-screen">
              <h1>:(</h1>
              <p>Your PC ran into a problem and needs to restart.</p>
              <p class="error-code">ERROR: PROPRIETARY_SOFTWARE_DETECTED</p>
              <div class="bsod-progress">
                <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
                <p>{{ Math.floor(stepProgress) }}% complete</p>
              </div>
            </div>
          </div>

          <!-- License popup -->
          <div v-if="currentStep.type === 'license'" class="anim-license">
            <div class="license-box">
              <h3>Vérification de la licence</h3>
              <p>Windows doit valider votre licence auprès du serveur Microsoft...</p>
              <div class="license-input">
                <input v-model="licenseKey" placeholder="Entrez votre clé produit (25 caractères)" maxlength="29" />
                <button @click="validateLicense" class="btn-verify">Activer</button>
              </div>
              <p class="license-hint">Astuce: Essayez "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"</p>
              <div class="linux-promo">
                <p>Saviez-vous que Linux est gratuit et open-source ?</p>
              </div>
            </div>
          </div>

          <!-- Compilation -->
          <div v-if="currentStep.type === 'compile'" class="anim-compile">
            <div class="compile-box">
              <h3>Compilation du code source</h3>
              <div class="terminal">
                <div v-for="(line, i) in compileLines" :key="i" class="terminal-line">{{ line }}</div>
              </div>
              <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
            </div>
          </div>

          <!-- Ad blocker detection -->
          <div v-if="currentStep.type === 'adblock'" class="anim-adblock">
            <div class="adblock-box">
              <h3>AdBlock détecté !</h3>
              <p>Pour continuer, veuillez désactiver votre bloqueur de publicités</p>
              <div class="fake-ads">
                <div class="fake-ad">GAGNEZ 1000€ ICI</div>
                <div class="fake-ad">PILULE MIRACLE</div>
                <div class="fake-ad">CÉLIBATAIRES PRÈS DE CHEZ VOUS</div>
              </div>
              <button @click="nextStep" class="btn-accept">J'ai désactivé AdBlock (mensonge)</button>
            </div>
          </div>

          <!-- Kernel panic -->
          <div v-if="currentStep.type === 'kernel'" class="anim-kernel">
            <div class="kernel-box">
              <h3>KERNEL PANIC</h3>
              <div class="kernel-text">
                <p>Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)</p>
                <p>CPU: 0 PID: 1 Comm: swapper/0 Not tainted 6.1.0-nird #1</p>
                <p>Call Trace:</p>
                <p>&nbsp;&nbsp;dump_stack+0x1c/0x28</p>
                <p>&nbsp;&nbsp;panic+0x107/0x2e8</p>
                <p>&nbsp;&nbsp;mount_block_root+0x178/0x1f0</p>
              </div>
              <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
              <p class="kernel-fix">Redémarrage automatique...</p>
            </div>
          </div>

          <!-- Package manager -->
          <div v-if="currentStep.type === 'package'" class="anim-package">
            <div class="package-box">
              <h3>Résolution des dépendances</h3>
              <div class="terminal">
                <p>$ apt install website-viewer</p>
                <p>Reading package lists... Done</p>
                <p>Building dependency tree... Done</p>
                <p>The following NEW packages will be installed:</p>
                <p v-for="(pkg, i) in packageList" :key="i">&nbsp;&nbsp;{{ pkg }}</p>
                <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
              </div>
            </div>
          </div>

          <!-- Registry edit -->
          <div v-if="currentStep.type === 'registry'" class="anim-registry">
            <div class="registry-box">
              <h3>Modification du registre Windows</h3>
              <p>Pour accéder à cette page, Windows doit modifier 847 clés de registre...</p>
              <div class="registry-keys">
                <div v-for="i in 10" :key="i" class="registry-key">
                  HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\{{ i }}
                </div>
              </div>
              <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
              <p class="registry-warning">Ne pas modifier le registre peut causer des problèmes</p>
            </div>
          </div>

          <!-- Telemetry -->
          <div v-if="currentStep.type === 'telemetry'" class="anim-telemetry">
            <div class="telemetry-box">
              <h3>Envoi de données de télémétrie</h3>
              <p>Windows collecte vos données d'utilisation pour "améliorer l'expérience"...</p>
              <div class="telemetry-data">
                <div class="data-item">Historique de navigation</div>
                <div class="data-item">Position géographique</div>
                <div class="data-item">Liste des applications</div>
                <div class="data-item">Frappes clavier</div>
                <div class="data-item">Contacts</div>
              </div>
              <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
              <p class="linux-note">Linux respecte votre vie privée !</p>
            </div>
          </div>

          <!-- DNS resolution -->
          <div v-if="currentStep.type === 'dns'" class="anim-dns">
            <div class="dns-box">
              <h3>Résolution DNS</h3>
              <div class="terminal">
                <p>$ dig {{ currentDomain }}</p>
                <p>; &lt;&lt;&gt;&gt; DiG 9.18.12 &lt;&lt;&gt;&gt; {{ currentDomain }}</p>
                <p>;; ANSWER SECTION:</p>
                <p>{{ currentDomain }}. 300 IN A {{ fakeIP }}</p>
                <div class="progress-bar"><div class="progress-fill" :style="{ width: stepProgress + '%' }"></div></div>
              </div>
            </div>
          </div>

          <!-- Success final -->
          <div v-if="currentStep.type === 'success'" class="anim-success">
            <div class="success-box">
              <h1>Félicitations !</h1>
              <p>Après cette suite d'étapes totalement inutiles, vous pouvez maintenant...</p>
              <h2>{{ originalAction }}</h2>
              <button @click="finishMachine" class="btn-final">{{ originalAction }}</button>
              <p class="success-note">C'était une machine de Rube Goldberg !</p>
              <p class="interaction-type">Type d'interaction: {{ currentInteractionType }}</p>
            </div>
          </div>
        </div>

        <!-- Bouton skip (caché) -->
        <button v-if="currentStepIndex < currentSequence.length - 1" @click="skipAll" class="btn-skip">
          Skip (Cliquez 10 fois)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const machineActive = ref(false)
const currentStepIndex = ref(0)
const stepProgress = ref(0)
const showCookieDetails = ref(false)
const termsAccepted = ref(false)
const termsPages = ref(247)
const emailCode = ref('')
const secretCode = ref('123456')
const licenseKey = ref('')
const loadingMessageIndex = ref(0)
const originalAction = ref('cliquer sur ce bouton')
const currentInteractionType = ref('Clic sur bouton')
const captchaImages = ref([])
const skipClicks = ref(0)
const compileLines = ref([])
const packageList = ref([])
const currentDomain = ref('example.com')
const fakeIP = ref('192.168.1.1')

// Tracking pour les interactions
const mouseMovements = ref([])
const lastMouseMove = ref(0)
const scrollVelocity = ref(0)
const lastScrollTime = ref(0)
const hoverTimer = ref(null)

let progressInterval = null
let messageInterval = null
let compileInterval = null

const loadingMessages = [
  'Chargement des données...',
  'Synchronisation avec le cloud...',
  'Vérification des licences...',
  'Contact du serveur distant...',
  'Téléchargement des dépendances...',
  'Compilation du code source...',
  'Optimisation des performances...',
  'Presque terminé...'
]

// Différentes séquences Goldberg selon l'interaction
const sequences = {
  // Clic sur lien/bouton - Séquence longue (8 étapes)
  buttonClick: [
    { type: 'cookie', icon: '[C]', title: 'Étape 1: Cookies', subtitle: 'Acceptez nos 427 partenaires publicitaires' },
    { type: 'update', icon: '[W]', title: 'Étape 2: Mise à jour', subtitle: 'Windows doit redémarrer...' },
    { type: 'loading', icon: '[L]', title: 'Étape 3: Chargement', subtitle: 'Initialisation des modules critiques' },
    { type: 'captcha', icon: '[R]', title: 'Étape 4: Captcha', subtitle: 'Prouvez que vous êtes humain' },
    { type: 'terms', icon: '[T]', title: 'Étape 5: CGU', subtitle: 'Lisez nos 247 pages de conditions' },
    { type: 'email', icon: '[E]', title: 'Étape 6: Email', subtitle: 'Vérification de votre identité' },
    { type: 'bsod', icon: '[X]', title: 'Étape 7: Crash', subtitle: 'Erreur système inattendue' },
    { type: 'success', icon: '[OK]', title: 'Étape 8: Succès !', subtitle: 'Vous pouvez enfin continuer !' }
  ],

  // Clic dans le vide - Séquence moyenne (5 étapes)
  emptyClick: [
    { type: 'adblock', icon: '[AB]', title: 'Étape 1: AdBlock', subtitle: 'Désactivez votre bloqueur de publicités' },
    { type: 'telemetry', icon: '[TM]', title: 'Étape 2: Télémétrie', subtitle: 'Envoi de vos données à Microsoft' },
    { type: 'license', icon: '[LC]', title: 'Étape 3: Licence', subtitle: 'Validation de votre clé produit' },
    { type: 'loading', icon: '[L]', title: 'Étape 4: Chargement', subtitle: 'Traitement en cours...' },
    { type: 'success', icon: '[OK]', title: 'Étape 5: Succès !', subtitle: 'Vous avez cliqué dans le vide !' }
  ],

  // Mouvement de souris rapide vers la droite - Séquence courte (3 étapes)
  mouseRight: [
    { type: 'dns', icon: '[DNS]', title: 'Étape 1: DNS', subtitle: 'Résolution du nom de domaine' },
    { type: 'package', icon: '[PKG]', title: 'Étape 2: Dépendances', subtitle: 'Installation des paquets Linux' },
    { type: 'success', icon: '[OK]', title: 'Étape 3: Succès !', subtitle: 'Direction détectée !' }
  ],

  // Mouvement de souris rapide vers la gauche - Séquence moyenne (4 étapes)
  mouseLeft: [
    { type: 'registry', icon: '[REG]', title: 'Étape 1: Registre', subtitle: 'Modification du registre Windows' },
    { type: 'update', icon: '[W]', title: 'Étape 2: Mise à jour', subtitle: 'Installation des mises à jour...' },
    { type: 'bsod', icon: '[X]', title: 'Étape 3: Crash', subtitle: 'Erreur fatale' },
    { type: 'success', icon: '[OK]', title: 'Étape 4: Succès !', subtitle: 'Retour en arrière effectué !' }
  ],

  // Scroll rapide - Séquence moyenne (6 étapes)
  fastScroll: [
    { type: 'compile', icon: '[CC]', title: 'Étape 1: Compilation', subtitle: 'Compilation du kernel Linux' },
    { type: 'loading', icon: '[L]', title: 'Étape 2: Chargement', subtitle: 'Chargement des modules...' },
    { type: 'kernel', icon: '[!]', title: 'Étape 3: Kernel Panic', subtitle: 'Panique du noyau !' },
    { type: 'package', icon: '[PKG]', title: 'Étape 4: Dépendances', subtitle: 'Réparation du système' },
    { type: 'loading', icon: '[L]', title: 'Étape 5: Redémarrage', subtitle: 'Redémarrage du système' },
    { type: 'success', icon: '[OK]', title: 'Étape 6: Succès !', subtitle: 'Scroll détecté !' }
  ],

  // Mouvement de souris vers le haut - Séquence courte (3 étapes)
  mouseUp: [
    { type: 'captcha', icon: '[R]', title: 'Étape 1: Captcha', subtitle: 'Vérification anti-bot' },
    { type: 'email', icon: '[E]', title: 'Étape 2: Email', subtitle: 'Confirmation par email' },
    { type: 'success', icon: '[OK]', title: 'Étape 3: Succès !', subtitle: 'Mouvement vers le haut !' }
  ],

  // Mouvement de souris vers le bas - Séquence longue (7 étapes)
  mouseDown: [
    { type: 'cookie', icon: '[C]', title: 'Étape 1: Cookies', subtitle: 'Acceptation des cookies' },
    { type: 'terms', icon: '[T]', title: 'Étape 2: CGU', subtitle: 'Conditions générales' },
    { type: 'license', icon: '[LC]', title: 'Étape 3: Licence', subtitle: 'Vérification de licence' },
    { type: 'telemetry', icon: '[TM]', title: 'Étape 4: Télémétrie', subtitle: 'Collecte de données' },
    { type: 'registry', icon: '[REG]', title: 'Étape 5: Registre', subtitle: 'Modification du registre' },
    { type: 'update', icon: '[W]', title: 'Étape 6: Mise à jour', subtitle: 'Mise à jour Windows' },
    { type: 'success', icon: '[OK]', title: 'Étape 7: Succès !', subtitle: 'Descente complète !' }
  ],

  // Hover prolongé - Séquence courte (4 étapes)
  hover: [
    { type: 'adblock', icon: '[AB]', title: 'Étape 1: AdBlock', subtitle: 'Détection de bloqueur' },
    { type: 'dns', icon: '[DNS]', title: 'Étape 2: DNS', subtitle: 'Résolution DNS' },
    { type: 'loading', icon: '[L]', title: 'Étape 3: Chargement', subtitle: 'Préchargement...' },
    { type: 'success', icon: '[OK]', title: 'Étape 4: Succès !', subtitle: 'Survol détecté !' }
  ]
}

const currentSequence = ref([...sequences.buttonClick])

const currentStep = computed(() => currentSequence.value[currentStepIndex.value] || currentSequence.value[0])

function startMachine(action = 'effectuer cette action', sequenceType = 'buttonClick', interactionName = 'Clic sur bouton') {
  originalAction.value = action
  currentInteractionType.value = interactionName
  currentSequence.value = [...sequences[sequenceType]]
  machineActive.value = true
  currentStepIndex.value = 0
  stepProgress.value = 0
  showCookieDetails.value = false
  termsAccepted.value = false
  emailCode.value = ''
  licenseKey.value = ''
  skipClicks.value = 0
  compileLines.value = []
  packageList.value = []
  initCurrentStep()
}

function initCurrentStep() {
  stepProgress.value = 0
  const step = currentStep.value

  if (step.type === 'cookie') {
    showCookieDetails.value = false
  } else if (step.type === 'update' || step.type === 'loading' || step.type === 'bsod' || step.type === 'kernel' || step.type === 'registry' || step.type === 'telemetry' || step.type === 'dns') {
    // Auto progress bar
    if (progressInterval) clearInterval(progressInterval)
    progressInterval = setInterval(() => {
      stepProgress.value += 2 + Math.random() * 5
      if (stepProgress.value >= 100) {
        clearInterval(progressInterval)
        stepProgress.value = 100
        setTimeout(() => nextStep(), 500)
      }
    }, 100)
  } else if (step.type === 'captcha') {
    // Generate captcha images
    captchaImages.value = []
    for (let i = 0; i < 9; i++) {
      const isPenguin = Math.random() < 0.33
      captchaImages.value.push({
        id: i,
        icon: isPenguin ? '🐧' : ['🪟', '💸', '🔒', '📊'][Math.floor(Math.random() * 4)],
        isPenguin,
        selected: false
      })
    }
  } else if (step.type === 'loading') {
    // Rotate loading messages
    loadingMessageIndex.value = 0
    if (messageInterval) clearInterval(messageInterval)
    messageInterval = setInterval(() => {
      loadingMessageIndex.value = (loadingMessageIndex.value + 1) % loadingMessages.length
    }, 800)
  } else if (step.type === 'compile') {
    // Simulate compilation output
    compileLines.value = []
    const files = ['kernel.c', 'fs.c', 'mm.c', 'drivers.c', 'net.c', 'ipc.c', 'init.c']
    if (compileInterval) clearInterval(compileInterval)
    let i = 0
    compileInterval = setInterval(() => {
      if (i < files.length) {
        compileLines.value.push(`[CC] ${files[i]}`)
        i++
      }
    }, 300)

    if (progressInterval) clearInterval(progressInterval)
    progressInterval = setInterval(() => {
      stepProgress.value += 1 + Math.random() * 3
      if (stepProgress.value >= 100) {
        clearInterval(progressInterval)
        clearInterval(compileInterval)
        stepProgress.value = 100
        setTimeout(() => nextStep(), 500)
      }
    }, 150)
  } else if (step.type === 'package') {
    // Generate package list
    packageList.value = [
      'website-viewer',
      'libweb-core',
      'libbrowser-engine',
      'libjavascript-runtime',
      'libcss-parser',
      'libhtml-renderer',
      'libhttp-client',
      'libssl-crypto'
    ]

    if (progressInterval) clearInterval(progressInterval)
    progressInterval = setInterval(() => {
      stepProgress.value += 2 + Math.random() * 4
      if (stepProgress.value >= 100) {
        clearInterval(progressInterval)
        stepProgress.value = 100
        setTimeout(() => nextStep(), 500)
      }
    }, 120)
  }
}

function nextStep() {
  if (currentStepIndex.value < currentSequence.value.length - 1) {
    currentStepIndex.value++
    initCurrentStep()
  }
}

function toggleCaptcha(img) {
  img.selected = !img.selected
}

function validateCaptcha() {
  const allPenguinsSelected = captchaImages.value
    .filter(img => img.isPenguin)
    .every(img => img.selected)

  const noFalsePositives = captchaImages.value
    .filter(img => !img.isPenguin)
    .every(img => !img.selected)

  if (allPenguinsSelected && noFalsePositives) {
    nextStep()
  } else {
    alert('❌ Captcha incorrect. Réessayez.')
    captchaImages.value.forEach(img => img.selected = false)
  }
}

function validateEmail() {
  if (emailCode.value === secretCode.value) {
    nextStep()
  } else {
    alert('❌ Code incorrect. Vérifiez votre email.')
  }
}

function validateLicense() {
  if (licenseKey.value.includes('XXXXX')) {
    nextStep()
  } else {
    alert('❌ Clé produit invalide. Essayez encore.')
  }
}

function skipAll() {
  skipClicks.value++
  if (skipClicks.value >= 10) {
    currentStepIndex.value = currentSequence.value.length - 1
    initCurrentStep()
  }
}

function finishMachine() {
  machineActive.value = false
  if (progressInterval) clearInterval(progressInterval)
  if (messageInterval) clearInterval(messageInterval)
  if (compileInterval) clearInterval(compileInterval)
}

// Intercepter les clics sur les liens/boutons
function interceptClick(event) {
  // Ne pas intercepter si la machine est déjà active
  if (machineActive.value) return

  const target = event.target

  // Vérifier si le clic est dans l'overlay de la machine
  if (target.closest && target.closest('.goldberg-overlay')) return

  // Vérifier si c'est un lien ou bouton
  const isButton = target.tagName === 'BUTTON' || (target.closest && target.closest('button'))
  const isLink = target.tagName === 'A' || (target.closest && target.closest('a'))

  if (isButton || isLink) {
    // Ne pas intercepter les clics sur le header/footer
    if (target.closest && (target.closest('header') || target.closest('footer'))) return

    // 25% de chance de déclencher la machine
    if (Math.random() < 0.25) {
      event.preventDefault()
      event.stopPropagation()

      let action = 'effectuer cette action'
      const clickedElement = isLink ? (target.tagName === 'A' ? target : target.closest('a')) : (target.tagName === 'BUTTON' ? target : target.closest('button'))

      if (isLink) {
        action = `accéder à "${clickedElement.textContent.trim()}"`
      } else if (isButton) {
        action = clickedElement.textContent.trim() || 'cliquer sur ce bouton'
      }

      startMachine(action, 'buttonClick', 'Clic sur bouton/lien')
    }
  } else {
    // Clic dans le vide
    if (target.closest && (target.closest('header') || target.closest('footer'))) return

    // 10% de chance pour clic dans le vide
    if (Math.random() < 0.1) {
      event.preventDefault()
      startMachine('cliquer dans le vide', 'emptyClick', 'Clic dans le vide')
    }
  }
}

// Détecter les mouvements rapides de souris
function handleMouseMove(event) {
  const now = Date.now()

  // Enregistrer les mouvements
  mouseMovements.value.push({
    x: event.clientX,
    y: event.clientY,
    time: now
  })

  // Garder seulement les 10 derniers mouvements
  if (mouseMovements.value.length > 10) {
    mouseMovements.value.shift()
  }

  // Détecter mouvement rapide (au moins 5 points en moins de 500ms)
  if (mouseMovements.value.length >= 5 && now - lastMouseMove.value > 500) {
    const first = mouseMovements.value[0]
    const last = mouseMovements.value[mouseMovements.value.length - 1]
    const dx = last.x - first.x
    const dy = last.y - first.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Mouvement rapide détecté (plus de 200px en moins de 500ms)
    if (distance > 200 && !machineActive.value) {
      // Déterminer la direction
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      if (absX > absY) {
        // Mouvement horizontal
        if (dx > 0) {
          startMachine('déplacer votre souris vers la droite', 'mouseRight', 'Mouvement de souris → droite')
        } else {
          startMachine('déplacer votre souris vers la gauche', 'mouseLeft', 'Mouvement de souris ← gauche')
        }
      } else {
        // Mouvement vertical
        if (dy > 0) {
          startMachine('déplacer votre souris vers le bas', 'mouseDown', 'Mouvement de souris ↓ bas')
        } else {
          startMachine('déplacer votre souris vers le haut', 'mouseUp', 'Mouvement de souris ↑ haut')
        }
      }

      mouseMovements.value = []
    }

    lastMouseMove.value = now
  }
}

// Détecter le scroll rapide
function handleScroll() {
  const now = Date.now()
  const timeDiff = now - lastScrollTime.value

  if (timeDiff < 100) {
    scrollVelocity.value++

    // Scroll rapide détecté (5 événements en moins de 500ms)
    if (scrollVelocity.value > 5 && !machineActive.value) {
      startMachine('scroller rapidement', 'fastScroll', 'Scroll rapide')
      scrollVelocity.value = 0
    }
  } else {
    scrollVelocity.value = 0
  }

  lastScrollTime.value = now
}

// Détecter le hover prolongé sur les éléments
let currentHoveredElement = null

function handleMouseOver(event) {
  const target = event.target

  // Ignorer si pas un élément HTML
  if (!target || typeof target.closest !== 'function') return

  // Ignorer certains éléments
  if (machineActive.value) return
  if (target.closest('header') || target.closest('footer')) return
  if (target.closest('.goldberg-overlay')) return

  // Si c'est un nouvel élément
  if (currentHoveredElement !== target) {
    currentHoveredElement = target

    // Démarrer un timer de hover
    if (hoverTimer.value) clearTimeout(hoverTimer.value)

    hoverTimer.value = setTimeout(() => {
      // Si l'utilisateur survole pendant 3 secondes
      if (!machineActive.value && currentHoveredElement === target && Math.random() < 0.15) {
        const text = target.textContent?.trim().substring(0, 30) || 'cet élément'
        startMachine(`survoler "${text}"`, 'hover', 'Survol prolongé')
      }
    }, 3000)
  }
}

function handleMouseOut(event) {
  const target = event.target

  if (currentHoveredElement === target) {
    currentHoveredElement = null
    if (hoverTimer.value) {
      clearTimeout(hoverTimer.value)
      hoverTimer.value = null
    }
  }
}

onMounted(() => {
  // Intercepter les clics
  document.addEventListener('click', interceptClick, true)

  // Détecter les mouvements de souris
  document.addEventListener('mousemove', handleMouseMove)

  // Détecter le scroll
  document.addEventListener('scroll', handleScroll, true)

  // Détecter le hover
  document.addEventListener('mouseover', handleMouseOver)
  document.addEventListener('mouseout', handleMouseOut)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', interceptClick, true)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('scroll', handleScroll, true)
  document.removeEventListener('mouseover', handleMouseOver)
  document.removeEventListener('mouseout', handleMouseOut)

  if (progressInterval) clearInterval(progressInterval)
  if (messageInterval) clearInterval(messageInterval)
  if (compileInterval) clearInterval(compileInterval)
  if (hoverTimer.value) clearTimeout(hoverTimer.value)
})

// Export pour pouvoir déclencher manuellement
defineExpose({ startMachine })
</script>

<style scoped>
.goldberg-wrapper { position: relative; }

.goldberg-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.machine-container {
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--color-grey);
  border: 3px solid var(--color-primary);
  border-radius: 12px;
  padding: 2rem;
  color: var(--color-light);
  position: relative;
}

.machine-title {
  text-align: center;
  color: var(--color-primary);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.machine-subtitle {
  text-align: center;
  color: var(--color-secondary);
  margin-bottom: 2rem;
}

/* Chain visualization */
.chain-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.chain-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step-icon {
  font-size: 1.5rem;
  opacity: 0.3;
  transition: all 0.3s;
}

.chain-step.active .step-icon {
  opacity: 1;
  transform: scale(1.3);
  filter: drop-shadow(0 0 10px var(--color-primary));
}

.chain-step.done .step-icon {
  opacity: 0.6;
}

.step-arrow {
  color: var(--color-secondary);
  font-size: 1.2rem;
}

/* Step animations */
.step-animation {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Cookie */
.cookie-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
}

.cookie-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.cookie-details {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 4px;
}

/* Update */
.update-box {
  text-align: center;
  padding: 2rem;
}

.update-box h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

/* Progress bars */
.progress-bar, .loading-bar {
  width: 100%;
  height: 20px;
  background: #1a1f3a;
  border: 2px solid var(--color-secondary);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress-fill, .loading-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
  transition: width 0.1s linear;
}

/* Captcha */
.captcha-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.captcha-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
}

.captcha-img {
  aspect-ratio: 1;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  font-size: 3rem;
}

.captcha-img:hover {
  border-color: #00d084;
}

.captcha-img.selected {
  border-color: #00d084;
  background: rgba(0, 208, 132, 0.1);
}

.check {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #00d084;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

/* Terms */
.terms-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
}

.terms-scroll {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  font-size: 0.8rem;
}

.terms-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Loading */
.spinner-container {
  text-align: center;
}

.spinner {
  width: 80px;
  height: 80px;
  border: 8px solid var(--color-grey);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 2rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  font-size: 1.2rem;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

/* Email */
.email-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
}

.email-box input {
  width: 100%;
  padding: 0.8rem;
  margin: 1rem 0;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1.2rem;
  text-align: center;
}

.email-hint {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
}

/* BSOD */
.bsod-screen {
  background: #0000aa;
  color: #fff;
  padding: 3rem;
  width: 100%;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.bsod-screen h1 {
  font-size: 6rem;
  margin-bottom: 1rem;
}

.error-code {
  color: #ffff00;
  font-weight: bold;
  margin: 1rem 0;
}

/* License */
.license-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
}

.license-input {
  margin: 1rem 0;
}

.license-input input {
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  text-align: center;
  font-family: monospace;
}

.license-hint {
  font-size: 0.9rem;
  color: #666;
  margin: 1rem 0;
}

.linux-promo {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #e8f5e9;
  border-radius: 4px;
  border: 2px solid #4caf50;
}

/* Compilation */
.compile-box {
  background: #1a1f3a;
  color: #00d084;
  padding: 2rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  max-width: 600px;
}

.compile-box h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-align: center;
}

.terminal {
  background: #000;
  color: #0f0;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.terminal-line {
  margin: 0.2rem 0;
}

.terminal p {
  margin: 0.2rem 0;
}

/* AdBlock */
.adblock-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
}

.fake-ads {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}

.fake-ad {
  background: linear-gradient(45deg, #ff0000, #ffff00, #00ff00);
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Kernel Panic */
.kernel-box {
  background: #000;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  max-width: 600px;
}

.kernel-box h3 {
  color: #ff0000;
  margin-bottom: 1rem;
  text-align: center;
}

.kernel-text {
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.kernel-text p {
  margin: 0.3rem 0;
}

.kernel-fix {
  text-align: center;
  color: #ffff00;
  margin-top: 1rem;
}

/* Package Manager */
.package-box {
  background: #1a1f3a;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  max-width: 600px;
}

.package-box h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-align: center;
}

/* Registry */
.registry-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
}

.registry-box h3 {
  text-align: center;
  margin-bottom: 1rem;
}

.registry-keys {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  max-height: 150px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 0.75rem;
}

.registry-key {
  margin: 0.3rem 0;
  word-break: break-all;
}

.registry-warning {
  color: #ff0000;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}

/* Telemetry */
.telemetry-box {
  background: #fff;
  color: #000;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
}

.telemetry-box h3 {
  text-align: center;
  margin-bottom: 1rem;
}

.telemetry-data {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin: 1.5rem 0;
}

.data-item {
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: #fff;
  border-left: 3px solid #f00;
}

.linux-note {
  color: #4caf50;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}

/* DNS */
.dns-box {
  background: #1a1f3a;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  max-width: 600px;
}

.dns-box h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  text-align: center;
}

/* Success */
.success-box {
  text-align: center;
  padding: 2rem;
}

.success-box h1 {
  color: var(--color-primary);
  font-size: 3rem;
  margin-bottom: 1rem;
}

.success-box h2 {
  color: var(--color-secondary);
  margin: 1.5rem 0;
}

.success-note {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: var(--color-secondary);
}

.interaction-type {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--color-primary);
  font-style: italic;
}

/* Buttons */
.btn-accept, .btn-verify, .btn-final {
  padding: 0.8rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-dark);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-accept:hover, .btn-verify:hover, .btn-final:hover {
  transform: scale(1.05);
}

.btn-accept:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-custom {
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 2px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}

.btn-skip {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  opacity: 0.3;
  transition: opacity 0.2s;
}

.btn-skip:hover {
  opacity: 1;
}

/* Responsive */
@media (max-width: 640px) {
  .machine-container {
    padding: 1rem;
  }

  .machine-title {
    font-size: 1.5rem;
  }

  .captcha-img {
    font-size: 2rem;
  }

  .success-box h1 {
    font-size: 2rem;
  }
}
</style>
