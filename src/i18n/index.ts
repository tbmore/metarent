/**
 * 国际化 入口
 * 
 */

import { createI18n } from "vue-i18n";
import { getLocale, setLocale, importAllLocales, defaultLang } from "@/utils/i18n";

/**
 * antd 多语言 配置
 */
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
export const antdMessages: { [key: string]: any } = {
    'zh-CN': zhCN,
    'en-US': enUS,
}


/**
 * 框架 多语言 配置
 */
export const messages = importAllLocales();
const sysLocale = getLocale();

const i18n = createI18n({
    legacy: false,
    // locale: antdMessages[sysLocale] ? sysLocale : defaultLang,
    locale: defaultLang,
    messages,
});


/**
 * 设置语言
 * @param locale 
 */
export function setI18nLanguage(locale: string, realReload = false): void {
    setLocale(locale, realReload, function () {
        // i18n.global.locale = locale // legacy: true
        i18n.global.locale.value = locale;
    })
}

// // 扩展通配符替换
// i18n.r = function (...arg) {
//     let text = this.t(arg[0]);
//     for (let item in arg) {
//         if (item != 0) text = text.replace('%@', arg[item]);
//     }
//     return text;
// };

export default i18n;
