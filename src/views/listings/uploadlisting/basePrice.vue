<template>
  <!-- 上传房源  设置价格 -->
  <div class="base_price upload">
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>
    <a-space direction="vertical"
             :size="32"
             align="center"
             class="base_price_content">
      <a-row class="content_item"
             justify="space-between">
        <a-row class="item_title">Base price</a-row>
        <a-row class="item_describe">Please set the specified price for the one night rental you want</a-row>
        <a-input placeholder="maxLength is 6"
                 class="item_content"
                 v-model:value="housingArea"
                 prefix='$'
                 suffix="/DAY" />
      </a-row>
      <a-row class="content_item"
             justify="space-between">
        <a-row class="item_title">Weekend price</a-row>
        <a-row class="item_describe">Specifically refers to the price of Friday night, Saturday night, excluding Sunday</a-row>
        <a-input placeholder="maxLength is 6"
                 class="item_content"
                 v-model:value="housingArea"
                 prefix='$'
                 suffix="/DAY" />
      </a-row>
      <a-row class="content_item"
             justify="space-between">
        <a-row class="item_title">Daily discount</a-row>
        <a-row class="item_describe">One night discount for bookings less than 7 consecutive days</a-row>
        <a-input placeholder="maxLength is 6"
                 class="item_content min"
                 v-model:value="housingArea"
                 suffix="%" />
      </a-row>
      <a-row class="content_item"
             justify="space-between">
        <a-row class="item_title">Weekly rental discount (7 nights and above)</a-row>
        <a-input placeholder="maxLength is 6"
                 class="item_content min"
                 v-model:value="housingArea"
                 suffix="%" />
      </a-row>
      <a-row class="content_item"
             justify="space-between">
        <a-row class="item_title">Monthly rental discount (28 nights and above)</a-row>
        <a-input placeholder="maxLength is 6"
                 class="item_content min"
                 v-model:value="housingArea"
                 suffix="%" />
      </a-row>
    </a-space>

  </div>
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
import CheckboxBotton from "@/components/CheckBoxBotton/index.vue";
import {
  PlusOutlined,
  LoadingOutlined,
  CaretRightOutlined,
  ExclamationCircleOutlined,
  CaretDownOutlined,
  LeftOutlined,
  CloseCircleFilled,
} from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";
import accessibility from "../components/accessibility.vue";
import { message } from "ant-design-vue";

function formatNumber(value: string) {
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";

  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }

  if (num) {
    result = num + result;
  }

  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
}

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
    CheckboxBotton,
    CloseCircleFilled,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const housingArea = ref(null);
    const visible = ref(false);

    const spaceData = ref([
      {
        name: "Guest room",
        value: 1,
        checked: false,
      },
      {
        name: "Bedroom",
        value: 1,
        checked: false,
      },
      {
        name: "Living room",
        value: 1,
        checked: false,
      },
      {
        name: "Kitchen",
        value: 1,
        checked: false,
      },
      {
        name: "Bathroom",
        value: 1,
        checked: false,
      },
      {
        name: "Bed",
        value: 1,
        checked: false,
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
    const changeValue = (item: any, type: any) => {
      console.log(item, 999, type);

      if (type == "del") {
        if (item.value <= 0) return;
        item.value--;
      } else {
        item.value++;
      }
    };

    onMounted(() => {
      nextTick(() => {});
    });

    return {
      t,
      routeItem,
      editEvent,
      spaceData,
      changeValue,
      housingArea,
      visible,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.base_price {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 650px;
  height: 100%;;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: flex-end;

  .base_price_content {
    width: 100%;
    height: calc(100% - 90px);
    overflow-y: auto;
    padding: 34px 28px;
    background-color: #ffffff;
    flex-direction: column;
    flex-wrap: nowrap;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .content_item {
      width: 478px;
      flex-direction: column;
      font: 500 16px/22px "Roboto-Medium", Roboto;
      .item_title {
        font: bold 22px/26px "Roboto-Bold", Roboto;
      }
      .item_content {
        height: 54px;
        margin-top: 12px;
        box-sizing: border-box;
        border-radius: 12px;
        font: bold 22px/26px "Roboto-Bold", Roboto;
        padding: 14px 20px;
        :deep(.ant-input) {
          font: bold 22px/26px "Roboto-Bold", Roboto;
        }
        &.min{
            width: 156px;
        }
      }
      .item_describe {
        font: 14px/22px "Roboto-Regular", Roboto;
      }
    }
  }
}
</style>