import {
  useGetCategoryByIDQuery,
  useUpdateCategoryByIDMutation,
} from '@/apis/productApi';
import InputField from '@/components/Fields/Input';
import {
  Button,
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
  VStack,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

function CategoryModal({ id, isAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetCategoryByIDQuery(id, {
    skip: isAdd,
  });
  const [updateCategoryAPI, { isLoading: updateLoading }] =
    useUpdateCategoryByIDMutation();
  if (isLoading) return <p>Loading...</p>;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Vui lòng không bỏ trống'),
    description: yup.string(),
  });
  const handleSubmit = async (val, event) => {
    try {
      if (isAdd) {
      } else {
        const res = await updateCategoryAPI({
          id,
          body: val,
        });
        if (res.error) throw res.error.data;
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button size='sm' colorScheme='pink' variant='ghost' onClick={onOpen}>
        Xem chi tiết
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
                      isDisabled={updateLoading}
                    >
                      Close
                    </Button>
                    <Button
                      type='submit'
                      colorScheme='pink'
                      isLoading={updateLoading}
                    >
                      Xác nhận
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
