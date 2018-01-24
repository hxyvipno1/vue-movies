<template>
	<div id="moviesContainer">
	<div class='mediaWrap' v-for="(val,i) in movies"> 
		<div class='right'>
			<img :src="val.images.large" alt="" slot='img' @click='details(val.id)'>
		</div>
		<div class='left'>
			<h3 slot='title' @click='details(val.id)'>{{ val.title }}</h3>
            <p class="type" slot="type">类型：<span v-for='t in val.genres' class="tagbox"  >{{ t }}</span></p>
            
			<p slot='des' class='des'><span>上映时间：{{ val.year }}</span></p>
            <p class="actor director" slot="actor">主演：<span v-for='t in val.casts' @click="checkman(t.id)">{{ t.name }}&nbsp;&nbsp;</span></p>
			<p slot='autho' class='des director'>导演：<span @click="checkman(key.id)" v-for="(key,k) in val.directors">{{ key.name }}&nbsp;&nbsp;</span></p>
		</div>
	</div> 	
	</div>	
</template>
<script>
	export default{
		name: 'mb',
		data(){
			return{

			}
		},
		methods:{
			details (id) {
				var that=this;
				that.$router.push('/details?id='+id)
			},
			checkman (id) {
				this.$router.push('/mandetails?id='+id)
			}
		},
		props:['movies'],
	}
</script>
<style lang='less'>
	.mediaWrap{
		height:12rem;
		 padding:15px;
		 border-bottom: 1px solid #ddd;
		 text-align:left;
		.left{
			h3{
				font-size:1.3rem;
			}
			p{
				padding:10px 0 0 0;
			}	
			.tagbox{
				border: 1px solid #0B1;
				padding: 2px 3px;
				margin-right: 3px;
				border-radius: 5px;
			}
			.director{
				display: -webkit-box;
				-webkit-line-clamp: 2;    
				-webkit-box-orient: vertical;
				overflow: hidden;
			}	
		}
		.right{
			float:left;
			margin-right:10px;
			width:30%;
			img{
				width:100%;
				height: 12rem;
				border:none;
			}
		}

	}
</style>
