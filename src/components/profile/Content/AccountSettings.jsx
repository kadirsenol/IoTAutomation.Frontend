import { Grid} from '@chakra-ui/react'
import { Person, Visibility, VisibilityOff, Save, Lock } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import { Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import axios from "axios";
import {setModalStatus } from '../../../store/slices/modalSlice';
import Modal from '../../Modal';



const registerLoginSchema = Yup.object().shape({
  Ad: Yup.string()
    .min(3, "En az 3 karakterli bir isim giriniz")
    .max(15, "En fazla 15 karakterli isim giriniz"),
  Soyad: Yup.string()
    .min(3, "En az 3 karakterli bir Soyad giriniz")
    .max(15, "En fazla 15 karakterli Soyad giriniz"),
    NewPassword: Yup.string()
    .min(4, "Lütfen minimum 4 karakterden olusacak bir sifre giriniz."),
    ConfirmPassword: Yup.string()
    .when("NewPassword", (NewPassword, schema) => {
      if(NewPassword[0] !== undefined){
        return schema.required("New Password doğrulama alani boş birakilamaz")
        .oneOf([Yup.ref("NewPassword")], "Girilen parolalar eşleşmiyor. !")
      }      
    }),
    Password: Yup.string()
    .when(['NewPassword', 'Ad', 'Soyad'], {
      is: (NewPassword, Ad, Soyad) => NewPassword || Ad || Soyad,
      then: schema => schema.required("Hesap bilgilerinizi güncellemek için parola girilmesi zorunludur.")
                           .min(4, "Lütfen minimum 4 karakterden oluşacak bir şifre giriniz."),
      otherwise: schema => schema.notRequired()
    })
      
});



function AccountSettings() {

  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const name = useSelector((state)=>state.user.name);
  const surName = useSelector((state)=>state.user.surName);
  const isLogin = useSelector((state) => state.user.isLogin);
  const role = useSelector((state)=>state.user.role)  
  const [click, setClick] = useState(false);
  const dispath = useDispatch();
  const [saveChangeActions, setSaveChangeActions] = useState();
  
  
    const saveChangeSend = async (values) => {
      const EptyToNullValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value === "" ? null : value])
    );
      try {
        const response = await axios.post(
          "/Profile/SaveChange",
          EptyToNullValues,       
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );
        if (response.status === 200) {
          localStorage.removeItem("accessToken");
          localStorage.setItem("accessToken", response.data.accessToken)
          saveChangeActions.resetForm();
          navigate("/Profile");
          toast.success(response.data.message);
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
      setClick(false);
    };



  return (
   
    

      <Formik
      initialValues={{
        Ad: "",
        Soyad: "",
        NewPassword: "",
        ConfirmPassword: "",
        Password:""
      }}
      onSubmit={(values,actions) => {
        setSaveChangeActions(actions);
        dispath(setModalStatus({triggering: ""}));
      }}
      validationSchema={registerLoginSchema}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        touched,
        errors,
      }) => (
        <>
        <Grid
    templateColumns={{ base: 'repeat(1, fr)', md: 'repeat(2, 1fr)' }}
    gap={6}
    
  >           
              <div>
              <TextField
                variant="standard"
                id="Ad"
                label="Ad"              
                className="w-5/6"
                onChange={handleChange("Ad")}
                placeholder={(isLogin && (role === "Üye" || role ==="Admin")) ? name : "Ad"} 
                value={values.Ad}
                onBlur={handleBlur("Ad")}
                error={touched.Ad && Boolean(errors.Ad)}
                helperText={touched.Ad && errors.Ad}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person className="cursor-default" />
                    </InputAdornment>
                  ),
                }}
              />
              </div>
              <div>
              <TextField
                variant="standard"
                id="Soyad"
                label="Soyad"
                placeholder={(isLogin && (role === "Üye" || role ==="Admin")) ? surName : "Soyad"}
                className="w-5/6"
                onChange={handleChange("Soyad")}
                value={values.Soyad}
                onBlur={handleBlur("Soyad")}
                error={touched.Soyad && Boolean(errors.Soyad)}
                helperText={touched.Soyad && errors.Soyad}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person className="cursor-default" />
                    </InputAdornment>
                  ),
                }}
              />    
              </div>
              <div>       
              <TextField
                variant="standard"
                id="NewPassword"
                label="New Password"
                type={showNewPassword ? "password" : "text"}
                className="w-5/6"
                onChange={handleChange("NewPassword")}
                value={values.NewPassword}
                onBlur={handleBlur("NewPassword")}
                error={touched.NewPassword && Boolean(errors.NewPassword)}
                helperText={touched.NewPassword && errors.NewPassword}                
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="cursor-pointer"
                      onClick={() => {
                        setShowNewPassword(!showNewPassword);
                      }}
                      position="end"
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>
                  ),
                }}
              />
              </div>
              <div>
              <TextField
                variant="standard"
                id="ConfirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "password" : "text"}
                className="w-5/6"
                onChange={handleChange("ConfirmPassword")}
                value={ values.NewPassword !== "" ? values.ConfirmPassword : ""}
                onBlur={handleBlur("ConfirmPassword")}
                error={
                  touched.ConfirmPassword && Boolean(errors.ConfirmPassword)
                }
                helperText={touched.ConfirmPassword && errors.ConfirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="cursor-pointer"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      position="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>
                  ),
                }}
                disabled={values.NewPassword !== "" || values.ConfirmPassword !=="" ? false : true}
              />
              </div>
              <div>       
              <TextField
                variant="standard"
                id="Password"
                label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{fontSize:'15px'}}>Password</span>
                    <Lock style={{ fontSize: '14px', marginLeft: '5px' }} />
                </div>
                }
                type={showPassword ? "password" : "text"}
                className="w-4/6"
                onChange={handleChange("Password")}
                value={ (values.NewPassword !== "" || values.Ad !=="" || values.Soyad !== "") ? values.Password : ""}
                onBlur={handleBlur("Password")}
                error={touched.Password && Boolean(errors.Password)}
                helperText={touched.Password && errors.Password}
                disabled={values.NewPassword !== "" || values.Ad !=="" || values.Soyad !=="" ? false : true}
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      position="end"
                    >
                      {showPassword ? <Visibility style={{ fontSize: '23px' }} /> : <VisibilityOff style={{ fontSize: '23px' }} />}
                    </InputAdornment>
                  ),
                  // startAdornment: (
                  //   <InputAdornment
                  //   position="start"                    
                  //   >
                  
                  //     <Lock style={{ fontSize: '14px' }}/>
                  
                  //   </InputAdornment>
                  // ),

                }}
              />
              </div>

              </Grid>
                
              <div className='flex justify-start gap-3 mt-4 '>
                <div>
              <LoadingButton variant="contained"
              color="inherit"
              size="small"
              onClick={handleSubmit}
              loadingPosition="start"
              loading={click}
              startIcon={<Save className="mb-0.5"/>}
              disabled={(values.Password !== "") && ( values.Soyad !=="" || values.Ad !=="" || values.NewPassword !=="") ? false : true}
              >
              
                Save Change

              </LoadingButton>
              </div>                
              </div>
              <div className='border-b -ms-7 -me-7 py-3 border-gray-300'>
                </div>         

            <Modal
              title="Save Change"
              clickYes={() => {
                 dispath(setModalStatus(false));                 
                 setClick(true);
                 saveChangeSend(values);        
              }}
             content="Hesap bilgilerinizin güncellenmesini onaylıyor musunuz ?"
             isYesNoButton={true}
             />            
         </> 
      )}
    </Formik>

        

  
    
      
  )
}

export default AccountSettings
