<template>
  <div class="receive-container">
    <div class="header"></div>
    <div class="content"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rates: []
    }
  },
  created() {
    let res = await service.getRates({currency: 'BTC'})  
    if (!!res && !res.code) {
      this.rates = res.data.BTC
    }
  }
}
</script>

<style lang="scss" scope>
.receive-container {
  .header {
    height: 450px;
  }
  .content {

  }
  .footer {
    height: 450px;
  }
}
</style>