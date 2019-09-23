<script>
export default {
  name: 'TabItem',
  props: {
    label: String,
    disabled: Boolean,
    visible: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      isActive: false,
      transictionName: null
    }
  },

  methods: {
    activate (oldIndex, index) {
      this.transictionName = index < oldIndex
        ? 'slide-next'
        : 'slide-prev'
      this.isActive = true
    },

    deactivate (oldIndex, index) {
      this.transictionName = index < oldIndex
        ? 'slide-next'
        : 'slide-prev'
      this.isActive = false
    }
  },

  created () {
    if (!this.$parent.$data._isTabs) {
      this.$destroy()
      throw new Error('You should wrap TradeTabItem on a TradeTab')
    }

    this.$parent.tabItems.push(this)
  },

  beforeDestroy () {
    const index = this.$parent.tabItems.indexOf(this)

    if (index >= 0) {
      this.$parent.tabItems.splice(index, 1)
    }
  },

  render (h) {
    if (this.$parent.destroyOnHide) {
      if (!this.isActive || !this.visible) {
        return
      }
    }

    const vnode = h('div', {
      directives: [{
        name: 'show',
        value: this.isActive && this.visible
      }],
      attrs: { class: 'tab-item' }
    }, this.$slots.default)

    if (this.$parent.animated) {
      return h('transition', {
        props: {
          name: this.transictionName
        },
        on: {
          'before-enter': () => { this.$parent.isTransitioning = true },
          'after-enter': () => { this.$parent.isTransitioning = false }
        }
      }, [vnode])
    }

    return vnode
  }
}
</script>
