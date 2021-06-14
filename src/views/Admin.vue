<template>
	<div class="admin">
		<side-bar />
		<nav-admin />
		<br />
		<br />
		<br />
		<br />
		<div class="ed-container">
			<div class="ed-item s-60 m-75 s-to-center"><router-view /></div>
		</div>
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	// components
	import navAdmin from '@/components/NavBar/navAdmin.vue';
	import sideBar from '@/components/sideBar/index.vue';

	export default Vue.extend({
		name: 'admin',
		props: [],
		components: { navAdmin, sideBar },
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss">
	.admin {
	}
</style>
