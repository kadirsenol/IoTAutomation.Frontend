import {
  Button,
  CardActionArea,
  CardActions,
  Typography,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import { AddShoppingCart, Troubleshoot } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setClickSolutionCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { setSolution } from "../store/slices/solutionDetailSlice";
import axios from "axios";
import { toast } from "react-toastify";

const SolutionCard = ({ element }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const navigate = useNavigate();

  const AddSolution = async () => {
    if (isLogin) {
      try {      
        const response = await axios.post("/CartDetail/Insert", {
          solutionId: element.id,
          quantity: 1
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
    } else {
      toast.info("Lütfen önce giriş yapınız.");
      navigate("/Login");
    }
  };

  return (
    <div className="flex justify-center items-start mt-5 mb-5">
      <Card className={`w-40 sm:w-48`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`./${element.image}`}        
            alt="greeniguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {element.name}
            </Typography>
            <Typography className="mt-3 mb-4" variant="body2" color="text.secondary">
              {element.price + "$"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div className="flex justify-center items-center">
          <CardActions>
            <Button
              onClick={() => {
                dispatch(setSolution(element));
                navigate("/SolutionDetail");
              }}
              size="small"
              color="inherit"
              startIcon={<Troubleshoot />}
            >
              Info
            </Button>
            <Button
              onClick={() => {
                AddSolution();
              }}
              size="small"
              color="inherit"
              endIcon={<AddShoppingCart />}
            >
              Add
            </Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default SolutionCard;
