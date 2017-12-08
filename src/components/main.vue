<template>
    <div class="container">
        <header>
            <div class="log">
                <p>家之圈</p>
            </div>
            <div class="welcome">
                <span>欢迎用户:{{username}}</span>
            </div>
        </header>
        <main>
            <div class="pageLiat">
                <page-list></page-list>
            </div>
            <div class="pageContent">
                 <router-view></router-view>
            </div>
        </main>
    </div>
</template>
<script>
 	import pageList from './pages/main_left.vue';
    export default{
        data(){
		    var username=sessionStorage.getItem("phone");
            return {
                activeNames: ['1'],
                username: sessionStorage.getItem("phone")
            };
        },
        components:{
         	pageList
        },
        mounted() {
            this.username = sessionStorage.getItem("username");
        }
    }
</script>
<style scoped>
    .container {
        width: 100%;
        height: 100%;
    }
    .container header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding: 0 10px;
        box-sizing: border-box;
        background: #FF7C34;
        color: #FFFFFF;
        box-shadow:1px 1px 3px  #a99696;
    }
    
    .container header .log {
        float: left;
    }
    
    .container header .welcome {
        float: right;
        font-size: 14px;
    }
    
    .welcome span{
    	display: inline-block;
    	padding:0 20px;
    	border-right:1px solid #FF6633;
    	
    }
    
    .welcome span:last-child{
    	border:none;
    }
    
    .container main{
    	box-sizing: border-box;
    	position: absolute;
    	top: 0px;
    	left: 0;
    	width:100%;
    	height: 100%;
    	padding-top:60px;
    	
    }
    .container main .pageLiat {
        float: left;
        width: 15%;
        height:100%;
    }
    
    .container main .pageContent {
    	float: right;
    	width:85%;
    	height:100%;
        overflow-y: scroll;
        
    }
    .log p{
    	margin-left: 50px;
    	font-size: 20px;
    }
</style>