<template>
  <!-- 上传房源  发布预览 房源预览 -->
  <div class="release_preview upload">
    <div class="layout">
      <img class="room_img"
           src="@/assets/images/listings/bg_1.png">

      <div class="release_preview_content">
        <a-row class="release_name"
               align="middle">
          <iconpark-icon name="me"
                         size="24"></iconpark-icon>
          <a-col class="posted">Posted by Whale</a-col>
        </a-row>
        <a-row class="release_title">Dragon Boat New ReliefSunshineKing Bed Room/Who ReliefSunshineKing ..</a-row>
        <a-row class="room_icon"
               justify="space-around">
          <listings-rooms-icon :roomsinfo="{count:1,names:'BEDROOMS'}"></listings-rooms-icon>
          <listings-rooms-icon :roomsinfo="{count:1,names:'BEDS'}"></listings-rooms-icon>
          <listings-rooms-icon :roomsinfo="{count:1,names:'BATHS'}"></listings-rooms-icon>
          <listings-rooms-icon :roomsinfo="{count:1,names:'BATHS'}"></listings-rooms-icon>
        </a-row>
        <a-row class="describe">
          ★ Style: Each sun room has its unique layout. The hardness of the stone is soft under the elegant and warm soft decoration. As it wants to express, we hope that you can relieve your tiredness when you settle here. .
        </a-row>
        <a-row class="release_preview_footer"
               justify="space-between"
               align="middle">
          <a-row align="middle">
            <iconpark-icon name="local"
                           size="26"
                           style="marginRight:8px"></iconpark-icon>
            Guangdong · Shanghai
          </a-row>
          <a-row class="footer_value"
                 align="middle">
            42
            <span>
              m³
            </span>
          </a-row>
        </a-row>
      </div>
    </div>
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
    const checked = ref(true);

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
      changeValue,
      housingArea,
      checked,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.release_preview {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 650px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;

  .layout {
    position: relative;
    width: 419px;
    height: 849px;

    box-sizing: border-box;
    transform: scale(0.76);
    flex-shrink: 0;
    .room_img {
      position: absolute;
      top: 19px;
      left: 22px;
      z-index: -1;
      width: 375px;
      height: 331px;
      object-fit: cover;
      object-position: center;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    }
  }
  .release_preview_content {
    position: absolute;
    top: 0;
    left: 0;
    width: 419px;
    height: 849px;
    box-sizing: border-box;
    padding: 350px 22px 0;
    overflow: hidden;

    background: url("@/assets/images/listings/iPhone12.png") no-repeat center
      center/cover;
    flex-direction: column;
    flex-wrap: nowrap;
    font: 500 16px/20px "Roboto-Medium", Roboto;

    .release_name {
      margin-top: 29px;
      padding: 0 24px;
      .posted {
        font: bold 14px/24px "Roboto-Bold", Roboto;
        margin-left: 10px;
        @include mul_ellipsis(1);
      }
    }
    .release_title {
      padding: 13px 24px 0;
      font-size: 18px;
      font: 600 18px/26px "Roboto-Bold", Roboto;
      @include mul_ellipsis(2);
    }
    .room_icon {
      flex-wrap: nowrap;
      padding: 25px 24px 0;
      .icon {
        width: 70px;
        :deep(.icon_count) {
          right: 48px;
        }
      }
    }
    .describe {
      padding: 28px 24px 0;
      font: 400 14px/32px "Roboto-Bold", Roboto;
    }
    .release_preview_footer {
      padding: 54px 24px 0;
      font: 600 14px/26px "Roboto-Bold", Roboto;
      .footer_value {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
</style>