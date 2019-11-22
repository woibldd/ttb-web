<template>
  <ul class="tab" v-for="(item, index) in market" :key=index">
    <li>{{ item.pair }}</li>
    <li>
      {{ item.p }} USDT
      ≈￥{{ item.cny }}
    </li>
    <li>
      <div class="btn">
        {{ item.h }}%
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
