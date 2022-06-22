<template>
  <!-- 无障碍设施 房间 -->
  <a-row class="bedroom">
    <accessibility :accessibility="{
        title:'Stepless passage',
        describe:'The room is located on the first floor or can be accessed by lift or ramp. There are no stairs, steps or thresholds greater than 5 cm from the entrance to the room',
        imgArr:[,]
        }"></accessibility>
    <accessibility :accessibility="{
        title:'Entry width over 81 cm',
        describe:'Room entrance or passage is at least 81 cm wide',
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
.bedroom {
  position: relative;
  padding-bottom: 60px;
}
</style>