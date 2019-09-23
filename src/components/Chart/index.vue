<template>
  <Tile :position="position" flat>
    <TradingView :id="id" :options="options" class="chart" />
  </Tile>
</template>

<script>
import Tile from '../atoms/Tile'
import TradingView from '../atoms/TradingView'

export default {
  name: 'Chart',
  components: { Tile, TradingView },
  props: {
    id: String,
    position: String,
    options: Object
  }
}
</script>

<style lang="scss">
  .chart {
    height: 100%;
  }
</style>
