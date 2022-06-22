import { ResponseData } from '@/utils/request';
import { queryListByTypeForLandlord, queryListByTypeForLandlord_post } from "@/services/listings";
import { removeToken, setToken } from "@/utils/localToken";

// 加快速度 不写TS接口类型
// const actions: ActionType = {
const actions = {
    async queryListByTypeForLandlord({ commit }: any, payload: { type: number; }) {
        let status: string | undefined = undefined;
        try {
            const response: ResponseData = await queryListByTypeForLandlord(payload);
            status = 'ok';
            return response
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                status = 'error';
            }
        }

        if (status === 'ok') {
            return true;
        } else if (status === 'error') {
            return false;
        }
        return undefined;
    },
    async queryListByTypeForLandlord_post({ commit }: any, payload: { type: number; }) {
        let status: string | undefined = undefined;
        try {
            const response: ResponseData = await queryListByTypeForLandlord_post(payload);
            status = 'ok';
            return response
        } catch (error: any) {
            if (error.message && error.message === 'CustomError') {
                status = 'error';
            }
        }

        if (status === 'ok') {
            return true;
        } else if (status === 'error') {
            return false;
        }
        return undefined;
    },
};

export default actions

