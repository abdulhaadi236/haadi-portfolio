import { notFound } from 'next/navigation'
import { works } from '../../../data/works'

// One page per work (Figma: Youtube Embed frame): the video, its details, "About Work" and "Display".
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

        <section className="work-detail__section">
          <h1 className="work-detail__heading">About Work</h1>
          {work.about.length > 0 ? (
            work.about.map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <p className="work-detail__placeholder">Text coming soon.</p>
          )}
        </section>

        <section className="work-detail__section">
          <h2 className="work-detail__heading">Display</h2>
          <img
            className="work-detail__display"
            src={work.display || `/images/work/${work.slug}.jpg`}
            {...(work.display ? {} : {
              srcSet: `/images/work/sm/${work.slug}.jpg 1200w, /images/work/${work.slug}.jpg 1920w`,
              sizes: '(max-width: 887px) 100vw, 855px',
            })}
            alt={`${work.title} — display`}
            loading="lazy"
          />
        </section>
      </div>
    </main>
  )
}
