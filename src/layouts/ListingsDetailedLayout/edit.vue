<template>
  <div class="edit_content">
    <detailedHeader :breadCrumbs="[{title:'Located in the CBD area',path:'/listings/index',noLocales:true}]"
                    class="edit_header">
      <a-space :size="10">
        <a-button type="primary"
                  @click="saveEvent">
          Save
        </a-button>
      </a-space>
    </detailedHeader>
    <!-- 内容 -->
    <router-view v-slot="{ Component }">
      <keep-alive :include="['UserLogin']"
                  :max="10">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
import detailedHeader from "./components/detailedHeader.vue";
import { useRoute } from "vue-router";
import {
  getJsonRouteItem,
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";

export default defineComponent({
  name: "Edit",
  components: {
    ALink,
    BreadCrumbs,
    detailedHeader,
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

    // 左侧选择菜单key

    const saveEvent = () => {};

    // 监听路由变化 设置菜单选择

    return {
      t,
      routeItem,
      saveEvent,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
.edit_content {
  position: relative;
  text-align: left;
  padding: 0 70px;
  .edit_header {
    :deep(.ant-btn) {
      @include pos_center;
      width: 108px;
      height: 36px;
      border-radius: 8px;
      font-weight: bold;
    }
  }
}
</style>