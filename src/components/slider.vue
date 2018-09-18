<template>
    <div class="swiper-box" rel="swiperBox">
        <swiper :options="swiperOption" class="swiper-container" ref="mySwiper">
            <!-- 轮播项 -->      
            <swiper-slide v-for="banner in banners" :key="banner.id">
              <a class="link" target="_blank" :href="banner.url">
                <img :src="banner.picture" class="swiper-image">
              </a>
                
            </swiper-slide>
            <!-- 轮播的小圆点 -->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import "swiper/dist/css/swiper.css"

    export default {
      data:function() {
        return {
        swiperOption:{
          autoplay: true,
          delay: 5000,
          pagination: {
            el: '.swiper-pagination'
          }
        }
        }
      },
      props:{
        banners:{
          type:Array
        }
      },
      components:{
        swiper,
        swiperSlide
      },
      //定义这个sweiper对象
      computed: {
        swiper:function() {
          return this.$refs.mySwiper.swiper;
        }
      },
      created() {
      }
    }
</script>
<style lang="scss">
    /* @import "swiper.css"; */
    .swiper-box{
        width: 100%;
        height: 400px;
        margin: 0 auto;
    }
    @media screen and (max-width: 768px) {
      .swiper-box{
        width: 100%;
        height: 120px;
        margin: 0 auto;
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
    .swiper {
        margin: 10px auto;
        width: 100%;
        height: 400px;
        overflow: hidden;
        .swiper-slide {
            width: 100%;
            height: 400px;
            overflow: hidden;
        }
        .swiper-slide-active img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 50%;
            margin-left: -960
        }
        img {
            display: block;
            width: 100%;
            height: 100%;
            -webkit-transition: all 1s ease 0s;
            -moz-transition: all 1s ease 0s;
            -ms-transition: all 1s ease 0s;
            -o-transition: all 1s ease 0s;
            transition: all 1s ease 0s;
        }
    }
    .link {
      display: flex;
      height: 100%;
    }
    .swiper-image{
        position: absolute;
        width: 100%;
    }
    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
      width: 30px;
      height: 4px;
      border-radius: 4px;
      margin: 0 5px;
    }
    .swiper-pagination-bullet{
      background: rgba(255, 255, 255, .4);
    }
    .swiper-pagination-bullet-active{
      background: rgba(201, 169, 108, 1);
    }
</style>
