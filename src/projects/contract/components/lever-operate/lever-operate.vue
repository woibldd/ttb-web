<template>
  <div class="lever-operate-container">
    <simpleSlider
      v-show="!editing"
      :map="timersMap"
      :max="max"
      :stick-len="stickLen"
      :times.sync="sliderLeverTime"
      @choose="changeTimes"/>
    <span
      v-if="!editing"
      @click="editOuterTimes"
      class="icon icon-edit pointer"/>
    <!-- 杠杆操作 input number-->
    <div
      class="lever-operate c-fff mb-22"
      v-if="editing">
      <div class="mr-50 c-fff">{{ $t('lever') }}</div>
      <div class="op-wrapper">
        <!-- <input
          type="number"
          step="0.1"
          max="100"
          min="0"
          v-model="inputLeverTime"
          class="input-num pl-8" > -->
        <number-input 
          :scale="2" 
          :max="100" 
          :min="0"
          class="input-num pl-8" 
          v-model="inputLeverTime"/> 
        <div class="ops">
          <span
            class="op op_cancel"
            @click="cancel"/>
          <span
            class="op op_ok"
            @click="confirm"/>
        </div>
      </div>
    </div>

  </div>
</template> 
<script>
import simpleSlider from '../simple-slider'
import {state} from '@/modules/store'

export default {
  components: {simpleSlider},
  props: {
    realValue: {
      type: Number | String,
      default: 0
    },
    sliderValue: {
      type: Number | String,
      default: 0
    },
    timersMap: {
      type: Object,
      default () {
        return {}
      }
    },
    stickLen: {
      type: Number,
      default: 28
    },
    max: {
      type: Number | String,
      default: 0
    }
  },
  watch: {
    sliderValue (v) {
      //console.log('slidervalue', v)
      this.sliderLeverTime = v
    },
    inputLeverTime (v){
      if (v > 100)
        this.inputLeverTime = 100
      else if (v < 0 )
        this.inputLeverTime = 0
      else if (v > 0)
        this.inputLeverTime = this.$big(v).round(2, 0).toString()
    }
  },
  data () {
    return {
      editing: false, // 切换显示外部slider和数值输入
      sliderLeverTime: this.sliderValue, // 滑块设置的倍数
      inputLeverTime: this.realValue
    }
  },
  methods: {
    // 处理滑块数据
    dealSliderTime () {
      let keys = Object.keys(this.timersMap)
      let len = keys.length

      for (let i = 0; i < len; i++) {
        let key = keys[i]
        if (Number(key) >= Number(this.inputLeverTime)) {
          this.sliderLeverTime = key
          return this.sliderLeverTime
        }
      }
    },
    // 编辑
    editOuterTimes () {
      if (state.userInfo === null) {
        location.href = '/user/login/'
        return
      }
      this.inputLeverTime = this.realValue
      this.editing = true
    },
    confirm () {
    //   this.$emit('update:realValue', this.inputLeverTime)
    //   this.$emit('update:sliderValue', this.dealSliderTime())
      this.$emit('change', this.inputLeverTime)
      console.log(this.inputLeverTime)
      this.editing = false
    },
    cancel () {
      this.editing = false
    },
    changeTimes (item) {
      this.$emit('change', item)
    },
    filter(v) {
      if (v > 100)
        v = 100
    }

  }
}
</script>
<style lang="scss" scoped>
@import "./lever-operate.scss";
</style>
