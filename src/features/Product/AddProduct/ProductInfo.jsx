import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import {
  Box,
  Button,
  Container,
  InputGroup,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import ProductEditor from './ProductEditor';

const InfoSection = props => {
  const { children } = props;
  return (
    <Box
      flex='1'
      bgColor='brand.secondary'
      minH='400px'
      borderRadius='8px'
      p={4}
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

const Information = () => {
  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          quantity: 100,
          category: 'Test',
          description: '',
        }}
      >
        {formikProps => {
          console.log(formikProps.values);
          const handleEditor = value => {
            formikProps.setFieldValue('description', value);
          };
          return (
            <Form>
              <VStack>
                <FastField
                  component={InputField}
                  placeholder='Tên sản phẩm'
                  label='Tên sản phẩm'
                  name='name'
                  required={true}
                  size='lg'
                  mb={2}
                />
                <FastField
                  component={InputField}
                  placeholder='Số lượng'
                  label='Số lượng'
                  name='quantity'
                  required={true}
                  size='lg'
                  mb={2}
                />
                <InputGroup>
                  <FastField
                    component={SelectField}
                    onChange={e =>
                      formikProps.setFieldValue('category', e.target.value)
                    }
                    label='Danh mục'
                    name='category'
                    required={true}
                    size='lg'
                    mb={2}
                    w='98%'
                    options={[
                      {
                        name: 'Test',
                        value: 'Test',
                      },
                      {
                        name: 'Test1',
                        value: 'Test1',
                      },
                    ]}
                  />
                  <FastField
                    component={SelectField}
                    onChange={e =>
                      formikProps.setFieldValue('brand', e.target.value)
                    }
                    label='Nhãn hàng'
                    name='brand'
                    required={true}
                    size='lg'
                    mb={2}
                    options={[
                      {
                        name: 'Test',
                        value: 'Test',
                      },
                      {
                        name: 'Test1',
                        value: 'Test1',
                      },
                    ]}
                  />
                </InputGroup>
                <Box
                  w='full'
                  minH='200px'
                  border='1px solid'
                  borderColor='gray.600'
                  borderRadius='6px'
                  _hover={{
                    borderColor: 'pink.400',
                    outline: 0,
                  }}
                  _focus={{
                    outline: 0,
                  }}
                >
                  <ProductEditor
                    value={formikProps.values.description}
                    handleEditor={handleEditor}
                  />
                </Box>
                <Button
                  type='submit'
                  mt='4'
                  alignSelf='flex-end'
                  colorScheme='pink'
                >
                  Save
                </Button>
              </VStack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

const ProductInfo = () => {
  return (
    <Container maxW='container.xl'>
      <Stack
        w='Full'
        gap='4'
        direction={['column', 'column', 'row']}
        alignItems={{
          base: 'stretch',
          lg: 'baseline',
        }}
      >
        <InfoSection title='Product Information' flex='2'>
          <Information />
        </InfoSection>
        <InfoSection title='Price'>price</InfoSection>
      </Stack>
    </Container>
  );
};

export default ProductInfo;
