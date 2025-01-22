<script setup lang="ts">
import { reactive, watch } from "vue";
import {
  DppData,
  GeneralData,
  EnvironmentalData,
  DppUpdate,
} from "../types/dpp-data";
import { cloneDeep, isEqual } from "lodash";

const { initialData } = defineProps<{ initialData: DppData | null }>();
const emit = defineEmits<{
  submit: [updateData: DppUpdate];
}>();

const data = reactive<DppData>({
  id: "",
  origin: "",
  generalData: {
    productName: "",
    manufacturer: "",
    model: "",
    category: "",
    height: 0,
    width: 0,
    depth: 0,
    weight: 0,
  },
  environmentalData: {
    energyConsumption: { value: 0, unit: "kWh" },
    waterConsumption: { value: 0, unit: "l" },
    co2Emissions: { value: 0, unit: "kg" },
  },
});
const open = defineModel<boolean>("open", { required: true });

const handleSubmit = () => {
  // Only keep the keys that have been modified
  const updateData: DppUpdate = {};

  if (!isEqual(data.generalData, initialData?.generalData)) {
    updateData.generalData = {};
    for (const [key, value] of Object.entries(data.generalData)) {
      if (value === initialData?.generalData[key as keyof GeneralData])
        continue;
      updateData.generalData[key as keyof GeneralData] = value as any;
    }
  }

  if (!isEqual(data.environmentalData, initialData?.environmentalData)) {
    updateData.environmentalData = {};
    for (const [key, value] of Object.entries(data.environmentalData)) {
      if (
        value.value ===
        initialData?.environmentalData[key as keyof EnvironmentalData]?.value
      )
        continue;
      updateData.environmentalData[key as keyof EnvironmentalData] =
        value as any;
    }
  }

  emit("submit", updateData);
};

watch(open, (newOpen) => {
  if (newOpen && initialData) {
    Object.assign(data, cloneDeep(initialData));
  }
});
</script>

<template>
  <div v-if="open" class="edit-modal">
    <div v-if="data" class="edit-modal-card">
      <h2>{{ initialData?.id }}</h2>
      <div class="edit-modal-content">
        <h3>General Data</h3>
        <table class="data-table">
          <tr v-for="([key], i) in Object.entries(data.generalData)" :key="i">
            <td align="left">{{ key }}</td>
            <td align="left">
              <input v-model="data.generalData[key as keyof GeneralData]" />
            </td>
          </tr>
        </table>

        <div class="divider" />

        <h3>Environmental Data</h3>
        <table class="data-table">
          <tr
            v-for="([key], i) in Object.entries(data.environmentalData)"
            :key="i"
          >
            <td align="left">{{ key }}</td>
            <td align="left">
              <div class="input-with-suffix">
                <input
                  v-model="data.environmentalData[key as keyof EnvironmentalData].value"
                />
                {{
                  data.environmentalData[key as keyof EnvironmentalData].unit
                }}
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="button-group">
        <button @click="handleSubmit">Submit</button>
        <button @click="open = false">Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.edit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.edit-modal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
  padding: 2rem;
  width: 25rem;
  background-color: #f0f0f0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.8);
}

.edit-modal-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-with-suffix {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.input-with-suffix input {
  width: 8rem;
}
</style>
