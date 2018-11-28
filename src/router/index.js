import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import LandingPagePromoter from '@/components/LandingPagePromoter'
import ViewEmployee from '@/components/ViewEmployee'
import NewEmployee from '@/components/NewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import RegisterStaff from '@/components/RegisterStaff'
import RegisterPatient from '@/components/RegisterPatient'
import firebase from 'firebase'
import VueI18n from 'vue-i18n'
import VTooltip from 'v-tooltip'


Vue.use(VTooltip)
Vue.use(Router)
Vue.use(VueI18n)


let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/landingPagePromoter',
      name: 'landingP',
      component: LandingPagePromoter,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/registerPatient',
      name: 'registerPatient',
      component: RegisterPatient,
    },
    {
      path: '/registerStaff',
      name: 'registerStaff',
      component: RegisterStaff,
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta:{
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from , next) => {
    // Check for the required Auth Guards
    if(to.matched.some(record => record.meta.requiresAuth)){
      // Check if Not Logged in
      if(!firebase.auth().currentUser){
        // Go to Login
        next({
          path: '/login',
          query:{
            redirect: to.fullPath
          }
        });
      } else{
        // Proceed to route
        next();
      }
    } else if(to.matched.some(record => record.meta.requiresGuest)){
      // Check if Logged in
      if(firebase.auth().currentUser){
        // Go to Login
        next({
          path: '/landingPagePromoter',
          query:{
            redirect: to.fullPath
          }
        });
      } else{
        // Proceed to route
        next();
      }
    } else {
      // Proceed to next
      next();
    }
});

export default router;


// Nav Guards
