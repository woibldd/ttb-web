<template>
  <ul class="character-list">
    <li flex="main:justify cross:center">
      <p class="title">abc</p>
      <p>abc</p>
    </li>
    <li class="markedness">bb</li>
    <li>cc</li>
    <li>dd</li>
  </ul>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped="this api replaced by slot-scope in 2.5.0+">
.character-list{
  color: #8a8a8a;
  font-size: 12px;
  padding: 15px;
  border: $--table-border;
  flex-basis: 19%;
  .title{
    font-weight: 700;
    font-size: 17px;
    line-height: 1.5;
    color: #000;
  }
  .markedness{
    font-size: 28px;
    font-weight: 700;
    color: $--color-success
  }
}
</style>
