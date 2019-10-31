<template>
  <div class="receive-container">
    <div class="header">
      <v-btn>{{$t('立即领取 $60 交易金')}}</v-btn>
    </div>
    <div class="content">
      <div class="card register">
        <div class="left">
          <i>{{$t('注册赠金')}}</i>
          <label >{{ gift_a.symbol + gift_a.amount }}</label>
          <span>
            {{ $t('当前等值：0') }}
          </span>
        </div>
        <div class="right">
          <ul>
            <li>1.{{$t('首次成功注册并认证账户， 开通合约账户，即可获得$10等值的BTC注册交易赠金(不支持直接提取)， 可用于平台合约产品交易体验；')}}  </li>
            <li>2.{{$t('无需充值； ')}}</li>
            <li>3.{{$t('客服确认后赠金自动汇入您的注册账户； ')}}</li>
            <li>4.{{$t('支持盈利部分提现；')}}</li>
            <li>5.{{$t('新用户专享, 赠金仅用作交易保证金使用。')}}</li>
          </ul>
        </div>
      </div>
      <div class="card deposit">
        <div class="left">
          <i>{{$t('首存赠金')}}</i>
          <label >{{ gift_b.symbol + gift_b.amount }}</label>
          <span>
            {{ $t('当前等值：0') }}
          </span>
        </div>
        <div class="right">
          <ul> 
            <li>1.{{$t('只限首次合约账户充值并满足条件的用户，将额外获得$50等值的BTC；')}}  </li>
            <li>2.{{$t('充值金额超过 (含) 0.2BTC；')}}</li>
            <li>3.{{$t('赠金自动汇入您的注册账户；')}}</li>
            <li>4.{{$t('支持盈利部分提现；')}}</li>
            <li>5.{{$t('首存赠金不支持直接提取， 仅用作交易保证金使用。')}}</li>
          </ul>
        </div>
      </div>
      <div class="option">
        <v-btn>{{$t('领取我的赠金')}}</v-btn>
      </div>
    </div>
    <div class="footer">
      <article> 
        <h3>{{$t('什么是交易赠金?')}}</h3> 
        <p>
          {{$t('交易赠金可以让您在真实交易环境中，无风险零成本地体验我们的合约产品。成功注册认证或首次合约账户充值超过(含) 0.2BTC时， 即可获得IXX合约交易赠金，赠金自动汇入您的注册账户后，可以开始交易。充值后，盈利部分支持提现。请注意任何的提现行为都会导致个人所得交易赠金清零。')}}
        </p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rates: [],
      gift_a: {
        amount: 10,
        symbol: "$",
        unit: "USD"
      },
      gift_b:  {
        amount: 60,
        symbol: "$",
        unit: "USD"
      },
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
  width: 1300px;
  .header {
    height: 450px;
    background-color: skyblue;
  }
  .content {
    background-color: lemonchiffon;
    .card { 
      margin-top:80px;
      height: 340px;
      width: 1088px;
      border: 1px solid $pirmary;
      .left {
        width: 450px;
      }
      .right {
        right: 638px;
      }
    }
    .option {
      margin:80px 0;
    }
  }
  .footer {
    height: 450px;
    background-color: gold;
  }
}
</style>