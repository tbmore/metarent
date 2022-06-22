<template>
  <span :class="['check_box',{'checked' : checked}]"
        @click="$emit('update:checked', !checked)">
    <iconpark-icon name="check-one-5ceo7la5"
                   class="check_box_icon"
                   size="20"
                   v-show="checked"></iconpark-icon>
  </span>
</template>
<script lang="ts">
import { defineComponent, PropType, toRef, toRefs } from "vue";
export default defineComponent({
  emits: ["update:checked"],
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/global.scss";
.check_box {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid $background-color-minor;
  margin-right: 12px;
  user-select: none;
  cursor: pointer;
  @include pos_center;
  .check_box_icon {
    color: $primary-color;
  }
  &.checked {
    border-color: $primary-color;
  }
}
</style>