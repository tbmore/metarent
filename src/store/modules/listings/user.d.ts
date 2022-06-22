import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";
export interface CurrentUser {
    id: number;
    name: string;
    avatar: string;
    roles: string[];
}

export interface StateType {
    currentUser: CurrentUser;
    message: number;
    loginStatus?: 'ok' | 'error';
    errorMsg?: string;
    registerPage: "email" | "verify" | "username" | "password";
    retrievePasswordPage: "verify" | "email" | "password";
}

export interface MutationsType {
    saveCurrentUser: Mutation<StateType>;
    saveMessage: Mutation<StateType>;
    changeLoginStatus: Mutation<StateType>;
    changeErrorMsg: Mutation<StateType>;
    setRegisterPage: Mutation<StateType>;
    setRetrievePasswordPage: Mutation<StateType>;
}

export interface ActionType {
    fetchCurrent: Action<StateType, StateType>;
    fetchMessage: Action<StateType, StateType>;
    logout: Action<StateType, StateType>;
    login: Action<StateType, StateType>;
    register: Action<StateType, StateType>;
    setRegisterPage: Action<StateType, StateType>;
    setRetrievePasswordPage: Action<StateType, StateType>;
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: MutationsType;
    actions: ActionType;
}
