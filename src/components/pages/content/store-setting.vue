<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- 店铺相册 -->
        <el-form-item label="店铺相册">
            <el-row>
                <el-col :span="24">
                    <span v-for="item in photoList" class="photou">
                       <img :src="item" alt="">
                    </span>
                    <img src="" alt="" class="imgUpload" @click="checkImg">
                    <input type="file" class="hide" @change="getFile" ref="file" accept="image/*" v-if="resetDom">
                </el-col>
            </el-row>
        </el-form-item>
        <!-- 订购须知 -->
        <el-form-item label="订购须知">
            <el-input type="textarea" v-model="ruleForm.msg" :autosize="{ minRows: 2, maxRows: 10 }"></el-input>
        </el-form-item>
        <!-- 商家简介 -->
        <el-form-item label="商家简介">
            <el-input type="textarea" v-model="ruleForm.shop_info" :autosize="{ minRows: 2, maxRows: 10 }"></el-input>
        </el-form-item>
        <!-- 客服电话 -->
        <el-form-item label="客服电话">
            <el-input suffix-icon="el-icon-date" v-model="ruleForm.tel" class='inpwidth'>
            </el-input>
        </el-form-item>
        <!-- 服务时间-->
        <el-form-item label="服务时间" required>
            <div class="block">
            	<el-time-select
            		style="width:239px;"
				    placeholder="起始时间"
				    v-model="value1"
				    :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '24:00'
				    }">
				  </el-time-select>
		               至
		    	<el-time-select
				    placeholder="结束时间"
				    style="width:239px;"
				    v-model="value2"
				    :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '24:00'
				    }">
				</el-time-select>
		  </div>
        </el-form-item>
        <!--星期-开始-->
        <el-form-item label="服务时间">
        	<el-checkbox-group v-model="checkboxGroup1" class="area_box">
                <el-checkbox-button v-for="item in weeked" :label="item" :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>           
        </el-form-item>
        <!--地方-开始-->
        <el-form-item label="服务范围">
        	<el-checkbox-group v-model="checkboxGroup2" class="area_box">
                <el-checkbox-button v-for="item in cities" :label="item" :key="item">{{item}}</el-checkbox-button>
            </el-checkbox-group>           
        </el-form-item>
        <!-- 最低起购金额-->
        <el-form-item label="最低起购金额">
            <el-input v-model="ruleForm.min_price" placeholder="满足最低起购金额方可服务（元）" class='inpwidth'></el-input>
        </el-form-item>
        <!-- 附加费-->
        <el-form-item label="附加费">
            <el-input v-model="ruleForm.other_price" placeholder="上门费或其他额外费用（元）" class='inpwidth'></el-input>
        </el-form-item>
        <!-- 免附加费起购金额-->
        <el-form-item label="免附加费起购金额">
            <el-input v-model="ruleForm.no_other_min_price" placeholder="上门费或其他额外费用（元）" class='inpwidth'></el-input>
        </el-form-item>
        <!-- 提前预约-->
        <el-form-item label="提前预约">
            <el-input v-model="ruleForm.time" placeholder="用户预约时间须大于下单时间的间隔小时数，必须是0.5的整倍数（小时）" class='inpwidth'></el-input>
        </el-form-item>
        <!-- 保存 -->
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default{
        data(){
            return{
                checkboxGroup1:["周一","周日"],
                checkboxGroup2:["北京","上海","广州","杭州","深圳"],
            	resetDom:true,
        		value1: '',
        		value2: '',
        		sign:"",
                file:null,
                retryNum:0,
                httpResponse:null,
                sign:null,
                photoList:[],
                cities:["北京","上海","广州","杭州","深圳"],
                weeked:["周一","周二","周三","周四","周五","周六","周日"],
                ruleForm:{
                    name: '',//店铺名称
                    photo:'',//店铺相册
                    msg: '', //订购须知
                    shop_info: '',//商家简介
                    tel: '', //客服电话
                    start_time: '', //开始时间
                    end_time: '', //结束时间
                    no_other_min_price: '', //免附加费最低起购金额
                    min_price: '', //最低起购金额
                    other_price: '', //附加费
                    time: '', //提前预约时间
                    sd:'',//上单小程序
                    qd:'',//抢单模式
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
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
                    type:[{
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }],
                    resource:[{
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }],
                    desc:[{
                        required: true,
                        message: '请输入商家简介',
                        trigger: 'blur'
                    }],
                    phone:[{
                        required: true,
                        message: '请输入客服电话',
                        trigger: 'blur'
                    }],
                    shop_info: [{
                        required: true,
                        message: '请输入商家简介',
                        trigger: 'blur'
                    }]
                },
		        value3: [new Date(), new Date()],
		        value4: '',
                photoList:[]
            };
        },
        beforeCreate(){
        	//页面加载之前请求数据
	    	var _this=this;
	    	var userid=parseInt(sessionStorage.getItem("userid"));
	    	var phone=sessionStorage.getItem("phone");
            console.log('-----------999999店铺设置ajax请求前-------------');
	    	this.$http.get("/home/api/getshopsetupinfo?userid="+userid+"&phone="+phone).then(function(res) {
                var datad=res.data.data;                
                console.log('-----------））））-店铺设置ajax请求成功-------------',res);
                if(res.data.success==true){                    
                    if(datad.userid){
                        sessionStorage.setItem("userid",datad.userid);
                    }
                    if(datad.id){
                        sessionStorage.setItem("id",datad.id);
                    }
                    if(datad.phone){
                        sessionStorage.setItem("phone",datad.phone);
                    }
                    // if(datad.album.length){
                    //     _this.ruleForm.photo=datad.album[0];
                    // }
                    console.log(datad)
                    if(datad.album.length>=1){
                        _this.photoList=datad.album;
                        
                    }else{
                        _this.photoList=[];
                    }
                    _this.ruleForm.time=datad.appointmenttime;
                    _this.ruleForm.min_price=datad.attachcost;
                    _this.ruleForm.other_price=datad.exemptattachcost;
                    _this.ruleForm.no_other_min_price=datad.minorderlimit;
                    _this.ruleForm.name=datad.name;
                    _this.ruleForm.msg=datad.orderattention;
                    _this.ruleForm.tel=datad.servicemobile;
                    _this.value1=datad.servicetimebegin;
                    _this.value2=datad.servicetimeend;
                    _this.ruleForm.shop_info=datad.shopintro;
                    //郝清振
                    var arr1=[];
                    for(var i=0; i<datad.week.length; i++){
                        if(datad.week[i]){
                            arr1.push(datad.week[i]);
                        }                        
                    }
                    var arr2=[];
                    for(var i=0; i<datad.servicerange.length; i++){
                        if(datad.week[i]){
                            arr2.push(datad.servicerange[i]);
                        }
                    }
                    _this.checkboxGroup1=arr1;
                    _this.checkboxGroup2=arr2;
                    _this.$message.success('加载成功-');
                }else{
                   //console.log(res.error);
                   _this.$message.error('加载失败-');
                }
	        },function(){
	        	_this.$message.error('加载失败-');
	        })
	    },
        methods:{
        	//点击提交
            submitForm(formName){
                this.$refs[formName].validate((valid)=>{
                    if (valid){
                        var _this=this;
				    	var userid=parseInt(sessionStorage.getItem("userid"));
				    	var phone=sessionStorage.getItem("phone");
                        let config = {
                            headers: {'Content-Type': 'multipart/form-data'}
                        }
                        console.log(sessionStorage.getItem("userid"));
                        console.log("===========",sessionStorage);
                        console.log('999999999999星期77799999999',_this.checkboxGroup1);
                        console.log('999999999999地方77799999999',_this.servicerange);
                        //alert(1);
                        // this.axios.post("http://web.image.myqcloud.com/photos/v2/10061631/coach/0/?sign=" +_this.sign,
                        // formData,config
                        var params={
				    		userid:userid,
				            phone:phone,
				            name:_this.ruleForm.name,
				            album:_this.photoList,
				            orderattention:_this.ruleForm.msg,
				            shopintro:_this.ruleForm.shop_info,
				            servicemobile:_this.ruleForm.tel,
				            servicetimebegin:_this.value1,
				            servicetimeend:_this.value2,
				            week:_this.checkboxGroup1,
				            servicerange:_this.checkboxGroup2,
				            minorderlimit:_this.ruleForm.no_other_min_price,
				            attachcost:_this.ruleForm.min_price,
				            exemptattachcost:_this.ruleForm.other_price,
				            appointmenttime:_this.ruleForm.time,
				        }
				    	_this.axios.post("/home/api/addshopsetupinfo",params).then(function(res){
                            //var _this=this;
                            //alert(res);
                            console.log('--^^^%%%&&&&^^--保存或提交店铺设置成功钱----ajax----------',params,res.data);
                            //如果是返回成功
                            if(res.data.success==true){
                                _this.$message.success('保存成功-');
                                console.log('--^^^%%%&&&&^^--保存或提交店铺设置成功----成功----------',params,res.data);
                            //alert('成功!!');
                            //如果是返回失败
                            }else{
                                _this.$message.error('保存失败-');
                                //console.log('失败了777',_this.checkboxGroup1,res.data);
                            }
                            //获取以下新的刷新数据
				        },function(res){
				        	_this.$message.error('保存失败-');
                            console.log('保存失败-',res);
                            //alert();
				        })
                    } else {
                        _this.$message.error('保存失败');
                        alert(44);
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
		    //相册部分
		    checkImg(){
		      this.$refs.file.click();
		    },
		    getFile(e){
		      this.file = e.target.files[0];
              console.log('==++=GET郝清振====',this.file);
		      this.getsign();
		    },
		    getsign(){
		      try {
                 var _this=this;
                 //var httpResponse,sign;
                    _this.axios.get("/home/api/getsign").then(function(res) {
                        console.log('-----------%%%%%%%token--ajax请求成功-------------',res);
   			            //_this.httpResponse=res.data.success;
   			           
                          if(res.data.success==true){
                              _this.sign=res.data.data.sign;
                              _this.uploadWithSign(_this.sign);
                              console.log('-----------666666获取token--ajax请求成功-------------',_this.sign);
                            //   _this.getsignNum = 0;
                          }else{
                              _this.retryGetSign()
                          }
			         })
		      } catch (error){
		        this.retryGetSign();
                console.log('-----------666666获取token-ajax请求失败-------------');
		      }
		    },
            uploadWithSign(sign){
                var _this=this;
                if (!this.file){
                    return;
                }
                var formData = new FormData();
                formData.append("FileContent",this.file);
                console.log('&&&TTTTTTT&&&&&&&&&&&&图片容器',formData,'&&&TTTTTTT&&&&&&&&&&&&图片容器');
                try {
                    var _this=this;
                    let config = {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                    this.$http.post("https://web.image.myqcloud.com/photos/v2/10061631/coach/0/?sign=" +_this.sign,
                     formData,config
                    ).then(function(res){
                         //console.log('---999999---formData上传格式----------',formData);
                         console.log('000000000图片上传2000000000',res);
                         if(res.data.code==0){
                            //console.log(data.data.data.download_url)
                            _this.ruleForm.photo = res.data.data.download_url;
                            _this.photoList.push(_this.ruleForm.photo);
                            console.log(_this.photoList)
                            console.log('-----------图片上传-----------',_this.ruleForm.photo);
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
    width: 200px;
    height: 200px;
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
</style>