import Home from '@comps/home';
import Category from '@conts/category';
import Product from '@conts/product';
import SaveUpdate from '@conts/product/save-update';

const routes = [
  {
    path: '/', // 路由路径
    exact: true, // 是否严格匹配路由路径
    component: Home // 组件
  },
  {
    path: '/category',
    exact: true,
    component: Category
  },
  {
    path: '/product',
    exact: true,
    component: Product
  },
  {
    path: '/product/saveupdate',
    exact: true,
    component: SaveUpdate
  }
];

export default routes;