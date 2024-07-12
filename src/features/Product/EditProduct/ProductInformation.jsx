import { useGetAllBrandQuery } from '@/apis/brandApi';
import {
  useGetAllCategoryQuery,
  useGetAllUnitQuery,
  useUpdateProductMutation,
} from '@/apis/productApi';
import InputField from '@/components/Fields/Input';
import SelectField from '@/components/Fields/Select';
import {
  Box,
  Button,
  Center,
  InputGroup,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { FastField, Form, Formik } from 'formik';
import * as yup from 'yup';
import ProductEditor from './ProductEditor';
import CircleLoading from '@/components/Loading/CircleLoading';

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
  const { data: unitData, isLoading: unitLoading } = useGetAllUnitQuery({
    isActive: true,
    pageSize: 1000000,
  });
  const [updateProductAPI, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const toast = useToast();
  if (categoryLoading || brandLoading || unitLoading)
    return (
      <Center boxSize='full'>
        <CircleLoading />
      </Center>
    );

  const validationSchema = yup.object().shape({
    name: yup.string().required('Vui lòng không bỏ trống'),
    quantity: yup
      .number('Vui lòng nhập vào 1 số')
      .min(0, 'Vui lòng nhập 1 số từ 0 trở lên')
      .required('Vui lòng không bỏ trống'),
    startDate: yup.date(),
    endDate: yup.date().min(yup.ref('startDate')),
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
    <Box>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: data.name,
          description: data.description ?? '',
          quantity: data.quantity,
          categoryId: data.categoryId,
          brandId: data.brandId,
          unitId: data.unitId,
          originalPrice: data.originalPrice * 1,
          salePrice: data.salePrice * 1,
        }}
        onSubmit={async d => {
          try {
            const res = await updateProductAPI({
              ...d,
              quantity: d.quantity * 1,
              originalPrice: d.originalPrice * 1,
              salePrice: d.salePrice * 1,
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
                        name:
                          (category?.parentName
                            ? category?.parentName + ' / '
                            : ' - ') + category.name,
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

                <FastField
                  component={SelectField}
                  value={formikProps.values.unitId}
                  onChange={e =>
                    formikProps.setFieldValue('unitId', e.target.value * 1)
                  }
                  label='Danh mục'
                  name='unitId'
                  required={true}
                  size='lg'
                  mb={2}
                  w='98%'
                  options={unitData.items.map(unit => {
                    return {
                      name: unit.name,
                      value: String(unit.id),
                    };
                  })}
                />

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
