<template>
	<div class="shopcart">
		<div class="content" v-on:click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" v-bind:class="{'highlight':tabalCount>0 }">
						<i class="icon-shopping_cart"  v-bind:class="{'highlight':tabalCount>0 }"></i>
					</div>
					<div class="num" v-show="tabalCount>0">{{tabalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':tobalPrice>0 }">￥{{tobalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow" >
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty">清空</span>
				</div>
				<div class="list-content">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import cartcontrol from "../cartcontrol/cartcontrol.vue";

	export default {
		props:{
			selectFoods:{
				type:Array,
				default (){
					return [{
						price:10,
						count:1
					}];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:20
			}
		},
		data:function(){
			return{
				fold:true
			}
		},
		computed:{
			tobalPrice:function(){
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price*food.count;
				});
				return total;
			},
			tabalCount:function(){
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc:function(){
				if(this.tobalPrice === 0){
					return 	`￥${this.minPrice}元起送`;
				}else if(this.tobalPrice < this.minPrice){
					let diff = this.minPrice - this.tobalPrice;
					return 	`还差￥${diff}元起送`;
				}else{
					return "去结算";
				}
			},
			payClass:function(){
				if(this.tobalPrice<this.minPrice){
					return "not-enough"
				}else{
					return "enough"
				}
			},
			listShow:function(){
				if(!this.tabalCount){ console.log(this.tabalCount)
					this.fold = true;
					return false;
				}
				let show = !this.fold; console.log(show)
				return show;
			}
		},
		methods:{
			toggleList:function(){  console.log(1111111)
				if (!this.tabalCount) {
					return;
				}
				this.fold = !this.fold;
			}
		},
		components:{
			cartcontrol
		}
	};
</script>
<style>
.shopcart{position: fixed;left: 0;bottom: 0;z-index: 50;width: 100%;height: 48px;}
.shopcart .content{display: flex;background: #141d27;font-size: 0;}
.shopcart .content .content-left{flex: 1;}
.content-left .logo-wrapper{display: inline-block;position: relative;top: -10px;margin:0 12px;padding: 6px;width:56px;height: 56px;box-sizing:border-box;vertical-align: top;border-radius: 50%;background: #141d27;}
.content-left .logo-wrapper .logo{width: 100%;height: 100%;border-radius: 50%;background: #2b343c;text-align: center;}
.content-left .logo-wrapper .logo.highlight{background: rgb(0,160,220);}
 .logo-wrapper .logo .icon-shopping_cart{font-size: 24px;color: #80858a;line-height: 44px;}
.content-left .logo-wrapper .logo .icon-shopping_cart.highlight{color: #fff;}
.content-left .price{display: inline-block;vertical-align: top;line-height: 24px;margin-top: 12px;padding-right:12px;box-sizing:border-box;border-right: 1px solid rgba(255,255,255,0.1);font-size: 16px;font-weight: 700;color: rgba(255,255,255,0.4);}
.content-left .price.highlight{color: #fff;}
.content-left .desc{display: inline-block;vertical-align: top;line-height: 24px;margin:12px 0 0 12px;font-size:10px;color: rgba(255,255,255,0.4);}
.shopcart .content .content-right{flex: 0 0 105px;width: 105px;}
.content-right .pay{font-size: 12px;line-height: 48px;height: 48px;text-align: center;color:rgba(255,255,255,0.4);font-weight: 700;}
.content-right .pay.not-enough{background: #2b333b;}
.content-right .pay.enough{background: #00b43c;color: #fff;}
.logo-wrapper .num{position: absolute;top: 0px;right: 0px;width: 24px;height: 16px;line-height: 16px;background:rgb(240,20,20);text-align: center;border-radius: 16px;font-size: 9px;font-weight: 700;color: #fff;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);}


 
.fold-leave-active{transition: all 0.5s;}
/* .fold-enter-active,.fold-leave{transform:translate3d(0,-100%,0);} */
.fold-leave-active,.fold-enter{transform:translate3d(0,0,0);}

.shopcart-list{position: absolute;top:0px;left: 0px;z-index: -1;width: 100%;transform:translate3d(0,-100%,0);transition: 1s;}
.shopcart-list .list-header{height: 40px;line-height: 40px;padding: 0 18px;background: #f3f5f7;border-bottom: 1px solid rgba(7,17,27,0.1)}
.shopcart-list .title{float: left;font-size: 14px;color: rgb(7,17,27);}
.shopcart-list .empty{float: right;font-size: 12px;color: rgb(0,160,220);}
.shopcart-list .list-content{padding:0 18px;max-height: 217px;background:#fff;overflow: hidden;}
</style>