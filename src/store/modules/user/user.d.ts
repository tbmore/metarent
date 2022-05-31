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
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        saveCurrentUser: Mutation<StateType>;
        saveMessage: Mutation<StateType>;
        changeLoginStatus: Mutation<StateType>;
        changeErrorMsg: Mutation<StateType>;
    };
    actions: {
        fetchCurrent: Action<StateType, StateType>;
        fetchMessage: Action<StateType, StateType>;
        logout: Action<StateType, StateType>;
        login: Action<StateType, StateType>;
        register: Action<StateType, StateType>;
    };
}

export interface LoginParamsType {
    email: string;
    password: string;
    username?: string;
    verify?: number[];
}

export interface RegisterParamsType {
    username: string;
    password: string;
    confirm: string;
}
