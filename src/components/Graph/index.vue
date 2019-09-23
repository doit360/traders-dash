<template>
  <Tile position="m5:r8" >

    <div class="grid-info">
        <div v-for="(column, i) of grids" :key="`row-${i}`">
          <div v-for="(filled, j) of column" :key="`column-${j}`" :class="{ filled }" :title="`${i}:${j}`" >
            <span>{{ `${String.fromCharCode(j+97)}:${i+1}` }}</span>
          </div>
        </div>
    </div>

  </Tile>
</template>

<script>
export default {
  name: 'Graph',
  computed: {
    grids () {
      let rows = []
      for (let i = 1; i <= this.rows; i++) {
        let columns = []
        for (let j = 1; j <= this.columns; j++) {
          columns.push(this.map (i, j))
        }
        rows.push(columns)
      }

      return rows
    }
  },
  methods: {
    map (row, column) {
      return this.graphs.some(({ position }) => {
        const [from, to = null] = position.toLowerCase().split(':')

        if (from.length != 2 || (to && to.length != 2)) {
          return
        }

        const areaFrom = [Number(from.substring(1)), this.indexInAlphabet(from[0])]
        const areaTo = [Number(to.substring(1)), this.indexInAlphabet(to[0])]

        const filled = (row >= areaFrom[1] && row <= areaTo[0])
          && (column >= areaFrom[0] && column <= areaTo[1])

        console.log({ areaFrom, row, column, areaTo, filled })

        return filled
      })
    },
    indexInAlphabet (character) {
      const index = character.toLowerCase().charCodeAt(0) - 96
      return index < 1 ? 1 : index
    }
  }
}
</script>


<style lang="scss">
  .grid-info {
    width:  100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    div {
      flex: 1;
      display: flex;
      justify-content: center;

      div {
        flex: 1;

        background: #fff;
        color: #000;
        text-shadow: none;

        font-size: 10px;
        text-align: center;

        &.filled {
          background: green;
          color: #FFF;
        }
      }
    }
  }
</style>