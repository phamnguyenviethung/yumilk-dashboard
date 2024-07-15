export default {
  COD_PAYMENT: 'COD',
  PAYOS_PAYMENT: 'PAYOS',
  PENDING: {
    id: 1,
    name: 'Pending',
    text: 'Đang chờ xác nhận',
    color: 'blue',
  },
  PROCESSING: {
    id: 2,
    name: 'Processing',
    text: 'Đang đóng gói',
    color: 'purple',
  },
  SHIPPED: {
    id: 3,
    name: 'Shipped',
    text: 'Đang trên đường vận chuyển',
    color: 'yellow',
  },
  DELIVERED: {
    id: 4,
    name: 'Delivered',
    text: 'Thành công',
    color: 'green',
  },
  CANCELLED: {
    id: 5,
    name: 'Cancelled',
    text: 'Đã huỷ',
    color: 'red',
  },
  PREORDERED: {
    id: 6,
    name: 'Preordered',
    text: 'Đặt trước',
    color: 'cyan',
  },
};
