<template>
  <div class="page-fund"> 
    <div class="fund-list">
      <div class="fund-menu" flex="main:justify">
        <div class="fund-menu-left" flex="main:left">
          <div class="fund-menu-item">  
            <router-link :to="{name:'new-assetsAccount'}" v-html="$t('wallet_account')">资金账户</router-link>
          </div>
          <div class="fund-menu-item">  
            <router-link :to="{name:'new-tradingAccount'}" v-html="$t('trading_account')">币币账户</router-link>
          </div>
          <!-- <div class="fund-menu-item">  
            <router-link :to="{name:'new-otcAccount'}" v-html="$t('otc_account')">法币账户</router-link>
          </div> -->
          <div class="fund-menu-item">  
            <router-link :to="{name:'new-mixAccount'}" v-html="$t('mix_account')">金本位合约账户</router-link>
          </div>
          <div class="fund-menu-item">  
            <router-link :to="{name:'new-futureAccount'}" v-html="$t('btc_account')">BTC合约账户</router-link>
          </div>
          <div class="fund-menu-item">  
            <router-link :to="{name:'new-unitAccount'}" v-html="$t('unit_account')">币本位合约账户</router-link>
          </div>
          <!-- <div class="fund-menu-item">  
            <router-link :to="{name:'new-blendAccount'}" v-html="$t('blend_account')">混合合约账户</router-link>
          </div>  -->
        </div>
        <div class="fund-menu-right">
          <router-link :to="{name:'new-address'}" v-html="$t('address_manage')">地址管理</router-link>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script> 
export default {
  name: 'nFund',
  components: { 
  }, 
  
}
</script>

<style lang="scss">
.fund-list { 
  .fund-menu {
    margin-top: 40px;
    border-bottom: 1px solid #E6E6E6;
    .fund-menu-left {
      .fund-menu-item {  
        margin-right: 70px;
      }
      a { 
        line-height: 35px;
        box-sizing: border-box;
        color:#9C9C9C;
        &.router-link-active{
          color: #373737;
          &:after { 
            display:block;
            content: '';
            height: 2px;
            width: 100%;
            background-color:$primary; 
          }
        }
      }
    }  
  }
}
</style>