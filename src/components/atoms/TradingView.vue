<template>
  <div ref="tradingview" :id="containerId" class="tradingview-widget-container">
    <div ref="widget" :id="widgetId"></div>
  </div>
</template>

<script>
const SCRIPT_ID = 'tradingview-script'
const CONTAINER_ID = 'tradingview-container'
const WIDGET_ID = 'tradingview-widget'

export default {
  name: 'TradingView',
  props: {
    id: String,
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      containerId: [CONTAINER_ID, this.id].filter(v => !!v).join('-'),
      widgetId: [WIDGET_ID, this.id].filter(v => !!v).join('-'),
      widget: null
    }
  },
  methods: {
    canUseDOM () {
      return typeof window !== 'undefined' && window.document && window.document.createElement
    },
    getScriptElement () {
      return document.getElementById(SCRIPT_ID)
    },
    updateOnloadListener (onload) {
      const script = this.getScriptElement()
      const oldOnload = script.onload
      return script.onload = () => {
        oldOnload()
        onload()
      }
    },
    scriptExists () {
      return this.getScriptElement() !== null
    },
    appendScript (onload) {
      if (!this.canUseDOM()) {
        onload()
        return
      }

      if (this.scriptExists()) {
        if (typeof TradingView === 'undefined') {
          this.updateOnloadListener(onload)
          return
        }
        onload()
        return
      }
      const script = document.createElement('script')

      script.id = SCRIPT_ID
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://s3.tradingview.com/tv.js'
      script.onload = onload
      script.textContent = JSON.stringify(this.options)

      this.$refs.tradingview.appendChild(script)
    },
    initWidget () {
      const { widget: Widget } = TradingView

      this.widget = new Widget({
        'autosize': true,
        'symbol': 'BINANCE:BTCUSDT',
        'interval': 'D',
        'timezone': 'Etc/UTC',
        'theme': 'Dark',
        'style': '1',
        'locale': 'br',
        'toolbar_bg': '#131722',
        'enable_publishing': false,
        'withdateranges': true,
        'hide_side_toolbar': false,
        'allow_symbol_change': true,
        ...this.options,
        'container_id': this.widgetId
      })

      console.log('[widget] loaded')
    }
  },
  mounted () {
    setTimeout(() => {
      this.appendScript(this.initWidget)
    }, 300)
  }
}
</script>

<style lang="scss">
  .tradingview-widget-container {
    * {
      height: 100%;
    }
  }
</style>
