import React from "react";
import Card from "../Card/Card";
import { WorkExperienceList } from "../data/Data";
function WorkExperience() {
  return (
    <>      
      <div className="WorkExperience" id="workExperience">
        <div className="Container ">
          <div className="SectionTitle">Work Experience</div>
          <Card data={WorkExperienceList} />
        </div>
      </div>
    </>
  );
}

export default WorkExperience;
