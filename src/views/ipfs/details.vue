<template>
  <div class="ipfs-details-container">
    <div class="top">
      <div class="l">

      </div>
      <div class="r">

      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
.ipfs-details-container {
  .top {
    width: 1200px;
    margin: 47px auto 0;
    box-shadow: 0px 0px 16px 0px rgba(221,221,221,0.78); 
    height: 329px;
    .l { 
      padding: 32px 42px;
       
    }
    .r { 
      padding: 32px 42px;
      width: 322px;
      background-color: #FAFAFA;
    }
  }
  .content {
    margin: 25px auto; 
    width: 1200px;
    height: 900px;
    box-shadow: 0px 0px 16px 0px rgba(221,221,221,0.78); 
    .tabs {
      font-size: 16px;
    }
    .describe {
      font-size: 12px; 
    }
  }
}
</style>
