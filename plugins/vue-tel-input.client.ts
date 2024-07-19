import { defineNuxtPlugin } from '#app'
import TelInput from 'vue-tel-input'
// import '~/assets/css/vue-tel-input.css'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(TelInput, {
		enabledCountryCode: true,
		enabledFlags: true,
		inputOptions: {
			showDialCode: true,
		},
		validCharactersOnly: true,
		defaultCountry: 'AE',
	})
})