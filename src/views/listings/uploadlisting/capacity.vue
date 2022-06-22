<template>
  <!-- 上传房源  可接待人数 -->
  <div class="capacity upload"
       ref="capacity">
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>
    <a-space direction="vertical"
             :size="32"
             align="center"
             class="housing_space_content">
      <a-col class="title">Maximum number of people</a-col>
      <a-row class="housing_area">
        <a-row>Housing area</a-row>
        <a-row class="housing_area_m"
               justify="space-between"
               align="middle">
          <a-input v-model:value="housingArea"
                   placeholder="Enter"
                   :bordered="false"
                   :max-length="10"
                   style="width: 80px"
                   @blur="onBlur" />
          <a-col>m³</a-col>
        </a-row>
      </a-row>
      <template v-for="item in spaceData"
                :key="item">
        <a-row class="content_item"
               justify="space-between"
               align="middle">
          <a-col class="content_item_title">{{item.name}}</a-col>
          <a-row class="content_item_content"
                 justify="space-around"
                 align="middle">
            <iconpark-icon name="add-one"
                           size="32"
                           @click="changeValue(item,'del')"></iconpark-icon>
            <span>{{item.value}}</span>
            <iconpark-icon name="add-one"
                           size="32"
                           @click="changeValue(item,'add')"></iconpark-icon>
          </a-row>
        </a-row>
      </template>
      <a-row class="housing_area bed_type">
        <a-row>Sleeping arrangements</a-row>
        <a-row class="housing_area_m"
               justify="space-between"
               align="middle">
          <span>Not selected</span>
          <a-button type="text"
                    @click="visible=true">Selected</a-button>
        </a-row>
      </a-row>
    </a-space>

  </div>

  <!--  选择弹窗 -->
  <a-modal v-model:visible="visible"
           :mask="false"
           :maskClosable="false"
           :getContainer="()=>$refs.capacity"
           :width="464"
           :footer="null"
           wrapClassName="capacity_model"
           centered>
    <template #title>
      Select the type and number of beds
    </template>
    <template #closeIcon>
      <iconpark-icon name="international"></iconpark-icon>
    </template>
    <a-space direction="vertical"
             :size="32"
             align="center"
             class="housing_space_content">
      <template v-for="item in spaceData"
                :key="item">
        <a-row class="content_item"
               justify="space-between"
               align="middle">

          <a-row>
            <checkbox-botton v-model:checked="item.checked"></checkbox-botton>
            <a-col class="content_item_title">{{item.name}}</a-col>
          </a-row>

          <a-row class="content_item_content"
                 justify="space-between"
                 align="middle">
            <iconpark-icon name="add-one"
                           size="32"
                           @click="changeValue(item,'del')"></iconpark-icon>
            <span>{{item.value}}</span>
            <iconpark-icon name="add-one"
                           size="32"
                           @click="changeValue(item,'add')"></iconpark-icon>
          </a-row>
        </a-row>
      </template>
    </a-space>
  </a-modal>
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
} from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";
import accessibility from "../components/accessibility.vue";

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
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const capacity = ref(null);
    const housingArea = ref("");
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
    const format = (val: string, preVal: string) => {
      const reg = /^-?\d*(\.\d*)?$/;

      if ((!isNaN(+val) && reg.test(val)) || val === "" || val === "-") {
        housingArea.value = val;
      } else {
        housingArea.value = preVal;
      }
    };
    const onBlur = () => {
      if (
        housingArea.value.charAt(housingArea.value.length - 1) === "." ||
        housingArea.value === "-"
      ) {
        format(housingArea.value.slice(0, -1), housingArea.value);
      }
    };

    onMounted(() => {
      nextTick(() => {});
    });
    watch(housingArea, (val, preVal) => {
      format(val, preVal);
    });
    return {
      t,
      routeItem,
      editEvent,
      spaceData,
      changeValue,
      housingArea,
      onBlur,
      visible,
      capacity,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.capacity {
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

  .housing_space_content {
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
      margin-bottom: 10px;
    }
    .content_item {
      width: 478px;
      font: bold 18px/22px "Roboto-Bold", Roboto;
      //   flex-wrap: wrap;
      .content_item_content {
        color: $font-color-nomal;
        width: 121px;
        user-select: none;
        &:first-child,
        &:last-child {
          cursor: pointer;
        }
        span {
          color: $font-color-fix;
        }
      }
      img {
        width: 100px;
        height: 62px;
        object-fit: cover;
        border-radius: 6px;
        margin-right: 6px;
      }
    }
    .bed_type {
      .housing_area_m {
        color: #cbcbcb;
        button {
          color: #1d1d1d;
          text-decoration-line: underline;
        }
      }
    }
  }
}
:deep(.ant-modal-content) {
  border-radius: 16px;
  overflow: hidden;
}
:deep(.ant-modal-header) {
  border-bottom: none;
  padding-left: 32px;
  padding-right: 32px;
}
:deep(.ant-modal-body) {
  padding: 0 32px 50px;
  .housing_space_content {
    overflow: auto;
    padding: 0;
    .content_item {
      width: 400px;
      .check_box {
        margin-right: 6px;
      }
    }
  }
}
</style>