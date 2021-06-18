<template lang="html">
	<section class="admin-curses">
		<h1>admin-curses Component</h1>

		<!-- <iframe
			width="640"
			height="360"
			src="http://www.youtube.com/embed/videoseries?list=PL59he8QLJAga4aUBraDQ9fk18MKdy16aD"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe> -->

		<create-courses :active="this.$route.name === 'create-Course'" :lists="lists" :Institutes="Institutes" />
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';

	// componens
	import createCourses from '@/components/admin/courses/create.vue';

	export default Vue.extend({
		name: 'admin-curses',
		props: [],
		components: { createCourses },
		async mounted() {
			await this.getCourses();
			await this.getLists();
			await this.selectInstitutes();
		},
		data() {
			return {};
		},
		methods: {
			...mapActions('Courses', ['getCourses', 'getLists', 'selectInstitutes']),
		},
		computed: {
			...mapState('Courses', ['info', 'lists', 'Institutes']),
		},
	});
</script>

<style scoped lang="scss">
	.admin-curses {
	}
</style>
