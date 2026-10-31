'use client'

import { useEffect, useRef, useState } from 'react'
import { works } from '../../data/works'
import { tick } from './tick'

const ROW = 65          // px between titles (Figma)
const STEP_DELTA = 40   // trackpad distance that counts as one notch
const NOTCH = 50        // a single wheel event this big is a mouse-wheel notch → exactly one step
const SNAP_MS = 140     // quick snap per notch — tactile, not smooth
const DRAG_STEP = 24    // px of dragging the scroll wheel that counts as one step
const WHEEL_FRAMES = 12 // frames in the scroll-wheel sprite (public/images/ui/scroll-wheel.png)
const WHEEL_W = 41.25   // displayed width of one frame (strip shown at 495 × 72; animation 2: 25)
const FRAME_MS = 16     // per frame → one full turn ≈ 0.2s

// Work list (Figma: Work frame, node 14:37).
// The hovered title is sharp with a lime square behind it; titles get progressively
// blurrier the further they are from it. The thumbnail on the right cross-fades to the hovered work.
// On desktop the titles scroll on their own (the page stays still) one title per notch, snapping
// into place with a gear-like tick; the title under the mouse becomes the active one.
// A scroll-wheel icon beside the list turns one full revolution per step (forward for down,
// reversed for up) and can itself be dragged up/down to step the titles.
export default function WorkList() {
  const [active, setActive] = useState(0)
  const listRef = useRef(null)
  const wheelRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    const wheel = wheelRef.current
    const desktop = window.matchMedia('(min-width: 1101px)')
    let acc = 0
    let target = 0
    let anim = null
    let pointer = null
    let spin = null

    // After a step: the title under the mouse becomes active; if the mouse isn't over the list
    // (e.g. dragging the wheel), the title in the top row does.
    const updateActive = () => {
      const li = pointer && document.elementFromPoint(pointer.x, pointer.y)?.closest('.work-list__titles li')
      if (li) setActive([...list.querySelectorAll(':scope > li')].indexOf(li))
      else setActive(Math.min(Math.round(target / ROW), works.length - 1))
    }

    // One revolution of the wheel icon: down plays frames 2…12 then back to 1;
    // up jumps to 12 and counts down to 1.
    const spinWheel = (dir) => {
      clearInterval(spin)
      const seq = dir > 0
        ? [...Array(WHEEL_FRAMES - 1).keys()].map((k) => k + 1).concat(0)
        : [...Array(WHEEL_FRAMES - 1).keys()].map((k) => WHEEL_FRAMES - 1 - k).concat(0)
      let k = 0
      spin = setInterval(() => {
        wheel.style.backgroundPositionX = `${-seq[k] * WHEEL_W}px`
        if (++k >= seq.length) clearInterval(spin)
      }, FRAME_MS)
    }

    // Move the titles by `steps` rows (±), ticking and spinning once per row
    const step = (steps) => {
      const max = Math.floor((list.scrollHeight - list.clientHeight) / ROW) * ROW
      let moved = 0
      for (let k = 0; k < Math.abs(steps); k++) {
        const next = Math.min(Math.max(target + Math.sign(steps) * ROW, 0), max)
        if (next === target) break
        target = next
        moved++
        tick()
      }
      if (moved) {
        spinWheel(Math.sign(steps))
        snapTo(target)
      }
    }

    const snapTo = (top) => {
      cancelAnimationFrame(anim)
      const from = list.scrollTop
      const start = performance.now()
      const frame = (now) => {
        const p = Math.min((now - start) / SNAP_MS, 1)
        list.scrollTop = from + (top - from) * (1 - Math.pow(1 - p, 3))   // ease-out: quick click into place
        if (p < 1) anim = requestAnimationFrame(frame)
        else updateActive()
      }
      anim = requestAnimationFrame(frame)
    }

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
      if (steps) step(steps)
    }

    // Dragging the wheel icon: every DRAG_STEP px down/up moves one title
    let dragY = null
    const onDragStart = (e) => {
      dragY = e.clientY
      wheel.setPointerCapture(e.pointerId)
      wheel.classList.add('is-dragging')
    }
    const onDragMove = (e) => {
      if (dragY === null) return
      const steps = Math.trunc((e.clientY - dragY) / DRAG_STEP)
      if (steps) {
        dragY += steps * DRAG_STEP
        step(steps)
      }
    }
    const onDragEnd = () => {
      dragY = null
      wheel.classList.remove('is-dragging')
    }

    const onMove = (e) => { pointer = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { pointer = null }
    // Wake the audio as soon as the visitor clicks anywhere (browsers require a click first)
    const unlock = () => tick.unlock?.()

    unlock()   // works straight away if the visitor arrived by clicking a link on the site
    list.addEventListener('wheel', onWheel, { passive: false })
    wheel.addEventListener('wheel', onWheel, { passive: false })
    wheel.addEventListener('pointerdown', onDragStart)
    wheel.addEventListener('pointermove', onDragMove)
    wheel.addEventListener('pointerup', onDragEnd)
    wheel.addEventListener('pointercancel', onDragEnd)
    list.addEventListener('mousemove', onMove)
    list.addEventListener('mouseleave', onLeave)
    window.addEventListener('pointerdown', unlock)
    return () => {
      cancelAnimationFrame(anim)
      clearInterval(spin)
      list.removeEventListener('wheel', onWheel)
      wheel.removeEventListener('wheel', onWheel)
      wheel.removeEventListener('pointerdown', onDragStart)
      wheel.removeEventListener('pointermove', onDragMove)
      wheel.removeEventListener('pointerup', onDragEnd)
      wheel.removeEventListener('pointercancel', onDragEnd)
      list.removeEventListener('mousemove', onMove)
      list.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [])

  return (
    <div className="work-list__inner">
      <ol className="work-list__titles" ref={listRef} style={{ '--active': active }}>
        <i className="work-list__square" aria-hidden="true" />
        {works.map((work, i) => {
          const distance = Math.min(Math.abs(i - active), 5)
          const Tag = work.youtube ? 'a' : 'span'
          return (
            <li key={work.slug} style={{ '--distance': distance }} onMouseEnter={() => setActive(i)}>
              {work.youtube && (
                <a className="work-list__thumb-link" href={work.youtube} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                  <img className="work-list__thumb" src={`/images/work/${work.slug}.jpg`} alt="" loading="lazy" />
                </a>
              )}
              <Tag
                className="work-list__title"
                {...(work.youtube ? { href: work.youtube, target: '_blank', rel: 'noopener noreferrer' } : {})}
                onFocus={() => setActive(i)}
              >
                {work.title}
              </Tag>
            </li>
          )
        })}
      </ol>

      {/* Scroll-wheel icon: spins with each step and can be dragged up/down */}
      <div className="work-list__wheel" ref={wheelRef} aria-hidden="true" />

      {/* One frame on the right (Figma: 564 × 372 at the first title); all images are layered
          inside it and cross-fade to the hovered work. Clicking opens that work's video. */}
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
