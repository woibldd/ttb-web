<template>
  <div id="kline_container" />
</template>

<script type="text/javascript" src="https://widget.aicoin.net.cn/chart/js/aicoin.js"></script>
<script>
export default {
  mounted() {
    new AICoin.chart({
      'symbol': 'OKCOINFUTURESBTCQUARTERUSD',
      'default_theme': 'dark',
      'disable_theme_change': true,
      'default_open_tools': true,
      'hide_market_name': true,
      'container': 'kline_container',
      'lang': 'zh',
      'title': '实时走势图表'
    })
  }
}
</script>

<style>

</style>
