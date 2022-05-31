import { StateType, ModuleType, MutationsType } from "./user.d"
const mutations: MutationsType = {
    saveCurrentUser(state, payload) {
        state.currentUser = {
            ...state.currentUser,
            ...payload,
        }
    },
    saveMessage(state, payload) {
        state.message = payload;
    },
    changeLoginStatus(state, payload) {
        state.loginStatus = payload;
    },
    changeErrorMsg(state, payload) {
        state.errorMsg = payload;
    },
    // 注册页面当前显示内容
    setRegisterPage(state, payload) {
        state.registerPage = payload;
    },
    // 忘记页面当前显示内容
    setRetrievePasswordPage(state, payload) {
        state.retrievePasswordPage = payload;
    },
};

export default mutations
