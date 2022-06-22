<template>
  <!-- 上传房源  添加照片 -->
  <div class="add_image upload">
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>
    <a-space direction="vertical"
             :size="20"
             align="center"
             class="add_image_content">
      <div>
        <a-col class="title">Upload at least 5 photos</a-col>
        <a-col class="item_content">Photos must be at least 50 KB in size，The resolution of the panoramic picture should not be lower than 1920, and the upload ratio should be 2:1</a-col>
      </div>
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
        <div class="item_title">living room</div>
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
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.add_image {
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
  .add_image_content {
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
      width: 512px;
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
      width: 512px;
      font: bold 18px/24px "Roboto-Bold", Roboto;
      font-weight: bold;
      margin-bottom: 6px;
    }

    .item_title {
      font: bold 18px/24px "Roboto-Medium", Roboto;
      margin-bottom: 6px;
    }
    .item_content {
      position: relative;
      flex-wrap: wrap;
      width: 512px;
      font: 400 12px/18px "Roboto-Regular", Roboto;

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
}
</style>