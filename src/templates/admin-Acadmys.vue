<template>
	<section>
		<!-- <p class="primary-text">{{ info[0] }}</p> -->

		<div class="center">
			<h2 class="primary-text">{{ $t('academys.title') }}</h2>
		</div>

		<list-academys :keys="keys" :tdata="tdata" />

		<!-- crear academya -->
		<create-academy :active="this.$route.name === 'create-Academy'" />
		<!-- eliminar academia -->
		<delete-academy :active="this.$route.name === 'delete-Academy'" />
		<!-- editar academia -->
		<edit-academy :active="this.$route.name === 'edit-Academy'" />
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapState, mapActions } from 'vuex';
	// components
	import createAcademy from '@/components/admin/Academys/create.vue';
	import listAcademys from '@/components/admin/Academys/list.vue';
	import deleteAcademy from '@/components/admin/Academys/delete.vue';
	import editAcademy from '@/components/admin/Academys/edit.vue';

	export default Vue.extend({
		name: 'admin-acadmys',
		props: [],
		components: { createAcademy, listAcademys, deleteAcademy, editAcademy },
		async mounted() {
			await this.getAcademys();
		},
		data() {
			return {
				keys: [
					'academys.table.name',
					'academys.table.description',
					'academys.table.color',
					'academys.table.image',
					'academys.table.actions',
					'_id',
				],
			};
		},
		methods: { ...mapActions('Academys', ['getAcademys', 'createAcademy']) },
		computed: {
			...mapState('Academys', ['info']),
			tdata() {
				const data: any[] = this.info.map((a: any) => {
					const { name, description } = a[localStorage.getItem('lang') ?? 'es'];
					const { color, view } = a.style;
					const { filename, secure_url } = a.image;
					const { _id } = a;

					return {
						_id,
						name,
						description,
						color,
						image: secure_url,
					};
				});

				return data;
			},
		},
	});
</script>

<style scoped lang="scss"></style>
