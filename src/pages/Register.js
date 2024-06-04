import { Button, InputAdornment, TextField } from "@mui/material";
import {
  Badge,
  Email,
  Home,
  Login,
  Person,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCloseBackdrop,
  setOpenBackdrop,
} from "../store/slices/mybackdropSlice";
import MyBackdrop from "../components/MyBackdrop";

const registerLoginSchema = Yup.object().shape({
  Ad: Yup.string()
    .required("Name is required.")
    .min(3, "You have a name with at least 3 characters")
    .max(15, "Enter a name with a maximum of 15 characters"),
    Soyad: Yup.string()
    .required("Surnameis required.")
    .min(3, "Enter a Surname with at least 3 characters")
    .max(15, "Enter a surname with a maximum of 15 characters"),
  TcNo: Yup.string()
    .required("Tc No is required")
    .matches(/^\d+$/, "Please enter as a number.")
    .min(11, "Please enter the TcNo consisting of 11 digits.")
    .max(11, "Please enter the TcNo consisting of 11 digits.")
    .test(
      "startzerovalid",
      "Tc No can't start with No 0",
      (value) => value[0] !== "0"
    ),
  Email: Yup.string()
    .required("Message is required.")
    .email("Please log in in email format.")
    .max(30, "The email should not be more than 30 characters long."),
  Password: Yup.string()
    .required("Password is required.")
    .min(4, "Please enter a password that will consist of at least 4 characters."),
  ConfirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("Password")], "The entered passwords do not match. "),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const dispatch = useDispatch();

  const registerSend = async (values,actions) => {
    try {
      const response = await axios.post(
        "/Account/Register",
        values
      );
      if (response.status === 200) {
        toast.success(response.data);
        actions.resetForm();
        navigate("/Login");
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
    dispatch(setCloseBackdrop());
  };

  return (
    <Formik
      initialValues={{
        Ad: "",
        Soyad: "",
        TcNo: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
      }}
      onSubmit={(values,actions) => {
        registerSend(values,actions);
        dispatch(setOpenBackdrop());
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
        <div
          style={{
            backgroundImage: `url(./registerBg.jpg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="flex justify-center min-h-screen items-center"
        >
          <div className="w-1/3 opacity-1 bg-white bg-opacity-80 rounded-xl">
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Ad"
                label="Name"
                className="w-5/6"
                onChange={handleChange("Ad")}
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
            <div className="flex justify-center">
              <TextField
                variant="standard"
                id="Soyad"
                label="Surname"
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Badge className="cursor-default" />
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Email className="cursor-default" />
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      position="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mb-3 flex justify-center">
              <TextField
                variant="standard"
                id="ConfirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "password" : "text"}
                className="w-5/6"
                onChange={handleChange("ConfirmPassword")}
                value={values.ConfirmPassword}
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
              />
            </div>
            <div className=" flex justify-center gap-2 mb-3 me-2">
              <Button variant="contained" color="inherit" size="small" onClick={handleSubmit} startIcon={<PersonAdd className="mb-0.5"/>}>
                Register
              </Button>
              <MyBackdrop />             
              <Button
                onClick={() => navigate("/Login")}
                variant="contained"
                size="small"
                color="inherit"
                startIcon={<Login className="mb-0.5"/>}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="contained"
                size="small"
                color="inherit"
                startIcon={<Home className="mb-0.5"/>}
                className="translate-x-2"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Register;
