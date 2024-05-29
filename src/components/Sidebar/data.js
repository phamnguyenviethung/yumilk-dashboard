import { FiHome, FiTrendingUp, FiSettings } from 'react-icons/fi';
const data = [
  { name: 'Home', icon: FiHome },
  {
    name: 'Users',
    icon: FiTrendingUp,
    subItems: [
      {
        name: 'User List',
        path: '/',
        icon: FiTrendingUp,
      },
    ],
  },

  { name: 'Customers', path: '/manage/customers', icon: FiSettings },
  { name: 'Staffs', icon: FiSettings },
  { name: 'Settings', icon: FiSettings },
];

export default data;
