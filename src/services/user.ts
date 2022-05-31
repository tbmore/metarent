import request from '@/utils/request';
import { LoginParamsType } from '@/store/modules/user/user.d';

export async function accountLogin(params: LoginParamsType): Promise<any> {
    return request({
        url: '/user/login',
        method: 'POST',
        data: params,
    });
}


export interface RegisterParamsType {
    username: string;
    password: string;
    confirm: string;
  }
  

export async function accountReg(params: RegisterParamsType): Promise<any> {
    return request({
        url: '/user/register',
        method: 'POST',
        data: params,
    });
}