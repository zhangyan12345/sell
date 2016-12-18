<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64"><!--通过v-bind绑定src是因为seller一开始是空对象，通过异步请求拿到的数据-->
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>  <!--判断seller.supports还是异步情况，不判断请求不到会报错-->
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" v-on:click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div><!--CSS sticky footer 布局(底部不动布局)-->
		<transition name="expand">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="h1_name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="line-title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="supports" v-if="seller.supports">
							<li class="supports-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="line-title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" v-on:click="hideDetail"><i class="icon-close"></i></div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from "../star/star.vue"
	export default{
		props:{  //通过props接收传过来的seller数据
		   seller:{
		   		type:Object
		   }
		},
		data:function(){
			return {
				detailShow:false
			}
		},
		methods:{
			showDetail:function(){
				this.detailShow = true;
			},
			hideDetail:function(){
				this.detailShow = false;
			}
		},
		created: function () {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		components:{
			star:star
		}
	};
</script>

<style>
.header{background: rgba(7,17,27,0.5);color: #fff;position: relative;overflow: hidden;}
.content-wrapper{padding:24px 12px 18px 24px;font-size: 0px;position: relative;}
.avatar{display: inline-block;vertical-align: top;}
.avatar img{border-radius: 2px;}
.content-wrapper .content{display: inline-block;font-size: 14px;margin-left: 16px;}
.title{margin:2px 0 8px 0;}
.brand{vertical-align: top;width: 30px;height: 18px;display: inline-block;background-image: url(./brand@2x.png);background-size: 100% 100%;}
@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
	.brand{background-image: url(./brand@3x.png);background-size: 100% 100%;}
}
.name{margin-left: 6px;font-size: 16px;line-height: 18px;font-weight: bold;}
.description{margin-bottom: 10px;line-height: 12px;font-size: 12px;}
.support{}
.support .icon{display: inline-block;width: 12px;height: 12px;margin-right: 5px;background-size: 12px 12px;background-repeat: no-repeat;}
.support .decrease{background-image:url(./decrease_1@2x.png);}
.support .discount{background-image:url(./discount_1@2x.png);}
.support .guarantee{background-image:url(./guarantee_1@2x.png);}
.support .invoice{background-image:url(./invoice_1@2x.png);}
.support .special{background-image:url(./special_1@2x.png);}
.text{font-size: 12px;line-height: 12px;vertical-align: top;}
.support-count{position: absolute;right: 12px;bottom: 22px;padding:0 8px;height:20px;line-height:20px;border-radius: 12px;background: rgba(0,0,0,0.2);text-align: center;}
.support-count .count{font-size: 10px;vertical-align:top;line-height:24px;display: inline-block;margin-left: 5px;}
.support-count .icon-keyboard_arrow_right{font-size: 15px;line-height: 22px;,margin-left: 2px;display: inline-block;}
.bulletin-wrapper{height: 28px;line-height: 28px;padding:0 22px 0 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;position: relative;background: rgba(7,17,27,0.2);}
.bulletin-title{display: inline-block;width: 22px;height: 12px;background: url(./bulletin@2x.png) no-repeat;background-size: 22px 12px;vertical-align: top;margin-top: 8px;}
.bulletin-text{font-size: 12px;margin:0 4px; vertical-align: top;}
.bulletin-wrapper .icon-keyboard_arrow_right{position:absolute;font-size: 15px;right: 12px;top: 7px;}
.background{position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;z-index: -1;filter: blur(10px);-webkit-filter:blur(10px);}
.detail{position: fixed;z-index: 100;width: 100%;height: 100%;overflow: auto;top: 0px;left: 0px;background: rgba(7,17,27,0.8);backdrop-filter:blur(10px);transition: all 0.3s;}
.expand-enter-active,.expand-leave{opacity: 1;background: rgba(7,17,27,0.8);}
.expand-enter,.expand-leave-active{opacity:0;background: rgba(7,17,27,0.8);}


.detail-wrapper{min-height: 100%;width: 100%;}
.detail-main{margin-top: 64px;padding-bottom: 64px;}
.detail-close{position: relative;width: 32px;height: 32px;margin:-64px auto 0 auto;clear: both;font-size: 32px;}
.h1_name{line-height: 16px;text-align: center;font-size: 16px;font-weight: 700;}
.star-wrapper{margin-top: 18px;padding:2px 0;text-align: center;}
.line-title{width: 80%;margin:30px auto 24px auto;display: flex;}
.line-title .line{flex: 1;position: relative;top: -6px;border-bottom: 1px solid rgba(255,255,255,0.2);}
.line-title .text{padding: 0 12px;font-size: 14px;font-weight: 700;}
.supports{width: 80%;margin: 0 auto;}
.supports-item{padding:0 12px;margin-bottom: 12px;font-size: 0;}
.supports-item:last-child{margin-bottom: 0;}
.supports-item .icon{display: inline-block;width: 16px;height: 16px;vertical-align: top;margin-right: 6px;background-size: 16px 16px;background-repeat: no-repeat;}
.supports-item .text{line-height: 16px;font-size: 12px;}
.supports-item .decrease{background-image:url(./decrease_2@2x.png);}
.supports-item .discount{background-image:url(./discount_2@2x.png);}
.supports-item .guarantee{background-image:url(./guarantee_2@2x.png);}
.supports-item .invoice{background-image:url(./invoice_2@2x.png);}
.supports-item .special{background-image:url(./special_2@2x.png);}

.bulletin{width: 80%;margin:0 auto;}
.bulletin .content{padding: 0 12px;line-height: 24px;font-size: 12px;}

</style>