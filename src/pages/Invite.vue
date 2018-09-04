<template>
  <div>
    <profile-left></profile-left>
    <div class="user-center-right">
      <div class="profile-container">
        <div class="title-box">{{$t('profile_left_invite')}}</div>
        <div class="progress-box">
          <div class="progress-bar">
            <div class="circle">
              <div class="half-left">
                <div class="cir  "></div>
              </div>
            <div class="half-right">
              <div class="cir"></div>
            </div>
          </div>
          <div class="circle hide">
            <div class="half-3">
              <div class="cir "></div>
            </div>
          </div>
          <a href="/account/users/verification">
            <div class="text  not-certify "><!-- react-text: 63 -->暂无认证<!-- /react-text --><br><span class="verification">去认证</span></div></a></div><ul class="info-box"><li class="info-item"><span class="title">手机号</span><span class="content"><a href="/account/users/security/modifyPhone/10">去设置</a></span></li><li class="info-item"><span class="title">邮箱</span><span class="content">myl***@gmail.com</span></li><li class="info-item"><span class="title">姓名</span><span class="content"><a href="/account/users/verification">去认证</a></span></li><li class="info-item"><span class="title">认证类型</span><span class="content"><a href="/account/users/verification">去认证</a></span></li></ul></div><ul class="login-record-box"><div class="title">最近十条登录历史</div><ul><li class="line"><div class="item title-item">时间</div><div class="item title-item">IP 地址</div><div class="item title-item">所在地</div></li><li class="line"><div class="item">2018-09-04, 09:48:44</div><div class="item">52.221.165.100</div><div class="item">新加坡</div></li><li class="line"><div class="item">2018-09-02, 19:07:35</div><div class="item">118.26.137.232</div><div class="item">北京</div></li><li class="line"><div class="item">2018-08-22, 11:10:16</div><div class="item">220.194.43.229</div><div class="item">北京</div></li><li class="line"><div class="item">2018-07-15, 10:32:31</div><div class="item">1.202.30.69</div><div class="item">北京</div></li></ul></ul><div class="okcoin-loading-box  hide"><div><div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div></div></div></div></div>
  </div>
</template>

<script>
import ProfileLeft from './ProfileLeft'
export default {
  name: 'invite',
  components: {
    ProfileLeft
  }
}
</script>
<style lang="scss">
.user-center-right {
  padding-left: 40px;
  min-height: 580px;
  float: left;
  .profile-container {
    width: 960px;
    min-height: 600px;
    position: relative;

    .title-box {
      width: 100%;
      height: 51px;
      line-height: 35px;
      font-size: 24px;
      font-weight: 600;
      color: $text-strong;
      border-bottom: 1px solid #e6e6e6;
      .progress-box {
        margin-top: 27px;
      }
    }
  }
}
</style>

