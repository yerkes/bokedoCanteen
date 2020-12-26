<template>
	<view class="order-container">
		
		<w-picker
			:visible.sync="halfVisible"
			mode="half" 
			startYear="2020" 
			endYear="2021"
			value="2018-02-11 下午"
			:current="true"
			@confirm="onConfirm($event,'half')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="half" 
		></w-picker>
		
		<w-picker
			:visible.sync="selectorVisible"
			mode="selector"
			value=""
			default-type="name"
			:default-props="defaultProps"
			:options="selectorList"
			@confirm="onConfirm($event,'selector')"
			@cancel="onCancel"
			ref="selector" 
		></w-picker>
		
		<uni-forms :value="formData" ref="form">
			<uni-forms-item label="时间" name="mealtime">
				<uni-easyinput type="text" @focus="halfVisible=true" v-model="formData.mealtime" placeholder="请选择时间" />
			</uni-forms-item>
		    <uni-forms-item label="人数" name="number">
		        <uni-easyinput type="number" v-model="formData.number" placeholder="请输入人数" />
		    </uni-forms-item>
			<uni-forms-item label="菜单" name="menu">
			    <uni-easyinput type="textarea" @focus="selectorVisible=true" v-model="formData.menu" placeholder="请选择菜单" />
			</uni-forms-item>
		    <button @click="submitForm">提交</button>
		</uni-forms>
		
	</view>
	
</template>	

<script>
	import {Request} from '../../utils/request.js'
	const request = new Request()
	
	export default {
		data() {
			return {
				isRequest:false,
				halfVisible:false,
				selectorVisible:false,
				formData:{
				    number:'',
					mealtime:'',
					menu:''
				},
				defaultProps:{
					label:"name",
					value:"id"
				},
				selectorList:[
					{
						name:"炒土豆片，炒面筋，红烧鸡翅根",
						id:"1"
					},{
						name:"木耳炒鸡蛋，白灼生菜，红烧肉",
						id:"2"
					},{
						name:"炒空心菜，辣椒炒香干，烧带鱼",
						id:"3"
					}
				]
			};
		},
		methods:{
			onConfirm(res,type){
				console.log(res)
				if(type == 'half') this.formData.mealtime = res.result
				if(type == 'selector') this.formData.menu = res.result
			},
			onCancel(){
				
			},
			submitForm(form) {
			    // 手动提交表单
				if(this.isRequest) return
			    this.$refs.form.submit().then((res)=>{
			        console.log('表单返回得值：', res)
					if(res.mealtime && res.number && res.menu){
						this.isRequest = true
						request.post({
							url:'menu/add',
							data:{
								data:this.formData
							},success:res=>{
								this.isRequest = false
								uni.showToast({
									title:'提交成功'
								})
								this.clearFromData()
							},error:res=>{
								this.isRequest = false
							}
						})
					}else{
						uni.showToast({
							title:"不能为空",
							icon:'none'
						})
					}
			    })
			},
			clearFromData(){
				for(var key in this.formData){
					this.formData[key] = null
				}
			}
		}
	}
</script>

<style>
	
</style>
