<template>
  <!-- 上传房源  房源特色 -->
  <a-row class="housing_space upload"
         align="middle"
         justify="end">
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>
    <a-space direction="vertical"
             :size="18"
             align="center"
             class="housing_space_content">
      <a-col class="title">Choose your listing features</a-col>
      <template v-for="item in spaceData"
                :key="item">
        <a-row :class="['content_item',{selected:selected == item.name}]"
               @click="selectEvent(item)">
          <a-row class="content_item_title">{{item.name}}</a-row>
          <a-row class="content_item_content">{{item.content}}</a-row>
        </a-row>
      </template>
    </a-space>

  </a-row>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import { useRoute, useRouter } from "vue-router";
import {
  getJsonRouteItem,
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";
import Scroll from "@/components/Scroll/Scroll.vue";
import {
  PlusOutlined,
  LoadingOutlined,
  CaretRightOutlined,
  ExclamationCircleOutlined,
  CaretDownOutlined,
  LeftOutlined,
} from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";
import accessibility from "../components/accessibility.vue";

import BScroll from "@better-scroll/core";

export default defineComponent({
  name: "EditPhoto",
  components: {
    ALink,
    LoadingOutlined,
    PlusOutlined,
    CaretRightOutlined,
    ExclamationCircleOutlined,
    CaretDownOutlined,
    LeftOutlined,
    listingsRoomsIcon,
    accessibility,
    Scroll,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const selected = ref("");

    const spaceData = ref([
      {
        name: "Entire listing",
        content:
          "An apartment with hotel-like amenities serviced by a professional management company.",
      },
      {
        name: "Separate room",
        content:
          "Furnished rental properties, including kitchens and bathrooms, possibly with some housekeeping services such as a front desk",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
      {
        name: "Shared tenancy unit",
        content:
          "An open layout apartment or condo, which may have short interior walls.",
      },
    ]);

    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);
    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);
    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );

    const editEvent = () => {};
    const selectEvent = (item: any) => {
      selected.value = item.name;
      console.log(item, 999);
    };

    onMounted(() => {
      nextTick(() => {});
    });

    return {
      t,
      routeItem,
      editEvent,
      spaceData,
      selectEvent,
      selected,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.housing_space {
  position: relative;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 650px;
  height: 100%;;
  width: 100%;
  overflow: hidden;

  .housing_space_content {
    width: 100%;
    height: calc(100% - 90px);
    // overflow-y: auto;
    padding: 34px 28px;
    background-color: #ffffff;
    flex-direction: column;
    flex-wrap: nowrap;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .title {
      width: 478px;
      font: bold 22px/26px "Roboto-Bold", Roboto;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .content_item {
      width: 478px;
      box-sizing: border-box;
      border: 1px solid $font-color-nomal;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      font: bold 22px/24px "Roboto-Bold", Roboto;
      padding: 18px 30px;
      flex-wrap: wrap;
      .content_item_title {
        font-size: 18px;
        line-height: 22px;
      }
      .content_item_content {
        font: 400 12px/22px "Roboto-Regular", Roboto;
      }
      img {
        width: 100px;
        height: 62px;
        object-fit: cover;
        border-radius: 6px;
        margin-right: 6px;
      }
      &:hover,
      &.selected {
        background: rgba(234, 234, 234, 0.5);
        border: 1px solid #0084ff;
      }
    }
  }
}
</style>