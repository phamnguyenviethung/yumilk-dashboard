import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import Login from '@/pages/Auth/Login';
import CustomerProfile from '@/pages/Customer/CustomerProfile';
import CustomerStats from '@/pages/Customer/CustomerStats';
import Home from '@/pages/Home';
import AttributeList from '@/pages/Product/AttributeList';
import CategoryList from '@/pages/Product/CategoryList';
import ProductDetailsEdit from '@/pages/Product/ProductDetailEdit';
import ProductList from '@/pages/Product/ProductList';
import ProductStats from '@/pages/Product/ProductStats';
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
        needLogin: true,
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
        path: '/manage/product/:id',
        component: ProductDetailsEdit,
      },
      {
        path: '/manage/category',
        component: CategoryList,
      },
      {
        path: '/manage/attribute',
        component: AttributeList,
      },
      {
        path: '/manage/stats',
        component: ProductStats,
      },
      {
        path: '/manage/customer/stats',
        component: CustomerStats,
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
