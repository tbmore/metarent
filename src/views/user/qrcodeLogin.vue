<template>
  <a-row class="main w100 flex_dir_c"
         justify="middle">
    <a-col class="qrcode_icon">
      <img src="@/assets/images/user/qrcode.png" />
      <a-col v-if="loginStatus!=1"
             class="qrcode_icon_status w100 h100">
        <img src="@/assets/images/user/qrcode_reload.png"
             v-if="loginStatus==2" />
        <img src="@/assets/images/user/qrcode_success.png"
             v-else />
      </a-col>
    </a-col>
    <a-col class="qrcode_tips">
      <a-row v-if="loginStatus==1"
             align="center">
        <iconpark-icon class="qrcode_scan_icon"
                       size="24"
                       name="scan-code"></iconpark-icon>Open the&nbsp;<a-link to="https://www.imetalk.net/">MetaRent mobile APP</a-link>&nbsp; to scan the code to log in
      </a-row>
      <a-col v-else-if="loginStatus==2">{{t('page.user.qrcodeLogin.scan.failed')}}</a-col>
      <a-col v-else>{{t('page.user.qrcodeLogin.scan.success')}}</a-col>
    </a-col>
    <a-col class="qrcode_info">{{t('page.user.qrcodeLogin.info')}}</a-col>
  </a-row>
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
  handleSubmit: (e: MouseEvent) => void;
  loginStatus: ComputedRef<"1" | "2" | "3" | undefined>;
  loginLoading: string;
  loginFailed: string;
  isLogin: Ref<boolean>;
  isLoginError: Ref<boolean>;
  usernameoptions: Ref<{ value: string }[]>;
  handleSearch: (e: string) => void;
  handleSelect: (e: string) => void;
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
    const router = useRouter();
    const { currentRoute } = router;
    const store = useStore<{ user: UserLoginStateType }>();
    const { t } = useI18n();

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

    // 表单值
    const modelRef = reactive<LoginParamsType>({
      email: "",
      password: "",
    });

    // 表单验证
    const validateUsername = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("page.user.login.form-item-username.required");
      } else {
        const reg = new RegExp(
          /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
        );
        if (!reg.test(value)) {
          return Promise.reject("page.user.login.form-item-username.required");
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

    //  表单验证规则
    const rulesRef = reactive({
      username: [
        {
          //   required: true,
          //   message: "page.user.login.form-item-username.required",
          validator: validateUsername, // 自定义校验
          trigger: ["change", "blur"],
        },
      ],
      password: [
        {
          //   required: true,
          //   message: "page.user.login.form-item-password.required",
          validator: validatePassword, // 自定义校验
          trigger: "change",
        },
      ],
    });

    // 获取表单内容
    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      rulesRef
    );
    // 登录loading
    const submitLoading = ref<boolean>(false);
    // 登录
    const handleSubmit = async (e: MouseEvent) => {
      e.preventDefault();
      submitLoading.value = true;
      try {
        const fieldsValue = await validate<LoginParamsType>();
        isLogin.value = true;
        console.log(fieldsValue);
        const res: boolean = await store.dispatch("user/login", fieldsValue);
        if (res === true) {
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

    // 扫码登录状态
    const loginStatus = computed<"1" | "2" | "3" | undefined>(
      () => "1" || store.state.user.loginStatus
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
.qrcode_icon {
  margin: 13px 0 36px;
  width: 246px;
  height: 246px;
  position: relative;
  .qrcode_icon_status {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba($color: #ffffff, $alpha: 0.8);
    @include pos_center;
    img {
      width: 64px;
      cursor: pointer;
    }
  }
}
.qrcode_tips {
  margin-bottom: 46px;
  line-height: 24px;
  .qrcode_scan_icon {
    margin-right: 14px;
  }
}
.qrcode_info {
  color: $font-color-nomal;
  font-size: 12px;
}
</style>