<template>
  <div class="detailed"
       ref="detailed">
    <detailedHeader :breadCrumbs="[{title:'Located in the CBD area',path:'/listings/index',noLocales:true}]"
                    class="detailed_header">
      <a-space :size="10">
        <a-button>
          <template #icon>
            <iconpark-icon size="20"
                           name="conditioner"></iconpark-icon>
          </template>
          Submit
        </a-button>
        <a-button danger>
          <template #icon>
            <iconpark-icon size="20"
                           name="conditioner"></iconpark-icon>
          </template>
          Delete
        </a-button>
        <a-button type="primary"
                  @click="editEvent">
          <template #icon>
            <iconpark-icon size="20"
                           name="conditioner"></iconpark-icon>
          </template>
          Edit
        </a-button>
        <a-button type="primary"
                  style="color:#ffffff;background-color:#00B38A;border-color:#00B38A">
          <template #icon>
            <iconpark-icon size="20"
                           name="conditioner"></iconpark-icon>
          </template>
          Submit
        </a-button>
      </a-space>
    </detailedHeader>
    <a-row class="detailed_content"
           justify="start"
           align="top">
      <!-- 房源详细查看 左边列表 -->
      <a-anchor :affix="true"
                :getContainer="()=>detailed"
                class="detailed_anchor"
                :bounds="0">
        <a-menu :open-keys="openKeys"
                v-model:selectedKeys="selectedKeys"
                mode="inline"
                triggerSubMenuAction="click"
                class="detailed_menu"
                @openChange="openChange"
                :inlineIndent="13">
          <!-- <template v-for="[keyname,value] in anchor.entries()"
                    :key="keyname">
            <a-sub-menu popupClassName="item_sub_menu"
                        v-if="value.length"
                        :key="`/listings/detailed/${strCamelCase(keyname)}`">
              <template #title>
                {{keyname}}
              </template>
              <a-menu-item v-for="item in value"
                           :key="item.path">
                <a-anchor-link :href="item.path"
                               :title="item.title">
                </a-anchor-link>

              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else
                         :key="`/listings/detailed/${strCamelCase(keyname)}`">{{keyname}}</a-menu-item>
          </template> -->

          <a-sub-menu popupClassName="item_sub_menu"
                      v-for="[keyname,value] in anchor.entries()"
                      :key="`/listings/detailed/${strCamelCase(keyname)}`">
            <template #title>
              {{keyname}}
            </template>
            <template v-if="value.length">
              <a-menu-item v-for="item in value"
                           :key="item.path">
                <!-- <router-link :to="{path:list[0],hash:item.path}">{{item.title}}</router-link> -->
                <a-anchor-link :href="item.path"
                               :title="item.title">
                </a-anchor-link>
              </a-menu-item>
            </template>
            <template v-else>
              <a-menu-item :key="`#${keyname}`"
                           style="display:none"></a-menu-item>
            </template>
          </a-sub-menu>
        </a-menu>
      </a-anchor>
      <!-- 房源详细查看 右边搜索 -->
      <router-view v-slot="{ Component,route }">
        <keep-alive>
          <component :is="Component"
                     :key="route.meta.usePathKey ? route.path : undefined" />
        </keep-alive>
      </router-view>
    </a-row>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";
import BreadCrumbs from "@/components/BreadCrumbs/index.vue";
import detailedHeader from "./components/detailedHeader.vue";
import { useRoute, useRouter } from "vue-router";
import {
  formatRoutePathTheParents,
  getBreadcrumbRoutes,
  getJsonRouteItem,
  getRouteBelongTopMenu,
  getSelectLeftMenuPath,
  jsonPathVueRoutes,
  PathJsonRoutesDataItem,
  RoutesDataItem,
  vueRoutes,
} from "@/utils/router";
import IndexLayoutRoutes from "@/router/HomeLayoutRoutes";
import {
  anchor,
  urlToHash,
  checkHash,
  strCamelCase,
} from "./composables/anchor";

export default defineComponent({
  name: "Detailed",
  components: {
    ALink,
    BreadCrumbs,
    detailedHeader,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const detailed = ref(null);

    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);
    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);
    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );

    const selectLeftMenuPath = getSelectLeftMenuPath(routeItem.value);
    const openKeys = ref<string[]>([selectLeftMenuPath]);

    // 左侧选择菜单key
    const selectedKeys = ref<string[]>([route.hash]);

    const openChange = (openKey: any) => {
      const latestOpenKey = openKey.find(
        (key: string) => openKeys.value.indexOf(key) === -1
      );
      const arr = [...anchor.keys()].map(
        (item) => `/listings/detailed/${strCamelCase(item)}`
      );
      //   if (arr.indexOf(latestOpenKey!) === -1) {
      //     openKeys.value = openKey;
      //   } else {
      //     openKeys.value = latestOpenKey ? [latestOpenKey] : [];
      //   }
      if (latestOpenKey) {
        router.push({ path: latestOpenKey, hash: urlToHash(latestOpenKey) });
        // selectedKeys.value = [urlToHash(latestOpenKey)];
      }
    };
    const editEvent = () => {};

    // 监听路由变化 设置菜单选择
    watch(route, (value) => {
      const hash = value.hash;
      selectedKeys.value = [hash];
      openKeys.value = [value.path];
    });

    return {
      t,
      selectedKeys,
      openKeys,
      anchor,
      routeItem,
      detailed,
      strCamelCase,
      openChange,
      editEvent,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./index.scss";
.detailed {
  position: relative;
  padding: 0 70px;
}
.detailed_header {
  :deep(.ant-btn) {
    @include pos_center;
    width: 108px;
    height: 36px;
    border-radius: 8px;
    font-weight: bold;
  }
}
.detailed_content {
  flex-wrap: nowrap;
}
.detailed_anchor {
  width: 312px;
  border-radius: 16px;
  border: 1px solid $background-color-minor;
  margin-right: 16px;
  overflow: hidden;
  flex-shrink: 0;
}
.detailed_menu {
  font: 500 18px/24px "Roboto-Medium", Roboto;
  color: $font-color-main;
  user-select: none;
}
.popupClassName {
  color: red;
}
// 修改菜单样式 a-menu
:deep(.ant-menu-sub.ant-menu-inline) {
  background-color: #ffffff;
  border-top: 1px solid $background-color-minor;
}
:deep(.ant-menu-submenu-title) {
  padding-left: 26px !important;
}

:deep(.ant-menu-item a:hover) {
  color: initial;
}
:deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
  background-color: initial;
}

:deep(.ant-menu-sub.ant-menu-inline > .ant-menu-item),
:deep(.ant-menu-sub.ant-menu-inline
    > .ant-menu-submenu
    > .ant-menu-submenu-title) {
  height: 42px;
  padding: 0 10px !important;
}
:deep(.ant-menu-item .ant-menu-title-content) {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  &:hover {
    background-color: $background-color-minor;
    border-radius: 8px;
    //   opacity: 0.5;
    color: initial;
  }
  .ant-anchor-link,
  a {
    width: 100%;
    height: 100%;
    line-height: 42px;
  }
}
:deep(.ant-menu-submenu-title .ant-menu-title-content a),
:deep(.ant-anchor-link-active > .ant-anchor-link-title) {
  color: inherit;
}
:deep(.ant-anchor-ink) {
  display: none;
}

:deep(.ant-menu-submenu-selected
    .ant-menu-submenu-title
    > .ant-menu-submenu-arrow) {
  color: $primary-color;
}

:deep(.ant-anchor-link) {
  padding: 0;
}

:deep(.ant-menu-vertical .ant-menu-item::after),
:deep(.ant-menu-vertical-left .ant-menu-item::after),
:deep(.ant-menu-vertical-right .ant-menu-item::after),
:deep(.ant-menu-inline .ant-menu-item::after) {
  left: 0;
  right: initial;
  width: 6px;
  height: 22px;
  border-radius: 3px;
  border: none;
  background-color: $primary-color;
  margin: auto;
}
</style>