import { useUpdateProductMutation } from '@/apis/productApi';
import SelectField from '@/components/Fields/Select';
import { Box, Button, Flex, Switch, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
const options = [
  {
    name: 'Đang mở bán',
    value: 1,
  },
  {
    name: 'Đang mở đặt trước',
    value: 2,
  },
  {
    name: 'Đã hết hàng',
    value: 3,
  },
];
const ChangeStatus = ({ data }) => {
  const [updateProductAPI, { isLoading }] = useUpdateProductMutation();
  const toast = useToast();
  return (
    <Formik
      initialValues={{
        isActive: data.isActive,
        id: data.id,
        statusId: data.statusId,
      }}
      onSubmit={async val => {
        try {
          const res = await updateProductAPI(val);
          if (res.error) throw res.error.data;
          toast({
            title: 'Thành công',
            status: 'success',
            duration: 1000,
            isClosable: true,
            position: 'top-right',
          });
        } catch (err) {
          console.log(err);
          toast({
            title: 'Thất bại',
            status: 'error',
            duration: 1000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }}
    >
      {formikProps => {
        return (
          <VStack
            as={Form}
            boxSize='full'
            alignItems='flex-start'
            mt={4}
            gap='4'
            justifyContent='space-between'
          >
            <Box>
              <FastField
                component={SelectField}
                value={formikProps.values.statusId}
                onChange={e =>
                  formikProps.setFieldValue('statusId', e.target.value * 1)
                }
                label='Danh mục'
                name='statusId'
                required={true}
                size='lg'
                mb={2}
                w='98%'
                options={options}
              />
              <Box>
                Công khai:{' '}
                <Switch
                  onChange={() =>
                    formikProps.setFieldValue(
                      'isActive',
                      !formikProps.values.isActive
                    )
                  }
                  isChecked={formikProps.values.isActive}
                />
              </Box>
            </Box>
            <Flex justifyContent='flex-end' w='full'>
              <Button
                type='submit'
                colorScheme='pink'
                w='full'
                isLoading={isLoading}
              >
                Gửi
              </Button>
            </Flex>
          </VStack>
        );
      }}
    </Formik>
  );
};

export default ChangeStatus;