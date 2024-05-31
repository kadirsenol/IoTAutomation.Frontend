import {  Tungsten, Thermostat, MeetingRoom, MinorCrash, Agriculture, Adjust} from '@mui/icons-material';
import { useState } from 'react';
import SmartLight from './SmartLight';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../../store/slices/controlUISlice';



function ControlUI() {

  const [onMauseThermo, setOnMauseThermo] = useState(false);
  const [onMauseTungsten, setOnMauseTungsten] = useState(false);
  const [onMauseDoor, setOnMauseDoor] = useState(false);
  const [onMauseCar, setOnMauseCar] = useState(false);
  const [OnMauseAgriculture, setOnMauseAgriculture] = useState(false);
  const SmartLightAppIds = useSelector((state)=>state.controlUI.SmartLightAppIds);
  const SmartLightAppIsActive = useSelector((state)=>state.controlUI.SmartLightAppIsActive);


  const page = useSelector((state)=>state.controlUI.page);
  const dispatch = useDispatch();




  return (
    <>
    { 
      page === 2 ?
     <SmartLight/>
     :  
    <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
    backgroundImage: `url(./userUi.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
     }}
    className="flex justify-center min-h-screen items-center relative "
    >
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh' }}>
        <line x1="15%" y1="40%" x2="50%" y2="5%" stroke="grey" strokeWidth="1" />
        <line x1="50%" y1="5%" x2="85%" y2="50%" stroke="grey" strokeWidth="1" />
        <line x1="15%" y1="40%" x2="85%" y2="50%" stroke="grey" strokeWidth="1" />
        <line x1="85%" y1="50%" x2="35%" y2="60%" stroke="grey" strokeWidth="1" />
        <line x1="15%" y1="40%" x2="35%" y2="60%" stroke="grey" strokeWidth="1" />
        <line x1="50%" y1="5%" x2="35%" y2="60%" stroke="grey" strokeWidth="1" />
        <line x1="15%" y1="40%" x2="73%" y2="18%" stroke="grey" strokeWidth="1" />
        <line x1="50%" y1="5%" x2="73%" y2="18%" stroke="grey" strokeWidth="1" />
        <line x1="85%" y1="50%" x2="73%" y2="18%" stroke="grey" strokeWidth="1" />
        <line x1="35%" y1="60%" x2="73%" y2="18%" stroke="grey" strokeWidth="1" />

      </svg>
      <div style={{ position: 'absolute', top: '29%', left: '43.4%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>              
           <Adjust style={{ fontSize:15, color:'GrayText' }} />               
      </div> 
      <div style={{ position: 'absolute', top: '43%', left: '39.6%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>              
           <Adjust style={{ fontSize:15, color:'GrayText' }} />               
      </div> 
      <div style={{ position: 'absolute', top: '44.5%', left: '48.8%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>              
           <Adjust style={{ fontSize:15, color:'GrayText' }} />               
      </div>
      <div style={{ position: 'absolute', top: '21.4%', left: '63.2%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>              
           <Adjust style={{ fontSize:15, color:'GrayText' }} />               
      </div>
      <div style={{ position: 'absolute', top: '25.5%', left: '66.2%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>              
           <Adjust style={{ fontSize:15, color:'GrayText' }} />               
      </div>
      <div style={{ position: 'absolute', top: '40%', left: '15%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <div onMouseEnter={()=>setOnMauseThermo(true)} onMouseLeave={()=>setOnMauseThermo(false)} style={{ width: 70, height: 70, borderRadius: '50%', background: '#666666', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Thermostat  style={{ fontSize: onMauseThermo ? 40 : 30, color:'whitesmoke'}} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <div className={`${SmartLightAppIds.length > 0 && SmartLightAppIsActive.includes(true) ? 'cursor-pointer' : ''}`} onClick={()=>SmartLightAppIds.length > 0 && SmartLightAppIsActive.includes(true) ? dispatch(setPage(2)) : null} onMouseEnter={()=>setOnMauseTungsten(true)} onMouseLeave={()=>setOnMauseTungsten(false)} style={{ width: 70, height: 70, borderRadius: '50%', background: '#666666', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Tungsten style={{ fontSize: onMauseTungsten ? 40 : 30, color:'whitesmoke'  }} />
        </div>
      </div>
      <div style={{ position: 'absolute', top: '50%', left: '85%', transform: 'translate(-50%, -50%)', zIndex: 1 }}> 
        <div onMouseEnter={()=>setOnMauseDoor(true)} onMouseLeave={()=>setOnMauseDoor(false)} style={{ width: 70, height: 70, borderRadius: '50%', background: '#666666', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                
           <MeetingRoom style={{ fontSize: onMauseDoor ? 40 : 30, color:'whitesmoke' }} />               
        </div>
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '35%', transform: 'translate(-50%, -50%)', zIndex: 1 }}> 
        <div onMouseEnter={()=>setOnMauseCar(true)} onMouseLeave={()=>setOnMauseCar(false)} style={{ width: 70, height: 70, borderRadius: '50%', background: '#666666', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>                
           <MinorCrash style={{ fontSize: onMauseCar ? 40 : 30, color:'whitesmoke' }} />               
        </div>
      </div>
      <div style={{ position: 'absolute', top: '18%', left: '73%', transform: 'translate(-50%, -50%)', zIndex: 1 }}> 
        <div onMouseEnter={()=>setOnMauseAgriculture(true)} onMouseLeave={()=>setOnMauseAgriculture(false)} style={{ width: 70, height: 70, borderRadius: '50%', background: '#666666', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>                
           <Agriculture style={{ fontSize: OnMauseAgriculture ? 40 : 30, color:'whitesmoke' }} />               
        </div>
      </div>            
      </div>
      
       }
      </>
  )
}

export default ControlUI
