import { FiHome, FiDatabase, FiSettings, FiUser } from 'react-icons/fi';

const data = [
  { name: 'Home', icon: FiHome },
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

  { name: 'Customers', path: '/', icon: FiUser },
  { name: 'Settings', icon: FiSettings },
];

export default data;
