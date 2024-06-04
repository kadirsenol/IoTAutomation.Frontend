import { Button, InputAdornment, TextField } from "@mui/material";
import {
  Badge,
  Cancel,
  DeleteSweep,
  Edit,
  Email,
  HourglassTop,
  Key,
  Lock,
  LockReset,
  MarkEmailRead,
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
    .min(3, "You have a name with at least 3 characters")
    .max(15, "Enter a name with a maximum of 15 characters"),
  Soyad: Yup.string()
    .min(3, "Enter a Surname with at least 3 characters")
    .max(15, "Enter a surname with a maximum of 15 characters"),
  TcNo: Yup.string()
    .matches(/^\d+$/, "Please enter as a number.")
    .min(11, "Please enter the TcNo consisting of 11 digits.")
    .max(11, "Please enter the TcNo consisting of 11 digits.")
    .test(
      "startzerovalid",
      "Tc No can't start with No 0",
      (value) => !value || (value.length > 0 && value[0] !== "0")
    ),
  Email: Yup.string()
    .email("Please log in in email format.")
    .max(30, "The email should not be more than 30 characters long."),
  Password: Yup.string()
    .min(4, "Please enter a password that will consist of at least 4 characters."),
  Rol: Yup.string()
    .max(10, "Please enter a role that will consist of a maximum of 10 characters."),
  isConfirmEmail: Yup.string()
    .oneOf(['true', 'false'], 'Please just enter isConfirmEmail as "true" or "false".'),
  ExprationToken: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, "Please log in with a valid date and time format (YYYY-MM-DD HH:MM:SS)."),   
  isDelete: Yup.string()
    .oneOf(['true', 'false'], 'Please just enter isConfirmEmail as "true" or "false".')    
});

const UserUpdateForm = ({user}) => {
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


  const updateSend = async (values,actions) => {
    const updatedValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value === "" ? null : value])
    );
    try {
      const response = await axios.post(
        "https://api.kadirsenol.com/api/admin/User/UpdateUser",
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
          "An unexpected situation has occurred, please try again by checking your information."
        );
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Could not connect to the server.");
      } else if (error.response.status === 500) {
        //Problem(), server side bissunes exceptions and all catch error
        toast.error(error.response.data.detail);
    } else if (error.response.status === 401) {
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
    dispatch(setModalStatus(false));
    setLoadingButton(false);
  };

  return (
    <Formik     
      innerRef={formikRef} 
      initialValues={{
        Id:`${user.id}`,
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
        updateSend(values,actions);
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
                id="Id"
                label={"Id"}
                disabled={true}
                className="w-5/6"
                onChange={handleChange("Id")}
                value={user.id}
                onBlur={handleBlur("Id")}
                error={touched.Id && Boolean(errors.Id)}
                helperText={touched.Id && errors.Id}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Key className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Ad"
                label="Ad"
                className="w-5/6"
                placeholder={user.ad}
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
                placeholder={user.soyad}
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
                placeholder={user.tcNo}
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
                placeholder={user.email}
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
                placeholder={user.password}
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
                placeholder={user.rol}
                onChange={handleChange("Rol")}
                value={values.Rol}
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
                className="w-5/6"
                placeholder={user.isConfirmEmail ? 'true' : 'false'}
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
                placeholder={user.confirmEmailGuid}
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
                placeholder={user.accessToken}
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
                placeholder={user.refreshToken}
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
                placeholder={user.exprationToken}
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
                placeholder={user.isDelete ? 'true' : 'false'}
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
              disabled={(values.Ad === "" &&  values.Soyad ==="" && values.TcNo ==="" && values.Email ==="" && values.Password ===""
              && values.Rol ==="" && values.isConfirmEmail ==="" && values.ConfirmEmailGuid ==="" && values.AccessToken ===""
              && values.RefreshToken ==="" && values.ExprationToken ==="" && values.isDelete ==="") ? true : false}
              loading={loadingButton} 
              onClick={handleSubmit}
              startIcon={<Edit className="mb-0.5"/>}
              sx={{
                padding: '4px 8px',
                fontSize: '11px',
              }}
              >
                Update
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

export default UserUpdateForm;
