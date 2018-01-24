<template>
    <div class="homewrap">
        <h3 class='title'>电影聚焦</h3>
        <div id="searchContainer">
            <input class="searchplace" placeholder="请输入影名" v-model="p">
            <i class="fa fa-search" @click="searchdata(p)"></i>
        </div>
        
        <Banner swipeid='swipe' :autoplay='3000'>
            <div class="swiper-slide" slot='swiper-con'><img src="../assets/images/banners/1.jpg" /></div>		
            <div class="swiper-slide" slot='swiper-con'><img src="../assets/images/banners/2.jpg" /></div>		
            <div class="swiper-slide" slot='swiper-con'><img src="../assets/images/banners/3.jpg" /></div>		
            <div class="swiper-slide" slot='swiper-con'><img src="../assets/images/banners/4.jpg" /></div>		
            <div class="swiper-slide" slot='swiper-con'><img src="../assets/images/banners/5.jpg" /></div>		
        </Banner>
        <ul :class="{tabfix:tabfix}">
            <li v-for="(val,i) in tabs" ><span @click="jump(val.param,i)" :class="{selected:i==selected}">{{val.title}}</span></li>
        </ul>
        <Item :movies="movies"></Item>
    </div>   
</template>



<script>
import Banner from '../components/banner'
import Item from '../components/item'
import '../assets/libs/fontAwesome/css/font-awesome.css'
export default {
    data:function(){
        return{
            tabs:[
                {'title': '正在热映','param': 'in_theaters','route': 'ishot'},
                {'title': '即将上映','param': 'coming_soon','route': 'willhot'},
                {'title': 'Top250','param': 'top250','route': 'top250'},
                {'title': '北美电影','param': 'us_box','route': 'mouse'}
            ],
            movies:[],
            tabfix:false,
            selected:0,
            count:10,
            start:0,
            p:'',
            isShow:false
        }
    },
    components:{
        Banner,
        Item
    },
    mounted() {
        this.search();
        window.addEventListener('scroll', this.handleScroll)

        // this.$http('https://movie.douban.com/j/new_search_subjects?tags=喜剧').then(function (res) {
        //     //求助的部分
        //     console.log(res)
        // })
        // 豆瓣api url
        // this.jsonp('https://movie.douban.com/j/new_search_subjects?tags=喜剧',{start:0,count:20},
        //     function(data){
        //         console.log(data)
        //     })
    },
    methods:{
        search () {        
            var that=this;
            that.jsonp('https://api.douban.com/v2/movie/in_theaters',{start:0,count: 10},
                function(res){
                    var movies=res.subjects;
                    for(var k in movies){
                        movies[k].images.large= 'https://images.weserv.nl/?url='+  movies[k].images.large.substr(7,movies[k].images.large.length) ;
                    }
                    that.movies=movies;
                })        
        },
        jump (p,i) {
            var that=this;
            that.selected=i;
            that.start=0;
            that.jsonp('https://api.douban.com/v2/movie/'+p,{start:0,count: 10},
                function(res){
                    if(i!=3){
                        var movies=res.subjects;
                        for(var k in movies){
                            movies[k].images.large= 'https://images.weserv.nl/?url='+  movies[k].images.large.substr(7,movies[k].images.large.length) ;
                        }
                        console.log(res)
                    }else{
                        var movies= [];
                        var mres=res.subjects
                        for(var k in mres){
                        mres[k].subject.images.large= 'https://images.weserv.nl/?url='+  mres[k].subject.images.large.substr(7,mres[k].subject.images.large.length) ;
                            movies.push(mres[k].subject)
                        };                    
                    };               
                    console.log(movies)
                    that.movies=movies;
                });     
        },
        handleScroll () {                      
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var scrollHeight = document.documentElement.scrollHeight;
            var windowHeight = document.documentElement.clientHeight;
            console.log(scrollTop)
            if(scrollTop + windowHeight == scrollHeight){
                console.log('dibu',this.$route);
                var that=this;
               if(!(that.$route.path=='/home')) return;
                switch (this.selected) {
                    case 0 : that.start=that.start+10;
                            that.loadData('in_theaters',0,that.start,that.count);
                            break;
                    case 1 : that.start=that.start+10;
                            that.loadData('coming_soon',1,that.start,that.count);
                            break;
                    case 2 : that.start=that.start+10;
                            that.loadData('top250',2,that.start,that.count);
                            break;
                    case 3 : that.start=that.start+10;
                            that.loadData('us_box',3,that.start,that.count);
                            break;
                }
            };
            if(scrollTop>=217){
               this.tabfix=true;
            }else{
                this.tabfix=false;
            }         
        },
        loadData (p,i,start,count) {
            var that=this;
            that.jsonp('https://api.douban.com/v2/movie/'+p,{start: start,count: count},
                function(res){
                    if(i!=3){
                        var movies=res.subjects;
                        for(var k in movies){
                            movies[k].images.large= 'https://images.weserv.nl/?url='+  movies[k].images.large.substr(7,movies[k].images.large.length) ;
                        }
                        console.log(res)
                    }else{
                        var movies= [];
                        var mres=res.subjects
                        for(var k in mres){
                        mres[k].subject.images.large= 'https://images.weserv.nl/?url='+  mres[k].subject.images.large.substr(7,mres[k].subject.images.large.length) ;
                            movies.push(mres[k].subject)
                        };                    
                    }; 
                    for(var k in movies){
                        that.movies.push(movies[k]);
                    }              
                });     
        },
        searchdata (q) {
            this.$router.push('/searchpage?q='+q)
        },
        toggle () {
            this.isShow = !this.isShow;
            console.log(this.isShow)
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
    }
}
</script>

<style lang="less">
    .homewrap{
        position: relative;
       
        .title{
            position: absolute;
            left: 0;
            top: -60px;
            width: 100%;
            line-height: 60px;
            text-align: center;
            font-size: 1.5rem;
        }
        #searchContainer{
            width: 25%;
            position: absolute;
            right: 16px;
            top: -41px;
            border-radius: 5px;
            border: 1px solid #aaa;
            height: 1.5rem;
            padding: 2px 5px;
            input{
                display: block;
                width: 100%;
                border: none;
                border-radius: 5px;
                line-height: 1.5rem;
                color: #aaa;
            }
            i{
                position: absolute;
                right: 6px;
                top: 4px;
            }
        }
        .swiper-container{
            border-bottom: 1px solid #ddd;
        }
        .tabfix{
            position:fixed;
            left:0;
            top:0;
            width:100%;
            background-color:#fff;
        }
        ul{
            height: 50px;
            line-height: 49px;
            list-style: none;
            li{
                width: 24%;
                float: left;
                border-bottom: 1px solid transparent;
                font-size:1.2rem;
                span{
                    padding: 8px;
                }
                .selected{
                    border-bottom: 1px solid #0B1;
                    color: #0B1;
                }
            }
            
        }
    }
    
    
</style>


