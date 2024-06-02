import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import axios from "axios";
import SolutionDetail from "./pages/SolutionDetail";
import Whoami from "./pages/Whoami";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setLogin, setLogout, setName, setRole, setSurname } from "./store/slices/userSlice";
import Admin from "./pages/Admin";
import About from "./pages/About";




function App() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const role = useSelector((state) => state.user.role);
  const dispatch = useDispatch();
  const location = useLocation();
  

  useEffect(() => {  

    function C(k) {
      return (document.cookie.match('(^|; )' + k + '=([^;]*)') || 0)[2];
    }

    const ua = navigator.userAgent;
    const ismobile = / mobile/i.test(ua);
    const mgecko = !!(/ gecko/i.test(ua) && / firefox\//i.test(ua));
    const wasmobile = C('wasmobile') === 'was';
    const desktopvp = 'user-scalable=yes, maximum-scale=2';

    if (ismobile && !wasmobile) {
      document.cookie = 'wasmobile=was';
    } else if (!ismobile && wasmobile) {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (mgecko) {
        const el = document.createElement('meta');
        el.setAttribute('content', desktopvp);
        el.setAttribute('name', 'viewport');
        document.getElementsByTagName('head')[0].appendChild(el);
      } else {
        if (viewportMeta) {
          viewportMeta.setAttribute('content', desktopvp);
        } else {
          const el = document.createElement('meta');
          el.setAttribute('content', desktopvp);
          el.setAttribute('name', 'viewport');
          document.getElementsByTagName('head')[0].appendChild(el);
        }
      }
    }



    

    checkToken();    
  }, [location]);

  const checkToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const deCodeJwt = jwtDecode(token);
      const rol = deCodeJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role" ];
      dispatch(setRole(rol));
      const name =deCodeJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      dispatch(setName(name));
      const surName =deCodeJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"];
      dispatch(setSurname(surName));      
      const expToken = deCodeJwt.exp;
      let date = new Date();
      const currentDate = date.getTime() / 1000;
      if (expToken >= currentDate) {
        dispatch(setLogin());
      } else {
        dispatch(setLogout());
      }
    } else {
      dispatch(setLogout());
    }
  };
 

  axios.defaults.baseURL = "https://api.kadirsenol.com/api";
  return (
    <>
      <Routes>
        <Route path="/" element={<><Navbar /> <Home /> <Footer /> </>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={(isLogin && (role === "Üye" || role === "Admin") ) ? (<><Navbar /> <Profile /> <Footer /> </>) : ( <Login />)}/>
        <Route path="/Cart" element={ (isLogin && (role === "Üye" || role === "Admin")) ? (<><Navbar /> <Cart /> <Footer /></>) : (<Login />)}/>
        <Route path="/About"element={<> <Navbar /> <About /> <Footer /></>}/>
        <Route path="/SolutionDetail"element={<> <Navbar /> <SolutionDetail /> <Footer /></>}/>
        <Route path="/Whoami" element={<Whoami />} />
        <Route path="/Admin" element={(isLogin && role === "Admin") ?  <Admin />  :  <Error404 /> } />
        <Route path="*" element={ <Error404 /> }/>       
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
