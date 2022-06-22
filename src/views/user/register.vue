<template>
  <div class="main w100"
       v-if="registerPage=='email'">
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
                   @blur="inputBlur"
                   @keyup.enter="handleSubmit('email',$event)"
                   @change="setBtnStatus('email')">
          </a-input>
          <template #option="{ value: val }">
            {{ val.split('@')[0] }} @
            <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
          </template>
        </a-auto-complete>

      </a-form-item>
      <a-form-item>
        <a-button type="primary"
                  class="submit user_input"
                  @click="handleSubmit('email',$event)"
                  size="large"
                  :disabled="btnEmailStatus">
          {{t('page.user.register.password.btn')}}
        </a-button>
      </a-form-item>
    </a-form>
    <div class="register_tips">
      By registering you agree to our <a-link to="http://www.baidu.com">Terms of Use, Privacy Policy and Cookie Terms of Use</a-link> , and MetaRent may use your contact information (including your email address) for the purposes described in the Privacy Policy.
    </div>
  </div>
  <a-row class="verify flex_dir_c w100"
         justify="middle"
         v-if="registerPage=='verify'">
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
  <a-row class="main set_username flex_dir_c w100 h100"
         align="middle"
         justify="space-between"
         v-if="registerPage=='username'">
    <a-form class="clearfix w100"
            :wrapper-col="{span:24}"
            layout="vertical">
      <a-form-item class="set_username_input"
                   :label="t('page.user.login.form.email.title')"
                   v-bind="validateInfos.username">
        <a-input v-model:value="modelRef.username"
                 :placeholder="t('page.user.register.username.lastname')"
                 size="large"
                 class="user_input"
                 @keyup.enter="handleSubmit('username',$event)"
                 @change="setBtnStatus('username')">
        </a-input>
        <a-input v-model:value="modelRef.firstName"
                 :placeholder="t('page.user.register.username.name')"
                 size="large"
                 class="user_input"
                 @keyup.enter="handleSubmit('username',$event)"
                 @change="setBtnStatus('username')">
        </a-input>
      </a-form-item>
    </a-form>
    <a-button type="primary"
              class="submit user_input"
              @click="handleSubmit('username',$event)"
              size="large"
              :disabled="btnUsernameStatus">
      {{t('page.user.register.username.btn')}}
    </a-button>
  </a-row>
  <a-row class="set_password flex_dir_c w100 h100"
         align="middle"
         justify="space-between"
         v-if="registerPage=='password'">
    <a-form class="clearfix"
            :wrapper-col="{span:24}"
            layout="vertical">
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
              size="large"
              :disabled="btnPasswordStatus">
      {{t('page.user.register.password.btn')}}
    </a-button>
  </a-row>
  <div class="back_btn"
       v-if="registerPage != 'email'"
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
import { email } from "@/config/data";
import { focus } from "@/directives/index";

interface UserLoginSetupData {
  t: (key: string | number) => string;
  resetFields: (newValues?: Props) => void;
  validateInfos: ComputedRef<validateInfos>;
  modelRef: LoginParamsType;
  handleSubmit: (key: string, e: MouseEvent) => void;
  loginStatus: ComputedRef<"error" | "ok" | undefined>;
  emailOptions: Ref<{ value: string }[]>;
  handleSearch: (e: string) => void;
  handleSelect: (e: string) => void;
  registerPage: ComputedRef<"email" | "verify" | "username" | "password">;
  deadline: Ref<number>;
  verifyInput: (e: MouseEvent) => void;
  verifyKeydown: (e: MouseEvent) => void;
  backEvent: () => void;
  btnPasswordStatus: Ref<boolean>;
  btnUsernameStatus: Ref<boolean>;
  btnVerifyStatus: Ref<boolean>;
  setBtnStatus: (key: string) => void;
  validate: (key: string) => void;
  onFinish: () => void;
}

export default defineComponent({
  name: "UserRegister",
  components: {
    UserOutlined,
    UnlockOutlined,
    ALink,
  },
  directives: {
    focus,
  },
  setup() {
    const router = useRouter();
    const { currentRoute, push } = router;
    const store = useStore<{ user: UserLoginStateType }>();
    const { t } = useI18n();
    const deadline = ref<number>(Date.now() + 1000 * 60);

    const btnEmailStatus = ref<boolean>(true);
    const btnPasswordStatus = ref<boolean>(true);
    const btnUsernameStatus = ref<boolean>(true);
    const btnVerifyStatus = ref<boolean>(true);
    // ref({}) as Ref<Map>
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
      console.log(registerPage.value);
      switch (registerPage.value as any) {
        case "email":
        //   store.dispatch("user/setRegisterPage", "email");
          break;
        case "verify":
          store.dispatch("user/setRegisterPage", "email");
          modelRef.email = "";
          break;
        case "username":
          store.dispatch("user/setRegisterPage", "verify");
          break;
        case "password":
          store.dispatch("user/setRegisterPage", "username");
          break;
      }
    };

    // 表单值
    const modelRef = reactive({
      email: "",
      username: "",
      firstName: "",
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
        return Promise.reject("Please input the password");
      } else {
        if (value.length < 8) {
          return Promise.reject("Please input the password");
        }
        return Promise.resolve();
      }
    };

    const validateVerify = async (_rule: Rule, value: any) => {
      const res: any = await store.dispatch("user/verifyToken", {
        email: modelRef.email,
        code: value.join(""),
        type: "2",
      });
      if (res && res.code == 0) {
        evidence.value = res.data;
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    };

    const validateUsername = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("page.user.register.username.name");
      } else {
        return Promise.resolve();
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
      username: [
        {
          validator: validateUsername, // 自定义校验
          trigger: "blur",
        },
      ],
      firstName: [
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
    // 监听按键（输入键）状态
    const setBtnStatus = async (key: string) => {
      const { email, username, firstName, password, verify } = modelRef;
      switch (key as any) {
        case "email":
          validate("email").catch((err) => {
            btnEmailStatus.value = err.errorFields.length ? true : false;
          });
          break;
        case "username":
          btnUsernameStatus.value =
            username.length && firstName.length ? false : true;
          break;
        case "password":
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
    // 登录
    const handleSubmit = async (key: string, e: MouseEvent) => {
      e.preventDefault();
      const { email, username, firstName, password, verify } = modelRef;
      const fieldsValue = await validate(key);
      console.log(key, fieldsValue);
      switch (key as any) {
        case "email":
          const _check = await inputBlur();
          if (_check) {
            const res: any = await store.dispatch("user/sendEmail", {
              email: fieldsValue.email,
              type: "2",
            });
            store.dispatch("user/setRegisterPage", "verify");
          }
          break;
        case "username":
          if (fieldsValue) {
            const res: any = await store.dispatch("user/register", {
              email: email,
              evidence: evidence.value,
              firstName: firstName,
              lastName: username,
              password: password,
            });
            if (res && res.code == 0) {
            //   const { redirect, ...query } = currentRoute.value.query;
              router.replace({
                path: '/overview',
                // query: {
                //   ...query,
                // },
              });
            }
          }
          break;
        case "password":
          if (fieldsValue) {
            store.dispatch("user/setRegisterPage", "username");
          }

          break;
        case "verify":
          if (fieldsValue) {
            store.dispatch("user/setRegisterPage", "password");
          }
          break;
      }
    };

    // 登录状态
    const loginStatus = computed<"ok" | "error" | undefined>(
      () => store.state.user.loginStatus
    );

    const registerPage = computed<"email" | "verify" | "username" | "password">(
      () => store.state.user.registerPage
    );

    // 重置 validateInfos
    const validateInfosNew = useI18nAntdFormVaildateInfos(validateInfos);

    const inputBlur = () => {
      return new Promise((resolve, reject) => {
        validate("email")
          .then(async (fieldsValue) => {
            btnEmailStatus.value = false;
            const res: any = await store.dispatch("user/checkEmail", {
              email: fieldsValue.email,
            });
            if (res) {
              if (res.data == false) {
                resolve(res);
              } else {
                // validate("email")
                // validateField('email','abc')
                console.error("邮箱已存在");
              }
            } else {
              reject();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    };
    return {
      t,
      resetFields,
      validateInfos: validateInfosNew,
      modelRef,
      handleSubmit,
      loginStatus,
      emailOptions,
      handleSearch,
      handleSelect,
      registerPage,
      deadline,
      verifyInput,
      verifyKeydown,
      backEvent,
      btnEmailStatus,
      btnPasswordStatus,
      btnUsernameStatus,
      btnVerifyStatus,
      setBtnStatus,
      validate,
      onFinish,
      inputBlur,
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
  padding: 87px 50px 52px;
  margin: 0 auto;
}
.submit {
  margin-top: 36px;
}
.register_tips {
  margin-top: 44px;
  text-align: left;
  line-height: 18px;
  font-size: 12px;
  color: $font-color-nomal;
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
  padding: 87px 60px 52px;
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