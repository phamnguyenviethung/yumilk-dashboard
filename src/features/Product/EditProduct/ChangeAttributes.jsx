import {
  useAddNewAttributeValueByIdMutation,
  useDeleteAttributeValueByIdMutation,
  useGetAllAttributeQuery,
  useGetAttributeValueByIdQuery,
  useUpdateAttributeValueByIdMutation,
} from '@/apis/attributeApi';
import CheckIcon from '@/assets/Icon/check';
import TrashIcon from '@/assets/Icon/trash';
import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  InputGroup,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

const AddAttribute = ({ productAttributeIDData, productId }) => {
  const {
    data: attributeData,
    isLoading,
    refetch,
  } = useGetAllAttributeQuery(productAttributeIDData, {
    refetchOnMountOrArgChange: true,
  });
  const [addNewAttributeToProduct, { isLoading: addLoading }] =
    useAddNewAttributeValueByIdMutation();
  const toast = useToast();

  if (isLoading) return <p>Loading...</p>;
  const options = attributeData?.items
    .filter(attr => !productAttributeIDData.includes(attr.id))
    .map(attr => {
      return {
        name: attr.name,
        value: String(attr.id),
      };
    });
  return (
    <Formik
      initialValues={{
        value: '',
        attributeId: options[0].value,
      }}
      onSubmit={async d => {
        try {
          const res = await addNewAttributeToProduct({
            data: d,
            id: productId,
            attributeId: d.attributeId,
          });

          if (res.error) throw res.error.data;
          refetch();
          toast({
            title: 'Tạo thành công',
            status: 'success',
            duration: 1000,
            isClosable: true,
            position: 'top-right',
          });
        } catch (err) {
          console.log(err);
          toast({
            title: 'Tạo thất bại',
            status: 'error',
            duration: 1000,
            isClosable: true,
            position: 'top-right',
          });
        }
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
                options={options}
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
              isLoading={addLoading}
            >
              Thêm
            </Button>
          </VStack>
        );
      }}
    </Formik>
  );
};

function DeleteDialog({ data }) {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteProductAttribute] = useDeleteAttributeValueByIdMutation();
  return (
    <>
      <Button size='lg' variant='ghost' colorScheme='red' onClick={onOpen}>
        <Icon as={TrashIcon} fontSize='1.2rem' color='red.400' />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        motionPreset='slideInBottom'
      >
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Xóa mô tả
          </AlertDialogHeader>

          <AlertDialogBody>Bạn có muốn xóa ?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Hủy
            </Button>
            <Button
              colorScheme='red'
              onClick={async () => {
                try {
                  const res = await deleteProductAttribute(data);
                  if (res.error) throw res.error.data;
                  onClose();
                } catch (err) {
                  console.log(err);
                }
              }}
              ml={3}
            >
              Xóa
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const AttributeList = ({ data }) => {
  const [updateProductAttribute] = useUpdateAttributeValueByIdMutation();
  const toast = useToast();

  const validationSchema = yup.object().shape({
    value: yup.string().required('Vui lòng không bỏ trống'),
  });

  return (
    <>
      {data.items.map(attr => {
        return (
          <Box key={attr.attributeId}>
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                value: attr.value,
              }}
              onSubmit={async d => {
                try {
                  const res = await updateProductAttribute({
                    data: d,
                    attributeId: attr.attributeId,
                    id: attr.productId,
                  });
                  if (res.error) throw res.error.data;

                  toast({
                    title: 'Cập nhật thành công',
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                    position: 'top-right',
                  });
                } catch (err) {
                  console.log(err);
                  toast({
                    title: 'Cập nhật thất bại',
                    status: 'error',
                    duration: 1000,
                    isClosable: true,
                    position: 'top-right',
                  });
                }
              }}
            >
              {formikProps => {
                return (
                  <Form>
                    <Flex alignItems='center' w='full'>
                      <Box w='full'>
                        <FastField
                          component={InputField}
                          placeholder={attr.attributeName}
                          label={attr.attributeName}
                          name='value'
                          required={true}
                          size='lg'
                          mb={2}
                          content={
                            <Flex
                              ml={2}
                              h='full'
                              alignItems='center'
                              gap='2'
                              flex='1'
                            >
                              <Button
                                isDisabled={!formikProps.dirty}
                                type='submit'
                                bgColor={
                                  !formikProps.dirty
                                    ? 'brand.secondary'
                                    : 'green.400'
                                }
                                variant={!formikProps.dirty ? 'ghost' : 'solid'}
                                size='lg'
                              >
                                <Icon
                                  as={CheckIcon}
                                  fontSize='1.8rem'
                                  color={!formikProps.dirty ? 'gray' : 'white'}
                                />
                              </Button>
                              <DeleteDialog
                                data={{
                                  attributeId: attr.attributeId,
                                  id: attr.productId,
                                }}
                              />
                            </Flex>
                          }
                        />
                      </Box>
                    </Flex>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        );
      })}
    </>
  );
};

const ChangeAttributes = ({ data }) => {
  const {
    data: productAttributeData,
    isLoading,
    refetch,
  } = useGetAttributeValueByIdQuery(data.id);
  if (isLoading) return <p>Loading...</p>;

  return (
    <VStack w='full' gap='8'>
      <Box w='full'>
        <AddAttribute
          refetch={refetch}
          productId={data.id}
          productAttributeIDData={productAttributeData.items.map(
            item => item.attributeId
          )}
        />
      </Box>
      <Divider />
      <Box w='full'>
        <AttributeList data={productAttributeData} />
      </Box>
    </VStack>
  );
};

export default ChangeAttributes;
