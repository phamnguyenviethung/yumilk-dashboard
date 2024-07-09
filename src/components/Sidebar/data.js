import { FiHome, FiDatabase, FiSettings, FiUser } from 'react-icons/fi';

const data = [
  { name: 'Home', icon: FiHome, path: '/' },
  {
    name: 'Order',
    icon: FiUser,
    subItems: [
      {
        name: 'Order List',
        path: '/manage/order',
        icon: FiDatabase,
      },
    ],
  },
  {
    name: 'Product',
    icon: FiUser,
    subItems: [
      {
        name: 'Danh sách',
        path: '/manage/product',
        icon: FiDatabase,
      },
      {
        name: 'Thuộc tính',
        path: '/manage/attribute',
        icon: FiDatabase,
      },
      {
        name: 'Nhãn hàng',
        path: '/manage/brand',
        icon: FiDatabase,
      },
      {
        name: 'Danh mục',
        path: '/manage/category',
        icon: FiDatabase,
      },
    ],
  },
  {
    name: 'Staff',
    icon: FiUser,
    subItems: [
      {
        name: 'Staff List',
        path: '/manage/staff',
        icon: FiDatabase,
      },
    ],
  },

  {
    name: 'Customers',
    path: '/',
    icon: FiUser,
    subItems: [
      {
        name: 'Customer List',
        path: '/manage/customer',
        icon: FiDatabase,
      },
    ],
  },
  { name: 'Settings', icon: FiSettings },
];

export default data;
