<template>
  <div class="wrapper">
    <title-search :goodsArr="goodsItem" :tradeArr="classifyItem"></title-search>

    <div v-if="bufu === 2142557">
      {{不符}}
    </div>
    <div class="w">
      <div class="product-intro clearfix">
        <div class="preview-wrap">
          <div class="preview" id="preview">
            <div id="spec-n1" class="jqzoom main-img pic-box">
              <pic-zoom :url="imagesUrl" :scale="3"></pic-zoom>
              <i></i>
            </div>
          </div>
        </div>
        <div class="itemInfo-wrap">
          <div class="sku-name">
            {{goodsName}}
          </div>
          <div class="summary p-choose-wrap">
            <div class="li p-choose">
              <div class="dt">商铺名称:</div>
              <div class="dd">
                <div class="item">
                  <a>{{sellerName}}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="summary p-choose-wrap">
            <div class="li p-choose">
              <div class="dt">商品单价:</div>
              <div class="dd">
                <div class="item">
                  <a>￥{{defaultPrice}}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="summary p-choose-wrap">
            <div class="li p-choose">
              <div class="dt">商品编号:</div>
              <div class="dd">
                <div class="item">
                  <a>{{id}}</a>
                </div>
              </div>
            </div>
          </div>
          <div class="summary p-choose-wrap">
            <div class="li p-choose">
              <div class="dt">商品库存:</div>
              <div class="dd">
                <div class="item">
                  <a>{{goodsCount}}</a>
                </div>
              </div>
            </div>
          </div>
          <div id="choose-btns" class="choose-btns clearfix">
            <div class="choose-amount">
              <div class="wrap-input">
                <input class="text buy-num" v-model="acount">
                <a @click="acountR" class="btn-reduce" :class="{'disabled': reduce}">-</a>
                <a @click="acountA" class="btn-add">+</a>
              </div>
            </div>
            <a @click="postShopCar()" id="InitCartUrl" class="btn-special1 btn-lg" >加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="w">
      <div id="shopRecSuit" class="ETab">
        <div class="tab-main large">
          <ul>
            <li @click="whichTab('info')" class="J-shopRec-trigger shopRec-trigger" :class="{'current': chooseTab.info}">商品介绍</li>
            <li @click="whichTab('sayIt')" class="J-shopRec-trigger shopRec-trigger" :class="{'current': chooseTab.sayIt}">商品评价</li>
          </ul>
        </div>
        <div class="tab-con">
          <div :class="{'show': chooseTab.info, 'hide': !chooseTab.info}">
            <div class="p-parameter">
              <ul id="parameter-brand" class="p-parameter-list">
                <li>品牌：
                  <a>
                    {{goodsName}}
                  </a>
                </li>
              </ul>
              <ul class="parameter2 p-parameter-list">
                <li>{{goodsName}}</li>
                <li>商品编号：{{id}}</li>
                <li>店铺： {{sellerName}}</li>
                <li>库存：{{goodsCount}}</li>
                <li>单价：￥{{defaultPrice}}</li>
              </ul>
            </div>
          </div>
          <div :class="{'show': chooseTab.sayIt, 'hide': !chooseTab.sayIt}">
            <div class="p-parameter">
              <div class="mt">
                <h3>商品评价</h3>
              </div>
              <div class="tab-con">
                <div id="comment-0">
                  <div v-for="value in assess" class="comment-item">
                    <div class="user-column">
                      <div class="user-info">
                        <img :src="value.user.image" width="25" height="25" alt="小***卷" class="avatar">
                        {{value.user.username}}
                      </div>
                    </div>
                    <div class="comment-column J-comment-column">
                      <div v-if="value.commentScore === 1" class="comment-star star1"></div>
                      <div v-if="value.commentScore === 2" class="comment-star star2"></div>
                      <div v-if="value.commentScore === 3" class="comment-star star3"></div>
                      <div v-if="value.commentScore === 4" class="comment-star star4"></div>
                      <div v-if="value.commentScore === 5" class="comment-star star5"></div>
                      <p class="comment-con">{{value.content}}</p>
                    </div>
                  </div>
                </div>
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
  import PicZoom from 'vue-piczoom'
  import Qs from 'qs'
  export default {
    name: 'item',
    components:{titleSearch, PicZoom},
    data () {
      return {
        goodsName: "",
        imagesUrl: "",
        sellerName: "",
        defaultPrice: "",
        goodsCount: "",
        id: "",
        chooseTab: {
          info: true,
          sayIt: false
        },
        assess: [],
        acount: "1",
        reduce: true,
        goodsAcount: "",
        goodsItem : [],
        classifyItem: [],
        goodsId: "10742463854",
        bufu: ""
      }
    },
    mounted(){
      if (this.$route.query.id === 2142557) {
        alert("商品与商家描述不一致");
        this.bufu = 2142557;
      }
      console.log(this.$route.query.id);
      this.goodsId = this.$route.query.id;
      this.getInfo();
      this.getShopCar();
      this.tradeGet();
    },
    methods: {
      whichTab: function(val) {
        for (var prop in this.chooseTab) {
          this.chooseTab[prop] = false;
        }
        this.chooseTab[val] = true;
      },
      acountR: function() {
        if (this.acount > 1) {
          this.acount--;
          this.reduce = false
        } else {
          this.reduce = true
        }
        if (this.acount === 1) {
          this.reduce = true
        }
      },
      acountA: function() {
        this.reduce = false;
        this.acount++;
      },
      postShopCar: function() {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/cart//addItemToCart',
          data: Qs.stringify({
            goodId: _self.id,
            goodCount: _self.acount
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.$router.go(0);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getInfo: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/goods/getGoodById',
          params: {
            id: _self.goodsId
          }
        }).then(function(response){
          console.log(response.data);
          _self.goodsName = response.data.data.goodsName;
          _self.imagesUrl = response.data.data.imagesUrl;
          _self.sellerName = response.data.data.sellerName;
          _self.defaultPrice = response.data.data.defaultPrice;
          _self.id = response.data.data.id;
          _self.goodsCount = response.data.data.goodsCount;
          _self.assess = _self.assess.concat(response.data.data.commentsList);
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
            _self.classifyItem = _self.classifyItem.concat(val.children);
          });
        }).catch(function (response){
          console.log(response);
        });
      }
    }
  }
</script>

<style scoped>
  .w {
    width: 1210px;
    margin: 0 auto;
  }

  .product-intro {
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .product-intro .preview-wrap {
    width: 352px;
    float: left;
    padding-bottom: 15px;
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }

  .preview {
    position: relative;
  }

  .preview .jqzoom {
    position: relative;
    padding: 0;
  }

  .preview .main-img {
    border: 1px solid #eee;
    margin-bottom: 20px;
    _zoom: 1;
  }

  img {
    border: 0;
    vertical-align: middle;
  }

  .preview .main-img i {
    width: 30px;
    height: 30px;
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    background: url(//static.360buyimg.com/item/unite/1.0.39/components/default/preview/i/sprite-magnify.png) no-repeat;
  }

  .product-intro .itemInfo-wrap {
    width: 590px;
    float: left;
    margin-left: 30px;
  }

  .itemInfo-wrap .sku-name {
    font: 700 16px Arial,"microsoft yahei";
    color: #666;
    padding-top: 10px;
    line-height: 28px;
    margin-bottom: 5px;
  }

  .summary {
    position: relative;
    padding-bottom: 5px;
    _zoom: 1;
  }

  .li {
    margin-bottom: 3px;
    line-height: 32px;
    display: block;
  }

  .itemInfo-wrap .dt {
    float: left;
    padding-left: 10px;
    font-size: 12px;
    font-family: simsun;
    color: #999;
  }

  .itemInfo-wrap .dd {
    margin-left: 70px;
  }

  .itemInfo-wrap .dd:after {
    content: '';
    display: block;
    clear: both;
  }

  .li .item {
    position: relative;
    float: left;
    color: #666;
    background-color: #FFF;
    margin-right: 7px;
    margin-bottom: 4px;
  }

  .li .item a {
    padding: 0 13px;
    display: block;
    white-space: nowrap;
    text-decoration: none;
    color: #666666;
    font-size: 12px;
    cursor: pointer;
  }

  .ETab .tab-main {
    position: relative;
    background-color: #f7f7f7;
    border: 1px solid #eee;
    border-bottom: 1px solid #e4393c;
    display: block;
  }

  .ETab .tab-main ul {
    margin-top: -1px;
    list-style: none;
  }

  .ETab .tab-main li.current {
    background-color: #e4393c;
    color: #fff;
    cursor: default;
  }

  .ETab div.large li {
    padding: 10px 25px;
    font-size: 14px;
  }

  .ETab .tab-main li {
    position: relative;
    display: inline-block;
    font-family: "microsoft yahei";
    cursor: pointer;
  }

  .ETab .tab-main:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .ETab .tab-con {
    padding: 10px 0;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .p-parameter {
    padding: 0 0px 10px;
  }

  #parameter-brand {
    padding: 20px 0 15px;
    margin: 0;
    list-style: none;
    overflow: hidden;
  }

  #parameter-brand li {
    width: 50%;
    padding-left: 42px;
    float: left;
    margin-bottom: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
  }

  .p-parameter .p-parameter-list li a {
    color: #666;
  }

  .p-parameter-list {
    padding: 20px 0 15px;
    overflow: hidden;
    list-style: none;
    margin: 0;
  }

  .p-parameter-list li {
    width: 200px;
    padding-left: 42px;
    float: left;
    margin-bottom: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    list-style: none;
    font-size: 12px!important;
    color: #666;
  }

  .mt {
    position: relative;
    padding: 10px;
    _zoom: 1;
    background-color: #f7f7f7;
    border: 1px solid #eee;
    overflow: hidden;
    color: #666;
    font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
  }

  .tab-con {
    padding: 10px 0;
  }

  .comment-item {
    zoom: 1;
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }
  .comment-item .user-column {
    width: 140px;
    float: left;
    font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #666;
  }

  .comment-item .user-info {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #666;
    background: #fff;
  }

  .comment-item .user-info img {
    border-radius: 50%;
    margin-right: 5px;
    border: 0;
    vertical-align: middle;
  }

  .comment-item .comment-column {
    margin-left: 150px;
  }

  .star1 {
    background-position: -64px 0!important;
  }

  .star2 {
    background-position: -48px 0!important;
  }

  .star3 {
    background-position: -32px 0!important;
  }

  .star4 {
    background-position: -16px 0!important;
  }

  .star5 {
    background-position: 0 0!important;
  }

  .comment-item .comment-star {
    width: 78px;
    height: 14px;
    background: url(../assets/star.png) no-repeat;
  }

  .comment-item .comment-con {
    font-size: 14px;
    padding: 10px 0;
    line-height: 180%;
    color: #333;
  }

  .choose-btns {
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 10px;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .choose-btns .choose-amount {
    width: 58px;
    height: 44px;
    overflow: hidden;
    border: 1px solid #ccc;
    position: relative;
    margin-right: 10px;
    float: left;
  }

  .choose-btns .choose-amount input {
    display: block;
    width: 43px;
    height: 42px;
    line-height: 42px;
    position: absolute;
    top: 1px;
    left: 0;
    border: 0;
    text-align: center;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    margin: 0em;
    font: 400 13.3333px Arial;
  }

  .choose-btns .choose-amount a.btn-reduce {
    bottom: -1px;
  }

  .choose-btns .choose-amount a {
    display: block;
    width: 15px;
    text-align: center;
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    background: #f1f1f1;
    color: #666;
    position: absolute;
    right: -1px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .choose-btns .choose-amount a.btn-add {
    top: -1px;
  }

  .choose-btns .choose-amount a.disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .choose-btns .btn-lg {
    margin-right: 10px;
    float: left;
  }

  .btn-lg {
    height: 46px;
    line-height: 46px;
    padding: 0 26px;
    font-size: 18px;
    font-family: "microsoft yahei";
  }

  .btn-special1 {
    font-weight: 700;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    text-decoration: none;
  }

  .btn-special1 {
    background-color: #df3033;
    color: #fff;
  }
</style>
