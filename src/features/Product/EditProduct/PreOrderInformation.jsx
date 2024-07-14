import { useUpdatePreOrderProductMutation } from '@/apis/productApi';
import InputField from '@/components/Fields/Input';
import { Box, Button, Stack, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

const PreOrderInformation = ({ data }) => {
  const [updatePreOrderProductAPI, { isLoading: updatePreOrderLoading }] =
    useUpdatePreOrderProductMutation();
  const toast = useToast();

  const validationSchema = yup.object().shape({
    maxPreOrderQuantity: yup
      .number()
      .min(0)
      .required('Vui lòng không bỏ trống'),
    expectedPreOrderDays: yup
      .number()
      .min(0)
      .max(30)
      .required('Vui lòng không bỏ trống'),
    startDate: yup.date().required('Vui lòng không bỏ trống'),
    endDate: yup
      .date()
      .min(
        yup
          .ref('startDate', 'Phải lớn hơn ngày bắt đầu')
          .required('Vui lòng không bỏ trống')
      ),
  });

  return (
    <Box w='full'>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          maxPreOrderQuantity: data.maxPreOrderQuantity,
          startDate: data.startDate,
          endDate: data.endDate,
          expectedPreOrderDays: data.expectedPreOrderDays,
        }}
        onSubmit={async d => {
          try {
            const resPreOrder = await updatePreOrderProductAPI({
              id: data.id,
              startDate: d.startDate,
              endDate: d.endDate,
              maxPreOrderQuantity: d.maxPreOrderQuantity * 1,
              expectedPreOrderDays: 30,
            });

            if (resPreOrder.error) throw resPreOrder.error.data;

            toast({
              title: 'Cập nhật thông tin thành công',
              status: 'success',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
            });
          } catch (err) {
            console.log(err);
            toast({
              title: err.message ?? 'Cập nhật thông tin thất bại',
              status: 'error',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
            });
          }
        }}
      >
        {formik => {
          return (
            <VStack
              as={Form}
              boxSize='full'
              alignItems='flex-start'
              mt={4}
              gap='4'
              w='full'
            >
              <FastField
                component={InputField}
                placeholder='Số ngày dự kiến có hàng'
                label='Số ngày dự kiến có hàng'
                name='expectedPreOrderDays'
                required={true}
                size='lg'
                mb={2}
              />
              <FastField
                component={InputField}
                placeholder='Số lượt đặt'
                label='Số lượt đặt'
                name='maxPreOrderQuantity'
                required={true}
                size='lg'
                mb={2}
              />
              <Stack
                w='full'
                flexDirection={{
                  base: 'column',
                  lg: 'column',
                }}
                gap='2'
              >
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
              </Stack>
              <Button
                type='submit'
                onClick={formik.handleSubmit}
                mt='4'
                alignSelf='flex-end'
                colorScheme='pink'
                isLoading={updatePreOrderLoading}
              >
                Gửi
              </Button>
            </VStack>
          );
        }}
      </Formik>
    </Box>
  );
};

export default PreOrderInformation;
