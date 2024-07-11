import {
  TbCategory,
  TbColorSwatch,
  TbDashboard,
  TbInfoCircle,
  TbLayoutList,
  TbMilk,
  TbReceipt,
  TbSettings,
  TbUser,
  TbUserHeart,
  TbWeight,
} from 'react-icons/tb';

const data = [
  { name: 'Trang chủ', icon: TbDashboard, path: '/' },
  {
    name: 'Đơn hàng',
    icon: TbReceipt,
    subItems: [
      {
        name: 'Danh sách',
        path: '/manage/order',
        icon: TbLayoutList,
      },
    ],
  },
  {
    name: 'Sản phẩm',
    icon: TbMilk,
    subItems: [
      {
        name: 'Danh sách',
        path: '/manage/product',
        icon: TbLayoutList,
      },
      {
        name: 'Thuộc tính',
        path: '/manage/attribute',
        icon: TbInfoCircle,
      },
      {
        name: 'Nhãn hàng',
        path: '/manage/brand',
        icon: TbColorSwatch,
      },
      {
        name: 'Danh mục',
        path: '/manage/category',
        icon: TbCategory,
      },
      {
        name: 'Đơn vị',
        path: '/manage/unit',
        icon: TbWeight,
      },
    ],
  },
  {
    name: 'Nhân viên',
    icon: TbUser,
    subItems: [
      {
        name: 'Danh sách',
        path: '/manage/staff',
        icon: TbLayoutList,
      },
    ],
  },

  {
    name: 'Khách hàng',
    path: '/',
    icon: TbUserHeart,
    subItems: [
      {
        name: 'Danh sách',
        path: '/manage/customer',
        icon: TbLayoutList,
      },
    ],
  },

  {
    name: 'Posts',
    icon: FiUser,
    subItems: [
      {
        name: 'Post List',
        path: '/manage/post',
        icon: FiDatabase,
      },
    ],
  },


  { name: 'Cài đặt', icon: TbSettings },
];

export default data;
