<template>
	<div class="academys-create">
		<vs-dialog @close="exit" :loading="loading" prevent-close :blur="true" width="550px" not-center v-model="active">
			<template #header>
				<h2 class="primary-text not-margin">{{ $t('Courses.create.title') }}</h2>
			</template>

			<template>
				<div class="center">
					<vs-alert success :progress="progress" v-model="TimeAlertSuccess">
						<template #title>
							{{ $t('Courses.edit.form.success') }}
						</template>
					</vs-alert>

					<vs-alert danger :progress="progress" v-model="TimeAlertDanger">
						<template #title>
							{{ $t('Courses.edit.form.error') }}
						</template>
					</vs-alert>
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

					<div class="select m-cols-2	">
						<select placeholder="Select" v-model="item.playlistid" :color="success">
							<option value="" disabled selected>{{ $t('Courses.create.form.playList') }}</option>
							<option v-for="(item, i) in lists" :key="i" :value="item.id">{{ item.snippet.title }}</option>
						</select>
					</div>

					<div class="ed-grid">
						<!--  -->
						<vs-button class="conten-form" @click="openFile('fileElem')" flat>
							{{ $t('academys.create.form.image') }}
							<input type="file" id="fileElem" @change="previewImage" accept="image/*" multiple />
						</vs-button>

						<vs-card type="2">
							<template #img>
								<div v-if="files_valid"><img :src="imageData" alt="" /></div>
								<div v-else><img :src="item.image.secure_url" alt="" /></div>
							</template>
						</vs-card>
					</div>
					<div class="ed-grid">
						<!--  -->
						<vs-button class="conten-form" @click="openFile('filesElem')" flat>
							recursos
							<input type="file" id="filesElem" @change="change_recourses" accept="image/*,.pdf,.xlsx,." multiple />
						</vs-button>

						<vs-table>
							<template #thead>
								<vs-tr>
									<vs-th>
										resources existentes
									</vs-th>
								</vs-tr>
							</template>
							<template #tbody>
								<vs-tr v-for="(resource, i) in item.resources" :key="i" :data="resources">
									<vs-td @click="defineResource(resource)">
										{{ resource.filename }}
									</vs-td>
								</vs-tr>
							</template>
						</vs-table>

						<vs-dialog v-model="editExistin">
							<template #header>
								<h2 class="primary-text">Eliminar recurso {{ resource.filename }}</h2>
							</template>

							<div class="ed-grid s-grid-2">
								<vs-button transparent @click="deleteResourceExistin">{{ $t('yes') }}</vs-button>
								<vs-button border @click="editExistin = false">
									{{ $t('no') }}
								</vs-button>
							</div>
						</vs-dialog>

						<vs-table v-if="body.resources.length">
							<template #thead>
								<vs-tr>
									<vs-th>
										resources nuevos
									</vs-th>
								</vs-tr>
							</template>
							<template #tbody>
								<vs-tr v-for="(resource, i) in body.resources" :key="i" :data="resources">
									<vs-td @click="(j = i), (editNew = true)">
										{{ resource.name }}
									</vs-td>
								</vs-tr>
							</template>
						</vs-table>

						<vs-dialog v-model="editExistin">
							<template #header>
								<h2 class="primary-text">Eliminar recurso {{ resource.filename }}</h2>
							</template>

							<div class="ed-grid s-grid-2">
								<vs-button transparent @click="deleteResourceExistin">{{ $t('yes') }}</vs-button>
								<vs-button border @click="editNew = false">
									{{ $t('no') }}
								</vs-button>
							</div>
						</vs-dialog>
					</div>
				</div>
			</div>

			<template #footer>
				<div class="con-footer">
					<vs-button @click="edit" :active="true">
						{{ $t('academys.create.btn') }}
					</vs-button>
				</div>
			</template>
		</vs-dialog>
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions, mapState } from 'vuex';
	import { AxiosResponse } from 'axios';

	export default Vue.extend({
		name: 'Course-create',
		props: {
			active: { type: Boolean, required: true },
			lists: { type: Object, required: true },
			Institutes: { type: Object, required: true },
		},
		mounted() {},
		data() {
			const data: any = {
				value: '',
				loading: false,
				TimeAlertSuccess: false,
				TimeAlertDanger: false,
				time: 4000,
				progress: 0,
				editExistin: false,
				editNew: false,
				resource: {},
				resources_existin: [],
				j: 0,
				editProp: {},
				body: {
					image: {},
					resources: [],
				},
				files_valid: false,
				imageData: './img/plus.png',
			};
			return data;
		},
		methods: {
			...mapActions('Courses', ['getCourses', 'editCourse', 'deleteDoc']),
			deleteResourceNew() {
				this.body.resources.splice(this.j, 1);
				this.editNew = false;
			},
			defineResource(a: any) {
				this.resource = a;
				this.editExistin = true;
			},
			async deleteResourceExistin() {
				// const resp: boolean = await this.deleteDoc(this.resource.public_id);
				this.resources_existin.push(this.resource);
				this.item.resources.splice(this.j, 1);

				this.editExistin = false;
			},
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
			async edit() {
				try {
					debugger;
					this.loading = true;

					debugger;
					// define vars
					const { image, resources }: any = this.body;

					debugger;
					const imgs_deletes: Promise<boolean>[] = this.this.resources_existin.map(async (a: any) => {
						return await this.deleteDoc(this.resource.public_id);
					});
					await Promise.all(imgs_deletes);

					debugger;
					if (resources) {
						const item: never[] = resources.map(async (resource: never) => {
							const body = new FormData();
							body.append('image', resource);

							const imgs: AxiosResponse<{ status: boolean; message: string; info: never }> = await Vue.axios.post(
								'/api/log/file/img/Courses',
								body
							);

							return imgs.data.info;
						});
						const rec: never[] = await Promise.all(item);

						debugger;
						this.body.resources.concat(rec);
					}

					if (image != {}) {
						const dele: Boolean = await this.deleteDoc(this.item.image.public_id);
						if (dele) {
							//
							const body = new FormData();
							body.append('image', image);

							const img: AxiosResponse = await Vue.axios.post('/api/log/file/img/Courses', body);
							this.item.image = img.data.info;
							debugger;
						}
					}

					//
					const resp: boolean = await this.editCourse(this.body);
					debugger;
					this.Alert(resp);
					if (!resp) throw '';

					await this.getCourses();

					this.body = {
						image: {},
						resource: {},
						resources_existin: [],
						resources: [],
					};
					this.imageData = '';
					this.files_valid = false;
				} catch (err) {
					console.error(err);
				}
				this.loading = false;
			},
			openFile(id: string) {
				const el = document.getElementById(`${id}`);

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
			change_recourses(event: any) {
				const input: any = event.target.files;

				for (const key in input) {
					if (key != 'length' && key != 'item') {
						// @ts-ignore
						const e: never = event.target.files[key];
						this.body.resources.push(e);
					}
				}
			},
			exit() {
				this.$router.push({ name: 'Admin-Courses' });
			},
		},
		computed: {
			...mapState('Courses', ['item']),
		},
	});
</script>

<style lang="scss">
	#fileElem,
	#filesElem {
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
