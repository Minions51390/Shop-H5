<template>
  <div class="wrapper">
    <div class="shortcut">
      <div class="w0">GAY里GAY气购物商城</div>
    </div>
    <div class="header">
      <div class="w1">
        <div id="search">
          <div class="search-m">
            <a @click="jumpTo('/home')" class="logo">商城</a>
            <div id="categorys-mini" :class="{'hover': classClassify}" @mouseover="overClassify" @mouseout="outClassify">
              <div class="cw-icon1">
                <h2>
                  <a>
                    全部分类
                    <i class="ci-right1">
                      <s>◇</s>
                    </i>
                  </a>
                </h2>
              </div>
              <div :class="{'categorys-mini-main-show': classClassify, 'categorys-mini-main-close': !classClassify}">
                <div class="dd-inner">
                  <span v-for="(value, index) in tradeArr" class="classifyEveWrap">
                    <span @click="newJumpTo('/itemList', value.id)" class="classifyEve">{{value.tradeName}}</span>
                    <span v-if="index !== classifyItem.length - 1">、</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="search_logo">
              <a class="search_logo_lk">商城，多快好省</a>
            </div>
            <ul id="shelper" style="display: none;"></ul>
            <div class="form">
              <input  type="text" autocomplete="off" id="key" class="text" v-model="search">
              <button class="button" @click="goToSearch('/itemPage')">搜全站</button>
            </div>
          </div>
        </div>
        <div @click="jumpTo('/shopCar')" id="settleup" class="dropdown">
          <div class="cw-icon">
            <i class="ci-left"></i>
            <i class="ci-right">&gt;</i>
            <i class="ci-count" id="shopping-amount">{{goodsArr.length}}</i>
            <i class="icon2"></i>
            <a>我的购物车</a>
          </div>
          <div class="dropdown-layer">
            <div class="cart_pop">
              <div v-if="goodsArr.length === 0" class="cart_empty">
                <i class="cart_empty_img"></i>
                购物车中还没有商品，赶紧选购吧！
              </div>
              <div v-if="goodsArr.length !== 0" >
                <div v-for="value in goodsArr" class="goodsCar">
                  <img :src="value.goods.imagesUrl" width="50" height="50" style="float: left">
                  <span class="goodsName">{{value.goods.goodsName}}</span>
                  <span class="goodsSum">￥{{value.goods.defaultPrice}}  ×{{value.goodCount}}</span>
                </div>
                <div class="smb ar"><a id="btn-payforgoods">去购物车</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="login">
          <div class="cw-login">
            <a @click="jumpTo('/login')">登陆</a>
            <a @click="jumpTo('/register')">注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'titleSearch',
    props: {
      goodsArr: {
        type: Array,
        default: false
      },
      tradeArr: {
        type: Array,
        default: false
      }
    },
    data () {
      return {
        classClassify: false,
        classifyItem: [],
        search: ''
      }
    },
    mounted(){
      console.log(this.$route);
    },
    methods: {
      goToSearch: function(url, value) {
        sessionStorage.setItem("search", this.search);
        if (this.$route.name === 'itemPage') {
          this.$router.go(0);
        }
        this.jumpTo(url);
      },
      newJumpTo: function (url ,value) {
        if (this.$route.name === 'itemList') {
          this.$router.go(0);
        }
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      overClassify: function() {
        this.classClassify = true;
      },
      outClassify: function() {
        this.classClassify = false;
      }
    }
  }
</script>

<style scoped>
  .shortcut {
    border-bottom: 1px solid #ddd;
    background-color: #e3e4e5;
  }

  .w0 {
    height: 30px;
    line-height: 30px;
    color: #f10215;
    margin: auto;
    width: 1190px;
    text-align: center;
    font-size: 12px;
  }

  .w1{
    position: relative;
    z-index: 11;
    height: 140px;
    margin: auto;
    width: 1190px;
  }

  .search-m {
    position: relative;
    z-index: 1;
    height: 60px;
  }

  .search-m .search_logo {
    display: none;
  }

  #shelper {
    left: 320px;
    width: 498px;
    overflow: hidden;
    position: absolute;
    z-index: 1;
    top: 59px;
    border: 1px solid #ccc;
    background-color: #fff;
    -webkit-box-shadow: 1px 2px 1px rgba(0,0,0,.2);
    -moz-box-shadow: 1px 2px 1px rgba(0,0,0,.2);
    box-shadow: 1px 2px 1px rgba(0,0,0,.2);
  }

  .logo {
    position: absolute;
    top: 21px;
    display: block;
    width: 140px;
    height: 64px;
    background-image: url("../assets/SC.png");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    text-indent: -20000px;
    cursor: pointer;
  }

  #categorys-mini {
    color: #666;
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    top: 36px;
    left: 185px;
    height: 27px;
    font-family: simsun;
  }

  #categorys-mini.hover .cw-icon1 {
    border-bottom: 0;
  }

  #categorys-mini.hover .ci-right1 {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }

  #categorys-mini .cw-icon1 {
    color: #ccc;
    position: relative;
    width: 63px;
    height: 25px;
    border: 1px solid #ccc;
    line-height: 25px;
    z-index: 1;
    background: #fff;
    padding: 0 5px;
  }

  #categorys-mini .cw-icon1 h2 {
    font-family: "Microsoft YaHei";
    color: #666;
    font-size: 12px;
    font-weight: 400;
  }

  #categorys-mini .cw-icon1 h2 a{
    color: #666;
    font-size: 12px;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
  }

  #categorys-mini .cw-icon1 i {
    top: 9px;
    right: 5px;
    height: 7px;
    font: 400 15px/15px consolas;
  }

  #categorys-mini .ci-right1 {
    top: 8px;
    right: 7px;
    height: 7px;
    overflow: hidden;
    font: 400 15px/15px consolas;
    color: #6A6A6A;
    transition: transform .1s ease-in 0s;
    -webkit-transition: -webkit-transform .1s ease-in 0s;
    display: block;
    position: absolute;
  }

  #categorys-mini .cw-icon1 s {
    position: relative;
    top: -7px;
    text-decoration: none;
  }

  .categorys-mini-main-show {
    display: block;
    border: 1px solid #ccc;
    position: absolute;
    width: 152px;
    padding: 13px;
    margin-top: -1px;
    background: #fff;
    overflow: hidden;
  }

  .categorys-mini-main-close {
    display: none;
    border: 1px solid #ccc;
    position: absolute;
    width: 152px;
    padding: 13px;
    margin-top: -1px;
    background: #fff;
    overflow: hidden;
  }

  .categorys-mini-main-show .classifyEve {
    display: inline-block;
    font-family: "Microsoft YaHei";
    color: #666;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
  }

  .categorys-mini-main-show .classifyEveWrap {
    display: inline-block;
    font-family: "Microsoft YaHei";
    color: #666;
    line-height: 24px;
    font-size: 14px;
    font-weight: 400;
  }

  .search-m .form {
    position: absolute;
    left: 320px;
    top: 25px;
    width: 550px;
    height: 35px;
  }

  .search-m .text {
    left: 0;
    padding: 4px 44px 4px 4px;
    width: 450px;
    height: 24px;
    border: 1px solid transparent;
    line-height: 24px;
    font-size: 14px;
    color: rgb(51, 51, 51);
    border-width: 2px 0 2px 2px;
    border-color: #B61D1D;
    border-style: solid;
  }

  .search-m .button, .search-m .text {
    position: absolute;
    top: 0;
    outline: none;
  }

  .search-m .button {
    position: relative;
    -moz-border-radius: 0;
    border-radius: 0;
    right: 0;
    width: 50px;
    line-height: 35px;
    border: none;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    height: 36px;
    background: #B61D1D;
    font-size: 12px;
  }

  .search-m .button, .search-m .text {
    position: absolute;
    top: 0;
    outline: none;
  }

  .login {
    position: absolute;
    right: 0px;
    top: 26px;
    z-index: 21;
    width: 88px;
    height: 33px;
    background-color: #fff;
    text-align: center;
    line-height: 33px;
  }

  .login .cw-login {
    width: 88px;
    height: 33px;
    background-color: #fff;
    text-align: center;
    line-height: 33px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    float: left;
    border: 1px solid #e3e4e5;
  }

  .login .cw-login a {
    color: #f10214;
    text-decoration: none;
    font: 12px/1.5 Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
    cursor: pointer;
  }

  .login .cw-login a:hover {
    color: orange;
  }

  #settleup {
    position: absolute;
    right: 99px;
    top: 26px;
    z-index: 21;
  }

  #settleup .cw-icon {
    width: 188px;
    height: 33px;
    background-color: #fff;
    text-align: center;
    line-height: 33px;
  }

  .cw-icon {
    overflow: hidden;
    position: relative;
    z-index: 1;
    float: left;
    border: 1px solid #e3e4e5;
  }

  .ci-left, .ci-right {
    display: none!important;
  }

  #settleup .ci-count {
    position: absolute;
    top: 5px;
    left: 140px;
    right: auto;
    display: inline-block;
    padding: 1px;
    font-size: 12px;
    line-height: 12px;
    color: #fff;
    background-color: #f10215;
    -moz-border-radius: 7px;
    border-radius: 7px;
    min-width: 12px;
    text-align: center;
    font-style: normal;
  }

  #settleup .cw-icon a {
    color: #f10214;
    text-decoration: none;
    font: 12px/1.5 Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
    cursor: pointer;
  }

  #settleup .cw-icon .icon2 {
    position: absolute;
    width: 16px;;
    height: 16px;
    left: 33px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    background: url("../assets/shopcar.png");
    background-repeat: no-repeat;
    background-position: center;
  }

  .dropdown:hover .cw-icon {
    padding-bottom: 2px;
    border-color: #ccc;
    border-bottom: none;
    background-color: #fff;
  }

  .dropdown:hover .dropdown-layer {
    display: block;
  }

  .dropdown-layer {
    top: 35px;
    right: 0;
    width: 308px;
  }

  .dropdown-layer {
    display: none;
    position: absolute;
    border: 1px solid #ccc;
    background-color: #fff;
    -webkit-box-shadow: 1px 2px 1px rgba(0,0,0,.1);
    -moz-box-shadow: 1px 2px 1px rgba(0,0,0,.1);
    box-shadow: 1px 2px 1px rgba(0,0,0,.1);
  }

  .cart_pop {
    position: relative;
    z-index: 2;
    width: 100%;
    background: #fff;
  }

  .cart_empty {
    height: 49px;
    margin: auto;
    padding: 10px 0;
    text-align: center;
    line-height: 49px;
    overflow: hidden;
    color: #999;
  }

  .cart_empty_img {
    display: inline-block;
    vertical-align: middle;
    width: 56px;
    height: 49px;
    background-image: url("../assets/shopempty.png");
  }

  #navitems {
    overflow: hidden;
    position: absolute;
    left: 322px;
    bottom: 52px;
    width: 560px;
    height: 20px;
  }

  #navitems ul {
    float: right;
  }

  #navitems li {
    margin-right: 10px;
    float: left;
    list-style-type: none;
  }

  #navitems a {
    position: relative;
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }

  #navitems a:hover {
    color: #c81623;
  }

  .goodsCar {
    padding: 10px;
    vertical-align: middle;
    cursor: pointer;
  }

  .goodsCar:after {
    content: "";
    display: block;
    clear: both;
  }

  .goodsName {
    float: left;
    font-size: 12px;
    color: #666;
    display: inline-block;
    width: 155px;
    margin-left: 10px;
    height: 50px;
    overflow: hidden;
  }

  .goodsSum {
    float: left;
    height: 50px;
    line-height: 40px;
    color: #666;
    font-size: 12px;
    display: inline-block;
    margin-left: 10px;
    font-weight: bolder;
  }

  .smb {
    padding: 8px;
    background: #F5F5F5;
    overflow: hidden;
    zoom: 1;
    text-align: right;
  }

  .smb a {
    float: right;
    height: 29px;
    padding: 0 10px;
    background: #E4393C;
    color: #fff;
    text-align: center;
    font-weight: 700;
    line-height: 29px;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
  }
</style>
