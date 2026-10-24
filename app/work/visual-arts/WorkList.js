'use client'

import { useState } from 'react'
import { works } from '../../data/works'

// Work list (Figma: Work frame, node 14:37).
// The hovered title is sharp with a lime square behind it; titles get progressively
// blurrier the further they are from it. The thumbnail deck brings the hovered work to the front.
export default function WorkList() {
  const [active, setActive] = useState(0)
  const n = works.length

  return (
    <div className="work-list__inner">
      <ol className="work-list__titles" style={{ '--active': active }}>
        <i className="work-list__square" aria-hidden="true" />
        {works.map((work, i) => {
          const distance = Math.min(Math.abs(i - active), 5)
          const Tag = work.youtube ? 'a' : 'span'
          return (
            <li key={work.slug} style={{ '--distance': distance }}>
              <Tag
                className="work-list__title"
                {...(work.youtube ? { href: work.youtube, target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {work.title}
              </Tag>
            </li>
          )
        })}
      </ol>

      {/* All works stacked in list order, each in its own fixed slot behind the front;
          deeper cards are smaller and blurrier. The hovered work glides to the front,
          the previous one eases back to its slot — the order behind never changes. */}
      <a
        className="work-list__deck"
        {...(works[active].youtube ? { href: works[active].youtube, target: '_blank', rel: 'noopener noreferrer' } : {})}
        tabIndex={-1}
        aria-hidden="true"
      >
        {works.map((work, i) => (
          <div
            key={work.slug}
            className={`work-list__card${i === active ? ' is-active' : ''}`}
            style={{ '--depth': i === active ? 0 : i + 1, zIndex: i === active ? n + 1 : n - i }}
          >
            <img src={`/images/work/${work.slug}.jpg`} alt="" />
          </div>
        ))}
      </a>
    </div>
  )
}
