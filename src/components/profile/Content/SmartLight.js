import { Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPage} from "../../../store/slices/controlUISlice";
import { useEffect, useState } from "react";
import { ArrowLeft } from "@mui/icons-material";
import SwitchKey from "../../SwitchKey";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const SmartLight = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [isCheckedLoading, setIsCheckedLoading] = useState(false);
  const [changeBackGround, setChangeBackGround] = useState(false);
  const navigate = useNavigate();
  const SmartLightAppIds = useSelector((state)=>state.controlUI.SmartLightAppIds);
  const[espIp, setEspIp] = useState("");

  useEffect(()=>{
    getSmartLightDb();
  },[])

  const setSmartLightEsp= async(mode)=>{             
    try {
      const response = await axios.post(
        `http://${espIp}/led`,
        { state: mode },       
        { baseURL: `http://${espIp}`}
      );
      if (response.status === 200) {
        if(response.data.mode === 1){
          setChangeBackGround(true)
        }
        if(response.data.mode === 0){
          setChangeBackGround(false)
        }
        toast.success(response.data.message);
        setChecked(mode)
      } else {
        toast.info(
          "Beklenmedik bir durum meydana geldi, bilgilerinizi kontrol ederek lutfen tekrar deneyin."
        );
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Sunucuya bağlanılamadı. !");
      } else if (error.response.status === 500) {
        //Problem(), server side bissunes exceptions and all catch error
        toast.error(error.response.data.detail);
      } else if (error.response.status === 400) {
        //BadRequest(), server side valid. Eger frontend validinden bir sekil kurtulursa back validi devreye girecek
        Object.values(error.response.data.errors).forEach((value) => {
          value.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Opps! Beklenmedik bir hata meydana geldi.");
      }
    }
    setIsCheckedLoading(false);
  }


  const setSmartLightDb= async(event)=>{ 
    try {
      const response = await axios.post(
        "SmartLightApp/SetLightMode",
        { LightMode: event.target.checked, SmartLightAppId:SmartLightAppIds[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setSmartLightEsp(event.target.checked)
      } else {
        toast.info(
          "Beklenmedik bir durum meydana geldi, bilgilerinizi kontrol ederek lutfen tekrar deneyin."
        );
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Sunucuya bağlanılamadı. !");
      } else if (error.response.status === 500) {
        //Problem(), server side bissunes exceptions and all catch error
        toast.error(error.response.data.detail);
      } else if (error.response.status === 401) {
        toast.error("Lütfen giriş yapınız.");
        navigate("/Login");
      } else if (error.response.status === 400) {
        //BadRequest(), server side valid. Eger frontend validinden bir sekil kurtulursa back validi devreye girecek
        Object.values(error.response.data.errors).forEach((value) => {
          value.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Opps! Beklenmedik bir hata meydana geldi.");
      }
    }
  }


  const getSmartLightDb= async()=>{ 
    try {
      const response = await axios.post(
        "SmartLightApp/GetLightModeAndEspIp",{SmartLightAppId: SmartLightAppIds[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
          setEspIp(response.data.espIp);
          setChecked(response.data.lightMode);
          setChangeBackGround(response.data.lightMode)
        }
       else {
        toast.info(
          "Beklenmedik bir durum meydana geldi, bilgilerinizi kontrol ederek lutfen tekrar deneyin."
        );
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Sunucuya bağlanılamadı. !");
      } else if (error.response.status === 500) {
        //Problem(), server side bissunes exceptions and all catch error
        toast.error(error.response.data.detail);
      } else if (error.response.status === 401) {
        toast.error("Lütfen giriş yapınız.");
        navigate("/Login");
      } else if (error.response.status === 400) {
        //BadRequest(), server side valid. Eger frontend validinden bir sekil kurtulursa back validi devreye girecek
        Object.values(error.response.data.errors).forEach((value) => {
          value.forEach((message) => {
            toast.error(message);
          });
        });
      } else {
        toast.error("Opps! Beklenmedik bir hata meydana geldi.");
      }
    }
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${changeBackGround ? "./burningLamb.jpg" : "./nonburningLamb.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "background-image 0.5s ease-in-out"
        }}
        className=" min-h-screen relative -mt-9 "
      >
        <div className="flex justify-between">

          <Button
            className="mt-3"
            color="inherit"
            size="small"
            variant="contained"
            onClick={() => dispatch(setPage(0))}
            startIcon={<ArrowLeft className="-me-2 -ms-1"/>}
          >
            Back
          </Button>
          <div className="mt-2.5" >
            {
            isCheckedLoading ? 
            <CircularProgress className="me-3 mt-1" size={25} style={{ color: 'gray' }}/> 
            :
            <SwitchKey svg1="./lightbulb-on.svg" svg2="./lightbulb-off.svg" checked={checked} onChangeSwitch={(event)=>{setIsCheckedLoading(true); setSmartLightDb(event)}} />
            }     
            </div>
        </div>
      </div>
    </>
  );
};
export default SmartLight;
