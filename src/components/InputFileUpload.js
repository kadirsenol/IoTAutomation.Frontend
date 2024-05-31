import * as React from 'react';
import Button from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFileName, setFileName } from '../store/slices/inputfileuploadSlice';
import { Cancel, CheckCircle } from '@mui/icons-material';
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function InputFileUpload() {

  const dispatch = useDispatch();


  const attachmentName = useSelector((state)=>state.inputfileupload.attachmentName)
  const VisuallyHiddenInputValue = useSelector((state)=>state.inputfileupload.VisuallyHiddenInputValue)
  const [up, setUp] = React.useState(false)

  const UploadFile=(state)=>{

     const uploadingFiles = state.target.files[0];
     if(uploadingFiles.size <= 3000000){
      dispatch(setFileName(uploadingFiles.name));
          // dispatch(setFileName([...attachmentsName,uploadingFiles.name])); // Çoklu dosya kabulu icin

      
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        localStorage.setItem(uploadingFiles.name, fileContent.split(',')[1]);        
      };
      reader.readAsDataURL(uploadingFiles);
      toast.success(`The ${uploadingFiles.name} file has been saved successfully.`);
     }
     else{
      toast.error("Please upload a file of maximum 3mb in size.");
     }
     
  }

  return (
    <>
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      color="neutral"
      size='sm'
      startDecorator={
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            sx={{ color: "black"}}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </SvgIcon>
      }
    >
      Add File
      <VisuallyHiddenInput type="file" onChange={(state)=>UploadFile(state)} value={VisuallyHiddenInputValue} />      
    </Button>
    <div className='text-sm '>       
       {attachmentName !== "" ? <div className='ms-2 mt-1' onMouseEnter={()=>setUp(true)} onMouseLeave={()=>setUp(false)}> {up ? <Cancel className='cursor-pointer' onClick={()=>{dispatch(deleteFileName(attachmentName)); setUp(false)}} fontSize='small' color='error'/>: <CheckCircle color='inherit' fontSize='small'/> } <span> {up ? <>Press delete to remove the{' '}'{attachmentName}'{' '} file.</>: <>'{attachmentName}'</>} </span></div>: null}       
    </div>
    
    </>
  );
}
