<template>
  <div class="address-container">
    <div class="fund-container"> 
      <div class="fund-items-content">
        <div class="fund-item-row mb-22" flex="main:left cross:center">
          <div class="row__label">{{ $t('coin') }}</div>
          <div class="row__value">
            <el-select
              v-model="selectCoin"
              style="width: 440px;"
              filterable
              value-key="currency"
              @change="changeCoinType">
              <el-option
                v-for="(item, idx) in allCoins"
                :key="idx"
                :label="item.currency"
                :value="item">
                <b style="display: inline-block;width: 40px">{{ item.currency }}</b> 
              </el-option>
            </el-select>
          </div>
        </div>
        <div flex="main:left cross:center" v-if="selectCoin.currency === 'USDT' || selectCoin.currency === 'SLD'" class="fund-item-row mb-14">
          <div class="row__label">
            <el-popover
              :content="depTip"
              placement="bottom-start"
              title=""
              trigger="hover"
              width="240" effect="dark">
              <el-button slot="reference" type="text" class="lian">{{ $t("link_name") }}</el-button>
            </el-popover>
          </div>
          <div class="row__value">
            <el-select
              v-model="selectLian"
              style="width: 440px;"
              value-key="chain"
              @change="lianSelect">
              <el-option
                v-for="(item, idx) in lianDataList[selectCoin.currency]"
                :key="idx"
                :label="item.currencyName"
                :value="item"/>
            </el-select>
          </div>
        </div>
        <div class="fund-item-row mb-22"  flex="main:left cross:center">
          <div class="row__label">{{ $t('fund.address.address') }}</div>
          <div class="row__value">
            <input
              v-model="address"
              class="input-address pl-10" >
          </div>
        </div>
        <div
          v-if="selectCoin.memo_support"
          class="fund-item-row mb-22"  flex="main:left cross:center">
          <div class="row__label">{{ $t('address_tag') }}</div>
          <div class="row__value">
            <input
              v-model="memo"
              placeholder="Memo"
              class="input-address pl-10" >
          </div>
        </div>
        <div class="fund-item-row mb-22"  flex="main:left cross:center">
          <div class="row__label">{{ $t('note') }}</div>
          <div class="row__value">
            <input
              v-model="description"
              class="input-address pl-10" >
          </div>
        </div> 
        <div class="fund-item-row mb-22" flex="main:left cross:center">
          <div class="row__label"></div>
          <div class="row__value">
            <v-btn
            :label="$t('add_withdraw_addr')"
            style="width: 200px"
            @click="confirmAdd"/>
          </div>
        </div> 
      </div>
    </div>
    <div class="address-list">
      <div class="title-box mb-15">
        <div> {{ $t('withdraw_addr_list') }}</div>
      </div>
      <div class="address-list-table">
        <el-table
          v-loading="loading"
          :data="addressList" 
          class="fund-coin-pool address__table">
          <el-table-column
            v-for="(hd, idx) in header"
            :key="idx"
            :prop="hd.key"
            :label="$t(hd.title)">
            <template slot-scope="scope">
              <span>{{ scope.row[hd.key] }}</span>
              <label 
                v-if="hd.key==='currency' && (scope.row[hd.key]==='USDT' || scope.row[hd.key]==='SLD')" 
                class="chain">
                {{ chainDict[scope.row['chain']] || scope.row['chain'] }} 
              </label>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t(operate.title)"
            header-align="right"
            width="120px"
            align="right"> 
            <template slot-scope="scope">
              <span
                class="my-fund-operate a-copy pointer"
                @click="copy(scope.row)">{{ $t('copy') }}</span>
              <span
                class="my-fund-operate pointer"
                @click="deleteAddr(scope.row)">{{ $t('remove') }}</span>
            </template>
          </el-table-column>
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
    </div>
  </div>
</template>
<script>
import './address.scss'
import copyToClipboard from 'copy-to-clipboard'
import utils from '@/modules/utils'
import service from '@/modules/service'
import { state } from '@/modules/store'
import Vue from 'vue'
export default {
  name: 'MyAddress',
  data() {
    return {
      state,
      address: '',
      memo: '',
      allCoins: [],
      selectCoin: {},
      addressList: [],
      description: '',
      hasMemo: false,
      header: [
        { key: 'currency', title: 'fees_name' },
        { key: 'address', title: 'fund.address.address' },
        { key: 'description', title: 'note' }
      ],
      operate: { key: 'operate', title: 'operation' },
      loading: false,
      lianData: [],
      curreryCoin: '',
      selectLian: {},
      chainDict: {
        OMNI: 'OMNI',
        ETH: 'ERC20',
        TRX: 'TRC20'
      },
      lianDataList :{},
    }
  },
  computed: {
    depTip() {
      return this.state.locale && this.$t('dep_tip')
    }
  },
  async created() {
    await this.getAllCoinTypes()
    await this.getCoinAddress()
  },
  methods: {
    async lianSelect(coin) {
      this.selectCoin = coin
      await this.getCoinAddress()
    },
    copy(row) {
      copyToClipboard(row.address)
      utils.success(this.$i18n.t('copyed'))
    },
    async getCoinAddress() { 
      const param = {
        currency: this.selectCoin.currency
      }
      return service.getMyAddressList(param).then((res) => {
        if (res && res.data) {
          this.addressList = res.data
          this.hasMemo = this.addressList.filter(c => !!c.memo).length
          if (this.hasMemo) {
            this.header.splice(2, 0, { key: 'memo', title: this.$t('address_tag') })
          }
          this.loading = false
        }
      })
    },
    async changeCoinType(coin) {
      this.selectCoin = coin
      await this.getCoinAddress()
    },
    async getAllCoinTypes() {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.lianData = []
          res.data.forEach((item) => {
            if((item.currency === 'USDT' || item.currency === 'SLD') && item.withdrawable) {
              if (item.chain === 'OMNI') { item.currencyName = item.currency + '-' + 'Omni'}
              if (item.chain === 'ETH') { item.currencyName = item.currency + '-' + 'ERC20'}
              if (item.chain === 'TRX') { item.currencyName = item.currency + '-' + 'TRC20'}
              if (item.chain === 'BSC') { item.currencyName = item.currency + '-' + 'BSC'}
              if (item.chain === 'BNB') { item.currencyName = item.currency + '-' + 'BNB'}
              this.lianData.push(item) 
              if (!this.lianDataList[item.currency])  
                this.lianDataList[item.currency] = [] 
              this.lianDataList[item.currency].push(item) 
            } 
          }) 
          this.selectLian = this.lianData[0]
          // this.allCoins = this.removalData(res.data.filter(c => c.depositable))
          this.allCoins = _.uniqBy(res.data.filter(c => c.depositable), 'currency')
          this.allCoins.forEach((item) => {
            if (state.locale === 'zh-CN') {
              Vue.set(item, 'full_name', item.zh_name)
            } else {
              Vue.set(item, 'full_name', item.full_name)
            }
          })
          if (this.$route.params.currency) {
            const currency = this.$route.params.currency.toUpperCase()
            this.selectCoin = this.allCoins.find(item => {
              return item.currency.toUpperCase() === currency
            })
            return
          }
          this.selectCoin = this.allCoins[0]
        }
      })
    },
    removalData(arrData) {
      var hash = {}
      arrData = arrData.reduce(function(item, next) {
        // num_iid??????????????????????????????
        hash[next.currency] ? '' : hash[next.currency] = true && item.push(next)
        return item
      }, [])
      return arrData
    },
    async confirmAdd() {
      if (!this.address) {
        utils.danger(this.$t('add_address_error'))
        return
      }

      const param = {
        chain: (this.selectCoin.currency === 'USDT' || this.selectCoin.currency === 'SLD') ? this.selectLian.chain : '',
        currency: this.selectCoin.currency,
        address: this.address,
        description: this.description
      }
      if (this.selectCoin.memo_support) {
        param.memo = this.memo
      }
      const res = await service.addCoinAddress(param)
      if (!res.code) {
        utils.success(this.$i18n.t('add_withdraw_success'))
        this.address = ''
        this.description = ''
        this.getCoinAddress()
      } else {
        utils.alert(res.message)
      }
    },
    deleteAddr(row) {
      service.deleteCoinAddress({ id: row.id }).then(() => {
        utils.success(this.$t('del_withdraw_success'))
        this.getCoinAddress()
      })
    }
  }
}
</script>
<style lang="scss">
.lian {
  font-size: 14px; 
  color: #666666;

  &:hover, &:focus {
    border-color: transparent !important;
    color: #666666 !important;
  }
}
.chain {
  background-color: #b0edef;
  padding: 3px 8px;
  border-radius: 5px;
}
</style>
