import { StateType } from "./user.d"
const state: StateType = {
    currentUser: {
        id: 0,
        name: '',
        avatar: '',
        roles: [],
    },
    message: 0,
    loginStatus: undefined,
    errorMsg: undefined,
    registerPage:'email', // 注册页面当前显示内容
    retrievePasswordPage:'email', // 忘记页面当前显示内容
};

export default state
