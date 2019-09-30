<template>
	<view>
		<!-- 	<cu-custom bgColor="bg-blue">
			<block slot="content">个人中心</block>
		</cu-custom> -->
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg text-grey bg-white shadow-warp">
				<!-- <view class="cu-avatar xl radius" style="margin: 15px;background-image:url(../../static/img/logo.png);"></view> -->
				<image class="cu-avatar xl round" style="margin: 15px" src="/static/img/logo.png" mode="aspectFit"></image>
				<view class="text-xl">
					<text class="text-white">圣墨</text>
				</view>
				<view class="flex solid-bottom padding justify-center">
					<image src="/static/img/position.png" style="width: 20px;height: 20px;margin-right: 5px;" class="png" mode="aspectFit"></image>
					<text class="text-white">系统管理员</text>
				</view>
				<!-- <image src="/static/wave.gif" mode="scaleToFill" class="gif-wave"></image> -->
			</view>
			<view class="padding-xs flex align-center bg-white shadow-warp">
				<view class="flex-sub text-center">
					<view class="text-xs padding">
						<text class="text-gray">xxxx</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu" style="padding-top: 20px;">
				<navigator class="cu-item arrow" style="margin: 20px;"  open-type="navigate">
					<!-- <view class="cu-avatar round lg" style="background-image:url(/static/logo.png);"></view> -->
					<image src="/static/img/security.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm">
						<view>
							<text class="text-blue margin-right-xs"></text> 用户名密码修改</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs"></text> 修改用户名和密码</view>
					</view>
				</navigator>
				<navigator class="cu-item arrow" style="margin: 20px;" 
				 open-type="navigate">
					<image src="/static/img/user.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm">
						<view>
							<text class="text-blue margin-right-xs"></text> 编辑个人资料</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs"></text> 修改完善个人资料</view>
					</view>
				</navigator>
				<view class="cu-item" style="margin: 20px;" @click="logout">
					<image src="/static/img/out.png" style="width: 30px;height: 30px;margin-right: 20px;" class="png" mode="aspectFit"></image>
					<view class="content padding-tb-sm" bindtap="showQrcode">
						<view>
							<text class="text-blue margin-right-xs"></text> 登出</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs"></text> 退出当前登录账号</view>
					</view>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
		<view class="cu-modal" :class="modalVisible ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">退出登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确定要退出登录吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideModal">取消</button>
						<button class="cu-btn bg-red margin-left" @tap="confirmLogout">确定</button>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import configService from '@/services/config.service.js';
	export default {
		data() {
			return {
				modalVisible: false,
			};
		},
		components: {},
		onLoad() {

		},
		created() {},
		mounted() {
		},
		methods: {
			logout() {
				this.modalVisible = true;
			},
			hideModal() {
				this.modalVisible = false;
			},
			confirmLogout() {
				uni.reLaunch({
					url: '/pages/login/index'
				});
			},
		}

	}
</script>

<style>
	.UCenter-bg {
		background-image: url(../../static/img/user-bg.jpeg);
		background-size: cover;
		height: 600rpx;
		display: flex;
		justify-content: center;
		padding-top: 40rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 300;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}

	.UCenter-bg text {
		opacity: 0.8;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}
</style>
