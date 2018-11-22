<template>
  <div 
class="swiper-box"
       rel="swiperBox">
    <swiper 
:options="swiperOption"
            class="swiper-container" 
ref="mySwiper">
      <!-- 轮播项 -->
      <swiper-slide 
v-for="banner in banners"
                    :key="banner.id">
        <a 
class="link"
           target="_blank" 
:href="banner.url">
          <img 
:src="banner.picture"
               class="swiper-image">
        </a>

      </swiper-slide>
      <!-- 轮播的小圆点 -->
      <div 
class="swiper-pagination"
           slot="pagination"/>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  data: function () {
    return {
      swiperOption: {
        autoplay: true,
        delay: 5000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  props: {
    banners: {
      type: Array
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  // 定义这个sweiper对象
  computed: {
    swiper: function () {
      return this.$refs.mySwiper.swiper
    }
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
    /* @import "swiper.css"; */
    .swiper-box{
        width: 100%;
        height: 400px;
        margin: 0 auto;
    }
    @media screen and (max-width: 768px) {
      .swiper-box{
        width: 100%;
        height: 90px !important;
        margin: 0 auto;
      }
      .swiper-slide {
        width: 100%;
        max-height: 90px;
        overflow: hidden;
      }
      .swiper-image{
        position: absolute;
        width: 100% !important;
        left: 0 !important;
        margin-left: 0 !important;
      }
    }
    .swiper-box .swiper-container {
        width: 100%;
        height: 100%;
    }
    .swiper-box .swiper-box img {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
      width: 100%;
      height: 400px;
      overflow: hidden;
    }

    .link {
      display: flex;
      height: 100%;
    }
    .swiper-image{
        position: absolute;
        width: 1920px;
        left: 50%;
        margin-left: -960px;
    }
</style>

<style>
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
  width: 30px;
  height: 4px;
  border-radius: 4px;
  margin: 0 5px;
}
.swiper-pagination-bullet{
  background: rgba(255, 255, 255, .4) !important;
}
.swiper-pagination-bullet-active{
  background: #01CED1 !important;
}
.swiper-container{
    z-index: 0 !important;
}
</style>
