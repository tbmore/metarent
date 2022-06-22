<template>
  <!-- 无障碍设施通用组件 -->
  <a-row class="accessibility_comp w100">
    <a-row class="item_title"
           align="middle"><span :class="['check_box',{'checked' : checked}]"
            @click="checkedEvent">
        <iconpark-icon name="check-one-5ceo7la5"
                       class="check_box_icon"
                       size="20"
                       v-show="checked"></iconpark-icon>
      </span><span>{{accessibility.title}}</span></a-row>
    <a-col class="item_content">{{accessibility.describe}}</a-col>
    <a-space class="item_content"
             align="start"
             :size="16">
      <div class="item_list"
           v-for="item in imgArr"
           :key="item">
        <img src="@/assets/images/smooth.jpg">
        <div class="close_bth">
          <iconpark-icon name="add-picture"
                         style="margin-right:3px"></iconpark-icon>
        </div>
      </div>
      <div class="upload_img">
        <iconpark-icon size="28"
                       name="add-picture"></iconpark-icon>
      </div>
    </a-space>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, PropType, toRef, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import ALink from "@/components/ALink/index.vue";

import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import listingsRoomsIcon from "../components/listingsRoomsIcon.vue";

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

interface AccessibilityType {
  title: string;
  describe: string;
  imgArr: string[];
}

interface DataType {
  imgArr: string[];
  checked: boolean;
}

export default defineComponent({
  name: "EditPhoto",
  components: {
    ALink,
    LoadingOutlined,
    PlusOutlined,
    listingsRoomsIcon,
  },
  emits: ["update:checked", "update:imgArr"],
  props: {
    accessibility: {
      type: Object as PropType<AccessibilityType>,
      required: true,
      default: () => {
        return {
          title: "",
          describe: "",
        };
      },
    },
    checked: {
      type: Boolean,
      default: false,
    },
    imgArr: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    // 传值  参考 adaptiveEquipment.vue
    const { t } = useI18n();
    const { accessibility, checked, imgArr } = toRefs(props);
    const checkedEvent = () => {
      emit("update:checked", !checked.value);
    //   const arr = imgArr.value;
    //   emit("update:imgArr", imgArr.value.push("1"));
    };

    return {
      t,
      accessibility,
      checkedEvent,
      checked,
      imgArr,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../index.scss";
.accessibility_comp {
  border: 1px solid $background-color-minor;
  border-bottom: none;
  padding: 18px 26px;
  flex-direction: column;
  &:last-child {
    border-bottom: 1px solid $background-color-minor;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    overflow: hidden;
  }
  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    overflow: hidden;
  }
  .item_title {
    font: 500 18px/24px "Roboto-Medium", Roboto;
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
  }
  .item_content {
    position: relative;
    flex-wrap: wrap;
    font: 14px/18px "Roboto-Regular", Roboto;
    padding-left: 36px;
    &:last-child {
      margin-top: 15px;
    }
  }
  .item_list {
    position: relative;
    img {
      border-radius: 12px;
      overflow: hidden;
      width: 248px;
      height: 140px;
      object-fit: cover;
    }
    .close_bth {
      position: absolute;
      right: 9px;
      top: 9px;
      width: 20px;
      height: 20px;
      @include pos_center;
      background: rgba(255, 255, 255, 1);
      border-radius: 3px;
      //   color: $background-color-minor;
    }
  }
  .upload_img {
    width: 140px;
    height: 140px;
    border-radius: 12px;
    @include pos_center;
    border: 1px dashed $background-color-minor;
    cursor: pointer;
  }
}
</style>