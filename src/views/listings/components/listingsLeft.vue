<template>
  <div class="left"
       ref="left">
    <template v-for="(data,idx) in listingArrData"
              :key="idx">
      <div class="item">
        <div class="item_info">
          <div class="detailed">
            <div class="detailed_top">
              <div class="detailed_time">2022/05/28 18:24:35</div>
              <div class="detailed_describe">Fresh downtown, less Muji wiFresh downtown, less Muji wiFresh downtown, less Muji wind / close to subway 10 / direct to </div>
            </div>
            <div class="detailed_bottom">
              <div class="detailed_addr">
                <iconpark-icon name="local"></iconpark-icon><span>Shanghai, China</span>
              </div>
              <a-space class="detailed_status"
                       :size="10">
                <listings-bottons :bottonInfo="{type:'status',value:'Audit failed'}" />
                <listings-bottons :bottonInfo="{type:'status',value:'Unfinished'}" />
              </a-space>
            </div>
          </div>
          <div class="item_info_edit">
            <div class="item_info_edit_icon">
              <listings-rooms-icon :roomsinfo="{count:1,names:'BEDROOMS'}"></listings-rooms-icon>
              <listings-rooms-icon :roomsinfo="{count:1,names:'BEDS'}"></listings-rooms-icon>
              <listings-rooms-icon :roomsinfo="{count:1,names:'BATHS'}"></listings-rooms-icon>
            </div>
            <div class="item_info_edit_btn">
              <a-tag class="item_info_edit_btn_data">
                <template #icon>
                  <iconpark-icon name="inspection-5ech1lnh"></iconpark-icon>
                </template>
              </a-tag>
              <listings-bottons :bottonInfo="{type:'btn',value:btnStyle[idx].value}"
                                @click="btnClick(data)" />
              <listings-bottons :bottonInfo="{type:'btn',value:btnStyle[idx+1].value}"
                                @click="btnClick(data)" />
              <!-- <a-button class="item_info_edit_btn_data">
                    <template #icon>
                      <iconpark-icon name="inspection-5ech1lnh"></iconpark-icon>
                    </template>
                  </a-button>
                  <a-button type="default"
                            class="item_info_edit_btn_item">Offline
                  </a-button>
                  <a-button type="primary"
                            class="item_info_edit_btn_item">Check
                  </a-button> -->
            </div>
          </div>
        </div>
        <div class="item_img">
          <img src="@/assets/images/smooth.jpg">
          <!-- 颜色状态 hosting available closed booked -->
          <div class="room_status closed">Hosting</div>
        </div>
      </div>
    </template>
    <!-- 搜索为空 或 没有房源时显示 -->
    <a-result class="list_null"
              v-if="!listingArrData.length"
              :title="!searchStatus ? t('page.listings.listings.null') : t('page.listings.search.null')">
      <template #icon>
        <img :src="!searchStatus ? listingsNull : searchNull">
      </template>
    </a-result>
    <!-- 下架弹窗 -->
    <a-modal :visible="removeList"
             centered
             :closable="false"
             :getContainer="left"
             width="554px"
             wrapClassName="remove_modal"
             :bodyStyle="{display:'flex',padding:'30px 26px 0 30px'}"
             @ok="1">
      <img :src="removePng"
           class="remove_list_logo">
      <a-row class="remove_list_content">
        <a-col>{{t('page.listings.listingsleft.remove.title')}}</a-col>
        <a-col>{{t('page.listings.listingsleft.remove.content')}}</a-col>
      </a-row>
      <template #footer>
        <a-button key="back"
                  @click="removeList=false">{{t('cancel')}}</a-button>
        <a-button key="submit"
                  type="primary"
                  @click="'handleOk'">{{t('ok')}}</a-button>
      </template>
    </a-modal>

  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import listingsRoomsIcon from "./listingsRoomsIcon.vue";
import listingsLeft from "./listingsLeft.vue";
import listingsRight from "./listingsRight.vue";
import listingsBottons from "./listingsBottons.vue";
import { useRoute } from "vue-router";

import {
  getJsonRouteItem,
  getRouteBelongTopMenu,
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";
import { DownOutlined, SearchOutlined } from "@ant-design/icons-vue";

import removePng from "@/assets/images/listings/remove.png";
import listingsNull from "@/assets/images/listings/listings_null.png";
import searchNull from "@/assets/images/listings/search_null.png";

interface btnStyleType {
  color: "#B2B4CA" | "#00B38A" | "#0084FF" | "#FFFFFF" | "#FF7700";
  value: "Submit" | "Check" | "Modify" | "Offline" | "Continue";
}

export default defineComponent({
  name: "TopMenu",
  components: {
    ALink,
    listingsRoomsIcon,
    listingsLeft,
    listingsRight,
    listingsBottons,
    DownOutlined,
    SearchOutlined,
  },
  setup() {
    const { t } = useI18n();
    const current = ref<string[]>(["mail"]);
    const userinfo = ref<string>("");
    const searchValue = ref<string>("");
    const removeList = ref<boolean>(false);
    const searchStatus = ref<boolean>(false);
    const left = ref(null);

    const route = useRoute();
    const listingArrData = reactive([
      { a: 1 },
      { a: 3 },
      { a: 7 },
      { a: 9 },
      { a: 5 },
    ]);

    const btnStyle = ref<btnStyleType[]>([
      { color: "#B2B4CA", value: "Submit" },
      { color: "#00B38A", value: "Submit" },
      { color: "#0084FF", value: "Check" },
      { color: "#0084FF", value: "Modify" },
      { color: "#FFFFFF", value: "Offline" },
      { color: "#FF7700", value: "Continue" },
    ]);
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

    // 房源操作 发布中 发布 查看 编辑 下架 继续完善
    const btnClick = (data): void => {
      console.log(this, data);
    };

    const onSearch = (): void => {};
    return {
      t,
      current,
      userinfo,
      belongTopMenu,
      listingArrData,
      searchValue,
      onSearch,
      btnStyle,
      btnClick,
      removePng,
      removeList,
      left,
      listingsNull,
      searchNull,
      searchStatus,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.left {
  width: 100%;
  .item {
    border-radius: 12px;
    border: 1px solid $background-color-minor;
    padding: 14px;
    padding-left: 18px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;

    .item_img {
      border-radius: 12px;
      overflow: hidden;
      width: 272px;
      height: 168px;
      flex-shrink: 0;
      position: relative;
      color: #ffffff;
      line-height: 1;
      img {
        border-radius: 12px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .room_status {
        position: absolute;
        right: 8px;
        top: 8px;
        width: 81px;
        height: 26px;
        background-color: rgba($color: #000000, $alpha: 0.79);
        border-radius: 8px;
        padding: 6px;
        padding-left: 24px;
        font-size: 12px;
        text-align: left;
        &::after {
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: absolute;
          left: 10px;
          top: 0;
          bottom: 0;
          margin: auto;
          background-color: $minor-color-minor;
        }
        &.hosting::after {
          background-color: $minor-color-minor;
        }
        &.available::after {
          background-color: $primary-color;
        }
        &.closed {
          color: $minor-color-last;
          &::after {
            background-color: $minor-color-last;
          }
        }
        &.booked::after {
          background-color: $minor-color-main;
        }
      }
    }
    .item_info {
      display: flex;
      justify-content: space-between;
      text-align: left;
    }
  }
  .detailed {
    width: 100%;
    margin-right: 17px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .detailed_top {
      .detailed_time {
        color: $font-color-minor;
        height: 16px;
        margin-top: 10px;
        font: 12px/16px "Roboto-Medium", Roboto;
      }
      .detailed_describe {
        height: 56px;
        color: $font-color-fix;
        font: bolder 20px/28px "DIN-Black", DIN;
        @include mul_ellipsis(2);
      }
    }
    .detailed_bottom {
      .detailed_addr {
        // font-size: 18px;
        font-weight: bold;
        display: flex;
        align-items: center;
        line-height: 1;
        color: $font-color-main;
        margin-bottom: 23px;
        :first-child {
          font-size: 20px;
          margin-right: 10px;
        }
      }
      .detailed_status {
        margin-bottom: 5px;
        :deep(.ant-tag) {
          font-size: 12px;
          font-weight: bold;
          line-height: 12px;
          padding: 6px 7px;
          border-radius: 8px;
          margin: 0;
        }
      }
    }
  }
  .item_info_edit {
    width: 274px;
    flex-shrink: 0;
    margin-right: 37px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .item_info_edit_icon {
      display: flex;
      justify-content: flex-end;
      margin-top: 31px;
      color: $font-color-main;
      font-size: 20px;
      > div {
        width: 89px;
        height: 38px;
        border-right: 1px solid #f0f0f0;
        line-height: 1;
        &:last-child {
          border: none;
          margin-right: -20px;
        }
      }
    }
    .item_info_edit_btn {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      > span {
        margin-left: 10px;
        cursor: pointer;
      }
      .item_info_edit_btn_data {
        width: 38px;
        height: 38px;
        border-radius: 8px;
        font-size: 24px;
        text-align: center;
      }
    }
  }
  .remove_list_content {
    flex-direction: column;
    :first-child {
      font: 500 22px/24px "Roboto-Medium", Roboto;
      color: $font-color-fix;
      margin: 11px 0 18px;
    }
    :last-child {
      font: 16px/24px "Roboto-Regular", Roboto;
      color: $font-color-minor;
    }
  }
  :deep(.ant-modal-footer) {
    border-top: none;
    > button {
      height: 38px;
      width: 108px;
      border-radius: 8px;
    }
  }
  :deep(.ant-modal-content) {
    border-radius: 12px;
  }
}
.list_null {
  @include pos_center;
  flex-direction: column;
  padding: 0;
  min-height: 719px;
  :deep(.ant-result-title) {
    font: 16px/24px "Roboto-Regular", Roboto;
    color: $font-color-minor;
    margin-top: 4px;
  }
}
</style>
