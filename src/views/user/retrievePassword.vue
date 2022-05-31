<template>
  <a-row class="set_password flex_dir_c w100 h100"
         align="middle"
         justify="space-between"
         v-if="currentStatus=='password'">
    <a-form class="clearfix"
            :wrapper-col="{span:24}"
            layout="vertical">
      <a-row class="retrieve_titles w100"
             justify="center">{{'retrieve password'}}</a-row>
      <a-form-item :label="t('page.user.login.form.password.title')"
                   v-bind="validateInfos.password">
        <a-input-password v-model:value="modelRef.password"
                          :placeholder="t('page.user.login.form-item-password')"
                          size="large"
                          class="user_input"
                          @blur="validate('password')"
                          @keyup.enter="handleSubmit('password',$event)"
                          @change="setBtnStatus('password')">
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <div class="set_username_tips">
          {{t('page.user.retrievepassword.password.tips')}}
        </div>
      </a-form-item>
    </a-form>
    <a-button type="primary"
              class="submit user_input"
              @click="handleSubmit('password',$event)"
              :loading="submitLoading"
              size="large"
              :disabled="btnPasswordStatus">
      {{t('next.step')}}
    </a-button>
  </a-row>
  <a-row class="main set_username flex_dir_c w100 h100"
         align="middle"
         justify="space-between"
         v-if="currentStatus=='username'">
    <a-form class="clearfix w100"
            :wrapper-col="{span:24}"
            layout="vertical">
      <a-row class="retrieve_titles w100"
             justify="center">{{'retrieve password'}}</a-row>
      <a-form-item :label="t('page.user.login.form.username.title')"
                   v-bind="validateInfos.username">
        <a-auto-complete :options="usernameoptions"
                         @search="handleSearch"
                         @select="handleSelect">
          <a-input v-model:value="modelRef.username"
                   :placeholder="t('page.user.login.form-item-username')"
                   size="large"
                   class="user_input"
                   @blur="validate('username')"
                   @keyup.enter="handleSubmit('username',$event)"
                   @change="setBtnStatus('username')">
          </a-input>
          <template #option="{ value: val }">
            {{ val.split('@')[0] }} @
            <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
          </template>
        </a-auto-complete>

      </a-form-item>
    </a-form>
    <a-button type="primary"
              class="submit user_input"
              @click="handleSubmit('username',$event)"
              :loading="submitLoading"
              size="large"
              :disabled="btnUsernameStatus">
      {{t('next.step')}}
    </a-button>
  </a-row>
  <a-row class="verify flex_dir_c w100"
         justify="middle"
         v-if="currentStatus=='verify'">
    <a-col class="verify_tips">We have sent a verification code to your email address <span>{{modelRef.username}}</span>, please check and enter the verification code in the input box below.</a-col>
    <a-col class="verify_code">Code</a-col>
    <a-form class="clearfix verify_form w100"
            :wrapper-col="{span:24}"
            layout="vertical">
      <a-row justify="space-between"
             align="middle">
        <template v-for="(i,idx) in 4"
                  :key="i">
          <a-col>
            <a-form-item v-bind="validateInfos.verify">
              <a-input v-model:value="modelRef.verify[idx]"
                       size="large"
                       class="user_input"
                       :maxlength="1"
                       min="0"
                       max="9"
                       :ref="`verify${i}`"
                       @keydown="verifyKeydown"
                       @keyup="verifyInput">
              </a-input>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
    <a-row class="text_align_left resend_code"
           align="middle">
      <iconpark-icon class="user_ohter_login_item"
                     name="check-one-5ceo7la5"></iconpark-icon>Resend Code
      <a-statistic-countdown :value="deadline"
                             format="s"
                             @finish="onFinish">
        <template #suffix>
          <span>S</span>
        </template>
      </a-statistic-countdown>
    </a-row>
    <a-button type="primary"
              class="submit user_input"
              @click="handleSubmit('verify',$event)"
              :loading="submitLoading"
              size="large"
              :disabled="btnverifyStatus">
      {{t('next.step')}}
    </a-button>
  </a-row>
  <div class="back_btn"
       v-if="currentStatus != 'email'"
       @click="backEvent"></div>
</template>
<script lang="ts">
import {
  computed,
  ComputedRef,
  defineComponent,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import { Props, validateInfos } from "ant-design-vue/lib/form/useForm";
import { Rule } from "ant-design-vue/lib/form";
import { message, Form } from "ant-design-vue";
const useForm = Form.useForm;

import { UserOutlined, UnlockOutlined } from "@ant-design/icons-vue";
import useI18nAntdFormVaildateInfos from "@/composables/useI18nAntdFormVaildateInfos";
import {
  LoginParamsType,
  StateType as UserLoginStateType,
} from "@/store/modules/user/user.d";

import ALink from "@/components/ALink/index.vue";

import loginLoading from "@/assets/images/user/login_loading.png";
import loginFailed from "@/assets/images/user/login_failed.png";

interface UserLoginSetupData {
  t: (key: string | number) => string;
  resetFields: (newValues?: Props) => void;
  validateInfos: ComputedRef<validateInfos>;
  modelRef: LoginParamsType;
  submitLoading: Ref<boolean>;
  handleSubmit: (key: string, e: MouseEvent) => void;
  loginStatus: ComputedRef<"error" | "ok" | undefined>;
  loginLoading: string;
  loginFailed: string;
  isLogin: Ref<boolean>;
  isLoginError: Ref<boolean>;
  usernameoptions: Ref<{ value: string }[]>;
  handleSearch: (e: string) => void;
  handleSelect: (e: string) => void;
  currentStatus: ComputedRef<"email" | "verify" | "username" | "password">;
  deadline: Ref<number>;
  verifyInput: (e: MouseEvent) => void;
  verifyKeydown: (e: MouseEvent) => void;
  backEvent: () => void;
  btnPasswordStatus: Ref<boolean>;
  btnUsernameStatus: Ref<boolean>;
  btnverifyStatus: Ref<boolean>;
  setBtnStatus: (key: string) => void;
  validate: (key: string) => void;
  onFinish: () => void;
}

export default defineComponent({
  name: "UserLogin",
  components: {
    UserOutlined,
    UnlockOutlined,
    ALink,
  },
  setup(): UserLoginSetupData {
    const isLogin = ref<boolean>(false);
    const isLoginError = ref<boolean>(false);

    const btnPasswordStatus = ref<boolean>(true);
    const btnUsernameStatus = ref<boolean>(true);
    const btnverifyStatus = ref<boolean>(true);

    const router = useRouter();
    const { currentRoute, push } = router;
    const store = useStore<{ user: UserLoginStateType }>();
    const { t } = useI18n();
    const deadline = ref<number>(Date.now() + 1000 * 60);

    // 用户名自动填充
    const usernameoptions = ref<{ value: string }[]>([]);
    const handleSearch = async (val: string) => {
      console.log(usernameoptions.value, val, "====");
      let res: { value: string }[];
      if (!val || val.indexOf("@") >= 0) {
        res = [];
      } else {
        res = ["gmail.com", "163.com", "qq.com"].map((domain) => ({
          value: `${val}@${domain}`,
        }));
      }
      usernameoptions.value = res;
    };

    const handleSelect = async (val: string) => {
      modelRef.username = val;
      //   validate("username");
    };

    const verifyKeydown = (event) => {
      //   console.log(event, "====");
      //   const value = event.key
      //   console.log(value)
      //   if(!/[0-9]/.test(value)){
      //     //   event.stopPropagation()
      //     //   event.preventDefault()
      //   }
    };
    const backEvent = () => {
      console.log(currentStatus.value);
      switch (currentStatus.value) {
        case "username":
          store.dispatch("user/currentStatus", "verify");
          break;
        case "password":
          push({ path: "/user/login" }); //push({ path: "./login" });
          store.dispatch("user/currentStatus", "username");
          break;
        case "verify":
          store.dispatch("user/currentStatus", "email");
          break;
      }
    };
    const verifyInput = (event) => {
      console.log(event);
      console.log(modelRef.verify, "verify");
    };

    // 表单值
    const modelRef = reactive<LoginParamsType>({
      email: "",
      password: "",
      verify: [],
    });

    // 表单验证
    const validateUsername = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("page.user.login.form-item-username.required");
      } else {
        const reg = new RegExp(
          /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
        );
        console.log(value, reg.test(value));
        if (!reg.test(value)) {
          return Promise.reject("page.user.login.form-item-username.required");
        }
        console.log(123);
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
      username: [
        {
          validator: validateUsername, // 自定义校验
          trigger: "blur",
        },
      ],
      password: [
        {
          validator: validatePassword, // 自定义校验
          trigger: "blur",
        },
      ],
      verify: [
        {
          message: "",
          trigger: "blur",
        },
      ],
    });

    // 获取表单内容
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    const setBtnStatus = (key: string) => {
      const { email, password, verify } = modelRef;
      switch (key as any) {
        case "email":
          btnUsernameStatus.value = email.length ? false : true;
          break;
        case "password":
          btnPasswordStatus.value = password.length ? false : true;
          break;
        case "verify":
          btnverifyStatus.value = verify?.find((item) => !item) ? false : true;
          break;
      }
    };
    const onFinish = () => {
      console.log("onFinish");
    };
    // 登录loading
    const submitLoading = ref<boolean>(false);
    // 登录
    const handleSubmit = async (key: string, e: MouseEvent) => {
      console.log(key, e, 99);
      e.preventDefault();
      switch (currentStatus.value) {
        case "username":
          store.dispatch("user/currentStatus", "verify");
          break;
        case "password":
          push({ path: "/user/login" }); //push({ path: "./login" });
          store.dispatch("user/currentStatus", "username");
          break;
        case "verify":
          store.dispatch("user/currentStatus", "email");
          break;
      }

      submitLoading.value = true;
      return;
      try {
        const fieldsValue = await validate<LoginParamsType>();
        isLogin.value = true;
        console.log(fieldsValue);
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

    const currentStatus = computed<"verify" | "username" | "password">(
      () => "verify" || store.state.user.loginStatus
    );

    // 重置 validateInfos
    const validateInfosNew = useI18nAntdFormVaildateInfos(validateInfos);

    return {
      t,
      resetFields,
      validateInfos: validateInfosNew,
      modelRef,
      submitLoading,
      handleSubmit,
      loginStatus,
      loginLoading,
      loginFailed,
      isLogin,
      isLoginError,
      usernameoptions,
      handleSearch,
      handleSelect,
      currentStatus,
      deadline,
      verifyInput,
      verifyKeydown,
      backEvent,
      btnPasswordStatus,
      btnUsernameStatus,
      btnverifyStatus,
      setBtnStatus,
      validate,
      onFinish,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
.main {
  flex: none;
  padding: 0px 50px 52px;
  margin: 0 auto;
}
.submit {
  margin-top: 36px;
}
.retrieve_titles {
  line-height: 24px;
  font-weight: bold;
  font-size: $font-size-22;
}
.verify {
  margin-top: 3px;
  position: relative;
  text-align: center;
  .verify_tips {
    text-align: left;
    padding: 0 62px 0 83px;
    font-size: 18px;
    line-height: 24px;
    span {
      font-weight: bold;
    }
  }
  .verify_code {
    margin: 14px 0 26px;
    font-size: 22px;
    font-weight: bold;
  }
  .verify_form {
    box-sizing: border-box;
    padding: 0 192px;
    .user_input {
      text-align: center;
      width: 60px;
      height: 94px;
      border-radius: 12px;
      padding: 0;
      font-size: 26px;
      font-weight: 500;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
    :deep(.ant-form-item-with-help .ant-form-item-explain) {
      z-index: -1;
    }
  }
  .resend_code {
    font-size: $font-size-16;
    color: $font-color-nomal;
    line-height: 1.5;
    margin-top: 6px;
    :deep(.ant-statistic-content) {
      font-size: $font-size-16;
      line-height: 1;
      padding-left: 10px;
      color: $font-color-nomal;
    }
    :deep(.ant-statistic-content-value) {
      font-size: $font-size-16;
    }
    .user_ohter_login_item {
      font-size: 24px;
      margin-left: 12px;
      margin-right: 5px;
    }
  }
}
.set_username {
  padding: 0px 60px 52px;
  .retrieve_titles {
    margin-bottom: 56px;
  }
  .set_username_input {
    margin-bottom: 104px;
    :deep(.ant-form-item-control-input-content) {
      display: flex;
    }
    input:first-child {
      width: 194px;
      margin-right: 18px;
      flex-shrink: 0;
    }
  }
}
.set_password {
  padding: 0 60px 52px;
  .retrieve_titles {
    margin-bottom: 36px;
  }
  .set_username_tips {
    text-align: left;
  }
}
.back_btn {
  position: absolute;
  left: 0;
  width: 36px;
  height: 41px;
  background: url("~@/assets/images/user/back_btn.png") no-repeat center
    center/cover;
  cursor: pointer;
}
</style>