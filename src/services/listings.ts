import request, { get, post } from '@/utils/request';
import { LoginParamsType, RegisterParamsType } from '@/store/modules/user/user.d';

/**
 * 获取房源基础信息
 * 
 * 房东根据房源基础信息Type查询下级基础信息数据[床铺、基础设施、房源类型、空间、特色等]
 * @params type 100:便利设施 101:房源空间 102:房源类型 103:房源特色 104:房间和空间 105:人身安全注意事项 106:安全设备 107:房源信息 108:入住须知
 */
export async function queryListByTypeForLandlord(params: { type: number }): Promise<any> {
    return get({
        url: '/house/baseInfo/queryListByTypeForLandlord',
        params,
    });
}
export async function queryListByTypeForLandlord_post(params: { type: number }): Promise<any> {
    return post({
        url: '/house/baseInfo/queryListByTypeForLandlord',
        data:params,
    });
}




















/**
 * 登录
 * @params LoginParamsType
 */
export async function accountLogin(params: LoginParamsType): Promise<any> {
    return request({
        url: '/user/public/login-password',
        method: 'POST',
        data: params,
    });
}

/**
 * 注册
 * @params { "email": "", "evidence": "", "firstName": "", "lastName": "", "nickname": "", "password": "" }
 */
export async function accountReg(params: { "email": string, "evidence": string, "firstName": string, "lastName": string, "nickname"?: string, "password": string }): Promise<any> {
    return request({
        url: '/user/public/register-email',
        method: 'POST',
        data: params,
    });
}
// 检验邮箱是否存在
export async function accountCheckEmail(params: { email: string }): Promise<any> {
    return request({
        url: '/user/public/check-email',
        method: 'POST',
        data: params,
    });
}
// 获取验证码
export async function accountCodeStatus(params: { code: string }): Promise<any> {
    return request({
        url: '/user/public/code-status',
        method: 'GET',
        data: params,
    });
}

// 验证邮箱验证码
export async function accountVerifyToken(params: { "code": string, "email": string, "type": string }): Promise<any> {
    return request({
        url: '/user/public/verify-token',
        method: 'POST',
        data: params,
    });
}

// 忘记密码
export async function accountResetPassword(params: { "email": string, "evidence": string, "password": string }): Promise<any> {
    return request({
        url: '/user/public/reset-password',
        method: 'POST',
        data: params,
    });
}

// 发送验证码邮箱 type 1.登陆 2.注册 3.绑定 4.更换 5.重置密码
export async function accountSendEmail(params: { "email": string, "type": string }): Promise<any> {
    return request({
        url: '/user/public/send-email',
        method: 'POST',
        data: params,
    });
}

