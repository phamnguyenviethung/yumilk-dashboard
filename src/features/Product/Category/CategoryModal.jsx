import {
  useAddCategoryMutation,
  useGetAllCategoryQuery,
  useGetCategoryByIDQuery,
  useUpdateCategoryByIDMutation,
} from '@/apis/productApi';
import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import CircleLoading from '@/components/Loading/CircleLoading';
import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

function CategoryModal({ id, isAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetCategoryByIDQuery(id, {
    skip: isAdd || !isOpen,
  });
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({
      isActive: true,
      pageSize: 1000000,
    });
  const [updateCategoryAPI, { isLoading: updateLoading }] =
    useUpdateCategoryByIDMutation();
  const [addCatrogyAPI, { isLoading: addLoading }] = useAddCategoryMutation();
  const toast = useToast();

  if (isLoading) return <p>Loading...</p>;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Vui lòng không bỏ trống'),
    description: yup.string(),
  });
  const handleSubmit = async val => {
    try {
      if (isAdd) {
        const res = await addCatrogyAPI(val);
        if (res.error) throw res.error.data;
        onClose();
      } else {
        const res = await updateCategoryAPI({
          id,
          body: val,
        });
        if (res.error) throw res.error.data;
        onClose();
      }
      toast({
        title: 'Thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'Thất bại',
        status: 'error',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  if (categoryLoading)
    return (
      <Center>
        <CircleLoading />
      </Center>
    );
  return (
    <>
      <Button
        size={isAdd ? 'md' : 'sm'}
        colorScheme='pink'
        variant={isAdd ? 'solid' : 'ghost'}
        onClick={onOpen}
        my={isAdd ? 2 : 0}
      >
        {isAdd ? 'Thêm mới' : ' Xem chi tiết'}
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='xl'
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              name: '',
              isActive: false,
              ...data,
              description: data?.description ?? '',
            }}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form>
                  <ModalHeader>Danh mục</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack w='full' p={2}>
                      <FastField
                        component={InputField}
                        placeholder='name'
                        label='Tên danh mục'
                        name='name'
                        required={true}
                        size='lg'
                        mb={2}
                      />
                      <FastField
                        component={InputField}
                        placeholder='Mô tả'
                        label='Mô tả'
                        name='description'
                        size='lg'
                        mb={2}
                      />
                      <FastField
                        component={SelectField}
                        value={formik.values.parentId}
                        onChange={e =>
                          formik.setFieldValue('parentId', e.target.value * 1)
                        }
                        label='Danh mục cha'
                        name='parentId'
                        required={true}
                        size='lg'
                        mb={2}
                        w='98%'
                        options={categoryData.items
                          .filter(c => c.id !== id)
                          .map(category => {
                            return {
                              name: category.name,
                              value: String(category.id),
                            };
                          })}
                      />
                      <HStack w='full' mt={2}>
                        <Text>Trạng thái</Text>
                        <Switch
                          colorScheme='pink'
                          isChecked={formik.values.isActive}
                          onChange={() =>
                            formik.setFieldValue(
                              'isActive',
                              !formik.values.isActive
                            )
                          }
                        />
                      </HStack>
                    </VStack>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme='red'
                      variant='outline'
                      mr={3}
                      onClick={onClose}
                      isDisabled={updateLoading || addLoading}
                    >
                      Huỷ
                    </Button>
                    <Button
                      type='submit'
                      colorScheme='pink'
                      isLoading={updateLoading || addLoading}
                    >
                      {isAdd ? 'Thêm' : 'Cập nhật'}
                    </Button>
                  </ModalFooter>
                </Form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
export default CategoryModal;
