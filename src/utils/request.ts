/**
 * 自定义 request 网络请求工具,基于axios
 */
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { notification } from "ant-design-vue";
import router from '@/router';
import settings from '@/config/settings';
import { getToken, setToken } from '@/utils/localToken';

export interface ResponseData {
    code: number;
    data?: any;
    message?: string;
}

const customCodeMessage: { [key: number]: string } = {
    10002: '当前用户登入信息已失效，请重新登入再操作', // 未登陆
};

const serverCodeMessage: { [key: number]: string } = {
    200: '服务器成功返回请求的数据',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: '服务器发生错误，请检查服务器(Internal Server Error)',
    502: '网关错误(Bad Gateway)',
    503: '服务不可用，服务器暂时过载或维护(Service Unavailable)',
    504: '网关超时(Gateway Timeout)',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
    const { response, _message } = error;
    if (_message === 'CustomError') {
        // 自定义错误
        const { config, data } = response;
        const { url, baseURL } = config;
        const { code, message } = data;
        const reqUrl = url.split("?")[0].replace(baseURL, '');
        const noVerifyBool = settings.ajaxResponseNoVerifyUrl.includes(reqUrl);
        if (!noVerifyBool) {
            notification.error({
                message: `提示`,
                description: customCodeMessage[code] || message || 'Error',
            });
            
            if (code === 10002) {
                router.replace('/user/login');
            }
        }
    } else if (_message === 'CancelToken') {
        // 取消请求 Token
        // eslint-disable-next-line no-console
        console.log(_message);
    } else if (response && response.status) {
        const errorText = serverCodeMessage[response.status] || response.statusText;
        const { status, request } = response;
        notification.error({
            message: `请求错误 ${status}: ${request.responseURL}`,
            description: errorText,
        });
    } else if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }

    return Promise.reject(error);
}

/**
 * 配置request请求时的默认参数
 */
const instance = axios.create({
    baseURL: process.env.VUE_APP_APIHOST, // url = api url + request url
    // withCredentials: true, // 当跨域请求时发送cookie
    timeout: 0, // 请求超时时间,5000(单位毫秒) / 0 不做限制
});

// 全局设置 - post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/**
 * 请求前
 * 请求拦截器
 */
 instance.interceptors.request.use(
    async (config: AxiosRequestConfig & { cType?: boolean }) => {

        config.headers!['Content-Type'] = 'application/json'
        // 如果设置了cType 说明是自定义 添加 Content-Type类型 为自定义post 做铺垫
        // if (config.method=='get') {
        //     config.headers!['Content-Type'] = 'application/x-www-form-urlencoded';
        // }
        console.log(config)
        // 自定义添加token header
        // const headerToken = await getToken();
        // if (headerToken) {
        //     config.headers![settings.ajaxHeadersTokenKey] = headerToken;
        // }

        return config;
    },
    /* error=> {} */ // 已在 export default catch
);

/**
 * 请求后
 * 响应拦截器
 */
 instance.interceptors.response.use(
    async (response: AxiosResponse) => {
        const res: ResponseData = response.data;
        const { code } = res;

        // 自定义状态码验证
        if (code !== 0) {
            return Promise.reject({
                response,
                _message: 'CustomError',
            });
        }

        // 重置刷新token
        // instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        const url = response.config.url
        if (url == '/user/public/register-email' || url == '/user/public/login-password') {
            instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.data}`;
            instance.defaults.headers.common['Accept-Language'] = `en_US`; // 系统返回语言 暂用
            await setToken(`Bearer ${response.data.data}`);
        }

        return response;
    },
    /* error => {} */ // 已在 export default catch
);

export async function get(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
    return instance({
        url: config.url,
        method: 'GET',
        params:config.params,
    });
}

export async function post(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
    return instance({
        url: config.url,
        method: 'POST',
        data: config.data,
    });
}

// export async function put(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
//     return instance({
//         url: `/pages/list/${0}`,
//         method: 'PUT',
//         data: params,
//     });
// }

// export async function Delete(config: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
//     return instance({
//         url: `/pages/list/${id}`,
//         method: 'delete',
//     });
// }
const request = async function (config: AxiosRequestConfig): Promise<AxiosResponse<any, any>> {
    try {
        const response = await instance(config);
        return response.data;
    } catch (error) {
        return await errorHandler(error);
    }
}

export default request;

// export default function (config: AxiosRequestConfig): AxiosPromise<any> {
//     return instance(config).then((response: AxiosResponse) => response.data).catch(error => errorHandler(error));
// }
