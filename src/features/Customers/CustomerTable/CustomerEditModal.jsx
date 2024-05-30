import InputField from '@/components/Fields/Input';
import {
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
  VStack,
} from '@chakra-ui/react';
import { FastField, Formik, Form } from 'formik';

const CustomerEditModal = ({ data, onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer {data.username} - Info</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={data}
          onSubmit={data => {
            console.log('submit', data);
            onClose();
          }}
        >
          {() => {
            return (
              <Form>
                <ModalBody>
                  <Box>
                    <VStack>
                      <FastField
                        disabled
                        component={InputField}
                        label='userID'
                        name='userID'
                        required={true}
                        size='lg'
                        mb={2}
                      />
                      <FastField
                        disabled
                        component={InputField}
                        label='Username'
                        name='username'
                        required={true}
                        size='lg'
                        mb={2}
                      />
                      <InputGroup>
                        <FastField
                          disabled
                          component={InputField}
                          label='Họ'
                          name='firstName'
                          required={true}
                          size='lg'
                          mb={2}
                          maxW='95%'
                        />
                        <FastField
                          disabled
                          component={InputField}
                          label='Tên'
                          name='lastName'
                          required={true}
                          size='lg'
                          mb={2}
                        />
                      </InputGroup>
                      <FastField
                        disabled
                        component={InputField}
                        label='Email'
                        name='email'
                        required={true}
                        size='lg'
                        type='email'
                        mb={2}
                      />
                      <FastField
                        disabled
                        component={InputField}
                        label='Số điện thoại'
                        name='phoneNumber'
                        required={true}
                        size='lg'
                        mb={2}
                      />
                    </VStack>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button type='submit'>Save</Button>
                </ModalFooter>
              </Form>
            );
          }}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default CustomerEditModal;
