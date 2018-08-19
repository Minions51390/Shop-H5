<template>
  <div class="wrapper">
    <div class="w w1 header clearfix">
      <div id="logo-2014">
        <a @click="jumpTo('/home')" class="logo"></a>
        <a class="link2">评价订单</a>
      </div>
      <div class="cart-search">
        <div class="form">
          <input id="key" type="text" class="itxt" autocomplete="off">
          <input type="button" class="button" value="搜索">
        </div>
      </div>
      <p class="name">杨奇小可爱</p>
      <div @click="jumpTo('/setMes')" class="user">
        <div class="J_user_avatar user_avatar">
          <a class="user_avatar_lk">
            <img src="//misc.360buyimg.com/mtd/pc/common/img/no_login.jpg">
          </a>
        </div>
      </div>
    </div>
    <div id="container">
      <div class="w">
        <div class="mycomment-detail">
          <div class="detail-hd" id="o-info-orderinfo">
            <div class="orderinfo">
              <h3 class="o-title">评价订单</h3>
              <div class="o-info">
                <span class="mr20">订单号：<a class="gray1">{{listNum}}</a></span>
                <span>{{createTime}}</span>
              </div>
            </div>
            <div class="mycomment-form">
              <div class="form-part1">
                <div class="f-cutline"></div>
                <div v-for="value in goodsJudge" class="f-item f-goods product-2263988">
                  <div class="fi-info">
                    <div class="comment-goods">
                      <div class="p-img"><a><img :src="value.goods.imagesUrl" alt=""></a></div>
                      <div class="p-name"><a>{{value.goods.goodsName}}</a></div>
                      <div class="p-price"><strong>¥{{value.goods.defaultPrice.toFixed(2)}}</strong></div>
                    </div>
                  </div>
                  <div class="fi-operate">
                    <div class="fop-item fop-star  ">
                      <div class="fop-label">商品评分</div>
                      <div class="fop-main">
                        <span class="commstar">
                          <span @click="cliStar(value, value.starSc1)" @mouseout="outStar(value, value.starSc1)" @mouseover="judgeStar(value, value.starSc1)" :class="{'hover': value.starSc1.flag}" class="star star1"></span>
                          <span @click="cliStar(value, value.starSc2)" @mouseout="outStar(value, value.starSc2)" @mouseover="judgeStar(value, value.starSc2)" :class="{'hover': value.starSc2.flag}" class="star star2"></span>
                          <span @click="cliStar(value, value.starSc3)" @mouseout="outStar(value, value.starSc3)" @mouseover="judgeStar(value, value.starSc3)" :class="{'hover': value.starSc3.flag}" class="star star3"></span>
                          <span @click="cliStar(value, value.starSc4)" @mouseout="outStar(value, value.starSc4)" @mouseover="judgeStar(value, value.starSc4)" :class="{'hover': value.starSc4.flag}" class="star star4"></span>
                          <span @click="cliStar(value, value.starSc5)" @mouseout="outStar(value, value.starSc5)" @mouseover="judgeStar(value, value.starSc5)" :class="{'hover': value.starSc5.flag}" class="star star5"></span>
                          <span class="star-info">{{value.socre}}分</span>
                        </span>
                      </div>
                    </div>
                    <div class="fop-item">
                      <div class="fop-label">评价晒单</div>
                      <div class="fop-main">
                        <div class="f-textarea">
                          <textarea name="" id="" placeholder="分享体验心得，给万千想买的人一个参考~" v-model="value.judge"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="f-btnbox">
                <a @click="uploadJu()" class="btn-submit">提交</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'judgeShop',
    data () {
      return {
        createTime: "",
        listNum: "",
        goodsJudge: []
      }
    },
    mounted(){
      this.listNum = this.$route.query.id;
      this.getJudge();
    },
    methods: {
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      judgeStar: function(self, val) {
        self.starSc1.flag = false;
        self.starSc2.flag = false;
        self.starSc3.flag = false;
        self.starSc4.flag = false;
        self.starSc5.flag = false;
        val.flag = true;
        self.socre = val.mark;
      },
      outStar: function(self, val) {
        self.starSc1.flag = self.starSc1.finFlag;
        self.starSc2.flag = self.starSc2.finFlag;
        self.starSc3.flag = self.starSc3.finFlag;
        self.starSc4.flag = self.starSc4.finFlag;
        self.starSc5.flag = self.starSc5.finFlag;
        self.socre = self.finSoc;
      },
      cliStar: function(self, val) {
        self.finSoc = val.mark;
        self.starSc1.finFlag = false;
        self.starSc2.finFlag = false;
        self.starSc3.finFlag = false;
        self.starSc4.finFlag = false;
        self.starSc5.finFlag = false;
        val.finFlag = true;
      },
      getJudge: function() {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/order/getOrderDetail',
          data: Qs.stringify({
            orderId: _self.listNum
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.createTime = response.data.data.createTime;
          for (let i = 0; i < response.data.data.items.length; i++) {
            response.data.data.items[i].starSc1 = {
              flag: false,
              finFlag: false,
              mark: 1
            };
            response.data.data.items[i].starSc2 = {
              flag: false,
              finFlag: false,
              mark: 2
            };
            response.data.data.items[i].starSc3 = {
              flag: false,
              finFlag: false,
              mark: 3
            };
            response.data.data.items[i].starSc4 = {
              flag: false,
              finFlag: false,
              mark: 4
            };
            response.data.data.items[i].starSc5 = {
              flag: false,
              finFlag: false,
              mark: 5
            };
            response.data.data.items[i].socre = 0;
            response.data.data.items[i].finSoc = 0;
            response.data.data.items[i].judge = ""
          }
          _self.goodsJudge = _self.goodsJudge.concat(response.data.data.items);
        }).catch(function (error) {
          console.log(error);
        });
      },
      uploadJu: function() {
        let judgeObj = [];
        for (let i = 0; i < this.goodsJudge.length; i++) {
          judgeObj[i] = {};
          judgeObj[i].score = this.goodsJudge[i].finSoc;
          judgeObj[i].say = this.goodsJudge[i].judge;
          judgeObj[i].goodsId = this.goodsJudge[i].goodsId;
          judgeObj[i].userId = sessionStorage.getItem("userId");
        }
        console.log(judgeObj);
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/comments/createComment',
          data: Qs.stringify({
            comments: JSON.stringify(judgeObj),
            orderId: _self.listNum,
            userId: sessionStorage.getItem("userId")
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          if (response.data.data) {
            _self.jumpTo('/myList');
          }
        }).catch(function (error) {
          console.log(error);
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

  .header {
    padding: 10px 0 0;
    position: relative;
  }

  #logo-2014 {
    float: left;
    position: relative;
    width: 277px;
    padding: 0;
    z-index: 12;
    height: 50px;
    margin: 15px 0 22px;
  }

  #logo-2014 .logo {
    display: block;
    margin-top: 2px;
    width: 134px;
    height: 65px;
    background: url('../assets/SC.png') no-repeat 0 0;
    background-size: 134px 90px;
    text-indent: -20000px;
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  #logo-2014 .link2 {
    overflow: hidden;
    display: block;
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 40px;
    top: 14px;
    right: 30px;
    background: #fff;
    color: #000;
    text-decoration: none;
    font-weight: bolder;
    cursor: pointer;
  }

  .cart-search {
    float: left;
    border: 2px solid #c91623;
    height: 24px;
    margin-top: 30px;
    overflow: hidden;
  }

  .cart-search .itxt {
    border: 0;
    height: 18px;
    line-height: 18px;
    width: 260px;
    padding: 3px 5px;
    outline: 0;
    float: none;
    color: rgb(153, 153, 153);
  }

  .cart-search .button {
    display: inline-block;
    vertical-align: top;
    width: 48px;
    height: 24px;
    background: #c91623;
    text-align: center;
    color: #fff;
    font-weight: 700;
    -webkit-appearance: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }

  .user {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
  }

  .user:after {
    content: "";
    display: block;
    clear: both;
  }

  .user_avatar {
    position: absolute;
    width: 50px;
    height: 50px;
  }

  .user_avatar_lk {
    border: 5px solid #e3e1df;
    border-radius: 50%;
    overflow: hidden;
    -webkit-box-shadow: 3px 6px 25px #c3c3c3;
    box-shadow: 3px 6px 25px #c3c3c3;
    display: block;
    width: 40px;
    height: 40px;
    color: #666;
    text-decoration: none;
    text-align: center;
  }

  .user_avatar_lk img {
    display: block;
    width: 40px;
    height: 40px;
    border: 0;
    vertical-align: middle;
  }

  .name {
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #c91623;
  }

  #container {
    background-color: #f5f5f5;
  }

  .mycomment-detail .detail-hd {
    width: 100%;
    text-align: center;
  }

  .mycomment-detail .orderinfo {
    padding: 15px 0;
  }

  .mycomment-detail .o-title {
    font: 700 16px/26px "Microsoft YaHei";
    color: #333;
  }

  .mycomment-detail .o-info {
    font: 12px/22px verdana;
    color: #999;
  }

  .mr20 {
    margin-right: 20px;
  }

  .gray1 {
    color: #333;
  }

  .mycomment-form {
    width: 100%;
    overflow: hidden;
  }

  .mycomment-form .f-btnbox {
    position: relative;
    width: 100%;
    height: 48px;
    padding: 30px 0;
    text-align: center;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 40px;
  }

  .mycomment-form .f-btnbox .btn-submit {
    width: 220px;
    height: 48px;
    line-height: 48px;
    padding: 0;
    font-family: "Microsoft YaHei";
    font-size: 18px;
  }

  .mycomment-form .f-btnbox .btn-submit {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    color: #fff;
    border-radius: 3px;
    background-color: #df3033;
    background-image: linear-gradient(to bottom,#df3033 0,#e74649 100%);
  }

  .mycomment-form .f-cutline {
    position: relative;
    width: 100%;
    height: 11px;
    overflow: hidden;
    background: #f5f5f5;
  }

  .mycomment-form .f-item {
    border-top: 1px solid #e4e4e4;
    margin-top: -1px;
    margin-bottom: 1px;
    overflow: hidden;
    background: #fff;
    font-family: verdana,'5b8b/4f53;';
  }

  .mycomment-form .fi-info {
    float: left;
    width: 322px;
  }

  .comment-goods {
    padding: 55px 50px;
  }

  .comment-goods .p-img {
    width: 100%;
    height: 100px;
    margin-bottom: 15px;
    text-align: center;
    overflow: hidden;
  }

  .comment-goods .p-img img {
    width: 100px;
    height: 100px;
    border: 0;
    vertical-align: middle;
  }

  .comment-goods .p-name {
    width: 100%;
    line-height: 20px;
    margin-bottom: 10px;
    text-align: center;
    overflow: hidden;
    font-size: 12px;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  .comment-goods .p-price {
    width: 100%;
    line-height: 20px;
    margin-bottom: 10px;
    text-align: center;
    color: #666;
  }

  .comment-goods .p-price strong {
    font-family: verdana;
    font-size: 12px;
  }

  .mycomment-form .fi-operate {
    overflow: hidden;
    zoom: 1;
    border-left: 1px solid #f5f5f5;
    padding: 30px 40px 0;
    padding-bottom: 4000px;
    margin-bottom: -4000px;
    position: relative;
    z-index: 1;
  }

  .mycomment-form .fop-item.fop-star {
    height: 16px;
    padding-top: 30px;
    margin-top: -30px;
  }

  .mycomment-form .fop-item {
    float: left;
    width: 100%;
    padding-bottom: 25px;
  }

  .mycomment-form .fop-item.fop-star .fop-label {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    color: #666;
  }

  .mycomment-form .fop-item .fop-label {
    float: left;
    width: 100px;
    margin-right: 20px;
    overflow: hidden;
  }

  .mycomment-form .fop-item .fop-main {
    overflow: hidden;
    zoom: 1;
    margin-right: 40px;
    text-align: left;
  }

  .commstar .star.hover {
    background: url(//misc.360buyimg.com/user/myjd/comment/1.0.0/css/i/commstar.png) 0 -16px repeat-x;
  }

  .commstar {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 16px;
    vertical-align: top;
    margin-right: 30px;
    background: url(//misc.360buyimg.com/user/myjd/comment/1.0.0/css/i/commstar.png) 0 0 repeat-x;
  }

  .commstar .star1 {
    width: 20%;
    z-index: 6;
  }

  .commstar .star {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    cursor: pointer;
  }

  .commstar .star2 {
    width: 40%;
    z-index: 5;
  }

  .commstar .star3 {
    width: 60%;
    z-index: 4;
  }

  .commstar .star4 {
    width: 80%;
    z-index: 3;
  }

  .commstar .star5 {
    width: 100%;
    z-index: 2;
  }

  .commstar .star-info {
    position: absolute;
    right: -30px;
    top: 0;
    width: 30px;
    height: 16px;
    line-height: 16px;
    text-align: right;
    color: #999;
    font-size: 12px;
  }

  .mycomment-form .fop-item .fop-label {
    float: left;
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin-right: 20px;
    overflow: hidden;
    font-size: 12px;
    color: #666;
  }

  .mycomment-form .fop-item .f-textarea {
    padding: 10px 10px 0;
    border: 1px solid #e0e0e0;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .mycomment-form .fop-item .f-textarea textarea {
    width: 100%;
    height: 170px;
    max-width: 100%;
    max-height: 170px;
    min-height: 170px;
    line-height: 18px;
    border: medium none;
    color: #333;
    resize: none;
    font-size: 12px;
    font-family: monospace;
    -webkit-appearance: textarea;
    background-color: white;
    -webkit-rtl-ordering: logical;
    flex-direction: column;
    cursor: text;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 2px;
  }

  .mycomment-form .fop-item .f-textarea textarea:focus {
    outline: medium none;
  }
</style>
