<template>
  <a-row class="detailed_default policies_and_rules w100"
         justify="start"
         align="top"
         :getter="24">
    <!-- 政策须知 -->
    <a-col class="policies w100"
           id="Policies">
      <a-card :bordered="false">
        <template #title>
          Policies
        </template>
        <template #extra>
          <a-button type="text"
                    v-if="editable">
            Edit
          </a-button>
        </template>
        <a-row class="content">
          <div class="item_content"
               :contenteditable="editable">Cancellation policy
          </div>
          <div class="item_title">Full refund 1 day prior to arrival</div>
        </a-row>
      </a-card>
    </a-col>
    <!-- 预订须知 -->
    <a-col class="reservation_notice w100"
           id="Reservation notice">
      <a-card :bordered="false">
        <template #title>
          Reservation notice
        </template>
        <template #extra>

        </template>
        <a-space :size="0"
                 class="edit_btn"
                 v-if="editable">
          <a-tag class=""
                 style="backgroupColor:#fff">
            {{'bottonInfo.value'}}
          </a-tag>
          <a-tag class=""
                 style="backgroupColor:#fff">
            {{'bottonInfo.value'}}
          </a-tag>
        </a-space>
        <a-row class="content w100"
               :contenteditable="editable">
          <a-row class="item_content"
                 justify="space-between"
                 align="middle">
            <a-col>Instant Book</a-col>
            <a-switch v-model:checked="checked" />
          </a-row>
          <a-row class="item_title"
                 :wrap="false">
            <a-row class="data_select"
                   justify="space-around"
                   align="middle">
              <policies-btn :btnInfo="{value:'May 16, 2022',title:'Check in'}">
                <iconpark-icon size="22"
                               name="iron-three"></iconpark-icon>
              </policies-btn>
              <caret-right-filled :size="22"
                                  class="caret_right_filled" />
              <policies-btn :btnInfo="{value:'May 16, 2022',title:'Check out'}">
                <iconpark-icon size="22"
                               name="iron-three"></iconpark-icon>
              </policies-btn>
            </a-row>
            <a-row class="money_value"
                   align="middle">
              <policies-btn :btnInfo="{value:'＄100',title:'Security deposit'}">
                <iconpark-icon size="22"
                               name="iron-three"></iconpark-icon>
              </policies-btn>
            </a-row>
          </a-row>
        </a-row>
      </a-card>
    </a-col>
    <!-- 法律法规 -->
    <a-col class="laws_and_regulations w100"
           id="Laws and regulations">
      <a-card :bordered="false">
        <template #title>
          Laws and regulations
        </template>
        <template #extra>
          <a-button type="text"
                    v-if="editable">
            Edit
          </a-button>
        </template>
        <a-row class="content">
          <a-row class="item_content"
                 justify="space-between"
                 align="middle"
                 :contenteditable="editable">
            <span>Local laws</span>
            <a-button type="link">Check</a-button>
          </a-row>
          <a-row class="item_content"
                 justify="space-between"
                 align="middle"
                 :contenteditable="editable">
            <span>identity informaiton</span>
            <a-button type="link">Check</a-button>
          </a-row>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import { useRoute } from "vue-router";
import {
  getJsonRouteItem,
  getRouteBelongTopMenu,
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import { CaretRightFilled } from "@ant-design/icons-vue";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";
import listingsRoomsIcon from "./components/listingsRoomsIcon.vue";
import policiesBtn from "./components/policiesBtn.vue";

export default defineComponent({
  name: "TopMenu",
  components: {
    ALink,
    CaretRightFilled,
    listingsRoomsIcon,
    policiesBtn,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();

    const editable = ref<boolean>(false);
    const checked = ref<boolean>(true);
    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);
    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);

    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );
    // 当前路由的顶部菜单path
    const belongTopMenu = computed<string>(() =>
      getRouteBelongTopMenu(routeItem.value)
    );

    return {
      t,
      belongTopMenu,
      editable,
      checked,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
.policies_and_rules {
  text-align: left;
  max-height: calc(100vh - 133px);
  overflow-y: auto;
  box-sizing: border-box;
  padding-right: 16px;
  .policies {
    .content {
      flex-direction: column;
    }
    .item_title {
      color: $font-color-main;
      margin-bottom: 0;
    }
    .item_content {
      margin-bottom: 0;
    }
  }
  .reservation_notice {
    .content {
      flex-direction: column;
    }
    .item_title {
      color: $font-color-main;
      margin-bottom: 0;
    }
    .item_content {
      margin-bottom: 10px;
    }
    .data_select {
      width: 100%;
      border-radius: 12px;
      border: 1px solid $background-color-minor;
    }
    .money_value {
      box-sizing: border-box;
      margin-left: 14px;
      height: 76px;
      width: 439px;
      flex-shrink: 0;
      padding-left: 20px;
      border-radius: 12px;
      border: 1px solid $background-color-minor;
    }
  }
  .laws_and_regulations {
    :deep(.ant-card-body) {
      padding-left: 0;
      padding-right: 0;
    }
    .content {
      flex-direction: column;
    }
    .item_content {
      margin-bottom: 0px;
      padding: 8px 11px 8px 26px;
      &:first-child {
        padding-top: 0;
        border-bottom: 1px solid $background-color-minor;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
  .caret_right_filled {
    font-size: 22px;
    color: $font-color-minor;
  }
}
</style>