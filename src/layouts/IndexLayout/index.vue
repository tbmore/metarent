<template>
  <div id="indexlayout">
    <top-menu></top-menu>
    <permission :roles="routeItem.roles">
      <router-view></router-view>
    </permission>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  ComputedRef,
  watch,
  ref,
  Ref,
  nextTick,
} from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { StateType as GlobalStateType } from "@/store/modules/global";
import { StateType as UserStateType } from "@/store/modules/user/user.d";
import {
  PathJsonRoutesDataItem,
  vueRoutes,
  jsonPathVueRoutes,
  RoutesDataItem,
  getJsonRouteItem,
  getSelectLeftMenuPath,
  getRouteBelongTopMenu,
  getBreadcrumbRoutes,
  BreadcrumbType,
  getPermissionMenuData,
} from "@/utils/router";
import { mergeUnique as ArrayMergeUnique } from "@/utils/array";
import useTitle from "@/composables/useTitle";
import IndexLayoutRoutes from "../../router/HomeLayoutRoutes";
import Permission from "@/components/Permission/index.vue";

import { useI18n } from "vue-i18n";
import TopMenu from "./components/TopMenu.vue";

interface IndexLayoutSetupData {
  t: (key: string | number) => string;
  collapsed: ComputedRef<boolean>;
  toggleCollapsed: () => void;
  tabNavEnable: ComputedRef<boolean>;
  topNavEnable: ComputedRef<boolean>;
  belongTopMenu: ComputedRef<string>;
  headFixed: ComputedRef<boolean>;
  selectedKeys: ComputedRef<string[]>;
  leftOpenKeys: Ref<string[]>;
  breadCrumbs: ComputedRef<BreadcrumbType[]>;
  permissionMenuData: ComputedRef<RoutesDataItem[]>;
  onOpenChange: (key: any) => void;
  routeItem: ComputedRef<RoutesDataItem>;
}

export default defineComponent({
  name: "IndexLayout",
  components: {
    Permission,
    TopMenu,
  },
  setup(): IndexLayoutSetupData {
    const store = useStore<{
      global: GlobalStateType;
      user: UserStateType;
    }>();
    const route = useRoute();

    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);

    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);

    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );

    // 有权限的菜单
    const permissionMenuData = computed<RoutesDataItem[]>(() =>
      getPermissionMenuData(store.state.user.currentUser.roles, menuData)
    );

    // 当前路由的顶部菜单path
    const belongTopMenu = computed<string>(() =>
      getRouteBelongTopMenu(routeItem.value)
    );

    // 收缩左侧
    const collapsed = computed<boolean>(() => store.state.global.collapsed);
    const toggleCollapsed = (): void => {
      store.commit("global/changeLayoutCollapsed", !collapsed.value);
    };

    // 右侧顶部tabNav是否开启
    const tabNavEnable = computed<boolean>(
      () => store.state.global.tabNavEnable
    );

    // 右侧顶部导航是否开启
    const topNavEnable = computed<boolean>(
      () => store.state.global.topNavEnable
    );

    // 右侧顶部是否固定
    const headFixed = computed<boolean>(() => store.state.global.headFixed);

    // 左侧选择菜单key
    const selectedKeys = computed<string[]>(() => {
      const selectedKey = getSelectLeftMenuPath(routeItem.value);
      return [selectedKey];
    });

    // 左侧展开菜单keys
    const leftOpenKeys = ref<string[]>(routeItem.value.parentPath || []);
    watch([routeItem, collapsed], () => {
      const parentPath = routeItem.value.parentPath || [];
      if (parentPath.length && !collapsed.value) {
        leftOpenKeys.value = ArrayMergeUnique<string>(
          leftOpenKeys.value,
          parentPath
        );
      } else {
        nextTick(() => {
          leftOpenKeys.value = [];
        });
      }
    });

    // 左侧菜单展开收起
    const onOpenChange = (key: any) => {
      leftOpenKeys.value = key;
    };

    // 面包屑导航
    const breadCrumbs = computed<BreadcrumbType[]>(() =>
      getBreadcrumbRoutes(route.path, jsonPathRoutes)
    );

    // 设置title
    useTitle(routeItem);

    const { t } = useI18n();
    return {
      t,
      collapsed,
      toggleCollapsed,
      tabNavEnable,
      topNavEnable,
      belongTopMenu,
      headFixed,
      selectedKeys,
      leftOpenKeys,
      breadCrumbs,
      permissionMenuData,
      onOpenChange,
      routeItem,
    };
  },
});
</script>
<style lang="scss">
@import "./css/index.scss";
</style>