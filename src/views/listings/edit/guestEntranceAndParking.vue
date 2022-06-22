<template>
  <a-row class="guest_entrance_and_parking">
    <accessibility :accessibility="{
        title:'Guest Entrance and Parking',
        describe:'Have a private driveway with a width of at least 3.4 meters, or clearly marked parking spaces for people with disabilities.',
        imgArr:[,,,]
        }"></accessibility>
    <accessibility :accessibility="{
        title:'Well lit guest entryway',
        describe:'Street lights are provided on the sidewalk or passageway at the entrance to the property, so that guests can see the road clearly at night',
        imgArr:[,]
        }"></accessibility>
    <accessibility :accessibility="{
        title:'Guest entryway without steps',
        describe:'External aisles (such as driveways or walkways) leading to guest entrances are at least 82 cm wide and flat, with no or very little slope',
        imgArr:[,]
        }"></accessibility>
    <accessibility :accessibility="{
        title:'Guest entrance without steps',
        describe:'There are no steps or thresholds higher than 5 cm at the guest entrance',
        imgArr:[]
        }"></accessibility>
    <accessibility :accessibility="{
        title:'Guest entrances over 81 cm wide',
        describe:'The main guest entrance for guests to enter the listing must be at least 81 cm wide',
        imgArr:[]
        }"></accessibility>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
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

import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
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
    listingsRoomsIcon,
    accessibility,
  },
  setup() {
    const { t } = useI18n();
    const route = useRoute();
    // 所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);
    // 框架所有的路由转成json并统一添加了parentPath
    const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData);
    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() =>
      getJsonRouteItem(route.path, jsonPathRoutes)
    );

    // 左侧选择菜单key

    const editEvent = () => {};

    return {
      t,
      routeItem,
      editEvent,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.guest_entrance_and_parking {
  position: relative;
  padding-bottom: 60px;
}
</style>