<template>
  <a-row class="detailed_default pricing_and_availability w100"
         justify="start"
         align="top"
         :getter="24">
    <!-- 定价 -->
    <a-col class="pricing w100"
           id="Pricing">
      <a-card :bordered="false">
        <template #title>
          Pricing
        </template>
        <template #extra>
          Listing currency
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="1">
                  1st menu item
                </a-menu-item>
                <a-menu-item key="2">
                  2nd menu item
                </a-menu-item>
                <a-menu-item key="3">
                  3rd item
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              USD
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </template>
        <div>
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
          <div class="item_title">Nightly price</div>
          <a-row class="item_content w100"
                 justify="space-between"
                 align="middle"
                 :contenteditable="editable">
            <a-col> Base price</a-col>
            <a-col>188 ￥</a-col>
          </a-row>
          <a-row class="item_content w100"
                 justify="space-between"
                 align="middle"
                 :contenteditable="editable">
            <a-col> Weekend nightly price</a-col>
            <a-col>188 ￥</a-col>
          </a-row>
        </div>
      </a-card>
    </a-col>
    <!-- 折扣 -->
    <a-col class="discounts w100"
           id="Discounts">
      <a-card :bordered="false">
        <template #title>
          Discounts
        </template>
        <template #extra>
          <a-button type="text"
                    v-if="editable">
            Edit
          </a-button>
        </template>
        <div>
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
          <a-row class="item_content w100"
                 justify="space-between"
                 align="middle"
                 :contenteditable="editable">
            <a-col>Daily discount</a-col>
            <a-col>5%</a-col>
          </a-row>
          <a-row class="item_content w100"
                 justify="space-between"
                 align="middle"
                 :contenteditable="editable">
            <a-col>Weekly discount</a-col>
            <a-col>10%</a-col>
          </a-row>
          <a-row class="item_content w100"
                 justify="space-between"
                 align="middle"
                 :contenteditable="editable">
            <a-col>Monthly discount</a-col>
            <a-col>10%</a-col>
          </a-row>
        </div>
      </a-card>
    </a-col>
    <!-- 额外费用 -->
    <a-col class="additional_charges w100"
           id="Additional charges">
      <a-card :bordered="false">
        <template #title>
          Additional charges
        </template>
        <template #extra>
          <a-button type="text"
                    v-if="editable">
            Edit
          </a-button>
        </template>
        <a-row class="content">
          <a-col>
            <div class="item_content"
                 :contenteditable="editable">Cleaning fee
            </div>
            <div class="item_title">$200 per stay, $101 per short-term rental stay</div>
          </a-col>
          <a-col>
            <div class="item_content"
                 :contenteditable="editable">Other fee</div>
            <div class="item_title">200 pet fee</div>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <!-- 预订设置 -->
    <a-col class="scheduled_settings w100"
           id="Scheduled settings">
      <a-card :bordered="false">
        <template #title>
          Scheduled settings
        </template>
        <template #extra>
          <a-button type="text"
                    v-if="editable">
            Edit
          </a-button>
        </template>
        <a-row class="content">
          <a-row class="item_content"
                 align="middle"
                 :contenteditable="editable">
            <iconpark-icon size="20"
                           name="inspection-5ech1lnh"></iconpark-icon>
            <span>Advance booked</span>
            <span>before 10 o'clock</span>
          </a-row>
          <a-row class="item_content"
                 align="middle"
                 :contenteditable="editable">
            <iconpark-icon size="20"
                           name="inspection-5ech1lnh"></iconpark-icon>
            <span>Restricted check-in days</span>
            <span>on Monday</span>
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
import { RightOutlined, DownOutlined } from "@ant-design/icons-vue";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";
import listingsRoomsIcon from "./components/listingsRoomsIcon.vue";

export default defineComponent({
  name: "TopMenu",
  components: {
    ALink,
    RightOutlined,
    DownOutlined,
    listingsRoomsIcon,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();

    const editable = ref<boolean>(false);
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
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
.pricing_and_availability {
  text-align: left;
  max-height: calc(100vh - 133px);
  overflow-y: auto;
  box-sizing: border-box;
  padding-right: 16px;
  .pricing,
  .discounts {
    .item_title {
      font: 500 18px/24px "Roboto-Medium", Roboto;
      margin-bottom: 22px;
      color: $font-color-main;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .item_content {
      margin-bottom: 17px;
      font: 400 16px/24px "Roboto-Regular", Roboto;
      :last-child {
        font: bold 18px/24px "DIN-Bold", DIN;
      }
      &:last-child {
        margin: auto;
      }
    }
  }
  .additional_charges {
    .content {
      flex-direction: column;
      > :first-child {
        margin-bottom: 16px;
      }
    }
    .item_title {
      color: $font-color-main;
      margin-bottom: 0;
    }
    .item_content {
      margin-bottom: 0;
    }
  }
  .scheduled_settings {
    .content {
      > :first-child {
        margin-right: 89px;
      }

    }
    .item_content {
      margin-bottom: 0;
      span{
          margin-left: 16px;
          &:last-child{
              font-weight: bold;
          }
      }
    }
  }
}
</style>