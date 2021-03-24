// Import the components you want to define routes for.
import Shop from './components/Shop.vue'
import News from './components/News.vue'
//import  from './components/.vue'
//import  from './components/.vue'
import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Forget from './components/Forget.vue'
import PersonalHome from './components/PersonalHome.vue'
import Change from './components/Change.vue'
import WishList from './components/WishList.vue'


export default [
	{ path: '/', component: Home },
	{ path: '/SignUp', component: SignUp},
	{ path: '/login', component: Login},
	{ path: '/Forget', component: Forget},
	{ path: '/Personal', name: 'personal', component: PersonalHome},
	{ path: '/change', component: Change},
    { path: '/shop', component: Shop },
    { path: '/news', component: News },
	{ path: '/wishlist', component: WishList}
    //    { path: '/modify', component: Modify, name: 'modify', props: true },
]