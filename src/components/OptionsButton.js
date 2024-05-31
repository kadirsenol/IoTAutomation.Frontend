import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import {  useDispatch, useSelector } from 'react-redux';
import { Login, PersonAdd, Phone, ShoppingCart } from '@mui/icons-material'
import { setSolution } from '../store/slices/solutionDetailSlice';





export default function OptionsButton() {    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[isOpen,setIsOpen] = useState(false);
    const[isPanel, setIsPanel]=useState(false);
    const solutions = useSelector((state)=>state.solutions.solutions)
    const islogin = useSelector((state)=>state.user.isLogin)    


    



  return (

    <Popover className="relative">
      <Popover.Button onClick={()=>{setIsOpen(!isOpen)}} onMouseEnter={()=>{setIsOpen(true)}} onMouseLeave={()=>{setTimeout(()=>{setIsOpen(false)},1000)}} className=" -me-3 -ms-1 mt-1 inline-flex items-center gap-x-1 leading-6 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 lg:text-sm sm:text-xs font-medium">
        <span>Solutions</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        show={isOpen ? true : isPanel ? true : false}
      >
        <Popover.Panel onMouseEnter={()=>{setIsPanel(true) ;setIsOpen(true)}} onMouseLeave={()=>{setIsPanel(false);setIsOpen(false)}} className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div  className="w-96 max-w-md flex-auto overflow-hidden rounded-3xl bg-gray-50 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions && solutions.map((item) => (                
                <div onClick={()=>{dispatch(setSolution(item)); navigate('/SolutionDetail') ;setIsPanel(false) ;setIsOpen(false)}} key={item.name} className=" cursor-pointer group relative flex gap-x-6 rounded-lg hover:bg-gray-200">
                  <div className="mt-2 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-500 group-hover:bg-white">
                    <img src={`./${item.image}`} className="h-11 w-11 rounded-md text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.name}                      
                    </p>
                    <p className="mt-1 text-gray-600">{item.price + "$"}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className=" grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-200">
             {islogin ?  
             <>
             <div
             key={""}                  
             onClick={()=>{setIsPanel(false);setIsOpen(false);window.open('https://wa.me/905523642361', '_blank')}}             
             className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-neutral-300 cursor-pointer"
           >
             <Phone/>
             Contact
           </div>   
             <div
               key={""}                  
               onClick={()=>{navigate("/Cart");setIsPanel(false);setIsOpen(false)}}
               className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-neutral-300 cursor-pointer"
             >
               <ShoppingCart/>
               Go Cart
             </div>              
           </>
             
             :  
                <div className='flex justify-center ms-48'>
                <div
                  key={""}                  
                  onClick={()=>{navigate("/Login");setIsPanel(false);setIsOpen(false)}}
                  className="flex items-center rounded-md justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-neutral-300 cursor-pointer"
                >
                  <Login/>
                  Login
                </div>
                <div
                key={""}                  
                onClick={()=>{setIsPanel(false);setIsOpen(false); window.open('https://wa.me/905523642361', '_blank')}}
                className="flex items-center rounded-md justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-neutral-300 cursor-pointer"
              >
                <Phone/>
                Contact
              </div>  
              <div
                key={""}                  
                onClick={()=>{navigate("/Register");setIsPanel(false);setIsOpen(false)}}
                className="flex items-center rounded-md justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-neutral-300 cursor-pointer"
              >
                <PersonAdd/>
                Register
              </div>   
              </div> }       
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>    
  )
}
