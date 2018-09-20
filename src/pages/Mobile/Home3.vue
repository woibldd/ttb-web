<template>
<div class="page-home">
    <div class="home2">
        <k-slider :banners="banners" :swiperOption="swiperOption"></k-slider>
    </div>
    <div class="ind_txt">
        <div class="ind_cen">
            <div class="ind_c" v-for="(item) in notices" :key="item.id">
              <a class="text_link" :href="item.url || 'javascript:;'" target="_blank">
                {{item.title}}
              </a>
            </div>
            <a  class="more" :href="announcementLink" target="_blank">
                <i></i>
                <i></i>
                <i></i>
            </a>
        </div>
    </div>
    <div class="ind_cen ind_bot">
        <div class="ind_bot_tit">覆盖 IOS、Android、Windows、Mac 多个平台，支持全业务功能</div>
        <div class="ind_bot_cen">
            <div class="photo iphone"></div>
            <p>IOS 版下载教程
            </p>
        </div>
        <div class="ind_bot_cen">
            <div class="photo android"></div>
            <p>Android
            </p>
        </div>
        <div class="ind_bot_cen">
            <div class="photo windows"></div>
            <p>Windows
            </p>
        </div>
        <div class="ind_bot_cen">
            <div class="photo mac"></div>
            <p>Mac
            </p>
        </div>
    </div>


</div>

</template>
<script>
    import Slider from '@/components/slider.vue'
    import service from '@/modules/service'
    import responsiveMixin from '@/mixins/responsive'
    import { state } from '@/modules/store'
    export default {
        mixins: [responsiveMixin],
        data:function(){
          return{
            state,
              banners:[],
              notices: [],
              swiperOption:{
                  direction:'horizontal',
                  loop:true,
                  autoplay:1000,
                  paginationType:'fraction',
                  pagination:'.swiper-pagination'
              },
          }
        },
        components:{
            kSlider: Slider
        },
        computed: {
          announcementLink () {
            return this.state.theme.announcement[this.state.locale] || this.state.theme.announcement.en
          }
        },
        async created () {
          const res = await service.getBanners()
          if (!res.code) {
            let list = res.data
            if (list.length > 0) {
              this.banners = list.filter(b => b.slot === 1)
              this.notices = list.filter(b => b.slot === 2)
              if (this.notices.length > 1) {
                this.notices.splice(1)
              }
            }
          }
        }
    }
</script>
<style lang="scss" scoped>
    @import "~@/styles/vars";
    @import "~@/styles/mixins";
    .page-home{
        background:#303E4B;
        overflow: hidden;
    }
    .ind_cen{
        position: relative;
        margin: 0 60px;
    }
    .ind_txt{
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #23282E;
        margin-bottom: 60px;
        .ind_c{
            text-align: center;
            font-size: 14px;
            float: left;
            width: 100%;
            color: #6C869C;
            @include limit();
            .text_link {
              color: #6C869C;
              &:hover {
                color: $primary;
              }
            }
            &:nth-child(2) {
                position: relative;
                &:before,&:after{
                    content: "";
                    position: absolute;
                    width: 2px;
                    height: 24px;
                    background: #6C869C;
                    display: block;
                    left: 0;
                    top: 50%;
                    margin-top: -12px;
                }
                &:after{
                    right: 0;
                    left: auto;
                }
            }
        }
        .more {
            display: block;
            position: absolute;
            width: 15px;
            height: 15px;
            right: -14px;
            top: 23px;
            i {
                display: block;
                position: absolute;
                height: 3px;
                right: 0;
                background: #6C869C;
                &:nth-child(1){
                    width: 100%;
                    top: 0;
                }
                &:nth-child(2){
                    width: 70%;
                    top: 6px;
                }
                &:nth-child(3){
                    width: 40%;
                    bottom: 0;
                }
            }
        }
    }
    .ind_jd{
        border: 1px solid #CBE6FD;
        margin-bottom: 59px;
        padding: 75px 6% 50px 6%;
        .jd_box{
            width: 100%;
            background: #6D869C;
            height: 4px;
            border-radius: 4px;
            position: relative;
            em{
                position: absolute;
                color: #6D869C;
                font-size: 14px;
                line-height: 34px;
                bottom: -34px;
                &:nth-child(2){
                    left: 0;
                }
                &:nth-child(3){
                    right: 0;
                }
            }
            .jd_cen{
                height: 4px;
                float: left;
                position: relative;
                border-radius: 4px;
                width: 40%;
                background: #C9A96E;
                p{
                    display: block;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 6px solid #C9A96E;
                    top: -20px;
                    right: -3px;
                    position: absolute;
                    span{
                        display:block;
                        width: 300px;
                        height: 33px;
                        position: absolute;
                        top: -33px;
                        text-align: center;
                        left: 50%;
                        margin-left: -150px;
                        color: #C9A96E;
                        i{
                            &:nth-child(1){color: #CBE6FD;}
                            &:nth-child(2){color: #6D869C}
                        }
                    }
                }
            }
        }
        .jd_btxt{
            font-size: 20px;
            overflow: hidden;
            margin-top: 65px;
            div{
                float: left;
                color: #C9A96E;
                &:nth-child(1){width: 15%}
                &:nth-child(2){width: 25%;}
                &:nth-child(3){width: 25%;}
                &:last-child{float: right;}
                b{
                    font-weight: bold;
                }
                span{
                    color: #CBE6FD;
                }
                em{
                    color: #6D869C;
                }
            }
        }
    }
    .ind_tit{
        height: 35px;
        line-height: 35px;
        font-size: 28px;
        color: #CBE6FD;
        margin-bottom: 37px;
        text-indent: 25px;
        position: relative;
        &:before{
            content: "";
            position: absolute;
            display: block;
            width: 4px;
            height: 28px;
            top: 50%;
            left: 0;
            background: #CBE6FD;
            margin-top: -14px;
        }
    }
    .trade{
        border: 1px solid #CBE6FD;
        ul{
            overflow: hidden;
            color: #CBE6FD;
            font-size: 16px;
            border-bottom: 1px dashed #464d55;
            line-height: 64px;
            &.tit{
                border-bottom: 1px solid #CBE6FD;
                line-height: 45px;
                font-size: 14px;
                li{
                    border-bottom: none;
                    &.tc{
                        color: #CBE6FD;
                    }
                }
            }
            li{
                float: left;
                text-align: center;
                span{
                    color: #6C869C;
                }
                &.ta{
                    width: 8%;
                }
                &.tb{
                    width: 18%;
                }
                &.tc{
                    width: 18%;
                }
                &.td{
                    width: 17%;
                }
                &.te{
                    width: 17%;
                }
                &.tf{
                    width: 18%;
                }
                &.tg{
                    width: 4%;
                    text-align: left
                }
            }
            &:last-child{
                border-bottom: none;
            }
            &.tra_cen:nth-child(odd) li.tc{
                color: #F24E4D;
            }
            &.tra_cen:nth-child(even) li.tc{
                color: #09C989;
            }
        }
    }
    .ind_bot{
        margin-bottom: 55px;
        .ind_bot_tit{
            color: #fff;
            font-size: 16px;
            text-align: center;
            height: 80px;
            margin-bottom: 55px;
            line-height: 35px;
        }
        .ind_bot_cen{
            width:100%;
            text-align: center;
            margin: 0 2%;
            .photo{
                width: 100%;
                height: 201px;
                background-size: auto auto;
                background-repeat: no-repeat;
                background-position: center center;
            }
            .iphone{
                background-image: url(~@/assets/iphone.png);
            }
            .android{
                background-image: url(~@/assets/Android.png);
            }
            .windows{
                background-image: url(~@/assets/Windows.png);
            }
            .mac{
                background-image: url(~@/assets/Mac.png);
            }
            p{
                background: #151e25;
                color: #CBE6FD;
                font-size: 20px;
                width: 195px;
                height: 40px;
                line-height: 40px;
                border-radius: 40px;
                margin: 44px auto;
                cursor: pointer;
                position: relative;
                span{
                    display: none;
                    position: absolute;
                }
                &:hover{
                    background: #caaa6c;
                    color: #232A32;
                    span{
                        display: block;
                        width: 210px;
                        height: 50px;
                        border:1px solid #C9A96E;
                        position: absolute;
                        left: 50%;
                        margin-left: -105px;
                        bottom: -70px;
                        z-index: 9999;
                    }
                }
            }
        }
    }
</style>
