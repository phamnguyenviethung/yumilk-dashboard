import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home';
import StaffList from '@/pages/Users/StaffList';
import MiniStats from '@/pages/MiniStats';
import OrderTable from '@/pages/OrderTable';
import AboveFooterCard from '@/pages/AboveFooterCard';

const routes = [
  {
    layout: MainLayout,
    data: [
      {
        path: '/',
        isIndex: true,
        component: Home,
      },
      {
        path: '/manage/customers',
        component: StaffList,
      },
      {
        path: '/MiniStats', 
        component: MiniStats, 
      },
      {
        path: '/ordertable', 
        component: OrderTable, 
      },
      {
        path: '/testpage',
        component: AboveFooterCard,
      }
    ],
  },
  {
    layout: SimpleLayout,
    data: [
      {
        path: '/login',
        component: Login,
        allowAnonymous: true,
      },
    ],
  },
];

export default routes;
