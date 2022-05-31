import { ResponseData } from '@/utils/request';
import { queryCurrent, queryMessage } from "@/services";
import { accountLogin, accountReg } from "@/services/user";
import { removeToken, setToken } from "@/utils/localToken";
import { LoginParamsType, RegisterParamsType } from "./user.d"
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
    async login({ commit }, payload: LoginParamsType) {
        let status: string | undefined = undefined;
        try {
            const response: ResponseData = await accountLogin(payload);
            const { data } = response;
            setToken(data.token || '');
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
    async register({ commit }, payload: RegisterParamsType) {
        let msg: string | undefined = undefined;
        try {
            await accountReg(payload);
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
    }
};

export default actions

