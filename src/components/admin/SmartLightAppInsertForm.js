import { Button, InputAdornment, TextField } from "@mui/material";
import {
  AssignmentInd,
  Cancel,
  DeleteSweep,
  EmojiObjects, 
  ModelTraining,
  NoteAdd,
  SettingsRemote,
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
import { setIsGetSmartLightApp} from "../../store/slices/adminSlice";


const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,6}|:):([0-9a-fA-F]{1,4}|:){1,5}|(([0-9a-fA-F]{1,4}:){1,5}|:):([0-9a-fA-F]{1,4}|:){1,4}|(([0-9a-fA-F]{1,4}:){1,4}|:):([0-9a-fA-F]{1,4}|:){1,3}|(([0-9a-fA-F]{1,4}:){1,3}|:):([0-9a-fA-F]{1,4}|:){1,2}|(([0-9a-fA-F]{1,4}:){1,2}|:):([0-9a-fA-F]{1,4}|:){1}|(([0-9a-fA-F]{1,4}:){1}|:):([0-9a-fA-F]{1,4}|:))$/;
const registerLoginSchema = Yup.object().shape({  
  UserId: Yup.string()
    .required("UserId is required.")
    .matches(/^\d+$/, "Please enter as a number.")
    .test(
      "startzerovalid",
      "UserId cannot start with 0",
      (value) => !value || (value.length > 0 && value[0] !== "0")
    ),  
  EspIp: Yup.string()
  .test(
    'is-valid-ip',
    'Enter a valid IPv4 or IPv6 address.',
    value => !value || ipv4Regex.test(value) || ipv6Regex.test(value)
  ),
  LightMode: Yup.string()
    .oneOf(['true', 'false'], 'Please just enter isConfirmEmail as "true" or "false".'),
  Active: Yup.string()
    .oneOf(['true', 'false'], 'Please just enter isConfirmEmail as "true" or "false".'),   
  isDelete: Yup.string()
    .oneOf(['true', 'false'], 'Please just enter isConfirmEmail as "true" or "false".')    
});

const SmartLightAppInsertForm = () => {
  const navigate = useNavigate();
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
        "https://api.kadirsenol.com/api/admin/SmartLightApp/InsertSmartLightApp",
        updatedValues,
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            }
        }
      );
      if (response.status === 200) {
        toast.success(response.data);
        dispatch(setIsGetSmartLightApp());
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
        UserId: "",
        LightMode: "",
        EspIp: "",
        isDelete:"",
        Active:""
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
        setFieldValue,
        touched,
        errors,
      }) => (

        <div className="w-full max-w-md mx-auto opacity-1 bg-white bg-opacity-80 rounded-xl p-4">
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="UserId"
                label="UserId"
                className="w-5/6"
                onChange={handleChange("UserId")}
                value={values.UserId}
                onBlur={handleBlur("UserId")}
                error={touched.UserId && Boolean(errors.UserId)}
                helperText={touched.UserId && errors.UserId}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AssignmentInd className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="LightMode"
                label="LightMode"
                className="w-5/6"
                placeholder='false'              
                onChange={handleChange("LightMode")}
                value={values.LightMode}
                onBlur={handleBlur("LightMode")}
                error={touched.LightMode && Boolean(errors.LightMode)}
                helperText={touched.LightMode && errors.LightMode}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmojiObjects className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>               
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="EspIp"
                label="EspIp"
                className="w-5/6"
                onChange={handleChange("EspIp")}
                value={values.EspIp}
                onBlur={handleBlur("EspIp")}
                error={touched.EspIp && Boolean(errors.EspIp)}
                helperText={touched.EspIp && errors.EspIp}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SettingsRemote className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>    
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Active"
                label="Active"
                className="w-5/6"
                placeholder='false'
                onChange={handleChange("Active")}
                value={values.Active}
                onBlur={handleBlur("Active")}
                error={touched.Active && Boolean(errors.Active)}
                helperText={touched.Active && errors.Active}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ModelTraining className="cursor-default" sx={{fontSize:'20px'}}/>
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
                placeholder='false'
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
              disabled={values.UserId !== "" ? false : true}
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
                onClick={() => dispatch(setModalStatus(false)) }
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

export default SmartLightAppInsertForm;
