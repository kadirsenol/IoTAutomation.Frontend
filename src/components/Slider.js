
import { useSelector } from "react-redux";



const Slider = () => {


  const solutions = useSelector((state)=>state.solutions.solutions)
  
  return (
    
    <div className="flex justify-center items-center">
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade w-1/2 h-1/3 mt-5"
      data-bs-ride="carousel"
      
    >
      <div className="carousel-inner">
        {solutions && solutions.map((element)=>(

          <div className="carousel-item active">
          <img src={`./${element.image}`}
                className="d-block w-100 rounded-2xl" alt="iot" />
          <div className="carousel-caption d-none d-md-block">
          <h5>{element.name}</h5>
          <p>Digitalizes your life</p>
          </div>
          </div>  

        ))
        }        
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
    
  );
};

export default Slider;
