<template>
  <div class="doc-wrap">
    <div class="header">
      <div class="title">{{ title }}</div>
    </div>
    <div class="page-wrap doc-page">
      <div class="panel">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocWrap',
  props: ['title']
}
</script>

<style scoped lang="scss">



.header {
  height: auto;
  background-color: $nav-2;
  width: 100%;
  min-width: $page-width;
  .title {
    width: $page-width;
    margin: 0 auto;
    margin-top: 40px;
    color: white;
    font-size: 24px;
    height: 60px;
    line-height: 60px;
    background: #192D3F;
    padding: 0 40px;
    box-sizing: border-box;
  }
}
.page-wrap {
  position: relative;
  margin:  20px auto 0 auto;
  width: $page-width;
  padding-bottom: 40px;
}
.panel {
  min-height: 500px;
  background-color: #192D3F;
  border-radius: 3px;
  padding: 40px;
}
/* slot style start */
h1 {
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  color: #fff;
  line-height: 36px;
  margin-bottom: 36px;
}
h2 {
  font-size: 14px;
  color: #fff;
  line-height: 26px;
  margin-bottom: 20px;
  margin-top: 20px;
}
h3 {
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  line-height: 26px;
  margin-bottom: 15px;
  margin-top: 15px;
}
p {
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 10px;
}
ul {
  padding-left: 40px;
  margin-bottom: 10px;
  list-style: none;
  li,ol {
    line-height: 20px;
    color: #fff;
    line-height: 26px;
  }
}
/* slot style end */

#app.mobile {
  .header {
    display: none;
    min-width: auto;
    .title {
      width: 100%;
      text-align: center;
    }
  }
  .page-wrap {
    width: 100%;
    margin: 0 auto;
    padding-bottom: 0;
  }
}
</style>
