import { Box, Container, Stack, Text, VStack } from '@chakra-ui/react';
import ProductInformation from './ProductInformation';
import ChangeThumbnail from './ChangeThumbnail';
import { useGetProductByIDQuery } from '@/apis/productApi';
import ChangePrice from './ChangePrice';
import ChangeAttributes from './ChangeAttributes';

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
          <InfoSection title='Product Information'>
            <ProductInformation data={data} />
          </InfoSection>
          <InfoSection title='Thumnail'>
            <ChangeThumbnail data={data} />
          </InfoSection>
          <InfoSection title='Mô tả'>
            <ChangeAttributes data={data} />
          </InfoSection>
        </VStack>
        <InfoSection title='Price'>
          <ChangePrice data={data} />
        </InfoSection>
      </Stack>
    </Container>
  );
};

export default EditProduct;
