import React from "react";
import { FaLinkedin, FaGithub, FaMailBulk, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiReadCvLogoFill } from "react-icons/pi";
import styled from "@emotion/styled";
import ScrollAnimation from "react-animate-on-scroll";

const SocialContainer = styled.div`
  position: fixed;
  top: 48%;
  left: 1.5rem;
  transform: translateY(-50%);

  ul {
    display: block;
  }

  .item + .item {
    margin-top: 1rem;
  }

  a {
    font-size: 2.3rem;
    color: rgb(119, 119, 121);
    &:hover {
      color: #333;
    }
  }

  @media screen and (max-width: 1000px) {
    margin-top: 2rem;
    position: relative;
    top: 0;
    left: 0;
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
    }

    a {
      font-size: 2.5rem;
      color: #333;
      &:hover {
        color: #666;
      }
    }

    .item + .item {
      margin-top: 0;
      margin-left: 2rem;
    }
  }
`;
function FixSocialIcon() {
  return (
    <SocialContainer>
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
        <ul>
          <li className="item">
            <a
              href="https://www.linkedin.com/in/kadirsenol/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
          <li className="item">
            <a
              href="https://github.com/kadirsenol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li className="item">
            <a
              href="mailto:kdrsnl_61@hotmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMailBulk />
            </a>
          </li>
          <li className="item">
            <a
              href="https://wa.me/905523642361"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </li>
          <li className="item">
            <a
              href="https://www.google.com.tr/maps/place/%C3%87ekmek%C3%B6y%2F%C4%B0stanbul/@41.0728245,29.2697519,12z/data=!3m1!4b1!4m6!3m5!1s0x14cad2e51ddddf97:0xee27abe63246e12a!8m2!3d41.104235!4d29.3177272!16s%2Fm%2F0gvvqn_?hl=tr&entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLocationDot />
            </a>
          </li>
          <li className="item">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <PiReadCvLogoFill />
            </a>
          </li>
        </ul>
      </ScrollAnimation>
    </SocialContainer>
  );
}

export default FixSocialIcon;
