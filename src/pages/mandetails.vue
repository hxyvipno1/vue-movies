<template>
    <div class="detailswarp">
        <h3 class='title'>电影聚焦</h3>
        <img class="goback" src="../assets/images/left.png" @click="goback()">
        <img class="gohome" src="../assets/images/home.png" @click="gohome()">
        <div class="top">
            <h3>{{ details.name }}&nbsp;({{ details.name_en }})</h3>
            <div class="left">
                <img :src="details.avatars.small" :alt="details.name" >
            </div>
            <div class="right">
                    <p class="director"><span class="list">性别：</span>{{ details.gender }}</p>
                    <p><span class="list">出生地：</span>{{ details.born_place }}</p>
                    <p><span class="list">更多中文名：</span> {{ details.aka }} </p>
                    <p><span class="list">更多外文名：</span> {{ details.aka_en }} </p>          
            </div>
       </div>
       <div class="actor">
            <h3>{{ details.name }}的最近5部作品</h3>
            <div class="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide flex_column"  v-for='item in details.works'>
                        <div @click="checkmovie(item.subject.id)">
                            <img :src="item.subject.images.large" :alt="item.name">
                            <p>{{ item.subject.title }}({{ item.subject.year }})</p>
                            <p>{{ item.roles }}</p>
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
                  avatars:{
                      small: ''
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
                console.log(that.$route.query.id)
                var id=that.$route.query.id
                that.jsonp('https://api.douban.com/v2/movie/celebrity/'+id,{start:0,count:20},
                    function(res){
                   
                    var details=res;
                    console.log(details)
                    details.avatars.small=  'https://images.weserv.nl/?url='+  details.avatars.small.substr(7,details.avatars.small.length) ;
                    details.aka=details.aka.join(' ');
                    details.aka_en=details.aka_en.join(' ');
                    for(var k in details.works){
                        details.works[k].subject.images.large= 'https://images.weserv.nl/?url='+  details.works[k].subject.images.large.substr(7,details.works[k].subject.images.large.length) ;
                        details.works[k].roles=details.works[k].roles.join('、');
                    }
                   that.details=details;
                   console.log(details);
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
             checkmovie (id) {
				this.$router.push('/details?id='+id)
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
        padding:15px;
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
            height:16rem;
            h3{
                text-align:left;
                font-size: 1.5rem;
               
            }
            .left{
                width:30%;
                float:left;
                margin-right:20px;
                height:16rem;
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
            h3{
                line-height: 3rem;
                font-size: 1.3rem;
                margin-top: 30px;
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