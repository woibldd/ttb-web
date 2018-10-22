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
              v-model="selectCoin"
              @change="changeCoinType"
              value-key="currency">
              <el-option
                v-for="(item, idx) in allCoins"
                :key="idx"
                v-if="item.withdrawable"
                :label="item.currency"
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
          :label="hd.title"/>
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
      loading: false
    }
  },
  async created () {
    await this.getAllCoinTypes()
    await this.getCoinAddress()
  },
  methods: {
    copy (row) {
      copyToClipboard(row.address)
      utils.success(this.$i18n.t('copyed'))
    },
    async getCoinAddress () {
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
          this.allCoins = res.data
          if (this.$route.params.currency) {
            this.selectCoin = this.allCoins.find(item => {
              return item.currency === this.$route.params.currency
            })
          } else {
            this.selectCoin = this.allCoins[0]
          }
        }
      })
    },
    async confirmAdd () {
      if (!this.address) {
        utils.danger(this.$t('add_address_error'))
        return
      }
      const param = {
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
  }
}
</script>
