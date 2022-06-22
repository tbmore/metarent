<template>
  <a-space class="detailed_default edit_accessibility"
           direction="vertical"
           :size="30">
    <a-card class="room_setting"
            :bordered="false">
      <a-row justify="space-between"
             align="middle">
        <a-row class="item_content"
               :contenteditable="editable">
          <listings-rooms-icon :roomsinfo="{count:1,names:'BEDROOMS'}"></listings-rooms-icon>
          <listings-rooms-icon :roomsinfo="{count:1,names:'BEDS'}"></listings-rooms-icon>
          <listings-rooms-icon :roomsinfo="{count:1,names:'BATHS'}"></listings-rooms-icon>
          <listings-rooms-icon :roomsinfo="{count:1,names:'BATHS'}"></listings-rooms-icon>
        </a-row>
        <a-button type="text">Edit</a-button>
      </a-row>
    </a-card>
    <a-card class="other_setting"
            :bordered="false">
      <a-row class="content"
             justify="space-between"
             align="middle">
        <a-row class="ohter_setting_left">
          <a-col class="item_title">Accessible parking spaces</a-col>
          <a-col class="item_content">Guest Entrance and Parking</a-col>
        </a-row>
        <a-button type="text">Add</a-button>
      </a-row>
      <a-row class="content"
             justify="space-between"
             align="middle">
        <a-row class="ohter_setting_left">
          <a-col class="item_title">Bedroom</a-col>
          <a-col class="item_content">24 hours hot water, panoramic windows, aurora sunroof</a-col>
        </a-row>
        <a-button type="text">Add</a-button>
      </a-row>
      <a-row class="content"
             justify="space-between"
             align="middle">
        <a-row class="ohter_setting_left">
          <a-col class="item_title">Kitchen</a-col>
          <a-col class="item_describe">to be added</a-col>
        </a-row>
        <a-button type="text">Add</a-button>
      </a-row>
      <a-row class="content"
             justify="space-between"
             align="middle">
        <a-row class="ohter_setting_left">
          <a-col class="item_title">Adaptive equipment</a-col>
          <a-col class="item_describe">to be added</a-col>
        </a-row>
        <a-button type="text">Add</a-button>
      </a-row>
    </a-card>
  </a-space>
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

import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";

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
    listingsRoomsIcon,
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
.edit_accessibility {
  position: relative;
  display: flex;
  padding-bottom: 60px;
  padding-right: 0;
  .item_title {
    font: 500 18px/24px "Roboto-Medium", Roboto;
  }
  .item_content {
    margin-top: 12px;
    position: relative;
    flex-wrap: wrap;
  }
  .item_describe {
    font: 14px/18px "Roboto-Regular", Roboto;
    color: #b2b4ca;
  }
  .other_setting {
    :deep(.ant-card-body) {
      padding-left: 0;
      padding-right: 0;
    }
    .item_title {
      font-size: 16px;
      color: inherit;
      margin: 0;
    }
    .item_content {
      font-family: "Roboto-Regular", Roboto;
      font-size: 14px;
      margin: 0;
    }
    .content {
      padding: 18px 26px;
      border-bottom: 1px solid $background-color-minor;
      .ohter_setting_left {
        flex-direction: column;
      }
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
}
</style>