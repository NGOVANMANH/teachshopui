import { Home, Login, Cart, Signup, News, Products, ProductDetails, SearchResults } from '../pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/news', component: News },
    { path: '/productDetails', component: ProductDetails },
    { path: '/products', component: Products },
    { path: '/search', component: SearchResults },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };