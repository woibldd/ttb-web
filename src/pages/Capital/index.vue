<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">
      <div>{{ $t('wallets_nav_asset') }}</div>
    </div>
    <div class="tip">
      <h1>IX 总净资产估值</h1>
      <p><b>≈ 0.00000000</b> usd</p>
    </div>
    <div class="capital-wrapper clearfix">
      <div class="capital-inner">
        <div class="title">资金账户</div>
        <div class="money">
          <p><b>0.00000000</b> usd</p>
        </div>
        <div class="capital-area clearfix">
          <ul>
            <li>
              <router-link
                class="menu-name"
                to="/fund/deposit"
                tag="a">{{ $t('deposit') }}
              </router-link>
            </li>
            <li>
              <router-link
                class="menu-name"
                tag="a"
                to="/fund/withdraw">{{ $t('withdraw') }}
              </router-link>
            </li>
          </ul>
          <div class="from">
            <router-link
              class="menu-name"
              tag="a"
              :to="'/fund/transfer'">{{ $t('account_exchange') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="capital-inner">
        <div class="title">交易账户</div>
        <div class="money">
          <p><b>0.00000000</b> usd</p>
        </div>
        <div class="transaction-area">
          <dl>
            <dd><span>法币账户</span><div><b>0.00000000</b> usd</div> <em></em></dd>
            <dd><span>币币账户</span><div><b>0.00000000</b> usd</div> <em></em></dd>
            <dd><span>合约账户</span><div><b>0.00000000</b> usd</div> <em></em></dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.tip{
  h1 {
    font-size:16px;
    font-weight:400;
    color:rgba(160,160,160,1);
    padding: 22px 0;
  }
  p {
    color:rgba(160,160,160,1);
    font-size: 14px;
    padding-bottom: 40px;
    b {
      font-size: 24px;
      color: #333333;
      vertical-align: middle;
    }
  }
}
.capital-wrapper {
  /*margin-top: 40px;*/
  .capital-inner {
    width: 420px;
    height: 350px;
    box-sizing: border-box;
    border: 1px solid $primary;
    position: relative;
    float: left;
    &::after {
      content: '';
      width: 100%;
      height: 10px;
      background: $primary;
      /*width: 100^;*/
      position: absolute;
      left: 0;
      top: 0;
    }
    &:first-child {
      margin-right: 78px;
    }
    .title {
      padding: 22px 17px;
      font-size:24px;
      font-weight:400;
      color:#01CED1;
    }
    .money {
      font-size: 20px;
      padding-left: 17px;
      vertical-align: middle;
      color:rgba(160,160,160,1);
      b {
        font-size: 24px;
        color: #333333;
        /*vertical-align: middle;*/
      }
    }
    .capital-area {
      ul {
        display: flex;
        padding: 50px 17px;
        overflow: hidden;
        li {
          flex: 1;
          font-size:16px;
          font-weight:400;
          color:#01CED1;
        }
      }
      .from {
        font-weight:400;
        color:#01CED1;
        font-size: 18px;
        padding: 0 17px;
      }
    }
    .transaction-area {
      padding: 50px 17px;
      dd {
        color: #A0A0A0;
        padding-bottom: 20px;
        display: flex;
        font-size: 16px;
        &:nth-child(2) {
          span {
            &::after {
              background:rgba(62,119,230,1);
            }
          }
        }
        &:nth-child(3) {
          span {
            &::after {
              background:rgba(110,105,222,1);
            }
          }
        }
        span {
          flex: 110px 0 0 0;
          display: block;
          width: 100px;
          padding-left: 10px;
          position: relative;
          &::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            background: #7CC5A0;
            left: 0;
            top: 50%;
            margin-top: -4px;
            text-indent: 4px;
          }
        }
        em {
          flex: 0 0 0 40px;
          width: 40px;
          display: block;
        }
        b {
          flex: 1;
          color: #333
        }
      }
    }
  }
}
</style>
