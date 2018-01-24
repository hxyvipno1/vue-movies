<template>
    <div class="starwarp">
        <span class="list">豆瓣评分：</span>
        <span class="staritem" :class="item" v-for="item in picclass"></span> {{score}}
    </div>
</template>


<script>
    export default{
        data(){
            return{
                picclass:[]
            }
        },
        props:['score'],
        mounted() {
            
        },
        watch:{
            score (to,from){
                this.picclass=this.picclassfun()
            }
        },
        methods:{
            picclassfun () {
                var that=this;
                let result=[];
                let onstar=Math.floor((that.score)/2);
                let isdouble=(that.score/2) %1 !==0;
                for(var i=0;i<onstar;i++){
                    result.push('on');
                };
                if(isdouble){
                    result.push('half');
                };
                console.log(onstar,isdouble)
                while (result.length<5){
                    result.push("off");
                }
                return result;
            }
        }
    }
</script>

<style lang="less">
    .starwarp{
        display: flex;
        align-items: center;
        .list{
            color:#999;
        }
        .staritem{
            display: inline-block;
            width: 20px;
            height: 20px;
            background-size:cover;

        }
         .on {
            background: url("../assets/images/star_on.png");
        }
        .half {
            background: url("../assets/images/star_half.png");
        }
        .off {
            background: url("../assets/images/star_off.png");
        }
    }


</style>
