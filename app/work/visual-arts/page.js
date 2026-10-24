import WorkList from './WorkList'

export const metadata = { title: 'Visual Arts Work' }

export default function VisualArts() {
  return (
    <main className="page work-list">
      <h1 className="visually-hidden">Visual Arts Work</h1>
      <WorkList />
    </main>
  )
}
