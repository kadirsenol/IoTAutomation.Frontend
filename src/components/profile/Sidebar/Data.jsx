import { Box, Text, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux';



function Data() {

  const SmartLightAppIds = useSelector((state)=>state.controlUI.SmartLightAppIds);
  const SmartLightAppIsActive = useSelector((state)=>state.controlUI.SmartLightAppIsActive);




  const list = 
    SmartLightAppIds.length > 0 && SmartLightAppIsActive.includes(true) ?
    [
    {
      id: 1,
      name: 'Smart Light',
      color: 'dark'
    }
    ]
    : 
    ""    
  
  return (
    <VStack as="ul" spacing={0} listStyleType="none">

        <Box
          
          as="li"
          w="full"
          py={3}  
          me={9}        
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          
          <Text className='flex justify-center -mb-1' color={`brand.black`} fontWeight="bold">
          Active Smart Applications
          </Text>
        </Box>


      {list && list.map(item => (
        <Box
          key={item.id}
          as="li"
          w="full"
          py={3} 
           
          me={9}        
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text
          className='-mb-0.5'
          color={`brand.${item.color}`}
          sx={{
            '&::before': {
              content: '""',
              display: 'inline-block',
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              backgroundColor: `brand.${item.color}`,
              marginRight: '0.5rem',
            },
          }}
          >
            {item.name} 
          
          </Text>
        </Box>
      ))
    }
    </VStack>
  )
}

export default Data
