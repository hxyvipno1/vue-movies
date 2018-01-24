<template>
	<div class='swiper-container' >
		<div class='swiper-wrapper'>
			<slot name='swiper-con'></slot>
		</div>
	</div>
</template>

<script>
import '../assets/libs/swiper.js'
export default {
 
	props: {
		swipeid:{
			type: String,
			default: ''
		}
		
	},
	watch:{
		'swipeid' (){
			this.swiperImg()
		}
	},
	methods:{
		swiperImg(){
			console.log(this.swipeid);
			new Swiper('.'+this.swipeid,{
			slidesPerView:2.5,
			paginationClickable:true,
			spaceBetween:20,
			freeMode:true
		});
		}
	},
	created () {
		this.swiperImg()
	}

}

</script>

<style>
@import '../assets/libs/swiper/css/swiper.css';

.swiper-slide img {width: 100%;}
.swiper-container {
        width: 100%;
       height:300px;
        margin: 10px auto;

    }
.ftop_cont{padding-left:15px;}
.ftop_word{height:48px;line-height:48px;}
.ftop_word .ftitle{float:left;font-weight:normal;}
.ftop_word .fmore{float:right;color:#42c055;}

</style>