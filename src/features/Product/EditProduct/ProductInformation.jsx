import { useGetAllBrandQuery } from '@/apis/brandApi';
import {
  useGetAllCategoryQuery,
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
          name: data.name,
          description: data.description ?? '',
          quantity: data.quantity,
          categoryId: data.categoryId,
          brandId: data.brandId,
        }}
        onSubmit={async d => {
          try {
            const res = await updateProductAPI({
              ...d,
              quantity: d.quantity * 1,

              id: data.id,
            });

            if (res.error) throw res.error.data;

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
                  w='full'
                  type='submit'
                  mt='4'
                  alignSelf='flex-end'
                  colorScheme='pink'
                  isLoading={updateLoading}
                >
                  Cập nhật thông tin
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
