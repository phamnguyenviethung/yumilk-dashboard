import {
  useAddUnitMutation,
  useGetUnitByIDQuery,
  useUpdateUnitMutation,
} from '@/apis/productApi';
import InputField from '@/components/Fields/Input';
import {
  Button,
  HStack,
  Icon,
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
import { TbEye } from 'react-icons/tb';
import * as yup from 'yup';

function UnitModal({ id, isAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetUnitByIDQuery(id, {
    skip: isAdd || !isOpen,
  });
  const [updateUnitAPI, { isLoading: updateLoading }] = useUpdateUnitMutation();
  const [addUnitAPI, { isLoading: addLoading }] = useAddUnitMutation();
  const toast = useToast();

  if (isLoading) return <p>Loading...</p>;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Vui lòng không bỏ trống'),
    description: yup.string(),
    gram: yup
      .number()
      .min(1, 'Tối thiểu phải là gì 1')
      .required('Vui lòng không bỏ trống'),
  });
  const handleSubmit = async val => {
    try {
      if (isAdd) {
        const res = await addUnitAPI(val);
        if (res.error) throw res.error.data;
        onClose();
      } else {
        const res = await updateUnitAPI({
          id,
          body: {
            ...val,
            gram: val.gram * 1,
          },
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
  return (
    <>
      <Button
        size={isAdd ? 'md' : 'sm'}
        colorScheme='pink'
        variant={isAdd ? 'solid' : 'ghost'}
        onClick={onOpen}
        my={isAdd ? 2 : 0}
      >
        {isAdd ? 'Thêm mới' : <Icon as={TbEye} fontSize='1.5rem' />}
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
                  <ModalHeader>Thuộc tính</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack w='full' p={2}>
                      <FastField
                        component={InputField}
                        placeholder='Tên đơn vị'
                        label='Tên đơn vị'
                        name='name'
                        required={true}
                        size='lg'
                        mb={2}
                      />
                      <FastField
                        component={InputField}
                        placeholder='Giá trị (gram)'
                        label='Giá trị (gram)'
                        name='gram'
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
export default UnitModal;
