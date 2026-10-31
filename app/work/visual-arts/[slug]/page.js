import { notFound } from 'next/navigation'
import { works } from '../../../data/works'

// One page per work (Figma: Youtube Embed frame): the video and its details.
export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }))
}

export function generateMetadata({ params }) {
  const work = works.find((w) => w.slug === params.slug)
  return work ? { title: work.title } : {}
}

const youtubeId = (url) => url.split('/').pop().split('?')[0]

export default function WorkPage({ params }) {
  const work = works.find((w) => w.slug === params.slug)
  if (!work) notFound()

  return (
    <main className="page work-detail">
      <div className="work-detail__inner">
        <div className="work-detail__video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId(work.youtube)}?rel=0`}
            title={work.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <dl className="work-detail__meta">
          <div>
            <dt>Title :</dt>
            <dd>{work.title}</dd>
          </div>
          <div>
            <dt>Medium :</dt>
            <dd>{work.medium}</dd>
          </div>
          <div>
            <dt>Duration :</dt>
            <dd>{work.duration}</dd>
          </div>
        </dl>

        {/* "About Work" and "Display" sections (Figma) are hidden until their text and images
            are supplied — fields are ready in app/data/works.js; styles in globals.css */}
      </div>
    </main>
  )
}
