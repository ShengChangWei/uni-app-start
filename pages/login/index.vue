<template>
	<view class="content">
		<image src="../../static/img/bg.jpg" mode=""></image>
		<view class="login-content">
			<view v-if="loginType">
				<view class="input-view padding-sm solids radius">
					 <input class="uni-input" placeholder="用户名" />
				</view>
				<view class="input-view padding-sm solids radius">
					 <input class="uni-input" placeholder="密码" />
				</view>
			</view>
			<view v-if="!loginType">
				<view class="input-view padding-sm solids radius" > <input class="uni-input" placeholder="请输入手机号" /></view>
				<view>
					<m-input class="m-input yan" type="number" clearable v-model="password" placeholder="请输入验证码"></m-input>
					<text class="yan-btn">获取验证码</text>
				</view>
			</view>
			<view class="btn-row"><button class="cu-btn block bg-blue margin-tb-sm lg" @tap="bindLogin">登录</button></view>
			<view class="login-type" @tap="changeLoginType">{{ loginType ? '手机密码登录' : '用户密码登录' }} ></view>
		</view>
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue';
export default {
	components: {
		mInput
	},
	data() {
		return {
			providerList: [],
			hasProvider: false,
			account: '',
			password: '',
			positionTop: 0,
			loginType: true
		};
	},

	methods: {
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindLogin() {
			// if (this.account.length < 5) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '账号最短为 5 个字符'
			// 	});
			// 	return;
			// }
			// if (this.password.length < 6) {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '密码最短为 6 个字符'
			// 	});
			// 	return;
			// }
			uni.navigateTo({
				url: '../index/index'
			})
		},
		changeLoginType() {
			this.loginType = !this.loginType;
		}
	},
	onReady() {
		this.initPosition();
	}
};
</script>

<style lang="scss" scoped>
.content {
	position: relative;
	height: 100%;
	width: 100%;
	image {
		width: 100%;
		height: 100%;
	}
	.login-content {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 80%;
		transform: translate(-50%, -20%);
		.input-view {
			margin-bottom: 10px;
		}
		.yan-btn {
			width: 30%;
			display: inline-block;
			text-align: center;
			padding: 10px 5px;
			border: 1px solid #0faeff;
			border-radius: 5px;
			margin-left: 10px;
		}
		.m-input {
			padding: 7px 3px;
			border: 1px solid #eee;
			border-radius: 6rpx;
		
			&.yan {
				width: 56%;
				display: inline-block;
			}
		}
	}

	.login-type {
		text-align: center;
	}
}
</style>
