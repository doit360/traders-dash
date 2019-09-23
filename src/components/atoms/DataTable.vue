<template>
  <div class="trade-data-table">
    <div v-if="showHeaders" class="trade-data-table--head">
      <div
        v-for="(head, index) of headers"
        class="text-truncate"
        :key="`head-${index}`"
        :class="head.align ? `text-xs-${head.align}` : null"
        :style="head.width && `${head.width}%`"
      >{{ head.label }}</div>
    </div>
    <div
      ref="content"
      class="trade-data-table--body"
      :style="{ 'margin-top': !showHeaders ? 0 : null }"
    >
      <div
        v-for="(item, index) of items"
        :key="`item-${index}`"
        class="trade-data-table--body-item"
        @click="$emit('selected', item)"
      >
        <slot
          name="item"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array
    },
    hideHeaders: {
      type: Boolean,
      default: false
    },
    autoscroll: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    showHeaders () {
      return this.headers.length && !this.hideHeaders
    },
    defaultWidth () {
      return 100 / this.headers.length
    }
  },

  methods: {
    scrollToBottom () {
      const el = this.$refs.content
      el.scrollTop = el.scrollHeight
    }
  },
  mounted () {
    this.autoscroll && this.scrollToBottom()
  }
}
</script>

<style lang="scss">
.trade-data-table {
  font-size: 10px;
  position: relative;
  height: 100%;

  .trade-data-table--head {
    display: flex;
    height: 16px;
    align-content: center;
    flex-direction: row;
    width: 100%;
    margin-bottom: 5px;
    padding: 2px 10px;
    text-transform: uppercase;

    & > div {
      flex: 2;
    }
  }

  .trade-data-table--body {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: overlay;
    margin-right: -5px;
    margin-top: 20px;

    * {
      color: #90939e !important;
    }

    .trade-data-table--body-item {
      display: flex;
      height: 18px;
      align-content: center;
      flex-direction: row;
      width: 100%;
      cursor: pointer;
      padding: 2px 15px 2px 10px;

      &:hover {
        * {
          color: #ffffff !important;
        }
        background: #5d91f42e;
      }

      & > div {
        flex: 2;
      }

      .text-green {
        color: #3f8244 !important;
      }

      .text-red {
        color: #ef5350 !important;
      }
    }
  }
}
</style>
