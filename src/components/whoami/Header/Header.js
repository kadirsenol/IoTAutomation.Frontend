import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./HeaderElements";
import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Header = ({ toggle }) => {

  const navigate = useNavigate();




  return (
    <div className="Container" style={{padding: 0}}>
      <Nav>
       <NavLink onClick={()=>{navigate('/')}}>
              <Home style={{height:'50px', width:'50px'}} />  
        </NavLink> 

              


        <NavMenu>
         <NavLink className="menu-item" to="education">
            Education
          </NavLink>
          <NavLink className="menu-item" to="projects">
            Projects
          </NavLink>
          <NavLink className="menu-item" to="about">
            About
          </NavLink>
          <NavLink className="menu-item" to="contact">
            Contact
          </NavLink>
        </NavMenu>

       
        <Button variant="contained"  className="bg-white" color="inherit" >
        
            Resume         
        </Button>
      
        
        <Bars onClick={toggle} />
      </Nav>
    </div>
  );
};

export default Header;
