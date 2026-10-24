'use client'

import { useState } from 'react'
import { works } from '../../data/works'

// Work list (Figma: Work frame, node 14:37).
// The hovered title is sharp with a lime square behind it; titles get progressively
// blurrier the further they are from it. The thumbnail deck brings the hovered work to the front.
export default function WorkList() {
  const [active, setActive] = useState(0)
  // Card currently pulled out of the deck — only while a title is hovered
  const [pulled, setPulled] = useState(null)
  const n = works.length

  return (
    <div className="work-list__inner">
      <ol className="work-list__titles" style={{ '--active': active }} onMouseLeave={() => setPulled(null)}>
        <i className="work-list__square" aria-hidden="true" />
        {works.map((work, i) => {
          const distance = Math.min(Math.abs(i - active), 5)
          const Tag = work.youtube ? 'a' : 'span'
          return (
            <li key={work.slug} style={{ '--distance': distance }}>
              <Tag
                className="work-list__title"
                {...(work.youtube ? { href: work.youtube, target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={() => { setActive(i); setPulled(i) }}
                onFocus={() => { setActive(i); setPulled(i) }}
                onBlur={() => setPulled(null)}
              >
                {work.title}
              </Tag>
            </li>
          )
        })}
      </ol>

      {/* All works stacked in list order, like a pile of discs: each card has a fixed slot,
          deeper ones smaller and blurrier. Hovering a title slides its card straight up out
          of the pile (it stays in its slot, so cards in front still cover its lower part). */}
      <a
        className="work-list__deck"
        {...(pulled !== null && works[pulled].youtube ? { href: works[pulled].youtube, target: '_blank', rel: 'noopener noreferrer' } : {})}
        tabIndex={-1}
        aria-hidden="true"
      >
        {works.map((work, i) => (
          <div
            key={work.slug}
            className={`work-list__card${i === pulled ? ' is-pulled' : ''}`}
            style={{ '--depth': i, zIndex: n - i }}
          >
            <img src={`/images/work/${work.slug}.jpg`} alt="" />
          </div>
        ))}
      </a>
    </div>
  )
}
