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
// On tablets/phones the same list is shown as a plain gallery.
export default function WorkList() {
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const innerRef = useRef(null)
  const knobRef = useRef(null)
  const desktopRef = useRef(null)

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
    const desktop = window.matchMedia('(min-width: 1101px)')
    desktopRef.current = desktop
    let acc = 0
    let pulse = null
    let dragY = null

    const stretch = (dir) => {
      knob.classList.toggle('is-up', dir < 0)
      knob.classList.toggle('is-down', dir > 0)
    }
    const relax = () => knob.classList.remove('is-up', 'is-down')

    const onWheel = (e) => {
      if (!desktop.matches) return
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

    // Dragging the lime square: stretches in the drag direction; every DRAG_STEP px = one title
    const onDragStart = (e) => {
      dragY = e.clientY
      knob.setPointerCapture(e.pointerId)
      knob.classList.add('is-dragging')
    }
    const onDragMove = (e) => {
      if (dragY === null) return
      const dy = e.clientY - dragY
      if (Math.abs(dy) > 3) stretch(Math.sign(dy))
      const steps = Math.trunc(dy / DRAG_STEP)
      if (steps) {
        dragY += steps * DRAG_STEP
        for (let k = 0; k < Math.abs(steps); k++) select(activeRef.current + Math.sign(steps))
      }
    }
    const onDragEnd = () => {
      dragY = null
      knob.classList.remove('is-dragging')
      relax()
    }

    const onKey = (e) => {
      if (!desktop.matches) return
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
    knob.addEventListener('pointerdown', onDragStart)
    knob.addEventListener('pointermove', onDragMove)
    knob.addEventListener('pointerup', onDragEnd)
    knob.addEventListener('pointercancel', onDragEnd)
    window.addEventListener('pointerdown', unlock)
    return () => {
      clearTimeout(pulse)
      inner.removeEventListener('wheel', onWheel)
      inner.removeEventListener('keydown', onKey)
      knob.removeEventListener('pointerdown', onDragStart)
      knob.removeEventListener('pointermove', onDragMove)
      knob.removeEventListener('pointerup', onDragEnd)
      knob.removeEventListener('pointercancel', onDragEnd)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [])

  // Desktop: clicking a title that isn't in the middle turns the dial to it instead of opening it
  const onTitleClick = (e, i) => {
    if (desktopRef.current?.matches && i !== activeRef.current) {
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
              <a className="work-list__thumb-link" href={work.youtube} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                <img className="work-list__thumb" src={`/images/work/${work.slug}.jpg`} alt="" loading="lazy" />
              </a>
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

      {/* Thumbnail of the selected work; all images are layered and cross-fade. */}
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
