import { Home, Login, Cart, Signup, News, Products, ProductDetails, Search } from '../pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/news', component: News },
    { path: '/productDetails', component: ProductDetails },
    { path: '/products/:category', component: Products },
    { path: '/search/:searchValue', component: Search },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };