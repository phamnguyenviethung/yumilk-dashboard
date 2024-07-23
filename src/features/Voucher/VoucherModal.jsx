import {
  useAddNewVoucherMutation,
  useGetVoucherByIDQuery,
  useUpdateVoucherMutation,
} from '@/apis/voucherApi';
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
import dayjs from 'dayjs';
import { FastField, Form, Formik } from 'formik';
import { TbEye } from 'react-icons/tb';
import * as yup from 'yup';

function VoucherModal({ id, isAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetVoucherByIDQuery(id, {
    skip: isAdd || !isOpen,
  });

  const [updateVoucherAPI, { isLoading: updateLoading }] =
    useUpdateVoucherMutation();
  const [addNewVoucher, { isLoading: addLoading }] = useAddNewVoucherMutation();
  const toast = useToast();

  if (isLoading) return <p>Loading...</p>;

  const validationSchema = yup.object().shape({
    description: yup.string(),
    quantity: yup
      .number()
      .min(0, 'Tối thiểu là 0')
      .required('Vui lòng không bỏ trống'),
    minPriceCondition: yup
      .number()
      .min(1000, 'Tối thiểu là 1.000')
      .required('Vui lòng không bỏ trống'),
    maxDiscount: yup
      .number()
      .min(1000, 'Tối thiểu là 1.000')
      .required('Vui lòng không bỏ trống'),
    percent: yup
      .number()
      .min(5, 'Tối thiểu là 5')
      .max(50, 'Tối đa là 50')
      .required('Vui lòng không bỏ trống'),
    startDate: yup.date('Sai định dạng').required('Vui lòng không bỏ trống'),
    endDate: yup
      .date('Sai định dạng')
      .min(yup.ref('startDate'), 'Phải lớn hơn ngày bắt đầu')
      .required('Vui lòng không bỏ trống'),
  });
  const handleSubmit = async val => {
    try {
      if (isAdd) {
        const res = await addNewVoucher(val);
        if (res.error) throw res.error.data;
        onClose();
      } else {
        const res = await updateVoucherAPI({
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

  const initialValues = {
    description: '',
    quantity: 10,
    minPriceCondition: 1000,
    maxDiscount: 1000,
    percent: 5,
    startDate: dayjs().toISOString(),
    endDate: dayjs().toISOString(),
    isActive: false,
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
            initialValues={isAdd ? initialValues : data}
            onSubmit={handleSubmit}
          >
            {formik => {
              return (
                <Form>
                  <ModalHeader>Danh mục</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack w='full' p={2}>
                      {!isAdd && (
                        <FastField
                          isReadOnly
                          component={InputField}
                          placeholder='Mã'
                          label='Mã'
                          name='code'
                          required={true}
                          size='lg'
                          mb={2}
                        />
                      )}
                      <FastField
                        component={InputField}
                        placeholder='Mô tả'
                        label='Mô tả'
                        name='description'
                        size='lg'
                        mb={2}
                      />

                      <HStack w='full' spacing='2'>
                        <FastField
                          component={InputField}
                          placeholder='Giá trị (%)'
                          label='Giá trị (%)'
                          name='percent'
                          size='lg'
                          mb={2}
                        />
                        <FastField
                          component={InputField}
                          placeholder='Số lượt sử dụng'
                          label='Số lượt sử dụng'
                          name='quantity'
                          size='lg'
                          mb={2}
                        />
                      </HStack>
                      <HStack w='full' spacing='2'>
                        <FastField
                          component={InputField}
                          placeholder='Số tiền tối thiểu để sử dụng'
                          label='Số tiền tối thiểu để sử dụng'
                          name='minPriceCondition'
                          size='lg'
                          mb={2}
                        />
                        <FastField
                          component={InputField}
                          placeholder='Số tiền tối đa được giảm'
                          label='Số tiền tối đa được giảm'
                          name='maxDiscount'
                          size='lg'
                          mb={2}
                        />
                      </HStack>
                      <FastField
                        component={InputField}
                        placeholder='Ngày bắt đầu'
                        label='Ngày bắt đầu'
                        name='startDate'
                        required={true}
                        size='lg'
                        type='datetime-local'
                        mb={2}
                      />
                      <FastField
                        component={InputField}
                        placeholder='Ngày kết thúc'
                        label='Ngày kết thúc'
                        name='endDate'
                        required={true}
                        size='lg'
                        type='datetime-local'
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
                      onClick={formik.handleSubmit}
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
export default VoucherModal;
