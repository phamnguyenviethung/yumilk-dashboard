import {
  useGetAllAttributeQuery,
  useGetAttributeValueByIdQuery,
} from '@/apis/attributeApi';
import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import {
  Box,
  Button,
  Divider,
  HStack,
  InputGroup,
  VStack,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';

const AddAttribute = () => {
  const { data, isLoading } = useGetAllAttributeQuery();

  if (isLoading) return <p>Loading...</p>;
  return (
    <Formik
      initialValues={{
        value: '',
      }}
    >
      {formikProps => {
        return (
          <VStack as={Form} w='full'>
            <InputGroup w='full'>
              <FastField
                component={SelectField}
                value={formikProps.values.categoryId}
                onChange={e =>
                  formikProps.setFieldValue('attributeId', e.target.value * 1)
                }
                label='Danh mục'
                name='attributeId'
                required={true}
                size='lg'
                mb={2}
                w='98%'
                options={data?.items.map(attr => {
                  return {
                    name: attr.name,
                    value: String(attr.id),
                  };
                })}
              />
              <FastField
                component={InputField}
                placeholder='Giá trị'
                label='Giá trị'
                name='value'
                required={true}
                size='lg'
                mb={2}
              />
            </InputGroup>
            <Button
              type='submit'
              colorScheme='pink'
              size='md'
              alignSelf='end'
              w={{
                base: 'full',
                lg: 'auto',
              }}
            >
              Thêm
            </Button>
          </VStack>
        );
      }}
    </Formik>
  );
};

const AttributeList = ({ data }) => {
  const { data: attributeData, isLoading } = useGetAttributeValueByIdQuery(
    data.id
  );
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      {attributeData.items.map(attr => {
        return (
          <Formik
            key={attr.id}
            initialValues={{
              value: attr.value,
            }}
          >
            {formikProps => {
              return (
                <VStack as={Form} w='full'>
                  <InputGroup h='full' w='full' alignItems='center'>
                    <FastField
                      component={InputField}
                      placeholder={attr.attributeName}
                      label={attr.attributeName}
                      name='value'
                      required={true}
                      size='lg'
                      mb={2}
                    />
                    <Button h='full'>add</Button>
                    <Button h='full'>delete</Button>
                  </InputGroup>
                </VStack>
              );
            }}
          </Formik>
        );
      })}
    </>
  );
};

const ChangeAttributes = ({ data }) => {
  return (
    <VStack w='full' gap='8'>
      <Box w='full'>
        <AddAttribute />
      </Box>
      <Divider />
      <Box w='full'>
        <AttributeList data={data} />
      </Box>
    </VStack>
  );
};

export default ChangeAttributes;
