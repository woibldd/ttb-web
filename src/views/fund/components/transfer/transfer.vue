<template>
  <div class="fund-container my-fund-container"> 
    <div class="fund-items-content" style="margin-left:0">
      <div class="fund-item-row mb-14" flex="main:left cross:center">
        <div class="row__label">{{$t('transfer_currency')}}</div>
        <div class="row__value">
          <el-select v-model="selectCurrency" 
            :placeholder="$t('please_choose')"
            class="max-input"
            value-key="name"
            @change="changeCurrency"
            :filterable="true">
            <el-option v-for="item in currencyList"  
              :key="item.name" 
              :label="item.name"
              :value="item"> 
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="fund-item-row mb-14" flex="main:left cross:center">
        <div class="row__label">{{ $t('transfer_side')}}</div>
        <div class="row__value">
          <el-select value-key="balance_types" v-model="fromAccount" :placeholder="$t('please_choose')" class="min-input" @change="handleSelectFromAccount">
            <el-option
              v-for="item in accountList"
              :key="item.balance_types"
              :label="$t(balanceList[item.balance_types])"
              :value="item">
            </el-option>
          </el-select>
          <label @click="handleClickExchange" style="padding:0 10px "> <icon class="my-icon" name="transfer"/> </label>
          <el-select value-key="balance_types" v-model="toAccount" :placeholder="$t('please_choose')" class="min-input" @change="handleSelectToAccount">
            <el-option
              v-for="item in toAccountList"
              :key="item.balance_types"
              :label="$t(balanceList[item.balance_types])"
              :value="item">
            </el-option>
          </el-select> 
        </div>
      </div>
      <div class="fund-item-row mb-14" flex="main:left cross:center">
        <div class="row__label">{{$t('transfer_amount')}}</div>
        <div class="row__value">
          <number-input
            class="number-input"
            v-model="number"
            :scale="8"
            :placeholder="$t('transfer_enter_amountor')"
          />
        </div>
      </div>
      <div  class="fund-item-row" flex="main:left cross:center" v-if="state.siteName==='BachEx'">
        <div class="row__label"></div>
        <div class="text-primary row__value" style="font-size: 12px;"> 
          <span v-if="state.locale==='zh-CN'">体验金赠送部分只能用来抵扣手续费和基础保证金部分，不允许进行划转提币。</span>
          <span v-else>The trading bonus can only be used to redeem as the transaction fee and the basic deposit part, not  transferable or withdrawable.</span> 
        </div>
      </div> 
      <div class="fund-item-row mb-14"  style="font-size: 12px;" flex="main:left cross:center">
        <div class="row__label"></div>
        <div class="row__value light"> 
          {{$t('transfer_able_amount')}}{{fromAccount.m | fixed(8) }} <button @click="all" class="all"  style="font-size: 12px;">{{$t('transfer_all')}}</button>
        </div>
      </div> 
      <div class="fund-item-row mb-14" flex="main:left cross:center">
        <div class="row__label"></div>
        <div class="row__value">
          <v-btn
            style="width: 200px"
            class="max-input"
            @click="submit"
            :label="$t('confirm')"/> 
        </div>
      </div>
    </div>  
    <div class="fund-transfer-history">
      <div class="label">
        <span v-html="$t('transfer_btc_history')" >划转记录</span>
      </div> 
      <div class="fund-transfer-table">
        <el-table
          :data="tableData" 
          style="width: 100%">
          <el-table-column
            prop="currency"
            :label="$t('transfer_currency')"/>
          <el-table-column
            align="right"
            header-align="right"
            prop="from_balance"
            :label="$t('transfer_from_a')"/>
          <el-table-column
            align="right"
            header-align="right"
            prop="to_balance"
            :label="$t('transfer_to_a')"/>
          <el-table-column
            align="right"
            header-align="right"
            prop="amount"
            :label="$t('transfer_amount')"/>
          <!-- <el-table-column
            prop="available"
            :label="$t('balance')" /> -->
          <el-table-column
            align="right"
            header-align="right"
            prop="create_time"
            width="240"
            :label="$t('transfer_time')"/>
          <el-table-column
            align="right"
            header-align="right"
            prop="status"
            :label="$t('status')"/>
          <template slot="empty">
            <div style="padding: 40px 0;">
              <p style="height: 70px;">
                <img src="~@/assets/table-empty.png" alt="">
              </p>  
              <p style="line-height: 30px;">{{$t('shareHistory.noData')}}</p>  
            </div>
          </template>
        </el-table> 
      </div>
        <div class="history__footer pt-10">
          <!-- <ix-pagination
            style="float:right"
            :page.sync="pages"
            :is-end="isLastPage"
            :func="getPage"/>  --> 
          <el-pagination
            v-if="!!pageConfig.total"
            flex="main:center"
            style="margin-top:20px"
            background
            :current-page="pageConfig.page" 
            :page-size="pageConfig.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageConfig.total"
            @size-change="page"
            @current-change="page"
          /> 
        </div>
    </div> 
  </div>
</template>
<script> 
  import service from '@/modules/service'
  import utils from '@/modules/utils'
  import { state, actions, local } from "@/modules/store"; 
  // import ixPagination from '@/components/common/ix-pagination' 

  export default {
    name: 'MyAddress',
    // components: {ixPagination},
    props:[],
    data () {
      return  {
        state,
        number: '',
        selectCoin:'',
        activeName: 'second',
        pages:1,
        text: 'mmm',
        isLastPage:false,
        allCoins : [],
        accountTo: '',
        accountFrom: 1, 
        tableData: [], 
        accountTypes2: [],
        selectCurrency: {},
        currencyList: [], 
        accountList: [],
        currencyList:[],
        selectCurrency: {},
        fromAccount: {},
        toAccount: {},
        fromName: '',
        toName: '',
        pageConfig: {
          page: 1,
          size: 10,
          total: 0
        }
      }
    }, 
    computed: {
      toAccountList() {
        return this.accountList.filter(item => item != this.fromAccount)
      },
      currencyFilterList() {
        return this.currencyList.filter(item => item.name.indexOf(this.search.toUpperCase()) > -1)
      }, 
      balanceList() {
        let obj = {
          1 : "wallet_account",
          2 : "trading_account",
          3 : "contract_account",
          4 : "otc_account",
          5 : 'contract_account',
          7 : 'contract_account', 
          8 : 'shareOption.share_account', 
          10: 'header_nav.defiAccount', 
          11: 'header_nav.blend' }
        return obj
      }
    },
    methods: { 
      all(){ 
        this.number = this.$big(this.fromAccount.m).round(8, 0).toFixed(8)
      },
      handleClickExchange() {
        const c = this.fromAccount 
        this.fromAccount = this.toAccount
        this.toAccount = c
      },
      changeCurrency(item) {
        this.selectCurrency = item 
        this.accountList = item.accounts
        this.fromAccount = this.accountList.find(item => item.balance_types === this.fromName) || this.accountList[0]
        this.fromName = this.fromAccount.balance_types
        this.toAccount = this.toAccountList[0] 
      },
      handleSelectFromAccount(item) { 
        this.amount = ''
        this.fromAccount = item
        if (this.toAccount === item) {
          this.toAccount = this.toAccountList[0]
        } 
      },
      handleSelectToAccount(item) {
        this.toAccount = item 
      },
      async submit(){
        if (0 >= this.number || this.number === '') {
          utils.alert(this.$t('transfer_enter_error'))
          return
        }
        if (this.$big(this.number).gt(this.fromAccount.m)) {
          utils.alert(this.$t('amount_over'))
          return
        }
        let $this = this 
        let res = await service.transferSelf({
          amount: this.number,
          currency: this.selectCurrency.name,
          from: this.fromAccount.balance_types,
          to: this.toAccount.balance_types,
          type: 1
        })
        if (!res.code) {
          utils.success(this.$t('transfer_success'))
          this.fetchData()
          this.page()
          this.number = '' 
        } else {
          utils.alert(res.message)
        }
      },  
      getPage(){
        this.page(this.pages)
      },
      page(currentPage){
        this.pageConfig.page = currentPage
        const {page, size} = this.pageConfig
        service.getBalanceList({page, size}).then(res => {
          this.tableData = []
          if (res.code || res.data.length === 0) {
            this.loading = false
          } else { 
            this.tableData = res.data.data
            this.pageConfig.total = res.data.total
            this.loading = false
            // if(this.tableData.length < 10){
            //   this.isLastPage = true
            // } else {
            //   this.isLastPage = false
            // }
            for (let i in this.tableData){
              let text = ''
              let text1 = ''
              //let opetate = this.tableData[i].balance

              let balanceList = {
                1 : this.$t("wallet_account"),
                2 : this.$t("trading_account"),
                3 : this.$t("contract_account"),
                4 : this.$t("otc_account"),
                5 : this.$t('contract_account'),
                7 : this.$t('contract_account'), 
                8 : this.$t('shareOption.share_account'), 
                10: this.$t('header_nav.defiAccount'), 
                11: this.$t('header_nav.blend')
              }

              this.tableData[i].from_balance = balanceList[this.tableData[i].from_balance]
              this.tableData[i].to_balance = balanceList[this.tableData[i].to_balance]

              switch  (this.tableData[i].status ) {
                case 0:
                  text1=this.$t("transfer_fail"); //失败
                  break;
                case 1:
                  text1=this.$t("transfer_complete"); //完成
                  break;
              }

              this.tableData[i].available = (this.tableData[i].available*1).toFixed(8)
              this.tableData[i].status = text1
            }
          }
        })
      },   
      async fetchData() {
        this.currencyList = []
        const res = await service.getAllTransferList() 
        if (res && !res.code) {
          const data = res.data
          Object.keys(data).map(key => {
            const item = {
              name: key,
              accounts: data[key]
            }
            this.currencyList.push(item)
          }) 
          if (this.currency) { 
            this.selectCurrency = this.currencyList.find(item => item.name===this.currency)
            if (this.selectCurrency) {
              this.accountList = this.selectCurrency.accounts
              if (this.from) {
                this.fromName = this.from 
                this.fromAccount = this.accountList.find(item => item.balance_types === this.from) 
                this.toAccount = this.toAccountList[0]
              }
            }
          } else {
            this.selectCurrency = this.currencyList[0]
            this.accountList = this.selectCurrency.accounts
            this.fromAccount = this.accountList[0]
            this.toAccount = this.toAccountList[0]
          }
        } 
      },
      
    },
    async created(){  
      this.fetchData() 
      this.page()
  
    } 
  }
</script>
<style lang="scss" scoped>
  .fund-items-content {
    padding: 78px 0 32px;
    border: 1px solid #e8e8e8;
    .fund-item-row {
      font-size: 14px; 
      .row__label {
        margin-left: 310px;
        width: 108px; 
        color:#666;
        font-weight: normal;
      }
      .row__value {
        .min-input{
          width: 160px;
        }
        .max-input{
          width: 373px;
        }
        .number-input {
          width: 367px;
          line-height: 37px;
          border: 1px solid #DCDFE6;
          border-radius: 5px;
          text-indent: 15px;
        }
        .my-icon {
          color: $primary !important;
          font-size: 25px;
        }
        &.light {
          color: #909090;
        }
      }
    }
  } 
  .fund-transfer-history { 
    .label {
      margin-top:40px;
      margin-bottom: 17px;
      color: #41444D
    }
    .fund-transfer-table {
      border: 1px solid #E6E6E6;
      border-bottom: none; 
      .el-table { 
        color:#373737;
      }
      /deep/ .el-table__header { 
        tr th { 
          font-weight: 400;
          color:#767676; 
        }
      } 
    }
  }
  .all{
    margin-left: 20px;
    background-color: #fff;
    cursor: pointer;
    border:none;
    color: $primary;
  }
</style>
