// Home (Figma: Home frame) — only the nav and the looping DeeDar video.
export default function Home() {
  return (
    <main className="home">
      {/* Browser plays the first source it supports: 1080p on wider screens, 720p on phones;
          HEVC where supported (smaller), H.264 everywhere else. The loop's
          last 2s dissolve into its first 2s, so the restart is never a hard cut. */}
      <video
        className="home__video"
        poster="/video/deedar-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/deedar-1080-hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L120.90"' media="(min-width: 768px)" />
        <source src="/video/deedar-1080-h264.mp4" type='video/mp4; codecs="avc1.640032"' media="(min-width: 768px)" />
        <source src="/video/deedar-720-hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L93.90"' />
        <source src="/video/deedar-720-h264.mp4" type='video/mp4; codecs="avc1.64001F"' />
      </video>
    </main>
  )
}
