<template>
	<DarkModeSwitch @switched="onSwitched" :initialState="isDarkModeEnabled" />
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	// components
	// @ts-expect-error
	import DarkModeSwitch from 'vue-dark-mode-switch';
	import 'vue-dark-mode-switch/dist/vue-dark-mode-switch.css';

	export default Vue.extend({
		name: 'theme',
		props: [],
		mounted() {},
		data() {
			return {
				isDarkModeEnabled: true,
			};
		},
		components: {
			DarkModeSwitch,
		},
		methods: {
			onSwitched(isSwitched: any) {
				console.log('dark mode is enabled :', isSwitched);
			},
		},
	});
</script>

<style scoped lang="scss">
	.theme {
	}
</style>
