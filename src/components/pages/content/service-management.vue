<template>
	<div>
		<!--服务类型列表-开始-->
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
			<el-tab-pane label="全部项目" name="全部项目" index></el-tab-pane>
			<el-tab-pane label="日常保洁" name="日常保洁"></el-tab-pane>
			<el-tab-pane label="深度清洁" name="深度清洁"></el-tab-pane>
			<el-tab-pane label="保姆（到家做饭）" name="保姆（到家做饭）"></el-tab-pane>
			<el-tab-pane label="月嫂/育儿嫂" name="月嫂/育儿嫂"></el-tab-pane>
			<el-tab-pane label="家居清洗" name="家居清洗"></el-tab-pane>
			<el-tab-pane label="周期保洁" name="周期保洁"></el-tab-pane>
			<el-tab-pane label="企业保洁" name="企业保洁"></el-tab-pane>
			<el-tab-pane label="代办跑腿" name="代办跑腿"></el-tab-pane>
			<el-tab-pane label="家电清洗" name="家电清洗"></el-tab-pane>
			<el-tab-pane label="家庭安装及维修" name="家庭安装及维修"></el-tab-pane>
	  </el-tabs>
		<!--服务类型列表-结束-->
		<!--nav 开始-->
	  <div class="navs">
			<!--地址下拉框-开始-->
		  <el-col :span="3" class="cityStyle">
			<el-form :model="ruleForm" ref="ruleForm1" label-width="140px" class="demo-ruleForm1">
				<el-select v-model="ruleForm.city" placeholder="选择城市">
					<el-option label="上海" value="上海"></el-option>
					<el-option label="北京" value="北京"></el-option>
				</el-select>
			</el-form>
		  </el-col>
			<!--地址下拉框-结束-->
			<!--星期-开始-->
		  <el-col :span="7" align="right">
		  	<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-input v-model="formInline.service" placeholder="查询服务"></el-input>
				  <el-button type="primary" @click="onSubmit()">查询</el-button>
				</el-form>
		    </el-col>
		  <el-button  @click="onStyle">分类管理</el-button>
			<el-button  @click.stop="onServer">添加项目</el-button>
			<!--星期-结束-->
		</div>
		<!--nav 结束-->
		<!--分布表 开始-->
		<el-table
	     :data="tableDataList"
	     v-if="showTime"
	     border
	     style="width:100%">
	     <el-table-column
	       prop="sortNo"
	       label="排序号"
	       width="120%">
	     </el-table-column>
	     <el-table-column
	       prop="serviceimgurl"
	       label="图片"
	       width="120%">
		 	<img src="" alt="">
	     </el-table-column>
	     <el-table-column
	       prop="name"
	       label="项目名称"
	       width="120%">
	     </el-table-column>
	     <el-table-column
	       prop="priceUnit"
	       label="价格/单位"
	       width="120%">
	     </el-table-column>
	     <el-table-column
	       prop="platformkind"
	       label="平台分类"
	       width="120%">
	     </el-table-column>
	     <el-table-column
	       prop="filters"
	       label="筛选项"
	       width="120%">
	     </el-table-column>
	     <el-table-column
	       prop="city"
	       label="城市"
	       width="120%">
	     </el-table-column>
	     <el-table-column
	       prop="status"
	       label="状态"
	       width="120%">
	     </el-table-column>
	     <el-table-column
	       prop="sales"
	       label="销量"
	       width="120%">
	     </el-table-column>
	     <el-table-column label="操作">
	      <template slot-scope="scope">
				<div class="addphoto">
					<el-button
          size="mini" class="addphotofile"
          @click.stop="handleAdd(scope.$index, scope.row)">添加图片</el-button>
					<input type="file" size="mini" class="addphotoabso"
           value="添加图片" @change="getFile" ref="file" accept="image/*" v-if="resetDom"/>
				</div>
	        <el-button
	          size="mini"
			  prop="serviceid"
	          @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button
	          size="mini"
	          type="danger"
	          style="height:35px;"
	          @click.stop="handleDelete(scope.$index, scope.row,scope.$index)">删除</el-button>
	      </template>
	    </el-table-column> 
	  </el-table>
	
		<!--分布表 结束-->
		<div class="marsk" v-if="marskServer">
			<add-service ></add-service>
		</div>
		<div class="marsk" v-if="marskStyle">
			<add-style></add-style>
		</div>
		<div class="marsk" v-if="marskEditServer">
			<edit-service :girl-serverid="serverid"></edit-service>
		</div>				
	</div>
	
</template>
<script>
import addService from './add-service-management.vue'
import editService from './edit-service-management.vue'
import addStyle from './add-service-style.vue'
export default{
	data(){
		return{
			ruleForm:{
				city:""
			},
			shopid:'',
			marskStyle:false,
			marskServer:false,
			serverid:'999',//服务id
			marskEditServer:false,
			editEditServer:false,
			activeName2:"全部项目",
			modal1: false,
			showTime:true,
			file:"",
			resetDom: true,
			photo:"",
			photoList:[],
			sign:"",
			retryNum:0,
			httpResponse:null,
			sign:null,
			searchTableDataList:[],
			formInline:{
				service:''
			},
			tableData:[],//服务列表
			// tableData:[{
			// 	num: 1,
			// 	pic: '',
			// 	name: '允克存',
			// 	price:"3元/个",
			// 	oldprice:"￥120",
			// 	instore:"家居清洗",
			// 	terrace:"日常保洁",
			// 	filters:"iii",
			// 	city:"城市",
			// 	status:"上架",
			// 	sales:9
			// },{
			// 	num: 3,
			// 	pic: '',
			// 	name: '李国豪',
			// 	price:"5元/个",
			// 	oldprice:"￥120",
			// 	instore:"家居清洗",
			// 	terrace:"日常保洁",
			// 	filters:"",
			// 	city:"城市",
			// 	status:"上架",
			// 	sales:10
			// },{
			// 	num: 4,
			// 	pic: '',
			// 	name: '大家好',
			// 	price:"7元/个",
			// 	oldprice:"￥120",
			// 	instore:"家居清洗",
			// 	terrace:"保姆（到家做饭）",
			// 	filters:"",
			// 	city:"城市",
			// 	status:"上架",
			// 	sales:11
			// },{
			// 	num: 5,
			// 	pic: '',
			// 	name: '郝清振',
			// 	price:"8元/个",
			// 	oldprice:"￥120",
			// 	instore:"家居清洗",
			// 	terrace:"深度清洁",
			// 	filters:"",
			// 	city:"城市",
			// 	status:"上架",
			// 	sales:13
			// }]
		}
	},
	//组件创建前
	beforeCreate(){
		//获取服务种类--------------------
		//var _this=this;
		//getServerList()
		//function getServerList(){
		var _this=this;
		var userid=parseInt(sessionStorage.getItem("userid"));
		var shopid=parseInt(sessionStorage.getItem("shopid"));
		var phone=sessionStorage.getItem("phone");
		console.log('=77777777777777=========shopId==============',shopid)
		//----------获取项目类型分类接口方案------------------
		this.axios.get("/home/api/service/getplatformkind").then(function(res){
			var success=res.data.success;
			//项目类别
			var platformkind=res.data.data.platformkind;
			_this.platformkind=platformkind;
			
			if(success==true){
			console.log('======^^^__serverstyle类别^^^====请求item服务类型列表==============',res,platformkind)



				_this.$message.success('加载成功');
				//console.log('==========请求item列表==============',res)
			}else{
				_this.$message.error('加载失败');
			}				
		},function(){
			_this.$message.error('加载失败');
		});
		//};
		//获取服务信息-----------------------
		//getServerItems();
		//function getServerItems(){
		//var _this=this;
		/////var userid=parseInt(sessionStorage.getItem("userid"));
		/////var phone=sessionStorage.getItem("phone");
		//----------获取项目类型分类接口方案------------------
		try{
			//_this.shopid=parseInt(sessionStorage.getItem("shopid"))
			var shopid=parseInt(sessionStorage.getItem("shopid"));
			
			console.log('==========请求获取item服务列表=shopid=YE============',shopid)
			let config = {
				headers: {'Content-Type': 'multipart/form-data'}
			}
			this.axios.get("/home/api/service/get?shopid="+shopid).then(function(res){
				var datad=res.data.data;
				if(res.data.success==true){
					//console.log('==========请求服务item列表==============',data)
					var serverItems=[];
					for(var i=0; i<datad.length; i++){
						var serverItem={};
						for(var name in datad[i]){
							serverItem[name]=datad[i][name];
						}
						serverItem.priceUnit=''+serverItem.price+'元/'+serverItem.unit;
						serverItems.push(serverItem);
						_this.tableData=serverItems;
						//这里写一下
					}
					console.log('=====HHHHH=====serverItems==============',serverItems,datad,_this.tableData)
					_this.$message.success('加载成功YE');
				}else{
					_this.$message.error('加载失败YE');
				}
			},function(){
				_this.$message.error('加载失败YE');
			})
		}catch(err) {
			//this.retryGetSign();
			_this.shopid=parseInt(sessionStorage.getItem("shopid"))
			var shopid=parseInt(sessionStorage.getItem("shopid"))||_this.shopid;
		}
		//}
	},
	// updated(){
	// 	@update:bar="e => foo = e"
	// },
	//计算属性
	computed:{
		tableDataList(){
			if(this.activeName2=="全部项目"){
				return this.tableData;
			}else{
				return this.tableData.filter((item)=>{
					return item.terrace==this.activeName2;
				})
			}					
		}
	},
	//接收子事件
	mounted(){
		var _this=this;
		this.$bus.$on("closeStyle",function(data){
			_this.marskStyle=false;
			//console.log('}}}}');
		})
		this.$bus.$on("closeServer",function(data){
			_this.marskServer=false;
		})			
		this.$bus.$on("closeEditServer",function(data){
			_this.marskEditServer=false;
		})
	},
	// beforeDestroy(){
    // 	this.$bus.$off("broadServerId");
    // },
	// beforeDestroy(){
	// 	this.$bus.$off("closeStyle");
	// 	this.$bus.$off("closeServer");
	// 	this.$bus.$off("closeEditServer");
	// },
	//添加服务，编辑服务,添加类型,
	components:{
		addService,
		editService,
		addStyle
	},
	//以下是方法
	methods:{
		//
		onSubmit(list){
			if(this.formInline.service==""){
			this.$message.error('内容不能为空');
			}else{
				this.showTime=false;
				this.searchTableDataList=[];
				this.tableData.filter((item)=>{
					if(item.terrace.indexOf(this.formInline.service)==0){
						this.searchTableDataList.push(item)
					}
				})
			}
		},
		//添加类型
		onStyle(){
			this.marskStyle=true;
		},
		//添加项目
		onServer(){
			this.marskServer=true;
		},
		//修改服务类型
		handleEdit(index,row){
			this.marskEditServer=true;
			//serviceid
			//this.$bus.$emit("broadServerId",serverid); 
			//this.$bus.$emit("broadServerId",row);
			//sessionStorage.setItem('row',row);
			this.serverid=row.serverid;
			console.log('(5)(6)(7)',index,row,row.serviceid);
		},
		//删除服务类型
		handleDelete(index, row) {
			console.log(index, row);
		},
		//点击筛选
		handleClick(tab, event) {
			this.showTime=true;
		},
		//
		submitForm1(){
			this.marskBox=false;
		},
		handleAdd(index,row){
			this.$refs.file.click(index);
		},
		getFile(e,index){
			this.file = e.target.files[0];
			this.getsign(index);
		},
		getsign(index){
			try{
				var _this=this;
				var httpResponse,sign;
				this.axios.get("/home/api/getsign").then(function(res) {
					_this.httpResponse=res.data.success;
					_this.sign=res.data.data.sign;
					if(_this.httpResponse){
						_this.uploadWithSign(_this.sign,index);
						//_this.getsignNum = 0;
					}else{
						_this.retryGetSign()
					}
				})
			}catch(error){
				this.retryGetSign();
			}
		},
		
		//图片上传
		uploadWithSign(sign,index){
			if(!this.file){
				return;
			}
			var _this;
			let formData = new FormData();
			formData.append("FileContent", this.file);
			
			//try开始
			try{
				var _this=this;
				let config={
						headers:{'Content-Type':'multipart/form-data'}
				}
				this.$http.post("https://web.image.myqcloud.com/photos/v2/10061631/coach/0/?sign=" +_this.sign,
					formData,config
					
				).then(function(res){
					if(data.data.code==0){
						
						//console.log(data.data.data.download_url)
						if(!_this.photoList){
							_this.photoList=[];
						}else if(_this.photoList.length>4){
							_this.$message.error('最多添加五张照片');
							return;
						}
						_this.tableData[0].pic = res.data.data.download_url;
						_this.photoList.push(res.data.data.download_url);
						_this.$message.success("添加成功");

					}else{
						_this.retryGetSign();
					}
				},function(){
					_this.retryGetSign();
				})
			}catch(error){
				this.retryGetSign();
			}
			//try结束
		},
		retryGetSign(){
			this.retryNum++;
			if(this.retryNum<5){
				this.getsign();
			}else{
				this.retryNum = 0;
				this.$message({
					message: "图片上传失败!",
					type: "warning"
				});
			}
		}
	}
	//方法结束	
};
</script>
<style scoped>
.navs>*{
	height: 40px;
}
.el-tabs .el-tabs--border-card,.el-tabs__header{
	height: 55px;
}.el-tabs__nav-next, .el-tabs__nav-prev,.el-tabs__header{
	line-height: 55px;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
	height: 50px;
}
.el-tabs--border-card>.el-tabs__header{
	background: #f2f2f2;
	height: 55px;
	line-height: 58px;
}
.el-tabs__item.is-active{
	color: #111;
	font-weight: 600;
}
.el-tabs__item{
	color: #48576a;
}
.el-tabs--border-card>.el-tabs__content{
	padding:0;
}
.demo-form-inline{
	display: flex;
}
.demo-form-inline input{
	width:80%;
}
.demo-form-inline button{
	width:60px;
}
.el-table__header,.el-table__body{
	width:100%;
}
.el-button--default,.el-button--primary{
	background: #FF965D;
	color: #fff;
	border:none;
	height:35px;
}
.el-button--default:hover,.el-button--primary:hover{
	background: #D1DBE5;
	border-color: #999;
	
}
.el-button--default{
	margin-left:30px;
}
.navs{
	height:40px;
}

.el-dropdown,.el-button--primary{
	width: 100%;
}
.marsk{
	position: fixed;
	width: 100%;
	height:100%;
	background: rgba(0,0,0,.4);
	z-index: 99999;
	top: 0;
	left: 0;
}
.el-table .cell input{
	width:70px;
	height:33px;
	background:#fff;
	color:#999;
	border:1px solid #999;
	border-radius:5px;

}
.addphoto{
	position:relative;
	display:inline-block;

}
.addphotoabso{
	position:absolute;
	left:15px;
	top:0;
	opacity:0;
}
.demo-ruleForm1{
	margin:0;
}
.cityStyle{
	margin-right:20px;
	margin-top:0;
}
</style>