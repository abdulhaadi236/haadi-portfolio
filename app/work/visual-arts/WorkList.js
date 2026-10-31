'use client'

import { useEffect, useRef, useState } from 'react'
import { works } from '../../data/works'
import { tick } from './tick'

const STEP_DELTA = 40   // trackpad distance that counts as one notch
const NOTCH = 50        // a single wheel event this big is a mouse-wheel notch → exactly one step
const DRAG_STEP = 24    // px of dragging the lime square that counts as one step
const PULSE_MS = 160    // how long the square stays stretched after a wheel notch
// Blur by distance from the middle row (Figma: Work frame 14:37)
const BLUR = [0, 1, 1.5, 2, 3, 3.5, 4, 5]

// Work list as a dial (Figma: Work frame, node 14:37).
// The titles sit on a turning drum: the selected title faces the viewer in the middle row, sharp,
// over a lime bar; the others tilt away round the curve above and below, blurring with distance. Turn the dial with the mouse wheel/trackpad (one title per
// notch, with a tick), by dragging the lime square up/down, or by clicking a title. The square
// stretches while dragging (Figma "Scroll" frame: 30×30 → 30×57 up / 30×59 down).
// Clicking the title in the bar, or the thumbnail, opens that work's video.
// On tablets/phones the thumbnail fills the screen behind the dial, and swiping up/down on the
// dial turns it (same steps, tick and square stretch).
const SWIPE_STEP = 30   // px of finger travel on touch screens that counts as one step
const TAP_SLOP = 6      // finger movement below this is a tap, not a swipe
export default function WorkList() {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const innerRef = useRef(null)
  const knobRef = useRef(null)

  const select = (i) => {
    const next = Math.min(Math.max(i, 0), works.length - 1)
    if (next === activeRef.current) return false
    activeRef.current = next
    setActive(next)
    tick()
    return true
  }

  useEffect(() => {
    const inner = innerRef.current
    const knob = knobRef.current
    let acc = 0
    let pulse = null
    let dragY = null

    const stretch = (dir) => {
      knob.classList.toggle('is-up', dir < 0)
      knob.classList.toggle('is-down', dir > 0)
    }
    const relax = () => knob.classList.remove('is-up', 'is-down')

    const onWheel = (e) => {
      e.preventDefault()
      const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY
      let steps = 0
      if (Math.abs(dy) >= NOTCH) {
        steps = Math.sign(dy)          // mouse wheel: one notch, one title
        acc = 0
      } else {
        acc += dy                      // trackpad: add up small movements
        steps = Math.trunc(acc / STEP_DELTA)
        acc -= steps * STEP_DELTA
      }
      for (let k = 0; k < Math.abs(steps); k++) select(activeRef.current + Math.sign(steps))
      if (steps && dragY === null) {
        stretch(Math.sign(steps))      // quick stretch in the scroll direction
        clearTimeout(pulse)
        pulse = setTimeout(relax, PULSE_MS)
      }
    }

    // Dragging: the lime square (any pointer), or anywhere on the dial with a finger.
    // The square stretches in the drag direction; every `per` px = one title.
    let per = DRAG_STEP
    let startY = 0
    let swiped = false
    const onDragStart = (e) => {
      const onKnob = e.target === knob
      if (!onKnob && e.pointerType !== 'touch') return
      dragY = startY = e.clientY
      per = onKnob ? DRAG_STEP : SWIPE_STEP
      swiped = false
      knob.classList.add('is-dragging')
      window.addEventListener('pointermove', onDragMove)
      window.addEventListener('pointerup', onDragEnd)
      window.addEventListener('pointercancel', onDragEnd)
    }
    const onDragMove = (e) => {
      if (dragY === null) return
      if (Math.abs(e.clientY - startY) > TAP_SLOP) swiped = true
      const dy = e.clientY - dragY
      if (Math.abs(dy) > 3) stretch(Math.sign(dy))
      // Finger swipes follow the content (swipe up = later titles); the square follows the drag
      const dir = per === SWIPE_STEP ? -1 : 1
      const steps = Math.trunc(dy / per)
      if (steps) {
        dragY += steps * per
        for (let k = 0; k < Math.abs(steps); k++) select(activeRef.current + Math.sign(steps) * dir)
      }
    }
    const onDragEnd = () => {
      dragY = null
      knob.classList.remove('is-dragging')
      relax()
      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onDragEnd)
      window.removeEventListener('pointercancel', onDragEnd)
      // A swipe shouldn't also count as a tap on the title it ended over
      if (swiped) {
        const block = (ev) => { ev.preventDefault(); ev.stopPropagation() }
        window.addEventListener('click', block, { capture: true, once: true })
        setTimeout(() => window.removeEventListener('click', block, { capture: true }), 50)
      }
    }

    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        select(activeRef.current + (e.key === 'ArrowDown' ? 1 : -1))
      }
    }

    // Wake the audio as soon as the visitor clicks anywhere (browsers require a click first)
    const unlock = () => tick.unlock?.()
    unlock()   // works straight away if the visitor arrived by clicking a link on the site

    inner.addEventListener('wheel', onWheel, { passive: false })
    inner.addEventListener('keydown', onKey)
    inner.addEventListener('pointerdown', onDragStart)
    window.addEventListener('pointerdown', unlock)
    return () => {
      clearTimeout(pulse)
      inner.removeEventListener('wheel', onWheel)
      inner.removeEventListener('keydown', onKey)
      inner.removeEventListener('pointerdown', onDragStart)
      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onDragEnd)
      window.removeEventListener('pointercancel', onDragEnd)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [])

  // Clicking a title that isn't in the middle turns the dial to it instead of opening it
  const onTitleClick = (e, i) => {
    if (i !== activeRef.current) {
      e.preventDefault()
      select(i)
    }
  }

  // Keyboard (Tab) focus turns the dial to that title; mouse clicks are handled by onTitleClick
  const onTitleFocus = (e, i) => {
    if (e.target.matches(':focus-visible')) select(i)
  }

  return (
    <div className="work-list__inner" ref={innerRef}>
      <div className="work-list__control">
        <i className="work-list__bar" aria-hidden="true" />
        <i className="work-list__knob" ref={knobRef} aria-hidden="true" />

        <div className="work-list__dial">
          <ol className="work-list__titles" style={{ '--active': active }}>
            {works.map((work, i) => (
              <li
                key={work.slug}
                style={{
                  '--offset': i - active,                 // rows from the middle (− above, + below)
                  '--dist': Math.abs(i - active),
                  '--blur': `${BLUR[Math.min(Math.abs(i - active), BLUR.length - 1)]}px`,
                }}
              >
                <a
                  className="work-list__title"
                  href={work.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-current={i === active ? 'true' : undefined}
                  onClick={(e) => onTitleClick(e, i)}
                  onFocus={(e) => onTitleFocus(e, i)}
                >
                  {work.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Thumbnail of the selected work (full-screen background on phones); images cross-fade. */}
      <a
        className="work-list__frame"
        href={works[active].youtube}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        {works.map((work, i) => (
          <img
            key={work.slug}
            src={`/images/work/${work.slug}.jpg`}
            alt=""
            className={i === active ? 'is-active' : ''}
          />
        ))}
      </a>
    </div>
  )
}
