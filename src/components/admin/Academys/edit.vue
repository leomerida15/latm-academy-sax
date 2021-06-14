<template>
	<div class="academys-edit">
		<vs-dialog @close="exit" :loading="loading" prevent-close :blur="true" width="550px" not-center v-model="active">
			<template #header>
				<h4 class="primary-text not-margin">
					{{ $t('academys.edit.title', { name: files_valid }) }}
				</h4>
			</template>

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
							{{ $t('academys.edit.danger') }}
						</template>
						<br />
					</vs-alert>
				</div>
			</template>

			<div class="con-content">
				<div class="ed-grid m-grid-2">
					<!-- names -->
					<vs-input v-model="item.es.name" type="text" :label-placeholder="$t('academys.create.form.es.name')"></vs-input>
					<vs-input v-model="item.en.name" type="text" :label-placeholder="$t('academys.create.form.en.name')" />

					<!-- descriptions -->
					<vs-input v-model="item.es.description" type="text" :label-placeholder="$t('academys.create.form.es.description')" />
					<vs-input v-model="item.en.description" type="text" :label-placeholder="$t('academys.create.form.en.description')" />

					<!-- styles -->
					<div class="ed-grid s-grid-11">
						<div class="s-cols-11">
							<h5 style="margin: 0px">{{ $t('academys.create.form.color') }}</h5>
						</div>
						<div class="input-color-form s-cols-2">
							<input v-model="item.style.color" id="input-color" class="input-color validate" type="color" />
						</div>
						<div class="input-field s-cols-9">
							<vs-input v-model="item.style.color" type="text" />
						</div>
					</div>

					<vs-button @click="openFile" flat>
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
				<div class="con-footer">
					<vs-button @click="edit" :active="true">
						{{ $t('academys.edit.btn') }}
					</vs-button>
				</div>
			</template>
		</vs-dialog>

		<div class="btn-flot">
			<vs-button circle :active="active == 0" @click="active = !active">
				<v-icon name="plus"></v-icon>
			</vs-button>
		</div>
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';

	export default Vue.extend({
		name: 'academys-edit',
		props: {
			active: { type: Boolean, required: true },
		},
		mounted() {},
		data() {
			return {
				loading: false,
				body: {
					style: {
						color: '#ffffff',
						view: '',
					},
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
				valid: {
					style: {
						color: { alert: false, msg: '' },
						view: { alert: false, msg: '' },
					},
					image: {},
					es: {
						name: { alert: false, msg: '' },
						description: { alert: false, msg: '' },
					},
					en: {
						name: { alert: false, msg: '' },
						description: { alert: false, msg: '' },
					},
				},
				files_valid: false,
				imageData: './img/plus.png',
				TimeAlertSuccess: false,
				TimeAlertDanger: false,
				time: 4000,
				progress: 0,
			};
		},
		methods: {
			...mapActions('Academys', ['getAcademys', 'editAcademy']),
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
				this.$router.go(-1);
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

					const resp: boolean = await this.editAcademy(this.item);
					this.Alert(resp);
					if (!resp) throw '';

					await this.getAcademys();

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
			...mapState('Academys', ['item']),
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
		top: 8px;
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
