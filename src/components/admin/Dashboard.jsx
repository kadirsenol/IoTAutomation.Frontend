import { Box, useTheme } from '@mui/material';
import { tokens } from './theme';

import StatBox from './StatBox';
import { Category, FlashlightOff, FlashlightOn, Group, ShoppingCart } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [preOrdersQuantity, setPreOrdersQuantity] = useState("");
  const [usersQuantity, setUsersQuantity] = useState("");
  const [solutionsQuantity, setSetSolutionQuantity] = useState("");
  const [activeSmartLightAppsQuantity, setActiveSmartLightAppsQuantity] = useState("");
  const [notActiveSmartLightAppsQuantity, setNotActiveSmartLightAppsQuantity] = useState("");
  const navigate = useNavigate();





  useEffect(()=>{
    getDashBoardData();
  },[])


  const getDashBoardData = async ()=>{

    try {
      const response = await axios.get("https://api.kadirsenol.com/api/admin/DashBoard/GetData",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
      if (response.status === 200 || response.status === 204 ) {
        setPreOrdersQuantity(response.data.preOrdersCount);
        setUsersQuantity(response.data.usersCount);
        setActiveSmartLightAppsQuantity(response.data.activeSmartLightAppsCount);
        setNotActiveSmartLightAppsQuantity(response.data.notActiveSmartLightAppsCount);
        setSetSolutionQuantity(response.data.solutionsCount)
      }else {
        toast.info(
          "An unexpected situation has occurred, please try again by checking your information."
        );
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Could not connect to the server.");
      } else if (error.response.status === 500) {
        //Problem(), server side bissunes exceptions and all catch error
        toast.error(error.response.data.detail);
      }else if (error.response.status === 401) {
          toast.error("Please make a user login.");
          navigate("/Login"); 
      } else if (error.response.status === 400) {
        //BadRequest(), server side valid. Eger frontend validinden bir sekil kurtulursa back validi devreye girecek
        Object.values(error.response.data.errors).forEach((value) => {
          value.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Opps! An unexpected error has occurred.");
      }
    }        

  }



  return (
    <Box m="15px">

      {/* Grid & Charts */}
      <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
      <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
        gridAutoRows="120px"
        gap="25px"
        // overflow="auto"
      >
        {/* Row 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: '220px', borderRadius: '16px' }}
        >
          <StatBox
            title={preOrdersQuantity}
            subtitle="Pre Orders"
            progress="1"
            increase="100%"
            icon={
              <ShoppingCart
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: '220px', borderRadius: '16px' }}
        >
          <StatBox
            title={usersQuantity}
            subtitle="Users"
            progress="1"
            increase="100%"
            icon={
              <Group
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: '220px', borderRadius: '16px' }}
        >
          <StatBox
            title={solutionsQuantity}
            subtitle="Solutions"
            progress="1"
            increase="100%"
            icon={
              <Category
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box gridColumn="span 2" />
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"          
          sx={{ maxWidth: '220px', borderRadius: '16px', marginLeft:'-80px' }}
        >
          <StatBox
            title={activeSmartLightAppsQuantity}
            subtitle='Active Smart Light Apps'
            progress={(activeSmartLightAppsQuantity/(activeSmartLightAppsQuantity+notActiveSmartLightAppsQuantity))}
            increase={((activeSmartLightAppsQuantity/(activeSmartLightAppsQuantity+notActiveSmartLightAppsQuantity))*100).toFixed(0) + "%"}
            icon={
              <FlashlightOn
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: '220px', borderRadius: '16px', marginLeft:'-30px'  }}
        >
          <StatBox
            title={notActiveSmartLightAppsQuantity}
            subtitle="Not Active SmartLight Apps"
            progress={(notActiveSmartLightAppsQuantity/(activeSmartLightAppsQuantity+notActiveSmartLightAppsQuantity))}
            increase={((notActiveSmartLightAppsQuantity/(activeSmartLightAppsQuantity+notActiveSmartLightAppsQuantity))*100).toFixed(0) + "%"}
            icon={
              <FlashlightOff
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
    </Box>
    </Box>
    </Box>

  );
};

export default Dashboard;
