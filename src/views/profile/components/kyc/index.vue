<template>
  <div class="profile-right-container">
    <div class="user-center-right">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Kyc',
  components: {
  },
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.profile-right-container {
  float: left;
  margin-left: 29px;
  width: 954px;
  .profile-container { 
    position: relative; 
    .title-box {
      width: 100%;
      height: 40px;
      font-size: 18px;
      font-weight: 600;
      color: $text-strong;
      border-bottom: 1px solid #e6e6e6;
    }
  }
  .invinfo-box {
    width: 100%;
    margin: 20px auto 50px auto;

  }
}
</style>
