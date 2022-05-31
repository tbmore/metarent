const mutations = {
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
    // 
    setRegisterPage(state, payload) {
        state.registerPage = payload;
    },
};

export default mutations
