<template>
	<section class="admin-playlistid">
		<h1>admin-playlistid Component</h1>
		<list-videos />
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';

	// components
	import listVideos from '@/components/admin/videos/list.vue';

	export default Vue.extend({
		name: 'admin-playlistid',
		props: [],
		components: { listVideos },
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss">
	.admin-playlistid {
	}
</style>
