<template>
  <div id="app">
        <v-header :seller="seller"></v-header><!--通过v-bind把seller传达给header组件-->
        <div class="tab border_bo">
            <div class="tab-item">
                <router-link class="tab_a" to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link class="tab_a" to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link class="tab_a" to="/seller">商家</router-link>
            </div>
        </div>
        <router-view :seller="seller"></router-view>
   </div>
</template>
<script>
  import header from "./components/header/header.vue"

  var ERR_OK = 0;
  export default{
      data:function(){
          return {
              seller: {}   //定义一个seller空对象   请求回来的seller数据资源直接塞给它
          };
      },
      created: function () { //生命周期方法  实例已经创建完成之后被调用。
        this.$http.get('./api/seller').then((response) => {//前后端数据交互
          response = response.body; 
          if(response.errno == ERR_OK){
             this.seller = response.data;
          }
        })
      },
      components:{//注册header组件
          'v-header':header
      }
  };
</script>
<style>
@import "../static/css/mixin.css";

.tab{display: flex;width: 100%;height: 40px;line-height: 40px;position: relative;}
.border_bo:after{
    display: block;
    border: 1px solid rgba(7,17,27,0.1);
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    content:" ";
}
.tab-item{flex: 1;text-align: center;}
.tab-item .tab_a{display: block;text-decoration: none;font-size: 14px;color: rgb(77,85,93);}
.tab-item .router-link-active{color: rgb(240,20,20);}
</style>

