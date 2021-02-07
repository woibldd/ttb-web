<template>
  <div class="fund-container my-fund-container">
    <div class="title-box"> 
      <div>{{ $t('account_exchange') }}</div>
      <div class="title__right"></div>
    </div>   
    <div class="fund-items-content" style="margin-left:0">
      <div class="fund-item-row mb-14">
        <div class="row__label">{{$t('transfer_currency')}}</div>
        <div>
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
      <div class="fund-item-row mb-14">
        <div class="row__label">{{ $t('transfer_side')}}</div>
        <el-select value-key="balance_types" v-model="fromAccount" :placeholder="$t('please_choose')" class="min-input" @change="handleSelectFromAccount">
          <el-option
            v-for="item in accountList"
            :key="item.balance_types"
            :label="$t(balanceList[item.balance_types])"
            :value="item">
          </el-option>
        </el-select>
        <span style="padding:0 10px ">{{$t('transfer_to_a')}}</span>
        <el-select value-key="balance_types" v-model="toAccount" :placeholder="$t('please_choose')" class="min-input" @change="handleSelectToAccount">
          <el-option
            v-for="item in toAccountList"
            :key="item.balance_types"
            :label="$t(balanceList[item.balance_types])"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label">{{$t('transfer_amount')}}</div>
        <div>
          <number-input
            class="number-input"
            v-model="number"
            :scale="8"
            :placeholder="$t('transfer_enter_amountor')"
          />
        </div>
      </div>
      <div class="fund-item-row mb-14">
        <div class="row__label"></div>
        <div>
          {{$t('transfer_able_amount')}}{{fromAccount.m | fixed(8) }} <button @click="all" class="all">{{$t('transfer_all')}}</button>
        </div>
      </div> 
      <div class="fund-item-row mb-14">
        <div class="row__label"></div>
        <div>
          <v-btn
            style="width: 200px"
            class="max-input"
            @click="submit"
            :label="$t('confirm')"/> 
        </div>
      </div>
    </div>  
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="$t('transfer_btc_history')" name="first"></el-tab-pane> 
      <el-table
        :data="tableData"  :empty-text="$t('no_data')"
        style="width: 100%">
        <el-table-column
          prop="currency"
          :label="$t('transfer_currency')"/>
        <el-table-column
          prop="from_balance"
          :label="$t('transfer_from_a')"/>
        <el-table-column
          prop="to_balance"
          :label="$t('transfer_to_a')"/>
        <el-table-column
          prop="amount"
          :label="$t('transfer_amount')"/>
        <!-- <el-table-column
          prop="available"
          :label="$t('balance')" /> -->
        <el-table-column
          prop="create_time"
          width="240"
          :label="$t('transfer_time')"/>
        <el-table-column
          prop="status"
          :label="$t('status')"/>
      </el-table>
    </el-tabs>
    <div class="history__footer pt-10">
      <ix-pagination
        style="float:right"
        :page.sync="pages"
        :is-end="isLastPage"
        :func="getPage"/>

    </div>
  </div>
</template>
<script>
  import { tabs } from 'element-ui';
  import service from '@/modules/service'
  import utils from '@/modules/utils'
  import { state, actions, local } from "@/modules/store"; 
  import ixPagination from '@/components/common/ix-pagination'
  import { getShareAccountList } from '@/modules/api/share_option'


  export default {
    name: 'MyAddress',
    components: {ixPagination},
    props:[],
    data () {
      return  {
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
      }
    },
    async created () {
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
          3 : "future_account",
          4 : "otc_account",
          5 : 'future_account',
          7 : 'future_account', 
          8 : 'shareOption.share_account', 
          9 : 'mining_power.calc_account', 
          10: 'header_nav.defiAccount' }
        return obj
      }
    },
    methods: { 
      all(){
        // Big.RM = 0
        this.number = this.$big(this.fromAccount.m).toFixed(8)
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
      page(page = 1){
        service.getBalanceList({page:page,size:10}).then(res => {
          this.tableData = []
          if (res.code || res.data.length === 0) {
            this.loading = false
          } else {

            this.tableData = res.data.data
            this.loading = false
            if(this.tableData.length < 10){
              this.isLastPage = true
            } else {
              this.isLastPage = false
            }
            for (let i in this.tableData){
              let text = ''
              let text1 = ''
              //let opetate = this.tableData[i].balance

              let balanceList = {
                1 : this.$t("wallet_account"),
                2 : this.$t("trading_account"),
                3 : this.$t("future_account"),
                4 : this.$t("otc_account"),
                5 : this.$t('future_account'),
                7 : this.$t('future_account'), 
                8 : this.$t('shareOption.share_account'), 
                9 : this.$t('mining_power.calc_account'), 
                10: this.$t('header_nav.defiAccount')
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
  .min-input{
    width: 160px;
  }
  .max-input{
    width: 335px;
  }
  .number-input {
    width: 333px;
    line-height: 37px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    text-indent: 15px;
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
    color: $primary;
  }
</style>
