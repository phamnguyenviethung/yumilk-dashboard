import { Box, Stack, Text, VStack } from '@chakra-ui/react';
import ChangeAttributes from './ChangeAttributes';
import ChangeImages from './ChangeImages';
import ChangeStatus from './ChangeStatus';
import ChangeThumbnail from './ChangeThumbnail';
import PreOrderInformation from './PreOrderInformation';
import ProductInformation from './ProductInformation';

const InfoSection = props => {
  const { children } = props;
  return (
    <Box
      w='full'
      flex='1'
      bgColor='brand.secondary'
      minH='250px'
      borderRadius='8px'
      p={8}
      {...props}
    >
      {props.title && (
        <Text mt={2} mb={4} fontWeight='500' fontSize='1.4rem'>
          {props.title}
        </Text>
      )}
      {children}
    </Box>
  );
};

const EditProduct = ({ data }) => {
  return (
    <Box w='full' pt={4} pb={16}>
      <Stack
        w='Full'
        gap='4'
        direction={['column', 'column', 'row']}
        alignItems={{
          base: 'stretch',
          lg: 'baseline',
        }}
      >
        <VStack flex='2' w='full' gap='6'>
          <InfoSection title='Thông tin sản phẩm'>
            <ProductInformation data={data} />
          </InfoSection>

          <InfoSection title='Ảnh thu nhỏ'>
            <ChangeThumbnail data={data} />
          </InfoSection>
          <InfoSection title='Ảnh sản phẩm'>
            <ChangeImages id={data.id} />
          </InfoSection>
          <InfoSection title='Mô tả sản phẩm'>
            <ChangeAttributes data={data} />
          </InfoSection>
        </VStack>
        <VStack gap='4' flex='1'>
          {data.statusId === 2 && (
            <InfoSection title='Đặt trước'>
              <PreOrderInformation data={data} />
            </InfoSection>
          )}
          <InfoSection title='Trạng thái sản phẩm'>
            <ChangeStatus data={data} />
          </InfoSection>
        </VStack>
      </Stack>
    </Box>
  );
};

export default EditProduct;
