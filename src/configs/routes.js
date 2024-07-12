import MainLayout from '@/components/Layout/MainLayout';
import SimpleLayout from '@/components/Layout/SimpleLayout';
import Login from '@/pages/Auth/Login';
import CustomerList from '@/pages/Customer/CustomerList';
import CustomerProfile from '@/pages/Customer/CustomerProfile';
import Home from '@/pages/Home';
import OrderDetail from '@/pages/Order/OrderDetail';
import OrderList from '@/pages/Order/OrderList';
import CreatePost from '@/pages/Post/CreatePost';
import PostContentEditor from '@/pages/Post/PostContentEditor';
import PostList from '@/pages/Post/PostList';
import AttributeList from '@/pages/Product/AttributeList';
import BrandList from '@/pages/Product/BrandList';
import CategoryList from '@/pages/Product/CategoryList';
import ProductDetailsEdit from '@/pages/Product/ProductDetailEdit';
import ProductList from '@/pages/Product/ProductList';
import UnitList from '@/pages/Product/UnitList';
import StaffList from '@/pages/Staff/StaffList';
import Stat from '@/pages/Stat';

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
        path: '/stats',
        isIndex: true,
        component: Stat,
      },
      {
        path: '/manage/staff',
        component: StaffList,
        needLogin: true,
      },
      {
        path: 'manage/customer/:id',
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
        path: '/manage/brand',
        component: BrandList,
      },

      {
        path: '/manage/customer',
        component: CustomerList,
      },
      {
        path: '/manage/unit',
        component: UnitList,
      },
      {
        path: '/manage/order',
        component: OrderList,
      },
      {
        path: '/manage/order/:id',
        component: OrderDetail,
      },
      {
        path: '/manage/post',
        component: PostList,
      },
      {
        path: '/manage/post/:id',
        component: PostContentEditor,
      },
      {
        path: '/manage/post/create',
        component: CreatePost,
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
