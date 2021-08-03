<template>
	<div class="center">
		<vs-table>
			<template #thead>
				<vs-tr>
					<vs-th>
						Nombre
					</vs-th>
					<vs-th>
						Descriccion
					</vs-th>
					<vs-th>
						id
					</vs-th>
				</vs-tr>
			</template>
			<template #tbody>
				<vs-tr :key="i" v-for="(tr, i) in tdata">
					<vs-td>
						{{ tr.name }}
					</vs-td>
					<vs-td>
						{{ tr.description }}
					</vs-td>
					<vs-td>
						{{ tr._id }}
					</vs-td>

					<template #expand>
						<div class="con-content">
							<div class="ed-container">
								<div class="m-50">
									<div class="ed-grid m-grid-2">
										<div>
											<vs-card type="2">
												<template #img>
													<img :src="tr.image" alt="" />
												</template>
											</vs-card>
											<h1 class="primary-text">{{ tr.name }}</h1>
										</div>

										<div>
											<div class="ed-container">
												<div class="s-70">
													<template>
														<div class="center con-selects">
															<vs-select :color="success" v-model="PlayListItem">
																<vs-option :label="'modulos'" :value="''" disabled>
																	modulos
																</vs-option>
																<vs-option
																	:label="i + 1"
																	v-for="(module, i) in tr.modules"
																	:key="i"
																	:value="module"
																>
																	{{ i + 1 }}
																</vs-option>
															</vs-select>
														</div>
													</template>
												</div>
												<div class="s-30">
													<vs-button @click="list_item(i)" :active="true">ver!</vs-button>
												</div>
											</div>
											<br />
											<vs-table style="overflow: hidden;" id="table-list">
												<template #thead>
													<vs-tr>
														<vs-th>
															clases
														</vs-th>
													</vs-tr>
												</template>
												<template #tbody>
													<vs-tr :key="j" v-for="(item, j) in PlayList" :data="item">
														<vs-td>
															<div class="ed-container">
																{{ item.snippet.title }}

																<vs-button @click="video(j)" border :active="false">
																	Ver
																</vs-button>
															</div>
														</vs-td>
													</vs-tr>
												</template>
											</vs-table>
											<br />
											<br />
											<br />
											<br />
										</div>
									</div>
								</div>

								<div class="m-50 center" :id="`video`"></div>
							</div>
						</div>
					</template>
				</vs-tr>
			</template>
		</vs-table>
	</div>
</template>
<script lang="ts">
	import Vue from 'vue';
	import { AxiosResponse } from 'axios';

	export default Vue.extend({
		name: 'list-Courses',
		props: ['keys', 'tdata'],
		components: {},
		mounted() {},
		data: () => ({
			editActive: false,
			edit: null,
			editProp: '',
			search: '',
			allCheck: false,
			page: 1,
			max: 3,
			active: 0,
			selected: [],
			PlayListItem: '',
			PlayList: [],
		}),
		methods: {
			async list_item(i: number): Promise<void> {
				const resp: AxiosResponse<any> = await Vue.axios.get('/api/log/' + this.PlayListItem + '/items');

				console.clear();

				console.log('resp.data', resp.data);

				this.PlayList = resp.data.info;
			},
			async video(i: number): Promise<void> {
				// @ts-ignore
				const id: any = this.PlayList[i].snippet.resourceId.videoId;

				const resp: AxiosResponse<any> = await Vue.axios.get('/api/log/video/' + id);

				console.clear();

				console.log('resp.data', resp.data);

				const video: HTMLDivElement | any = document.getElementById('video');
				video.innerHTML = resp.data.info;
			},
		},
		/*
		methods: {
			...mapMutations('Courses', ['define_item']),
			deleteAlert(i: number) {
				this.$router.push({ name: 'delete-Course' });
				this.define_item(i);
			},
			editAlert(i: number) {
				this.$router.push({ name: 'edit-Course' });
				this.define_item(i);
			},
			openList(i: number) {
				this.define_item(i);
				this.$router.push({ name: 'playlistid-Course' });
			},
			recoursesAlert(i: number) {
				this.$router.push({ name: 'recourses-Course' });
				this.define_item(i);
			},
			openImg(imgName: string, url: string) {
				this.img = true;
				this.url = url;
				this.imgName = imgName;
			},
			closeImg() {
				this.img = false;
				this.url = '';
				this.imgName = '';
			},
		},*/
		computed: {},
	});
</script>

<style lang="scss" scoped>
	#table-list > vs-table > table {
		width: none;
		min-width: none !important;
		background-color: red;
	}
</style>
