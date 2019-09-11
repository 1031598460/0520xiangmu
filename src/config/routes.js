import Home from '../components/home'
import Login from '../components/login'
const  routes=[
    {
        path:'/',
        exact:true,
        component:Login
    },
    {
        path:'/home',
        exact:true,
        component:Home
    },
];

export default routes;