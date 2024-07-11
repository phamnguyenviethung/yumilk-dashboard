import { useUpdateProductMutation } from '@/apis/productApi';
import InputField from '@/components/Fields/Input';
import { Button, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';

const ChangePrice = ({ data }) => {
  const [updateProductAPI, { isLoading }] = useUpdateProductMutation();
  const toast = useToast();

  const validationSchema = yup.object().shape({
    originalPrice: yup
      .number('Vui lòng nhập vào 1 số')
      .min(0, 'Vui lòng nhập 1 số từ 0 trở lên')
      .required('Vui lòng không bỏ trống'),
    salePrice: yup
      .number('Vui lòng nhập vào 1 số')
      .min(0, 'Vui lòng nhập 1 số từ 0 trở lên')
      .test(
        'max',
        'Giá giảm giá không được vượt quá giá gốc',
        (value, context) => value <= context.parent.originalPrice
      )
      .required('Vui lòng không bỏ trống'),
  });

  return (
    <VStack>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          originalPrice: data.originalPrice * 1,
          salePrice: data.salePrice * 1,
        }}
        onSubmit={async d => {
          try {
            const res = await updateProductAPI({
              id: data.id,
              originalPrice: d.originalPrice * 1,
              salePrice: d.salePrice * 1,
            });
            if (res.error) throw res.error.data;
            toast({
              title: 'Cập nhật giá thành công',
              status: 'success',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
            });
          } catch (err) {
            console.log(err);
            toast({
              title: 'Cập nhật giá thất bại',
              status: 'error',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
            });
          }
        }}
      >
        {() => {
          return (
            <VStack as={Form} w='full' gap='4'>
              <FastField
                component={InputField}
                placeholder='Giá gốc'
                label='Giá gốc'
                name='originalPrice'
                required={true}
                size='lg'
                mb={2}
              />
              <FastField
                component={InputField}
                placeholder='Giá giảm giá'
                label='Giá giảm giá'
                name='salePrice'
                required={true}
                size='lg'
                mb={2}
                helper='Để giá trị là 0 nếu như không muốn giảm giá'
              />
              <Button
                type='submit'
                alignSelf='flex-end'
                colorScheme='pink'
                size='md'
                isLoading={isLoading}
                w='full'
              >
                Cập nhật giá
              </Button>
            </VStack>
          );
        }}
      </Formik>
    </VStack>
  );
};

export default ChangePrice;
