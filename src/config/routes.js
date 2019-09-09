import Home from '../components/home'
import Login from '../components/login'
const  routes=[
    {
        path:'/',
        exact:true,
        component:Home
    },
    {
        path:'/login',
        exact:true,
        component:Login
    }
];

export default routes;