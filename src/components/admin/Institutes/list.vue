<template>
	<div class="center examplex">
		<vs-table striped>
			<template #thead>
				<vs-tr>
					<vs-th v-for="(key, i) in keys" :key="i">
						{{ $t(key) }}
					</vs-th>
				</vs-tr>
			</template>
			<template #tbody>
				<vs-tr :key="i" v-for="(dato, i) in $vs.getPage(tdata, page, max)" :data="dato">
					<vs-td eidt @click="(edit = dato), (editProp = 'name'), (editActive = true)">
						{{ dato.name }}
					</vs-td>
					<vs-td eidt @click="(edit = dato), (editProp = 'description'), (editActive = true)">
						{{ dato.description }}
					</vs-td>
					<vs-td>
						<div class="ed-container">
							<div>
								<vs-button icon circle color="success" @click="openImg(dato.name, dato.image)">
									<v-icon name="image"></v-icon>
								</vs-button>
							</div>
						</div>
					</vs-td>
					<vs-td>
						<div class="ed-container">
							<div class="s-50">
								<vs-button @click="editAlert(i)" icon circle color="primary">
									<v-icon name="edit"></v-icon>
								</vs-button>
							</div>
							<div class="s-50">
								<vs-button @click="deleteAlert(i)" icon circle color="danger">
									<v-icon name="trash"></v-icon>
								</vs-button>
							</div>
						</div>
					</vs-td>
					<vs-td>
						{{ dato._id }}
					</vs-td>
				</vs-tr>
			</template>
			<template #footer>
				<vs-pagination v-model="page" :length="$vs.getLength(tdata, max)" />
			</template>
		</vs-table>

		<vs-dialog v-model="editActive">
			<template #header>Change Prop {{ editProp }}</template>
			<vs-input @keypress.enter="editActive = false" v-if="editProp == 'name'" v-model="edit[editProp]" />
			<vs-input @keypress.enter="editActive = false" v-if="editProp == 'description'" v-model="edit[editProp]" />
		</vs-dialog>

		<!-- image -->
		<vs-dialog not-center v-model="img">
			<template #header>
				<h4 class="not-margin primary-text">
					{{ imgName }}
				</h4>
			</template>

			<div class="con-content s-center">
				<img height="((250/16)*9)px" width="250px" :src="url" :alt="url" />
			</div>
		</vs-dialog>
	</div>
</template>

<script lang="ts">
	// modules
	import Vue from 'vue';
	import { mapState, mapActions, mapMutations } from 'vuex';
	// components

	export default Vue.extend({
		name: 'Institutes-list',
		props: ['keys', 'tdata'],
		components: {},
		mounted() {},
		data() {
			return {
				editActive: false,
				edit: null,
				editProp: {},
				page: 1,
				max: 4,
				img: false,
				url: '',
				imgName: '',
				remove: false,
				name: '',
				id: '',
			};
		},
		methods: {
			...mapMutations('Institutes', ['define_item']),
			deleteAlert(i: number) {
				this.$router.push({ name: 'delete-Institute' });
				this.define_item(i);
			},
			editAlert(i: number) {
				this.$router.push({ name: 'edit-Institute' });
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
		},
		computed: {},
	});
</script>
