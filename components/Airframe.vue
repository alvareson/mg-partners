<template>
  <section class="airframe" id="airframe">
    <div class="container">
      <h2 class="airframe__title">Airframe & Engines</h2>
      <table class="airframe__table">
        <tr>
          <th class="airframe__th text-h1">Airframe</th>
          <th></th>
          <th></th>
        </tr>
        <tbody>
          <tr>
            <td class="airframe__td">
              <div class="airframe__label">Airframe hours</div>
              <div class="airframe__value">{{ aircraft.airframeHours || "N/A" }}</div>
            </td>
            <td class="airframe__td">
              <div class="airframe__label">Landings</div>
              <div class="airframe__value">{{ aircraft.airframeHours || "N/A" }}</div>
            </td>
            <td class="airframe__td">
              <div class="airframe__label">Length</div>
              <div class="airframe__value">
                {{ aircraft.airframeLength ? aircraft.airframeLength + " (ft)" : "N/A" }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="airframe__td" colspan="2">
              <div class="airframe__label">Wingspan</div>
              <div class="airframe__value">
                {{ aircraft.wingspan ? aircraft.wingspan + " (ft)" : "N/A" }}
              </div>
            </td>
            <td class="airframe__td">
              <div class="airframe__label">Height</div>
              <div class="airframe__value">
                {{ aircraft.airframeHeight ? aircraft.airframeHeight + " (ft)" : "N/A" }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="airframe__table-wrapper">
        <table class="airframe__table">
          <tr>
              <th v-for="(engine, index) in aircraft.engines" :key="'header-' + index" :class="['airframe__th', headerClass]">
                Engine {{ toRoman(index + 1) }}
              </th>
              <th v-if="aircraft.apus.length" :class="['airframe__th', headerClass]">APU</th>
          </tr>
          <tbody>
            <tr>
              <td v-for="(engine, index) in aircraft.engines" :key="'manufacturer-' + index" class="airframe__td">
                <div class="airframe__label">Manufacturer</div>
                <div class="airframe__value">{{ engine.manufacturer || "N/A" }}</div>
              </td>
              <td v-if="aircraft.apus.length" class="airframe__td">
                <div class="airframe__label">Manufacturer</div>
                <div class="airframe__value">{{ aircraft.apus[0]?.manufacturer || "N/A" }}</div>
              </td>
            </tr>
            <tr>
              <td v-for="(engine, index) in aircraft.engines" :key="'model-' + index" class="airframe__td">
                <div class="airframe__label">Model</div>
                <div class="airframe__value">{{ engine.model || "N/A" }}</div>
              </td>
              <td v-if="aircraft.apus.length" class="airframe__td">
                <div class="airframe__label">Model</div>
                <div class="airframe__value">{{ aircraft.apus[0]?.model || "N/A" }}</div>
              </td>
            </tr>
            <tr>
              <td v-for="(engine, index) in aircraft.engines" :key="'serialNumber-' + index" class="airframe__td">
                <div class="airframe__label">Serial number</div>
                <div class="airframe__value">{{ engine.serialNumber || "N/A" }}</div>
              </td>
              <td v-if="aircraft.apus.length" class="airframe__td">
                <div class="airframe__label">Serial number</div>
                <div class="airframe__value">{{ aircraft.apus[0]?.serialNumber || "N/A" }}</div>
              </td>
            </tr>
            <tr>
              <td v-for="(engine, index) in aircraft.engines" :key="'totalHours-' + index" class="airframe__td">
                <div class="airframe__label">Total hours</div>
                <div class="airframe__value">{{ engine.totalHours || "N/A" }}</div>
              </td>
              <td v-if="aircraft.apus.length" class="airframe__td">
                <div class="airframe__label">Total hours</div>
                <div class="airframe__value">{{ aircraft.apus[0]?.totalHours || "N/A" }}</div>
              </td>
            </tr>
            <tr>
              <td v-for="(engine, index) in aircraft.engines" :key="'totalCycles-' + index" class="airframe__td">
                <div class="airframe__label">Total cycles</div>
                <div class="airframe__value">{{ engine.totalCycles || "N/A" }}</div>
              </td>
              <td v-if="aircraft.apus.length" class="airframe__td">
                <div class="airframe__label">Total cycles</div>
                <div class="airframe__value">{{ aircraft.apus[0]?.totalCycles || "N/A" }}</div>
              </td>
            </tr>
            <tr>
              <td v-for="(engine, index) in aircraft.engines" :key="'maintenanceProgram-' + index" class="airframe__td">
                <div class="airframe__label">Maintenance program</div>
                <div class="airframe__value">{{ engine.maintenanceProgram || "N/A" }}</div>
              </td>
              <td v-if="aircraft.apus.length" class="airframe__td">
                <div class="airframe__label">Maintenance program</div>
                <div class="airframe__value">{{ aircraft.apus[0]?.maintenanceProgram || "N/A" }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRoman } from "~/utils/formatters"
const props = defineProps({
  aircraft: {
    type: Object as PropType<object>,
    required: true,
    default: () => ({}),
  },
})
const aircraft = toRef(props, "aircraft")

const headerClass = computed(() => {
  const engineCount = aircraft.value.engines.length || 0
  return engineCount > 2 ? 'text-h2' : 'text-h1'
})
</script>

<style lang="scss">
.airframe {
  padding-block: 5rem;
  color: var(--color-tertiary);
  background: var(--color-primary);

  @media (max-width: 34rem) {
    padding-block: 4rem;
  }

  &__title,
  &__label {
    font-size: 0.75rem;
    font-weight: normal;
    line-height: 1.33;
    color: var(--color-secondary);
    text-transform: uppercase;
    letter-spacing: 0.15rem;
  }

  &__title {
    margin-bottom: 1rem;

    @media (max-width: 34rem) {
      display: none;
    }
  }

  &__table-wrapper {
    margin-inline: -1.5rem;
    padding-inline: 1.5rem;
    overflow: auto;

    .airframe__table {
      min-width: 38rem;

      @media (max-width: 29rem) {
        min-width: 32rem;
      }
    }
  }

  &__table {
    width: min(66.5rem, 100%);
    table-layout: fixed;

    @media (max-width: 86.5rem) {
      width: 100%;
    }

    &:not(:last-child) {
      margin-bottom: 5rem;

      @media (max-width: 34rem) {
        margin-bottom: 2.5rem;
      }
    }
  }

  &__th {
    padding-bottom: 0.9375rem;

    &:not(:first-child) {
      padding-left: 1rem;
    }
  }

  &__td {
    padding: 0.9375rem 0.9375rem 0.8125rem;
    border: 0.0625rem solid rgba(var(--color-secondary-rgb), 0.5);
  }

  &__label {
    margin-bottom: 0.1875rem;
  }
}
</style>
