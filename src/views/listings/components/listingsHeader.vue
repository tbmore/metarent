<template>
  <div class="listing_header">
    <a-space :size="12">
      <div class="name">{{t('page.listings.listingsheader.name')}}</div>
      <span class="tips">{{t('page.listings.listingsheader.describe')}}</span>
    </a-space>
    <a-space :size="25">
      <span class="list_count">{{t('page.listings.listingsheader.listing')}}：5</span>
      <a-link to="/uploadListing/unfinishedListing">
        <a-button type="primary"
                  class="create_btn">
          <iconpark-icon name="upload-three"
                         color="#ffffff"
                         size="24"
                         class="create_btn_icon"></iconpark-icon>
          {{t('page.listings.btn.createlisting')}}
        </a-button>
      </a-link>
    </a-space>
  </div>
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
  name: "listingsHeader",
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
@import "../index.scss";
.listing_header {
  height: 40px;
  margin: 20px 0 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    font-size: 22px;
    font-weight: bold;
    line-height: 24px;
  }
  .tips {
    font-size: 14px;
    line-height: 24px;
    color: $font-color-minor;
  }
  .list_count {
    font-size: 18px;
    font-weight: bold;
  }
  .create_btn {
    width: 158px;
    height: 40px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    .create_btn_icon {
      margin-right: 5px;
    }
  }
}
</style>