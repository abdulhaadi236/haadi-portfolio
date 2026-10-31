'use client'

import { useState } from 'react'
import { works } from '../../data/works'

// Work list (Figma: Work frame, node 14:37).
// The hovered title is sharp with a lime square behind it; titles get progressively
// blurrier the further they are from it. The thumbnail on the right cross-fades to the hovered work.
export default function WorkList() {
  const [active, setActive] = useState(0)

  return (
    <div className="work-list__inner">
      <ol className="work-list__titles" style={{ '--active': active }}>
        <i className="work-list__square" aria-hidden="true" />
        {works.map((work, i) => {
          const distance = Math.min(Math.abs(i - active), 5)
          const Tag = work.youtube ? 'a' : 'span'
          return (
            <li key={work.slug} style={{ '--distance': distance }}>
              {work.youtube && (
                <a className="work-list__thumb-link" href={work.youtube} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                  <img className="work-list__thumb" src={`/images/work/${work.slug}.jpg`} alt="" loading="lazy" />
                </a>
              )}
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
