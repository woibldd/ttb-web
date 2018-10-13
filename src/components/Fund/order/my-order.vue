<template>
  <div class="my-order-container">
    <div class="page-content">
      <div class="orders-title">{{ $t('my_orders') }}</div>
      <div class="orders-filter">
        filter
      </div>
      <div class="orders-list-wrapper">
        dfg
      </div>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'

export default {
  data () {
    return {
      name: '9',
      orderList: []
    }
  },
  methods: {
    getOrders () {
      const params = {
        page: 1,
        size: 10
      }
      return service.getOrderHistory(params).then(res => {
        this.orderList = res.data
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
<style lang="scss" scoped>
@import './my-order.scss';
</style>
