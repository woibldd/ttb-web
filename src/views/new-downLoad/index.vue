<template>
  <div class="overseas">
    <div class="overseas-banner">
      <div class="logo">
        <img src="./../../assets/overseas/ix/logo@2x.png" alt="">
      </div>
      <div class="title">数字资产交易共同体</div>
      <div class="text">
        安全·稳定·可信
      </div>
    </div>
    <div class="overseas-product">
      <div class="product-list">
        <div class="left">
          <img src="./../../assets/overseas/ix/bb.png" alt="">
        </div>
        <div class="right">
          <h1>法币交易</h1>
          <p> 安全便捷，一键买币 ，畅快交易</p>
        </div>
      </div>
      <div class="product-list">
        <div class="left">
          <img src="./../../assets/overseas/ix/fb.png" alt="">
        </div>
        <div class="right">
          <h1>币币交易</h1>
          <p>币种繁多、币对丰富，任你选择</p>
        </div>
      </div>
      <div class="product-list">
        <div class="left">
          <img src="./../../assets/overseas/ix/hy.png" alt="">
        </div>
        <div class="right">
          <h1>合约交易</h1>
          <p>高倍杠杆，最强深度，极致安全</p>
        </div>
      </div>
    </div>
    <div class="overseas-btn">
      <div class="text">提示：IOS系统版本10.0以上，下载更流畅~</div>
      <div class="group-list">
        <div class="group">
          <div class="btn"><i class="down-icon">&#xe676;</i>  App Store</div>
          <h1>安全稳定</h1>
          <p>免费提供Apple ID</p>
        </div>
        <div class="group">
          <div class="btn">安装内测版</div>
          <h1>安装便捷</h1>
          <p>更新后需再次安装</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
</script>
<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .overseas {
    font-family: 'PingFangSC-Regular';
    &-banner {
      height: 350px;
      position: relative;
      color: #fff;
      background: url('./../../assets/overseas/bg.png') top center no-repeat;
      background-size: 100% 120%;
      .logo {
        overflow: hidden;
        img {
          display: block;
          margin: 40px 40px 0;
          height: 40px;
          zoom: 1;
        }
      }
      .title {
        font-size: 1.84rem;
        text-align: center;
        margin-top: 1.4rem;
      }
      .text {
        font-size: .84rem;
        text-align: center;
        margin-top: .96rem;
        color: rgba(255,255,255,.6)
      }
      .banner-svg {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
  }
  .overseas-product {
    padding: 1.4rem;
    margin-top: -80px;
    position: relative;
    z-index: 10;
    .product-list {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-items: center;
      .left {
        flex: 0 0 0 48px;
        img {
          margin-top: 10px;
          height: 48px;
          zoom: 1;
        }
      }
      .right {
        flex: 1;
        h1 {
          color: #2A2929;
          font-size: .84rem;
          font-weight: 500;
        }
        p {
          color: #919191;
          margin-top: .3rem;
          font-size: .84rem;
        }
      }
    }
  }
  .editorial {
    display: block;
    width: 100%;
    height: 160px;
    margin: 0;
  }
  .overseas-btn {
    width: 100%;
    left: 0;
    bottom: 0;
    position: fixed;
    .text {
      font-size: 13px;
      padding-left: 1.6rem;
      padding-bottom: 16px;
      border-bottom: 1px solid #EEEEEE;
      color: #797979;
    }
    .group-list {
      text-align: center;
      display: flex;
      .group {
        flex: 1;
        h1 {
          font-size: .84rem;
          font-weight: 500;
        }
        p {
          font-size: .4rem;
          color: #717171;
          margin-top: .3rem;
          margin-bottom: .64rem;
        }
        .btn {
          width: 80%;
          margin: 16px auto;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: #333;
          border: 1px solid #333;
          color: #fff;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
          i {
            font-size: .9rem;
          }
        }
        &:nth-child(2) {
          .btn {
            background: #fff;
            color: #333;
          }
        }
      }
    }
  }
</style>
