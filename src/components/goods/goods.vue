<template>
<div class="goods">
	<div class="menu-wrapper" ref="menuwrapper" >
		<ul>
			<li class="" v-for="(item,index) in goods" class="menu-item " :class="{'current':currentIndex === index}" v-on:click="selectMenu(index,$event)">
				<span class="text text_bo">
					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
				</span>
			</li>
		</ul>
	</div>
	<div class="foods-wrapper" ref="foodswrapper"><!--取dom用ref-->
		<ul>
			<li v-for="item in goods" class="food-list food-list-hook">
				<h1 class="title">{{item.name}}</h1>
				<ul>
					<li class="food-item" v-for="food in item.foods">
						<div class="icon">
							<img width="57" height="57" :src="food.icon" class="">
						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
							</div>
							<div class="price">
								<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<shopcart ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minprice"></shopcart>
</div>
</template>
	
<script>
import BScroll from "better-scroll";//npm 安装
import shopcart from "../shopcart/shopcart.vue";
import cartcontrol from "../cartcontrol/cartcontrol.vue";

  var ERR_OK = 0;
	export default {
		props:{
		   seller:{
		   		type:Object
		   }
		},
		data:function(){
			return{
				goods:[],
				listHeight:[],
				scrollY: 0
			}
		},
		computed:{
			currentIndex:function(){
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY >= height1 &&this.scrollY < height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods:function(){
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created:function (){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get("/api/goods").then((response) => {
				response = response.body;
				if(response.errno == ERR_OK){
		            this.goods = response.data;
		            this.$nextTick(() => {  //下一次在执行，因为异步加载数据。否则better-scoll获取不到高度，而无法滚动
		            	this._initScroll();
		            	this._calculateHeight();
		            });
		        }
			});
		},
		methods:{   //可以在methods里边拓展一些方法
			selectMenu:function(index,event){
				if(!event._constructed){//event._constructed区分是否是pc 还是移动端点击事件
					return;
				}
				let foodList = this.$refs.foodswrapper.getElementsByClassName("food-list-hook");//拿到一组元素
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300);//scrollToElement是个接口直接用
			},
			_initScroll:function(){   //拓展一些方法（第一个元素是一个dom元素，第二个是一个json对象）
				this.meunScroll = new BScroll(this.$refs.menuwrapper,{
					click:true   //加一个true才可以点击   否者betterscroll会阻止点击
				});//this.$els废弃  现用$refs
				this.foodsScroll = new BScroll(this.$refs.foodswrapper,{
					probeType:3,  //值为3实时监听位置
					click:true
				});
				this.foodsScroll.on("scroll", (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight:function(){
				let foodList = this.$refs.foodswrapper.getElementsByClassName("food-list-hook");
				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			}
		},
		components:{
			shopcart,
			cartcontrol
		}
	};
</script>
<style>
@import "../../../static/css/mixin.css";
.goods{position: absolute;width: 100%;top: 174px;bottom: 46px;display: flex;overflow: hidden;}
.menu-wrapper{flex: 0 0 80px;width: 80px;background: #f3f5f7;margin-top: 2px;}
.menu-item{display: table;height: 54px;width: 56px;line-height: 14px;position:relative;padding:0 12px;}
.menu-item.current{font-weight: 700;background: #fff;position: relative;margin-t-op: -1px;z-index: 10;}
.menu-item.current .text{border: none;}
.menu-item .icon{display: inline-block;width: 12px;height: 12px;margin-right: 2px;background-size: 12px 12px;background-repeat: no-repeat;}
.menu-item .decrease{background-image:url(./decrease_3@2x.png);}
.menu-item .discount{background-image:url(./discount_3@2x.png);}
.menu-item .guarantee{background-image:url(./guarantee_3@2x.png);}
.menu-item .invoice{background-image:url(./invoice_3@2x.png);}
.menu-item .special{background-image:url(./special_3@2x.png);}
.menu-item .text{font-size: 12px;display: table-cell;width: 56px;vertical-align:middle;}
.text_bo:after{border: 1px solid rgba(7,17,27,0.1);position: absolute;left: 0px;bottom: 0px;content:" ";width: 96%;}
.foods-wrapper{flex: 1; }
.foods-wrapper .title{padding-left: 14px;height: 26px;line-height: 26px;border-left: 2px solid #d9dde1;font-size: 12px;color:rgb(147,153,159);background: #f3f5f7;}
.foods-wrapper .food-item{display: flex;margin:18px;padding-bottom:18px;position: relative;}
.food-item:after{
    border: 1px solid rgba(7,17,27,0.1);position: absolute;left: 0px;bottom: 0px;content:" ";width: 100%;}
.food-item:last-child{border:none;margin-bottom: 0px;}
.food-item .icon{flex: 0 0 57px;margin-right: 10px;}
.food-item .content{flex: 1}
.food-item .content .name{margin:2px 0 8px 0;height: 14px;line-height: 14px;font-size: 14px;color: rgb(7,17,27);}
.food-item .content .desc,.food-item .content .extra{line-height: 10px;font-size: 10px;color: rgb(7,17,27); }
.food-item .content .desc{margin-bottom: 8px;line-height: 16px;}
.food-item .content .extra .count{margin-right: 12px;}
.food-item .content .price{font-weight: 700;line-height: 24px;}
.food-item .content .price .now{margin-right: 8px;font-size: 14px;color: rgb(240,20,20);}
.food-item .content .price .old{color:rgb(147,153,159);text-decoration: line-through;font-size: 10px;}
.cartcontrol-wrapper{position: absolute;right: 0px;bottom: 12px;}
</style>