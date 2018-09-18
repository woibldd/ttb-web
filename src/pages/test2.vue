<template>
    <div class="swiper-box" rel="swiperBox">
        <swiper :options="swiperOption"  ref="mySwiper">
            <!-- 轮播项 -->      
             <swiper-slide>I'm Slide 1</swiper-slide>
            <swiper-slide>I'm Slide 2</swiper-slide>
            <swiper-slide>I'm Slide 3</swiper-slide>
            <swiper-slide>I'm Slide 4</swiper-slide>
            <swiper-slide>I'm Slide 5</swiper-slide>
            <swiper-slide>I'm Slide 6</swiper-slide>
            <swiper-slide>I'm Slide 7</swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    import 'swiper/dist/css/swiper.css'

  import { swiper, swiperSlide } from 'vue-awesome-swiper'

    export default {
        data:function() {
            return {
              swiperOption:{
                  pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                    type: 'bullets'
                  }
              }
            }
        },
        props:{
           
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
    }
</script>
