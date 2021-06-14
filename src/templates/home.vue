<template>
	<div>
		<section class="home-item-1">
			<br />
			<br />
			<br />
			<br />
			<item1 />
		</section>
		<section class="home-item-2">
			<br />
			<br />
			<br />
			<br />
			<item2 />
		</section>
		<div class="degrade-1">
			<item3 />
		</div>

		<br />
		<br />
		<br />
		<br />
		<item4 />
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';

	import item1 from '@/components/home/item-1.vue';
	import item2 from '@/components/home/item-2.vue';
	import item3 from '@/components/home/item-3.vue';
	import item4 from '@/components/home/item-4.vue';

	export default Vue.extend({
		name: 'home',
		props: [],
		components: {  item1, item2, item3, item4 },
		mounted() {},
		data() {
			return {};
		},
		methods: {},
		computed: {},
	});
</script>

<style lang="scss">
	.home-item-2 {
		background-image: url('/img/fondos/curvo-claro-oscuro.png');
		background-size: cover;
		margin: 0;
	}
	.degrade-1 {
		background-image: url('/img/fondos/degrade-2.png');
		background-size: cover;
		margin: 0;
	}
	.home-item-3 {
	}
</style>
