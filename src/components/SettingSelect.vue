<template>
  <div class="select-wrap" :tabindex="100 + getId()" @click.stop="toggle" @blur="close">
    <div class="label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="selected-option">
      <slot name="selected-option" v-bind="value">{{ value }}</slot>
      <div class="tri"></div>
    </div>
    <div class="bottom-line"></div>
    <div class="option-list" :class="{open: opened}">
      <div class="option-item" v-for="(item, index) in optionList"
        :key="index"
        @click.stop="clickItem(item)">
        <slot name="option" v-bind="item">{{ item }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'settingSelect',
  props: ['optionList', 'optionId', 'value', 'label'],
  data () {
    return {
      focusing: false,
      opened: false
    }
  },
  created () {
    this.$eh.$on('app:click', this.close)
    this.$eh.$on('setting-select:close', this.close)
  },
  beforeDestroy () {
    this.$eh.$off('app:click', this.close)
  },
  methods: {
    getId () {
      return _.uniqueId()
    },
    clickItem (item) {
      this.close()
      if (!this.equal(item, this.value)) {
        this.$emit('change', item)
      }
    },
    valueOf (item) {
      if (!this.optionId) {
        return item
      }
      return _.get(item, this.optionId)
    },
    equal (a, b) {
      return this.valueOf(a) === this.valueOf(b)
    },
    close () {
      this.opened = false
    },
    open () {
      this.opened = true
    },
    toggle () {
      this.opened = !this.opened
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  color: #999;
  font-size: 12px;
  line-height: 17px;
  margin-bottom: 1px;
}
.selected-option {
  position: relative;
  font-size: 16px;
  line-height: 26px;
  height: 26px;
}
.option-list {
  position: absolute;
  z-index: 1;
  width: 100%;
  background-color: #F8F8F8;
  top: 100%;
  display: none;
  max-height: 325px;
  overflow-y: auto;
  &.open {
    display: block;
  }
  .option-item {
    font-size: 14px;
    padding: 10px 20px;
    line-height: 30px;
  }
  .option-item:hover {
    background-color: #ECECEC;
  }
}
.tri {
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
  &:after {
    content: ' ';
    position: absolute;
    top: 2px;
    right: 0;
    border-left: 1px solid #303030;
    border-bottom: 1px solid #303030;
    transform: rotate(-45deg);
    transform-origin: right bottom;
    width: 8px;
    height: 8px;
    box-sizing: border-box;
  }
}
.select-wrap {
  position: relative;
  outline: none;
}
.bottom-line {
  border-bottom: 1px solid #999;
  height: 2px;
  box-sizing: border-box;
}
.select-wrap:hover {
  .label {
    color: #303030;
  }
  .bottom-line {
    border-bottom: 1px solid #303030;
  }
}
.select-wrap:focus {
  .label {
    color: $primary;
  }
  .bottom-line {
    border-bottom: 2px solid $primary;
  }
}
</style>

<style lang="scss">
.setting-modal .select-wrap {
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  ::-webkit-scrollbar-track {
  }
  ::-webkit-scrollbar-thumb {
    background-color: #D8D8D8;
    border: 2px solid #D8D8D8;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>
