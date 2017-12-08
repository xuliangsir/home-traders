import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'
//登录家之圈
import accountSetting from '@/components/pages/content/account-setting'
import orderManagement from '@/components/pages/content/order-management'
import serviceManagement from '@/components/pages/content/service-management'
import storeCertification from '@/components/pages/content/store-certification'
import storeSetting from '@/components/pages/content/store-setting'

//账户设置
import storeSettingMessage from '@/components/pages/content/account-setting/account-setting-message'
import storeSettingWxlogin from '@/components/pages/content/account-setting/account-setting-wxlogin'
import storeSettingUpdate from '@/components/pages/content/account-setting/account-setting-update'



Vue.use(Router)


export default new Router({
    routes: [
    	{
	        path: '/',
	        name: 'login',
	        component: login
	    }, 
	    {
	        path: '/main',
	        name: 'main',
	        component: main,
	        children: [{
	            path: '/',
	            name: 'storeSetting',
	            component: storeSetting
	        },{
	            path: 'storeSetting',
	            name: 'storeSetting',
	            component: storeSetting
	           
	        },{
	            path: 'orderManagement',
	            name: 'orderManagement',
	            component: orderManagement
	        },{
	            path: 'serviceManagement',
	            name: 'serviceManagement',
	            component: serviceManagement
	        },{
	            path: 'storeCertification',
	            name: 'storeCertification',
	            component: storeCertification
	        },{
	            path: 'accountSetting',
	            name: 'accountSetting',
	            component: accountSetting,
	            children:[{
	            	path:'/',
	            	name:'storeSettingMessage',
	            	component:storeSettingMessage
	            },{
	            	path:'storeSettingMessage',
	            	name:'storeSettingMessage',
	            	component:storeSettingMessage
	            },{
	            	path:'storeSettingWxlogin',
	            	name:'storeSettingWxlogin',
	            	component:storeSettingWxlogin
	            },{
	            	path:'storeSettingUpdate',
	            	name:'storeSettingUpdate',
	            	component:storeSettingUpdate
	            }]
	        }]
	    }
	]
})