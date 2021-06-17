<template>
	<div class="academys-create">
		<vs-dialog @close="exit" :loading="loading" prevent-close :blur="true" width="550px" not-center v-model="active">
			<template #header>
				<h2 class="primary-text not-margin">
					{{ $t('Institutes.create.title') }}
				</h2>
			</template>

			<template>
				<div class="center">
					<vs-alert success :progress="progress" v-model="TimeAlertSuccess">
						<template #title>
							{{ $t('Institutes.create.form.success') }}
						</template>
					</vs-alert>

					<vs-alert danger :progress="progress" v-model="TimeAlertDanger">
						<template #title>
							{{ $t('Institutes.create.form.error') }}
						</template>
					</vs-alert>
				</div>
			</template>

			<div class="con-content">
				<div class="ed-grid m-grid-2">
					<!-- names -->
					<vs-input v-model="body.es.name" type="text" :label-placeholder="$t('academys.create.form.es.name')"></vs-input>
					<vs-input v-model="body.en.name" type="text" :label-placeholder="$t('academys.create.form.en.name')"></vs-input>

					<!-- descriptions -->
					<vs-input
						v-model="body.es.description"
						type="text"
						:label-placeholder="$t('academys.create.form.es.description')"
					></vs-input>
					<vs-input
						v-model="body.en.description"
						type="text"
						:label-placeholder="$t('academys.create.form.en.description')"
					></vs-input>

					<div class="select">
						<select placeholder="Select" v-model="body.Academy" :color="success">
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
							<img :src="imageData" alt="" />
						</template>
					</vs-card>
				</div>
			</div>

			<template #footer>
				<div class="con-footer">
					<vs-button @click="create" :active="true">
						{{ $t('academys.create.btn') }}
					</vs-button>
				</div>
			</template>
		</vs-dialog>

		<div class="btn-flot">
			<vs-button circle to="/admin/institutes/create">
				<v-icon name="plus"></v-icon>
			</vs-button>
		</div>
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';
	import { AxiosResponse } from 'axios';

	export default Vue.extend({
		name: 'Institutes-create',
		props: {
			active: { type: Boolean, required: true },
			Academys: { type: Object, required: true },
		},
		mounted() {},
		data() {
			return {
				value: '',
				loading: false,
				TimeAlertSuccess: false,
				TimeAlertDanger: false,
				time: 4000,
				progress: 0,
				body: {
					Academy: '',
					image: {},
					es: {
						name: '',
						description: '',
					},
					en: {
						name: '',
						description: '',
					},
				},
				files_valid: false,
				imageData: './img/plus.png',
			};
		},
		methods: {
			...mapActions('Institutes', ['getInstitutes', 'createInstitute']),
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
			async create() {
				this.loading = true;
				try {
					// define vars
					const { image }: any = this.body;
					const body = new FormData();
					body.append('image', image);

					const img: AxiosResponse = await Vue.axios.post('/api/log/file/img/Academys', body);
					this.body.image = img.data.info;
					//
					const resp: boolean = await this.createInstitute(this.body);
					this.Alert(resp);
					if (!resp) throw '';

					await this.getInstitutes();

					this.body = {
						Academy: '',
						image: {},
						es: {
							name: '',
							description: '',
						},
						en: {
							name: '',
							description: '',
						},
					};
					this.imageData = '';
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
				this.body.image = event.target.files[0];
				this.files_valid = true;
				if (input.files && input.files[0]) {
					const reader = new FileReader();

					reader.onload = (e: any) => (this.imageData = e.target.result);

					reader.readAsDataURL(input.files[0]);
				}
			},
			exit() {
				this.$router.go(-1);
			},
		},
		computed: {
			AcSelect() {
				return this.Academys.map((a: any) => {
					const { _id } = a;
					const lang: any = localStorage.getItem('lang');
					const e = a[lang];

					return { _id, ...e };
				});
			},
		},
	});
</script>

<style lang="scss">
	#fileElem {
		display: none;
	}
	.con-footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.con-footer .vs-button {
		margin: 0px;
	}
	.con-footer .vs-button .vs-button__content {
		padding: 10px 30px;
	}
	.con-footer .vs-button ~ .vs-button {
		margin-left: 10px;
	}
	.not-margin {
		margin: 0px;
		font-weight: normal;
		padding: 10px;
		padding-bottom: 0px;
	}
	.con-content {
		width: 100%;
	}
	.con-content p {
		font-size: 0.8rem;
		padding: 0px 10px;
	}
	.con-content .vs-checkbox-label {
		font-size: 0.8rem;
	}
	.con-content .vs-input-parent {
		width: 100%;
	}
	.con-content .vs-input-content {
		margin: 10px 0px;
		width: calc(100%);
	}
	.con-content .vs-input-content .vs-input {
		width: 100%;
	}
	.footer-dialog {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: calc(100%);
	}
	.footer-dialog .new {
		margin: 0px;
		margin-top: 20px;
		padding: 0px;
		font-size: 0.7rem;
	}
	.footer-dialog .new a {
		color: rgba(var(--vs-primary), 1) !important;
		margin-left: 6px;
	}
	.footer-dialog .new a:hover {
		text-decoration: underline;
	}
	.footer-dialog .vs-button {
		margin: 0px;
	}

	.input-color-container {
		position: relative;
		overflow: hidden;
		width: 40px;
		height: 40px;
		border-radius: 40px;
		box-shadow: 1px 1px 3px 0px grey;
		left: 70px;
	}

	.input-color-form {
		position: relative;
		overflow: hidden;
		width: 36px;
		height: 36px;
		border-radius: 40px;
		box-shadow: 1px 1px 3px 0px grey;
	}

	.input-color {
		position: absolute;
		right: -8px;
		top: -8px;
		width: 56px;
		height: 56px;
		border: none;
	}
</style>
