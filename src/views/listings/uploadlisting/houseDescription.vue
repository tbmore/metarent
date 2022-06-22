<template>
  <!-- 上传房源  房源介绍 -->
  <div class="house_description upload">
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>
    <a-space direction="vertical"
             :size="36"
             align="center"
             class="house_description_content">
      <a-row class="content_item"
             justify="space-between"
             align="middle">
        <a-col class="title">Title</a-col>
        <a-textarea v-model:value="housingArea"
                    show-count
                    :rows="2"
                    placeholder="maxLength is 6"
                    :maxlength="50"
                    class="textarea"
                    :autoSize="{ minRows: 2, maxRows: 2 }" />
      </a-row>
      <a-row class="content_item"
             justify="space-between"
             align="middle">
        <a-col class="title">Property description</a-col>
        <a-textarea v-model:value="housingArea"
                    show-count
                    :rows="6"
                    placeholder="Try to cut in from the perspective of location, decoration style, special facilities, design concept, transformation story, etc."
                    :maxlength="500"
                    class="textarea"
                    :autoSize="{ minRows: 6, maxRows: 6 }" />
      </a-row>
      <a-row class="content_item"
             justify="space-between"
             align="middle">
        <a-col class="title">Surrounding description</a-col>
        <a-textarea v-model:value="housingArea"
                    show-count
                    :rows="6"
                    placeholder="Try to cut in from the perspective of location, decoration style, special facilities, design concept, transformation story, etc."
                    :maxlength="500"
                    class="textarea"
                    :autoSize="{ minRows: 6, maxRows: 6 }" />
      </a-row>
    </a-space>

  </div>
  <a-row class="error_box"
         align="middle">
    <close-circle-filled />
    <a-col>Review Failed: Listing Description Contains Sensitive Words</a-col>
    <iconpark-icon name="close-small" size="18" class="close_error_box"></iconpark-icon>
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
.house_description {
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

  .house_description_content {
    width: 100%;
    height: calc(100% - 90px);
    overflow-y: auto;
    padding: 34px 28px;
    background-color: #ffffff;
    flex-direction: column;
    flex-wrap: nowrap;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .housing_area {
      flex-direction: column;
      width: 478px;
      padding: 18px 30px;
      border-radius: 12px;
      margin-bottom: 8px;
      border: 1px solid #cbcbcb;
      font: bold 18px/22px "Roboto-Bold", Roboto;
      .housing_area_m {
        margin-top: 14px;
        font-weight: 400;
        input {
          padding-left: 0;
        }
        &:last-child {
          font: 400 12px/22px "Roboto-Regular", Roboto;
        }
      }
    }
    .title {
      width: 478px;
      font: bold 22px/26px "Roboto-Bold", Roboto;
      font-weight: bold;
      margin-bottom: 14px;
    }
    .content_item {
      width: 478px;
      font: 500 16px/22px "Roboto-Medium", Roboto;
      .textarea {
        position: relative;
        :deep(.ant-input) {
          width: 478px;
          height: 104px;
          box-sizing: border-box;
          border-radius: 12px;
          padding: 15px 16px 43px;
          font: 500 16px/22px "Roboto-Medium", Roboto;
        }
        &::after {
          position: absolute;
          right: 16px;
          bottom: 16px;
          font: 400 12px/14px Roboto-Regular, Roboto;
        }
      }
    }
  }
}
.error_box {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 36px;
  margin: auto;
  padding: 18px;
  width: 646px;
  height: 58px;
  background: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
  border: 1px solid rgba($background-color-minor, 0.5);
  font: 400 14px/22px Roboto-Regular, Roboto;
  :first-child{
    color: #FF1010;
    font-size: 22px;
    margin-right: 12px;
  }
  .close_error_box{
    position: absolute;
    right: 18px;
    top: 21px;
    cursor: pointer;
  }
}
</style>