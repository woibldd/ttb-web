<template>
  <div class="treaty-container">
    <div class="treaty-inner">
      <h1>
        {{ $t('agreeList.title') }}
      </h1>
      <p v-for="(item) in 96" :key="item" :data-p="`item_${item}`" v-html="$t(`agreeList.t_${item}`)"></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.treaty-container {
  background: #323e4a;
  overflow: hidden;
  .treaty-inner {
    overflow: hidden;
    overflow-y: auto;
    min-width: 1200px;
    margin: 60px auto;
    h1 {
      font-size: 18px;
      text-align: center;
      color: #fff;
      font-weight: normal;
    }
    p {
      font-size: 14px;
      color: #fff;
      padding: 0 20px;
      line-height: 1.5;
      margin: 10px 0;
      &:nth-child(1) {
        margin-top: 20px;
      }
      a {
        color: #fff
      }
    }
  }
}
</style>
