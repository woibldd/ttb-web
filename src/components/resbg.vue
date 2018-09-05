<template>
    <div class="res_bg">
        <div class="rbg_a"></div>
        <div class="rbg_b"></div>
        <div class="rbg_c"></div>
        <div class="rbg_d"></div>
    </div>
</template>
<script>
</script>
<style scoped lang="scss">
    .res_bg{width:1000px;height:1000px;position:absolute;left:50%;top:50%;margin-left:-500px;margin-top:-500px;
        div{background: linear-gradient(80deg, #69a6dd, #324759);border-radius:50%;position:absolute;left:50%;top:50%;opacity:0;}
        .rbg_a{width:460px;height:460px;margin-left:-230px;margin-top:-230px;animation:bg1 6s 0s infinite}
        .rbg_b{width:640px;height:640px;margin-left:-320px;margin-top:-320px;animation:bg2 6s 0s infinite}
        .rbg_c{width:820px;height:820px;margin-left:-410px;margin-top:-410px;animation:bg3 6s 0s infinite}
        .rbg_d{width:1000px;height:1000px;margin-left:-500px;margin-top:-500px;animation:bg4 6s 0s infinite}
        @keyframes bg1{0%{ opacity:0;} 0%{ opacity:0;}15%{opacity: 0.1;}85%{opacity:0.1;}100%{opacity:0;}}
        @keyframes bg2{0%{ opacity:0;}5%{ opacity:0;}20%{opacity: 0.1;}80%{opacity:0.1;}95%{opacity:0;}100%{opacity:0;}}
        @keyframes bg3{0%{ opacity:0;}10%{ opacity:0;}25%{opacity: 0.1;}75%{opacity:0.1;}90%{opacity:0;}100%{opacity:0;}}
        @keyframes bg4{0%{ opacity:0;}15%{ opacity:0;}30%{opacity: 0.1;}70%{opacity:0.1;}85%{opacity:0;}100%{opacity:0;}}
    }

</style>

