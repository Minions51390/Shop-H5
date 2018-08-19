<template>
  <div class="mod_wrapper">
    <div class="advert">
      <div class="grid_c1">
        <a class="grid_a1"></a>
      </div>
    </div>
    <div class="shortcut">
      <div class="w0">基于个性化推荐的Web购物商城</div>
    </div>
    <div class="header">
      <div class="w1">
        <div class="logo">
          <h1 class="logo_tit">
            <a class="logo_tit_lk">购物商城</a>
          </h1>
        </div>
        <div id="search">
          <div class="search-m">
            <div class="search_logo">
              <a class="search_logo_lk">京东，多快好省</a>
            </div>
            <ul id="shelper" style="display: none;"></ul>
            <div class="form">
              <input  type="text" autocomplete="off" id="key" class="text" v-model="search">
              <button @click="goToSearch('/itemPage')" class="button"><i class="icon1"></i></button>
            </div>
          </div>
        </div>
        <div @click="jumpTo('/shopCar')" id="settleup" class="dropdown">
          <div class="cw-icon">
            <i class="ci-left"></i>
            <i class="ci-right">&gt;</i>
            <i class="ci-count" id="shopping-amount">{{goodsCount}}</i>
            <i class="icon2"></i>
            <a>我的购物车</a>
          </div>
          <div class="dropdown-layer">
            <div class="cart_pop">
              <div v-if="goodsCount === 0" class="cart_empty">
                <i class="cart_empty_img"></i>
                购物车中还没有商品，赶紧选购吧！
              </div>
              <div v-if="goodsCount !== 0" >
                <div v-for="value in goodsItem" class="goodsCar">
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
        <div id="navitems">
          <ul id="navitems-group1">
            <li v-for="value in classifyItem" class="fore1">
              <a @click="newJumpTo('/itemList', value.id)">{{value.tradeName}}</a>
            </li>
          </ul>
        </div>
        <div id="treasure">
          <a id="J_promo_lk" class="promo_lk"></a>
        </div>
      </div>
    </div>
    <div class="fs">
      <div class="grid_c1 fs_inner">
        <div class="fs_col1">
          <div id="J_cate" class="cate J_cate">
            <div class="JS_navCtn cate_menu">
              <div class="dd-inner">
                <span v-for="(value, index) in classifyItem" class="classifyEveWrap">
                  <span @click="newJumpTo('/itemList', value.id)" class="classifyEve">{{value.tradeName}}</span>
                  <span v-if="index !== classifyItem.length - 1">、</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="fs_col2">
          <div id="J_focus" class="J_focus focus">
            <div class="J_focus_main focus_main">
              <div v-on:mouseenter="stopPlay()" v-on:mouseleave="play()" class="swiper-container gallery-top swiper-container-horizontal">
                <div class="swiper-wrapper">
                  <div v-for="value in lbt" class="swiper-slide swiper-slide-next" style="width: 100%; margin-right: 10px;" v-bind:style="{backgroundImage: 'url(' + value.image + ')'}"></div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
            </div>
            </div>
          </div>
        <div class="fs_col3">
          <div id="J_rec" class="J_rec rec">
            <div class="rec_inner">
              <div v-for="value in vPic" class="rec_item">
                <a @click="newJumpTo('/item', value.id)" class="rec_lk mod_loading">
                  <div class="lazyimg lazyimg_loaded J_rec_img rec_img">
                    <img :src="value.imagesUrl" class="lazyimg_img">
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="J_fs_col4" class="fs_col4 col_expand">
          <div id="J_user" class="J_user user">
            <div class="user_inner user_level1 user_plus0">
              <div v-if="userInfo.img" @click="jumpTo('/setMes')" class="J_user_avatar user_avatar">
                <a class="user_avatar_lk">
                  <img :src="userInfo.img">
                </a>
              </div>
              <div v-if="!userInfo.img" class="J_user_avatar user_avatar">
                <a class="user_avatar_lk">
                  <img src="//misc.360buyimg.com/mtd/pc/common/img/no_login.jpg">
                </a>
              </div>
              <div v-if="userInfo.img" class="user_show">
                <p>Hi,
                  <a>{{userInfo.name}}</a>
                </p>
              </div>
              <div v-if="!userInfo.img" class="user_show">
                <p>请登陆~
                  <a>{{userInfo.name}}</a>
                </p>
              </div>
            </div>
          </div>
          <div class="tell_img">

          </div>
        </div>
      </div>
    </div>
    <div class="floor">
      <div class="sk" id="J_seckill">
        <div class="grid_c1 sk_inner">
          <div class="sk_hd">
            <a class="sk_hd_lk">
              <div class="sk_tit">今日推荐</div>
              <div class="sk_subtit">FLASH DEALS</div>
              <i class="sk_ico"></i>
              <div class="sk_subtit1">FLASH DEALS</div>
              <div class="sk_tit1">精品推荐</div>
            </a>
          </div>
          <div class="sk_bd">
            <div class="sk_list">
              <div v-for="value in tPic" class="slider_item sk_item sk_item_1 slider_active">
                <a @click="newJumpTo('/item', value.id)" class="sk_item_lk">
                  <div class="lazyimg lazyimg_loaded sk_item_img">
                    <img :src="value.imagesUrl" data-lazy-src="//img30.360buyimg.com/mobilecms/s140x140_jfs/t19396/307/1228852174/287079/95ce4384/5ac1e4b8Nc938854f.jpg!q90.webp" class="lazyimg_img">
                  </div>
                  <p class="sk_item_name">{{value.goodsName}}</p>
                  <div class="sk_item_price">
                    <span class="mod_price sk_item_price_new">
                      <i>¥</i>
                      <span>{{value.defaultPrice.toFixed(2)}}</span>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  let galleryTop;
  export default {
    data(){
      return {
        userInfo: {
          name: "",
          img: ""
        },
        tPic: [],
        vPic: [],
        navInfo: [],
        lbt: [
          {
            'image': '"http://m.360buyimg.com/babel/jfs/t18580/287/1577040255/98427/628ab340/5acf0a57N1e926bf7.jpg"'
          }, {
            'image': '"//m.360buyimg.com/babel/jfs/t17893/139/1515081795/72916/6878ce86/5acefc7aNc2268e2b.jpg"'
          }, {
            'image': '"//m.360buyimg.com/babel/jfs/t17548/266/1566026029/63194/d610a840/5aced4d1Nb4c3f257.jpg"'
          }, {
            'image': '"//m.360buyimg.com/babel/jfs/t18580/287/1577040255/98427/628ab340/5acf0a57N1e926bf7.jpg"'
          }, {
            'image': '"//m.360buyimg.com/babel/jfs/t19501/252/1459034521/91690/e576649c/5acb2d39Na691a8cb.jpg"'
          }, {
            'image': '"//img1.360buyimg.com/pop/jfs/t18817/65/1434791030/196500/6cc6d1a4/5acb1422N8e84ee72.jpg"'
          }
        ],
        classifyItem: [],
        goodsCount: '0',
        goodsItem: [],
        search: ""
      }
    },
    mounted() {
      //  首页1，2级目录
      this.tradeGet();
      // 获取购物车
      this.getShopCar();
      if (sessionStorage.getItem("userId")) {
        this.getUserInfo();
      }
      this.getGoods1();
      this.getGoods2();
      this.swiper();
    },
    methods:{
      swiper: function() {
        galleryTop = new Swiper('.gallery-top', {
          pagination: '.swiper-pagination',
          paginationClickable :true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          autoplay : 2000,
          initialSlide: 1,
          effect : 'cube',
          loop : true
        });
        Array.from(galleryTop.bullets).forEach(function(value) {
          value.style.border='2px solid #fff';
        });
      },
      stopPlay () {
        galleryTop.stopAutoplay();
      },
      play () {
        galleryTop.startAutoplay();
      },
      goToSearch: function(url, value) {
        sessionStorage.setItem("search", this.search);
        if (this.$route.name === 'itemPage') {
          this.$router.go(0);
        }
        this.jumpTo(url);
      },
      newJumpTo: function (url ,value) {
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
      tradeGet: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/trade/getTradeFirstAndSecond'
        }).then(function(response){
          console.log(response.data);
          response.data.data.forEach(function(val) {
            _self.classifyItem = _self.classifyItem.concat(val.children);
          });
        }).catch(function (response){
          console.log(response);
        });
      },
      getShopCar: function() {
        let userId1 = "";
        if (sessionStorage.getItem("userId")) {
          userId1 = sessionStorage.getItem("userId");
        } else {
          userId1 = "";
        }
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/cart/getItemFromCart',
          params: {
            userId: userId1
          }
        }).then(function(response){
          console.log(response.data);
          if (response.data.data) {
            _self.goodsCount = response.data.data.items.length;
            _self.goodsItem = _self.goodsItem.concat(response.data.data.items);
          } else {
            _self.goodsCount = 0;
          }
        }).catch(function (response){
          console.log(response);
        });
      },
      getUserInfo: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/user/getUserInfo',
          params: {
            userId: sessionStorage.getItem("userId")
          }
        }).then(function(response){
          console.log(response.data);
          _self.userInfo.img = response.data.data.image;
          _self.userInfo.name = response.data.data.username;
        }).catch(function (response){
          console.log(response);
        });
      },
      getGoods1: function() {
        let _self = this;
        let userId1 = "";
        if (sessionStorage.getItem("userId")) {
          userId1 = sessionStorage.getItem("userId");
        } else {
          userId1 = "";
        }
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/recommendOnUser/recommendBasedOnUser',
          params: {
            userId: userId1
          }
        }).then(function(response){
          _self.tPic = _self.tPic.concat(response.data.data).slice(0, 5);
          console.log(response);
        }).catch(function (response){
          console.log(response);
        });
      },
      getGoods2: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/goods/getGoodsOfSalesMost2'
        }).then(function(response){
          _self.vPic = _self.vPic.concat(response.data.data).slice(0,3);
          console.log(response);
        }).catch(function (response){
          console.log(response);
        });
      }
    }
  }
</script>

<style scoped>
  .mod_wrapper {
    background-color: #f0f3ef;
  }

  .advert {
    position: relative;
    z-index: 30;
    background-color:#291063;
  }

  .grid_c1 {
    position: relative;
    margin: 0 auto;
    width: 1190px;
  }

  .grid_a1 {
    display: block;
    width: 100%;
    height: 80px;
    background: url(../assets/advert.png) no-repeat 50% 0;
  }

  .w1{
    position: relative;
    z-index: 11;
    height: 140px;
    margin: auto;
    width: 1190px;
  }

  .logo{
    position: absolute;
    z-index: 2;
    left: 0;
    top: -31px;
    width: 190px;
    height: 170px;
    -webkit-box-shadow: 0 -12px 10px rgba(0,0,0,.2);
    -moz-box-shadow: 0 -12px 10px rgba(0,0,0,.2);
    box-shadow: 0 -12px 10px rgba(0,0,0,.2);
    background-color: #fff;
    border-bottom: 1px solid #ededed;
  }

  .logo_tit {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .logo_tit_lk {
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    overflow: hidden;
    display: block;
    width: 190px;
    height: 170px;
    background-image: url("../assets/SC.png");
    font-size: 0;
  }

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
    height: 25px;
    border: 1px solid transparent;
    line-height: 25px;
    font-size: 14px;
    color: rgb(51, 51, 51);
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
    height: 35px;
    line-height: 35px;
    border: none;
    background-color: #f10215;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
  }

  .search-m .button, .search-m .text {
    position: absolute;
    top: 0;
    outline: none;
  }

  .search-m .button .icon1 {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 100%;
    height: 100%;
    background: url("../assets/search.png");
    background-position: center;
    background-repeat: no-repeat;
  }

  .login {
    position: absolute;
    right: 0px;
    top: 25px;
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
    top: 25px;
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
    left: 200px;
    bottom: 0;
    width: 790px;
    height: 40px;
    padding-top: 20px;
  }

  #navitems ul {
    float: left;
  }

  #navitems li {
    margin-left: 30px;
    float: left;
    list-style-type: none;
  }

  #navitems a {
    position: relative;
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #333;
    text-decoration: none;
    cursor: pointer;
  }

  #navitems a:hover {
    color: #c81623;
  }

  #treasure {
    position: absolute;
    right: 0;
    bottom: 10px;
    width: 190px;
    height: 40px;
  }

  #treasure > a {
    display: block;
    width: 190px;
    height: 40px;
    background: url("../assets/1000-100.png") center no-repeat;
    color: #666;
    text-decoration: none;
  }

  .fs {
    z-index: 9;
    margin-bottom: 30px;
    position: relative;
  }

  .fs_inner {
    position: relative;
    z-index: 1;
    height: 480px;
    background-color: #f0f3ef;
  }

  .grid_c1 {
    margin: 0 auto;
    width: 1190px;
  }

  .fs_col1 {
    float: left;
    height: 480px;
    margin-right: 10px;
    width: 190px;
  }

  .cate {
    position: relative;
    z-index: 2;
  }

  .cate_menu {
    overflow: hidden;
    padding: 15px 0;
    height: 450px;
    background-color: #fefefe;
    color: #636363;
  }

  .fs_col2 {
    width: 590px;
    float: left;
    height: 480px;
    margin-right: 10px;
  }

  .focus {
    position: relative;
    float: left;
    width: 590px;
    margin-top: 10px;
    overflow: hidden;
    height: 470px;
  }

  .focus, .focus_item, .focus_main {
    height: 470px;
  }

  .gallery-top {
    height: 470px;
    width: 100%;
  }

  .gallery-thumbs .swiper-slide {
    width: 30%;
    height: 4rem;
    opacity: 0.3;
  }

  .swiper-slide {
    background-repeat: no-repeat;
    background-position: center;
  }

  .fs_col3 {
    float: left;
    width: 190px;
    height: 480px;
  }

  .rec {
    float: left;
    width: 190px;
  }

  .rec_item {
    margin-top: 10px;
    width: 190px;
    height: 150px;
  }

  .rec_lk {
    display: block;
    background: #fff;
    -webkit-transition: opacity .2s ease;
    -o-transition: opacity ease .2s;
    -moz-transition: opacity ease .2s;
    transition: opacity .2s ease;
    width: 190px;
    height: 150px;
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  .lazyimg_loaded {
    -webkit-transition: background .2s linear, opacity .2s linear !important;
    -o-transition: background .2s linear, opacity .2s linear !important;
    -moz-transition: background .2s linear, opacity .2s linear !important;
    transition: background .2s linear, opacity .2s linear !important;
    /* transition: background .2s linear; */
    background: transparent;
  }

  .lazyimg_loaded {
    -webkit-transition: background .2s linear, opacity .2s linear !important;
    -o-transition: background .2s linear, opacity .2s linear !important;
    -moz-transition: background .2s linear, opacity .2s linear !important;
    transition: background .2s linear, opacity .2s linear !important;
    /* transition: background .2s linear; */
    background: transparent;
  }

  .rec_img {
    display: block;
    width: 190px;
    height: 150px;
  }

  .lazyimg_loaded .lazyimg_img {
    opacity: 1;
  }

  .rec_img img {
    -webkit-transition: opacity .1s ease;
    -o-transition: opacity ease .1s;
    -moz-transition: opacity ease .1s;
    transition: opacity .1s ease;
  }

  .lazyimg_img {
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-transition: opacity .2s linear;
    -o-transition: opacity .2s linear;
    -moz-transition: opacity .2s linear;
    transition: opacity .2s linear;
    border: 0;
    vertical-align: middle;
  }

  .fs_col4 {
    float: right;
    width: 190px;
    height: 480px;
  }

  .user {
    height: 200px;
    background: #fff;
    margin-top: 10px;
    text-align: center;
  }

  .user_inner {
    position: relative;
    padding-top: 62px;
    height: 138px;
  }

  .user_avatar {
    position: absolute;
    left: 50%;
    top: -10px;
    margin-left: -34px;
    width: 65px;
    height: 65px;
  }

  .user_avatar_lk {
    border: 5px solid #e3e1df;
    -moz-border-radius: 50%;
    border-radius: 50%;
    overflow: hidden;
    -webkit-box-shadow: 3px 6px 25px #c3c3c3;
    -moz-box-shadow: 3px 6px 25px #c3c3c3;
    box-shadow: 3px 6px 25px #c3c3c3;
    display: block;
    width: 55px;
    height: 55px;
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  .user_avatar_lk img {
    display: block;
    width: 55px;
    height: 55px;
    border: 0;
    vertical-align: middle;
  }

  .user_show {
    padding: 0 10px;
  }

  .user_show p {
    overflow: hidden;
    line-height: 20px;
    width: 100%;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    color: #888;
    -webkit-font-smoothing: antialiased;
    background-color: #fff;
    font: 12px/1.5 Microsoft YaHei,tahoma,arial,Hiragino Sans GB,\\5b8b\4f53,sans-serif;
  }

  .user_show p a {
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  .user_show p a:hover {
    color: #c81623;
  }

  .tell_img {
    overflow: hidden;
    height: 270px;
    background: #fff;
  }

  .sk {
    height: 275px;
  }

  .sk_inner {
    background: #fff;
    overflow: hidden;
  }

  .grid_c1 {
    margin: 0 auto;
    width: 1190px;
  }

  .sk_hd {
    position: relative;
    float: left;
    width: 190px;
    height: 275px;
    background: #e83632;
    color: #fff;
  }

  .sk_hd_lk {
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-decoration: none;
  }

  .sk_tit {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 42px;
    font-size: 34px;
  }

  .sk_tit1 {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 192px;
    font-size: 34px;
  }

  .sk_subtit {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 90px;
    color: #f19999;
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
  }

  .sk_subtit1 {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 165px;
    color: #f19999;
    color: rgba(255, 255, 255, 0.5);
    font-size: 20px;
  }

  .sk_ico {
    position: absolute;
    left: 86px;
    top: 126px;
    display: block;
    width: 20px;
    height: 33px;
    background-image: url("../assets/sprite.png");
    background-position: -35px -25px;
    font-style: normal;
  }

  .sk_bd {
    float: left;
  }

  .sk_list {
    position: relative;
    float: left;
    width: 1000px;
    height: 275px;
    overflow: hidden;
  }

  .sk_item {
    position: relative;
    float: left;
    width: 200px;
    height: 275px;
    min-height: 1px;
  }

  .sk_item_lk {
    position: relative;
    display: block;
    width: 190px;
    height: 275px;
    text-align: center;
    margin: auto;
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  .sk_item_img {
    position: absolute;
    width: 140px;
    height: 140px;
    left: 50%;
    margin-left: -70px;
    top: 40px;
    -webkit-transition: opacity ease .2s;
    -o-transition: opacity ease .2s;
    -moz-transition: opacity ease .2s;
    transition: opacity ease .2s;
  }

  .sk_item_name {
    position: absolute;
    top: 190px;
    left: 0;
    width: 160px;
    padding: 0 15px;
    line-height: 30px;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    cursor: pointer;
  }

  .sk_item_name:hover {
    color: #c81623;
  }

  .sk_item_price {
    position: absolute;
    left: 15px;
    top: 230px;
    width: 160px;
    height: 20px;
    padding: 1px;
    background: #e6382f;
    line-height: 20px;
  }

  .mod_price i {
    margin-right: 3px;
    font-family: arial;
    font-weight: 400;
    font-size: 12px;
    font-style: normal;
    text-align: center;
  }

  .sk_item_price_new {
    width: 80px;
    height: 20px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
  }

  .sk_item::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 275px;
    background: #f0f0f0;
  }

  .classifyEveWrap {
    display: inline-block;
    font-size: 14px;
    color: #333;
    text-decoration: none;
    cursor: pointer;
    line-height: 20px;
  }

  .dd-inner {
    padding: 0 20px;
  }

  .classifyEve:hover {
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
