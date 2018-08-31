<template>
  <div class="pro-trade-op limit-order">
    <div class="text">{{ $t('coming_soon') }}</div>
  </div>
</template>

<script>
export default {
  name: 'proStopOrder',
  data () {
    return {
      buy: {
        amount: 0,
        price: 0
      }
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
.text {
  text-align: center;
  font-size: 14px;
  height: 100px;
  line-height: 100px;
  color: white;
  opacity: .2;
}
</style>
