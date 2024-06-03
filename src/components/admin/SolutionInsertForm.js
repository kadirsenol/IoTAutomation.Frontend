import { Button, InputAdornment, TextField } from "@mui/material";
import {
  Abc,
  AttachMoney,
  Cancel,
  DataArray,
  DeleteSweep,
  Description,
  Image,
  NoteAdd,
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
import { setIsGetSolution} from "../../store/slices/adminSlice";

const registerLoginSchema = Yup.object().shape({
  Name: Yup.string()
    .required("Çözüm ismi boş birakilamaz")
    .min(3, "En az 3 karakterli bir isim giriniz")
    .max(15, "En fazla 15 karakterli isim giriniz"),
  Price: Yup.string()
    .required("Price alani boş birakilamaz")
    .matches(/^\d+$/, "Lütfen rakam olacak şekilde giriş yapiniz.")
    .min(1, "Lütfen en düşük 1 olacak sekilde Price giriniz.")
    .max(5, "Lütfen en fazla 99999 olacak sekilde Price giriniz.")
    .test(
      "startzerovalid",
      "Price 0 ile başlayamaz",
      (value) => !value || (value.length > 0 && value[0] !== "0")
    ),  
  FileImage: Yup.mixed()
    .required("Çözüm resmi boş bırakılamaz"),  
  Description: Yup.string()
    .required("Description boş birakilamaz"),
  DetailedDescription: Yup.string()
    .required("Detailed Description boş birakilamaz"),
  isDelete: Yup.string()
    .oneOf(['true', 'false'], 'Lütfen sadece "true" veya "false" şeklinde isConfirmEmail giriniz.')    
});

const SolutionInsertForm = () => {
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
        "https://api.kadirsenol.com/api/admin/Solution/InsertSolution",
        updatedValues,
        {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              'Content-Type': 'multipart/form-data'
            }
        }
      );
      if (response.status === 200) {
        toast.success(response.data);
        dispatch(setIsGetSolution());
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
        Name: "",
        Price: "",
        FileImage: null,
        Description: "",
        DetailedDescription: "",
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
        setFieldValue,
        touched,
        errors,
      }) => (

        <div className="w-full max-w-md mx-auto opacity-1 bg-white bg-opacity-80 rounded-xl p-4">            
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Name"
                label="Name"
                className="w-5/6"
                onChange={handleChange("Name")}
                value={values.Name}
                onBlur={handleBlur("Name")}
                error={touched.Name && Boolean(errors.Name)}
                helperText={touched.Name && errors.Name}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Abc className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Price"
                label="Price"
                className="w-5/6"
                onChange={handleChange("Price")}
                value={values.Price}
                onBlur={handleBlur("Price")}
                error={touched.Price && Boolean(errors.Price)}
                helperText={touched.Price && errors.Price}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AttachMoney className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                key={isOpen}
                variant="standard"
                id="FileImage"
                label="FileImage"
                type="file"
                className="w-5/6"
                onChange={(event) => {
                  setFieldValue("FileImage", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur("FileImage")}
                error={touched.FileImage && Boolean(errors.FileImage)}
                helperText={touched.FileImage && errors.FileImage}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Image className="cursor-default" sx={{fontSize:'20px'}} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Description"
                label="Description"
                className="w-5/6"
                onChange={handleChange("Description")}
                value={values.Description}
                onBlur={handleBlur("Description")}
                error={touched.Description && Boolean(errors.Description)}
                helperText={touched.Description && errors.Description}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <DataArray className="cursor-default" sx={{fontSize:'20px'}}/>
                    </InputAdornment>
                  ),
                }}
              />
            </div>              
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="DetailedDescription"
                label="DetailedDescription"
                className="w-5/6"
                onChange={handleChange("DetailedDescription")}
                value={values.DetailedDescription}
                onBlur={handleBlur("DetailedDescription")}
                error={touched.DetailedDescription && Boolean(errors.DetailedDescription)}
                helperText={touched.DetailedDescription && errors.DetailedDescription}
                sx={{
                    '& input': { fontSize: '16px' },
                    '& .MuiInputLabel-root': { fontSize: '16px' },
                    '& .MuiFormHelperText-root': { fontSize: '16px' },
                    '& .Mui-error': { fontSize: '14px' }
                  }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Description className="cursor-default" sx={{fontSize:'20px'}}/>
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
              disabled={(values.Name !== "" &&  values.Price !=="" && values.FileImage !==null && values.Description !=="" && values.DetailedDescription !=="") ? false : true}
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

export default SolutionInsertForm;
