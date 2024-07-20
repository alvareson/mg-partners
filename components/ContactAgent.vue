<template>
  <div class="contact-agent">
    <header class="contact-agent__header">
      <img class="contact-agent__avatar" src="/img/brokerRichard.jpg" width="80" height="80" alt="" />
      <p class="contact-agent__caption">Contact agent</p>
      <p class="contact-agent__name text-h3">{{ broker?.firstName }} {{ broker?.lastName }}</p>
    </header>
    <form class="contact-agent__form" @submit.prevent="onSubmit">
      <input v-model="formData.firstname" class="contact-agent__input" type="text" placeholder="Firstname" required />
      <input v-model="formData.lastname" class="contact-agent__input" type="text" placeholder="Lastname" required />
      <input
        v-model="formData.email"
        class="contact-agent__input"
        type="email"
        placeholder="Email"
        required
      />
      <p class="contact-agent__form-error" v-if="formErrors.email">{{ formErrors.email }}</p>
      <input
        class="contact-agent__input"
        type="tel"
        placeholder="Phone Number"
        v-model="formData.phone"
        required
        inputmode="numeric"
        @input="restrictNonNumeric"
      />
      <p class="contact-agent__form-error" v-if="formErrors.phone" >{{ formErrors.phone }}</p>
      <textarea v-model="formData.notes" class="contact-agent__input" placeholder="Your Message" rows="6"></textarea>
      <Btn class="contact-agent__submit" submit>Submit</Btn>
    </form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, toRef } from "vue"
import type { Broker } from "~/utils/types"
import { apiCall, formatData, MINDALL_CRM_SETTINGS } from "~/utils/generateLead"

const validationPhoneError = 'The provided phone number does not meet the required format. Please ensure that it contains at least 10 to 12 digits and includes the country code without the plus sign'

const props = defineProps({
  broker: {
    type: Object as PropType<Broker>,
    default: () => ({}),
  },
  reference: {
    type: String,
    default: ''
  }
})
const broker = toRef(props, "broker")
const reference = toRef(props, "reference")

const formData = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  notes: '',
  propertyReference: reference.value,
})

const formErrors: Ref<{[key: string]: null | string}> = ref({
  email: null,
  phone: null,
})

onMounted(() => {
  formData.value.propertyReference = reference.value
})

const restrictNonNumeric = () => {
  formData.value.phone = formData.value.phone.replace(/\D/g, '')
}

const onSubmit = async () => {
  const preparedData = formatData(formData.value, MINDALL_CRM_SETTINGS)
  try {
    const response = await apiCall(preparedData, MINDALL_CRM_SETTINGS.url)
    if (!response.ok) {
      const error = await response.json() || {}

      if (error?.message.length > 0 && error.message.toLowerCase().includes("phone")) {
        formErrors.value.phone = validationPhoneError //error.message
      }

      if (error?.message.length > 0 && error.message.toLowerCase().includes("mail")) {
        formErrors.value.email = error.message
      }

      return
    }
    for (let key in formData.value) {
      formData.value[key] = ''
    }
    alert('Thank you for your request! We will contact you shortly.')
  } catch (error) {
    console.error(error)
  }
}
</script>

<style lang="scss">
.contact-agent {
  color: var(--color-white);
  background: var(--color-secondary);

  &__header {
    display: grid;
    grid-template: repeat(2, auto) / auto 1fr;
    gap: 0 1.5rem;

    // display: flex;
    // flex-direction: row;
    // gap: 1.5rem;

    align-items: flex-start;
    padding: 1.5rem 2rem;
    border-bottom: 0.0625rem solid rgba(var(--color-white-rgb), 0.57);
  }

  &__avatar {
    grid-row: 1 / -1;
    border-radius: 50%;
  }

  &__caption {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__name {
    grid-column: 2;
  }

  &__form {
    display: grid;
    gap: 1.5rem;
    padding: 1.5rem 2rem 2rem;

    &-error {
      color: red; 
      margin-top: -20px
    }
  }

  &__input {
    --border-opacity: 0.57;
    padding: 1.125rem 1.5rem;
    color: inherit;
    background: none;
    border: 0.0625rem solid rgba(var(--color-white-rgb), var(--border-opacity));
    transition: border 0.25s;

    &::placeholder {
      color: rgba(var(--color-white-rgb), 0.57);
      opacity: 1;
    }

    &:focus {
      --border-opacity: 1;
      outline: none;
    }
  }

  &__submit.btn {
    background: var(--color-primary);
  }
}
</style>
