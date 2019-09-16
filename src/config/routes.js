import Home from '@comps/home';
import Category from '@conts/category';

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
  }
];

export default routes;