import { Box, Img, Text } from '@chakra-ui/react'
import React from 'react'
import img from '../assets/btc.png'
import { motion } from 'framer-motion'
const Home = () => {
  return (
    <Box bg={'blackAlpha.900'} w={'full'} h={'85vh'}>
        <motion.div style={{
            height:"80vh"
        }}
        animate={{
            filter:"grayscale(1)"
        }}
        transition={{
            duration:10,
            repeat:Infinity
        }}>
            <Img src={img} h={'full'} w={'full'} objectFit={'contain'}/>
        </motion.div>
        <Text fontSize={"6xl"} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.700'} mt={"-20"}>KnowCrypto</Text>
        
        
    </Box>
  )
}

export default Home