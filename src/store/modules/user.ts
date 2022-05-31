
import { ResponseData } from '@/utils/request';
import { queryCurrent, queryMessage } from "@/services";
import { accountLogin, accountReg } from "@/services/user";
import { removeToken, setToken } from "@/utils/localToken";
import { StateType, ModuleType } from "./user/user.d"
import state from './user/state'
import getters from './user/getters'
import mutations from './user/mutations'
import actions from './user/actions'

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'user',
    state,
    getters,
    mutations,
    actions
}

export default StoreModel;