import { FiHome, FiDatabase, FiSettings, FiUser } from 'react-icons/fi';

const data = [
  { name: 'Home', icon: FiHome },
  {
    name: 'Users',
    icon: FiUser,
    subItems: [
      {
        name: 'User List',
        path: '/',
        icon: FiDatabase,
      },
    ],
  },

  { name: 'Customers', path: '/manage/customers', icon: FiUser },
  { name: 'Staffs', icon: FiSettings },
  { name: 'Settings', icon: FiSettings },
];

export default data;
