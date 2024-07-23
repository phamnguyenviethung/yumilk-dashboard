import {
  useCancelGHNOrderMutation,
  useCancelOrderMutation,
  useChangeOrderStatusMutation,
  useCreateGHNOrderMutation,
  useSetOrderToDeliveredMutation,
} from '@/apis/orderApi';
import order from '@/constants/order';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRef } from 'react';
const shouldCancel = [
  order.PENDING.name,
  order.PROCESSING.name,
  order.SHIPPED.name,
  order.PREORDERED.name,
];
const shouldConfirm = [order.PENDING.name];
const shouldCreateShip = [order.PROCESSING.name, order.PREORDERED.name];

const CancelDialog = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  return (
    <>
      <Button {...props} onClick={onOpen}>
        Hủy đơn hàng
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Huỷ</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Bạn có muốn huỷ đơn hàng này ko</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Quay lại
            </Button>
            <Button
              colorScheme='red'
              ml={3}
              onClick={props.onClick}
              isLoading={props.isLoading}
            >
              Huỷ
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const ChangeStatusButton = ({ data, id }) => {
  const [cancelOrderAPI, { isLoading: cancelLoading }] =
    useCancelOrderMutation();
  const [cancelGHNOrderAPI, { isLoading: cancelGHNLoading }] =
    useCancelGHNOrderMutation();
  const [changeOrderStatusAPI, { isLoading: changeLoading }] =
    useChangeOrderStatusMutation();
  const [createGHNOrderAPI, { isLoading: createGHNLoading }] =
    useCreateGHNOrderMutation();
  const handleCancel = async () => {
    try {
      if (data.orderStatus === order.SHIPPED.name && data?.shippingCode) {
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
  const toast = useToast();
  const handleChangeStatus = async statusId => {
    try {
      const res = await changeOrderStatusAPI({ id, statusId });
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
      toast({
        title: error.message || error.title,
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      });
    }
  };
  const handleSetToDelivered = async () => {
    try {
      const res = await setToDeliveredAPI(id);
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
      toast({
        title: error.message || error.title,
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const handleCreateOrderGHN = async () => {
    try {
      const res = await createGHNOrderAPI(id);
      if (res.error) throw res.error.data;
    } catch (error) {
      console.log(error);
      toast({
        title: error.message || error.title,
        status: 'error',
        duration: 2500,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <VStack w='full'>
      <Box w='full'>
        <HStack w='full'>
          {shouldCancel.includes(data.orderStatus) && (
            <CancelDialog
              flex='1'
              size={{
                base: 'sm',
                lg: 'md',
              }}
              w='full'
              variant='outline'
              colorScheme='red'
              onClick={handleCancel}
              isLoading={
                changeLoading ||
                cancelLoading ||
                createGHNLoading ||
                cancelGHNLoading
              }
            >
              Hủy đơn hàng
            </CancelDialog>
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
                isLoading={changeLoading || cancelLoading || createGHNLoading}
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
              variant='outline'
              colorScheme='green'
              onClick={() => handleChangeStatus(order.SHIPPED.id)}
              isLoading={changeLoading || cancelLoading || createGHNLoading}
            >
              Đóng gói thành công
            </Button>
          )}
        </HStack>
        {shouldCreateShip.includes(data.orderStatus) && (
          <Button
            mt={4}
            flex='3'
            size={{
              base: 'sm',
              lg: 'md',
            }}
            w='full'
            colorScheme='pink'
            onClick={handleCreateOrderGHN}
            isLoading={changeLoading || cancelLoading || createGHNLoading}
          >
            Tạo đơn vận chuyển GHN
          </Button>
        )}
      </Box>
    </VStack>
  );
};

export default ChangeStatusButton;
