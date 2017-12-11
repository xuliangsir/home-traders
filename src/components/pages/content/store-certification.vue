<template>
	<el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="140px" class="demo-ruleForm1">
	  <h3>企业基础信息</h3>
	  <el-form-item label="营业执照名称" prop="gszz">
	    <el-input v-model="ruleForm1.gszz"></el-input>
	  </el-form-item>
	  <el-form-item label="选择主体类型" prop="region">
	    <el-select v-model="ruleForm1.region" placeholder="选择主体类型">
	      <el-option label="公司" value="公司"></el-option>
	      <el-option label="个人" value="个人"></el-option>
	    </el-select>
	  </el-form-item>
		<el-form-item label="营业执照扫描图" prop="gszzchart">
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
	  <el-form-item label="统一社会信用代码" prop="credit">
	    <el-input v-model="ruleForm1.credit"></el-input>
	  </el-form-item>
	  <el-form-item label="营业执照注册号" prop="registration">
	    <el-input v-model="ruleForm1.registration"></el-input>
	  </el-form-item>
	  <el-form-item label="注册地址" prop="address">
	    <el-input v-model="ruleForm1.address"></el-input>
	  </el-form-item>
	  <el-form-item label="法定代表人" prop="representative">
	    <el-input v-model="ruleForm1.representative"></el-input>
	  </el-form-item>
	   <el-form-item label="营业期限">
	    <div class="block">
		    <el-date-picker
		      v-model="value1"
		      style="width:239px;"
		      type="date"
		      placeholder="选择日期">
		    </el-date-picker>
		    至
		    <el-date-picker
		      v-model="value2"
		      style="width:239px;"
		      type="date"
		      placeholder="选择日期">
		    </el-date-picker>				
		  </div>
	  </el-form-item>
	  <h3>商家指定联系人信息</h3>
		<el-form-item label="联系人身份证照片" prop="playname">
			<el-row>
				<el-col :span="24">
					<span v-for="item in photoList1" class="photou">
						<img :src="item" alt="">
					</span>
					<img src="" alt="" class="imgUpload" @click="checkImg1">
					<input type="file" class="hide" @change="getFile1" ref="file1" accept="image/*" v-if="resetDom1">
				</el-col>
			</el-row>
		</el-form-item>
	  <el-form-item label="制定联系人姓名" prop="linkman">
	    <el-input v-model="ruleForm1.linkman"></el-input>
	  </el-form-item>
	  <el-form-item label="联系人身份证号码" prop="idcard">
	    <el-input v-model="ruleForm1.idcard"></el-input>
	  </el-form-item>
	  <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm1')">保存</el-button>
    </el-form-item>
	</el-form>
</template>
<script>
import uploader from './uploader.vue'
export default {
    data() {
    return {
			file:"",
			file1:"",
			resetDom: true,
			photoList:[],
			sign:"",
			retryNum:0,
			httpResponse:null,
			sign:null,
			resetDom1: true,
			photoList1:[],
			sign1:"",
			retryNum1:0,
			httpResponse1:null,
			sign1:null,
        	ruleForm1: {
						photo:'',//店铺相册
						photo1:'',
		        gszz: '',
		        region: '个人',
		        credit: '',
		        registration :'',
		        address :'',
		        subjectStyle :'',
		        seat :'',
		        seat1 :'',
		        representative :'',
		        linkman :'',
		        idcard: '',
		        date1: '',
		        date2: '',
		        deadline:'',
		        delivery: false
	        },
	        form:{
	        	date1:"",
	        	date2:""
	        },
	        value1:'',
	        value2:'',
	        value3: [new Date(), new Date()],
					value4: '',
	        rules: {
	          gszz: [
	            { required: true, message: '请输入店铺名称', trigger: 'blur' }
	          ],
	          region: [
	            { required: true, message: '请选择活动区域', trigger: 'change' }
	          ],
	          date1: [
	            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          ],
	          date2: [
	            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
	          ],
	          type: [
	            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
	          ],
	          resource: [
	            { required: true, message: '请选择活动资源', trigger: 'change' }
	          ],
	          desc: [
	            { required: true, message: '请填写活动形式', trigger: 'blur' }
	          ],
	          address:[
	          	{required:true,message:"请输入注册地址",trigger:'blur'}
	          ],
	          seat:[
	          	{required:true,message:"请选择区域",trigger:'blur'}
	          ],
	          seat1:[
	          	{required:true,message:"请选择区域",trigger:'blur'}
	          ],
	          representative:[
	          	{required:true,message:"请输入法定代表人",trigger:'blur'}
	          ],
	          deadline:[
	          	{required:true,message:"请选择营业期限",trigger:'blur'}
	          ],
	          representative:[
	          	{required:true,message:"请输入注册地址",trigger:'blur'}
	          ],
	          linkman:[
	          	{required:true,message:"请输入联系人姓名",trigger:'blur'}
	          ],
	          idcard:[
	          	{required:true,message:"请输入联系人身份证号码",trigger:'blur'}
	          ]
	        }
	      }
	    },
    	beforeCreate(){
	    	var _this=this;
	    	var userid=parseInt(sessionStorage.getItem("userid")) ;
	    	var phone=sessionStorage.getItem("phone");
	    	this.$http.get("/home/api/getshopcertifyInfo?userid="+userid+"&phone="+phone).then(function(res) {
				if(res.data.success==true){					
					var datad=res.data.data;
					console.log('-------------%%%获取店铺认证店铺认证接口调试----------------',datad,userid,phone)
					if(datad.userid){
						sessionStorage.setItem("userid",datad.userid);
					}
					if(datad.id){
						sessionStorage.setItem("id",datad.id);
					}
					if(datad.phone){
						sessionStorage.setItem("phone",datad.phone);
					}
					if(datad.type==0){
						var type="公司";
					}else{
						var type="个人";
					}
					
							_this.photoList=datad.licenceurl,
							_this.photoList1=datad.identitycardphoto,
							_this.ruleForm1.gszz=datad.licencename;
							var mtype=datad.type;
							if(mtype==0){
								_this.ruleForm1.region='公司';
							}else if(mtype==1){
								_this.ruleForm1.region='个人';
							}
							
							_this.ruleForm1.credit=datad.creditcode;
							_this.ruleForm1.registration=datad.licenceregnum;
							_this.ruleForm1.address=datad.registaddress;
							_this.ruleForm1.seat=datad.licencelocation;
							_this.ruleForm1.representative=datad.legalentity;
							_this.value1=datad.limittimebegin;
							_this.value2=datad.limittimeend;
							_this.ruleForm1.linkman=datad.name;
							_this.ruleForm1.idcard=datad.identitycardnum;
							_this.$message.success('加载成功……');
				}else{
					_this.$message.error('加载失败...');
				}

	        },function(){
	        	_this.$message.error('加载失败');
	        })
	    },
	    components:{
			uploader
		},
	    methods:{
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	        if(valid){
	          	var _this=this;
							var userid=parseInt(sessionStorage.getItem("userid")) ;
							var phone=sessionStorage.getItem("phone");
							console.log(userid,phone)
							if(_this.ruleForm1.region=="公司"){
								var mtype=0;
							}else if(_this.ruleForm1.region=="个人"){
								var mtype=1;
							}
							//console.log(_this.photoList)
							//console.log(_this.photoList1)
							var params={
										userid:userid,
										phone:phone,
										licencename:_this.ruleForm1.gszz,
										type:mtype,
										licenceurl:_this.photoList,
										creditcode:_this.ruleForm1.credit,
										licenceregnum:_this.ruleForm1.registration,
										registaddress:_this.ruleForm1.address,
										licencelocation:_this.ruleForm1.seat,
										legalentity:_this.ruleForm1.representative,
										limittimebegin:_this.value1,
										limittimeend:_this.value2,
										identitycardphoto:_this.photoList1,
										name:_this.ruleForm1.linkman,
										identitycardnum:_this.ruleForm1.idcard
								}
							_this.$http.post("/home/api/addshopcertifyInfo",params).then(function(res) {
		        	


							console.log('--------%%%%%%%%%%%%%提交认证----------',params,res);

							_this.$message.success('保存成功');




		        },function(){
		        	_this.$message.error('保存失败');
		        })
	          } else {
							_this.$message.error('保存失败');
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      },
	      resetForm(formName) {
	        this.$refs[formName].resetFields();
	      },
	      handleAvatarSuccess(res, file) {
	        this.imageUrl = URL.createObjectURL(file.raw);
	      },
			//相册部分
		    checkImg(){
		      this.$refs.file.click();
		    },
		    getFile(e){
		      this.file = e.target.files[0];
		      this.getsign();
		    },
		    async getsign(){
		    try {
				var _this=this;
				var httpResponse,sign;
					await _this.axios.get("/home/api/getsign").then(function(data) {
					_this.httpResponse=data.data.success;
					_this.sign=data.data.data.sign;
						if(_this.httpResponse){
								_this.uploadWithSign(_this.sign);
							//_this.getsignNum = 0;
						}else{
								_this.retryGetSign()
						}
			         })
		        } catch (error) {
		          this.retryGetSign();
			    }
			},
			uploadWithSign(sign) {
				if (!this.file) {
						return;
				}
				var _this=this;
				let formData = new FormData();
				formData.append("FileContent",_this.file);
				console.log('--------图片上传的format-----------',formData);
				try {
						var _this=this;
						let config = {
								headers: {'Content-Type': 'multipart/form-data'}
						}
						
						this.$http.post("https://web.image.myqcloud.com/photos/v2/10061631/coach/0/?sign="+_this.sign,
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
										//_this.ruleForm.serviceimgurl=_this.photoList[0];
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
		    retryGetSign() {
		      this.retryNum++;
		      if (this.retryNum < 5) {
		        this.getsign();
		      } else {
		        this.retryNum = 0;
		        this.$message({
		          message: "图片上传失败!",
		          type: "warning"
		        });
		      }
		    },
				//身份证照片
		    checkImg1() {
		      this.$refs.file1.click();
		    },
		    getFile1(e) {
		      this.file1 = e.target.files[0];
		      this.getsign1();
		    },
		    getsign1() {
		      try {
				var _this=this;
					this.axios.get("/home/api/getsign").then(function(data) {
					_this.httpResponse1=data.data.success;
					_this.sign1=data.data.data.sign;
						if(_this.httpResponse1){
								_this.uploadWithSign1(_this.sign1);
							//   _this.getsignNum = 0;
						}else{
								_this.retryGetSign1()
						}
			    })
		      } catch (error) {
		        this.retryGetSign1();
		      }
		      },
				uploadWithSign1(sign) {
					if (!this.file1) {
							return;
					}
					var _this=this;
					let formData = new FormData();
					formData.append("FileContent", this.file1);
					try {
							
							let config = {
									//headers: {'X-Requested-With': 'XMLHttpRequest'},
									headers: {'Content-Type': 'multipart/form-data'}
							}
							_this.$http.post("https://web.image.myqcloud.com/photos/v2/10061631/coach/0/?sign=" +_this.sign,
								formData,config
							).then(function(data) {
										// if(data.data.code==0){
										// 	//  console.log(data.data.data.download_url)
										// 	_this.ruleForm1.photo = data.data.data.download_url;
										// 	if(!_this.photoList1){
										// 		_this.photoList1=[];
										// 	}else if(_this.photoList1.length>4){
										// 		_this.$message.error('保存失败');
										// 		return;
										// 	}else{
										// 		_this.photoList1.push(data.data.data.download_url);
										// 	}
											
										// }else{
										// 		_this.retryGetSign();
										// }
										if(data.data.code==0){
											if(!_this.photoList1){
												_this.photoList1=[];
											}else if(_this.photoList1.length>4){
												_this.$message.error('最多五张照片');
												return;
											}
											// console.log(_this.photoList1)
											_this.ruleForm1.photo1 = data.data.data.download_url;
											_this.photoList1.push(data.data.data.download_url);
										}else{
												_this.retryGetSign1();
										}
					},function(){
										_this.retryGetSign1();
								})
					} catch (error) {
							this.retryGetSign1();
					}
				},
		    retryGetSign1() {
		      this.retryNum++;
		      if (this.retryNum < 5) {
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
	.demo-ruleForm1{
		margin: 20px 0 0 20px;
	}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  h3{
  	line-height: 40px;
  	margin-left: 15px;
  
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