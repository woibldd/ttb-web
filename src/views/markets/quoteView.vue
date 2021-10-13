<template>
  <label>   
    <canvas ref="myCanvas" width="100" height="25"/>
  </label>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    delta: {
      type: Number,
      defalut: 0
    },
    historyList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      list: [],
      max: 0,
      min: 0,
      colors:{
        up: ['#3ac9a6', '#ecfef9'],
        down: [ '#F24E4D', '#ffc6c4'],
      }
    }
  },
  computed: {
    curColor() { 
      return this.delta > 0 ? this.colors.up : this.colors.down
    }
  },
  watch: {
    curColor() {
      this.init()
    }
  },
  methods: {
    init() {
      let canvas = this.$refs.myCanvas
      let ctx2 = canvas.getContext('2d');
      ctx2.clearRect(0, 0, 100, 25)  
      if (canvas && this.historyList) {  
        const list = []
        this.historyList.map((item, index) => {
          list.push(+item.values[0]) 
        }) 
        const max = _.max(list) //最高价格
        const min = _.min(list) //最低价格
        const diff= this.$big(max).minus(min)  //价格差值
        const start = this.$big(min).minus(this.$big(diff).times(0.1)) //起点价格
        const end = this.$big(max).plus(this.$big(diff).times(0.1)) //终点价格  
        // const xstep = this.$big(1).div(80).times(end.minus(start)) //价格1的步长
        const xstep = diff.gt(0) ? this.$big(25).div(end.minus(start)) : 0
        const ystep = this.$big(100).div(list.length) //一个时间点的步长 
        ctx2.beginPath();  
        // console.log({max, min, diff:+diff, start:+start, end:+end, xstep:+xstep, ystep:+ystep, list})

        let first = [0,0]
        let last = [100, 0]
        list.map((item, index) => { 
          let y = +this.$big(25).minus(this.$big(item).minus(start).times(xstep || 1))
          let x = +this.$big(index).times(ystep)
          ctx2.lineTo(x, y) 
          if (index === 0) {
            first = [x, y]
          }
          if (index === list.length - 1) {
            last = [x, y]
          } 
        })    
        ctx2.lineTo(100, last[1])
        ctx2.lineTo(100, 25)
        ctx2.lineTo(0, 25)
        ctx2.lineTo(...first)
        ctx2.strokeStyle = this.curColor[0]//'#3ac9a6' 
        ctx2.stroke() 
        // ctx2.fillStyle = this.curColor[1]//'#ecfef9';
        let grd=ctx2.createLinearGradient(0,0,0,30);
        grd.addColorStop(0, this.curColor[1]);
        grd.addColorStop(1,"white");
        ctx2.fillStyle = grd;
        ctx2.fill()
        this.list = list
        this.max = max
        this.min = min
      }
    }
  },
  mounted() {
    this.init()
  } 
}
</script>