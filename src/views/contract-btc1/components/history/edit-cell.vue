<template>
  <div>
    <span v-if="state=='show'">
      <!-- <span :class="{'font-color-buy' : side==1, 'font-color-sell' : side==2}">{{ value | fixed(scale) }} </span> -->
      <!-- <icon style="font-size: 14px;" name="edit" @click="editPrice('edit')"/>  -->
      <slot />
      <span
        class="icon edit"
        name="edit"
        @click="editPrice('edit')"/>
    </span>
    <span
      v-if="state=='edit'"
      class="modify">
      <el-input-number
        controls-position="right"
        size="mini"
        v-model="newValue"
        :ref="'numInput-' + id"/>
      <span
        class="icon cancel"
        @click="cancel"/>
      <span
        class="icon confirm"
        @click="confirm"/>
      <span
        class="op op_cancel"
        @click="cancel"/>
      <span
        class="op op_ok"
        @click="confirm"/>
    </span>
  </div>
</template>

<script>
import utils from '@/modules/utils.js'
export default {
  data () {
    return {
      state: 'show',
      oldValue: 0,
      newValue: 0
    }
  },
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    orderid: {
      type: [String, Number],
      default: ''
    },
    side: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    scale: {
      type: Number,
      default: 0
    }
  },
  methods: {
    editPrice (state) {
      this.state = state
      this.newValue = this.value
    },
    cancel () {
      this.state = 'show'
      this.newValue = this.value
    },
    async confirm () {
      this.newValue = this.$big(this.newValue).round(this.scale, 0).toFixed(this.scale)
      if (this.type === 'price') {
        // let content = `将价格更改至${this.newValue}可能会使该委托立刻与市场中的其他委托成交。请确认更改。`
        let content = this.$t('contract_page.history.edit_cell.edit_price_pop_content', { price: this.newValue })
        let ok = await utils.confirm(this, {
          customClass: 'ix-message-box-wrapper',
          confirmBtnText: this.$t('contract_page.history.edit_cell.edit_price_pop_confirm'),
          confirmButtonClass: 'btn--confirm',
          cancelButtonClass: 'btn--cancel',
          title: this.$t('contract_page.history.edit_cell.edit_price_pop_title'),
          content
        })
        if (!ok) {
          return
        }
        this.$emit('confirm', { id: this.orderid, newValue: this.newValue })
        this.state = 'show'
      } else {
        this.$emit('confirm', { id: this.orderid, newValue: this.newValue })
        this.state = 'show'
      }
    }
  }

}
</script>

<style lang="scss">

.icon {
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  text-align: baseline;
  &.edit {
    width: 12px;
    height: 12px;
    background-image: url('~@/assets/contract/icon-risk-edit.png')
  }
}
.modify {
  width: 88px;
  display: flex;
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    width: 14px;
    height: 24px;
    text-align: baseline;
    &.cancel {
      margin-top: 1px;
      background-image: url('~@/assets/contract/icon-cancel.png');
      background-size: 14px 24px;
    }
    &.confirm {
      margin-top: 1px;
      background-image: url('~@/assets/contract/icon-confirm.png');
      background-size: 14px 24px;
    }
  }
  .el-input-number.el-input-number--mini.is-controls-right{
    width: 60px;

    .el-input-number__decrease, .el-input-number__increase {
      line-height: 12px !important;
      height: 12px;
      width: 14px;
      border-radius: 0;
      border: 1px solid #3E6C96;
      box-sizing: border-box;
      background-color: #1D1D1D;
      color: #fff;
      text-indent: 0px;
    }
    .el-input.el-input--mini {
      input {
        height: 24px;
        border-radius: 0;
        padding-left:2px;
        padding-right:0;
        text-align: left;
        border: 1px solid #3E6C96;
        background-color: #1D1D1D;
        color: #fff;
      }
    }
  }
}
.font-color-buy {
    color: #09C989 !important
}
.font-color-sell {
    color: #F24E4D !important
}
</style>
