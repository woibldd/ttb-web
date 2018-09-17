<template>
<div class="page-home">
    <div class="header">
        <v-nav2 isHome="true" :notice="notice" @hide="notice = null"></v-nav2>
    </div>
    <div class="home2">
        <k-slider :banners="banners" :swiperOption="swiperOption"></k-slider>
    </div>
    <div class="ind_txt">
        <div class="ind_cen">
            <div class="ind_c">关于IX交易XXXXXXXXXX</div>
            <div class="ind_c">关于IX交易XXXXXXXXXX</div>
            <div class="ind_c">关于IX交易XXXXXXXXXX</div>
            <a>
                <i></i>
                <i></i>
                <i></i>
            </a>
        </div>
    </div>
    <div class="ind_cen ind_jd">
        <div class="jd_box">
            <div class="jd_cen">
                <p>
                    <span>
                        <i>挖矿进度：</i>126631.45633211<i>IX</i>
                    </span>
                </p>
            </div>
            <em>0 IX</em>
            <em>33,333,333 IX</em>
        </div>
        <div class="jd_btxt">
            <div>0:00 - 8:00</div>
            <div><span>挖矿总量：</span>,333,333<em>IX</em></div>
            <div><span>已挖矿量：</span>126631.45633211<em>IX</em></div>
            <div><span>剩余挖矿量：</span>28,669,123.23441975<em>IX</em></div>
        </div>
    </div>
    <div class="ind_cen ind_tit">
        交易区
    </div>
    <div class="ind_cen trade">
        <ul class="tit">
            <li class="ta">币种</li>
            <li class="tb">最新价</li>
            <li class="tc">24H涨跌幅</li>
            <li class="td">24H最低</li>
            <li class="te">24H最高</li>
            <li class="tf">24H成交量</li>
            <li class="tg">操作</li>
        </ul>
        <ul class="tra_cen">
            <li class="ta">ABL <span>/ BTC</span></li>
            <li class="tb">0.00000324 <span>¥ 0.16</span></li>
            <li class="tc">-6.09%-0.00000021</li>
            <li class="td">0.00000304</li>
            <li class="te">0.00000358</li>
            <li class="tf">17,798,092<span>ABL</span></li>
            <li class="tg"><span></span></li>
        </ul>
        <ul class="tra_cen">
            <li class="ta">ABL <span>/ BTC</span></li>
            <li class="tb">0.00000324 <span>¥ 0.16</span></li>
            <li class="tc">-6.09%-0.00000021</li>
            <li class="td">0.00000304</li>
            <li class="te">0.00000358</li>
            <li class="tf">17,798,092<span>ABL</span></li>
            <li class="tg"><span></span></li>
        </ul>
        <ul class="tra_cen">
            <li class="ta">ABL <span>/ BTC</span></li>
            <li class="tb">0.00000324 <span>¥ 0.16</span></li>
            <li class="tc">-6.09%-0.00000021</li>
            <li class="td">0.00000304</li>
            <li class="te">0.00000358</li>
            <li class="tf">17,798,092<span>ABL</span></li>
            <li class="tg"><span></span></li>
        </ul>
        <ul class="tra_cen">
            <li class="ta">ABL <span>/ BTC</span></li>
            <li class="tb">0.00000324 <span>¥ 0.16</span></li>
            <li class="tc">-6.09%-0.00000021</li>
            <li class="td">0.00000304</li>
            <li class="te">0.00000358</li>
            <li class="tf">17,798,092<span>ABL</span></li>
            <li class="tg"><span></span></li>
        </ul>
        <ul class="tra_cen">
            <li class="ta">ABL <span>/ BTC</span></li>
            <li class="tb">0.00000324 <span>¥ 0.16</span></li>
            <li class="tc">-6.09%-0.00000021</li>
            <li class="td">0.00000304</li>
            <li class="te">0.00000358</li>
            <li class="tf">17,798,092<span>ABL</span></li>
            <li class="tg"><span></span></li>
        </ul>
        <ul class="tra_cen">
            <li class="ta">ABL <span>/ BTC</span></li>
            <li class="tb">0.00000324 <span>¥ 0.16</span></li>
            <li class="tc">-6.09%-0.00000021</li>
            <li class="td">0.00000304</li>
            <li class="te">0.00000358</li>
            <li class="tf">17,798,092<span>ABL</span></li>
            <li class="tg"><span></span></li>
        </ul>
        <ul class="tra_cen">
            <li class="ta">ABL <span>/ BTC</span></li>
            <li class="tb">0.00000324 <span>¥ 0.16</span></li>
            <li class="tc">-6.09%-0.00000021</li>
            <li class="td">0.00000304</li>
            <li class="te">0.00000358</li>
            <li class="tf">17,798,092<span>ABL</span></li>
            <li class="tg"><span></span></li>
        </ul>
    </div>
    <div class="ind_cen ind_bot">
        <div class="ind_bot_tit">覆盖 IOS、Android、Windows、Mac 多个平台，支持全业务功能</div>
        <div class="ind_bot_cen">
            <div class="photo iphone"></div>
            <p>IOS 版下载教程
                <span>123</span>
            </p>
        </div>
        <div class="ind_bot_cen">
            <div class="photo android"></div>
            <p>Android
                <span></span>
            </p>
        </div>
        <div class="ind_bot_cen">
            <div class="photo windows"></div>
            <p>Windows
                <span></span>
            </p>
        </div>
        <div class="ind_bot_cen">
            <div class="photo mac"></div>
            <p>Mac
                <span></span>
            </p>
        </div>
    </div>


</div>

</template>
<script>
    import VNav2 from '@/components/VNav2'
    import Slider from '@/components/slider.vue'
    export default {
        data:function(){
          return{
              banners:[
                  '/static/banner.jpg',
                  '/static/bannera.jpg',
                  '/static/banner.jpg'

              ],
              swiperOption:{
                  direction:'horizontal',
                  loop:true,
                  autoplay:1000,
                  paginationType:'fraction',
                  pagination:'.swiper-pagination'
              },
              notice: ""
          }
        },
        components:{
            kSlider :Slider,
            VNav2
        }
    }
</script>
<style lang="scss">
    @import "../styles/vars";
    @import "../styles/mixins";
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
            width: 33.33%;
            color: #6C869C;
            &:nth-child(2){
                color: #C9A96C;
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
        a{
            display: block;
            position: absolute;
            width: 15px;
            height: 15px;
            right: -14px;
            top: 23px;
            i{
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
        padding-top: 115px;
        .ind_bot_tit{
            color: #fff;
            font-size: 24px;
            text-align: center;
            height: 35px;
            margin-bottom: 55px;
            line-height: 35px;
        }
        .ind_bot_cen{
            width:20%;
            text-align: center;
            float: left;
            margin: 0 2%;
            .photo{
                width: 100%;
                height: 201px;
                background-size: auto auto;
                background-repeat: no-repeat;
                background-position: center center;
            }
            .iphone{
                background-image: url(../assets/iphone.png);
            }
            .android{
                background-image: url(../assets/Android.png);
            }
            .windows{
                background-image: url(../assets/Windows.png);
            }
            .mac{
                background-image: url(../assets/Mac.png);
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
