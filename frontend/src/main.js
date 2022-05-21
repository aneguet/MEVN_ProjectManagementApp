/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './axios.js';
import TurnOffAutocomplete from 'vue-turn-off-autocomplete';
// PrimeVue UI
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Message from 'primevue/message';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
// import 'primevue/resources/themes/lara-dark-purple/theme.css';
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
// Tables
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup'; //optional for column grouping
import Row from 'primevue/row'; //optional for row
import PanelMenu from 'primevue/panelmenu';
import Fieldset from 'primevue/fieldset';
import Panel from 'primevue/panel';
import Chip from 'primevue/chip';
import Tag from 'primevue/tag';

// Tested
// import 'primevue/resources/themes/md-light-deeppurple/theme.css';
// import 'primevue/resources/themes/bootstrap4-dark-purple/theme.css';
import 'primevue/resources/themes/bootstrap4-light-purple/theme.css';
// import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
// import 'primevue/resources/themes/lara-dark-indigo/theme.css';
// import 'primevue/resources/themes/lara-dark-purple/theme.css';
// import 'primevue/resources/themes/lara-dark-teal/theme.css';
//No
// import 'primevue/resources/themes/md-dark-indigo/theme.css';
// import 'primevue/resources/themes/md-dark-deeppurple/theme.css';
// import 'primevue/resources/themes/mdc-dark-indigo/theme.css';
// import 'primevue/resources/themes/mdc-dark-deeppurple/theme.css';

// import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
// import 'primevue/resources/themes/md-light-indigo/theme.css';
// import 'primevue/resources/themes/mdc-light-indigo/theme.css';
// import 'primevue/resources/themes/mdc-light-deeppurple/theme.css';
// import 'primevue/resources/themes/tailwind-light/theme.css';
// import 'primevue/resources/themes/fluent-light/theme.css';
// import 'primevue/resources/themes/lara-light-indigo/theme.css';
// import 'primevue/resources/themes/lara-light-purple/theme.css';
// import 'primevue/resources/themes/lara-light-blue/theme.css';
// import 'primevue/resources/themes/lara-dark-blue/theme.css';
// import 'primevue/resources/themes/lara-light-teal/theme.css';
// import 'primevue/resources/themes/saga-blue/theme.css';
// import 'primevue/resources/themes/saga-green/theme.css';
// import 'primevue/resources/themes/saga-orange/theme.css';
// import 'primevue/resources/themes/saga-purple/theme.css';
// import 'primevue/resources/themes/vela-blue/theme.css';
// import 'primevue/resources/themes/vela-green/theme.css';
// import 'primevue/resources/themes/vela-orange/theme.css';
// import 'primevue/resources/themes/vela-purple/theme.css';
// import 'primevue/resources/themes/arya-blue/theme.css';
// import 'primevue/resources/themes/arya-green/theme.css';
// import 'primevue/resources/themes/arya-orange/theme.css';
// import 'primevue/resources/themes/arya-purple/theme.css';
// import 'primevue/resources/themes/nova/theme.css';
// import 'primevue/resources/themes/nova-alt/theme.css';
// import 'primevue/resources/themes/nova-accent/theme.css';
// import 'primevue/resources/themes/nova-vue/theme.css';

//No
// import 'primevue/resources/themes/luna-amber/theme.css';
// import 'primevue/resources/themes/luna-blue/theme.css';
// import 'primevue/resources/themes/luna-green/theme.css';
// import 'primevue/resources/themes/luna-pink/theme.css';
// import 'primevue/resources/themes/rhea/theme.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.use(TurnOffAutocomplete);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('Avatar', Avatar);
app.component('AvatarGroup', AvatarGroup);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Panel', Panel);
app.component('PanelMenu', PanelMenu);
app.component('Fieldset', Fieldset);
app.component('ProgressBar', ProgressBar);
app.component('Chip', Chip);
app.component('Tag', Tag);
app.mount('#app');
