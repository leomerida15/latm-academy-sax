import Vue from 'vue';
// ||__________________vuesax___________||
// @ts-expect-error
import Vuesax from 'vuesax';
Vue.use(Vuesax, {
	// options here
});

// ||__________________vue-axios___________||
import axios from 'axios';
import VueAxios from 'vue-axios';

// config
axios.defaults.baseURL =
	process.env.NODE_ENV === 'production' ? 'http://localhost:5000' : 'https://latam-academy-sax.herokuapp.com';
axios.defaults.headers.common['token'] = localStorage.getItem('token');

Vue.use(VueAxios, axios);

// ||__________________vue-awesome______||

import 'vue-awesome/icons/flag';
import 'vue-awesome/icons';
// @ts-expect-error
import Icon from 'vue-awesome/components/Icon';

// globally (in your main .js file)
Vue.component('v-icon', Icon);

// ||__________________VueSweetalert2______||
import VueSweetalert2 from 'vue-sweetalert2';
import * as Swal from 'sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2, {
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Vue.swal.stopTimer);
		toast.addEventListener('mouseleave', Vue.swal.resumeTimer);
	},
});
