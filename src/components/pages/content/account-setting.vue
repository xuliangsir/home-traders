<template>
	<div class="box">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<router-link :to="{path:'/main/accountSetting/storeSettingMessage'}">
	        	<el-menu-item index="1" class="botLine">个人信息</el-menu-item>
			</router-link>
	        <!--<router-link :to="{path:'/main/accountSetting/storeSettingWxlogin'}">
	        	<el-menu-item index="2" class="botLine">微信登录用户</el-menu-item>
			</router-link>-->
			<router-link :to="{path:'/main/accountSetting/storeSettingUpdate'}">
	        	<el-menu-item index="3" class="botLine">修改密码</el-menu-item>
			</router-link>		  
		</el-menu>
		<div class="line"></div>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
	    data() {
	      return {
	      	value3: true,
	        phone:9999999999,
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
	      handleSelect(key, keyPath) {
	        console.log(key, keyPath);
	      },	      
	    }
	  }
</script>

<style scoped>
	.el-menu-demo{
		padding-left:30px;
	}
	.el-menu{
		background: #f2f2f2;
	}
	.el-menu--horizontal .el-menu-item:hover, .el-menu--horizontal .el-submenu__title:hover{
		background: #FFF;
		border: none;
	}
	.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
		color: #111;
		font-weight: 600;
		border-bottom: 3px solid #999;
	}

	
</style>