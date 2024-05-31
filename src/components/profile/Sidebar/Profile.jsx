import { useState, useRef, useEffect } from 'react'
import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { Spinner } from "@chakra-ui/react";
import { setSmartLightAppIds, setSmartLightAppIsActive } from '../../../store/slices/controlUISlice';

function Profile() {
  const [userProfile, setUserProfile] = useState(null)
  const name = useSelector((state)=>state.user.name);
  const surName = useSelector((state)=>state.user.surName);
  const role = useSelector((state)=>state.user.role);
  const navigate = useNavigate();
  const [deleteImageClick, setDeleteImageClick] = useState(false);
  const [isDeleteLoad, setIsDeleteLoad] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [loadImage, setLoadImage] = useState(false);



  const profileImage = useRef(null)

  useEffect(()=>{
    getUserData();
  },[loadImage])

  const openChooseImage = () => {
    profileImage.current.click()
  }

  const getUserData = async ()=>{

    try {
      const response = await axios.get("/Profile/GetProfileData",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
      if (response.status === 200 || response.status === 204 ) {
        dispatch(setSmartLightAppIds(response.data.smartLightAppIdActive.map(item=>item.id)))
        dispatch(setSmartLightAppIsActive(response.data.smartLightAppIdActive.map(item=>item.active)))
        setUserProfile(response.data.image)
      }else {
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
      }else if (error.response.status === 401) {
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

  }


  const saveUserImage = async (event) => {
    
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    let selected = event.target.files[0]
      
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader()
      reader.onloadend = async () => {                          
      try {
        const response = await axios.post("/Profile/SaveProfileImage", {Image : reader.result}, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
        if (response.status === 200) {
          setLoadImage(!loadImage);          
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
        }else if (error.response.status === 401) {
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
    }
    reader.readAsDataURL(selected);
  }
    else{
      profileImage.current.value = "";
      setOpen(true);
    }
    profileImage.current.value = "";
  };

  const deleteUserImage = async ()=>{
    try {
      const response = await axios.get("/Profile/DeleteProfileImage", 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      }
    );
      if (response.status === 200) {
        setLoadImage(!loadImage);
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
      }else if (error.response.status === 401) {
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
    setIsDeleteLoad(false);         
  }

   
  return (
    <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
      
      {
        userProfile === null || userProfile === '' ? null : 
      
        isDeleteLoad ? 
        <Spinner
           thickness="3px"  
           speed="0.65s"  
           emptyColor="gray.200" 
           color="gray.500" 
           size="xs"        
           position= 'absolute'
           top= '5' 
           left= '20' 
           cursor= 'pointer' 
        />
      :
       <DeleteIcon 
         boxSize="0.8em"  
         style={{ 
         position: 'absolute', 
         top: '20', 
         left: '80', 
         cursor: 'pointer', 
        }}
        onClick={()=>setDeleteImageClick(true)} 
        _hover={{ transform: 'scale(1.3)' }}
       />
    }

      <Avatar
        key={userProfile}  
        size="2xl"
        name={name +" "+ surName} 
        cursor="pointer"
        onClick={openChooseImage}
        src={userProfile}
      >
        <AvatarBadge bg="brand.blue" boxSize="1em">
          <svg width="0.4em" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </AvatarBadge>
      </Avatar>

      <input
        hidden
        type="file"
        ref={profileImage}
        onChange={saveUserImage}
      />
      <Modal isOpen={isOpen} onClose={()=>setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Something went wrong</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>File not supported!</Text>
            <HStack mt={1}>
              <Text color="brand.cadet" fontSize="sm">
                Supported types:
              </Text>
              <Badge colorScheme="green">PNG</Badge>
              <Badge colorScheme="green">JPG</Badge>
              <Badge colorScheme="green">JPEG</Badge>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>setOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      
        {/* For Delete Image */}
        <Modal isOpen={deleteImageClick} onClose={()=>setDeleteImageClick(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Profile Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Profil fotoğrafını kaldırmak istediğinize emin misiniz ?</Text>           
          </ModalBody>
          <ModalFooter>
            <Button mr={3} color="red" variant="text" size="sm" _hover={{ bg: 'red.100' }} onClick={()=>setDeleteImageClick(false)}>No</Button>
            <Button color="green" variant="text" size="sm"  _hover={{ bg: 'green.100' }} onClick={()=>{setIsDeleteLoad(true); deleteUserImage(); setDeleteImageClick(false); }}>Yes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        {/* End */}

      <VStack spacing={1}>
        <Heading as="h3" fontSize="xl" color="brand.dark">
          {name} {" "} {surName}
        </Heading>
        <Text color="brand.gray" fontSize="sm">
          {role}
        </Text>
      </VStack>
    </VStack>
  )
}

export default Profile
