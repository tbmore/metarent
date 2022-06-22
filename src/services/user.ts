import request, { get, post } from '@/utils/request';
import { LoginParamsType, RegisterParamsType } from '@/store/modules/user/user.d';

/**
 * 登录
 * @params LoginParamsType
 */
export async function accountLogin(params: LoginParamsType): Promise<any> {
    return post({
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
    return post({
        url: '/user/public/register-email',
        method: 'POST',
        data: params,
    });
}
// 检验邮箱是否存在
export async function accountCheckEmail(params: { email: string }): Promise<any> {
    return post({
        url: '/user/public/check-email',
        method: 'POST',
        data: params,
    });
}
// 获取验证码
export async function accountCodeStatus(params: { code: string }): Promise<any> {
    return post({
        url: '/user/public/code-status',
        method: 'GET',
        data: params,
    });
}

// 验证邮箱验证码
export async function accountVerifyToken(params: { "code": string, "email": string, "type": string }): Promise<any> {
    return post({
        url: '/user/public/verify-token',
        method: 'POST',
        data: params,
    });
}

// 忘记密码
export async function accountResetPassword(params: { "email": string, "evidence": string, "password": string }): Promise<any> {
    return post({
        url: '/user/public/reset-password',
        method: 'POST',
        data: params,
    });
}

// 发送验证码邮箱 type 1.登陆 2.注册 3.绑定 4.更换 5.重置密码
export async function accountSendEmail(params: { "email": string, "type": string }): Promise<any> {
    return post({
        url: '/user/public/send-email',
        method: 'POST',
        data: params,
    });
}

// 获取用户信息
export async function accountUserInfo(): Promise<any> {
    return post({
        url: '/user/private/user-info',
        method: 'POST',
    });
}