import { Box, Card, CardBody, CardHeader, Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa"
import { IoTime, IoPeople, IoCart } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri";



function BigStats() {
    return (
        <Card my='24px' ms={{ lg: "24px" }}>
            <CardHeader mb='12px'>
                <Flex direction='column' w='100%'>
                    <Flex
                        direction={{ sm: "column", lg: "row" }}
                        justify={{ sm: "center", lg: "space-between" }}
                        align={{ sm: "center" }}
                        w='100%'
                        my={{ md: "12px" }}>
                        <Text
                            fontSize={{ sm: "lg", md: "xl", lg: "lg" }}
                            fontWeight='bold'>
                            Statistics
                        </Text>
                        <Flex align='center'>
                            <Icon
                                as={FaRegCalendarAlt}
                                color='gray.400'
                                fontSize='md'
                                me='6px'></Icon>
                            <Text color='gray.400' fontSize='sm' fontWeight='semibold'>
                                Updated 3 minutes ago
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <SimpleGrid templateColumns='repeat(4, 1fr)'>
                    <Box>
                        <Flex direction='row' align='center' gap={'20px'}>
                            <IoTime size={'44px'} color={'#7367F0'} />
                            <Flex direction='column' align='center'>
                                <Text fontSize='2xl' fontWeight='bold'>1,345</Text>
                                <Text color='gray.400'>Sales</Text>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex direction='row' align='center' gap={'20px'}>
                            <IoPeople size={'44px'} color={'#00BAD1'} />
                            <Flex direction='column' align='center'>
                                <Text fontSize='2xl' fontWeight='bold'>1,345</Text>
                                <Text color='gray.400'>Customers</Text>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex direction='row' align='center' gap={'20px'}>
                            <IoCart size={'44px'} color={'#FF4C51'} />
                            <Flex direction='column' align='center'>
                                <Text fontSize='2xl' fontWeight='bold'>1,345</Text>
                                <Text color='gray.400'>Products</Text>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box>
                        <Flex direction='row' align='center' gap={'20px'}>
                            <RiMoneyDollarCircleFill size={'44px'} color={'#28C76F'} />
                            <Flex direction='column' align='center'>
                                <Text fontSize='2xl' fontWeight='bold'>1,345</Text>
                                <Text color='gray.400'>Revenue</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </CardBody>
        </Card >
    )
}

export default BigStats