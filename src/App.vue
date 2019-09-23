<template>
  <div id="app">
    <Dashboard :rows="rows" :columns="columns">

      <Chart position="a1:f4" id="btcbrl" :options="{ symbol: 'MERCADO:BTCBRL' }" v-resize="() => {}" />
      <Chart position="g1:n4" id="btc-eth" :options="{ symbol: 'BINANCE:ETHUSDT' }" />

      <TwitterTimeline position="o1:r8" />

      <Chart position="a5:n8" id="usdt" :options="{ symbol: 'BINANCE:BTCUSDT' }"/>

    </Dashboard>
  </div>
</template>https://br.tradingview.com/chart?symbol=MERCADO%3ABTCBRL

<script>
import resize from 'vue-resize-directive'

import Dashboard from './components/Dashboard';
import TwitterTimeline from './components/TwitterTimeline';
import Chart from './components/Chart';
import Tile from './components/atoms/Tile'

export default {
  name: 'app',
  components: {
    Dashboard, TwitterTimeline, Chart, Tile
  },
  data () {
    return {
      rows: 8,
      columns: 18,
      graphs: [
        {
          id: 'btc-usdt',
          position: 'b2:f5',
          options: {}
        },
        {
          id: 'btc-usd',
          position: 'h2:l5',
          options: {}
        }
      ]
    }
  },
  directives: { resize }
};
</script>

<style lang="scss">
#app {
  padding: 0;
  margin: 0;
}
</style>
