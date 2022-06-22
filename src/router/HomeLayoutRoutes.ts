import settings from "@/config/settings";
import { RoutesDataItem } from "@/utils/router";
import BlankLayout from '@/layouts/BlankLayout.vue';

const IndexLayoutRoutes: Array<RoutesDataItem> = [
    {
        icon: 'home',
        title: 'index-layout.menu.home',
        path: '/overview',
        redirect: settings.homeRouteItem.path,
        component: BlankLayout,
        children: [
            {
                ...settings.homeRouteItem
            },

        ],
    },
    {
        title: 'empty',
        path: '/listings',
        redirect: '/listings/index',
        component: BlankLayout,
        children: [
            {
                title: 'empty',
                path: 'index',
                component: () => import('@/views/listings/index.vue'),
            },
            {
                title: 'empty',
                path: 'detailed',
                redirect: '/listings/detailed/listingDetails',
                component: () => import('@/layouts/ListingsDetailedLayout/detailed.vue'),
                children: [
                    {
                        title: 'empty',
                        path: 'listingDetails',
                        component: () => import('@/views/listings/listingDetails.vue'),
                    },
                    {
                        title: 'empty',
                        path: 'pricingAndAvailability',
                        component: () => import('@/views/listings/pricingAndAvailability.vue'),
                    }, {
                        title: 'empty',
                        path: 'policiesAndRules',
                        component: () => import('@/views/listings/policiesAndRules.vue'),
                    }, {
                        title: 'empty',
                        path: 'noticeToTenants',
                        component: () => import('@/views/listings/noticeToTenants.vue'),
                    }, {
                        title: 'empty',
                        path: 'propertyEvaluation',
                        component: () => import('@/views/listings/propertyEvaluation.vue'),
                    }
                ]
            }, {
                title: 'empty',
                path: 'edit',
                redirect: '/listings/edit/editPhoto',
                component: () => import('@/layouts/ListingsDetailedLayout/edit.vue'),
                children: [{
                    title: 'empty',
                    path: 'editPhoto',
                    component: () => import('@/views/listings/edit/editPhoto.vue'),
                }, {
                    title: 'empty',
                    path: 'editAccessibility',
                    component: () => import('@/views/listings/edit/editAccessibility.vue'),
                }, {
                    title: 'empty',
                    path: 'guestEntranceAndParking',
                    component: () => import('@/views/listings/edit/guestEntranceAndParking.vue'),
                }, {
                    title: 'empty',
                    path: 'bedroom',
                    component: () => import('@/views/listings/edit/bedroom.vue'),
                }, {
                    title: 'empty',
                    path: 'adaptiveEquipment',
                    component: () => import('@/views/listings/edit/adaptiveEquipment.vue'),
                },
                // 房屋安全
                {
                    title: 'empty',
                    path: 'guestSafety',
                    component: () => import('@/views/listings/edit/guestSafety.vue'),
                },
                // // 便利设施
                // {
                //     title: 'empty',
                //     path: 'conveniences',
                //     component: () => import('@/views/listings/edit/conveniences.vue'),
                // },
                // // 房间和空间
                // {
                //     title: 'empty',
                //     path: 'roomsAndSpaces',
                //     component: () => import('@/views/listings/edit/roomsAndSpaces.vue'),
                // },
                ]
            }

        ],
    },
    {
        title: 'empty',
        path: '/reservations',
        component: () => import('@/views/reservations/index.vue'),
    },
    {
        title: 'empty',
        path: '/co-hosts',
        component: () => import('@/views/co-hosts/index.vue'),
    },
    {
        title: 'empty',
        path: '/housekeeper',
        component: () => import('@/views/housekeeper/index.vue'),
    },

];

export default IndexLayoutRoutes;