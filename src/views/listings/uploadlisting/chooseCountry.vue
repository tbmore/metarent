<template>
  <!-- 上传房源  选择国家 -->
  <div class="choose_country upload"
         ref="chooseCountry">
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>
    <a-row class="choose_country_content"
           align="middle"
           :style="{paddingTop:isOpened ? '128px' : '247px'}">
      <a-row class="title">Upload your listing before becoming a host{{isOpened}}</a-row>
      <a-row class="content_item">
        <iconpark-icon name="international"
                       class="content_item_icon"></iconpark-icon>
        <a-select v-model:value="selectValue"
                  :options="country"
                  size="large"
                  :getPopupContainer="()=>$refs.chooseCountry"
                  class="content_item_select"
                  placeholder="country / region"
                  :listHeight="345"
                  :dropdownStyle="{
                    'font': '500 16px/20px Roboto-Medium, Roboto',
                    'text-align':'center'
                  }"
                  dropdownClassName="choose_country_dropdown"
                  @select="selectEvent">
          <!-- @blur="isOpened=false"
                  @focus="isOpened=true"
                  @select="isOpened=false" -->
          <template #suffixIcon>
            <caret-down-outlined />
          </template>
        </a-select>
      </a-row>
      <a-row class="choose_country_tips">
        <a-row>Upload your listing before becoming a host</a-row>
        <a-row>We will never reveal the exact address of a listing until a guest has made a reservation</a-row>
      </a-row>
    </a-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
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
} from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";
import accessibility from "../components/accessibility.vue";

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
    CaretRightOutlined,
    ExclamationCircleOutlined,
    CaretDownOutlined,
    listingsRoomsIcon,
    accessibility,
  },
  setup(_props, { emit }) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const chooseCountry = ref(null);
    const selectValue = ref(null);
    const isOpened = ref(false);
    const country = ref(
      //   [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
      [
        "China",
        "Eritrea",
        "Austria",
        "Bahamas",
        "Bangladesh",
        "French Polynesia",
        "Guatemala",
        "Botswana",
        "Saint Lucia",
        "Macedonia",
      ].map((val, _i) => ({ value: val }))
    );
    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);
    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);
    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );

    const selectEvent = (val: any) => {
      emit("update:enabelNext", {
        query: {
          country: val,
        },
        next: true,
      });
    };

    onMounted(() => {});

    return {
      t,
      routeItem,
      selectEvent,
      selectValue,
      country,
      chooseCountry,
      isOpened,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.choose_country {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 100vh;
  min-height: 650px;
  width: 100%;
  overflow: hidden;
  .choose_country_content {
    position: relative;
    width: 100%;
    height: 100%;
    flex-direction: column;
    flex-wrap: nowrap;
    padding-top: 247px;
    background: url("@/assets/images/listings/bg_1.png") no-repeat center
      center/cover;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .title {
      font: bold 22px/24px "Roboto-Bold", Roboto;
      width: 460px;
      font-weight: bold;
      margin-bottom: 24px;
      color: #ffffff;
      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    }
    .content_item {
      width: 460px;
      height: 62px;
      box-sizing: border-box;
      border-radius: 12px;
      position: relative;
      background-color: #ffffff;
      font: 500 16px/20px "Roboto-Medium", Roboto;
      .content_item_icon {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 18px;
        width: 26px;
        height: 26px;
        font-size: 26px;
        margin: auto;
      }
      .content_item_select {
        width: 100%;
      }
      cursor: pointer;
      :deep(.ant-select-selector) {
        width: 100%;
        height: 100%;
        border: 1px solid #979797;
        border-radius: 12px;
        padding: 0 14px 0 60px;
        background-color: transparent;
      }
      :deep(.ant-select-selection-item),
      :deep(.ant-select-selection-placeholder),
      :deep(.ant-select-selection-search) {
        display: flex;
        align-items: center;
        font: 500 16px/20px "Roboto-Medium", Roboto;
        // color: $font-color-main;
      }
      :deep(.ant-select-arrow) {
        width: 20px;
        height: 20px;
        margin-top: -10px;
        right: 14px;
        color: #000000;
        font-size: 20px;
      }
    }
    .choose_country_tips {
      position: absolute;
      left: 36px;
      bottom: 26px;
      background-color: rgba($color: #000000, $alpha: 0.8);
      width: 600px;
      height: 130px;
      border-radius: 18px;
      overflow: hidden;
      color: #ffffff;
      padding: 37px;
      padding-right: 27px;
      font: bold 22px/24px "Roboto-Bold", Roboto;
      :last-child {
        font: 400 14px/16px "Roboto-Regular", Roboto;
        margin-top: 14px;
      }
    }
  }
  .upload_footer {
    flex-shrink: 0;
    height: 80px;
    width: 100%;
    background-color: #ffffff;
    margin-right: 18px;
    font: 500 16px/20px "Roboto-Medium", Roboto;
    .btn {
      height: 44px;
      border-radius: 12px;
      @include pos_center;
      padding-left: 24px;
      padding-right: 24px;
    }
  }
}
</style>
<style>
.choose_country_dropdown {
}
</style>