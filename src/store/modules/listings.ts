import state from './listings/state'
import getters from './listings/getters'
import mutations from './listings/mutations'
import actions from './listings/actions'

const StoreModel = {
    namespaced: true,
    name: 'listings',
    state,
    getters,
    mutations,
    actions
}
console.log(StoreModel,'md')

export default StoreModel;