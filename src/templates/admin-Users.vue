<template>
	<section class="admin-users">
		<h1>{{ Slcourses }}</h1>

		<create-users :courses="Slcourses" :active="this.$route.name === 'create-users'" />
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapState, mapActions } from 'vuex';
	// components
	import createUsers from '@/components/admin/Users/create.vue';

	export default Vue.extend({
		name: 'admin-users',
		props: [],
		components: { createUsers },
		async mounted() {
			await this.getCourses();
		},
		data() {
			return {};
		},
		methods: { ...mapActions('Users', ['getCourses']) },
		computed: {
			...mapState('Users', ['courses']),
			Slcourses() {
				return this.courses.map((course: any) => {
					const { _id, name } = course;
					return { name, _id };
				});
			},
		},
	});
</script>
