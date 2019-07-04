<template>
    <div style="width: 1200px;margin: 40px auto;" class="detail-table">
        <div class="backTop" @click="backTop">
            <i class="iconfont">&#xe64e;</i>
            <span>{{$t('bby_shouy7')}}</span>
        </div>
        <el-table
        :data="tableData"
        border
        scripe
        style="width: 100%">

      <el-table-column
        prop="createTime"
        label="时间"
        width="180">
      </el-table-column>

      <el-table-column
        prop="currency"
        label="币种"
        width="180">
      </el-table-column>

      <el-table-column
        prop="amount"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="income"
        label="预计收益" >
      </el-table-column>
       <el-table-column
        prop="opetate"
        label="操作" >
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态" >
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
            this.$router.push('/bid')
        },
        manageResopetate (params) { 
        service.manageResopetate(params).then(res => {
            console.log(res)
            if (res.code === 0) {
                this.tableData=res.data.data
                this.total = res.data.total
                if (this.tableData.length > 0) {
                    this.tableData.forEach((item) => {
                        const stateName = item.state === 1 ? "完成" : item.state === 2 ? '待发放' : item.state === 3 ? '待发放' : '已发放'
                        const siteName = item.site === 1 ? "ix" : 'ixx'
                        const opetateName = item.opetate === 1 ? "币盈盈购买" : '本息归还'
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
        this.manageResopetate(this.history)
    }
    },
    created() {
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
