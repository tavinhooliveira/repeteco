import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../pages/Login.vue'
import Classification from '../pages/Classification.vue'
import Profile from '../pages/Profile.vue'
import Share from '../pages/Share.vue'
import Notification from '../pages/Notification.vue'
import NotificationNewMatch from '../pages/NotificationNewMatch.vue'
import NotificationOldMatch from '../pages/NotificationOldMatch.vue'
import Config from '../pages/Config.vue'
import NotFound from '../pages/NotFound.vue'
import ClassificationOn from '../pages/ClassificationOn.vue'
import ClassificationOff from '../pages/ClassificationOff.vue'
import Policies from '../pages/Policies.vue'
import ServiceTerms from '../pages/ServiceTerms.vue'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/classification',
            name: 'Classification',
            component: Classification
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/share',
            name: 'Share',
            component: Share
        },
        {
            path: '/notification',
            name: 'Notification',
            component: Notification
        },
        {
            path: '/notificationNewMatch',
            name: 'NotificationNewMatch',
            component: NotificationNewMatch
        },
        {
            path: '/notificationOldMatch',
            name: 'NotificationOldMatch',
            component: NotificationOldMatch
        },
        {
            path: '/classificationOn',
            name: 'ClassificationOn',
            component: ClassificationOn
        },
        {
            path: '/classificationOff',
            name: 'ClassificationOff',
            component: ClassificationOff
        },
        {
            path: '/config',
            name: 'Config',
            component: Config
        },
        {
            path: '/politicas',
            name: 'Policies',
            component: Policies
        },
        {
            path: '/termos',
            name: 'ServiceTerms',
            component: ServiceTerms
        },
        {
            path: '/notfound',
            name: 'NotFound',
            component: NotFound
        },
        {
            path: '*',
            name: 'NotFound',
            redirect: '/notfound'
        }
    ],
    mode: 'history'

})