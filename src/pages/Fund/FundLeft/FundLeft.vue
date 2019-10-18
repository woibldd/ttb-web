<template>
  <div class="fund-left-container">
    <div class="left-menu-container left-menu-nobottom">
<!--      <p class="left-menu-title">-->
<!--        <icon name="fund-history-money"/>-->
<!--        <span class="menu-title">{{ $t('wallets_nav_asset') }} </span>-->
<!--      </p>-->
<!--      <ul class="left-menu-list">-->
<!--        <li class="active">-->
<!--          <router-link-->
<!--            class="menu-name"-->
<!--            active-class="active"-->
<!--            to="/fund/my">{{ $t('capital_manage') }}-->
<!--          </router-link>-->
<!--          <div class="sub-menu-group">-->
<!--            <router-link-->
<!--              class="sub-menu-item"-->
<!--              active-class="active"-->
<!--              to="/fund/my/assets">{{ $t('trading_account') }}-->
<!--            </router-link>-->

<!--            <router-link-->
<!--              class="sub-menu-item"-->
<!--              active-class="active"-->
<!--              to="/fund/my/contract">{{ $t('contract_account') }}-->
<!--            </router-link>-->
<!--          </div>-->
<!--        </li>-->
<!--        <li class="">-->
<!--          <router-link-->
<!--            class="menu-name"-->
<!--            active-class="active"-->
<!--            to="/fund/deposit">{{ $t('deposit') }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="">-->
<!--          <router-link-->
<!--            class="menu-name"-->
<!--            active-class="active"-->
<!--            to="/fund/withdraw">{{ $t('withdraw') }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="">-->
<!--          <router-link-->
<!--            class="menu-name"-->
<!--            active-class="active"-->
<!--            :to="'/fund/transfer'">{{ $t('account_exchange') }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--        <li class="">-->
<!--          <router-link-->
<!--            class="menu-name"-->
<!--            to="/fund/address"-->
<!--            active-class="active">{{ $t('address_manage') }}-->
<!--          </router-link>-->
<!--        </li>-->
<!--      </ul>-->

      <!--资金纵览-->
      <dl>
        <dt>
          <icon name="fund-history-money"/>
          <span class="menu-title">{{ $t('wallets_nav_asset') }} </span>
        </dt>
        <dd>
          <router-link
            to="/fund/capital">{{ $t('capital_manage') }}
          </router-link>
        </dd>
      </dl>
      <!--资金账户-->
      <dl>
        <dt>
          <icon name="wallet"/>
          <span class="menu-title"> {{$t('wallet_account')}} </span>
        </dt>
        <dd>
          <router-link
            class="menu-name"
            to="/fund/my/assets">{{$t('wallet_account')}}
          </router-link>
        </dd>
        <dd>
          <router-link
            class="menu-name"
            to="/fund/deposit">{{ $t('deposit') }}
          </router-link>
        </dd>
        <dd>
          <router-link
            class="menu-name"
            to="/fund/withdraw">{{ $t('withdraw') }}
          </router-link>
        </dd>
        <dd>
          <router-link
            class="menu-name"
            :to="'/fund/transfer'">{{ $t('account_exchange') }}
          </router-link>
        </dd>
      </dl>
      <!--交易账户-->
       <dl>
        <dt>
          <icon name="transaction"/>
          <span class="menu-title"> {{ $t('otc_otutcol_12') }} </span>
        </dt>
        <dd>
          <router-link
            class="sub-menu-item"
            to="/fund/fTrade">{{ $t('otc_account') }}
          </router-link>
        </dd>
        <dd>
          <router-link
            class="sub-menu-item"
            to="/fund/bTrade">{{ $t('trading_account') }}
          </router-link>
        </dd>
        <dd>
          <router-link
            class="sub-menu-item"
            to="/fund/hyTrade">{{ $t('contract_account') }}
          </router-link>
        </dd> 
        <dd>
          <router-link
            class="sub-menu-item"
            to="/fund/share">{{ $t('share_account') }}
          </router-link>
        </dd> 
       </dl>
      <dl class="address_dl">
        <dd>
          <router-link
            class="menu-name"
            to="/fund/address"
          >{{ $t('address_manage') }}
          </router-link>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default{

}
</script>
<style lang="scss" scoped>
  .fund-left-container {
    float: left;

    .left-menu-nobottom {
      border-bottom: 0;
      margin-bottom: 0;
      padding-top:10px;
    }

    .left-menu-container {
      dt {
        padding: 12px 6px;
        font-weight: 400;
      }
      dd {
        .router-link-active {
          background: $profile-menu-bg;
          color: $primary;
          &::after {
            background: $primary;
          }
        }
        a {
          padding: 12px 0 12px 40px;
          position: relative;
          color: #333;
          display: block;
          &::after {
            content: '';
            width: 4px;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: transparent;
          }
          &:hover {
            background: $profile-menu-bg;
            color: $primary;
            &::after {
              background: $primary;
            }
          }
        }
        &:last-child {
          border-bottom: 1px solid #ececec
        }
      }
      background: #fff;
      position: relative;
      /*padding-top: 20px;*/
      /*padding-bottom: 20px;*/
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

          &.active, &:hover {
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
            color: #C9AA6D;
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
</style>
