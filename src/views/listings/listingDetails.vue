<template>
  <a-row class="detailed_default listing_details w100"
         justify="start"
         align="top"
         :getter="24">
    <!-- 图片介绍 -->
    <a-col class="photos w100"
           id="Photos">
      <a-space :size="20"
               align="start">
        <img src="@/assets/images/smooth.jpg"
             v-for="img in 5"
             :key="img">
      </a-space>
      <span class="right_btn h100">
        <right-outlined :style="{fontSize: '24px' ,cursor:'pointer'}" />
      </span>
    </a-col>
    <!-- 房源基本情况 -->
    <a-col class="listing_basics w100"
           id="Listing basics">
      <a-card :bordered="false">
        <template #title>
          The basic situation of the property
        </template>
        <template #extra>
          Display language
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
              English
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
          <div class="item_title">Listing title</div>
          <div class="item_content"
               :contenteditable="editable">Fresh downtown, less Muji wind / close to subway 10 / direct to </div>
          <div class="item_title">Capacity of listing</div>
          <div class="item_content"
               :contenteditable="editable">
            <a-space :size="15">
              <template v-for="idx in 5"
                        :key="idx">
                <iconpark-icon name="conditioner"></iconpark-icon>
              </template>
              <span>{{5}}</span>
            </a-space>
          </div>
          <div class="item_title">Create your description</div>
          <div class="item_content"
               :contenteditable="editable">Located in the CBD area, rent-free for the first half year, and a monthly reward of 888 yuan for the second half of the year, welcome to bring your family and friends to stay</div>
        </div>
      </a-card>
    </a-col>
    <!-- 便利设施 -->
    <a-col class="amenities w100"
           id="Amenities">
      <a-card :bordered="false">
        <template #title>
          Conveniences
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
          <div class="item_content"
               :contenteditable="editable">
            <template v-for="icon in 8"
                      :key="icon">
              <a-row class="conveniences_content">
                <iconpark-icon size="32"
                               name="conditioner"></iconpark-icon>
                <span>wifi</span>
              </a-row>
            </template>
          </div>
        </div>
      </a-card>
    </a-col>
    <!-- 位置 -->
    <a-col class="location w100"
           id="Location">
      <a-card :bordered="false">
        <template #title>
          Location
        </template>
        <template #extra>
          <a-button type="text"
                    v-if="editable">
            Edit
          </a-button>
        </template>
        <div class="maps"><img src="@/assets/images/smooth.jpg"></div>
        <a-row class="content">
          <a-col>
            <div class="item_title">Address</div>
            <div class="item_content"
                 :contenteditable="editable">Shangsheng New Institute, Changning District, Shanghai
            </div>
          </a-col>
          <a-col>
            <div class="item_title">Introduce surrounding</div>
            <div class="item_content"
                 :contenteditable="editable">Located in the CBD area, rent-free for the first half year, and a monthly reward of 888 yuan for the second half of the year, welcome to bring your family and friends to stay
            </div>
          </a-col>
          <a-col>
            <div class="item_title">Getting around</div>
            <div class="item_content"
                 :contenteditable="editable">Located in the CBD area 345M
            </div>
          </a-col>
          <a-col>
            <div class="item_title">Scenic views</div>
            <div class="item_content"
                 :contenteditable="editable">CBD KFC KOK
            </div>
          </a-col>
        </a-row>
      </a-card>

    </a-col>
    <!-- 房源和房间 -->
    <a-col class="property_and_rooms w100"
           id="Property and rooms">
      <a-card :bordered="false">
        <template #title>
          Property and rooms
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

          <div class="item_content"
               :contenteditable="editable">
            <span class="">Apartment</span>
            <span class="">An entire place</span>
            <span class="">56 m³</span>
          </div>
        </div>
      </a-card>
      <a-card :bordered="false">
        <template #title>
          Rooms and spaces
        </template>
        <template #extra>
        </template>
        <div>
          <a-row class="item_content"
                 :contenteditable="editable">
            <listings-rooms-icon :roomsinfo="{count:1,names:'BEDROOMS'}"></listings-rooms-icon>
            <listings-rooms-icon :roomsinfo="{count:1,names:'BEDS'}"></listings-rooms-icon>
            <listings-rooms-icon :roomsinfo="{count:1,names:'BATHS'}"></listings-rooms-icon>
            <listings-rooms-icon :roomsinfo="{count:1,names:'BATHS'}"></listings-rooms-icon>
          </a-row>
        </div>
      </a-card>
    </a-col>
    <!-- 无障碍设施 -->
    <a-col class="accessibility w100"
           id="Accessibility">
      <a-card :bordered="false">
        <template #title>
          Accessibility
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
          <div class="item_content">Guest Entrance and Parking</div>
          <div class="item_title"
               :contenteditable="editable">Accessible parking spaces</div>
          <div class="item_content">BEDROOMS</div>
          <div class="item_title"
               :contenteditable="editable">24 hours hot water, panoramic windows, aurora sunroof</div>
        </div>
      </a-card>
    </a-col>
    <!-- 房客安全 -->
    <a-col class="guest_safety w100"
           id="Guest safety">
      <a-card :bordered="false">
        <template #title>
          Guest safety
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
          <div class="item_content">Pool/Hot Tub without doors or locks</div>
          <div class="item_title"
               :contenteditable="editable">Accessible parking spaces</div>
          <div class="item_content">Lakes, rivers, other bodies of water nearby</div>
          <div class="item_title"
               :contenteditable="editable">24 hours hot water, panoramic windows, aurora sunroof</div>
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
.listing_details {

  .photos {
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: flex-start;
    img {
      width: 272px;
      height: 168px;
      object-fit: cover;
      border-radius: 12px;
      background-color: #eef2ff;
      overflow: hidden;
    }
    .right_btn {
      @include pos_center;
      width: 146px;
      position: absolute;
      right: -20px;
      top: 0;
      background: linear-gradient(
        270deg,
        #ffffff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
  .listing_basics {
    width: 100%;
  }
  .amenities {
    .conveniences_content {
      display: inline-flex;
      flex-direction: column;
      margin-right: 46px;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: $font-color-main;
      line-height: 16px;
    }
  }
  .location {
    .maps {
      width: 350px;
      height: 328px;
      border-radius: 12px;
      overflow: hidden;
      margin-right: 24px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .content {
      flex-direction: column;
      justify-content: space-around;
    }
    :deep(.ant-card-body) {
      display: flex;
      padding: 8px;
    }
  }
  .property_and_rooms {
    .item_content {
      span {
        margin: 11px 12px;
        display: inline-block;
        padding: 10px 16px;
        margin-left: 0;
        border-radius: 12px;
        background-color: $background-color-main;
      }
    }
  }
  .accessibility,
  .guest_safety {
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
      color: $font-color-main;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>