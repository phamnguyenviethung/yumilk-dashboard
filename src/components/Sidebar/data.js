import { HiOutlineStar } from 'react-icons/hi';
import {
  TbCategory,
  TbColorSwatch,
  TbDashboard,
  TbDiscount,
  TbFlag,
  TbInfoCircle,
  TbLayoutList,
  TbMilk,
  TbNews,
  TbReceipt,
  TbUser,
  TbUserHeart,
  TbWeight,
} from 'react-icons/tb';

const data = [
  { name: 'Trang chủ', icon: TbDashboard, path: '/' },
  // { name: 'Thống kê', icon: TbChartLine, path: '/stats' },
  {
    name: 'Đơn hàng',
    icon: TbReceipt,
    subItems: [
      {
        name: 'Danh sách',
        path: '/manage/order',
        icon: TbLayoutList,
      },
      {
        name: 'Mã giảm giá',
        path: '/manage/voucher',
        icon: TbDiscount,
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
        name: 'Đánh giá',
        path: '/manage/review',
        icon: HiOutlineStar,
      },
      {
        name: 'Báo cáo',
        path: '/manage/report',
        icon: TbFlag,
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
    forAdmin: true,
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
    name: 'Bài viết',
    icon: TbNews,
    subItems: [
      {
        name: 'Danh sách',
        path: '/manage/post',
        icon: TbLayoutList,
      },
    ],
  },
];

export default data;
