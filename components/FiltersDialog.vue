<template>
  <form class="filters-dialog" @submit.prevent="handleSubmit">
    <div class="filters-dialog__inner">
      <button class="filters-dialog__close" type="button" aria-label="Close" @click="$emit('close')">
        <Icon name="close" width="32" height="32" />
      </button>
      <h2 class="filters-dialog__title">Filters</h2>
      <div class="filters-dialog__body">
        <div class="input">
          <label class="input__label" for="contact-area">Areas</label>
          <select class="input__field" id="contact-area" v-model="area">
            <option value="">Location</option>
            <option value="area1">Area 1</option>
            <option value="area2">Area 2</option>
          </select>
        </div>
        <div class="input">
          <label class="input__label">Property type</label>
          <div class="property-type">
            <div class="property-type__section">
              <span class="property-type__label">Residential</span>
              <div class="property-type__options">
                <label><input type="checkbox" v-model="propertyType" value="Apartment" /> Apartment</label>
                <label><input type="checkbox" v-model="propertyType" value="Duplex" /> Duplex</label>
                <label><input type="checkbox" v-model="propertyType" value="Penthouse" /> Penthouse</label>
                <label><input type="checkbox" v-model="propertyType" value="Townhouse" /> Townhouse</label>
                <label><input type="checkbox" v-model="propertyType" value="Villa" /> Villa</label>
                <label><input type="checkbox" v-model="propertyType" value="Hotel Apartment" /> Hotel Apartment</label>
              </div>
            </div>
            <div class="property-type__section">
              <span class="property-type__label">Commercial</span>
              <div class="property-type__options">
                <label><input type="checkbox" v-model="propertyType" value="Office" /> Office</label>
                <label><input type="checkbox" v-model="propertyType" value="Shop" /> Shop</label>
                <label><input type="checkbox" v-model="propertyType" value="Factory" /> Factory</label>
                <label><input type="checkbox" v-model="propertyType" value="Warehouse" /> Warehouse</label>
              </div>
            </div>
          </div>
        </div>
        <div class="input">
          <label class="input__label">Price</label>
          <input type="range" v-model="price" min="150000" max="48000000" step="10000" />
          <div class="input__range-values">
            <span>150 000 AED</span>
            <span>48 000 000 AED</span>
          </div>
        </div>
        <div class="input">
          <label class="input__label">Size</label>
          <input type="range" v-model="size" min="150" max="2800" step="10" />
          <div class="input__range-values">
            <span>150 SQFT</span>
            <span>2800 SQFT</span>
          </div>
        </div>
        <div class="input">
          <label class="input__label">Bedrooms</label>
          <div class="bedrooms">
            <button v-for="n in 7" :key="n" :class="{'active': bedrooms === n}" @click.prevent="bedrooms = n">{{ n === 7 ? '7+' : n }}</button>
          </div>
        </div>
      </div>
      <footer class="filters-dialog__footer">
        <button class="filters-dialog__reset" type="button" @click="resetFilters">Reset</button>
        <button class="filters-dialog__submit" type="submit">Search</button>
      </footer>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const emit = defineEmits(["close"])

const router = useRouter()
const area = ref('')
const propertyType = ref([])
const price = ref(150000)
const size = ref(150)
const bedrooms = ref(1)
const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    const filterData = {
      area: area.value,
      propertyType: propertyType.value,
      price: price.value,
      size: size.value,
      bedrooms: bedrooms.value
    }
    emit('close')
    router.push({ name: 'index' })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const resetFilters = () => {
  area.value = ''
  propertyType.value = []
  price.value = 150000
  size.value = 150
  bedrooms.value = 1
}
</script>

<style lang="scss">
.filters-dialog {
  position: fixed;
  top: 0;
  right: 0;
  width: 42rem;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1002;
  overflow: auto;
  padding: 10px;

  &__inner {
    padding: 1rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
  }

  &__title {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #274c77;
    border-bottom: 1px solid var(--color-quaternary);
    padding-bottom: 0.5rem;
    width: 100%;
    font-weight: 400;
  }

  &__body {
    display: grid;
    gap: 1rem;
    width: 100%;
  }

  .input {
    width: 100%;

    &__label {
      font-size: 1.3rem;
      color: var(--color-quaternary);
      margin-bottom: 0.5rem;
      display: block;
      font-weight: 500;
    }

    &__field {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    &__range-values {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: #6c757d;
    }

    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      background: #ddd;
      border-radius: 5px;
      outline: none;
      opacity: 0.7;
      -webkit-transition: .2s;
      transition: opacity .2s;
      margin: 0.5rem 0;
    }

    input[type="range"]:hover {
      opacity: 1;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--color-quaternary);
      cursor: pointer;
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--color-quaternary);
      cursor: pointer;
    }
  }

  .property-type {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;

    &__section {
      display: grid;
      gap: 0.5rem;
    }

    &__label {
      font-weight: 400;
      color: #6b6c6d;
    }

    &__options {
      display: grid;
      gap: 0.5rem;

      label {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: var(--color-quaternary);

        input {
          margin-right: 0.5rem;
          transform: scale(1.5);
        }
      }
    }
  }

  .bedrooms {
    display: flex;
    gap: 0.5rem;

    button {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 50%;
      font-size: 1rem;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.active {
        background: var(--color-quaternary);
        color: var(--color-white);
        border-color: var(--color-quaternary);
      }
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    width: 100%;
  }

  &__reset {
    background: none;
    border: none;
    color: var(--color-quaternary);
    cursor: pointer;
    font-size: 1rem;
  }

  &__submit {
    background: var(--color-quaternary);
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1rem;
  }
}
</style>
