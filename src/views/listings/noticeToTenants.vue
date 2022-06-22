<template>
  <a-row class="detailed_default notice_to_tenants w100"
         justify="start"
         align="top"
         :getter="24">
    <!-- 入住须知 -->
    <a-col class="check-in_instructions w100"
           id="Check-in Instructions">
      <a-card :bordered="false">
        <template #title>
          Check-in Instructions
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
          <div class="item_content">Suitable for children (2-12 years old)</div>
          <div class="item_content">Pets allowed</div>
          <div class="item_content">Commercial shooting allowed</div>
          <div class="item_content">Additional rules</div>
          <div class="item_title"
               :contenteditable="editable">Do not bring pungent smelling food into the room</div>
        </div>
      </a-card>
    </a-col>
    <!-- 入住指引 -->
    <a-col class="check-in_guidelines w100">
      <a-card :bordered="false">
        <template #title>
          Check-in Instructions
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
          <div class="item_content">Interaction with guests</div>
          <div class="item_title"
               :contenteditable="editable">I won’t be available in person</div>
          <div class="item_content">Check-in Guidelines</div>
          <div class="item_title"
               :contenteditable="editable">24 hours hot water, panoramic windows, aurora sunroof</div>
          <div class="item_content">Guest manual</div>
          <div class="item_title"
               :contenteditable="editable">Give guests tips about your listing, like how to access the internet or turn on the hot water</div>
          <div class="item_content">Wi-fi details</div>
          <div class="item_title"
               :contenteditable="editable">Wifi network name：whaleMax ，Wifi password AK12345678</div>
        </div>
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
.notice_to_tenants {
  text-align: left;
  max-height: calc(100vh - 133px);
  overflow-y: auto;
  box-sizing: border-box;
  padding-right: 16px;
  .check-in_guidelines,
  .check-in_instructions {
    .item_content {
      position: relative;
      margin: 0;
      margin-left: 20px;
      &::after {
        content: "";
        position: absolute;
        left: -20px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: block;
        width: 8px;
        height: 8px;
        background-color: $font-color-main;
        border-radius: 8px;
      }
    }
    .item_title {
      margin-left: 20px;
      margin-bottom: 15px;
      line-height: 24px;
      color: $font-color-main;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>