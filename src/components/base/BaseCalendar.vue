<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    v-bind="$attrs"
    :locale="{
      days: DAYS,
      daysShort: DAYS_SHORT,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
    }"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="modelValue"
            @update:model-value="$emit('update:modelValue', $event)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Закрыть" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script>
import {
  DAYS,
  DAYS_SHORT,
  MONTHS,
  MONTHS_SHORT,
} from "@/statics/date/dateLocale";

export default {
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      DAYS,
      DAYS_SHORT,
      MONTHS,
      MONTHS_SHORT,
    };
  },
};
</script>
