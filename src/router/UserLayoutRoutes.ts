import { RoutesDataItem } from "@/utils/router";

const UserLayoutRoutes: RoutesDataItem[] = [
    {
        // 登录
        title: 'user-layout.menu.login',
        path: 'login',
        component: () => import('@/views/user/login.vue'),
    },
    {
        // 注册
        title: 'user-layout.menu.register',
        path: 'register',
        component: () => import('@/views/user/register.vue'),
    },
    {
        // 扫码登录
        title: 'user-layout.menu.qrcode',
        path: 'qrcode',
        component: () => import('@/views/user/qrcodeLogin.vue'),
    }, {
        // 找回密码
        title: 'user-layout.menu.qrcode',
        path: 'retrievepassword',
        component: () => import('@/views/user/retrievePassword.vue'),
    }
];

export default UserLayoutRoutes;