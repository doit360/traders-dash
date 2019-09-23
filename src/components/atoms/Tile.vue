<template>
  <div class="tile" :style="tilePosition">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    position: {
      type: String
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tilePosition () {
      return {
        'grid-area': this.positionToGridAreaNotation(this.position),
        'padding': !this.flat && '1vw'
      }
    }
  },
  methods: {
    positionToGridAreaNotation (position) {
      const [from, to = null] = position.toLowerCase().split(':')

      if (from.length != 2 || (to && to.length != 2)) {
        return
      }

      // b:1 => 2:1
      const areaFrom = `${from.substring(1)} / ${this.indexInAlphabet(from[0])}`
      const area = to
        ? `${areaFrom} / ${Number(to.substring(1)) + 1} / ${this.indexInAlphabet(to[0]) + 1}`
        : areaFrom

      return area
    },
    indexInAlphabet (character) {
      const index = character.toLowerCase().charCodeAt(0) - 96
      return index < 1 ? 1 : index
    }
  }
}
</script>

<style lang="scss">
  .tile {
    overflow: hidden;
    border-radius: .25vw;
    color: white;
    text-shadow: 1px 1px 1px #2e3344;

    > * {
      height: 100%;
    }
  }
</style>
