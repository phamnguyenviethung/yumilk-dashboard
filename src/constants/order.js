export default {
  COD_PAYMENT: 'COD',
  PAYOS_PAYMENT: 'PAYOS',
  PENDING: {
    id: 1,
    name: 'Pending',
    text: 'Đang chờ thanh toán',
    color: 'blue',
  },
  PROCESSING: {
    id: 2,
    name: 'Processing',
    text: 'Đang xử lý',
    color: 'purple',
  },
  SHIPPING: {
    id: 3,
    name: 'Shipping',
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
  RETURNED: {
    name: 'Returned',
    text: 'Trả hàng',
    color: 'cyan',
  },
};
