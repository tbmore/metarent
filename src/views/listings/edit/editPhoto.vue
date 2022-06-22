<template>
  <a-space class="edit_photo"
           direction="vertical"
           :size="24">
    <div class="home_cover">
      <div class="item_title">Home Cover</div>
      <div class="item_content">
        <img src="@/assets/images/smooth.jpg">
        <a-tag class="change_cover">
          <template #icon>
            <iconpark-icon name="add-picture"
                           size="20"
                           style="margin-right:3px"></iconpark-icon>
          </template>
          Change cover
        </a-tag>
        <!-- <div class="upload_img">
          <iconpark-icon size="28"
                         name="add-picture"></iconpark-icon>
        </div> -->
      </div>
    </div>
    <div class="all_photos">
      <div class="item_title">All photos</div>
      <div class="item_describe">Drag and drop photos to change the order</div>
      <a-space class="item_content"
               :size="16">
        <div class="item_list"
             v-for="item in 4"
             :key="item">
          <img src="@/assets/images/smooth.jpg">
          <div class="close_bth">
            <iconpark-icon name="add-picture"
                           style="margin-right:3px"></iconpark-icon>
          </div>
        </div>
        <div class="upload_img">
          <iconpark-icon size="28"
                         name="add-picture"></iconpark-icon>
        </div>
      </a-space>
    </div>
    <div class="panorama">
      <div class="item_title">Panorama</div>
      <a-space class="item_content"
               :size="16">
        <div class="item_list"
             v-for="item in 2"
             :key="item">
          <img src="@/assets/images/smooth.jpg">
          <div class="close_bth">
            <iconpark-icon name="add-picture"
                           style="margin-right:3px"></iconpark-icon>
          </div>
        </div>
        <div class="upload_img">
          <iconpark-icon size="28"
                         name="add-picture"></iconpark-icon>
        </div>
      </a-space>
    </div>
    <div class="video_introduction">
      <div class="item_title">Video introduction</div>
      <div class="item_describe">Please upload an MP4 file with a duration of no less than 4 seconds and a size of no more than 1000M</div>
      <a-space class="item_content"
               :size="16">
        <div class="item_list"
             v-for="item in 1"
             :key="item">
          <img src="@/assets/images/smooth.jpg">
          <div class="close_bth">
            <iconpark-icon name="add-picture"
                           style="margin-right:3px"></iconpark-icon>
          </div>
        </div>
        <div class="upload_img">
          <iconpark-icon size="28"
                         name="add-picture"></iconpark-icon>
        </div>
      </a-space>
    </div>
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
import { UploadChangeParam, message, UploadProps } from "ant-design-vue";

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
  padding-bottom: 60px;
  .item_title {
    font: 500 18px/24px "Roboto-Medium", Roboto;
  }
  .item_content {
    margin-top: 12px;
    position: relative;
    flex-wrap: wrap;
    img {
      object-fit: cover;
      border-radius: 12px;
    }
  }
  .item_describe {
    font: 14px/18px "Roboto-Regular", Roboto;
    color: #b2b4ca;
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
  .all_photos,
  .panorama,
  .video_introduction {
    .item_list {
      position: relative;
      img {
        width: 248px;
        height: 140px;
      }
      .close_bth {
        position: absolute;
        right: 9px;
        top: 9px;
        width: 20px;
        height: 20px;
        @include pos_center;
        background: rgba(255, 255, 255, 1);
        border-radius: 3px;
      }
    }
  }
}
</style>