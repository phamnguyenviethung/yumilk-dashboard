import InputField from '@/components/Fields/Input';
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login as loginSlice } from '@/features/Auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/apis/authApi';

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
            <Box w={['full', '50%', '30%']} px={2}>
              <Form>
                <VStack>
                  <FastField
                    component={InputField}
                    placeholder='username'
                    label='Tên đăng nhập'
                    name='username'
                    required={true}
                    size='lg'
                    mb={2}
                  />
                  <FastField
                    component={InputField}
                    placeholder='Your Password'
                    label='Password'
                    name='password'
                    type='password'
                    required={true}
                    size='lg'
                  />
                </VStack>
                <Flex my={2} justifyContent='flex-end'>
                  <Text color='pink.400' fontSize='14px'>
                    <Link to='/forgot'>Quên mật khẩu</Link>
                  </Text>
                </Flex>
                <Button
                  mt={2}
                  disabled={formikProps.isSubmitting}
                  isLoading={formikProps.isSubmitting}
                  type='submit'
                  bg={'pink.400'}
                  w='full'
                >
                  Gửi
                </Button>
                <Center mt={4} mb={2}>
                  <Text color='pink.400' fontSize='14px'>
                    <Link to='/register'>Đăng ký tài khoản mới</Link>
                  </Text>
                </Center>
              </Form>
            </Box>
          );
        }}
      </Formik>
    </Center>
  );
};

export default LoginForm;
