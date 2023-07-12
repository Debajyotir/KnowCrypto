import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loder = () => {
  return (
    <VStack h={'90vh'} justify={'center'}>
        <Box transform={"scale(4)"}>
            <Spinner size={'xl'}/>
        </Box>
    </VStack>
  )
}

export default Loder