<template>
    <div class="homewrap">
        <h3 class='title'>电影聚焦</h3>
        <div id="searchContainer">
            <input class="searchplace" placeholder="请输入影名" v-model="q">
            <i class="fa fa-search" @click="searchdata(q)"></i>
        </div>
        <img class="goback" src="../assets/images/left.png" @click="goback()">
        <Item :movies="movies"></Item>
    </div>   
</template>

<script>
    import Item from '../components/item'
    import '../assets/libs/fontAwesome/css/font-awesome.css'

    export default{
        data () {
            return{
                movies:[
                   
                    ],
                q:''
            }
        },
         components:{
            Item
        },
        mounted () {
            var q=this.$route.query.q;
            this.searchdata(q);
        },

        methods:{
            searchdata (q) {
                var that=this;
                that.jsonp('https://api.douban.com/v2/movie/search?q='+q,{start: 0,count: 10},
                    function(res){
                        console.log(res.subjects)
                        that.movies=res.subjects;                    
                    })
            },
            goback(){
                this.$router.go(-1);
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
       .goback{
            position:absolute;
            left: 15px;
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
    }
</style>