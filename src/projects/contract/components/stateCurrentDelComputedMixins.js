
export default {
  computed: {
    //side  1：买， 2：卖
    buyDelAmount () {
      let curDel = this.state.ct.currentDel
      let count = 0 
      curDel.map(row => {
        if(row.side == 1){
          count += Number(row.amount)
        }
      }) 
      return count
    },
    sellDelAmount () { 
      let curDel = this.state.ct.currentDel
      let count = 0
      curDel.map(row => {
        if(row.side == 2){
          count += Number(row.amount)
        }
      }) 
      return 0 - count
    },
    symbol () {
      return this.state.ct.symbol
    },
    currentDel () { 
      return this.state.ct.currentDelList[this.symbol] || []
    }, 
  }
}