<template>
	<!-- delete item -->
	<vs-dialog :loading="loading" :blur="true" width="300px" not-center @close="exit" v-model="active">
		<template #header>
			<div>
				<div>
					<h4 class="not-margin primary-text">{{ $t('Institutes.delete.title', { name: item.name }) }}</h4>
				</div>
			</div>
		</template>

		<template>
			<div class="center">
				<vs-alert success :progress="progress" v-model="TimeAlertSuccess">
					<template #title>
						{{ $t('Institutes.delete.success') }}
					</template>
				</vs-alert>

				<vs-alert danger :progress="progress" v-model="TimeAlertDanger">
					<template #title>
						{{ $t('Institutes.delete.danger') }}
					</template>
				</vs-alert>
			</div>
		</template>

		<template v-if="msg" #footer>
			<div class="con-footer">
				<vs-button @click="action" success transparent>
					{{ $t('yes') }}
				</vs-button>
				<vs-button @click="exit" border="true">
					{{ $t('no') }}
				</vs-button>
			</div>
		</template>
	</vs-dialog>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapState, mapActions } from 'vuex';

	export default Vue.extend({
		name: 'Institutes-delete',
		props: {
			active: { type: Boolean, required: true },
		},
		mounted() {},
		data() {
			return {
				loading: false,
				TimeAlertSuccess: false,
				TimeAlertDanger: false,
				time: 4000,
				progress: 0,
				resp: false,
				msg: true,
			};
		},
		methods: {
			...mapActions('Institutes', ['deleteInstitute', 'getInstitutes']),
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

						this.exit();
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

						this.exit();
					}, this.time);
				}
			},
			exit() {
				this.$router.go(-1);
			},
			async action() {
				this.loading = true;
				const resp: boolean = await this.deleteInstitute(this.item._id);

				this.loading = false;
				this.Alert(resp);

				this.getInstitutes();
			},
		},
		computed: { ...mapState('Institutes', ['item']) },
	});
</script>

<style scoped lang="scss">
	.delete-academy {
	}
</style>
