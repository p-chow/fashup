// Import the components you want to define routes for.
import Shop from './components/Shop.vue'
import News from './components/News.vue'
//import  from './components/.vue'
import Sell from './components/Sell.vue'
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Forget from './components/Forget.vue'
import PersonalHome from './components/PersonalHome.vue'
import Change from './components/Change.vue'
import WishList from './components/WishList.vue'
import Product from './components/Product.vue'


export default [
    { path: '/', name: 'home', component: Home },
    { path: '/signup', component: SignUp },
    { path: '/login', name: 'login', component: Login },
    { path: '/forget', name: 'forget', component: Forget },
    { path: '/personal', name: 'personal', component: PersonalHome, meta: {requiresAuth: true} },
    { path: '/change', name:'change', component: Change },
    { path: '/shop', name: 'shop', component: Shop },
    { path: '/news', name:'news' , component: News },
	{ path: '/wishlist', component: WishList, meta: {requiresAuth: true}},
    { path: '/sell', name:'sell', component: Sell , meta: {requiresAuth: true}},
    { path: '/product', name: 'product', props: true, component: Product , meta: {requiresAuth: true}},
    //    { path: '/modify', component: Modify, name: 'modify', props: true },
]