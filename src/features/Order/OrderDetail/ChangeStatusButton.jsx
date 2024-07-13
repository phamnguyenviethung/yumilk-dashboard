import {
  useCancelGHNOrderMutation,
  useCancelOrderMutation,
  useChangeOrderStatusMutation,
  useSetOrderToDeliveredMutation,
} from '@/apis/orderApi';
import order from '@/constants/order';
import { Button, ButtonGroup } from '@chakra-ui/react';
const shouldCancel = [
  order.PENDING.name,
  order.PROCESSING.name,
  order.SHIPPED.name,
  order.PREORDERED.name,
];
const shouldConfirm = [order.PENDING.name];
const shouldCreateShip = [order.PROCESSING.name, order.PREORDERED.name];

const ChangeStatusButton = ({ data, id }) => {
  const [cancelOrderAPI, { isLoading: cancelLoading }] =
    useCancelOrderMutation();
  const [cancelGHNOrderAPI, { isLoading: cancelGHNLoading }] =
    useCancelGHNOrderMutation();
  const [changeOrderStatusAPI, { isLoading: changeLoading }] =
    useChangeOrderStatusMutation();
  const handleCancel = async () => {
    try {
      if (data.orderStatus === order.SHIPPED.name) {
        const resGHN = await cancelGHNOrderAPI(id);
        if (resGHN.error) throw resGHN.error.data;
      }

      const res = await cancelOrderAPI(id);
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
    }
  };

  const [setToDeliveredAPI, { isLoading: deliveredLoading }] =
    useSetOrderToDeliveredMutation();

  const handleChangeStatus = async statusId => {
    try {
      const res = await changeOrderStatusAPI({ id, statusId });
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetToDelivered = async statusId => {
    try {
      const res = await setToDeliveredAPI(id);
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
          isLoading={changeLoading || cancelLoading || cancelGHNLoading}
        >
          Hủy đơn hàng
        </Button>
      )}
      {data.orderStatus === order.SHIPPED.name && (
        <Button
          flex='1'
          size={{
            base: 'sm',
            lg: 'md',
          }}
          w='full'
          colorScheme='green'
          onClick={handleSetToDelivered}
          isLoading={deliveredLoading || cancelLoading || cancelGHNLoading}
        >
          Đã nhận hàng
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
            isLoading={changeLoading || cancelLoading}
          >
            Xác nhận đơn hàng
          </Button>
        )}
      {shouldCreateShip.includes(data.orderStatus) && (
        <Button
          flex='2'
          size={{
            base: 'sm',
            lg: 'md',
          }}
          w='full'
          colorScheme='pink'
          onClick={() => handleChangeStatus(order.SHIPPED.id)}
          isLoading={changeLoading || cancelLoading}
        >
          Tạo đơn vận chuyển
        </Button>
      )}
    </ButtonGroup>
  );
};

export default ChangeStatusButton;
