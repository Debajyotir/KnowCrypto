import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, Image, Text, VStack , Button, RadioGroup, Radio} from '@chakra-ui/react'
import Loder from './Loder'
import ErrorComponent from './ErrorComponent'
import { Link } from 'react-router-dom'

const Coins = () => {
    const [coins,setCoins] = useState([])
    const [loading,setLoading] = useState(true)
    const [errorHandling,setErrorHandling] = useState(false);
    const [page,setPage] = useState(1)
    const [currency,setCurrency] = useState('inr')
    const currencySymbol = currency=== 'inr'?'₹' : currency==='eur'?'€' : '$'

    const [change,setChange] = useState(true)

    const changePage = (index) =>{
      if(index!=100)    
        setPage(index)
      return(
      setChange(false),
      setLoading(true)
      )
    }
    
    const leftPage = (index) =>{
      if(index!=1)
        setPage(index-1)
        
      return(
      setChange(false),
      setLoading(true))
    }

    const btns = new Array(99).fill(1);

    useEffect(()=>{
        const fetchCoins = async()=>{
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data)
                setLoading(false)
                setChange(true)
            } catch (error) {
                setLoading(false)
                setErrorHandling(true);
            }
        }
        fetchCoins()
    },[currency,page,change])

    if(errorHandling)
        return <ErrorComponent message={"Error while fetching coins"}/>

  return (
    <Container maxW={'container.xl'}>
        {
            loading ? <Loder/> : <>
                <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                  <HStack spacing={'4'}>
                    <Radio value={'inr'}>INR</Radio>
                    <Radio value={'usd'}>USD</Radio>
                    <Radio value={'eur'}>EUR</Radio>
                  </HStack>
                </RadioGroup>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {
                        coins.map((i)=>(
                            <CoinCard key={i.id} id={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} currencySymbol={currencySymbol} />
                        ))
                    }
                </HStack>
                <HStack w={'full'}  p={'8'}  overflowX={'auto'}>
                    <Button key={page} bg={'blackAlpha.900'} color={'white'} onClick={()=>leftPage(page)} >←</Button>
                    

                    {
                      page==1 && 
                      <Button key={page} colorScheme='blakAlpha.900' variant='outline' onClick={()=>changePage(1)} >1</Button>
                    }
                    {
                      page!=1 &&
                      <Button key={page} bg={'blackAlpha.900'} color={'white'} onClick={()=>changePage(1)} >1</Button>
                    }
                    

                    {
                      page==2 && 
                      <Button key={page} colorScheme='blakAlpha.900' variant='outline' onClick={()=>changePage(2)} >2</Button>
                    }
                    {
                      page!=2 &&
                      <Button key={page} bg={'blackAlpha.900'} color={'white'} onClick={()=>changePage(2)} >2</Button>
                    }


                    {
                      page==3 && 
                      <Button key={page} colorScheme='blakAlpha.900' variant='outline' onClick={()=>changePage(3)} >3</Button>
                    }
                    {
                      page!=3 &&
                      <Button key={page} bg={'blackAlpha.900'} color={'white'} onClick={()=>changePage(3)} >3</Button>
                    }



                    {
                      page===4 && 
                      <Button key={page} colorScheme='blakAlpha.900' variant='outline' onClick={()=>changePage(page)} >{page}</Button>
                    }

                    <Button key={page} bg={'blackAlpha.900'} color={'white'}>...</Button>
                    
                    {
                      page !=1 && page!=2 && page!=3 && page!=99 && page!=4 && 
                      <Button key={page}  colorScheme='blakAlpha.900' variant='outline' onClick={()=>changePage(page)} >{page}</Button>
                    }
                    {
                      page !=1 && page!=2 && page!=3 && page!=99 && page!=98 && page!=4 &&
                      <Button key={page} bg={'blackAlpha.900'} color={'white'} >...</Button>
                    }


                    {
                      page==99 &&
                      <Button key={page} colorScheme='blakAlpha.900' variant='outline' onClick={()=>changePage(99)} >99</Button>
                    }
                    {
                      page!=99 &&
                      <Button key={page} bg={'blackAlpha.900'} color={'white'} onClick={()=>changePage(99)} >99</Button>
                    }


                    
                    <Button key={page} bg={'blackAlpha.900'} color={'white'} onClick={()=>changePage(page+1)} >→</Button>
                    {/* {
                      btns.map((iteam,index)=>(
                        <Button key={index} bg={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)} >{index+1}</Button>
                      ))
                    } */}
                </HStack>
            </>
        }
    </Container>
  )
}

const CoinCard = ({id,name,img,symbol,price,currencySymbol}) =>{
    return (
        <Link to={`/coin/${id}`}>
            <VStack width={'52'} shadow={'md'} p={'8'} borderRadius={'lg'} m={'4'} transition={'all 0.3s'}  css={{"&:hover":{transform: "scale(1.2)"}}}>
                <Image src={img} w={10} alt={'Exchange'} objectFit={'contain'}/>
                <Heading size={'md'} noOfLines={'1'}>{symbol}</Heading>
                <Text noOfLines={'1'}>{name}</Text>
                <Text noOfLines={'1'}>{price ? `${currencySymbol}${price}` : 'NA'}</Text>
            </VStack>
        </Link>
    )
}



export default Coins