<template>
	<div class="home">
		<nav-bar />

		<home-body />
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	// components
	import NavBar from '@/components/NavBar/index.vue';
	import homeBody from '@/templates/home.vue';

	export default Vue.extend({
		name: 'Home',
		components: {
			homeBody,
			NavBar,
		},
	});
</script>
