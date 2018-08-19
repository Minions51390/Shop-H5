<template>
  <div>
    <div class="w">
      <div id="logo">
        <a @click="jumpTo('/home')">
          <img src="../assets/SC.png" alt="京东" width="170" height="60">
        </a>
        <b></b>
      </div>
    </div>
    <div id="content">
      <div class="login-wrap">
        <div class="w">
          <div class="login-form">
            <div class="tips-wrapper">
              <div class="tips-inner">
                <div class="cont-wrapper">
                  <i class="icon-tips"></i>
                  <p>本商城不会以任何理由要求您转账汇款，谨防诈骗。</p>
                </div>
              </div>
            </div>
            <div class="login-tab login-tab-r">
              <a class="checked">账户登录</a>
            </div>
            <div class="login-box">
              <div class="mt tab-h"></div>
              <div class="msg-wrap">
                <div class="msg-error hide"><b>错误信息</b></div>
              </div>
              <div class="mc">
                <div class="form">
                  <div class="item item-fore1 item-focus">
                    <label for="loginname" class="login-label name-label" :class="{nameLable: inputC1.deep}"></label>
                    <input @keydown="keyDown()" v-model="formData.userName" @focus="userFocus()" @blur="userBlur()" id="loginname" type="text" class="itxt" name="loginname" tabindex="1" autocomplete="new-password" placeholder="邮箱/用户名/已验证手机">
                    <span @click="clearInput1()" :class="{'clear-btn': inputC1.clearX, 'clear-btn-none': !inputC1.clearX}"></span>
                  </div>
                  <div id="entry" class="item item-fore2 item-focus">
                    <label class="login-label pwd-label" :class="{pwdLable: inputC2.deep}" for="nloginpwd"></label>
                    <input @keydown="keyDown()" v-model="formData.passWord" @focus="pswFocus()" @blur="pswBlur()" type="password" id="nloginpwd" name="nloginpwd" class="itxt itxt-error" tabindex="2" autocomplete="new-password" placeholder="密码">
                    <span @click="clearInput2()" :class="{'clear-btn': inputC2.clearX, 'clear-btn-none': !inputC2.clearX}"></span>
                  </div>
                  <div class="item item-fore1 item-focus" style="width: 200px; position: relative;">
                    <input style="padding:10px 0px 10px 10px; width: 190px;" type="text" class="itxt" v-model="formData.imgCode" placeholder="图片验证码">
                    <img @click="reGetCaptcha()" :src="formData.img" class="imgCode">
                  </div>
                  <div class="item item-fore4">
                    <div class="safe">
										  <span></span>
                      <span class="forget-pw-safe">
											  <a>{{errMes}}</a>
										  </span>
                    </div>
                  </div>
                  <div class="item item-fore5">
                    <div class="login-btn">
                      <a @click="userLogin('/home')" class="btn-img btn-entry" id="loginsubmit" tabindex="6">登&nbsp;&nbsp;&nbsp;&nbsp;录</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="coagent">
              <ul>
                <li class="extra-r">
                  <div>
                    <div class="regist-link">
                      <a @click="jumpTo('/register')"><b></b>立即注册</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="login-banner">
          <div class="w">
            <div id="banner-bg" class="i-inner"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'login',
    data () {
      return {
        inputC1: {
          deep: false,
          clearX: false
        },
        inputC2: {
          deep: false,
          clearX: false
        },
        formData: {
          userName: '',
          passWord: '',
          imgCode: '',
          img: ''
        },
        errMes: ""
      }
    },
    mounted(){
      this.getCaptcha();
      this.clearBox();
    },
    methods: {
      setCookie: function(name, value, time) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + time);
        docoumet.cookie = name + '=' + value + ';expires=' + oDate;
      },
      getCookie: function() {
        var arr = document.cookie.split('; ');
        for(var i = 0, len = arr.length; i < len; i++) {
          var temp = arr[i].split('=');
          if(temp[0] == key) {
            return temp[1];
          }
        }
      },
      removeCookie: function() {
        this.setCookie(key, '', -1);
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      userFocus: function() {
        this.inputC1.deep = true;
        this.clearBox();
      },
      userBlur: function() {
        this.inputC1.deep = false;
        this.clearBox();
      },
      pswFocus: function() {
        this.inputC2.deep = true;
        this.clearBox();
      },
      pswBlur: function() {
        this.inputC2.deep = false;
        this.clearBox();
      },
      keyDown: function() {
        this.clearBox();
      },
      clearBox: function() {
        if (this.formData.userName) {
          this.inputC1.clearX = true;
        } else {
          this.inputC1.clearX = false;
        }
        if (this.formData.passWord) {
          this.inputC2.clearX = true;
        } else {
          this.inputC2.clearX = false;
        }
      },
      clearInput1: function() {
        this.formData.userName = '';
        this.clearBox();
      },
      clearInput2: function() {
        this.formData.passWord = '';
        this.clearBox();
      },
      reGetCaptcha: function() {
        this.getCaptcha();
      },
      getCaptcha: function() {
        let _self = this;
        this.$http({
          method: 'get',
          responseType: 'arraybuffer',
          url: 'http://127.0.0.1:8080/dip-web/captcha/captcha.form'
        }).then(function(response){
          console.log(response.data);
          _self.formData.img =  'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        }).catch(function (response){
          console.log(response);
        });
      },
      userLogin: function(url) {
        if (!this.formData.userName) {
          this.errMes = "请输入用户名";
          return
        } else if (!this.formData.passWord) {
          this.errMes = "请输入密码";
          return
        } else if (!this.formData.imgCode) {
          this.errMes = "请输入图片验证码";
          return
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user/login',
          data: Qs.stringify({
            usernameOrEmail: this.formData.userName,
            password: this.formData.passWord,
            code: this.formData.imgCode
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          if (response.data.data) {
            sessionStorage.setItem("userId", response.data.data);
            _self.errMes = response.data.message;
            _self.jumpTo(url);
          }else {
            _self.errMes = response.data.message;
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .w {
    width: 990px;
    margin: 0 auto;
  }

  #logo {
    position: relative;
    width: 300px;
    margin: 10px 0;
    height: 60px;
    float: left;
    color: #666;
  }

  #logo > a {
    cursor: pointer;
  }

  a {
    color: #666;
    text-decoration: none;
  }

  a img {
    border: 0;
    vertical-align: middle;
  }

  #logo b {
    display: block;
    width: 110px;
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    background: url("../assets/huanying.png") no-repeat;
  }

  #content {
    clear: both;
  }

  #content .login-wrap {
    position: relative;
    height: 475px;
    margin-bottom: 20px;
    z-index: 5;
  }

  .login-wrap .login-banner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 475px;
    background-color: #eae3ff;
  }

  .login-wrap .i-inner {
    position: relative;
    z-index: 3;
    height: 475px;
    background: url("../assets/loginBg.jpg") 0px 0px no-repeat;
    background-color: #eae3ff;
  }

  .login-wrap .login-form {
    float: right;
    top: 10px;
  }

  .login-form {
    position: relative;
    z-index: 4;
    background: #fff;
    overflow: visible;
    width: 346px;
  }

  #content .tips-wrapper {
    background: #fff8f0;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
  }

  #content .tips-wrapper .cont-wrapper {
    display: inline-block;
    width: 90%;
  }

  #content .tips-wrapper .icon-tips {
    background: url("../assets/icon-tips.png");
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 5px;
  }

  #content .tips-wrapper .tips-inner p {
    vertical-align: middle;
    color: #999;
    font-size: 12px;
    display: inline-block;
  }

  .login-form .login-tab {
    height: 54px;
    width: 100%;
    font-size: 18px;
    font-family: "microsoft yahei";
    text-align: center;
    border-bottom: 1px solid #f4f4f4;
    position: absolute;
    background: #fff;
    display: block;
  }

  .login-form .login-tab a {
    width: 99%;
    height: 18px;
    position: absolute;
    left: 0;
    top: 18px;
    border-right: 1px solid #f4f4f4;
    text-decoration: none;
    font-weight: 700;
    color: #e4393c;
  }

  .login-form .login-box {
    width: 306px;
    padding: 20px;
    display: block;
    visibility: visible;
  }

  .login-form .login-box .tab-h {
    height: 35px;
  }

  .login-form .login-box .mt {
    display: block;
    width: 306px;
    overflow: visible;
    height: 27px;
    cursor: default;
    zoom: 1;
  }

  .login-form .login-box .mt:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .login-form .msg-wrap {
    min-height: 23px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: auto!important;
  }

  .login-form .msg-error {
    position: relative;
    background: #ffebeb;
    color: #e4393c;
    border: 1px solid #faccc6;
    padding: 3px 10px 3px 40px;
    line-height: 15px;
    height: auto;
  }

  .hide {
    display: none;
  }

  .login-form .msg-error b {
    position: absolute;
    top: 50%;
    left: 10px;
    display: block;
    margin-top: -8px;
    width: 16px;
    height: 16px;
    overflow: hidden;
    background: url("../assets/pwd-icons-new.png") -104px -49px no-repeat;
  }

  .login-form .login-box .mc {
    overflow: visible;
  }

  .form .item-fore1 {
    z-index: 6;
  }

  .form .item-fore1, .form .item-fore2 {
    border: 1px solid #bdbdbd;
    height: 38px;
    width: 304px;
  }

  .form .item {
    position: relative;
    margin-bottom: 20px;
  }

  .form .item .name-label {
    background-position: 0 0;
  }

  .form .item .login-label {
    position: absolute;
    z-index: 3;
    top: 0;
    left: 0;
    width: 38px;
    height: 38px;
    border-right: 1px solid #bdbdbd;
    background: url("../assets/pwd-icons-new.png") no-repeat;
  }

  .form label {
    float: none;
  }

  .form .itxt {
    line-height: 18px;
    height: 18px;
    border: 0;
    padding: 10px 0 10px 50px;
    width: 254px;
    float: none;
    overflow: hidden;
    font-size: 14px;
    font-family: '\5b8b\4f53';
  }

  .form .item-fore1 .clear-btn, .form .item-fore2 .clear-btn {
    position: absolute;
    z-index: 20;
    right: 6px;
    top: 12px;
    width: 14px;
    height: 14px;
    background: url("../assets/pwd-icons-new.png") -25px -143px no-repeat;
    cursor: pointer;
    display: inline-block;
  }

  .form .item-fore1 .clear-btn-none, .form .item-fore2 .clear-btn-none {
    position: absolute;
    z-index: 20;
    right: 6px;
    top: 12px;
    width: 14px;
    height: 14px;
    background: url("../assets/pwd-icons-new.png") -25px -143px no-repeat;
    cursor: pointer;
    display: none;
  }

  .form .item-fore2 {
    height: 38px;
    visibility: hidden;
  }

  .form .item-fore1, .form .item-fore2 {
    border: 1px solid #bdbdbd;
    width: 304px;
  }

  .form .item .pwd-label {
    background-position: -48px 0;
  }

  #entry {
    visibility: visible;
  }

  .login-form .login-box .safe {
    position: relative;
    color: #666;
  }

  .login-form .login-box .safe span {
    margin-right: 15px;
  }

  .login-form .login-box .safe .forget-pw-safe {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
  }

  .login-form .login-box .safe .forget-pw-safe > a {
    font: 12px/150% Arial,Verdana,"\5b8b\4f53";
    color: #E4393C;
  }

  .form .item-fore5 {
    margin-bottom: 10px;
  }

  .login-form .login-box .login-btn {
    border: 1px solid #cb2a2d;
    margin: 0 auto;
    height: 32px;
    width: 99%;
    position: relative;
  }

  .login-form .login-box .login-btn .btn-img {
    border: 1px solid #e85356;
    display: block;
    width: 302px;
    background: #e4393c;
    height: 31px;
    line-height: 31px;
    color: #fff;
    font-size: 20px;
    font-family: 'Microsoft YaHei';
  }

  .btn-img, .button {
    margin: 0;
    padding: 0;
    text-align: center;
    cursor: pointer;
  }

  .coagent {
    padding-left: 20px;
    padding-right: 20px;
    line-height: 50px;
    border-top: 1px solid #f4f4f4;
    height: auto;
    background-color: #fcfcfc;
  }

  .coagent ul {
    display: block;
  }

  .coagent li.extra-r {
    float: right;
    list-style-type: none;
  }

  .coagent ul:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .coagent .regist-link {
    color: #b61d1d;
    font-size: 14px;
  }

  .coagent .regist-link a {
    color: #b61d1d;
    cursor: pointer;
  }

  .coagent .regist-link a:hover {
    text-decoration: underline;
  }

  .coagent .regist-link b {
    display: inline-block;
    width: 16px;
    height: 16px;
    overflow: hidden;
    background: url("../assets/pwd-icons-new.png") -104px -75px no-repeat;
    vertical-align: middle;
    margin-right: 5px;
  }

  .form .item-focus {
    border: 1px solid #bbb;
  }

  .form .item-focus .nameLable {
    background-position: 0 -48px;
    border-color: #bbb;
  }

  .form .item-focus .pwdLable {
    background-position: -48px -48px;
    border-color: #bbb;
  }

  .imgCode {
    position: absolute;
    top: 4px;
    right: -104px;
  }
</style>
