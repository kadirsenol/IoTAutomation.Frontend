import { Fragment, useEffect} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Login, PersonAdd, ShoppingCartCheckout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button } from "@mui/material";
import {
  setName,
  setLogout,
  setRole,
  setSurname,
} from "../store/slices/userSlice";
import SearchBar from "./SearchBar";
import OptionsButton from "./OptionsButton";
import { setSolutions } from "../store/slices/solutionsSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCart } from "../store/slices/cartSlice";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Who am I", href: "/Whoami", current: false },
  { name: "About", href: "/About", current: false },
  { name: "Login", href: "/Login", current: false },
  { name: "Register", href: "/Register", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addedsolution = useSelector((state) => state.cart.solutions);
  const isClickOfSolutionCart = useSelector((state) => state.cart.isClick);
  const isLogin = useSelector((state) => state.user.isLogin);
  const role = useSelector((state) => state.user.role);

  useEffect(() => {
    getSolution();
  }, []);

  useEffect(() => {
    if (isLogin && (role === "Üye" || role === "Admin")) {
      GetCartSolution();
    }
  }, [isClickOfSolutionCart, isLogin]);

  const getSolution = async () => {
    try {
      const response = await axios.get("/Solution/Get",
      {
        headers: {
          'Origin': 'https://kadirsenol.com'
        }
      }
      );

      if (response.status === 200) {
        dispatch(setSolutions(response.data));
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        toast.error("Sunucuya bağlanılamadı. !");
      } else {
        toast.error("Ürünler listelenirken bir hata meydana geldi.");
      }
    }
  };

  const GetCartSolution = async () => {
    try {
      const response = await axios.get("/CartDetail/GetAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.status === 200) {
        dispatch(addToCart(response.data));
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
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex h-16 items-center justify-between ">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="sm: hidden sm:block">
                <div
                  onClick={() => navigate("/")}
                  className=" flex flex-shrink-0 justify-center items-center cursor-pointer hover:bg-gray-700 rounded-md w-20 h-10 "
                >
                  <img className="h-8 mr-6" src="./iotnavbar.png" alt="MyCompany" />
                  <p className="hidden sm:block text-white -mx-4 my-2 md:text-2xl sm:text-lg font-semibold pr-5">
                    IoT
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center  ">
                <div className="hidden sm:ml-6 sm:block ">
                  <div className="flex md:space-x-3 sm: -space-x-1 ">
                    <button
                      onClick={() => navigate("/Whoami")}
                      className={classNames(
                        "text-white hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 lg:text-lg md:text-sm sm:text-xs font-medium"
                      )}
                      aria-current={undefined}
                    >
                      Who am I ?
                    </button>
                    <div className="flex">
                      <button
                        key="Home"
                        onClick={() => navigate("/")}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 lg:text-sm sm:text-xs font-medium"
                        )}
                        aria-current={undefined}
                      >
                        Home
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        key="About"
                        onClick={() => navigate("/About")}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 lg:text-sm sm:text-xs font-medium"
                        )}
                        aria-current={undefined}
                      >
                        About
                      </button>
                    </div>
                    <div>
                      <OptionsButton />
                    </div>
                    {isLogin && (role === "Üye" || role === "Admin") ? (
                      <div className="flex">
                        <button
                          key="Register"
                          onClick={() => navigate("/Register")}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 lg:text-sm sm:text-xs font-medium"
                          )}
                          aria-current={undefined}
                        >
                          Register
                        </button>
                      </div>
                    ) : null}
                    {isLogin && (role === "Üye" || role === "Admin") ? (
                      <div className="flex">
                        <button
                          onClick={() => navigate("/Profile")}
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 lg:text-sm sm:text-xs font-medium"
                          )}
                          aria-current={undefined}
                        >
                          Profile
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                className={
                  isLogin && (role === "Üye" || role === "Admin")
                    ? "w-40 sm:w-60  block sm:hidden lg:block xl:block -me-44 "
                    : " w-72  sm:w-60  block sm:hidden lg:block xl:block -me-44"
                }
              >
                <SearchBar />
              </div>

              {isLogin && (role === "Üye" || role === "Admin") ? (
                <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 hover:bg-gray-700 text-gray-400 hover:text-white focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => {
                      navigate("/Cart");
                    }}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <div className="relative">
                      <Badge
                        badgeContent={
                          addedsolution.length !== 0
                            ? addedsolution.length
                            : null
                        }
                        color="error"
                      >
                        <ShoppingCartCheckout
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Badge>
                    </div>
                  </button>

                  <Menu
                    as="div"
                    className="relative ml-3 hover:bg-slate-500 rounded-xl"
                  >
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-10 w-10 rounded-full"
                          src="./userSymbol.png"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {isLogin && role === "Admin" ? (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => {
                                  navigate("/Admin");
                                }}
                                className={classNames(
                                  active ? "bg-gray-100 w-full text-left" : "",
                                  "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                )}
                              >
                                Admin Panel
                              </button>
                            )}
                          </Menu.Item>
                        ) : null}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                navigate("/Profile");
                              }}
                              className={classNames(
                                active ? "bg-gray-100 w-full text-left" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              Your Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                navigate("/Profile");
                              }}
                              className={classNames(
                                active ? "bg-gray-100 w-full text-left" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                navigate("/Cart");
                              }}
                              className={classNames(
                                active ? "bg-gray-100 w-full text-left" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              Your Cart
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                localStorage.removeItem("accessToken");
                                dispatch(setLogout());
                                dispatch(setRole(""));
                                dispatch(setName(""));
                                dispatch(setSurname(""));
                                navigate("/");
                              }}
                              className={classNames(
                                active ? "bg-gray-100 w-full text-left" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="flex justify-end items-center">
                  <div className="hidden sm:block">
                    <Button
                      size="small"
                      startIcon={<Login />}
                      color="success"
                      variant="contained"
                      onClick={() => navigate("/Login")}
                    >
                      Login
                    </Button>
                  </div>
                  <div className="ms-2 hidden sm:block">
                    <Button
                      size="small"
                      endIcon={<PersonAdd />}
                      color="primary"
                      variant="outlined"
                      onClick={() => navigate("/Register")}
                    >
                      Register
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  onClick={() => {
                    navigate(item.href);
                  }}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white cursor-pointer"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
