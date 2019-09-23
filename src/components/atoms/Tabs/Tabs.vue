<template>
  <div class="trade-tabs">
    <div class="tabs" :style="{ 'margin-bottom': !flat && '10px' }">
      <button
        v-for="(tabItem, index) of tabItems"
        :key="index"
        :class="{ 'is-active': activeTab === index, 'is-disabled': tabItem.disabled }"
        @click="tabClick(index)">
        {{ tabItem.label }}
      </button>
    </div>
    <section class="tab-content" :class="{ 'is-transitioning': isTransitioning }">
      <slot />
    </section>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    value: Number,
    flat: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeTab: this.value || 0,
      isTransitioning: false,
      tabItems: [],
      _isTabs: true
    }
  },
  watch: {
    value (value) {
      this.changeTab(value)
    },

    tabItems () {
      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].isActive = true
      }
    }
  },
  methods: {
    changeTab (newIndex) {
      if (this.activeTab === newIndex) return

      if (this.activeTab < this.tabItems.length) {
        this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex)
      }

      this.tabItems[newIndex].activate(this.activeTab, newIndex)
      this.activeTab = newIndex

      this.$emit('change', newIndex)
    },

    tabClick (value) {
      this.$emit('input', value)
      this.changeTab(value)
    }
  },

  mounted () {
    if (this.activeTab < this.tabItems.length) {
      this.tabItems[this.activeTab].isActive = true
    }
  }
}
</script>

<style lang="scss">
  .trade-tabs {
    height: 100%;

    .tabs {
      display: flex;
      font-size: 10px;
      border-bottom: 1px solid #e8e8e817;

      button {
        background: none;
        border: none;
        color: #2d3242;
        cursor: pointer;
        height: 16px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: center;
        padding: 4px 10px 8px 10px;
        position: relative;
        box-sizing: content-box;
        color: rgba(45, 50, 66, 0.5);
        font-weight: 600;
        text-transform: uppercase;
        line-height: 20px;
        text-shadow: none;
        color: #bbbdc5;
        outline: none;

        &:hover {
          background-color: #ffffff14;
        }

        &.is-active::before {
          background: #2196f3 !important;background: #ebecf0;
          border-radius: 2px;
          bottom: -2px;
          content: "";
          height: 2px;
          left: 0;
          position: absolute;
          width: 100%;
        }
      }
    }

    .tab-content, .tab-content .tab-item {
      height: 100%;
      position: relative;
    }
  }
</style>
