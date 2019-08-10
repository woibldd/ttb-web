<template>
    <div style="width: 1200px;margin: 40px auto;" class="detail-table">
        <div class="backTop" @click="backTop">
            <i class="iconfont">&#xe64e;</i>
            <span>{{$t('bby_shouy7')}}</span>
        </div>
        <el-table  
        :data="tableData"
        :empty-text="$t('no_data')"
        border
        scripe
        style="width: 100%">

      <el-table-column
        prop="createTime"
       :label="$t('time')"
        width="180">
      </el-table-column>

      <el-table-column
        prop="currency"
       :label="$t('currency')"
        width="180">
      </el-table-column>

      <el-table-column
        prop="amount"
       :label="$t('otc_trans_idsl')">
      </el-table-column>
      <el-table-column
        prop="income"
     :label="$t('bby_shouy18')" >
      </el-table-column>
       <el-table-column
        prop="opetate"
      :label="$t('operation')">
      </el-table-column>
      <el-table-column
        prop="state"
      :label="$t('status')" >
      </el-table-column>
   </el-table>
   <div style="text-align:center;margin-top: 20px;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange">
          </el-pagination>
      </div>
    </div>
</template>

<script>
import Vue from 'vue'
import service from '@/modules/service'
export default {
    data() {
        return {
            tableData: [],
            history: {
                start:1,
                pageSize :10,
                opetate :0
            },
            total: 0
        }
    },
    methods: {
         backTop () {
            this.$router.push('/snowball')
        },
        manageResopetate (params) {
        service.manageResopetate(params).then(res => {
            console.log(res)
            if (res.code === 0) {
                this.tableData=res.data.data
                this.total = res.data.total
                if (this.tableData.length > 0) {
                    this.tableData.forEach((item) => {
                        const stateName = item.state === 1 ?  $t('qrcode_close') : item.state === 2 ? $t('waiting_for_release') : item.state === 3 ? $t('waiting_for_release') : $t('bby_shise6')
                        const siteName = item.site === 1 ? "ix" : 'ixx'
                        const opetateName = item.opetate === 1 ? $t('bby_shise7') : $t('bby_shise8')
                        Vue.set(item, 'state', stateName)
                        Vue.set(item, 'site', siteName)
                        Vue.set(item, 'opetate', opetateName)
                    })
                }
            }
        })
      },

      
      currentChange(e) {
          this.history.start = e
      console.log('1111111111111111111111111111111111111111111111111111111111111')
          this.manageResopetate(this.history)
      }
    },
    created() {
      console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
        this.manageResopetate(this.history)
    }
}
</script>

<style lang="scss">
  $main-bg: #00CED2;
  $disabled-bg: #F2F3F5;
  $white-color: #fff;
  $disabled-color: #B0B4B9;
  @font-face {
    font-family: 'iconfont';  /* project id 1244642 */
    src: url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.eot');
    src: url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.woff') format('woff'),
    url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1244642_2j1jpa97dqh.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
.detail-table {
    .backTop {
      padding: 16px 0;
      font-size: 14px;
      color: $main-bg;
      cursor: pointer;
      i {
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
}
</style>
