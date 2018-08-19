<template>
  <div>
    <div class="header">
      <div class="logo-con w clearfix">
        <a @click="jumpTo('/home')" class="logo"></a>
        <div class="logo-title">欢迎注册</div>
        <div class="have-account">已有账号？
          <a @click="jumpTo('/login')">请登录&gt;</a>
        </div>
      </div>
    </div>
    <div class="container w">
      <div class="main">
        <div class="reg-form">
          <div class="item-phone-wrap">
            <div class="form-item form-item-phone">
              <div @click="changeModeMail" :class="{'item-input-wrap': !changeClass.mailBoxB, 'item-input-wrap1': changeClass.mailBoxB}">
                <span :class="{'displayNone': changeClass.mailBoxS}">建议使用常用邮箱</span>
                <input @keydown="mailKeyDown" @focus="mailFocus" @blur="mailBlur" v-model="formData.mail" type="text" id="form-phone" name="phone" class="field" placeholder=" " readonly>
                <i @click="cancelMail" class="i-cancel" :class="{'i-cancel': changeClass.mailBoxX, 'i-cancel1': !changeClass.mailBoxX}"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="reg-form">
          <div class="item-phone-wrap">
            <div class="form-item form-item-phone">
              <div @click="changeModeSet" :class="{'item-input-wrap': !changeClass.setPassWordB, 'item-input-wrap1': changeClass.setPassWordB}">
                <span :class="{'displayNone': changeClass.setPassWordS}">请设置密码</span>
                <input @keydown="setKeyDown" @focus="setFocus" @blur="setBlur" v-model="formData.passWord" type="password" id="form-phone1" name="password" class="field" placeholder=" " readonly>
                <i @click="cancelSet" :class="{'i-cancel': changeClass.setPassWordX, 'i-cancel1': !changeClass.setPassWordX}"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="reg-form">
          <div class="item-phone-wrap">
            <div class="form-item form-item-phone">
              <div @click="changeModeCheck" :class="{'item-input-wrap': !changeClass.checkPassWordB, 'item-input-wrap1': changeClass.checkPassWordB}">
                <span :class="{'displayNone': changeClass.checkPassWordS}">请确认密码</span>
                <input @keydown="checkKeyDown" @focus="checkFocus" @blur="checkBlur" v-model="formData.checkPassWord" type="password" id="form-phone2" name="check" class="field" placeholder=" " readonly>
                <i @click="cancelCheck" class="i-cancel" :class="{'i-cancel': changeClass.checkPassWordX, 'i-cancel1': !changeClass.checkPassWordX}"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="reg-form">
          <div class="item-phone-wrap">
            <div class="form-item form-item-phone">
              <div @click="changeModeYan" :class="{'item-input-wrap-check': !changeClass.yanPassWordB, 'item-input-wrap1-check': changeClass.yanPassWordB}">
                <span :class="{'displayNone': changeClass.yanPassWordS}">请输入验证码</span>
                <input @keydown="yanKeyDown" @focus="yanFocus" @blur="yanBlur" v-model="formData.checkNum" type="text" id="form-phone3" name="check" class="field" placeholder=" " readonly>
              </div>
              <div class="sendMailNum">
                <div v-if="!doCount" @click="sendNum" class="willSend">点击发送验证码</div>
                <div v-if="doCount" class="send">{{count}}秒</div>
              </div>
            </div>
          </div>
        </div>
        <div class="reg-form" style="text-align: right; font-size: 12px; color: #c81623; margin-bottom: 10px">
          {{errMes}}
        </div>
        <div @click="regis()" id="step1-next" class="btn-register">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Qs from 'qs'
  export default {
    name: 'register',
    data () {
      return {
        formData: {
          mail: '',
          passWord: '',
          checkPassWord: '',
          checkNum: ''
        },
        changeClass: {
          mailBoxB: false,
          mailBoxS: false,
          mailBoxX: false,
          setPassWordB: false,
          setPassWordS: false,
          setPassWordX: false,
          checkPassWordB: false,
          checkPassWordS: false,
          checkPassWordX: false,
          yanPassWordB: false,
          yanPassWordS: false,
          yanPassWordX: false,
        },
        count: 121,
        doCount: false,
        errMes: ""
      }
    },
    mounted(){

    },
    methods: {
      checkEmail: function() {
        var myemail = this.formData.mail;
        var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if( myReg.test(myemail) ){
          return true;
        }else{
          this.errMes = "邮箱格式不正确";
          return false;
        }
      },
      jumpTo: function(url) {
        this.$router.push({path: url})
      },
      changeModeMail: function() {
        document.getElementById('form-phone').focus();
      },
      mailFocus: function() {
        document.getElementById('form-phone').removeAttribute('readonly');
        this.changeClass.mailBoxB = true;
        this.changeClass.mailBoxS = true;
        if (this.formData.mail) {
          this.changeClass.mailBoxX = true;
        } else {
          this.changeClass.mailBoxX = false;
        }
      },
      mailBlur: function() {
        if (this.formData.mail) {
          this.changeClass.mailBoxB = false;
          this.changeClass.mailBoxS = true;
          this.changeClass.mailBoxX = true;
        } else {
          this.changeClass.mailBoxB = false;
          this.changeClass.mailBoxS = false;
          this.changeClass.mailBoxX = false;
        }
        this.checkEmail();
        if (!this.checkEmail()) {
          return;
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user/checkEmailIsOnly',
          data: Qs.stringify({
            email: _self.formData.mail
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.errMes = response.data.message;
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      mailKeyDown: function() {
        if (this.formData.mail) {
          this.changeClass.mailBoxX = true;
        } else {
          this.changeClass.mailBoxX = false;
        }
      },
      cancelMail: function() {
        this.formData.mail = '';
      },
      changeModeSet: function() {
        document.getElementById('form-phone1').focus();
      },
      setFocus: function() {
        document.getElementById('form-phone1').removeAttribute('readonly');
        this.changeClass.setPassWordB = true;
        this.changeClass.setPassWordS = true;
        if (this.formData.passWord) {
          this.changeClass.setPassWordX = true;
        } else {
          this.changeClass.setPassWordX = false;
        }
      },
      setBlur: function() {
        if (this.formData.passWord) {
          this.changeClass.setPassWordB = false;
          this.changeClass.setPassWordS = true;
          this.changeClass.setPassWordX = true;
        } else {
          this.changeClass.setPassWordB = false;
          this.changeClass.setPassWordS = false;
          this.changeClass.setPassWordX = false;
        }
      },
      setKeyDown: function() {
        if (this.formData.passWord) {
          this.changeClass.setPassWordX = true;
        } else {
          this.changeClass.setPassWordX = false;
        }
      },
      cancelSet: function() {
        this.formData.passWord = '';
      },
      changeModeCheck: function() {
        document.getElementById('form-phone2').focus();
      },
      checkFocus: function() {
        document.getElementById('form-phone2').removeAttribute('readonly');
        this.changeClass.checkPassWordB = true;
        this.changeClass.checkPassWordS = true;
        if (this.formData.checkPassWord) {
          this.changeClass.checkPassWordX = true;
        } else {
          this.changeClass.checkPassWordX = false;
        }
      },
      checkBlur: function() {
        if (this.formData.checkPassWord) {
          this.changeClass.checkPassWordB = false;
          this.changeClass.checkPassWordS = true;
          this.changeClass.checkPassWordX = true;
        } else {
          this.changeClass.checkPassWordB = false;
          this.changeClass.checkPassWordS = false;
          this.changeClass.checkPassWordX = false;
        }
      },
      checkKeyDown: function() {
        if (this.formData.checkPassWord) {
          this.changeClass.checkPassWordX = true;
        } else {
          this.changeClass.checkPassWordX = false;
        }
      },
      cancelCheck: function() {
        this.formData.checkPassWord = '';
      },
      changeModeYan: function() {
        document.getElementById('form-phone3').focus();
      },
      yanFocus: function() {
        document.getElementById('form-phone3').removeAttribute('readonly');
        this.changeClass.yanPassWordB = true;
        this.changeClass.yanPassWordS = true;
        if (this.formData.checkNum) {
          this.changeClass.yanPassWordX = true;
        } else {
          this.changeClass.yanPassWordX = false;
        }
      },
      yanBlur: function() {
        if (this.formData.checkNum) {
          this.changeClass.yanPassWordB = false;
          this.changeClass.yanPassWordS = true;
          this.changeClass.yanPassWordX = true;
        } else {
          this.changeClass.yanPassWordB = false;
          this.changeClass.yanPassWordS = false;
          this.changeClass.yanPassWordX = false;
        }
      },
      yanKeyDown: function() {
        if (this.formData.checkNum) {
          this.changeClass.yanPassWordX = true;
        } else {
          this.changeClass.yanPassWordX = false;
        }
      },
      sendNum: function() {
        if (!this.checkEmail()) {
          this.errMes = "请输入正确的邮箱";
          return
        } else if (!this.formData.passWord) {
          this.errMes = "请输入密码";
          return
        } else if (!this.formData.checkPassWord) {
          this.errMes = "请确认密码";
          return
        } else if (this.formData.passWord !== this.formData.checkPassWord) {
          this.errMes = "两次输入的密码不一致";
          return
        }
        this.count = 121;
        this.doCount = true;
        this.cutDown();
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user/sendEmailCode',
          data: Qs.stringify({
            email: _self.formData.mail
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      cutDown: function() {
        let _self = this;
        this.count--;
        if (this.count !== 0) {
          setTimeout(function() {
            _self.cutDown()
          }, 1000)
        } else {
          this.doCount = false;
          return false;
        }
      },
      regis: function() {
        if (!this.checkEmail()) {
          this.errMes = "请输入正确的邮箱";
          return
        } else if (!this.formData.passWord) {
          this.errMes = "请输入密码";
          return
        } else if (!this.formData.checkPassWord) {
          this.errMes = "请确认密码";
          return
        } else if (this.formData.passWord !== this.formData.checkPassWord) {
          this.errMes = "两次输入的密码不一致";
          return
        } else if (!this.formData.checkNum) {
          this.errMes = "请输入验证码";
          return
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user/register',
          data: Qs.stringify({
            email: _self.formData.mail,
            password: _self.formData.passWord,
            emailCode: _self.formData.checkNum
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.errMes = response.data.message;
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 110px;
    background: url("../assets/headbg.jpg") repeat-x left bottom;
  }

  .w {
    width: 1210px;
    margin: 0 auto;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .header .logo {
    width: 160px;
    height: 50px;
    float: left;
    margin-top: 24px;
    background: url(../assets/SC.png) no-repeat;
    background-position: center;
    background-size: 100%;
    color: #666;
    text-decoration: none;
    cursor: pointer;
  }

  .header .logo-title {
    float: left;
    height: 34px;
    line-height: 34px;
    font-size: 24px;
    color: #333;
    margin-top: 34px;
  }

  .header .have-account {
    font-size: 16px;
    float: right;
    margin-top: 55px;
    color: #999;
  }

  .header .have-account a {
    color: #e22;
    text-decoration: none;
    cursor: pointer;
  }

  .header .have-account a:hover {
    text-decoration: underline;
    color: #c81623;
  }

  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .main {
    margin: 50px auto 186px;
    width: 400px;
  }

  .item-phone-wrap {
    height: 86px;
    position: relative;
    z-index: 2;
  }

  .form-item-phone {
    border: none;
  }

  .form-item {
    position: relative;
    width: 398px;
    height: 52px;
    z-index: 0;
  }

  .form-item .item-input-wrap {
    float: left;
    width: 100%;
    height: 50px;
    border: 1px solid rgb(221, 221, 221);
  }

  .form-item .item-input-wrap:hover {
    float: left;
    width: 100%;
    height: 50px;
    border: 1px solid rgb(153, 153, 153);
  }

  .form-item .item-input-wrap1 {
    float: left;
    width: 100%;
    height: 50px;
    border: 1px solid rgb(102, 102, 102);
  }

  .form-item span {
    margin-top: 2px!important;
    position: absolute;
    z-index: 2;
    line-height: 46px;
    margin-left: 20px;
    margin-top: 1px;
    font-size: 14px;
    font-family: Arial;
    color: rgb(204, 204, 204);
    display: inline;
  }

  .displayNone {
    display: none!important;
  }

  .form-item .field {
    border: 0 none;
    font-size: 14px;
    width: 190px;
    height: 19px;
    padding-bottom: 11px;
    padding-left: 20px;
    padding-top: 16px;
    outline: 0;
  }

  .form-item .i-cancel {
    position: absolute;
    display: block;
    width: 14px;
    height: 14px;
    top: 50%;
    margin-top: -7px;
    right: 20px;
    cursor: pointer;
    background: url("../assets/pwd-icons-new.png") -26px -144px no-repeat;
  }

  .form-item .i-cancel1 {
    position: absolute;
    display: none;
    width: 14px;
    height: 14px;
    top: 50%;
    margin-top: -7px;
    right: 20px;
    cursor: pointer;
    background: url("../assets/pwd-icons-new.png") -26px -144px no-repeat;
  }

  .form-item .item-input-wrap-check {
    float: left;
    width: 248px;
    height: 50px;
    border: 1px solid rgb(221, 221, 221);
  }

  .form-item .item-input-wrap-check:hover {
    float: left;
    width: 248px;
    height: 50px;
    border: 1px solid rgb(153, 153, 153);
  }

  .form-item .item-input-wrap1-check {
    float: left;
    width: 248px;
    height: 50px;
    border: 1px solid rgb(102, 102, 102);
  }

  .sendMailNum {
    float: left;
    width: 146px;
    height: 50px;
    border: 1px solid rgb(102, 102, 102);
  }

  .willSend {
    width: 146px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    font-size: 14px;
  }

  .send {
    width: 146px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    font-size: 14px;
  }

  .btn-register {
    width: 100%;
    height: 54px;
    line-height: 54px;
    text-align: center;
    color: #fff;
    background: #e2231a;
    border: 0;
    font-size: 16px;
    font-family: "Microsoft YaHei","Hiragino Sans GB";
    cursor: pointer;
  }
</style>
