<template>
	<div class="ed-grid m-grid-8 lg-grid-10">
		<div class="ed-grid s-grid-6 m-cols-3 m-x-2 lg-cols-4">
			<div class="s-cols-6">
				<div class="from-lg"><br /></div>
				<div class="from-lg"><br /></div>
				<div class="from-lg"><br /></div>
				<div class="from-m"><br /></div>
				<div class="from-m"><br /></div>
				<div class="from-m"><br /></div>
				<h1 style="margin:0">
					<span class="primary-text">Aprende, Comprende y Emprende</span>
					🎓🚀💸
				</h1>

				<div class="s-to-center">
					<h1 class="success-text">Trabaja donde quieras</h1>
				</div>

				<template>
					<div>
						<vs-button :class="{ pulse: !hover }" gradient :active="active == 0" @click="active = 0" @mouseover="hover = true">
							Inicia gratis tu viaje al éxito 🚀
						</vs-button>
					</div>
				</template>
				<div class="to-m"><br /></div>
			</div>
		</div>

		<div class="m-cols-3 m-x-5 lg-cols-4 lg-x-6">
			<img src="@/assets/svg/astronauta_junto_coete.svg" alt="undraw_to_the_moon_v1mv.svg" srcset="" />
		</div>
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';

	export default Vue.extend({
		name: 'home-item-1',
		props: [],
		mounted() {},
		data() {
			return { hover: false };
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss">
	.home-item-1 {
	}
</style>
