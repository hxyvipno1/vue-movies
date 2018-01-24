<template>
	<div class="swiper-container" :class='swipeid'>
		<div class="swiper-wrapper">
			<slot name='swiper-con'></slot>
		</div>
		<div :class='{"swiper-pagination":pagination}' :style='{"text-align":paginationDirection}'></div>
	</div>
</template>
<script>
import '../assets/libs/swiper/js/swiper.js'
export default{

	props:{
		swipeid:{
			type:String,
			default:''    
		},
		pagination:{
			type:Boolean,
			default:true
		},
		paginationDirection:{
			type:String,
			default: 'center'
		},
		effect:{
			type:String,
			default:'slide'
		},
		loop:{
			type:Boolean,
			default:true
		},
		direction:{
			type:String,
			default:'horizontal'
		},
		autoplay:{
			type:Number,
			default:5000
		},
		paginationType:{
			type:String,
			default:'bullets'
		}
	},
	mounted:function(){
		var That=this;
		new Swiper('.'+That.swipeid,{
			//循环
			loop:That.loop,
			//分页器
			pagination:'.swiper-pagination',
			//分页器的类型
			paginationType:That.paginationType,
			//自动轮播的时间间隔
			autoplay:That.autoplay,
			//切换方向
			direction:That.direction,
			//切换效果
			effect:That.effect

		})
	}

}
	
</script>

<style>
@import '../assets/libs/swiper/css/swiper.css';

.swiper-container img{

    width:100%;
	display:block;
}

.swiper-pagination-bullet-active{

    background:white;

}
</style>