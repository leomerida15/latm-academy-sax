<template>
	<div class="">
		<br class="to-m" />
		<br class="to-m" />
		<br class="to-m" />
		<br class="to-m" />
		<br class="to-m" />
		<br class="to-m" />

		<div class="ed-grid s-center">
			<br />

			<h1 class="white-text">
				<span class="primary-text">Latam-Academy</span>
				Educa a los profecionales del mañana Hoy
				<span class="primary-text">!</span>
			</h1>

			<br />
		</div>

		<div class="ed-grid m-grid-2 lg-grid-4">
			<div class="s-to-center lg-to-left" v-for="(profile, i) in profiles" :key="i">
				<vs-card>
					<template #title>
						<h3 class="primary-text">{{ profile.title }}</h3>
					</template>
					<template #img>
						<img :src="profile.img" :alt="profile.title" />
					</template>
					<template #text>
						<p>🎓🚀💸</p>
					</template>
					<template #interactions>
						<vs-button success icon>
							<i class="bx bx-heart"></i>
						</vs-button>
					</template>
				</vs-card>
				<div class="m-cols-2 lg-cols-4">
					<br />
				</div>
			</div>
		</div>

		<template>
			<div class="ed-grid m-grid-3">
				<vs-button class="m-x-2" gradient :active="active == 0" @click="active = 0" @mouseover="hover = true">
					Inicia gratis tu viaje al éxito 🚀
				</vs-button>
			</div>
		</template>

		<br />
		<br />
		<br />
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';

	export default Vue.extend({
		name: 'home-item-2',
		props: [],
		mounted() {},
		data() {
			return {
				profiles: [
					{
						img: 'https://image.freepik.com/foto-gratis/alegre-joven-empresario-caucasico_171337-727.jpg',
						title: 'Emprendedores',
						descript: ``,
					},
					{
						img:
							'https://image.freepik.com/foto-gratis/joven-estudia-casa-usando-computadora-portatil-aprende-linea_1421-3641.jpg',
						title: 'Estudiantes',
						descript: ``,
					},
					{
						img:
							'https://image.freepik.com/foto-gratis/grupo-empresarios-casualmente-vestidos-discutiendo-ideas_146671-15294.jpg',
						title: 'Empresas',
						descript: ``,
					},
					{
						img: 'https://image.freepik.com/foto-gratis/consulta-telefono_1098-16114.jpg',
						title: 'Profesionales',
						descript: ``,
					},
				],
			};
		},
		methods: {},
		computed: {},
	});
</script>

<style scoped lang="scss"></style>
