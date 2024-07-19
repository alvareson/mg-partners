<template>
    <form class="contact-us-dialog" @submit.prevent="handleSubmit">
      <div class="contact-us-dialog__inner">
        <svg class="contact-us-dialog__logo" width="80" height="80">
          <use xlink:href="/img/logos.svg#logo" />
        </svg>
        <h2 class="contact-us-dialog__title text-h3">Make an offer</h2>
        <button class="contact-us-dialog__close" type="button" aria-label="Close" @click="$emit('close')">
          <Icon name="close" width="32" height="32" />
        </button>
        <div class="contact-us-dialog__body">
          <div class="input">
            <label class="input__label" for="contact-name">Your name</label>
            <input class="input__field" id="contact-name" v-model="name" type="text" placeholder="Enter name here" required />
          </div>
          <div class="input">
            <label class="input__label" for="contact-email">Email address</label>
            <input class="input__field" id="contact-email" v-model="email" type="email" inputmode="email" placeholder="Enter your email address" required />
          </div>
          <div class="input">
            <label class="input__label" for="contact-phone">Phone</label>
            <input class="input__field" id="contact-phone" v-model="phone" type="tel" inputmode="tel" placeholder="Enter your phone number (optional)" />
          </div>
          <div class="input">
						<label class="input__label" for="contact-aircraft">Aircraft</label>
						<input class="input__field" id="contact-aircraft" :value="aircraft.name" type="text" readonly />
					</div>
        </div>
        <footer class="contact-us-dialog__footer">
          <p class="contact-us-dialog__agree">
            By clicking «Submit» you agree to our
            <AppLink class="contact-us-dialog__agree-link" :to="{ path: '#' }">Privacy Policy</AppLink>
          </p>
          <button class="contact-us-dialog__submit" type="submit">
            <span class="contact-us-dialog__submit-icon">
              <Icon class="contact-us-dialog__submit-arrow" name="arrow-right" width="58" height="6" />
            </span>
            Submit
          </button>
        </footer>
      </div>
    </form>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createDirectus, createItems, rest } from '@directus/sdk'

const props = defineProps({
  aircraft: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
})
const aircraft = toRef(props, "aircraft")

const config = useRuntimeConfig()
const emit = defineEmits(["close"])

const client = createDirectus(`${config.public.directusUrl}`).with(rest())

const router = useRouter()
const name = ref('')
const email = ref('')
const phone = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
	isLoading.value = true
	try {
			const offerData = {
				name: name.value,
				email: email.value,
				phone: phone.value,
				aircraftId: aircraft.value.id,
				aircraftName: aircraft.value.name
			}

			await client.request(createItems('offers', offerData as any))
			await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(offerData),
			})

			emit('close')
			router.push({ name: 'index___en' })
	} catch (error) {
			console.error('Lead submission failed:', error)
	} finally {
			isLoading.value = false
	}
}
</script>

<style lang="scss">
.contact-us-dialog {
width: min(27.75rem, 100%);
overflow: auto;

@media (max-width: 30rem) {
	width: 100%;
	height: 100vh;

	&.dialog__container {
	max-width: 100%;
	max-height: 100%;
	}
}

&__inner {
	position: relative;
	min-height: 100%;
	padding: 2.5rem;

	@media (max-width: 30rem) {
	padding: 0 1.5rem 6rem;
	}
}

&__logo {
	display: none;
	margin: 0 auto min(6rem, 11.4vh);

	@media (max-width: 30rem) {
	display: block;
	}
}

&__title {
	margin-bottom: 2rem;
	line-height: 1.4;
}

&__close {
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
}

&__body {
	display: grid;
	gap: 2rem;
	margin-bottom: 2rem;
}

&__footer {
	display: flex;
	gap: 1rem;
	align-items: center;
}

&__agree {
	max-width: 25ch;
	font-size: 0.75rem;
	line-height: 1.33;
	opacity: 0.5;

	@media (max-width: 30rem) {
	position: absolute;
	right: 1.5rem;
	bottom: 1.5rem;
	left: 1.5rem;
	max-width: 100%;
	text-align: center;
	}

	&-link {
		text-decoration: underline;

		&:hover {
				text-decoration: none;
		}
	}
}

&__submit {
	display: flex;
	gap: 0.625rem;
	align-items: center;
	margin-left: auto;
	padding-block: 0.375rem;
	font-size: 0.75rem;
	font-weight: 600;
	line-height: 1.33;
	text-transform: uppercase;
	letter-spacing: 0.15rem;

	@media (max-width: 30rem) {
	margin-left: 1.625rem;
	}

	&-icon {
	display: grid;
	place-items: center;

	&::before {
			grid-area: 1 / -1;
			width: 2rem;
			height: 2rem;
			content: "";
			border: 0.0625rem solid var(--color-primary);
			opacity: 0.2;
			transition: 0.3s;
			transition-property: transform, opacity;
			transform: rotate(45deg);

			.contact-us-dialog__submit:hover & {
			opacity: 0;
			transform: rotate(135deg);
			}
	}
	}

	&-arrow {
	grid-area: 1 / -1;
	transition: transform 0.3s;
	transform: translateX(-1.625rem);

	.contact-us-dialog__submit:hover & {
			transform: translateX(-0.5rem);
	}
	}
}
}

.input {
&__label {
	display: block;
	width: fit-content;
	margin-bottom: 0.9375rem;
	font-size: 0.75rem;
	line-height: 1.33;
	text-transform: uppercase;
	letter-spacing: 0.15rem;
	cursor: pointer;
}

&__field {
    --border-opacity: 0.4;
    width: 100%;
    padding: 0 0 0.5rem;
    line-height: inherit;
    color: inherit;
    background: none;
    border: none;
    border-bottom: 0.0625rem solid rgba(var(--color-primary-rgb), var(--border-opacity));
    transition: border 0.25s;

    &::placeholder {
    color: inherit;
    opacity: 0.5;
    }

    &:focus {
    --border-opacity: 1;
    outline: none;
    }
}
}
</style>
  