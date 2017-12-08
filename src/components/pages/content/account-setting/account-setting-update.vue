<template>
	<div>
		<div class="content" v-if="showBox">
			<p>修改密码</p>
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			  <!--<el-form-item label="原密码" prop="oldpass">
				<el-input type="password" v-model="ruleForm2.oldpass"></el-input>
			  </el-form-item>-->
			  <el-form-item label="输入新密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认新密码" prop="checkPass">
			    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitFormRepeat('ruleForm2')">提交</el-button>
			  </el-form-item>
			</el-form>
		</div>
		<div class="content" v-if="!showBox">
			<p>设置密码</p>
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="密码" prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass">
			    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
  export default {
    data() {
	  if(sessionStorage.getItem("isSetupPassword")){
	  	var showBox=true;
	  }else{
	  	var showBox=false;
	  }
	  console.log(showBox);
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== ''){
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
      	showBox:showBox,
        ruleForm2: {
          pass: '',
          oldpass: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          oldpass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
      	var phone=sessionStorage.getItem("username");
      	var _this=this;
        this.axios.post("/home/api/setuppwd", {
            phone: phone,
            password: _this.ruleForm2.checkPass
        }).then(function(groupid){
        	console.log(groupid);
            if(groupid.data.success){
            	_this.$message({
		          message: '保存成功',
		          type: 'success'
		        });
            }else{
            	_this.$message.error('操作失败，请重新输入');
            }
        },function(){
        	_this.$message.error('操作失败，请重新输入');
        })
      },
      submitFormRepeat(){
      	var phone=sessionStorage.getItem("phone");
      	var username=sessionStorage.getItem("username");
      	var _this=this;
      	//console.log(phone,username,this.ruleForm2.checkPass)
        this.axios.post("/home/api/resetuppwd",{
            phone: phone,
            //oldpassword:_this.ruleForm2.oldpass,
            password: _this.ruleForm2.checkPass
        }).then(function(groupid){
        	//console.log('--^^^^^^^^^^^^^^---修改密码接口---',phone,oldpassword,password,groupid)
            if(groupid.data.success){
            	_this.$message.success('修改成功');
            }else{
            	_this.$message.error('操作失败，请重新修改');
            }
        },function(){
        	_this.$message.error('操作失败，请重新修改');
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
	.content{
		width:600px;
		height: 400px;
		border: 1px solid #eee;
		position: absolute;
		top: 0;
		left:0;
		right:0;
		bottom:0;
		margin: auto;
		padding:20px;
		border-radius: 10px;
		text-align: center;
	}
	.el-button--primary{
		margin-bottom: 20px;
	}
	.head img{
		width: 80px;
		height: 80px;
	}
	.el-form-item__content{
		width: 75%;
	}
	p{
		width:100%;
		height: 40px;
		line-height: 40px;
		margin-bottom: 20px;
		background: #E0E0E0;
	}
</style>