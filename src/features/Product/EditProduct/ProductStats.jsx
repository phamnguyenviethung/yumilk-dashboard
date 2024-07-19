import BoxStats from '@/components/Stats/BoxStat';
import { Stack } from '@chakra-ui/react';
import { HiOutlineStar } from 'react-icons/hi';
import { TbBubble, TbShoppingBagCheck } from 'react-icons/tb';
const ProductStats = ({ data }) => {
  return (
    <Stack
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      gap='2'
      w='full'
    >
      <BoxStats
        name='Lượt mua'
        stat={data?.orderCount}
        color='green'
        icon={TbShoppingBagCheck}
      />
      <BoxStats
        name='Đánh giá trung bình'
        stat={data?.averageRating}
        color='yellow'
        icon={HiOutlineStar}
      />
      <BoxStats
        name='Lượt đáng giá'
        stat={data?.ratingCount}
        color='teal'
        icon={TbBubble}
      />
    </Stack>
  );
};

export default ProductStats;
