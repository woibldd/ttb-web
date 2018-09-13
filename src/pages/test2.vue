<template>
    <section style="margin: 50px; width: 300px;background:#ccc">
      <ix-slider v-model="percent" height="4" :dot-size="14" :lazy="true" :min="0" :max="100" :piecewiseLabel="true" :interval="1" :piecewise="false">
        <template slot="label" slot-scope="{ label, active }">
          <span :class="['custom-label', { active }]" v-if="label % 25 === 0">
          </span>
        </template>
        <template slot="tooltip" slot-scope="tooltip">
          <div class="custom-tooltip">
            {{ tooltip.value }}%
          </div>
        </template>
      </ix-slider>

      <!-- {{percent}} -->
    </section>
</template>

<script>
import ixSlider from '@/components/common/ix-slider/'
export default {
  data () {
    return {
      percent: 0
    }
  },
  components: {
    ixSlider
  }
}
</script>

<style>
.custom-label {
  position: absolute;
  bottom: -15px;
  left: 0;
  transform: translate(-50%, -12px);
  margin-left: 3px;
  width:10px;
  height:10px;
  background:#fff;
  border-radius:50%;
}
.custom-tooltip {
  position: absolute;
  bottom: -50px;
  color: #A5B4C5
}
.custom-label.active {
  background-color: #C9AA6D;
  font-weight: bold;
}
.custom-label.active::after {
  background-color: #C9AA6D;
  width: 2px;
}
</style>
