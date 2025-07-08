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
            After completing my high school education in Istanbul, I graduated from Firat University Mechatronics Engineering department with a score of 3.0 between 2016-2021. Later, I completed the 600-hour Full Stack Developer training program offered by Bahçeşehir University with outstanding success.  I started my Master's Degree with Thesis in Software Engineering at Kocaeli University in September 2025.
            </ScrollAnimation>

            <br /><br />

            <ScrollAnimation animateIn="fadeInLeft">
            I have about 5 years of professional professional experience and i am to develop more innovative solutions in the field of software in the future and push the boundaries of technology.
              <div className="tagline2">
            
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
