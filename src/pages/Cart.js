import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import {
  AddCircleOutline,
  DeleteForever,
  DoneAll,
  RemoveCircleOutline,
} from "@mui/icons-material";
import {setClickSolutionCart} from "../store/slices/cartSlice";
import Modal from "../components/Modal";
import { setModalStatus } from "../store/slices/modalSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";


const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cart.solutions);
  const [allDeleteClick, setAllDeleteClick] = useState(false);
  const[acceptCartClick, setAcceptCartClick] = useState(false);

  const[trigger, setTrigger] = useState("");
  const[title, setTitle] = useState("");
  const[content, setContent] = useState("");
  const[triggerSolutionId, setTriggerSolutionId] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);




  const AcceptCart = async () => {
      try {
        const response = await axios.post(
          "/PreOrder/Insert",
          {
            Id: data.map(item=>item.id),
            quantity:data.map(item=>item.quantity)
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (response.status === 200) {                                           
          toast.success(response.data);          
          await DeleteCart();
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
      setAcceptCartClick(false);
  };

  const DeleteSolution =async ()=>{
      try {
        const response = await axios.post(
          "/CartDetail/Delete",
          {
           triggerId: triggerSolutionId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (response.status === 200) {
            dispatch(setClickSolutionCart());         
          toast.success(response.data);
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
    setLoadingButton(false);      
    dispatch(setModalStatus(false));
  }



  const DeleteCart =async ()=>{
    try {
      const response = await axios.post(
        "/CartDetail/Delete",
        {
          triggerId: null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
          dispatch(setClickSolutionCart());
        toast.success(response.data);
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
    setAllDeleteClick(false);
}

  const quantityProcess = async (element, quantity) => {
    try {
      const response = await axios.post(
        "/CartDetail/Insert",
        {
          solutionId: element.id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        dispatch(setClickSolutionCart());
        toast.success(response.data);
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
  };

  return (
    <>
      {data.length !== 0 ? (
        <div
          className="flex justify-center items-center bg-cover bg-center bg-no-repeat min-h-screen"
          style={{
            backgroundImage: `url(./cartBg.svg)`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="w-10/12">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-7">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Solution
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((element, index) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="p-4">
                          <img
                            src={`./${element.image}`}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="IoT"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {element.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <IconButton                            
                              id={index}
                              onClick={() => {
                                if(element.quantity > 1){
                                  quantityProcess(element, 2);
                                }
                              }}
                            >
                             <RemoveCircleOutline />
                            </IconButton>
                            <div>
                              <div
                                type=""
                                id={index}
                                className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={1}
                                required=""
                                readOnly
                              >
                                {element.quantity}
                              </div>
                            </div>
                            <IconButton
                              id={index}
                              onClick={() => {
                                quantityProcess(element, 1);
                              }}
                            >
                             <AddCircleOutline />
                            </IconButton>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {element.price}
                        </td>
                        <td className="px-6 py-4">
                          <IconButton
                            aria-label="delete"
                            onClick={() =>{
                              dispatch(setModalStatus(true));
                              setTrigger('ds');
                              setTitle('Delete');
                              setContent('İlgili ön siparişi silmek istediğinize emin misiniz ?');
                              setTriggerSolutionId(element.id);
                            }}
                            
                          >
                            <DeleteForever color="error" />
                          </IconButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className=" flex justify-center gap-28">
              <div>
                <LoadingButton
                  color="success"
                  variant="contained"
                  size="small"
                  className="mt-4 mb-5"
                  startIcon={<DoneAll />}
                  loading={acceptCartClick}
                  onClick={() => {
                    dispatch(setModalStatus(true));    
                    setTrigger('a');
                    setTitle('Cart Confirmation');
                    setContent('Ön siparişiniz oluşturulacak, onaylıyor musunuz ?');
                  }}
                >
                  Create Pre-Order
                </LoadingButton>
              </div>
              <div>
                <LoadingButton
                  color="error"
                  variant="contained"
                  className="mt-4 mb-5"
                  size="small"
                  startIcon={<DeleteForever />}
                  loading={allDeleteClick} 
                  onClick={() => {
                    dispatch(setModalStatus(true));
                    setTrigger('dc');
                    setTitle('Delete');
                    setContent('Ön sipariş listesinin tamamını silmek istediğinize emin misiniz ?');
                  }}
                >
                  Delete All
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-cover bg-center bg-no-repeat min-h-screen"
          style={{
            backgroundImage: `url(/preview.png)`,
            backgroundAttachment: "fixed",
          }}
        >
          {" "}
        </div>
      )}
      <Modal
        title={title}
        clickYes={() => {
          if(trigger === 'a'){
          dispatch(setModalStatus(false));
          setAcceptCartClick(true);  
          AcceptCart();
          }
          if(trigger === 'dc'){
          dispatch(setModalStatus(false));
          setAllDeleteClick(true);
          DeleteCart();
          }
          if(trigger === 'ds'){
          setLoadingButton(true);      
          DeleteSolution();
          }
        }}
        content={content}
        isYesNoButton={true}
        isLoadingButton={loadingButton}
      />
    </>
  );
};

export default Cart;
