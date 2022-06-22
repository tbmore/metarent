<template>
  <div class="listings">
    <listings-header></listings-header>
    <div class="listings_content">
      <!-- 房源管理 左边列表 -->
      <listings-left></listings-left>
      <!-- 房源管理 右边搜索 -->
      <listings-right></listings-right>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import listingsHeader from "./components/listingsHeader.vue";
import listingsLeft from "./components/listingsLeft.vue";
import listingsRight from "./components/listingsRight.vue";
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
    listingsHeader,
    listingsLeft,
    listingsRight,
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

    return {
      t,
      belongTopMenu,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
.listings {
  padding: 0 70px;
  background-color: #fcfcfc;
  .listings_content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .listings_content_left {
    width: 100%;
  }
  .listings_content_right {
    width: 316px;
    flex-shrink: 0;
    margin-left: 12px;
    height: 719px;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 0 15px;
    border: 1px solid $background-color-minor;
  }
}
</style>