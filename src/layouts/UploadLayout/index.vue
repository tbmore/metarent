<template>
  <!-- UploadLayout -->
  <div id="UploadLayout"
       class="upload_layout">
    <div class="top_menu_logo"></div>
    <permission :roles="routeItem.roles">
      <router-view v-slot="{ Component,route }">
        <!-- <keep-alive :max="10">
          <component :is="Component"
                     :key="route.meta.isBack ? route.path : undefined"></component>
        </keep-alive> -->
        <keep-alive>
          <component :is="Component"
                     v-model:enabelNext="enabelNext"
                     v-if="route.meta.keepAlive"
                     :key="route.meta.keepAliveKey" />
        </keep-alive>
        <component :is="Component"
                   v-model:enabelNext="enabelNext"
                   v-if="!route.meta.keepAlive" />
      </router-view>
      <a-row class="upload upload_footer"
             align="middle"
             justify="end"
             v-if="routeItem.path!='/uploadListing/unfinishedListing'">
        <span v-if="isBack"></span>
        <a-col class="back_btn"
               @click="backEvent"
               v-else>
          <left-outlined />
        </a-col>
        <a-button class="btn"
                  :disabled="!enabelNext.next"
                  @click="nextStepEvent">
          Next step
        </a-button>
      </a-row>
    </permission>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch, Ref } from "vue";
import { useRoute, useRouter, RouteLocationRaw } from "vue-router";
import {
  PathJsonRoutesDataItem,
  vueRoutes,
  jsonPathVueRoutes,
  RoutesDataItem,
  getRouteItem,
} from "@/utils/router";
import useTitle from "@/composables/useTitle";
import UploadLayoutRoutes from "../../router/UploadLayoutRoutes";
import Permission from "@/components/Permission/index.vue";
import { LeftOutlined } from "@ant-design/icons-vue";

import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "IndexLayout",
  components: {
    Permission,
    LeftOutlined,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isBack = ref(false);
    const enabelNext: Ref<{ query?: {}; next?: Boolean }> = ref({
      next: false,
    });

    // 所有菜单路由
    const menuData = ref<RoutesDataItem[]>(
      vueRoutes(UploadLayoutRoutes, "/uploadListing")
    );

    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(
      menuData.value
    );

    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getRouteItem(route.path, menuData.value as RoutesDataItem[])
    );

    const backEvent = () => {
      router.back();
    };
    const nextStepEvent = () => {
      const currentRouteIdx = menuData.value.findIndex(
        (item) => item.path == routeItem.value.path
      );
      if (currentRouteIdx != menuData.value.length) {
        const data: RouteLocationRaw = {
          path: menuData.value[currentRouteIdx + 1].path,
        };
        const query = enabelNext.value.query;
        if (query) data.query = query;
        router.push(data);
      }
    };
    // 设置title
    useTitle(routeItem);

    watch(enabelNext, (val) => {
      console.log("Next Step: value", val);
    });
    watch(route, (nextval) => {
    //   enabelNext.value.next = false;
    });

    const { t } = useI18n();
    return {
      t,
      routeItem,
      isBack,
      backEvent,
      nextStepEvent,
      enabelNext,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/css/global.scss";
.upload_layout {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  text-align: left;
  min-height: 100vh;
  height: 100vh;
  color: $font-color-fix;
  //   display: flex;
  .top_menu_logo {
    background: url("~@/assets/images/user/logo.png") no-repeat center
      center/cover;
    width: 172px;
    height: 32px;
    position: absolute;
    top: 38px;
    left: 56px;
    z-index: 1;
  }
  .upload_footer {
    flex-shrink: 0;
    height: 68px;
    width: 100%;
    background-color: #ffffff;
    justify-content: space-between;
    font: 500 16px/20px "Roboto-Medium", Roboto;

    .back_btn {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      margin-left: 25px;
      border: 1px solid #eaeaea;
      overflow: hidden;
      cursor: pointer;
      @include pos_center;
    }

    .btn {
      margin-right: 20px;
      height: 44px;
      border-radius: 12px;
      @include pos_center;
      padding-left: 24px;
      padding-right: 24px;
    }
  }
}
</style>