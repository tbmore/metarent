<template>
  <div class="main w100"
       v-if="!isLoginError">
    <a-form class="clearfix"
            :wrapper-col="{span:24}"
            layout="vertical">
      <a-form-item :label="t('page.user.login.form.email.title')"
                   v-bind="validateInfos.email">
        <a-auto-complete :options="emailOptions"
                         @search="handleSearch"
                         @select="handleSelect">
          <a-input v-model:value="modelRef.email"
                   :placeholder="t('page.user.login.form-item-email')"
                   size="large"
                   class="user_input"
                   @keyup.enter="handleSubmit"
                   @blur="validate('email')"
                   @change="setBtnStatus('email')">
          </a-input>
          <template #option="{ value: val }">
            {{ val.split('@')[0] }} @
            <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
          </template>
        </a-auto-complete>

      </a-form-item>
      <a-form-item :label="t('page.user.login.form.password.title')"
                   v-bind="validateInfos.password">
        <a-input-password v-model:value="modelRef.password"
                          :placeholder="t('page.user.login.form-item-password')"
                          size="large"
                          class="user_input"
                          @keyup.enter="handleSubmit"
                          :maxlength="50"
                          @change="setBtnStatus('password')">
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <div class="text_align_left forgot_password">
          <router-link to="/user/retrievepassword">
            {{t('page.user.login.form.forgotpassword')}}
          </router-link>
        </div>
        <a-button type="primary"
                  class="submit user_input"
                  @click="handleSubmit"
                  :loading="submitLoading"
                  :disabled="btnStatus"
                  size="large">
          {{t('user-layout.menu.login')}}
        </a-button>
      </a-form-item>

    </a-form>
    <a-row class="user_ohter_login"
           align="end"
           justify="middle">
      <a-col>{{t('page.user.login.form.otherlogin')}}</a-col>
      <iconpark-icon class="user_ohter_login_item"
                     name="apple"></iconpark-icon>
      <iconpark-icon class="user_ohter_login_item"
                     name="guge"></iconpark-icon>
      <iconpark-icon class="user_ohter_login_item"
                     name="tuite"></iconpark-icon>
    </a-row>

    <!-- 登录加载中 -->
    <a-row class="user_login_loading w100 h100 flex_dir_c"
           align="center"
           justify="middle"
           v-if="isLogin">
      <a-avatar :src="loginLoading"
                :size="88"
                class="user_login_loading_icon" />
      <a-col>{{t('page.user.login.form.loginloading')}}</a-col>
    </a-row>
  </div>
  <div class="main w100"
       v-else>
    <a-row class="user_login_fail flex_dir_c"
           align="center"
           justify="middle">
      <a-avatar :src="loginFailed"
                :size="127"
                class="user_login_fail_icon" />
      <a-col class="user_login_fail_name">{{'modelRef.email'}}</a-col>
      <a-col>{{t('page.user.login.form.loginfailed')}}</a-col>
      <a-button type="primary"
                class="submit user_input"
                @click="handleSubmit"
                :loading="submitLoading"
                size="large">
        {{t('ok')}}
      </a-button>
    </a-row>
  </div>
</template>
<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  Ref,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import { validateInfos } from "ant-design-vue/lib/form/useForm";
import { Rule } from "ant-design-vue/lib/form";
import { message, Form } from "ant-design-vue";
const useForm = Form.useForm;

import useI18nAntdFormVaildateInfos from "@/composables/useI18nAntdFormVaildateInfos";
import {
  LoginParamsType,
  StateType as UserLoginStateType,
} from "@/store/modules/user/user.d";

import loginLoading from "@/assets/images/user/login_loading.png";
import loginFailed from "@/assets/images/user/login_failed.png";

interface UserLoginSetupData {
  t: (key: string | number) => string;
  validate: (key: string) => void;
  setBtnStatus: (key: string) => void;
  validateInfos: ComputedRef<validateInfos>;
  modelRef: LoginParamsType;
  submitLoading: Ref<boolean>;
  handleSubmit: (e: MouseEvent) => void;
  loginStatus: ComputedRef<"error" | "ok" | undefined>;
  loginLoading: string;
  loginFailed: string;
  btnStatus: Ref<boolean>; // 按钮状态
  isLogin: Ref<boolean>; // 登录中
  isLoginError: Ref<boolean>; // 登录错误
  emailOptions: Ref<{ value: string }[]>;
  handleSearch: (e: string) => void;
  handleSelect: (e: string) => void;
}

export default defineComponent({
  name: "UserLogin",
  components: {},
  setup(): UserLoginSetupData {
    const isLogin = ref<boolean>(false);
    const isLoginError = ref<boolean>(false);
    const btnStatus = ref<boolean>(true);
    const router = useRouter();
    const { currentRoute } = router;
    const store = useStore<{ user: UserLoginStateType }>();
    const { t } = useI18n();

    // 用户名自动填充
    const emailOptions = ref<{ value: string }[]>([]);
    const handleSearch = async (val: string) => {
      let res: { value: string }[];
      if (!val || val.indexOf("@") >= 0) {
        res = [];
      } else {
        res = ["gmail.com", "163.com", "qq.com"].map((domain) => ({
          value: `${val}@${domain}`,
        }));
      }
      emailOptions.value = res;
    };

    const handleSelect = async (val: string) => {
      modelRef.email = val;
      //   validate("email");
    };

    // 表单值
    const modelRef = reactive<LoginParamsType>({
      email: "",
      password: "",
    });

    // 表单验证
    const validateemail = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("page.user.login.form-item-email.required");
      } else {
        const reg = new RegExp(
          /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
        );
        if (!reg.test(value)) {
          return Promise.reject("page.user.login.form-item-email.required");
        }
        return Promise.resolve();
      }
    };
    const validatePassword = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("page.user.login.form-item-password.required");
      } else {
        if (value.length < 8) {
          return Promise.reject("page.user.login.form-item-password.required");
        }
        return Promise.resolve();
      }
    };

    //  表单验证规则
    const rulesRef = reactive({
      email: [
        {
          validator: validateemail, // 自定义校验
          trigger: "blur", // ["blur","change"]
        },
      ],
      password: [
        {
          validator: validatePassword, // 自定义校验
          trigger: "blur",
        },
      ],
    });

    // 获取表单内容
    const { validate, validateInfos } = useForm(modelRef, rulesRef);

    const setBtnStatus = (key: string) => {
      const { email, password } = modelRef;
      if (email.length && password.length) {
        btnStatus.value = false;
      } else {
        btnStatus.value = true;
      }
    };
    // 登录loading
    const submitLoading = ref<boolean>(false);
    // 登录
    const handleSubmit = async (e: MouseEvent) => {
      e.preventDefault();
      const { email, password } = modelRef;
      if (!email.length && !password.length) return;
      submitLoading.value = true;
      try {
        const fieldsValue = await validate<LoginParamsType>();
        isLogin.value = true;
        const res: boolean = await store.dispatch("user/login", fieldsValue);
        if (res === true) {
          message.success(t("page.user.login.form.login-success"));
          const { redirect, ...query } = currentRoute.value.query;
          router.replace({
            path: (redirect as string) || "/",
            query: {
              ...query,
            },
          });
        }
        isLogin.value = false;
      } catch (error) {
        console.log("error", error);
        isLogin.value = false;
      }
      submitLoading.value = false;
    };

    // 登录状态
    const loginStatus = computed<"ok" | "error" | undefined>(
      () => store.state.user.loginStatus
    );

    // 重置 validateInfos
    const validateInfosNew = useI18nAntdFormVaildateInfos(validateInfos);

    return {
      t,
      btnStatus,
      validate,
      setBtnStatus,
      validateInfos: validateInfosNew,
      modelRef,
      submitLoading,
      handleSubmit,
      loginStatus,
      loginLoading,
      loginFailed,
      isLogin,
      isLoginError,
      emailOptions,
      handleSearch,
      handleSelect,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
.main {
  flex: none;
  padding: 0 60px;
  margin: 0 auto;
}
.forgot_password {
  margin: -10px 0 32px;
  a {
    color: $font-color-nomal;
  }
}
.user_ohter_login {
  color: #1d1d1d;
  margin-top: 15px;
  .user_ohter_login_item {
    font-size: 24px;
    margin-left: 12px;
    cursor: pointer;
  }
}
.user_login_loading {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba($color: #dfdfdf, $alpha: 0.8);
  .user_login_loading_icon {
    margin-bottom: 24px;
  }
}
.user_login_fail {
  margin-top: 37px;
  font-size: $font-size-18;
  font-weight: bold;
  line-height: 24px;
  .user_login_fail_name {
    margin: 51px 0 9px;
    font-size: $font-size-22;
    font-weight: 500;
  }
  .submit {
    margin-top: 48px;
  }
}
</style>