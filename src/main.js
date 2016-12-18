import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'      //数据资源（resource）
import App from './App.vue'
import Seller from "./components/seller/seller.vue";
import Goods from "./components/goods/goods.vue";
import Ratings from "./components/ratings/ratings.vue";
//路由中间件
Vue.use(VueRouter);
//全局注册
Vue.use(VueResource);

//定义路由
var router = new VueRouter({
  routes: [
    { path: '/goods', component: Goods },
    { path: '/ratings', component: Ratings },
    { path: '/seller', component: Seller }
  ]
})

	
new Vue({
  el: '#app',
  router:router,
  render: h => h(App),       //jsx语法解析App.vue
  template: '<router-view></router-view>'
})

//默认根路径/调到goods上 
router.push('/goods');