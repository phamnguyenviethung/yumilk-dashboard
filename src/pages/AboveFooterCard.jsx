import React from 'react';
import { Box, Center, SimpleGrid, Text } from '@chakra-ui/react';
import { IoHeartCircle } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { PiSnowflakeFill } from "react-icons/pi";
import { TbTruckReturn } from "react-icons/tb";

function AboveFooterCard() {
    return (
        <SimpleGrid templateColumns='repeat(5, 240px)' textAlign='center'>
            <Box>
                <Center>
                    <IoHeartCircle size={"54px"} />
                </Center>
                <Center fontFamily={"Helvetica Neue Medium"} fontSize={"13px"}>
                    Cùng Ba Mẹ Nuôi Con
                </Center>
            </Box>
            <Box>
                <Center>
                    <FaTruckFast size={"54px"} />
                </Center>
                <Text fontFamily={"Helvetica Neue Medium"} fontSize={"13px"} textAlign='center'>
                    Giao Hàng Siêu Tốc
                </Text>
            </Box>
            <Box>
                <Center>
                    <MdVerified size={"54px"} />
                </Center>
                <Text fontFamily={"Helvetica Neue Medium"} fontSize={"13px"} textAlign='center'>
                    100% Chính Hãng
                </Text>
            </Box>
            <Box>
                <Center>
                    <PiSnowflakeFill size={"54px"} />
                </Center>
                <Text fontFamily={"Helvetica Neue Medium"} fontSize={"13px"} textAlign='center'>
                    Bảo Quản Mát
                </Text>
            </Box>
            <Box>
                <Center>
                    <TbTruckReturn size={"54px"} />
                </Center>
                <Text fontFamily={"Helvetica Neue Medium"} fontSize={"13px"} textAlign='center'>
                    Đổi Trả Dễ Dàng
                </Text>
            </Box>
        </SimpleGrid>
    );
}

export default AboveFooterCard;