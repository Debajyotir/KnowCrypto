import { Box, Container, RadioGroup, Radio, HStack, VStack,Text, Img, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React from 'react'
import { useEffect, useState } from 'react'
import Loder from './Loder'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorComponent from './ErrorComponent'
import { server } from '../index'
import Chart from './Chart'

const CoinDetails = () => {
    const params = useParams()
    const [coin,setCoin] = useState({})
    const [loading,setLoading] = useState(true)
    const [errorHandling,setErrorHandling] = useState(false);
    const [currency,setCurrency] = useState('inr')
    const [days,setDays] = useState('1d')
    const [chartArray,setChartArray] = useState([])
    
    const currencySymbol = currency=== 'inr'?'₹' : currency==='eur'?'€' : '$'


    const btns = ["1d","7d","30d","60d","100d","200d","1y","max"]

    const switchChart=(i)=>{
        if(i==='1d' || i==='7d' || i==='30d' || i==='60d' || i==='100d' || i==='200d' || i==='max')
            setDays(i);
        else
            setDays(365)
    }
    



    useEffect(()=>{
        const fetchCoin = async()=>{
            try {
                const {data} = await axios.get(`${server}/coins/${params.id}`)
                setCoin(data)
                setLoading(false)


                const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
                setChartArray(chartData.prices)
                // console.log(chartData.prices)

                
                // console.log(data);
            } catch (error) {
                setLoading(false)
                setErrorHandling(true);
            }
        }
        fetchCoin()
    },[params.id,currency,days])

    if(errorHandling)
        return <ErrorComponent message={"Error while fetching coin"}/>



  return (
    <Container maxW={'container.xl'}  overflowX={'auto'}>
        {
            loading?<Loder/>:<>
            <Box width={'full'} borderWidth={1}>
                <Chart arr={chartArray} currency={currencySymbol} days={days}/>
            </Box>

            <HStack p={'4'} overflowX={'auto'}>
                {
                    btns.map((i)=>(
                        <Button key={i} onClick={()=>switchChart(i)}>{i}</Button>
                    ))
                }
            </HStack>



            <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
                  <HStack spacing={'4'}>
                    <Radio value={'inr'}>INR</Radio>
                    <Radio value={'usd'}>USD</Radio>
                    <Radio value={'eur'}>EUR</Radio>
                  </HStack>
                </RadioGroup>

                <VStack p="16" spacing={'4'} alignItems={"flex-start"}>
                    <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>
                        Last update on {Date(coin.market_data.last_updated).split('G')[0]}
                    </Text>
                    <Img src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'}/>

                    <Stat>
                        <StatLabel>{coin.name}</StatLabel>
                        <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={ coin.market_data.price_change_percentage_24h >0?'increase':'decrease'}/> 
                            {coin.market_data.price_change_percentage_24h}%
                        </StatHelpText>
                    </Stat>

                    <Badge>{`#${coin.market_cap_rank}`}</Badge>

                    <CustomBar low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}/>

                    <Box w={'full'} p={'4'}>
                        <Item title={'Max Supply'} value={coin.market_data.max_supply}/>
                        <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}/>
                        <Item title={'Market Cap'} value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}/>
                        <Item title={'All time low'} value={`${currencySymbol} ${coin.market_data.atl[currency]}`}/>
                        <Item title={'All time high'} value={`${currencySymbol} ${coin.market_data.ath[currency]}`}/>
                    </Box>
                </VStack>
            </>
        }
    </Container>
  )
}

const Item = ({title,value}) =>{
    return (
        <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
            <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
            <Text>{value}</Text>
        </HStack>
    )
}

const CustomBar = ({low,high})=>{
    return(
    <VStack w={'full'}>
        <Progress value={'50'} colorScheme={'teal'} w={'full'}/>
        <HStack justifyContent={'space-between'} w={'full'}>
            <Badge colorScheme='red'>{low}</Badge>
            <Text fontSize={'sm'}>24hr Range</Text>
            <Badge colorScheme='green'>{high}</Badge>
        </HStack>
    </VStack>
    )
}

export default CoinDetails