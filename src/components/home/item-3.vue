<template>
	<div class="ed-grid m-grid-4">
		<div class="m-cols-4 s-to-center">
			<h1 class="white-text">Tienes dudas entra en nuestra comunidad y pregunta</h1>

			<br />
			<br />
		</div>

		<div class="m-cols-2 ed-grid s-grid-2">
			<div class="s-to-left">
				<img src="@/assets/svg/undraw_male_avatar_323b.svg" alt="undraw_maker_launch_crhe.svg" srcset="" />
			</div>

			<div>
				<br class="from-m" />
				<br class="from-m" />
				<br class="from-m" />
				<vs-alert>
					<template #title>
						<p class="primary-text">Quiero Aprender algo Nuevo</p>
					</template>
				</vs-alert>
			</div>

			<div>
				<br class="from-m" />
				<br class="from-m" />
				<br class="from-m" />
				<vs-alert>
					<template #title>
						<p class="primary-text">Que esperas busca en Latam Academy</p>
					</template>
				</vs-alert>
			</div>

			<div class="s-x-2 s-to-rigth">
				<img
					src="@/assets/svg/undraw_female_avatar_w3jk.svg"
					style="transform: scaleX(-1);"
					alt="undraw_maker_launch_crhe.svg"
					srcset=""
				/>
			</div>
		</div>

		<div class="m-cols-2 m-x-3">
			<br class="from-s" />
			<br class="from-s" />
			<div class="ed-grid s-grid-6">
				<div class="s-cols-6">
					<img src="@/assets/svg/undraw_maker_launch_crhe.svg" alt="undraw_maker_launch_crhe.svg" srcset="" />
				</div>
				<div class="s-x-2 s-cols-4 s-to-center">
					<template>
						<div>
							<vs-button gradient :active="active == 0" @click="active = 0" @mouseover="hover = true">
								Inicia gratis tu viaje al éxito 🚀
							</vs-button>
							<br />
							<br />
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	export default Vue.extend({
		name: 'home-item-3',
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
	.home-item-3 {
	}
</style>
