<template>
  <a-row class="detailed_header"
         justify="space-between"
         align="middle">
    <a-row class="left"
           align="middle">
      <div class="back_btn"
           @click="backEvent"></div>
      <bread-crumbs class="breadcrumb"
                    :list="breadCrumbs"></bread-crumbs>
    </a-row>
    <div class="right">
      <slot></slot>
    </div>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
import { useRoute } from "vue-router";
import {
  BreadcrumbType,
  getJsonRouteItem,
  getRouteBelongTopMenu,
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";

export default defineComponent({
  name: "TopMenu",
  components: {
    ALink,
    BreadCrumbs,
  },
  props: {
    breadCrumbs: {
      type: Array as PropType<BreadcrumbType[]>,
      default: () => {
        return [
          {
            // 标题，路由在菜单、浏览器title 或 面包屑中展示的文字，目前可以使用locales
            title: "string",
            // 路由地址或外链
            path: "string",
            // 不使用locales
            noLocales: true,
          },
        ];
      },
    },
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();

    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);
    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);

    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );
    // 当前路由的顶部菜单path
    const belongTopMenu = computed<string>(() =>
      getRouteBelongTopMenu(routeItem.value)
    );

    const backEvent = () => {};

    return {
      t,
      belongTopMenu,
      backEvent,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.detailed_header{
    margin: 20px 0 12px;
}
.back_btn {
  width: 36px;
  height: 41px;
  background: url("~@/assets/images/user/back_btn.png") no-repeat center
    center/cover;
  cursor: pointer;
  margin-right: 12px;
}
.breadcrumb {
  font: bold 20px/24px "Roboto-Bold", Roboto;
}
:deep(.ant-breadcrumb) {
  > span:last-child a {
    color: $font-color-main;
  }
}
</style>