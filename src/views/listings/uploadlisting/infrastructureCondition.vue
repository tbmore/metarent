<template>
  <!-- 上传房源  基础设施条件 -->
  <div class="infrastructure_condition upload">
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>

    <a-row class="infrastructure_condition_content"
           align="middle">
      <a-col class="title">Choose your listing features</a-col>
      <a-row class="contents">
        <template v-for="item in spaceData"
                  :key="item">
          <a-row :class="['content_item',{isSelect:listingFeatures.includes(item.name)}]"
                 align="middle"
                 @click="selectEvent(item)">
            <iconpark-icon name="monitor-one"
                           size="32"></iconpark-icon>
            <a-col class="content_item_content">Air conditioning</a-col>
          </a-row>
        </template>
      </a-row>
      <a-col class="title">Popular Amenities</a-col>
      <a-row class="contents">
        <template v-for="item in 15"
                  :key="item">
          <a-row class="content_item"
                 align="middle">
            <iconpark-icon name="monitor-one"
                           size="32"></iconpark-icon>
            <a-col class="content_item_content">Air conditioning</a-col>
          </a-row>
        </template>
      </a-row>
    </a-row>
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
import { ExclamationCircleOutlined, LeftOutlined } from "@ant-design/icons-vue";
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
    ExclamationCircleOutlined,
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
    const listingFeatures = ref<string[]>([])

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
    const selectEvent = (item: { name: any }) => {
      const idx = listingFeatures.value.findIndex((v) => v == item.name);

      if (idx == -1) {
        listingFeatures.value.push(item.name);
      } else {
        listingFeatures.value.splice(idx, 1);
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
      selectEvent,
      listingFeatures,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.infrastructure_condition {
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

  .infrastructure_condition_content {
    width: 100%;
    height: calc(100% - 90px);
    overflow-y: auto;
    padding: 34px 28px;
    background-color: #ffffff;
    flex-direction: column;
    flex-wrap: nowrap;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .title {
      width: 512px;
      font: bold 22px/26px "Roboto-Bold", Roboto;
      font-weight: bold;
      margin-bottom: 10px;
      flex-shrink: 0;
      &:nth-of-type(n + 2) {
        margin-top: 40px;
      }
    }
    .contents {
      width: 512px;
      font: 500 12px/12px "Roboto-Medium", Roboto;
      color: $font-color-main;
      .content_item {
        flex-direction: column;
        width: 92px;
        height: 92px;
        border-radius: 12px;
        box-sizing: border-box;
        padding: 0 8px;
        border: 1px solid #eaeaea;
        margin-right: 48px;
        margin-top: 33px;
        cursor: pointer;
        user-select: none;
        &.isSelect {
          color: $primary-color;
          border: 2px solid $primary-color;
        }
        :first-child {
          margin-top: 25px;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }

        &:nth-child(-n + 4) {
          margin-top: 0;
        }
        .content_item_content {
          text-align: center;
          margin-top: 2px;
        }
        img {
          width: 100px;
          height: 62px;
          object-fit: cover;
          border-radius: 6px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>