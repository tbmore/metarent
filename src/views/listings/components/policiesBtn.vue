<template>
  <a-row class="policies_btn"
         justify="center"
         align="middle">
    <a-row class="policies_btn_icon">
      <slot></slot>
    </a-row>
    <a-row class="policies_btn_info"
           justify="space-between">
      <a-col>{{btnInfo.title}}</a-col>
      <a-col>{{btnInfo.value}}</a-col>
    </a-row>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

interface listingsRoomsIconSetupData {
  t: (key: string | number) => string;
}
interface BtnInfoType {
  title: string;
  value: string;
}

export default defineComponent({
  name: "listingsRoomsIcon",
  props: {
    btnInfo: {
      type: Object as PropType<BtnInfoType>,
      default: () => {
        return {
          title: "",
          value: "",
        };
      },
    },
  },
  components: {},
  setup(): listingsRoomsIconSetupData {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.policies_btn {
  .policies_btn_icon {
    @include pos_center;
    width: 38px;
    height: 38px;
    border-radius: 12px;
    margin-right: 6px;
    background-color: $background-color-minor;
  }
  .policies_btn_info {
    flex-direction: column;
    font: bold 14px/16px "DIN-Bold", DIN;
    :last-child {
      color: $primary-color;
    }
  }
}
</style>
