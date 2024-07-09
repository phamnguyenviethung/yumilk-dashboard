import { useAddNewUserMutation } from '@/apis/userApi';
import InputField from '@/components/Fields/Input';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

const AddNewButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addNewUser, result] = useAddNewUserMutation();

  const initialValues = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    roleId: 2,
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Vui lòng không bỏ trống'),
    lastName: yup.string().required('Vui lòng không bỏ trống'),
    username: yup.string().required('Vui lòng không bỏ trống'),
    password: yup
      .string()
      .min(8, 'Mật khẩu phải tối thiểu 8 kí tự')
      .max(255, 'Mật khẩu tối đa chỉ được 255 kí tự')
      .required('Vui lòng không bỏ trống')
      .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$', {
        message:
          'Mật khẩu phải có ít nhất 1 số, 1 kí tự đặc biệt, 1 chữ hoa và 1 chữ thường',
      }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
    roleId: yup.number().min(1).max(2).required('Vui lòng không bỏ trống'),
  });
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('Có lỗi xảy ra');
  const handleSubmit = async data => {
    try {
      const res = await addNewUser(data);
      if (res.error) throw res.error.data;
      onClose();
      toast({
        title: 'Thành công',
        status: 'success',
        duration: 1000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      console.log('Add new user error', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Button colorScheme='pink' onClick={onOpen} ml={2}>
        Thêm mới tài khoản
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formikProps => {
              return (
                <Form>
                  <ModalBody>
                    <Box py={2}>
                      {result.isError && (
                        <Alert status='error' my={2}>
                          <AlertIcon />
                          <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                      )}
                      <VStack>
                        <FastField
                          component={InputField}
                          label='Tên đăng nhập'
                          name='username'
                          required={true}
                          size='lg'
                          mb={2}
                        />
                        <InputGroup>
                          <FastField
                            component={InputField}
                            label='Họ'
                            name='firstName'
                            required={true}
                            size='lg'
                            mb={2}
                            maxW='95%'
                          />
                          <FastField
                            component={InputField}
                            label='Tên'
                            name='lastName'
                            required={true}
                            size='lg'
                            mb={2}
                          />
                        </InputGroup>
                        <FastField
                          component={InputField}
                          label='Mật khẩu'
                          name='password'
                          required={true}
                          size='lg'
                          type='password'
                          mb={2}
                        />
                        <FastField
                          component={InputField}
                          label='Nhập lại mật khẩu'
                          name='confirmPassword'
                          required={true}
                          size='lg'
                          mb={2}
                          type='password'
                        />
                        <Select
                          defaultValue={initialValues.roleId + ''}
                          name='roleId'
                          onChange={e => {
                            formikProps.setFieldValue(
                              'roleId',
                              e.target.value * 1
                            );
                          }}
                        >
                          <option value='1'>Admin</option>
                          <option value='2'>Staff</option>
                        </Select>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type='submit'
                      colorScheme='pink'
                      disabled={formikProps.isSubmitting || result.isLoading}
                      isLoading={formikProps.isSubmitting || result.isLoading}
                    >
                      Submit
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
};

export default AddNewButton;
