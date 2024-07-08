import { Box, Container, Stack, Text, VStack } from '@chakra-ui/react';
import ProductInformation from './ProductInformation';
import ChangeThumbnail from './ChangeThumbnail';
import { useGetProductByIDQuery } from '@/apis/productApi';
import ChangePrice from './ChangePrice';
import ChangeAttributes from './ChangeAttributes';
import ChangeImages from './ChangeImages';
import ChangeStatus from './ChangeStatus';

const InfoSection = props => {
  const { children } = props;
  return (
    <Box
      w='full'
      flex='1'
      bgColor='brand.secondary'
      minH='400px'
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

const EditProduct = ({ id }) => {
  const { data, isLoading } = useGetProductByIDQuery(id);
  if (isLoading) return <p>Loading</p>;
  return (
    <Container maxW='container.xl' pt={4} pb={16}>
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
            <ChangeImages id={id} />
          </InfoSection>
          <InfoSection title='Mô tả sản phẩm'>
            <ChangeAttributes data={data} />
          </InfoSection>
        </VStack>
        <VStack gap='4'>
          <InfoSection title='Giá sản phẩm'>
            <ChangePrice data={data} />
          </InfoSection>
          <InfoSection title='Trạng thái sản phẩm'>
            <ChangeStatus data={data} />
          </InfoSection>
        </VStack>
      </Stack>
    </Container>
  );
};

export default EditProduct;
