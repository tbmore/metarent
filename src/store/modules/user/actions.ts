import { ResponseData } from '@/utils/request';
import { queryCurrent, queryMessage } from "@/services";
import { accountLogin, accountReg, accountCheckEmail, accountCodeStatus, accountVerifyToken, accountResetPassword, accountSendEmail, accountUserInfo } from "@/services/user";
import { removeToken, setToken } from "@/utils/localToken";
import { LoginParamsType, RegisterParamsType, StateType, ActionType } from "./user.d"
// 加快速度 不写TS接口类型
// const actions: ActionType = {
const actions = {
    async fetchCurrent({ commit }) {
        try {
            const response: ResponseData = await queryCurrent();
            const { data } = response;
            commit('saveCurrentUser', data || {});
            return true;
        } catch (error) {
            return false;
        }
    },
    async fetchMessage({ commit }) {
        try {
            const response: ResponseData = await queryMessage();
            const { data } = response;
            commit('saveMessage', data || 0);
            return true;
        } catch (error) {
            return false;
        }
    },
    async logout({ commit, state }) {
        try {
            await removeToken();
            commit('saveCurrentUser', { ...state.currentUser });
            return true;
        } catch (error) {
            return false;
        }
    },
    // 登录
    async login({ commit }, payload: LoginParamsType) {
        let status: string | undefined = undefined;
        try {
            const response: ResponseData = await accountLogin(payload);
            status = 'ok';
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                status = 'error';
            }
        }

        commit('changeLoginStatus', status);

        if (status === 'ok') {
            return true;
        } else if (status === 'error') {
            return false;
        }
        return undefined;
    },
    // 注册
    async register({ commit }, payload: { email: string; evidence: string; firstName: string; lastName: string; nickname?: string; password: string; }) {
        let status: string | undefined = undefined;
        try {
            const response: ResponseData = await accountLogin(payload);
            status = 'ok';
            return response
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                status = 'error';
            }
        }

        commit('changeLoginStatus', status);

        if (status === 'ok') {
            return true;
        } else if (status === 'error') {
            return false;
        }
        return undefined;
    },
    // 邮箱验证
    async checkEmail({ commit }, payload: { email: string }) {
        let msg: string | undefined = undefined;
        try {
            const res = await accountCheckEmail(payload);
            return res
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                const { response } = error;
                const { data } = response;
                msg = data.msg || 'error';
            }
        }

        commit('changeErrorMsg', msg);

        if (msg === '') {
            return true; // 成功
        } else if (typeof msg === 'undefined') {
            return undefined; // 服务器错误
        } else {
            return false; // 自定义错误
        }
    },
    // 获取验证码
    async codeStatus({ commit }, payload: { code: string; }) {
        let msg: string | undefined = undefined;
        try {
            await accountCodeStatus(payload);
            console.log(7777)
            msg = '';
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                const { response } = error;
                const { data } = response;
                msg = data.msg || 'error';
            }
        }

        commit('changeErrorMsg', msg);

        if (msg === '') {
            return true; // 成功
        } else if (typeof msg === 'undefined') {
            return undefined; // 服务器错误
        } else {
            return false; // 自定义错误
        }
    },
    // 验证邮箱验证码
    async verifyToken({ commit }, payload: { code: string; email: string; type: string; }) {
        let msg: string | undefined = undefined;
        try {
            msg = await accountVerifyToken(payload);
            return msg
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                const { response } = error;
                const { data } = response;
                msg = data.msg || 'error';
            }
        }
        console.log('verifyToken', msg)
        if (msg === '') {
            return true; // 成功
        } else if (typeof msg === 'undefined') {
            return undefined; // 服务器错误
        } else {
            return false; // 自定义错误
        }
    },
    // 重置密码
    async resetPassword({ commit }: any, payload: { email: string; evidence: string; password: string; }) {
        let msg: string | undefined = undefined;
        try {
            msg = await accountResetPassword(payload);
            return msg
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                const { response } = error;
                const { data } = response;
                msg = data.msg || 'error';
            }
        }

        commit('changeErrorMsg', msg);

        if (msg === '') {
            return true; // 成功
        } else if (typeof msg === 'undefined') {
            return undefined; // 服务器错误
        } else {
            return false; // 自定义错误
        }
    },

    // 发送邮箱
    async sendEmail({ commit }: any, payload: { email: string; type: string; }) {
        let msg: string | undefined = undefined;
        try {
            await accountSendEmail(payload);
            msg = '';
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                const { response } = error;
                const { data } = response;
                msg = data.msg || 'error';
            }
        }

        if (msg === '') {
            return true; // 成功
        } else if (typeof msg === 'undefined') {
            return undefined; // 服务器错误
        } else {
            return false; // 自定义错误
        }
    },

    // 发送邮箱
    async getUserInfo({ commit }: any) {
        let msg: string | undefined = undefined;
        try {
            await accountUserInfo();
            msg = '';
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                const { response } = error;
                const { data } = response;
                msg = data.msg || 'error';
            }
        }

        if (msg === '') {
            return true; // 成功
        } else if (typeof msg === 'undefined') {
            return undefined; // 服务器错误
        } else {
            return false; // 自定义错误
        }
    },

    // 注册页面当前显示内容
    async setRegisterPage({ commit }, payload: StateType) {
        commit('setRegisterPage', payload);
    },
    // 忘记页面当前显示内容
    async setRetrievePasswordPage({ commit }, payload: StateType) {
        commit('setRetrievePasswordPage', payload);

    },
};

export default actions

