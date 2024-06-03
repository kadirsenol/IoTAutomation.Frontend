
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import SearchList from './SearchList';
import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '11ch',
      '&:focus': {
        width: '16ch',
      },
    },    
  },
}));

export default function SearchBar() {


  const[solution, setSolution] = useState([]) 



    const sendSearchResponse = async (solutionName)=>{

          try {
            const response = await axios.post(
              "https://api.kadirsenol.com/api/Solution/Search",
               {solutionName: solutionName}
            );
            if (response.status === 200) {
              setSolution(response.data)
            } else {
              toast.info(
                "Beklenmedik bir durum meydana geldi, bilgilerinizi kontrol ederek lutfen tekrar deneyin."
              );
            }
          } catch (error) {
            if (error.code === "ERR_NETWORK") {
              toast.error("Sunucuya bağlanılamadı. !");
            } else {
              toast.error("Opps! Beklenmedik bir hata meydana geldi.");
            }
          }
        }
  
      

  return (
    
      
         <Toolbar>
        
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search.."
              inputProps={{ 'aria-label': 'search' }}
              className='text-white'
              sx={{fontSize:'14px'}}
              onChange={(state)=>{sendSearchResponse(state.target.value)}}
            />            
          </Search> 
          <div className='-ms-28 -mt-11'>
              <SearchList solution={solution}/>
          </div>         
        </Toolbar>
        
  
        
        
  );
}
