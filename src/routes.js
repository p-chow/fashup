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
import ProductPage from './components/ProductPage.vue'
import WishList from './components/WishList.vue'
import Product from './components/ProductPage.vue'


export default [
    { path: '/', component: Home },
    { path: '/SignUp', component: SignUp },
    { path: '/login', component: Login },
    { path: '/Forget', component: Forget },
    { path: '/Personal', name: 'personal', component: PersonalHome },
    { path: '/change', name:'change', component: Change },
    { path: '/shop', name: 'shop', component: Shop },
    { path: '/news', name:'news' , component: News },
	{ path: '/product', component: ProductPage},
	{ path: '/wishlist', component: WishList},
    { path: '/sell', name:'sell', component: Sell },
    { path: '/product', name: 'product', props: true, component: Product },
    { path: '/wishlist', name:'wishlist', component: WishList }
    //    { path: '/modify', component: Modify, name: 'modify', props: true },
]