<template>
  <div class="wrapper">
    <div class="w w1 header clearfix">
      <div id="logo-2014">
        <a @click="jumpTo('/home')" class="logo"></a>
        <a class="link2">评价订单</a>
      </div>
      <div class="cart-search">
        <div class="form">
          <input id="key" type="text" class="itxt" autocomplete="off" v-model="search">
          <input type="button" class="button" value="搜索" @click="goToSearch('/itemPage')">
        </div>
      </div>
      <p class="name">{{userInfo.name}}</p>
      <div @click="jumpTo('/setMes')" class="user">
        <div class="J_user_avatar user_avatar">
          <a class="user_avatar_lk">
            <img :src="userInfo.img">
          </a>
        </div>
      </div>
    </div>
    <div id="container">
      <div class="w">
        <div id="content">
          <div id="sub">
            <div id="menu">
              <dl class="fore1">
                <dt id="_MYJD_order">订单中心</dt>
              </dl>
            </div>
          </div>
          <div id="main">
            <div id="chunjie" class="mb10"></div>
            <div class="mod-main mod-comm mod-order" id="order01">
              <div class="mt">
                <h3>我的订单</h3>
                <div class="extra-r"></div>
              </div>
            </div>
            <div class="mod-main mod-comm lefta-box" id="order02">
              <div class="mt">
                <ul class="extra-l">
                  <li class="fore1">
                    <a class="txt curr">全部订单</a>
                  </li>
                </ul>
              </div>
              <div class="mc">
                <table class="td-void order-tb">
                  <thead>
                    <tr>
                      <th>
                        <div class="ordertime-cont">
                          <div class="time-txt">全部订单</div>
                        </div>
                        <div class="order-detail-txt ac">订单详情</div>
                      </th>
                      <th>收货人</th>
                      <th>金额</th>
                      <th>
                        <div class="deal-state-cont" id="orderState">
                          <div class="state-txt">全部状态</div>
                        </div>
                      </th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody v-for="value in orderGoods">
                    <tr class="sep-row">
                      <td colspan="5"></td>
                    </tr>
                    <tr class="tr-th">
                      <td colspan="5">
                        <span class="gap"></span>
                        <span class="dealtime" title="2018-05-16 11:34:14">{{value.createTime}}</span>
                        <span class="number">
                          订单号：<a>{{value.id}}</a>
                        </span>
                        <div class="tr-operate"></div>
                      </td>
                    </tr>

                    <tr class="tr-bd" oty="0,4,70">
                      <td style="padding: 0; border: 0;"></td>
                      <td :rowspan="value.items.length + 1">
                        <div class="consignee tooltip">
                          <span class="txt">{{value.receiveAddress.receiveName}}</span><b></b>
                        </div>
                      </td>
                      <td :rowspan="value.items.length + 1">
                        <div class="amount">
                          <span>总额 ¥{{value.orderPay}}</span><br>
                          <span class="ftx-13">在线支付</span>
                        </div>
                      </td>
                      <td :rowspan="value.items.length + 1">
                        <div class="status">
                          <span v-if="value.orderStatus === 0" class="order-status ftx-03">
            	              待支付
                          </span>
                          <span v-if="value.orderStatus === 1" class="order-status ftx-03">
            	              待发货
                          </span>
                          <span v-if="value.orderStatus === 2" class="order-status ftx-03">
            	              已发货
                          </span>
                          <span v-if="value.orderStatus === 3" class="order-status ftx-03">
            	              待评价
                          </span>
                          <span v-if="value.orderStatus === 4" class="order-status ftx-03">
            	              已评价
                          </span>
                          <br>
                        </div>
                      </td>
                      <td :rowspan="value.items.length + 1">
                        <div class="operate">
                          <span v-if="value.orderStatus === 4" class="order-status ftx-03">
            	              已评价
                          </span>
                          <span @click="newJumpTo('/judgeShop', value.id)" v-if="value.orderStatus !== 4" class="order-status ftx-03" style="cursor: pointer; color: #000;">
                            去评价
                          </span>
                        </div>
                      </td>
                    </tr>

                    <tr v-for="it in value.items" class="tr-bd" oty="0,4,70">
                      <td>
                        <div class="goods-item">
                          <div class="p-img">
                            <a>
                              <img :src="it.goods.imagesUrl" data-lazy-img="done" width="60" height="60">
                            </a>
                          </div>
                          <div class="p-msg">
                            <div class="p-name">
                              <a>{{it.goods.goodsName}}</a></div>
                          </div>
                        </div>
                        <div class="goods-number">
                          x{{it.goodsCount}}
                        </div>
                        <div class="clr"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
    name: 'myList',
    data () {
      return {
        orderGoods: [],
        userInfo: {
          img: "",
          name: ""
        },
        search: ""
      }
    },
    mounted(){
      this.getOrder();
      this.getUserInfo();
    },
    methods: {
      goToSearch (url, value) {
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
      getOrder: function() {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/order/getOrdersList',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            orderStatus: 4
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          for (let i = 0; i < response.data.data.length; i++) {
            if (!response.data.data[i].receiveAddress) {
              response.data.data[i].receiveAddress = {};
              response.data.data[i].receiveAddress.receiveName = "123";
            }
          }
          _self.orderGoods = _self.orderGoods.concat(response.data.data);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getUserInfo () {
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

  #container, #container .w {
    background-color: #f5f5f5;
  }

  #content {
    padding-left: 120px;
    padding-top: 20px;
    display: block;
  }

  #content:after {
    content: "";
    display: block;
    clear: both;
  }

  #sub {
    float: left;
    width: 120px;
    position: relative;
    left: -120px;
  }

  #menu {
    width: 100px;
    padding-left: 10px;
  }

  #menu dl {
    padding-bottom: 15px;
  }

  #menu dl dt {
    height: 28px;
    line-height: 28px;
    color: #e4393c;
    font-weight: 700;
    font-size: 12px;
  }

  #main {
    float: left;
    width: 99.9%;
    margin-left: -120px;
    overflow: hidden;
  }

  .mb10 {
    margin-bottom: 10px;
  }

  .mod-comm {
    padding: 10px 20px 20px;
  }

  .mod-main {
    background-color: #fff;
    margin-bottom: 20px;
  }

  div.mod-order .mt {
    padding: 10px 0 0;
  }

  .mod-main .mt {
    display: block;
    padding: 10px 0;
  }

  .mod-main .mt:after {
    content: '';
    display: block;
    clear: both;
  }

  .mod-comm .mt h3 {
    font-size: 12px;
    color: #666;
    font-family: '\5b8b\4f53';
    line-height: 18px;
  }

  .mod-main .mt h3 {
    float: left;
  }

  div#order02 {
    position: relative;
  }

  .mod-comm {
    padding: 10px 20px 20px;
  }

  .mod-main .mt .extra-l {
    float: left;
    list-style: none;
  }

  div.mod-main .mt .extra-l li {
    padding-right: 20px;
    float: left;
    list-style: none;
  }

  .mod-main .mt .extra-l li a.curr {
    padding-bottom: 0;
    color: #e4393c;
    border-bottom: 2px solid #e4393c;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    cursor: pointer;
  }

  .mod-comm .mc {
    line-height: 20px;
  }

  .mod-main .mc {
    overflow: visible;
  }

  .order-tb {
    width: 100%;
  }

  table {
    display: table;
    border-collapse: collapse;
    border-spacing: 2px;
    border-color: grey;
  }

  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  .order-tb thead th {
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: #f5f5f5;
    color: #666;
    font-weight: 400;
    font-size: 12px;
  }

  .order-tb .ordertime-cont {
    position: relative;
    float: left;
    z-index: 10;
    width: 138px;
    cursor: pointer;
  }

  .order-tb .ordertime-cont .time-txt {
    position: relative;
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 20px;
    padding-right: 12px;
    border: 1px solid #f5f5f5;
  }

  .order-tb .order-detail-txt {
    display: inline-block;
    vertical-align: middle;
  }

  .ac {
    text-align: center;
  }

  .order-tb .deal-state-cont {
    position: relative;
    z-index: 10;
    width: 98px;
    cursor: pointer;
  }

  .order-tb .deal-state-cont .state-txt {
    position: relative;
    height: 30px;
    line-height: 30px;
    text-align: left;
    padding-left: 20px;
    padding-right: 12px;
    border: 1px solid #f5f5f5;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  .order-tb .sep-row {
    height: 20px;
  }

  .order-tb .sep-row td {
    border: 0;
  }

  .order-tb .tr-th {
    background: #f5f5f5;
    height: 31px;
    line-height: 31px;
    color: #aaa;
    overflow: hidden;
  }

  td, th {
    display: table-cell;
    vertical-align: inherit;
  }

  .order-tb .tr-th td {
    border-bottom-color: #f5f5f5;
  }

  .order-tb tbody td {
    border: 1px solid #e5e5e5;
    font-size: 12px;
  }

  .order-tb .tr-th .gap {
    width: 14px;
  }

  .order-tb .tr-th span {
    float: left;
    height: 18px;
    line-height: 18px;
    padding: 2px 0 0;
  }

  .order-tb .tr-th .dealtime {
    margin-right: 30px;
    font-family: verdana;
  }

  .order-tb .tr-th span {
    float: left;
    height: 18px;
    line-height: 18px;
    padding: 2px 0 0;
  }

  .order-tb .tr-th .number {
    width: 226px;
    font-family: verdana;
  }

  .order-tb .tr-th span {
    float: left;
    height: 18px;
    line-height: 18px;
    padding: 2px 0 0;
  }

  .order-tb .tr-th a {
    color: #333;
  }

  .order-tb .tr-th .tr-operate {
    width: 608px;
  }

  .order-tb .tr-th .tr-operate {
    float: right;
    position: relative;
    margin-right: 15px;
    height: 23px;
  }

  .order-tb .tr-bd {
    text-align: center;
    vertical-align: top;
  }

  .order-tb .tr-bd td {
    padding: 14px 0;
  }

  .order-tb tbody td {
    border: 1px solid #e5e5e5;
  }

  .order-tb .goods-item {
    width: 340px;
    margin-right: 74px;
    display: block;
    float: left;
  }

  .order-tb .goods-item .p-img {
    float: left;
    width: 60px;
    height: 60px;
    border: 1px solid #efefef;
    margin: 0 14px;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  img {
    border: 0;
    vertical-align: middle;
  }

  .order-tb .goods-item .p-msg {
    width: 240px;
    float: left;
  }

  .order-tb .goods-item .p-name {
    height: 36px;
    line-height: 18px;
    overflow: hidden;
    color: #333;
    text-align: left;
  }

  .order-tb .goods-item .p-name a {
    color: #333;
  }

  .order-tb .goods-number {
    float: left;
    width: 70px;
    text-align: left;
    color: #aaa;
    font-family: verdana;
  }

  .clear, .clr {
    display: block;
    overflow: hidden;
    clear: both;
    height: 0;
    line-height: 0;
    font-size: 0;
  }

  .order-tb .tooltip {
    position: relative;
    width: 100px;
    margin: 0 auto;
    z-index: 2;
    cursor: pointer;
  }

  .order-tb .consignee {
    color: #333;
  }

  .order-tb .consignee .txt {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    max-width: 72px;
    text-overflow: ellipsis;
    vertical-align: middle;
  }

  .order-tb .consignee b {
    display: inline-block;
    width: 14px;
    height: 16px;
    background: url(//misc.360buyimg.com/user/myjd/ordercenter/css/i/order-icons.png) 0 -24px;
    vertical-align: middle;
    margin: 0 0 0 5px;
  }

  .order-tb .amount {
    color: #AAA;
    width: 80px;
    padding-left: 20px;
  }

  .order-tb .amount .ftx-13 {
    display: block;
    margin: 0 8px;
    margin-top: 5px;
    padding-top: 1px;
    border-top: solid 1px #E5E5E5;
    line-height: 19px;
    height: 19px;
    overflow: hidden;
  }

  .ftx-13 {
    color: #aaa;
  }

  .order-tb .status {
    position: relative;
    z-index: 5;
    color: #333;
    line-height: 22px;
  }

  span.ftx-03 {
    color: #aaa;
  }

  .order-tb .operate {
    line-height: 22px;
    width: 80px;
    padding-left: 20px;
  }
</style>
