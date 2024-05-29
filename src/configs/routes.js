import SimpleLayout from '@/components/Layout/SimpleLayout';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home';
import CustomerList from '@/pages/Users/CustomerList';

const p = {
  home: '/',
  login: '/login',
  customerList: '/manage/customers',
};

const publicRoutes = [
  { path: p.home, component: Home },
  { path: p.login, component: Login, layout: SimpleLayout },
  { path: p.customerList, component: CustomerList },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
