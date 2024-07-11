import { useLoginMutation } from '@/apis/authApi';
import InputField from '@/components/Fields/Input';
import { login as loginSlice } from '@/features/Auth/authSlice';
import { Box, Button, Center, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const LoginForm = () => {
  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const validationSchema = yup.object().shape({
    username: yup.string().required('Vui lòng không bỏ trống'),
    password: yup.string().required('Vui lòng không bỏ trống'),
  });

  return (
    <Center flex='1'>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (data, event) => {
          try {
            const res = await login(data);
            if (res.error) throw res.error.data;
            event.setSubmitting(false);
            dispatch(loginSlice(res.data));
            toast({
              title: 'Đăng nhập thành công',
              status: 'success',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
              onCloseComplete: () => {
                navigate('/');
              },
            });
          } catch (err) {
            console.log('Login error: ', err);
            toast({
              title: err.message,
              status: 'error',
              duration: 2500,
              isClosable: true,
              position: 'top-right',
            });
          }
        }}
      >
        {formikProps => {
          return (
            <Box as={Form} w={['full', '50%', '30%']} px={2}>
              <VStack>
                <FastField
                  component={InputField}
                  placeholder='Tên đăng nhập'
                  label='Tên đăng nhập'
                  name='username'
                  required={true}
                  mb={2}
                />
                <FastField
                  component={InputField}
                  placeholder='Mật khẩu'
                  label='Mật khẩu'
                  name='password'
                  type='password'
                  required={true}
                />
              </VStack>
              <Button
                mt={4}
                disabled={formikProps.isSubmitting}
                isLoading={formikProps.isSubmitting}
                type='submit'
                bg={'pink.400'}
                w='full'
              >
                Đăng nhập
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Center>
  );
};

export default LoginForm;
