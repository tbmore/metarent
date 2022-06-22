<template>
  <!-- 上传房源 房源空间 -->
  <a-row class="housing_space upload"
         align="middle"
         justify="center">
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
      <a-col class="title">Housing space provided</a-col>
      <template v-for="item in spaceData"
                :key="item">
        <a-row :class="['content_item',{selected:selected == item.name}]"
               justify="space-between"
               align="middle"
               @click="selectEvent(item)">
          <a-col class="content_item_title">{{item.name}}</a-col>
        </a-row>
      </template>
    </a-space>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
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
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const selected = ref("");

    const spaceData = ref([
      {
        name: "Entire listing",
      },
      {
        name: "Separate room",
      },
      {
        name: "Shared tenancy unit",
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

    onMounted(() => {});

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
  background: url("@/assets/images/listings/bg_1.png") no-repeat center;

  .housing_space_content {
    width: 516px;
    border-radius: 16px;
    padding: 34px 28px;
    background-color: #ffffff;
    flex-direction: column;
    flex-wrap: nowrap;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .title {
      font: bold 22px/26px "Roboto-Bold", Roboto;
      font-weight: bold;
      margin-bottom: 16px;
      //   text-align: center;
    }
    .content_item {
      width: 460px;
      height: 74px;
      box-sizing: border-box;
      border: 1px solid #979797;
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      font: bold 22px/24px "Roboto-Bold", Roboto;
      .content_item_title {
        margin-left: 42px;
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
        border: 2px solid #0084ff;
      }
    }
  }
}
</style>