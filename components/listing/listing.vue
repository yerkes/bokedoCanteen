<template>
	<view class="listing-container">
		<view class="listing-body" v-for="item in list">	
			<view>
				<text space="ensp">{{item.mealtime}}</text>
				<text>用餐人数：{{item.number}}</text>
			</view>
			<view>
				<text v-for="(menu,index) in item.menu">{{index+1}}、{{menu}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list: {
					type: Array,
					default () {
						return []
					}
				},
		},
		mounted() {
			console.log(this.$props.list)
		}
	}
</script>

<style>
	.listing-container{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.listing-body{
		margin-top: 20rpx;
		width: 710rpx;
		background: rgb(255, 250, 232);
		border-radius: 20rpx;
	}
	.listing-body>view:first-child{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		border-bottom: 1rpx dashed #333;
	}
	
	.listing-body>view:first-child>text:nth-child(2){
		color: #DD524D;
	}
	
	.listing-body>view:last-child{
		font-size: 24rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
	}
</style>
