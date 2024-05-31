import React from "react";
import { stackList } from "../data/Data";
import {
  Image,
  Technologies,
  Tech,
  TechImg,
  TechName,
  ContactWrapper,
} from "./AboutElements";
import ScrollAnimation from "react-animate-on-scroll";
function About() {
  return (
    <ContactWrapper id="about">
      <div className="Container">
        <div className="SectionTitle">About Me</div>
        <div className="BigCard">
        <ScrollAnimation animateIn="fadeInLeft">
          <Image
            src="./myaboutimage.png"
            alt="man-svgrepo"
          />
        </ScrollAnimation>
          <div className="AboutBio">
            <ScrollAnimation animateIn="fadeInLeft">
            Hello! My name is <strong>Kadir ŞENOL</strong>. I'm a Full Stack Developer.
            </ScrollAnimation>

            <br /><br />
            
            <ScrollAnimation animateIn="fadeInLeft">
            I was born in Istanbul in 1997. I have had a passion for software since a young age. Since childhood, I have enjoyed developing individual projects and constantly improving myself.
            </ScrollAnimation>

            <br /><br />

            <ScrollAnimation animateIn="fadeInLeft">
            After completing my high school education in Istanbul, I graduated from Decat University Mechatronics Engineering department between 2016-2017.Later, I completed the 600-hour Full Stack Developer training program offered by Bahçeşehir University.
            </ScrollAnimation>

            <br /><br />

            <ScrollAnimation animateIn="fadeInLeft">
            I have about 2 years of professional professional experience. I also work on IoT projects as a hobby
              <div className="tagline2">
            I am currently preparing for exams to get a master's degree in software engineering. I aim to develop more innovative solutions in the field of software in the future and push the boundaries of technology.
              </div>
            </ScrollAnimation>
            

            <Technologies>
              {stackList.map((stack, index) => (
                <ScrollAnimation animateIn="fadeInLeft" key={index}>
                  <Tech key={index} className="tech">
                    <TechImg src={stack.img} alt={stack.name} />
                    <TechName>{stack.name}</TechName>
                  </Tech>
                </ScrollAnimation>
              ))}
            </Technologies>
          </div>

        </div>
      </div>
    </ContactWrapper>
  );
}

export default About;
