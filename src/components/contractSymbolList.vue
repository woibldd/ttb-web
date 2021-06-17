<template> 
  <div 
    :class="['symlist-container', state.skin]"
    :style="{height: `${height}px`}">   
    <table class="c-21" style="width: 100%;">
      <tr>
        <th  class="pl-10 pt-8 pb-8 f17 left" span="3">
          <span>{{ $t('contract.forward_contract') }}</span> 
        </th> 
      </tr>
      <tr v-for="(product,index) in allSymbolList.mix"
        class="pointer product-list"
        :key="index"
        :class="{active:pair === product.symbol}"
        @click="handleProductsChange(product)">
        <td class=" pl-10 pt-5 pb-5 "> 
          <p style="white-space: nowrap;">
            <icon :name="`X-${product.currency}`" />
            {{ `${product.name}` }}
          </p> 
        </td>
        <td :class="[(product.MIX || {}).increment_24h > 0?'text-success':'text-danger']">{{(product.MIX || {}).current}}</td>
        <td :class="[(product.MIX || {}).increment_24h > 0?'text-success':'text-danger']">{{ calcIncreaseRate(product) }}%</td>
      </tr>  
      <tr v-if="allSymbolList.future || allSymbolList.unit">
        <th  class="pl-10 pt-8 pb-8 f17 left" span="3">
          <span>{{ $t('contract.reverse_contract') }}</span>  
        </th>
      </tr>
      <tr v-for="(product,index) in allSymbolList.future"
        class="pointer product-list"
        :key="index"
        :class="{active:pair === product.name}"
        @click="handleProductsChange(product)">
        <td class=" pl-10 pt-5 pb-5 "> 
          <p style="white-space: nowrap;">
            <icon :name="`X-${product.product_name}`" />
            {{ `${product.product_name} ${$t('contract.swap')}` }}
          </p> 
        </td>
        <td :class="[(product.FUTURE || {}).increment_24h > 0?'text-success':'text-danger']">{{(product.FUTURE || {}).current}}</td>
        <td :class="[(product.FUTURE || {}).increment_24h > 0?'text-success':'text-danger']">{{ calcIncreaseRate(product) }}%</td>
      </tr>
      <tr v-for="(product,index) in allSymbolList.unit"
        class="pointer product-list"
        :key="index"
        :class="{active:pair === product.symbol}"
        @click="handleProductsChange(product)">
        <td class=" pl-10 pt-5 pb-5 "> 
          <p style="white-space: nowrap;">
            <icon :name="`X-${product.currency}`" />
            {{ `${product.name}` }}
          </p> 
        </td>
        <td :class="[(product.UNIT || {}).increment_24h > 0?'text-success':'text-danger']">{{(product.UNIT || {}).current}}</td>
        <td :class="[(product.UNIT || {}).increment_24h > 0?'text-success':'text-danger']">{{ calcIncreaseRate(product) }}%</td>
      </tr>  
      <tr v-if="allSymbolList.blend">
        <th  class="pl-10 pt-8 pb-8 f17 left" span="3">
          <span>{{ $t('混合合約') }}</span>  
        </th>
      </tr> 
      <tr v-for="(product,index) in allSymbolList.blend"
        class="pointer product-list"
        :key="index"
        :class="{active:pair === product.symbol}"
        @click="handleProductsChange(product)">
        <td class=" pl-10 pt-5 pb-5 "> 
          <p style="white-space: nowrap;">
            <icon :name="`X-${product.currency}`" />
            {{ `${product.name}` }}
          </p> 
        </td>
        <td :class="[(product.BLEND || {}).increment_24h > 0?'text-success':'text-danger']">{{(product.BLEND || {}).current}}</td>
        <td :class="[(product.BLEND || {}).increment_24h > 0?'text-success':'text-danger']">{{ calcIncreaseRate(product) }}%</td>
      </tr> 
    </table> 
  </div>  
</template>

<script>
import {state} from '@/modules/store'
import utils from '@/modules/utils'
import service from '@/modules/service' 

export default {
  props: {
    height: {
      default: '739',
      type: [Number, String]
    },
    pair: {
      default: '',
      type: String
    } 
  },
  data() {
    return {
      state,
      allSymbolList: {},
    }
  },
  methods: { 
    handleProductsChange(product) { 
      const pair = product.product === 'FUTURE' ? product.name : product.symbol 
      this.$router.push({ 
        name: product.product.toLowerCase(),
        query: { pair }
      }) 
    },
    async loadSymbolList() {
      const [future, mix, unit, blend] = await Promise.all([
        service.getContractSymList(),
        service.getMixContractSymList(),
        service.getUnitContractSymList(),
        service.getBlendContractSymList()
      ])
      console.log(unit)
      if (future && !future.code) { 
        this.$set(this.allSymbolList, 'future', (future.data || {}).items)
      }
      if (unit && !unit.code) { 
        this.$set(this.allSymbolList, 'unit', (unit.data || {}).items)
      }
      if (mix && !mix.code) { 
        this.$set(this.allSymbolList, 'mix', (mix.data || {}).items)
      }  
       
      if (blend && !blend.code && blend.data) {  
        blend.data.items.map(item => item.product = 'blend') 
        this.$set(this.allSymbolList, 'blend', (blend.data || {}).items) 
      }
      console.log(this.allSymbolList)
    },
    calcIncreaseRate (product) { 
      if (!product[product.product]) return 0 
      return this.$big(product[product.product].increment_24h).times(100).div(this.$big(product[product.product].current).minus(product[product.product].increment_24h)).round(product.price_scale || 2)
    },
    subMarket(data) {
      // data.map(market => { 
      //   const pairArr = market.pair.split('_') 
      //   if (pairArr && pairArr.length) {
      //     if (this.allSymbolList.future) {
      //       const found = this.allSymbolList.future.find(item => item.name+state.affix === market.pair || item.currency+state.affix === pairArr[1])
      //       if (found) { 
      //         found[pairArr[0]] = market
      //       }  
      //     } 
      //     if (this.allSymbolList.mix) {
      //       const found = this.allSymbolList.mix.find(item => item.symbol+state.affix === market.pair || item.name+state.affix === pairArr[1])
      //       if (found) { 
      //         found[pairArr[0]] = market
      //       }   
      //     } 
          
      //     if (this.allSymbolList.unit) {
      //       const found = this.allSymbolList.unit.find(item => item.symbol+state.affix === market.pair || item.name+state.affix === pairArr[1])
      //       if (found) { 
      //         found[pairArr[0]] = market 
      //       }   
      //     } 

      //     if (this.allSymbolList.blend) {
      //       const found = this.allSymbolList.blend.find(item => item.symbol+state.affix === market.pair || item.name+state.affix === pairArr[1])
      //       if (found) { 
      //         found[pairArr[0]] = market 
      //       }   
      //     } 
          
      //   }
      // })  
    }
  },
  watch:{
    market(obj) {
      console.log(obj)
    }
  },
  created() {
    // this.setTitle('') 
    this.loadSymbolList()

  },
  mounted() {
    if (state.siteName==='FoBit') {
      utils.setTitle('合约交易|永续合约|'+state.siteName) 
    }
  }
}
</script>

<style lang="scss">
.symlist-container { 
  .product-list {
    background-color: #ffffff;
    &.active {
      background-color: #D4D4D4;
    }
  }
  &.dark {
    .left {
      color: #D4D4D4;
    }
    .product-list {
      background-color: transparent;
      color: $--color-light;
      &.active {
        background-color: $contract-bg2;
      }
    }
  }
}
</style>