<template>
  <!-- 上传房源  继续完成 -->
  <a-row class="unfinished_listing"
         align="middle">
    <a-tag class="quit">Quit</a-tag>
    <a-row class="unfinished_listing_content"
           align="start">
      <a-row class="title">Continue to complete your previously uploaded listings</a-row>
      <a-space :size="16"
               direction="vertical">
        <a-row align="middle"
               justify="space-between"
               class="content_item">
          <a-row align="middle">
            <a-col class="item_icon">
              <iconpark-icon name="home"
                             size="20"></iconpark-icon>
            </a-col>
            <a-col>Listings created on May 31, 2022</a-col>
          </a-row>
          <caret-right-outlined style="font-size:18px;color:#1D1D1D" />
        </a-row>
        <a-row align="middle"
               justify="space-between"
               class="content_item">
          <a-row align="middle">
            <a-col class="item_icon">
              <iconpark-icon name="home"
                             size="20"></iconpark-icon>
            </a-col>
            <a-col>Listings created on May 31, 2022</a-col>
          </a-row>
          <caret-right-outlined style="font-size:18px;color:#1D1D1D" />
        </a-row>
        <a-col class="display_all">Display all</a-col>
      </a-space>
    </a-row>
    <a-row class="unfinished_listing_footer"
           align="middle"
           justify="end">
      <a-link to="/uploadListing/chooseCountry">
        <a-button class="btn">
          <template #icon>
            <plus-outlined :size='32'></plus-outlined>
          </template>
          Create a new listing
        </a-button>
      </a-link>
    </a-row>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import { useRoute } from "vue-router";
import {
  getJsonRouteItem,
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";

import {
  PlusOutlined,
  LoadingOutlined,
  CaretRightOutlined,
} from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";
import accessibility from "../components/accessibility.vue";

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

export default defineComponent({
  name: "EditPhoto",
  components: {
    ALink,
    LoadingOutlined,
    PlusOutlined,
    CaretRightOutlined,
    listingsRoomsIcon,
    accessibility,
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

    const editEvent = () => {};

    return {
      t,
      routeItem,
      editEvent,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.unfinished_listing {
  position: relative;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  min-height: 650px;
  width: 100%;
  overflow: hidden;
  .quit {
    position: absolute;
    right: 50px;
    top: 39px;
    background-color: $background-color-minor;
    width: 56px;
    height: 32px;
    border: none;
    cursor: pointer;
    font: 500 14px/20px "Roboto-Medium", Roboto;
  }
  .unfinished_listing_content {
    height: calc(100vh - 80px);
    flex-direction: column;
    flex-wrap: nowrap;
    margin-top: 247px;
    width: 460px;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .title {
      font: 22px/24px "Roboto-Bold", Roboto;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .content_item {
      width: 460px;
      height: 62px;
      box-sizing: border-box;
      border: 1px solid #979797;
      border-radius: 12px;
      padding: 0 15px;
      cursor: pointer;
    }
    .item_icon {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      border: 1px solid $background-color-minor;
      @include pos_center;
      margin-right: 10px;
    }
    .display_all {
      cursor: pointer;
    }
  }
  .unfinished_listing_footer {
    flex-shrink: 0;
    height: 80px;
    width: 100%;
    background-color: #ffffff;
    margin-right: 18px;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .btn {
      height: 52px;
      border-radius: 12px;
      border-color: #979797;
      @include pos_center;
      span:first-child {
        size: 24px;
      }
    }
  }
}
</style>