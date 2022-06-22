/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

declare module '@mapbox/mapbox-gl-language';
declare module 'vue-virtual-scroll-list';
// declare module '@ckeditor/ckeditor5-vue';
// declare module '@ckeditor/ckeditor5-build-decoupled-document';
