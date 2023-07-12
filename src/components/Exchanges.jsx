import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Loder from './Loder'
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {
    const [exchanges,setExchanges] = useState([])
    const [loading,setLoading] = useState(true)
    const [errorHandling,setErrorHandling] = useState(false);
    useEffect(()=>{
        const fetchExchanges = async()=>{
            try {
                const {data} = await axios.get(`${server}/exchanges`)
                setExchanges(data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setErrorHandling(true);
            }
        }
        fetchExchanges()
    },[])

    if(errorHandling)
        return <ErrorComponent message={"Error while fetching exchanges"}/>

  return (
    <Container maxW={'container.xl'}>
        {
            loading ? <Loder/> : <>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'} >
                    {
                        exchanges.map((i)=>(
                            <ExchangeCard key={i.id} name={i.name} img = {i.image} rank = {i.trust_score_rank} url={i.url} />
                        ))
                    }
                </HStack>
            </>
        }
    </Container>
  )
}

const ExchangeCard = ({name,img,rank,url}) =>{
    return (
        <a href={url} target='_blank'>
            <VStack width={'52'} shadow={'md'} p={'8'} borderRadius={'lg'} m={'4'} transition={'all 0.3s'}  css={{"&:hover":{transform: "scale(1.2)"}}}>
                <Image src={img} w={10} alt={'Exchange'} objectFit={'contain'}/>
                <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
                <Text noOfLines={'1'}>{name}</Text>
            </VStack>
        </a>
    )
}


export default Exchanges