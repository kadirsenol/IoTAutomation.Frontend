import SolutionCard from '../components/SolutionCard'
import Slider from '../components/Slider'
import { useSelector } from 'react-redux'



const Home = ()=>{
  
    const solutions = useSelector((state)=>state.solutions.solutions)
    

    return(
        
        <>        
        <div className=" bg-cover bg-center bg-no-repeat min-h-screen  " style={{backgroundImage:`url(./homeBg.jpg)`,backgroundAttachment:'fixed'}}> 
        <Slider/> 
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {solutions && solutions.map((element)=> (
        <SolutionCard element={element}/>
        ))}  
        </div>           
        </div>
        </>
    )

}

export default Home