<template>
	<section class="videos-index">
		<h1>Videos</h1>

		<vs-table>
			<template #thead>
				<vs-tr>
					<vs-th>
						title
					</vs-th>
					<vs-th>
						description
					</vs-th>
					<vs-th>
						image
					</vs-th>
					<vs-th>
						video
					</vs-th>
					<vs-th>
						test
					</vs-th>
					<vs-th>
						resources
					</vs-th>
				</vs-tr>
			</template>
			<template #tbody>
				<vs-tr :key="i" v-for="(tr, i) in item.playlistid" :data="tr">
					<vs-td>
						{{ tr.snippet.title }}
					</vs-td>
					<vs-td>
						{{ tr.snippet.description }}
					</vs-td>
					<vs-td>
						<div class="ed-container">
							<div>
								<vs-button icon circle color="primary" @click="openImg(tr)">
									<v-icon name="image"></v-icon>
								</vs-button>
							</div>
						</div>
					</vs-td>
					<vs-td>
						<div class="ed-container">
							<div>
								<vs-button icon circle color="primary" @click="openVideo(tr)">
									<v-icon name="video"></v-icon>
								</vs-button>
							</div>
						</div>
					</vs-td>
					<vs-td>
						<div class="ed-container">
							<div>
								<vs-button icon circle color="primary" @click="openVideo(tr)">
									<v-icon name="pencil-alt"></v-icon>
								</vs-button>
							</div>
						</div>
					</vs-td>
					<vs-td>
						<div class="ed-container">
							<div>
								<vs-button icon circle color="primary" @click="openVideo(tr)">
									<v-icon name="folder"></v-icon>
								</vs-button>
							</div>
						</div>
					</vs-td>
				</vs-tr>
			</template>
		</vs-table>

		<!-- image -->
		<vs-dialog :loading="loading" blur not-center v-model="imgAlert">
			<template #header>
				<h4 class="not-margin primary-text">
					{{ title }}
				</h4>
			</template>

			<div class="con-content s-center">
				<img height="((250/16)*9)px" width="250px" :src="img" :alt="url" />
			</div>
		</vs-dialog>

		<!-- play -->
		<vs-dialog :loading="loading" blur not-center v-model="playAlert">
			<template #header>
				<h4 class="not-margin primary-text">
					{{ title }}
				</h4>
			</template>

			<div class="con-content s-center" id="play">
				{{ play }}
			</div>
		</vs-dialog>
	</section>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapActions, mapState, mapMutations } from 'vuex';
	import { AxiosResponse } from 'axios';

	export default Vue.extend({
		name: 'videos-index',
		props: [],
		mounted() {},
		data() {
			return {
				img: '',
				play: '',
				title: '',
				imgAlert: false,
				playAlert: false,
				loading: false,
			};
		},
		methods: {
			openImg(tr: any) {
				this.img = tr.snippet.thumbnails.default.url;
				this.title = tr.snippet.title;
				this.imgAlert = true;
			},
			async openVideo(tr: any) {
				try {
					this.loading = true;
					this.title = tr.snippet.title;
					this.playAlert = true;

					const v: AxiosResponse = await Vue.axios.get('/api/log/video/' + tr.contentDetails.videoId);

					const dom: any = document.querySelector('#play');
					dom.innerHTML = `${v.data.info.items[0].player.embedHtml}`;

					this.loading = false;
				} catch (err) {
					console.error(err);
				}
			},
		},
		computed: {
			...mapState('Courses', ['item']),
			...mapState('Playlistid', ['video']),
		},
	});
</script>

<style scoped lang="scss">
	.videos-index {
	}
</style>
