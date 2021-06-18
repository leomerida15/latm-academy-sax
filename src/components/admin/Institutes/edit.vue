<template>
	<vs-dialog @close="exit" :loading="loading" prevent-close :blur="true" width="550px" not-center v-model="active">
		<template #header>
			<h4 class="primary-text not-margin">
				{{ $t('Institutes.edit.title', { name: item.es.name }) }}
			</h4>
		</template>

		<template>
			<div class="center">
				<vs-alert success :progress="progress" v-model="TimeAlertSuccess">
					<template #title>
						{{ $t('Institutes.edit.success') }}
					</template>
					<br />
				</vs-alert>

				<vs-alert danger :progress="progress" v-model="TimeAlertDanger">
					<template #title>
						{{ $t('Institutes.edit.error') }}
					</template>
					<br />
				</vs-alert>
				<br />
			</div>
		</template>

		<div class="con-content">
			<div class="ed-grid m-grid-2">
				<!-- names -->
				<vs-input v-model="item.es.name" type="text" :label-placeholder="$t('academys.create.form.es.name')"></vs-input>
				<vs-input v-model="item.en.name" type="text" :label-placeholder="$t('academys.create.form.en.name')"></vs-input>

				<!-- descriptions -->
				<vs-input
					v-model="item.es.description"
					type="text"
					:label-placeholder="$t('academys.create.form.es.description')"
				></vs-input>
				<vs-input
					v-model="item.en.description"
					type="text"
					:label-placeholder="$t('academys.create.form.en.description')"
				></vs-input>

				<div class="select">
					<select placeholder="Select" v-model="item.Academy" :color="success">
						<option value="" disabled selected>{{ $t('Institute.create.form.Academy') }}</option>
						<option v-for="(item, i) in Academys" :key="i" :value="item._id">{{ item.name }}</option>
					</select>
				</div>

				<!--  -->
				<vs-button class="conten-form" @click="openFile" flat>
					{{ $t('academys.create.form.image') }}
					<input type="file" id="fileElem" @change="previewImage" accept="image/*" />
				</vs-button>

				<vs-card type="2">
					<template #img>
						<div v-if="files_valid"><img :src="imageData" alt="" /></div>
						<div v-else><img :src="item.image.secure_url" alt="" /></div>
					</template>
				</vs-card>
			</div>
		</div>

		<template #footer>
			<div class="ed-grid m-grid-2">
				<div class="con-footer m-x-2">
					<vs-button @click="edit" :active="true">
						{{ $t('academys.edit.btn') }}
					</vs-button>
				</div>
			</div>
		</template>
	</vs-dialog>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';

	export default Vue.extend({
		name: 'edit',
		props: {
			active: { type: Boolean, required: true },
			Academys: { type: Object, required: true },
		},
		mounted() {},
		data() {
			return {
				loading: false,
				TimeAlertSuccess: false,
				TimeAlertDanger: false,
				time: 4000,
				progress: 0,
				body: {
					image: {},
				},
				files_valid: false,
				imageData: './img/plus.png',
			};
		},
		methods: {
			...mapActions('Institutes', ['editInstitute', 'getInstitutes']),
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
				this.$router.push({ name: 'Admin-Institutes' });
			},
			async edit() {
				try {
					let j: number = 0;
					this.loading = true;

					// define vars
					if (this.files_valid === true) {
						const { image }: any = this.item;
						const body = new FormData();
						body.append('image', image);

						const img = await Vue.axios.post('/api/log/file/img/Academys', body);

						this.item.image = img.data.info;
					}

					const resp: boolean = await this.editInstitute(this.item);
					this.Alert(resp);
					if (!resp) throw '';

					await this.getInstitutes();

					this.files_valid = false;
				} catch (err) {
					console.error(err);
				}
				this.loading = false;
			},
			openFile() {
				const el = document.getElementById('fileElem');

				if (el) {
					el.click();
				}
			},
			previewImage(event: any) {
				const input = event.target;
				this.item.image = event.target.files[0];
				this.files_valid = true;
				if (input.files && input.files[0]) {
					const reader = new FileReader();

					reader.onload = (e: any) => (this.imageData = e.target.result);

					reader.readAsDataURL(input.files[0]);
				}
			},
		},
		computed: {
			...mapState('Institutes', ['item']),
		},
	});
</script>

<style scoped lang="scss">
	.edit {
	}
</style>
