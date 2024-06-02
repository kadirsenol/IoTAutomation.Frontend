import { Button, InputAdornment, TextField } from "@mui/material";
import {
  Badge,
  Cancel,
  DeleteSweep,
  Email,
  HourglassTop,
  Lock,
  LockReset,
  MarkEmailRead,
  NoteAdd,
  Person,
  PersonSearch,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModalStatus } from "../../store/slices/modalSlice";
import { LoadingButton } from "@mui/lab";
import { setIsGetUser } from "../../store/slices/adminSlice";

const registerLoginSchema = Yup.object().shape({
  Ad: Yup.string()
    .required("Ad alani boş birakilamaz")
    .min(3, "En az 3 karakterli bir isim giriniz")
    .max(15, "En fazla 15 karakterli isim giriniz"),
  Soyad: Yup.string()
    .required("Soyad alani boş birakilamaz")
    .min(3, "En az 3 karakterli bir Soyad giriniz")
    .max(15, "En fazla 15 karakterli Soyad giriniz"),
  TcNo: Yup.string()
    .required("TcNo alani boş birakilamaz")
    .matches(/^\d+$/, "Lütfen rakam olacak şekilde giriş yapiniz.")
    .min(11, "Lütfen 11 haneli rakamdan olusan Tc No giriniz.")
    .max(11, "Lütfen 11 haneli rakamdan olusan Tc No giriniz.")
    .test(
      "startzerovalid",
      "Tc No 0 ile başlayamaz",
      (value) => !value || (value.length > 0 && value[0] !== "0")
    ),
  Email: Yup.string()
    .required("Email alani boş birakilamaz")
    .email("Lütfen mail formatinda giriş yapiniz.")
    .max(30, "Lütfen 30 karakterden az email adresi giriniz."),
  Password: Yup.string()
    .required("Password alani boş birakilamaz")
    .min(4, "Lütfen minimum 4 karakterden olusacak bir sifre giriniz."),
  Rol: Yup.string()
    .required("Rol alani boş birakilamaz")
    .max(10, "Lütfen en fazla 10 karakterden oluşacak rol giriniz."),
  isConfirmEmail: Yup.string()
    .oneOf(['true', 'false'], 'Lütfen sadece "true" veya "false" şeklinde isConfirmEmail giriniz.'),
  ExprationToken: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "Lütfen geçerli bir tarih ve saat formatında giriş yapınız (YYYY-MM-DD HH:MM:SS)."),   
  isDelete: Yup.string()
    .oneOf(['true', 'false'], 'Lütfen sadece "true" veya "false" şeklinde isConfirmEmail giriniz.')    
});

const UserInsertForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const isOpen = useSelector((state)=>state.modal.status);
  const [loadingButton, setLoadingButton] = useState(false);

  const dispatch = useDispatch();
  const formikRef = useRef();

  useEffect(() => {
    if (!isOpen) return;  
    formikRef.current?.resetForm();
  }, [isOpen]);


  const insertSend = async (values,actions) => {
    const updatedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value === "" ? null : value])
  );
    try {
      const response = await axios.post(
        "http://localhost:5051/api/admin/User/InsertUser",
        updatedValues,
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
      );
      if (response.status === 200) {
        toast.success(response.data);
        dispatch(setIsGetUser());
        actions.resetForm();
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
    dispatch(setModalStatus(false));
    setLoadingButton(false);
  };

  return (
    <Formik     
      innerRef={formikRef} 
      initialValues={{
        Ad: "",
        Soyad: "",
        TcNo: "",
        Email: "",
        Password: "",
        Rol: "",
        isConfirmEmail:"",
        ConfirmEmailGuid:"",
        AccessToken:"",
        RefreshToken:"",
        ExprationToken:"",
        isDelete:""
      }}
      onSubmit={(values,actions) => {
        setLoadingButton(true);
        insertSend(values,actions);
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

        <div className="w-full max-w-md mx-auto opacity-1 bg-white bg-opacity-80 rounded-xl p-4">            
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Ad"
                label="Ad"
                className="w-5/6"
                onChange={handleChange("Ad")}
                value={values.Ad}
                onBlur={handleBlur("Ad")}
                error={touched.Ad && Boolean(errors.Ad)}
                helperText={touched.Ad && errors.Ad}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Soyad"
                label="Soyad"
                className="w-5/6"
                onChange={handleChange("Soyad")}
                value={values.Soyad}
                onBlur={handleBlur("Soyad")}
                error={touched.Soyad && Boolean(errors.Soyad)}
                helperText={touched.Soyad && errors.Soyad}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Person className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="TcNo"
                label="TcNo"
                className="w-5/6"         
                onChange={handleChange("TcNo")}
                value={values.TcNo}
                onBlur={handleBlur("TcNo")}
                error={touched.TcNo && Boolean(errors.TcNo)}
                helperText={touched.TcNo && errors.TcNo}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Badge className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Email"
                label="Email"
                className="w-5/6"
                onChange={handleChange("Email")}
                value={values.Email}
                onBlur={handleBlur("Email")}
                error={touched.Email && Boolean(errors.Email)}
                helperText={touched.Email && errors.Email}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Password"
                label="Password"
                type={showPassword ? "password" : "text"}
                className="w-5/6"
                onChange={handleChange("Password")}
                value={values.Password}
                onBlur={handleBlur("Password")}
                error={touched.Password && Boolean(errors.Password)}
                helperText={touched.Password && errors.Password}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      position="end"
                    >
                      {showPassword ? <Visibility sx={{fontSize:'20px'}}/> : <VisibilityOff sx={{fontSize:'20px'}} />}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Rol"
                label="Rol"
                className="w-5/6"
                onChange={handleChange("Rol")}
                value={values.Rol }
                onBlur={handleBlur("Rol")}
                error={touched.Rol && Boolean(errors.Rol)}
                helperText={touched.Rol && errors.Rol}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonSearch className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="isConfirmEmail"
                label="isConfirmEmail"
                placeholder="false"
                className="w-5/6"
                onChange={handleChange("isConfirmEmail")}
                value={values.isConfirmEmail}
                onBlur={handleBlur("isConfirmEmail")}
                error={touched.isConfirmEmail && Boolean(errors.isConfirmEmail)}
                helperText={touched.isConfirmEmail && errors.isConfirmEmail}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="ConfirmEmailGuid"
                label="ConfirmEmailGuid"
                className="w-5/6"
                onChange={handleChange("ConfirmEmailGuid")}
                value={values.ConfirmEmailGuid}
                onBlur={handleBlur("ConfirmEmailGuid")}
                error={touched.ConfirmEmailGuid && Boolean(errors.ConfirmEmailGuid)}
                helperText={touched.ConfirmEmailGuid && errors.ConfirmEmailGuid}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MarkEmailRead className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="AccessToken"
                label="AccessToken"
                className="w-5/6"
                onChange={handleChange("AccessToken")}
                value={values.AccessToken}
                onBlur={handleBlur("AccessToken")}
                error={touched.AccessToken && Boolean(errors.AccessToken)}
                helperText={touched.AccessToken && errors.AccessToken}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Lock className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="RefreshToken"
                label="RefreshToken"
                className="w-5/6"
                onChange={handleChange("RefreshToken")}
                value={values.RefreshToken}
                onBlur={handleBlur("RefreshToken")}
                error={touched.RefreshToken && Boolean(errors.RefreshToken)}
                helperText={touched.RefreshToken && errors.RefreshToken}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockReset className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="ExprationToken"
                label="ExprationToken"
                className="w-5/6"
                onChange={handleChange("ExprationToken")}
                value={values.ExprationToken}
                onBlur={handleBlur("ExprationToken")}
                error={touched.ExprationToken && Boolean(errors.ExprationToken)}
                helperText={touched.ExprationToken && errors.ExprationToken}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <HourglassTop className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>                        
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="isDelete"
                label="isDelete"
                placeholder="false"
                className="w-5/6"                
                onChange={handleChange("isDelete")}
                value={values.isDelete}
                onBlur={handleBlur("isDelete")}
                error={touched.isDelete && Boolean(errors.isDelete)}
                helperText={touched.isDelete && errors.isDelete}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <DeleteSweep className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className=" flex justify-center mt-3 gap-2 mb-1 me-2">
              <LoadingButton
              variant="contained"
              color="inherit"
              size="small"
              disabled={(values.Ad !== "" &&  values.Soyad !=="" && values.TcNo !=="" && values.Email !=="" && values.Password !=="" && values.Rol !=="") ? false : true}
              loading={loadingButton} 
              onClick={handleSubmit}
              startIcon={<NoteAdd className="mb-0.5"/>}
              sx={{
                padding: '4px 8px',
                fontSize: '11px',
              }}
              >
                Create
              </LoadingButton>              
              <Button
                onClick={() => dispatch(setModalStatus(false))}
                variant="contained"
                size="small"
                color="inherit"
                startIcon={<Cancel className="mb-0.5"/>}
                className="translate-x-1"
                sx={{
                    padding: '4px 8px',
                    fontSize: '11px',
                  }}
              >
                Cancel
              </Button>
            </div>
          </div>
      )}
    </Formik>
)
}

export default UserInsertForm;