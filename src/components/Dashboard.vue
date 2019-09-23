<template>
  <div class="dashboard" :style="gridTemplate">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {
    rows: [String, Number],
    columns: [String, Number]
  },
  computed: {
    gridTemplate () {
      return `grid-template: repeat(${this.rows}, 1fr) / repeat(${this.columns}, 1fr)`
    }
  }
}
</script>

<style lang="scss">
  .dashboard {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    padding: .5vw;
    width: 98vw;
    height: 98vh;
    grid-gap: .5vw;

    * ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    * ::-webkit-scrollbar-thumb {
      background-color: #494e5e;
      border: 3px solid transparent;
      background-clip: padding-box;
      border-radius: 5px;
    }

    * ::-webkit-scrollbar-track-piece {
      background: 0 0;
    }

    * ::-webkit-scrollbar-thumb:hover {
      background: #474a56;
    }
  }
</style>
