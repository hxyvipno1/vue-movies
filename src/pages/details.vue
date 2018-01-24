<template>
    <div class="detailswarp">
        <h3 class='title'>电影聚焦</h3>
        <img class="goback" src="../assets/images/left.png" @click="goback()">
        <img class="gohome" src="../assets/images/home.png" @click="gohome()">
        <div class="top">
            <h3>{{ details.title }}&nbsp;({{ details.year }})</h3>
            <div class="left">
                <img :src="details.images.small" :alt="details.title" >
            </div>
            <div class="right">
                    <p class="director"><span class="list">导演：</span><span v-for="item in details.directors">&nbsp;{{ item.name }}&nbsp;</span></p>
                    <p><span class="list">主演：</span><span v-for="item in details.casts">&nbsp;{{ item.name }}&nbsp;</span></p>
                    <p><span class="list">类型：</span><span v-for="item in details.genres">&nbsp;{{ item }}&nbsp;</span></p>
                    <p><span class="list">制片国家/地区：</span><span v-for="item in details.countries">&nbsp;{{ item }}&nbsp;</span></p>
                    <Rate :score='details.rating.average'></Rate>
            </div>
       </div>
       <div class="info">
            <h3>{{ details.title }}的剧情简介</h3>
            <p>{{ details.summary }}</p>
       </div>
       <div class="actor">
            <h3>{{ details.title }}的影人</h3>
            <div class="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide flex_column"  v-for='item in actors'>
                        <div @click="checkman(item.id)">
                            <img :src="item.avatars.small" :alt="item.name">
                            <p>{{ item.name }}</p>
                        </div>                       
                    </div>
                </div>
                  
            </div>
       </div>
    </div>
</template>


<script>
import Rate from '../components/rate'
import '../assets/libs/swiper/css/swiper.css'
    export default{
        data () {
          return{
              details:{
                  images:{
                      small:''
                  },
                  directors:[
                      {name:''}
                  ],
                  rating:{
                      average:0
                  }
              },
              actors:{}
          }
        },
        components:{
            Rate,

        },
        methods:{
            search() {
                var that=this;
                var id=that.$route.query.id
                that.jsonp('https://api.douban.com/v2/movie/subject/'+id,{start:0,count:20},
                    function(res){
                        var details=res;
                        
                        for(var i=0;i<details.casts.length;i++){
                            if(i!=details.casts.length-1){
                                details.casts[i].name=details.casts[i].name+' /';
                            }                        
                        };
                        for(var i=0;i<details.genres.length;i++){
                            if(i!=details.genres.length-1){
                                details.genres[i]=details.genres[i]+' /';
                            }                        
                        };
                        details.images.small=  'https://images.weserv.nl/?url='+  details.images.small.substr(7,details.images.small.length) ;
                        console.log( details.images.small)
                        that.details=details;
                        var actors=details.casts;
                        for(var k in actors){
                            if(k!=actors.length-1){
                                actors[k].name=actors[k].name.substr(0,actors[k].name.length-2)
                            }
                            actors[k].avatars.small= 'https://images.weserv.nl/?url='+  actors[k].avatars.small.substr(7,actors[k].avatars.small.length) ;
                            console.log(actors[k].avatars.small)
                        };
                        that.actors=actors;

                        that.$nextTick(function(){
                            var swiper =new Swiper('.swiper',{
                                slidesPerView:2.5,
                                paginationClickable:true,
                                spaceBetween:20,
                                freeMode:true
                
                            });
                        })
                    })
            },
            swiperImg(){
                var swiper =new Swiper('.swiper',{
                            slidesPerView:2.5,
                            paginationClickable:true,
                            spaceBetween:20,
                            freeMode:true
                        });
            },
            checkman (id) {
				this.$router.push('/mandetails?id='+id)
			},
            goback () {
                this.$router.go(-1);
            },
            gohome () {
                this.$router.push('/home');
            },
            jsonp (url,arg,fn) {
                // 1.动态创建script标签，设置src属性
                var srpt  = document.createElement('script')
                // srpt.src = ''  
                // url?callback=方法名&page=1&cout=10

                // 1.1 拼接url中的参数
                var queryString = ''  // 这个变量保存参数的字符串形式
                for(var key in arg){
                    queryString += key + '=' + arg[key] + '&'
                }

                // 不能写死，我们就动态创建方法名
                // 随机生成字符
                var funName = 'fun_'+ Math.random().toString().substr(3) // fun_0.121212

                window[funName] = fn

                url += '?' + queryString

                // 1.2 设置callback参数，并创建方法

                url += 'callback=' + funName

                srpt.src = url
                // 2.把得到的script标签添加到dom上去
                document.body.appendChild(srpt)
            }
        },
        created () {
             this.search();
        }
    }
</script>

<style lang="less">

    .detailswarp{
        position:relative;
        .goback{
            position:absolute;
            left: 15px;
            top:-40px;
            width:20px;
            height:20px;
        }
        .gohome{
            position:absolute;
            right: 15px;
            top:-40px;
            width:20px;
            height:20px;
        }
        .title{
            position: absolute;
            left: 0;
            top: -60px;
            width: 100%;
            line-height: 60px;
            text-align: center;
            font-size: 1.5rem;
        }
        .top{
            height:18rem;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            margin-bottom: 15px;
            h3{
                text-align:left;
                font-size: 1.5rem;
               
            }
            .left{
                width:30%;
                float:left;
                margin-right:20px;
                img{
                    width:100%;
                    padding-top:1rem;
                    line-height: 12rem;
                }
            }
            .right{
                text-align:left;
                .director{
                    padding-top:1rem;
                }
                p{
                    padding-top:9px;
                    .list{
                        color:#999;
                    }
                    .star{
                        padding:0 38px;
                        background:url('../assets/images/star.png') no-repeat;
                    }
                }
                
            }
        }
        .info{
            border-bottom: 1px solid #ddd;
            padding: 0 15px 15px;
            h3{
                font-size:1.3rem;
                line-height: 3rem;
            }
            p{
                line-height:2rem;
                text-indent: 2em;
                text-align:left;
            }
            
        }
        .actor{
            padding:15px;
            h3{
                line-height: 3rem;
                font-size: 1.3rem;
            }
            .swiper{
                img{
                    width:100%;
                    height:14rem;
                }
            }
        }
    }
</style>