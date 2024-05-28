import { FiHome, FiTrendingUp, FiSettings } from 'react-icons/fi';
const data = [
  { name: 'Home', icon: FiHome },
  {
    name: 'Products',
    icon: FiTrendingUp,
    subItems: [
      {
        name: 'Product',
        path: '/',
        icon: FiTrendingUp,
      },
      {
        name: 'Attribute',
        path: '/',
        icon: FiTrendingUp,
      },
    ],
  },

  { name: 'Settings', icon: FiSettings },
];

export default data;
