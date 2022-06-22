<template>
  <a-row class="edit_photo">
    <a-col class="home_cover">
      <div class="item_title">Home Cover</div>
      <div class="item_content">
        <img src="@/assets/images/smooth.jpg">
        <a-tag class="change_cover">
          <template #icon>
            <iconpark-icon name="add-picture"
                           style="margin-right:3px"></iconpark-icon>
          </template>
          Change cover
        </a-tag>
        <!-- <div class="upload_img">
          <iconpark-icon size="28"
                         name="add-picture"></iconpark-icon>
        </div> -->
      </div>
    </a-col>
    <a-col class="all_photos">
      <div class="item_title">All photos</div>
      <div class="item_content">
        <img src="@/assets/images/smooth.jpg">
        <a-tag class="change_cover">
          <template #icon>
            <iconpark-icon name="add-picture"
                           style="margin-right:3px"></iconpark-icon>
          </template>
          Change cover
        </a-tag>
      </div>
      <div class="upload_img">
        <iconpark-icon size="28"
                       name="add-picture"></iconpark-icon>
      </div>
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
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";

import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";

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
.edit_photo {
  position: relative;
  .item_title {
    font: 500 18px/24px "Roboto-Medium", Roboto;
  }
  .item_content {
    margin-top: 12px;
    position: relative;
    img {
      object-fit: cover;
      border-radius: 12px;
    }
  }
  .upload_img {
    width: 140px;
    height: 140px;
    border-radius: 12px;
    @include pos_center;
    border: 1px solid $background-color-minor;
    cursor: pointer;
  }
  .home_cover {
    img {
      width: 510px;
      height: 288px;
    }
    .change_cover {
      position: absolute;
      left: 17px;
      top: 15px;
      color: $font-color-fix;
      line-height: 28px;
      cursor: pointer;
    }
  }
}
</style>