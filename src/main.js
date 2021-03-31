import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import { fbase } from './firebase.js'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueRouter)

const myRouter = new VueRouter({
    routes: Routes,
    mode: "history",
});
myRouter.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = fbase.currentUser;
    console.log("isauthenticated", isAuthenticated);
    if (requiresAuth && !isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  });

  let app;
  fbase.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            render: h => h(App),
            router: myRouter,
        }).$mount('#app')
    }
  })

 

