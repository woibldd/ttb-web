<template>
  <div class="address-container">
    <div class="fund-container">
      <div class="title-box">
        <div> {{ $t('deposit') }}</div>
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
        <div> {{ $t('地址列表') }}</div>
      </div>
      <el-table
        :data="addressList"
        class="fund-coin-pool address__table">
        <el-table-column
          v-for="(hd, idx) in header"
          :key="idx"
          :prop="hd.key"
          :label="hd.title"/>

        <el-table-column
          header-align='right'
          width="200px"
          align="right"
          :label="operate.title">
          <!-- <span>解锁/锁仓</span> -->
          <template slot-scope="scope">
            <span
              @click="copy(scope.row)"
              class="my-fund-operate a-copy cursor-default ">复制</span>
            <span
              @click="deleteAddr(scope.row)"
              class="my-fund-operate cursor-default ">删除</span>
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
      allCoins: [],
      selectCoin: {},
      addressList: [],
      description: '',
      header: [
        {key: 'currency', title: '币种'},
        {key: 'address', title: '提币地址'},
        {key: 'description', title: '备注'}
      ],
      operate: {key: 'operate', title: '操作'}

    }
  },
  async created () {
    await this.getAllCoinTypes()
    await this.getCoinAddress()
  },
  methods: {
    copy (row) {
      console.log(row)
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
        }
      })
    },
    async changeCoinType (coin) {
      console.log(coin)
      this.selectCoin = coin
      await this.getCoinAddress()
    },
    async getAllCoinTypes () {
      await service.getAllCoinTypes().then(res => {
        if (res && res.data) {
          this.allCoins = res.data
          this.selectCoin = this.allCoins[0]
        }
      })
    },
    confirmAdd () {
      const param = {
        currency: this.selectCoin.currency,
        address: this.address,
        description: this.description
      }
      service.addCoinAddress(param).then(res => {
        utils.success(this.$i18n.t('add_withdraw_success'))
        this.address = ''
        this.description = ''
        this.getCoinAddress()
      })
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
