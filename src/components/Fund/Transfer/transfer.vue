<template>
  <div class="fund-container my-fund-container">
    <div class="title-box">

      <div>{{ $t('account_exchange') }}</div>
      <div class="title__right"></div>
    </div>
    <div class="fund-items-content" style="margin-left:0">
      <div class="fund-item-row mb-14">
        <div class="row__label">币种</div>
        <div>
          <el-select v-model="selectCoin" placeholder="请选择" class="max-input">
            <el-option
              v-for="(item, idx) in allCoins"
              :key="idx"
              :label="item.currency"
              :value="item.currency">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label">划转方向</div>
            <el-select v-model="value" placeholder="请选择" class="min-input" @change="transferType(1)">
              <el-option
                v-for="item in oneOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span style="padding:0 10px ">转至</span>
            <el-select v-model="valuea" placeholder="请选择" class="min-input" @change="transferType(2)">
              <el-option
                v-for="item in twoOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label">划转数量</div>
        <div>
          <el-input v-model="number" type="number" placeholder="请输入划转金额" class="max-input"></el-input>
        </div>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label"></div>
        <div>
           可划转数量：{{availableBalance}} <button @click="all" class="all">全部</button>
        </div>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label"></div>
        <div>
          <v-btn
            style="width: 200px"
            class="max-input"
            @click="submit"
            :label="'确定'"/>
          <!-- <el-input v-model="number" placeholder="请输入内容" class="max-input"></el-input> -->
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="BTC划转记录" name="first"></el-tab-pane>
      <!-- <el-tab-pane label="全部划转记录" name="second"></el-tab-pane> -->
        <el-table
         :data="tableData"
         style="width: 100%">
         <el-table-column
           prop="create_time"
           label="时间"/>
           <el-table-column
           prop="currency"
           label="币种"/>
           <el-table-column
           prop="opetate"
           label="操作"/>
           <el-table-column
           prop="amount"
           label="数额"/>
           <el-table-column
             prop="available"
             label="余额"/>
           <el-table-column
             prop="status"
             label="状态"/>

         </el-table-column>
       </el-table>
    </el-tabs>
  </div>
</template>
<script>
import { tabs } from 'element-ui';
import service from '@/modules/service'
import { state, actions, local } from "@/modules/store";

export default {
  name: 'MyAddress',
  data () {
    return  {
      number: '',
      selectCoin:'BTC',
      activeName: 'second',
      allCoins : [{chain: "BTC",
        currency: "BTC",
        depositable: true,
        full_name: "Bitcoin",
        id: "1",
        memo_support: false,
        min_confirm: 3,
        min_deposit_amount: "0.001",
        min_review_amount: "0",
        min_withdraw_amount: "0.002",
        scan_url: "https://explorer.bitcoin.com/btc/tx/${txid}",
        withdraw_fee: "0.001"
        }
      ],
      valuea:1,
      value:2,
      availableBalance:0,
      exchangeBalance:'',
      contractBalance:'',
      tableData: [],
      oneOpt: [{
        value: 1,
        label: '币币账户'
      }, {
        value: 2,
        label: '合约账户'
      }],
      twoOpt: [{
        value: 1,
        label: '币币账户'
      }, {
        value: 2,
        label: '合约账户'
      }]
    }
  },
  async created () {
  },
  watch:{
    value(newVal){
      this.value  === 1 ? this.availableBalance = (this.exchangeBalance.available *1).toFixed(8) : this.availableBalance = (this.contractBalance.available* 1).toFixed(8)
    }
  },
  methods: {
    transferType(type){
      this.availableBalance = 0
      if (type === 1) {
        this.value  === 1 ? this.valuea = 2 : this.valuea = 1
      } else {
        this.valuea === 1 ? this.value  = 2 : this.value  = 1
      }
    },
    all(){
      this.number = this.availableBalance
    },
    async submit(){
      if (0>= this.number || this.number === '') {
        utils.alert('输入数字不合法')
        return
      }
      if (this.number > this.availableBalance) {
        utils.alert('余额不足')
        return
      }
      let $this = this
      let res = await service.transferContractFund({
        amount: this.number,
        currency: "BTC",
        type: this.value
      })
      if (!res.code) {
        utils.success('划转成功')
        this.balance()
        this.page()
        service.getContractBalanceByPair({
          symbol: 'BTC'
        }).then(res => {
          state.ct.holding = res.data
        })
      } else {
        utils.alert(res.message)
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async balance(){
      let [exchangeBalance, contractBalance] = await Promise.all([service.getBalanceByPair('BTC'), service.getContractBalanceByPair({
        symbol: 'BTC'
      })])
      if (exchangeBalance && exchangeBalance.length) {
        this.exchangeBalance = exchangeBalance[0]
      }
      if (contractBalance) {
        this.contractBalance = contractBalance.data
      }
      this.value  === 1 ? this.availableBalance = (this.exchangeBalance.available *1).toFixed(8) : this.availableBalance = (this.contractBalance.available* 1).toFixed(8)
    },
    page(){
      service.getBalanceList({page:1,size:10}).then(res => {
        if (res.code || res.data.length === 0) {
          this.loading = false
        } else {
          // res.data = res.data.map(r => {
          //   if (r.type === 7) {
          //     r.state = 0
          //   }
          //   return r
          // })
          this.tableData = res.data
          this.loading = false
          for (let i in this.tableData){
            let text = ''
            let text1 = ''
            switch  (this.tableData[i].opetate ) {
            case 1:
              text="转入";
              break;
            case 2:
              text="传出";
              break;
            case 3:
              text="当日清算";
              break;
            }
            switch  (this.tableData[i].status ) {
            case 0:
              text1="失败";
              break;
            case 1:
              text1="成功";
              break;
            }
            this.tableData[i].opetate = text
            this.tableData[i].status = text1
          }
        }
      })
    }
  },
  created(){
    this.balance()
    this.page()
  }
}
</script>
<style lang="scss" scoped>
.min-input{
  width: 120px;
}
.max-input{
  width: 288px;
}
.page-fund-container .fund-items-content .fund-item-row .row__label{
  color:#666;
  font-weight: normal;
}
.all{
  margin-left: 20px;
  background-color: #fff;
  cursor: pointer;
  border:none;
  color:#aa8b61
}
</style>
