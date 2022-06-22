// 上传房源
import settings from "@/config/settings";
import { RoutesDataItem } from "@/utils/router";
import BlankLayout from '@/layouts/BlankLayout.vue';

const IndexLayoutRoutes: Array<RoutesDataItem> = [
    // 继续上传页面
    {
        title: 'empty',
        path: 'unfinishedListing',
        component: () => import('@/views/listings/uploadlisting/unfinishedListing.vue'),
    },
    // 选择国家
    {
        title: 'empty',
        path: 'chooseCountry',
        component: () => import('@/views/listings/uploadlisting/chooseCountry.vue'),
    },
    // 设置地理位置
    {
        title: 'empty',
        path: 'setLocation',
        component: () => import('@/views/listings/uploadlisting/setLocation.vue'),
    },
    // 房源类型
    {
        title: 'empty',
        path: 'propertyType',
        component: () => import('@/views/listings/uploadlisting/propertyType.vue'),
    },
    // 空间类型
    {
        title: 'empty',
        path: 'housingSpace',
        component: () => import('@/views/listings/uploadlisting/housingSpace.vue'),
    },
    // 房源特色
    {
        title: 'empty',
        path: 'listingFeatures',
        component: () => import('@/views/listings/uploadlisting/listingFeatures.vue'),
    },
    // 可接待人数
    {
        title: 'empty',
        path: 'capacity',
        component: () => import('@/views/listings/uploadlisting/capacity.vue'),
    },
    // 上传照片
    {
        title: 'empty',
        path: 'uploadImage',
        component: () => import('@/views/listings/uploadlisting/uploadImage.vue'),
    },
    // 基本设施
    {
        title: 'empty',
        path: 'infrastructureCondition',
        component: () => import('@/views/listings/uploadlisting/infrastructureCondition.vue'),
    },
    // 房屋描述
    {
        title: 'empty',
        path: 'houseDescription',
        component: () => import('@/views/listings/uploadlisting/houseDescription.vue'),
    },
    // 设置价格
    {
        title: 'empty',
        path: 'basePrice',
        component: () => import('@/views/listings/uploadlisting/basePrice.vue'),
    },
    // 其它要求
    {
        title: 'empty',
        path: 'howToBook',
        component: () => import('@/views/listings/uploadlisting/howToBook.vue'),
    },
    // 重要须知
    {
        title: 'empty',
        path: 'importantNotice',
        component: () => import('@/views/listings/uploadlisting/importantNotice.vue'),
    },
    // 发布预览
    {
        title: 'empty',
        path: 'releasePreview',
        component: () => import('@/views/listings/uploadlisting/releasePreview.vue'),
    },
];

export default IndexLayoutRoutes;