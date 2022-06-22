<template>
  <!-- 无障碍设施 适应性设备 -->
  <a-row class="adaptive_equipment">
    <accessibility :accessibility="{
        title:'Pool or hot tub lift',
        describe:'Special equipment to assist people with reduced mobility in accessing the pool or hot tub',
        }"
                   v-model:checked="data.a.checked"
                   v-model:imgArr="data.a.imgArr"></accessibility>
    <accessibility :accessibility="{
        title:'Ceiling or mobile lift',
        describe:'There are special equipment to help people with reduced mobility in and out of wheelchairs. Can be fixed to the ceiling or can be a freestanding lift',
        }"
                   v-model:checked="data.b.checked"
                   v-model:imgArr="data.b.imgArr"></accessibility>
  </a-row>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, warn, watch } from "vue";
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
    const data = reactive({
      a: {
        checked: true,
        imgArr: [, ,],
      },
      b: {
        checked: true,
        imgArr: [, ,],
      },
    });
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

    watch(data.a, (val) => {
      console.log(val, "watch:v-model");
    });

    return {
      t,
      routeItem,
      editEvent,
      data,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.adaptive_equipment {
  position: relative;
  padding-bottom: 60px;
}
</style>