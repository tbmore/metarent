const state = {
    changeLogo: 1
};

const getters = {
    // changeLogo: (state) => state.changeLogo

};
const mutations = {
    CHANGE_LOGO(state, val) {
        state.changeLogo = val
    }
};

const actions = {
    changeLogo({ commit }, val) {
        commit("CHANGE_LOGO", val)
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
