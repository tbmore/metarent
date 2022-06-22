<template>
  <a-row class="set_password flex_dir_c w100 h100"
         align="middle"
         justify="space-between"
         v-if="retrievePasswordPage=='password'">
    <a-form class="clearfix"
            :wrapper-col="{span:24}"
            layout="vertical">
      <a-row class="retrieve_titles w100"
             justify="center">{{t('page.user.retrievepassword.title')}}</a-row>
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
  <a-row class="set_username main flex_dir_c w100 h100"
         align="middle"
         justify="space-between"
         v-if="retrievePasswordPage=='email'">
    <a-form class="clearfix w100"
            :wrapper-col="{span:24}"
            layout="vertical">
      <a-row class="retrieve_titles w100"
             justify="center">{{t('page.user.retrievepassword.title')}}</a-row>
      <a-form-item :label="t('page.user.login.form.email.title')"
                   v-bind="validateInfos.email">
        <a-auto-complete :options="emailOptions"
                         @search="handleSearch"
                         @select="handleSelect">
          <a-input v-model:value="modelRef.email"
                   :placeholder="t('page.user.retrievepassword.email')"
                   size="large"
                   class="user_input"
                   @blur="validate('email')"
                   @keyup.enter="handleSubmit('email',$event)"
                   @change="setBtnStatus('email')">
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
              @click="handleSubmit('email',$event)"
              size="large"
              :disabled="btnEmailStatus">
      {{t('next.step')}}
    </a-button>
  </a-row>
  <a-row class="verify flex_dir_c w100"
         justify="middle"
         v-if="retrievePasswordPage=='verify'">
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
                       :ref="`verify${idx}`"
                       @keydown="verifyKeydown(idx,$event)"
                       @keyup="verifyInput(idx,$event)">
              </a-input>
            </a-form-item>

          </a-col>
        </template>
      </a-row>
    </a-form>
    <a-row class="text_align_left resend_code"
           align="middle">
      <iconpark-icon class="user_ohter_login_item"
                     size="24"
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
              size="large"
              :disabled="btnVerifyStatus">
      {{t('next.step')}}
    </a-button>
  </a-row>
  <div class="back_btn"
       v-if="retrievePasswordPage != 'email'"
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
import { email } from "@/config/data";

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
  isLoginError: Ref<boolean>;
  emailOptions: Ref<{ value: string }[]>;
  handleSearch: (e: string) => void;
  handleSelect: (e: string) => void;
  retrievePasswordPage: ComputedRef<"email" | "verify" | "password">;
  deadline: Ref<number>;
  verifyInput: (e: MouseEvent) => void;
  verifyKeydown: (e: MouseEvent) => void;
  backEvent: () => void;
  btnPasswordStatus: Ref<boolean>;
  btnEmailStatus: Ref<boolean>;
  btnVerifyStatus: Ref<boolean>;
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
  //   setup(): UserLoginSetupData {
  setup() {
    const isLoginError = ref<boolean>(false);

    const btnPasswordStatus = ref<boolean>(true);
    const btnEmailStatus = ref<boolean>(true);
    const btnVerifyStatus = ref<boolean>(true);

    const router = useRouter();
    const { currentRoute, push } = router;
    const store = useStore<{ user: UserLoginStateType }>();
    const { t } = useI18n();
    const deadline = ref<number>(Date.now() + 1000 * 60);
    const verify0: Ref<HTMLInputElement | null> = ref(null); // = ref(null);
    const verify1: Ref<HTMLInputElement | null> = ref(null); // = ref(null);
    const verify2: Ref<HTMLInputElement | null> = ref(null); // = ref(null);
    const verify3: Ref<HTMLInputElement | null> = ref(null); // = ref(null);
    const evidence = ref("");

    // 用户名自动填充
    const emailOptions = ref<{ value: string }[]>([]);
    const handleSearch = async (val: string) => {
      let res: { value: string }[];
      if (!val || val.indexOf("@") >= 0) {
        res = [];
      } else {
        res = email.map((domain) => ({
          value: `${val}@${domain}`,
        }));
      }
      emailOptions.value = res;
    };

    const handleSelect = async (val: string) => {
      modelRef.email = val;
      validate("email").catch((err) => {
        btnEmailStatus.value = err.errorFields.length ? true : false;
      });
      //   validate("username");
    };

    const verifyKeydown = (idx: string | number, event) => {
      const value = event.key,
        keyCode = event.keyCode;
      if (
        !/[0-9]/.test(value) &&
        keyCode != 13 &&
        keyCode != 8 &&
        keyCode != 46
      ) {
        event.preventDefault();
      }
    };

    const verifyInput = (idx: number, event: { key: any }) => {
      const value = event.key;
      if (/[0-9]/.test(value)) {
        // console.log(verify1.value?.[0].value, verify1);
        // verify3.value?.[0].focus()
        const arr = [verify0, verify1, verify2, verify3];
        if (idx < 3) {
          arr[idx + 1].value?.[0].focus();
        }
      }
      btnVerifyStatus.value =
        modelRef.verify?.find((v) => v == "") == undefined ? false : true;
    };
    const backEvent = () => {
      console.log(retrievePasswordPage.value);
      switch (retrievePasswordPage.value) {
        case "email":
          //   store.dispatch("user/setRetrievePasswordPage", "verify");
          break;
        case "password":
          store.dispatch("user/setRetrievePasswordPage", "verify");
          break;
        case "verify":
          store.dispatch("user/setRetrievePasswordPage", "email");
          break;
      }
    };

    // 表单值
    const modelRef = reactive<LoginParamsType>({
      email: "",
      password: "",
      verify: ["", "", "", ""],
    });

    // 表单验证
    const validateEmail = async (_rule: Rule, value: string) => {
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

    const validateVerify = async (_rule: Rule, value: any) => {
      const res: any = await store.dispatch("user/verifyToken", {
        email: modelRef.email,
        code: value.join(""),
        type: "5",
      });
      if (res && res.code == 0) {
        evidence.value = res.data;
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    };
    //  表单验证规则
    const rulesRef = reactive({
      email: [
        {
          validator: validateEmail, // 自定义校验
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
          validator: validateVerify,
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
          validate("email").catch((err) => {
            btnEmailStatus.value = err.errorFields.length ? true : false;
          });
          break;
        case "password":
            console.log(1)
          btnPasswordStatus.value = password.length ? false : true;
          break;
        case "verify":
          btnVerifyStatus.value = verify?.find((item) => !item) ? true : false;
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
      e.preventDefault();
      const { email, password, verify } = modelRef;
      const fieldsValue = await validate(key);
      switch (retrievePasswordPage.value) {
        case "email":
          await store.dispatch("user/sendEmail", {
            email: fieldsValue.email,
            type: "5",
          });
          store.dispatch("user/setRetrievePasswordPage", "verify");
          break;
        case "password":
          submitLoading.value = true;
          const res: any = await store.dispatch("user/resetPassword", {
            email: email,
            evidence: evidence.value,
            password: password,
          });
          console.log(res)
          if (res && res.code == 0) {
            //   const { redirect, ...query } = currentRoute.value.query;
            router.replace({
              path: "/user/login",
              // query: {
              //   ...query,
              // },
            });
          }
          submitLoading.value = false;
          break;
        case "verify":
          if (fieldsValue) {
            store.dispatch("user/setRetrievePasswordPage", "password");
          }
          break;
      }
    };

    // 登录状态
    const loginStatus = computed<"ok" | "error" | undefined>(
      () => store.state.user.loginStatus
    );

    const retrievePasswordPage = computed<"verify" | "email" | "password">(
      () => store.state.user.retrievePasswordPage
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
      isLoginError,
      emailOptions,
      handleSearch,
      handleSelect,
      retrievePasswordPage,
      deadline,
      verifyInput,
      verifyKeydown,
      backEvent,
      btnPasswordStatus,
      btnEmailStatus,
      btnVerifyStatus,
      setBtnStatus,
      validate,
      onFinish,
      verify0,
      verify1,
      verify2,
      verify3,
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
  font-size: 22px;
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
    font-size: 16px;
    color: $font-color-nomal;
    line-height: 1.5;
    margin-top: 6px;
    :deep(.ant-statistic-content) {
      font-size: 16px;
      line-height: 1;
      padding-left: 10px;
      color: $font-color-nomal;
    }
    :deep(.ant-statistic-content-value) {
      font-size: 16px;
    }
    .user_ohter_login_item {
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