import { useAddProductMutation } from '@/apis/productApi';
import { Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AddProductButton = () => {
  const [addProductAPI, { isLoading }] = useAddProductMutation();
  const nav = useNavigate();
  const toast = useToast();
  const handleClick = async () => {
    try {
      const res = await addProductAPI({
        name: 'Tên sản phẩm' + Math.random() * 100,
        description: 'string',
        quantity: 1,
        originalPrice: 10000,
        salePrice: 10000,
        thumbnail: 'https://placehold.co/200',
        categoryId: 1,
        brandId: 1,
        unitId: 1,
        statusId: 1,
      });
      if (res.error) throw res.error.data;
      nav(`/manage/product/${res.data.productId}`);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Tạo thất bại',
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Button colorScheme='pink' isLoading={isLoading} onClick={handleClick}>
      Thêm sản phẩm
    </Button>
  );
};

export default AddProductButton;
