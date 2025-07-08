import React from "react";
import Hero from "../../src/components/whoami/Hero/Hero";
import Projects from "../../src/components/whoami/Projects/Projects";
import About from "../../src/components/whoami/About/About";
import Contact from "../../src/components/whoami/Contact/Contact";
import Footer from "../../src/components/whoami/Footer/Footer";
import FixSocialIcon from "../../src/components/whoami/SocialIcon/FixSocialIcon";
import ScrollToTop from "../../src/components/whoami/SocialIcon/ScrollToTop";
import Education from "../components/whoami/Education/Education";
import WorkExperience from "../../src/components/whoami/WorkExperience/WorkExperience";





function Whoami() {
  return (
    <div className=" bg-cover bg-center bg-no-repeat min-h-screen  " style={{backgroundImage:`url(./apBg.svg)`,backgroundAttachment:'fixed'}}>
      <Hero />
      <Education/>
      <Projects />
      <WorkExperience />
      <About />
      <Contact />
      <FixSocialIcon />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default Whoami;
