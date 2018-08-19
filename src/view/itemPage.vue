<template>
  <div class="wrapper">
    <title-search :goodsArr="goodsItem" :tradeArr="classifyItems"></title-search>
    <div id="bd_auto">
      <div class="con storey_one">
        <div class="col storey_one_center">
          <div class="book_online ">
            <div class="roll_aa ">
              <div class="over">
                <div class="img-area">
                  <ul class="product_ul ">
                    <li v-for="value in tPic" class="line1">
                      <a @click="newJumpTo('/item', value.id)" class="img" style="cursor: pointer;">
                        <img :src="value.imagesUrl">
                      </a>
                      <p class="name">
                        {{value.goodsName}}
                      </p>
                      <p class="price">
                        <span class="rob">
                          <span class="sign">¥</span>
                          <span class="num">{{value.defaultPrice.toFixed(2)}}</span>
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="!ifSearch" class="fenYeIt">
              <ul class="pagination" >
                <li v-show="current != 1" @click="current-- && goto(current--)" ><a>上一页</a></li>
                <li v-for="index in pages" @click="goto(index)" :class="{'active':current == index}" :key="index">
                  <a>{{index}}</a>
                </li>
                <li v-show="allpage != current && allpage != 0 " @click="current++ && goto(current++)"><a>下一页</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  import titleSearch from '../components/titleSearch'
  export default {
    name: 'itemPage',
    components:{titleSearch},
    data(){
      return {
        firstTrade: [],
        goodsItem : [],
        classifyItems: [],
        tPic: [],
        goodsId: '',
        current: 1,
        showItem: 15,
        allMsg: 65,
        ifSearch: ""
      }
    },
    mounted() {
      // this.goodsId = this.$route.query.id;
      // console.log(this.goodsId);
      // this.tradeGet();
      // this.getSecond();
      this.getShopCar();
      this.tradeGet1();
      if (sessionStorage.getItem("search")) {
        this.ifSearch = sessionStorage.getItem("search");
        this.searchItem();
      } else {
        this.goodsId = this.$route.query.id;
        console.log(this.goodsId);
        // this.tradeGet();
        this.getSecond();
      }
    },
    computed:{
      allpage: function() {
        return Math.ceil(this.allMsg / this.showItem);
      },
      pages:function(){
        var pag = [];
        if( this.current < this.showItem ){ //如果当前的激活的项 小于要显示的条数
          //总页数和要显示的条数那个大就显示多少条
          var i = Math.min(this.showItem,this.allpage);
          while(i){
            pag.unshift(i--);
          }
        }else{ //当前页数大于显示页数了
          var middle = this.current - Math.floor(this.showItem / 2 ),//从哪里开始
            i = this.showItem;
          if( middle >  (this.allpage - this.showItem)  ){
            middle = (this.allpage - this.showItem) + 1
          }
          while(i--){
            pag.push( middle++ );
          }
        }
        return pag
      }
    },
    methods:{
      searchItem: function() {
        let _self = this;
        let word = sessionStorage.getItem("search");
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/keyword/search',
          data: Qs.stringify({
            keyword: word
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.tPic = [];
          _self.tPic = _self.tPic.concat(response.data.data);
          console.log(response.data);
          console.log(_self.tPic);
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
        sessionStorage.removeItem('search');
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
      tradeGet1: function() {
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
      goto: function (index){
        if(index === this.current) return;
        this.current = index;
        console.log(this.current);
        this.getSecond();
      },
      newJumpTo: function (url ,value) {
        this.$router.push({
          path: url,
          query: {
            id: value
          }
        })
      },
      tradeGet: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/indiv-web/category/getCategoryFirstAndSecond'
        }).then(function(response){
          if (response.data.data) {
            _self.firstTrade = _self.firstTrade.concat(response.data.data.slice(_self.goodsId - 1, _self.goodsId));
          }
          console.log(response.data);
        }).catch(function (response){
          console.log(response);
        });
      },
      getSecond: function() {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/goods/getGoodsByTradeIdAndPage',
          params: {
            tradeId: _self.goodsId,
            pageId: _self.current,
            pageSize: _self.showItem
          }
        }).then(function(response){
          _self.tPic = [];
          _self.allMsg = response.data.total;
          _self.tPic = _self.tPic.concat(response.data.data);
          console.log(_self.tPic);
          console.log(response.data);
        }).catch(function (response){
          console.log(response);
        });
      },
    }
  }
</script>

<style scoped>
  #hd {
    font: 12px 'Hiragino Sans GB',"simsun","Arial";
    color: #646464;
    min-width: 1200px;
    background-color: #fff;
  }

  #hd .sub {
    background: #f5f5f5;
    float: none;
    border-top: 3px solid #38f;
  }

  #bd_auto {
    width: 100%;
    font-family: Arial;
    margin-top: 15px;
    background-color: #fff;
  }

  .top_ad_banner {
    margin-bottom: 10px;
  }

  .top_ad_banner {
    width: 1200px;
    margin: 0 auto;
  }

  .con {
    clear: both;
    zoom: 1;
  }

  div {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  .top_ad_banner .book_1ad .pic, .top_ad_banner .book_1ad .pic img {
    display: block;
    width: 1200px;
    height: 65px;
  }

  .storey_one {
    width: 1200px;
    margin: 0 auto;
  }

  .storey_one .storey_one_left {
    margin-right: 10px;
  }

  .storey_one .storey_one_left, .storey_one .storey_one_center, .storey_one .storey_one_right {
    float: left;
  }

  .storey_one .storey_one_left {
    z-index: 6;
    position: relative;
  }

  .sidemenu {
    width: 190px;
    height: 901px;
    overflow: hidden;
    border-bottom: 1px solid #666;
  }

  .sidemenu .flq_head {
    height: 35px;
    width: 190px;
    text-align: center;
    font-size: 18px;
    background: #38f;
    border-radius: 4px 4px 0 0;
    line-height: 34px;
    color: #fff;
    font-family: "Microsoft Yahei";
  }

  .con:after {
    content: '.';
    height: 0;
    display: block;
    clear: both;
    visibility: hidden;
  }

  .sidemenu .flq_body {
    width: 190px;
    border-top: 2px dotted #487a6f;
    border-bottom: 1px solid #487a6f;
    position: relative;
    height: 878px;
  }

  .top_ad_banner {
    margin-bottom: 10px;
  }

  .sidemenu .flq_body .level_one {
    width: 188px;
    border: 1px solid #487a6f;
    border-width: 0 1px;
    height: 878px;
  }

  .sidemenu .flq_body .level_one .primary_dl {
    width: 170px;
    margin-left: 9px;
    position: relative;
    overflow: hidden;
    padding-top: 3px;
    padding-bottom: 2px;
  }

  .firstTr {
    font-weight: bolder;
    color: #487a6f;
    font-size: 16px;
    padding-bottom: 20px;
    margin-top: 20px;
    border-bottom: 1px dotted #849555;
    cursor: pointer;
  }

  .secondTr {
    font-size: 16px;
    color: #666;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .secondTr > span {
    display: block;
    cursor: pointer;
    margin-top: 25px;
  }

  .secondTr > span :hover {
    color: #849555;
  }

  .storey_one .storey_one_left {
    margin-right: 10px;
  }

  .storey_one .storey_one_center {
    width: 1190px;
  }

  .storey_one_center {
    height: 900px;
  }

  .book_online {
    width: 1190px;
    overflow: hidden;
    position: relative;
  }

  .book_online .book_online_title {
    background: url(http://book.dangdang.com/Standard/Book/Extend/hosts/images/home/new_book.png) no-repeat;
    background-position: center;
    height: 43px;
    width: 1190px;
    font-size: 0;
    line-height: 0;
    text-indent: -9999px;
  }

  .book_online .over {
    width: 990px;
    overflow: hidden;
    position: relative;
    margin: auto;
  }

  .img-area {
    width: 990px;
    overflow: hidden;
  }

  .book_online .product_ul {
    width: 990px;
    padding-top: 25px;
  }

  .book_online .product_ul li {
    width: 150px;
    margin-right: 47px;
    height: 250px;
    position: relative;
    overflow: visible;
    float: left;
  }

  .book_online .product_ul a.img, .book_online .product_ul li img {
    width: 150px;
    display: block;
    height: 150px;
  }

  .book_online .product_ul a {
    text-decoration: none;
  }

  .book_online .product_ul li .name {
    padding: 7px 20px 0;
    height: 18px;
    line-height: 18px;
    overflow: hidden;
    text-align: center;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: #000;
    font-size: 12px;
  }

  .book_online .product_ul li .name a, .book_online .product_ul li .name a:hover {
    color: #000;
    font-size: 12px;
    display: inline-block;
  }

  .book_online .product_ul li .price {
    padding-left: 20px;
    padding-right: 20px;
    line-height: 16px;
    overflow: hidden;
    font-family: "Arial";
    font-size: 14px;
    position: relative;
    height: 36px;
    text-align: center;
    margin-top: 10px;
  }

  .book_online .product_ul li .price .rob {
    color: #c30;
    overflow: hidden;
    font-weight: bold;
    margin-right: 12px;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    border: 0;
  }

  .product_ul:after {
    content: '';
    display: block;
    clear: both;
  }

  .pagination {
    position: relative;
    display: inline-block;
    margin: auto;
  }

  .pagination li {
    display: inline-block;
    margin: 0 5px;
  }

  .pagination li a {
    padding: .5rem 1rem;
    display: inline-block;
    border: 1px solid #ddd;
    background: #fff;
    color: #38f;
    cursor: pointer;
  }

  .pagination li a:hover {
    background: #eee;
  }

  .pagination li.active a {
    background: #38f;
    color: #fff;
    cursor: pointer;
  }

  .fenYeIt {
    margin-top: 30px;
    text-align: center;
  }

</style>
