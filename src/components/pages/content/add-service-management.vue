<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
    	<i class="el-icon-close closeBtn" @click="closeBtn"></i>
        <h3>添加服务</h3>
        <!-- 店铺相册 -->
        <el-form-item label="服务相册">
            <el-row>
                <el-col :span="24">
                    <span v-for="item in photoList" class="photou">
                       <img :src="item" alt="">
                    </span>
                    <img src="ruleForm.photo" alt="" class="imgUpload" @click="checkImg">
                    <input type="file" class="hide" @change="getFile" ref="file" accept="image/*" v-if="resetDom">
                </el-col>
            </el-row>
        </el-form-item>
        <!-- 店铺名称 -->
        <el-form-item label="服务名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- 项目描述 -->
        <el-form-item label="服务描述">
            <el-input type="textarea" v-model="ruleForm.description" :autosize="{ minRows: 2, maxRows: 10 }"></el-input>
        </el-form-item>
        <!--销售价格-->
        <el-form-item label="销售价格" required>
            <div class="block">
		    <el-input  style="width:150px;margin-right:20px;" v-model="ruleForm.price"></el-input>
            单位
            <el-input  style="width:150px;margin-right:20px;" v-model="ruleForm.unit"></el-input>
		    原价
		    <el-input  style="width:150px;margin-left:20px;" v-model="ruleForm.originalprice"></el-input>
		  </div>
        </el-form-item>
        <!-- 客服电话 -->
        <el-form-item label="起购数量" required>
            <div class="block">
		    <el-input  style="width:200px;margin-right:50px;" v-model="ruleForm.minbuycount"></el-input>
		    服务时长
		    <el-input  style="width:200px;margin-left:10px;" v-model="ruleForm.servicetimes"></el-input>
		  </div>
        </el-form-item>
        <el-form-item label="平台分类" required>
            <div class="block">
		    <el-input  style="width:150px;margin-right:25px;" v-model="ruleForm.platformkind"></el-input>
            二级分类
            <el-input  style="width:150px;margin-right:25px;" v-model="ruleForm.subplatformkind"></el-input>            
		    店内分类
		    <el-input  style="width:150px;margin-left:10px;" v-model="ruleForm.shopkind"></el-input>
		  </div>
        </el-form-item>
        <el-form-item label="服务范围">
            <!--<div class="area_box">
                <span class="area_item">北京</span>
                <span class="area_item">上海</span>
                <span class="area_item">广州</span>
                <span class="area_item">杭州</span>
                <span class="area_item">深圳</span>
            </div>-->
            <!--地方-开始-->
            <!--<el-form-item label="服务范围">
                <el-checkbox-group v-model="checkboxGroup2" class="area_box">
                    <el-checkbox-button v-for="(item,key) in cities" :label="item" :key="item">{{item}}</el-checkbox-button>
                </el-checkbox-group>           
            </el-form-item>-->
            <div class="block">
                <el-radio-group label="地方" v-model="ruleForm.city">
                    <el-radio-button label="上海"></el-radio-button>
                    <el-radio-button label="北京"></el-radio-button>
                    <el-radio-button label="广州"></el-radio-button>
                    <el-radio-button label="杭州"></el-radio-button>
                    <el-radio-button label="深圳"></el-radio-button>
                </el-radio-group>
            </div>
        </el-form-item>
        <el-form-item label="排序号" required>
            <div class="block">
		    <el-input  style="width:50px;margin-right:50px;" v-model="ruleForm.sortNo"></el-input>
            是否上架
		    <el-switch v-model="ruleForm.isonline"></el-switch>
		  </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm2('ruleForm')">保存</el-button>
            <!--<el-button type="primary" @click="submitForm2">保存</el-button>-->
            <el-button type="primary" @click="closeBtn">关闭</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default{
        data(){
            return{
                checkboxGroup1:["周一"],
                //checkboxGroup2:["北京"],
                //cities:["北京","上海","广州","杭州","深圳"],
            	resetDom: true,
        		value1: '',
        		value2: '',
        		sign:"",
                album:"",
                retryNum:0,
                httpResponse:null,
                sign:null,
                photoList:[],
                ruleForm: {
                    name:'',//服务名称*
                    photo:'',
                    serviceimgurl:'',//服务相册*
                    description:"",//服务描述
                    price:"",//价格*
                    unit:"",//单位*
                    originalprice:"",//初始金额
                    minbuycount:"",//最小金额
                    servicetimes:"",//服务时长
                    platformkind:"",//平台分类*
                    subplatformkind:"",//二级分类*
                    shopkind:"",//店内分类
                    city:"",//城市
                    sortNo:"",//排序
                    isonline:false//是否上架
                },
                rules: {
                    name: [{
                            required: true,
                            message: '请输入店铺名称',
                            trigger: 'blur'
                        }
                    ],
                    region: [{
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }],
                    date1: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }],
                    date2: [{
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }],
                    type: [{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],
                    resource: [{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc: [{
                        required: true,
                        message: '请输入商家简介',
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入客服电话',
                        trigger: 'blur'
                    }],
                    shop_info: [{
                        required: true,
                        message: '请输入商家简介',
                        trigger: 'blur'
                    }]
                }
                //photoList:[]
            };
        },
        methods:{
        	closeBtn(){
                this.$bus.$emit("closeServer");
        	},
        	chioceWeek(checkboxGroup1){
        		console.log(checkboxGroup1);
        	},
        	//点击提交服务
            submitForm2(formName){
                this.$refs[formName].validate((valid) => {
                     var _this=this;
                    if (valid){
                        //alert('123');
                        console.log('@1234');
                        var _this=this;
				    	var userid=parseInt(sessionStorage.getItem("userid"));
				    	var phone=sessionStorage.getItem("phone");
				    	var shopid=sessionStorage.getItem("shopid");
				    	console.log('========myshopid--YES=========',shopid)
                        //console.log(_this.ruleForm.photoList);
                        var params={
                            shopid:shopid,//店铺id
				    		name: _this.ruleForm.name,//服务名称
                            //serviceimgurl:_this.ruleForm.serviceimgurl,//服务相册
                            serviceimgurl:_this.photoList[0],
                            description: _this.ruleForm.description, //订购须知
                            price:_this.ruleForm.price,//价格
                            unit:_this.ruleForm.unit,//单位
                            originalprice:_this.ruleForm.originalprice,//起购金额
                            minbuycount:_this.ruleForm.minbuycount,//最低金额
                            servicetimes:_this.ruleForm.servicetimes,//服务时长
                            platformkind:_this.ruleForm.platformkind,//平台分类
                            subplatformkind:_this.ruleForm.subplatformkind,//二级分类
                            shopkind:_this.ruleForm.shopkind,//店内分类
                            city:_this.ruleForm.city,//城市
                            sortNo:_this.ruleForm.sortNo,//排序
                            isonline:_this.ruleForm.isonline//是否上架
				        };
				    	_this.axios.post("/home/api/service/add",params).then(function(res){
                            console.log('-----777777777788添加服务接口郝清振大家好才是真的好-YED----------',params,res)
                            var data=res.data;
                            if(data.success==true){
                                console.log('-----添加服务接口郝清振-YED----------',res);
				        	    _this.$message.success('保存成功YED');
                            }else{                                
				        	    _this.$message.error('保存失败YED');
                            }
                            _this.$bus.$emit("closeServer");                           
				        },function(){
				        	_this.$message.error('保存失败YED');
                            _this.$bus.$emit("closeServer");
				        })
                    }else{
                        _this.$message.error('请填写完整信息YED');
                        return false;
                    }
                });
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
		    //相册部分
		    checkImg(){
		      this.$refs.file.click();
		    },
		    getFile(e){
		      this.file = e.target.files[0];
		      this.getsign();
		    },
		    getsign(){
		      try {
                 var _this=this;
                 var httpResponse,sign;
                    this.axios.get("/home/api/getsign").then(function(res) {
   			           _this.httpResponse=res.data.success;
   			           _this.sign=res.data.data.sign;
                          if(_this.httpResponse){
                              _this.uploadWithSign(_this.sign);
                            //   _this.getsignNum = 0;
                          }else{
                              _this.retryGetSign()
                          }
			         })
		      } catch (error) {
		        this.retryGetSign();
		      }
		    },
            uploadWithSign(sign) {
                var _this=this;
                if (!this.file) {
                    return;
                }
                var formData = new FormData();
                formData.append("FileContent", _this.file);
                console.log('&&&&&&&&图片容器',formData,_this.file);
                try {
                    //var _this=this;
                    let config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                    
                    this.$http.post("https://web.image.myqcloud.com/photos/v2/10061631/coach/0/?sign=" +_this.sign,
                     formData,config
                    ).then(function(res){
                        //console.log('---999999---formData上传格式----------',formData);
                        console.log('11111111111========TP',res);
                         if(res.data.code==0){
                            //console.log(data.data.data.download_url)
                            //_this.ruleForm.photo = res.data.data.download_url;
                            //_this.photoList.push(res.data.data.download_url);
                               console.log('222222222222222图片上传2000000000',res.data.data.download_url);
                            
                            _this.photoList.push(res.data.data.download_url);
                            _this.ruleForm.serviceimgurl=_this.photoList[0];
                            console.log('33333333333333图片数组',_this.photoList);
                            console.log('-----------允许图片上传-----------',_this.ruleForm.serviceimgurl);
                            console.log('-----------图片上传-------------',_this.photoList);
                         }else{
                             _this.retryGetSign();
                         }
			         },function(){
                         _this.retryGetSign();
                     })
                } catch (error) {
                    this.retryGetSign();
                }
            },
		    retryGetSign(){
		      this.retryNum++;
		      if (this.retryNum < 5){
		        this.getsign();
		      } else {
		        this.retryNum = 0;
		        this.$message({
		          message: "图片上传失败!",
		          type: "warning"
		        });
		      }
		    }
        }
    }

</script>
<style scoped>
	.demo-ruleForm{
		padding-top:20px;
	}
    .day_box {
        margin-top: 50px;
    }
    .area_box {
        display: flex;
        flex-wrap: wrap;
    }
    .active_day {
        background: #21BA5C;
        color: #fff;
        margin-right: 12px;
        line-height: 30px;
        border-radius: 5px;
        display: inline-block;
        padding: 0 12px;
    }

    .active_day.no_active_day {
        background: #ccc;
        color: #fff;
    }

    .area_box {
        display: flex;
        flex-wrap: wrap;
    }

    .area_item {
        background: #115F88;
        color: #fff;
        margin-right: 12px;
        line-height: 30px;
        border-radius: 5px;
        display: inline-block;
        padding: 0 12px;
        margin-bottom: 12px;
    }
    
    .refresh {
        background: #21BA5C;
    }
    
    .area_item{
    	cursor: pointer;
    }
    
    .prompt{
    	color: #999;
    }
    
    .inpwidth{
    	width: 500px;
    }
    .el-button--primary{
    	width:100px;
    }
    .day_box span{
    	cursor: pointer;
    }
    .el-icon-plus{
    	width: 100%;
    	height: 100%;
    }
    #storephoto{
    	width:100px;
    	height:100px;
    	border:1px solid #C2CCD1;
    	border-radius: 5px;
    }
    #storephoto input{
    	width: 100%;
    	height:100%;
    	opacity: 0;
    }

    .imgUpload{
    display:inline-block;
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
    }
    .photou{
        display:inline-block;
    }
    .photou,.photou img{
        display:inline-block;
        width: 200px;
        height: 200px;
    }
    .imgUpload:hover {
    border-color: #8391a5;
    }
    .imgUpload:active {
    outline: 0;
    border-color: #20a0ff;
    }
    .el-date-editor.el-input {
    width: 100%;
    }
    .hide {
    display: none;
    }
    .txtC {
    text-align: center;
    }
    .el-col .el-col-8 span{
        width:90px;
        height:90px;
    }
    .el-col .el-col-8 span img{
        width:100%;
        height:100%;
    }
    .demo-ruleForm{
        width:50%;
        height:93%;
        overflow-y:scroll;
        position:fixed;
        top:5%;
        left:25%;
        border-radius:10px;
        border:1px solid #ccc;
        background:#fff;
        box-sizing:border-box;
        padding-right:100px;
    }
    .closeBtn{
        position:absolute;
        top:20px;
        right:20px;
        cursor:pointer;
    }
</style>