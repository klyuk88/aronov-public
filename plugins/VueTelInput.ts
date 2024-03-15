import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
export default defineNuxtPlugin((nuxtApp) => {
  const globalOptions = {
    mode: 'auto',
  };
  
  nuxtApp.vueApp.use(VueTelInput, globalOptions)
})