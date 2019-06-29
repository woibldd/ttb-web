<template>
  <div class="v-list-container">
      <table>
      <tr>
        <th style='width: 170px;'>
          {{ $t(title)}}
        </th>
        <th style="text-align:right;">
          <span v-if='viewtype==="transaction" && table.side === 1' class="status orange">
            待支付
          </span>
          <span v-if='viewtype==="transaction" && table.side === 2' class="status orange">
            等待对方付款
          </span>
          <!-- <span v-else-if='viewtype==="order"' class="status orange">{{processValue('order_state', table)}}</span>  -->
        </th>
      </tr>
      <tbody >
        <tr v-for='(item, index) in header.headers' :key='index'>
          <td>{{ $t(item.text, {currency, legal_currency})}}</td>
          <td>
            <span v-if="viewtype==='order' && item.key === 'amount'">
              {{ processValue('order_amount', table) }}
            </span>
            <span v-else-if="item.key === 'total'">
              {{table['total'] | fixed(2)}}
            </span>
            <span v-else>{{ processValue(item.key, table) }}</span>
          </td>
          <!-- <td> {{ table[item.key]}} </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import processValue from '@/mixins/process-otc-value'
import {state} from '@/modules/store'

export default {
  data() {
    return {
      status: "",
      title:  this.header ? this.header.name : "--",
    }
  },
  props: {
    viewtype: {
      type: String,
      default: ''
    },
    header: {
      type: Object,
      default: ()=> {
      },
    },
    table: {
      type: Object,
      default: ()=> {}
    }
  },
  mixins: [
    processValue
  ],
  computed: {
    currency: {
      get() {
        return state.otc.currency
      }
    },
    legal_currency: {
      get() {
        return state.otc.legal_currency
      }
    },
  }

}
</script>
