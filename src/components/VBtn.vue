<template>
  <div
    class="ix-button btn"
    @click.prevent="onclick"
    :class="[disabled ? 'disabled' : '', loading ? 'loading' : '', color,
             color === 'ixbuy' ? 'bgcolor-up' : '',
             color === 'ixsell' ? 'bgcolor-down' : '']"
    :style="{
      height: height + 'px',
      lineHeight: height - 2 * border + 'px',
      borderRadius: radius + 'px',
      borderWidth: border + 'px',
      fontSize: fontsize + 'px'
  }">
    <icon
      v-if="icon"
      :name="icon" />
    <span
      class="text"
      v-show="!loading">{{ label }}</span>
    <span
      class="spinner"
      v-show="loading"/>
    
    <slot name="btn-right"/>
  </div>
</template>

<script>
export default {
  name: 'VBtn',
  props: {
    border: {
      default: 1
    },
    radius: {
      default: 3
    },
    disabled: {
      default: false
    },
    color: {
      default: 'dark'
    },
    fontsize: {
      default: 14
    },
    height: {
      default: 36
    },
    label: {
      require: true,
      type: String
    },
    loading: {
      type: Boolean
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    onclick (e) {
      if (!this.loading && !this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>



.ix-button {
  position: relative;
  cursor: pointer;
  user-select: none;
  border-style: inset;
  border-color: rgba(0,0,0, .2);
  &, &:focus, &:visited {
    display: block;
    color: white;
    text-align: center;
    background-color: $primary;
    font-size: 14px;
  }
  &:hover {
    background-color: $primary-hover;
  }
  &:active {
    background-color: $primary-active;
  }
  &.ixbuy,
  &.ixsell {
    .spinner {
      @include spinner(9px, 2px, white);
    }
  }
}
.loading.ix-button,
.loading.ix-button.primary {
  border-color: transparent;
  transition: background-color 200ms;
  &, &:hover, &:focus, &:active, &:visited {
    cursor: default;
    background-color: #dddddd;
  }
}
.disabled.ix-button,
.disabled.ix-button.primary {
  border-color: transparent;
  transition: background-color 200ms;
  &, &:hover, &:focus, &:active, &:visited {
    cursor: default;
    background-color: #AAAAAA;
  }
}
.spinner {
  position: absolute;
  margin-top: -9px;
  margin-left: -9px;
  left: 50%;
  top: 50%;
  @include spinner();
}
</style>
