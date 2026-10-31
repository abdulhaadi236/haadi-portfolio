// A short mechanical "tick", synthesised with Web Audio (no sound file to download):
// a 15ms burst of band-passed noise plus a tiny pitched click, like a gear tooth.
// Browsers only allow sound after the visitor has clicked/tapped somewhere on the site,
// so until then ticks are silently skipped.
let ctx = null
let noise = null

function setup() {
  if (ctx) return ctx
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null
  ctx = new AudioContext()
  // 30ms of white noise, reused for every tick
  noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.03), ctx.sampleRate)
  const data = noise.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return ctx
}

export function tick() {
  const ac = setup()
  if (!ac) return
  if (ac.state === 'suspended') {
    // Allowed once the visitor has interacted with the page; otherwise stays silent
    ac.resume().catch(() => {})
    if (ac.state === 'suspended') return
  }
  const t = ac.currentTime

  const src = ac.createBufferSource()
  src.buffer = noise
  const band = ac.createBiquadFilter()
  band.type = 'bandpass'
  band.frequency.value = 3200
  band.Q.value = 1.2
  const noiseGain = ac.createGain()
  noiseGain.gain.setValueAtTime(0.35, t)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015)
  src.connect(band).connect(noiseGain).connect(ac.destination)
  src.start(t)
  src.stop(t + 0.03)

  const osc = ac.createOscillator()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(1800, t)
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.02)
  const oscGain = ac.createGain()
  oscGain.gain.setValueAtTime(0.12, t)
  oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025)
  osc.connect(oscGain).connect(ac.destination)
  osc.start(t)
  osc.stop(t + 0.03)
}

// Create/resume the audio context during a click so later ticks (from scrolling) can sound
tick.unlock = () => {
  const ac = setup()
  if (ac && ac.state === 'suspended') ac.resume().catch(() => {})
}
