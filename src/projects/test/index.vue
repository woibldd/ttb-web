<template>
  <section>
    我是首页
    <div class="border">
      border
    </div>
  </section>
</template>
<style lang="scss" scoped>
@import "~@/styles/vars";
@import "~@/styles/mixins";

.border {
  border: 10px solid #ff0000;
  width: 200px;
  height: 300px;
  border-radius: 50px;
  @include rempx(margin, 1rem 2rem);
}

</style>
