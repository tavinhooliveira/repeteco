import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../pages/Login.vue'
import Classification from '../pages/Classification.vue'
import Profile from '../pages/Profile.vue'
import Share from '../pages/Share.vue'
import Notification from '../pages/Notification.vue'
import Config from '../pages/Config.vue'
import NotFound from '../pages/NotFound.vue'
import ClassificationOn from '../pages/ClassificationOn.vue'
import ClassificationOff from '../pages/ClassificationOff.vue'
import Policies from '../pages/Policies.vue'
import ServiceTerms from '../pages/ServiceTerms.vue'
import Matchs from '../pages/Matchs.vue'
import MatchsNew from '../pages/MatchsNew.vue'
import MatchsOld from '../pages/MatchsOld.vue'

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
            path: '/matchs',
            name: 'Matchs',
            component: Matchs
        },
        {
            path: '/matchsNew',
            name: 'MatchsNew',
            component: MatchsNew
        },
        {
            path: '/matchsOld',
            name: 'MatchsOld',
            component: MatchsOld
        },
        {
            path: '/notification',
            name: 'Notification',
            component: Notification
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
            path: '*',
            name: 'NotFound',
            component: NotFound
        }
    ],
    mode: 'history'

})