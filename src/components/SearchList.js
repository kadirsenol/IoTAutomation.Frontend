import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setSolution } from '../store/slices/solutionDetailSlice';


const SearchList = ({solution}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const[isClick,setIsClick] = useState(false);  

    useEffect(()=>{
        if(solution.length > 0){
            setIsClick(false)
        }
    },[solution])
    
    

  return (

    <Popover className="relative">
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        show={solution.length > 0 && !isClick ? true : false}
      >
        <Popover.Panel  className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          {solution.length > 0 ?
          <div  className="w-96 max-w-md flex-auto overflow-hidden rounded-3xl bg-gray-50 text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
               {solution && solution.map((item) => (                
                <div onClick={()=>{dispatch(setSolution(item)); navigate("/SolutionDetail"); setIsClick(true) }} key={item.name} className=" cursor-pointer group relative flex gap-x-6 rounded-lg hover:bg-gray-200">
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
          </div> : null}
        </Popover.Panel>
      </Transition>
    </Popover>    
  )
}

export default SearchList