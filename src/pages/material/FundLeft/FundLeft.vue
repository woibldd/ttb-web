<template>
  <div class="fund-left-container">
    <div class="left-menu-container left-menu-nobottom">
      <p class="left-menu-title">
        <span class="icon icon-his"/>
        <span class="menu-title">{{ $t('history_material') }}</span>
      </p> 
      <ul class="left-menu-list">
        <li class=""><router-link
          class="menu-name"
          active-class="active"
          to="/material/fee-history">{{ $t('assets_fee_history') }}</router-link></li>
        <!-- <li class=""><router-link
          class="menu-name"
          active-class="active"
          to="/material/ensurance-fund">{{ $t('ensurance_fund') }}</router-link></li> -->
        <li class=""><a
          class="menu-name"
          target="_blank"
          active-class="active"
          href="https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360027994471">{{ $t('ensurance_contract_tutorial') }}</a></li>
      </ul> 
      <!-- 指数 -->
      <p class="left-menu-title mt-20">
        <span class="icon icon-index"/>
        <span class="menu-title">{{ $t('coin_trade_index') }}</span>
      </p> 
      <ul class="left-menu-list">
        <li
          v-for="(pair, index) in coinIndexArray"
          :key="index">
          <div class="nav_link arrow-down">
            <router-link
              class="menu-name menu-contract-index"
              active-class="active"
              :to="{ name: 'TradeIndex', params: { pair: pair }}">
              {{ pair.replace('FUTURE_', '') }}
              <icon
                class="arrow ml-5 arrow-right"
                name="arrow-contract-down-black"/>
              <icon
                class="arrow ml-5 arrow-black"
                name="arrow-contract-down"/>
            </router-link>
            <div class="dropdown-sub-menu">
              <ul class="dropdown-list pt-10 pb-10">
                <li class="dropdown-item pl-34 pr-24">
                  <a
                    target="_blank"
                    :href="tutorialUrl(pair)"
                    class="index__sub__link">{{ $t("ensurance_btc_future_tutorial", {coin: $t("coin_"+pair)}) }}
                  </a>
                </li>
                <li class="dropdown-item pl-34 pr-24">
                  <a
                    target="_blank"
                    href="https://ixxcustomer.zendesk.com/hc/zh-cn"
                    class="index__sub__link">{{ $t("ensurance_btc_future_rule", {coin: $t("coin_"+pair)})}}
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import service from '@/modules/service'
export default{
  data () {
    return {
      coinIndexArray: [
      ]
    }
  },
  methods: {
    tutorialUrl (pair) {
      if (pair === 'FUTURE_BTCUSD') {
        return 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360027994431'
      }
      else if (pair === 'FUTURE_BHDUSD') {
        return 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360030485092-BHD'
      }
      else if (pair === 'FUTURE_ETHUSD') {
        return 'https://ixxcustomer.zendesk.com/hc/zh-cn/articles/360031397811'
      }
      else {
        return ''
      }
    }, 

  },
  async created () {
    let res = await service.getContractSymList()
    if (!res.code) {
      let symbolList = res.data.items
      if (symbolList.length) {
        this.coinIndexArray = symbolList.map(item => item.name)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.pl-34{
    padding-left: 34px !important;
}
.index__sub__link {
    color: #333;

    &:hover {
        color: $primary;
    }
}
.fund-left-container {
  float: left;
  .left-menu-nobottom {
    border-bottom: 0;
    margin-bottom: 0;
  }
  .left-menu-container {
    background: #fff;
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 16px;
    width: 160px;

    .left-menu-title {
      width: 100%;
      font-size: 14px;
      margin-left: 12px;
      text-align: left;
      color: $text-weak;
      box-sizing: border-box;

      .menu-title {
        margin-left: 6px;
      }
    }

    .left-menu-list {
      width: 100%;
      margin-top: 20px;

      .menu-name {
        box-sizing: border-box;
        width: 100%;
        display: inline-block;
        padding-left: 34px;
        color: $text-strong;

        &.active {
          color: $primary;
          background: $profile-menu-bg;
          box-shadow: inset 3px 0 0 0 $primary;
        } 

      }
      .sub-menu-group {
          margin-top: 10px;
      }
      .sub-menu-item {
          padding-top: 15px;
          padding-bottom: 15px;
          padding-left: 50px;
          color: #333333;

          &:hover,
          &.active {
              color: #01CED1;
          }
      }
      li {
        width: 100%;
        text-align: left;
        line-height: 36px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        margin-bottom: 5px;
      }
    }
  }
}
.icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    vertical-align: text-top;
}
.icon-his {
    background-image: url('../../../assets/contract/icon-his.png')
}
.icon-index {
    background-image: url('../../../assets/contract/icon-index.png')
}

// 控制箭头的显示
.arrow {
    &.arrow-right {
        transform: rotate(-90deg);
    }

    &.arrow-black{
        display: none;
    }
}
.active {
    .arrow-right {
        display: none;
    }
    .arrow-black {
        display: inline-block;
    }
}

// 控制对应的下拉项目
.menu-contract-index {
    & + .dropdown-sub-menu{
        display: none
    }
    &.active + .dropdown-sub-menu{
        display: block;
    }
}

</style>
