<template>
  <a-config-provider :locale="antdLocales">
    <router-view></router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { antdMessages } from "@/i18n/index";
import { setHtmlLang } from "@/utils/i18n";
import { useI18n } from "vue-i18n";
export default defineComponent({
  name: "MetaRent",
  setup() {
    const { locale } = useI18n();
    const antdLocales = computed(() => antdMessages[locale.value]);

    const getFont = () => {
      (function (doc, win) {
        var baseFontSize = 100;
        var baseWidth = 750;
        var docEl = doc.documentElement,
          resizeEvt =
            "orientationchange" in window ? "orientationchange" : "resize",
          recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;

            if (clientWidth < 750) {
              docEl.style.fontSize = 100 * (clientWidth / 750) + "px";
            } else {
              docEl.style.fontSize = 100 + "px";
            }
          };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener("DOMContentLoaded", recalc, false);
      })(document, window);
    };

    onMounted(() => {
      setHtmlLang(locale.value);
      //   getFont();
    });

    return {
      antdLocales,
      getFont,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/css/global.scss";
html,
body {
  @include scrollbar($background-color-minor);
}
#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $font-color-main;
  min-width: $default-width;
  max-width: 1920px;
  min-height: 100%;
  position: relative;
  font-size: $font-size-base;
}

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
