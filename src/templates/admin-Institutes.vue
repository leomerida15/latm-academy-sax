<template>
	<section class="admin-institutes">
		<div class="center">
			<h2 class="primary-text">{{ $t('Institutes.title') }}</h2>
		</div>

		<!-- list -->
		<list-institutes :keys="keys" :tdata="tdata" />
		<!-- create -->
		<create-institute :active="this.$route.name === 'create-Institute'" :Academys="Academys" />
		<!-- delete -->
		<delete-institute :active="this.$route.name === 'delete-Institute'" />
		<!-- edit -->
		<edit-institute :active="this.$route.name === 'edit-Institute'" :Academys="Academys" />
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapState, mapActions } from 'vuex';
	// components
	import createInstitute from '@/components/admin/Institutes/create.vue';
	import listInstitutes from '@/components/admin/Institutes/list.vue';
	import deleteInstitute from '@/components/admin/Institutes/delete.vue';
	import editInstitute from '@/components/admin/Institutes/edit.vue';

	export default Vue.extend({
		name: 'admin-institutes',
		props: [],
		components: { createInstitute, listInstitutes, deleteInstitute, editInstitute },
		async mounted() {
			this.selectAcademys();
			this.getInstitutes();
		},
		data() {
			return {
				active: false,
				keys: [
					'Institutes.table.name',
					'Institutes.table.description',
					'Institutes.table.image',
					'Institutes.table.actions',
					'_id',
				],
			};
		},
		methods: {
			...mapActions('Institutes', ['getInstitutes', 'createInstitute', 'selectAcademys']),
		},
		computed: {
			...mapState('Institutes', ['Academys', 'info']),
			tdata() {
				const data: any[] = this.info.map((a: any) => {
					const { name, description } = a[localStorage.getItem('lang') ?? 'es'];
					const { filename, secure_url } = a.image;
					const { _id } = a;

					return {
						_id,
						name,
						description,
						image: secure_url,
					};
				});

				return data;
			},
		},
	});
</script>

<style scoped lang="scss">
	.admin-institutes {
	}
</style>
