<template>
  <div class="contract-card">
    <div class="contract-card-box"> 
      <div class="contract-card-title">
        <h3>{{holding.currency}}</h3>
      </div>
      <div class="contract-card-content">
        <dl class="contract-card-row">
          <dt>{{$t('未平仓仓位')}}</dt>
          <dd> 
            <span
              :class='{up: (holding.amount || 0) > 0, down: (holding.amount || 0) < 0}'
            >
              {{holding.amount}}  
              ({{ (holding.amount || 0) > 0 ? $t('做多') : $t('做空') }})
            </span>
          </dd>
        </dl>  
        <dl class="contract-card-row">
          <dt>{{$t('已实现盈亏')}}</dt>
          <dd>
            <span 
              :class='{up: (holding.realized || 0) > 0, down: (holding.realized || 0) < 0}'
              >
              {{holding.realized | fixed(8)}} BTC
            </span>
          </dd>
        </dl>  
        <dl class="contract-card-row">
          <dt>{{$t('未实现盈亏')}}</dt>
          <dd>
            <span
              :class='{up: $big(holding.unrealized || 0).gt(0), down: $big(holding.unrealized || 0).lt(0)}'
              >
              {{holding.unrealized | fixed(8)}} BTC
            </span>
          </dd>
        </dl>   
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    holding : {
      type: Object,
      default: {}
    }
  }, 
  created() {
    console.log({h: this.holding})
  }
}
</script>

<style lang="scss" scoped>
.contract-card { 
  width: 278px; 
  font-size: 18px;
  text-align: center;
  border: 1px solid $primary; 
  .contract-card-title {
    height: 40px;
    line-height: 40px;
    background-color: $primary; 
    h3 {
      font-size: 18px;
      color: #fff;
    }
  }
  .contract-card-content {
    padding:15px 0;
    .contract-card-row { 
      line-height: 32px;
      dt {
        color: #A0A0A0;
      }
      .up {
        color: $font-up;
      }
      .down {
        color: $font-down;
      }
    } 
  }
 
}
</style>


