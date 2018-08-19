<template>
  <div class="wrapper">
    <div class="w w1 header clearfix">
      <div id="logo-2014">
        <a @click="jumpTo('/home')" class="logo"></a>
      </div>
      <div class="cart-search">
        <div class="form">
          <input id="key" type="text" class="itxt" autocomplete="off" v-model="search">
          <input type="button" class="button" value="搜索" @click="goToSearch('/itemPage')">
        </div>
      </div>
      <p @click="jumpTo('/myList')" class="listDan">我的订单</p>
      <p class="name">{{userInfo.name}}</p>
      <div class="user">
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
                <dt id="_MYJD_setting">设置</dt>
                <dd class="fore1_1 curr" id="_MYJD_info">
                  <a>个人信息</a>
                </dd>
              </dl>
            </div>
          </div>
          <div id="main">
            <div class="mod-main">
              <div class="mt">
                <ul class="extra-l">
                  <li class="fore-1">
                    <a @click="checkItem('info')" :class="{'curr': chooseItem.info}">基本信息</a>
                  </li>
                  <li class="fore-2">
                    <a @click="checkItem('pic')" :class="{'curr': chooseItem.pic}">头像照片</a>
                  </li>
                  <li class="fore-3">
                    <a @click="checkItem('pass')" :class="{'curr': chooseItem.pass}">修改密码</a>
                  </li>
                  <li class="fore-4">
                    <a @click="checkItem('adr')" :class="{'curr': chooseItem.adr}">收货地址</a>
                  </li>
                </ul>
              </div>
              <div v-if="chooseItem.info" class="mc">
                <div class="user-set userset-lcol">
                  <div class="form1">
                    <div class="item">
                      <span class="label">邮箱：</span>
                      <div class="fl">
                        <div><strong>{{userInfo.email}}</strong></div>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">用户名：</span>
                      <div class="fl">
                        <input @blur="checkName()" type="text" :class="{'itxt-succ': setUser.canUse}" class="itxt" maxlength="20" id="nickName" v-model="setUser.userName">
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">昵称：</span>
                      <div class="fl">
                        <input type="text" class="itxt" maxlength="20" id="nickName" v-model="setUser.nickName">
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">性别：</span>
                      <div class="fl">
                        <input type="radio" name="sex" class="jdradio" v-model="setUser.sex" value="0"><label class="mr10">男</label>
                        <input type="radio" name="sex" class="jdradio" v-model="setUser.sex" value="1"><label class="mr10">女</label>
                        <input type="radio" name="sex" class="jdradio" v-model="setUser.sex" value="2"><label class="mr10">保密</label>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">生日：</span>
                      <div class="fl birthday-info">
                        <select name="" class="selt selt1" id="birthdayYear" v-model="birth.yearVal">
                          <option v-for="value in year" :value="value">{{value}}</option>
                        </select>
                        <label class="ml5 mr5">年</label>
                        <select name="" class="selt selt1" id="birthdayMonth" v-model="birth.mouthVal">
                          <option v-for="value in mouth" :value="value">{{value}}</option>
                        </select>
                        <label class="ml5 mr5">月</label>
                        <select @click="getDay" name="" class="selt selt1" id="birthdayDay" v-model="birth.dayVal">
                          <option v-for="value in day" :value="value">{{value}}</option>
                        </select>
                        <label class="ml5 mr5">日</label>
                      </div>
                    </div>
                    <div class="item">
                      <span class="label">手机号：</span>
                      <div class="fl">
                        <input type="text" class="itxt" maxlength="20" id="nickName" v-model="setUser.phone">
                      </div>
                    </div>
                    <div class="item">
                      <span class="errmsg">{{setUser.errMsg}}</span>
                    </div>
                    <div class="item">
                      <span class="label">&nbsp;</span>
                      <div class="fl">
                        <a @click="submitUser()" class="btn-5">提交</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="chooseItem.pic" class="mc">
                <div class="user-set userset-lcol">
                  <div class="form1">
                    <div class="item upup">
                      <uploader url="http://127.0.0.1:8080/dip-web/user/updateUserImage"></uploader>
                      <div class="btn" @click="upload">
                        上传
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="chooseItem.pass" class="mc">
                <div v-if="checkSelf.first" class="form2">
                  <div class="item">
                    <span class="label">已验证邮箱：</span>
                    <div class="fl">
                      <strong id="mobileSpan" class="ftx-un">{{userInfo.email}}</strong>
                      <div class="clr"></div>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">请填写邮箱校验码：</span>
                    <div class="fl">
                      <input class="itxt" name="code" tabindex="1" id="code" type="text" v-model="setPass.mailCode">
                      <a v-if="!doCount" @click="sendNum" id="sendMobileCode" class="btn-10 ml10">获取邮箱校验码</a>
                      <a v-if="doCount" id="sendMobileCode" class="btn-10 ml10">在{{count}}秒后重试</a>
                      <div class="clr"></div>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">验证码：</span>
                    <div class="fl">
                      <input class="itxt" tabindex="2" name="authCode" id="authCode" type="text" v-model="setPass.imgCode">
                      <label><img @click="getCaptcha()" style="cursor: pointer; width: 100px; height: 26px; vertical-align: middle;" id="JD_Verification1" class="ml10" :src="setPass.img" alt="验证码">看不清？<a @click="getCaptcha()" style="cursor: pointer" class="ftx-05">换一张</a></label>
                      <div class="clr"></div>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">&nbsp;</span>
                    <div class="fl">
                      <p>{{errMsgF}}</p>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">&nbsp;</span>
                    <div class="fl">
                      <a @click="nextStep('second')" id="submitCode" class="btn-7">提交</a>
                    </div>
                    <div class="clr"></div>
                  </div>
                </div>
                <div v-if="checkSelf.second" class="form2">
                  <div class="item">
                    <span class="label">新的登陆密码：</span>
                    <div class="fl">
                      <input class="itxt" tabindex="2" name="authCode" id="authCode1" type="password" v-model="setPass.password">
                      <div class="clr"></div>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">请再输入一次密码：</span>
                    <div class="fl">
                      <input class="itxt" tabindex="2" name="authCode" id="authCode2" type="password" v-model="setPass.checkPass">
                      <div class="clr"></div>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">验证码：</span>
                    <div class="fl">
                      <input class="itxt" tabindex="2" name="authCode" id="authCode3" type="text" v-model="setPass.imgCode2">
                      <label><img @click="getCaptcha()" style="cursor: pointer; width: 100px; height: 26px; vertical-align: middle;" id="JD_Verification1" class="ml10" :src="setPass.img" alt="验证码">看不清？<a @click="getCaptcha()" style="cursor: pointer" class="ftx-05">换一张</a></label>
                      <div class="clr"></div>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">&nbsp;</span>
                    <div class="fl">
                      <p>{{errMsgS}}</p>
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label">&nbsp;</span>
                    <div class="fl">
                      <a @click="nextStep('third')" id="submitCode" class="btn-7">提交</a>
                    </div>
                    <div class="clr"></div>
                  </div>
                </div>
                <div v-if="checkSelf.third" class="safe-icon-box">
                  <s class="icon-succ02 m-icon"></s>
                  <div class="fore">
                    <h3 class="ftx-02">恭喜您，修改密码成功！</h3>
                    <div class="u-safe">
                      最新安全评级：
                      <i class="safe-rank04" id="cla"></i><strong class="rank-text ftx-04">中级</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="chooseItem.adr" class="mc">
                <div class="mt">
                  <a @click="setFix()" id="edit-add-dialog" class="e-btn add-btn btn-5">新增收货地址</a>
                </div>
                <div v-if="goodsAdr[0]" v-for="(value, index) in goodsAdr" class="mc1">
                  <div class="sm easebuy-m " id="addresssDiv-138310195">
                    <div class="smt">
                      <h3>
                        {{value.receiveName}}
                        <span v-if="value.isUsed" class="ftx-04 ml10">默认地址</span>
                      </h3>
                      <div class="extra">
                        <a @click="delAdr(value, index)" class="del-btn">删除</a>
                      </div>
                    </div>
                    <div class="smc">
                      <div class="items new-items">
                        <div class="item-lcol">
                          <div class="item">
                            <span class="label">收货人：</span>
                            <div class="fl">
                              {{value.receiveName}}
                            </div>
                            <div class="clr"></div>
                          </div>
                          <div class="item">
                            <span class="label">所在地区：</span>
                            <div class="fl">
                              {{value.receiveArea}}
                            </div>
                            <div class="clr"></div>
                          </div>
                          <div class="item">
                            <span class="label">地址：</span>
                            <div class="fl">
                              {{value.address}}
                            </div>
                            <div class="clr"></div>
                          </div>
                          <div class="item">
                            <span class="label">手机：</span>
                            <div class="fl">
                              {{value.mobile}}
                            </div>
                            <div class="clr"></div>
                          </div>
                        </div>
                        <div v-if="!value.isUsed" class="item-rcol">
                          <div class="extra">
                            <a @click="setPlace(value, index)" class="ml10 ftx-05">设为默认</a>
                          </div>
                        </div>
                        <div class="clr"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt">
                  <a @click="setFix()" id="edit-add-dialog" class="e-btn add-btn btn-5">新增收货地址</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="newFix" class="thickdiv"></div>
    <div v-if="newFix" class="thickbox">
      <div class="thickwrap">
        <div class="thicktitle">
          <span>添加收货地址</span>
        </div>
        <div class="thickcon">
          <div id="addressDiagDiv">
            <div class="m" id="edit-cont">
              <div class="mc">
                <div class="form">
                  <div class="item">
                    <span class="label"><em>*</em>收货人：</span>
                    <div class="fl">
                      <input id="consigneeName" type="text" class="text" v-model="formAdr.name">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label"><em>*</em>所在地区：</span>
                    <div class="fl">
                      <input id="consigneeAddress" type="text" class="text text1" v-model="formAdr.place">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label"><em>*</em>详细地址：</span>
                    <div class="fl">
                      <input id="consigneeAddress" type="text" class="text text1" v-model="formAdr.adr">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="item">
                    <span class="label"><em>*</em>手机号码：</span>
                    <div class="fl">
                      <input id="consigneeAddress" type="text" class="text text1" v-model="formAdr.phone">
                    </div>
                    <div class="clr"></div>
                  </div>
                  <div class="btns">
                    <a @click="saveAdr()" class="e-btn btn-9 save-btn">保存收货地址</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a @click="setFix()" class="thickclose" id="">×</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Qs from 'qs'
  export default {
    name: 'set',
    data () {
      return {
        search: "",
        setPass: {
          mailCode: "",
          imgCode: "",
          img: "",
          password: "",
          checkPass: "",
          imgCode2: ""
        },
        setUser: {
          userName: "",
          canUse: false,
          sex: "",
          phone: "",
          nickName: "",
          errMsg: ""
        },
        userInfo: {
          img: "",
          name: "",
          email: ""
        },
        formAdr: {
          name: "",
          place: "",
          adr: "",
          phone: ""
        },
        year: [],
        mouth: [],
        day: [],
        birth: {
          yearVal: "2018",
          mouthVal: "1",
          dayVal: "1"
        },
        chooseItem: {
          info: true,
          pic: false,
          pass: false,
          adr: false
        },
        imgs: [],
        goodsAdr: [],
        newFix: false,
        count: 121,
        doCount: false,
        checkSelf: {
          first: true,
          second: false,
          third: false
        },
        errMsgF: "",
        errMsgS: ""
      }
    },
    mounted(){
      this.getCaptcha();
      this.getYearMouth();
      this.getDay();
      this.getUserInfo();
      this.getAdr();
    },
    computed: {
      ...mapState({
        imgStatus: state => state.imgstore.img_status,
        imgPaths: state => state.imgstore.img_paths
      })
    },
    methods: {
      goToSearch (url, value) {
        sessionStorage.setItem("search", this.search);
        if (this.$route.name === 'itemPage') {
          this.$router.go(0);
        }
        this.jumpTo(url);
      },
      getYearMouth () {
        for (let i = 2018; i >= 1900; i--) {
          this.year.push(i);
        }
        for (let i = 1; i <= 12; i++) {
          this.mouth.push(i);
        }
      },
      getDay () {
        let arr = [];
        var temp = new Date(this.birth.yearVal, this.birth.mouthVal, 0);
        for (let i = 1; i <= temp.getDate(); i++) {
          arr.push(i);
        }
        this.day = arr;
      },
      checkItem (val) {
        for (let prop in this.chooseItem) {
          this.chooseItem[prop] = false;
        }
        this.chooseItem[val] = true;
      },
      upload () {
        this.$store.commit('set_img_status', 'uploading')
      },
      submit () {
        let values = []
        for (let key of this.imgPaths) {
          values.push(key)
        }
        this.imgs = values;
        console.log(this.imgs)
      },
      setPlace (value, index) {
        this.goodsAdr.forEach(function(val) {
          val.isUsed = 0;
        });
        this.goodsAdr[index].isUsed = 1;
        for (let i = 0 ; i < this.goodsAdr.length; i++) {
          if (this.goodsAdr[i].isUsed === 1) {
            this.goodsAdr = this.goodsAdr.splice(i, 1).concat(this.goodsAdr);
            console.log(this.goodsAdr);
            break;
          }
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/receiceAddress/modifyUsedAddress',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            id: value.id
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
      setFix () {
        this.newFix = !this.newFix;
        console.log(this.newFix);
      },
      saveAdr () {
        let obj = Object.assign({}, {
          receiveName: this.formAdr.name,
          receiveArea: this.formAdr.place,
          address: this.formAdr.adr,
          mobile: this.formAdr.phone,
          isUsed: 0
        });
        this.goodsAdr.splice(1, 0, obj);
        this.setFix();
        this.uploadAdr();
      },
      uploadAdr () {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/receiceAddress//createAddress',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            receiverName: _self.formAdr.name,
            receiveArea: _self.formAdr.place,
            address: _self.formAdr.adr,
            mobile: _self.formAdr.phone
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.$router.go(0);
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      sendNum () {
        this.count = 121;
        this.doCount = true;
        this.cutDown();
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user/sendEmailCode',
          data: Qs.stringify({
            email: _self.userInfo.email
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
      cutDown () {
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
      nextStep (val) {
        let _self = this;
        if(val === 'second') {
          if (!this.setPass.mailCode) {
            this.errMsgF = "邮箱验证码不能为空";
            return
          } else if (!this.setPass.imgCode) {
            this.errMsgF = "图片验证码不能为空";
            return
          }
        } else if (val === 'third') {
          if (!this.setPass.password) {
            this.errMsgS = "密码不能为空";
            return
          } else if (!this.setPass.checkPass) {
            this.errMsgS = "确认密码不能为空";
            return
          } else if (this.setPass.password !== this.setPass.checkPass) {
            this.errMsgS = "两次输入密码不一致";
            return
          } else if (!this.setPass.imgCode2) {
            this.errMsgS = "图片验证码不能为空";
            return
          }
        }
        for(let prop in this.checkSelf) {
          this.checkSelf[prop] = false;
        }
        if (val === 'second') {
          this.submitPass();
        } else if (val === 'third') {
          this.submitPassSenond();
        }
      },
      jumpTo (url) {
        this.$router.push({path: url})
      },
      delAdr (val, index) {
        this.goodsAdr.splice(index, 1);
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/receiceAddress//delAddress',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            id: val.id
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.setUser.canUse = response.data.data;
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
          _self.userInfo.email = response.data.data.email;
        }).catch(function (response){
          console.log(response);
        });
      },
      checkName () {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user//checkUsernameIsOnly',
          data: Qs.stringify({
            username: _self.setUser.userName
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          console.log(response);
          _self.setUser.canUse = response.data.data;
        }).catch(function (error) {
          console.log(error);
        });
      },
      getCaptcha () {
        let _self = this;
        this.$http({
          method: 'get',
          responseType: 'arraybuffer',
          url: 'http://127.0.0.1:8080/dip-web/captcha/captcha.form'
        }).then(function(response){
          console.log(response.data);
          _self.setPass.img =  'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        }).catch(function (response){
          console.log(response);
        });
      },
      submitUser () {
        if (!this.setUser.userName) {
          this.setUser.errMsg = "用户名不能为空";
          return
        } else if (!this.setUser.nickName) {
          this.setUser.errMsg = "昵称不能为空";
          return
        } else if (!this.setUser.sex) {
          this.setUser.errMsg = "性别不能为空";
          return
        } else if (!this.setUser.nickName) {
          this.setUser.errMsg = "生日不能为空";
          return
        } else if (!this.setUser.phone) {
          this.setUser.errMsg = "手机号不能为空";
          return
        }
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user//updateUserInfo',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            username: _self.setUser.userName,
            nickname: _self.setUser.nickName,
            birthday: _self.birth.yearVal + '年' + _self.birth.mouthVal + '月' + _self.birth.dayVal,
            gender: _self.setUser.sex,
            tel: _self.setUser.phone
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.setUser.errMsg = response.data.message;
          _self.$router.go(0);
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      submitPass () {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user//modifyPasswordBefore',
          data: Qs.stringify({
            emailCode: _self.setPass.mailCode,
            captchaCode: _self.setPass.imgCode
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.errMsgF = response.data.message;
          if (response.data.data) {
            _self.checkSelf.second = true;
            _self.getCaptcha();
          } else {
            _self.checkSelf.first = true;
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      submitPassSenond () {
        let _self = this;
        this.$http({
          method: 'post',
          url: 'http://127.0.0.1:8080/dip-web/user//modifyPassword',
          data: Qs.stringify({
            userId: sessionStorage.getItem("userId"),
            password: _self.setPass.password,
            captchaCode: _self.setPass.imgCode2
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }).then(function (response) {
          _self.errMsgS = response.data.message;
          if (response.data.data) {
            _self.checkSelf.third = true;
            setTimeout(function() {
              _self.checkSelf.third = false;
              _self.checkSelf.first = true;
            }, 10000);
          } else {
            _self.checkSelf.second = true;
          }
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      getAdr () {
        let _self = this;
        this.$http({
          method: 'get',
          url: 'http://127.0.0.1:8080/dip-web/receiceAddress/getAddressList',
          params: {
            userId: sessionStorage.getItem("userId")
          }
        }).then(function(response){
          _self.goodsAdr = _self.goodsAdr.concat(response.data.data);
          console.log(response.data);
          console.log(_self.goodsAdr);
        }).catch(function (response){
          console.log(response);
        });
      },
    },
    watch: {
      imgStatus () {
        if (this.imgStatus === 'finished') {
          this.submit()
        }
      }
    },
    destoryed () {
      this.imgs = []
    }
  }
</script>

<style scoped>
  .w {
    width: 990px;
    margin: 0 auto;
  }

  .btn {
    width: 100%;
    height: 3em;
    background-color: green;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
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
    line-height: 99em;
    top: 14px;
    right: 38px;
    background: #fff;
    color: #666;
    text-decoration: none;
  }

  #logo-2014 .link2 b {
    display: block;
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 99em;
    top: 0;
    right: 0;
    background: url(//misc.360buyimg.com/user/cart/widget/header-2017/i/cart-icon.png) #fff no-repeat;
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
    color: #666;
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
    color: #333;
    font-weight: 700;
    font-size: 12px;
  }

  #menu dl dd {
    color: #666;
    line-height: 24px;
  }

  #menu dl dd.curr a {
    color: #e4393c;
    font-weight: 700;
  }

  #menu dl dd a {
    color: #777;
    font-size: 12px;
  }

  #main {
    float: left;
    width: 99.9%;
    margin-left: -120px;
    overflow: hidden;
  }

  .mod-main {
    padding: 10px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .mod-main .mt {
    display: block;
    padding: 10px;
    overflow: hidden;
    zoom: 1;
  }

  .mod-main .mt .extra-l {
    float: left;
    list-style: none;
  }

  .mod-main .mt .extra-l li {
    float: left;
    padding-left: 20px;
    list-style: none;
    font-size: 12px;
  }

  .mod-main .mt .extra-l li a.curr {
    padding-bottom: 0;
    color: #e4393c;
    border-bottom: 2px solid #e4393c;
    font-weight: 700;
    cursor: pointer;
    text-decoration: none;
  }

  .mod-main .mt .extra-l li a {
    display: inline-block;
    cursor: pointer;
  }

  .mod-main .mc {
    overflow: visible;
    zoom: 1;
  }

  .mod-main .mc:after {
    content: '';
    display: block;
    clear: both;
  }

  .userset-lcol {
    float: left;
    width: 500px;
  }

  .user-set {
    background-color: #fff;
    padding: 20px 5px 0 15px;
  }

  .form1 .item {
    display: block;
    margin-bottom: 20px;
    line-height: 30px;
  }

  .form1 .item:after {
    content: "";
    display: block;
    clear: both;
  }

  .form1 .item span.label {
    float: left;
    height: 18px;
    line-height: 18px;
    padding: 6px 0;
    width: 100px;
    text-align: right;
    font-size: 12px;
  }

  .fl {
    float: left;
    font-size: 12px;
  }

  .form1 .itxt {
    height: 18px;
    width: 127px;
    padding: 5px 23px 5px 5px;
    line-height: 18px;
    border: 1px solid #ccc;
    float: none;
    font-family: "Microsoft YaHei";
    font-size: 12px;
  }

  .form1 .itxt-succ {
    background: url(//misc.360buyimg.com/user/myjd-2015/css/i/succ-ico.png) right center no-repeat;
  }

  .form1 .jdradio {
    float: none;
    vertical-align: -2px;
    _vertical-align: -1px;
    margin: 0 3px 0 0;
    padding: 0;
  }

  .form1 label {
    float: none;
  }

  .mr10 {
    margin-right: 10px;
  }

  .user-set .birthday-info {
    width: 397px;
    overflow: hidden;
  }

  .form .selt1 {
    width: 70px;
  }

  .form1 .selt {
    line-height: 18px;
    border: 1px solid #ccc;
    padding: 5px;
    float: none;
    font-family: "Microsoft YaHei";
    font-size: 12px;
  }

  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }

  .form1 label {
    float: none;
  }

  .ml5 {
    margin-left: 5px;
  }

  .mr5 {
    margin-right: 5px;
  }

  .btn-5 {
    background-image: linear-gradient(to bottom,#f5fbef 0,#eaf6e2 100%);
    border-radius: 2px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    border: 1px solid #bfd6af;
    padding: 2px 14px 3px;
    cursor: pointer;
  }

  .upup {
    margin-left: 70px;
  }

  .mc .mt {
    padding: 10px 30px;
    display: block;
    overflow: hidden;
    zoom: 1;
  }

  a.add-btn {
    display: inline-block;
    vertical-align: middle;
    font-weight: 700;
    padding: 0 14px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    margin: 0 10px 0 0;
    cursor: pointer;
  }

  .easebuy-m {
    border: 2px solid #e6e6e6;
    margin: 0 0 10px;
  }

  .easebuy-m .smt {
    padding-left: 10px;
    line-height: 35px;
    height: 35px;
    position: relative;
    display: block;
    overflow: visible;
  }

  .easebuy-m .smt:after {
    content: "";
    display: block;
    clear: both;
  }

  .easebuy-m .smt h3 {
    float: left;
    color: #666;
  }

  .easebuy-m .smt h3 .ftx-04 {
    margin: 0 0 0 10px;
    font-size: 12px;
    background: #ffaa45;
    padding: 2px;
    color: #fff;
    font-weight: 400;
  }

  .easebuy-m .smc {
    padding: 10px;
    line-height: 22px;
    width: 788px;
    overflow: hidden;
    zoom: 1;
  }

  .easebuy-m .smc .new-items {
    position: relative;
    width: 788px;
  }

  .easebuy-m .smc .item-lcol {
    width: 450px;
    float: left;
  }

  .easebuy-m .smc .item span {
    float: left;
    width: 70px;
    color: #999;
    text-align: right;
    font-size: 12px;
  }

  .easebuy-m .smc .item-lcol .fl {
    width: 360px;
    font-size: 12px;
  }

  .fl {
    float: left;
  }

  .clr {
    display: block;
    overflow: hidden;
    clear: both;
    height: 0;
    line-height: 0;
    font-size: 0;
  }

  .easebuy-m .smc .item-rcol {
    width: 320px;
    float: left;
    padding-left: 10px;
    height: 100%;
  }

  .easebuy-m .smc .item-rcol .extra {
    position: absolute;
    right: 30px;
    bottom: 0;
  }

  .ftx-05 {
    color: #005ea7;
  }

  .ml10 {
    margin-left: 10px;
    font-size: 12px;
    cursor: pointer;
  }

  .mc .mc1 {
    padding: 10px 30px;
  }

  .thickdiv {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000001;
    width: 100%;
    height: 100%;
    background: #000;
    border: 0;
    opacity: .15;
  }

  .thickbox {
    width: 762px;
    height: 542px;
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 10000002;
    overflow: hidden;
    padding: 0;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
  }

  .thickwrap {
    width: 760px;
  }

  .thicktitle {
    width: 740px;
    height: 27px;
    padding: 0 10px;
    border: solid #C4C4C4;
    border-width: 1px 1px 0;
    background: #F3F3F3;
    line-height: 27px;
    font-family: arial,"\5b8b\4f53";
    font-size: 14px;
    font-weight: 700;
    color: #333;
  }

  .thickcon {
    overflow: auto;
    background: #fff;
    border: solid #C4C4C4;
    border-width: 1px;
    width: 740px;
    height: 490px;
    padding: 10px;
  }

  #edit-cont {
    padding: 20px;
    margin-bottom: 10px;
    overflow: hidden;
    zoom: 1;
  }

  .mc {
    overflow: hidden;
    zoom: 1;
  }

  #edit-cont .item {
    margin: 0 0 5px;
    line-height: 22px;
  }

  #edit-cont .item .label {
    float: none;
    display: block;
    vertical-align: middle;
    color: #999;
    text-align: left;
  }

  .form .item span.label {
    height: 18px;
    line-height: 18px;
    padding: 6px 0;
    width: 100px;
    font-size: 12px;
  }

  .form em {
    color: #e4393c;
    font-style: normal;
  }

  #edit-cont .item .text {
    height: 18px;
    line-height: 18px;
    padding: 6px;
    width: 220px;
    margin-right: 5px;
    vertical-align: middle;
  }

  .form .text {
    border: 1px solid #ccc;
  }

  #edit-cont .item .text1 {
    width: 484px;
  }

  #edit-cont .btns {
    margin: 10px 0 0;
  }

  a.save-btn {
    margin-top: 15px;
    height: 28px;
    line-height: 28px;
    padding: 0 14px;
    font-size: 14px;
    cursor: pointer;
  }

  .btn-9 {
    background-color: #F7F7F7;
    background-image: linear-gradient(to bottom,#F7F7F7 0,#F3F2F2 100%);
    border-radius: 2px;
    display: inline-block;
    border: 1px solid #ddd;
  }

  .thickclose {
    display: block;
    position: absolute;
    z-index: 100000;
    top: 7px;
    right: 12px;
    overflow: hidden;
    width: 15px;
    height: 15px;
    background: url(//misc.360buyimg.com/201007/skin/df/i/bg_thickbox.gif) no-repeat 0 -18px;
    font-size: 0;
    line-height: 100px;
    cursor: pointer;
  }

  #content .form2 {
    margin-left: 100px;
    margin-top: 30px;
  }

  .form .item {
    display: block;
    margin-bottom: 20px;
    line-height: 30px;
  }

  #content .form2 .item span.label {
    width: 150px;
    font-size: 14px;
    color: #999;
    padding: 8px 0;
  }

  .form2 .item span.label {
    float: left;
    height: 18px;
    line-height: 18px;
    text-align: right;
  }

  .ftx-un {
    font-size: 16px;
    line-height: 25px;
    margin-right: 10px;
  }

  #content .form2 .itxt {
    width: 157px;
  }

  div.form2 .itxt {
    padding: 8px 23px 8px 5px;
    height: 18px;
    line-height: 18px;
    border: 1px solid #ccc;
    float: none;
    font-family: "Microsoft YaHei";
    font-size: 12px;
  }

  #content .btn-10 {
    padding: 8px 14px;
    font-size: 14px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .btn-10, .btn-9 {
    background-color: #F7F7F7;
    background-image: linear-gradient(to bottom,#F7F7F7 0,#F3F2F2 100%);
    border-radius: 2px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    border: 1px solid #ddd;
  }

  .form2 label {
    float: none;
  }

  .btn-7 {
    background-color: #f5fbef;
    background-image: linear-gradient(to bottom,#f5fbef 0,#eaf6e2 100%);
    border-radius: 2px;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    border: 1px solid #bfd6af;
    padding: 2px 14px 3px;
    cursor: pointer;
  }

  .form2 .item {
    display: block;
    margin-bottom: 20px;
    line-height: 30px;
  }

  .safe-icon-box {
    position: relative;
    margin-left: 171px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .safe-icon-box .icon-succ02 {
    background-position: 0 0;
  }

  .safe-icon-box .m-icon {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 48px;
    height: 48px;
    background: url(//misc.360buyimg.com/user/myjd-2015/css/i/icon48.png) no-repeat;
  }

  .safe-icon-box .fore {
    margin-left: 58px;
    line-height: 25px;
  }

  .ftx-02 {
    color: #71b247;
  }

  .u-safe .safe-rank04 {
    background-position: 0 -45px;
    background-image: url("//misc.360buyimg.com/user/myjd-2015/css/i/safe-rank2014.png");
    background-repeat: no-repeat;
    display: inline-block;
    font-size: 0;
    height: 14px;
    line-height: 0;
    margin-right: 10px;
    overflow: hidden;
    vertical-align: middle;
    width: 68px;
    font-style: normal;
  }

  .u-safe .rank-text {
    font-weight: 400;
    margin-right: 5px;
  }

  .ftx-04 {
    color: #ff6c00;
  }

  .easebuy-m .smt .extra {
    float: right;
    margin: 0 10px 0 0;
    line-height: 23px;
  }

  .easebuy-m .smt .extra .del-btn {
    margin-top: 10px;
    display: inline-block;
    width: 13px;
    height: 13px;
    text-indent: 2em;
    background: url(//misc.360buyimg.com/user/myjd-2015/css/i/close.png) no-repeat;
    overflow: hidden;
    vertical-align: middle;
  }

  .easebuy-m .smt .extra a {
    color: #005ea7;
    margin: 0 0 0 20px;
    cursor: pointer;
  }

  .listDan {
    font-size: 12px;
    position: absolute;
    right: 220px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    color: #999;
    cursor: pointer;
  }

  .errmsg {
    display: inline-block;
    font-size: 14px;
    color: #ff6c00;
    margin-left: 100px;
  }
</style>
