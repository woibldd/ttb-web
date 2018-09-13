<template>
  <div class="v-btn btn"
    @click.prevent="onclick"
    :class="[disabled ? 'disabled' : '', loading ? 'loading' : '', color,
       color === 'ixbuy' ? 'theme-bgcolor-up' : '',
       color === 'ixsell' ? 'theme-bgcolor-down' : '']"
    :style="{
      height: height + 'px',
      lineHeight: height - 2 * border + 'px',
      borderRadius: radius + 'px',
      borderWidth: border + 'px',
      fontSize: fontsize + 'px'
    }">
    <span class="text" v-show="!loading">{{ label }}</span>
    <span class="spinner" v-show="loading"></span>
  </div>
</template>

<script>
export default {
  name: 'vBtn',
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
@import "../styles/vars";
@import "../styles/mixins";

.v-btn {
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
.loading.v-btn,
.loading.v-btn.primary {
  border-color: transparent;
  transition: background-color 200ms;
  &, &:hover, &:focus, &:active, &:visited {
    cursor: default;
    background-color: #dddddd;
  }
}
.disabled.v-btn,
.disabled.v-btn.primary {
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
