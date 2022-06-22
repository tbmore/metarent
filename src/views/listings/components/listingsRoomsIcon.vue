<template>
  <div class="icon">
    <div>
      <iconpark-icon class="icon_item"
                     size="24"
                     name="building-four"
                     v-if="roomsinfo.names=='BEDROOMS'"></iconpark-icon>
      <iconpark-icon class="icon_item"
                     size="24"
                     name="single-bed"
                     v-else-if="roomsinfo.names=='BEDS'"></iconpark-icon>
      <iconpark-icon class="icon_item"
                     size="24"
                     name="toilet"
                     v-else></iconpark-icon>
    </div>
    <div class="icon_name">{{t(`page.listings.icon.name.${roomsinfo.names}`)}}</div>
    <div class="icon_count">{{roomsinfo.count}}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useI18n } from "vue-i18n";

interface listingsRoomsIconSetupData {
  t: (key: string | number) => string;
}
interface RoomsinfoType {
  count: number;
  names: "BEDROOMS" | "BEDS" | "BATHS";
}

export default defineComponent({
  name: "listingsRoomsIcon",
  props: {
    roomsinfo: {
      type: Object as PropType<RoomsinfoType>,
      default: () => {
        return {
          count: 1,
          names: "BEDROOMS",
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
.icon {
  position: relative;
  width: 89px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-family: "DIN-Bold";
  .icon_count {
    position: absolute;
    right: 58px;
    top: 1px;
    line-height: 24px;
    font-size: 20px;
    font-weight: bold;
  }
  .icon_name {
    font-size: 12px;
    font-weight: bold;
  }
}
</style>