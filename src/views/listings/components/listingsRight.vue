<template>
  <div class="right">
    <a-row align="middle"
           justify="space-between"
           class="right_title">
      <a-col>Conditional filter</a-col>
      <a-button type="text"
                class="">{{t('reset')}}
      </a-button>

    </a-row>
    <a-space direction="vertical"
             :size="12"
             align="start"
             class="w100">
      <a-input v-model:value="searchValue"
               placeholder="Search"
               class="right_search">
        <template #suffix>
          <search-outlined />
        </template>
      </a-input>
      <a-collapse v-model:activeKey="activeKey"
                  :bordered="false"
                  expandIconPosition="right"
                  ghost>
        <template #expandIcon="{ isActive }">
          <down-outlined :rotate="isActive ? 180 : 0" />
        </template>
        <a-collapse-panel key="Status"
                          :class="['search_item',{'has_status':statusHeader!='status'}]"
                          :header="statusHeader">
          <a-list size="small"
                  :data-source="['status','Auditing','Hosting','Listed','Unlisted','Unfinished']">
            <template #renderItem="{ item }">
              <a-list-item>{{ item }}</a-list-item>
            </template>
          </a-list>
        </a-collapse-panel>
        <a-collapse-panel key="Rooms"
                          :class="['search_item','search_item_rooms',{'has_rooms':roomsData.find(v=>v.count>0)}]"
                          header="Rooms">
          <a-list size="small"
                  :data-source="roomsData">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-tag color="#DBDEFF"
                       class=""
                       @click="minusBtn(item)">
                  <template #icon>
                    <minus-outlined />
                  </template>
                </a-tag>
                <listings-rooms-icon class="search_item_rooms_icon"
                                     :roomsinfo="item" />
                <a-tag color="#DBDEFF"
                       class=""
                       @click="plusBtn(item)">
                  <template #icon>
                    <plus-outlined />
                  </template>
                </a-tag>
              </a-list-item>
            </template>
            <template #footer>
              <a-button type="text"
                        class="search_item_rooms_reset">{{t('reset')}}
              </a-button>
              <a-button type="primary"
                        class="search_item_rooms_ok">{{t('ok')}}
              </a-button>
            </template>
          </a-list>
        </a-collapse-panel>
        <a-collapse-panel key="Instant book"
                          :class="['search_item',{'has_instant_book':instantBookHeader!='Instant book'}]"
                          :header="instantBookHeader">
          <a-list size="small"
                  :data-source="['Instant book','Auditing','Hosting','Listed','Unlisted','Unfinished']">
            <template #renderItem="{ item }">
              <a-list-item>{{ item }}</a-list-item>
            </template>
          </a-list>
        </a-collapse-panel>
        <a-collapse-panel key="location"
                          :class="['search_item',{'has_location':locationHeader!='location'}]"
                          :header="locationHeader">
          <a-list size="small"
                  :data-source="['location','Auditing','Hosting','Listed','Unlisted','Unfinished']">
            <template #renderItem="{ item }">
              <a-list-item>{{ item }}</a-list-item>
            </template>
          </a-list>
        </a-collapse-panel>
      </a-collapse>
    </a-space>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import listingsRoomsIcon from "./listingsRoomsIcon.vue";
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
import {
  DownOutlined,
  SearchOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons-vue";

interface roomsDataType {
  count: number;
  names: "BEDROOMS" | "BEDS" | "BATHS";
}

export default defineComponent({
  name: "TopMenu",
  components: {
    ALink,
    listingsRoomsIcon,
    DownOutlined,
    SearchOutlined,
    MinusOutlined,
    PlusOutlined,
  },
  setup() {
    const { t } = useI18n();
    const searchValue = ref<string>("");
    const route = useRoute();
    const activeKey = ref<string[]>([]);
    const roomsData = reactive<roomsDataType[]>([
      { count: 0, names: "BEDROOMS" },
      { count: 0, names: "BEDS" },
      { count: 0, names: "BATHS" },
    ]);

    const statusHeader = ref<string>("status");
    const instantBookHeader = ref<string>("Instant book");
    const locationHeader = ref<string>("location");

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

    const minusBtn = (item: roomsDataType): void => {
      console.log(item);
      if (item.count == 0) return;
      item.count--;
    };
    const plusBtn = (item: roomsDataType): void => {
      console.log(item);
      item.count++;
    };

    const onSearch = (): void => {};
    return {
      t,
      belongTopMenu,
      activeKey,
      searchValue,
      onSearch,
      roomsData,
      minusBtn,
      plusBtn,
      statusHeader,
      instantBookHeader,
      locationHeader,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.right {
  width: 316px;
  flex-shrink: 0;
  margin-left: 12px;
  min-height: 719px;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 0 15px;
  border: 1px solid $background-color-minor;
  :deep(.ant-space-item) {
    width: 100%;
  }
  :deep(.ant-collapse-content) {
    border-top: 1px solid rgba($color: $font-color-minor, $alpha: 0.19);
  }
  :deep(.ant-list-item) {
    justify-content: center;
    border-radius: 6px;
    color: $font-color-minor;
    &:hover {
      cursor: pointer;
      background-color: #dbdeff;
      color: $font-color-fix;
    }
  }
  :deep(.ant-btn-text) {
    color: $font-color-minor;
  }
  .search_item {
    border-radius: 12px;
    margin-bottom: 12px;
    width: 100%;
    background-color: #e9ebff;
    :deep(.ant-collapse-header) {
      padding-left: 18px;
      color: $font-color-minor;
    }
    :deep(.ant-collapse-content .ant-collapse-content-box) {
      padding: 3px 9px 13px;
    }
    :deep(.ant-collapse-arrow) {
      right: 9px;
    }
  }
  .right_title {
    margin: 26px 0 22px;
    font-weight: bold;
    font-size: 22px;
    line-height: 24px;
  }
  .right_search {
    height: 40px;
    border-radius: 12px;
    padding: 0 6px 0 18px;
    background-color: #e9ebff;
    align-items: center;
    :deep(.ant-input) {
      background-color: #e9ebff;
    }
    :deep(.ant-input-suffix) {
      background-color: $primary-color;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      justify-content: center;
      align-items: center;
      color: #ffffff;
    }
  }
  .search_item_rooms {
    user-select: none;
    :deep(.ant-list-item) {
      @include pos_center();
      justify-content: space-between;
      padding: 11px 9px;
      &:hover {
        cursor: default;
        background-color: initial;
        color: $font-color-fix;
      }
    }
    :deep(.ant-tag) {
      width: 60px;
      height: 28px;
      color: $font-color-minor;
      border-radius: 6px;
      text-align: center;
      font-size: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    &:deep(.anticon + span) {
      margin: 0;
    }
    :deep(.ant-list-footer) {
      display: flex;
      justify-content: space-between;
      padding: 0 9px;
    }
    .search_item_rooms_reset {
      height: 28px;
      padding-left: 5px;
      padding-right: 5px;
    }
    .search_item_rooms_ok {
      width: 106px;
      height: 28px;
      border-radius: 6px;
    }
    .search_item_rooms_icon {
      color: $font-color-main;
    }
  }
  .has_status,
  .has_rooms,
  .has_instant_book,
  .has_location {
    :deep(.ant-collapse-header) {
      color: $font-color-main;
    }
  }
}
</style>