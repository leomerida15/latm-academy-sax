<template>
	<div class="home">
		<home-body />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	// components
	import homeBody from '@/templates/home.vue';

	export default Vue.extend({
		name: 'Home',
		components: { homeBody },
	});
</script>
