import { Home, Login, Cart, Signup, News, Products, Product, Search, Profile, Forget } from '../pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/news', component: News },
    { path: '/product/:id', component: Product },
    { path: '/products/:category', component: Products },
    { path: '/search/:searchValue', component: Search },
    { path: '/forget', component: Forget },
];
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/news', component: News },
    { path: '/product/:id', component: Product },
    { path: '/products/:category', component: Products },
    { path: '/search/:searchValue', component: Search },
    { path: '/profile', component: Profile },
    { path: '/profile/:activeKey', component: Profile },
];

export { publicRoutes, privateRoutes };