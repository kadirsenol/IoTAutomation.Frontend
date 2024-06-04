import React, { useState } from "react";
import { ContactWrapper } from "./ContactElements";
import { InputAdornment, TextField } from "@mui/material";
import { Send,Email } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import TextArea from "../../../../src/components/Textarea";
import ScrollAnimation from "react-animate-on-scroll";
import { Formik } from "formik";
import InputFileUpload from "../../InputFileUpload";
import { emptyTheFileName } from "../../../store/slices/inputfileuploadSlice";
import { delMessage } from "../../../store/slices/textareaSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";

const sendMailSchema = Yup.object().shape({
  Email: Yup.string()
    .required("Message is required.")
    .email("Please log in in email format.")
    .max(30, "The email should not be more than 30 characters long."),
});

function Contact() {
  const mailmessage = useSelector((state) => state.textarea.message);

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
      toast.error("Message is required.");
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
    <ContactWrapper id="contact">
      <div className="Container">
        <div className="SectionTitle flex justify-center">Contact Me</div>
        <ScrollAnimation animateIn="fadeIn">
          <div className="flex justify-center items-center ">
            <div className="BigCard ">          
              <div className="w-56 mb-1 -mt-7 ">
                <TextArea value={clearText} row={9} width={"350px"} />
              </div>
              <div className="mb-1">
                <InputFileUpload />
              </div>

              <Formik
                initialValues={{ Email: "" }}
                onSubmit={(values, actions) => {
                  setClick(true);
                  sendEmail(values, actions);
                }}
                validationSchema={sendMailSchema}
              >
                {({ values, handleChange, handleSubmit, touched, errors }) => (
                  <div>
                    <TextField
                      id="Email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className="cursor-default -ml-2 mr-1" />
                          </InputAdornment>
                        ),
                        style: {
                          // height: "31px",
                          width: "350px",
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
                      // style={{ height: "24px", width: "10px" }}
                      onClick={handleSubmit}
                      loading={click}
                    >
                      Send
                    </LoadingButton>
                  </div>
                  
                )}
              </Formik>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </ContactWrapper>
  );
}

export default Contact;
