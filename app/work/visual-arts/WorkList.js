'use client'

import { useState } from 'react'
import { works } from '../../data/works'

// Work list (Figma: Work frame, node 14:37).
// The hovered title is sharp with a lime square behind it; titles get progressively
// blurrier the further they are from it. The thumbnail deck shows the hovered work on top.
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

      <div className="work-list__deck" aria-hidden="true">
        {/* Two cards peek out behind: the next works in the list */}
        <div className="work-list__card work-list__card--back2">
          <img src={`/images/work/${works[(active + 2) % n].slug}.jpg`} alt="" />
        </div>
        <div className="work-list__card work-list__card--back1">
          <img src={`/images/work/${works[(active + 1) % n].slug}.jpg`} alt="" />
        </div>
        <a
          className="work-list__card work-list__card--front"
          {...(works[active].youtube ? { href: works[active].youtube, target: '_blank', rel: 'noopener noreferrer' } : {})}
          tabIndex={-1}
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
    </div>
  )
}
