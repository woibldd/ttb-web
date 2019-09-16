<template>
  <div class="page-fund-container">
    <div class="page-fund-content">
      <fund-left/>
      <div class="fund-right">
        <router-view :key="this.$route.path"/>
      </div>
    </div>
  </div>
</template>

<script>
import FundLeft from './left'
import responsiveScale from '@/mixins/responsiveScale'

export default {
  name: 'OTC',
  components: {
    FundLeft
  },
  mixins: [responsiveScale],
  computed: {
  }

}
</script>

<style lang="scss">
.el-table__body-wrapper {
  overflow: hidden !important;
}

.page-fund-container{
    background: #ffffff;
    min-width: 1180px;
    padding-top: 60px;
    padding-bottom: 100px;
    .page-fund-content {
        width: 1180px;
        margin: 0 auto;
        display: flex;
    }

    .title__second {
        color: $text-light;
        font-size: 18px;
        font-weight: 400;
    }

    .fund-history {
        padding-left: 10px;
        padding-right: 10px;
        display: inline-block;
        height:28px;
        line-height: 28px;
        text-align: center;
        border:1px solid #999;
        border-radius:14px;
        color: #999;
        font-size: 14px;
        cursor: pointer;
    }

    .fund-right {
        box-sizing: border-box;
        padding-left: 60px;
    }
    .fund-container {
        box-sizing: border-box;
        width: 920px;

        .title-box {
            width: 100%;
            height: 40px;
            font-size: 18px;
            font-weight: 600;
            color: $text-strong;
            border-bottom: 1px solid #e6e6e6;
            display: flex;
            justify-content: space-between;
            padding-bottom: 15px;
        }
        .eos-deposit-tips {
            color: #FBA917;
            height: 32px;
            padding-top: 10px;
        }
    }
    .fund-items-content{
        margin: 54px auto 0;
        width: 700px;

        .fund-item-row{
            display: flex;
            height: 40px;
            line-height: 40px;

            .row__label{
                font-size: 14px;
                font-weight: bold;
                color:$text-strong;
                width: 100px;
            }
        }

        .fund-item-other {
            padding-left: 100px;
        }
    }

    .fund__spot {
        display: inline-block;
        width:4px;
        height:4px;
        background:rgba(124,124,124,1);
        border-radius:50%;
    }
}

</style>
