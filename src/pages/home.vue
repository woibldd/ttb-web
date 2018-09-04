<template>
<div class="page-home">
    <div class="header">
      <v-nav2 isHome="true" :notice="notice" @hide="notice = null"></v-nav2>
    </div>
    <div class="ind_cen">
        <p></p>
        <b class="ind_logo">自由人的自由联合</b>
        <p>
            <count-down :terminal="date"></count-down>
        </p>
    </div>
</div>
</template>
<script>
import VNav2 from '@/components/VNav2.vue'
import CountDown from '@/components/CountDown.vue'

export default {
  components: {
    VNav2,
    CountDown
  }
}
</script>
<style scoped lang="scss">
    @import "../styles/vars";
    @import "../styles/mixins";
    .page-home{background:url(../assets/index_bg.png) center center;}
    .ind_cen{text-align:center;}
</style>
