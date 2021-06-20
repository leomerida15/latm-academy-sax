<template>
	<vs-dialog @close="exit" prevent-close :blur="true" width="550px" not-center v-model="active">
		<template>
			<div class="center">
				<vs-alert success :progress="progress" v-model="TimeAlertSuccess">
					<template #title>
						{{ $t('academys.edit.success') }}
					</template>
					<br />
				</vs-alert>

				<vs-alert danger :progress="progress" v-model="TimeAlertDanger">
					<template #title>
						{{ $t('academys.edit.error') }}
					</template>
					<br />
				</vs-alert>
				<br />
			</div>
		</template>
		<vs-table>
			<template #thead>
				<vs-tr>
					<vs-th>
						resources
					</vs-th>
				</vs-tr>
			</template>
			<template #tbody>
				<vs-tr v-for="(resource, i) in tbody.resources" :key="i" :data="tbody.resources">
					<vs-td>
						{{ resource.filename }}
					</vs-td>
				</vs-tr>
			</template>
		</vs-table>
	</vs-dialog>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions } from 'vuex';
	export default Vue.extend({
		name: 'recourses',
		props: {
			tbody: { type: Array, required: true },
			active: { type: Boolean, required: true },
		},
		mounted() {},
		data() {
			return { editActive: false, item: {}, TimeAlertSuccess: false, TimeAlertDanger: false, time: 4000, progress: 0 };
		},
		methods: {
			...mapActions('Courses', ['deleteResourse', 'getCourses']),
			Alert(type: boolean) {
				if (type) {
					this.TimeAlertSuccess = true;

					const interval = setInterval(() => {
						this.progress++;
					}, this.time / 100);

					setTimeout(() => {
						this.TimeAlertSuccess = false;
						clearInterval(interval);
						this.progress = 0;
					}, this.time);
				} else {
					this.TimeAlertDanger = true;

					const interval = setInterval(() => {
						this.progress++;
					}, this.time / 100);

					setTimeout(() => {
						this.TimeAlertDanger = false;
						clearInterval(interval);
						this.progress = 0;
					}, this.time);
				}
			},
			exit() {
				this.$router.push({ name: 'Admin-Courses' });
			},
		},
		computed: {},
	});
</script>

<style scoped lang="scss">
	.recourses {
	}
</style>
