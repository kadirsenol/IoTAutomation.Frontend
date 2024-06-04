import {
  Draw,
  Email,
  GitHub,
  LinkedIn,
  LocationOn,
  Send,
  WhatsApp,
} from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import TextArea from "./Textarea";
import InputFileUpload from "./InputFileUpload";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { emptyTheFileName } from "../store/slices/inputfileuploadSlice";
import { delMessage } from "../store/slices/textareaSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const sendMailSchema = Yup.object().shape({
  Email: Yup.string()
    .required("Message is required.")
    .email("Please log in in email format.")
    .max(30, "The email should not be more than 30 characters long."),
});

const Footer = () => {
  const navigate = useNavigate();

  const mailmessage = useSelector((state) => state.textarea.message);
  const isLogin = useSelector((state) => state.user.isLogin);
  const role = useSelector((state) => state.user.role);

  const [click, setClick] = useState(false);
  const [clearText, setClearText] = useState();
  const dispatch = useDispatch();

  const attachmentName = useSelector(
    (state) => state.inputfileupload.attachmentName
  );

  // Base64 string'i Blob'a dönüştürme fonksiyonu
  const base64toBlob = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray]);
  };

  const sendEmail = async (values, actions) => {
    if (mailmessage === null || mailmessage === "") {
      toast.error("Message is required");
    } else {
      const formData = new FormData();
      formData.append("Message", mailmessage);
      formData.append("SenderMailAdress", values.Email);

      const fileContent = localStorage.getItem(attachmentName);
      const blob = base64toBlob(fileContent);
      const file = new File([blob], attachmentName);
      formData.append("Attachment", file, attachmentName);

      try {
        const response = await axios.post("/Mail/SendEmail", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // form verisi olduğunu belirtmek için gerekli
          },
        });
        if (response.status === 200) {
          toast.success(response.data);
          setClearText("");
          setTimeout(() => setClearText(null), 500);
          dispatch(emptyTheFileName(attachmentName));
          actions.resetForm();
          dispatch(delMessage());
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
    }
    setClick(false);
  };

  return (
    <>
      <footer className="bg-gray-200 ">
        <div className="flex justify-center me-24 -mb-24">
          <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase mt-4">
            Contact Me
          </h2>
        </div>
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="flex justify-center mt-3 ms-4">
              {/* <img src={footerimg} className="h-8 me-3" alt="FlowBite Logo" /> */}
              <Draw className="ms-1 me-1 mt-2" fontSize="small" />
              <h2 className=" cursor-default text-sm font-semibold text-gray-900 uppercase mt-2 ms-2">
                Plase Write Me
              </h2>
            </div>

            <div className="flex -mb-32 ms-4 items-center sm:justify-center sm:mt-0 ">
              <div
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/kadirsenol/",
                    "_blank"
                  )
                }
              >
                {" "}
                <LinkedIn className="text-gray-500 hover:text-gray-900 cursor-pointer" />{" "}
              </div>

              <div
                onClick={() =>
                  window.open("https://github.com/kadirsenol", "_blank")
                }
              >
                {" "}
                <GitHub className="text-gray-500 hover:text-gray-900 ms-5 cursor-pointer" />{" "}
              </div>

              <div
                onClick={() =>
                  window.open("mailto:kdrsnl_61@hotmail.com", "_blank")
                }
              >
                {" "}
                <Email className="text-gray-500 hover:text-gray-900 ms-5 cursor-pointer" />{" "}
              </div>

              <div
                onClick={() =>
                  window.open("https://wa.me/905523642361", "_blank")
                }
              >
                {" "}
                <WhatsApp className="text-gray-500 hover:text-gray-900 ms-5 cursor-pointer" />{" "}
              </div>

              <div
                onClick={() =>
                  window.open(
                    "https://www.google.com.tr/maps/place/%C3%87ekmek%C3%B6y%2F%C4%B0stanbul/@41.0728245,29.2697519,12z/data=!3m1!4b1!4m6!3m5!1s0x14cad2e51ddddf97:0xee27abe63246e12a!8m2!3d41.104235!4d29.3177272!16s%2Fm%2F0gvvqn_?hl=tr&entry=ttu",
                    "_blank"
                  )
                }
              >
                {" "}
                <LocationOn className="text-gray-500 hover:text-gray-900 ms-5 cursor-pointer" />{" "}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <h2 className=" cursor-pointer  mt-6 text-sm font-semibold text-gray-900 uppercase">
                  Home
                </h2>
              </div>

              {isLogin && (role === "Üye" || role === "Admin") ? (
                <div
                  onClick={() => {
                    navigate("/Register");
                  }}
                >
                  <h2 className="cursor-pointer -ms-3 mt-6 text-sm font-semibold text-gray-900 uppercase">
                    Register
                  </h2>
                </div>
              ) : (
                <div
                  onClick={() => {
                    navigate("/Login");
                  }}
                >
                  <h2 className="cursor-pointer mt-6 text-sm font-semibold text-gray-900 uppercase">
                    Login
                  </h2>
                </div>
              )}

              <div
                onClick={() => {
                  navigate("/Whoami");
                }}
              >
                <h2 className=" cursor-pointer mt-6 text-sm font-semibold text-gray-900 uppercase">
                  Who am I ?
                </h2>
              </div>
            </div>
          </div>
          <hr className="my-3 border-gray-200 sm:mx-auto lg:my-8" />

          <div className="w-56 mb-1 -mt-7">
            <TextArea value={clearText} row={6} width={"auto"} />
          </div>
          <div className="flex mb-1">
            <InputFileUpload />
          </div>

          <div className="flex justify-start -mb-10  ">
            <Formik
              initialValues={{ Email: "" }}
              onSubmit={(values, actions) => {
                setClick(true);
                sendEmail(values, actions);
              }}
              validationSchema={sendMailSchema}
            >
              {({ values, handleChange, handleSubmit, touched, errors }) => (
                <>
                  <TextField
                    id="Email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email className="cursor-default -ml-2 mr-1" />
                        </InputAdornment>
                      ),
                      style: {
                        height: "31px",
                        width: "250px",
                        fontSize: "14px",
                        color: "black",
                      },
                    }}
                    onChange={handleChange("Email")}
                    size="small"
                    placeholder="Enter your email adress.."
                    value={values.Email}
                    error={touched.Email && Boolean(errors.Email)}
                    helperText={touched.Email && errors.Email}
                  ></TextField>

                  <LoadingButton
                    color="inherit"
                    className="ms-2 mt-1"
                    size="small"
                    variant="outlined"
                    endIcon={<Send />}
                    style={{ height: "24px", width: "10px" }}
                    onClick={handleSubmit}
                    loading={click}
                  >
                    Send
                  </LoadingButton>
                </>
              )}
            </Formik>
          </div>
        </div>
        <div className="flex justify-end items-end">
          <span className="text-sm text-gray-500 sm:text-center me-3 mb-1">
            © 2024{" "}
            <a href="" className="hover:underline text-black">
              Kadir Şenol ™
            </a>
            . It is not intended for commercial purposes.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
