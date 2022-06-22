<template>
  <a-tag :class="['statue',bottonInfo.value.toLocaleLowerCase().replace(/' '/g,'')]"
         style="backgroupColor:#fff"
         v-if="bottonInfo.type=='status'">
    <slot></slot>
    {{bottonInfo.value}}
  </a-tag>
  <a-tag :class="['btn',bottonInfo.value.toLocaleLowerCase().replace(/' '/g,'')]"
         v-else>
    <slot></slot>
    {{bottonInfo.value}}
  </a-tag>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { useI18n } from "vue-i18n";

interface BreadCrumbsSetupData {
  t: (key: string | number) => string;
}
interface btnType {
  type: "statue" | "btn";
  value: string;
}

export default defineComponent({
  name: "listingsBottons",
  props: {
    bottonInfo: {
      type: Object as PropType<btnType>,
      default: () => {
        return {
          type: "statue",
          value: "",
        };
      },
    },
  },
  components: {},
  setup(props): BreadCrumbsSetupData {
    const { t } = useI18n();
    const { bottonInfo } = toRefs(props);
    return {
      t,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
// 状态类型
.auditing {
  color: #ffa300;
  border-color: #ffa300;
}
.listed {
  color: $minor-color-minor;
  border-color: $minor-color-minor;
}
.unlisted {
  color: $font-color-nomal;
  border-color: $font-color-nomal;
}
.auditfailed {
  color: $minor-color-last;
  border-color: $minor-color-last;
}
.unfinished {
  color: $primary-color;
  border-color: $primary-color;
}

// 按键类型
.btn {
  width: 108px;
  height: 38px;
  border-radius: 8px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
}
.check,
.modify {
  background-color: $primary-color;
}
.submit {
  background-color: $minor-color-minor;
}
.continue {
  background-color: $minor-color-main;
}
.offline {
  color: $font-color-minor;
  background-color: #ffffff;
}
</style>