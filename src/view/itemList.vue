<template>
  <div class="wrapper">
    <title-search :goodsArr="goodsItem" :tradeArr="classifyItems"></title-search>
    <div class="fs">
      <div class="grid_c1 fs_inner">
        <div class="fs_col1">
          <div id="J_cate" class="cate J_cate">
            <div class="JS_navCtn cate_menu">
              <div class="dd-inner">
                <span v-for="(value, index) in classifyItem" class="classifyEveWrap">
                  <span @click="newJumpTo('/itemPage', value.id)" class="classifyEve">{{value.tradeName}}</span>
                  <span v-if="index !== classifyItem.length - 1">、</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="fs_col2">
          <div class="bigImgArea">
            <img v-for="value in bigImg" width="490" height="310" :src="value.imagesUrl" @click="newJumpTo('/item', value.id)">
          </div>
          <div class="smImgArea">
            <img v-for="value in smImg" height="160" width="190" :src="value.imagesUrl" @click="newJumpTo('/item', value.id)">
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
              <div v-for="value in vPic" class="slider_item sk_item sk_item_1 slider_active">
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
  import titleSearch from '../components/titleSearch'
  import Qs from 'qs'
  export default {
    name: 'itemList',
    components:{titleSearch},
    data () {
      return {
        vPic: [],
        bigImg: [],
        smImg: [],
        tradeId: '',
        classifyItem: [],
        goodsItem : [],
        classifyItems: []
      }
    },
    mounted(){
      this.tradeId = this.$route.query.id;
      //   三级目录
      this.postTrade();
      this.getShopCar();
      this.tradeGet();
      this.getGoods2();
      this.getHotImg();
    },
    methods: {
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      newJumpTo: function (url ,value) {
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
      },
      postTrade: function() {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/trade/getTradeChildren',
          data: Qs.stringify({
            tradeId: _self.tradeId
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          response.data.data.forEach(function(val) {
            _self.classifyItem = _self.classifyItem.concat(val);
          });
        }).catch(function (error) {
          console.log(error);
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
            _self.goodsAcount = response.data.data.items.length;
            _self.goodsItem = _self.goodsItem.concat(response.data.data.items);
          }
          console.log(_self.goodsItem);
        }).catch(function (response){
          console.log(response);
        });
      },
      tradeGet: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/trade/getTradeFirstAndSecond'
        }).then(function(response){
          console.log(response.data);
          response.data.data.forEach(function(val) {
            _self.classifyItems = _self.classifyItems.concat(val.children);
          });
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
          _self.vPic = _self.vPic.concat(response.data.data);
          console.log(response);
        }).catch(function (response){
          console.log(response);
        });
      },
      getHotImg: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/goods/getGoodsForTrade'
        }).then(function(response){
          _self.bigImg = _self.bigImg.concat(response.data.data).slice(0, 2);
          _self.smImg = _self.smImg.concat(response.data.data).slice(2, 7);
          console.log(response);
        }).catch(function (response){
          console.log(response);
        });
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    background-color: #f0f3ef;
  }

  .fs {
    z-index: 9;
    margin-bottom: 30px;
    position: relative;
  }

  .grid_c1 {
    margin: 0 auto;
    width: 1190px;
  }

  .fs_inner {
    position: relative;
    z-index: 1;
    height: 480px;
    background-color: #f0f3ef;
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
    width: 990px;
    float: left;
    height: 480px;
  }

  .bigImgArea {
    margin-bottom: 6px;
  }

  .bigImgArea > img {
    cursor: pointer;
  }

  .bigImgArea > img:nth-of-type(1) {
    margin-right: 10px;
  }

  .smImgArea > img {
    margin-right: 10px;
    cursor: pointer;
  }

  .smImgArea > img:nth-of-type(5) {
    margin-right: 0px;
  }

  .sk {
    height: 275px;
    padding-bottom: 18px;
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

  .lazyimg_img {
    width: 100%;
    height: 100%;
    opacity: 1;
    -webkit-transition: opacity .2s linear;
    -o-transition: opacity .2s linear;
    -moz-transition: opacity .2s linear;
    transition: opacity .2s linear;
    border: 0;
    vertical-align: middle;
  }
</style>
