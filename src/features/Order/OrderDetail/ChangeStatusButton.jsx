import {
  useCancelOrderMutation,
  useChangeOrderStatusMutation,
} from '@/apis/orderApi';
import order from '@/constants/order';
import { Button, ButtonGroup } from '@chakra-ui/react';
const shouldCancel = [order.PENDING.name, order.PROCESSING.name];
const shouldConfirm = [order.PENDING.name];

const ChangeStatusButton = ({ data, id }) => {
  const [cancelOrderAPI] = useCancelOrderMutation();
  const [changeOrderStatusAPI] = useChangeOrderStatusMutation();
  const handleCancel = async () => {
    try {
      const res = await cancelOrderAPI(id);
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async statusId => {
    try {
      const res = await changeOrderStatusAPI({ id, statusId });
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ButtonGroup w='full'>
      {shouldCancel.includes(data.orderStatus) && (
        <Button
          flex='1'
          size={{
            base: 'sm',
            lg: 'md',
          }}
          w='full'
          variant='outline'
          colorScheme='red'
          onClick={handleCancel}
        >
          Hủy
        </Button>
      )}
      {shouldConfirm.includes(data.orderStatus) &&
        data.paymentMethod === order.COD_PAYMENT && (
          <Button
            flex='2'
            size={{
              base: 'sm',
              lg: 'md',
            }}
            w='full'
            colorScheme='pink'
            onClick={() => handleChangeStatus(order.PROCESSING.id)}
          >
            Xác nhận đơn hàng
          </Button>
        )}
      {data.orderStatus === order.PROCESSING.name && (
        <Button
          flex='2'
          size={{
            base: 'sm',
            lg: 'md',
          }}
          w='full'
          colorScheme='pink'
          onClick={() => handleChangeStatus(order.SHIPPING.id)}
        >
          Tạo đơn vận chuyển
        </Button>
      )}
    </ButtonGroup>
  );
};

export default ChangeStatusButton;
