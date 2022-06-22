<template>
  <a-row class="top_menu w100"
         justify="space-between"
         align="center">
    <a-col span="5">
      <a-col class="top_menu_logo"></a-col>
    </a-col>
    <a-menu :selectedKeys="[belongTopMenu]"
            mode="horizontal"
            class="top_menu_menu w100">
      <a-menu-item key="/overview">
        <a-link to="/overview">
          {{t('index-layout.topmenu.menu.overview')}}
        </a-link>
      </a-menu-item>
      <a-menu-item key="/listings">
        <a-link to="/listings">
          {{t('index-layout.topmenu.menu.listings')}}
        </a-link>
      </a-menu-item>
      <a-menu-item key="/reservations">
        <a-link to="/reservations">
          {{t('index-layout.topmenu.menu.reservations')}}
        </a-link>
      </a-menu-item>
      <a-menu-item key="/co-hosts">
        <a-link to="/co-hosts">
          {{t('index-layout.topmenu.menu.co-hosts')}}
        </a-link>
      </a-menu-item>
      <a-menu-item key="/housekeeper">
        <a-link to="/housekeeper">
          {{t('index-layout.topmenu.menu.housekeeper')}}
        </a-link>
      </a-menu-item>
    </a-menu>
    <a-col span="5"
           class="top_menu_userinfo">
      <a-col>
        <a-avatar :src="userinfo"
                  :size="34"
                  class="top_menu_userinfo_icon" />
      </a-col>
      <a-col class="top_menu_userinfo_notice">
        <iconpark-icon name="remind"
                       size="20"></iconpark-icon>
      </a-col>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import { useRoute } from "vue-router";
import {
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
  },
  setup() {
    const { t } = useI18n();
    const current = ref<string[]>(["mail"]);
    const userinfo = ref<string>("");
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
    return { t, current, userinfo, belongTopMenu };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.top_menu {
  height: $headerHeight;
  flex-wrap: nowrap;
  padding: 0 70px;
  .top_menu_logo {
    background: url("~@/assets/images/user/logo.png") no-repeat center
      center/cover;
    width: 172px;
    height: 32px;
    margin-top: 12px;
  }
  .top_menu_userinfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .top_menu_userinfo_icon,
    .top_menu_userinfo_notice {
      cursor: pointer;
    }
    .top_menu_userinfo_notice {
      width: 34px;
      height: 34px;
      background-color: #f2f2f2;
      border-radius: 50%;
      margin-left: 18px;
      @include pos_center();
    }
  }
  .top_menu_menu {
    font-weight: bold;
    border-bottom: none;
    line-height: $headerHeight;
    height: $headerHeight;
    font-size: 18px;
    justify-content: center;
    user-select: none;
  }

  // 修改菜单样式 a-menu
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after),
  :deep(.ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-submenu:hover::after),
  :deep(.ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-item-active::after),
  :deep(.ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-submenu-active::after),
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after),
  :deep(.ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-submenu-open::after),
  :deep(.ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-item-selected::after),
  :deep(.ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-submenu-selected::after) {
    width: 22px;
    height: 6px;
    border-radius: 3px;
    background-color: $primary-color;
  }
  :deep(.ant-menu-horizontal > .ant-menu-item::after, .ant-menu-horizontal
      > .ant-menu-submenu::after) {
    margin: auto;
    border-bottom: none;
    transition: background-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>