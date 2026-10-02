import "./About.css";
import SpotlightCard from "./SpotlightCard";
import Statistics from "./Statistics";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-editorial-head">
          <p className="about-kicker">ABOUT THE COMMUNITY <span>／</span> AWS STUDENT BUILDER CLUB · GITS</p>
          <h2 className="about-editorial-title">Cloud skills grow<br /><em>stronger together.</em></h2>
          <p className="about-editorial-deck">
            A student-led space to explore AWS, build real projects, and learn alongside people who are just as curious about what cloud can make possible.
          </p>
        </div>

        {/* Bio Grid */}
        <div className="about-grid">
          <SpotlightCard
            className="custom-spotlight-card about-sub"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <span className="about-card-index">01 / THE COMMUNITY</span>
            We bring together aspiring cloud builders through hands-on workshops,
            real-world projects, technical sessions, and a culture of learning by doing.
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <h3 className="bio-title">Who We Are</h3>
            <p className="bio-text">
              Our community brings together students who are passionate about
              cloud computing, software development, and emerging technologies.
              Whether you're taking your first steps into AWS or looking to
              deepen your expertise, you'll find an environment that encourages
              curiosity, collaboration, and continuous learning.
            </p>

            <p className="bio-text">
              Through interactive workshops, real-world cloud projects and
              technical session, members gain practical
              experience with AWS services while learning industry best
              practices used by professional cloud engineers.
            </p>

            <p className="bio-text">
              More than just learning technology, we believe in building a
              supportive community where ideas are shared, innovation is
              encouraged, and every member has the opportunity to grow both
              technically and professionally.
            </p>
          </SpotlightCard>

          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <h3 className="bio-title">What You'll Experience</h3>
            <ul className="focus-list">
              <li>
                <span className="focus-bullet">&gt;</span>
                <div>
                  <strong>Hands-on AWS Workshops:</strong> Learn cloud computing
                  by building real applications using core AWS services.
                </div>
              </li>

              <li>
                <span className="focus-bullet">&gt;</span>
                <div>
                  <strong>Real-World Projects:</strong> Work on practical cloud
                  solutions that strengthen your cloud skills and career path.
                </div>
              </li>

              <li>
                <span className="focus-bullet">&gt;</span>
                <div>
              <strong>Quizzes & Technical Events:</strong> Collaborate
                  with fellow builders, solve challenging problems, and turn
                  innovative ideas into reality.
                </div>
              </li>

              <li>
                <span className="focus-bullet">&gt;</span>
                <div>
                  <strong>Networking & Career Growth:</strong> Connect with
                  industry professionals, mentors, and peers while preparing for
                  cloud certifications and future career opportunities.
                </div>
              </li>
            </ul>
          </SpotlightCard>
        </div>
        <Statistics />
      </div>
    </section>
  );
}
