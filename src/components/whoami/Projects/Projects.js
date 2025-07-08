import React from "react";
import Card from "../Card/Card";
import { ProjectList } from "../data/Data";
function Projects() {
  return (
    <>      
      <div className="ProjectWrapper" id="projects">
        <div className="Container ">
          <div className="SectionTitle">Professional Projects</div>
          <Card data={ProjectList} />
        </div>
      </div>
    </>
  );
}

export default Projects;
