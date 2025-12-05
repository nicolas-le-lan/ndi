<template>
  <div class="rg-easter-egg">
    <!-- Bouton discret en bas à droite -->
    <button
      v-if="!gameActive"
      class="rg-trigger-btn"
      @click="activateEasterEgg"
      title="Konami Code: ↑↑↓↓←→←→BA"
    >
      🐧
    </button>

    <!-- Mini-jeu Easter Egg -->
    <div v-if="gameActive" class="rg-game-overlay">
      <div class="rg-game-box">
        <div class="rg-game-header">
          <h3>{{ gameTitle }}</h3>
          <button @click="closeGame" class="rg-close-btn">×</button>
        </div>

        <div class="rg-game-body">
          <!-- PONG GAME: Linux vs Windows -->
          <div v-if="gameMode === 'pong'" class="rg-pong">
            <div class="rg-pong-info">
              <div class="rg-score">
                <div class="player">
                  <span class="player-icon">🐧</span>
                  <span>Linux: {{ linuxScore }}</span>
                </div>
                <div class="player">
                  <span class="player-icon">🪟</span>
                  <span>Windows: {{ windowsScore }}</span>
                </div>
              </div>
              <p class="rg-instruction">Utilisez ↑↓ pour bouger la raquette Linux</p>
            </div>

            <div class="rg-pong-canvas" ref="pongCanvas">
              <!-- Paddle Linux (gauche) -->
              <div
                class="rg-paddle rg-paddle-linux"
                :style="{ top: paddleLinux + 'px' }"
              >
                🐧
              </div>

              <!-- Paddle Windows (droite) -->
              <div
                class="rg-paddle rg-paddle-windows"
                :style="{ top: paddleWindows + 'px' }"
              >
                🪟
              </div>

              <!-- Balle -->
              <div
                class="rg-ball"
                :style="{ left: ballX + 'px', top: ballY + 'px' }"
              >
                💾
              </div>

              <!-- Messages au centre -->
              <div v-if="centerMessage" class="rg-center-message">
                {{ centerMessage }}
              </div>
            </div>

            <div class="rg-game-footer">
              <button @click="resetPong" class="btn btn-secondary">Restart</button>
              <p v-if="winner" class="rg-winner">{{ winner }} wins! 🎉</p>
            </div>
          </div>

          <!-- CLICKER GAME: Open Source Contributions -->
          <div v-if="gameMode === 'clicker'" class="rg-clicker">
            <div class="rg-clicker-stats">
              <div class="stat-item">
                <span class="stat-label">Commits</span>
                <span class="stat-value">{{ commits }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Stars</span>
                <span class="stat-value">⭐ {{ stars }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Contributors</span>
                <span class="stat-value">👥 {{ contributors }}</span>
              </div>
            </div>

            <button @click="clickCommit" class="rg-click-btn">
              <span class="rg-click-icon">🔨</span>
              <span>Commit Code!</span>
            </button>

            <div class="rg-upgrades">
              <h4>Upgrades</h4>
              <div class="upgrade-list">
                <button
                  v-for="upgrade in upgrades"
                  :key="upgrade.id"
                  @click="buyUpgrade(upgrade)"
                  :disabled="commits < upgrade.cost"
                  class="upgrade-btn"
                >
                  <span>{{ upgrade.icon }} {{ upgrade.name }}</span>
                  <span class="upgrade-cost">{{ upgrade.cost }} commits</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Particules flottantes -->
    <div v-for="particle in particles" :key="particle.id"
         class="rg-particle"
         :style="{
           left: particle.x + 'px',
           top: particle.y + 'px',
           fontSize: particle.size + 'rem'
         }">
      {{ particle.emoji }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const gameActive = ref(false)
const gameMode = ref('pong') // 'pong' ou 'clicker'
const gameTitle = ref('Linux vs Windows: PONG')

// KONAMI CODE
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiProgress = 0

// PONG STATE
const linuxScore = ref(0)
const windowsScore = ref(0)
const paddleLinux = ref(150)
const paddleWindows = ref(150)
const ballX = ref(300)
const ballY = ref(150)
let ballVelX = 3
let ballVelY = 2
const centerMessage = ref('Press SPACE to start')
const winner = ref('')
let pongInterval = null
let pongStarted = false

// CLICKER STATE
const commits = ref(0)
const stars = ref(0)
const contributors = ref(1)
let clickPower = 1
let autoCommits = 0

const upgrades = ref([
  { id: 1, name: 'Better IDE', cost: 10, power: 2, icon: '💻', bought: false },
  { id: 2, name: 'Coffee Machine', cost: 25, power: 5, icon: '☕', bought: false },
  { id: 3, name: 'Junior Dev', cost: 50, auto: 1, icon: '👨‍💻', bought: false },
  { id: 4, name: 'CI/CD Pipeline', cost: 100, power: 10, icon: '🔄', bought: false },
  { id: 5, name: 'Senior Dev', cost: 200, auto: 5, icon: '🧙', bought: false },
  { id: 6, name: 'AI Copilot', cost: 500, power: 50, icon: '🤖', bought: false }
])

// PARTICLES
const particles = ref([])
let particleId = 0

// AUDIO (optional)
let audioCtx = null
let autoCommitInterval = null

function activateEasterEgg() {
  gameActive.value = true
  gameMode.value = 'pong'
  gameTitle.value = 'Linux vs Windows: PONG'
  centerMessage.value = 'Press SPACE to start'
}

function closeGame() {
  gameActive.value = false
  stopPong()
  winner.value = ''
  linuxScore.value = 0
  windowsScore.value = 0
}

// === PONG GAME ===
function startPong() {
  if (pongStarted) return
  pongStarted = true
  centerMessage.value = ''
  winner.value = ''

  ballX.value = 300
  ballY.value = 150
  ballVelX = (Math.random() > 0.5 ? 1 : -1) * 3
  ballVelY = (Math.random() - 0.5) * 4

  if (pongInterval) clearInterval(pongInterval)
  pongInterval = setInterval(updatePong, 1000 / 60)
}

function updatePong() {
  // Déplacer la balle
  ballX.value += ballVelX
  ballY.value += ballVelY

  // Rebond haut/bas
  if (ballY.value <= 0 || ballY.value >= 300) {
    ballVelY = -ballVelY
  }

  // Collision avec paddle Linux (gauche)
  if (ballX.value <= 30 && ballY.value >= paddleLinux.value && ballY.value <= paddleLinux.value + 60) {
    ballVelX = Math.abs(ballVelX) * 1.1
    ballVelY += (Math.random() - 0.5) * 2
    spawnParticle(ballX.value, ballY.value, '🐧')
    beep(600, 0.05)
  }

  // Collision avec paddle Windows (droite)
  if (ballX.value >= 570 && ballY.value >= paddleWindows.value && ballY.value <= paddleWindows.value + 60) {
    ballVelX = -Math.abs(ballVelX) * 1.1
    ballVelY += (Math.random() - 0.5) * 2
    spawnParticle(ballX.value, ballY.value, '🪟')
    beep(400, 0.05)
  }

  // Score Linux (Windows rate)
  if (ballX.value > 600) {
    linuxScore.value++
    beep(800, 0.2)
    spawnParticle(ballX.value, ballY.value, '🎉')
    checkWinner()
    resetBall()
  }

  // Score Windows (Linux rate)
  if (ballX.value < 0) {
    windowsScore.value++
    beep(200, 0.2)
    checkWinner()
    resetBall()
  }

  // AI Windows paddle
  if (ballVelX > 0) {
    const targetY = ballY.value - 30
    if (paddleWindows.value < targetY) paddleWindows.value += 2.5
    if (paddleWindows.value > targetY) paddleWindows.value -= 2.5
  }

  // Limiter paddle Windows
  paddleWindows.value = Math.max(0, Math.min(240, paddleWindows.value))
}

function resetBall() {
  ballX.value = 300
  ballY.value = 150
  ballVelX = (Math.random() > 0.5 ? 1 : -1) * 3
  ballVelY = (Math.random() - 0.5) * 4
}

function checkWinner() {
  if (linuxScore.value >= 5) {
    winner.value = '🐧 LINUX'
    stopPong()
    spawnMultipleParticles(20, ['🐧', '🎉', '✨', 'LIBRE'])
  } else if (windowsScore.value >= 5) {
    winner.value = '🪟 WINDOWS'
    stopPong()
    spawnMultipleParticles(10, ['💀', '💰'])
  }
}

function resetPong() {
  stopPong()
  linuxScore.value = 0
  windowsScore.value = 0
  winner.value = ''
  centerMessage.value = 'Press SPACE to start'
  pongStarted = false
}

function stopPong() {
  if (pongInterval) {
    clearInterval(pongInterval)
    pongInterval = null
  }
  pongStarted = false
}

function movePaddleLinux(direction) {
  if (direction === 'up') paddleLinux.value = Math.max(0, paddleLinux.value - 20)
  if (direction === 'down') paddleLinux.value = Math.min(240, paddleLinux.value + 20)
}

// === CLICKER GAME ===
function switchToClicker() {
  gameMode.value = 'clicker'
  gameTitle.value = 'Open Source Clicker'
  stopPong()
}

function clickCommit() {
  commits.value += clickPower
  spawnParticle(window.innerWidth / 2, window.innerHeight / 2, '💻')
  beep(700, 0.03)

  if (commits.value % 10 === 0) stars.value++
}

function buyUpgrade(upgrade) {
  if (commits.value < upgrade.cost || upgrade.bought) return

  commits.value -= upgrade.cost
  upgrade.bought = true

  if (upgrade.power) clickPower += upgrade.power
  if (upgrade.auto) {
    autoCommits += upgrade.auto
    contributors.value++
  }

  spawnMultipleParticles(5, [upgrade.icon])
  beep(1000, 0.1)
}

// === PARTICLES ===
function spawnParticle(x, y, emoji) {
  particleId++
  particles.value.push({
    id: particleId,
    x,
    y,
    emoji,
    size: 1 + Math.random()
  })
  setTimeout(() => {
    particles.value = particles.value.filter(p => p.id !== particleId)
  }, 1500)
}

function spawnMultipleParticles(count, emojis) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      spawnParticle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        emojis[Math.floor(Math.random() * emojis.length)]
      )
    }, i * 100)
  }
}

// === AUDIO ===
function beep(freq, duration) {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      audioCtx = new AudioContextClass()
    }
    if (audioCtx.state === 'suspended') audioCtx.resume()

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.frequency.value = freq
    osc.type = 'square'
    gain.gain.setValueAtTime(0.02, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
    osc.start()
    osc.stop(audioCtx.currentTime + duration)
  } catch (e) {}
}

// === KEYBOARD ===
function onKeyDown(e) {
  // Konami code
  if (e.key === konamiCode[konamiProgress]) {
    konamiProgress++
    if (konamiProgress === konamiCode.length) {
      konamiProgress = 0
      if (!gameActive.value) activateEasterEgg()
    }
  } else {
    konamiProgress = 0
  }

  if (!gameActive.value) return

  // PONG controls
  if (gameMode.value === 'pong') {
    if (e.key === ' ') {
      e.preventDefault()
      startPong()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      movePaddleLinux('up')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      movePaddleLinux('down')
    }
  }

  // Switch game with Tab
  if (e.key === 'Tab') {
    e.preventDefault()
    if (gameMode.value === 'pong') switchToClicker()
    else {
      gameMode.value = 'pong'
      gameTitle.value = 'Linux vs Windows: PONG'
    }
  }
}

// === LIFECYCLE ===
onMounted(() => {
  window.addEventListener('keydown', onKeyDown)

  // Resume audio on click
  const resumeAudio = () => {
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume()
    window.removeEventListener('click', resumeAudio)
  }
  window.addEventListener('click', resumeAudio, { once: true })

  // Auto-commits interval (only in browser)
  autoCommitInterval = setInterval(() => {
    if (gameMode.value === 'clicker' && autoCommits > 0) {
      commits.value += autoCommits
    }
  }, 1000)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  stopPong()
  if (autoCommitInterval) {
    clearInterval(autoCommitInterval)
    autoCommitInterval = null
  }
})
</script>

<style scoped>
.rg-easter-egg { position: relative; }

/* TRIGGER BUTTON */
.rg-trigger-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1a2332, #0f1824);
  border: 2px solid var(--color-primary);
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1100;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  transition: all 0.3s;
  animation: rg-float 3s ease-in-out infinite;
}

.rg-trigger-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 208, 132, 0.4);
}

@keyframes rg-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* GAME OVERLAY */
.rg-game-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 14, 25, 0.95);
  z-index: 3500;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rg-fade-in 0.3s;
}

@keyframes rg-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.rg-game-box {
  max-width: 800px;
  width: 95%;
  background: #0b1220;
  border: 3px solid var(--color-primary);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.9);
}

.rg-game-header {
  background: linear-gradient(180deg, #1a2332, #0f1824);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-primary);
}

.rg-game-header h3 {
  color: var(--color-primary);
  margin: 0;
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
}

.rg-close-btn {
  background: #ff0000;
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  transition: transform 0.2s;
}

.rg-close-btn:hover {
  transform: scale(1.1);
}

.rg-game-body {
  padding: 1.5rem;
}

/* === PONG === */
.rg-pong {
  color: var(--color-light);
}

.rg-pong-info {
  margin-bottom: 1.5rem;
}

.rg-score {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.player {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.player-icon {
  font-size: 2rem;
}

.rg-instruction {
  text-align: center;
  color: var(--color-secondary);
  font-size: 0.9rem;
}

.rg-pong-canvas {
  position: relative;
  width: 600px;
  height: 300px;
  background: #000;
  border: 2px solid var(--color-primary);
  margin: 0 auto 1rem;
  overflow: hidden;
}

.rg-paddle {
  position: absolute;
  width: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.rg-paddle-linux {
  left: 10px;
  background: rgba(0, 208, 132, 0.3);
}

.rg-paddle-windows {
  right: 10px;
  background: rgba(255, 0, 0, 0.3);
}

.rg-ball {
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  animation: rg-ball-spin 1s linear infinite;
}

@keyframes rg-ball-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.rg-center-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-primary);
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  animation: rg-pulse 1s infinite;
}

@keyframes rg-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.rg-game-footer {
  text-align: center;
}

.rg-winner {
  margin-top: 1rem;
  font-size: 2rem;
  color: var(--color-primary);
  font-weight: bold;
  animation: rg-winner-bounce 0.5s infinite;
}

@keyframes rg-winner-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* === CLICKER === */
.rg-clicker {
  color: var(--color-light);
  text-align: center;
}

.rg-clicker-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-secondary);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--color-primary);
}

.rg-click-btn {
  padding: 2rem 3rem;
  font-size: 1.5rem;
  background: var(--color-primary);
  color: var(--color-dark);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 2rem;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  margin-right: auto;
}

.rg-click-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 208, 132, 0.5);
}

.rg-click-btn:active {
  transform: scale(0.95);
}

.rg-click-icon {
  font-size: 3rem;
  animation: rg-hammer 0.5s ease-in-out infinite;
}

@keyframes rg-hammer {
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
}

.rg-upgrades h4 {
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.upgrade-list {
  display: grid;
  gap: 0.8rem;
}

.upgrade-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background: #1a2332;
  border: 2px solid var(--color-secondary);
  border-radius: 6px;
  color: var(--color-light);
  cursor: pointer;
  transition: all 0.2s;
}

.upgrade-btn:hover:not(:disabled) {
  background: var(--color-secondary);
  color: var(--color-dark);
  border-color: var(--color-primary);
}

.upgrade-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.upgrade-cost {
  color: var(--color-secondary);
  font-size: 0.85rem;
}

/* PARTICLES */
.rg-particle {
  position: fixed;
  pointer-events: none;
  z-index: 4000;
  animation: rg-particle-float 1.5s ease-out forwards;
}

@keyframes rg-particle-float {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-100px) scale(1.5); }
}

/* RESPONSIVE */
@media (max-width: 640px) {
  .rg-pong-canvas {
    width: 100%;
    max-width: 400px;
  }

  .rg-game-header h3 {
    font-size: 1.2rem;
  }

  .rg-clicker-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .rg-click-btn {
    padding: 1.5rem 2rem;
    font-size: 1.2rem;
  }
}
</style>
