import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home';
import StaffList from '@/pages/Users/StaffList';

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
        onlyAdmin: true,
      },
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
