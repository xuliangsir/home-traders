<template>
	<div class="menuList">
		<el-row class="tac">
		  <el-col :span="24">
		    <el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark">
		      	<router-link :to="{path:'/main/orderManagement'}">
	        	<el-menu-item index="1">订单管理</el-menu-item>
	          </router-link>
	          <router-link :to="{path:'/main/serviceManagement'}">
	        	<el-menu-item index="2">服务管理</el-menu-item>
	          </router-link>
	          <router-link :to="{path:'/main/storeSetting'}">
	        	<el-menu-item index="4">店铺设置</el-menu-item>
	          </router-link>
	          <router-link :to="{path:'/main/storeCertification'}">
	        	<el-menu-item index="6">店铺认证</el-menu-item>
	          </router-link>
	          <router-link :to="{path:'/main/accountSetting'}">
	        	<el-menu-item index="5">账户设置</el-menu-item>
	          </router-link>
		    </el-menu>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
   export default {
    data(){
    	return {
    		
    	}
    },
    mounted(){
    	
    }
  }
</script>

<style scoped>
	*{
		background: #FF965D;
	}
	.menuList{
		width:100%;
		
	}
	.tac{
		height: 100%;
		background:#FF965D;
	}
	.el-menu-item-group__title{
		color: #fff;
	}
	.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
		color: #fff;
	}
	.menuList{
		height:100%;
		overflow: hidden;
	}
	li{
		border-bottom:1px solid red;
	}
	.el-form-item__l{
		padding:11px 0 11px 0;
	}
	.el-menu-item.is-active{
		padding-left:-5px;
		background: #FFFFFF;
		color: #FF7C34;
	}
	.el-menu-item{
		border-bottom: 1px solid #FF6633;
		padding-left:5px;
	}
	
	.el-menu-item:hover{
		background:#FF7C34;
		color: #FFFFFF;
	}
</style>