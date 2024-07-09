import { useGetAllBrandQuery } from '@/apis/brandApi';
import {
  useGetAllCategoryQuery,
  useUpdatePreOrderProductMutation,
  useUpdateProductMutation,
} from '@/apis/productApi';
import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import { Box, Button, InputGroup, VStack, useToast } from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import ProductEditor from './ProductEditor';

const ProductInformation = ({ data }) => {
  const { data: categoryData, isLoading: categoryLoading } =
    useGetAllCategoryQuery({
      isActive: true,
      pageSize: 1000000,
    });
  const { data: brandData, isLoading: brandLoading } = useGetAllBrandQuery({
    isActive: true,
    pageSize: 1000000,
  });
  const [updateProductAPI, { isLoading: updateLoading }] =
    useUpdateProductMutation();
  const [updatePreOrderProductAPI, { isLoading: updatePreOrderLoading }] =
    useUpdatePreOrderProductMutation();
  const toast = useToast();
  if (categoryLoading || brandLoading) return <p>Loading...</p>;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Vui lòng không bỏ trống'),
    quantity: yup
      .number('Vui lòng nhập vào 1 số')
      .min(0, 'Vui lòng nhập 1 số từ 0 trở lên')
      .required('Vui lòng không bỏ trống'),
    startDate: yup.date(),
    endDate: yup.date().min(yup.ref('startDate')),
  });

  return (
    <Box>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          ...data,
        }}
        onSubmit={async d => {
          try {
            const res = await updateProductAPI({
              data: {
                ...d,
                quantity: d.quantity * 1,
              },
            });

            if (res.error) throw res.error.data;
            // Pre order - Status ID = 2
            if (data.statusId === 2) {
              const res = await updatePreOrderProductAPI({
                data: {
                  ...d,
                  expectedPreOrderDays: 30,
                },
              });

              if (res.error) throw res.error.data;
            }

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
              title: 'Cập nhật thông tin thất bại',
              status: 'error',
              duration: 1000,
              isClosable: true,
              position: 'top-right',
            });
          }
        }}
      >
        {formikProps => {
          const handleEditor = value => {
            formikProps.setFieldValue('description', value);
          };
          return (
            <Form>
              <VStack>
                <FastField
                  component={InputField}
                  placeholder='Tên sản phẩm'
                  label='Tên sản phẩm'
                  name='name'
                  required={true}
                  size='lg'
                  mb={2}
                />

                <FastField
                  component={InputField}
                  placeholder='Số lượng'
                  label='Số lượng'
                  name='quantity'
                  required={true}
                  size='lg'
                  mb={2}
                />
                {data.statusId === 2 && (
                  <>
                    <FastField
                      component={InputField}
                      placeholder='Số lượt đặt'
                      label='Số lượt đặt'
                      name='maxPreOrderQuantity'
                      required={true}
                      size='lg'
                      mb={2}
                    />
                    <InputGroup>
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
                    </InputGroup>
                  </>
                )}

                <InputGroup>
                  <FastField
                    component={SelectField}
                    value={formikProps.values.categoryId}
                    onChange={e =>
                      formikProps.setFieldValue(
                        'categoryId',
                        e.target.value * 1
                      )
                    }
                    label='Danh mục'
                    name='categoryId'
                    required={true}
                    size='lg'
                    mb={2}
                    w='98%'
                    options={categoryData.items.map(category => {
                      return {
                        name: category.name,
                        value: String(category.id),
                      };
                    })}
                  />
                  <FastField
                    component={SelectField}
                    value={formikProps.values.brandId}
                    onChange={e =>
                      formikProps.setFieldValue('brandId', e.target.value * 1)
                    }
                    label='Nhãn hàng'
                    name='brandId'
                    required={true}
                    size='lg'
                    mb={2}
                    options={brandData.items.map(brand => {
                      return {
                        name: brand.name,
                        value: String(brand.id),
                      };
                    })}
                  />
                </InputGroup>

                <ProductEditor
                  value={formikProps.values.description}
                  handleEditor={handleEditor}
                />

                <Button
                  type='submit'
                  mt='4'
                  alignSelf='flex-end'
                  colorScheme='pink'
                  isLoading={updateLoading || updatePreOrderLoading}
                >
                  Gửi
                </Button>
              </VStack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ProductInformation;
