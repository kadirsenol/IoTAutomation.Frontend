
import * as React from 'react';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import { useDispatch } from 'react-redux';
import { setMessage } from '../store/slices/textareaSlice';

export default function UnderlineTextarea({value, row, width}) {

  const dispatch = useDispatch();


  return (
    <Stack spacing={2}>      
      <Textarea
        minRows={row}
        placeholder="Type in here…"
        variant="plain"
        size='sm'
       
        sx={{
          borderBottom: '2px solid',
          borderColor: 'black',
          borderRadius: 5,
          width:{width},
          '&:hover': {
            borderColor: 'black',
            opacity:1
          },
          '&::before': {
            border: '1px solid var(--Textarea-focusedHighlight)',
            transform: 'scaleX(0)',
            left: 9,
            right: 9,
            bottom: '-2px',
            top: 'unset',
            transition: 'transform .99s cubic-bezier(0.1,0.9,0.2,1)',
            borderRadius: 0,
            borderColor: 'gray',
            
          },
          '&:focus-within::before': {
            transform: 'scaleX(1)',
            
          },
          opacity: 1 , color:'black'
        }}
        onChange={(state)=>dispatch(setMessage(state.target.value))}
        value={value}
        
      />
    </Stack>
  );
}
