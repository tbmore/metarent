/**
 * 路由入口
 */
// 路由进度条
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false, easing: 'ease', speed: 1000 }); // NProgress Configuration

import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { RoutesDataItem } from "../utils/router";
import settings from "../config/settings";

import SecurityLayout from '../layouts/SecurityLayout.vue';

/* IndexLayout 自定义布局 */
import IndexLayout from '../layouts/IndexLayout/index.vue';
import IndexLayoutRoutes from './HomeLayoutRoutes';

/* UploadLayout 上传房源布局 */
import UploadLayout from '../layouts/UploadLayout/index.vue';
import UploadLayoutRoutes from './UploadLayoutRoutes';
import BlankLayout from '@/layouts/BlankLayout.vue';

// 用户
import UserLayout from '../layouts/UserLayout/index.vue';
import UserLayoutRoutes from './UserLayoutRoutes';

const { BASE_URL, NODE_ENV } = process.env;

const routes: RoutesDataItem[] = [
    {
        title: 'empty',
        path: '/',
        component: SecurityLayout,
        children: [
            {
                title: 'empty',
                path: '/',
                redirect: settings.homeRouteItem.path,
                component: IndexLayout,
                children: IndexLayoutRoutes
            },
            {
                title: 'empty',
                path: '/uploadListing',
                redirect: '/uploadListing/unfinishedListing',
                component: UploadLayout,
                children: UploadLayoutRoutes
            },
            {
                title: 'empty',
                path: '/refresh',
                component: () => import('@/views/refresh/index.vue'),
            },
        ]
    },
    {
        title: 'empty',
        path: '/empty',
        redirect: '/empty/login',
        component: UserLayout,
        children: UserLayoutRoutes
    },
    {
        // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
        // { path: '/user-:afterUser(.*)', component: UserGeneric },
        // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
        title: 'Not Found',
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue'),
    }
]

const router = createRouter({
    scrollBehavior(/* to, from, savedPosition */) {
        return { top: 0 }
    },
    history: NODE_ENV === 'development' ? createWebHistory(BASE_URL) : createWebHashHistory(BASE_URL),
    // history: createWebHashHistory(BASE_URL),
    routes: routes,
});

router.beforeEach((/* to, from */) => {
    // start progress bar
    NProgress.start();
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});

export default router;
