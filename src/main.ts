import { createApp } from "vue";
import App from "./App.vue";

import '@/assets/css/index.less'; // 重置 Antd 样式
import '@/assets/font/index.css'; // 自定义字体库
import '@/assets/css/global.scss'; // 全局样式

// 引入 Antd 
import Antd from 'ant-design-vue';
import router from '@/router';
import store from '@/store';
import i18n from '@/i18n';

const app = createApp(App)
app.use(Antd);
app.use(router);
app.use(store);
app.use(i18n);

app.mount('#app');
