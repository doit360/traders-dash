<template>
  <Tile :position="position" flat class="tile-twitter-timeline">
    <a
      class="twitter-timeline"
      data-color="#ffffff"
      data-theme="dark"
      data-chrome="transparent"
      href="https://twitter.com/whale_alert?ref_src=twsrc%5Etfw"
    >Tweets by whale_alert</a>
  </Tile>
</template>

<script>
import Tile from "../atoms/Tile";

const SCRIPT_ID = "twitter-timeline";

export default {
  name: "TwitterTimeline",
  props: {
    position: String
  },
  components: { Tile },
  methods: {
    canUseDOM() {
      return (
        typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
      );
    },
    getScriptElement() {
      return document.getElementById(SCRIPT_ID);
    },
    updateOnloadListener(onload) {
      const script = this.getScriptElement();
      const oldOnload = script.onload;
      return (script.onload = () => {
        oldOnload();
        onload();
      });
    },
    scriptExists() {
      return this.getScriptElement() !== null;
    },
    appendScript(onload) {
      if (!this.canUseDOM()) {
        onload();
        return;
      }

      if (this.scriptExists()) {
        if (typeof TradingView === "undefined") {
          this.updateOnloadListener(onload);
          return;
        }
        onload();
        return;
      }
      const script = document.createElement("script");

      script.id = SCRIPT_ID;
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://platform.twitter.com/widgets.js";
      script.onload = onload;
      script.textContent = JSON.stringify(this.options);

      document.documentElement.appendChild(script);
      script.parentNode.removeChild(script);
    }
  },
  mounted() {
    setTimeout(() => {
      this.appendScript(() => {});
    }, 300);
  }
};
</script>

<style lang="scss">
  .tile-twitter-timeline {
    border: 1px solid #363c4e !important;
  }
</style>
