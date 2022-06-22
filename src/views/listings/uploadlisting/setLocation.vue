<template>
  <!-- 上传房源  设置位置 -->
  <a-row class="set_location upload"
         align="middle">
    <div class="chart"
         id="mapContainer"
         ref="mapDivElement" />
    <a-row class="save_and_help">
      <a-tag class="help">
        <exclamation-circle-outlined />
      </a-tag>
      <a-tag class="quit">Save and exit</a-tag>
    </a-row>
    <a-space direction="vertical"
             :size="36"
             align="start"
             class="select_content">
      <a-row class="location_content_item">
        <a-row class="location_content_item_title">State/Region</a-row>
        <a-row class="content_item">
          <iconpark-icon name="international"
                         class="content_item_icon"></iconpark-icon>
          <a-select v-model:value="regionValue"
                    :options="region"
                    size="large"
                    class="content_item_select"
                    placeholder="Select state/territory"
                    :dropdownStyle="{
                        'font': '500 16px/20px Roboto-Medium, Roboto',
                        'text-align':'center'
                    }"
                    dropdownClassName="set_location_dropdown"
                    @select="selectRegion">

            <!-- @blur="isOpened=false"
                  @focus="isOpened=true"
                  @select="isOpened=false" -->
            <template #suffixIcon>
              <caret-down-outlined />
            </template>
          </a-select>
        </a-row>
      </a-row>
      <a-row class="location_content_item">
        <a-row class="location_content_item_title">City</a-row>
        <a-row class="content_item">
          <iconpark-icon name="building-two"
                         class="content_item_icon"></iconpark-icon>
          <a-select v-model:value="cityValue"
                    :options="city"
                    size="large"
                    class="content_item_select"
                    placeholder="Select City"
                    :dropdownStyle="{
                        'font': '500 16px/20px Roboto-Medium, Roboto',
                        'text-align':'center'
                    }"
                    dropdownClassName="set_location_dropdown"
                    @select="selectCity">

            <!-- @blur="isOpened=false"
                  @focus="isOpened=true"
                  @select="isOpened=false" -->
            <template #suffixIcon>
              <caret-down-outlined />
            </template>
          </a-select>
        </a-row>
      </a-row>
      <a-row class="location_content_item">
        <a-row class="location_content_item_title">Street number or district</a-row>
        <a-row class="content_item">
          <a-input v-model:value="district"
                   size="large"
                   placeholder="Street number or district"
                   @change="districtChange">
            <template #prefix>
              <iconpark-icon name="map-road"
                             style="font-size:26px;"></iconpark-icon>
            </template>
          </a-input>
        </a-row>
      </a-row>
      <a-row class="location_content_item">
        <a-row class="location_content_item_title">Room No</a-row>
        <a-row class="content_item">
          <a-input v-model:value="room"
                   size="large"
                   placeholder="Enter Room No">
            <template #prefix>
              <iconpark-icon name="mark"
                             style="font-size:26px;"></iconpark-icon>
            </template>
          </a-input>
        </a-row>
      </a-row>
    </a-space>
    <a-row class="set_location_tips">
      <a-row>Upload your listing before becoming a host</a-row>
      <a-row>We will never reveal the exact address of a listing until a guest has made a reservation</a-row>
    </a-row>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
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

import {
  PlusOutlined,
  LoadingOutlined,
  CaretRightOutlined,
  ExclamationCircleOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";
import accessibility from "../components/accessibility.vue";

import { initDragMap } from "@/composables/mapbox";
import _ from "lodash";

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
    const regionValue = ref(null);
    const cityValue = ref(null);

    const isOpened = ref(false);
    const region = ref(
      //   [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
      [
        "hubei",
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
    const city = ref(
      //   [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }))
      [
        "wuhan",
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
    const district = ref("");
    const room = ref("");
    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);
    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);
    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );

    const selectRegion = () => {
      console.log(geocoder);
      geocoder.value.setCountries("cn");
      geocoder.value.setTypes(
        "region, postcode, district, place, locality, neighborhood"
      );
      geocoder.value.query(regionValue.value as unknown as string);
    };
    const selectCity = () => {
      console.log(geocoder);
      geocoder.value.setCountries("cn");
      geocoder.value.setTypes(
        "region, postcode, district, place, locality, neighborhood"
      );
      geocoder.value.query(cityValue.value as unknown as string);
    };

    // 防抖函数
    const districtChange = _.debounce(() => {
      console.log(response, "response");
    //   geocoder.value.setTypes("neighborhood,address");
      geocoder.value.setInput(district.value);
      //   geocoder.value.setBbox
      //   geocoder.value.setProximity
      //   console.log(geocoder);
      //   geocoder.value.setCountries("cn");
      //   geocoder.value.setTypes(
      //     "region, postcode, district, place, locality, neighborhood"
      //   );
      //   geocoder.value.query(cityValue.value as unknown as string);
      emit("update:enabelNext", {
        next: !!district.value.length,
      });
    }, 300);

    const editEvent = () => {};

    const nextStepEvent = () => {
      console.log(geocoder);
    };

    const initLocation = (route.query.country as string) || "china";
    onMounted(() => {});

    const { map, mapDivElement, marker, geocoder, response } =
      initDragMap(initLocation);

    watch(geocoder, (geocoder) => {
      //   console.log(geocoder, "watch");
      //   geocoder.on("results", (event) => {
      //     console.log(event, "results");
      //     // map.value.getSource('single-point').setData(event.result.geometry);
      //   });
      //   geocoder.on("loading", (event) => {
      //     console.log(event, "loading");
      //   });
      //   geocoder.on("result", (event) => {
      //     console.log(event, "result");
      //   });
      //   geocoder.on("error", (event) => {
      //     console.log(event, "error");
      //   });
    });

    return {
      t,
      routeItem,
      editEvent,
      regionValue,
      cityValue,
      isOpened,
      map,
      mapDivElement,
      marker,
      geocoder,
      nextStepEvent,
      region,
      city,
      district,
      room,
      selectRegion,
      selectCity,
      districtChange,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.set_location {
  position: relative;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 650px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .chart {
    position: absolute;
    width: 100%;
    height: 100%;
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
      //   color: $font-color-main;
    }
    :deep(.ant-select-arrow) {
      width: 20px;
      height: 20px;
      margin-top: -10px;
      right: 14px;
      color: #000000;
      font-size: 20px;
    }
    :deep(.ant-input-prefix) {
      margin-right: 16px;
    }
    :deep(.ant-input-affix-wrapper) {
      border-radius: 16px;
      border: 1px solid #979797;
    }
  }

  .select_content {
    width: 516px;
    height: 610px;
    border-radius: 16px;
    padding: 30px 28px;
    background-color: #ffffff;

    position: absolute;
    flex-direction: column;
    flex-wrap: nowrap;
    top: 119px;
    right: 129px;
    z-index: 1;
    font: 500 16px/20px "Roboto-Medium", Roboto;
  }
  .location_content_item {
    flex-direction: column;
    .location_content_item_title {
      margin-bottom: 20px;
      font: bold 22px/24px "Roboto-Bold", Roboto;
    }
  }

  .set_location_tips {
    position: absolute;
    left: 36px;
    bottom: 26px;
    z-index: 1;
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

:deep(.mapboxgl-ctrl-logo) {
  display: none;
}
:deep(.mapboxgl-ctrl-geocoder.mapboxgl-ctrl) {
  //   display: none;
}
</style>
<style>
.set_location_dropdown {
}
</style>