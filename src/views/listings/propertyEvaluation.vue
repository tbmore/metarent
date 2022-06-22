<template>
  <a-row class="detailed_default property_evaluation w100"
         justify="start"
         align="top"
         :getter="24">
    <!-- 入住须知 -->
    <a-col class="_evaluation w100"
           id="Property evaluation">
      <a-card :bordered="false">
        <template #title>
          Property evaluation
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
          <template v-for="item in 5"
                    :key="item">
            <a-row class="content">
              <a-row class="item_content">
                <img src="@/assets/images/smooth.jpg" />
                <a-row class="item_content_info"
                       justify="space-between">
                  <a-col>Additional rules</a-col>
                  <a-col>2022-12-12</a-col>
                </a-row>
              </a-row>
              <div class="item_title"
                   :contenteditable="editable">Do not bring pungent smelling food into the room</div>
            </a-row>
          </template>
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
.property_evaluation {
  text-align: left;
  max-height: calc(100vh - 133px);
  overflow-y: auto;
  box-sizing: border-box;
  padding-right: 16px;

  ._evaluation {
    :deep(.ant-card-body) {
      padding-left: 0;
      padding-right: 0;
    }
    .content {
      flex-direction: column;
      padding: 18px 0;
      border-bottom: 1px solid $background-color-minor;
      &:first-child{
          padding-top: 0;
      }
    }
    .item_content {
      font-size: 14px;
      padding: 0 26px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        overflow: hidden;
        object-fit: cover;
      }
      .item_content_info {
        flex-direction: column;
        margin-left: 11px;
        > :last-child {
          color: $font-color-minor;
          font: 400 12px/14px "Roboto-Regular", Roboto;
        }
      }
    }
    .item_title {
      margin-left: 51px;
      line-height: 24px;
      padding: 0 26px;
      color: $font-color-main;
      font: 400 12px/14px "Roboto-Regular", Roboto;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>