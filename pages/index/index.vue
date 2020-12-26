<template>
	<view class="index-container">
		<listing :list="fetchDataList" />
		<view class="bottomLoad">{{loadText}}</view>
	</view>
</template>


<script>
	import {Request} from '../../utils/request.js'
	const request = new Request()
	
	export default {
		data() {
			return {
				loadText:'加载中...',
				page:1,
				fetchDataList:[]
			}
		},
		onLoad() {

		},
		
		created(){
			this.fetchData()
		},
		
		methods: {
			fetchData(){
				request.post({
					url:'menu/list',
					data:{
						page:this.page
					},success:res =>{
						res.data.forEach((item)=>{
							item.menu = item.menu.split('，')
						})
						this.loadText = '没有更多了'
						uni.stopPullDownRefresh();
						this.fetchDataList = this.fetchDataList == '' ? res.data : this.fetchDataList.concat(res.data)
					}
				})
			}
		},
		
		onPullDownRefresh() {
			this.fetchDataList = []
			this.loadText = '加载中...'
			this.page = 1
			this.fetchData()
		},
		
		onReachBottom() {
			this.loadText = '加载中...'
			this.page = this.page + 1
			this.fetchData()
		}
	}
</script>

<style>
	.index-container{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}
	.bottomLoad{
		font-size: 26rpx;
		color: #ddd;
		margin: 20rpx auto;
	}
</style>
