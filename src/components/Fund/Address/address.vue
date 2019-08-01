<template>
  <div class="address-container">
    <div class="fund-container">
      <div class="title-box">
        <div> {{ $t('address_manage') }}</div>
      </div>
      <div class="fund-items-content">
        <div class="fund-item-row mb-14">
          <div class="row__label">{{ $t('currency') }}</div>
          <div class="row__value">
           <el-select
                style="width: 440px;"
                v-model="selectCoin"
                filterable
                @change="changeCoinType"
                value-key="currency">
                <el-option
                v-for="(item, idx) in allCoins"
                :key="idx"
                :label="item.currency"
                :value="item">
                <b style="display: inline-block;width: 40px">{{ item.currency }}</b>
                <!-- <span style="color: #CCC;font-size: 12px;padding-left: 20px;">
                    {{ item.full_name }}
                </span> -->
                </el-option>
            </el-select>
          </div>
        </div>
        <div class="fund-item-row mb-14" v-if="selectCoin.currency === 'USDT'">
            <div class="row__label">
            <el-popover
                placement="bottom-start"
                title=""
                trigger="hover"
                width="240"
                effect="dark" :content="depTip">
                <el-button type="text" slot="reference" class="lian">链名称</el-button>
            </el-popover>
            </div>
            <div class="row__value">
            <el-select
                @change="lianSelect"
                style="width: 440px;"
                v-model="selectLian"
                value-key="chain">
                <el-option
                v-for="(item, idx) in lianData"
                :key="idx"
                :label="item.currencyName"
                :value="item"/>
            </el-select>
            </div>
        </div>
        <div class="fund-item-row mb-14">
          <div class="row__label">{{ $t('withdraw_addr') }}</div>
          <div class="row__value">
            <input
              v-model="address"
              class="input-address pl-10" >
          </div>
        </div>
        <div
          class="fund-item-row mb-14"
          v-if="selectCoin.memo_support">
          <div class="row__label">{{ $t('address_tag') }}</div>
          <div class="row__value">
            <input
              v-model="memo"
              placeholder="Memo"
              class="input-address pl-10" >
          </div>
        </div>
        <div class="fund-item-row mb-14">
          <div class="row__label">{{ $t('note') }}</div>
          <div class="row__value">
            <input
              v-model="description"
              class="input-address pl-10" >
          </div>
        </div>
        <div class="fund-item-other">
          <v-btn
            style="width: 200px"
            @click="confirmAdd"
            :label="$t('add_withdraw_addr')"/>
        </div>
      </div>
    </div>
    <div class="address-list">
      <div class="title-box mb-30">
        <div> {{ $t('withdraw_addr_list') }}</div>
      </div>
      <el-table
        v-loading="loading"
        :data="addressList"
        height="400"
        class="fund-coin-pool address__table">
        <el-table-column
          v-for="(hd, idx) in header"
          :key="idx"
          :prop="hd.key"
          :label="hd.title"> 
          <template slot-scope="scope">
            <span>{{scope.row[hd.key]}}</span>
            <label class='chain' v-if="hd.key==='currency' && scope.row[hd.key]==='USDT'">
              {{scope.row['chain'] === 'ETH' ? "ERC20" : 'OMNI'}}
            </label>
          </template>
        </el-table-column>
        <el-table-column
          header-align='right'
          width="120px"
          align="right"
          :label="operate.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <span
              @click="copy(scope.row)"
              class="my-fund-operate a-copy pointer">{{ $t('copy') }}</span>
            <span
              @click="deleteAddr(scope.row)"
              class="my-fund-operate pointer">{{ $t('remove') }}</span>
          </template>
        </el-table-column>
      </el-table>
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
  data () {
    return {
      address: '',
      memo: '',
      allCoins: [],
      selectCoin: {},
      addressList: [],
      description: '',
      hasMemo: false,
      header: [
        {key: 'currency', title: this.$t('fees_name')},
        {key: 'address', title: this.$t('withdraw_addr')},
        {key: 'description', title: this.$t('note')}
      ],
      operate: {key: 'operate', title: this.$t('operation')},
      loading: false,
      lianData: [],
      curreryCoin: '',
      selectLian: {},
      state
    }
  },
  async created () {
    await this.getAllCoinTypes()
    await this.getCoinAddress()
  },
  methods: {
    async lianSelect (coin) {
      this.selectCoin = coin
      await this.getCoinAddress()
    },
    copy (row) {
      copyToClipboard(row.address)
      utils.success(this.$i18n.t('copyed'))
    },
    async getCoinAddress () {
      console.log('getCoinAddressgetCoinAddressgetCoinAddressgetCoinAddressgetCoinAddress')
      const param = {
        currency: this.selectCoin.currency
      }
      return service.getMyAddressList(param).then((res) => {
        if (res && res.data) {
          this.addressList = res.data
          this.hasMemo = this.addressList.filter(c => !!c.memo).length
          if (this.hasMemo) {
            this.header.splice(2, 0, {key: 'memo', title: this.$t('address_tag')})
          }
          this.loading = false
        }
      })
    },
    async changeCoinType (coin) {
      this.selectCoin = coin
      await this.getCoinAddress()
    },
    async getAllCoinTypes () {
      await service.getAllCoinTypes().then(res => {
         if (res && res.data) {
          this.lianData = []
          res.data.forEach((item) => {
            if(item.currency === 'USDT') {
              this.lianData.push(item)
            }
          })
          this.lianData.forEach((item) => {
            if (item.chain === 'OMNI') {
              Vue.set(item, 'currencyName', item.currency + '-' + 'Omni')
            } else {
              Vue.set(item, 'currencyName', item.currency + '-' + 'ERC20')
            }
          })
          this.selectLian = this.lianData[1]
          //this.allCoins = this.removalData(res.data.filter(c => c.depositable)) 
          this.allCoins =  _.uniqBy(res.data.filter(c => c.depositable), "currency");
          this.allCoins.forEach((item) => {
            if(state.locale === 'zh-CN') {
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
    removalData (arrData) {
      var hash = {}
      arrData = arrData.reduce(function (item, next) {
        // num_iid是你要以什么属性去重
        hash[next.currency] ? '' : hash[next.currency] = true && item.push(next)
        return item
      }, [])
      return arrData
    },
    async confirmAdd () {
      if (!this.address) {
        utils.danger(this.$t('add_address_error'))
        return
      }
      
      const param = {
        chain: this.selectCoin.currency === 'USDT' ? this.selectLian.chain : '',
        currency: this.selectCoin.currency,
        address: this.address,
        description: this.description
      }
      if (this.selectCoin.memo_support) {
        param.memo = this.memo
      }
      let res = await service.addCoinAddress(param)
      if (!res.code) {
        utils.success(this.$i18n.t('add_withdraw_success'))
        this.address = ''
        this.description = ''
        this.getCoinAddress()
      } else {
        utils.alert(res.message)
      }
    },
    deleteAddr (row) {
      service.deleteCoinAddress({id: row.id}).then(() => {
        utils.success(this.$t('del_withdraw_success'))
        this.getCoinAddress()
      })
    }
  },
  computed: {
    depTip () {
      return this.state.locale && this.$t('dep_tip')
    }
  }
}
</script>
<style lang="scss">
.lian {
  font-size: 14px;
  font-weight: bold;
  color: #333333;

  &:hover, &:focus {
    border-color: transparent !important;
    color: #333333 !important;
  }
}
.chain {
  background-color: #b0edef;
  padding: 3px 8px;
  border-radius: 5px;
}
</style>