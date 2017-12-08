<template>
   <el-form :model="ruleForm"  ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <!-- 店铺名称 -->
        <i class="el-icon-close closeBtn" @click="closeBtn"></i>
        <h3>添加服务分类</h3>
        <el-form-item label="分类名称" style="margin-top:30px;">
            <el-input v-model="ruleForm.service" style="width:200px;" placeholder="添加分类"></el-input>
		    <el-button type="primary" @click="addStyle">添加</el-button>
        </el-form-item>
        <el-form-item label="已有分类">
            <el-button-group style="width:100%;" v-for="(item,index) in list" class="contents">
                <el-button type="primary" disabled style="width:10%;">{{item.num}}</el-button>
                <el-button type="primary" style="width:50%;" disabled>{{item.name}}</el-button>
                <el-button type="primary" @click="writed(item,index)">编辑</el-button>
                <el-button type="primary" @click="deleted(item,index)">删除</el-button>
            </el-button-group>
        </el-form-item>
        <div class="marsk" v-if="marskEtid">
        	<el-input v-model="sortNum" style="width:50px;" placeholder="排序号"></el-input>
        	<el-input v-model="styleName" style="width:200px;" placeholder="修改分类名称"></el-input>
		    <el-button type="success" plain @click="marskEtided">确定</el-button>
		    <el-button type="info" plain @click="marskErr">取消</el-button>
        </div>
    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    service:'',
                    name: '', //名称
                    fenlei:'',//分类
                },
                list:[{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                },{
                	num:0,
                	name:"开荒保洁"
                },{
                	num:2,
                	name:"金牌月嫂"
                }],
                sortNum:"",//第三方排序号
                styleName:"",//第三方名称
                marskEtid:false,//marsk框
                mainNum:0//第三方借助下标
            }
        },
        methods: {
            //编辑服务分类
            writed(item,index){
            	console.log(item,index)
            	this.marskEtid=true;
            	this.mainNum=index;
            	this.sortNum=item.num;
            	this.styleName=item.name;
            },
            marskErr(){
            	this.marskEtid=false;
            },
            //确定编辑分类
            marskEtided(){
            	this.marskEtid=false;
            	console.log("0000")
            	this.list[this.mainNum].num=this.sortNum;
            	this.list[this.mainNum].name=this.styleName;
//          	var _this=this;
//              var userid=parseInt(sessionStorage.getItem("userid"));
//	    	    var phone=sessionStorage.getItem("phone");
//              this.axios.post("/home/api/modservicekind",{
//                  userid:userid,
//                  shopid:"6",
//                  sortNum:_this.sortNum,
//                  servicekind:_this.styleName
//              }).then(function(data){
//                  console.log(data)
//              },function(){
//                  _this.$message.error('加载失败');
//              })
            },
            //删除服务分类
            deleted(item,index){
                var _this=this;
                var userid=parseInt(sessionStorage.getItem("userid"));
	    	    var phone=sessionStorage.getItem("phone");
                this.axios.post("/home/api/service/del",{
                    userid:userid,
                    serviceid:"8"
                }).then(function(data){
                    console.log(data)
                },function(){
                    _this.$message.error('加载失败');
                })
            },
            //添加服务分类
            addStyle(){
                var _this=this;
                var userid=parseInt(sessionStorage.getItem("userid"));
	    	    var phone=sessionStorage.getItem("phone");
                this.axios.post("/home/api/service/addkind",{
                    userid:userid,
                    shopid:"6",
                    servicekind:_this.ruleForm.service
                }).then(function(data) {
                    console.log(data)
                },function(){
                    _this.$message.error('加载失败');
                })
            },
            closeBtn(){
                this.$bus.$emit("closeStyle")
            }
        }
    }
</script>
<style scoped>
    .demo-ruleForm{
        width:50%;
        height:70%;
        margin-left:25%;
        margin-top:5%;
        overflow-y:scroll;
        background:#fff;
        border-radius:10px;
        padding:20px;
        position:relative;
    }
    .closeBtn{
        position:absolute;
        top:20px;
        right:20px;
        cursor:pointer;
    }
    .marsk{
    	width:500px;
    	text-align: center;
    	padding:20px;
    	background: #FFFFFF;
    	border:1px solid #ccc;
    	border-radius:10px;
    	position: fixed;
    	top:40%;
    	left:50%;
    	margin-left:-250px;
    	z-index: 99999;
    }
    .photou img{
    	width: 102px;
    	height:102px;
    }
</style>