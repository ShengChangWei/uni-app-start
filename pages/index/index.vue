<template>
	<view>
		<tools v-if="PageCur == 'mrxc'"></tools>
		<user v-if="PageCur == 'grzx'"></user>
		<element v-if="PageCur == 'xcsh'"></element>

		<!-- 	<components v-if="PageCur == 'component'"></components>
		<plugin v-if="PageCur == 'plugin'"></plugin> -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="mrxc">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/mrxc' + [PageCur == 'mrxc' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'mrxc' ? 'text-blue' : 'text-gray'">工具</view>
			</view>
			<view class="action" @click="NavChange" data-cur="xcsh">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/xcsh' + [PageCur == 'xcsh' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'xcsh' ? 'text-blue' : 'text-gray'">元素</view>
			</view>
			<view class="action" @click="NavChange" data-cur="grzx">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/grzx' + [PageCur == 'grzx' ? '_1' : '_0'] + '.png'"></image></view>
				<view :class="PageCur == 'grzx' ? 'text-blue' : 'text-gray'">个人中心</view>
			</view>
		</view>
	</view>
</template>

<script>
import tools from '../tools/index.vue';
import user from '../user/index.vue';
import element from '../element/index.vue';
export default {
	components: {
		tools,
		user,
		element
	},
	data() {
		return {
			PageCur: 'mrxc'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style></style>
