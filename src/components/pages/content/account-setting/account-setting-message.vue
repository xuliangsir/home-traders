<template>
	<div class="content">
		<div class="head">
			<img src="../../../../assets/logo.png" alt="" />
		</div>
		<!--<el-button type="primary">修改头像</el-button>-->
		<!--<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
		  <el-form-item
		    prop="email"
		    label="邮箱"
		    :rules="[
		      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
		      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
		    ]"
		  >
		    <el-input v-model="dynamicValidateForm.email"></el-input>
		  </el-form-item>
		</el-form>-->
		<p>认证手机：{{phone}}</p>
		<p>
			是否上线：
			<el-switch
			  v-model="value3"
			  active-text="按月付费"
			  inactive-text="按年付费">
			</el-switch>
		</p>
		<!--<el-button type="primary">保存修改</el-button>-->
	</div>
</template>
<script>
export default {
	    data() {
	      var phone=sessionStorage.getItem("phone");
	      return {
	      	value3: true,
	        phone:phone,
	        activeIndex: '1',
	        ruleForm:{
	        	name:''
	        },
	        dynamicValidateForm: {
	          domains: [{
	            value: ''
	          }],
	          email: ''
	        }
	      }
	    },
	    methods: {
	      
	    }
	  }
</script>
<style scoped="scoped">
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
		margin: 30px 0;
	}
</style>