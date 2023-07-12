import { Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <Box bg={'blackAlpha.900'} color={'whiteAlpha.700'} minH={'48'} px={'16'} py={[16,8]}>
        <Stack direction={["column","row"]} h={'full'} alignItems={'center'}>
            <VStack w={'full'} alignItems={['center','flex-start']}>
                <Text fontweight={'bold'}  fontSize={'2xl'}>
                    About Us
                </Text>
                <Text>
                    We are the best crypto knowledge app in India. We also provide awesome insight about crypto trading. Follow us more more such updates.
                </Text>
            </VStack>
            <VStack w={'full'} alignItems={['center','flex-end']}>
                <Text fontweight={'bold'} fontSize={'2xl'}>Follow us</Text>
                <a target={'__blank'} href='https://www.youtube.com/'>YouTube</a>
                <a target={'__blank'} href='https://www.linkedin.com/'>LinkedIn</a>
                <a target={'__blank'} href='https://www.facebook.com/'>Facebook</a>
            </VStack>
        </Stack>
    </Box>
  )
}

export default Footer