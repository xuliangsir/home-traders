<template>
  <div class="login">
        <div class="content">
        		<img src="../assets/logo.png" alt="" class="logoImg"/>
            <div class="usermsg">
            	<h2 v-show="!status">用户登录</h2>
            	<h2 v-show="status">用户注册</h2>
	            <ul>
	              <li v-focus:test="phonedata" v-show="status">
	                <p>
	                  <label>手机号:</label>
	                	<input type="text" placeholder="请输入未注册手机号" v-model.lazy="phonedata.val" @blur="fn(phonedata.val.test)">
	                </p>
		            </li>
		            <li v-focus:test="phonedata" v-show="!status">
	                <p>
	                  <label>账号:</label>
	                	<input type="text" placeholder="请输入账号" v-model.lazy="phonedata.val" @blur="fn(phonedata.val,phonedata.test)">
	                </p>
		            </li>
		            <li v-focus:required="loginpw" v-show="!status" id="passworded" v-html="changepsw">
		                
		            </li>
		            <li v-focus:required="loginpw" class="yzm" v-show="status" id="changeLogin" v-html="changeyzm">
		                <p>
		                  <label>验证码:</label>
		                	<input type="password" placeholder="请输入验证码" v-model="loginyzm">
		                	<button @click="sendyzm($event)">
									      <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
									      <span v-if="!sendMsgDisabled">发送验证码</span>
									    </button>
		                </p>
		            </li>
	            </ul>
	            <li>
	            		<button @click="login" v-show="!status">登录</button>
	            		<button @click="register" v-show="status">注册</button>
	            		<a @click="changeStatus" v-show="!status">注册</a>
	            		<a @click="changeStatus" v-show="status">登录</a>
	            		<i v-show="!status" v-if="loginin" @click="changeLoginin">忘记密码？短信验证码登录</i>
	            		<i v-show="!status" v-if="!loginin" @click="changeLoginin">手机不在身边？密码登录</i>
	            </li>
            </div>
        </div>
  </div>
</template>

<script>
    export default {
        // name: 'login',
        data() {
            return {
            		changepsw:'<p data-v-38a5e929=""><label data-v-38a5e929="">密码:</label> <input data-v-38a5e929="" type="password" placeholder="请输入密码"></p>',
            		changepsw1:'<p data-v-38a5e929=""><label data-v-38a5e929="">密码:</label> <input data-v-38a5e929="" type="password" placeholder="请输入密码"></p>',
            		changeyzm:'<p data-v-38a5e929=""><label data-v-38a5e929="">验证码:</label> <input data-v-38a5e929="" type="password" placeholder="请输入验证码"> <button data-v-38a5e929=""><!----> <span data-v-38a5e929="">发送验证码</span></button></p>',
            		changeyzm1:'<p data-v-38a5e929=""><label data-v-38a5e929="">验证码:</label> <input data-v-38a5e929="" type="password" placeholder="请输入验证码"> <button data-v-38a5e929=""><!----> <span data-v-38a5e929="">发送验证码</span></button></p>',
            		num:1,
            		loginyzm:"",//登录验证码
            		loginin:false,
            		time:60,
            		sendMsgDisabled: false,
                phonedata: {
                       val: "",
                       msgread: "您输入的手机号格式不对",
                       msg: "您输入的手机号格式不对",
                       test: /^1[3|4|5|8][0-9]\d{4,8}$/
                },
                loginpw: {
                    val: "",
                    msgread: "您输入的密码格式不对",
                    msg: "您输入的密码格式不对",
                    test: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
                    state: false
                },
                status:true,
                yzmloginin:false
            }
        },
        methods: {
            login() {
                // 判断是否值是否正确
                var _this = this;
                if(this.loginpw.val == "" && this.phonedata.val == ""){
                		this.$message({
						          showClose: true,
						          message: '内容不能为空',
						          type: 'error'
						        });
                }else if (!this.loginpw.state && !this.phonedata.state) {
                	  var _this=this;
                	  console.log( _this.loginpw.val)
                    this.axios.post("/home/api/login", {
						            phone: _this.phonedata.val,
						            password: _this.loginpw.val
						        }).then(function(groupid) {
						        	console.log(groupid)
						            if(groupid.data.success){
						            	_this.$router.push("/main/accountSetting");
			        						sessionStorage.setItem("username",groupid.data.data.userInfo.nickname);
			        						sessionStorage.setItem("phone",groupid.data.data.userInfo.phone);
			        						sessionStorage.setItem("isSetupPassword",groupid.data.data.isSetupPassword);
			        						sessionStorage.setItem("userid",groupid.data.data.userInfo.userid);
			        						//接受数据是否设置过密码
						            }else{
						            	_this.$message({
									          showClose: true,
									          message: '密码或账号错误',
									          type: 'warning'
									        });
						            }
						        })
                } else {
                		this.$message({
						          showClose: true,
						          message: '错了哦，这是一条错误消息',
						          type: 'warning'
						        });
                }
            },
            register(){
            	console.log(this.phonedata.val);
            	var _this=this;
            	this.axios.post("/home/api/regist", {
			            phone: _this.phonedata.val,
			            verifyCode:_this.loginyzm
			        }).then(function(groupid) {
			        	console.log(groupid)
			            if(groupid.data.success){
			            	_this.$router.push("/main/storeCertification");
			        			sessionStorage.setItem("username",_this.phonedata.val);
			            }else{
			            	_this.$message({
						          showClose: true,
						          message: '注册失败',
						          type: 'warning'
						        });
			            }
			        })
            },
            // 必填项的验证
            fn(val) {
               console.log(val);
            },
            yzmfn(val){
            	console.log(val);
            },
            mmfn(val){
            	console.log(val);
            },
            changeStatus(){
            	this.status=!this.status;
            	this.changepsw=this.changepsw1;
            	changepsw.class="";
            },
            changeLoginin(){
            	this.loginin=!this.loginin;
            	this.yzmloginin=!this.yzmloginin;
            	this.num++;
            	if(this.num%2==0){
            		this.changepsw=this.changeyzm1;
            		changepsw.class="yzm";
            	}else{
            		this.changepsw=this.changepsw1;
            		changepsw.class="";
            	}
            	
            },
            //发送验证码
            sendyzm(e){
            	var _this=this;
            	this.axios.get("/home/api/getVerifyCode?phone="+_this.phonedata.val)
            	.then(function(groupid) {
			           console.log(groupid)
			        })
							let me = this;
			        me.sendMsgDisabled = true;
			        e.target.parentNode.style.background="#e4e4e4";
			        let interval = window.setInterval(function() {
			          if ((me.time--) <= 1) {
			            me.time = 60;
			            me.sendMsgDisabled = false;
			            window.clearInterval(interval);
			            e.target.disabled=true;
			            e.target.parentNode.style.background="#FF7C34";
			          }
			        }, 1000);
			        
            }
        },
        directives: {
            focus: {
                
            }
        }
    }
</script>

<style scoped>
    .login {
        width: 100%;
        height: 70%;
        background: #FF7C34;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .content{
    	width: 100%;
    	height: 100%;
    	position: relative;
    }
    .logoImg{
    	width: 100px;
    	position: absolute;
    	left: 50%;
    	margin-left: -50px;
    	top:-50px;
    	background: #fff;
    	border-radius:0 0 50% 50%;
    	
    }   
    .usermsg{
    	width: 400px;
    	height:250px;
    	padding:15px;
    	background: #fff;
    	border-radius: 10px;
    	position: absolute;
    	left: 50%;
    	top:100px;
    	margin-left:-200px;
    } 
    .usermsg h2{
    	text-align: center;
    	font-weight: 500;
    	line-height: 60px;
    	color: #333333;
    }
    .usermsg li{
    	text-align: center;
    	line-height: 40px;
    	color: #666;
    	position: relative;
    	margin-bottom: 10px;
    }
    .usermsg input{
    	width: 200px;
    	height:30px;
    	border-radius: 5px;
    	border:1px solid #E0E0E0;
    	text-indent: 10px;
    	outline: none;
    }
    .yzm input{
    	width:100px;
    }
    .usermsg label{
    	display: inline-block;
    	width:70px;
    	text-align: right;
    }
    .usermsg b{
    	position: absolute;
    	left: 250px;
    	font-size: 14px;
    	width:200px;
    	top:10px;
    	font-weight: 300;
    }
    .usermsg a{
    	font-size: 14px;
    	text-decoration: underline;
    	margin-top:5px;
    	cursor: pointer;
    	float: right;
    	margin-right:60px;
    }
    .usermsg button{
    	width:150px;
    	background: #FF7C34;
    	border:none;
    	border-radius: 5px;
    	height:32px;
    	color: #fff;
    	font-size: 14px;
    	cursor: pointer;
    	margin-left:100px;
    }
    .yzm button{
    	width:90px;
    	margin-left:7px;
    }
    .usermsg i{
    	display: block;
    	font-size: 12px;
    	font-style:inherit;
    	margin-left:100px;
    	text-decoration: underline;
    	color: #999;
    	cursor: pointer;
    }

</style>