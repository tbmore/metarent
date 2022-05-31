<template>
  <div class="user-layout">
    <video src="@/assets/images/user-bg.mp4"
           autoplay
           loop
           muted></video>
    <div class="user-layout-bg">
      <a-row class="user-layout-content"
             align="middle">
        <a-row class="w100"
               justify="space-between">
          <a-col span="8">
            <a-col class="user_bg"></a-col>
          </a-col>
          <a-row class="user_menu"
                 align="middle"
                 justify="center"
                 v-if="routeItem.path!=='/user/qrcode'&&routeItem.path!=='/user/retrievepassword'">
            <a-col :class="['user_menu_login',{'isCurrent': routeItem.path=='/user/login'}]">
              <a-link to="/user/login">
                {{t('user-layout.menu.login')}}
              </a-link>
            </a-col>
            <a-col :class="['user_menu_register',{'isCurrent': routeItem.path=='/user/register'}]">
              <a-link to="/user/register">
                {{t('user-layout.menu.register')}}
              </a-link>
            </a-col>
          </a-row>
          <a-row class="user_menu"
                 align="middle"
                 justify="center"
                 v-if="routeItem.path=='/user/retrievepassword'&&routeItem.query">
            <a-col class="user_menu_login">{{'retrieve password'}}</a-col>
          </a-row>
          <a-col span="8"
                 class="textr">
            <a-link to="/user/qrcode"
                    class="user_qrcode"
                    v-if="routeItem.path!=='/user/qrcode'" />
            <a-col to="/user/qrcode"
                   class="user_qrcode user_qrcode_account"
                   @click="$router.go(-1)"
                   v-else></a-col>

          </a-col>

        </a-row>
        <a-row class="w100 h100">
          <router-view></router-view>
        </a-row>
      </a-row>

    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { getRouteItem, RoutesDataItem, vueRoutes } from "@/utils/router";
import UserLayoutRoutes from "@/router/UserLayoutRoutes";
import useTitle from "@/composables/useTitle";
import ALink from "@/components/ALink/index.vue";
import { useI18n } from "vue-i18n";

// const userBg = defineAsyncComponent(
//   () => import("@/assets/images/user-bg.mp4")
// );

export default defineComponent({
  name: "UserLayout",
  components: {
    ALink,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    // 所有菜单路由
    const menuData = ref<RoutesDataItem[]>(
      vueRoutes(UserLayoutRoutes, "/user")
    );

    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getRouteItem(route.path, menuData.value as RoutesDataItem[])
    );
    console.log(menuData.value)
    // 设置title
    useTitle(routeItem);
    return {
      t,
      routeItem,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.user-layout {
  position: relative;
  .user-layout-bg {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    background-color: rgba($color: #000000, $alpha: 0.7);
    justify-content: center;
  }
  .user-layout-content {
    position: relative;
    width: 678px;
    height: 510px;
    border-radius: 24px;
    background-color: #ffffff;
    overflow: hidden;
    flex-direction: column;
    flex-wrap: nowrap;
    .user_bg {
      background: url("~@/assets/images/user/logo.png") no-repeat center
        center/cover;
      width: 172px;
      height: 32px;
      margin: 32px 0 0 36px;
    }
    .user_qrcode {
      cursor: pointer;
      background: url("~@/assets/images/user/qrcode_icon.png") no-repeat right
        top/cover;
      width: 98px;
      height: 91px;
      display: inline-block;
      &.user_qrcode_account {
        background-image: url("~@/assets/images/user/account_icon.png");
      }
    }
    .user_menu {
      height: 91px;
      flex: 0 0 33%;
      max-width: 33%;
      //   ::v-deep.ant-menu-horizontal {
      //     border-bottom: none;
      //   }
      // width: 20px;
      // height: 7px;
      // border-radius: 3.5px;
      // background-color: #1890ff;
      // margin: auto;
      .user_menu_login {
        margin-right: 37px;
      }
      .user_menu_login,
      .user_menu_register {
        height: 100%;
        padding-top: 36px;
        box-sizing: border-box;
        font-size: $font-size-22;
        a {
          color: $font-color-minor;
        }
      }
      .isCurrent {
        a {
          color: #003669;
          font-weight: bolder;
        }
        ::after {
          content: "";
          width: 20px;
          height: 7px;
          border-radius: 3.5px;
          background-color: #1890ff;
          margin: auto;
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }
  video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .lang {
    position: absolute;
    top: 20px;
    right: 50px;
    color: #000000;
    font-size: 16px;
  }
}
</style>