import VueRouter from 'vue-router';
import Home from './components/Home';
import Auth from './components/Auth';
import AuthSuccess from './components/AuthSuccess';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import MyVocabs from './components/MyVocabs';

// redirect from accountchooser is losing hash and redirects to the root
// so I check query string if it exists
const checkFromAuth = (to, from, next) => {
    console.log(window.location.search);
    const query = window.location.search.substr(1).split('=');
    if (query[0] === 'mode') {
        next({
            path: '/auth',
            query: { mode: query[1] },
        });
    } else {
        next();
    }
};

const router = new VueRouter({
    mode: 'history', //hash
    routes: [
        { path: '/', component: Home, beforeEnter: checkFromAuth },
        { path: '/auth', component: Auth },
        { path: '/success', component: AuthSuccess },
        { path: '/profile', component: Profile },
        { path: '/editprofile', component: EditProfile },
        { path: '/myvocabs', component: MyVocabs }
    ],
});
router.beforeEach((to, from, next) => {
    // check for auth
    next();
});

export default router;