import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import Login from '@/pages/Auth/Login';
import CustomerProfile from '@/pages/Customer/CustomerProfile';
import Home from '@/pages/Home';
import AddProduct from '@/pages/Product/AddProduct';
import ProductList from '@/pages/Product/ProductList';
import StaffList from '@/pages/Staff/StaffList';

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
        path: '/manage/staff',
        component: StaffList,
        onlyAdmin: true,
      },
      {
        path: '/customer/:id',
        component: CustomerProfile,
      },
      {
        path: '/manage/product',
        component: ProductList,
      },
      {
        path: '/manage/add-product',
        component: AddProduct,
      },
    ],
  },
  {
    layout: SimpleLayout,
    data: [
      {
        path: '/login',
        component: Login,
      },
    ],
  },
];

export default routes;
