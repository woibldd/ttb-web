<template>
  <div
    class="simple-slider-container"
    v-if="last">
    <div
      class="dot-box"
      @click="clickDot(key)"
      :class="{'select': selectKey === key}"
      v-for="(key,index) in mapKeys"
      :key="index">
      <div class="box__label mb-19">
        <p
          class="seat seat1"
          :style="{width: seatLen}"
          :class="[{'start':index===0}]"/>
        <i class="dot" />
        <p
          class="seat seat2"
          :style="{width: seatLen}"
          :class="[{'end':index===last}]"/>
      </div>
      <div class="box__text">{{ map[key] }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    map: {
      type: Object,
      default () {
        return {}
      }
    },
    stickLen: {
      type: Number,
      default: 30
    },
    times: {
      type: Number | String,
      default: 0
    },
    max: {
      type: Number | String,
      default: 0
    }
  },
  watch: {
    times (v, o) {
      console.log(v, 'v slider', o)
      v = '' + v
      //   if (this.max && v > this.max) {
      //     this.$emit('update:times', this.max)
      //     this.$emit('choose', this.max)
      //     return
      //   }
      if (this.mapKeys.indexOf(v) > -1) {
        this.selectKey = v
      } else {
        let time = this.dealSliderTime(v)
        this.selectKey = time
      }
    }
  },
  computed: {
    mapKeys () {
      return Object.keys(this.map)
    },
    last () {
      return this.mapKeys.length - 1
    },
    seatLen () {
      return (this.stickLen / 2) + 'px'
    }
  },
  data () {
    return {
      selectKey: 0
    }
  },
  methods: {
    clickDot (key) {
      this.$emit('choose', key)
    },
    // 处理滑块数据
    dealSliderTime (inputValue) {
      let keys = this.mapKeys
      let len = keys.length
      let sliderValue = inputValue

      for (let i = 0; i < len; i++) {
        let key = keys[i]
        if (Number(key) >= Number(inputValue)) {
          sliderValue = key
          return sliderValue
        }
      }
    }
  },
  mounted () {
    // 更新选中点状态
    if (this.mapKeys.indexOf('' + this.times) > -1) {
      this.selectKey = '' + this.times
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./simple-slider.scss";
</style>
