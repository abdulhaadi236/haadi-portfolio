export const metadata = { title: 'About' }

// About (Figma: About frame, node 14:14)
export default function About() {
  return (
    <main className="page about">
      <h1 className="visually-hidden">About</h1>
      <div className="about__inner">
        <div className="about__photo">
          <i className="about__photo-accent" aria-hidden="true" />
          <img src="/images/profile.jpg" alt="Abdul Haadi" width="195" height="195" />
        </div>

        <div className="about__bio">
          <p>
            Haadi is a visual artist working in video and animation, based between Lahore and Richmond,
            Virginia. His work is concerned with land politics, post-colonial history, and the way the
            state treats its own peripheries. He researches these questions in the margins of Pakistan,
            in places far from the center that are often overlooked.
          </p>
          <p>
            Objects are central to this. Haadi brings together objects from different places, some found
            in cities and some far outside them, and places them in relation to each other. Each carries
            its own history, but side by side they create new meanings and contexts. Objects also give
            him a way around censorship. When a problem can’t be addressed directly, he lets objects say
            it for him.
          </p>
          <p>
            Haadi came to animation through painting and still treats it that way. For him, animation is
            another way of painting rather than a sequence of drawn frames. It adds two more dimensions to
            the painting, movement and sound.
          </p>
          <p>
            He returns to Twelve Gates Arts in Philadelphia as an exhibiting artist in November 2026. He
            has also exhibited at the Anderson Gallery in Richmond, Virginia, and at the National Art
            Gallery in Islamabad. He took part in Where Soft Blades Meet, a group exhibition organized by
            the Lahore Biennale Foundation, and in Art Exchange, a moving image exhibition by the British
            Council and Lux Awards. He completed the Home Is Horizon residency at Art Articulate in Lahore,
            and has shown work at the Lahore Digital Festival, Haam Gallery and the Faiz Festival.
          </p>
          <p>
            Haadi taught at the National College of Arts, Lahore, for two years, and is now a Graduate
            Teaching Assistant at Virginia Commonwealth University. He holds a bachelor’s in Fine Arts from
            the National College of Arts and is pursuing a master’s in Kinetic Imaging at Virginia
            Commonwealth University.
          </p>
        </div>

        <a className="about__resume" href="/documents/Abdul_Haadi_Resume.pdf" download>
          <i className="hover-square" aria-hidden="true" />
          <span>Download Resume</span>
        </a>
      </div>
    </main>
  )
}
