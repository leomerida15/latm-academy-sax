<template lang="html">
	<section class="admin-curses">
		<div class="center">
			<h2 class="primary-text">{{ $t('Courses.title') }}</h2>
		</div>

		<!-- list -->
		<list-courses :tdata="tdata" :keys="keys" />

		<!-- listRecourses -->
		<list-recourses :tbody="item" :active="this.$route.name === 'recourses-Course'" />

		<!-- create -->
		<create-courses :active="this.$route.name === 'create-Course'" :lists="lists" :Institutes="Institutes" />

		<!-- delete -->
		<delete-course :active="this.$route.name === 'delete-Course'" />
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';

	// componens
	import listCourses from '@/components/admin/courses/list.vue';
	import listRecourses from '@/components/admin/courses/recourses.vue';
	import createCourses from '@/components/admin/courses/create.vue';
	import deleteCourse from '@/components/admin/courses/delete.vue';

	export default Vue.extend({
		name: 'admin-curses',
		props: [],
		components: { createCourses, listCourses, listRecourses, deleteCourse },
		async mounted() {
			await this.getCourses();
			await this.getLists();
			await this.selectInstitutes();
		},
		data() {
			return {
				keys: [
					'Courses.table.name',
					'Courses.table.description',
					'Courses.table.playlistid',
					'Courses.table.image',
					'Courses.table.resources',
					'Courses.table.actions',
					'_id',
				],
			};
		},
		methods: {
			...mapActions('Courses', ['getCourses', 'getLists', 'selectInstitutes']),
		},
		computed: {
			...mapState('Courses', ['info', 'lists', 'Institutes', 'item']),
			tdata() {
				const data: any[] = this.info.map((a: any) => {
					const { name, description } = a[localStorage.getItem('lang') ?? 'es'];
					const { secure_url } = a.image;
					const { _id, playlistid, resources } = a;

					return {
						_id,
						name,
						description,
						image: secure_url,
						playlistid,
						resources,
					};
				});

				return data;
			},
		},
	});
</script>

<style scoped lang="scss">
	.admin-curses {
	}
</style>
