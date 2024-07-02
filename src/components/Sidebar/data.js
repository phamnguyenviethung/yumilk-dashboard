import { FiHome, FiDatabase, FiSettings, FiUser } from 'react-icons/fi';

const data = [
  { name: 'Home', icon: FiHome },
  {
    name: 'Order',
    icon: FiUser,
    subItems: [
      {
        name: 'Order List',
        path: '/manage/order',
        icon: FiDatabase,
      },
      {
        name: 'Stats',
        path: '/manage/order/stats',
        icon: FiDatabase,
      },
    ],
  },
  {
    name: 'Product',
    icon: FiUser,
    subItems: [
      {
        name: 'Product List',
        path: '/manage/product',
        icon: FiDatabase,
      },
      {
        name: 'Attributes',
        path: '/manage/attribute',
        icon: FiDatabase,
      },
      {
        name: 'Categories',
        path: '/manage/category',
        icon: FiDatabase,
      },
      {
        name: 'Statistics',
        path: '/manage/stats',
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
      {
        name: 'Statistics',
        path: '/manage/customer/stats',
        icon: FiDatabase,
      },
    ],
  },
  { name: 'Settings', icon: FiSettings },
];

export default data;
